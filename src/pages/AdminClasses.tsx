import { Carousel } from '@mantine/carousel';
import {
  Box,
  Center, Container,
  createStyles, Flex, Image, Text, Grid, Paper, SimpleGrid, Title, Group, Badge, Anchor, Button, Card, ActionIcon
} from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import { IconAward, IconBadge, IconBookmark, IconHeart, IconSchool, IconShare, IconTool } from '@tabler/icons';
import dayjs from 'dayjs';
// import { useState } from "react";
import { EventCard } from "../components/EventCard";
import { NewsCard } from '../components/NewsCard';
import { DEFAULT_DATE } from '../constants/dateFormats';
import { useClassTemplatesQuery } from '../graphql/graphql';
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

const AdminClasses = (): JSX.Element => {
  const [{ data: classTemplates }] = useClassTemplatesQuery();
  const { classes, cx } = useStyles();
  const [layoutRef] = useResizeObserver();


  return (
    <MainLayout layoutRef={layoutRef}>

      <Container size="xl" mb="lg">
        <Title mb='xl'>Schedule a class</Title>


        <SimpleGrid cols={4}>

          {!classTemplates
            ? null
            : classTemplates?.classTemplates.map((c) => (


              <Card shadow='md' withBorder radius="md" m='xs' className={cx(classes.card)} >
                <Card.Section>
                  <a href={c.uuid}>
                    <Image src={c.image} height={140} />
                  </a>
                </Card.Section>

                <Card.Section className={classes.section} mt="md">
                  <Group position="apart" mt="md" mb="xs">
                    <Text weight={500} lineClamp={1}>{c.title}</Text>
                  </Group>

                  <Text size="sm" color="dimmed" lineClamp={2}>
                    {c.description}
                  </Text>
                  <Group mt={"xs"} position="apart">
                    <Button component="a" href={`/admin/classes/create/${c.uuid}`} leftIcon={<IconSchool size={'14'} />} variant='subtle' size='sm'>Schedule</Button>
                    <Button rightIcon={<IconTool size={'14'} />} variant='subtle' size='sm'>Edit</Button>
                  </Group>
                </Card.Section>



              </Card>
              // date={dayjs(parseInt(p.createdAt)).format(DEFAULT_DATE)}
              // image={"https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80                "}
              // link={`/news/${p.uuid}`}
              // title={p.title}

              // category={'Test'} />)
            ))}
        </SimpleGrid>
      </Container>

    </MainLayout >
  );
};

export default AdminClasses;
