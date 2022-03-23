import Tile from "./Tile"
import Blocked from  '../assets/Blocked.png'
import { getCellFromCoords } from "../utils"

export default class Layer {
    id: number
    map: any
    active: boolean
    tiles: any[]

    constructor(config) {
        this.map = config.map
        this.active = config.active || false
        this.tiles = config.tiles || {}

        this.init()
    }

    getTileFromCell(x: number, y: number) {
        let cell = getCellFromCoords(x, y, this.map.tileSize)
        return this.tiles[`${y}, ${x}`]
    }

    draw(): void {
        // rows - 1 for index
        const rows = this.map.rows

        for (let v = 0; v < rows; v++) {
            for (let h = 0; h < rows; h++) {
                // Render our tile
                this.tiles[`${v}, ${h}`].draw(
                    this.map.ctx,
                    this.map.tileSize * h,
                    this.map.tileSize * v
                )
            }
        }
    }

    init(): void {

        const rows = this.map.rows

        for (let v = 0; v < rows; v++) {
            for (let h = 0; h < rows; h++) {
                // Add to the layer list
                this.tiles[`${v}, ${h}`] = new Tile({
                    id: `${v}, ${h}`,
                    layer: this,
                    sheetCell: [0, 0],
                    src: Blocked
                })
            }
        }

        this.draw()
    }
}