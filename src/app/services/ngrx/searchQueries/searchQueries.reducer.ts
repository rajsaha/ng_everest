import { RsrceCol } from '@models/rsrceCol.model';
import { createReducer, on } from "@ngrx/store";
import {
  setCollectionQuery,
  setResourceQuery,
  unsetCollectionQuery,
  unsetResourceQuery,
} from "./searchQueries.actions";

export const initialState: RsrceCol = {
  collectionQuery: "",
  resourceQuery: "",
};

const _searchQueriesReducer = createReducer(
  initialState,
  on(setCollectionQuery, (state, { query }) => {
    return (state = query);
  }),
  on(unsetCollectionQuery, (state) => (state = initialState)),
  on(setResourceQuery, (state, { query }) => {
      return (state = query)
  }),
  on(unsetResourceQuery, (state) => (state = initialState))
);

export function searchQueriesStateReducer(state, action) {
  return _searchQueriesReducer(state, action);
}
