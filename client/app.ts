import {ViewEncapsulation, Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES, Router, RouteConfig, Location} from 'angular2/router';
import 'rxjs/Rx';
import {Http, HTTP_PROVIDERS, Response} from 'angular2/http';
import {
  PostCreateComponent
} from './components';
 
@Component({
  moduleId: module.id,
  selector: 'app',
  encapsulation: ViewEncapsulation.Emulated,
  template: '<router-outlet></router-outlet>',
  directives: [
    CORE_DIRECTIVES,
    ROUTER_DIRECTIVES
  ]
})
@RouteConfig([
  { path: '/', name: 'PostCreate', component: PostCreateComponent }
])

export class App {
 
  router: Router;
  location: Location;
 
  constructor(router: Router, location: Location) {
    this.router = router;
    this.location = location;
  }
}

