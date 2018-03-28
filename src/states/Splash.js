import Phaser from 'phaser'
import {
  centerGameObjects
} from '../utils'

export default class extends Phaser.State {
  init() {}

  loadSpritesheet() {
    this.load.spritesheet('player', 'assets/images/player.png', 32, 32)
    this.load.spritesheet('conveyorRight', 'assets/images/conveyor_right.png', 96, 16);
    this.load.spritesheet('conveyorLeft', 'assets/images/conveyor_left.png', 96, 16);
    this.load.spritesheet('trampoline', 'assets/images/trampoline.png', 96, 22);
    this.load.spritesheet('fake', 'assets/images/fake.png', 96, 36);
  }

  loadImage() {
    this.load.image('wall', 'assets/images/wall.png')
    this.load.image('ceiling', 'assets/images/ceiling.png')
    this.load.image('normal', 'assets/images/normal.png');
    this.load.image('nails', 'assets/images/nails.png');
  }

  loadSound() {
    this.load.audio('hit', 'assets/sounds/hit.wav');
    this.load.audio('jump', 'assets/sounds/jump.ogg');
    this.load.audio('dead', 'assets/sounds/dead.mp3');
    this.load.audio('step', 'assets/sounds/step.mp3');
    this.load.audio('fake', 'assets/sounds/fake.mp3');
    this.load.audio('conveyor', 'assets/sounds/conveyor.mp3');
  }

  preload() {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)

    this.load.crossOrigin = 'anonymous'

    this.loadImage()
    this.loadSpritesheet()
    this.loadSound()

  }

  create() {
    this.state.start('Game')
  }
}