import { CardHeader, Grid, Avatar, IconButton } from "@material-ui/core";
import { MoreHoriz } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

import { PROFILE_PIC_URL } from "../../../../utils/constants/url";
import { Post } from "../../../../utils/types/post";
import { useStyles } from "../styles";

interface Props {
  onClick: () => void;
  post: Post;
}

const PostCardCommonHeader: React.FC<Props> = ({
  onClick,
  post: { user, location },
}) => {
  // Other Hooks
  const classes = useStyles();
  return (
    <CardHeader
      avatar={
        <Grid item className={classes.gridItem}>
          <div className={classes.avatarWrapper}>
            <Avatar
              src={user.image_url ? user.image_url : PROFILE_PIC_URL}
              className={classes.avatar}
            />
          </div>
        </Grid>
      }
      action={
        <IconButton onClick={onClick}>
          <MoreHoriz />
        </IconButton>
      }
      title={
        <Link className={classes.link} to={`/${user.username}/`}>
          {user.username}
        </Link>
      }
      subheader={location}
      className={classes.header}
    />
  );
};

export default PostCardCommonHeader;
