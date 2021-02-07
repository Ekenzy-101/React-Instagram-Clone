import { InputBase, Avatar } from "@material-ui/core";
import { SearchOutlined, Cancel } from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  TO_EXPLORESEARCH_PAGE,
  TO_EXPLORE_PAGE,
} from "../../utils/constants/routes";
import { LOADING_GIF_URL } from "../../utils/constants/url";
import { getUsersBySearch } from "../../utils/services/userService";
import { User } from "../../utils/types/user";
import { useStyles } from "./styles";

interface Props {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const CustomSearchMobileView: React.FC<Props> = ({ setUsers }) => {
  // State Hooks
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef<NodeJS.Timeout | null>(null);

  // Other Hooks
  const { path } = useRouteMatch();
  const isSearchPage = path === TO_EXPLORESEARCH_PAGE;
  const classes = useStyles({ status: isSearchPage ? "search" : undefined });
  const history = useHistory();

  // Effect Hooks
  useEffect(() => {
    ref.current = setTimeout(async () => {
      if (query) {
        setLoading(true);

        const { data } = await getUsersBySearch(query.toLowerCase());

        setLoading(false);
        setUsers(data as User[]);
      }
    }, 1000);
  }, [query]);

  // Event Handlers
  const handleFocus = (
    _: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!isSearchPage) {
      history.push(TO_EXPLORESEARCH_PAGE);
    }
  };

  const handleClick = () => {
    setQuery("");
    history.push(TO_EXPLORE_PAGE);
  };

  return (
    <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
      <InputBase
        placeholder="Search"
        fullWidth
        className={classes.inputBase}
        value={query}
        onFocus={handleFocus}
        onChange={(e) => setQuery(e.target.value)}
        inputProps={{ className: classes.input }}
        style={{
          borderRadius: "6px",
          width: "100%",
          paddingLeft: isSearchPage ? "0.3rem" : "40%",
        }}
        startAdornment={<SearchOutlined className={classes.searchIcon} />}
        endAdornment={
          loading ? (
            <Avatar
              src={LOADING_GIF_URL}
              style={{ width: "1rem", height: "1rem" }}
            />
          ) : query ? (
            <Cancel className={classes.cancel} onClick={() => setQuery("")} />
          ) : undefined
        }
      />
      {path.includes("/explore/search") ? (
        <span onClick={handleClick} className={classes.cancelLink}>
          Cancel
        </span>
      ) : null}
    </div>
  );
};

export default CustomSearchMobileView;
