import {
    Card, createStyles, Text
} from '@mantine/core';
import dayjs from 'dayjs';
import { DEFAULT_DATE } from '../constants/dateFormats';

const useStyles = createStyles((theme) => ({

    card: {
        background: 'transparent',
        transition: '.15s linear all',

        '&:hover': {
            borderColor: theme.colors.dark,
            boxShadow: '0 0 8px 0 rgba(0, 0, 0, .1)'
        }
    },

    date: {
        textTransform: "uppercase",
        letterSpacing: '0.5px',
        marginBottom: theme.spacing.xs,
        fontSize: theme.fontSizes.sm,
        color: '#917971',
    },

    title: {
        fontWeight: 700,
        fontSize: theme.fontSizes.xl,
        marginBottom: theme.spacing.sm
        // lineHeight: 1.2,
    },

    description: {
        marginBottom: theme.spacing.sm
    },

    readMoreLink: {
        marginBottom: theme.spacing.sm
    }

}));

interface NewsCardProps {
    post: {
        uuid: string;
        createdAt: string;
        category: number;
        title: string;
        content: string;
        author: {
            uuid: string;
            id: number;
            name: string;
            email: string;
            avatar?: string;
        }
    }
}

export function NewsCard({
    post,
    ...others
}: NewsCardProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof NewsCardProps>) {
    const { classes } = useStyles();
    return (
        <Card
            component="a"
            href={`/news/${post.title}/${post.uuid}`}
            className={classes.card}
            p='sm'
            withBorder
            radius='md'>
            <div >
                <Text className={classes.date}>
                    {dayjs(parseInt(post.createdAt)).format(DEFAULT_DATE)}
                </Text>
                <Text className={classes.title}>
                    {post.title}
                </Text>

                <Text className={classes.description} color='dimmed' lineClamp={6}>
                    {post.content}
                </Text>

                {/* <Text className={classes.readMoreLink}>Read more</Text> */}
            </div>
        </Card>
    );
}