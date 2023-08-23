
export interface Author {
  id: number;
  fullName: string;
  Email: string;
}


export interface PostComment {
  id: number;
  text: string;
  createdAt: Date;
  UpdatedAt?: Date;
  author: Author;
}
