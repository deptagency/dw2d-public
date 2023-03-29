import { GameObjects, Scene, Types } from 'phaser'

import config from './config'
import { SCENES } from './types'

export interface ExtendedConfig extends Types.Core.GameConfig {
  settings: {
    boundBottom: number
    boundCenter: number
    boundLeft: number
    boundRight: number
    boundTop: number
    mapHeight: number
    mapWidth: number
    zoomFactor: number
  }
}

export default class BaseScene extends Scene {
  config: ExtendedConfig
  isDebug: boolean
  key: string
  numNpcs: number
  sceneCenter: [number, number]
  sceneH: number
  sceneW: number

  constructor(key: SCENES) {
    super(key)

    this.isDebug = config.physics?.arcade?.debug || false
    this.key = key
    this.numNpcs = 11
    this.sceneH = config.height as number
    this.sceneW = config.width as number
    this.sceneCenter = [this.sceneW / 2, this.sceneH / 2]

    // Extended config for convenient access
    const Z = 0.75 // zoom factor
    this.config = {
      ...config,
      settings: {
        boundBottom: this.sceneH / Z + (this.sceneH - this.sceneH / Z) / 2,
        boundCenter:
          (this.sceneW / Z +
            (this.sceneW - this.sceneW / Z) / 2 -
            (this.sceneW - this.sceneW / Z) / 2) /
          2,
        boundLeft: (this.sceneW - this.sceneW / Z) / 2,
        boundRight: this.sceneW / Z + (this.sceneW - this.sceneW / Z) / 2,
        boundTop: (this.sceneH - this.sceneH / Z) / 2,
        mapHeight: 2880,
        mapWidth: 3840,
        zoomFactor: Z,
      },
    }
  }
  create() {
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('orientationchange', this.handleResize)
    this.handleResize()
  }
  update(_time: number, _delta: number): void {
    // Called from extending classes
  }

  createCollider(
    object1: GameObjects.GameObject,
    object2: GameObjects.GameObject,
    callback?: (object1: GameObjects.GameObject, object2: GameObjects.GameObject) => void
  ) {
    this.physics.add.collider(object1, object2, callback, undefined, this)
  }
  createOverlap(
    object1: GameObjects.GameObject,
    object2: GameObjects.GameObject,
    callback?: (object1: GameObjects.GameObject, object2: GameObjects.GameObject) => void
  ) {
    this.physics.add.overlap(object1, object2, callback, undefined, this)
  }
  handleResize() {
    const canvas = document.getElementById('game-content')
    if (canvas) {
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
    }
  }
}
