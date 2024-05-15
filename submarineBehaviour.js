const FindBrick = require("./FindBrick.js")
const Vector2 = require("./Vector2.js")
const { playSound } = require("./heronsound/index.js")

let map = require("./map.js")

let POI = [new Vector2(145, 160), new Vector2(90, 65), new Vector2(45, 65), new Vector2(5, 12)]

const s = new Brick(new Vector3(3.85, 1.8, 5.9), new Vector3(0.5, 4, 3), "#000000")
async function spawnScreen(player){
    return await player.newBrick(s)
}

let bingo = "https://www.dropbox.com/scl/fi/issb18p4h9ih7wsld45k5/bingo.mp3?rlkey=l0for3gngas09w4yo3bxwgti7&st=qwvo35h5&dl=1";
let spooky = "https://www.dropbox.com/scl/fi/v7sakykmjjx86fz0vduu2/spooky1.mp3?rlkey=zh707tnpeubm1l3mdo2l1j1q0&st=87abbh3m&dl=1";
let spooky2 = "https://www.dropbox.com/scl/fi/74jss9ueifntxv5iz1n2i/spooky2.mp3?rlkey=mazjie3vdi6a7nqhs4zicf6m9&st=cp4rxguj&dl=1";
let dmg = "https://www.dropbox.com/scl/fi/urgsqisul05j9y0p25w59/dmg.mp3?rlkey=mzh7g1bzklapsode8ic56arh3&st=6x8pejin&dl=1";
let endSound = "https://www.dropbox.com/scl/fi/1lf9xw999c1c5cp3kq9r1/ending2.mp3?rlkey=cy6t3hpwj5tcwtg40w4lxhe1i&st=jt7ti0d5&dl=1";
let deathSound = "https://www.dropbox.com/scl/fi/gdw2phvsz5d9latn35d6d/death.mp3?rlkey=h7gng3j1dzr3wkqr94bfb3e4r&st=dfh1uiqf&dl=1";

let second = "https://www.dropbox.com/scl/fi/ixehnv6y5lut7bcjaak2a/secondvoiceEDITED.mp3?rlkey=58ntdodnccsjb905d2fkafhil&st=tqvn3e42&dl=1";
let third = "https://www.dropbox.com/scl/fi/x6jpxr3pdkcf8eicwm4ls/third.mp3?rlkey=g028zkql2ay7ycj1ekyohx6g3&st=65pgce38&dl=1";
let forth = "https://www.dropbox.com/scl/fi/b89jil0j5o1ys8bf6m48s/forth.mp3?rlkey=nkbc5x1ivv6sx6yef8empbs1f&st=brlnt5tv&dl=1";
let fifth = "https://www.dropbox.com/scl/fi/ufk15jw4a1nt207lahlf0/fifth.mp3?rlkey=m9tfad2dmryy6zx3fgow7dh5q&st=agmglwgg&dl=1";
let sixth = "https://www.dropbox.com/scl/fi/jtdwd9vsuwousqylmglgb/sixth.mp3?rlkey=kzlf6iuz4deuwjyw0u3eevc7x&st=rnp60g78&dl=1";
let last = "https://www.dropbox.com/scl/fi/wwge0ym9b0xe094kjxdc2/last.mp3?rlkey=anbupcv8vkbh3z2cql57tqggd&st=mp26lbzu&dl=1";
/*function loadSounds(){
    setImmediate(async () => {
        bingo = await new Game.Sound("https://www.dropbox.com/scl/fi/issb18p4h9ih7wsld45k5/bingo.mp3?rlkey=l0for3gngas09w4yo3bxwgti7&st=qwvo35h5&dl=1")
            //.setVolume(0.5)
            .isLoop(false)
            .finalize()
        spooky = await new Game.Sound("https://www.dropbox.com/scl/fi/v7sakykmjjx86fz0vduu2/spooky1.mp3?rlkey=zh707tnpeubm1l3mdo2l1j1q0&st=87abbh3m&dl=1")
            //.setVolume(0.75)
            .isLoop(false)
            .finalize()
        spooky2 = await new Game.Sound("https://www.dropbox.com/scl/fi/74jss9ueifntxv5iz1n2i/spooky2.mp3?rlkey=mazjie3vdi6a7nqhs4zicf6m9&st=cp4rxguj&dl=1")
            //.setVolume(0.5)
            .isLoop(false)
            .finalize()
        dmg = await new Game.Sound("https://www.dropbox.com/scl/fi/urgsqisul05j9y0p25w59/dmg.mp3?rlkey=mzh7g1bzklapsode8ic56arh3&st=6x8pejin&dl=1")
            //.setVolume(0.5)
            .isLoop(false)
            .finalize()
        endSound = await new Game.Sound("https://www.dropbox.com/scl/fi/1lf9xw999c1c5cp3kq9r1/ending2.mp3?rlkey=cy6t3hpwj5tcwtg40w4lxhe1i&st=jt7ti0d5&dl=1")
            //.setVolume(1)
            .isLoop(false)
            .finalize()
    })
}
loadSounds()*/

