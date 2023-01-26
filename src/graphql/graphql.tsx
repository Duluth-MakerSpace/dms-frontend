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
  DateTime: any;
};

export type CalendarClass = {
  __typename?: 'CalendarClass';
  classTemplate: ClassTemplate;
  cost: Scalars['Float'];
  createdAt: Scalars['String'];
  dates: Array<Scalars['String']>;
  duration: Scalars['Int'];
  grantsCert?: Maybe<Certification>;
  instructor: User;
  lastDate: Scalars['String'];
  maxParticipants: Scalars['Int'];
  memberCost: Scalars['Float'];
  note?: Maybe<Scalars['String']>;
  participants: Array<User>;
  updatedAt: Scalars['String'];
  uuid: Scalars['String'];
};

export type CalendarClassResponse = {
  __typename?: 'CalendarClassResponse';
  calendarClass?: Maybe<CalendarClass>;
  errors?: Maybe<Array<FieldError>>;
};

export type CalendarEvent = {
  __typename?: 'CalendarEvent';
  cost: Scalars['Float'];
  createdAt: Scalars['String'];
  date: Array<Scalars['String']>;
  duration: Scalars['Int'];
  eventTemplate: EventTemplate;
  memberCost: Scalars['Float'];
  note?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  uuid: Scalars['String'];
};

export type CalendarEventResponse = {
  __typename?: 'CalendarEventResponse';
  calendarEvent?: Maybe<CalendarEvent>;
  errors?: Maybe<Array<FieldError>>;
};

export type Certification = {
  __typename?: 'Certification';
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  uuid: Scalars['String'];
};

export type ClassTemplate = {
  __typename?: 'ClassTemplate';
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  uuid: Scalars['String'];
};

export type ClassTemplateResponse = {
  __typename?: 'ClassTemplateResponse';
  classTemplate?: Maybe<ClassTemplate>;
  errors?: Maybe<Array<FieldError>>;
};

export type CreateMembershipResponse = {
  __typename?: 'CreateMembershipResponse';
  errors?: Maybe<Array<FieldError>>;
  membership?: Maybe<Membership>;
};

export type EventTemplate = {
  __typename?: 'EventTemplate';
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  uuid: Scalars['String'];
};

export type EventTemplateResponse = {
  __typename?: 'EventTemplateResponse';
  errors?: Maybe<Array<FieldError>>;
  eventTemplate?: Maybe<EventTemplate>;
};

