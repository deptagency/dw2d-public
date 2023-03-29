import { Cameras, Tilemaps } from 'phaser'

import Emitter from './core/EventEmitter'
import { dialogMapping } from './data/content'
import { worldMapping } from './data/world'
import NPC from './entities/NPC'
import Player from './entities/Player'
import BaseScene from './BaseScene'
import {
  COLORS,
  DEPTH,
  DIR,
  EVENTS,
  FONTS,
  MAPS,
  SCENES,
  TILEMAP_LAYERS,
  WORLD_LAYERS,
  ZONE_LAYERS,
} from './types'
import { convert0xStringTo0xNumber, handleGameRedirect, sortArrayByKey } from './utils'

import store from '@/stores/gameStore'

export default class GameScene extends BaseScene {
  layers!: Record<string, Tilemaps.TilemapLayer>
  map!: Tilemaps.Tilemap
  player!: Player
  zones!: Record<string, Tilemaps.ObjectLayer>

  constructor() {
    super(SCENES.GAME)
  }
  create() {
    super.create()

    // World
    this.map = this.createMap()
    this.layers = this.createLayers()
    this.zones = this.createLayerZones()

    // Interactions
    this.player = this.createPlayer()
    this.createCamera(this.player)
    this.createPlayerColliders()
    this.createNPCs()
    this.createGameListeners()
    this.createGameFinish()
    this.createGameStart()
    this.createInstructions()
    this.createLogo()

    // Start
    this.cameras.main.fadeIn(1000, 0, 0, 0)
  }
  update(time: number, delta: number) {
    super.update(time, delta)
  }

