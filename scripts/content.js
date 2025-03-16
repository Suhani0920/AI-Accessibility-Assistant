// 🔹 AI-Powered Text Summarization
async function summarizeText() {
    let paragraphs = document.querySelectorAll("p");
    let fullText = Array.from(paragraphs).map(p => p.innerText).join(" ");
  
    let response = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-cnn", {
      method: "POST",
      headers: { "Authorization": "Bearer YOUR_HUGGINGFACE_API_KEY" },
      body: JSON.stringify({ inputs: fullText })
    });
  
    let data = await response.json();
    alert("Summary: " + data.summary_text);
  }
  
  // 🔹 AI-Powered Screen Reader (Text-to-Speech)
function readAloud() {
    let text = document.body.innerText;
    chrome.tts.speak(text);
  }
  
  // 🔹 AI-Powered Font Resizer
  function increaseFontSize() {
    document.body.style.fontSize = "larger";
  }
  
  // 🔹 AI-Powered Image Descriptions
  async function describeImages() {
    let images = document.querySelectorAll("img");
    for (let img of images) {
      let response = await fetch("https://api-inference.huggingface.co/models/openai/clip-vit-base-patch32", {
        method: "POST",
        headers: { "Authorization": "Bearer YOUR_HUGGINGFACE_API_KEY" },
        body: JSON.stringify({ inputs: img.src })
      });
      
      let data = await response.json();
    alert("Image Description: " + data.label);
  }
}
