import { Physics } from 'phaser'

// Colors are handled a bit odd depending on the canvas context in which they're used.
// This is an attempt to have one source of truth, and coerce formats as needed
// via the conversion functions in ./utils.ts
export enum COLORS {
  BLACK = '0x121212',
  GRAY = '0xc4c4c4',
  GREEN = '0xbed1c9',
  PINK = '0xedd0cf',
  WHITE = '0xffffff',
  YELLOW = '0xf7e4b9',
}

export enum DEPTH {
  FLOOR = -10,
  FLOOR_ACCENT = 0,
  CHARACTER = 1,
  DECOR_0 = 10,
  WALLS = 20,
  DECOR_1 = 25,
  DECOR_2 = 30,
  DECOR_3 = 40,
  DECOR_4 = 50,
  LOUNGE_0 = 60,
  LOUNGE_1 = 70,
  LIVINGROOM_0 = 80,
  KITCHEN_0 = 90,
  KITCHEN_1 = 100,
  KITCHEN_2 = 110,
  BATHROOM_0 = 120,
  BATHROOM_1 = 130,
  BATHROOM_2 = 140,
  DEPT_LOGO = 150,
  INSTRUCTIONS_SHADOW = 150,
  INSTRUCTIONS_BASE = 151,
  INSTRUCTIONS_ICON = 152,
  JOYSTICK_BASE = 500,
  JOYSTICK_THUMB = 1000,
}

export enum DIR {
  LEFT = Physics.Arcade.FACING_LEFT,
  RIGHT = Physics.Arcade.FACING_RIGHT,
  UP = Physics.Arcade.FACING_UP,
  DOWN = Physics.Arcade.FACING_DOWN,
}

export enum MAPS {
  OFFICE = 'office',
}

export enum FONTS {
  GAME = "'Press Start 2P'", // Double quotes necessary...
}

export enum EVENTS {
  START = 'START',
  RESUME = 'RESUME',
  END = 'END',
  LIVE = 'LIVE',
  DIE = 'DIE',
}

export enum SCENES {
  PRELOAD = 'PreloadScene',
  INTRO = 'IntroScene',
  GAME = 'GameScene',
  OUTRO = 'OutroScene',
}

export enum TILEMAP_LAYERS {
  ROOM = 'room',
  DECOR = 'decor',
  LOUNGE = 'lounge',
  LIVINGROOM = 'livingroom',
  KITCHEN = 'kitchen',
  BATHROOM = 'bathroom',
}

export enum WORLD_LAYERS {
  FLOOR = 'floor',
  FLOOR_ACCENT = 'floor_accent',
  DECOR_0 = 'decor_0',
  WALLS = 'walls',
  DECOR_1 = 'decor_1',
  DECOR_2 = 'decor_2',
  DECOR_3 = 'decor_3',
  DECOR_4 = 'decor_4',
  LOUNGE_0 = 'lounge_0',
  LOUNGE_1 = 'lounge_1',
  LIVINGROOM_0 = 'livingroom_0',
  KITCHEN_0 = 'kitchen_0',
  KITCHEN_1 = 'kitchen_1',
  KITCHEN_2 = 'kitchen_2',
  BATHROOM_0 = 'bathroom_0',
  BATHROOM_1 = 'bathroom_1',
  BATHROOM_2 = 'bathroom_2',
}

export enum ZONE_LAYERS {
  NPC_ACTION_ZONES = 'npc_action_zones',
  NPC_ZONES = 'npc_zones',
  PLAYER_ZONES = 'player_zones',
}

export interface DialogChoice {
  response: string
  result: EVENTS
  followup: {
    title: string
    body: string
    dismiss: string
  }
}

export interface DialogPayload {
  id: string
  name: string
  prompt: string
  choices: DialogChoice[]
}
