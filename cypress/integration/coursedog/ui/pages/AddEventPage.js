import { Form } from "../components/Form"
import { Input, TextArea, Select, RadioGroup, MultiSelect } from "../components/FormFields"
import { Button } from "../components/Button"
import { waitForLoadingSpinnerEnd } from "../../util"

export class AddEventPage {
    constructor() {
        this.eventForm = new EventForm()
        this.addMeetingBtn = new Button("Add Meeting")
        this.addContactBtn = new Button("Add Contact")
        this.submitBtn = new Button("Submit")
    }
    
    addMeeting() {
        this.addMeetingBtn.click()

        return new MeetingForm(
            () => cy.get("legend").contains("Meetings & Locations").parent().get("div.flex-1 > fieldset")
            //cy.xpath(".//legend[contains(.,'Meetings & Locations')]/..//div[@class='flex-1']/fieldset")
        )
    }

    addContact() {
        addContactBtn.click()
        return new AddContactForm(
            () => cy.contains("Contact Details").next().last()
            // () => cy.xpath("(//legend[contains(.,'Contact Details')]/../form)[last()]")
        )
    }

    submit() {
        submitBtn.click()
        cy.contains("We have sent confirmation to the email you provided.", { timeout: 10000 })
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

    /**
     * @returns {Chainable<JQuery<HtmlElement>>} Cypress context
     */
    getFoundRooms() {
        return this.getBase().get("section[role=list] button")
    }

    chooseRoom(nameOrIndex) {
        const results = this.getBase().get("section[role=list] button")

        typeof nameOrIndex == "number"
            ? results.eq(nameOrIndex).click()
            : results.contains(nameOrIndex).click()
    }
}

class AddContactForm extends Form {
    constructor(base) {
        this.name = new Input("Name", base)
        this.email = new Input("Email", base)
        this.phone = new Input("Phone", base)
        this.sendEmailNotifications = new RadioGroup("Send Email Notifications", base)
        this.deleteContactBtn = new Button("Delete Contact")
    }
}