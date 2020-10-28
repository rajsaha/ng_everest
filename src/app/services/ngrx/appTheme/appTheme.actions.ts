import { createAction, props } from '@ngrx/store';

export const setTheme = createAction('[App Theme] Set Theme', props<{ theme: string }>());
