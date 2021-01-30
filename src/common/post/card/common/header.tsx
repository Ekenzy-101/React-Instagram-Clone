import {
  CardHeader,
  Grid,
  Avatar,
  IconButton,
  Button,
} from "@material-ui/core";
import { MoreHoriz } from "@material-ui/icons";
import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import ProfileTitleUnfollowModal from "../../../../components/profile/title/modal/unfollow";

import { PROFILE_PIC_URL } from "../../../../utils/constants/url";
import useFollow from "../../../../common/hooks/useFollow";
import { useUser } from "../../../../utils/context/user";
import { modalState } from "../../../../utils/types/modal";
import { Post } from "../../../../utils/types/post";
import LoadingSpinner from "../../../loading/spinner";
import { useStyles } from "../styles";
interface Props {
  onClick: () => void;
  post: Post;
}

const PostCardCommonHeader: React.FC<Props> = ({
  onClick,
  post: { user, location },
}) => {
  // Global Hooks
  const { user: authUser } = useUser();

  // State Hooks
  const [show, setShow] = useState<modalState>("none");

  // Other Hooks
  const classes = useStyles();
  const { handleToggleFollow, submitted } = useFollow();
  const { path, params } = useRouteMatch() as {
    path: string;
    params: { id: string };
  };

  // Other Logic
  const isFollowingAuthUser = authUser?.followers?.some(
    (f) => f.id === user?.id
  );
  const isFollowedByAuthUser = authUser?.following?.some(
    (f) => f.id === user?.id
  );

  // JSX
  return (
    <>
      <ProfileTitleUnfollowModal
        user={user}
        open={show === "unfollow"}
        onClose={() => setShow("none")}
      />
      <CardHeader
        avatar={
          <Grid item className={classes.gridItem}>
            <div className={classes.avatarWrapper}>
              <Avatar
                src={user.image_url ? PROFILE_PIC_URL : PROFILE_PIC_URL}
                className={classes.avatar}
              />
            </div>
          </Grid>
        }
        action={
          <IconButton onClick={onClick}>
            <MoreHoriz />
          </IconButton>
        }
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link
              className={classes.link}
              to={{
                pathname: `/${user.username}/`,
                state: { from: path, ...params },
              }}
            >
              {user.username}{" "}
            </Link>
            {isFollowedByAuthUser && params?.id ? (
              <strong
                onClick={() => setShow("unfollow")}
                style={{ marginLeft: "0.5rem", cursor: "pointer" }}
              >
                Following
              </strong>
            ) : params?.id ? (
              <Button
                style={{ marginLeft: "0.5rem" }}
                className={classes.submitBtn}
                onClick={() => handleToggleFollow(user)}
              >
                {submitted ? (
                  <LoadingSpinner />
                ) : isFollowingAuthUser ? (
                  "Follow Back"
                ) : (
                  "Follow"
                )}
              </Button>
            ) : null}
          </div>
        }
        subheader={location}
        className={classes.header}
      />
    </>
  );
};

export default PostCardCommonHeader;
