export interface UserType {
  id?: string;
  color?: string;
  username: string;
  name: string;
}

export interface Users {
  users: UserType[];
}
