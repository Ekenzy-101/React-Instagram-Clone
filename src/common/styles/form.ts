import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  (theme) => ({
    input: {
      width: "300px",
      padding: "0.5rem",
      border: "1px solid rgba(var(--b6a,219,219,219),1)",
      background: "transparent",
      borderRadius: "4px",
      [theme.breakpoints.down(735)]: {
        width: "90% !important",
        margin: "auto !important",
        display: "block !important",
      },
    },
    focused: {
      border: "2px solid #000",
      outline: "none",
      [theme.breakpoints.down(735)]: {
        border: `1px solid ${theme.palette.primary.main}`,
      },
    },
    label: {
      width: "100%",
      display: "block",
      fontWeight: 600,
      textAlign: "right",
      [theme.breakpoints.down(735)]: {
        width: "90%",
        margin: "0 auto 0.5rem auto",
        textAlign: "left",
      },
    },
    select: {
      width: "100%",
      padding: "1px 0.5rem",
      borderRadius: "4px",
      "&:before": {
        content: "none",
      },
      "&:after": {
        content: "none",
      },
    },
    textarea: {
      width: "300px",
      padding: "0.5rem",
      fontFamily: "inherit",
      fontSize: "1rem",
      border: "1px solid rgba(var(--b6a,219,219,219),1)",
      background: "transparent",
      borderRadius: "4px",
      minHeight: "62px",
      resize: "vertical",
      outline: "none",
      "&:focus": {
        border: `2px solid #000`,
      },
      [theme.breakpoints.down(735)]: {
        width: "90%",
        margin: "auto",
        display: "block",
        "&:focus": {
          border: `1px solid ${theme.palette.primary.main}`,
        },
      },
    },
  }),
  { name: "Mui" }
);
