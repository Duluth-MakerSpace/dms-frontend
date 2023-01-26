import { Avatar, Box, Button, Center, Container, createStyles, Grid, Group, Image, Loader, Text, Tooltip } from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import { IconAccessPoint, IconActivityHeartbeat, IconCake, IconFingerprint, IconPencil, IconPhone, IconSpy, IconTag } from "@tabler/icons";
import dayjs from 'dayjs';
import { useState } from "react";
import { useParams } from "react-router-dom";
import EmergencyModal from "../components/EmergencyModal";
import { SHORT_DATE } from "../constants/dateFormats";
import { useUserQuery } from '../graphql/graphql';
import MainLayout from "../layouts/MainLayout";
import { formatPhone } from "../utils/stringUtils";

const useStyles = createStyles((theme, _params, getRef) => ({
  sectionHeader: {
    borderBottom: `1px solid ${theme.colors.gray[3]}`,
    fontWeight: 700,
    fontSize: 18,
    marginBottom: 16,
    paddingBottom: 10
  },

}));

const User = (): JSX.Element => {
  const { uuid } = useParams();
  const [{ fetching: fetchingUser, data: user }] = useUserQuery({ variables: { uuid: uuid } });
  const { classes } = useStyles();
  const [layoutRef] = useResizeObserver();
  const [emergOpened, setEmergOpened] = useState(false);

  return (
    <MainLayout layoutRef={layoutRef}>
      <Container size="xl" mb="lg" mt={60}>
        {fetchingUser
          ? (<Center><Loader size='xl' /></Center>)
          : !user.user ?
            "TODO. User not found."
            : (<>
              <Grid
                gutter={60}
              >
                <Grid.Col span='content'>
                  <Center>
                    <Avatar src="" size={200} color='indigo' radius={200}>
                      <IconSpy size={150} stroke={1} />
                    </Avatar>
                  </Center>
                  <Box mt='lg'>
                    <Group mt={4} spacing={8}><IconTag size={18} stroke={1.5} color='gray' />
                      <Text>{user.user.title?.title || "Maker"}</Text>
                    </Group>
                    <Group mt={4} spacing={8} noWrap><IconAccessPoint size={18} stroke={1.5} color='gray' /><Text>Membership: </Text><Text weight={700}>expired</Text></Group>
                    <Group mt={4} spacing={8}><IconCake size={18} stroke={1.5} color='gray' /><Text>Registered: {dayjs(parseInt(user.user.createdAt)).format(SHORT_DATE)}</Text></Group>
                    <Group mt={4} spacing={8}><IconPhone size={18} stroke={1.5} color='gray' /><Text>{formatPhone(user.user.phone)}</Text></Group>
                    <Group mt={4} spacing={8}><IconAccessPoint size={18} stroke={1.5} color='gray' /><Text>Access: {user.user.accessLevel}</Text></Group>
                  </Box>
                </Grid.Col>
                <Grid.Col span='auto'>

                  <Group>
                    <Text weight={600} size={26}>{user.user.name}</Text>
                    <Text color='dimmed' weight={300} size={26}>{user.user.email.toLowerCase()}</Text>
                  </Group>

                  <Group spacing='sm'>
                    <Group mt={'lg'}>
                      <Button color='red' variant='filled' leftIcon={<IconPencil size={18} />}>Edit</Button>
                    </Group>
                    <Group mt={'lg'}>
                      <Button color='red' variant='filled' leftIcon={<IconFingerprint size={18} />}>RFID</Button>
                    </Group>
                    <Group mt={'lg'}>
                      <EmergencyModal p={user.user} opened={emergOpened} onClose={() => setEmergOpened(false)} />
                      <Button
                        color='red'
                        variant='filled'
                        onClick={() => setEmergOpened(true)}
                        leftIcon={<IconActivityHeartbeat size={18} />}>Emergency</Button>
                    </Group>
                  </Group>



                  {/* <Text className={classes.sectionHeader} mt={48}>Profile</Text> */}

                  <Text color='dimmed' mt='lg' mb='lg'>{user.user.bio}</Text>

                  <Text className={classes.sectionHeader} mt={48}>Badges</Text>
                  <Group spacing='lg'>
                    <Group>
                      <Tooltip label="CNC"><Image src="/img/badges/cnc.png" width={60} /></Tooltip>
                      <Tooltip label="Laser cutter"><Image src="/img/badges/laser.png" width={60} /></Tooltip>
                      <Tooltip label="Welding"><Image src="/img/badges/welding.png" width={60} /></Tooltip>
                    </Group>
                  </Group>



                  <Text className={classes.sectionHeader} mt={48}>Posts</Text>
                  <Text>To do.</Text>
                </Grid.Col>
              </Grid>
            </>)
        }

      </Container>
    </MainLayout >
  );
};

export default User;
