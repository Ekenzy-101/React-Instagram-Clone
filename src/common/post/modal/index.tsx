import React from "react";
import clsx from "clsx";
import { Dialog, DialogContent } from "@material-ui/core";
import { useStyles } from "./styles";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { Post } from "../../../utils/types/post";
import { useUserContext } from "../../../utils/context/user";
import { useCopyToClipboard } from "react-use";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  post: Post;
  onClose: () => void;
}

const PostModal: React.FC<Props> = ({ open, post, onClose }) => {
  // Global Context
  const { user } = useUserContext()!;

  // Other Hooks
  const classes = useStyles();
  const history = useHistory();
  const { path, params } = useRouteMatch();
  const routeParams = useParams() as { id: string };
  const [state, copyToClipboard] = useCopyToClipboard();

  // Event Handlers
  const handleCopyToClipboard = () => {
    copyToClipboard(`${window.location.origin}/p/${post.id}/`);
    onClose();
    if (state.error) {
      toast("Unable to copy link.");
    } else {
      toast("Link copied to clipboard.");
    }
  };

  // JSX
  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      className={classes.root}
      open={open}
      onClose={onClose}
    >
      {user?.username !== post.user.username ? (
        <DialogContent
          className={clsx(classes.dialogBtn, classes.dangerBtn)}
          dividers
        >
          Unfollow
        </DialogContent>
      ) : null}
      {user?.username === post.user.username ? (
        <DialogContent
          className={clsx(classes.dialogBtn, classes.dangerBtn)}
          dividers
        >
          Delete
        </DialogContent>
      ) : null}
      {!routeParams.id ? (
        <DialogContent
          onClick={() =>
            history.push(`/p/${post.id}/`, { from: path, ...params })
          }
          className={classes.dialogBtn}
          dividers
        >
          Go to post
        </DialogContent>
      ) : null}{" "}
      <DialogContent
        className={classes.dialogBtn}
        onClick={handleCopyToClipboard}
        dividers
      >
        Copy Link
      </DialogContent>
      <DialogContent onClick={onClose} className={classes.dialogBtn} dividers>
        Cancel
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;
