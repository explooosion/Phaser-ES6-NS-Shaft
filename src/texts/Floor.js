import Phaser from 'phaser'

export default class extends Phaser.Text {
    constructor({
        game,
        x,
        y,
        text,
        style
    }) {
        super(game, x, y, text, style)
        this.game.add.existing(this)
    }

    update() {

    }
}