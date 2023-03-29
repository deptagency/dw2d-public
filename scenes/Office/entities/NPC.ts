import { Math as PMath, Physics, Scenes } from 'phaser'

import npcAnims from '../anims/npcAnims'
import BaseScene from '../BaseScene'
import { DIR } from '../types'

import Player from './Player'

export default class NPC extends Physics.Arcade.Sprite {
  currentPatrolDistance: number
  key: string
  lastDirection: number
  maxPatrolDistance: number

  speed: number
  target: Player
  timeSinceLastTurn: number

  constructor(scene: BaseScene, x: number, y: number, key: string, player: Player) {
    super(scene, x, y, key)
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.currentPatrolDistance = 0
    this.key = key
    this.lastDirection = DIR.RIGHT
    this.maxPatrolDistance = PMath.Between(0, 50)
    this.speed = PMath.Between(0, 50)
    this.target = player
    this.timeSinceLastTurn = 0

    this.init()
    this.createEvents()
    npcAnims(this.anims, scene.numNpcs)
  }
  createEvents() {
    this.scene.events.on(Scenes.Events.UPDATE, this.update, this)
  }
  handleAnimation() {
    if (!this.body.velocity.x && !this.body.velocity.y) {
      switch (this.lastDirection) {
        case DIR.LEFT:
          this.play(`${this.key}-idle-left`, true)
          break
        case DIR.RIGHT:
          this.play(`${this.key}-idle-right`, true)
          break
        case DIR.UP:
          this.play(`${this.key}-idle-up`, true)
          break
        case DIR.DOWN:
          this.play(`${this.key}-idle-down`, true)
          break
      }
    } else {
      switch (this.lastDirection) {
        case DIR.LEFT:
          this.play(`${this.key}-move-left`, true)
          break
        case DIR.RIGHT:
          this.play(`${this.key}-move-right`, true)
          break
        case DIR.UP:
          this.play(`${this.key}-move-up`, true)
          break
        case DIR.DOWN:
          this.play(`${this.key}-move-down`, true)
          break
      }
    }
  }
  handleWatchDirection() {
    const playerPos = { x: this.target.x, y: this.target.y }
    const npcPos = { x: this.body.x, y: this.body.y }
    const dis = { x: playerPos.x - npcPos.x, y: playerPos.y - npcPos.y }
    if (dis.x <= 0 && Math.abs(dis.x) > Math.abs(dis.y)) {
      this.lastDirection = DIR.LEFT
    }
    if (dis.x > 0 && Math.abs(dis.x) > Math.abs(dis.y)) {
      this.lastDirection = DIR.RIGHT
    }
  }
  init() {
    this.setImmovable(true)
  }
  update(_time: number, _delta: number) {
    if (!this.body) return
    this.handleAnimation()
    this.handleWatchDirection()
  }
}
