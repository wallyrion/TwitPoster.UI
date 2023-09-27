export interface Post {
  id: number;
  body: string;
  createdAt: Date;
  authorFirstName: string;
  authorLastName: string;
  authorPhotoUrl: string;
  authorId: number;
  likesCount: number;
  commentsCount: number;
  isLikedByCurrentUser: boolean;
}
