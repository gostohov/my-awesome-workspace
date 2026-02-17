import { test, expect } from '@playwright/test';

test.describe('Проверка ответов от resource-server', () => {
  test('GET /api и POST /api отображаются на странице', async ({ page }) => {
    await page.goto('/');

    const hello = page.locator('#hello-response');
    const post = page.locator('#test-post-response');

    // Убедимся, что элементы вообще есть
    await expect(hello).toBeVisible();
    await expect(post).toBeVisible();

    // Ждем, пока async pipe отрисует JSON (не "null"/пусто)
    await expect(hello).not.toHaveText(/null|\{\s*\}/);
    await expect(post).not.toHaveText(/null|\{\s*\}/);

    // Проверяем содержимое
    await expect(hello).toContainText('"message"');
    await expect(hello).toContainText('Hello API');

    await expect(post).toContainText('"value"');
    await expect(post).toContainText('test string');
  });
});
