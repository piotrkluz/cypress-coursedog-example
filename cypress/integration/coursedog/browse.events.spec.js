/// <reference types="cypress" />

const { todayIs, openTab, waitForReload } = require("./util")

context('Browse events', () => {
    beforeEach(() => {
        cy.visit("https://damian-events.coursedog.com")
    })

    it('should display notification "No events today"', () => {
        todayIs("2020-06-16")
        openTab("today")

        cy.get('#main-content .flex h1').should("contain.text", "No events today")
    })

    it('should display today events', () => {
        todayIs("2020-06-18")
        openTab("today")

        cy.get("div[role=group] .card").should("have.length.greaterThan", 0)
        // todo date assertion
    })

    it('should display featured events', () => {
        todayIs("2020-06-18")
        openTab("featured")

        cy.get("div[role=group] .card").should("have.length.greaterThan", 0)
        //todo date assertion
    })

    it('should display event information', () => {
        //given
        // Open event "QA Submission Task"
        // openEvent("QA Task Submission")
        openTab("featured")
        cy.contains("QA Task Submission").click()
        waitForReload()

        cy.get("article button").contains("Add to calendar").should("be.visible")
        cy.get("article button").contains("Add to Google Calendar").should("be.visible")
        cy.get('article svg[data-icon="map-marker-alt"]').next() //Address
            .should("not.be.empty")

        cy.get("label").contains("Event Type").next().should("not.be.empty")
        cy.get("label").contains("Organized by").next().should("not.be.empty")

        cy.get("aside > div[aria-label^='Event card for']")
            .should("have.length.greaterThan", 0)


        //expect
        //event should contain: 
        // - Add to calendar link
        // - Add to Google calendar link
        // - Address
        // - Event Type
        // - Organization

        // I can see other meetings that will take place as part of that event.
    })

    it('Search for events', () => {
        // type "Finale in search box"
        cy.get("form[role=search] > input").type("Finale{enter}")

        // expect 1 matching event
        cy.get("#search-results a[aria-label^='Event name']")
            .should("have.length", 1)
            .should("contain.text", "QA Recruitment Finale")
    })

    it('Fiter by organization', () => {
        //when
        // Select organization "Coursedog Team"
        todayIs("2020-06-18")
        cy.get("#orgSelect").select("Coursedog Team")
        waitForReload()


        //then
        cy.get("#search-results a[aria-label^='Event name']").should("have.length", 5)
        cy.get("#search-results").contains("Organized by").each((el, i, list) => {
            expect(el.next().text()).contain("Coursedog Team")
        })

        //then
        // there should be 5 events in result
        // and all should have "Coursedog Team Organization"
    })

    it('pick date from calendar', () => {
        // pick 18 
        cy.get(".vc-w-full .vc-day-content").contains(/^18$/) //trivial solution, works only for current month
            .click()
        waitForReload()

        cy.get("div[role=group] .card").should("have.length", 1)
        // see that 1 found event
        // and event date is 18
    })
})


//BUGS: 
// Language: Calendar is PL, others are EN
// server side render on main page return empty featured events
// Select by "Coursedog Team" don't show 
// select room css artifacts