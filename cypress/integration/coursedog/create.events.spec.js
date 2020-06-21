/// <reference types="cypress" />

const { waitForLoadingSpinnerEnd, waitForNavigation } = require("./util")
const { AddEventPage } = require("./ui/pages/AddEventPage")

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