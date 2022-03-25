import type Map from '../map/Map'
import DefaultTilesheet from '../assets/default-tilesheet32.png'
import ActiveCell from './ActiveCell'
import Canvas from '../canvas/Canvas'
import { getCellFromCoords } from '../utils'

export default class TileSheet extends Canvas {
    map: Map

    tileSize: any
    image: HTMLImageElement
    active: boolean
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
            this.canvas.style.width = '100%'
            this.canvas.style.height = 'auto'
            this.canvas.width = this.canvas.offsetWidth
            this.canvas.height = this.canvas.offsetHeight
        }

        this.active = config.active || false

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
            this.drawActiveTile()

            requestAnimationFrame(() => {
                step()
            })
        }

        step()
    }

    setActiveTile(): void {
        this.activeCell.cell = getCellFromCoords(this.coord.x, this.coord.y, this.tileSize)
    }

    drawActiveTile(): void {
        // Draw the selected tile indicator...I probably overcomplicated the hell out of this...
        let pathSequence = [
            {
                x: this.activeCell.cell[0] * this.tileSize,
                y: this.activeCell.cell[1] * this.tileSize
            },
            {
                x: this.activeCell.cell[0] * this.tileSize + this.tileSize,
                y: this.activeCell.cell[1] * this.tileSize
            },
            {
                x: this.activeCell.cell[0] * this.tileSize + this.tileSize,
                y: this.activeCell.cell[1] * this.tileSize + this.tileSize
            },
            {
                x: this.activeCell.cell[0] * this.tileSize,
                y: this.activeCell.cell[1] * this.tileSize + this.tileSize
            }
        ]

        for (let i = 0; i < pathSequence.length; i++) {
            let startingPosition = i !== pathSequence.length - 1 ? pathSequence[i] : pathSequence[i];
            let endingPosition = i !== pathSequence.length - 1 ? pathSequence[i + 1] : pathSequence[0];
            switch(i) {
                case pathSequence.length - 1:
                    startingPosition = pathSequence[i]
                    endingPosition = pathSequence[0]
                    break
                default:
                    startingPosition = pathSequence[i]
                    endingPosition = pathSequence[i + 1]        
                    break
            }

            console.log(startingPosition)

            this.ctx.lineWidth = 1
            this.ctx.strokeStyle = "white"

            this.ctx.beginPath()
            this.ctx.moveTo(startingPosition.x, startingPosition.y)
            this.ctx.lineTo(endingPosition.x, endingPosition.y)
            this.ctx.closePath()
            this.ctx.stroke()
        }
    }

    registerSelectTileEvent(): void {
        this.onCanvasClick((event) => {
            this.setActiveTile()

            this.drawActiveTile()
        })
    }
    
    init(): void {
        this.draw(this.ctx)
        this.drawLoop()

        this.registerSelectTileEvent()
    }
}