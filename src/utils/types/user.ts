import { Post } from "./post";
export interface User {
  __typename: "User";
  id?: string;
  email?: string;
  name?: string;
  username?: string;
  image_url?: string;
  followers?: User[];
  following?: User[];
  website?: string;
  phone_no?: string;
  gender?: string;
  bio?: string;
  followersCount?: number;
  followingCount?: number;
  posts?: Post[];
  savedPosts?: Post[];
}
