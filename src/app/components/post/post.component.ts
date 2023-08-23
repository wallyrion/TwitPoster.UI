import {Component, Input} from '@angular/core';
import {Post} from "../../models/post";
import {PostComment} from "../../models/comment";

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent {
    @Input() public post!: Post;
    public comments: PostComment[] = [
        {
            id: 1,
            text: 'This is a fantastic post! Thank you for sharing',
            author: {
                id: 12,
                fullName: 'Alice Johnson',
                Email: 'alice.j@email.com'
            },
            createdAt: new Date('2023-08-10T14:20:00')
        },
        {
            id: 2,
            text: 'I learned a lot from this. Keep it up!',
            author: {
                id: 4,
                fullName: 'Bob Smith',
                Email: 'bob.b@email.com'
            },
            createdAt: new Date('2023-08-10T14:20:00')
        }
    ]
    showComments: boolean = false;
    newCommentText: string = '';
}
