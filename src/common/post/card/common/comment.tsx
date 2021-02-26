import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { Avatar, Button, Collapse, Typography } from "@material-ui/core";
import { useLongPress } from "react-use";

import { Post, PostComment, ReplyComment } from "../../../../utils/types/post";
import {
  deleteReplyComment,
  parseCommentDate,
} from "../../../../utils/helpers/comment";
import { PROFILE_PIC_URL } from "../../../../utils/constants/url";
import { useUser } from "../../../../utils/context/user";
import {
  TOGGLE_REPLY_LIKE,
  DELETE_REPLY,
} from "../../../../utils/mutations/comment";
import { debug } from "../../../../utils/services/debugService";
import { TO_LOGIN_PAGE } from "../../../../utils/constants/routes";
import { updateReplyLikes } from "../../../../utils/helpers/like";
import { modalState } from "../../../../utils/types/modal";
import { wrapLinkTag } from "../../../../utils/helpers";
import useComment from "../../../../common/hooks/useComment";
import PostCardCommonReply from "./reply";
import { useStyles } from "../styles";
import LoveSvg from "../../../svgs/LoveSvg";
import PostCommentModal from "../../modal/comment";
import UsersModal from "../../../users-modal";
import LoginModal from "../../../login-modal";
import CustomToast from "../../../toast";

interface Props {
  comment: PostComment;
  post: Post;
  setCommentToReply: React.Dispatch<
    React.SetStateAction<PostComment | undefined>
  >;
  onLongPress: {
    readonly onMouseDown: (e: any) => void;
    readonly onTouchStart: (e: any) => void;
    readonly onMouseUp: () => void;
    readonly onMouseLeave: () => void;
    readonly onTouchEnd: () => void;
  };
}

const PostCardCommonComment: React.FC<Props> = ({
  comment,
  post,
  onLongPress,

  setCommentToReply,
}) => {
  const { replies } = comment;
  // Global State Hooks
  const { user: authUser } = useUser();

  // State Hooks
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState<modalState>("none");
  const [replyToDelete, setReplyToDelete] = useState<ReplyComment | undefined>(
    undefined
  );

  // Other Hooks
  const classes = useStyles();
  const { path, params } = useRouteMatch();
  const { handleToggleCommentLike } = useComment();
  const history = useHistory();
  const { pathname } = useLocation();
  const [toggleReplyLike] = useMutation(TOGGLE_REPLY_LIKE);
  const [deleteReply] = useMutation(DELETE_REPLY);
  const longPressEvent = useLongPress(
    (e) => {
      const target = e.target as EventTarget & { id: string };
      const reply = replies.find((c) => c.id === target.id);
      setReplyToDelete(reply);
      setShow("post-comment");
    },
    {
      isPreventDefault: true,
      delay: 2000,
    }
  );

  // Event Handlers
  const handleSetCommentToReply = () => {
    setCommentToReply(comment);
    document.getElementById("comment-textarea")?.focus();
  };

  const handleToggleReplyLike = async (id: string) => {
    try {
      debug.log("Svg clicked");
      await toggleReplyLike({
        variables: { id },
        update(cache) {
          updateReplyLikes({
            cache,
            user: authUser!,
            post,
            commentId: comment.id,
            replyId: id,
          });
        },
      });
    } catch (error) {
      debug.error(error.message);

      if (error.message.includes("Unauthorized")) {
        history.push(
          `${TO_LOGIN_PAGE}?next=${encodeURIComponent(pathname)}`,
          pathname
        );
      } else {
        toast(<CustomToast message="Couldn't like comment" />);
      }
    }
  };

  const handleDeleteReply = async () => {
    try {
      debug.log("Svg clicked");
      setShow("none");
      await deleteReply({
        variables: { id: replyToDelete?.id },
        update(cache) {
          deleteReplyComment({ cache, post, comment, reply: replyToDelete! });
        },
      });
    } catch (error) {
      debug.error(error.message);

      if (error.message.includes("Unauthorized")) {
        history.push(
          `${TO_LOGIN_PAGE}?next=${encodeURIComponent(pathname)}`,
          pathname
        );
      } else {
        toast(
          <CustomToast
            message="Couldn't delete comment"
            btnText="Retry"
            onClick={handleDeleteReply}
          />
        );
      }
    }
  };

  // Other Logic
  const isCommentLikedByUser = comment.likes.some(
    (like) => like.id === authUser?.id
  );

  // JSX
  return (
    <>
      <PostCommentModal
        onDelete={handleDeleteReply}
        comment={replyToDelete}
        open={show === "post-comment"}
        onClose={() => setShow("none")}
      />
      <UsersModal
        open={show === "users"}
        onClose={() => setShow("none")}
        title="Likes"
        users={comment.likes}
      />
      <LoginModal open={show === "login"} onClose={() => setShow("none")} />
      {/* Comment Section */}
      <div className={classes.commentByGroup}>
        <Avatar
          src={
            comment.user.image_url ? comment.user.image_url : PROFILE_PIC_URL
          }
          className={classes.commentByAvatar}
        />
        <div {...onLongPress} id={comment.id} className={classes.commentByBody}>
          <Typography
            style={{
              marginBottom: "0.5rem",
              fontSize: "0.9rem",
              maxWidth: "230px",
              wordWrap: "break-word",
            }}
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
              <span id={comment.id} key={i}>
                {wrapLinkTag(c)}
                <br />
              </span>
            ))}
          </Typography>
          <Typography id={comment.id} variant="caption" color="textSecondary">
            {parseCommentDate(comment.created_at)}
            {comment.likes.length && authUser ? (
              <Button
                disableFocusRipple
                disableTouchRipple
                className={classes.commentBtn}
                onClick={() => setShow("users")}
              >
                {comment.likes.length > 1
                  ? `${comment.likes.length} likes`
                  : `${comment.likes.length} like`}
              </Button>
            ) : null}
            <Button
              onClick={
                authUser
                  ? () => handleSetCommentToReply()
                  : () => setShow("login")
              }
              className={classes.commentBtn}
              disableFocusRipple
              disableTouchRipple
            >
              Reply
            </Button>
          </Typography>
        </div>
        <div style={{ marginLeft: "auto" }}>
          {authUser ? (
            <LoveSvg
              active={isCommentLikedByUser}
              fill={isCommentLikedByUser ? "#ed4956" : undefined}
              width={12}
              height={12}
              onClick={() => handleToggleCommentLike({ post, id: comment.id })}
            />
          ) : null}
        </div>
      </div>
      {/* Replies Section */}
      {replies?.length ? (
        <div className={classes.commentByGroup}>
          <p style={{ minWidth: 20 }}></p>
          <p style={{ minWidth: 20 }}></p>
          <div style={{ flexGrow: 1 }}>
            <div
              onClick={() => setOpen(!open)}
              className={classes.link}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Typography style={{ margin: "0 1rem 1rem 0", color: "grey" }}>
                ____
              </Typography>
              <Typography variant="caption" color="textSecondary">
                <strong>
                  {open ? `Hide replies` : `View replies (${replies?.length})`}
                </strong>
              </Typography>
            </div>
            <Collapse in={open}>
              {replies?.map((reply) => (
                <PostCardCommonReply
                  reply={reply}
                  key={reply.id}
                  onToggleReplyLike={handleToggleReplyLike}
                  onLongPress={longPressEvent}
                />
              ))}
            </Collapse>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PostCardCommonComment;
