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

const arr = [
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80",
  POST_PIC_URL,
];

const PostCardDesktopView: React.FC = () => {
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
            {arr.map((img, index) => (
              <CardMedia
                className={classes.media}
                image={img}
                title="Paella dish"
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
            {activeStep !== arr.length - 1 ? (
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
                  <Avatar src={PROFILE_PIC_URL} className={classes.avatar} />
                </div>
              </Grid>
            }
            action={
              <IconButton aria-label="settings">
                <MoreHoriz />
              </IconButton>
            }
            title="kenzy_d_coder"
            subheader="Moscow, Russia"
            className={classes.header}
          />

          <Divider />

          <CardContent className={classes.commentContent}>
            <div className={classes.commentByGroup}>
              <Avatar
                src={PROFILE_PIC_URL}
                className={classes.commentByAvatar}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  style={{ marginBottom: "0.5rem" }}
                  variant="caption"
                >
                  Liked b <strong>bubuniverse</strong> and{" "}
                  <strong>46 others</strong>
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  12 hrs <strong>Reply</strong>
                </Typography>
              </div>
            </div>
            <div className={classes.commentByGroup}>
              <Avatar
                src={PROFILE_PIC_URL}
                className={classes.commentByAvatar}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  style={{ marginBottom: "0.5rem" }}
                  variant="caption"
                >
                  Liked b <strong>bubuniverse</strong> and{" "}
                  <strong>46 others</strong>
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  12 hrs <strong>Reply</strong>
                </Typography>
              </div>
            </div>
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
              <Typography variant="caption">
                Liked by <strong>bubuniverse</strong> and{" "}
                <strong>46 others</strong>
              </Typography>
            </div>
            <Typography
              color="textSecondary"
              style={{ fontSize: "0.8rem", textTransform: "uppercase" }}
            >
              1 Day ago
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
