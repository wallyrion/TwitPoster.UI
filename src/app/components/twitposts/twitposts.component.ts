import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { CurrentUser } from '../../services/current-user.service';

@Component({
  selector: 'app-twitposts',
  templateUrl: './twitposts.component.html',
  styleUrls: ['./twitposts.component.scss'],
})
export class TwitpostsComponent implements OnInit {
  posts: Post[] = [];
  newPostText: string = '';

  constructor(
    private readonly postService: PostService,
    public readonly user: CurrentUser
  ) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  createPost() {
    this.postService.createPost(this.newPostText).subscribe(p => {
      this.newPostText = '';
      this.posts = [p, ...this.posts];
    });
  }
}
