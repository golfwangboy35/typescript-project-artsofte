import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { devApiMockInterceptor } from '@app/dev-api.mock.interceptor';
import { routes } from '@app/app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([devApiMockInterceptor])),
    provideRouter(routes),
    provideAnimations(),
  ],
};
