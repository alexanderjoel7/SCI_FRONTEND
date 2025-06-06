import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_INITIALIZER } from '@angular/core';
import { EnvironmentLoaderService } from './_service/helpers/environment-loader.service';
import { provideHttpClient } from '@angular/common/http'; 
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations'; 
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideHttpClient(),
    provideAnimations(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.my-app-dark'
        }
      }
    }),
    EnvironmentLoaderService, // 👈 Asegúrate de incluir el servicio como provider
      {
        provide: APP_INITIALIZER,
        useFactory: initAppFn,
        deps: [EnvironmentLoaderService],
        multi: true
      }
  ]
};
export function initAppFn(envService: EnvironmentLoaderService) {
  return () => envService.loadEnvConfig('/assets/environments/environment.json');
}

