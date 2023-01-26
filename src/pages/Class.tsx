import { ActionIcon, Button, Center, Container, Divider, Grid, Group, Image, Loader, ScrollArea, Table, Text, Title, Tooltip } from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import { IconAlertTriangle, IconCalendar, IconClock, IconCurrencyDollar, IconSchool, IconTrash, IconUrgent, IconUsers } from "@tabler/icons";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmergencyModal from "../components/EmergencyModal";
import UserWithAvatar from "../components/UserWithAvatar";
import { SHORT_DATE_AND_TIME } from "../constants/dateFormats";
import { useAddToClassMutation, useCalendarClassQuery, useMeQuery } from '../graphql/graphql';
import MainLayout from "../layouts/MainLayout";
import { alertNotification } from "../utils/alertNotification";
import { formatDollars, formatDuration, formatOpenSlots, formatPhone } from "../utils/stringUtils";


const Class = (): JSX.Element => {
  const navigate = useNavigate();
  const { title, uuid } = useParams();
  const [{ data: me }] = useMeQuery();

  const [{ fetching: fetchingCalendarClass, data: calendarClass }] = useCalendarClassQuery({ variables: { uuid: uuid } });
  const [layoutRef] = useResizeObserver();

  const [openEmergContact, setOpenEmergContact] = useState<string | null>();

  const [{ fetching: addingToClass }, addToClass] = useAddToClassMutation();
  const authorized = (me?.me?.uuid === calendarClass?.calendarClass?.instructor.uuid) || (me?.me?.accessLevel >= 3)

  const renderClass = useCallback(
    () => {
      if (fetchingCalendarClass) {
        return (<Center><Loader size='xl' /></Center>);
      }

      if (!calendarClass.calendarClass) {
        // Class not found.
        navigate('/classes');
      }

      return (<>
        <Title>{calendarClass.calendarClass.classTemplate.title}</Title>

        <Group my='lg' spacing='md'>
          {/* {me.me && */}
          <Button
            variant="filled"
            color="orange"
            loading={addingToClass}
            leftIcon={<IconSchool size={18} stroke={1.8} />}
            onClick={
              async () => {
                const { data, error } = await addToClass({ classUuid: calendarClass.calendarClass.uuid });
                if (error) {
                  alertNotification({ message: error.message });
                } else if (data?.addToClass.errors) {
                  alertNotification({ message: data?.addToClass.errors[0].message });
                  console.log("MAKE A POPUP:", data?.addToClass.errors);
                } else if (data?.addToClass.calendarClass) {
                  navigate(0);
                }
              }
            }
          >Sign up
          </Button>
          {/* } */}
          <Button variant='outline' leftIcon={<IconCalendar size={18} stroke={1.8} />}>View calendar</Button>
        </Group>

        <Grid gutter={60}>
          <Grid.Col span={8}>
            <Image radius='md' src={calendarClass.calendarClass.classTemplate.image} height={250} withPlaceholder />

            <Text mt='md' size='md'>{calendarClass.calendarClass.classTemplate.description}</Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Group spacing={6}><IconCalendar color='gray' size={16} stroke={1.5} /><Text weight={700}>Date & time</Text></Group>
            <Text ml={23}>{calendarClass.calendarClass.dates.map((d, idx) => { return <Text key={idx}>{dayjs(parseInt(d)).format(SHORT_DATE_AND_TIME)}</Text> })}</Text>

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

        {!authorized ? null : (
          <>
            <Divider my='xl' />
            <Title>Administration</Title>

            <Text weight={600} size='xl' my='lg'>Current participants ({calendarClass.calendarClass.participants.length}/{calendarClass.calendarClass.maxParticipants})</Text>
            <ScrollArea>
              <Table sx={{ minWidth: 800 }} verticalSpacing="xs" highlightOnHover>
                <thead >
                  <tr>
                    <th align='left'></th>
                    <th align='left'></th>
                    <th align='left'>Name</th>
                    <th align='left'>Email</th>
                    <th align='left'>Phone</th>
                    <th align='left'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {calendarClass.calendarClass.participants.length > 0 ? (
                    calendarClass.calendarClass.participants.map((p, index) =>
                      <tr key={p.uuid}>
                        <td>
                          {p.waivered ? null :
                            <Tooltip label={`This person has ${p.waivered ? "has" : "has NOT"} filled out a waiver`}>
                              <ActionIcon
                                variant='filled'
                                radius='xl'
                                disabled={p.waivered ? true : false}
                                color='orange'>
                                <IconAlertTriangle size={18} />
                              </ActionIcon>
                            </Tooltip>
                          }
                        </td>
                        <td>
                          <Text color='dimmed'>{index + 1}</Text>
                        </td>
                        <td>
                          <UserWithAvatar user={p} />

                        </td>
                        <td>
                          <Text>{p.email}</Text>
                        </td>
                        <td>
                          <Text>{formatPhone(p.phone)}</Text>
                        </td>
                        <td>
                          <Group spacing={8}>
                            <Tooltip label='Remove from class'>
                              <Button variant='filled' size='xs' leftIcon={<IconTrash size={18} />}>
                                Remove
                              </Button>
                            </Tooltip>

                            <EmergencyModal
                              p={p}
                              opened={p.uuid === openEmergContact}
                              onClose={() => setOpenEmergContact(null)} />
                            <Tooltip label='Show emergency contact info'>
                              <Button variant='filled' size='xs' leftIcon={<IconUrgent size={18} />} onClick={() => setOpenEmergContact(p.uuid)}>
                                Emergency
                              </Button>
                            </Tooltip>
                          </Group>
                        </td>
                      </tr>)
                  )
                    : (
                      <tr >
                        <td colSpan={6}>
                          <Text italic align="center">
                            Nothing to show (for now)!
                          </Text>
                        </td>
                      </tr>
                    )
                  }
                </tbody>

              </Table>
            </ScrollArea>
          </>
        )}
      </>)
    },
    [fetchingCalendarClass, calendarClass]
  )

  return (
    <MainLayout layoutRef={layoutRef}>
      <Container size="xl" mb="lg" pt={60}>
        {renderClass()}
      </Container>
    </MainLayout >
  );
};

export default Class;
