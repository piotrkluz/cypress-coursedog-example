const moment = require('moment')

/**
 * @param {string} date
 * @example todayIs("2020-01-01") 
 */
export function todayIs(date) {
    const dateObj = new Date(date)
    if(!dateObj.toString() == "Invalid Date") `Date should have format YYYY-MM-DD, actual value: ${date} not match.`
    
    cy.log(`Today is ${date}`)
    cy.clock(dateObj.valueOf())
}

/**
 * Opens tab by click on link.
 * 
 * @param {"featured" | "today" | "upcoming"} tabName 
 * @example openTab("featured")
 */
export function openTab(tabName) {
    cy.get(`a[href="/${tabName}"]`).click()
    waitForReload(20000)
}

/**
 * Wait for reload page content.
 * @param {number} timeLimitMs 
 */
export function waitForReload(timeLimitMs = 5000) {
    cy.get("#main-content section.page-leave-active", {timeout: timeLimitMs}).should("exist")
    cy.get("#main-content section.page-enter-to").should("not.exist")

    // wait for fade transition end. Without it cypress report snapshots show empty pages
    cy.wait(500)
}

export function waitForLoadingSpinnerEnd(timeLimitMs = 5000) {
    cy.get('img[alt="Loading"]').should("exist")
    cy.get('img[alt="Loading"]', {timeout: timeLimitMs}).should("not.be.visible")
    cy.wait(500)
}

/**
 * @param {RegExp} rgx 
 */
export function waitForNavigation(rgx) {
    cy.location('href').should("match", rgx)
}