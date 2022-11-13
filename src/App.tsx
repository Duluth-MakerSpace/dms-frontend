import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { cacheExchange } from '@urql/exchange-graphcache';
import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import { LoginMutation, LogoutMutation, MeDocument, MeQuery } from './graphql/graphql';
import MainLayout from './layouts/MainLayout';
import ForgotPassword from './pages/ForgotPassword';
// import ForgotPassword from './pages/ForgotPassword';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
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
      "#FA5252",
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
    url: 'http://localhost:4000/graphql',
    fetchOptions: {
      credentials: "include"
    },
    exchanges: [dedupExchange, cacheExchange({
      keys: {
        Post: post => post.uuid as string,
        User: user => user.uuid as string
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
              <Route path={`/`} element={<HomePage />} />
              <Route path={`/login`} element={<Login />} />
              <Route path={`/register`} element={<Register />} />
              <Route path={`/reset-password/`} element={<ForgotPassword />} />
              <Route path={`/reset-password/:token`} element={<ResetPassword />} />
              <Route path={`/users`} element={<Users />} />
              <Route path={`/users/:id`} element={<User />} />
              {/* <Route path={`/forgot-password`} element={<ForgotPassword />} /> */}
            </Routes>
          </Router>
        </Suspense>
      </MantineProvider>
    </Provider>
  );
}