document.addEventListener("DOMContentLoaded", function () {
    console.log("Popup loaded successfully!");

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

    function summarizeText() {
        let text = document.body.innerText;
        if (!text) {
            alert("No text found on this page.");
            return;
        }
        let summary = text.split('.').slice(0, 3).join('.') + ".";
        alert("Summary:\n" + summary);
    }

    function stopAll() {
        console.log(" Stop button clicked!");
        speechSynthesis.cancel();
    }

    summarizeButton.addEventListener("click", () => executeScriptOnPage(summarizeText));

    readTextButton.addEventListener("click", () => executeScriptOnPage(() => {
        let text = document.body.innerText;
        if (!text) {
            alert("No text found to read.");
            return;
        }

        if (window.speechUtterance) {
            speechSynthesis.cancel();
        }

        window.speechUtterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(window.speechUtterance);
    }));

    increaseFontButton.addEventListener("click", () => executeScriptOnPage(() => {
        let textElements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, a, li, td");
        
        textElements.forEach(element => {
            let currentSize = window.getComputedStyle(element).fontSize;
            let newSize = parseFloat(currentSize) * 1.2 + "px";
            element.style.fontSize = newSize;
        });

        console.log("Font size increased for text elements only!");
    }));

    stopButton.addEventListener("click", () => executeScriptOnPage(stopAll));
});