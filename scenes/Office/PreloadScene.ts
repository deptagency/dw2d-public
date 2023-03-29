import WebFontFile from './core/Webfont'
import BaseScene from './BaseScene'
import { COLORS, MAPS, SCENES, TILEMAP_LAYERS } from './types'
import { convert0xStringTo0xNumber } from './utils'
export default class PreloadScene extends BaseScene {
  constructor() {
    super(SCENES.PRELOAD)
  }
  preload() {
    const progress = this.add.graphics()

    this.load.on('progress', (value: number) => {
      const margin = 4
      const height = 50
      const width = 300
      const offsetX = this.sceneW / 2 - width / 2
      const offsetY = this.sceneH / 2 - height / 2
      const progressWidth = width * value

      // Progress bar
      progress.clear()
      // Outer
      progress.fillStyle(convert0xStringTo0xNumber(COLORS.WHITE))
      progress.fillRect(offsetX, offsetY, width + margin, height + margin)
      // Inner "fill"
      progress.fillStyle(convert0xStringTo0xNumber(COLORS.BLACK))
      progress.fillRect(offsetX + margin, offsetY + margin, width - margin, height - margin)
      // Actual value
      progress.fillStyle(convert0xStringTo0xNumber(COLORS.GREEN))
      progress.fillRect(offsetX + margin, offsetY + margin, progressWidth - margin, height - margin)
    })

    // Fonts
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'))

    // Map
    this.load.tilemapTiledJSON(MAPS.OFFICE, 'office/world/map.json')
    this.load.image(TILEMAP_LAYERS.ROOM, 'office/world/room.png')
    this.load.image(TILEMAP_LAYERS.DECOR, 'office/world/decor.png')
    this.load.image(TILEMAP_LAYERS.LOUNGE, 'office/world/lounge.png')
    this.load.image(TILEMAP_LAYERS.LIVINGROOM, 'office/world/livingroom.png')
    this.load.image(TILEMAP_LAYERS.KITCHEN, 'office/world/kitchen.png')
    this.load.image(TILEMAP_LAYERS.BATHROOM, 'office/world/bathroom.png')

    // Characters
    const characterDimensions = { frameHeight: 76, frameWidth: 48 }
    this.load.spritesheet('player-dead', 'office/player/player-dead.png', {
      ...characterDimensions,
      frameHeight: 72,
    })
    this.load.spritesheet('player-idle', 'office/player/player-idle.png', characterDimensions)
    this.load.spritesheet('player-move', 'office/player/player-move.png', characterDimensions)
    for (let npcNum = 1; npcNum <= this.numNpcs; npcNum++) {
      this.load.spritesheet(
        `npc-${npcNum}-idle`,
        `office/npcs/npc-${npcNum}-idle.png`,
        characterDimensions
      )
      this.load.spritesheet(
        `npc-${npcNum}-move`,
        `office/npcs/npc-${npcNum}-move.png`,
        characterDimensions
      )
    }

    // Misc
    this.load.image('1x1', 'office/misc/1x1.png')
    this.load.image('dept-logo', 'office/misc/dept-logo.png')
    this.load.image('skull', 'office/misc/skull.png')
    this.load.spritesheet('sip', 'office/misc/sip.png', { frameHeight: 634, frameWidth: 1170 })

    this.load.once('complete', () => {
      progress.destroy()
      this.scene.start(SCENES.INTRO)
    })
  }
}
