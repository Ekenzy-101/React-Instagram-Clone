import { useMutation } from "@apollo/client";
import { Paper } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import AddPostHeader from "../../components/add-post/header";
import AddPostBody from "../../components/add-post/body";
import { resizeFile } from "../../utils/helpers/index";
import { debug } from "../../utils/services/debugService";
import http from "../../utils/services/httpService";
import { CREATE_POST } from "../../utils/mutations/post";
import { TO_HOME_PAGE } from "../../utils/constants/routes";
import { useInputImagesContext } from "../../utils/context/inputImages";
import LoadingProgressBar from "../../common/loading/progress-bar";
import { useStyles } from "./styles";

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
    const fileUrls: string[] = [];

    if (pathname.includes("style")) {
      if (state) {
        for (const file of state) {
          const image = (await resizeFile(file, 300, 300)) as string;

          debug.log(image);

          fileUrls.push(image);
        }

        setInputImages(fileUrls);
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
        const binary = new FormData();
        binary.append("file", inputImages[index]);
        await http.put(url, binary, { withCredentials: false });
      });

      history.push(TO_HOME_PAGE);
    } catch (error) {
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
