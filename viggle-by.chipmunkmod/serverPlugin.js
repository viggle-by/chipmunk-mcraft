// @ts-check

export const server = (server) => {
    console.log('Server plugin loaded')

    /**
     * Send a ZEN-style formatted chat message to all players
     * @param {string} username
     * @param {string} message
     */
    const sendCustomChat = (username, message) => {
        server.broadcastChat({
            translate: '[%s] %s › %s',
            with: [
                {
                    translate: '%s%s%s',
                    with: [
                        { color: '#3B82F6', text: 'Z', bold: false },
                        { color: '#726CF7', text: 'E', bold: false },
                        { color: '#A855F7', text: 'N', bold: false },
                    ],
                    clickEvent: {
                        action: 'open_url',
                        value: 'https://zenzoya.netlify.app/',
                    },
                    hoverEvent: {
                        action: 'show_text',
                        contents: [
                            {
                                color: '#726CF7',
                                text: 'Click to go to my Website :3',
                                underlined: true,
                            },
                        ],
                    },
                },
                { color: '#726CF7', selector: username },
                {
                    color: '#C8E6EA',
                    text: message,
                    clickEvent: { action: 'copy_to_clipboard', value: message },
                    hoverEvent: {
                        action: 'show_text',
                        contents: [
                            { color: '#726CF7', text: 'Click to copy message to clipboard!' },
                        ],
                    },
                },
            ],
        })
    }

    // Hook chat event
    server.on('chat', (player, message) => {
        sendCustomChat(player.username, message)
    })

    // arch linux
    server.on('playerJoin', (player) => {
        sendCustomChat('Server', `${player.username} uses arch btw`)
    })
}
