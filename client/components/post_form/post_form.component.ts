import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES, ControlGroup} from 'angular2/common';
import {Post} from '../../models';

// const templateUrl = require('./post_form.html');

@Component({
  moduleId: module.id,
  selector: 'post-form',
  inputs: ['post', 'form'],
  templateUrl: `
    <div class="form-group">
      <label class="col-xs-2 control-label">Id</label>
      <div class="col-xs-10">
        <p class="form-control-static">{{post.id}}</p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-xs-2 control-label">Name</label>
      <div class="col-xs-10">
        <input type="text" class="form-control"
        [(ngModel)]="post.url" [ngFormControl]="form.controls['url']">
      </div>
    </div>
    <div class="form-group">
      <label class="col-xs-2 control-label">Price</label>
      <div class="col-xs-10">
        <input type="text" class="form-control"
        [(ngModel)]="post.body" [ngFormControl]="form.controls['body']">
      </div>
    </div>`,
  directives: [
    FORM_DIRECTIVES,
    CORE_DIRECTIVES
  ]
})

export class PostFormComponent {
  post: Post;
  form: ControlGroup;
}
