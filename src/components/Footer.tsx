import { Box, createStyles, Flex, Group, Image, Text } from "@mantine/core";
import { IconClock, IconMapPin, IconPhone } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
    footer: {
        marginTop: theme.spacing.xl * 2,
        marginLeft: theme.spacing.xl,
        marginRight: theme.spacing.xl,
        paddingTop: theme.spacing.xl * 1,
        paddingBottom: theme.spacing.xl * 1,
        paddingLeft: theme.spacing.xl,
        paddingRight: theme.spacing.xl,
        borderTop: `1px solid ${theme.colors.gray[2]}`
    },

    logo: {
        [theme.fn.smallerThan('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    },

    footerHeader: {
        textTransform: "uppercase",
        fontSize: theme.fontSizes.sm,
        color: theme.colors.gray[6],
        letterSpacing: '0.5px',
    },

    footerRow: {
        fontSize: theme.fontSizes.sm,
        color: theme.colors.gray[5],
        textAlign: 'right'
    }
}));

export function Footer() {
    const { classes } = useStyles();

    return (
        <footer className={classes.footer}>

            <Flex gap={60}>
                <Box sx={{ flex: '1 1 auto' }} className={classes.logo}>
                    <Image src={'/dms-logo-rect-red.svg'} width={'200px'} />
                </Box>

                <Box sx={{ whiteSpace: 'nowrap' }}>
                    <Group position='right' spacing={8}>
                        <IconPhone color='gray' stroke={1.5} size={14} />
                        <Text className={classes.footerHeader}>Contact</Text>
                    </Group>
                    <Box mt='xs'>
                        <Text className={classes.footerRow}>(218) 481-9200</Text>
                        <Text className={classes.footerRow}>info@duluthmakerspace.com</Text>
                    </Box>
                </Box>

                <Box sx={{ whiteSpace: 'nowrap' }}>
                    <Group position='right' spacing={8}>
                        <IconMapPin color='gray' stroke={1.5} size={14} />
                        <Text className={classes.footerHeader}>Location</Text>
                    </Group>
                    <Box mt='xs'>
                        <Text className={classes.footerRow}>3001 W Superior St</Text>
                        <Text className={classes.footerRow}>Duluth, MN 55806</Text>
                    </Box>
                </Box>

                <Box sx={{ whiteSpace: 'nowrap' }}>
                    <Group position='right' spacing={8}>
                        <IconClock color='gray' stroke={1.5} size={14} />
                        <Text className={classes.footerHeader}>Staffed hours</Text>
                    </Group>
                    <Box mt='xs' >
                        <Text className={classes.footerRow}>M-F: 5:30pm-8:00pm</Text>
                        <Text className={classes.footerRow}>Weekend: 12:00pm-4:00pm</Text>
                    </Box>
                </Box>

            </Flex>
        </footer >
    );
}