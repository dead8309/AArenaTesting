export type State =
  | {
      status: "success";
      message: string;
    }
  | {
      status: "error";
      message: string;
      error?: {
        path?: string;
        message: string;
      };
    }
  | null;