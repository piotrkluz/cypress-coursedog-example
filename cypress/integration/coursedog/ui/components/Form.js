import { Component } from "./Component"

export class Form extends Component {
    fill(data) {

        for (const key in data) {
            const value = data[key]
            const formField = this[key]
            if (!formField || !formField.setValue) throw `Form field ${key} invalid or not exist.`

            formField.setValue(value)
        }

        return this
    }
}