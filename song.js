let songs = {
    "Game-Time": {
        "artist": "DEBRIS",
        "notes": {},
        "path": Sound.load("songs/Game-Time/song.wav")
    },
    "Sky-High": {
        "artist": "ELEKTRONOMIA",
        "notes": {},
        "path": Sound.load("songs/Sky-High/song.wav")
    },
    "Stronger(Raiko Remix)": {
        "artist": "PRISMO",
        "notes": {},
        "path": Sound.load("songs/Stronger-Raiko/song.wav")
    },
    "Why-We-Lose": {
        "artist": "CARTOON",
        "notes": {},
        "path": Sound.load("songs/Why-We-Lose/song.wav")
    },
}

export class Song {
   Play(song) {
     Sound.play(songs[song].path)
   }
}