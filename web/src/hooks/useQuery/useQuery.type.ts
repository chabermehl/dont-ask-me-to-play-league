export type UseQueryState = {
  loading: boolean;
  error: boolean;
  data: any;
};

export type UseQueryAction = {
  type: string;
  payload: any;
};
