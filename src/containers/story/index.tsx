import React, { useEffect, useState } from "react";
import { useTitle } from "react-use";
import { useHistory, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_USER_STORIES } from "../../utils/queries/story";
import NotFoundPage from "../../common/not-found";
import { Story } from "../../utils/types/story";
import LoadingPage from "../../common/loading/page";
import StoryBody from "./body";

const StoryPage: React.FC = () => {
  // State Hooks
  const [state, setState] = useState<{
    index: number;
    story: Story | undefined;
  }>({ index: 0, story: undefined });

  // Other Hooks
  const params = useParams() as { username: string; id: string };
  const { data, loading, error } = useQuery(GET_USER_STORIES, {
    variables: { username: params.username },
    fetchPolicy: "cache-and-network",
  });
  const { replace, location } = useHistory();
  useTitle("Stories - Instagram");

  const stories = data?.stories as Story[] | undefined;
  // Effect Hooks
  useEffect(() => {
    const index = stories?.findIndex((s) => s.id === params.id);
    const story = stories?.find((s) => s.id === params.id);

    index === -1 || index === undefined
      ? setState((prevState) => ({ ...prevState, index: 0 }))
      : setState((prevState) => ({ ...prevState, index }));

    stories?.length && story
      ? setState((prevState) => ({ ...prevState, story }))
      : stories?.length
      ? setState((prevState) => ({ ...prevState, story: stories[0] }))
      : setState((prevState) => ({ ...prevState, story: undefined }));

    return () => {};
  }, [params.id, stories]);

  const handleStoryEnd = () => {
    const nextIndex = state.index + 1;
    if (stories && stories.length > nextIndex) {
      replace(
        `/stories/${params.username}/${stories[nextIndex].id}/`,
        location.state
      );
    }
  };

  if (error?.message.includes("User not found")) return <NotFoundPage />;

  if (stories)
    return (
      <StoryBody
        onStoryEnd={handleStoryEnd}
        currentIndex={state.index}
        currentStory={state.story}
        stories={stories}
      />
    );

  if (loading) return <LoadingPage spinner />;

  return null;
};

export default StoryPage;
