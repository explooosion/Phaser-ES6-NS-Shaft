/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Sky from '../sprites/Sky'
import Ground from '../sprites/Ground'

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.mushroom = new Mushroom({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom',
    })

    // this.game.add.existing(this.mushroom)

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