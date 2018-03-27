import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor({
        game,
        x,
        y,
        asset
    }) {
        super(game, x, y, asset)

        this.game.add.existing(this)
        this.game.physics.arcade.enable(this)
        this.body.gravity.y = 500

        this.animations.add('left', [0, 1, 2, 3], 6)
        this.animations.add('right', [9, 10, 11, 12], 6)
        this.frame = 8

        this.keyboard = this.game.input.keyboard.addKeys({
            'up': Phaser.Keyboard.UP,
            'down': Phaser.Keyboard.DOWN,
            'left': Phaser.Keyboard.LEFT,
            'right': Phaser.Keyboard.RIGHT
        })
    }

    update() {
        if (this.keyboard.left.isDown) {
            this.body.velocity.x = -200;
            this.animations.play('left');
        } else if (this.keyboard.right.isDown) {
            this.body.velocity.x = 200;
            this.animations.play('right');
        } else {
            this.body.velocity.x = 0;
            this.frame = 8
        }
    }
}