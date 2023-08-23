import {Component, Input, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {PostCommentsResponse} from "../../models/comment";
import {Observable} from "rxjs";

@Component({
    selector: 'app-post-comments',
    templateUrl: './post-comments.component.html',
    styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent implements OnInit {
    @Input() public postId!: number;
    public newCommentText: string = '';
    public comments$: Observable<PostCommentsResponse> | undefined;

    constructor(private readonly postService: PostService) {

    }


    ngOnInit(): void {
        this.comments$ = this.postService.getComments(this.postId);
    }
}
