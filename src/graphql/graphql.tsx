import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  createPost: Post;
  createUser: UserResponse;
  deletePost: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  updatePost?: Maybe<Post>;
  updateUser?: Maybe<User>;
};


export type MutationChangePasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  emerg_contact?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  newsletter: Scalars['Boolean'];
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  privacy_level: Scalars['Int'];
  username: Scalars['String'];
};


export type MutationDeletePostArgs = {
  uuid: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  uuid: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  title: Scalars['String'];
  uuid: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  title: Scalars['String'];
  uuid: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  uuid: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: Array<Post>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryPostArgs = {
  uuid: Scalars['String'];
};


export type QueryUserArgs = {
  uuid: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  access_level: Scalars['Int'];
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  emerg_contact: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  newsletter: Scalars['Boolean'];
  phone: Scalars['String'];
  privacy_level: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  uuid: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type BaseErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type BaseUserFragment = { __typename?: 'User', uuid: string, id: number, username: string, email: string };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', uuid: string, id: number, username: string, email: string } | null } };

export type RegisterMutationVariables = Exact<{
  privacyLevel: Scalars['Int'];
  newsletter: Scalars['Boolean'];
  password: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  emergContact?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
}>;


export type RegisterMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', uuid: string, id: number, username: string, email: string } | null } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  password: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', uuid: string, id: number, username: string, email: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', uuid: string, id: number, username: string, email: string } | null };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', title: string, createdAt: string, updatedAt: string, uuid: string }> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', name: string, phone: string, emerg_contact: string, newsletter: boolean, privacy_level: number, access_level: number, title?: string | null, bio?: string | null, uuid: string, id: number, username: string, email: string }> };

export const BaseErrorFragmentDoc = gql`
    fragment BaseError on FieldError {
  field
  message
}
    `;
export const BaseUserFragmentDoc = gql`
    fragment BaseUser on User {
  uuid
  id
  username
  email
}
    `;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    errors {
      ...BaseError
    }
    user {
      ...BaseUser
    }
  }
}
    ${BaseErrorFragmentDoc}
${BaseUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($privacyLevel: Int!, $newsletter: Boolean!, $password: String!, $username: String!, $email: String!, $emergContact: String, $phone: String, $name: String) {
  createUser(
    privacy_level: $privacyLevel
    newsletter: $newsletter
    password: $password
    username: $username
    email: $email
    emerg_contact: $emergContact
    phone: $phone
    name: $name
  ) {
    errors {
      ...BaseError
    }
    user {
      ...BaseUser
    }
  }
}
    ${BaseErrorFragmentDoc}
${BaseUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $password: String!) {
  changePassword(token: $token, password: $password) {
    errors {
      ...BaseError
    }
    user {
      ...BaseUser
    }
  }
}
    ${BaseErrorFragmentDoc}
${BaseUserFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...BaseUser
  }
}
    ${BaseUserFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const PostsDocument = gql`
    query Posts {
  posts {
    title
    createdAt
    updatedAt
    uuid
  }
}
    `;

export function usePostsQuery(options?: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'>) {
  return Urql.useQuery<PostsQuery, PostsQueryVariables>({ query: PostsDocument, ...options });
};
export const UsersDocument = gql`
    query Users {
  users {
    ...BaseUser
    name
    phone
    emerg_contact
    newsletter
    privacy_level
    access_level
    title
    bio
  }
}
    ${BaseUserFragmentDoc}`;

export function useUsersQuery(options?: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'>) {
  return Urql.useQuery<UsersQuery, UsersQueryVariables>({ query: UsersDocument, ...options });
};