import { test, expect } from '@playwright/test';

test('profile notes updates', async ({ page }) => {
    const str1 = 'testnotes1 yippeeee!!! 123 _*'
    const str2 = 'holy moly test notes numba 2 woahhh'

    await page.goto('/');
    await page.locator('#email').fill('test@test.com');
    await page.locator('#password').fill('testaccount1');
    await page.getByRole('button', {name: 'Login',exact:true}).click({force: true});

    // Notes 1
    await page.getByRole('button', {name: 'Profile',exact:true}).click({force: true});
    await page.locator('#notes').fill(str1);
    await page.getByRole('button', {name: 'Save',exact:true}).click({force: true});
    await page.getByRole('button', {name: 'Search',exact:true}).click({force: true});
    await page.getByRole('button', {name: 'Profile',exact:true}).click({force: true});
    await expect(page.locator('#notes')).toHaveValue(str1);

    // Notes 2
    await page.getByRole('button', {name: 'Messages',exact:true}).click({force: true});
    await page.getByRole('button', {name: 'Profile',exact:true}).click({force: true});
    await page.locator('#notes').fill(str2);
    await page.getByRole('button', {name: 'Save',exact:true}).click({force: true});
    await page.getByRole('button', {name: 'Settings',exact:true}).click({force: true});
    await page.getByRole('button', {name: 'Profile',exact:true}).click({force: true});
    await expect(page.locator('#notes')).toHaveValue(str2);

});
