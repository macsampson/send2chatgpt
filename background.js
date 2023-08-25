// background.js

chrome.contextMenus.create({
  id: "send_to_chatgpt",
  title: "Send to ChatGPT",
  contexts: ["selection"],
})

// create sub-menu titled explain code
chrome.contextMenus.create({
  id: "explain_code",
  parentId: "send_to_chatgpt",
  title: "Explain Code",
  contexts: ["selection"],
})

// function to take selected text and insert it into the ChatGPT prompt
function insertText(text) {
  // console.log("Inserting text: " + text)
  // Return a function reference
  var textarea = document.getElementById("prompt-textarea")
  if (textarea) {
    textarea.value = text
  }
}

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "explain_code") {
    const selectedText = info.selectionText
    const explainCode = "Please explain this code: "
    const prompt = explainCode + selectedText
    // open popup
    // chrome.action.openPopup()
    // console.log("Selected text: " + selectedText)
    // Open a new tab with the ChatGPT URL
    chrome.tabs.create(
      {
        url: "https://chat.openai.com/",
      },
      (newTab) => {
        // console.log("New tab launched with ChatGPT")
        // console.log(newTab)
        // Execute script in the content of the newly created tab
        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
          if (changeInfo.status == "complete" && tabId == newTab.id) {
            chrome.tabs.sendMessage(
              newTab.id,
              { action: "insert_text", text: prompt },
              function (response) {
                console.log(response)
              }
            )
          }
        })
      }
    )
  }
})
