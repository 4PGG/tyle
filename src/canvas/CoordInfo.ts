import { getCellFromCoords } from "../utils";

export default class CoordInfo {
    canvas: any
    x: number
    y: number
    cell: number[]

    constructor(config) {
        this.canvas = config.canvas
        this.x = 0
        this.y = 0
        this.cell = [0, 0]

        this.init()
    }

    init() {
        this.canvas.canvas.addEventListener('mousemove', event => {
            let rect = this.canvas.canvas.getBoundingClientRect()
            this.x = Math.floor((event.clientX - rect.left) / this.canvas.render.scale) 
            this.y = Math.floor((event.clientY - rect.top) / this.canvas.render.scale) 
            this.cell = getCellFromCoords(this.x, this.y, this.canvas.tileSize)
        })
    }
}