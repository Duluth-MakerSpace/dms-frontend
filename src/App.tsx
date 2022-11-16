import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { cacheExchange } from '@urql/exchange-graphcache';
import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import { BACKEND_URL } from './constants/makerspace';
import { LoginMutation, LogoutMutation, MeDocument, MeQuery } from './graphql/graphql';
import MainLayout from './layouts/MainLayout';
import AdminClasses from './pages/AdminClasses';
import AdminCreateClass from './pages/AdminCreateClass';
import AdminCreateEvent from './pages/AdminCreateEvent';
import AdminEvents from './pages/AdminEvents';
import Badges from './pages/Badges';
import Class from './pages/Class';
import Classes from './pages/Classes';
import ForgotPassword from './pages/ForgotPassword';
// import ForgotPassword from './pages/ForgotPassword';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import RFIDs from './pages/RFIDs';
import Settings from './pages/Settings';
import User from './pages/User';
import Users from './pages/Users';
import { betterUpdateQuery } from './utils/betterUpdateQuery';

const theme: MantineThemeOverride = {
  colors: {
    bg: ["#f8f9fa"], // f7fafc
    bgDark: ["#aabbcc"],
    dmsRed: [
      "#FFF5F5",
      "#FFE3E3",
      "#FFC9C9",
      "#FFA8A8",
      "#FF8787",
      "#FF6B6B",
      "#FA5252", // FA5252, ED202C
      "#F03E3E",
      "#E03131",
      "#C92A2A",
    ],
  },
  primaryColor: "dmsRed",
  primaryShade: 6,
  headings: {
    fontFamily: 'Rubik',
    fontWeight: 600
  },
  globalStyles: (theme) => ({
    body: {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.bgDark : theme.colors.bg,
    },
  }),
}


export default function App() {
  const client = createClient({
    url: `${BACKEND_URL}/graphql`,
    fetchOptions: {
      credentials: "include"
    },
    exchanges: [dedupExchange, cacheExchange({
      keys: {
        Post: post => post.uuid as string,
        User: user => user.uuid as string,
        Certification: cert => cert.uuid as string,
        ClassTemplate: ct => ct.uuid as string
      },
      updates: {
        Mutation: {
          logout: (_result, _args, cache, _info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },

          login: (_result, _args, cache, _info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return { me: result.login.user };
                }
              }
            );
          },

          // TODO update after register

        }
      }
    }), fetchExchange],
  });

  return (
    <Provider value={client}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <Suspense fallback={<MainLayout />}>
          <Router>
            <Routes>
              <Route path={'/'} element={<HomePage />} />
              <Route path={'/login'} element={<Login />} />
              <Route path={'/register'} element={<Register />} />
              <Route path={'/reset-password/'} element={<ForgotPassword />} />
              <Route path={'/reset-password/:token'} element={<ResetPassword />} />
              <Route path={'/users'} element={<Users />} />
              <Route path={'/users/:uuid'} element={<User />} />
              <Route path={'/badges'} element={<Badges />} />
              <Route path={'/rfid'} element={<RFIDs />} />
              <Route path={'/classes'} element={<Classes />} />
              <Route path={'/classes/:title/:uuid'} element={<Class />} />
              <Route path={'/settings/:uuid'} element={<Settings />} />
              <Route path={'/admin/classes'} element={<AdminClasses />} />
              <Route path={'/admin/classes/create/:templateId'} element={<AdminCreateClass />} />
              <Route path={'/admin/events'} element={<AdminEvents />} />
              <Route path={'/admin/events/create/:templateId'} element={<AdminCreateEvent />} />
            </Routes>
          </Router>
        </Suspense>
      </MantineProvider>
    </Provider>
  );
}