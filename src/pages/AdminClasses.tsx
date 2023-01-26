import {
  Button, Card, Center, Container,
  createStyles, Group, Image, SimpleGrid, Text, Title
} from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import { IconSchool, IconTool } from '@tabler/icons';
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import { useClassTemplatesQuery, useMeQuery } from '../graphql/graphql';
import MainLayout from "../layouts/MainLayout";
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
  useIsAuth();
  const navigate = useNavigate();
  const [{ data: classTemplates }] = useClassTemplatesQuery();
  const { classes, cx } = useStyles();
  const [layoutRef] = useResizeObserver();


  return (
    <MainLayout layoutRef={layoutRef}>

      <Container size="xl" mb="lg" pt='xl'>
        <Title mb='xl'>Schedule a class</Title>


        <SimpleGrid cols={4}>

          <Card shadow='sm' withBorder radius='md' m='xs' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <Center><Text weight={700}>New class?</Text></Center>
              <Text color='dimmed' size='sm' mt='sm'>
                First, create a new template (name, description, image) which can be re-used
                later.
              </Text>
              <Text color='dimmed' size='sm' mt='sm'>
                Second, find the template on this page. Click 'Schedule' to add an
                instructor, special notes, date, and time.
              </Text>
            </div>
            <Button fullWidth type="submit" mt="xl">
              New class template
            </Button>
          </Card>

          {!classTemplates
            ? null
            : classTemplates?.classTemplates.map((c) => (

              <Card shadow='md' withBorder radius="md" className={cx(classes.card)} m='xs' >
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

            ))}
        </SimpleGrid>
      </Container>

    </MainLayout >
  );
};

export default AdminClasses;
