import { IconBookmark, IconHeart, IconShare } from '@tabler/icons';
import {
    Card,
    Image,
    Text,
    ActionIcon,
    Badge,
    Group,
    Center,
    Avatar,
    createStyles,
} from '@mantine/core';
// import { CalendarClass } from '../graphql/graphql';
import { formatClassDatesShort, formatOpenSlots } from '../utils/stringUtils';

const useStyles = createStyles((theme) => ({
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
}));

interface EventCardProps {
    c: any;
    link: string;
    eventType: string;
}

export function EventCard({
    className,
    c,
    link,
    eventType,
    ...others
}: EventCardProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof EventCardProps>) {
    const { classes, cx, theme } = useStyles();
    const linkProps = { href: link, target: '_blank', rel: 'noopener noreferrer' };
    const gradient = eventType === "Class" ? { from: 'orange', to: 'red' } : { from: "cyan", to: "teal" };

    return (
        <Card withBorder radius="md" className={cx(classes.card, className)} {...others}>
            <Card.Section>
                <a {...linkProps}>
                    <Image src={c.classTemplate.image} height={180} />
                </a>
            </Card.Section>

            <Badge className={classes.eventType} variant="gradient" gradient={gradient}>
                {eventType}
            </Badge>

            <Text className={classes.title} weight={500} component="a" mt={'sm'} {...linkProps}>
                {c.classTemplate.title}
            </Text>


            <Text size='sm' color="dimmed" mt={8} mb={10}>
                {formatClassDatesShort(c.dates)}
            </Text>

            <Text size="sm" color="dimmed" lineClamp={3}>
                {c.classTemplate.description}
            </Text>

            <Group position="apart" className={classes.footer}>
                <Center>
                    <Avatar src={c.instructor.avatar} size={24} radius="xl" mr="xs" />
                    <Text size="sm" inline>
                        {c.instructor.name}
                    </Text>
                </Center>

                <Group spacing={8} mr={0}>
                    <Text size='sm' color='dimmed'>{formatOpenSlots(c.participants.length, c.maxParticipants)}</Text>
                </Group>
            </Group>
        </Card>
    );
}