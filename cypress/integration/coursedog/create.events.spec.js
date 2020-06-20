/// <reference types="cypress" />

const { waitForLoadingSpinnerEnd, waitForNavigation } = require("./util")

context('Create events', () => {
    beforeEach(() => {
        cy.visit("https://damian-events.coursedog.com")
    })

    it('Add new event - required fields', () => {
        //open add event from list
        openAddEventForm()

        //make sure at least one required field is empty
        cy.get("input[required='required']").should("be.empty")

        //submit button is disabled
        cy.get("button").contains("Submit").should("have.attr", "disabled")
    })

    it.only('Add new event - search room', () => {
        //open add event from list
        openAddEventForm()

        const form = new CreateEventForm()
        form.email.fill("aaa")
        form.eventName.fill("bbbbbbbbbbbbb")
        form.eventDescription.fill("ccccccccccc")
        form.startDate.fill("2020-01-01")
        form.eventOrganizer.select("Madlen")

        //  (open SELECT ROOM modal) - click change room button
        
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
        // fillForm({
        //     eventName: "", // My First name and 1st letter of the Last name
        //     startDate: "",
        //     endDate: "", // day after
        //     startTime: "", // 1 pm
        //     endTime: "", // 2 pm
        // }),
        // selectRoom("Online Chat")
    })
})


function openAddEventForm() {
    cy.get("#requestEventTypeSelect").select("Public Events")
    waitForNavigation(/events\/request\/.*/)
    waitForLoadingSpinnerEnd()
} 

function CreateEventForm() {
    this.base = cy.get("div.page-expanded")

    this.email = new InputGroup("Email Address")
    this.eventName = new InputGroup("Event Name")
    this.eventDescription = new TextAreaGroup("Event Description")
    this.startDate = new InputGroup("Start date")
    this.email = new InputGroup("End date")
    this.eventOrganizer = new SelectGroup("Event Organizer")
    this.notes = new TextAreaGroup("Notes")
    // this.email = new RadioGroup("Featured Event") // yes/no
    // this.email = new RadioGroup("Private Event") // yes/no

}

function InputGroup(labelText) {
    this.getLabel = () => cy.xpath(`.//label[contains(.,'${labelText}')]`)
    this.fill = text => this.getLabel().next("input").clear().type(text)
}

function TextAreaGroup(labelText) {
    this.getLabel = () => cy.xpath(`.//label[contains(.,'${labelText}')]`)
    this.fill = text => this.getLabel().next("textarea").clear().type(text)
}

function SelectGroup(labelText) {
    this.getLabel = () => cy.xpath(`.//label[contains(.,'${labelText}')]`)
    this.select = option => this.getLabel().next("select").select(option)
}
