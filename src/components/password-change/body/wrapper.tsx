import React from "react";
import { Grid } from "@material-ui/core";

interface Props {
  leftComponent?: JSX.Element;
  rightComponent?: JSX.Element;
  centerComponent?: JSX.Element;
}

const PasswordChangeBodyWrapper: React.FC<Props> = ({
  leftComponent,
  rightComponent,
  centerComponent,
}) => {
  if (centerComponent) {
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
