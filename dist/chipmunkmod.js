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
  // Custom chat
  // -----------------------------
  const linkify = (text) =>
    text.replace(/(https?:\/\/[^\s]+)/g, url =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color:#4ecdc4;">${url}</a>`);

  function applyCustomChat(el) {
    const username = el.dataset?.username || "Unknown";
    const message = el.textContent || "";

    el.innerHTML = "";

    const prefixSpan = document.createElement("span");
    prefixSpan.textContent = config.prefix;
    prefixSpan.style.color = config.prefixColor;
    prefixSpan.style.cursor = "pointer";
    prefixSpan.title = config.prefixHover;
    prefixSpan.onclick = () => window.open(config.prefixUrl, "_blank");

    const usernameSpan = document.createElement("span");
    usernameSpan.textContent = username;
    usernameSpan.style.color = config.usernameColor;
    usernameSpan.style.fontWeight = "600";

    const messageSpan = document.createElement("span");
    messageSpan.innerHTML = linkify(message);
    messageSpan.style.color = config.messageColor;
    messageSpan.style.cursor = "pointer";
    messageSpan.title = config.messageHover;
    messageSpan.onclick = () => navigator.clipboard.writeText(message);

    el.appendChild(prefixSpan);
    el.appendChild(document.createTextNode(" › "));
    el.appendChild(usernameSpan);
    el.appendChild(document.createTextNode(" › "));
    el.appendChild(messageSpan);
  }

  const chatContainer = document.querySelector("#chat");
  if (chatContainer) {
    chatContainer.querySelectorAll("li.chat-message").forEach(applyCustomChat);

    new MutationObserver(mutations => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node instanceof HTMLElement && node.classList.contains("chat-message")) {
            applyCustomChat(node);
          }
        }
      }
    }).observe(chatContainer, { childList: true });
  }

  // -----------------------------
  // Overhauled main menu
  // -----------------------------
  globalThis.customEvents?.on("gameLoaded", () => {
    const uiRoot = document.getElementById("ui-root");
    if (!uiRoot) return;

    // Remove default menu
    const oldMenu = document.getElementById("main-menu");
    if (oldMenu) oldMenu.remove();

    // Create new menu container
    const newMenu = document.createElement("div");
    newMenu.id = "main-menu";
    newMenu.style.position = "absolute";
    newMenu.style.top = "50%";
    newMenu.style.left = "50%";
    newMenu.style.transform = "translate(-50%, -50%)";
    newMenu.style.textAlign = "center";
    newMenu.style.color = "#A855F7";
    newMenu.style.fontFamily = "monospace";
    newMenu.style.fontSize = "24px";

    const title = document.createElement("h1");
    title.textContent = "ChipmunkMod Menu";
    title.style.color = "#3B82F6";
    newMenu.appendChild(title);

    // Only Singleplayer and Multiplayer buttons
    const buttons = [
      { text: "Singleplayer", onClick: () => globalThis.startSingleplayer?.() },
      { text: "Multiplayer", onClick: () => globalThis.startMultiplayer?.() },
    ];

    buttons.forEach(btn => {
      const b = document.createElement("button");
      b.textContent = btn.text;
      b.style.display = "block";
      b.style.margin = "10px auto";
      b.style.padding = "10px 20px";
      b.style.backgroundColor = "#726CF7";
      b.style.border = "none";
      b.style.color = "#fff";
      b.style.cursor = "pointer";
      b.onclick = btn.onClick;
      newMenu.appendChild(b);
    });

    uiRoot.appendChild(newMenu);
  });
};
