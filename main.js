import { images } from "./image.js"
import { Song } from "./song.js"

const GAME_MAINMENU = 1
const GAME_SETTINGS = 2
const GAME_PLAYLIST = 3
const GAME_PLAYING  = 4
const GAME_EXIT     = 5

let gameState = GAME_MAINMENU
let option = 1

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

let menu_option_pos_y = 270

images.logo.filter = LINEAR

function showOption(option_number, message) {
    
    let factor = 220 + (50 * option_number);

    menu_option_pos_y = lerp(menu_option_pos_y, factor, 0.13);
    Print(message, 20 * option_number, menu_option_pos_y, 1.25, Color.new(255, 255, 255, 128));

}

const OPTION_PLAY      = "JOGAR";
const OPTION_CONFIGURE = "CONFIGURAR";
const OPTION_EXIT      = "SAIR";

const MUSIC_LIST = {
    "GAME-TIME": {"name": "Game Time", "index": 1},
    "SKY-HIGH": {"name": "Sky High", "index": 2},
    "STRONGER(RAIKO REMIX)": {"name": "Stronger (Raiko Remix)", "index": 3},
    "WHY-WE-LOSE": {"name": "Why We Lose", "index": 4},
}

let song = new Song()
//song.Play(MUSIC_LIST["WHY-WE-LOSE"])

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

    Print("JOGAR", 20, option == 1 ? menu_option_pos_y : 270, 1.25,       Color.new(255, 255, 255, 64))
    Print("CONFIGURAR", 40, option == 2 ? menu_option_pos_y : 320, 1.25,  Color.new(255, 255, 255, 64))
    Print("SAIR", 60, option == 3 ? menu_option_pos_y : 370, 1.25,        Color.new(255, 255, 255, 64))

    const options = {
        1: () => showOption(option, "JOGAR"),
        2: () => showOption(option, "CONFIGURAR"),
        3: () => showOption(option, "SAIR")
    };

    if (option > 3) {
        option = 1;
    }
    
    options[option]();

    if (Pads.check(pad, Pads.CROSS) && !Pads.check(oldpad, Pads.CROSS)) {

        switch (option) {
            case 1:
                gameState = GAME_PLAYING
                option = 1
                menu_option_pos_y = 270
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

function game_playing() {

    images.cross.draw(598, 406)
    images.circle.draw(556, 406)
    images.down.draw(514, 406)
    images.up.draw(472, 406)
    images.logo.draw(25, 50)
    
    if (Pads.check(pad, Pads.CIRCLE) && !Pads.check(oldpad, Pads.CIRCLE)) {
        gameState = GAME_MAINMENU
        option = 1
        menu_option_pos_y = 270
    }

    if (Pads.check(pad, Pads.UP) && !Pads.check(oldpad, Pads.UP)) {
        option--
        if (option < 1) option = 4
    }

    if (Pads.check(pad, Pads.DOWN) && !Pads.check(oldpad, Pads.DOWN)) {
        option++
        if (option > 4) option = 1
    }
    
    var i = 0;
    for (const name in MUSIC_LIST) {
        i++
        if (option == i) {
            showOption(option, name)
        } 
        else {
            Print(name, 20 * i, 220 + (i * 50), 1.25, Color.new(255, 255, 255, 64))
        }
    }
}

while (1) {
    Screen.clear()

    oldpad = pad
    pad = Pads.get()
    Draw.rect(0, 0, 640, 448, Color.new(194, 0, 0))

    //console.log(gameState)

    if (gameState == GAME_MAINMENU) {

        main_menu();

    }
    else if (gameState == GAME_PLAYING) {

        game_playing()
    }

    Screen.flip()
}
