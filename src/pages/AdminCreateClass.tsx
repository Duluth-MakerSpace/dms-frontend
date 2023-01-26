import { Autocomplete, Avatar, Badge, Box, Button, Card, Center, Container, createStyles, Group, Image, Loader, NumberInput, Select, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDebouncedValue, useResizeObserver } from "@mantine/hooks";
import { IconCalendar, IconClock, IconPigMoney, IconUsers } from "@tabler/icons";
import dayjs from "dayjs";
import { useState } from "react";
import { useParams } from 'react-router-dom';
import { LONG_DAY_DATE_TIME } from "../constants/dateFormats";
// import { useState } from "react";
import { useCertificationsQuery, useClassTemplateQuery, useUsersSearchQuery } from '../graphql/graphql';
import MainLayout from "../layouts/MainLayout";
import { combineDateTime } from "../utils/dateTimeUtils";
import { formatDuration } from "../utils/stringUtils";
import { useIsAuth } from "../utils/useIsAuth";


const useStyles = createStyles((theme, _params, getRef) => ({
  outside: {
    opacity: '0.5'
  },
  weekend: {
  },
  cell: {
    padding: '0px'
  },
  day: {
    color: `${theme.colors.gray[8]} !important`,
    borderRadius: '100%',
  },
  selected: {
    color: `${theme.colors.gray[0]} !important`,
    border: `0px`,
    borderRadius: '100%',
    '&:hover': {
      backgroundColor: theme.colors.red[6]
    }
  },
  event: {
    border: `2px solid ${theme.colors.red[2]}`,

    '&:hover': {
      backgroundColor: theme.colors.red[1]
    }
  },


  controls: {
    ref: getRef('controls'),
    transition: 'opacity 150ms ease',
    opacity: 0,
  },

  root: {
    '&:hover': {
      [`& .${getRef('controls')}`]: {
        opacity: 1,
      },
    },
  },



  //
  card: {
    position: 'relative',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  eventType: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    pointerEvents: 'none',
    boxShadow: `0 0 4px rgba(0, 0, 0, .5)`
  },

  title: {
    display: 'block',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs / 2,
  },

  action: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    }),
  },

  footer: {
    marginTop: theme.spacing.md,
  },


  section: {
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },


}));

