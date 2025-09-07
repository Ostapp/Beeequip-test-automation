## Objectives and requirements

- Visit the **test** website of Beequip (https://staging.beequip.com/)
  - This website is protected by Basic authentication, in the `tests/example.spec.js` credentials are provided to run the Playwright tests
  - You can use the same credentials to navigate the page on your own browser
- Navigate from the website to the Marketplace
- Find a _Vrachtwagen_ with _Schuifzeilen_ that fits the following requirements:
  - With a _bouwjaar_ between 2018 and 2023
  - With a _kilometerstand_ less than 300.000 kilometers
  - With six _cilinders_
- Navigate to the ad of the found equipment
- Calculate a monthly price using the lease calculator
  - Requests to the lease calculator require an additional header for login-bypass.
    - `x-vercel-protection-bypass: ???????????????????????????`
  - Search for Beequip as the company (_KVK-nummer:_ 63204258)
  - Use the `@example.com` or `@mailinator.com` domein
  - **Caution:** Don't calculate for other companies, to prevent burdening our sales team
- Increase the _aanbetaling_ and _looptijd_ to reduce the monthly price
- Request a quote
- **Stretch goal:** Add assertions for the email contents
- **Stretch goal:** Add data-driving tests for the _aanbetaling_ and _looptijd_ components

Requirements that you need to take into account:

- Playwright should be used to implement the tests
- Typescript is not mandatory
- At least two browsers should be supported
- A report with the test findings should be produced
