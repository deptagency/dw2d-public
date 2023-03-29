import { Animations } from 'phaser'

const playerAnims = (anims: Animations.AnimationState) => {
  // Dead
  anims.create({
    key: 'player-dead-left',
    frames: anims.generateFrameNumbers('player-dead', { start: 6, end: 8 }),
    frameRate: 8,
    repeat: -1,
  })
  anims.create({
    key: 'player-dead-right',
    frames: anims.generateFrameNumbers('player-dead', { start: 0, end: 2 }),
    frameRate: 8,
    repeat: -1,
  })
  anims.create({
    key: 'player-dead-up',
    frames: anims.generateFrameNumbers('player-dead', { start: 3, end: 5 }),
    frameRate: 8,
    repeat: -1,
  })
  anims.create({
    key: 'player-dead-down',
    frames: anims.generateFrameNumbers('player-dead', { start: 9, end: 11 }),
    frameRate: 8,
    repeat: -1,
  })

  // Idle
  anims.create({
    key: 'player-idle-left',
    frames: anims.generateFrameNumbers('player-idle', { start: 12, end: 17 }),
    frameRate: 8,
    repeat: -1,
  })
  anims.create({
    key: 'player-idle-right',
    frames: anims.generateFrameNumbers('player-idle', { start: 0, end: 5 }),
    frameRate: 8,
    repeat: -1,
  })
  anims.create({
    key: 'player-idle-up',
    frames: anims.generateFrameNumbers('player-idle', { start: 6, end: 11 }),
    frameRate: 8,
    repeat: -1,
  })
  anims.create({
    key: 'player-idle-down',
    frames: anims.generateFrameNumbers('player-idle', { start: 19, end: 21 }),
    frameRate: 8,
    repeat: -1,
  })

  // Move
  anims.create({
    key: 'player-move-left',
    frames: anims.generateFrameNumbers('player-move', { start: 12, end: 17 }),
    frameRate: 8,
    repeat: -1,
  })
  anims.create({
    key: 'player-move-right',
    frames: anims.generateFrameNumbers('player-move', { start: 0, end: 5 }),
    frameRate: 8,
    repeat: -1,
  })
  anims.create({
    key: 'player-move-up',
    frames: anims.generateFrameNumbers('player-move', { start: 6, end: 11 }),
    frameRate: 8,
    repeat: -1,
  })
  anims.create({
    key: 'player-move-down',
    frames: anims.generateFrameNumbers('player-move', { start: 18, end: 23 }),
    frameRate: 8,
    repeat: -1,
  })
}
export default playerAnims
