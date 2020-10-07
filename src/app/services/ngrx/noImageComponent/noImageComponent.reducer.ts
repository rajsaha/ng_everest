import { NoImageForm } from '@models/noImageForm.model';
import { createReducer, on } from "@ngrx/store";
import {
  setFormValue,
  unsetFormValue
} from "./noImageComponent.actions";

export const initialState: NoImageForm = {
    topText: "",
    bottomText: "",
    preset: "",
    backgroundColor: "#ffbc63",
    textColor: "#c25151"
};

const _noImageComponentReducer = createReducer(
  initialState,
  on(setFormValue, (state, { formVal }) => {  return state = formVal }),
  on(unsetFormValue, (state) => state = initialState)
);

export function noImageComponentStateReducer(state, action) {
  return _noImageComponentReducer(state, action);
}
