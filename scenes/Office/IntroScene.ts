import { GameObjects, Tweens } from 'phaser'

import { introContent } from './data/content'
import BaseScene from './BaseScene'
import { COLORS, FONTS, SCENES } from './types'
import { convert0xStringTo0xNumber } from './utils'

export default class IntroScene extends BaseScene {
  graphics!: Record<string, GameObjects.Image | GameObjects.Text>
  timeline!: Tweens.Timeline
  constructor() {
    super(SCENES.INTRO)
  }
  create() {
    super.create()
    this.cameras.main.fadeIn(2000, 0, 0, 0)

    this.graphics = this.createGraphics()
    this.timeline = this.createTimeline()

    this.input.keyboard.on('keydown-ENTER', () => {
      this.scene.start(SCENES.GAME)
    })
  }
  createGraphics() {
    // Logo
    const logo = this.add
      .image(this.sceneCenter[0], this.sceneCenter[1], 'dept-logo')
      .setOrigin(0.5, 0.5)

    // Credits
    const subtitle = this.add
      .text(this.sceneCenter[0], this.sceneCenter[1] + 60, introContent.subtitle, {
        fontFamily: FONTS.GAME,
        fontSize: '24px',
      })
      .setAlpha(0)
      .setTint(convert0xStringTo0xNumber(COLORS.GRAY))
      .setOrigin(0.5, 1)

    // Title
    const title = this.add
      .text(this.sceneCenter[0], this.sceneCenter[1] + 35, introContent.title_multiline, {
        fontFamily: FONTS.GAME,
        fontSize: '30px',
      })
      .setAlpha(0)
      .setTint(convert0xStringTo0xNumber(COLORS.PINK))
      .setOrigin(0.5, 1)
      .setLineSpacing(20)

    // Skull and crossbones
    const skull = this.add
      .image(this.sceneCenter[0], this.sceneCenter[1] + 125, 'skull')
      .setAlpha(0)
      .setOrigin(0.5, 0.5)
      .setScale(0.75)

    // Button
    const startGame = this.add
      .text(this.sceneCenter[0], this.sceneCenter[1] + 250, introContent.dismiss, {
        fontFamily: FONTS.GAME,
        fontSize: '24px',
      })
      .setAlpha(0)
      .setOrigin(0.5, 1)
      .setTint(convert0xStringTo0xNumber(COLORS.YELLOW))
      .setInteractive()
      .on('pointerover', () => startGame.setTint(convert0xStringTo0xNumber(COLORS.GREEN)))
      .on('pointerout', () => startGame.setTint(convert0xStringTo0xNumber(COLORS.YELLOW)))
      .on('pointerup', this.handleStartGame, this)

    return { logo, skull, startGame, subtitle, title }
  }
  createTimeline() {
    const { logo, skull, startGame, subtitle, title } = this.graphics
    return this.tweens.timeline({
      tweens: [
        // Move move upward
        {
          delay: 1000,
          duration: 500,
          ease: 'Power1',
          targets: logo,
          y: '-=50',
        },
        // Fade in credits
        {
          alpha: 1,
          duration: 500,
          ease: 'Power1',
          offset: '-=250',
          targets: subtitle,
        },
        // Fade out logo and credits
        {
          alpha: 0,
          delay: 1500,
          duration: 500,
          ease: 'Power1',
          targets: logo,
        },
        {
          alpha: 0,
          duration: 500,
          ease: 'Power1',
          offset: '-=500',
          targets: subtitle,
        },
        // Instantly place logo and credits higher
        {
          alpha: 0,

          duration: 0,
          ease: 'Power1',
          targets: logo,
          y: '-=150',
        },
        {
          alpha: 0,
          duration: 500,
          ease: 'Power1',
          targets: subtitle,
          y: '-=150',
        },
        //  Fade things back in
        {
          alpha: 1,
          duration: 1000,
          ease: 'Power1',
          targets: logo,
        },
        {
          alpha: 1,
          duration: 1000,
          ease: 'Power1',
          offset: '-=1000',
          targets: subtitle,
        },
        {
          alpha: 1,
          duration: 1000,
          ease: 'Power1',
          offset: '-=1000',
          targets: title,
        },
        {
          alpha: 1,
          duration: 1000,
          ease: 'Power1',
          offset: '-=1000',
          targets: skull,
        },
        // Fade in start button and pulse
        {
          alpha: 1,
          duration: 1000,
          ease: 'Power1',
          offset: '-=1000',
          targets: startGame,
          onComplete: () => {
            this.tweens.add({
              alpha: 0.25,
              duration: 500,
              repeat: -1,
              targets: startGame,
              yoyo: true,
            })
          },
        },
      ],
    })
  }
  handleStartGame() {
    this.cameras.main.fadeOut(1000, 0, 0, 0)
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start(SCENES.GAME)
    })
  }
}
