class SelectRoomForm extends Form {
    constructor(base) {
        super(base)
        this.roomName = new Input("Room name", base)
        this.features = new MultiSelect("Features", base)
    }

    searchForAvailableRooms() {
        this.getBase().contains("Search for Available Rooms").click()
        waitForLoadingSpinnerEnd()

        return this
    }

    chooseRoom(nameOrIndex) {
        const results = this.getBase().get("section[role=list] button")

        typeof nameOrIndex == "number"
            ? results.eq(nameOrIndex).click()
            : results.contains(nameOrIndex).click()
    }
}