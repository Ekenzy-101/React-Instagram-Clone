import clsx from "clsx";
import {
  CardContent,
  Button,
  Typography,
  useTheme,
  Hidden,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  updatePostCommentReplies,
  updatePostComments,
} from "../../../../utils/helpers/comment";
import { PostComment, Post, ReplyComment } from "../../../../utils/types/post";
import {
  CREATE_COMMENT,
  REPLY_COMMENT,
} from "../../../../utils/mutations/comment";
import { TO_LOGIN_PAGE } from "../../../../utils/constants/routes";
import { useUser } from "../../../../utils/context/user";
import { debug } from "../../../../utils/services/debugService";
import { useStyles } from "../styles";
interface Props {
  post: Post;
  commentToReply?: PostComment;
  tabView?: boolean;
  rounded?: boolean;
}

const PostCardCommonForm: React.FC<Props> = ({
  post,
  tabView,
  rounded,
  commentToReply,
}) => {
  // Global State Hooks
  const { user: authUser } = useUser()!;

  // State Hooks
  const [content, setContent] = useState("");
  const [createComment, { loading }] = useMutation(CREATE_COMMENT);
  const [replyComment, { loading: loading1 }] = useMutation(REPLY_COMMENT);

  // Other Hooks
  const classes = useStyles();
  const theme = useTheme();
  const { id } = useParams() as { id: string };

  // Effect Hooks
  useEffect(() => {
    if (commentToReply) {
      setContent(`@${commentToReply?.user?.username} `);
    }
  }, [commentToReply]);

  // Event Handlers
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (commentToReply) {
        await replyComment({
          variables: { comment_id: commentToReply.id, content },
          update(cache, { data: { createReply } }) {
            updatePostCommentReplies({
              cache,
              response: createReply as ReplyComment,
              comment: commentToReply,
              post,
            });
          },
        });
      } else {
        await createComment({
          variables: { post_id: post.id, content },
          update(cache, { data: { createComment } }) {
            updatePostComments({
              cache,
              response: createComment as PostComment,
              post,
            });
          },
        });
      }
      setContent("");
    } catch (error) {
      debug.error(error.message);
      toast(error.message);
    }
  };

  const containerClassName = rounded
    ? clsx(classes.commentContainer, classes.rounded)
    : classes.commentContainer;

  return (
    <Hidden xsDown={rounded ? false : true}>
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <CardContent className={containerClassName}>
          {authUser ? (
            <>
              <textarea
                id={id ? "comment-textarea" : undefined}
                className={classes.commentArea}
                placeholder="Add a comment ..."
                autoComplete="off"
                autoCorrect="off"
                value={content}
                onChange={handleChange}
              ></textarea>
              <Button
                type="submit"
                disabled={!content || loading || loading1}
                style={{ opacity: !content || loading || loading1 ? 0.5 : 1 }}
                className={classes.submitBtn}
              >
                Post
              </Button>
            </>
          ) : !tabView ? (
            <Typography color="textSecondary">
              <Link
                to={{
                  pathname: TO_LOGIN_PAGE,
                  search: `?redirect_to=${encodeURIComponent(`/p/${post.id}`)}`,
                  state: `/p/${post.id}/`,
                }}
                style={{ color: theme.palette.primary.dark }}
                className={classes.link}
              >
                Login
              </Link>{" "}
              to like or comment
            </Typography>
          ) : null}
        </CardContent>
      </form>
    </Hidden>
  );
};

export default PostCardCommonForm;
