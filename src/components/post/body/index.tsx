import { useQuery } from "@apollo/client";
import {
  Avatar,
  CardMedia,
  Divider,
  Hidden,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import CommentSvg from "../../../common/svgs/CommentSvg";
import LoveSvg from "../../../common/svgs/LoveSvg";
import {
  LOADING_GIF_URL,
  MULTI_PHOTO_LOGO_URL,
} from "../../../utils/constants/url";
import { GET_USER_RELATED_POSTS } from "../../../utils/queries/post";
import { Post } from "../../../utils/types/post";
import { useStyles } from "./styles";
interface Props {
  post: Post;
}

const PostBody: React.FC<Props> = ({ post }) => {
  const { user } = post;
  const { data, loading, refetch } = useQuery(GET_USER_RELATED_POSTS, {
    variables: { id: post.id },
  });
  const classes = useStyles();

  useEffect(() => {
    refetch({ id: post.id });
  }, [post.id]);

  const posts = data?.posts as Post[];

  return (
    <Hidden xsDown>
      <Divider />
      {loading ? (
        <Avatar src={LOADING_GIF_URL} className={classes.avatar} />
      ) : posts?.length ? (
        <>
          <Typography color="textSecondary" className={classes.text}>
            More posts from <strong>{user.username}</strong>
          </Typography>
          <div
            className="explore-grid-container"
            style={{ padding: 0, marginBottom: "3rem" }}
          >
            {posts.map((p) => (
              <Link
                to={`/p/${p.id}/`}
                className="explore-grid-item single-grid-square"
              >
                <div className="after">
                  <div>
                    <LoveSvg fill="#fff" active width={22} height={22} />
                    <Typography
                      variant="body1"
                      style={{ color: "#fff", marginLeft: "0.5rem" }}
                    >
                      {p.likesCount}
                    </Typography>
                  </div>
                  <div>
                    <CommentSvg fill="#fff" width={22} height={22} />
                    <Typography
                      variant="body1"
                      style={{ color: "#fff", marginLeft: "0.5rem" }}
                    >
                      {p.commentsCount}
                    </Typography>
                  </div>
                </div>
                {p?.image_urls?.length > 1 ? (
                  <span
                    style={{ backgroundImage: `url(${MULTI_PHOTO_LOGO_URL})` }}
                    className={classes.multiPhoto}
                  ></span>
                ) : null}
                <CardMedia image={p?.image_urls[0]} className="post-image" />
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </Hidden>
  );
};

export default PostBody;
