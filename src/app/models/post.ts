export interface Post {
  id: number;
  body: string;
  createdAt: Date;
  authorFirstName: string;
  authorLastName: string;
  authorPhotoUrl: string | undefined;
  authorId: number;
  likesCount: number;
  commentsCount: number;
  isLikedByCurrentUser: boolean;
}
