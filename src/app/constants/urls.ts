/**
* Make service requests through a CORS proxy, which will add the Access-Control-Allow-Origin header
* to the request. This won't be needed once the code gets deployed to the server. 
*
* Adding the proxy URL as a prefix causes the request to get made through your proxy, which then:
* 
* Forwards the request to https://example.com.
* Receives the response from https://example.com.
* Adds the Access-Control-Allow-Origin header to the response.
* Passes that response, with that added header, back to the requesting frontend code.
* Source: https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
*/
export const PROXY_URL = 'https://sheltered-shore-07851.herokuapp.com/';

export const BASE_URL = 'https://guacnbean.com/todo/';
