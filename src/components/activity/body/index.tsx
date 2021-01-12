import { Button, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import LoveSvg from "../../../common/svgs/LoveSvg";
import { TO_CREATESTYLE_PAGE } from "../../../utils/constants/routes";
import { useStyles } from "./styles";

const ActivityBody: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  // Event Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      history.push(TO_CREATESTYLE_PAGE, files);
    }
  };

  // JSX
  return (
    <div className={classes.bodyRoot}>
      <div className={classes.bodyWrapper}>
        <div className={classes.svgWrapper}>
          <LoveSvg width={30} height={30} />
        </div>
        <Typography variant="h6" className={classes.bodyTitle}>
          Activity On Your Posts
        </Typography>
        <Typography variant="body1" className={classes.bodyContent}>
          When someone likes or comments on one of your posts, you'll see it
          here
        </Typography>
        <div className="file-input-wrapper">
          <Button className={classes.shareBtn}>Share your first photo</Button>
          <input
            type="file"
            multiple
            id="file-input"
            style={{ width: 160 }}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityBody;
