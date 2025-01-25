const goGreenButton = document.getElementById("gogreen");

if (goGreenButton) {
  goGreenButton.addEventListener("click", () => {
    console.log("Go Green button clicked");

    // Retrieve the URL from chrome storage
    chrome.storage.local.get("productUrl", (data) => {
      const productUrl =
        data.productUrl || "http://localhost:5173/user/greenShop";

      // Navigate to the product URL if it exists
      if (productUrl) {
        chrome.tabs.update({ url: productUrl }); // Use chrome.tabs.update to navigate
        console.log("Navigating to:", productUrl);
      } else {
        console.log("Product URL not found!");
      }
    });
  });
} else {
  console.log("Go Green button not found!");
}
