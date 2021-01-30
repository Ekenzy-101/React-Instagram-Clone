import { useMutation } from "@apollo/client";
import { useHistory, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import { TOGGLE_FOLLOW } from "../../utils/mutations/user";
import { TO_LOGIN_PAGE } from "../../utils/constants/routes";
import { useUser } from "../../utils/context/user";
import { debug } from "../../utils/services/debugService";
import { updateAuthUserFollowers } from "../../utils/helpers/user";
import { User } from "../../utils/types/user";

const useFollow = () => {
  // Global Hooks
  const { user } = useUser();

  // Other Hooks
  const [toggleFollow, { loading }] = useMutation(TOGGLE_FOLLOW);
  const history = useHistory();
  const { pathname } = useLocation();

  // Event Handlers
  const handleToggleFollow = async (profile: User) => {
    try {
      await toggleFollow({
        variables: { id: profile?.id },
        update(cache) {
          updateAuthUserFollowers(cache, user, profile);
        },
      });
    } catch (error) {
      debug.error(error?.message);
      if (error?.message.includes("Unauthorized")) {
        history.push(
          `${TO_LOGIN_PAGE}?next=${encodeURIComponent(pathname)}`,
          pathname
        );
      } else {
        toast(error?.message);
      }
    }
  };

  return {
    handleToggleFollow,
    submitted: loading,
  };
};

export default useFollow;