//DIALOGUE FUNCS
function dashLines(player){
    player.message("---------------------------------------------------------------------------------------")
}


function firstPOI(player){
    dashLines(player)
    playSound({url: second, isGlobal: false, isLoop: false}, player)
    player.message("\\c6HQ, this Alpha 1-2, it seems I have located the first POI, it seems to be a skull?")
    player.message("\\c6Seeming to belong to some sort of mammal? I will send over the image and sample details.")

    setTimeout(() => {
        dashLines(player)
        player.message("\\c5Operator: Alpha 1-2, image received and reviewed.")
        player.message("\\c5Yes it does seem to be some sort of skull belonging to a mammal, we will analyze the sample and try to synthesize it, you may continue with the next POIs.")

        setTimeout(() => {
            dashLines(player)
            playSound({url: third, isGlobal: false, isLoop: false}, player)
            player.message("\\c6Copy, moving out, Alpha 1-2.")
            setTimeout(() => {
                playSound({url: spooky, isGlobal: false, isLoop: false}, player)
            }, 1000);
        }, 11000);
    }, 12000);
}

function secondPOI(player){
    dashLines(player);
    playSound({url: forth, isGlobal: false, isLoop: false}, player)
    player.message("\\c6HQ, Alpha 1-2, second POI located, can\’t see much, but looks like a pair of cans?")
    player.message("\\c6I can make out some sort of inscription on them. Brick-Hill soda????? Do we know anything related to the name 'Brick-Hill'?")
    setTimeout(() => {
        dashLines(player)
        player.message("\\c5Operator: Alpha 1-2, unknown, never heard of 'Brick-Hill', neither does it show up on the database. We will analyze the can once you return.")
    }, 11000);
}

function thirdPOI(player){
    dashLines(player)
    playSound({url: fifth, isGlobal: false, isLoop: false}, player)
    player.message("\\c6HQ, Alpha 1-2, do you see this? I can\’t believe it, it\’s a human $%^!ing skull!")
    setTimeout(() => {
        dashLines(player)
        player.message("\\c5 S T A T I C  N O I S E")
        setTimeout(() => {
            dashLines(player)
            playSound({url: sixth, isGlobal: false, isLoop: false}, player)
            player.message("\\c6HQ, do you copy?")
            setTimeout(() => {
                player.message("\\c6Shoot, comms seem to be out. Let me check the computer. $%^!, the antennas are out, I guess I will have to go on my own from here on now..")
            }, 5000);
        }, 2000);
    }, 5000);
}

function fourthPOI(player){
    dashLines(player)
    playSound({url: last, isGlobal: false, isLoop: false}, player)
    player.message("\\c6WHAT THE HELL IS GOING ON?! It seems we have a leak, shoot, I need to get out immediately! Oh for god's sake, the ship can\’t rise anymore the hydraulic systems are down!")
    playSound({url: endSound, isGlobal: false, isLoop: false}, player)
}

function death(player){
    playSound({url: deathSound, isGlobal: false, isLoop: false}, player)
}
//LOCAL SHIT//

Game.on("playerJoin", async (player) => {
    player.order = 0
    player.POI = [0,0,0,0]
    player.posX = 187 //187
    player.posZ = 65 //65
    player.oldX = 187
    player.oldZ = 65
    player.srotation = 0
    player.subHealth = 100
    player.played = false
    player.screen = await spawnScreen(player)

    player.posCheck = function (){
        player.printS()
        if (player.posX < 0 || player.posX > 200) {
            player.posX = player.oldX
            player.hit()
            return
        }
        if (player.posZ < 0 || player.posZ > 200) {
            player.posZ = player.oldZ
            player.hit()
            return
        }
        if (map[player.posX][player.posZ] === 1){
            player.posX = player.oldX
            player.posZ = player.oldZ
            player.hit()
            return
        } 
        if (player.posX <= 90 && !player.played) {
            player.played = true
            playSound({url: spooky2, isGlobal: false, isLoop: false}, player)
        }
    }
    player.printS = function (){
        player.topPrint(`PosX: ${player.posX} | PosZ: ${player.posZ} | Rotation: ${player.srotation}`, 1000);
        player.bottomPrint(`Sub Health: ${player.subHealth} | POI[${player.POI[0]},${player.POI[1]},${player.POI[2]},${player.POI[3]}]`, 1000)
    }
    
    player.printS()
    player.hit = function () {
        
        player.subHealth -= 25
        console.log("TOOK DMG, hp: " + player.subHealth)
        player.centerPrint(`\\c6YOU TOOK DAMAGE`, 2)
        if (player.subHealth <= 0){
            console.log("YOU DIED")
            death(player)
            player.centerPrint(`\\c6YOU DIED`, 2)
            player.posX = 187
            player.posZ = 65
            player.srotation = 0
            player.subHealth = 100
            player.printS()
        } else {
            playSound({url: dmg, isGlobal: false, isLoop: false}, player)
            player.isLoaded = false
            setTimeout(() => {
                player.isLoaded = true
            }, 2500);
        }
    }
})

