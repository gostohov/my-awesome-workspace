import { test as setup, Page } from '@playwright/test';
import * as path from 'path';

const baseURL = process.env.BASE_URL || 'https://my-awesome-workspace.localhost';

const authDir = path.resolve(__dirname, '.auth');
const operatorState = path.join(authDir, 'operator.json');

const login = async (page: Page, username: string, password: string): Promise<void> => {
  await page.goto(baseURL);

  await page.locator('input[name="username"]').waitFor();
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', password);
  await page.click('button[name="login"]');
  await page.waitForURL(/my-awesome-workspace\.localhost/, { timeout: 5000 });
};

setup('auth: operator', async ({ page }) => {
  await login(page, process.env.E2E_OPERATOR_USER || 'testuser', process.env.E2E_OPERATOR_PASS || '123');

  await page.context().storageState({ path: operatorState });
});
