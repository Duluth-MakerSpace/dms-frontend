
import {
    Button,
    Card, Container, createStyles, Group, Image,
    Text,
    Title
} from '@mantine/core';
import dayjs from 'dayjs';
import { DEFAULT_DATE } from '../constants/dateFormats';
import { MeQuery, Post } from '../graphql/graphql';

const useStyles = createStyles((theme) => ({
    hero: {
        backgroundColor: '#272126',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage:
            'linear-gradient(250deg, rgba(161, 145, 160, 0) 0%, rgba(39, 33, 38, 0.93) 60%), url(https://images.unsplash.com/photo-1591285687558-632ddc5e026a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80)',
        paddingTop: theme.spacing.md,
        paddingBottom: theme.spacing.md,
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',

        [theme.fn.smallerThan('md')]: {
            flexDirection: 'column',
        },
    },

    image: {
        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

    content: {
        paddingTop: theme.spacing.xl * 2,
        paddingBottom: theme.spacing.xl * 2,
        marginRight: theme.spacing.xl * 3,

        [theme.fn.smallerThan('md')]: {
            marginRight: 0,
        },
    },

    title: {
        color: theme.white,
        fontWeight: 900,
        lineHeight: 1.05,
        maxWidth: 500,
        fontSize: 48,

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
            fontSize: 34,
            lineHeight: 1.15,
        },
    },

    heroDescription: {
        color: theme.white,
        opacity: 0.75,
        maxWidth: 700,

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
        },
    },

    heroButton: {
        paddingLeft: 40,
        paddingRight: 40,

        [theme.fn.smallerThan('md')]: {
            width: '100%',
        },
    },

}));

interface HeroProps {
    user: MeQuery
}


const Hero = ({
    user,
    ...others
}: HeroProps): JSX.Element => {
    const { classes } = useStyles();


    return (
        <div className={classes.hero} >
            <Container size="lg">
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            Duluth{' '}
                            <Text
                                component="span"
                                inherit
                                variant="gradient"
                                gradient={{ from: 'red', to: 'orange' }}
                            >
                                MakerSpace
                            </Text>
                        </Title>

                        <Text className={classes.heroDescription} mt={30}>
                            A 501(c)(3) nonprofit providing 11,000 ft² of work space to the community. Come by for a tour, join a class, or get access to tools and equipment for a small monthly fee.
                        </Text>
                        {!user?.me &&
                            <Button
                                variant="gradient"
                                gradient={{ from: 'red', to: 'orange' }}
                                size="md"
                                className={classes.heroButton}
                                mt={40}
                            >
                                Sign up
                            </Button>
                        }
                    </div>
                </div>
            </Container>
        </div>

    );
}

export default Hero;
