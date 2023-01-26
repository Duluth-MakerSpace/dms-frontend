import {
    ActionIcon, createStyles, Paper, Text
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons';
import dayjs from 'dayjs';
import { SHORT_DATE } from '../constants/dateFormats';

const useStyles = createStyles((theme, _params, getRef) => {
    const bg = getRef('bg');

    return {
        card: {
            transition: '.15s linear all',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            height: 255,
            borderRadius: theme.radius.md,
            overflow: 'hidden',
            position: 'relative',

            [`&:hover .${bg}`]: {
                transform: 'scale(1.03)',
                opacity: 0.65
            },
            // '&:hover': {
            //     borderColor: theme.colors.dark,
            //     boxShadow: '0 0 8px 0 rgba(0, 0, 0, .1)'
            // }
        },

        relative: {
            position: 'relative',
        },

        bg: {
            ref: bg,
            opacity: 0.5,
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: '500ms ease all',
        },

        date: {
            textTransform: "uppercase",
            marginBottom: theme.spacing.xs,
            fontSize: theme.fontSizes.xs,
            color: theme.white,
            opacity: 0.75,
            fontWeight: 700,
        },

        title: {
            fontWeight: 900,
            color: theme.white,
            lineHeight: 1.2,
            fontSize: 24,
            marginTop: theme.spacing.xs,
        },

        description: {
            marginBottom: theme.spacing.sm
        },

        readMoreLink: {
            marginBottom: theme.spacing.sm
        }
    };
});

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
    },
    idx: number
}

export function NewsCard({
    post,
    idx,
    ...others
}: NewsCardProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof NewsCardProps>) {
    const { classes } = useStyles();

    const images = [
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1560796952-f1c9b838544c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1578353022142-09264fd64295?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    ]

    return (
        <Paper
            component="a"
            href={`/news/${post.title}/${post.uuid}`}
            radius='md'
            sx={{ background: 'radial-gradient(circle, rgb(78,80,74) 30%, rgb(12,13,11) 100%)' }}

            className={classes.card}
            p="xl"
            shadow="md"
        >
            <div
                className={classes.bg}
                style={{ backgroundImage: `url(${images[idx]})` }}
            ></div>
            <div className={classes.relative}>
                <Text className={classes.date}>
                    {dayjs(parseInt(post.createdAt)).format(SHORT_DATE)}
                </Text>
                <Text className={classes.title}>
                    {post.title}
                </Text>
            </div>
            <ActionIcon variant='transparent'>
                <IconArrowRight color='white' />
            </ActionIcon>
            {/* <Text className={classes.readMoreLink}>Read more</Text> */}
        </Paper>


    );
}