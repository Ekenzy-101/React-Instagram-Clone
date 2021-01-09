import React from "react";
import { useStyles } from "./style";
import TaggedSvg from "../../../common/svgs/TaggedSvg";
import { Typography } from "@material-ui/core";

const ProfileBodyTagged: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.bodyRoot}>
      <div className={classes.bodyWrapper}>
        <div className={classes.svgWrapper}>
          <TaggedSvg width={30} height={30} />
        </div>
        <Typography variant="h6" className={classes.bodyTitle}>
          Photos of you
        </Typography>
        <Typography variant="body1" className={classes.bodyContent}>
          When people tag you in photos, they'll appear here
        </Typography>
      </div>
    </div>
  );
};

export default ProfileBodyTagged;
