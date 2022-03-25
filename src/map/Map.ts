import { getCellFromCoords } from "../utils"
import Canvas from "../canvas/Canvas"
import Layer from "./Layer"
import TileSheet from "../sheet/TileSheet"

import Event from '../assets/Event.png'

export default class Map extends Canvas {
    // ID of the map, can be used if we want map tabs
    id: number

    // Size of the tile
    tileSize: number

    // Rows, both horizontal and vertical
    rows: number

    // Element the map is attached to
    element: any

    // Focused state, certain listeners will only listen if we're focused on the element
    focused: boolean

    // last clicked check
    lastClicked: boolean

    // Layers
    layers: Layer[]

    // show grid toggle
    isGridShown: boolean

    // tilesheets
    tilesheets: TileSheet[]

    // Mouse Interval (used in place for non-existing while mouse down event)
    mouseInterval: any

    constructor(config) {
        super(config)

        this.id = 1 // TODO
        this.element = config.element

        // Canvas Config
        this.canvas = document.querySelector('.map-canvas')
        this.render.top = 5
        this.render.left = 30

        this.tileSize = config.tileSize || 32
        this.rows = config.rows || 10
        this.focused = true


        this.layers = config.layers || []
        this.tilesheets = config.tilesheets || []

        this.isGridShown = true

        this.canvas.width = this.tileSize * this.rows
        this.canvas.height = this.tileSize * this.rows

        this.mouseInterval = null

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

    getActiveTilesheet() {
        return this.tilesheets.find(t => t.active === true)
    }

    toggleGrid() {
        this.isGridShown = !this.isGridShown
    }

    registerGridMovement(): void {
        document.addEventListener("keydown", e => {
            switch(e.code) {
                case "KeyW":
                    this.focused && this.render.decreaseTop()
                    break
                case "KeyA":
                    this.focused && this.render.decreaseLeft()
                    break
                case "KeyS":
                    this.focused && this.render.increaseTop()
                    break
                case "KeyD":
                    this.focused && this.render.increaseLeft()
                    break
            }
        })

    }

    registerLastClickedEvent(): void {
        let el = this.element
        let focused = this.focused
        document.addEventListener('click', e => {
            if(e.target == el) {
                focused = true
            } else {
                focused = false
                clearInterval(this.mouseInterval)
            } 
        })
    }

    registerDrawEvent(): void {
        this.onCanvasMouseDown((event) => {
            this.mouseInterval = setInterval(() => {
                const cell = getCellFromCoords(this.coord.x, this.coord.y, this.tileSize)
                const tile = this.getActiveLayer().getTileFromCell(cell[0], cell[1])
                
                const activeTilesheet = this.getActiveTilesheet()
                if (tile.image.src !== activeTilesheet.image.src || 
                    tile.sheetCell !== activeTilesheet.activeCell.cell || !this.focused) {
                        tile.image.src = activeTilesheet.image.src
                        tile.sheetCell = activeTilesheet.activeCell.cell
                        tile.draw(this.ctx, cell[0] * this.tileSize, cell[1] * this.tileSize)
                }
            }, 10)
        })

        this.onCanvasMouseUp((event) => {
            clearInterval(this.mouseInterval)
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
        this.render.init()
        this.renderGrid()


        this.layers[0] = new Layer({
            map: this,
            active: true,
        })

        this.tilesheets[0] = new TileSheet({
            map: this,
            active: true,
            canvas: document.querySelector(".tilesheet-canvas"),
            tileSize: this.tileSize
        })        

        this.drawLoop()

        this.registerGridMovement()
        this.registerLastClickedEvent()
        this.registerDrawEvent()
    }
}