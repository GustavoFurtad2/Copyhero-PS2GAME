import {images} from "./images.js"

const GAME_PLAYING = 1

let GAME_STATE = GAME_PLAYING

let time = Timer.new()

let CHARTS = {
  "1": {"note": "green", "time": 1000, "active": true},
  "2": {"note": "green", "time": 1500, "active": true},
  "3": {"note": "red", "time": 1000, "active": true},
  "4": {"note": "red", "time": 1500, "active": true},
  "5": {"note": "green", "time": 2000, "active": true},
}

function NotesCheck() {
    for (var i = 1; i <= 5; i++) {
        let CHART = CHARTS[i]
        const timer = Timer.getTime(time)
        if (CHART.active == true && timer >= CHART.time) {
            images[CHART.note].width = 48 + ((timer - CHART.time) / 200)
            images[CHART.note].height = 18 + ((timer - CHART.time) / 200)
            if (CHART.note == "green") {

                images[CHART.note].draw(255 - ((timer - CHART.time) / 25), 145 + ((timer - CHART.time) / 10))
            }
            else if (CHART.note == "red") {
                images[CHART.note].draw(300 - ((timer - CHART.time) / 35), 145 + ((timer - CHART.time) / 10))

            }
        }
    }
}

while (1) {
    Screen.clear()
    if (GAME_STATE == GAME_PLAYING) {
       images.guitar.draw(120, 120)
       NotesCheck()
    }
    Screen.flip()
}
