import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos, MoreHoriz } from "@material-ui/icons";
import SwipeableViews from "react-swipeable-views";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { PROFILE_PIC_URL, POST_PIC_URL } from "../../../utils/constants/url";
import SavedSvg from "../../svgs/SavedSvg";
import CommentSvg from "../../svgs/CommentSvg";
import DirectSvg from "../../svgs/DirectSvg";
import LoveSvg from "../../svgs/LoveSvg";
import { useStyles } from "./styles";
import { Post } from "../../../utils/types/post";
import PostModal from "../modal";
import { useUserContext } from "../../../utils/context/user";
import PostNotSupportedModal from "../modal/not-supported";
interface Props {
  post: Post;
  onToggleLike: () => void;
}

const PostCardDesktopView: React.FC<Props> = ({ post, onToggleLike }) => {
  const {
    user,
    image_urls,
    created_at,
    comments,
    caption,
    location,
    likes,
  } = post;

  // Global Hooks
  const { user: authUser } = useUserContext()!;

  // State Hooks
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  // Other Hooks
  const classes = useStyles();
  const theme = useTheme();

  // Event Handlers
  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // Other Logic
  const isLikedByUser = likes.some((like) => like.id === authUser?.id);

  // JSX
  return (
    <>
      <PostModal open={open} onClose={handleClose} post={post} />
      <PostNotSupportedModal open={open1} onClose={() => setOpen1(false)} />
      <Card variant="outlined" className={classes.root}>
        <Grid container>
          <Grid item xs={7} style={{ position: "relative" }}>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {image_urls.map((img, index) => (
                <CardMedia
                  className={classes.media}
                  key={index}
                  image={POST_PIC_URL}
                />
              ))}
            </SwipeableViews>

            <div className={classes.stepper}>
              {activeStep !== 0 ? (
                <IconButton
                  className={classes.stepperButton}
                  onClick={handleBack}
                >
                  <ArrowBackIos
                    fontSize="inherit"
                    className={classes.stepperButtonIcon}
                  />
                </IconButton>
              ) : (
                <p></p>
              )}
              {activeStep !== image_urls.length - 1 ? (
                <IconButton
                  className={classes.stepperButton}
                  onClick={handleNext}
                >
                  <ArrowForwardIos
                    fontSize="inherit"
                    className={classes.stepperButtonIcon}
                  />
                </IconButton>
              ) : (
                <p></p>
              )}
            </div>
          </Grid>

          <Grid item xs={5}>
            <CardHeader
              avatar={
                <Grid item className={classes.gridItem}>
                  <div className={classes.avatarWrapper}>
                    <Avatar
                      src={user.image_url ? user.image_url : PROFILE_PIC_URL}
                      className={classes.avatar}
                    />
                  </div>
                </Grid>
              }
              action={
                <IconButton onClick={handleOpen}>
                  <MoreHoriz />
                </IconButton>
              }
              title={
                <Link className={classes.link} to={`/${user.username}/`}>
                  {user.username}
                </Link>
              }
              subheader={location}
              className={classes.header}
            />

            <Divider />

            <CardContent className={classes.commentContent}>
              <div className={classes.commentByGroup}>
                <Avatar
                  src={user.image_url ? user.image_url : PROFILE_PIC_URL}
                  className={classes.commentByAvatar}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    style={{ marginBottom: "0.5rem" }}
                    variant="caption"
                  >
                    <strong style={{ marginRight: "0.5rem" }}>
                      <Link className={classes.link} to={`/${user.username}/`}>
                        {user.username}
                      </Link>
                    </strong>
                    {caption}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    12 hrs
                  </Typography>
                </div>
              </div>
              {comments.map((comment, index) => (
                <div className={classes.commentByGroup} key={index}>
                  <Avatar
                    src={
                      comment.user.image_url
                        ? comment.user.image_url
                        : PROFILE_PIC_URL
                    }
                    className={classes.commentByAvatar}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      style={{ marginBottom: "0.5rem" }}
                      variant="caption"
                    >
                      <strong style={{ marginRight: "0.5rem" }}>
                        <Link
                          className={classes.link}
                          to={`/${comment.user.username}/`}
                        >
                          {comment.user.username}
                        </Link>
                      </strong>
                      {comment.content}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      12 hrs <strong>Reply</strong>
                    </Typography>
                  </div>
                </div>
              ))}
            </CardContent>
            <Divider />
            <CardActions className={classes.cardActions}>
              <div className={classes.groupIcons}>
                <LoveSvg
                  onClick={onToggleLike}
                  active={isLikedByUser}
                  fill={isLikedByUser ? "#ed4956" : undefined}
                />
                <CommentSvg />
                <DirectSvg onClick={() => setOpen1(true)} />
              </div>
              <SavedSvg onClick={() => setOpen1(true)} />
            </CardActions>

            <CardContent className={classes.cardContent}>
              {/* <div className={classes.likedByGroup}>
                <Avatar
                  src={PROFILE_PIC_URL}
                  className={classes.likedByAvatar}
                />
                <Typography variant="body1">
                  <strong>46 others</strong>
                </Typography>
              </div> */}
              {likes.length ? (
                <Typography variant="body1">
                  <strong>
                    {likes.length > 1
                      ? `${likes.length} likes`
                      : `${likes.length} like`}
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
            <form style={{ width: "100%" }}>
              <CardContent className={classes.commentContainer}>
                <textarea
                  className={classes.commentArea}
                  placeholder="Add a comment ..."
                  autoComplete="off"
                  autoCorrect="off"
                ></textarea>
                <Button
                  variant="text"
                  color="primary"
                  style={{ textTransform: "capitalize" }}
                >
                  Post
                </Button>
              </CardContent>
            </form>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default PostCardDesktopView;
