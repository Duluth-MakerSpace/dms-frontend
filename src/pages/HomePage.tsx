import { Carousel } from '@mantine/carousel';
import {
  Box,
  Button,
  Center, Container,
  createStyles, Flex, Group, Paper, SimpleGrid, Title
} from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import dayjs from 'dayjs';
// import { useState } from "react";
import { EventCard } from "../components/EventCard";
import { NewsCard } from '../components/NewsCard';
import { DEFAULT_DATE } from '../constants/dateFormats';
import { usePostsQuery, useCalendarClassesQuery } from '../graphql/graphql';
import MainLayout from "../layouts/MainLayout";
import { formatOpenSlots } from '../utils/stringUtils';


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




}));

const HomePage = (): JSX.Element => {
  const [{ data: news }] = usePostsQuery();
  const [{ fetching: fetchingCalendarClasses, data: calendarClasses }] = useCalendarClassesQuery();
  const { classes } = useStyles();
  const [layoutRef] = useResizeObserver();

  // const [calendarDate, setCalendarDate] = useState<Date | null>();
  // const mockEventDates = [3, 7, 19];

  return (
    <MainLayout layoutRef={layoutRef}>
      <Container size="xl" mb="lg">
        <Title mb='xl'>Duluth MakerSpace</Title>


        <Title mb='xl'>News</Title>

        <SimpleGrid cols={2}>
          {!news
            ? null
            : news?.posts.map((p) => (
              <NewsCard
                key={p.uuid}
                date={dayjs(parseInt(p.createdAt)).format(DEFAULT_DATE)}
                image={"https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80                "}
                link={`/news/${p.uuid}`}
                title={p.title}
                author={{
                  name:
                    "hi",
                  image:
                    ""
                }}
                category={'Test'} />)
            )}
        </SimpleGrid>
      </Container>


      <Container size="xl" mb="lg" pt='xl'>
        <Title mb='md'>Upcoming classes and events</Title>
        <Group mb='md'>
          <Button component='a' href='/classes' variant='outline'>View all</Button>
          <Button component='a' href='/calendar' variant='outline'>View calendar</Button>
        </Group>
        <Flex wrap={'nowrap'}>

          {fetchingCalendarClasses
            ? ("TODO: LOADING")
            : (

              <Carousel
                classNames={classes}
                slideSize="30%"
                slideGap="md"
                align="start"
                controlSize={30}>

                {calendarClasses.calendarClasses.map((c) => (
                  <Carousel.Slide key={c.uuid}>
                    <EventCard
                      c={c}
                      link={`/class/${c.uuid}`}
                      eventType="Class"
                    />
                    <Box>

                    </Box>
                  </Carousel.Slide>
                ))
                }
              </Carousel>
            )
          }
        </Flex>
      </Container>

    </MainLayout>
  );
};

export default HomePage;
