import "reflect-metadata";
import {bootstrap}    from 'angular2/platform/browser';
import {App} from './app';
import {provide} from 'angular2/core';
import {
  ROUTER_PRIMARY_COMPONENT,
  APP_BASE_HREF,
  ROUTER_PROVIDERS as NG2_ROUTER_PROVIDERS
} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
 
require('./development');
const ROUTER_PROVIDERS: Array<any> = [
  NG2_ROUTER_PROVIDERS,
  provide(ROUTER_PRIMARY_COMPONENT, {
    useValue: App
  }),
  provide(APP_BASE_HREF, {
    useValue: '/'
  })
];
 
const APP_PROVIDERS: Array<any> = [
  ROUTER_PROVIDERS
];
 
window.addEventListener("load", (e) => {
  bootstrap(App, [HTTP_PROVIDERS, ROUTER_PROVIDERS]);
});
