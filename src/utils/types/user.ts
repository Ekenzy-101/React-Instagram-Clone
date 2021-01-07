import { Post } from "./post";
export interface User {
  id?: string;
  username?: string;
}
export type UserProfile = User & {
  name?: string;
  website?: string;
  gender?: string;
  image_url?: string;
  bio?: string;
  followersCount?: number;
  followingCount?: number;
  posts?: Post[];
};
