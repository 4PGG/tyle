import type Map from '../map/Map'
import DefaultTilesheet from '../assets/default-tilesheet32.png'
import ActiveCell from './ActiveCell'
import Canvas from '../canvas/Canvas'

export default class TileSheet extends Canvas {
    map: Map

    tileSize: any
    image: HTMLImageElement
    activeCell: ActiveCell
    isLoaded: boolean

    constructor(config) {
        super(config)

        this.map = config.map

        // Canvas Config
        this.canvas = document.querySelector('.tilesheet-canvas')
        this.render.top = 5;
        this.render.left = 30;

        this.image = new Image()
        this.image.src = config.src || DefaultTilesheet
        this.image.onload = () => {
            this.isLoaded = true
            this.canvas.width = this.image.width
            this.canvas.height = this.image.height
        }

        this.tileSize = config.tileSize || 32

        this.activeCell = new ActiveCell({
            sheet: this
        })

        this.init();
    } 

    draw(ctx: any): void {
        this.isLoaded && ctx.drawImage(this.image, 0, 0)
    }

    drawLoop() {
        const step = () => {
            // clear rect
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

            this.draw(this.ctx)

            requestAnimationFrame(() => {
                step()
            })
        }

        step()
    }

    registerDrawEvent(): void {
    }

    init(): void {
        this.draw(this.ctx)
        this.drawLoop()
    }
}