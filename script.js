const script = document.getElementById("risk-js");
const pay = document.getElementById("pay");
const text = document.getElementById("deviceSessionId")
let risk;

if (script) {
  script.addEventListener("load", () => {
    // Initialize Risk.js after it's loaded
    console.log("Risk.js script loaded");
    initializeRiskJs();
  });

  script.addEventListener("error", () => {
    console.error("Error loading Risk.js script");
  });
} else {
  console.error("Risk.js script tag not found");
}

function initializeRiskJs() {
  risk = window.Risk.init("pk_sbox_guri7tp655hvceb3qaglozm7gee");
  console.log("Risk.js initialized");
}

pay.addEventListener("click", async () => {
  try {
    if (!risk) {
      throw new Error("Risk.js not initialized");
    }
    const deviceSessionId = await risk.publishRiskData();
    
    text.textContent = `${deviceSessionId}`;
    // Now, you can send the deviceSessionId with your payment data
    // For example, store it or send it in the request to your backend
  } catch (error) {
    console.error("Error publishing risk data:", error);
    text.textContent = "Error retrieving Device Session ID";
  }
});
