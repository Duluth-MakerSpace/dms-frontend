import { ActionIcon, Center, Container, Grid, createStyles, Divider, Group, Image, Loader, Paper, ScrollArea, SimpleGrid, Table, Text, Title, Tooltip, Button, Flex } from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import { IconAlertTriangle, IconCalendar, IconClock, IconCurrencyDollar, IconUrgent, IconUsers } from "@tabler/icons";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import UserWithAvatar from "../components/UserWithAvatar";
import { SHORT_DATE_AND_TIME } from "../constants/dateFormats";
import { useCalendarClassQuery } from '../graphql/graphql';
import MainLayout from "../layouts/MainLayout";
import { formatDollars, formatDuration, formatOpenSlots } from "../utils/stringUtils";

const useStyles = createStyles((theme, _params, getRef) => ({
  thead: {
    th: {
      paddingTop: '8px',
      paddingBottom: '8px',
    }
  },

  tr: {
    borderTop: `1px solid ${theme.colors.gray[3]}`,

    td: {
      paddingTop: '8px',
      paddingBottom: '8px',
    }
  }
}));

const Class = (): JSX.Element => {
  const navigate = useNavigate();
  const { title, uuid } = useParams();
  const [{ fetching: fetchingCalendarClass, data: calendarClass }] = useCalendarClassQuery({ variables: { uuid: uuid } });
  const { classes } = useStyles();
  const [layoutRef] = useResizeObserver();

  return (
    <MainLayout layoutRef={layoutRef}>
      <Container size="xl" mb="lg">
        {fetchingCalendarClass
          ? (< Center > <Loader size='xl' /></Center>)
          : !calendarClass.calendarClass ?
            `TODO. Class not found. ${title} ${uuid}`
            : (<>
              <Title>{calendarClass.calendarClass.classTemplate.title}</Title>

              <Group mt='md' spacing='md'>
                <Button variant='filled'>Sign up</Button>
                <Button variant='filled'>View calendar</Button>
              </Group>

              <Grid gutter={40}>
                <Grid.Col span={8}>
                  <Image mt='md' src={calendarClass.calendarClass.classTemplate.image} height={250} withPlaceholder />

                  <Text mt='md'>{calendarClass.calendarClass.classTemplate.description}</Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Group spacing={6}><IconCalendar color='gray' size={16} stroke={1.5} /><Text weight={700}>Date & time</Text></Group>
                  <Text ml={23}>{calendarClass.calendarClass.dates.map((d) => { return <Text>{dayjs(parseInt(d)).format(SHORT_DATE_AND_TIME)}</Text> })}</Text>

                  <Group spacing={6} mt='md'><IconClock color='gray' size={16} stroke={1.5} /><Text weight={700}>Duration</Text></Group>
                  <Text ml={23}>{formatDuration(calendarClass.calendarClass.duration)}</Text>

                  <Group spacing={6} mt='md'><IconClock color='gray' size={16} stroke={1.5} /><Text weight={700}>Instructor</Text></Group>
                  <Text ml={23}><UserWithAvatar user={calendarClass.calendarClass.instructor} nameFirst /></Text>

                  <Group spacing={6} mt='md'><IconCurrencyDollar color='gray' size={16} stroke={1.5} /><Text weight={700}>Cost</Text></Group>
                  <Text ml={23}>Members: {formatDollars(calendarClass.calendarClass.memberCost)}</Text>
                  <Text ml={23}>Non-members: {formatDollars(calendarClass.calendarClass.cost)}</Text>

                  <Group spacing={6} mt='md'><IconUsers color='gray' size={16} stroke={1.5} /><Text weight={700}>Participants</Text></Group>
                  <Text ml={23}>Max participants: {calendarClass.calendarClass.maxParticipants}</Text>
                  <Text ml={23} italic>{formatOpenSlots(calendarClass.calendarClass.participants.length, calendarClass.calendarClass.maxParticipants)}</Text>

                </Grid.Col>
              </Grid>


              <Divider my='xl' />
              <Title>Administration</Title>

              <Text weight={600} size='xl' my='lg'>Current participants</Text>
              <ScrollArea>
                <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
                  <thead className={classes.thead}>
                    <th align='left'></th>
                    <th align='left'>Name</th>
                    <th align='left'>Email</th>
                    <th align='left'>Phone</th>
                    <th align='left'>Actions</th>
                  </thead>
                  {calendarClass.calendarClass.participants.length > 0 ? (
                    calendarClass.calendarClass.participants.map((p, index) =>
                      <tr className={classes.tr} key={p.uuid}>
                        <td>
                          <Text color='dimmed' pl='sm'>{index + 1}</Text>
                        </td>
                        <td>
                          <UserWithAvatar user={p} />
                        </td>
                        <td>
                          <Text>{p.email}</Text>
                        </td>
                        <td>
                          <Text>{p.phone}</Text>
                        </td>
                        <td>
                          <Group spacing='sm'>
                            <Tooltip label='Show emergency contact info'>
                              <ActionIcon variant='filled' color='red'>
                                <IconUrgent size={18} />
                              </ActionIcon>
                            </Tooltip>
                            <Tooltip label={`This person has ${p.waivered ? "has" : "has NOT"} filled out a waiver`}>
                              <ActionIcon variant='filled' disabled={p.waivered ? true : false} color='orange'>
                                <IconAlertTriangle size={18} />
                              </ActionIcon>
                            </Tooltip>
                          </Group>
                        </td>
                      </tr>)
                  )
                    : (
                      <tr className={classes.tr}>
                        <td colSpan={5}>
                          <Text italic align="center">
                            Nothing to show (for now)!
                          </Text>
                        </td>
                      </tr>
                    )}

                </Table>
              </ScrollArea>
            </>)
        }

      </Container>
    </MainLayout >
  );
};

export default Class;
