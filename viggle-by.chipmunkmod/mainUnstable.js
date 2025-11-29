// @ts-check

export default () => {
  globalThis.customEvents.on('gameLoaded', () => {
    const chatContainer = document.getElementById('chat-messages')
    if (!chatContainer) return

    // Keep original addMessage function
    const originalAddMessage = chatContainer.addMessage?.bind(chatContainer)
    if (!originalAddMessage) return

    // Override addMessage
    chatContainer.addMessage = (username, message) => {
      const formatted = document.createElement('span')

      // Build the clickable "ZEN" prefix
      const prefix = document.createElement('span')
      prefix.innerHTML = `<span style="color:#3B82F6">Z</span><span style="color:#726CF7">E</span><span style="color:#A855F7">N</span>`
      prefix.style.cursor = 'pointer'
      prefix.title = 'Click to go to my Website :3'
      prefix.onclick = () => window.open('https://zenzoya.netlify.app/', '_blank')
      formatted.appendChild(prefix)

      // Username
      const userSpan = document.createElement('span')
      userSpan.textContent = ` ${username} › `
      userSpan.style.color = '#726CF7'
      formatted.appendChild(userSpan)

      // Message with copy on click
      const msgSpan = document.createElement('span')
      msgSpan.textContent = message
      msgSpan.style.color = '#C8E6EA'
      msgSpan.style.cursor = 'pointer'
      msgSpan.title = 'Click to Copy message to Clipboard!'
      msgSpan.onclick = () => navigator.clipboard.writeText(message)
      formatted.appendChild(msgSpan)

      // Call original addMessage with formatted content
      originalAddMessage(formatted)
    }
  })
}