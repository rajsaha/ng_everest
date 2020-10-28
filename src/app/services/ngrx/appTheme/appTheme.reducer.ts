import { createReducer, on } from "@ngrx/store";
import {
  setTheme,
} from "./appTheme.actions";

export const initialState = "light";

const _appThemeReducer = createReducer(
  initialState,
  on(setTheme, (state, { theme }) => {  return state = theme }),
);

export function appThemeStateReducer(state, action) {
  return _appThemeReducer(state, action);
}
