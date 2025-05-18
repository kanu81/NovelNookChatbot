// Function to display user and bot messages dynamically
async function sendMessage() {
  const userInput = document.getElementById("userInput").value;
  const chatArea = document.getElementById("chat");
  const responseArea = document.getElementById("responseArea");

  if (!userInput.trim()) return;

  // Display user message
  const userMessage = document.createElement("div");
  userMessage.classList.add("message", "user");
  userMessage.textContent = userInput;
  chatArea.appendChild(userMessage);

  // Scroll to the latest message
  chatArea.scrollTop = chatArea.scrollHeight;

  responseArea.innerHTML = "Waiting for Gemini's response..."; // Show loading indicator

  // Call the backend API to get the Gemini response
  try {
    const res = await fetch("https://novelnook-chatbot.onrender.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput }),
    });

    const data = await res.json();
    let botReply =
      data.reply || "I'm sorry, I couldn't get a response from Gemini.";

    // Shorten response to 300 characters
    if (botReply.length > 1000) {
      botReply = botReply.slice(0, 300) + "..."; // Trim response
    }

    // Display bot message
    const botMessage = document.createElement("div");
    botMessage.classList.add("message", "bot");
    botMessage.textContent = botReply;
    chatArea.appendChild(botMessage);

    // Scroll to the latest message
    chatArea.scrollTop = chatArea.scrollHeight;

    responseArea.innerHTML = ""; // Hide loading indicator
  } catch (error) {
    console.error("Error:", error);
    responseArea.innerHTML =
      "Something went wrong while fetching Gemini's response.";
  }
}
