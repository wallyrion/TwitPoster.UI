import {Injectable} from '@angular/core';
import {Post} from "../models/post";
import {HttpClient} from "@angular/common/http";
import {apiBaseUrl} from "../core/constants/api";
import {PostCommentsResponse} from "../models/comment";

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

    public getComments(postId: number) {
        return this.httpClient.get<PostCommentsResponse>(`${this.apiUrl}/${postId}/comments`)
    }
}
