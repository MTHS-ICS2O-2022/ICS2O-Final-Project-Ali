/* global phaser */
// Copyright (c) 2020 Ali Mugamai All rights reserved
//
// Created by: Ali Mugamai
// Created on: NOV 2022
// This file contains the JS functions for index.html

import MenuScene from "./menuScene.js";
import GameScene from "./gameScene.js";

const menuScene = new MenuScene();
const gameScene = new GameScene();

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
game.scene.add("gameScene", gameScene);

game.scene.start("menuScene");
