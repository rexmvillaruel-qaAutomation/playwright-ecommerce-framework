import { APIRequestContext } from '@playwright/test';

import { AuthCredentials } from '../types/AuthTypes';

export class AuthApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async createAuthToken(credentials: AuthCredentials) {
    return this.request.post('/auth', {
      data: credentials,
    });
  }
}