import { Cameras, GameObjects } from 'phaser'
import TagText from 'phaser3-rex-plugins/plugins/tagtext.js'

import outroAnims from './anims/outroAnims'
import { outroContent } from './data/content'
import BaseScene from './BaseScene'
import { COLORS, DEPTH, DIR, FONTS, SCENES } from './types'
import { convert0xStringTo0xNumber, convert0xStringToHexString, handleGameRedirect } from './utils'

import store from '@/stores/gameStore'

declare global {
  interface Window {
    SUPPORTS_TOUCH: boolean
  }
}

export default class OutroScene extends BaseScene {
  activeMenuIdx!: number
  isHovering!: boolean
  menuArrow!: GameObjects.Text
  menu: { scene: string | null; label: string }[]
  menuObjects: GameObjects.Text[]

  constructor() {
    super(SCENES.OUTRO)
    this.menu = [
      { scene: SCENES.GAME, label: outroContent.restart },
      { scene: null, label: outroContent.end },
    ]
    this.activeMenuIdx = 0
    this.isHovering = false
    this.menuObjects = []
  }
  create() {
    super.create()
    this.cameras.main.fadeIn(2000, 0, 0, 0)
    this.createGraphics()
    this.createKeyboardEvents()
    this.createMenu()
  }
  update(time: number, delta: number) {
    super.update(time, delta)
    if (window.SUPPORTS_TOUCH || this.isHovering) return
    this.menuObjects.forEach((menuObj, idx) => {
      if (idx === this.activeMenuIdx) {
        menuObj.setTint(convert0xStringTo0xNumber(COLORS.GREEN))
        this.menuArrow.setAlpha(1).setPosition(this.menuArrow.x, menuObj.y)
      } else {
        menuObj.setTint(convert0xStringTo0xNumber(COLORS.YELLOW))
      }
    })
  }
  createGraphics() {
    const { numberOfRetries } = store.getState()
    // Logo
    this.add
      .image(75, 50, 'dept-logo')
      .setDepth(DEPTH.DEPT_LOGO)
      .setOrigin(0, 0)
      .setScale(0.35)
      .setScrollFactor(0, 0)
      .setInteractive()
    // .on('pointerup', handleGameRedirect)

    // Skull
    this.add
      .image(this.sceneW - 75, 50, 'skull')
      .setDepth(10)
      .setOrigin(1, 0)
      .setScale(0.75)

    //  Results
    this.add.existing(
      new TagText(this, 75, 200, outroContent.title(numberOfRetries), {
        fontFamily: FONTS.GAME,
        fontSize: '30px',
        lineSpacing: 20,
        tags: { tag0: { color: convert0xStringToHexString(COLORS.PINK) } },
        wrap: { mode: 'word', width: 650 },
      })
    )

    // Animated "gif"
    const sippingGuy = this.add
      .sprite(this.sceneW, this.sceneH, 'sip')
      .setOrigin(1, 1)
      .setScale(0.5)
    outroAnims(sippingGuy.anims)
    sippingGuy.play('sip')
  }
  createKeyboardEvents() {
    this.input.keyboard.on('keydown-ENTER', () => {
      this.handlePlayScene(this.menu[this.activeMenuIdx].scene)
    })
    this.input.keyboard.on('keydown-TAB', () => {
      this.handleIncOrDecActiveMenuIdx(DIR.UP)
    })
    this.input.keyboard.on('keydown-DOWN', () => {
      this.handleIncOrDecActiveMenuIdx(DIR.DOWN)
    })
    this.input.keyboard.on('keydown-UP', () => {
      this.handleIncOrDecActiveMenuIdx(DIR.UP)
    })
  }
  createMenu() {
    this.menuArrow = this.add
      .text(75, 0, '»', { fontFamily: FONTS.GAME, fontSize: '24px' })
      .setAlpha(0)
      .setTint(convert0xStringTo0xNumber(COLORS.GREEN))

    this.menu.forEach(({ label, scene }, index) => {
      const menuObject = this.add
        .text(150, this.sceneCenter[1] + 50 + index * 75, label, {
          fontFamily: FONTS.GAME,
          fontSize: '24px',
          wordWrap: {
            width: 300,
          },
        })
        .setLineSpacing(10)
        .setTint(convert0xStringTo0xNumber(COLORS.YELLOW))
      this.createMenuEvent(menuObject, scene, index)
      this.menuObjects.push(menuObject)
    })
  }
  createMenuEvent(menuObject: GameObjects.Text, scene: string | null, index: number) {
    menuObject.setInteractive()

    menuObject.on('pointerover', () => {
      this.isHovering = true
      this.menuObjects.forEach((menuObj) => {
        menuObj.setTint(convert0xStringTo0xNumber(COLORS.YELLOW))
      })
      this.activeMenuIdx = index
      menuObject.setTint(convert0xStringTo0xNumber(COLORS.GREEN))
      this.menuArrow.setAlpha(1).setPosition(this.menuArrow.x, menuObject.y)
    })
    menuObject.on('pointerout', () => {
      this.isHovering = false
      this.menuArrow.setAlpha(0)
      menuObject.setTint(convert0xStringTo0xNumber(COLORS.YELLOW))
    })
    menuObject.on('pointerup', () => this.handlePlayScene(scene))
  }
  handleIncOrDecActiveMenuIdx(dir: DIR) {
    const idx = this.activeMenuIdx
    const ml = this.menu.length
    if (dir === DIR.UP) {
      this.activeMenuIdx = idx === ml - 1 ? 0 : idx + 1
    } else {
      this.activeMenuIdx = idx === 0 ? ml - 1 : idx - 1
    }
  }
  handlePlayScene(scene: string | null) {
    const { resetGameState } = store.getState()
    if (scene) {
      this.cameras.main.fadeOut(1000, 0, 0, 0)
      this.cameras.main.once(Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        resetGameState()
        return this.scene.start(scene)
      })
      return
    }
    handleGameRedirect()
  }
}
