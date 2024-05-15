const FindBrick = require("./FindBrick.js")
const vServer = require("./vServer.js")
const { playSound } = require("./heronsound/index.js")

let playerCount = 0;

let introOp = "https://www.dropbox.com/scl/fi/fb61cz4ifxurxkan6a1h3/OperatorINTRO.mp3?rlkey=4m22qr0ckitbz4b2kgupeupsg&st=va7gw9x0&dl=1"
let ambient = "https://www.dropbox.com/scl/fi/l0a7buvvs5yh11qr30j1r/ambient.mp3?rlkey=9al8j3pyy872mpkm2bupr18yx&st=r4r33h0i&dl=1"
let ambient2 = "https://www.dropbox.com/scl/fi/5yv30ud07zc6o7ban3wiz/ambient2.mp3?rlkey=vii433z490xdzd6k4mkrjfu6o&st=v32ztmgo&dl=1"
let first = "https://www.dropbox.com/scl/fi/io0n9gaqjjskoxv84yd4a/first.mp3?rlkey=5ehlbg1hrparvtvsmq8x77nft&st=vbzrzp7w&dl=1"

/*function loadSounds(){
    setImmediate(async () => {
        introOp = await new Game.Sound("https://www.dropbox.com/scl/fi/fb61cz4ifxurxkan6a1h3/OperatorINTRO.mp3?rlkey=4m22qr0ckitbz4b2kgupeupsg&st=va7gw9x0&dl=1")
            //.setVolume(0.75)
            .isLoop(false)
            .finalize()
        ambient = await new Game.Sound("https://www.dropbox.com/scl/fi/l0a7buvvs5yh11qr30j1r/ambient.mp3?rlkey=9al8j3pyy872mpkm2bupr18yx&st=r4r33h0i&dl=1")
            //.setVolume(0.75)
            .isLoop(true)
            .finalize()
        ambient2 = await new Game.Sound("https://www.dropbox.com/scl/fi/5yv30ud07zc6o7ban3wiz/ambient2.mp3?rlkey=vii433z490xdzd6k4mkrjfu6o&st=v32ztmgo&dl=1")
            //.setVolume(0.5)
            .isLoop(true)
            .finalize()
        Game.on("playerJoin", player => {
            player.on("audioReady", async () => {
                ambient.play(player)
            })
        })
    })
}*/

function introText(player){
    player.message("---------------------------------------------------------------------------------------")
    player.message("\\c5Operator: Hello Alpha 1-2, you are tasked with photographing the Points Of Interest, which can be found in the given map.")
    player.message("\\c5Please photograph them and return to base.")
    player.message("\\c5You can control your ship via the controls on the dashboard, the right hand side controls the forward and backward movement of the turbines,")
    player.message("\\c5whilst the left hand side controls the rotation of your sub.")

    setTimeout(() => {
        player.message("---------------------------------------------------------------------------------------")
        player.message("\\c6Roger that HQ, frequency 112.85, heading 0, current position 187,65. Engines nominal, APU nominal, Oxygen levels nominal. Alpha 1-2, reporting to duty.")
        playSound({url: first, isGlobal: false, isLoop: false}, player)
    }, 19500);
}
//loadSounds()

function init() {
    const light = FindBrick("light")
    light.lightEnabled = true
    light.setLightRange(100)
    light.setLightColor("#325444")

    const light2 = FindBrick("window")
    light2.lightEnabled = true
    light2.setLightRange(35)
    light2.setLightColor("#059c00")
}

init();

Game.command("done", (player, args) => {
    if (!player.isLoaded){
        playSound({url: introOp, isGlobal: false, isLoop: false}, player)
        playSound({url: ambient, isGlobal: false, isLoop: true}, player)
        introText(player)
        let intr = setInterval(() => {
            blood = player.blood
            blood2 = player.blood2
            blood3 = player.blood3
            blood.setPosition(new Vector3(blood.position.x, blood.position.y, blood.position.z+ 0.05))
            blood2.setPosition(new Vector3(blood2.position.x, blood2.position.y, blood2.position.z+ 0.05))
            blood3.setPosition(new Vector3(blood3.position.x, blood3.position.y, blood3.position.z+ 0.05))
            if (blood.position.z >= 16) {
                clearInterval(intr)
                player.isLoaded = true
                player.centerPrint("\\c5!CONTROLS UNLOCKED!", 5)
                playSound({url: ambient2, isGlobal: false, isLoop: true}, player)
            }
        }, 87.5)
    } 
})

Game.on("playerJoin", (player) => { 
    //if (![192719, 79218, 184808, 111056, 719702, 79048, 116340, 191464].includes(player.userId)){
    //    player.kick("GO AWAY")
    //}
    Game.messageAll(player.username + " has entered the sub.")
    player.isLoaded = false

    player.on("initialSpawn", async () => {
        player.setSpeed(1)
        player.setJumpPower(0)
        const b1 = new Brick(new Vector3(-50, -136.25, -1.5), new Vector3(100, 127.5, 6), "#059c00")
        const b2 = new Brick(new Vector3(-50, -136.25, -7.5), new Vector3(100, 127.5, 6), "#056900")
        const b3 = new Brick(new Vector3(-50, -136.25, -13.5), new Vector3(100, 127.5, 6), "#013300")
        player.blood = await player.newBrick(b1)
        player.blood2 = await player.newBrick(b2)
        player.blood3 = await player.newBrick(b3)
        setTimeout(() => {
            player.message("\\c7Welcome to Depths Unknown, it is RECOMMENDED to play with sound!")
            player.message("\\c7Once done, setting up sound, write '/done' in the chat. You can play the game without sound if you wish to.")
            
        }, 500)
        playerCount++
        player.setvServer("n" + playerCount)
    })
})

Game.on("chat", (player, message) => {
    //no messages sent, haha fuck you!
 })