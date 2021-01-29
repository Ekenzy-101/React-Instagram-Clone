import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { Avatar, Divider, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useLongPress } from "react-use";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";

import { debug } from "../../../../utils/services/debugService";
import { PROFILE_PIC_URL } from "../../../../utils/constants/url";
import { Post, PostComment } from "../../../../utils/types/post";
import {
  parseCommentDate,
  deletePostComment,
} from "../../../../utils/helpers/comment";
import PostCardCommonComment from "./comment";
import { useStyles } from "../styles";
import { DELETE_COMMENT } from "../../../../utils/mutations/comment";
import { modalState } from "../../../../utils/types/modal";
import PostCommentModal from "../../modal/comment";
import { TO_LOGIN_PAGE } from "../../../../utils/constants/routes";
interface Props {
  post: Post;
  setCommentToReply?: React.Dispatch<
    React.SetStateAction<PostComment | undefined>
  >;
  divider?: boolean;
}

const PostCardCommonComments: React.FC<Props> = (props) => {
  const { post, setCommentToReply, divider } = props;
  const { user, caption, created_at, comments } = post;

  // State Hooks
  const [show, setShow] = useState<modalState>("none");
  const [commentToDelete, setCommentToDelete] = useState<
    undefined | PostComment
  >(undefined);

  // Other Hooks
  const classes = useStyles();
  const { pathname } = useLocation();
  const history = useHistory();
  const [deleteComment] = useMutation(DELETE_COMMENT);
  const { path, params } = useRouteMatch();
  const longPressEvent = useLongPress(
    (e) => {
      const target = e.target as EventTarget & { id: string };
      const comment = comments.find((c) => c.id === target.id);
      setCommentToDelete(comment);
      setShow("post-comment");
    },
    {
      isPreventDefault: true,
      delay: 2000,
    }
  );

  // Event Handlers
  const handleDeleteComment = async () => {
    try {
      setShow("none");
      await deleteComment({
        variables: { id: commentToDelete?.id },
        update(cache) {
          deletePostComment({ cache, post, comment: commentToDelete! });
        },
      });
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

  // JSX
  return (
    <>
      <PostCommentModal
        open={show === "post-comment"}
        onClose={() => setShow("none")}
        comment={commentToDelete}
        onDelete={handleDeleteComment}
      />
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
        <PostCardCommonComment
          key={index}
          comment={comment}
          post={post}
          setCommentToReply={setCommentToReply!}
          onLongPress={longPressEvent}
        />
      ))}
    </>
  );
};

export default PostCardCommonComments;
