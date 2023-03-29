import { Animations } from 'phaser'

const npcAnims = (anims: Animations.AnimationState, numNpcs: number) => {
  for (let npcNum = 1; npcNum <= numNpcs; npcNum++) {
    // Idle
    anims.create({
      key: `npc-${npcNum}-idle-left`,
      frames: anims.generateFrameNumbers(`npc-${npcNum}-idle`, { start: 12, end: 17 }),
      frameRate: 8,
      repeat: -1,
    })
    anims.create({
      key: `npc-${npcNum}-idle-right`,
      frames: anims.generateFrameNumbers(`npc-${npcNum}-idle`, { start: 0, end: 5 }),
      frameRate: 8,
      repeat: -1,
    })
    anims.create({
      key: `npc-${npcNum}-idle-up`,
      frames: anims.generateFrameNumbers(`npc-${npcNum}-idle`, { start: 6, end: 11 }),
      frameRate: 8,
      repeat: -1,
    })
    anims.create({
      key: `npc-${npcNum}-idle-down`,
      frames: anims.generateFrameNumbers(`npc-${npcNum}-idle`, { start: 19, end: 21 }),
      frameRate: 8,
      repeat: -1,
    })

    // Move
    anims.create({
      key: `npc-${npcNum}-move-left`,
      frames: anims.generateFrameNumbers(`npc-${npcNum}-move`, { start: 12, end: 17 }),
      frameRate: 8,
      repeat: -1,
    })
    anims.create({
      key: `npc-${npcNum}-move-right`,
      frames: anims.generateFrameNumbers(`npc-${npcNum}-move`, { start: 0, end: 5 }),
      frameRate: 8,
      repeat: -1,
    })
    anims.create({
      key: `npc-${npcNum}-move-up`,
      frames: anims.generateFrameNumbers(`npc-${npcNum}-move`, { start: 6, end: 11 }),
      frameRate: 8,
      repeat: -1,
    })
    anims.create({
      key: `npc-${npcNum}-move-down`,
      frames: anims.generateFrameNumbers(`npc-${npcNum}-move`, { start: 18, end: 23 }),
      frameRate: 8,
      repeat: -1,
    })
  }
}
export default npcAnims
