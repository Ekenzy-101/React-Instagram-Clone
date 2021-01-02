import React from "react";

interface Props {
  active?: boolean;
  width?: number;
  height?: number;
  onClick?:
    | ((event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void)
    | undefined;
}

const GridSvg: React.FC<Props> = ({ active, width, height, onClick }) => {
  return (
    <svg
      aria-label="Posts"
      className="_8-yf5 "
      fill={active ? "#0095f6" : "#8e8e8e"}
      height={height}
      viewBox="0 0 48 48"
      width={width}
      onClick={onClick}
    >
      <path
        clipRule="evenodd"
        d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

GridSvg.defaultProps = {
  active: false,
  height: 24,
  width: 24,
};

export default GridSvg;
