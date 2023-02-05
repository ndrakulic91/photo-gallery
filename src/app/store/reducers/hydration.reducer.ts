import { ActionReducer, INIT, UPDATE } from "@ngrx/store";
import { RootState } from "../models/root-state";

export const hydrationMetaReducer = (
  reducer: ActionReducer<RootState>
): ActionReducer<RootState> => {
  return (state, action) => {
    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = sessionStorage.getItem("state");
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          sessionStorage.removeItem("state");
        }
      }
    }
    const nextState = reducer(state, action);
    sessionStorage.setItem("state", JSON.stringify(nextState));
    return nextState;
  };
};
