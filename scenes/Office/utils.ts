import { Animations } from 'phaser'

import env from './core/Environment'
import { COLORS } from './types'

import store from '@/stores/gameStore'

export const convert0xStringToHexString = (color: COLORS) => {
  return `#${color.split('x')[1]}`
}

export const convert0xStringTo0xNumber = (color: COLORS) => {
  return parseInt(color)
}

export const getPropertyValueByName = (
  properties: {
    name: string
    value: string | number
  }[],
  key: string
) => {
  if (!properties) return null
  const prop = properties.find(({ name }) => name === key)
  return prop?.value || null
}

export const getTimeStamp = () => {
  return new Date().getTime()
}

export const handleGameRedirect = () => {
  if (window && parent && env.redirectUrl) {
    const { numberOfRetries } = store.getState()
    const params = numberOfRetries ? `?retries=${numberOfRetries}` : ''
    parent?.postMessage(JSON.stringify({ redirect: `${env.redirectUrl}${params}` }), '*')
  }
}

export const isPlayingAnim = (anims: Animations.AnimationState, key: string) => {
  return anims.isPlaying && anims.currentAnim.key === key
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sortArrayByKey = (arr: Record<string, any>[], key: string) => {
  return arr.sort(function (a, b) {
    const keyA = a[key]
    const keyB = b[key]
    if (keyA < keyB) return -1
    if (keyA > keyB) return 1
    return 0
  })
}
