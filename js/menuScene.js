/* global phaser */
// Copyright (c) 2023 Ali Mugamai All rights reserved
//
// Created by: Ali Mugamai
// Created on: JAN 2023
// This file contains the JS functions for index.html

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "menuScene" });

    this.menuSceneBackgroundImage = null;
    this.startButton = null;
  }
  /**
   *@param {object} data
   */
  Init(data) {
    this.cameras.main.setBackgroundColor("ffffff");
  }

  preload() {
    console.log("Menu Scene");
    this.load.image(
      "menuSceneBackground",
      "./assets/river_fighting_startscene.jpg"
    );
    this.load.image("startButton", "./assets/start_button.png");
  }

  create(data) {
    this.menuSceneBackgroundImage = this.add.sprite(
      0,
      0,
      "menuSceneBackground"
    );
    this.menuSceneBackgroundImage.x = 1920 / 2;
    this.menuSceneBackgroundImage.y = 1080 / 2;

    this.startButton = this.add.sprite(1920 / 2, 1080 / 2 + 100, "startButton");
    this.startButton.setInteractive({ useHandCursor: true });
    this.startButton.on("pointerdown", () => this.clickButton());
  }

  update(time, delta) {}

  clickButton() {
    this.scene.start("gameScene");
  }
}

export default MenuScene;
