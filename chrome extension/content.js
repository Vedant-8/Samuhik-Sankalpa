function scrapeAmazonProductDetails() {
  let productDetails = {
    name: "Product Name not found",
    price: "Price not found",
    description: "Description not found",
  };

  // Make sure it's a product page on Amazon
  if (
    window.location.hostname.includes("amazon") &&
    window.location.pathname.includes("/dp/")
  ) {
    let nameElement = document.querySelector("span#productTitle");
    if (nameElement) {
      productDetails.name = nameElement.innerText.trim();
    } else {
      console.log("Product name element not found on Amazon.");
    }

    let priceElement =
      document.querySelector("span#priceblock_ourprice") ||
      document.querySelector("span#priceblock_dealprice") ||
      document.querySelector(".a-price span.a-offscreen");
    if (priceElement) {
      productDetails.price = priceElement.innerText.trim();
    }

    let descriptionElement = document.querySelector("#productDescription");
    if (descriptionElement) {
      productDetails.description = descriptionElement.innerText.trim();
    }
  }

  console.log("Amazon Product Details Captured:", productDetails);
  return productDetails;
}

function scrapeInstamartProductDetails() {
  let productDetails = {
    name: "Product Name not found",
    price: "Price not found",
    description: "Description not found",
  };

  // Ensure it's a product page on Swiggy Instamart
  if (
    window.location.hostname.includes("swiggy.com") &&
    window.location.pathname.includes("/instamart/item/")
  ) {
    let nameElement = document.querySelector('[data-testid="item-name"]');
    if (nameElement) {
      productDetails.name = nameElement.innerText.trim();
    } else {
      console.log("Product name element not found on Instamart.");
    }

    let priceElement = document.querySelector('[data-testid="item-price"]');
    if (priceElement) {
      productDetails.price = priceElement.innerText.trim();
    } else {
      console.log("Price element not found on Instamart.");
    }

    let descriptionLabel = document.querySelector(".sc-aXZVg.bzVIAg.-SSas"); // Finds the "Description" header
    if (descriptionLabel) {
      let descriptionElement = descriptionLabel.nextElementSibling; // Assuming the actual description is the next sibling
      if (descriptionElement) {
        productDetails.description = descriptionElement.innerText.trim();
      } else {
        console.log("Description text element not found on Instamart.");
      }
    } else {
      console.log("Description label element not found on Instamart.");
    }
  } else {
    console.log("Not on a valid Swiggy Instamart product page.");
  }

  console.log("Instamart Product Details Captured:", productDetails);
  return productDetails;
}

// Send the scraped data to the backend
function sendToBackend(productDetails) {
  const apiUrl = "http://localhost:8080/save-product";

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productDetails),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response from backend:", data);
    })
    .catch((error) => {
      console.error("Error sending data to backend:", error);
    });
}

// Main function to decide which scraper to run based on the current website
function scrapeProductDetails() {
  let productDetails = null;

  if (window.location.hostname.includes("amazon")) {
    productDetails = scrapeAmazonProductDetails();
  } else if (
    window.location.hostname.includes("swiggy.com") &&
    window.location.pathname.includes("/instamart/item/")
  ) {
    productDetails = scrapeInstamartProductDetails();
  } else {
    console.log("Unsupported website for product scraping.");
    return;
  }

  if (productDetails && productDetails.name !== "Product Name not found") {
    console.log("Scraped Product Details:", productDetails);
    sendToBackend(productDetails); // Send the scraped data to the backend
  } else {
    console.log("No valid product details found to send.");
  }
}

// Run the scraper
scrapeProductDetails();
