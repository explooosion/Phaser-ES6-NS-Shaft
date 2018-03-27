/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'

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
    this.game.add.existing(this.player)

  }

  update() {

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