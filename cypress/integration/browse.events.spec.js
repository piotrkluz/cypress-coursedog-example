/// <reference types="cypress" />

const { todayIs, openTab, waitForReload } = require("../support/util")

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
        openTab("featured")

        //when
        cy.contains("QA Task Submission").click()
        waitForReload()

        cy._then("Verify event details")
        cy.get("article button").contains("Add to calendar").should("be.visible")
        cy.get("article button").contains("Add to Google Calendar").should("be.visible")
        cy.get('article svg[data-icon="map-marker-alt"]').next().should("not.be.empty") //Address
        cy.get("label").contains("Event Type").next().should("not.be.empty")
        cy.get("label").contains("Organized by").next().should("not.be.empty")

        cy._then("I can see other meetings that will take place as part of that event.")
        cy.get("aside > div[aria-label^='Event card for']")
            .should("have.length.greaterThan", 0)        
    })

    it('Search for events', () => {
        cy._when('type "Finale in search box"')
        cy.get("form[role=search] > input").type("Finale{enter}")

        cy._then('expect 1 matching event')
        cy.get("#search-results a[aria-label^='Event name']")
            .should("have.length", 1)
            .should("contain.text", "QA Recruitment Finale")
    })

    it('Fiter by organization', () => {
        cy._when('Select organization "Coursedog Team"')
        todayIs("2020-06-18")
        cy.get("#orgSelect").select("Coursedog Team")
        waitForReload()

        cy._then('there should be 5 events in result')
        cy.get("#search-results a[aria-label^='Event name']").should("have.length", 5)

        cy._and('all should have "Coursedog Team Organization"')
        cy.get("#search-results").contains("Organized by").each((el, i, list) => {
            expect(el.next().text()).contain("Coursedog Team")
        })
    })

    it('pick date from calendar', () => {
        cy._when("Pick '18' from calendar")
        cy.get(".vc-w-full .vc-day-content").contains(/^18$/) // todo trivial solution, works only for current month
            .click()
        waitForReload()

        cy._then("see that 1 found event")
        cy._and("and event date is 18")
        cy.get("div[role=group] .card").should("have.length", 1)
    })
})