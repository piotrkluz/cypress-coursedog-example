/**
* Base class for all components. 
* Store information about root element of component.
*/
export class Component {
    /**
     * @param {function that return cypress context} base 
     * @example
     * constructor(() => cy.get("article > div.root"))
     */
    constructor(base = null) {
        this.base = base
    }

    /**
     * Perform base component search and returns cypress context of it. 
     * @example 
     * myComponent.getBase().get("li")...
     */
    getBase() {
        return this.base ? this.base() : cy
    }
}