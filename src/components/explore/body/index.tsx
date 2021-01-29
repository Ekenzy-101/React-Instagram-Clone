import { Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./styles";
import CommentSvg from "../../../common/svgs/CommentSvg";
import LoveSvg from "../../../common/svgs/LoveSvg";
import {
  MULTI_PHOTO_LOGO_URL,
  POST_PIC_URL,
} from "../../../utils/constants/url";
import { Post } from "../../../utils/types/post";
interface Props {
  posts: Post[];
}
const ExploreBody: React.FC<Props> = ({ posts }) => {
  const classes = useStyles();
  const getClassName = (index: number) => {
    if ([2, 17, 32].includes(index)) {
      return "explore-grid-item double-grid-square";
    }
    return "explore-grid-item single-grid-square";
  };

  return (
    <div>
      <div className="explore-grid-container">
        {posts.map((post, index) => (
          <Link
            to={`/p/${post.id}/`}
            key={post.id}
            className={getClassName(index)}
          >
            <div className="after">
              <div>
                <LoveSvg fill="#fff" active width={22} height={22} />
                <Typography
                  variant="body1"
                  style={{ color: "#fff", marginLeft: "0.5rem" }}
                >
                  {post.likesCount}
                </Typography>
              </div>
              <div>
                <CommentSvg fill="#fff" width={22} height={22} />
                <Typography
                  variant="body1"
                  style={{ color: "#fff", marginLeft: "0.5rem" }}
                >
                  {post.commentsCount}
                </Typography>
              </div>
            </div>
            {post?.image_urls?.length > 1 ? (
              <span
                style={{ backgroundImage: `url(${MULTI_PHOTO_LOGO_URL})` }}
                className={classes.multiPhoto}
              ></span>
            ) : null}
            <img src={POST_PIC_URL} alt="Post" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExploreBody;
