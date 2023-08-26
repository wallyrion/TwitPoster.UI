import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostService } from '../../services/post.service';
import { PostComment, PostCommentsResponse } from '../../models/comment';
import { Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss'],
})
export class PostCommentsComponent implements OnInit {
  private readonly pageSize = 5;
  private totalCount: number | undefined;
  private getComments$!: Observable<PostCommentsResponse>;

  private page = 1;

  @Input() public postId!: number;
  @Output() public commentsNumberChanged = new EventEmitter<number>();
  public newCommentText = '';
  public comments: PostComment[] = [];
  constructor(private readonly postService: PostService) {}

  ngOnInit(): void {
    this.getComments$ = this.postService
      .getComments(this.postId, this.pageSize, 1)
      .pipe(
        tap(res => {
          this.comments = res.items;
          this.totalCount = res.totalCount;
          this.commentsNumberChanged.next(res.totalCount);
        })
      );

    this.getComments$.subscribe();
  }

  createComment() {
    this.page = 1;

    this.postService
      .createComment(this.postId, this.newCommentText)
      .pipe(switchMap(() => this.getComments$))
      .subscribe();
  }

  onScroll(): void {
    const totalPages = Math.ceil(this.totalCount! / 5);

    if (totalPages == this.page) {
      return;
    }

    this.page++;

    this.postService
      .getComments(this.postId, this.pageSize, this.page)
      .subscribe(res => (this.comments = [...this.comments, ...res.items]));
  }
}
