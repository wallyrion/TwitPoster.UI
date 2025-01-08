import { Component, Input } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
    standalone: false
})
export class PostComponent {
  @Input() public post!: Post;

  showComments = false;

  constructor(private readonly postService: PostService) {}

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
