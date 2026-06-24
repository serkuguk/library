import {User} from "@core/models/backend/user";

export * as loginEffects from './store/user.effects';
export * as loginReducers from './store/user.reducer';

export interface State {
  user: User | null;
  access_token: string | null;
  loading: boolean | null;
  error: string | null;
}
