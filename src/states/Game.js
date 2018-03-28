/* globals __DEV__ */
import Phaser from 'phaser'
import Factory from '../factory'

export default class extends Phaser.State {
  init() {
    this.lastTime = 0
    this.distance = 0
    this.status = 'running'
  }

  preload() {}

  create() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.factory = new Factory(this)
    this.factory.createPlayer()
    this.factory.createWorld()
    this.factory.createPlatforms()
    this.factory.createText()
    this.factory.createSound()
  }

  update() {

    if (this.status === 'gameOver' && this.player.keyboard.enter.isDown) this.restart()
    if (this.status !== 'running') return

    this.game.physics.arcade.collide(this.player, [this.leftWall, this.rightWall])
    this.game.physics.arcade.collide(this.player, this.platforms, this.effectPlatforms.bind(this))

    this.checkTouchCeiling()
    this.checkGameOver()

    this.factory.createPlatforms()
    this.health.setText(`Life:${this.player.life}`)
    this.floor.setText(`B${this.distance}`)
  }

  render() {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }

  cursors(e) {
    console.log(e)
  }

  effectPlatforms(player, platform) {
    // console.log(platform.key)
    switch (platform.key) {
      case 'conveyorLeft':
        if (player.touchOn !== platform) {
          this.conveyorSound.play()
          player.touchOn = platform
        }
        player.body.x -= 2
        break
      case 'conveyorRight':
        if (player.touchOn !== platform) {
          this.conveyorSound.play()
          player.touchOn = platform
        }
        player.body.x += 2
        break
      case 'trampoline':
        this.jumpSound.play()
        player.body.velocity.y = -350
        platform.play('jump')
        break
      case 'nails':
        if (player.touchOn !== platform) {
          this.hitSound.play()
          player.life -= 1;
          player.touchOn = platform
          this.game.camera.flash(0xff0000, 100);
        }
        break
      case 'normal':
        if (player.touchOn !== platform) {
          this.stepSound.play()
          if (player.life < 10) {
            player.life += 1
          }
          player.touchOn = platform
        }
        break
      case 'fake':
        if (player.touchOn !== platform) {
          this.fakeSound.play()
          setTimeout(function () {
            platform.play('turn')
            platform.body.checkCollision.up = false
          }, 100)
          player.touchOn = platform
        }
        break
    }
  }

  checkTouchCeiling() {
    if (this.player.body.y < 0) {
      if (this.game.time.now > this.player.unbeatableTime) {
        this.player.body.velocity.y = 0
        this.hitSound.play()
        this.player.life -= 3
        this.game.camera.flash(0xff0000, 100)
        this.player.unbeatableTime = this.game.time.now + 600
      }
    }
  }

  checkGameOver() {
    if (this.player.body.y > 450 || this.player.life <= 0) {
      this.deadSound.play()
      this.platforms.removeAll()
      this.gameover.visible = true
      this.status = 'gameOver'
    }
  }

  restart() {
    this.gameover.visible = false
    this.distance = 0
    this.player.destroy()
    this.factory.createPlayer()
    this.factory.createPlatforms()
    this.status = 'running'
  }
}