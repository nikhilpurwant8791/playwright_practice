import { test, expect } from '@playwright/test';


test.describe('Locators - practice', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.demoblaze.com/');
    });

    test('Verify text locator', async ({ page }) => {
        // const text_locator = page.getByText('PRODUCT STORE'); - Error - Strict Mode violation 
        const text_locator = page.getByRole('link', { name: 'PRODUCT STORE' });
        await expect(text_locator).toBeVisible();
    });

    test('verify locator', async ({ page }) => {
        // Don't have class or id to use, so use locator method
        const id_locator = page.locator('#nava');
        await expect(id_locator).toHaveText(' PRODUCT STORE')
    })
});

test.describe('Locators - Iframe', () => {
    test.beforeEach(async ({ page }) => {
        // await page.goto('https://demoqa.com/buttons');
        await page.goto('https://demo.automationtesting.in/Frames.html');
    });

    test('Verify iframe content', async({page}) => {
        const frameLocator = page.frameLocator('#singleframe');
        const textbox = frameLocator.locator('[type="text"]');
        await expect(textbox).toBeEmpty();
        await textbox.fill('Hello i_Frame');
        await expect(textbox).toHaveValue('Hello i_Frame');

    })
})