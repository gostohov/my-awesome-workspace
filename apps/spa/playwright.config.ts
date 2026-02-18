import { defineConfig, devices } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';
import { workspaceRoot } from '@nx/devkit';
import * as path from 'path';

const baseURL = process.env.BASE_URL || 'https://my-awesome-workspace.localhost';
const authDir = path.resolve(__dirname, 'e2e/setup/.auth');

// Любая директория/поддиректория с именем operator на любом уровне:
const OPERATOR_DIR_GLOB = '**/operator/**/*.spec.ts';

// Дефолт для operator: все spec кроме тех, что попали в admin.
// Playwright поддерживает массив testMatch, а исключения делаются через testIgnore.
const ALL_SPECS_GLOB = '**/*.spec.ts';

export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './e2e' }),
  use: {
    baseURL,
    trace: 'on-first-retry',
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: 'operator',
      dependencies: ['setup'],
      testMatch: [OPERATOR_DIR_GLOB, ALL_SPECS_GLOB],
      use: {
        ...devices['Desktop Chrome'],
        storageState: path.join(authDir, 'operator.json'),
      },
    }
  ],
});
