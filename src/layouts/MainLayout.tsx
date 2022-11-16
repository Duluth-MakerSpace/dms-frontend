import { ActionIcon, AppShell, Image, Container, createStyles, Group, Text, Title, Flex, Box, Center } from "@mantine/core";
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram, IconLocation, IconAddressBook, IconMapPin, IconPhone, IconClock2, IconClock } from "@tabler/icons";
import { ReactNode } from "react";
import { HeaderMenuColored } from "../components/Header";




const useStyles = createStyles((theme) => ({
  footer: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
  },

  logo: {
    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
}));




const MainLayout = ({
  children = null,
  layoutRef = null,
}: {
  children?: ReactNode;
  layoutRef?: any;
}) => {
  const { classes } = useStyles();

  return (
    <div ref={layoutRef}>
      <AppShell

        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        padding={0}
        // navbar={<Navbar height={100} hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>a</Navbar>}
        header={
          <HeaderMenuColored />
        }
        footer={
          <footer className={classes.footer}>
            <Container size={'xl'}>
              <Group position='apart'>
                <div className={classes.logo}>
                  <Image src={'/dms-logo-rect-red.svg'} width={'200px'} />
                </div>
                <Group spacing='xl' align='top'>

                  <Box>
                    <Group align='top'>
                      <Box mt={4} >
                        <IconMapPin color='gray' stroke={1.5} size={18} />
                      </Box>
                      <Box>
                        <Text size='sm' color='dimmed'>3001 W Superior St</Text>
                        <Text size='sm' color='dimmed'>Duluth, MN 55806</Text>
                      </Box>
                    </Group>
                  </Box>

                  <Box>
                    <Group align='top'>
                      <Box mt={4} >
                        <IconPhone color='gray' stroke={1.5} size={18} />
                      </Box>
                      <Box>
                        <Text size='sm' color='dimmed'>(218) 481-9200</Text>
                        <Text size='sm' color='dimmed'>info@duluthmakerspace.com</Text>
                      </Box>
                    </Group>
                  </Box>

                  <Box>
                    <Group align='top'>
                      <Box mt={4} >
                        <IconClock color='gray' stroke={1.5} size={18} />
                      </Box>
                      <Box>
                        <Text size='sm' color='dimmed'>M-F: 5:30pm-8:00pm</Text>
                        <Text size='sm' color='dimmed'>Weekend: 12:00pm-4:00pm</Text>
                      </Box>
                    </Group>
                  </Box>

                </Group>
              </Group>
            </Container>
            <Container size={'xl'} mt='lg'>
              <Group spacing={'sm'} position="center">
                <ActionIcon size="lg">
                  <IconBrandTwitter size={18} stroke={1.5} />
                </ActionIcon>
                <ActionIcon size="lg">
                  <IconBrandYoutube size={18} stroke={1.5} />
                </ActionIcon>
                <ActionIcon size="lg">
                  <IconBrandInstagram size={18} stroke={1.5} />
                </ActionIcon>
              </Group>
            </Container>
          </footer >
        }
      >
        {children}
      </AppShell >

    </div >
  );
};

export default MainLayout;
