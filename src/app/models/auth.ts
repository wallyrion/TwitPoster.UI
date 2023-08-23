export interface Account {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    createdAt: Date;
}

export enum UserRole {
    User = 10,
    Moderator = 20,
    Admin = 50,
    DatabaseOwner = 100
}
