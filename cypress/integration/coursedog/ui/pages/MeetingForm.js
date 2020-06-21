

class MeetingForm extends Form {
    constructor(base) {
        super(base)
        this.startDate = new Input("Start Date", base)
        this.startTime = new Input("Start Time", base)
        this.endDate = new Input("End Date", base)
        this.endTime = new Input("End Time", base)
        this.allDay = new RadioGroup("All Day", base)
    }

    openSelectRoom() {
        this.getBase().xpath(".//label[contains(.,'Room')]/..//button").click()
        return new SelectRoomForm(
            () => cy.get(".modal-content")
        )
    }
}