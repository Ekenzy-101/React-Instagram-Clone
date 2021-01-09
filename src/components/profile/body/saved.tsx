import React from "react";
import { useStyles } from "./style";
import SavedSvg from "../../../common/svgs/SavedSvg";
import { Typography } from "@material-ui/core";

const ProfileBodySaved: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.bodyRoot}>
      <div className={classes.bodyWrapper}>
        <div className={classes.svgWrapper}>
          <SavedSvg width={30} height={30} />
        </div>
        <Typography variant="h6" className={classes.bodyTitle}>
          Save
        </Typography>
        <Typography variant="body1" className={classes.bodyContent}>
          Save photos and videos that you want to see again. No one is notified,
          and only only you can see what you've saved
        </Typography>
      </div>
    </div>
  );
};

export default ProfileBodySaved;
