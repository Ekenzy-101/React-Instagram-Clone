import { User, UserProfile } from "../types/user";
import { GET_RELATED_USERS, GET_USER } from "../queries/user";
import { debug } from "../services/debugService";
import { ApolloCache } from "@apollo/client";

export const updateUserFollowers = (
  cache: ApolloCache<any>,
  data: { user: UserProfile },
  authUser: User
) => {
  const { followers, username } = data.user;
  const isPresent = followers?.some((f) => f.id === authUser?.id);

  debug.log("isPresent", isPresent);

  let newFollowers = [];
  if (isPresent) {
    newFollowers = followers?.filter((f) => f.id !== authUser?.id) as User[];
  } else {
    newFollowers = [...followers!, { __typename: "User", id: authUser?.id }];
  }

  debug.log("newFollowers", newFollowers);

  const newData = {
    user: {
      ...data.user,
      followers: newFollowers,
      followersCount: newFollowers.length,
    },
  } as {
    user: UserProfile;
  };

  debug.log("newData", newData);

  cache.writeQuery({
    query: GET_USER,
    data: newData,
    variables: { username },
  });
};

export const updateAuthUserFollowers = (
  cache: ApolloCache<any>,
  authUser: UserProfile | null,
  userId: string
) => {
  const isPresent = authUser?.following?.some((f) => f.id === userId);
  let newFollowing = [] as UserProfile[];
  if (isPresent) {
    newFollowing = [...authUser?.following?.filter((f) => f.id !== userId)!];
  } else {
    newFollowing = [
      ...authUser?.following!,
      { id: userId, __typename: "User" },
    ];
  }

  const newData = {
    profile: { ...authUser, following: newFollowing },
  } as { profile: UserProfile };

  cache.writeQuery({ query: GET_RELATED_USERS, data: newData });
};
