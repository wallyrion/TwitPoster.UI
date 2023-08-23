import { Injectable } from '@angular/core';
import {Post} from "../models/post";
import {HttpClient} from "@angular/common/http";
import {apiBaseUrl} from "../core/constants/api";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly apiUrl = `${apiBaseUrl}/posts`;

  constructor(private readonly httpClient: HttpClient) {
  }

  public getPosts() {
    return this.httpClient.get<Post[]>(this.apiUrl);
  }

  /*public posts: Post[] = [
    {
      id: 1,
      authorFirstName: 'John',
      authorLastName: 'Smith',
      body: 'Visual Studio 17.7 Preview 3 and .NET 8 Preview 6 continue the evolution of C# 12',
      createdAt: new Date(),
      commentsCount: 5,
      likesCount: 20,
      authorId: 32,
      isLikedByCurrentUser: true
    }, {
      id: 2,
      authorFirstName: 'Sarah',
      authorLastName: 'Johnson',
      body: 'In the past few years, I always need to copy the C# class on the server-side code to a .ts file. And then use VSCode to manually update the syntax to become an actual TS class/interface based on my need. Within Zyllem platform, the back end guys use inheritance and polymorphism extensively. In each concrete type, it might include',
      createdAt: new Date(),
      commentsCount: 0,
      likesCount: 1,
      authorId: 5,
      isLikedByCurrentUser: false
    },
  ]*/

}
