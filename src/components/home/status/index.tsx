import { Avatar, Badge, Grid, Typography } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";

import { TO_CREATESTORY_PAGE } from "../../../utils/constants/routes";
import { PROFILE_PIC_URL } from "../../../utils/constants/url";
import { useUser } from "../../../utils/context/user";
import { Story } from "../../../utils/types/story";
import { useStyles } from "./styles";
interface Props {
  stories: Story[];
}

const HomeStatus: React.FC<Props> = ({ stories }) => {
  // Global Hooks
  const { user: authUser } = useUser();

  // Other Hooks
  const classes = useStyles();
  const history = useHistory();

  // Event Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      history.replace(TO_CREATESTORY_PAGE, file);
    }
  };

  // Other Logic
  const userStory = stories?.find((s) => s.user.id === authUser?.id);
  const otherStories = stories?.filter((s) => s.user.id !== authUser?.id);

  // JSX
  return (
    <Grid container alignItems="center" className={classes.root}>
      <div className={classes.wrapper}>
        {userStory ? (
          <Grid item className={classes.gridItem}>
            <div className={classes.avatarWrapper}>
              <Avatar
                src={
                  authUser?.image_url ? authUser?.image_url : PROFILE_PIC_URL
                }
                alt={authUser?.username}
                className={classes.avatar}
              />
            </div>
          </Grid>
        ) : (
          <div className="file-input-wrapper">
            <Grid
              style={{ background: "transparent" }}
              item
              className={classes.gridItem}
            >
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={<AddCircle className={classes.addIcon} />}
              >
                <Avatar className={classes.avatar} src={PROFILE_PIC_URL} />
              </Badge>
            </Grid>
            <input
              type="file"
              accept="image/png,image/jpeg"
              id="file-input"
              style={{ width: 56, height: 56 }}
              onChange={handleChange}
            />
          </div>
        )}
        <Typography
          className={classes.username}
          variant="body1"
          color="textPrimary"
        >
          Your Story
        </Typography>
      </div>

      {otherStories?.map(({ id, user: { username, image_url } }) => (
        <div key={id} className={classes.wrapper}>
          <Grid item className={classes.gridItem}>
            <div className={classes.avatarWrapper}>
              <Avatar
                src={image_url ? image_url : PROFILE_PIC_URL}
                alt={username}
                className={classes.avatar}
              />
            </div>
          </Grid>
          <Typography
            className={classes.username}
            variant="body1"
            color="textPrimary"
          >
            {username}
          </Typography>
        </div>
      ))}
    </Grid>
  );
};

export default HomeStatus;
