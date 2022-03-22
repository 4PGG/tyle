import KeyPressListener from "../listeners/KeyPressListener"
import MapRenderInfo from "./MapRenderInfo"

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
    renderInfo: any

    // last clicked check
    lastClicked: boolean

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

        this.canvas.width = this.tileSize * this.rows
        this.canvas.height = this.tileSize * this.rows

        this.init()
    }

    renderGrid() {
        this.ctx.lineWidth = 0.2
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

    registerGridMovement() {
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

    registerLastClickedEvent() {
        let el = this.element
        let focused = this.focused
        document.addEventListener('click', function(e) {
            e.target == el ? 
                focused = true : 
                focused = false
        })
    }

    init() {
        // Grab render info then render grid
        this.renderInfo.init()
        this.renderGrid()

        this.registerGridMovement()
        this.registerLastClickedEvent()
    }
}