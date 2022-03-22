export function emitEvent(name: string, detail: any) {
    const event = new CustomEvent(name, {
        detail
    })

    document.dispatchEvent(event)
}

export function getCellFromCoords(x: number, y: number, tileSize: number) {
    return [Math.floor(x / tileSize), Math.floor(y / tileSize)]
}