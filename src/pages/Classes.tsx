import { Anchor, Center, Container, createStyles, Flex, Grid, Group, Loader, Paper, ScrollArea, Text, Title } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { useResizeObserver } from "@mantine/hooks";
import { IconCalendarEvent, IconSchool, IconUsers } from "@tabler/icons";
import dayjs from "dayjs";
import { useState } from "react";
import { SHORT_DD_ONLY, SHORT_M_ONLY } from "../constants/dateFormats";
import { CalendarClass, CalendarClassesQuery, useCalendarClassesQuery } from '../graphql/graphql';
import MainLayout from "../layouts/MainLayout";
import { formatOpenSlots } from "../utils/stringUtils";


const useStyles = createStyles((theme, _params, getRef) => ({

  day: {
    borderRadius: theme.radius.md,
    height: 60,
    fontSize: theme.fontSizes.lg,
    color: `${theme.colors.gray[8]} !important`,
  },
  event: {
    border: `2px solid ${theme.colors.red[2]}`,

    '&:hover': {
      backgroundColor: theme.colors.red[1]
    }
  },
  weekdayCell: {
    fontSize: theme.fontSizes.xl,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    padding: 10,
  },
  cell: {
    border: `6px solid transparent}`,
  },
  calendarHeader: { margin: 0, background: theme.colors.red[6] },
  calendarHeaderLevel: {
    color: 'white',
    fontWeight: 600,
  },
  calendarHeaderControl: {
    color: 'white',

    '&:hover': {
      background: 'transparent'
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

  weekend: {
  },
  outside: {
    color: `${theme.colors.gray[5]} !important`,
  },

  selected: {
    // color: `${theme.colors.gray[0]} !important`,
    backgroundColor: `${theme.colors.orange[0]} !important`,
    '&:hover': {
      backgroundColor: theme.colors.orange[0]
    }
  },

  ///// calendar icon
  calendarIcon: {
    width: '70px',
    backgroundColor: ' #ffffff',
    borderRadius: '7px',
    boxShadow: `0px 1px 2px 0px rgba(0, 0, 0, .2)`,
    overflow: 'clip',
    alignSelf: 'flex-start',
    marginTop: '4px'
  },

  calendarIconTop: {
    backgroundColor: theme.colors.red[6],
    padding: '3px 10px',
    minWidth: '60px',
    textTransform: 'uppercase',
    font: `500 14px/20px Arial, Helvetica, Geneva, sans-serif`,
    letterSpacing: `0.5px`,
    color: '#fff',
    textAlign: 'center',
  },
  calenderIconBottom: {
    padding: `16px 4px`,
    textAlign: 'center',
    font: '400 25px/10px "Helvetica Neue", Arial, Helvetica, Geneva, sans-serif',
  },


}));


const Classes = (): JSX.Element => {
  const [{ fetching: fetchingClasses, data: events }] = useCalendarClassesQuery();
  const { classes, theme, cx } = useStyles();
  const [layoutRef] = useResizeObserver();
  const [calendarDate, setCalendarDate] = useState<Date | null>(new Date());



  function renderClassList(events: CalendarClassesQuery) {

    return events.calendarClasses.map((c: CalendarClass) => (

      <Group key={c.uuid} p={'sm'} spacing={0} sx={{ borderBottom: `1px solid ${theme.colors.gray[3]}` }}>


        <Flex sx={{ width: '100%' }} mt={'xs'} gap={20}>

          <div style={{ flex: "1 1 auto" }}>

            <Group>
              <Text size="lg" weight={600}>
                <Anchor href={`/classes/${c.classTemplate.title}/${c.uuid}`}>{c.classTemplate.title}</Anchor>
              </Text>
            </Group>

            {/* <Text size="md" color="dimmed" lineClamp={3} py={6}  >
              {c.classTemplate.description}
            </Text> */}

            <Group spacing='xl' mt={3} >

              <Group noWrap spacing={5} mt={3}>
                <IconCalendarEvent stroke={2.0} size={16} />
                <Text size="md">
                  Class
                </Text>
              </Group>

              <Group noWrap spacing={5} mt={3}>
                <IconUsers stroke={2.0} size={16} />
                <Text size="md">
                  {formatOpenSlots(c.participants.length, c.maxParticipants)}
                </Text>
              </Group>

              {/* <Group noWrap spacing={5} mt={3}>
<IconClock stroke={2.0} size={16} />
<Text size="sm">
{formatDuration(c.duration)}
</Text>
</Group> */}

              <Group noWrap spacing={5} mt={3}>
                <IconSchool stroke={2.0} size={16} />
                <Text size="md">
                  Instructor: {c.instructor.name}
                </Text>
              </Group>


            </Group>
          </div>

          <div className={classes.calendarIcon}>
            <div className={classes.calendarIconTop}>{dayjs(parseInt(c.dates[0])).format(SHORT_M_ONLY)}</div>
            <div className={classes.calenderIconBottom}>{dayjs(parseInt(c.dates[0])).format(SHORT_DD_ONLY)}</div>
            {c.dates.length > 1 && <Center><Text color='dimmed' size='xs' mt={-8}>+ more</Text></Center>}
          </div>
        </Flex>
      </Group>
    ));
  }


  return (
    <MainLayout layoutRef={layoutRef}>
      <Container size="xl" mb="lg" pt={60}>
        <Title mb='xl'>Calendar</Title>

        <Grid >

          <Grid.Col span={7} p={0}>
            <ScrollArea>
              {fetchingClasses
                ? (<Container p='lg'><Center><Loader size='xl' /></Center></Container>)
                : (events.calendarClasses ? renderClassList(events) : null)
              }
            </ScrollArea>
          </Grid.Col>

          <Grid.Col span={5}>


            <Paper shadow='md' ml='lg' radius='md' sx={{ overflow: 'clip' }}>

              <Calendar
                // {...form.getInputProps('calendarDate')}
                allowLevelChange={false}
                firstDayOfWeek="sunday"
                weekdayLabelFormat="ddd"
                classNames={classes}
                value={calendarDate}
                onChange={setCalendarDate}
                size="lg"
                fullWidth
                dayClassName={(date, modifiers) =>
                  cx({
                    [classes.weekend]: modifiers.weekend,
                    [classes.outside]: modifiers.outside,
                    [classes.selected]: modifiers.selected,
                  })
                }
              // dayStyle={(date) =>
              //   date.getDay() === 5 && date.getDate() === 13
              //     ? { backgroundColor: theme.colors.red[9], color: theme.white }
              //     : null
              // }
              />

            </Paper>

          </Grid.Col>
        </Grid>

      </Container>
    </MainLayout >
  );
};

export default Classes;