export type Fee = {
  __typename?: 'Fee';
  amount: Scalars['Float'];
  createdAt: Scalars['String'];
  paid: Scalars['Boolean'];
  quantity: Scalars['Int'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
  uuid: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Membership = {
  __typename?: 'Membership';
  cost: Scalars['Float'];
  createdAt: Scalars['String'];
  days: Scalars['Int'];
  expiresAt: Scalars['String'];
  isExpired: Scalars['Boolean'];
  type: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
  uuid: Scalars['String'];
};

export type MembershipResponse = {
  __typename?: 'MembershipResponse';
  expirationDate?: Maybe<Scalars['DateTime']>;
  status: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addToClass: CalendarClassResponse;
  changePassword: UserResponse;
  createCalendarClass: CalendarClassResponse;
  createCalendarEvent: CalendarEventResponse;
  createClassTemplate: ClassTemplateResponse;
  createEventTemplate: EventTemplateResponse;
  createMembership: CreateMembershipResponse;
  createPost: PostResponse;
  createUser: UserResponse;
  deleteCalendarClass: Scalars['Boolean'];
  deleteCalendarEvent: Scalars['Boolean'];
  deleteClassTemplate: Scalars['Boolean'];
  deleteEventTemplate: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  removeFromClass: CalendarClassResponse;
  rfidLogin: Scalars['Boolean'];
  rfidLogout: Scalars['Boolean'];
  updateClassTemplate?: Maybe<ClassTemplate>;
  updateEventTemplate?: Maybe<EventTemplate>;
  updatePost?: Maybe<PostResponse>;
  updateUser?: Maybe<User>;
};


export type MutationAddToClassArgs = {
  classUuid: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateCalendarClassArgs = {
  cost: Scalars['Float'];
  dates: Array<Scalars['DateTime']>;
  duration: Scalars['Int'];
  instructor: Scalars['String'];
  maxParticipants: Scalars['Int'];
  memberCost: Scalars['Float'];
  note: Scalars['String'];
  templateId: Scalars['String'];
};


export type MutationCreateCalendarEventArgs = {
  cost: Scalars['Float'];
  dates: Scalars['DateTime'];
  duration: Scalars['Int'];
  instructor: Scalars['String'];
  memberCost: Scalars['Float'];
  note: Scalars['String'];
  templateId: Scalars['String'];
};


export type MutationCreateClassTemplateArgs = {
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationCreateEventTemplateArgs = {
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationCreateMembershipArgs = {
  cost: Scalars['Float'];
  days: Scalars['Int'];
  type: Scalars['String'];
};


export type MutationCreatePostArgs = {
  category: Scalars['Int'];
  content: Scalars['String'];
  title: Scalars['String'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  emergContact: Scalars['String'];
  emergPhone: Scalars['String'];
  name: Scalars['String'];
  newsletter: Scalars['Boolean'];
  password: Scalars['String'];
  phone: Scalars['String'];
  privacyLevel: Scalars['Int'];
  waivered: Scalars['Boolean'];
};


export type MutationDeleteCalendarClassArgs = {
  uuid: Scalars['String'];
};


export type MutationDeleteCalendarEventArgs = {
  uuid: Scalars['String'];
};


export type MutationDeleteClassTemplateArgs = {
  uuid: Scalars['String'];
};


export type MutationDeleteEventTemplateArgs = {
  uuid: Scalars['String'];
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
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRemoveFromClassArgs = {
  classUuid: Scalars['String'];
  userUuid: Scalars['String'];
};


export type MutationRfidLoginArgs = {
  durationSeconds?: InputMaybe<Scalars['Int']>;
  rfid: Scalars['String'];
};


export type MutationRfidLogoutArgs = {
  uuid: Scalars['String'];
};


export type MutationUpdateClassTemplateArgs = {
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  uuid: Scalars['Int'];
};


export type MutationUpdateEventTemplateArgs = {
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  uuid: Scalars['Int'];
};


export type MutationUpdatePostArgs = {
  category: Scalars['Int'];
  content: Scalars['String'];
  title: Scalars['String'];
  uuid: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  bio: Scalars['String'];
  uuid: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  author: User;
  category: Scalars['Int'];
  content: Scalars['String'];
  createdAt: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  uuid: Scalars['String'];
};

export type PostResponse = {
  __typename?: 'PostResponse';
  errors?: Maybe<Array<FieldError>>;
  post?: Maybe<Post>;
};

export type Query = {
  __typename?: 'Query';
  calendarClass?: Maybe<CalendarClass>;
  calendarClasses: Array<CalendarClass>;
  calendarEvent?: Maybe<CalendarEvent>;
  calendarEvents: Array<CalendarEvent>;
  certification?: Maybe<Certification>;
  certifications: Array<Certification>;
  classTemplate?: Maybe<ClassTemplate>;
  classTemplates: Array<ClassTemplate>;
  eventTemplate?: Maybe<EventTemplate>;
  eventTemplates: Array<EventTemplate>;
  me?: Maybe<User>;
  membership?: Maybe<MembershipResponse>;
  memberships: Array<Membership>;
  post?: Maybe<Post>;
  posts: Array<Post>;
  rfids: Array<Scalars['String']>;
  titles: Array<Title>;
  user?: Maybe<User>;
  users: Array<User>;
  usersSearch: Array<User>;
};


export type QueryCalendarClassArgs = {
  uuid: Scalars['String'];
};


export type QueryCalendarEventArgs = {
  uuid: Scalars['String'];
};


export type QueryCertificationArgs = {
  uuid: Scalars['String'];
};


export type QueryClassTemplateArgs = {
  uuid: Scalars['String'];
};


export type QueryEventTemplateArgs = {
  uuid: Scalars['String'];
};


export type QueryMembershipArgs = {
  userUuid?: InputMaybe<Scalars['String']>;
};


export type QueryPostArgs = {
  uuid: Scalars['String'];
};


export type QueryPostsArgs = {
  category?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  uuid: Scalars['String'];
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryUsersSearchArgs = {
  search: Scalars['String'];
};

export type Title = {
  __typename?: 'Title';
  createdAt: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['String'];
  users: Array<User>;
  uuid: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  accessLevel: Scalars['Int'];
  attendedClasses: CalendarClass;
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  emergContact: Scalars['String'];
  emergPhone: Scalars['String'];
  fees: Array<Fee>;
  id: Scalars['Int'];
  memberships: Array<Membership>;
  name: Scalars['String'];
  newsletter: Scalars['Boolean'];
  phone: Scalars['String'];
  posts: Array<Post>;
  privacyLevel: Scalars['Int'];
  rfid?: Maybe<Scalars['String']>;
  taughtClasses: Array<CalendarClass>;
  title?: Maybe<Title>;
  updatedAt: Scalars['String'];
  uuid: Scalars['String'];
  waivered: Scalars['Boolean'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type BaseErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type BaseUserFragment = { __typename?: 'User', uuid: string, id: number, name: string, email: string, avatar?: string | null, title?: { __typename?: 'Title', uuid: string, title: string } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', phone: string, emergContact: string, emergPhone: string, accessLevel: number, uuid: string, id: number, name: string, email: string, avatar?: string | null, title?: { __typename?: 'Title', uuid: string, title: string } | null } | null } };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  privacyLevel: Scalars['Int'];
  newsletter: Scalars['Boolean'];
  waivered: Scalars['Boolean'];
  emergContact: Scalars['String'];
  emergPhone: Scalars['String'];
  phone: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', phone: string, emergContact: string, emergPhone: string, accessLevel: number, uuid: string, id: number, name: string, email: string, avatar?: string | null, title?: { __typename?: 'Title', uuid: string, title: string } | null } | null } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  password: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', phone: string, emergContact: string, emergPhone: string, accessLevel: number, uuid: string, id: number, name: string, email: string, avatar?: string | null, title?: { __typename?: 'Title', uuid: string, title: string } | null } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RfidLoginMutationVariables = Exact<{
  rfid: Scalars['String'];
  durationSeconds?: InputMaybe<Scalars['Int']>;
}>;


export type RfidLoginMutation = { __typename?: 'Mutation', rfidLogin: boolean };

export type RfidLogoutMutationVariables = Exact<{
  uuid: Scalars['String'];
}>;


export type RfidLogoutMutation = { __typename?: 'Mutation', rfidLogout: boolean };

export type RemoveFromClassMutationVariables = Exact<{
  classUuid: Scalars['String'];
  userUuid: Scalars['String'];
}>;


export type RemoveFromClassMutation = { __typename?: 'Mutation', removeFromClass: { __typename?: 'CalendarClassResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, calendarClass?: { __typename?: 'CalendarClass', uuid: string } | null } };

export type AddToClassMutationVariables = Exact<{
  classUuid: Scalars['String'];
}>;


export type AddToClassMutation = { __typename?: 'Mutation', addToClass: { __typename?: 'CalendarClassResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, calendarClass?: { __typename?: 'CalendarClass', uuid: string } | null } };

export type CreateMembershipMutationVariables = Exact<{
  cost: Scalars['Float'];
  days: Scalars['Int'];
  type: Scalars['String'];
}>;


export type CreateMembershipMutation = { __typename?: 'Mutation', createMembership: { __typename?: 'CreateMembershipResponse', membership?: { __typename?: 'Membership', uuid: string, days: number } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', phone: string, emergContact: string, emergPhone: string, accessLevel: number, uuid: string, id: number, name: string, email: string, avatar?: string | null, title?: { __typename?: 'Title', uuid: string, title: string } | null } | null };

export type RfidsQueryVariables = Exact<{ [key: string]: never; }>;


export type RfidsQuery = { __typename?: 'Query', rfids: Array<string> };

export type CertificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type CertificationsQuery = { __typename?: 'Query', certifications: Array<{ __typename?: 'Certification', uuid: string, title: string, image?: string | null, description?: string | null }> };

export type ClassTemplatesQueryVariables = Exact<{ [key: string]: never; }>;


export type ClassTemplatesQuery = { __typename?: 'Query', classTemplates: Array<{ __typename?: 'ClassTemplate', uuid: string, createdAt: string, updatedAt: string, title: string, description?: string | null, image?: string | null }> };

export type ClassTemplateQueryVariables = Exact<{
  uuid: Scalars['String'];
}>;


export type ClassTemplateQuery = { __typename?: 'Query', classTemplate?: { __typename?: 'ClassTemplate', description?: string | null, image?: string | null, title: string, uuid: string } | null };

export type EventTemplatesQueryVariables = Exact<{ [key: string]: never; }>;


export type EventTemplatesQuery = { __typename?: 'Query', eventTemplates: Array<{ __typename?: 'EventTemplate', uuid: string, createdAt: string, updatedAt: string, title: string, description?: string | null, image?: string | null }> };

export type EventTemplateQueryVariables = Exact<{
  uuid: Scalars['String'];
}>;


export type EventTemplateQuery = { __typename?: 'Query', eventTemplate?: { __typename?: 'EventTemplate', description?: string | null, image?: string | null, title: string, uuid: string } | null };

export type CalendarClassesQueryVariables = Exact<{ [key: string]: never; }>;


export type CalendarClassesQuery = { __typename?: 'Query', calendarClasses: Array<{ __typename?: 'CalendarClass', duration: number, lastDate: string, dates: Array<string>, createdAt: string, cost: number, maxParticipants: number, memberCost: number, uuid: string, note?: string | null, grantsCert?: { __typename?: 'Certification', uuid: string } | null, instructor: { __typename?: 'User', uuid: string, name: string }, classTemplate: { __typename?: 'ClassTemplate', description?: string | null, image?: string | null, title: string, uuid: string }, participants: Array<{ __typename?: 'User', uuid: string }> }> };

export type CalendarEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type CalendarEventsQuery = { __typename?: 'Query', calendarEvents: Array<{ __typename?: 'CalendarEvent', duration: number, date: Array<string>, createdAt: string, cost: number, memberCost: number, uuid: string, note?: string | null, eventTemplate: { __typename?: 'EventTemplate', description?: string | null, image?: string | null, title: string, uuid: string } }> };

export type CalendarClassQueryVariables = Exact<{
  uuid: Scalars['String'];
}>;


export type CalendarClassQuery = { __typename?: 'Query', calendarClass?: { __typename?: 'CalendarClass', uuid: string, createdAt: string, updatedAt: string, maxParticipants: number, cost: number, memberCost: number, dates: Array<string>, lastDate: string, duration: number, note?: string | null, grantsCert?: { __typename?: 'Certification', description?: string | null, image?: string | null, title: string, uuid: string } | null, classTemplate: { __typename?: 'ClassTemplate', uuid: string, title: string, image?: string | null, description?: string | null }, instructor: { __typename?: 'User', uuid: string, id: number, name: string, email: string, avatar?: string | null, title?: { __typename?: 'Title', uuid: string, title: string } | null }, participants: Array<{ __typename?: 'User', waivered: boolean, emergPhone: string, emergContact: string, phone: string, uuid: string, id: number, name: string, email: string, avatar?: string | null, title?: { __typename?: 'Title', uuid: string, title: string } | null }> } | null };

export type MembershipQueryVariables = Exact<{
  userUuid?: InputMaybe<Scalars['String']>;
}>;


export type MembershipQuery = { __typename?: 'Query', membership?: { __typename?: 'MembershipResponse', status: string, expirationDate?: any | null } | null };

export type PostsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  category?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['DateTime']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', uuid: string, createdAt: string, category: number, title: string, content: string, author: { __typename?: 'User', uuid: string, id: number, name: string, email: string, avatar?: string | null, title?: { __typename?: 'Title', uuid: string, title: string } | null } }> };

export type UsersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', phone: string, emergContact: string, newsletter: boolean, privacyLevel: number, accessLevel: number, bio?: string | null, uuid: string, id: number, name: string, email: string, avatar?: string | null, posts: Array<{ __typename?: 'Post', uuid: string }>, title?: { __typename?: 'Title', uuid: string, title: string } | null }> };

export type UserQueryVariables = Exact<{
  uuid: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', createdAt: string, rfid?: string | null, phone: string, emergPhone: string, emergContact: string, newsletter: boolean, waivered: boolean, privacyLevel: number, accessLevel: number, bio?: string | null, uuid: string, id: number, name: string, email: string, avatar?: string | null, title?: { __typename?: 'Title', uuid: string, title: string } | null } | null };

export type UsersSearchQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type UsersSearchQuery = { __typename?: 'Query', usersSearch: Array<{ __typename?: 'User', uuid: string, id: number, name: string, email: string, avatar?: string | null, title?: { __typename?: 'Title', uuid: string, title: string } | null }> };

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
  name
  email
  avatar
  title {
    uuid
    title
  }
}
    `;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    errors {
      ...BaseError
    }
    user {
      ...BaseUser
      phone
      emergContact
      emergPhone
      accessLevel
      accessLevel
    }
  }
}
    ${BaseErrorFragmentDoc}
${BaseUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($email: String!, $name: String!, $password: String!, $privacyLevel: Int!, $newsletter: Boolean!, $waivered: Boolean!, $emergContact: String!, $emergPhone: String!, $phone: String!) {
  createUser(
    privacyLevel: $privacyLevel
    newsletter: $newsletter
    waivered: $waivered
    emergContact: $emergContact
    emergPhone: $emergPhone
    phone: $phone
    password: $password
    name: $name
    email: $email
  ) {
    errors {
      ...BaseError
    }
    user {
      ...BaseUser
      phone
      emergContact
      emergPhone
      accessLevel
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
      phone
      emergContact
      emergPhone
      accessLevel
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
export const RfidLoginDocument = gql`
    mutation RfidLogin($rfid: String!, $durationSeconds: Int) {
  rfidLogin(rfid: $rfid, durationSeconds: $durationSeconds)
}
    `;

export function useRfidLoginMutation() {
  return Urql.useMutation<RfidLoginMutation, RfidLoginMutationVariables>(RfidLoginDocument);
};
export const RfidLogoutDocument = gql`
    mutation RfidLogout($uuid: String!) {
  rfidLogout(uuid: $uuid)
}
    `;

export function useRfidLogoutMutation() {
  return Urql.useMutation<RfidLogoutMutation, RfidLogoutMutationVariables>(RfidLogoutDocument);
};
export const RemoveFromClassDocument = gql`
    mutation RemoveFromClass($classUuid: String!, $userUuid: String!) {
  removeFromClass(classUuid: $classUuid, userUuid: $userUuid) {
    errors {
      ...BaseError
    }
    calendarClass {
      uuid
    }
  }
}
    ${BaseErrorFragmentDoc}`;

export function useRemoveFromClassMutation() {
  return Urql.useMutation<RemoveFromClassMutation, RemoveFromClassMutationVariables>(RemoveFromClassDocument);
};
export const AddToClassDocument = gql`
    mutation AddToClass($classUuid: String!) {
  addToClass(classUuid: $classUuid) {
    errors {
      ...BaseError
    }
    calendarClass {
      uuid
    }
  }
}
    ${BaseErrorFragmentDoc}`;

export function useAddToClassMutation() {
  return Urql.useMutation<AddToClassMutation, AddToClassMutationVariables>(AddToClassDocument);
};
export const CreateMembershipDocument = gql`
    mutation CreateMembership($cost: Float!, $days: Int!, $type: String!) {
  createMembership(cost: $cost, days: $days, type: $type) {
    membership {
      uuid
      days
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateMembershipMutation() {
  return Urql.useMutation<CreateMembershipMutation, CreateMembershipMutationVariables>(CreateMembershipDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...BaseUser
    phone
    emergContact
    emergPhone
    accessLevel
  }
}
    ${BaseUserFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const RfidsDocument = gql`
    query Rfids {
  rfids
}
    `;

export function useRfidsQuery(options?: Omit<Urql.UseQueryArgs<RfidsQueryVariables>, 'query'>) {
  return Urql.useQuery<RfidsQuery, RfidsQueryVariables>({ query: RfidsDocument, ...options });
};
export const CertificationsDocument = gql`
    query Certifications {
  certifications {
    uuid
    title
    image
    description
  }
}
    `;

export function useCertificationsQuery(options?: Omit<Urql.UseQueryArgs<CertificationsQueryVariables>, 'query'>) {
  return Urql.useQuery<CertificationsQuery, CertificationsQueryVariables>({ query: CertificationsDocument, ...options });
};
export const ClassTemplatesDocument = gql`
    query ClassTemplates {
  classTemplates {
    uuid
    createdAt
    updatedAt
    title
    description
    image
  }
}
    `;

export function useClassTemplatesQuery(options?: Omit<Urql.UseQueryArgs<ClassTemplatesQueryVariables>, 'query'>) {
  return Urql.useQuery<ClassTemplatesQuery, ClassTemplatesQueryVariables>({ query: ClassTemplatesDocument, ...options });
};
export const ClassTemplateDocument = gql`
    query ClassTemplate($uuid: String!) {
  classTemplate(uuid: $uuid) {
    description
    image
    title
    uuid
  }
}
    `;

export function useClassTemplateQuery(options: Omit<Urql.UseQueryArgs<ClassTemplateQueryVariables>, 'query'>) {
  return Urql.useQuery<ClassTemplateQuery, ClassTemplateQueryVariables>({ query: ClassTemplateDocument, ...options });
};
export const EventTemplatesDocument = gql`
    query EventTemplates {
  eventTemplates {
    uuid
    createdAt
    updatedAt
    title
    description
    image
  }
}
    `;

export function useEventTemplatesQuery(options?: Omit<Urql.UseQueryArgs<EventTemplatesQueryVariables>, 'query'>) {
  return Urql.useQuery<EventTemplatesQuery, EventTemplatesQueryVariables>({ query: EventTemplatesDocument, ...options });
};
export const EventTemplateDocument = gql`
    query EventTemplate($uuid: String!) {
  eventTemplate(uuid: $uuid) {
    description
    image
    title
    uuid
  }
}
    `;

export function useEventTemplateQuery(options: Omit<Urql.UseQueryArgs<EventTemplateQueryVariables>, 'query'>) {
  return Urql.useQuery<EventTemplateQuery, EventTemplateQueryVariables>({ query: EventTemplateDocument, ...options });
};
export const CalendarClassesDocument = gql`
    query CalendarClasses {
  calendarClasses {
    grantsCert {
      uuid
    }
    duration
    lastDate
    dates
    createdAt
    instructor {
      uuid
      name
    }
    cost
    maxParticipants
    memberCost
    uuid
    note
    classTemplate {
      description
      image
      title
      uuid
    }
    participants {
      uuid
    }
  }
}
    `;

export function useCalendarClassesQuery(options?: Omit<Urql.UseQueryArgs<CalendarClassesQueryVariables>, 'query'>) {
  return Urql.useQuery<CalendarClassesQuery, CalendarClassesQueryVariables>({ query: CalendarClassesDocument, ...options });
};
export const CalendarEventsDocument = gql`
    query CalendarEvents {
  calendarEvents {
    duration
    date
    createdAt
    cost
    memberCost
    uuid
    note
    eventTemplate {
      description
      image
      title
      uuid
    }
  }
}
    `;

export function useCalendarEventsQuery(options?: Omit<Urql.UseQueryArgs<CalendarEventsQueryVariables>, 'query'>) {
  return Urql.useQuery<CalendarEventsQuery, CalendarEventsQueryVariables>({ query: CalendarEventsDocument, ...options });
};
export const CalendarClassDocument = gql`
    query CalendarClass($uuid: String!) {
  calendarClass(uuid: $uuid) {
    uuid
    createdAt
    updatedAt
    maxParticipants
    cost
    memberCost
    dates
    lastDate
    duration
    note
    grantsCert {
      description
      image
      title
      uuid
    }
    classTemplate {
      uuid
      title
      image
      description
    }
    instructor {
      ...BaseUser
    }
    participants {
      ...BaseUser
      waivered
      emergPhone
      emergContact
      phone
    }
  }
}
    ${BaseUserFragmentDoc}`;

export function useCalendarClassQuery(options: Omit<Urql.UseQueryArgs<CalendarClassQueryVariables>, 'query'>) {
  return Urql.useQuery<CalendarClassQuery, CalendarClassQueryVariables>({ query: CalendarClassDocument, ...options });
};
export const MembershipDocument = gql`
    query membership($userUuid: String) {
  membership(userUuid: $userUuid) {
    status
    expirationDate
  }
}
    `;

export function useMembershipQuery(options?: Omit<Urql.UseQueryArgs<MembershipQueryVariables>, 'query'>) {
  return Urql.useQuery<MembershipQuery, MembershipQueryVariables>({ query: MembershipDocument, ...options });
};
export const PostsDocument = gql`
    query Posts($limit: Int, $category: Int, $cursor: DateTime) {
  posts(limit: $limit, category: $category, cursor: $cursor) {
    uuid
    createdAt
    category
    title
    content
    author {
      ...BaseUser
    }
  }
}
    ${BaseUserFragmentDoc}`;

export function usePostsQuery(options?: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'>) {
  return Urql.useQuery<PostsQuery, PostsQueryVariables>({ query: PostsDocument, ...options });
};
export const UsersDocument = gql`
    query Users($limit: Int) {
  users(limit: $limit) {
    ...BaseUser
    phone
    emergContact
    newsletter
    privacyLevel
    accessLevel
    bio
    posts {
      uuid
    }
  }
}
    ${BaseUserFragmentDoc}`;

export function useUsersQuery(options?: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'>) {
  return Urql.useQuery<UsersQuery, UsersQueryVariables>({ query: UsersDocument, ...options });
};
export const UserDocument = gql`
    query User($uuid: String!) {
  user(uuid: $uuid) {
    ...BaseUser
    createdAt
    rfid
    phone
    emergPhone
    emergContact
    newsletter
    waivered
    privacyLevel
    accessLevel
    bio
  }
}
    ${BaseUserFragmentDoc}`;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>) {
  return Urql.useQuery<UserQuery, UserQueryVariables>({ query: UserDocument, ...options });
};
export const UsersSearchDocument = gql`
    query UsersSearch($search: String!) {
  usersSearch(search: $search) {
    ...BaseUser
  }
}
    ${BaseUserFragmentDoc}`;

export function useUsersSearchQuery(options: Omit<Urql.UseQueryArgs<UsersSearchQueryVariables>, 'query'>) {
  return Urql.useQuery<UsersSearchQuery, UsersSearchQueryVariables>({ query: UsersSearchDocument, ...options });
};