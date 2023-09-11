import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  public authorImageUrl$: Observable<string | undefined> | undefined;
  @Input() public post!: Post;

  showComments = false;

  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.authorImageUrl$ = this.userService.getProfileImage(this.post.authorId);
  }

  updateCommentsNumber(count: number) {
    this.post = { ...this.post, commentsCount: count };
  }

  likeOrUnlike() {
    const action = this.post.isLikedByCurrentUser
      ? this.postService.unlikePost(this.post.id)
      : this.postService.likePost(this.post.id);

    action.subscribe(likesCount => {
      this.post = {
        ...this.post,
        likesCount: likesCount,
        isLikedByCurrentUser: !this.post.isLikedByCurrentUser,
      };
    });
  }
}
