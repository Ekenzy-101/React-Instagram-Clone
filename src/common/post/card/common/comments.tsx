import { Avatar, Divider, Typography } from "@material-ui/core";
import React from "react";
import { useLongPress } from "react-use";
import { Link, useRouteMatch } from "react-router-dom";
import { PROFILE_PIC_URL } from "../../../../utils/constants/url";
import { Post, PostComment } from "../../../../utils/types/post";
import { parseCommentDate } from "../../../../utils/helpers/comment";
import LoveSvg from "../../../svgs/LoveSvg";
import { useStyles } from "../styles";
import { useUserContext } from "../../../../utils/context/user";

interface Props {
  post: Post;
  setActiveComment: React.Dispatch<
    React.SetStateAction<PostComment | undefined>
  >;
  onOpenModal: () => void;
  onToggleCommentLike: (id: string) => void;
  divider?: boolean;
}
const PostCardCommonComments: React.FC<Props> = (props) => {
  const {
    post,
    setActiveComment,
    onOpenModal,
    onToggleCommentLike,
    divider,
  } = props;
  const { user, caption, created_at, comments } = post;

  // Global State Hooks
  const { user: authUser } = useUserContext()!;

  // Other Hooks
  const classes = useStyles();
  const { path, params } = useRouteMatch();
  const longPressEvent = useLongPress(
    (e) => {
      const target = e.target as EventTarget & { id: string };
      const comment = comments.find((c) => c.id === target.id);
      setActiveComment(comment);
      onOpenModal();
    },
    {
      isPreventDefault: true,
      delay: 2000,
    }
  );

  // Other Logic
  const isCommentLikedByUser = (comment: PostComment) => {
    return comment.likes.some((like) => like.id === authUser?.id);
  };

  // JSX
  return (
    <>
      <div className={classes.commentByGroup}>
        <Avatar
          src={user.image_url ? user.image_url : PROFILE_PIC_URL}
          className={classes.commentByAvatar}
        />
        <div className={classes.commentByBody}>
          <Typography style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}>
            <strong style={{ marginRight: "0.5rem" }}>
              <Link
                className={classes.link}
                to={{
                  pathname: `/${user.username}/`,
                  state: { from: path, ...params },
                }}
              >
                {user.username}
              </Link>
            </strong>
            {caption}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {parseCommentDate(created_at)}
          </Typography>
        </div>
      </div>
      {divider ? (
        <>
          <Divider style={{ margin: "auto -1rem" }} light />
          <div style={{ height: "0.8rem" }}></div>
        </>
      ) : null}
      {comments.map((comment, index) => (
        <div key={index}>
          <div className={classes.commentByGroup}>
            <Avatar
              src={
                comment.user.image_url
                  ? comment.user.image_url
                  : PROFILE_PIC_URL
              }
              className={classes.commentByAvatar}
            />
            <div
              {...longPressEvent}
              id={comment.id}
              className={classes.commentByBody}
            >
              <Typography
                style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}
                variant="body1"
                id={comment.id}
              >
                <strong id={comment.id} style={{ marginRight: "0.5rem" }}>
                  <Link
                    className={classes.link}
                    to={{
                      pathname: `/${comment.user.username}/`,
                      state: { from: path, ...params },
                    }}
                  >
                    {comment.user.username}
                  </Link>
                </strong>
                {comment.content.split("\n").map((c, i) => (
                  <span key={i}>
                    {c}
                    <br />
                  </span>
                ))}
              </Typography>
              <Typography
                id={comment.id}
                variant="caption"
                color="textSecondary"
              >
                {parseCommentDate(comment.created_at)}
                {comment.likes.length ? (
                  <strong style={{ marginLeft: "12px" }}>
                    {comment.likes.length > 1
                      ? `${comment.likes.length} likes`
                      : `${comment.likes.length} like`}
                  </strong>
                ) : null}
                <strong style={{ marginLeft: "12px" }}>Reply</strong>
              </Typography>
            </div>
            <div>
              <LoveSvg
                active={isCommentLikedByUser(comment)}
                fill={isCommentLikedByUser(comment) ? "#ed4956" : undefined}
                width={12}
                height={12}
                onClick={() => onToggleCommentLike(comment.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostCardCommonComments;
