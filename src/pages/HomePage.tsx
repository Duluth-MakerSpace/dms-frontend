import { Carousel } from '@mantine/carousel';
import {
  Center, Container,
  createStyles, Flex, Paper, SimpleGrid, Title
} from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import dayjs from 'dayjs';
// import { useState } from "react";
import { EventCard } from "../components/EventCard";
import { NewsCard } from '../components/NewsCard';
import { DEFAULT_DATE } from '../constants/dateFormats';
import { usePostsQuery } from '../graphql/graphql';
import MainLayout from "../layouts/MainLayout";


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
  const { classes } = useStyles();
  const [layoutRef] = useResizeObserver();

  // const [calendarDate, setCalendarDate] = useState<Date | null>();
  // const mockEventDates = [3, 7, 19];

  return (
    <MainLayout layoutRef={layoutRef}>

      <Container size="xl" mb="lg" pt='xl'>
        <Title color='dimmed' weight={200} size={'xl'} sx={{ textTransform: 'uppercase' }}>What's new at the</Title>
        <Title mb='xl'>Duluth MakerSpace</Title>
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
        <Title mb='xl'>Upcoming classes and events</Title>

        <Flex wrap={'nowrap'}>
          <Carousel
            classNames={classes}
            slideSize="30%"
            slideGap="md"
            align="start"
            controlSize={30}>
            <Carousel.Slide>
              <EventCard
                image={"https://duluthmakerspace.com/mg/C1662.jpg"}
                link={"http://google.com"}
                title={"Lapidary Arts 101 Class"}
                description={"Learn basics of the lapidary arts including; ​​Rocks and Minerals- Local rocks and minerals, identification, hardness ​​Saws and tools- uses, care, safety, cutting demonstrations Arbor- demonstration and hands-on learning; forming, sanding, polishing Learn more about becoming Lapidary Studio certified."}
                eventType="Class"
                author={{
                  name: "Amanda", image: "https://duluthmakerspace.com/mg/C1662.jpg"
                }} />
            </Carousel.Slide>
            <Carousel.Slide>
              <EventCard
                image={"https://duluthmakerspace.com/mg/C36.jpg"}
                link={"http://google.com"}
                title={"Intro to Arduino"}
                description={"Participants will learn about creative uses of Arduinos in educational settings, and how to wire and program simple circuits including how to blink an LED, use a button, and control a servo motor. The course serves as a way to connect local teachers with each other and a creative community workshop so they may use creative applications"}
                eventType="Private"
                author={{
                  name: "Paul", image: "https://duluthmakerspace.com/mg/C36.jpg"
                }} />
            </Carousel.Slide>
            <Carousel.Slide>
              <EventCard
                image={"https://tarus.com/wp-content/uploads/2022/03/TARUS-5-GLC-Main.webp"}
                link={"http://google.com"}
                title={"Big CNC Training"}
                description={"Come test out the enormous CNC which is now functional. Learn how to make a birdhouse using the CNC. This class is required to get certified."}
                eventType="Class"
                author={{
                  name: "Test", image: "https://duluthmakerspace.com/mg/C1662.jpg"
                }} />
            </Carousel.Slide>
            <Carousel.Slide>
              <EventCard
                image={"https://duluthmakerspace.com/mg/C1662.jpg"}
                link={"http://google.com"}
                title={"Intro to Arduino"}
                description={"Participants will learn about creative uses of Arduinos in educational settings, and how to wire and program simple circuits including how to blink an LED, use a button, and control a servo motor. The course serves as a way to connect local teachers with each other and a creative community workshop so they may use creative applications"}
                eventType="Class"
                author={{
                  name: "Amanda", image: "https://duluthmakerspace.com/mg/C1662.jpg"
                }} />
            </Carousel.Slide>
            <Carousel.Slide>
              <EventCard
                image={"https://duluthmakerspace.com/mg/C1662.jpg"}
                link={"http://google.com"}
                title={"Intro to Arduino"}
                description={"Participants will learn about creative uses of Arduinos in educational settings, and how to wire and program simple circuits including how to blink an LED, use a button, and control a servo motor. The course serves as a way to connect local teachers with each other and a creative community workshop so they may use creative applications"}
                eventType="Private"
                author={{
                  name: "Amanda", image: "https://duluthmakerspace.com/mg/C1662.jpg"
                }} />
            </Carousel.Slide>

            <Carousel.Slide>
              <Paper withBorder p={30}><Center>Check back soon!</Center></Paper>
            </Carousel.Slide>
          </Carousel>

          {/* 
          <Box ml={'xl'}>
            <Calendar
              allowLevelChange={false}
              classNames={{
                cell: classes.cell,
                day: classes.day,
              }}
              value={calendarDate}
              firstDayOfWeek="sunday"
              onChange={setCalendarDate}
              dayClassName={(date, modifiers) => {
                return cx({
                  [classes.weekend]: modifiers.weekend,
                  [classes.outside]: modifiers.outside,
                  [classes.event]: mockEventDates.includes(date.getDate()),
                  [classes.selected]: modifiers.selected
                })
              }
              }
              renderDay={(date) => {
                const day = date.getDate();
                return (
                  <div>
                    <Text weight={day == 16 ? 800 : 400}>{day}</Text>
                  </div>
                );
              }}
            />
          </Box> */}
        </Flex>

      </Container>
    </MainLayout>
  );
};

export default HomePage;
