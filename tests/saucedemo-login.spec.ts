import { test, expect } from '@playwright/test';

test.describe('Login authentication', () => {
  test('Successful login with standard user credentials', async ({ page }) => {
    // Start from a fresh browser context and open https://www.saucedemo.com/.
    await page.goto('https://www.saucedemo.com/');

    // The Swag Labs login form is displayed with Username, Password, and Login controls.
    const loginForm = page.getByRole('form', { name: 'Login' });
    await expect(loginForm).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    // Enter standard_user in Username and secret_sauce in Password.
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');

    // Click Login.
    await page.getByRole('button', { name: 'Login' }).click();

    // The browser navigates to /inventory.html.
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // The Products page is displayed with the product inventory.
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();

    // No login error is displayed.
    await expect(page.getByRole('alert')).toHaveCount(0);
  });

  test('Reject a valid username with an incorrect password', async ({ page }) => {
    // Start from a fresh browser context and open https://www.saucedemo.com/.
    await page.goto('https://www.saucedemo.com/');

    // The Swag Labs login form is displayed.
    const loginForm = page.getByRole('form', { name: 'Login' });
    await expect(loginForm).toBeVisible();

    // Enter standard_user in Username and an incorrect password such as wrong_password in Password.
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('wrong_password');

    // Click Login.
    await page.getByRole('button', { name: 'Login' }).click();

    // The browser remains on the login page; navigation to /inventory.html does not occur.
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page).not.toHaveURL(/\/inventory\.html$/);

    // An alert displays the invalid-credentials message.
    await expect(page.getByRole('alert')).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );

    // The login form remains available for correction.
    await expect(loginForm).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('Reject an unknown username', async ({ page }) => {
    // Start from a fresh browser context and open https://www.saucedemo.com/.
    await page.goto('https://www.saucedemo.com/');

    // The Swag Labs login form is displayed.
    const loginForm = page.getByRole('form', { name: 'Login' });
    await expect(loginForm).toBeVisible();

    // Enter an unrecognized username such as unknown_user in Username and secret_sauce in Password.
    await page.getByRole('textbox', { name: 'Username' }).fill('unknown_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');

    // Click Login.
    await page.getByRole('button', { name: 'Login' }).click();

    // The browser remains on the login page; navigation to /inventory.html does not occur.
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page).not.toHaveURL(/\/inventory\.html$/);

    // An alert displays the invalid-credentials message.
    await expect(page.getByRole('alert')).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );

    // The login form remains available for correction.
    await expect(loginForm).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('Deny login for the locked-out user', async ({ page }) => {
    // Start from a fresh browser context and open https://www.saucedemo.com/.
    await page.goto('https://www.saucedemo.com/');

    // The Swag Labs login form is displayed.
    const loginForm = page.getByRole('form', { name: 'Login' });
    await expect(loginForm).toBeVisible();

    // Enter locked_out_user in Username and secret_sauce in Password.
    await page.getByRole('textbox', { name: 'Username' }).fill('locked_out_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');

    // Click Login.
    await page.getByRole('button', { name: 'Login' }).click();

    // The browser remains on the login page; navigation to /inventory.html does not occur.
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page).not.toHaveURL(/\/inventory\.html$/);

    // An alert displays the locked-out message.
    await expect(page.getByRole('alert')).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.',
    );

    // The locked-out user is not authenticated.
    await expect(loginForm).toBeVisible();
  });
});
