
class Form extends Component {
    fill(data) {
        for ([key, value] of Object.entries(data)) {
            const formField = this[key]
            if (!formField || !formField.setValue) throw `Form field ${key} invalid or not exist.`

            formField.setValue(value)
        }

        return this
    }
}