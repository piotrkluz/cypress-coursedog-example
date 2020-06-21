
/**
 * Common class to form fields identified by label.
 */
class FormField extends Component {
    constructor(labelText, base) {
        super(base)
        this.labelText = labelText
    }

    getLabel() {
        return this.getBase().xpath(`.//label[contains(.,'${this.labelText}')]`)
    }
}

export class Input extends FormField {
    setValue = text => this.getLabel().next("input").clear().type(text)
}

export class TextArea extends FormField {
    setValue = text => this.getLabel().next("textarea").clear().type(text)
}

export class Select extends FormField {
    setValue = option => this.getLabel().next("select").select(option)
}

export class MultiSelect extends Select { } // for now, identical as Select

/**
 * @param {string} labelText
 */
export class RadioGroup extends FormField {
    getLabel = () => this.getBase().xpath(`.//legend[contains(.,'${this.labelText}')]`)

    setValue(option) {
        this.getLabel().xpath(`./..//div[@role='radiogroup']/label[contains(.,'${option}')]`).click()
        // todo assert checked 
    }
}