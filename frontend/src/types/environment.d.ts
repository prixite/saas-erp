export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_PORT: number;
      REACT_APP_BASE_URL: string;
      REACT_APP_GOOGLE_CLIENT_ID: string;
      REACT_APP_LOCAL_URL: string;
    }
  }
}
