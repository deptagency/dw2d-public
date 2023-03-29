import { DEPTH } from '../types'

export const worldMapping: Record<string, { collides: boolean; depth: DEPTH; tileset: string }> = {
  floor: { collides: false, depth: DEPTH.FLOOR, tileset: 'tilesetRoom' },
  floor_accent: { collides: false, depth: DEPTH.FLOOR_ACCENT, tileset: 'tilesetRoom' },
  walls: { collides: true, depth: DEPTH.WALLS, tileset: 'tilesetRoom' },
  decor_0: { collides: true, depth: DEPTH.DECOR_0, tileset: 'tilesetDecor' },
  decor_1: { collides: true, depth: DEPTH.DECOR_1, tileset: 'tilesetDecor' },
  decor_2: { collides: true, depth: DEPTH.DECOR_2, tileset: 'tilesetDecor' },
  decor_3: { collides: true, depth: DEPTH.DECOR_3, tileset: 'tilesetDecor' },
  decor_4: { collides: true, depth: DEPTH.DECOR_4, tileset: 'tilesetDecor' },
  lounge_0: { collides: true, depth: DEPTH.LOUNGE_0, tileset: 'tilesetLounge' },
  lounge_1: { collides: true, depth: DEPTH.LOUNGE_1, tileset: 'tilesetLounge' },
  livingroom_0: { collides: true, depth: DEPTH.LIVINGROOM_0, tileset: 'tilesetLivingroom' },
  kitchen_0: { collides: true, depth: DEPTH.KITCHEN_0, tileset: 'tilesetKitchen' },
  kitchen_1: { collides: true, depth: DEPTH.KITCHEN_1, tileset: 'tilesetKitchen' },
  kitchen_2: { collides: true, depth: DEPTH.KITCHEN_2, tileset: 'tilesetKitchen' },
  bathroom_0: { collides: true, depth: DEPTH.BATHROOM_0, tileset: 'tilesetBathroom' },
  bathroom_1: { collides: true, depth: DEPTH.BATHROOM_1, tileset: 'tilesetBathroom' },
  bathroom_2: { collides: true, depth: DEPTH.BATHROOM_2, tileset: 'tilesetBathroom' },
}
