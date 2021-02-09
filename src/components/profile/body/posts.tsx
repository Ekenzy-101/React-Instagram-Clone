import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Avatar, Button, Typography } from "@material-ui/core";
import toast from "react-hot-toast";

import { Post } from "../../../utils/types/post";
import CommentSvg from "../../../common/svgs/CommentSvg";
import LoveSvg from "../../../common/svgs/LoveSvg";
import {
  CAMERA_LOGO_URL,
  POST_PIC_URL,
  MULTI_PHOTO_LOGO_URL,
} from "../../../utils/constants/url";
import { useUser } from "../../../utils/context/user";
// import ProfileBodyCard from "./card";
import { useStyles } from "./style";
import { TO_CREATESTYLE_PAGE } from "../../../utils/constants/routes";
import CustomToast from "../../../common/toast";
interface Props {
  posts: Post[];
}

const ProfileBodyPosts: React.FC<Props> = ({ posts }) => {
  // Global Hooks
  const { user } = useUser()!;

  // Other Hooks
  const classes = useStyles();
  const history = useHistory();
  const { username } = useParams() as { username: string };

  // Event Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;

    const supportedTypes = ["image/png", "image/jpeg"];

    for (const file of files) {
      if (supportedTypes.every((type) => file.type !== type)) {
        toast(<CustomToast message={"Image is not a supported format"} />);

        return;
      }
    }

    if (files?.length > 5) {
      toast(<CustomToast message="Please select a maximum of 5 images" />);
      return;
    }
    if (files?.length <= 5 && files?.length > 0) {
      history.push(TO_CREATESTYLE_PAGE, files);
    }
  };

  // JSX
  if (posts.length)
    return (
      <div
        className="explore-grid-container"
        style={{ padding: 0, maxWidth: 760, margin: "auto" }}
      >
        {posts.map((post) => (
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
            <img src={POST_PIC_URL} alt="Post" />
          </Link>
        ))}
      </div>
    );

  if (user && user.username === username)
    // return (
    //   <div style={{ marginTop: "-8px", height: "100%" }}>
    //     <Typography
    //       style={{ margin: "0.8rem 0.5rem 0.5rem 0.8rem", fontWeight: "bold" }}
    //     >
    //       Getting Started
    //     </Typography>
    //     <Grid container className={classes.flexContainer} spacing={1}>
    //       <ProfileBodyCard />
    //       <ProfileBodyCard />
    //       <ProfileBodyCard />
    //     </Grid>
    //   </div>
    // );
    return (
      <div className={classes.bodyRoot}>
        <div className={classes.bodyWrapper}>
          <div className={classes.svgWrapper}>
            <Avatar src={CAMERA_LOGO_URL} className={classes.cameraLogo} />
          </div>
          <Typography variant="h6" className={classes.bodyTitle}>
            Share Photos
          </Typography>
          <Typography variant="body1" className={classes.bodyContent}>
            When you share photos, they will appear on your profile.
          </Typography>
          <Button
            variant="text"
            color="primary"
            style={{ textTransform: "none", margin: "auto", fontWeight: 600 }}
            disableElevation
          >
            <input
              type="file"
              multiple
              style={{ width: 160, height: 36 }}
              accept="image/png,image/jpeg"
              id="file-input"
              onChange={handleChange}
            />
            Share your first photo
          </Button>
        </div>
      </div>
    );

  return (
    <div className={classes.bodyRoot}>
      <div className={classes.bodyWrapper}>
        <div className={classes.svgWrapper}>
          <Avatar src={CAMERA_LOGO_URL} className={classes.cameraLogo} />
        </div>
        <Typography variant="h6" className={classes.bodyTitle}>
          No Posts Yet
        </Typography>
      </div>
    </div>
  );
};

export default ProfileBodyPosts;
