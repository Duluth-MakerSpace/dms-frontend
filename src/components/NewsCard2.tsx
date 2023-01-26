import {
    Button,
    Card, createStyles, Group, Image,
    Text
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons';
import dayjs from 'dayjs';
import { DEFAULT_DATE } from '../constants/dateFormats';
import { Post } from '../graphql/graphql';

const useStyles = createStyles((theme, _params, getRef) => {
    const image = getRef('image');

    return {
        card: {
            background: 'transparent'
        },

        imageWrapper: {
            overflow: 'clip',
            height: 220,
            position: 'relative',
            borderRadius: theme.radius.md,

            [`&:hover .${image}`]: {
                transform: 'scale(1.03)',
            },
        },

        image: {
            ref: image,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundSize: 'cover',
            transition: 'transform 500ms ease',
        },

        overlay: {
            position: 'absolute',
            top: '20%',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)',
        },

        details: {
            height: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            zIndex: 1,
            paddingLeft: theme.spacing.sm,
            paddingRight: theme.spacing.sm,
            paddingBottom: theme.spacing.sm,
        },

        title: {
            color: theme.white,
            marginBottom: 5,
        },

        bodyText: {
            padding: theme.spacing.sm,
        },
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
    }
}

export function NewsCard({
    post,
    ...others
}: NewsCardProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof NewsCardProps>) {
    const { classes, theme } = useStyles();
    const image = "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80";

    return (
        <Card p={0} className={classes.card}>

            <div className={classes.imageWrapper}>

                <div className={classes.image} style={{ backgroundImage: `url(${image})` }} />
                <div className={classes.overlay} />

                <div className={classes.details}>
                    <div>
                        <Text size="lg" className={classes.title} >
                            {post.title}
                        </Text>

                        <Group position="apart" spacing="xs">
                            <Text size="xs" color='dimmed' weight={600} sx={{ textTransform: "uppercase" }}>
                                {dayjs(parseInt(post.createdAt)).format(DEFAULT_DATE)}
                            </Text>

                        </Group>
                    </div>
                </div>
            </div>

            <div className={classes.bodyText}>
                <Text color='dimmed' size='sm' lineClamp={3}>
                    {post.content}
                </Text>
                <Group position='left' mt={'sm'}>
                    <Button rightIcon={<IconArrowRight size={18} stroke={1.5} />} size='sm'>Read more</Button>
                </Group>
            </div>


            {/* 
            <Image
                radius='sm'
                src={"https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"}
                height={220}
            />
            <div >

            <Text size="xs" color='dimmed' weight={600} sx={{ textTransform: "uppercase" }}>
                {dayjs(parseInt(post.createdAt)).format(DEFAULT_DATE)}
            </Text>
            <Text className={classes.title}>
                {post.title}
            </Text>

            <Text color='dimmed' mt="xs" mb="md" lineClamp={3}>
                {post.content}
            </Text>
        </div> */}
        </Card >
    );
}