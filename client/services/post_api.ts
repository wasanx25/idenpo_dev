import 'rxjs/Rx';
import {Inject} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Post} from '../models';

export class PostService {

  constructor(@Inject(Http) private http: Http) {}

  create(post: Post) {
    let param: { post: Post } = { 'post': post };
    return this.http
      .post('/posts', JSON.stringify(param));
  }

  update(id: string, post: Post) {
    let param: { post: Post } = { 'post': post };
    return this.http
      .put('/posts/' + id, JSON.stringify(param));
  }
}
