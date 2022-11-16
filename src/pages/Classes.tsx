import { Anchor, Avatar, Center, Container, Group, Loader, Text, Title } from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import { IconAt, IconClock, IconPhoneCall, IconUsers } from "@tabler/icons";
import { CalendarClass, CalendarClassesQuery, useCalendarClassesQuery, User } from '../graphql/graphql';
import MainLayout from "../layouts/MainLayout";


// const useStyles = createStyles((theme, _params, getRef) => ({
//   icon: {
//     color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
//   },
// }));

function renderClassList(classes: CalendarClassesQuery) {
  // human, identicon, initials, bottts, avataaars, jdenticon, gridy or micah
  // const avatar = "avataaars";
  const avatar = "croodles";
  return classes.calendarClasses.map((c: CalendarClass) => (

    <Group key={c.uuid} noWrap align='top' p={'sm'}>
      <Avatar
        src={c.classTemplate.image}
        size={200}
        radius='md'
      />
      <div>
        <Group noWrap spacing={2}>
          <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
            Taught by {c.instructor.name}
          </Text>
        </Group>

        <Text size="lg" weight={500}>
          <Anchor href={`/classes/${c.classTemplate.title}/${c.uuid}`}>{c.classTemplate.title}</Anchor>
        </Text>

        <Text size="sm" color="dimmed" lineClamp={2}>
          {c.classTemplate.description}
        </Text>

        <Group noWrap spacing={10} mt={3}>
          <Group noWrap spacing={5} mt={3}>
            <IconUsers stroke={1.5} size={16} />
            <Text size="xs" color="dimmed">
              {c.participants.length}/{c.maxParticipants}
            </Text>
          </Group>

          <Group noWrap spacing={5} mt={5}>
            <IconClock stroke={1.5} size={16} />
            <Text size="xs" color="dimmed">
              {c.duration} minutes
            </Text>
          </Group>
        </Group>
      </div>
    </Group >
  ));
}

const Classes = (): JSX.Element => {
  const [{ fetching: fetchingClasses, data: classes }] = useCalendarClassesQuery();
  // const { classes, cx } = useStyles();
  const [layoutRef] = useResizeObserver();


  return (
    <MainLayout layoutRef={layoutRef}>
      <Container size="xl" mb="lg">
        <Title mb='xl'>Upcoming classes</Title>
        {fetchingClasses
          ? (<Container p='lg'><Center><Loader size='xl' /></Center></Container>)
          : (classes.calendarClasses ? renderClassList(classes) : null)
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

export default Classes;
