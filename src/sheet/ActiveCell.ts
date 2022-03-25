import type TileSheet from "./TileSheet"

export default class ActiveCell {
    sheet: TileSheet
    cell: any
    constructor(config) {
        this.sheet = config.sheet
        this.cell = config.cell || [0, 0]
    }
}