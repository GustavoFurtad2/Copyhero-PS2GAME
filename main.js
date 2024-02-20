import {images} from "./images.js"

const GAME_SELECTOR = 0
const GAME_PLAYING  = 1

let GAME_STATE = GAME_SELECTOR

let time = Timer.new()

let optionSelected = 1;
function Menu() {

}

function Playing() {
    images.guitar.draw(120, 120)
}

while (1) {
    Screen.clear()
    if (GAME_STATE == GAME_SELECTOR) {
       Menu()
    }
    else if (GAME_STATE == GAME_PLAYING) {
       Playing()
    }
    Screen.flip()
}
