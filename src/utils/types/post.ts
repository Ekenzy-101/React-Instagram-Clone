import { UserProfile } from "./user";

export interface Post {
  __typename: "Post";
  id: string;
  caption: string;
  location: string;
  image_urls: string[];
  likes: UserProfile[];
  comments: PostComment[];
  commentsCount: number;
  created_at: string;
  user: UserProfile;
}

export interface PostComment {
  __typename: "PostComment";
  id: string;
  user: UserProfile;
  post: Post;
  likes: UserProfile[];
  replies: ReplyComment[];
  content: string;
  created_at: string;
}

export interface ReplyComment {
  __typename: "ReplyComment";
  id: string;
  user: UserProfile;
  post: Post;
  likes: UserProfile[];
  comment: PostComment;
  content: string;
  created_at: string;
}
