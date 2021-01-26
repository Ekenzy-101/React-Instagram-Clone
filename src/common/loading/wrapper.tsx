import React from "react";

interface Props {
  component: React.FC;
  AppProps?: object;
}

const LoadingWrapper: React.FC<Props> = ({ component: C, AppProps }) => {
  return (
    <>
      <div
        id="loading-animation"
        className="loading-progress-bar"
        style={{ position: "sticky" }}
      ></div>
      <C {...AppProps} />
    </>
  );
};

export default LoadingWrapper;
