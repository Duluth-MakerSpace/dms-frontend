import { Carousel } from '@mantine/carousel';
import {
  Box,
  Button, Center, Container, createStyles, Flex, Grid, Group, Image, Loader, SimpleGrid, Skeleton, Text, ThemeIcon
} from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import { IconArrowLeft, IconArrowRight, IconCalendar } from '@tabler/icons';
import { useCallback } from 'react';
// import { useState } from "react";
import { EventCard } from "../components/EventCard";
import Hero from '../components/Hero';
import { NewsCard } from '../components/NewsCard';
import UserWithAvatar from '../components/UserWithAvatar';
import { useCalendarClassesQuery, useMembershipQuery, useMeQuery, usePostsQuery, useRfidsQuery } from '../graphql/graphql';
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




  //
  boxLink: {
    textDecoration: 0,
    color: theme.colors.gray[8],
    border: `1px solid transparent`,
    padding: 6,
    borderRadius: 4,
    transition: '.1s linear all',

    '&:hover': {
      // border: `1px solid ${theme.colors.gray[2]}`,
      backgroundColor: theme.colors.gray[0],
    },

    [`&:hover .${getRef('itemIcon')}`]: {
      backgroundColor: theme.colors.gray[3],
    }
  },

  wrapper: {
    paddingTop: 80,
    paddingBottom: 50,
  },

  item: {
    display: 'flex',
  },

  itemIcon: {
    ref: getRef('itemIcon'),
    padding: theme.spacing.xs,
    marginRight: theme.spacing.md,
    transition: '.1s linear all',
    backgroundColor: theme.colors.gray[0],
  },

  itemTitle: {
  },

  homeSectionTitle: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 700,
  },


}));



