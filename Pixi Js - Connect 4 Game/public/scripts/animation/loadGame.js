document.getElementById("gameContainer").appendChild(renderer.view);
//Create a container object called the `stage`
renderer.backgroundColor = colorComb.backgroundColor;

//Create and organize play board
for (var i = 6; i >= 0; i--) {
    for (var j = 5; j >= 0; j--) {
        var rectangle = new Graphics();
        rectangle.beginFill(colorComb.boardColor);
        rectangle.drawRect(110 + 60 * i, 80 + 55 * j, 50, 50);
        rectangle.endFill();
        rectangle.buttonMode = true;
        rectangle.interactive = true;
        rectangle.val = j + "-" + i;
        rectangle.on('mousedown', onRectClick);
        stage.addChild(rectangle);
    }
}

//Tell the `renderer` to `render` the `stage`
renderer.render(stage);

