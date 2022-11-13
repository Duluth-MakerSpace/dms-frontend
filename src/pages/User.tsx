import { Box, Center, Container, Loader, Title } from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import { useUsersQuery } from '../graphql/graphql';
import MainLayout from "../layouts/MainLayout";

// const useStyles = createStyles((theme, _params, getRef) => ({

// }));

const Users = (): JSX.Element => {
  const { id } = useParams();
  const [{ fetching: fetchingUser, data: users }] = useUsersQuery();
  // const { classes, cx } = useStyles();
  const [layoutRef] = useResizeObserver();

  console.log(id);
  console.log('hi');

  return (
    <MainLayout layoutRef={layoutRef}>

      <Container size="xl" mb="lg" pt='xl'>
        <Title mb='xl'>You are looking up User: {id}</Title>
        {fetchingUser
          ? (<Container p='lg'><Center><Loader size='xl' /></Center></Container>)
          : (users?.users.map((u) => (
            <Box key={u.uuid}>
              {u.email} and {id}
            </Box>)))
        }

      </Container>
    </MainLayout>
  );
};

export default Users;
