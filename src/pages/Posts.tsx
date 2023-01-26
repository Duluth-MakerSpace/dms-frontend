import { Anchor, Avatar, Center, Container, Group, Loader, SimpleGrid, Text, Title } from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import { IconClock, IconUsers } from "@tabler/icons";
import UserWithAvatar from "../components/UserWithAvatar";
import { Post, PostsQuery, usePostsQuery } from '../graphql/graphql';
import MainLayout from "../layouts/MainLayout";


// const useStyles = createStyles((theme, _params, getRef) => ({
//   icon: {
//     color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
//   },
// }));

function renderPosts(posts: PostsQuery) {

  return posts.posts.map((p: Post) => (
    <Group key={p.uuid} noWrap align='top' p={'sm'}>
      <div>
        <Text size="lg" weight={500}>
          <Anchor href={`/posts/${p.uuid}`}>{p.title}</Anchor>
        </Text>

        <UserWithAvatar user={p.author} nameFirst />

        <Text size="sm" color="dimmed" lineClamp={2}>
          {p.content}
        </Text>
      </div>
    </Group >
  ));
}

const Posts = (): JSX.Element => {
  const [{ fetching: fetchingPosts, data: posts }] = usePostsQuery();
  // const { classes, cx } = useStyles();
  const [layoutRef] = useResizeObserver();


  return (
    <MainLayout layoutRef={layoutRef}>
      <Container size="xl" mb="lg" pt={60}>
        <Title mb='xl'>Recent projects</Title>

        <SimpleGrid cols={3}>
          {fetchingPosts
            ? (<Container p='lg'><Center><Loader size='xl' /></Center></Container>)
            : (posts?.posts ? renderPosts(posts) : null)
          }
        </SimpleGrid>
      </Container>
    </MainLayout>
  );
};

export default Posts;
