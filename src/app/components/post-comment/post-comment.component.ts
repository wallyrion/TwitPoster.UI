import { Component, Input } from '@angular/core';
import {PostComment} from "../../models/comment";

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent {
  @Input() public comment: PostComment = null!;
}
