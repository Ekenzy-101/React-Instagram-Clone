import { Paper, Avatar, Typography, IconButton } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { Close, MoreHoriz } from "@material-ui/icons";
import React, { useState } from "react";
import Stories from "react-insta-stories";
import toast from "react-hot-toast";
import { useMedia, useWindowSize } from "react-use";
import { Link, useHistory, useParams } from "react-router-dom";

import { useStyles } from "../styles";
import {
  IG_TRANSPARENT_LOGO_URL,
  PROFILE_PIC_URL,
} from "../../../utils/constants/url";
import { useUser } from "../../../utils/context/user";
import { parseCommentDate } from "../../../utils/helpers/comment";
import { Story } from "../../../utils/types/story";
import { DELETE_STORY } from "../../../utils/mutations/story";
import { TO_HOME_PAGE } from "../../../utils/constants/routes";
import { modalState } from "../../../utils/types/modal";
import StoryModal from "../modal";
import StoryDeleteModal from "../modal/delete";
import { GET_USER_STORIES } from "../../../utils/queries/story";
import CustomToast from "../../../common/toast";

interface Props {
  stories: Story[];
  currentIndex: number;
  currentStory: Story | undefined;
  onStoryEnd: () => void;
}

const StoryBody: React.FC<Props> = ({
  stories,
  currentIndex,
  currentStory,
  onStoryEnd,
}) => {
  // Global State Hooks
  const { user: authUser } = useUser();

  const [show, setShow] = useState<modalState>("none");

  // Other Hooks
  const [deletePost, { loading }] = useMutation(DELETE_STORY);
  const { username } = useParams() as { username: string; id: string };
  const { location, replace } = useHistory();
  const classes = useStyles();
  const mobileView = useMedia(`(max-width: 600px)`);
  const { width, height } = useWindowSize();

  // Event Handlers
  const handleGoBack = () => {
    const path = location.state as string | undefined;
    replace(path ? path : TO_HOME_PAGE);
  };

  const handleDeleteStory = async () => {
    try {
      if (currentStory) {
        await deletePost({
          variables: { id: currentStory?.id },
          update(cache) {
            handleGoBack();
            const newStories = stories.filter((s) => s.id !== currentStory?.id);
            cache.writeQuery({
              query: GET_USER_STORIES,
              variables: { username },
              data: { stories: newStories },
            });
          },
        });
      }
    } catch (error) {
      toast(<CustomToast message="Couldn't delete story" />);
    }
  };

  const isAuthUser = username === authUser?.username;

  // JSX
  return (
    <Paper square variant="outlined" className={classes.root}>
      <StoryModal
        open={show === "story"}
        onClose={() => setShow("none")}
        onSwitchModal={() => setShow("story-delete")}
      />
      <StoryDeleteModal
        open={show === "story-delete"}
        onClose={() => setShow("none")}
        onDelete={!loading ? handleDeleteStory : undefined}
      />
      <Close className={classes.closeBtn} onClick={handleGoBack} />

      {mobileView ? null : (
        <Avatar
          src={IG_TRANSPARENT_LOGO_URL}
          variant="square"
          className={classes.brandLogo}
          onClick={() => replace(TO_HOME_PAGE)}
        />
      )}

      <div className={classes.wrapper}>
        <div style={{ position: "relative" }}>
          {isAuthUser && stories.length ? (
            <IconButton
              className={classes.deleteBtn}
              onClick={() => setShow("story")}
            >
              <MoreHoriz />
            </IconButton>
          ) : null}

          {stories.length ? (
            <Stories
              header={() => {
                return (
                  <div className={classes.headerWrapper}>
                    {isAuthUser ? (
                      <>
                        <Avatar
                          src={
                            authUser?.image_url
                              ? authUser?.image_url
                              : PROFILE_PIC_URL
                          }
                        />
                        <Typography
                          variant="body1"
                          className={classes.username}
                        >
                          Your Story
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Avatar
                          src={
                            currentStory?.user.image_url
                              ? currentStory?.user.image_url
                              : PROFILE_PIC_URL
                          }
                        />
                        <Link to={`/${username}/`} className={classes.link}>
                          {username}
                        </Link>
                      </>
                    )}
                    <Typography variant="caption" className={classes.username}>
                      {parseCommentDate(
                        currentStory ? currentStory?.created_at : "1m"
                      )}
                    </Typography>
                  </div>
                );
              }}
              stories={stories.map((s) => {
                return {
                  url: s.image_url,
                  header: {
                    profileImage: s.user.image_url!,
                    heading: s.user.username!,
                    subheading: parseCommentDate(s.created_at),
                  },
                };
              })}
              onAllStoriesEnd={handleGoBack}
              onStoryEnd={onStoryEnd}
              currentIndex={currentIndex}
              storyStyles={{
                height: mobileView ? height : "100%",
                width: mobileView ? width : "calc(100vw - 15px)",
                maxWidth: mobileView ? "none" : "407px",
                borderRadius: mobileView ? "0" : "10px",
              }}
              width={mobileView ? width : undefined}
              height={mobileView ? height : undefined}
            />
          ) : null}
        </div>
      </div>
    </Paper>
  );
};

export default StoryBody;
