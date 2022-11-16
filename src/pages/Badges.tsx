import { Avatar, Center, Container, Group, Loader, SimpleGrid, Text, Title } from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import { IconAt, IconPhoneCall } from "@tabler/icons";
import { Certification, CertificationsQuery, useCertificationsQuery, User } from '../graphql/graphql';
import MainLayout from "../layouts/MainLayout";


// const useStyles = createStyles((theme, _params, getRef) => ({
//   icon: {
//     color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
//   },
// }));

function renderBadgeGrid(badges: CertificationsQuery) {
  // human, identicon, initials, bottts, avataaars, jdenticon, gridy or micah
  // const avatar = "avataaars";
  const avatar = "croodles";
  const rows = badges.certifications.map((c: Certification) => (

    <Group key={c.uuid} noWrap p={'sm'}>
      <Avatar
        radius={100}
        src={`/img/badges/${c.image}.png`}
        size={86}
      />
      <div>
        <Group noWrap spacing={2}>
          <Text weight={700} >
            {c.title} ({c.uuid})
          </Text>
        </Group>

        <Text weight={500} color="dimmed">
          {c.description}
        </Text>

      </div >
    </Group >
  ));

  return (
    <SimpleGrid cols={2}>
      {rows}
    </SimpleGrid>
  )
}

const Badges = (): JSX.Element => {
  const [{ fetching: fetchingBadges, data: badges }] = useCertificationsQuery();
  // const { classes, cx } = useStyles();
  const [layoutRef] = useResizeObserver();


  return (
    <MainLayout layoutRef={layoutRef}>
      <Container size="xl" mb="lg">
        <Title mb='xl'>All badges</Title>
        {fetchingBadges
          ? (<Container p='lg'><Center><Loader size='xl' /></Center></Container>)
          : (badges.certifications ? renderBadgeGrid(badges) : null)
        }
      </Container>
    </MainLayout>
  );
};

export default Badges;
