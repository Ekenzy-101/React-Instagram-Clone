import { User } from "./user";

export interface Story {
  __typename: "Story";
  id: string;
  user: User;
  image_url: string;
  created_at: string;
}
