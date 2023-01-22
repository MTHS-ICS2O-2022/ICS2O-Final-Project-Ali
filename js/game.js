/* global phaser */
// Copyright (c) 2023 Ali Mugamai All rights reserved
//
// Created by: Ali Mugamai
// Created on: JAN 2023
// This file contains the JS functions for index.html

import startScene from "./startScene.js";
import GameScene from "./gameScene.js";
import MenuScene from "./menuScene.js";

const startScene = new startScene();
const gameScene = new GameScene();
const menuScene = new MenuScene();

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  // set background colour //
  backgroundColor: 0x5f6e7a,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

const game = new Phaser.Game(config);

game.scene.add("menuScene", menuScene);
game.scene.add("startScene", startScene);

game.scene.start("startScene");
