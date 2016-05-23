import {ViewEncapsulation, Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES, Router, RouteConfig, Location} from 'angular2/router';
import 'rxjs/Rx';
import {JSONP_PROVIDERS, Jsonp} from 'angular2/http';
 
import {AppComponent} from './components/AppComponent';
 
@Component({
  moduleId: module.id,
  selector: 'app',
  encapsulation: ViewEncapsulation.Emulated,
  template: `
    <h1>This is Root Component</h1>
    <router-outlet></router-outlet>
    <button (click)='getApi();'>get api</button>
    <p>status: {{ status }}</p>
    <pre>{{ body | json }}</pre>
  `,
  providers: [JSONP_PROVIDERS],
  directives: [
    CORE_DIRECTIVES,
    ROUTER_DIRECTIVES
  ]
})
@RouteConfig([
  { path: '/', name: 'AppComponent', component: AppComponent }
])
export class App {
 
  router: Router;
  location: Location;
  public status: number;
  public body: string;
 
  constructor(private _jsonp: Jsonp, router: Router, location: Location) {
    console.log('app.ts');
    this.router = router;
    this.location = location;
  }

  getApi() {
    this._jsonp.get('http://connpass.com/api/v1/event/?callback=JSONP_CALLBACK&keyword=python')
        .subscribe(
          res => {
            this.status = res.status;
            console.log(res.status);
            // this.body = res.json().events;
          },
          error => alert(error));
  }
}

