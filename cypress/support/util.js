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
    waitForFadeTransitionEnd()
}

export function waitForLoadingSpinnerEnd(timeLimitMs = 5000) {
    cy.get('img[alt="Loading"]').should("exist")
    cy.get('img[alt="Loading"]', {timeout: timeLimitMs}).should("not.be.visible")
    waitForFadeTransitionEnd()
}

function waitForFadeTransitionEnd() {
    cy.wait(500) // wait for fade transition end. Without it cypress report snapshots show empty pages
}

/**
 * Wait for url change to match pattern.
 * 
 * @param {RegExp} rgx Pattern of new navigation url
 * @example 
 * cy.get("product 1").click();  
 * waitForNavigation(/produsts\/1$/)
 */
export function waitForNavigation(rgx, timeout = 5000) {
    cy.location('href', { timeout }).should("match", rgx)
}