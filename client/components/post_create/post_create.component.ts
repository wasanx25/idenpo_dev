import {Component, Injectable} from 'angular2/core';
import {
  FORM_DIRECTIVES,
  CORE_DIRECTIVES,
  FormBuilder,
  ControlGroup,
  Validators
} from 'angular2/common';
import {Router} from 'angular2/router';
import {PostFormComponent} from '../../components';
import {PostService} from '../../services';
import {Post} from '../../models';

// const templateUrl = require('./post_create.html');

@Component({
  moduleId: module.id,
  template: `
    <div class="container">
      <h2> Product Detail </h2>
      <form (ngSubmit)="onSubmit()" class="form-horizontal" [ngFormModel]="form">
        <div class="col-xs-12 text-right">
          <span [hidden]="form.valid">
            <label class="label label-danger mr-5">Invalid</label>
          </span>
          <button type="submit" class="btn btn-default" [disabled]="!form.valid">
            Create
          </button>
        </div>
    
        <post-form [post]="post" [form]="form"></post-form>
    
      </form>
    </div>`,
  selector: 'post-create',
  directives: [
    CORE_DIRECTIVES,
    FORM_DIRECTIVES,
    PostCreateComponent
  ],
  providers: [
    PostService
  ]
})

export class PostCreateComponent {
  form: ControlGroup;
  post: Post = new Post();

  constructor(
    private _router: Router,
    private post_api: PostService,
    fb: FormBuilder) {
    this.form = fb.group({
      'url': ['', Validators.required],
      'body': ['', Validators.required]
    });
  } 

  onSubmit(): void {
    this.post_api
      .create(this.post)
      .subscribe(_ => {
        this._router.navigate(['Posts']);
      });
  }
}
