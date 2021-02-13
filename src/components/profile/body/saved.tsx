import React from "react";
import { CardMedia, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import { useStyles } from "./style";
import CommentSvg from "../../../common/svgs/CommentSvg";
import SavedSvg from "../../../common/svgs/SavedSvg";
import LoveSvg from "../../../common/svgs/LoveSvg";
import { Post } from "../../../utils/types/post";
import { MULTI_PHOTO_LOGO_URL } from "../../../utils/constants/url";
interface Props {
  savedPosts: Post[];
}

const ProfileBodySaved: React.FC<Props> = (props) => {
  const { savedPosts } = props;

  // Other Hooks
  const classes = useStyles();

  // JSX
  if (savedPosts.length)
    return (
      <>
        <Typography className={classes.savedText} color="textSecondary">
          Only you can see what you've saved
        </Typography>
        <div
          className="explore-grid-container"
          style={{ padding: 0, maxWidth: 760, margin: "auto" }}
        >
          {savedPosts.map((post) => (
            <Link
              to={`/p/${post.id}/`}
              key={post.id}
              className="explore-grid-item single-grid-square"
            >
              <div className="after">
                <div>
                  <LoveSvg fill="#fff" active width={22} height={22} />
                  <Typography
                    variant="body1"
                    style={{ color: "#fff", marginLeft: "0.5rem" }}
                  >
                    {post?.likes?.length}
                  </Typography>
                </div>
                <div>
                  <CommentSvg fill="#fff" width={22} height={22} />
                  <Typography
                    variant="body1"
                    style={{ color: "#fff", marginLeft: "0.5rem" }}
                  >
                    {post?.commentsCount}
                  </Typography>
                </div>
              </div>
              {post?.image_urls?.length > 1 ? (
                <span
                  style={{ backgroundImage: `url(${MULTI_PHOTO_LOGO_URL})` }}
                  className={classes.multiPhoto}
                ></span>
              ) : null}
              <CardMedia image={post.image_urls[0]} className="post-image" />
            </Link>
          ))}
        </div>
      </>
    );

  return (
    <div className={classes.bodyRoot}>
      <div className={classes.bodyWrapper}>
        <div className={classes.svgWrapper}>
          <SavedSvg width={30} height={30} />
        </div>
        <Typography variant="h6" className={classes.bodyTitle}>
          Save
        </Typography>
        <Typography variant="body1" className={classes.bodyContent}>
          Save photos and videos that you want to see again. No one is notified,
          and only only you can see what you've saved
        </Typography>
      </div>
    </div>
  );
};

export default ProfileBodySaved;
