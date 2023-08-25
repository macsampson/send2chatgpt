// content.js

// function to take selected text and insert it into the ChatGPT prompt
function insertText(text) {
  // console.log("Inserting text: " + text)
  var textarea = document.getElementById("prompt-textarea")

  if (textarea) {
    setTimeout(function () {
      textarea.value = text.toString()
      // simulte keypress to trigger prompt in textarea
      // var e = new Event("keydown")
      // e.key = "a" // just enter a character
      // e.keyCode = 65 // just enter a character
      // e.which = e.keyCode // just enter a character
      // e.altKey = false
      // e.ctrlKey = false
      // e.shiftKey = false
      // e.metaKey = false
      // e.bubbles = true
      // textarea.dispatchEvent(e)
    }, 1000)
  }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "insert_text") {
    // console.log("Received message from background script")
    insertText(message.text)

    sendResponse({ success: true })
  }
})
