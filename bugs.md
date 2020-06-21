## Found bugs / note's
1. Server side render on main page return empty featured events.
    - Steps to reproduce: 
        1. Paste `https://damian-events.coursedog.com/` in web browser and open 
        (message `"There no upcoming events"` will appear)
        2. Navigate somewhere -> click "Featured events"
        3. Click on page logo `"Polish School Events"` (will back to main page)
        4. Main page with 4 featured events will appear
        **EXPECTED:** The same events should appear in point 1

2. [Might not bug] UI Filtering **"Filter by event type"** and **"Filter by organization"** implicitly filters AFTER the current date. 
    - Steps to reproduce: 
        1. Open https://damian-events.coursedog.com
        2. Click date 30-06-2020
        3. "Filter by event type" -> **QA Recruitment**
        **ACTUAL:** Shows nothing, because all events are before choosen date
        **EXPECTED:** Some notification about filter by choosen date

3. [CSS styling bug] Broken edge in **Select Room** modal -> **Available Rooms List** header
    - Steps to reproduce:
        1. Open https://damian-events.coursedog.com
        2. Open Add new Event page
        3. Click "Add Meeting"
        4. Click "Select Room"
        5. Click "Search for Available Rooms
        **ACTUAL:** **Available Rooms List** have broken border
        **EXPECTED:** Fix some CSS