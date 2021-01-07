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

const PostCardDesktopView: React.FC<Props> = ({
  post: { user, image_urls, created_at, comments, caption },
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
      <Grid container>
        <Grid item xs={7} style={{ position: "relative" }}>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {image_urls.map((img) => (
              <CardMedia
                className={classes.media}
                image={POST_PIC_URL}
                // title="Paella dish"
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
              <IconButton aria-label="settings">
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
                  <strong>{user.username} </strong>
                  {"  "}
                  {caption}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  12 hrs
                </Typography>
              </div>
            </div>
            {comments.map((comment) => (
              <div className={classes.commentByGroup}>
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
                    <strong>{comment.user.username} </strong>
                    {"  "}
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
              <LoveSvg />
              <CommentSvg />
              <DirectSvg />
            </div>
            <SavedSvg />
          </CardActions>

          <CardContent className={classes.cardContent}>
            <div className={classes.likedByGroup}>
              <Avatar src={PROFILE_PIC_URL} className={classes.likedByAvatar} />
              <Typography variant="body1">
                Liked by <strong>bubuniverse</strong> and{" "}
                <strong>46 others</strong>
              </Typography>
            </div>
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
  );
};

export default PostCardDesktopView;
