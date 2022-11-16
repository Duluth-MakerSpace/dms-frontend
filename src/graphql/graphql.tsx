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

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  createCalendarClass: CalendarClassResponse;
  createCalendarEvent: CalendarEventResponse;
  createClassTemplate: ClassTemplateResponse;
  createEventTemplate: EventTemplateResponse;
  createPost: Post;
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
  rfidLogin: Scalars['Boolean'];
  rfidLogout: Scalars['Boolean'];
  updateClassTemplate?: Maybe<ClassTemplate>;
  updateEventTemplate?: Maybe<EventTemplate>;
  updatePost?: Maybe<Post>;
  updateUser?: Maybe<User>;
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


export type MutationCreatePostArgs = {
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


export type MutationRfidLoginArgs = {
  durationSeconds?: InputMaybe<Scalars['Int']>;
  rfid: Scalars['String'];
};


export type MutationRfidLogoutArgs = {
  rfid: Scalars['String'];
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
  post?: Maybe<Post>;
  posts: Array<Post>;
  rfids: Array<Scalars['String']>;
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


export type QueryPostArgs = {
  uuid: Scalars['String'];
};


export type QueryUserArgs = {
  uuid: Scalars['String'];
};


export type QueryUsersSearchArgs = {
  search: Scalars['String'];
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
  id: Scalars['Int'];
  name: Scalars['String'];
  newsletter: Scalars['Boolean'];
  phone: Scalars['String'];
  privacyLevel: Scalars['Int'];
  rfid?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
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

export type BaseUserFragment = { __typename?: 'User', uuid: string, id: number, name: string, email: string, avatar?: string | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', uuid: string, id: number, name: string, email: string, avatar?: string | null } | null } };

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


export type RegisterMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', uuid: string, id: number, name: string, email: string, avatar?: string | null } | null } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  password: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', uuid: string, id: number, name: string, email: string, avatar?: string | null } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RfidLoginMutationVariables = Exact<{
  rfid: Scalars['String'];
  durationSeconds?: InputMaybe<Scalars['Int']>;
}>;


export type RfidLoginMutation = { __typename?: 'Mutation', rfidLogin: boolean };

export type RfidLogoutMutationVariables = Exact<{
  rfid: Scalars['String'];
}>;


export type RfidLogoutMutation = { __typename?: 'Mutation', rfidLogout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', uuid: string, id: number, name: string, email: string, avatar?: string | null } | null };

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


export type CalendarClassQuery = { __typename?: 'Query', calendarClass?: { __typename?: 'CalendarClass', uuid: string, createdAt: string, updatedAt: string, maxParticipants: number, cost: number, memberCost: number, dates: Array<string>, lastDate: string, duration: number, note?: string | null, grantsCert?: { __typename?: 'Certification', description?: string | null, image?: string | null, title: string, uuid: string } | null, classTemplate: { __typename?: 'ClassTemplate', uuid: string, title: string, image?: string | null, description?: string | null }, instructor: { __typename?: 'User', uuid: string, id: number, name: string, email: string, avatar?: string | null }, participants: Array<{ __typename?: 'User', waivered: boolean, emergPhone: string, emergContact: string, phone: string, uuid: string, id: number, name: string, email: string, avatar?: string | null }> } | null };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', title: string, createdAt: string, updatedAt: string, uuid: string }> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', phone: string, emergContact: string, newsletter: boolean, privacyLevel: number, accessLevel: number, title?: string | null, bio?: string | null, uuid: string, id: number, name: string, email: string, avatar?: string | null }> };

export type UserQueryVariables = Exact<{
  uuid: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', uuid: string, id: number, createdAt: string, email: string, name: string, avatar?: string | null, rfid?: string | null, phone: string, emergPhone: string, emergContact: string, newsletter: boolean, waivered: boolean, privacyLevel: number, accessLevel: number, title?: string | null, bio?: string | null } | null };

export type UsersSearchQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type UsersSearchQuery = { __typename?: 'Query', usersSearch: Array<{ __typename?: 'User', uuid: string, id: number, name: string, email: string, avatar?: string | null }> };

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
export const RfidLoginDocument = gql`
    mutation RfidLogin($rfid: String!, $durationSeconds: Int) {
  rfidLogin(rfid: $rfid, durationSeconds: $durationSeconds)
}
    `;

export function useRfidLoginMutation() {
  return Urql.useMutation<RfidLoginMutation, RfidLoginMutationVariables>(RfidLoginDocument);
};
export const RfidLogoutDocument = gql`
    mutation RfidLogout($rfid: String!) {
  rfidLogout(rfid: $rfid)
}
    `;

export function useRfidLogoutMutation() {
  return Urql.useMutation<RfidLogoutMutation, RfidLogoutMutationVariables>(RfidLogoutDocument);
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
    phone
    emergContact
    newsletter
    privacyLevel
    accessLevel
    title
    bio
  }
}
    ${BaseUserFragmentDoc}`;

export function useUsersQuery(options?: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'>) {
  return Urql.useQuery<UsersQuery, UsersQueryVariables>({ query: UsersDocument, ...options });
};
export const UserDocument = gql`
    query User($uuid: String!) {
  user(uuid: $uuid) {
    uuid
    id
    createdAt
    email
    name
    avatar
    rfid
    phone
    emergPhone
    emergContact
    newsletter
    waivered
    privacyLevel
    accessLevel
    title
    bio
  }
}
    `;

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