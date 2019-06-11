var Container = PIXI.Container,
    AutoDetectRenderer = PIXI.autoDetectRenderer,
    Graphics = PIXI.Graphics,
    Text = PIXI.Text;


//Create the renderer
var renderer = AutoDetectRenderer(640, 500, {
    transparent: false
});
var stage = new Container();

var colorComb = {
    backgroundColor: 0x9b6a5a,
    boardColor: 0xd5c8b4,
    player1: 0xe3bf1e,
    player2: 0xc6362f,
    victory: 0x2d9a73

}

var gameSettings = {
    connect: 4,
    player1: 1,
    player2: 2,
    canPlay: true,
    active: "player1",
    gameStatus: "",
    playerWon: "",
    lowestUnfilledRow: 5
};

var board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];