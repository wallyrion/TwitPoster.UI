import {Component, Input} from '@angular/core';
import {Post} from "../../models/post";

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent {
    @Input() public post!: Post;

    showComments = false;

    updateCommentsNumber(count: number) {
        this.post = {...this.post, commentsCount: count}
    }
}
