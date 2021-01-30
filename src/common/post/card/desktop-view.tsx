import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

import SavedSvg from "../../svgs/SavedSvg";
import CommentSvg from "../../svgs/CommentSvg";
import DirectSvg from "../../svgs/DirectSvg";
import LoveSvg from "../../svgs/LoveSvg";
import { useStyles } from "./styles";
import { Post, PostComment } from "../../../utils/types/post";
import PostModal from "../modal";
import PostCardCommonStepper from "./common/stepper";
import PostCardCommonHeader from "./common/header";
import { useUser } from "../../../utils/context/user";
import NotSupportedModal from "../../not-supported-modal";
import PostCardCommonForm from "./common/form";
import PostCardCommonComments from "./common/comments";
import { User } from "../../../utils/types/user";
import UsersModal from "../../users-modal";
import { modalState } from "../../../utils/types/modal";
import { Link, useRouteMatch } from "react-router-dom";
import { PROFILE_PIC_URL } from "../../../utils/constants/url";
import usePost from "../../../common/hooks/usePost";
interface Props {
  post: Post;
}

const PostCardDesktopView: React.FC<Props> = ({ post }) => {
  const { image_urls, created_at, likes, saves } = post;

  // Global Hooks
  const { user: authUser } = useUser();

  // State Hooks
  const [show, setShow] = useState<modalState>("none");
  const [commentToReply, setCommentToReply] = useState<undefined | PostComment>(
    undefined
  );

  // Other Hooks
  const { handleTogglePostLike, handleTogglePostSave } = usePost();
  const classes = useStyles();
  const { path, params } = useRouteMatch();

  const handleFocus = () => {
    document.getElementById("comment-textarea")?.focus();
  };

  // Other Logic
  const isLikedByUser = likes.some((like) => like.id === authUser?.id);
  const isSavedByUser = saves.some((like) => like.id === authUser?.id);

  const getRelatedUser: () => User | undefined = () => {
    let relatedUser: User | undefined;
    if (authUser?.following) {
      authUser?.following?.forEach((u) => {
        relatedUser = post?.likes?.find((l) => l.id === u.id);
        if (relatedUser) return;
      });
    }
    return relatedUser;
  };

  const firstRelatedUser = getRelatedUser();

  // JSX
  return (
    <>
      <UsersModal
        title="Likes"
        users={likes}
        open={show === "users"}
        onClose={() => setShow("none")}
      />
      <PostModal
        open={show === "post"}
        onClose={() => setShow("none")}
        post={post}
      />
      <NotSupportedModal
        open={show === "not-supported"}
        onClose={() => setShow("none")}
      />
      <Card variant="outlined" className={classes.root}>
        <Grid container>
          <Grid item xs={7} style={{ position: "relative" }}>
            <PostCardCommonStepper image_urls={image_urls} />
          </Grid>

          <Grid item xs={5}>
            <PostCardCommonHeader onClick={() => setShow("post")} post={post} />
            <Divider />

            <CardContent className={classes.commentContent}>
              <PostCardCommonComments
                setCommentToReply={setCommentToReply}
                post={post}
              />
            </CardContent>

            <Divider />

            <CardActions className={classes.cardActions}>
              <div className={classes.groupIcons}>
                <LoveSvg
                  onClick={() => handleTogglePostLike(post)}
                  active={isLikedByUser}
                  fill={isLikedByUser ? "#ed4956" : undefined}
                />
                <CommentSvg onClick={handleFocus} />
                <DirectSvg onClick={() => setShow("not-supported")} />
              </div>
              <SavedSvg
                active={isSavedByUser}
                onClick={() => handleTogglePostSave(post)}
              />
            </CardActions>

            <CardContent className={classes.cardContent}>
              {firstRelatedUser && likes.length > 1 ? (
                <div className={classes.likedByGroup}>
                  <Avatar
                    src={PROFILE_PIC_URL}
                    className={classes.likedByAvatar}
                  />
                  <Typography className={classes.text} variant="body1">
                    Liked by{" "}
                    <strong>
                      <Link
                        className={classes.link}
                        to={{
                          pathname: `/${firstRelatedUser.username}/`,
                          state: { from: path, ...params },
                        }}
                      >{` ${firstRelatedUser.username} `}</Link>
                    </strong>{" "}
                    and{" "}
                    <strong
                      className={classes.link}
                      onClick={() => setShow("users")}
                    >
                      {" "}
                      {likes.length - 1} others
                    </strong>
                  </Typography>
                </div>
              ) : likes.length ? (
                <Typography className={classes.text} variant="body1">
                  <strong>
                    <span
                      className={classes.link}
                      onClick={() => setShow("users")}
                    >
                      {likes.length > 1
                        ? `${likes.length} likes`
                        : `${likes.length} like`}
                    </span>
                  </strong>
                </Typography>
              ) : null}
              <Typography
                color="textSecondary"
                style={{ fontSize: "0.7rem", textTransform: "uppercase" }}
              >
                {created_at}
              </Typography>
            </CardContent>
            <PostCardCommonForm commentToReply={commentToReply} post={post} />
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default PostCardDesktopView;
