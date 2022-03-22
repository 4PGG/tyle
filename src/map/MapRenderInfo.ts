export default class MapRenderInfo {
    map: any
    top: number
    left: number
    scale: number

    constructor(config) {
        this.map = config.map
        this.top = config.top || 0
        this.left = config.left || 0
        this.scale = config.scale || 1.0
    }

    increaseScale(amount: number = 0.10) {
        this.scale += amount
        this.map.canvas.style.transform = `scale(${this.scale})`   
    }

    decreaseScale(amount: number = 0.10) {
        this.scale -= amount
        this.map.canvas.style.transform = `scale(${this.scale})`
    }

    increaseTop(amount: number = 2) {
        this.top += amount
        this.map.canvas.style.top = `${this.top}%`
    }

    decreaseTop(amount: number = 2) {
        this.top -= amount
        this.map.canvas.style.top = `${this.top}%`
    }

    increaseLeft(amount: number = 2) {
        this.left += amount
        this.map.canvas.style.left = `${this.left}%`
    }

    decreaseLeft(amount: number = 2) {
        this.left -= amount
        this.map.canvas.style.left = `${this.left}%`
    }

    init() {
        this.map.canvas.style.transform = `scale(${this.scale})`
        this.map.canvas.style.top = `${this.top}%`
        this.map.canvas.style.left = `${this.left}%`
    }
}