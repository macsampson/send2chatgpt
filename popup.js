// popup.js

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "open_popup") {
    // Open the popup content
    const popup = window.open(
      chrome.runtime.getURL("popup.html"),
      "ChatGPT",
      "width=600,height=600"
    )
  }
  console.log(message)
})
