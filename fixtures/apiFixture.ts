import { test as base, request as playwrightRequest } from '@playwright/test';

import { AuthApiClient } from '../api/clients/AuthApiClient';
import { config } from '../utils/config';

type ApiFixtures = {
  authApiClient: AuthApiClient;
};

export const test = base.extend<ApiFixtures>({
  authApiClient: async ({}, use) => {
    const apiContext = await playwrightRequest.newContext({
      baseURL: config.apiBaseUrl,
    });

    const authApiClient = new AuthApiClient(apiContext);

    await use(authApiClient);

    await apiContext.dispose();
  },
});

export { expect } from '@playwright/test';