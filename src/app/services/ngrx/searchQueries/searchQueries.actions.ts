import { RsrceCol } from '@models/rsrceCol.model';
import { createAction, props } from '@ngrx/store';

export const setCollectionQuery = createAction('[Search Query] Set Collection Value', props<{ query: RsrceCol }>());
export const unsetCollectionQuery = createAction('[Search Query] Unset Collection Value');
export const setResourceQuery = createAction('[Search Query] Set Resource Value', props<{ query: RsrceCol }>());
export const unsetResourceQuery = createAction('[Search Query] Unset Resource Value');
