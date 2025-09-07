# How to run

1. Set up en variables `AUTH_TOKEN` and `VERCEL_PROTECTION_BYPASS`
2. `$ yarn playwright test test.spec.ts --workers=1`
3. Check the preport by the link in the console

# Comments

## Intro

I designed this test using Page Object model and in a way leading to implementing Test Data Driven test automation approach. To show case you my test automation architecture skills I devoted a particular attention to designing the filters handling factory and component in the Category Results List page object. While working on that I was thinking not only of implementing the particular test case you gave me, but also of designing robust solution that would serve as a basis for handling future test cases invloving playing around with filters.

## Implementation Details

### Autosuggestions and Data Driven Testing

Take a look at `categoryPO.filters.clickCheckbox()` and `categoryPO.filters.fillInRangeIn()` functions input parameters autosugesstion in lines 37 and 38 of `test.spec.ts`. It would suggest you only those options that are possible for that particular Category Results List page object. Nice, isn't it? This makes it more resilient to, for example, human factor errors (e.g. typos). Following this logic, later on I can design a funciton with a strightforward interface that would allow me to perform as many filtering operations as possible for a given test. E.g. `filterResults(filterOptions: { filterName: FilterNamesEnum, fiterValue: FilterValuesEnum })`. Developing this apprach futher, I could imagine these tests to be fully data driven, covering as many test case filtering combinations as we would like to test while also parameterizing those with, for example, `.csv` file in, for example, this format:

```csv
testCaseId,categoryName,filtersObject,targetMonhtlyValue,downPaymentIncreaseAmount
0,VrachtenWagen,[{'Bouwjaar', (2018, 2023)}, {'Subcategorie':"Schuifzeilen"}],1200,1000
```

Following BDD principles, we can call that kind of test data files - **scenario outline** test data files.

### Flakyness

Pay attention to TestHelper class I specifically implemented to address issues resulting from flakyness!

## Benefits

Test Data driven approach would allow us to easily modify the test data without the need to touch the tests' scripts' code itself. It has a lot of benefits. For examples, people without coding knowledge (such as Manual QAs or BAs) would be able to parameterize the tests in accordance with their needs without asking for QA Automation's engineer help, which would speed up the development process and increase the overall software quality.

## Next Steps

Of course, to make those things possible I'll have to create a fixture Factory, test step groups and modules, csv reader, scenario outline data loaders and other supporting classes needed. The initial set up may be a bit slow, but as a payback in the long run it will result in the ability to generate new test cases in a matter of minutes and in an efficient test maintenance practice.

## Timeframe considerations

You might guess that implementing what I did took me a bit more then a couple of hours, since I wanted to demonstrate you my technical skills. Under a real time pressure situation I can see how this test could be designed in under a couple of hours, indeed, by compromising certain quality aspects. Furthermore, it can be designed even faster using playwright `codegen` tool, if we are under a sever time pressure. However, it is my opinion that test automation benefits significantly from following holistic engineering thinking.
