/// <reference types="cypress" />


context('Browse events', () => {
    beforeEach(() => {
    //   cy.visit('https://damian-events.coursedog.com/')
    })

    it('Empty today events', () => {
        cy.visit("https://damian-events.coursedog.com")
        
        
         
        // now is 16th

        //today events is empty
    })

    it('Today events shows list', () => {
        // now is 18th

        //today events contain 1 event
        //featured events contain 3 events
    })

    it('Event information', () => {
        //given
        // Open event "QA Submission Task"


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
        // type "Finae in search box"
        //confirm

        // expect 1 matching event
    })

    it('Fiter by organization', () => {
        //when
        // Select organization "Coursedog Team"

        //then
        // there should be 5 events in result
        // and all should have "Coursedog Team Organization"
    })

    it('pick date from calendar', () => {
        // pick 18 

        // see that 1 found event
        // and event date is 18
    })
})


//BUGS: 
// Language: Calendar is PL, others are EN
