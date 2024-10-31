import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; // Ensure the path is correct
import { LoginData } from '../pages/LoginData';
test.describe('Login functionality', () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    
  });
  test('Unsuccessful login with incorrect credentials', async () => {
    const { email, password } = LoginData.invalidUser; // Fetch from credentials.json
    await loginPage.login(email, password);
    
    // Get the invalid password error message
    const invalidPasswordMessage = await loginPage.getErrorMessage();
    expect(invalidPasswordMessage).toContain('Your email or password is incorrect!'); // Adjust based on your UI message
  });
  test('Login and search products', async ({ page }) => {
    const { email, password } = LoginData.validUser;
    
    // Log in
    await loginPage.login(email, password);
    await loginPage.goToProducts();
    var productName = 'T-shirt'; 
    await loginPage.searchAndAddToCart("Men Tshirt");
});
test('Login and add product to cart from home', async ({ page }) => {
  const { email, password } = LoginData.validUser;
  await loginPage.login(email, password);
  await loginPage.gotoHome();
  const cartNotification = await page.locator('Rose Pink Embroidered Maxi Dress');
});
test('Login and submit a review on the contact page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const { email, password } = LoginData.validUser;
  
  // Log in with valid credentials
  await loginPage.login(email, password);

  // Use review details from LoginData
  const { reviewname, reviewemail, reviewsubject, reviewmessage, adddoc, submitreview } = LoginData.reviewDetails;

  // Submit the review using goandreview method
  await loginPage.goandreview(
    reviewname,
    reviewemail,
    reviewsubject,
    reviewmessage,
    adddoc,
    submitreview
  )
});
});
