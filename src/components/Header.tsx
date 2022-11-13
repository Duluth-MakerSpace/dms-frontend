import { ActionIcon, Anchor, Avatar, Burger, Center, Container, createStyles, Group, Header, Image, Indicator, Menu, Tooltip, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBell, IconBrandSlack, IconChevronDown, IconId, IconLogout, IconMail, IconStar, IconUser } from "@tabler/icons";
import { useState } from "react";
import { SLACK_URL } from "../constants/makerspace";
import { useLogoutMutation, useMeQuery } from "../graphql/graphql";


const useStyles = createStyles((theme) => ({
    header: {
        backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
        borderBottom: 0,
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
    const [, logout] = useLogoutMutation();
    const [{ data: me, fetching: loginFetching }] = useMeQuery();
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const [opened, { toggle }] = useDisclosure(false);
    const { classes, cx } = useStyles();

    const links = [
        {
            link: "/about",
            label: "About",
            links: [
                { link: "/about", label: "About us" },
                { link: "/membership", label: "Membership" },
                { link: "/users", label: "Users" },
                { link: "/equipment", label: "Equipment" },
                { link: "/storage", label: "Storage" },
            ]
        },
        {
            link: "/news",
            label: "News",
            links: [
                { link: "/news", label: "Updates" },
                { link: "/classes", label: "Classes" },
                { link: "/events", label: "Events" },
                { link: "/projects", label: "Member Projects" }
            ]
        },
        { link: "/classes", label: "Classes", },
        { link: "#2", label: "Support", }
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
                        <Menu.Label>
                            Signed in as
                        </Menu.Label>
                        <Menu.Item component="span" icon={<IconMail size={16} />}>
                            {me.me.email}
                        </Menu.Item>
                        <Menu.Item component="span" icon={<IconId size={16} />}>
                            {me.me.username} {(me.me.id)}
                        </Menu.Item>
                        <Menu.Divider />

                        <Menu.Label>Account</Menu.Label>
                        <Menu.Item icon={<IconUser size={16} />}>
                            Manage account
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
                <a key={'login'} href={'/login'} className={classes.link}>Log in</a>
                <a key={'register'} href={'/register'} className={classes.link}>Register</a>
            </>);
    }

    return (
        <Header height={72} className={classes.header} mb={120}>
            <Container fluid>
                <div className={classes.inner}>
                    <Group spacing={'xs'} className={classes.links}>
                        <Image src="/dms-logo-rect-white.svg" width={150} p={'xs'} mr={'lg'} />
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