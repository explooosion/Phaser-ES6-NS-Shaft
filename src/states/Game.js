/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import Wall from '../sprites/Wall'
import Ceiling from '../sprites/Ceiling'
import Platform from '../sprites/Platform'

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.player = new Player({
      game: this.game,
      x: 200,
      y: 200,
      asset: 'player',
    })

    this.leftWall = new Wall({
      game: this.game,
      x: 0,
      y: 0,
      asset: 'wall'
    })

    this.rightWall = new Wall({
      game: this.game,
      x: 383,
      y: 0,
      asset: 'wall'
    })

    this.ceiling = new Ceiling({
      game: this.game,
      x: 0,
      y: 0,
      asset: 'ceiling'
    })

    this.platforms = []
    this.platforms.push(new Platform({
      game: this.game,
      x: 200,
      y: 240,
      asset: 'normal'
    }))

    this.platforms.push(new Platform({
      game: this.game,
      x: Math.floor(Math.random() * 200) + 1,
      y: Math.floor(Math.random() * 400) + 100,
      asset: 'normal'
    }))

  }

  update() {
    this.game.physics.arcade.collide(this.player, [this.leftWall, this.rightWall])
    this.game.physics.arcade.collide(this.player, this.platforms)
  }

  render() {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }

  cursors(e) {
    console.log(e)
  }
}