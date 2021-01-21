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
  table: (tabularData: any, properties?: readonly string[] | undefined) => {
    if (!inProduction) {
      console.table(tabularData, properties);
    }
  },
  group: (...label: any[]) => {
    if (!inProduction) {
      console.group(...label);
    }
  },
  groupEnd: () => {
    if (!inProduction) {
      console.groupEnd();
    }
  },
};
