

export class AddEventPage {
    eventForm = new EventForm()
    addMeeting() {
        cy.get("button").contains("Add Meeting").click()

        return new MeetingForm(
            () => cy.get("legend").contains("Meetings & Locations").parent().get("div.flex-1 > fieldset")
            //cy.xpath(".//legend[contains(.,'Meetings & Locations')]/..//div[@class='flex-1']/fieldset")
        )
    }

    addContact() {
        //todo
    }

    submit() {
        cy.contains("Submit").click()
        cy.contains("Already sent").should("be.visible")
    }
}