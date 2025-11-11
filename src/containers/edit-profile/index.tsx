import { Paper } from "@material-ui/core";
import React from "react";
import { useTitle } from "react-use";
import { useQuery } from "@apollo/client";

import EditProfileHeader from "../../components/edit-profile/header";
import EditProfileBody from "../../components/edit-profile/body";
import Footer from "../../common/footer";
import LoadingPage from "../../common/loading/page";
import { GET_AUTH_USER_INFO } from "../../utils/queries/user";
import { debug } from "../../utils/services/debugService";
import { User } from "../../utils/types/user";
import { useStyles } from "./styles";

const EditProfilePage: React.FC = () => {
  // Other Hooks
  const classes = useStyles();
  const { data, loading } = useQuery(GET_AUTH_USER_INFO);
  useTitle("Edit Profile - Kenzygram");

  const profile = data?.profile as User;
  debug.table(profile);

  // JSX
  if (loading) return <LoadingPage spinner />;
  if (!data) return <div></div>;
  return (
    <Paper className={classes.root} square variant="outlined">
      <EditProfileHeader />
      <div className={classes.wrapper}>
        <EditProfileBody profile={profile} />
      </div>
      <Footer />
    </Paper>
  );
};

export default EditProfilePage;
