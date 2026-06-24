import {User} from "@core/models/backend/user";

export { User } from '@core/models/backend/user';
export {Roles} from "@core/models/role";

// Requests models

export interface UsernamePasswordCredentials {
    username: string;
    password: string;
}

export type UserCreateRequest = Omit<User, 'uid' | 'username' | 'access_token'>;
