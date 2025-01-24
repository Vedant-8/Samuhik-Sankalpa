import React, { useState, useEffect } from 'react';
import QRCode from "qrcode";
import UploadPage from "./HandlePhone";
import { io } from "socket.io-client";
import {motion} from "framer-motion";



const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [error, setError] = useState(null);
  const [classificationResult, setClassificationResult] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
//   const [uploadedFile, setUploadedFile] = useState(null);
  const baseUrl = "http://192.168.14.170:5173/user/upload"; // Link to the upload page
  const socket = io("http://192.168.14.170:5000") //connect to backend websocket

  const generateQrCode = async () => {
    try {
      const url = await QRCode.toDataURL(baseUrl);
      setQrCodeUrl(url);
    } catch (error) {
      console.error("Error generating QR Code", error);
    }
  };

  // Listen for WebSocket events
  useEffect(() => {
    socket.on("fileUploaded", (data) => {
      console.log(data.message); // Log the message
      setSelectedImage(data.filePath); // Save the file path for display
      setPreviewURL(data.filePath)
      console.log(selectedImage)
    });

    // Cleanup on component unmount
    return () => socket.off("fileUploaded");
  }, []);

  const disposalTips = {
    paper: {
      class : "Paper",
      tip: "Recycle paper by placing it in designated paper recycling bins. Ensure that it is clean and free from food residue or plastic coatings. Avoid mixing it with food waste or plastic to ensure proper recycling.",
      details: "Paper recycling helps reduce deforestation and saves energy. Common items that can be recycled include newspapers, cardboard, and office paper.",
      contact: "For more information on paper recycling in your area, contact your local municipal waste management authority or visit [Local Recycling Program Website]."
    },
    plastic: {
        class : "Plastic",
      tip: "Recycle plastics by checking local guidelines for the types of plastic accepted. Separate plastics by type and clean them before disposal. Reduce single-use plastic by opting for reusable alternatives.",
      details: "Plastics are recyclable, but they can take hundreds of years to break down in landfills. Items like plastic bottles, containers, and bags can often be recycled. Look for the recycling code on plastic products to identify which can be recycled.",
      contact: "For more details on plastic recycling and drop-off locations, contact your local recycling center or visit [Plastic Recycling Organization Website]."
    },
    glass: {
        class : "Glass",
      tip: "Glass can be recycled indefinitely without losing quality. Ensure it is clean and free of any food residue before placing it in the recycling bin. Avoid breaking glass as it can be hazardous.",
      details: "Glass is one of the easiest materials to recycle. Common items include glass bottles, jars, and containers. Glass recycling saves energy and reduces the need for raw materials.",
      contact: "To find glass recycling centers near you, visit [Glass Recycling Organization Website] or contact your local waste management authority."
    },
    metal: {
        class : "Metal",
      tip: "Metals like aluminum and steel can be recycled. Clean and separate them from other materials before disposal. Recycling metals conserves natural resources and saves energy.",
      details: "Aluminum cans, steel cans, and other metal items can be recycled. Recycling metal helps reduce the need for mining and lowers greenhouse gas emissions.",
      contact: "For more information on metal recycling, contact your local recycling center or visit [Metal Recycling Organization Website]."
    }
  };
  
  const isFilePath = (data) => {
    const filePathPattern = /^(http|https):\/\/.+\/.+\.[a-zA-Z0-9]+$/;
    return filePathPattern.test(data);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      // Set the selected image file
      setSelectedImage(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    
    if (selectedImage) {

        const formData = new FormData();

        if (isFilePath(selectedImage)) {
            const response = await fetch(selectedImage);
            const blob = await response.blob(); // Convert the response to a Blob (binary data)
            // Create a FormData object to send the file
            
            formData.append('file', blob, 'image.jpg');
        }
      // Here you would typically upload the image to a server
      // For now, we'll just log the image details
      
        else{
            console.log('Selected Image:', selectedImage);
            formData.append('file', selectedImage);
        }
      console.log(selectedImage)
      console.log(formData);

        try {
            const response = await fetch('http://127.0.0.1:5000/classify', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to classify the image');
            }

            const data = await response.json();
            console.log(data);
            const maxClass = Object.keys(data).reduce((maxKey, currentKey) => {
                return data[currentKey] > data[maxKey] ? currentKey : maxKey;
              });
              setClassificationResult(maxClass);
              console.log(classificationResult);
             
            setError(null);  // Clear any previous errors
        } catch (error) {
            setError(error.message);
            setClassificationResult(null);  // Clear previous results
        }
    }
    
    // Function to display the results on the page (you can customize this)
    function displayResults(data) {
        const resultContainer = document.getElementById("result-container");
        resultContainer.innerHTML = JSON.stringify(data, null, 2);
    }
    }
  

  return (
    <>
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-base  text-gray-500 
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-bold
              file:bg-green-500 file:text-white
              hover:file:bg-green-600 mb-5"
          />
          <p className = "w-full items-center justify-center text-center font-medium mb-5">OR</p>
          <motion.button whileHover ={{scale:1.1}}
          whileTap = {{scale : 0.95}}
          onClick={generateQrCode}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 text-base rounded-full "
        >
          Generate QR Code
        </motion.button>
        {qrCodeUrl && (
          <div className="flex flex-col items-center mt-4">
            <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64" />
            <p className="text-center mt-2">Scan the QR Code with your phone to upload an image.</p>
          </div>
        )}


        </div>

        {previewURL && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
            <img 
              src={previewURL} 
              alt="Preview" 
              className="max-w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={!selectedImage}
          className="w-full py-2 px-4 bg-green-500 text-white rounded-md 
            hover:bg-green-600 focus:outline-none focus:ring-2 
            focus:ring-green-700 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Upload Image
        </button>
      </form>
      </div>
      {classificationResult && (
        <div className='mx-5 mt-5'>
        <h2>Class: {disposalTips[classificationResult].class}</h2>
          <p><strong>Tip:</strong> {disposalTips[classificationResult].tip}</p>
          <p><strong>Details:</strong> {disposalTips[classificationResult].details}</p>
          <p><strong>Contact:</strong> {disposalTips[classificationResult].contact}</p>
      </div>)}
    </>
  );
};

export default ImageUploader;