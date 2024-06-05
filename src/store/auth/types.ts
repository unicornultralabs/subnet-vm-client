import { APIResponse } from "../../services/api/types";
import { Account } from "../../types/entitites";

export interface AuthStoreState {
  credentials: APIResponse.Login | null;
  profile: Account | null;
}

export interface AuthStoreAction {
  setCredentials: (credentials: APIResponse.Login) => void;
  setProfile: (profile: Account) => void;
}