  createCamera(player: Player) {
    const sH = this.sceneH
    const sW = this.sceneW
    const mH = this.config.settings.mapHeight
    const mW = this.config.settings.mapWidth
    const mapOffsetX = mW > sW ? mW - sW : 0
    const mapOffsetY = mH > sH ? mH - sH : 0
    const boundsX = sW + mapOffsetX
    const boundsY = sH + mapOffsetY
    this.cameras.main.setBounds(0, 0, boundsX, boundsY)
    this.cameras.main.setZoom(this.config.settings.zoomFactor as number)
    this.cameras.main.startFollow(player)
    this.physics.world.setBounds(0, 0, boundsX, boundsY)
  }
  createGameFinish() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_start, end] = this.zones.playerZones.objects

    const levelEnd = this.physics.add
      .sprite(end.x as number, end.y as number, 'end')
      .setAlpha(0)
      .setOrigin(0.5, 1)
      .setSize(5, 400)
      .setImmovable(true)

    this.physics.add.overlap(this.player, levelEnd, () => {
      const { isAttemptingtoExit, setIsAttemptingtoExit } = store.getState()
      if (isAttemptingtoExit) return
      setIsAttemptingtoExit(true)
      this.player.handleMovementDisable()
    })
  }
  createGameStart() {
    const { setHasLoaded, hasOnboarded } = store.getState()
    if (hasOnboarded) return
    setHasLoaded(true)
    this.player.handleMovementDisable()
  }
  createGameListeners() {
    Emitter.on(EVENTS.START, () => {
      this.player.handleMovementEnable()
    })
    Emitter.on(EVENTS.RESUME, () => {
      this.player.setPosition(this.player.body.position.x - 20, this.player.body.position.y)
      this.player.handleMovementEnable()
    })
    Emitter.on(EVENTS.END, () => {
      Emitter.shutdown()
      this.cameras.main.fadeOut(1000, 0, 0, 0)
      this.cameras.main.once(Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        this.time.delayedCall(1000, () => {
          this.scene.start(SCENES.OUTRO)
        })
      })
    })
    Emitter.on(EVENTS.LIVE, () => {
      this.player.handleMovementEnable()
    })
    Emitter.on(EVENTS.DIE, () => {
      const { incrementNumberOfRetries } = store.getState()
      this.player.handleDeath()
      incrementNumberOfRetries()
    })
  }
  createLayers() {
    const { ROOM, DECOR, LOUNGE, LIVINGROOM, KITCHEN, BATHROOM } = TILEMAP_LAYERS
    const tilesets: Record<string, Tilemaps.Tileset> = {
      tilesetRoom: this.map.addTilesetImage(ROOM, ROOM),
      tilesetDecor: this.map.addTilesetImage(DECOR, DECOR),
      tilesetLounge: this.map.addTilesetImage(LOUNGE, LOUNGE),
      tilesetLivingroom: this.map.addTilesetImage(LIVINGROOM, LIVINGROOM),
      tilesetKitchen: this.map.addTilesetImage(KITCHEN, KITCHEN),
      tilesetBathroom: this.map.addTilesetImage(BATHROOM, BATHROOM),
    }
    return Object.values(WORLD_LAYERS).reduce(
      (acc: Record<string, Tilemaps.TilemapLayer>, key: string) => {
        const { collides, depth, tileset } = worldMapping[key]
        const layer = this.map.createLayer(key, tilesets[tileset]).setDepth(depth)
        if (collides) layer.setCollisionByExclusion([-1])
        acc[key] = layer
        return acc
      },
      {}
    )
  }
  createLayerZones() {
    const npcActionZones = this.map.getObjectLayer(ZONE_LAYERS.NPC_ACTION_ZONES)
    const npcZones = this.map.getObjectLayer(ZONE_LAYERS.NPC_ZONES)
    const playerZones = this.map.getObjectLayer(ZONE_LAYERS.PLAYER_ZONES)
    return { npcActionZones, npcZones, playerZones }
  }
  createInstructions() {
    const { boundRight, boundTop } = this.config.settings
    const { setIsShowingInstructions } = store.getState()
    // Shadow
    this.add
      .circle(boundRight - 47, boundTop + 53, 20, convert0xStringTo0xNumber(COLORS.BLACK))
      .setDepth(DEPTH.INSTRUCTIONS_SHADOW)
      .setOrigin(1, 0)
      .setScrollFactor(0, 0)
    // Overlay
    this.add
      .circle(boundRight - 50, boundTop + 50, 20, convert0xStringTo0xNumber(COLORS.WHITE))
      .setDepth(DEPTH.INSTRUCTIONS_BASE)
      .setOrigin(1, 0)
      .setScrollFactor(0, 0)
    // Question mark
    this.add
      .text(boundRight - 56, boundTop + 58, '?', {
        fontFamily: FONTS.GAME,
        fontSize: '24px',
      })
      .setDepth(DEPTH.INSTRUCTIONS_ICON)
      .setOrigin(1, 0)
      .setScrollFactor(0, 0)
      .setTint(convert0xStringTo0xNumber(COLORS.BLACK))
      .setInteractive()
      .on('pointerup', () => setIsShowingInstructions(true))
  }
  createLogo() {
    const { boundLeft, boundTop } = this.config.settings
    // Shadow
    this.add
      .sprite(boundLeft + 53, boundTop + 53, 'dept-logo')
      .setDepth(DEPTH.DEPT_LOGO - 1)
      .setOrigin(0, 0)
      .setScale(0.35)
      .setScrollFactor(0, 0)
      .setTint(0x000000)
    // Overlay
    this.add
      .sprite(boundLeft + 50, boundTop + 50, 'dept-logo')
      .setDepth(DEPTH.DEPT_LOGO)
      .setOrigin(0, 0)
      .setScale(0.35)
      .setScrollFactor(0, 0)
      .setInteractive()
      .on('pointerup', handleGameRedirect)
  }
  createMap() {
    return this.make.tilemap({ key: MAPS.OFFICE })
  }
  createNPCs() {
    // Sort zones to map by name, since Tiled doesn't respect order
    const actionZones = sortArrayByKey(this.zones.npcActionZones.objects, 'name')
    const npcZones = sortArrayByKey(this.zones.npcZones.objects, 'name')

    npcZones.forEach((npcZone, i) => {
      // For each NPC, we get its respective zone and null check, though it should always exist
      // We also check for corresponding content. This makes life easier if a question gets removed.
      const actionZone = actionZones[i]
      if (!actionZone || !dialogMapping[npcZone.name]) return

      // Create the NPC and a corresponding action layer, which is an invisible sprite surrounding the NPC
      const npc = new NPC(this, npcZone.x as number, npcZone.y as number, npcZone.name, this.player)
      const action = this.physics.add
        .sprite(actionZone.x as number, actionZone.y as number, '1x1')
        .setBodySize(actionZone.width as number, actionZone.height as number)
        .setOffset(0, 0)
        .setOrigin(1, 1)

      // Prevent player from moving through NPC
      this.createCollider(this.player, npc)

      // Triggered prompt when player enters the zone
      this.createOverlap(this.player, action, () => {
        // Destroy the event after first trigger, so it's never triggered again
        action.destroy()
        this.handlePlayerApproachNPC(npc)
      })
    })
  }
  createPlayer() {
    const [start] = this.zones.playerZones.objects
    this.player = new Player(this, start.x as number, start.y as number).setDepth(DEPTH.CHARACTER)
    return this.player
  }
  createPlayerColliders() {
    const collidableLayers = Object.keys(worldMapping).filter((key) => {
      if (worldMapping[key].collides) return key
    })
    collidableLayers.forEach((layer) => {
      this.createCollider(this.player, this.layers[layer])
    })
  }
  handlePlayerApproachNPC(npc: NPC) {
    // Calculate coordinates and orientation depending on player and NPC direction
    const npcDir = npc.lastDirection === DIR.RIGHT ? DIR.RIGHT : DIR.LEFT
    const xDistance =
      npcDir === DIR.LEFT
        ? // 50 is a safe social distance
          this.player.x + this.player.width + 50
        : this.player.x - this.player.width - 50

    // Temporarily disable player and face towards NPC
    this.player.handleMovementDisable()
    this.player.lastDirection = npc.lastDirection === DIR.RIGHT ? DIR.LEFT : DIR.RIGHT

    // Move NPC and start dialog
    this.tweens.add({
      targets: npc,
      x: xDistance,
      y: this.player.y,
      ease: 'Power1',
      duration: 1000,
      repeat: 0,
      // This value is arbitrary; setting velocity will trigger walking animation
      onStart: () => npc.setVelocity(1),
      onComplete: () => {
        this.handlePlayerInteraction(npc.key)
        npc.setTint(convert0xStringTo0xNumber(COLORS.GRAY)).setVelocity(0)
      },
    })
  }
  handlePlayerInteraction(dialogId: string) {
    const { setCurrentDialog } = store.getState()
    setCurrentDialog(dialogId)
  }
}
