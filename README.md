# Intro

Web app containing chef specials only. Basic HTML, CSS, js, tdd with mocha, git hooks
Future additions will be playwright.

# Run 

` docker run  --interactive --env-file ./env/.env.dev restaurantmenu-image npm run start`

# Test

`docker run  --interactive --env-file ./env/.env.test restaurantmenu-image npm run test:unit`