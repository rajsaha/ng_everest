import { createReducer, on } from "@ngrx/store";
import {
  setRefreshCollectionsToTrue,
  setRefreshCollectionsToFalse
} from "./refreshCollections.actions";

export const initialState = false;

const _collectionsRefreshStateReducer = createReducer(
  initialState,
  on(setRefreshCollectionsToTrue, (state) => true),
  on(setRefreshCollectionsToFalse, (state) => false)
);

export function collectionsRefreshStateReducer(state, action) {
  return _collectionsRefreshStateReducer(state, action);
}
