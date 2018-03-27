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
        this.body.immovable = true
    }

    update() {

        this.body.y -= 1
    }
}