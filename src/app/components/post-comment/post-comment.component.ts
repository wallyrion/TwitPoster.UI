import { Component, Input } from '@angular/core';
import { PostComment } from '../../models/comment';

@Component({
    selector: 'app-post-comment',
    templateUrl: './post-comment.component.html',
    styleUrls: ['./post-comment.component.scss'],
    standalone: false
})
export class PostCommentComponent {
  @Input()
  public comment!: PostComment;
}
