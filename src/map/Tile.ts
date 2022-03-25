export default class Tile {
    id: number
    layer: any
    sheet: any
    sheetCell: [number, number] | null
    image: HTMLImageElement
    isLoaded: boolean
    isUpdated: ConstrainBooleanParameters

    constructor(config) {
        this.id = config.id
        this.layer = config.layer
        this.sheet = config.sheet || null
        this.sheetCell = config.sheetCell || null
        this.image = new Image()
        this.image.src = config.src || null
        this.image.onload = () => {
            this.isLoaded = true
        }
    }

    draw(ctx: any, x: number, y: number): void {
        const tileSize = this.layer.map.tileSize
        
        this.isLoaded && ctx.drawImage(this.image,
            this.sheetCell[0] * tileSize, this.sheetCell[1] * tileSize,
            tileSize, tileSize,
            x, y,
            tileSize, tileSize,
        )
    }
}