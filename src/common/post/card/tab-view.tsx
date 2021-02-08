import {
  Button,
  Card,
  CardContent,
  Collapse,
  Typography,
} from "@material-ui/core";
import { Link, useRouteMatch } from "react-router-dom";
import React, { useState } from "react";

import { useStyles } from "./styles";
import { Post } from "../../../utils/types/post";
import { useUser } from "../../../utils/context/user";
import { limitCommentText, wrapLinkTag } from "../../../utils/helpers";
import { modalState } from "../../../utils/types/modal";
import PostModal from "../modal";
import UsersModal from "../../users-modal";
import NotSupportedModal from "../../not-supported-modal";
import LoginModal from "../../login-modal";
import PostCardCommonHeader from "./common/header";
import PostCardCommonStepper from "./common/stepper";
import PostCardCommonForm from "./common/form";
import PostCardCommonActions from "./common/actions";
import PostCardCommonLikeContent from "./common/like-content";
import PostCardCommonTabComment from "./common/tab-comment";
interface Props {
  post: Post;
}

const PostCardTabView: React.FC<Props> = ({ post }) => {
  const { user, image_urls, comments, created_at, caption, likes } = post;
  // Global Hooks
  const { user: authUser } = useUser();

  // State Hooks
  const [show, setShow] = useState<modalState>("none");
  const [open, setOpen] = useState(false);

  // Other Hooks
  const classes = useStyles();
  const { path, params } = useRouteMatch();

  const splitWords = limitCommentText(caption, 75);

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
        post={post}
        onClose={() => setShow("none")}
      />
      <NotSupportedModal
        open={show === "not-supported"}
        onClose={() => setShow("none")}
      />
      <LoginModal open={show === "login"} onClose={() => setShow("none")} />
      <Card variant="outlined" className={classes.root}>
        <PostCardCommonHeader onClick={() => setShow("post")} post={post} />
        <PostCardCommonStepper image_urls={image_urls} />

        <PostCardCommonActions post={post} setShow={setShow}>
          <PostCardCommonStepper mobile image_urls={image_urls} />
        </PostCardCommonActions>

        <CardContent className={classes.cardContent}>
          <PostCardCommonLikeContent post={post} setShow={setShow} />
          <div style={{ display: "flex", marginBottom: "0.3rem" }}>
            <Typography className={classes.mobileCommentByBody} variant="body1">
              <strong className={classes.username}>
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
              {splitWords.length > 1 ? (
                <>
                  {wrapLinkTag(splitWords[0])}
                  {open ? (
                    <Collapse
                      component="span"
                      className={classes.collapse}
                      in={open}
                    >
                      {wrapLinkTag(splitWords[1])}
                    </Collapse>
                  ) : (
                    <Button
                      onClick={() => setOpen(true)}
                      className={classes.seeMoreBtn}
                      disableFocusRipple
                      disableTouchRipple
                    >
                      ... more
                    </Button>
                  )}
                </>
              ) : (
                <>{wrapLinkTag(caption)} </>
              )}
            </Typography>
            <div></div>
          </div>
          {comments.length > 1 && authUser ? (
            <Typography style={{ fontSize: "0.9rem" }} color="textSecondary">
              <Link
                className={classes.link}
                to={{
                  pathname: `/p/${post.id}/comments/`,
                  state: { from: path, ...params },
                }}
              >
                View all {post.commentsCount} comments
              </Link>
            </Typography>
          ) : null}
          {comments.slice(0, 3).map((comment, index) => (
            <PostCardCommonTabComment
              post={post}
              comment={comment}
              key={index}
            />
          ))}
          <Typography
            color="textSecondary"
            variant="caption"
            className={classes.createdAt}
          >
            {created_at}
          </Typography>
        </CardContent>
        <PostCardCommonForm post={post} tabView />
      </Card>
    </>
  );
};

export default PostCardTabView;
