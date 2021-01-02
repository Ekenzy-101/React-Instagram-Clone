import { InputBase } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import React from "react";
import { useStyles } from "./styles";

interface Props {
  fullWidth?: boolean;
  borderRadius?: string;
}

const CustomSearch: React.FC<Props> = ({ fullWidth, borderRadius }) => {
  // Other Hooks
  const classes = useStyles();

  // JSX
  return (
    <InputBase
      placeholder=" Search"
      fullWidth={fullWidth}
      className={classes.root}
      style={{
        borderRadius: borderRadius ? borderRadius : "4px",
        width: fullWidth ? "100%" : "215px",
      }}
      startAdornment={<SearchOutlined className={classes.searchIcon} />}
    />
  );
};

export default CustomSearch;
