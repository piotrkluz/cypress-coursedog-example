# Cypress tests example
- Covers requirements from: 
https://www.notion.so/QA-Recruitment-Task-b2aa076d8c8341b689a399c73ea59db1
Also available here: 
https://github.com/piotrkluz/cypress-coursedog-example/blob/master/requirements.md

## How to run
```bash
yarn && yarn cypress run 
# OR npm install && npm run cypress run 
```
After run screenshots and videos will appear in project directiries: 
- `./cypress/screenshot `
- `./cypress/videos `



## Set up Development
```bash
#once
npm i -g yarn
yarn

#run cypress UI:
yarn cypress open
```

## TODO's / problems
 - [ ] - test performance improvements (cache page load, cache found components etc.)
 - [ ] - Resolve syntax editor prompting when return cypress context like `Chainable<JQuery<HtmlElement>>`
 - [ ] - Add TypeScript 
       - Research why official Typescript plugin for cypress not works well
       - Add typing in components
 - [ ] - rethink components model
       - way to stable store **resolved** html elements as base element without cypress crashes
       - get and store collection of components
 - [x] - report messages helper / generator like
