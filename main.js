import { images } from "./image.js"
import { Song } from "./song.js"

const GAME_MAINMENU = 1
const GAME_SETTINGS = 2
const GAME_PLAYLIST = 3
const GAME_PLAYING = 4
const GAME_EXIT = 5

let gameState = GAME_MAINMENU
let option = 1

let font = new Font("assets/bold.otf")
font.scale = 1.5

let pad = Pads.get()
let oldpad = pad

function lerp(a, b, x) {
    return a + x * (b - a)
}

let fonts = {}
function Print(text, x, y, size, color) {
    if (fonts[size] == undefined) {

        fonts[size] = { "font": new Font("assets/bold.otf") }
        fonts[size].font.scale = size

        fonts[size].font.color = color
        fonts[size].font.print(x, y, text)
    } else {
        fonts[size].font.color = color
        fonts[size].font.print(x, y, text)
    }
}

let y = 270

let song = new Song()
song.Play("Why-We-Lose")
images.logo.filter = LINEAR

function set_message(option_number, message) {
    
    let factor = 220 + (50 * option_number);

    y = lerp(y, factor, 0.13);
    Print(message, 20 * option_number, y, 1.25, Color.new(255, 255, 255, 128));

}

const OPTION_PLAY = "JOGAR";
const OPTION_CONFIGURE = "CONFIGURAR";
const OPTION_EXIT = "SAIR";

function main_menu() {

    images.cross.draw(598, 406)
    images.down.draw(556, 406)
    images.up.draw(514, 406)
    images.logo.draw(25, 50)

    if (Pads.check(pad, Pads.UP) && !Pads.check(oldpad, Pads.UP)) {
        option--
        if (option <= 0) option = 3
    }

    if (Pads.check(pad, Pads.DOWN) && !Pads.check(oldpad, Pads.DOWN)) {
        option++
        if (option >= 4) option = 1
    }

    Print("JOGAR", 20, 270, 1.25,       Color.new(255, 255, 255, 64))
    Print("CONFIGURAR", 40, 320, 1.25,  Color.new(255, 255, 255, 64))
    Print("SAIR", 60, 370, 1.25,        Color.new(255, 255, 255, 64))

    const options = {
        1: () => set_message(option, "JOGAR"),
        2: () =>set_message(option, "CONFIGURAR"),
        3: () => set_message(option, "SAIR")
    };


    if (option > 3) {
        option = 1;
    }
    
    options[option]();

    if (Pads.check(pad, Pads.CROSS) && !Pads.check(oldpad, Pads.CROSS)) {

        switch (option) {
            case 1:
                gameState = GAME_PLAYING
                break
            case 2:
                gameState = GAME_SETTINGS
                break
            case 3:
                gameState = GAME_EXIT
                break
        }
    }
}

while (1) {
    Screen.clear()

    oldpad = pad
    pad = Pads.get()
    Draw.rect(0, 0, 640, 448, Color.new(194, 0, 0))

    console.log(gameState)


    if (gameState == GAME_MAINMENU) {

        main_menu();


    } else { // GAME_PLAYING

        images.cross.draw(598, 406)
        images.down.draw(556, 406)
        images.up.draw(514, 406)
        images.logo.draw(25, 50)
    }

    console.log(gameState + " " + GAME_PLAYING)
    Screen.flip()
}
