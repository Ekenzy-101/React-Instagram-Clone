import { Avatar, Grid } from "@material-ui/core";
import React from "react";
import { PROFILE_PIC_URL } from "../../../utils/constants/url";
import { useStyles } from "./styles";

const arr = new Array(10).fill(1);
const HomeStatus = () => {
  const classes = useStyles();

  // JSX
  return (
    <Grid container alignItems="center" className={classes.root}>
      {arr.map((_, index) => (
        <Grid item className={classes.gridItem} key={index}>
          <div className={classes.avatarWrapper}>
            <Avatar src={PROFILE_PIC_URL} className={classes.avatar} />
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default HomeStatus;
