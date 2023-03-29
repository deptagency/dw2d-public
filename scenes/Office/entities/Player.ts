import { Physics, Scenes, Types } from 'phaser'
import VirtualJoystick from 'phaser3-rex-plugins/plugins/virtualjoystick.js'

import playerAnims from '../anims/playerAnims'
import BaseScene from '../BaseScene'
import { COLORS, DEPTH, DIR } from '../types'
import { convert0xStringTo0xNumber } from '../utils'

declare global {
  interface Window {
    SUPPORTS_TOUCH: boolean
  }
}

export default class Player extends Physics.Arcade.Sprite {
  canMove: boolean
  cursors!: Types.Input.Keyboard.CursorKeys
  isDead: boolean
  lastDirection: DIR
  speed: number
  joyStick: VirtualJoystick | null

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, 'player')
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.canMove = true
    this.cursors = this.scene.input.keyboard.createCursorKeys()
    this.isDead = false
    this.joyStick = null
    this.lastDirection = DIR.RIGHT
    this.scene = scene
    this.speed = scene.isDebug ? 900 : 300

    this.init()
    this.createEvents()
  }

  createEvents() {
    this.scene.events.on(Scenes.Events.UPDATE, this.update, this)
  }
  init() {
    this.setCollideWorldBounds(true)
    playerAnims(this.anims)
  }
  handleDeath() {
    this.isDead = true
    this.setRotation(90)
    this.scene.time.delayedCall(2000, () => {
      this.handleMovementEnable()
      this.isDead = false
    })
  }
  handleMovementDisable() {
    this.canMove = false
    this.setImmovable(true).setVelocity(0, 0)
    this.joyStick?.setEnable(false)
  }
  handleMovementEnable() {
    this.canMove = true
    this.joyStick?.setEnable(true)
    this.setImmovable(false).setRotation(0)
  }
  listenPlayerMovement() {
    // Dead
    if (this.isDead) {
      switch (this.lastDirection) {
        case DIR.LEFT:
          this.play('player-dead-left', true)
          break
        case DIR.RIGHT:
          this.play('player-dead-right', true)
          break
        case DIR.UP:
          this.play('player-dead-up', true)
          break
        case DIR.DOWN:
          this.play('player-dead-down', true)
          break
      }
      return
    }

    if (window.SUPPORTS_TOUCH && !this.joyStick) {
      this.joyStick = new VirtualJoystick(this.scene, {
        x: (this.scene as BaseScene).config.settings.boundRight - 250,
        y: (this.scene as BaseScene).config.settings.boundBottom - 250,
        radius: 100,
        base: this.scene.add
          .circle(0, 0, 100, convert0xStringTo0xNumber(COLORS.WHITE))
          .setDepth(DEPTH.JOYSTICK_BASE),
        thumb: this.scene.add
          .circle(0, 0, 50, convert0xStringTo0xNumber(COLORS.GREEN))
          .setDepth(DEPTH.JOYSTICK_THUMB),
        enable: true,
      })
    }
    const left = this.cursors.left.isDown || this.joyStick?.left
    const right = this.cursors.right.isDown || this.joyStick?.right
    const up = this.cursors.up.isDown || this.joyStick?.up
    const down = this.cursors.down.isDown || this.joyStick?.down

    if (this.canMove) {
      // Diagonals
      if ((left && up) || (right && up)) {
        this.lastDirection = DIR.UP
        const velocity = left ? -this.speed : this.speed
        this.play('player-move-up', true).setVelocity(velocity, -this.speed)
        return
      }
      if ((left && down) || (right && down)) {
        this.lastDirection = DIR.DOWN
        const velocity = left ? -this.speed : this.speed
        this.play('player-move-down', true).setVelocity(velocity, this.speed)
        return
      }

      // Horizontals
      if (left) {
        this.lastDirection = DIR.LEFT
        this.play('player-move-left', true).setVelocityX(-this.speed)
      } else if (right) {
        this.lastDirection = DIR.RIGHT
        this.play('player-move-right', true).setVelocityX(this.speed)
      } else {
        this.setVelocityX(0)
      }
      if (up) {
        this.lastDirection = DIR.UP
        this.play('player-move-up', true).setVelocityY(-this.speed)
      } else if (down) {
        this.lastDirection = DIR.DOWN
        this.play('player-move-down', true).setVelocityY(this.speed)
      } else {
        this.setVelocityY(0)
      }
    }

    // Verticals
    if (!this.body.velocity.x && !this.body.velocity.y) {
      switch (this.lastDirection) {
        case DIR.LEFT:
          this.play('player-idle-left', true)
          break
        case DIR.RIGHT:
          this.play('player-idle-right', true)
          break
        case DIR.UP:
          this.play('player-idle-up', true)
          break
        case DIR.DOWN:
          this.play('player-idle-down', true)
          break
      }
    }
  }
  // Note: not to be confused with Phaser's scene lifecycle `update`.
  // But this is a listener bound to the scene's update, so it behaves identically.
  update(_time: number, _delta: number) {
    if (!this.body) return
    this.listenPlayerMovement()
  }
}
