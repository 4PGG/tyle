import { getCellFromCoords } from "../utils";

export default class MapCoordInfo {
    map: any
    x: number
    y: number
    cell: number[]

    constructor(config) {
        this.map = config.map
        this.x = 0
        this.y = 0
        this.cell = [0, 0]
    }

    init() {
        this.map.canvas.addEventListener('mousemove', event => {
            let rect = this.map.canvas.getBoundingClientRect()
            this.x = Math.floor((event.clientX - rect.left) / this.map.renderInfo.scale) 
            this.y = Math.floor((event.clientY - rect.top) / this.map.renderInfo.scale) 
            this.cell = getCellFromCoords(this.x, this.y, this.map.tileSize)
        })
    }
}