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
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

import SavedSvg from "../../svgs/SavedSvg";
import CommentSvg from "../../svgs/CommentSvg";
import DirectSvg from "../../svgs/DirectSvg";
import LoveSvg from "../../svgs/LoveSvg";
import { useStyles } from "./styles";
import { Post, PostComment } from "../../../utils/types/post";
import { DELETE_COMMENT } from "../../../utils/mutations/comment";
import PostModal from "../modal";
import PostCardCommonStepper from "./common/stepper";
import PostCardCommonHeader from "./common/header";
import { useUserContext } from "../../../utils/context/user";
import NotSupportedModal from "../../not-supported-modal";
import PostCommentModal from "../modal/comment";
import PostCardCommonForm from "./common/form";
import PostCardCommonComments from "./common/comments";
import { deletePostComment } from "../../../utils/helpers/comment";
import { debug } from "../../../utils/services/debugService";
import { UserProfile } from "../../../utils/types/user";
import UsersModal from "../../users-modal";
import { modalState } from "../../../utils/types/modal";
import { TO_LOGIN_PAGE } from "../../../utils/constants/routes";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { PROFILE_PIC_URL } from "../../../utils/constants/url";
interface Props {
  submitted: boolean;
  post: Post;
  profile?: UserProfile;
  onTogglePostLike: () => void;
  onTogglePostSave: () => void;
  onToggleCommentLike: (id: string) => void;
  onToggleFollow: (userId: string) => void;
}

const PostCardDesktopView: React.FC<Props> = ({
  post,
  profile,
  submitted,
  onToggleFollow,
  onTogglePostLike,
  onTogglePostSave,
  onToggleCommentLike,
}) => {
  const { image_urls, created_at, likes, saves, likesCount } = post;

  // Global Hooks
  const { user: authUser } = useUserContext()!;

  // State Hooks
  const [show, setShow] = useState<modalState>("none");
  const [activeComment, setActiveComment] = useState<undefined | PostComment>(
    undefined
  );

  // Other Hooks
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();
  const { path, params } = useRouteMatch();
  const [deleteComment] = useMutation(DELETE_COMMENT);

  // Event Handlers
  const handleDelete = async () => {
    try {
      await deleteComment({
        variables: { id: activeComment?.id },
        update(cache) {
          deletePostComment(cache, post, activeComment!);
        },
      });
      setShow("none");
    } catch (error) {
      debug.error(error);
      setShow("none");
      if (error.message.includes("Unauthorized")) {
        history.push(
          `${TO_LOGIN_PAGE}?redirect_to=${encodeURIComponent(pathname)}`,
          pathname
        );
      } else {
        toast(error?.message);
      }
    }
  };

  // Other Logic
  const isLikedByUser = likes.some((like) => like.id === authUser?.id);
  const isSavedByUser = saves.some((like) => like.id === authUser?.id);

  const getRelatedUser: () => UserProfile | undefined = () => {
    const authUserFollowing = profile?.following;
    let relatedUser: UserProfile | undefined;
    if (authUserFollowing) {
      authUserFollowing.forEach((u) => {
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
        submitted={submitted}
        onToggleFollow={onToggleFollow}
        profile={profile}
        open={show === "users"}
        onClose={() => setShow("none")}
      />
      <PostModal
        open={show === "post"}
        onClose={() => setShow("none")}
        post={post}
      />
      <PostCommentModal
        open={show === "post-comment"}
        onClose={() => setShow("none")}
        comment={activeComment}
        onDelete={handleDelete}
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
            <PostCardCommonHeader
              onToggleFollow={onToggleFollow}
              profile={profile}
              onClick={() => setShow("post")}
              post={post}
              submitted={submitted}
            />
            <Divider />

            <CardContent className={classes.commentContent}>
              <PostCardCommonComments
                setActiveComment={setActiveComment}
                post={post}
                onOpenModal={() => setShow("post-comment")}
                onToggleCommentLike={onToggleCommentLike}
              />
            </CardContent>

            <Divider />

            <CardActions className={classes.cardActions}>
              <div className={classes.groupIcons}>
                <LoveSvg
                  onClick={onTogglePostLike}
                  active={isLikedByUser}
                  fill={isLikedByUser ? "#ed4956" : undefined}
                />
                <CommentSvg />
                <DirectSvg onClick={() => setShow("not-supported")} />
              </div>
              <SavedSvg active={isSavedByUser} onClick={onTogglePostSave} />
            </CardActions>

            <CardContent className={classes.cardContent}>
              {firstRelatedUser && likes.length > 1 ? (
                <div className={classes.likedByGroup}>
                  <Avatar
                    src={PROFILE_PIC_URL}
                    className={classes.likedByAvatar}
                  />
                  <Typography variant="body1">
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
                      {likesCount - 1} others
                    </strong>
                  </Typography>
                </div>
              ) : likes.length ? (
                <Typography variant="body1">
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
            <PostCardCommonForm post={post} />
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default PostCardDesktopView;
