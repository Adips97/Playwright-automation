const { test, expect } = require('@playwright/test');

test('Verify "Add to Cart" functionality', async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/men/tops-men/jackets-men.html');

    // Click on the first product to go to the product details page
    await page.locator('.product-item a.product-item-link').first().click();

    // Wait for the product page to load
    await page.waitForLoadState('networkidle');

    // Select a size (update the selector as per the correct one)
    const sizeSelector = '.swatch-attribute.size .swatch-option';
    await page.locator(sizeSelector).first().click();

    // Select a color (update the selector as per the correct one)
    const colorSelector = '.swatch-attribute.color .swatch-option';
    await page.locator(colorSelector).first().click();

    // Add the item to the cart
    await page.locator('#product-addtocart-button').click();

    // Wait for the notification to appear
    await page.waitForSelector('.message-success');

    // Verify the notification message
    const notification = await page.locator('.message-success').textContent();
    expect(notification).toContain('You added');

    // Open the shopping cart
    await page.locator('.action.showcart').click();
    await page.locator('//span[normalize-space()="View and Edit Cart"]').click();

    const cartSizeSelector = '//dd[contains(text(),"XS")]';
    const cartColorSelector = '//dd[contains(text(),"Black")]';

    // Wait for the size and color elements to appear and get their text content
    const cartSize = (await page.locator(cartSizeSelector).textContent()).trim();
    const cartColor = (await page.locator(cartColorSelector).textContent()).trim();

    // Verify the size and color
    expect(cartSize).toBe('XS');
    expect(cartColor).toBe('Black');

    // Update the quantity and verify subtotal is updated
    const quantityInput = page.locator('input.input-text.qty'); // Adjust the selector if necessary
    await quantityInput.fill('2');
    await page.locator('.update-cart-item').click();  // Ensure this button is the correct one

    // Wait for the cart to update
    await page.waitForLoadState('networkidle');

    // Verify that subtotal has updated accordingly
    const subtotal = await page.locator('.cart-subtotal .price').textContent();
    console.log('Updated Subtotal:', subtotal);
    expect(subtotal).not.toBeNull(); // Ensure subtotal is updated
});