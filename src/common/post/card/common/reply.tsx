import { Link, useRouteMatch } from "react-router-dom";
import React, { useState } from "react";
import { Avatar, Typography } from "@material-ui/core";

import { ReplyComment } from "../../../../utils/types/post";
import { useUser } from "../../../../utils/context/user";
import { PROFILE_PIC_URL } from "../../../../utils/constants/url";
import { parseCommentDate } from "../../../../utils/helpers/comment";
import { useStyles } from "../styles";
import LoveSvg from "../../../svgs/LoveSvg";
import { modalState } from "../../../../utils/types/modal";
import UsersModal from "../../../users-modal";

interface Props {
  reply: ReplyComment;
  onToggleReplyLike: (id: string) => void;
  onLongPress: {
    readonly onMouseDown: (e: any) => void;
    readonly onTouchStart: (e: any) => void;
    readonly onMouseUp: () => void;
    readonly onMouseLeave: () => void;
    readonly onTouchEnd: () => void;
  };
}

const PostCardCommonReply: React.FC<Props> = ({
  reply,
  onToggleReplyLike,
  onLongPress,
}) => {
  const { user: authUser } = useUser();
  const [show, setShow] = useState<modalState>("none");
  const classes = useStyles();
  const { path, params } = useRouteMatch();

  const isReplyLikedByUser = (reply: ReplyComment) => {
    return reply.likes.some((like) => like.id === authUser?.id);
  };

  return (
    <>
      <UsersModal
        title="Likes"
        users={reply.likes}
        open={show === "users"}
        onClose={() => setShow("none")}
      />
      <div className={classes.commentByGroup}>
        <Avatar
          src={reply.user.image_url ? reply.user.image_url : PROFILE_PIC_URL}
          className={classes.commentByAvatar}
        />

        <div {...onLongPress} id={reply.id} className={classes.commentByBody}>
          <Typography
            style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}
            variant="body1"
            id={reply.id}
          >
            <strong id={reply.id} style={{ marginRight: "0.5rem" }}>
              <Link
                className={classes.link}
                to={{
                  pathname: `/${reply.user.username}/`,
                  state: { from: path, ...params },
                }}
              >
                {reply.user.username}
              </Link>
            </strong>
            {reply.content.split("\n").map((c, i) => (
              <span id={reply.id} key={i}>
                {c}
                <br />
              </span>
            ))}
          </Typography>
          <Typography id={reply.id} variant="caption" color="textSecondary">
            {parseCommentDate(reply.created_at)}
            {reply.likes.length ? (
              <strong
                className={classes.link}
                onClick={() => setShow("users")}
                style={{ marginLeft: "12px" }}
              >
                {reply.likes.length > 1
                  ? `${reply.likes.length} likes`
                  : `${reply.likes.length} like`}
              </strong>
            ) : null}
          </Typography>
        </div>

        <div>
          <LoveSvg
            active={isReplyLikedByUser(reply)}
            fill={isReplyLikedByUser(reply) ? "#ed4956" : undefined}
            width={12}
            height={12}
            onClick={() => onToggleReplyLike(reply.id)}
          />
        </div>
      </div>
    </>
  );
};

export default PostCardCommonReply;
