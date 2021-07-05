import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL, PROXY_URL } from "./constants/urls";

/**
 * Interceptors will only intercept requests that are made using the HttpClient service.
 * 
 * For the interceptor to intercept all HTTP requests, it must be registered as a provider
 * to app.module. We register it as a multi-provider, since there can be multiple interceptors
 * with the SAME TOKEN running in the app.
 * 
 * Sources: 
 * https://ultimatecourses.com/blog/intro-to-angular-http-interceptors
 * https://stackoverflow.com/questions/38144641/what-is-multi-provider-in-angular2
 */
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (httpRequest.url.includes(BASE_URL)) {
            /**
            * Prepend the proxy URL. Remove once code is deployed to the server.
            */
            const proxyRequest = httpRequest.clone({
                url: PROXY_URL + httpRequest.url
            });

            return next.handle(proxyRequest);
        }
        
        return next.handle(httpRequest);
    }
}
