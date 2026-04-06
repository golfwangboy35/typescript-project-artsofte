import { HttpResponse, type HttpInterceptorFn } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { of } from 'rxjs';

import { MOCK_DASHBOARD_SUMMARY_DTO } from '@/app/entities/dashboard/dashboard.mock-dtos';
import type { SessionDto, SignInDto, SignUpDto } from '@/app/entities/session/session.dto';
import { MOCK_TRANSACTION_DTOS } from '@/app/entities/transaction/transaction.mock-dtos';

/**
 * Dev-only mocks for API routes until a real backend is available.
 * Remove or narrow when the server is wired; production builds skip this interceptor.
 */
export const devApiMockInterceptor: HttpInterceptorFn = (req, next) => {
  if (!isDevMode()) {
    return next(req);
  }

  if (req.method === 'POST' && req.url.includes('/api/auth/login')) {
    const body = req.body as SignInDto;
    const session: SessionDto = { token: 'dev-token', email: body.email };
    return of(new HttpResponse({ status: 200, body: session }));
  }

  if (req.method === 'POST' && req.url.includes('/api/auth/register')) {
    const body = req.body as SignUpDto;
    const session: SessionDto = { token: 'dev-token', email: body.email };
    return of(new HttpResponse({ status: 201, body: session }));
  }

  if (req.method === 'GET' && req.url.includes('/api/transactions/recent')) {
    return of(new HttpResponse({ status: 200, body: MOCK_TRANSACTION_DTOS }));
  }

  if (req.method === 'GET' && req.url.includes('/api/dashboard/summary')) {
    return of(new HttpResponse({ status: 200, body: MOCK_DASHBOARD_SUMMARY_DTO }));
  }

  return next(req);
};
