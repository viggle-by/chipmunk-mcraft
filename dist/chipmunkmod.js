// @ts-check
export default () => {
  const config = {
    prefix: "[ZEN]",
    prefixColor: "#726CF7",
    usernameColor: "#726CF7",
    messageColor: "#C8E6EA",
    prefixUrl: "https://zenzoya.netlify.app/",
    prefixHover: "Click to go to my Website :3",
    messageHover: "Click to copy message to clipboard!",
  };

  // -----------------------------
  // Helper: linkify URLs in messages
  // -----------------------------
  const linkify = (text: string) =>
    text.replace(/(https?:\/\/[^\s]+)/g, (url) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color:#4ecdc4;">${url}</a>`
    );

  // -----------------------------
  // Apply custom chat to a single message element
  // -----------------------------
  function applyCustomChat(el: HTMLElement) {
    const username = el.dataset?.username || "Unknown";
    const message = el.textContent || "";

    el.innerHTML = "";

    const chatObject = {
      "translate": '[%s] %s › %s',
      "with": [
        {
          "translate": '%s',
          "with": [
            {
              "color": config.prefixColor,
              "text": config.prefix,
              "bold": false
            }
          ],
          "clickEvent": { "action": "open_url", "value": config.prefixUrl },
          "hoverEvent": {
            "action": "show_text",
            "contents": [
              { "color": "#726CF7", "text": config.prefixHover, "underlined": true }
            ]
          }
        },
        {
          "color": config.usernameColor,
          "text": username
        },
        {
          "color": config.messageColor,
          "text": message,
          "clickEvent": { "action": "copy_to_clipboard", "value": message },
          "hoverEvent": {
            "action": "show_text",
            "contents": [
              { "color": "#726CF7", "text": config.messageHover }
            ]
          }
        }
      ]
    };

    // Render the chat object into HTML
    // Prefix
    const prefixSpan = document.createElement("span");
    prefixSpan.textContent = chatObject["with"][0]["with"][0]["text"];
    prefixSpan.style.color = chatObject["with"][0]["with"][0]["color"];
    prefixSpan.style.cursor = "pointer";
    prefixSpan.onclick = () => window.open(config.prefixUrl, "_blank");
    prefixSpan.title = config.prefixHover;

    // Username
    const usernameSpan = document.createElement("span");
    usernameSpan.textContent = username;
    usernameSpan.style.color = chatObject["with"][1]["color"];
    usernameSpan.style.fontWeight = "600";

    // Message
    const messageSpan = document.createElement("span");
    messageSpan.innerHTML = linkify(message);
    messageSpan.style.color = chatObject["with"][2]["color"];
    messageSpan.style.cursor = "pointer";
    messageSpan.title = config.messageHover;
    messageSpan.onclick = () => navigator.clipboard.writeText(message);

    // Append all
    el.appendChild(prefixSpan);
    el.appendChild(document.createTextNode(" › "));
    el.appendChild(usernameSpan);
    el.appendChild(document.createTextNode(" › "));
    el.appendChild(messageSpan);
  }

  // -----------------------------
  // Apply chat to all existing messages and observe new ones
  // -----------------------------
  const chatContainer = document.querySelector("#chat");
  if (chatContainer) {
    chatContainer.querySelectorAll("li.chat-message").forEach(applyCustomChat);

    new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node instanceof HTMLElement && node.classList.contains("chat-message")) {
            applyCustomChat(node);
          }
        }
      }
    }).observe(chatContainer, { childList: true });
  }
};
