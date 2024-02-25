import * as PIXI from "PIXI.js";
import { sound } from "@pixi/sound";
class Menu {
    constructor(app, player, laserArr, particlesArray, shapeArray, score) {
        this.music = sound.add("my-sound", "./app/resources/song2.mp3");
        this.gameStarted = false;
        this.gameLive = false;
        this.startMenu = this.startMenuText();
        this.startMenuOpen = true;
        this.gameOverMenu = this.gameOverMenuText();
        this.gameOverMenuOpen = false;
        app.stage.addChild(this.startMenu);
        addEventListener("mousedown", () => {
            if (!this.gameStarted) {
                this.musicStart();
                this.gameStarted = true;
                this.gameLive = true;
                this.startMenuOpen = false;
                app.stage.removeChild(this.startMenu);
            }
            else if (this.gameStarted) {
                if (!this.gameLive) {
                    this.musicStart();
                    app.stage.removeChild(this.gameOverMenu);
                    this.gameOverMenuOpen = false;
                    this.reset(player, laserArr, particlesArray, shapeArray, score);
                    this.gameLive = true;
                    app.stage.addChild(player.sprite);
                }
            }
        });
    }
    openGameOverMenu(app) {
        if (!this.gameOverMenuOpen) {
            this.gameOverMenuOpen = true;
            app.stage.addChild(this.gameOverMenu);
        }
    }
    reset(player, laserArr, particlesArray, shapeArray, score) {
        player.reset();
        laserArr.length = 0;
        particlesArray.length = 0;
        shapeArray.length = 0;
        score.reset();
    }
    startMenuText() {
        let menuContainer = new PIXI.Container();
        let title = new PIXI.Text("Geo Wars");
        title.anchor.set(0.5);
        title.x = 480;
        title.y = 160;
        title.style = {
            fill: "white",
            fontFamily: "Trebuchet MS",
            fontSize: 60,
        };
        let toStart = new PIXI.Text("Press to start");
        toStart.anchor.set(0.5);
        toStart.x = 480;
        toStart.y = 240;
        toStart.style = {
            fill: "white",
            fontFamily: "Trebuchet MS",
            fontSize: 40,
        };
        let buttonContainer = new PIXI.Container();
        let w = this.letter("W");
        let a = this.letter("A");
        let s = this.letter("S");
        let d = this.letter("D");
        let up = this.letter("UP", true);
        let left = this.letter("LEFT", true);
        let down = this.letter("DOWN", true);
        let right = this.letter("RIGHT", true);
        w.x = 355;
        w.y = 390;
        a.x = 295;
        a.y = 450;
        s.x = 355;
        s.y = 450;
        d.x = 415;
        d.y = 450;
        up.x = 555;
        up.y = 390;
        left.x = 495;
        left.y = 450;
        down.x = 555;
        down.y = 450;
        right.x = 615;
        right.y = 450;
        buttonContainer.addChild(w, a, s, d, up, down, left, right);
        buttonContainer.y = 0;
        menuContainer.addChild(title, toStart, buttonContainer);
        return menuContainer;
    }
    letter(text, arrow = false) {
        let container = new PIXI.Container();
        let box = new PIXI.Graphics();
        box.lineStyle(1.5, "white");
        box.drawRect(0, 0, 50, 50);
        box.x = 0;
        box.y = 0;
        let letter = new PIXI.Text(text);
        letter.style = {
            fill: "white",
            fontFamily: "Trebuchet MS",
            fontSize: 40,
        };
        letter.anchor.set(0.5);
        letter.x = 25;
        letter.y = 25;
        if (arrow) {
            letter.style = {
                fontSize: 15,
                fontFamily: "Trebuchet MS",
                fill: "white",
            };
            letter.anchor.set(0.5, 0.5);
            letter.x = 25;
            letter.y = 25;
        }
        container.addChild(box);
        container.addChild(letter);
        return container;
    }
    gameOverMenuText() {
        let menuContainer = new PIXI.Container();
        let title = new PIXI.Text("Game Over");
        title.anchor.set(0.5);
        title.x = 480;
        title.y = 280;
        title.style = {
            fill: "white",
            fontFamily: "VT323",
            fontSize: 60,
        };
        let toStart = new PIXI.Text("Press to start");
        toStart.anchor.set(0.5);
        toStart.x = 480;
        toStart.y = 360;
        toStart.style = {
            fill: "white",
            fontFamily: "VT323",
            fontSize: 40,
        };
        menuContainer.addChild(title, toStart);
        return menuContainer;
    }
    musicStop() {
        this.music.loop = false;
        this.music.volume -= 0.0025;
        if (this.music.volume < 0) {
            sound.stop("my-sound");
        }
    }
    musicStart() {
        sound.stop("my-sound");
        this.music.volume = 0.2;
        this.music.loop = true;
        sound.play("my-sound");
    }
}
export { Menu };
