import { Typography } from "@material-ui/core";
import React from "react";
import CommentSvg from "../../../common/svgs/CommentSvg";
import LoveSvg from "../../../common/svgs/LoveSvg";
import { POST_PIC_URL } from "../../../utils/constants/url";
import "./styles.css";

const ExploreBody = () => {
  return (
    <div>
      <div className="explore-grid-container">
        <div className="explore-grid-item single-grid-square">
          <div className="after">
            <div>
              <LoveSvg fill="#fff" active width={22} height={22} />
              <Typography
                variant="body1"
                style={{ color: "#fff", marginLeft: "0.5rem" }}
              >
                24
              </Typography>
            </div>
            <div>
              <CommentSvg fill="#fff" width={22} height={22} />
              <Typography
                variant="body1"
                style={{ color: "#fff", marginLeft: "0.5rem" }}
              >
                24
              </Typography>
            </div>
          </div>
          <img src={POST_PIC_URL} alt="Post" />
        </div>
        <div className="explore-grid-item double-grid-square">
          <div className="after">
            <div>
              <LoveSvg fill="#fff" active width={22} height={22} />
              <Typography
                variant="body1"
                style={{ color: "#fff", marginLeft: "0.5rem" }}
              >
                24
              </Typography>
            </div>
            <div>
              <CommentSvg fill="#fff" width={22} height={22} />
              <Typography
                variant="body1"
                style={{ color: "#fff", marginLeft: "0.5rem" }}
              >
                24
              </Typography>
            </div>
          </div>
          <img src={POST_PIC_URL} alt="Post" />
        </div>
        <div className="explore-grid-item single-grid-square">
          <img src={POST_PIC_URL} alt="Post" />
        </div>
        <div className="explore-grid-item single-grid-square">
          <img src={POST_PIC_URL} alt="Post" />
        </div>
        <div className="explore-grid-item single-grid-square">
          <img src={POST_PIC_URL} alt="Post" />
        </div>
        <div className="explore-grid-item single-grid-square">
          <img src={POST_PIC_URL} alt="Post" />
        </div>
        <div className="explore-grid-item single-grid-square">
          <img src={POST_PIC_URL} alt="Post" />
        </div>
      </div>
    </div>
  );
};

export default ExploreBody;
