import Phaser from 'phaser'

import env from './core/Environment'
import { COLORS } from './types'

const config: Phaser.Types.Core.GameConfig = {
  height: 640,
  width: 1200,
  backgroundColor: COLORS.BLACK,
  parent: 'game-content',
  physics: {
    default: 'arcade',
    arcade: { debug: env.isDebug === 'true' ? true : false },
  },
  plugins: {
    // global: [],
  },
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.FIT,
  },
  type: Phaser.AUTO,
}

export default config
