import { test, expect } from '@playwright/test';

test('profile notes updates', async ({ page }) => {
    await page.goto('/');
    await page.locator('#email').fill('test@test.com');
    await page.locator('#password').fill('testaccount1');
    await page.getByRole('button', {name: 'Login',exact:true}).click({force: true});
    await page.getByRole('button', {name: 'Profile',exact:true}).click({force: true});
    const cards = page.locator('div:has(> h3)');
    await cards.nth(1).locator('[class*="star"]').nth(4).click();
    await cards.nth(6).locator('[class*="star"]').nth(0).click();
    await page.getByRole('button', {name: 'Save',exact:true}).click({force: true});
    await page.getByRole('button', {name: 'Logout',exact:true}).click({force: true});
    await page.locator('#email').fill('test2@test.com');
    await page.locator('#password').fill('testaccount2');
    await page.getByRole('button', {name: 'Login',exact:true}).click({force: true});
    await page.getByRole('button', {name: 'Search',exact:true}).click({force: true});

    await page.locator('select[name="timeAvail"]').selectOption({ label: 'Select an hour' });
    await page.locator('select[name="hour"]').selectOption({ label: '12 PM' });

    const profiles = page.locator('div[class*="profilesContainer"]');
    const user = profiles.locator('div', {hasText: 'test'}).nth(0);
    
    await user.getByRole('button', {name: 'Message'}).click({force: true});

    await page.locator('form[class*="messageBar"] input').fill('yo i love a fellow drey hater big dubs lets go eat');
    await page.getByRole('button', {name: 'Send'}).click({force: true});
    await page.getByRole('button', {name: 'Logout', exact:true}).click({force: true});
    await page.locator('#email').fill('test@test.com');
    await page.locator('#password').fill('testaccount1');
    await page.getByRole('button', {name: 'Login',exact:true}).click({force: true});
    await page.getByRole('button', {name: 'Messages'}).click({force: true});

    await expect(page.locator('button[class*="chatButton"]').filter({has: page.locator('p[class*="name"]', { hasText: 'test2'})})).toBeVisible();
});
