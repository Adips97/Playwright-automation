const { test, expect } = require('@playwright/test');

test('Verify Sort by Price - highest first', async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/men/tops-men/jackets-men.html');

    await page.locator('#sorter').first().selectOption({label:"Price"});
    await page.waitForLoadState('networkidle');

    await page.locator('//div[@class="column main"]//div[2]//div[3]//a[1]').click();

    await page.waitForLoadState('networkidle');

    const products = await page.$$eval('.product-item', items =>
        items.map(item => ({
            name: item.querySelector('.product-item-link').textContent.trim(),
            price: parseFloat(item.querySelector('.price').textContent.replace('$', ''))
        }))
    );

    console.log('Extracted Products and Prices:', products);

    const prices = products.map(p => p.price);
    for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
    }
  });
  
  test('Verify Sort by Price - lowest first', async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/men/tops-men/jackets-men.html');
  
    await page.locator('#sorter').first().selectOption({label:"Price"});
    await page.waitForLoadState('networkidle');
  
    const products = await page.$$eval('.product-item', items =>
        items.map(item => ({
            name: item.querySelector('.product-item-link').textContent.trim(),
            price: parseFloat(item.querySelector('.price').textContent.replace('$', ''))
        }))
    );

    console.log('Extracted Products and Prices:', products);

    const prices = products.map(p => p.price);
    for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });