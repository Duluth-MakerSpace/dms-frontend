import { ActionIcon, Anchor, Avatar, Burger, Center, Container, createStyles, Group, Header, Image, Indicator, Menu, Text, Tooltip, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBell, IconBrandSlack, IconCash, IconChevronDown, IconCurrencyDollar, IconLogout, IconPhotoEdit, IconSettings, IconStar, IconTemperaturePlus, IconUser } from "@tabler/icons";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SLACK_URL } from "../constants/makerspace";
import { useLogoutMutation, useMeQuery } from "../graphql/graphql";


const useStyles = createStyles((theme) => ({
    header: {
        backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
        borderBottom: 0,
        position: 'relative'
    },
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    links: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    logo: {
        transition: '.1s linear transform',

        '&:hover': {
            transform: 'scale(1.05)'
        }
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 10px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.white,
        fontSize: theme.fontSizes.md,
        fontWeight: 600,

        '&:hover': {
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
                0.2
            ),
        },
    },

    linkLabel: {
        marginRight: 5,
    },

    user: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.white,
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,

        '&:hover': {
            color: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[3],
        },
    },
    userActive: {
    },

    indicator: {
        borderColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
    }
}));

export function HeaderMenuColored() {
    const { pathname } = useLocation();
    const [, logout] = useLogoutMutation();
    const [{ data: me, fetching: loginFetching }] = useMeQuery();
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const [opened, { toggle }] = useDisclosure(false);
    const { classes, cx } = useStyles();

    const links = [
        {
            link: "/about",
            label: "Organization",
            links: [
                { link: "/membership", label: "Membership" },
                { link: "/about", label: "About us" },
                { link: "/contact", label: "Contact" },
            ]
        },
        {
            link: ".",
            label: "Workshop",
            links: [
                { link: "/users", label: "Users" },
                { link: "/equipment", label: "Equipment" },
                { link: "/storage", label: "Storage" },
            ]
        },
        {
            link: "/news",
            label: "News",
            links: [
                { link: "/news", label: "News" },
                { link: "/events", label: "Events" },
                { link: "/classes", label: "Classes" },
                { link: "/projects", label: "Member Projects" }
            ]
        },
        { link: "/classes", label: "Classes", },
        {
            link: "/admin",
            label: "Admin",
            links: [
                { link: "/badges", label: "Badges" },
                { link: "/rfid", label: "RFID" },
                { link: "/admin/classes", label: "Create a class" },
                { link: "/admin/events", label: "Create an event" },
            ]
        },
    ];

    const mainNav = links.map((link) => {
        const menuItems = link.links?.map((item) => (
            <Menu.Item component="a" href={item.link} key={item.link}>{item.label}</Menu.Item>
        ));

        if (menuItems) {
            return (
                <Menu key={link.label} trigger="hover" exitTransitionDuration={100}>
                    <Menu.Target>
                        <a
                            href={link.link}
                            className={classes.link}
                            onClick={(event) => event.preventDefault()}
                        >
                            <Center>
                                <span className={classes.linkLabel}>{link.label}</span>
                                <IconChevronDown size={12} stroke={3} />
                            </Center>
                        </a>
                    </Menu.Target>
                    <Menu.Dropdown>{menuItems}</Menu.Dropdown>
                </Menu>
            );
        }

        return (
            <a
                key={link.label}
                href={link.link}
                className={classes.link}
            >
                {link.label}
            </a>
        );
    });

    let userInfo = null;
    if (loginFetching) {
        userInfo = null;
    } else if (me?.me) {
        userInfo = (
            <>
                <Indicator dot inline processing withBorder classNames={{ indicator: classes.indicator }} offset={3} size={13} color="white">
                    <ActionIcon variant={"filled"} size={32} color='red' radius={'xl'}>
                        <IconBell size={24} stroke={1.5} />
                    </ActionIcon>
                </Indicator>

                <Menu
                    shadow="md"
                    position="bottom-end"
                    transition="pop-top-right"
                    onClose={() => setUserMenuOpened(false)}
                    onOpen={() => setUserMenuOpened(true)}
                >
                    <Menu.Target>
                        <UnstyledButton
                            className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                        >
                            <Group spacing={7}>
                                <Avatar
                                    size={32}
                                    color="red"
                                    radius="xl"
                                    src={`https://avatars.dicebear.com/api/croodles/${me.me.email}.svg?background=%23ffffff`}>
                                    <IconStar size={20} stroke={1.5} />
                                </Avatar>
                                <IconChevronDown size={14} stroke={3} />
                            </Group>
                        </UnstyledButton>
                    </Menu.Target>
                    <Menu.Dropdown>

                        <Menu.Item component={'span'}>
                            <Text>Signed in as <strong>{me.me.name}</strong></Text>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Label>
                            Account
                        </Menu.Label>
                        <Menu.Item component={Link} to={`/account/fees`} icon={<IconCurrencyDollar size={16} stroke={1.5} />}>
                            Fees
                        </Menu.Item>
                        <Menu.Item component={Link} to={`/account/membership`} icon={<IconCash size={16} stroke={1.5} />}>
                            Membership
                        </Menu.Item>

                        <Menu.Divider />
                        <Menu.Label>Links</Menu.Label>
                        <Menu.Item component={Link} to={`/heat`} icon={<IconTemperaturePlus size={16} stroke={1.5} />}>
                            Demand heat
                        </Menu.Item>
                        <Menu.Item component={Link} to={`/posts/create`} icon={<IconPhotoEdit size={16} stroke={1.5} />}>
                            Create a post
                        </Menu.Item>
                        <Menu.Divider />

                        <Menu.Label>Website</Menu.Label>
                        <Menu.Item component={Link} to={`/users/${me.me.uuid}`} icon={<IconUser size={16} stroke={1.5} />}>
                            Your profile
                        </Menu.Item>
                        <Menu.Item component={Link} to={`/account`} icon={<IconSettings size={16} stroke={1.5} />}>
                            Settings
                        </Menu.Item>
                        <Menu.Item onClick={() => logout({})} icon={<IconLogout size={16} stroke={1.5} />}>
                            Log out
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>

            </>);
    } else {
        userInfo = (
            <>
                <Link key={'login'} to={'/login'} state={{ previousPath: pathname }} className={classes.link}>Log in</Link>
                <a key={'register'} href={'/register'} className={classes.link}>Register</a>
            </>);
    }

    return (
        <Header height='auto' className={classes.header} >
            <Container fluid>
                <div className={classes.inner}>
                    <Group spacing={'xs'} className={classes.links}>
                        <Anchor className={classes.logo} href="/" title='Home'>
                            <Image src="/dms-logo-rect-white.svg" width={150} p={'xs'} mr={'lg'} />
                        </Anchor>
                        {mainNav}
                    </Group>
                    <Group spacing={'sm'}>
                        <Tooltip label="Join on Slack!">
                            {SLACK_URL
                                && <Anchor href={SLACK_URL} target="_blank">
                                    <ActionIcon variant={"filled"} size={32} color='red' radius={'xl'}>
                                        <IconBrandSlack size={32} stroke={1} />
                                    </ActionIcon>
                                </Anchor>}
                        </Tooltip>
                        {userInfo}
                    </Group>
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        className={classes.burger}
                        size="sm"
                        color="#fff"
                    />
                </div>
            </Container>
        </Header>
    );
}