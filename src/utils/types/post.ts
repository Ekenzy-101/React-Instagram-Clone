import { UserProfile } from "./user";

export interface Post {
  id: string;
  caption: string;
  location: string;
  image_urls: string[];
  likes: UserProfile[];
  comments: PostComment[];
  created_at: string;
  user: UserProfile;
}

export interface PostComment {
  id: string;
  user: UserProfile;
  post: Post;
  content: string;
  created_at: string;
}
