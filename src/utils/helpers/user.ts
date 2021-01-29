import { User } from "../types/user";
import { GET_AUTH_USER, GET_USER } from "../queries/user";
import { debug } from "../services/debugService";
import { ApolloCache } from "@apollo/client";

export const updateAuthUserFollowers = (
  cache: ApolloCache<any>,
  authUser: User | null,
  profile: User
) => {
  const isPresent = authUser?.following?.some((f) => f.id === profile?.id);

  debug.log("isPresent", isPresent);

  let newFollowing = [] as User[];

  // Update the auth user's following and count accordingly

  if (isPresent) {
    newFollowing = [
      ...authUser?.following?.filter((f) => f.id !== profile?.id)!,
    ];
  } else {
    newFollowing = [
      ...authUser?.following!,
      { id: profile?.id, __typename: "User" },
    ];
  }

  debug.log("newFollowing", newFollowing);

  const newData = {
    profile: { ...authUser, following: newFollowing },
  } as { profile: User };

  debug.log("newData", newData);

  const userData = cache.readQuery({
    query: GET_USER,
    variables: { username: profile?.username },
  }) as { user: User | null } | null;

  if (userData?.user) {
    let newFollowers = [] as User[];
    let newFollowersCount = 0;

    // Update the the profile followers and count accordingly
    if (isPresent) {
      newFollowersCount = userData?.user.followersCount! - 1;
      newFollowers = [
        ...userData?.user?.followers?.filter((f) => f.id !== authUser?.id)!,
      ];
    } else {
      const { id, __typename, name, username, image_url } = authUser!;
      newFollowersCount = userData?.user.followersCount! + 1;
      newFollowers = [
        ...userData?.user?.followers!,
        { id, __typename, name, username, image_url },
      ];
    }
    const newUserData = {
      user: {
        ...userData?.user,
        followers: newFollowers,
        followersCount: newFollowersCount,
      },
    } as { user: User };

    cache.writeQuery({
      query: GET_USER,
      data: newUserData,
      variables: { username: profile?.username },
    });
  }

  cache.writeQuery({ query: GET_AUTH_USER, data: newData });
};
