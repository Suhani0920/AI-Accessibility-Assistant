document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Popup loaded successfully!");

    const summarizeButton = document.getElementById("summarize");
    const readTextButton = document.getElementById("readText");
    const increaseFontButton = document.getElementById("increaseFont");
    const stopButton = document.getElementById("stop");

    function executeScriptOnPage(func) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length === 0) {
                console.error("No active tab found.");
                return;
            }

            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: func
            });
        });
    }
});