import React from "react";
import { Grid, useMediaQuery } from "@material-ui/core";

interface Props {
  leftComponent?: JSX.Element;
  rightComponent?: JSX.Element;
  centerComponent?: JSX.Element;
}

const PasswordChangeBodyWrapper: React.FC<Props> = (props) => {
  const { leftComponent, rightComponent, centerComponent } = props;
  const tabView = useMediaQuery(`(max-width: 735px)`);
  if (tabView) {
    return (
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs={12}>
          {centerComponent}
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container alignItems="center" spacing={3}>
      <Grid item xs={4}>
        {leftComponent}
      </Grid>
      <Grid item xs={8}>
        {rightComponent}
      </Grid>
    </Grid>
  );
};

export default PasswordChangeBodyWrapper;
