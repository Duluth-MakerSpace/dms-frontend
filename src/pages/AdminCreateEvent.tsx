import {
  Box, Center, Container, Text,
  createStyles, Image, Loader, Paper, SimpleGrid, Title, Card, Anchor, Button, Checkbox, Group, PasswordInput, TextInput, NumberInput, Autocomplete, Select, Badge, Avatar, Stack
} from "@mantine/core";
import { Calendar, DatePicker, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDebouncedValue, useResizeObserver } from "@mantine/hooks";
import { IconCalendar, IconClock, IconPigMoney, IconUsers } from "@tabler/icons";
import { useState } from "react";
import { useParams } from 'react-router-dom';
// import { useState } from "react";
import { useCertificationsQuery, useEventTemplateQuery, useUsersSearchQuery } from '../graphql/graphql';
import MainLayout from "../layouts/MainLayout";
import { combineDateTime } from "../utils/dateTimeUtils";
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

const AdminCreateEvent = (): JSX.Element => {
  useIsAuth();
  const { templateId: templateId } = useParams();
  const [{ fetching: fetchingTemplate, data: template }] = useEventTemplateQuery({ variables: { uuid: templateId } });
  // const [{ fetching: fetchingUsers, data: users }] = useUsersQuery();
  const [{ fetching: fetchingBadges, data: badges }] = useCertificationsQuery();


  const [calendarDates, setCalendarDates] = useState<Date[]>([]);

  const { classes, cx } = useStyles();
  const [layoutRef] = useResizeObserver();

  const creatingClass = false;

  // TODO: navigate('/admin/classes') if class template is not found.

  const [timeSet, onTimeSet] = useState<Date | null>();
  const form = useForm({
    initialValues: {
      memberCost: null,
      cost: null,
      duration: null,
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
        <Title mb='xl'>Schedule an event</Title>

        {fetchingTemplate
          ? (<Container p='lg'><Center><Loader size='xl' /></Center></Container>)
          : (template.eventTemplate
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
                      <NumberInput
                        placeholder="Enter total cost"
                        label="Member cost ($)"
                        precision={2}
                        step={0.5}
                        {...form.getInputProps('memberCost')}
                      />
                      <NumberInput
                        placeholder="Enter total cost"
                        label="Non-member cost ($)"
                        precision={2}
                        step={0.5}
                        {...form.getInputProps('cost')}
                      />
                      <NumberInput
                        placeholder="Duration (minutes)"
                        label="Duration (minutes)"
                        precision={0}
                        step={15}
                        {...form.getInputProps('duration')}
                      />
                      <DatePicker
                        placeholder="Pick date"
                        label="Event date"
                        multiple
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
                    {/* <Calendar
                      {...form.getInputProps('calendarDates')}
                      multiple
                    // value={calendarDates}
                    // onChange={setCalendarDates}
                    /> */}

                    <Button type="submit" mt="xl" loading={creatingClass}>
                      Schedule class
                    </Button>
                  </form>

                </Box>
                <Card shadow={'lg'} withBorder radius={'md'} p={0}>
                  <Card.Section>
                    <Image src={template.eventTemplate.image} height={200} width={'100%'} />
                  </Card.Section>

                  <Card.Section p={'md'}>
                    <Text size={'lg'} weight={700}>{template.eventTemplate.title}</Text>
                    <Text color='dimmed' mt={'sm'}>{template.eventTemplate.description}</Text>
                  </Card.Section>

                  <Card.Section px={'md'} pb={'md'}>
                    <Group position="apart">
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
                          <Text ml={4}>{form.values.duration} minutes</Text>
                          <Text ml={4}>Time here</Text>
                        </Stack>
                      </Group>
                      <Group px={'md'}>
                        <IconCalendar size={26} stroke={1} />
                        <Stack spacing={0}>
                          <Text ml={4}>
                            {form.values.calendarDates
                              && timeSet
                              && combineDateTime(form.values.calendarDates, timeSet).toString()}</Text> and
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

export default AdminCreateEvent;
