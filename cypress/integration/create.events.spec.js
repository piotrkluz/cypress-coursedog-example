/// <reference types="cypress" />

const { waitForLoadingSpinnerEnd, waitForNavigation } = require("../support/util")
const { AddEventPage } = require("../support/ui/AddEventPage")

context('Create events', () => {
    it('Add new event - required fields', () => {
        openAddEventPage()

        cy._when("make sure at least one required field is empty")
        cy.get("input[required='required']").should("be.empty")

        cy._then("submit button is disabled")
        cy.get("button").contains("Submit").should("have.attr", "disabled")
    })

    it('should be able to search rooms', () => {
        const roomForm = openAddEventPage()
            .addMeeting()
            .openSelectRoom()

        cy._when("search for available rooms")
        cy._then("I can see 4 available rooms")
        roomForm.fill({
            features: ["microphone"]
        }).searchForAvailableRooms()
            .getFoundRooms().should("have.length", 4)

        cy._when("search room name 'Online'")
        cy._then("'Online Chat room should be found'")
        roomForm.fill({
            roomName: "Online"
        }).searchForAvailableRooms()
            .getFoundRooms().should("have.length", 1)
            .should("contain.text", "Online Chat")
    })


    it('Add new event - submit form', () => {
        const page = openAddEventPage()

        cy._when("Fill form")
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

        cy._and("Add meeting")
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

        page.submitBtn.click()

        cy._then("Success message should appear")
        cy.contains("We have sent confirmation to the email you provided.", { timeout: 10000 })
    })
})

function openAddEventPage() {
    cy.visit("https://damian-events.coursedog.com")
    cy.get("#requestEventTypeSelect").select("Public Events")
    waitForNavigation(/events\/request\/.*/, 10000)
    waitForLoadingSpinnerEnd(10000)

    return new AddEventPage()
}