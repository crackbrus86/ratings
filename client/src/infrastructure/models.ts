export type ThunkAction<R, S, E>  = (dispatch: any, getState: () => S, extraArgument: E) => R;
declare module 'redux' {
  export interface Dispatch {
    <R, S, E>(asyncAction: ThunkAction<R, S, E>): R;
  }
}