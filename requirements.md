
## Requirements
1. Create a public git repo with the solution.
2. Setup a new Cypress ([https://www.cypress.io/](https://www.cypress.io/)) project.
3. Based on the user stories found below, add e2e specs.
    1. It doesn’t have to be 1:1 as in the user stories. Assume those were written by a non technical person that knows nothing about user stories and you can interpret/change them the way you’d like to fit into your preffered approach/architecture.
4. If you encounter any bugs (just 1 is ok), write a bug report. If you want, you can add a failing test that will pass once the bug is resolved. 
5. If your preferred process/methodology requires it, feel free to create any matching docs or similar.
6. Send us a link to the repo along with any other files you might have prepared.
7. Have fun!

**Note:** 

This task is less about the tests itself (we promise won’t be using those) and more about seeing **how** you write the code itself. This means bonus points for clean, maintainable and scalable approach within the code, repo and documentation. Feel free to be creative.

Sadly, we can’t give you access to the source code, so you will have to work within the existing limitations. Don’t worry, the website’s content won’t change. 

## User Stories:

All stories are scoped to users. Website address: [https://damian-events.coursedog.com/](https://damian-events.coursedog.com/)

- Given that current date is June 16th, 2020
    - When I click on **Today’s Events**
        - I can see there are no events.
- Given that current date is June 18th, 2020
    - When I click on **Today’s Events**
        - I can see all events happening today

            **Note**: There is 1 event happening on that date.

    - When I click on **Featured Events**
        - I can see all upcoming featured events

            **Note**: There are 3 upcoming featured meetings for that week.

    - When I click on the **QA Task Submission** event card
        - I can see more details about the meeting
            - Add to calendar link
            - Add to Google calendar link
            - Address
            - Event Type
            - Organization
        - I can see other meetings that will take place as part of that event.
    - When I use the **Search Input** in the navigation bar and type in "Finale" and confirm
        - I can find all events matching the phrase "Finale".

            **Note**: There’s 1 event matching the "Finale" phrase

    - When I select the **"Coursedog Team"** organization from the **Filter by Organization** dropdown
        - I can see all events organized by that organization

            **Note**: There are upcoming 5 events that match this search

- When I select a specific date from the calendar
    - I can only see events that happen on that day
- When I select Public Event from the select below **CREATE AN EVENT**
    - I can see a `Request A New Event: Public Form` header
    - I can see the "**Submit**" button is disabled when a required field is missing
    - I can fill the form with the following data:
        - Event name: My First name and 1st letter of the Last name
        - Start date: The time when you can join the team
        - End date: Day after Start date
        - Make it a feature event
        - Add a meeting
            - Given I use correct data:
                - Start Date and End Date same as event Start Date and End Date
                - Start Time: 1:00 PM
                - End Time: 2:00 PM
                - When I click on the Change Room button
                    - I can see a **SELECT ROOM** modal
                        - When I pick "**microphone**" from the list of features and click "**Search for Available Rooms**" button
                            - I can see 4 available rooms
                        - When I type "**Online**" into the "**Room name**" input.
                            - I can see only 1 available room "**Online Chat**"
                            - When I click on "**Online Chat**"
                            - I can see that the modal is closed and the room has changed
                - When I click on the "**Submit**" button
                    - I can see a confirmation that the event request has been sent