const HomePage = (): JSX.Element => {
  const newsToShow = 4;
  const [{ data: me, fetching: fetchingMe }] = useMeQuery();
  const [{ data: news, fetching: fetchingNews }] = usePostsQuery({ variables: { limit: newsToShow } });
  const [{ fetching: fetchingCalendarClasses, data: calendarClasses }] = useCalendarClassesQuery();
  const [{ data: membership, fetching: fetchingMembership }] = useMembershipQuery();
  const [{ fetching: fetchingRfids, data: rfids }] = useRfidsQuery();
  const { classes } = useStyles();
  const [layoutRef] = useResizeObserver();


  const renderHero = useCallback(
    () => (
      <Hero user={me} />
    ),
    [me]
  );



  const renderMembershipStatus = useCallback(
    () => {
      if (!membership?.membership) {
        return "unknown"
      }
      return membership.membership.status
    }
    ,
    [me, membership]
  )

  const renderUserPanel = useCallback(
    () => {
      if (!me || !me.me || fetchingMe) {
        return null;
      } else {
        return (
          <Container fluid sx={{ background: "#fff" }} mb="lg">
            <Container size="xl" py="lg">
              <Text className={classes.homeSectionTitle}>Hello, {me.me?.name}</Text>
              <SimpleGrid spacing='lg' py='xs' cols={4}>
                {makeItem("Check fees", "Current balance: $0. View history or fee policy.", '/account/fees', '/img/icons/fees.png')}
                {makeItem("Manage membership", `Status: ${renderMembershipStatus()}. View more details here.`, '/membership', '/img/icons/membership.png')}
                {makeItem("Demand heat", "Request heating in a section of DMS for a small fee.", '/heat', '/img/icons/heat.png')}
                {makeItem("Post a project", "Share your MakerSpace creations.", '/posts/create', '/img/icons/post.png')}
                {makeItem("Edit profile", "Update your settings, contact info, and more.", '/account', '/img/icons/profile.png')}
                {makeItem("Class dashboard", "See info about your past or upcoming classes.", '/account/classes', '/img/icons/classes.png')}
                {makeItem("Join on Slack", "Chat with our community of makers or find help.", '#', '/img/icons/slack.png')}
                {makeItem("Log out", "Always log out from public devices.", '/logout', '/img/icons/logout.png')}
              </SimpleGrid>
            </Container>
          </Container>
        )
      }
    }
    ,
    [fetchingMe, me]
  )


  const renderOccupants = useCallback(
    () => {
      if (!me || !me.me) {
        return null;
      } else {
        return (
          <Container size="xl" mb="xl" pt='xl'>
            <Group mb='lg' align='center'>
              <Text className={classes.homeSectionTitle}>Who's in the shop?</Text>
            </Group>

            {fetchingRfids || !rfids.rfids
              ? (<Container p='lg'><Center><Loader size='xl' /></Center></Container>)
              : (
                rfids.rfids.length ?
                  (rfids.rfids.map((key) => (
                    <UserWithAvatar key={key} user={{ name: key }} />
                  )))
                  : <Text italic>Nobody!</Text>
              )
            }
          </Container>
        )
      }
    }
    ,
    [me]
  )



  // const [calendarDate, setCalendarDate] = useState<Date | null>();
  // const mockEventDates = [3, 7, 19];

  function makeItem(title, description, link, image) {
    return (
      <Box component="a" href={link} className={classes.boxLink}>
        <div className={classes.item}>
          <ThemeIcon variant="light" className={classes.itemIcon} size={64} p={0} radius="xl">
            <Image src={image} />
            {/* <IconHandThreeFingers size={18} stroke={1.5} /> */}
          </ThemeIcon>
          <div>
            <Text weight={700} size="md" className={classes.itemTitle}>
              {title}
            </Text>
            <Text color="dimmed" size='sm'>{description}</Text>
          </div>
        </div>
      </Box>
    )
  };



  return (
    <MainLayout layoutRef={layoutRef}>
      {renderHero()}
      {renderUserPanel()}
      {renderOccupants()}


      <Container size="xl" mb="xl" pt='xl'>

        <Group mb='lg' align='center'>
          <Text className={classes.homeSectionTitle}>News and announcements</Text>
        </Group>

        <SimpleGrid cols={newsToShow} spacing='md' mt='lg'>
          {fetchingNews ?
            Array(newsToShow).map((p, idx) => (
              <Box key={idx}>
                <Skeleton height={8} radius="md" mt={16} />
                <Skeleton height={8} radius="md" mt={16} />
                <Skeleton height={8} radius="md" mt={16} />
                <Skeleton height={8} radius="md" mt={16} />
                <Skeleton height={8} radius="md" mt={16} />
                <Skeleton height={8} radius="md" mt={16} width='70%' />
              </Box>
            ))
            : !news
              ? <Text color='dimmed'>No news... is good news...</Text>
              : news?.posts.slice(0, newsToShow).map((p, idx) => (
                <NewsCard
                  key={p.uuid}
                  post={p}
                  idx={idx}
                />
              )
              )}
        </SimpleGrid>
      </Container>

      <Container size="xl" mb="xl" pt='xl'>

        <Group mb='lg' align='center'>
          <Text className={classes.homeSectionTitle}>Upcoming classes and events</Text>
          <Button compact component='a' href='/classes' variant='outline' leftIcon={<IconCalendar size={18} stroke={1.5} />}>View all</Button>
        </Group>

        {fetchingCalendarClasses
          ? ("TODO: LOADING")
          : (

            <Carousel
              classNames={classes}
              slideSize="33.33333%"
              slideGap="md"
              align="start"
              controlSize={30}
              nextControlIcon={<IconArrowRight size={16} />}
              previousControlIcon={<IconArrowLeft size={16} />}
              w="100%"
            >

              {calendarClasses.calendarClasses.map((c) => (
                <Carousel.Slide key={c.uuid} >
                  <EventCard
                    c={c}
                    link={`/classes/${c.classTemplate.title}/${c.uuid}`}
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
      </Container>

    </MainLayout>
  );
};

export default HomePage;
