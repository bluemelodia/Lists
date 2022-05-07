/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResponseInterceptor } from './response-interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
];