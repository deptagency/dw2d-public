import { Events } from 'phaser'

class EventEmitter extends Events.EventEmitter {
  constructor() {
    super()
  }
}

const Emitter = new EventEmitter()

export default Emitter
