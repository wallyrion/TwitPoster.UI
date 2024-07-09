import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from '../core/constants/api';
import { PostComment, PostCommentsResponse } from '../models/comment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly apiUrl = `${apiBaseUrl}/posts`;

  constructor(private readonly httpClient: HttpClient) {}

  public getPosts() {
    return this.httpClient.get<Post[]>(this.apiUrl);
  }

  public getComments(postId: number, pageSize: number, pageNumber: number) {
    return this.httpClient.get<PostCommentsResponse>(
      `${this.apiUrl}/${postId}/comments?pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
  }

  public createComment(postId: number, text: string) {
    return this.httpClient.post<PostComment>(
      `${this.apiUrl}/${postId}/comments`,
      { text }
    );
  }

  public createPost(body: string) {
    return this.httpClient.post<Post>(`${this.apiUrl}`, { body });
  }

  public likePost(postId: number) {
    return this.httpClient.put<number>(`${this.apiUrl}/${postId}/like`, {});
  }

  public unlikePost(postId: number) {
    return this.httpClient.put<number>(`${this.apiUrl}/${postId}/unlike`, {});
  }
}
