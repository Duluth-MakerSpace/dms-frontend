import { Anchor, Avatar, Center, Container, Group, Loader, SimpleGrid, Text, Title } from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import { IconPhotoPlus } from "@tabler/icons";
import { User, UsersQuery, useUsersQuery } from '../graphql/graphql';
import MainLayout from "../layouts/MainLayout";


// const useStyles = createStyles((theme, _params, getRef) => ({
//   icon: {
//     color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
//   },
// }));

function renderUsers(users: UsersQuery) {
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
            {u.title?.title || "Maker"}
          </Text>
        </Group>

        <Text size="lg" weight={500}>
          <Anchor href={`/users/${u.uuid}`}>{u.name}</Anchor>
        </Text>

        <Group noWrap spacing={10} mt={3}>
          <Group noWrap spacing={5} mt={3}>
            <IconPhotoPlus stroke={1.5} size={16} color="gray" />
            <Text size="xs" color="dimmed">
              {u.posts.length}
            </Text>
            <Text size="xs" color="dimmed">
              {u.email}
            </Text>
          </Group>
        </Group>
      </div>
    </Group >
  ));
}

const Users = (): JSX.Element => {
  const [{ fetching: fetchingUsers, data: users }] = useUsersQuery();
  // const { classes, cx } = useStyles();
  const [layoutRef] = useResizeObserver();


  return (
    <MainLayout layoutRef={layoutRef}>
      <Container size="xl" mb="lg" mt={60}>
        <Title mb='xl'>MakerSpace directory</Title>

        <SimpleGrid cols={3}>
          {fetchingUsers
            ? (<Container p='lg'><Center><Loader size='xl' /></Center></Container>)
            : (users.users ? renderUsers(users) : null)
          }
        </SimpleGrid>

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
