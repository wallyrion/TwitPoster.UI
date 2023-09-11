import { Component, Input, OnInit } from '@angular/core';
import { PostComment } from '../../models/comment';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss'],
})
export class PostCommentComponent implements OnInit {
  @Input()
  public comment!: PostComment;
  public authorImgUrl$: Observable<string | undefined> | undefined;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.authorImgUrl$ = this.userService.getProfileImage(
      this.comment.author.id
    );
  }
}
