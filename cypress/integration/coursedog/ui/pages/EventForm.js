import { Form } from "../components/Form"
import { Input, TextArea, Select, RadioGroup } from "../components/FormFields"

export class EventForm extends Form {
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