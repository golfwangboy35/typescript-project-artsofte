import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DASHBOARD_SUMMARY_API_PATH } from '@entities/dashboard-summary/dashboard-summary.api';
import { MOCK_DASHBOARD_SUMMARY_DTO } from '@entities/dashboard-summary/dashboard-summary.mock-dtos';
import { SIGN_IN_API_PATH, SIGN_UP_API_PATH } from '@entities/session/session.api';
import type { SessionDto, SignInDto, SignUpDto } from '@entities/session/session.dto';
import { RECENT_TRANSACTIONS_API_PATH } from '@entities/transaction/transaction.api';
import { MOCK_TRANSACTION_DTOS } from '@entities/transaction/transaction.mock-dtos';

export interface MockHandler {
  method: string;
  url: string;
  handle: (req: HttpRequest<unknown>) => Observable<HttpResponse<unknown>>;
}

function createJsonResponse<T>(status: number, body: T): Observable<HttpResponse<T>> {
  return of(new HttpResponse({ status, body }));
}

function createSessionResponse(status: number, req: HttpRequest<unknown>): Observable<HttpResponse<SessionDto>> {
  const body = req.body as SignInDto | SignUpDto;
  const session: SessionDto = { token: 'dev-token', email: body.email };
  return createJsonResponse(status, session);
}

export const DEV_API_MOCKS: MockHandler[] = [
  {
    method: 'POST',
    url: SIGN_IN_API_PATH,
    handle: (req) => createSessionResponse(200, req),
  },
  {
    method: 'POST',
    url: SIGN_UP_API_PATH,
    handle: (req) => createSessionResponse(201, req),
  },
  {
    method: 'GET',
    url: RECENT_TRANSACTIONS_API_PATH,
    handle: () => createJsonResponse(200, MOCK_TRANSACTION_DTOS),
  },
  {
    method: 'GET',
    url: DASHBOARD_SUMMARY_API_PATH,
    handle: () => createJsonResponse(200, MOCK_DASHBOARD_SUMMARY_DTO),
  },
];
