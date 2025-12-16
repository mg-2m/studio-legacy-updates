
import type { AppState, Action } from './types';

export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'UPDATE_METADATA':
      return {
        ...state,
        metadata: { ...state.metadata, [action.payload.key]: action.payload.value },
      };
    // Add other case handlers here...
    default:
      return state;
  }
}
