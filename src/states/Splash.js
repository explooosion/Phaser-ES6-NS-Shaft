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

  preload() {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)

    this.load.crossOrigin = 'anonymous'

    this.loadImage()
    this.loadSpritesheet()

  }

  create() {
    this.state.start('Game')
  }
}