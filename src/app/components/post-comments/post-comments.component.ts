import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PostService} from "../../services/post.service";
import {PostCommentsResponse} from "../../models/comment";
import {Observable, switchMap, tap} from "rxjs";

@Component({
    selector: 'app-post-comments',
    templateUrl: './post-comments.component.html',
    styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent implements OnInit {
    @Input() public postId!: number;
    @Output() public commentsNumberChanged = new EventEmitter<number>();
    public newCommentText: string = '';
    public comments$: Observable<PostCommentsResponse> | undefined;

    constructor(private readonly postService: PostService) {

    }

    ngOnInit(): void {
        this.comments$ = this.postService.getComments(this.postId);
    }

    createComment() {
        const getComments$ = this.postService.getComments(this.postId)
            .pipe(tap(res => this.commentsNumberChanged.next(res.totalCount)));

        this.comments$ = this.postService.createComment(this.postId, this.newCommentText)
            .pipe(switchMap(_ => getComments$))

    }
}
