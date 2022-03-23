import { getCellFromCoords } from "../utils"
import KeyPressListener from "../listeners/KeyPressListener"
import Layer from "./Layer"
import MapCoordInfo from "./MapCoordInfo"
import MapRenderInfo from "./MapRenderInfo"

import Event from '../assets/Event.png'

export default class Map {
    // ID of the map, can be used if we want map tabs
    id: number

    // Size of the tile
    tileSize: number

    // Rows, both horizontal and vertical
    rows: number

    // Element the map is attached to
    element: any

    // Map canvas within the element
    canvas: any

    // 2d context of the canvas
    ctx: any

    // Focused state, certain listeners will only listen if we're focused on the element
    focused: boolean

    // Map Render Info
    renderInfo: MapRenderInfo

    // Map coord info
    coordInfo: MapCoordInfo

    // last clicked check
    lastClicked: boolean

    // Layers
    layers: any

    // show grid toggle
    isGridShown: boolean

    constructor(config) {
        this.id = 1 // TODO
        this.element = config.element
        this.canvas = this.element.querySelector(".map-canvas")
        this.ctx = this.canvas.getContext("2d")
        this.tileSize = config.tileSize || 32
        this.rows = config.rows || 10
        this.focused = true
        this.renderInfo = new MapRenderInfo({ 
            map: this,
            top: 5,
            left: 30,
        })
        this.coordInfo = new MapCoordInfo({
            map: this
        })

        this.layers = config.layers || []

        this.isGridShown = true

        this.canvas.width = this.tileSize * this.rows
        this.canvas.height = this.tileSize * this.rows

        this.init()
    }

    renderGrid() {
        this.ctx.lineWidth = 0.1
        this.ctx.strokeStyle = "rgb(116, 116, 116)"

        for (let i = 1; i < this.rows; i++) {
            this.ctx.beginPath()
            this.ctx.moveTo(0, i * this.tileSize)
            this.ctx.lineTo(this.canvas.width, i * this.tileSize)
            this.ctx.closePath()
            this.ctx.stroke()
        }

        for (let i = 1; i < this.rows; i++) {
            this.ctx.beginPath()
            this.ctx.moveTo(i * this.tileSize, 0)
            this.ctx.lineTo(i * this.tileSize, this.canvas.height)
            this.ctx.closePath()
            this.ctx.stroke()
        }
    }

    getActiveLayer() {
        return this.layers.find(l => l.active === true)
    }

    toggleGrid() {
        this.isGridShown = !this.isGridShown
    }

    registerGridMovement(): void {
        new KeyPressListener("KeyW", () => {
            this.focused && this.renderInfo.decreaseTop()
        })
        new KeyPressListener("KeyA", () => {
            this.focused && this.renderInfo.decreaseLeft()
        })
        new KeyPressListener("KeyS", () => {
            this.focused && this.renderInfo.increaseTop()
        })
        new KeyPressListener("KeyD", () => {
            this.focused && this.renderInfo.increaseLeft()
        })
    }

    registerLastClickedEvent(): void {
        let el = this.element
        let focused = this.focused
        document.addEventListener('click', function(e) {
            e.target == el ? 
                focused = true : 
                focused = false
        })
    }

    registerDrawEvent(): void {
        this.canvas.addEventListener('click', event => {
            let cell = getCellFromCoords(this.coordInfo.x, this.coordInfo.y, this.tileSize)
            const tile = this.getActiveLayer().getTileFromCell(cell[0], cell[1])
            tile.image.src = Event
            tile.draw(this.ctx, cell[0] * this.tileSize, cell[1] * this.tileSize)
        })
    }

    drawLoop() {
        const step = () => {
            // clear rect
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

            // render grid
            this.isGridShown && this.renderGrid()

            // get active layer & draw
            let activeLayer = this.getActiveLayer()
            activeLayer.draw()

            requestAnimationFrame(() => {
                step()
            })
        }

        step()
    }

    init() {
        // Grab render info then render grid
        this.renderInfo.init()
        this.renderGrid()

        this.coordInfo.init()

        this.layers[0] = new Layer({
            map: this,
            active: true,
        })
        

        this.drawLoop()

        this.registerGridMovement()
        this.registerLastClickedEvent()
        this.registerDrawEvent()
    }
}