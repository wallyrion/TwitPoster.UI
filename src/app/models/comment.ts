export interface Author {
  id: number;
  fullName: string;
  email: string;
  photoUrl: string;
}

export interface PostComment {
  id: number;
  text: string;
  createdAt: Date;
  UpdatedAt?: Date;
  author: Author;
}

export interface PostCommentsResponse {
  totalCount: number;
  items: PostComment[];
}
