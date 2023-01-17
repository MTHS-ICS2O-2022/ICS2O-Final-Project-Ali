/* global phaser */
// Copyright (c) 2020 Ali Mugamai All rights reserved
//
// Created by: Ali Mugamai
// Created on: NOV 2022
// This file contains the JS functions for index.html

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "gameScene" });

    this.background = null;
    this.player1 = null;
    this.player2 = null;
    this.fireMissle = false;
    this.score = 0;
    this.scoreText = null;
    this.scoreTextStyle = {
      font: "65px Arial",
      fill: "#ffffff",
      align: "center",
    };
    this.gameOverTextStyle = {
      font: "65px Arial",
      fill: "#ff0000",
      align: "center",
    };
  }

  init(data) {
    this.cameras.main.setBackgroundColor("ffffff");
  }

  preload() {
    console.log("Game Scene");

    this.load.image("starBackground", "./assets/river_fighting_scene.jpg");
    this.load.image("blue", "./assets/player_1.png");
    this.load.image("red", "./assets/player_2.png");
    this.load.image("missile", "./assets/blue_laser.png");
    // sound
    this.load.audio("laser", "./assets/laser1.wav");
    this.load.audio("explosion", "./assets/barrelExploding.wav");
    this.load.audio("bomb", "./assets/bomb.wav");
  }

  create(data) {
    this.background = this.add.image(0, 0, "starBackground").setScale(2.0);
    this.background.setOrigin(0, 0);

    this.scoreText = this.add.text(
      10,
      10,
      "Score: " + this.score.toString(),
      this.scoreTextStyle
    );

    this.player1 = this.physics.add.sprite(1920 / 2, 1080 - 100, "blue");
    this.player2 = this.physics.add.sprite(1920 / 2, 1080 - 100, "red");

    this.missileGroup = this.physics.add.group();

    this.physics.add.collider(
      this.missileGroup,
      this.player1,
      function (player1Collide, missileCollide) {
        this.sound.play("bomb");
        this.physics.pause();
        missileCollide.destroy();
        player1Collide.destroy();
        this.gameOverText = this.add
          .text(
            1920 / 2,
            1080 / 2,
            "Game Over! Player 2 wins!! \nClick to play again.",
            this.gameOverTextStyle
          )
          .setOrigin(0.5);
        this.gameOverText.setInteractive({ useHandCursor: true });
        this.gameOverText.on("pointerdown", () =>
          this.scene.start("menuScene")
        );
      }.bind(this)
    );

    this.physics.add.collider(
      this.missileGroup,
      this.player2,
      function (player2Collide, missileCollide) {
        this.sound.play("bomb");
        this.physics.pause();
        missileCollide.destroy();
        player2Collide.destroy();
        this.gameOverText = this.add
          .text(
            1920 / 2,
            1080 / 2,
            "Game Over! Player 1 wins!! \nClick to play again.",
            this.gameOverTextStyle
          )
          .setOrigin(0.5);
        this.gameOverText.setInteractive({ useHandCursor: true });
        this.gameOverText.on("pointerdown", () =>
          this.scene.start("menuScene")
        );
      }.bind(this)
    );
  }

  update(time, delta) {
    const keyLeftObj = this.input.keyboard.addKey("LEFT");
    const keyRightObj = this.input.keyboard.addKey("RIGHT");
    const keyDownObj = this.input.keyboard.addKey("DOWN");

    const keyAObj = this.input.keyboard.addKey("A");
    const keyDObj = this.input.keyboard.addKey("D");
    const keySObj = this.input.keyboard.addKey("S");

    if (keyLeftObj.isDown === true) {
      this.player1.x -= 15;
      if (this.player1.x < 0) {
        this.player1.x = 0;
      }
    }
    if (keyRightObj.isDown === true) {
      this.player1.x += 15;
      if (this.player1.x > 1920) {
        this.player1.x = 1920;
      }
    }

    if (keyDownObj.isDown === true) {
      if (this.firemissile === false) {
        this.firemissile = true;
        const aNewMissile = this.physics.add.sprite(
          this.player1.x,
          this.player1.y,
          "missile"
        );
        this.missileGroup.add(aNewMissile);
        this.sound.play("laser");
      }
    }

    if (keyDownObj.isUp === true) {
      this.firemissile = false;
    }

    this.missileGroup.children.each(function (item) {
      item.y = item.y - 15;
      if (item.y < 0) {
        item.destroy();
      }
    });

    //player 2 controls

    if (keyAObj.isDown === true) {
      this.player2.x -= 15;
      if (this.player2.x < 0) {
        this.player2.x = 0;
      }
    }
    if (keyDObj.isDown === true) {
      this.player2.x += 15;
      if (this.player2.x > 1920) {
        this.player2.x = 1920;
      }
    }

    if (keyDownObj.isDown === true) {
      if (this.firemissile === false) {
        this.firemissile = true;
        const aNewMissile = this.physics.add.sprite(
          this.player2.x,
          this.player2.y,
          "missile"
        );
        this.missileGroup.add(aNewMissile);
        this.sound.play("laser");
      }
    }

    if (keySObj.isUp === true) {
      this.firemissile = false;
    }

    this.missileGroup.children.each(function (item) {
      item.y = item.y - 15;
      if (item.y < 0) {
        item.destroy();
      }
    });
  }
}

export default GameScene;
