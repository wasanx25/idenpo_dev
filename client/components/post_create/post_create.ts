import {Component} from 'angular2/core';
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

const templateUrl = require('./post_create.html');

@Component({
  moduleId: module.id,
  templateUrl: templateUrl,
  selector: 'post-create',
  directives: [
    CORE_DIRECTIVES,
    FORM_DIRECTIVES,
    PostCreate
  ],
  providers: [
    PostService
  ]
})

export class PostCreate {
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
    console.log('okdesu');
  } 

  onSubmit(): void {
    this.post_api
      .create(this.post)
      .subscribe(_ => {
        this._router.navigate(['Posts']);
      });
  }
}
