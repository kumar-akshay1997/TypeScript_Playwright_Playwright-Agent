# SauceDemo Login Test Plan

## Application Overview

Validate successful authentication and key unsuccessful login paths on SauceDemo (https://www.saucedemo.com/). Each test starts from a fresh browser context on the login page. Documented valid credentials are standard_user / secret_sauce; locked_out_user is a documented account that should be denied access.

## Test Scenarios

### 1. Login authentication

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful login with standard user credentials

**File:** `tests/login/successful-login.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open https://www.saucedemo.com/.
    - expect: The Swag Labs login form is displayed with Username, Password, and Login controls.
  2. Enter standard_user in Username and secret_sauce in Password.
    - expect: The username and password are accepted as entered.
  3. Click Login.
    - expect: The browser navigates to /inventory.html.
    - expect: The Products page is displayed with the product inventory.
    - expect: No login error is displayed.

#### 1.2. Reject a valid username with an incorrect password

**File:** `tests/login/incorrect-password.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open https://www.saucedemo.com/.
    - expect: The Swag Labs login form is displayed.
  2. Enter standard_user in Username and an incorrect password such as wrong_password in Password.
    - expect: The credentials are entered in the login form.
  3. Click Login.
    - expect: The browser remains on the login page; navigation to /inventory.html does not occur.
    - expect: An alert displays: “Epic sadface: Username and password do not match any user in this service”.
    - expect: The login form remains available for correction.

#### 1.3. Reject an unknown username

**File:** `tests/login/unknown-username.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open https://www.saucedemo.com/.
    - expect: The Swag Labs login form is displayed.
  2. Enter an unrecognized username such as unknown_user in Username and secret_sauce in Password.
    - expect: The credentials are entered in the login form.
  3. Click Login.
    - expect: The browser remains on the login page; navigation to /inventory.html does not occur.
    - expect: An alert displays: “Epic sadface: Username and password do not match any user in this service”.
    - expect: The login form remains available for correction.

#### 1.4. Deny login for the locked-out user

**File:** `tests/login/locked-out-user.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open https://www.saucedemo.com/.
    - expect: The Swag Labs login form is displayed.
  2. Enter locked_out_user in Username and secret_sauce in Password.
    - expect: The credentials are entered in the login form.
  3. Click Login.
    - expect: The browser remains on the login page; navigation to /inventory.html does not occur.
    - expect: An alert displays: “Epic sadface: Sorry, this user has been locked out.”
    - expect: The locked-out user is not authenticated.
