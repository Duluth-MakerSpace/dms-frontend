import {
    Card, createStyles, Group, Image,
    Text
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    title: {
        fontWeight: 700,
        // lineHeight: 1.2,
    },

    body: {
        padding: theme.spacing.md,
    },
}));

interface NewsCardProps {
    image: string;
    link: string;
    category: string;
    title: string;
    date: string;
    author: {
        name: string;
        image: string;
    };
}

export function NewsCard({
    image,
    link,
    category,
    title,
    date,
    author,
    ...others
}: NewsCardProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof NewsCardProps>) {
    const { classes } = useStyles();
    return (
        <Card withBorder radius="md" p={0} className={classes.card}>
            <Group noWrap spacing={0}>
                <Image src={image} height={120} width={120} />
                <div className={classes.body}>
                    {/* <Text transform="uppercase" color="dimmed" weight={700} size="xs">
                        {category}
                    </Text> */}
                    <Text className={classes.title} mt="xs" mb="md">
                        {title}
                    </Text>
                    <Group noWrap spacing="xs">
                        <Text size="sm">
                            {date}
                        </Text>
                    </Group>
                </div>
            </Group>
        </Card>
    );
}