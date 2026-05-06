import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DASHBOARD_SUMMARY_API_PATH } from '@entities/dashboard-summary/dashboard-summary.api';
import { MOCK_DASHBOARD_SUMMARY_DTO } from '@entities/dashboard-summary/dashboard-summary.mock-dtos';
import { SIGN_IN_API_PATH, SIGN_UP_API_PATH } from '@entities/session/session.api';
import type { SessionDto, SignInDto, SignUpDto } from '@entities/session/session.dto';
import {
  RECENT_TRANSACTIONS_API_PATH,
  TRANSACTIONS_API_PATH,
  TRANSACTION_CATEGORIES_API_PATH,
} from '@entities/transaction/transaction.api';
import { MOCK_TRANSACTION_DTOS } from '@entities/transaction/transaction.mock-dtos';
import { MOCK_ALL_TRANSACTION_DTOS, MOCK_TRANSACTION_CATEGORIES } from '@entities/transaction/transaction.all-mock-dtos';
import { NOTIFICATIONS_API_PATH, NOTIFICATIONS_UNREAD_COUNT_API_PATH } from '@entities/notification/notification.api';
import { MOCK_NOTIFICATION_DTOS } from '@entities/notification/notification.mock-dtos';
import { PROFILE_API_PATH } from '@entities/profile/profile.api';
import { MOCK_PROFILE_DTO } from '@entities/profile/profile.mock-dtos';
import type { ProfileDto, UpdateProfileDto } from '@entities/profile/profile.dto';
import type { NotificationDto } from '@entities/notification/notification.dto';

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

let mockNotifications: NotificationDto[] = [...MOCK_NOTIFICATION_DTOS];
let mockProfile: ProfileDto = { ...MOCK_PROFILE_DTO };

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
    url: TRANSACTION_CATEGORIES_API_PATH,
    handle: () => createJsonResponse(200, MOCK_TRANSACTION_CATEGORIES),
  },
  {
    method: 'GET',
    url: TRANSACTIONS_API_PATH,
    handle: (req) => {
      const url = new URL(req.url, 'http://localhost');
      const search = url.searchParams.get('search')?.toLowerCase();
      const type = url.searchParams.get('type');
      const category = url.searchParams.get('category');
      let result = [...MOCK_ALL_TRANSACTION_DTOS];
      if (search) result = result.filter((t) => t.title.toLowerCase().includes(search));
      if (type) result = result.filter((t) => t.type === type);
      if (category) result = result.filter((t) => t.category_name === category);
      return createJsonResponse(200, result);
    },
  },
  {
    method: 'GET',
    url: DASHBOARD_SUMMARY_API_PATH,
    handle: () => createJsonResponse(200, MOCK_DASHBOARD_SUMMARY_DTO),
  },
  {
    method: 'GET',
    url: NOTIFICATIONS_UNREAD_COUNT_API_PATH,
    handle: () => createJsonResponse(200, { count: mockNotifications.filter((n) => !n.is_read).length }),
  },
  {
    method: 'GET',
    url: NOTIFICATIONS_API_PATH,
    handle: () => createJsonResponse(200, mockNotifications),
  },
  {
    method: 'PATCH',
    url: `${NOTIFICATIONS_API_PATH}/read-all`,
    handle: () => {
      mockNotifications = mockNotifications.map((n) => ({ ...n, is_read: true }));
      return createJsonResponse(200, { success: true });
    },
  },
  {
    method: 'PATCH',
    url: NOTIFICATIONS_API_PATH,
    handle: (req) => {
      const id = req.url.split('/').slice(-2)[0];
      mockNotifications = mockNotifications.map((n) => (n.id === id ? { ...n, is_read: true } : n));
      const updated = mockNotifications.find((n) => n.id === id);
      return createJsonResponse(200, updated ?? {});
    },
  },
  {
    method: 'GET',
    url: PROFILE_API_PATH,
    handle: () => createJsonResponse(200, mockProfile),
  },
  {
    method: 'PATCH',
    url: PROFILE_API_PATH,
    handle: (req) => {
      const dto = req.body as UpdateProfileDto;
      if (dto.name !== undefined) mockProfile = { ...mockProfile, name: dto.name };
      if (dto.currency !== undefined) mockProfile = { ...mockProfile, currency: dto.currency };
      if (dto.language !== undefined) mockProfile = { ...mockProfile, language: dto.language };
      return createJsonResponse(200, mockProfile);
    },
  },
];
