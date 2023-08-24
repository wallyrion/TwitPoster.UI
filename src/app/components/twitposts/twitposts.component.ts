import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-twitposts',
  templateUrl: './twitposts.component.html',
  styleUrls: ['./twitposts.component.scss'],
})
export class TwitpostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private readonly postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
}
