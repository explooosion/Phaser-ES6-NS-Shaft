import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor({
        game,
        x,
        y,
        asset,
    }) {
        super(game, x, y, asset)

        this.game.physics.arcade.enable(this)
        this.body.immovable = true

        /** Only Check Top */
        this.body.checkCollision.down = false
        this.body.checkCollision.left = false
        this.body.checkCollision.right = false

        switch (this.key) {
            case 'normal':
                break
            case 'conveyorLeft':
                this.animations.add('scroll', [0, 1, 2, 3], 16, true)
                this.play('scroll')
                break
            case 'conveyorRight':
                this.animations.add('scroll', [0, 1, 2, 3], 16, true)
                this.play('scroll')
                break
            case 'trampoline':
                this.animations.add('jump', [4, 5, 4, 3, 2, 1, 0, 1, 2, 3], 120)
                this.frame = 3;
                break
            case 'nails':
                this.body.setSize(96, 15, 0, 15)
                break
            case 'fake':
                this.animations.add('turn', [1, 2, 3, 4, 5, 0])
                break
        }

        this.game.add.existing(this)
    }

    update() {

        this.body.y -= 1

        if (this.body.y < 0) {
            /** Auto Destroy In Group */
            this.destroy()
        }
    }
}