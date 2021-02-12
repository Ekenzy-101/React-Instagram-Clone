import { useMutation } from "@apollo/client";
import { Paper } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import AddPostHeader from "../../components/add-post/header";
import AddPostBody from "../../components/add-post/body";
import { fileOptions, resizeFile } from "../../utils/helpers/index";
import { debug } from "../../utils/services/debugService";
import http from "../../utils/services/httpService";
import { CREATE_POST } from "../../utils/mutations/post";
import { TO_HOME_PAGE } from "../../utils/constants/routes";
import { useInputImagesContext } from "../../utils/context/inputImages";
import LoadingProgressBar from "../../common/loading/progress-bar";
import { useStyles } from "./styles";
import CustomToast from "../../common/toast";

const obj = { location: "", caption: "" };

const AddPostPage: React.FC = () => {
  // Global Hooks
  const { inputImages, setInputImages } = useInputImagesContext()!;

  // State Hooks
  const [formData, setFormData] = useState<{
    location: string;
    caption: string;
  }>({ ...obj });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const onPageMount = useRef<(() => void) | null>(null);

  // Other Hooks
  const classes = useStyles();
  const history = useHistory();
  const [createPost] = useMutation(CREATE_POST);
  const { state, pathname } = useLocation() as {
    state: FileList;
    pathname: string;
  };

  onPageMount.current = async () => {
    const images: Blob[] = [];

    if (pathname.includes("style")) {
      if (state) {
        for (const file of state) {
          const options: fileOptions = {
            file,
            maxHeight: 600,
            maxWidth: 600,
            minHeight: 600,
            minWidth: 600,
          };
          const image = (await resizeFile(options)) as Blob;

          debug.log(image);

          images.push(image);
        }

        setInputImages(images);
      } else {
        history.replace(TO_HOME_PAGE);
      }
    } else {
      if (!inputImages.length) {
        history.replace(TO_HOME_PAGE);
      }
    }
  };

  useEffect(() => {
    if (onPageMount.current) {
      onPageMount.current();
    }
  }, []);

  // Event Handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setSubmitted(true);

    try {
      const { data } = await createPost({
        variables: { ...formData, count: inputImages.length },
      });

      debug.log(data.createPost);

      const signedUrls = data.createPost as string[];

      signedUrls.forEach(async (url, index) => {
        await http.put(url, inputImages[index], {
          headers: {
            "Content-Type": "image/jpeg",
          },
          withCredentials: false,
        });
      });

      setTimeout(() => {
        history.push(TO_HOME_PAGE);
        toast(<CustomToast message="Your photo was posted" />);
      }, 2000);
    } catch (error) {
      toast(<CustomToast message="Couldn't post photo" />);
      setSubmitted(false);
      debug.error(error);
    }
  };

  debug.log(state);

  return (
    <Paper square variant="outlined" className={classes.root}>
      {submitted ? <LoadingProgressBar /> : null}
      <AddPostHeader images={inputImages} onSubmit={handleSubmit} />
      <AddPostBody images={inputImages} onChange={handleChange} />
    </Paper>
  );
};

export default AddPostPage;
