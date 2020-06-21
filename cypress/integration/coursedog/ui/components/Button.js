import { Component } from "./Component"

export class Button extends Component {
    constructor(buttonName, base = null) {
        super(base)
        this.buttonName = buttonName
    }

    click = () => this.getBase().xpath(`.//button[contains(.,'${this.buttonName}')]`).click()
}