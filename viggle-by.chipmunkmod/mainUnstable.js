// @ts-check

export default () => {
  globalThis.customEvents.on('gameLoaded', () => {
    const bot = globalThis.bot
    if (!bot) return

    // Listen to chat messages
    bot.on('chat', (data) => {
      const { username, message } = data

      // Create a div for the custom chat message
      const msgDiv = document.createElement('div')
      msgDiv.className = 'chat-message'
      msgDiv.style.display = 'flex'
      msgDiv.style.alignItems = 'center'
      msgDiv.style.marginBottom = '2px'
      msgDiv.style.fontFamily = 'inherit'
      msgDiv.style.fontSize = '14px'

      // ZEN clickable prefix
      const prefix = document.createElement('span')
      prefix.innerHTML = `<span style="color:#3B82F6">Z</span><span style="color:#726CF7">E</span><span style="color:#A855F7">N</span>`
      prefix.style.cursor = 'pointer'
      prefix.title = 'Click to go to my Website :3'
      prefix.onclick = () => window.open('https://zenzoya.netlify.app/', '_blank')
      msgDiv.appendChild(prefix)

      // Username
      const userSpan = document.createElement('span')
      userSpan.textContent = ` ${username} › `
      userSpan.style.color = '#726CF7'
      msgDiv.appendChild(userSpan)

      // Message with copy-on-click
      const messageSpan = document.createElement('span')
      messageSpan.textContent = message
      messageSpan.style.color = '#C8E6EA'
      messageSpan.style.cursor = 'pointer'
      messageSpan.title = 'Click to copy message to clipboard'
      messageSpan.onclick = () => navigator.clipboard.writeText(message)
      msgDiv.appendChild(messageSpan)

      // Append to chat container
      const chatContainer = document.querySelector('.chat-container')
      if (chatContainer) {
        chatContainer.appendChild(msgDiv)
        chatContainer.scrollTop = chatContainer.scrollHeight
      }
    })
  })
}
