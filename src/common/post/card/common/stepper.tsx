import React from "react";
import SwipeableViews from "react-swipeable-views";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { useStyles } from "../styles";
import {
  CardMedia,
  IconButton,
  useTheme,
  MobileStepper,
} from "@material-ui/core";

interface Props {
  image_urls: string[];
  mobile?: boolean;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const PostCardCommonStepper: React.FC<Props> = ({
  image_urls,
  mobile,
  activeStep,
  setActiveStep,
}) => {
  // Other Hooks
  const classes = useStyles();
  const theme = useTheme();

  // JSX
  if (mobile) {
    return (
      <MobileStepper
        steps={image_urls.length}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton={null}
        backButton={null}
      />
    );
  }

  return (
    <>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={(step: number) => setActiveStep(step)}
        enableMouseEvents
      >
        {image_urls.map((img, index) => (
          <CardMedia className={classes.media} key={index} image={img} />
        ))}
      </SwipeableViews>

      <div className={classes.stepper}>
        {activeStep !== 0 ? (
          <IconButton
            className={classes.stepperButton}
            onClick={() => setActiveStep(activeStep - 1)}
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
            onClick={() => setActiveStep(activeStep + 1)}
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
    </>
  );
};

export default PostCardCommonStepper;
