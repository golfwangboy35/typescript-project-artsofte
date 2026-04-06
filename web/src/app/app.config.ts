import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { routes } from '@/app/app/app.routes';
import { devApiMockInterceptor } from '@/app/entities/session/dev-api.mock.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([devApiMockInterceptor])),
    provideRouter(routes),
    provideAnimations(),
  ],
};
