import { User } from "./user";

export interface Post {
  __typename: "Post";
  id: string;
  caption: string;
  location: string;
  image_urls: string[];
  likes: User[];
  saves: User[];
  comments: PostComment[];
  commentsCount: number;
  likesCount: number;
  created_at: string;
  user: User;
}

export interface PostComment {
  __typename: "PostComment";
  id: string;
  user: User;
  post: Post;
  likes: User[];
  replies: ReplyComment[];
  content: string;
  created_at: string;
}

export interface ReplyComment {
  __typename: "ReplyComment";
  id: string;
  user: User;
  post: Post;
  likes: User[];
  comment: PostComment;
  content: string;
  created_at: string;
}
