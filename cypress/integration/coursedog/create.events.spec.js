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

    it('should be able to search rooms', () => {
        const roomForm = openAddEventPage()
            .addMeeting()
            .openSelectRoom()

        //when
        //search for available rooms
        //then
        // i can see 4 available rooms  //soft assertion
        roomForm.fill({
            features: ["microphone"]
        }).searchForAvailableRooms()
            .getFoundRooms().should("have.length", 4)

        // when
        //i type "Online" into room name
        //then
        //there should be "Online Chat" room
        roomForm.fill({
            roomName: "Online"
        }).searchForAvailableRooms()
            .getFoundRooms().should("have.length", 1)
            .should("contain.text", "Online Chat")
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

        page.submitBtn.click()

        //then 
        cy.contains("We have sent confirmation to the email you provided.", { timeout: 10000 })
    })
})

function openAddEventPage() {
    cy.get("#requestEventTypeSelect").select("Public Events")
    waitForNavigation(/events\/request\/.*/, 10000)
    waitForLoadingSpinnerEnd(10000)

    return new AddEventPage()
}