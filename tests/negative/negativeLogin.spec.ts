import { test } from '../../fixtures/baseFixture';
import negativeLogindata from '../../data/negativeLoginData.json';

 Object.values(negativeLogindata).forEach(testCase => {
    
 test(testCase.testName, async ({ loginPage }) => {
 //Open Login page   
    await loginPage.goto()
// Login using credentials   
    await loginPage.login(
        testCase.username, 
        testCase.password)
// Verify error message
    await loginPage.verifyLoginError(
        testCase.expectedMessage)
        })
 });