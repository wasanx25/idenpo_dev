import "reflect-metadata";
import {bootstrap}    from 'angular2/platform/browser';
import {PostCreate} from './components';
import {provide} from 'angular2/core';
import {
  ROUTER_PRIMARY_COMPONENT,
  APP_BASE_HREF,
  ROUTER_PROVIDERS as NG2_ROUTER_PROVIDERS
} from 'angular2/router';
 
const ROUTER_PROVIDERS: Array<any> = [
  NG2_ROUTER_PROVIDERS,
  provide(ROUTER_PRIMARY_COMPONENT, {
    useValue: PostCreate
  }),
  provide(APP_BASE_HREF, {
    useValue: '/'
  })
];
 
const APP_PROVIDERS: Array<any> = [
  ROUTER_PROVIDERS
];
 
window.addEventListener("load", (e) => {
  bootstrap(PostCreate, APP_PROVIDERS);
});