const AdminCreateClass = (): JSX.Element => {
  useIsAuth();
  const { templateId: templateId } = useParams();
  const [{ fetching: fetchingClassTemplate, data: classTemplate }] = useClassTemplateQuery({ variables: { uuid: templateId } });
  const [{ fetching: fetchingBadges, data: badges }] = useCertificationsQuery();


  const [calendarDates, setCalendarDates] = useState<Date[]>([]);

  const [instructorSearch, setInstructorSearch] = useState('');
  const [debouncedInstructorSearch] = useDebouncedValue(instructorSearch, 350);
  const [{ fetching: fetchingInstructorSearchResults, data: instructorSearchResults }] = useUsersSearchQuery({ variables: { search: debouncedInstructorSearch } });

  const { classes, cx } = useStyles();
  const [layoutRef] = useResizeObserver();

  const creatingClass = false;

  // TODO: navigate('/admin/classes') if class template is not found.

  const [timeSet, onTimeSet] = useState<Date | null>();
  const form = useForm({
    initialValues: {
      instructor: '',
      maxParticipants: 10,
      memberCost: 10.00,
      cost: 15.00,
      grants_cert: null,
      duration: 120,
      calendarDates: null,
      startTime: null,
    },
    validate: (values) => {
      return {
        // email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
      };
    },

  });

  return (
    <MainLayout layoutRef={layoutRef}>
      <Container size="xl" mb="lg" pt='xl'>
        <Title mb='xl'>Schedule a class</Title>

        {fetchingClassTemplate
          ? (<Container p='lg'><Center><Loader size='xl' /></Center></Container>)
          : (classTemplate.classTemplate
            ? (

              <SimpleGrid cols={2}>
                <Box p={'md'}>

                  <form onSubmit={form.onSubmit(
                    async (values) => {
                      console.log('submitttt')
                      // const response = await login({ email: values.email, password: values.password });
                      // if (response.data?.login.errors) {
                      //   form.setErrors(toErrorMap(response.data.login.errors));
                      // } else if (response.data?.login.user) {
                      //   navigate("/")
                      // }
                    },
                    (validationErrors) => {
                      form.setErrors(validationErrors);
                    }
                  )}>
                    <SimpleGrid cols={2}>
                      <Autocomplete
                        label="Instructor"
                        placeholder="Search here"
                        // {...form.getInputProps('instructor')}
                        onChange={setInstructorSearch}
                        data={
                          fetchingInstructorSearchResults && !instructorSearchResults
                            ? ["Searching..."]
                            : (instructorSearchResults.usersSearch.map((u) => { return { key: u.uuid, value: u.name } }))
                        }
                      />
                      <NumberInput
                        defaultValue={8}
                        placeholder="Max participants"
                        label="Max participants"
                        {...form.getInputProps('maxParticipants')}
                      />
                      <NumberInput
                        defaultValue={10}
                        placeholder="Enter total cost"
                        label="Member cost ($)"
                        precision={2}
                        step={0.5}
                        {...form.getInputProps('memberCost')}
                      />
                      <NumberInput
                        defaultValue={5}
                        placeholder="Enter total cost"
                        label="Non-member cost ($)"
                        precision={2}
                        step={0.5}
                        {...form.getInputProps('cost')}
                      />
                      <Select label="Grants certification" disabled={fetchingBadges} data={
                        fetchingBadges
                          ? [{ value: '', label: 'Loading...' }]
                          : badges.certifications.map((c) => { return { value: c.uuid, label: c.title } })
                      }
                        {...form.getInputProps('grants_cert')}
                      />
                      <NumberInput
                        defaultValue={120}
                        placeholder="Duration (minutes)"
                        label="Duration of each class (minutes)"
                        precision={0}
                        step={15}
                        {...form.getInputProps('duration')}
                      />
                      <DatePicker
                        placeholder="Pick date"
                        label="Event date"
                        firstDayOfWeek="sunday"
                        {...form.getInputProps('calendarDates')}
                        icon={<IconCalendar size={16} />}
                      />
                      <TimeInput
                        label="Pick time"
                        format="12"
                        // onChange={() => { console.log('change') }}
                        onChange={onTimeSet}

                        icon={<IconClock size={16} />}
                      />

                    </SimpleGrid>

                    <Button type="submit" mt="xl" loading={creatingClass}>
                      Schedule class
                    </Button>
                  </form>

                </Box>
                <Card shadow={'lg'} withBorder radius={'md'} p={0}>
                  <Card.Section>
                    <Image src={classTemplate.classTemplate.image} height={200} width={'100%'} />
                  </Card.Section>

                  <Card.Section p={'md'}>
                    <Text size={'lg'} weight={700}>{classTemplate.classTemplate.title}</Text>
                    <Group position="apart" mt={'sm'}>
                      <Group spacing={'xs'}>
                        {/* <UserWithAvatar user={} /> */}
                        <Avatar size={26} variant='filled' radius='xl' color='red' />
                        <Text color={!form.values.instructor && "dimmed"}>
                          {instructorSearch ? instructorSearch : "x an instructor"}
                        </Text>
                      </Group>
                      {form.values.grants_cert &&
                        <Badge color='gray' variant="outline">{form.values.grants_cert}</Badge>
                      }
                    </Group>
                    <Text color='dimmed' mt={'sm'}>{classTemplate.classTemplate.description}</Text>
                  </Card.Section>

                  <Card.Section px={'md'} pb={'md'}>
                    <Group position="apart">
                      <Group px={'md'}>
                        <IconUsers size={26} stroke={1} />
                        <Stack spacing={0}>
                          <Text ml={4}>0/{form.values.maxParticipants} participants</Text>
                          <Text ml={4}>...</Text>
                        </Stack>
                      </Group>
                      <Group px={'md'}>
                        <IconPigMoney size={26} stroke={1} />
                        <Stack spacing={0}>
                          <Text ml={4}>${form.values.memberCost} (members)</Text>
                          <Text color='dimmed' ml={4}>${form.values.cost} (non-members)</Text>
                        </Stack>
                      </Group>
                      <Group px={'md'}>
                        <IconClock size={26} stroke={1} />
                        <Stack spacing={0}>
                          <Text ml={4}>{formatDuration(form.values.duration)}</Text>
                          <Text ml={4}>Time here</Text>
                        </Stack>
                      </Group>
                      <Group px={'md'}>
                        <IconCalendar size={26} stroke={1} />
                        <Stack spacing={0}>
                          <Text ml={4}>
                            {form.values.calendarDates
                              && timeSet
                              && dayjs(combineDateTime(form.values.calendarDates, timeSet)).format(LONG_DAY_DATE_TIME)}</Text>
                          {/* <Text ml={4}>{timeSet?.toString()}</Text> */}
                        </Stack>
                      </Group>
                    </Group>
                  </Card.Section>
                </Card>
              </SimpleGrid>

            ) :
            "Error: invalid class template. Go back and try again"
          )
        }

      </Container>

    </MainLayout >
  );
};

export default AdminCreateClass;
