import { Loader } from 'phaser'
import WebFontLoader from 'webfontloader'

export default class WebFontFile extends Loader.File {
  fontsLoadedCount: number
  fontNames: string[]
  constructor(loader: Loader.LoaderPlugin, fontNames: string | string[]) {
    super(loader, {
      type: 'webfont',
      key: fontNames.toString(),
    })

    this.fontNames = Array.isArray(fontNames) ? fontNames : [fontNames]
    this.fontsLoadedCount = 0
  }

  load() {
    const config = {
      fontactive: (familyName: string) => {
        this.checkLoadedFonts(familyName)
      },
      fontinactive: (familyName: string) => {
        this.checkLoadedFonts(familyName)
      },
      google: { families: this.fontNames },
    }
    WebFontLoader.load(config)
  }
  checkLoadedFonts(familyName: string) {
    if (this.fontNames.indexOf(familyName) < 0) {
      return
    }
    ++this.fontsLoadedCount
    if (this.fontsLoadedCount >= this.fontNames.length) {
      this.loader.nextFile(this, true)
    }
  }
}
