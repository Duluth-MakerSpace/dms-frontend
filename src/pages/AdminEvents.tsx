import {
  Button, Card, Container,
  createStyles, Group, Image, SimpleGrid, Text, Title
} from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import { IconCalendarEvent, IconSchool, IconTool } from '@tabler/icons';
// import { useState } from "react";
import { useEventTemplatesQuery } from '../graphql/graphql';
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

const AdminEvents = (): JSX.Element => {
  const [{ data: templates }] = useEventTemplatesQuery();
  const { classes, cx } = useStyles();
  const [layoutRef] = useResizeObserver();


  return (
    <MainLayout layoutRef={layoutRef}>

      <Container size="xl" mb="lg">
        <Title mb='xl'>Schedule an event</Title>

        <SimpleGrid cols={4}>

          {!templates
            ? null
            : templates?.eventTemplates.map((c) => (


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
                    <Button component="a" href={`/admin/events/create/${c.uuid}`} leftIcon={<IconCalendarEvent size={'14'} />} variant='subtle' size='sm'>Schedule</Button>
                    <Button rightIcon={<IconTool size={'14'} />} variant='subtle' size='sm'>Edit</Button>
                  </Group>
                </Card.Section>



              </Card>
            ))}
        </SimpleGrid>
      </Container>

    </MainLayout >
  );
};

export default AdminEvents;
