import { Button, Collapse, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useStyles } from "../styles";
import useComment from "../../../../common/hooks/useComment";
import LoveSvg from "../../../svgs/LoveSvg";
import { useUser } from "../../../../utils/context/user";
import { Post, PostComment } from "../../../../utils/types/post";
import { limitCommentText, wrapLinkTag } from "../../../../utils/helpers";

interface Props {
  comment: PostComment;
  post: Post;
}

const PostCardCommonTabComment: React.FC<Props> = ({ comment, post }) => {
  const { likes, id, user, content } = comment;
  const { user: authUser } = useUser();
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const { handleToggleCommentLike } = useComment();

  // Other Logic
  const isCommentLikedByUser = likes.some((like) => like.id === authUser?.id);

  const splitWords = limitCommentText(content, 80);

  return (
    <div style={{ display: "flex", marginBottom: "0.3rem" }}>
      <Typography className={classes.mobileCommentByBody} variant="body1">
        <strong className={classes.username}>
          <Link className={classes.link} to={`/${user.username}/`}>
            {user.username}
          </Link>
        </strong>
        {splitWords.length > 1 ? (
          <>
            {wrapLinkTag(splitWords[0])}
            {open ? (
              <Collapse component="span" className={classes.collapse} in={open}>
                {wrapLinkTag(splitWords[1])}
              </Collapse>
            ) : (
              <Button
                onClick={() => setOpen(true)}
                className={classes.seeMoreBtn}
                disableFocusRipple
                disableTouchRipple
              >
                ... more
              </Button>
            )}
          </>
        ) : (
          <>{wrapLinkTag(content)} </>
        )}
      </Typography>
      <div>
        {authUser ? (
          <LoveSvg
            active={isCommentLikedByUser}
            fill={isCommentLikedByUser ? "#ed4956" : undefined}
            width={12}
            height={12}
            onClick={() => handleToggleCommentLike({ post, id })}
          />
        ) : null}
      </div>
    </div>
  );
};

export default PostCardCommonTabComment;
