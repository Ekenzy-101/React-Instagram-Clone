import {
  CardContent,
  Button,
  Typography,
  useTheme,
  Hidden,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { updatePostComments } from "../../../../utils/helpers/comment";
import { PostComment, Post } from "../../../../utils/types/post";
import { CREATE_COMMENT } from "../../../../utils/mutations/comment";
import { TO_LOGIN_PAGE } from "../../../../utils/constants/routes";
import { useUserContext } from "../../../../utils/context/user";
import { debug } from "../../../../utils/services/debugService";
import { useStyles } from "../styles";
import clsx from "clsx";

interface Props {
  post: Post;
  tabView?: boolean;
  rounded?: boolean;
}

const PostCardCommonForm: React.FC<Props> = ({ post, tabView, rounded }) => {
  // Global State Hooks
  const { user: authUser } = useUserContext()!;

  // State Hooks
  const [content, setContent] = useState("");
  const [createComment, { loading }] = useMutation(CREATE_COMMENT);

  // Other Hooks
  const classes = useStyles();
  const theme = useTheme();

  // Event Handlers
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createComment({
        variables: { post_id: post.id, content },
        update(cache, { data: { createComment } }) {
          updatePostComments(cache, createComment as PostComment, post);
        },
      });
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
                className={classes.commentArea}
                placeholder="Add a comment ..."
                autoComplete="off"
                autoCorrect="off"
                value={content}
                onChange={handleChange}
              ></textarea>
              <Button
                type="submit"
                disabled={!content || loading}
                style={{ opacity: !content || loading ? 0.5 : 1 }}
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
