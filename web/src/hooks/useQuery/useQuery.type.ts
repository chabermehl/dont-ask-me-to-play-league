export type Data<TValue> = {
  [key: string]: TValue;
};

export type UseQueryState = {
  loading: boolean;
  error: boolean;
  data: Data<string> | null;
};

export type UseQueryAction = {
  type: string;
  payload: any;
};
