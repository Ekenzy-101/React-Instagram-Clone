import { Avatar, InputBase, Typography } from "@material-ui/core";
import { SearchOutlined, Cancel } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useStyles } from "./styles";
import { getUsersBySearch } from "../../utils/services/userService";
import { User } from "../../utils/types/user";
import {
  LOADING_GIF_URL,
  DEFAULT_PROFILE_PIC_URL,
} from "../../utils/constants/url";

type State = {
  users: User[];
  status: "focused" | "none";
  query: string;
  loading: boolean;
  hasFetchedBefore: boolean;
};

type Action =
  | { type: "focus" }
  | { type: "reset" }
  | { type: "request" }
  | { type: "success"; payload: User[] }
  | { type: "blur" }
  | { type: "handlechange"; payload: string };

const initialState: State = {
  users: [],
  status: "none",
  query: "",
  loading: false,
  hasFetchedBefore: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "reset":
      return { ...state, query: "" };
    case "request":
      return { ...state, loading: true };
    case "success":
      return {
        ...state,
        loading: false,
        users: action.payload,
        hasFetchedBefore: true,
      };
    case "focus":
      return { ...state, status: "focused" };
    case "blur":
      return { ...state, status: "none" };
    case "handlechange":
      return {
        ...state,
        query: action.payload,
        status: "focused",
        hasFetchedBefore: action.payload ? true : false,
      };
    default:
      return state;
  }
}

const CustomSearch: React.FC = () => {
  // State Hooks
  const [{ query, status, loading, users }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [value, setValue] = useState<null | User>(null);
  const ref = useRef<NodeJS.Timeout | null>(null);

  // Other Hooks
  const classes = useStyles({ status });

  // Effect Hooks
  useEffect(() => {
    ref.current = setTimeout(async () => {
      if (query) {
        dispatch({ type: "request" });

        const { data } = await getUsersBySearch(query.toLowerCase());

        dispatch({ type: "success", payload: data as User[] });
      }
    }, 1000);
  }, [query]);

  // Event Handlers
  const handleChange = (e: React.ChangeEvent<{}>, value: string) => {
    dispatch({ type: "handlechange", payload: value });
    clearTimeout(ref.current!);
  };

  const handleBlur = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTimeout(() => {
      dispatch({ type: "blur" });
    }, 200);
  };

  const handleFocus = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch({ type: "focus" });
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
  };

  // JSX
  return (
    <>
      <Autocomplete
        id="search-box"
        clearOnBlur={false}
        clearOnEscape
        noOptionsText="No results found."
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
        inputValue={query}
        onInputChange={handleChange}
        ListboxProps={{ className: classes.listBox }}
        options={users}
        getOptionLabel={(option) => option.username!}
        renderInput={(params) => (
          <div className={classes.root} ref={params.InputProps.ref}>
            <InputBase
              placeholder="Search"
              className={classes.inputBase}
              onFocus={handleFocus}
              onBlur={handleBlur}
              inputProps={{ className: classes.input, ...params.inputProps }}
              startAdornment={<SearchOutlined className={classes.searchIcon} />}
              endAdornment={
                loading ? (
                  <Avatar
                    src={LOADING_GIF_URL}
                    style={{ width: "1rem", height: "1rem" }}
                  />
                ) : status === "focused" ? (
                  <Cancel
                    onClick={handleReset}
                    className={classes.cancel}
                    focusable={undefined}
                  />
                ) : undefined
              }
            />
          </div>
        )}
        renderOption={({ username, id, image_url, name }) => (
          <>
            <Link to={`/${username}/`} key={id} className={classes.link}>
              <div className={classes.menuItem}>
                <Avatar
                  className={classes.avatar}
                  src={image_url ? image_url : DEFAULT_PROFILE_PIC_URL}
                />
                <div>
                  <Typography className={classes.username}>
                    <strong>{username}</strong>
                  </Typography>
                  <Typography className={classes.name} color="textSecondary">
                    {name}
                  </Typography>
                </div>
              </div>
            </Link>
          </>
        )}
      />
    </>
  );
};

export default CustomSearch;
