/// <reference types="cypress" />

const { waitForLoadingSpinnerEnd, waitForNavigation } = require("./util")

context('Create events', () => {
    beforeEach(() => {
        cy.visit("https://damian-events.coursedog.com")
    })

    it('Add new event - required fields', () => {
        //given
        openAddEventPage()
        cy.log("make sure at least one required field is empty")

        //when
        cy.get("input[required='required']").should("be.empty")

        //then
        //submit button is disabled
        cy.get("button").contains("Submit").should("have.attr", "disabled")
    })

    it.only('Add new event - search room', () => {


        //when
        //search for available rooms

        //then
        // i can see 4 available rooms  //soft assertion

        // when
        //i type "Online" into room name

        //then
        //all found rooms should have 'online'
        //there should be "Online Chat" room
    })


    it('Add new event - submit form', () => {
        const page = openAddEventPage()

        page.eventForm.fill({
            email: "piox89@gmail.com",
            eventName: "QA Recruitment",
            eventDescription: "New project in cypress",
            startDate: "2020-06-18",
            endDate: "2020-06-21",
            eventOrganizer: "Coursedog Team",
            featuredEvent: "No",
            privateEvent: "Yes",
            notes: "nothing special"
        })

        page.addMeeting()
            .fill({
                startDate: "2020-06-21",
                startTime: "13:00",
                endDate: "2020-06-22",
                endTime: "14:00"
            })
            .openSelectRoom()
            .fill({
                roomName: "Online Chat"
            })
            .searchForAvailableRooms()
            .chooseRoom("Online Chat")

        page.submit()
    })
})

function openAddEventPage() {
    cy.get("#requestEventTypeSelect").select("Public Events")
    waitForNavigation(/events\/request\/.*/)
    waitForLoadingSpinnerEnd()

    return new AddEventPage()
}

/**
 * Base class for all components. 
 * Store information about root element of component or keep it as page root. 
 */
class Component {
    /**
     * @param {function that return cypress context} base 
     * @example
     * constructor(() => cy.get("article > div.root"))
     */
    constructor(base = null) {
        this.base = base
    }

    getBase() {
        return this.base ? this.base() : cy
    }

    /**
     * Perform get selector with component root.
     * Use cy if not defined
     */
    get(...args) {
        return this.getBase().get(...args)
    }
}

class AddEventPage {
    eventForm = new EventForm()
    addMeeting() {
        cy.get("button").contains("Add Meeting").click()

        return new MeetingForm(
            () => cy.get("legend").contains("Meetings & Locations").parent().get("div.flex-1 > fieldset")
            //cy.xpath(".//legend[contains(.,'Meetings & Locations')]/..//div[@class='flex-1']/fieldset")
        )
    }

    addContact() {
        //todo
    }

    submit() {
        cy.contains("Submit").click()
        cy.contains("Already sent")
    }
}

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

class EventForm extends Form {
    constructor() {
        this.email = new Input("Email Address")
        this.eventName = new Input("Event Name")
        this.eventDescription = new TextArea("Event Description")
        this.startDate = new Input("Start date")
        this.endDate = new Input("End date")
        this.eventOrganizer = new Select("Event Organizer")
        this.notes = new TextArea("Notes")
        this.featuredEvent = new RadioGroup("Featured Event")
        this.privateEvent = new RadioGroup("Private Event")
    }
}

class MeetingForm extends Form {
    constructor(base) {
        super(base)
        this.startDate = new Input("Start Date", base)
        this.startTime = new Input("Start Time", base)
        this.endDate = new Input("End Date", base)
        this.endTime = new Input("End Time", base)
        this.allDay = new RadioGroup("All Day", base)
    }

    openSelectRoom() {
        this.getBase().xpath(".//label[contains(.,'Room')]/..//button").click()
        return new SelectRoomForm(
            () => cy.get(".modal-content")
        )
    }
}

class SelectRoomForm extends Form {
    constructor(base) {
        super(base)
        this.roomName = new Input("Room name", base)
        this.features = new MultiSelect("Features", base)
    }

    searchForAvailableRooms() {
        this.getBase().contains("Search for Available Rooms").click()
        waitForLoadingSpinnerEnd()

        return this
    }

    chooseRoom(nameOrIndex) {
        const results = this.getBase().get("section[role=list] button")

        typeof nameOrIndex == "number"
            ? results.eq(nameOrIndex).click()
            : results.contains(nameOrIndex).click()
    }
}


class FormField extends Component {
    constructor(labelText, base) {
        super(base)
        this.labelText = labelText
    }

    getLabel() {
        return this.getBase().xpath(`.//label[contains(.,'${this.labelText}')]`)
    }
}

class Input extends FormField {
    setValue = text => this.getLabel().next("input").clear().type(text)
}

class TextArea extends FormField {
    setValue = text => this.getLabel().next("textarea").clear().type(text)
}

class Select extends FormField {
    setValue = option => this.getLabel().next("select").select(option)
}

class MultiSelect extends Select { } // for now identical as Select

/**
 * @param {string} labelText
 */
class RadioGroup extends FormField {
    getLabel() {
        return this.getBase().xpath(`.//legend[contains(.,'${this.labelText}')]`)
    }

    setValue(option) {
        this.getBase().xpath(`.//legend[contains(.,'${this.labelText}')]`).xpath(`./..//div[@role='radiogroup']/label[contains(.,'${option}')]`).click()
    }
}