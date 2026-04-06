import { type HttpInterceptorFn } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { DEV_API_MOCKS } from '@app/dev-api.mocks';

/**
 * Dev-only mocks for API routes until a real backend is available.
 * Remove or narrow when the server is wired; production builds skip this interceptor.
 */
export const devApiMockInterceptor: HttpInterceptorFn = (req, next) => {
  if (!isDevMode()) {
    return next(req);
  }

  const matchedHandler = DEV_API_MOCKS.find(
    (handler) => req.method === handler.method && req.url.includes(handler.url),
  );
  if (matchedHandler) {
    return matchedHandler.handle(req);
  }

  return next(req);
};
