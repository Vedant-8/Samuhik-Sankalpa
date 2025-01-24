const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors middleware
const session = require("express-session");
const nodemailer = require("nodemailer"); // Import nodemailer

const port = 8888;
const app = express();

const routes_auth = require("./routes/routes_auth");
const routes_orgs = require("./routes/routes_orgs");
const routes_users = require("./routes/routes_user");
const routes_admin = require("./routes/routes_admin");

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/rubix25")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // Allow multiple origins
    credentials: true, // Allow cookies
  })
);

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000, // 1 hour
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
    },
  })
);

// Routes
app.use("/", routes_auth);
app.use("/orgs", routes_orgs);
app.use("/users", routes_users);
app.use("/admin", routes_admin);

// Email sending route
app.post("/send-email", async (req, res) => {
  const { eventDetails } = req.body;

  // Debugging: Log the eventDetails received in the request
  console.log("Received event details for email:", eventDetails);

  try {
    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "samuhiksankalpa@gmail.com", // Replace with your email
        pass: "123@abc789", // Replace with your email password or app-specific password
      },
    });

    // Debugging: Log the transporter configuration
    console.log("Nodemailer transporter configured");

    // Email content
    const mailOptions = {
      from: "samuhiksankalpa@gmail.com",
      to: "vedant8wink@gmail.com",
      subject: `RSVP Confirmation: ${eventDetails.title}`,
      text: `You have successfully RSVP'd for the event "${eventDetails.title}".\n\nDetails:\n- Date: ${eventDetails.date}\n- Description: ${eventDetails.description}\n\nThank you!`,
    };

    // Debugging: Log email content
    console.log("Email content prepared:", mailOptions);

    // Send email
    await transporter.sendMail(mailOptions);

    // Debugging: Log success after email is sent
    console.log("Email sent successfully!");

    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
