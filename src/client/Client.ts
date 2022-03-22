export default class Client {
    debug: boolean
    lastElementClicked: any
    constructor(config) {
        this.debug = config.debug || false

        this.lastElementClicked = null
    }
}