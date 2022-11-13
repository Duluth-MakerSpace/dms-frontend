import { Avatar, Center, Container, Group, Loader, Text, Title } from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import { IconAt, IconPhoneCall } from "@tabler/icons";
import { User, UsersQuery, useUsersQuery } from '../graphql/graphql';
import MainLayout from "../layouts/MainLayout";


// const useStyles = createStyles((theme, _params, getRef) => ({
//   icon: {
//     color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
//   },
// }));

function rows(users: UsersQuery) {
  // human, identicon, initials, bottts, avataaars, jdenticon, gridy or micah
  // const avatar = "avataaars";
  const avatar = "croodles";
  return users.users.map((u: User) => (

    <Group key={u.uuid} noWrap p={'sm'}>
      <Avatar
        radius={100}
        src={`https://avatars.dicebear.com/api/${avatar}/${u.email}.svg?background=%23ffffff`}
        size={86}
        sx={{ border: `1px solid #dededf` }} />
      <div>
        <Group noWrap spacing={2}>
          <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
            {u.title ? u.title : "Maker"}
          </Text>
        </Group>

        <Text size="lg" weight={500}>
          {u.username} {u.name && `(${u.name})`}
        </Text>

        <Group noWrap spacing={10} mt={3}>
          <Group noWrap spacing={5} mt={3}>
            <IconAt stroke={1.5} size={16} />
            <Text size="xs" color="dimmed">
              {u.email}
            </Text>
          </Group>

          <Group noWrap spacing={5} mt={5}>
            <IconPhoneCall stroke={1.5} size={16} />
            <Text size="xs" color="dimmed">
              {u.phone}
            </Text>
          </Group>
        </Group>
      </div>
    </Group>
  ));
}

const Users = (): JSX.Element => {
  const [{ fetching: fetchingUsers, data: users }] = useUsersQuery();
  // const { classes, cx } = useStyles();
  const [layoutRef] = useResizeObserver();


  return (
    <MainLayout layoutRef={layoutRef}>

      <Container size="xl" mb="lg" pt='xl'>
        <Title mb='xl'>User directory</Title>
        {fetchingUsers
          ? (<Container p='lg'><Center><Loader size='xl' /></Center></Container>)
          : (users.users ? rows(users) : null)
        }

        {/* {!users
          ? null
          : users?.users.map((u) => (
            <Box key={u.uuid}>
              {u.email}
            </Box>)
          )} */}

      </Container>
    </MainLayout>
  );
};

export default Users;