const left = FindBrick("left")
left.setClickable(true, 50)
left.clicked(debounce((player) => {
    if (player.isLoaded){
        player.srotation = player.srotation + 45
        if (player.srotation == 360){
            player.srotation = 0
        } else if (player.srotation > 360){
            player.srotation = 45
        }
        player.printS()
    }
}), 1500)

const right = FindBrick("right")
right.setClickable(true, 50)
right.clicked(debounce((player) => {
    if (player.isLoaded){
        player.srotation = player.srotation - 45
        if (player.srotation < 0){
            player.srotation = 315
        }
        player.printS()
    }
}), 1500)

const forward = FindBrick("forward")
forward.setClickable(true, 50)
forward.clicked(debounce((player) => {
    if (player.isLoaded){
        player.oldX = player.posX
        player.oldZ = player.posZ
        player.posX = player.posX + Math.round(Math.cos(player.srotation * Math.PI/180))
        player.posZ = player.posZ + Math.round(Math.sin(player.srotation * Math.PI/180))
        player.posCheck()
    }
}), 1500)

const backward = FindBrick("backward")
backward.setClickable(true, 50)
backward.clicked(debounce((player) => {
    if (player.isLoaded){
        player.oldX = player.posX
        player.oldZ = player.posZ
        player.posX = player.posX - Math.round(Math.cos(player.srotation * Math.PI/180))
        player.posZ = player.posZ - Math.round(Math.sin(player.srotation * Math.PI/180))
        player.posCheck()
    }
}), 1500)
const photo = FindBrick("photo")
photo.setClickable(true, 50)
photo.clicked(debounce(async (player) => {
    if (player.isLoaded){
        let gotit = false
        let end = false
        let AH = false
        for (let i = 0; i < 4; i++){
            if (player.posX == POI[i].x && player.posZ == POI[i].z){
                if (player.POI[i] === 0){
                    player.order+=1
                    switch (player.order) {
                        case 1:
                            firstPOI(player);
                            break;
                        case 2:
                            secondPOI(player);
                            break;
                        case 3:
                            thirdPOI(player);
                            break;
                        case 4:
                            const b1 = new Brick(new Vector3(-4, -8, -18), new Vector3(8, 16, 20), "#179c00")
                            const blood = await player.newBrick(b1)
                            blood.setCollision(false)
                            let intr = setInterval(() => {
                                blood.setPosition(new Vector3(blood.position.x, blood.position.y, blood.position.z+ 0.0125))
                                if (blood.position.z >= -17 && !end) {
                                    end = true
                                    fourthPOI(player)
                                }
                                if (blood.position.z >= -15 && !AH) {
                                    AH = true 
                                    player.message("\\c6I guess this is it.. I hope you don\’t miss me..")
                                }
                                if (blood.position.z >= -13) {
                                    clearInterval(intr)
                                    player.kick("CONNECTION TERMINATED")
                                }
                            }, 100)
                            break;
                    }
                }
                player.POI[i] = 1
                player.screen.lightEnabled = true
                player.screen.setColor("#ffffffff")
                bingo.play(player)
                player.screen.setLightRange(1000)
                player.screen.setLightColor("#ffffff")
                setTimeout(() => {
                    player.screen.setColor("#000000")
                    player.screen.setLightRange(0)
                    player.screen.setLightColor("#000000")
                    player.screen.lightEnabled = false
                }, 250)
                gotit = true
                break
            }
        }
        if (!gotit){
            player.screen.lightEnabled = true
            player.screen.setColor("#fc0303")
            player.screen.setLightRange(1000)
            player.screen.setLightColor("#fc0303")
            setTimeout(() => {
                player.screen.setColor("#000000")
                player.screen.setLightRange(0)
                player.screen.setLightColor("#000000")
                player.screen.lightEnabled = false
            }, 250)
        }
        player.printS()
    }
}), 2000)

