import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Hidden,
  IconButton,
  MobileStepper,
  Typography,
  useTheme,
} from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos, MoreHoriz } from "@material-ui/icons";
import SwipeableViews from "react-swipeable-views";
import { Link } from "react-router-dom";
import React, { useState } from "react";

import { PROFILE_PIC_URL, POST_PIC_URL } from "../../../utils/constants/url";
import SavedSvg from "../../svgs/SavedSvg";
import CommentSvg from "../../svgs/CommentSvg";
import DirectSvg from "../../svgs/DirectSvg";
import LoveSvg from "../../svgs/LoveSvg";
import { useStyles } from "./styles";
import { Post } from "../../../utils/types/post";
import PostModal from "../modal";
import PostNotSupportedModal from "../modal/not-supported";
import { useUserContext } from "../../../utils/context/user";
interface Props {
  post: Post;
  onToggleLike: () => void;
}

const PostCardTabView: React.FC<Props> = ({ post, onToggleLike }) => {
  const {
    user,
    image_urls,
    comments,
    created_at,
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
      <PostModal open={open} post={post} onClose={handleClose} />
      <PostNotSupportedModal open={open1} onClose={() => setOpen1(false)} />
      <Card variant="outlined" className={classes.root}>
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
            <IconButton className={classes.stepperButton} onClick={handleBack}>
              <ArrowBackIos
                fontSize="inherit"
                className={classes.stepperButtonIcon}
              />
            </IconButton>
          ) : (
            <p></p>
          )}
          {activeStep !== image_urls.length - 1 ? (
            <IconButton className={classes.stepperButton} onClick={handleNext}>
              <ArrowForwardIos
                fontSize="inherit"
                className={classes.stepperButtonIcon}
              />
            </IconButton>
          ) : (
            <p></p>
          )}
        </div>

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
          <MobileStepper
            steps={image_urls.length}
            position="static"
            variant="dots"
            activeStep={activeStep}
            nextButton={null}
            backButton={null}
          />
          <SavedSvg onClick={() => setOpen1(true)} />
        </CardActions>

        <CardContent className={classes.cardContent}>
          <div className={classes.likedByGroup}>
            <Avatar src={PROFILE_PIC_URL} className={classes.likedByAvatar} />
            <Typography variant="body1">
              Liked by <strong>bubuniverse</strong> and{" "}
              <strong>46 others</strong>
            </Typography>
          </div>
          {likes.length ? (
            <Typography variant="body1">
              <strong>
                {likes.length > 1
                  ? `${likes.length} likes`
                  : `${likes.length} like`}
              </strong>
            </Typography>
          ) : null}
          <Typography variant="body1">
            <strong>
              <Link className={classes.link} to={`/${user.username}/`}>
                {user.username}
              </Link>
            </strong>{" "}
            {caption}
          </Typography>
          {comments.length > 1 ? (
            <Typography color="textSecondary">
              View all {comments.length} comments
            </Typography>
          ) : null}
          {comments.map((comment, index) => (
            <Typography variant="body1" key={index}>
              <strong>
                <Link
                  className={classes.link}
                  to={`/${comment.user.username}/`}
                >
                  {comment.user.username}
                </Link>
              </strong>
              {comment.content}
            </Typography>
          ))}
          <Typography
            color="textSecondary"
            variant="caption"
            className={classes.createdAt}
          >
            {created_at}
          </Typography>
        </CardContent>

        <Hidden xsDown>
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
        </Hidden>
      </Card>
    </>
  );
};

export default PostCardTabView;
