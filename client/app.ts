import {ViewEncapsulation, Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES, Router, RouteConfig, Location} from 'angular2/router';
import 'rxjs/Rx';
import {Http, HTTP_PROVIDERS, Response} from 'angular2/http';
import {
  PostFormComponent
} from './components';
 
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
  providers: [HTTP_PROVIDERS],
  directives: [
    CORE_DIRECTIVES,
    ROUTER_DIRECTIVES
  ]
})
@RouteConfig([
  // { path: '/', name: 'PostCreateComponent', component: PostCreateComponent }
])
export class App {
 
  router: Router;
  location: Location;
  public status: number;
  public body: string;
 
  constructor(private http: Http, router: Router, location: Location) {
    this.router = router;
    this.location = location;
  }

  getApi() {
    this.http.get('/get_post')
        .subscribe(
          res => {
            this.status = res.status;
            this.body = res.json();
          },
          error => alert(error));
  }

  // getApi() {
  //   this._jsonp.get('/get_post')
  //       .subscribe(
  //         res => {
  //           console.log(res.json())
  //           // this.status = res.status;
  //           // this.body = res;
  //         },
  //         error => alert(error));
  // }
}

