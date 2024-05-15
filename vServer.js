const config = {
    displayMotd: false, // Display the MOTD on player join
    displayJoin: false, // Display a message when a player joins a vServer
    displayLeave: false, // Display a message when a player leaves a vServer
    displaySelfJoin: false, // Display the join message for the player joining
    defaultLobbyId: "default", // The default lobby id, used for sending a player back to the default lobby
    globalChat: false, // Whether or not to enable chatting between vServers
}
const servers = {}

Game.systemMessages = false;
Game.vServers = servers;
Game.on("playerJoin", player => {
    if (config.displayMotd)
        player.message(Game.MOTD)

    player.setvServer = (server) => {
        server = server || config.defaultLobbyId

        // Remove player from previous vServer
        if (player.vServer) {
            let index = servers[player.vServer].players.indexOf(player)
            if (index > -1)
                servers[player.vServer].players.splice(index, 1)

            if (config.displayLeave)
                servers[player.vServer].players.forEach(p => p.message(`\\c6[SERVER]: \\c0${player.username} has left the server!`))
        }

        new PacketBuilder("RemovePlayer")
            .write("uint32", player.netId)
            .broadcastExcept([player])

        // Clear player list for player
        for (let sPlayer of Game.players) {
            if (sPlayer.netId == player.netId)
                continue
            new PacketBuilder("RemovePlayer")
                .write("uint32", sPlayer.netId)
                .send(player.socket)
        }

        if (servers[server]) {
            if (servers[server].players.length) {
                // Send player to other players in the server
                let p2 = new PacketBuilder("SendPlayers")
                    .write("uint8", 1)
                    .write("uint32", player.netId)
                    .write("string", player.username)
                    .write("uint32", player.userId)
                    .write("uint8", player.admin)
                    .write("uint8", player.membershipType)
                    .transformPacket()
                
                servers[server].players.forEach(p => {
                    if(!p.socket.destroyed)
                        p.socket.write(p2)
                })

                // Send other players to the player
                let p = new PacketBuilder("SendPlayers")
                    .write("uint8", servers[server].players.length)

                for (let sPlayer of servers[server].players) {
                    p.write("uint32", sPlayer.netId)
                        .write("string", sPlayer.username)
                        .write("uint32", sPlayer.userId)
                        .write("uint8", sPlayer.admin)
                        .write("uint8", sPlayer.membershipType)
                }

                p.send(player.socket)

                if (config.displayJoin)
                    servers[server].players.forEach(p => p.message(`\\c6[SERVER]: \\c0${player.username} has joined the server!`))
                if (config.displayJoin && config.displaySelfJoin)
                    player.message(`\\c6[SERVER]: \\c0${player.username} has joined the server!`)
            }

            player.vServer = server
            servers[server].players.push(player)
        } else {
            servers[server] = {
                players: [],
                shutdown: () => {
                    servers[server].players.forEach((p, i) => {
                        setTimeout(() => {
                            delete p.vServer
                            p.setvServer()
                        }, 10 * i); // fixes weird bug
                    })
                    delete servers[server]
                },
                id: server
            }

            if (config.displayJoin && config.displaySelfJoin)
                player.message(`\\c6[SERVER]: \\c0${player.username} has joined the server!`)

            player.vServer = server
            servers[server].players.push(player)
        }

        player._createFigures()
    }
})

Game.on("initialSpawn", player => {
    player.setvServer()
})

