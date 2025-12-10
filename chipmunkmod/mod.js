// @ts-check

/**
 * ChipmunkMod Chat Enhancer
 * Converts all <li class="chat-message"> into Minecraft-style "[ZEN] username › message"
 * ZEN is clickable, username colored, message clickable to copy
 */

interface ChipmunkModConfig {
  prefix: string;             // e.g. "[ZEN]"
  prefixColor: string;        // color of prefix
  usernameColor: string;      // color of username
  messageColor: string;       // color of message text
  prefixUrl: string;          // URL for prefix click
  prefixHover: string;        // tooltip for prefix hover
  messageHover: string;       // tooltip for message hover
}

const defaultConfig: ChipmunkModConfig = {
  prefix: "[ZEN]",
  prefixColor: "#726CF7",
  usernameColor: "#726CF7",
  messageColor: "#C8E6EA",
  prefixUrl: "https://zenzoya.netlify.app/",
  prefixHover: "Click to go to my Website :3",
  messageHover: "Click to copy message to clipboard!",
};

/**
 * Linkify URLs in message text
 * @param text string
 */
function linkify(text: string): string {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color:#4ecdc4;">${url}</a>`);
}

/**
 * Apply ChipmunkMod formatting to a single chat message element
 * @param el HTMLLIElement
 * @param config ChipmunkModConfig
 */
function applyCustomChat(el: HTMLLIElement, config: ChipmunkModConfig) {
  const username = el.dataset?.username || "Unknown";
  const message = el.textContent || "";

  // Clear old content
  el.innerHTML = "";

  // ZEN prefix
  const prefixSpan = document.createElement("span");
  prefixSpan.textContent = config.prefix;
  prefixSpan.style.color = config.prefixColor;
  prefixSpan.style.cursor = "pointer";
  prefixSpan.title = config.prefixHover;
  prefixSpan.onclick = () => window.open(config.prefixUrl, "_blank");

  // Username
  const usernameSpan = document.createElement("span");
  usernameSpan.textContent = username;
  usernameSpan.style.color = config.usernameColor;
  usernameSpan.style.fontWeight = "600";

  // Message
  const messageSpan = document.createElement("span");
  messageSpan.innerHTML = linkify(message);
  messageSpan.style.color = config.messageColor;
  messageSpan.style.cursor = "pointer";
  messageSpan.title = config.messageHover;
  messageSpan.onclick = () => navigator.clipboard.writeText(message);

  // Combine all parts
  el.appendChild(prefixSpan);
  el.appendChild(document.createTextNode(" › "));
  el.appendChild(usernameSpan);
  el.appendChild(document.createTextNode(" › "));
  el.appendChild(messageSpan);
}

/**
 * Initialize ChipmunkMod
 * @param config Partial<ChipmunkModConfig>
 */
export function initChipmunkMod(config?: Partial<ChipmunkModConfig>) {
  const finalConfig: ChipmunkModConfig = { ...defaultConfig, ...config };
  const chatContainer = document.querySelector("#chat");
  if (!chatContainer) {
    console.error("ChipmunkMod: chat container (#chat) not found!");
    return;
  }

  // Apply to existing messages
  chatContainer.querySelectorAll<HTMLLIElement>("li.chat-message").forEach((el) =>
    applyCustomChat(el, finalConfig)
  );

  // Observe new messages dynamically
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof HTMLLIElement)) continue;
        if (!node.classList.contains("chat-message")) continue;
        applyCustomChat(node, finalConfig);
      }
    }
  });

  observer.observe(chatContainer, { childList: true });

  console.log("ChipmunkMod initialized with prefix:", finalConfig.prefix);
}
