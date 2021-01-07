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
import React, { useState } from "react";
import { POST_PIC_URL, PROFILE_PIC_URL } from "../../../utils/constants/url";
import SavedSvg from "../../svgs/SavedSvg";
import CommentSvg from "../../svgs/CommentSvg";
import DirectSvg from "../../svgs/DirectSvg";
import LoveSvg from "../../svgs/LoveSvg";
import { useStyles } from "./styles";
import { Post } from "../../../utils/types/post";
import { Link } from "react-router-dom";

// const arr = [
//   "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80",
//   POST_PIC_URL,
// ];
interface Props {
  post: Post;
}

const PostCardTabView: React.FC<Props> = ({
  post: { user, image_urls, comments, created_at, caption },
}) => {
  // State Hooks
  const [activeStep, setActiveStep] = useState(0);

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

  // JSX
  return (
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
          <IconButton aria-label="options">
            <MoreHoriz />
          </IconButton>
        }
        title={
          <Link className={classes.link} to={`/${user.username}/`}>
            {user.username}
          </Link>
        }
        subheader="Moscow, Russia"
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
            image={POST_PIC_URL}
            title="Paella dish"
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
          <LoveSvg />
          <CommentSvg />
          <DirectSvg />
        </div>
        <MobileStepper
          steps={image_urls.length}
          position="static"
          variant="dots"
          activeStep={activeStep}
          nextButton={null}
          backButton={null}
        />
        <SavedSvg />
      </CardActions>

      <CardContent className={classes.cardContent}>
        <div className={classes.likedByGroup}>
          <Avatar src={PROFILE_PIC_URL} className={classes.likedByAvatar} />
          <Typography variant="body1">
            Liked by <strong>bubuniverse</strong> and <strong>46 others</strong>
          </Typography>
        </div>
        <Typography variant="body1">
          <strong>{user.username}</strong> {caption}
        </Typography>
        <Typography color="textSecondary">View all 10 comments</Typography>
        {comments.map((comment) => (
          <Typography variant="body1">
            <strong>{comment.user.username}</strong> {comment.content}
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
  );
};

export default PostCardTabView;
