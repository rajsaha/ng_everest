import { createAction, props } from '@ngrx/store';
import { NoImageForm } from "@models/noImageForm.model";

export const setFormValue = createAction('[No Image Component] Set Form Value', props<{ formVal: NoImageForm }>());
export const unsetFormValue = createAction('[No Image Component] Unset Form Value');
