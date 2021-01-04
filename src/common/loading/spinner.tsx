import React from "react";
import { LOADING_GIF_URL } from "../../utils/constants/url";

interface Props {
  width?: number;
  height?: number;
}

const LoadingSpinner: React.FC<Props> = ({ width, height }) => {
  return (
    <img src={LOADING_GIF_URL} alt="loading" width={width} height={height} />
  );
};

LoadingSpinner.defaultProps = {
  width: 20,
  height: 20,
};

export default LoadingSpinner;
