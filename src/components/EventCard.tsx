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
}));

interface EventCardProps {
    image: string;
    link: string;
    title: string;
    description: string;
    eventType: string;
    author: {
        name: string;
        image: string;
    };
}

export function EventCard({
    className,
    image,
    link,
    title,
    description,
    author,
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
                    <Image src={image} height={180} />
                </a>
            </Card.Section>

            <Badge className={classes.eventType} variant="gradient" gradient={gradient}>
                {eventType}
            </Badge>

            <Text className={classes.title} weight={500} component="a" {...linkProps}>
                {title}
            </Text>

            <Text size="sm" color="dimmed" lineClamp={3}>
                {description}
            </Text>

            <Group position="apart" className={classes.footer}>
                <Center>
                    <Avatar src={author.image} size={24} radius="xl" mr="xs" />
                    <Text size="sm" inline>
                        {author.name}
                    </Text>
                </Center>

                <Group spacing={8} mr={0}>
                    <ActionIcon className={classes.action}>
                        <IconHeart size={16} color={theme.colors.red[6]} />
                    </ActionIcon>
                    <ActionIcon className={classes.action}>
                        <IconBookmark size={16} color={theme.colors.yellow[7]} />
                    </ActionIcon>
                    <ActionIcon className={classes.action}>
                        <IconShare size={16} />
                    </ActionIcon>
                </Group>
            </Group>
        </Card>
    );
}