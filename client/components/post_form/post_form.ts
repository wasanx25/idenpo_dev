import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES, ControlGroup} from 'angular2/common';
import {Post} from '../../models';

// const templateUrl = require('./post_form.html');

@Component({
  moduleId: module.id,
  selector: 'post-form',
  inputs: ['post', 'form'],
  // templateUrl: templateUrl,
  directives: [
    FORM_DIRECTIVES,
    CORE_DIRECTIVES
  ]
})

export class PostFormComponent {
  post: Post;
  form: ControlGroup;
}
