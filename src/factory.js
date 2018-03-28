import Player from './sprites/Player'
import Wall from './sprites/Wall'
import Ceiling from './sprites/Ceiling'
import Platform from './sprites/Platform'
import Health from './texts/Health'
import GameOver from './texts/GameOver'
import Floor from './texts/Floor'

export default class Factory {

    constructor(state) {
        this.state = state
        this.game = this.state.game
        this.platforms = this.state.platforms
    }

    createPlatforms() {

        if (!this.platforms) {
            this.state.platforms = this.game.add.group()
            this.platforms = this.state.platforms
            this.platforms.add(new Platform({
                game: this.game,
                x: 200,
                y: 240,
                asset: 'normal',
            }))
        }

        if (this.game.time.now > this.state.lastTime + 1000) {
            this.state.lastTime = this.game.time.now
            const obj = Math.floor(Math.random() * 100)
            let objName = ''

            if (obj < 20) {
                objName = 'normal'
            } else if (obj < 30) {
                objName = 'conveyorLeft'
            } else if (obj < 40) {
                objName = 'conveyorRight'
            } else if (obj < 60) {
                objName = 'trampoline'
            } else if (obj < 80) {
                objName = 'nails'
            } else {
                objName = 'fake'
            }

            this.platforms.add(new Platform({
                game: this.game,
                x: Math.floor(Math.random() * (400 - 96 - 40) + 20),
                y: 400,
                asset: objName
            }))

            this.state.distance += 1
        }
    }

    createWorld() {
        this.state.leftWall = new Wall({
            game: this.game,
            x: 0,
            y: 0,
            asset: 'wall'
        })
        this.state.rightWall = new Wall({
            game: this.game,
            x: 383,
            y: 0,
            asset: 'wall'
        })
        this.state.ceiling = new Ceiling({
            game: this.game,
            x: 0,
            y: 0,
            asset: 'ceiling'
        })
    }

    createText() {
        this.state.health = new Health({
            game: this.game,
            x: 310,
            y: 15,
            text: '',
            style: {
                fill: '#ffff00',
                fontSize: '20px'
            }
        })
        this.state.gameover = new GameOver({
            game: this.game,
            x: 140,
            y: 200,
            text: 'Enter 重新開始',
            style: {
                fill: '#ff0000',
                fontSize: '20px'
            }
        })
        this.state.floor = new Floor({
            game: this.game,
            x: 20,
            y: 15,
            text: '',
            style: {
                fill: '#ff0000',
                fontSize: '20px'
            }
        })
    }

    createPlayer() {
        this.state.player = new Player({
            game: this.game,
            x: 200,
            y: 200,
            asset: 'player',
        })
    }

    createSound() {
        this.state.jumpSound = this.game.sound.add('jump')
        this.state.hitSound = this.game.sound.add('hit')
        this.state.deadSound = this.game.sound.add('dead')
        this.state.stepSound = this.game.sound.add('step')
        this.state.fakeSound = this.game.sound.add('fake')
        this.state.conveyorSound = this.game.sound.add('conveyor')
    }
}