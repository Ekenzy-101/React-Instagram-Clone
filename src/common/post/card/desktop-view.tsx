import {
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

import { useStyles } from "./styles";
import { Post, PostComment } from "../../../utils/types/post";
import { modalState } from "../../../utils/types/modal";
import PostModal from "../modal";
import NotSupportedModal from "../../not-supported-modal";
import UsersModal from "../../users-modal";
import LoginModal from "../../login-modal";
import PostCardCommonComments from "./common/comments";
import PostCardCommonStepper from "./common/stepper";
import PostCardCommonHeader from "./common/header";
import PostCardCommonForm from "./common/form";
import PostCardCommonActions from "./common/actions";
import PostCardCommonLikeContent from "./common/like-content";
import PostDeleteModal from "../modal/delete";
import usePost from "../../hooks/usePost";
interface Props {
  post: Post;
}

const PostCardDesktopView: React.FC<Props> = ({ post }) => {
  const { image_urls, created_at, likes } = post;

  // State Hooks
  const [activeStep, setActiveStep] = useState(0);
  const [show, setShow] = useState<modalState>("none");
  const [commentToReply, setCommentToReply] = useState<undefined | PostComment>(
    undefined
  );

  // Other Hooks
  const classes = useStyles();
  const { handleDeletePost, isDeletingPost } = usePost();

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
        onSwitchModal={() => setShow("post-delete")}
      />
      <PostDeleteModal
        open={show === "post-delete"}
        onDelete={isDeletingPost ? undefined : () => handleDeletePost(post)}
        onClose={() => setShow("none")}
      />
      <NotSupportedModal
        open={show === "not-supported"}
        onClose={() => setShow("none")}
      />
      <LoginModal open={show === "login"} onClose={() => setShow("none")} />

      <Card variant="outlined" className={classes.root}>
        <Grid container>
          <Grid item xs={7} style={{ position: "relative" }}>
            <PostCardCommonStepper
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              image_urls={image_urls}
            />
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

            <PostCardCommonActions post={post} setShow={setShow} />

            <CardContent className={classes.cardContent}>
              <PostCardCommonLikeContent post={post} setShow={setShow} />
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
