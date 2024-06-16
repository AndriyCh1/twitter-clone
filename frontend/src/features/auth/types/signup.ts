/**
 * Duplicating interface properties might seem like a bad practice, but it
 * actually makes the code easier to maintain. For instance, even though
 * ISignUpFormData and ISignUpPayload are identical (we could create a new
 * common interface), keeping them separate allows us to update them independently.
 * If the form needs a new property that the API doesn't require, we can simply update
 * ISignUpFormData without affecting ISignUpPayload.
 */

export interface ISignUpFormData {
  email: string;
  username: string;
  fullName: string;
  password: string;
}

export interface ISignUpPayload {
  email: string;
  username: string;
  fullName: string;
  password: string;
}

export interface ISignUpResponse {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  profileImg: string;
  coverImg: string;
  followers: string[];
  following: string[];
}
