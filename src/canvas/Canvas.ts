import CoordInfo from "../canvas/CoordInfo";
import RenderInfo from "../canvas/RenderInfo"

export default class Canvas {
    canvas: any
    ctx: any
    coord: CoordInfo
    render: RenderInfo

    constructor(config) {
        this.canvas = config.canvas
        this.ctx = this.canvas.getContext("2d")
        this.coord = new CoordInfo({
            canvas: this
        })

        this.render = new RenderInfo({
            canvas: this
        })
    }
}