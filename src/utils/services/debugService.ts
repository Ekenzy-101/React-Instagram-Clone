const inProduction = process.env.NODE_ENV === "production";

export const debug = {
  log: (message: any, ...rest: any[]) => {
    if (!inProduction) {
      console.log(message, ...rest);
    }
  },
  error: (message: any, ...rest: any[]) => {
    if (!inProduction) {
      console.error(message, ...rest);
    }
  },
};
