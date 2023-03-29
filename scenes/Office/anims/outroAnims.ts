import { Animations } from 'phaser'

const outroAnims = (anims: Animations.AnimationState) => {
  anims.create({
    key: 'sip',
    frames: anims.generateFrameNumbers('sip', { start: 0, end: 4 }),
    frameRate: 3,
    repeat: -1,
  })
}
export default outroAnims
