import { useMutation } from "@apollo/client";
import { Button, CardMedia, Paper } from "@material-ui/core";
import { AddCircleOutline, Close } from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";

import { fileOptions, resizeFile } from "../../utils/helpers/index";
import { debug } from "../../utils/services/debugService";
import http from "../../utils/services/httpService";
import { CREATE_STORY } from "../../utils/mutations/story";
import { TO_HOME_PAGE } from "../../utils/constants/routes";
import LoadingProgressBar from "../../common/loading/progress-bar";
import CustomToast from "../../common/toast";
import LoadingPage from "../../common/loading/page";
import { useStyles } from "./styles";

const AddStoryPage: React.FC = () => {
  // State Hooks
  const [image, setImage] = useState<Blob | null>(null);
  const [presignedUrl, setPresignedUrl] = useState("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const onPageMount = useRef<(() => void) | null>(null);

  // Other Hooks
  const classes = useStyles();
  const history = useHistory();
  const [createStory] = useMutation(CREATE_STORY);
  const { state } = useLocation() as {
    state: File;
    pathname: string;
  };

  onPageMount.current = async () => {
    if (!state) {
      return history.replace(TO_HOME_PAGE);
    }
    const options: fileOptions = {
      file: state,
      maxHeight: 1000,
      maxWidth: 800,
      minHeight: 600,
      minWidth: 480,
    };
    setImage((await resizeFile(options)) as Blob);
  };

  useEffect(() => {
    if (onPageMount.current) {
      onPageMount.current();
    }
  }, []);

  // Event Handlers
  const upload = async (url: string) => {
    await http.put(url, image, {
      headers: {
        "Content-Type": "image/jpeg",
      },
      withCredentials: false,
    });

    history.replace(TO_HOME_PAGE);
    toast(<CustomToast message="Photo added" />);
  };

  const handleCreateStory = async () => {
    setSubmitted(true);
    try {
      const { data } = await createStory();
      const url = data.createStory as string;

      setPresignedUrl(url);

      await upload(url);
    } catch (error) {
      setSubmitted(false);

      toast((t) => (
        <CustomToast
          message="Upload failed"
          btnText="Retry"
          onClick={() => handleRetry(t.id)}
        />
      ));
    }
  };

  const handleRetry = async (toastId?: string) => {
    setSubmitted(true);
    toast.dismiss(toastId);

    try {
      if (presignedUrl) {
        await upload(presignedUrl);
      } else {
        await handleCreateStory();
      }
    } catch (error) {
      setSubmitted(false);

      toast((t) => (
        <CustomToast
          message="Upload failed"
          btnText="Retry"
          onClick={() => handleRetry(t.id)}
        />
      ));
    }
  };
  debug.log(state);

  // JSX
  return (
    <>
      {image ? (
        <Paper square variant="outlined" className={classes.root}>
          {submitted ? <LoadingProgressBar title="Uploading" /> : null}

          <Close
            className={classes.closeBtn}
            onClick={() => history.push(TO_HOME_PAGE)}
          />

          <Button className={classes.addBtn} onClick={handleCreateStory}>
            <AddCircleOutline className={classes.addIcon} />
            Add to your story
          </Button>

          <CardMedia
            image={URL.createObjectURL(image)}
            className={classes.bgImage}
          />
        </Paper>
      ) : (
        <LoadingPage spinner />
      )}
    </>
  );
};

export default AddStoryPage;
