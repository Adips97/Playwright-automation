const { test, expect } = require('@playwright/test');

test('Verify search box functionality with keyword "Jacket"', async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/');

    await page.fill('input[name="q"]', 'Jacket');
    await page.press('input[name="q"]', 'Enter');

    await page.waitForSelector('.products-grid');
    
    const products = await page.$$eval('.products-grid .product-item-link', items => items.map(item => item.textContent.trim()));
    
    for (const product of products) {
        expect(product).toContain('Jacket');
    }
});