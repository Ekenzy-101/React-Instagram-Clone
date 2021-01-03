import { Divider, Grid } from "@material-ui/core";
import { CropDinOutlined } from "@material-ui/icons";
import React from "react";
import GridSvg from "../../../common/svgs/GridSvg";
import TaggedSvg from "../../../common/svgs/TaggedSvg";
import { useStyles } from "./style";

const ProfileBodyMobileView = () => {
  const classes = useStyles();
  return (
    <div>
      <Divider />
      <Grid
        container
        justify="space-around"
        style={{ margin: "-6px 0 -8px 0", textAlign: "center" }}
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <GridSvg />
        </Grid>
        <Grid item>
          <TaggedSvg />
        </Grid>
        <Grid item>
          <CropDinOutlined className={classes.feedIcon} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileBodyMobileView;
