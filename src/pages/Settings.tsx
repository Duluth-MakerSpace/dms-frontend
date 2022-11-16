import { Avatar, Badge, Box, Button, Center, Container, Flex, Group, Loader, Paper, Text } from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import { IconAccessPoint, IconActivityHeartbeat, IconCake, IconFingerprint, IconHeartbeat, IconPhone, IconSpy } from "@tabler/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useMeQuery, useUserQuery } from '../graphql/graphql';
import MainLayout from "../layouts/MainLayout";
import dayjs from 'dayjs';
import { DEFAULT_DATE } from "../constants/dateFormats";
import { formatPhone } from "../utils/stringUtils";

// const useStyles = createStyles((theme, _params, getRef) => ({

// }));

const Settings = (): JSX.Element => {
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [{ fetching: fetchingUser, data: user }] = useUserQuery({ variables: { uuid: uuid } });
  // const { classes, cx } = useStyles();
  const [layoutRef] = useResizeObserver();


  return (
    <MainLayout layoutRef={layoutRef}>
      <Container size="xl" mb="lg">
        {fetchingUser
          ? (< Center > <Loader size='xl' /></Center>)
          : !user.user ?
            "TODO. User not found."
            : (<>
              <Paper withBorder shadow='sm' radius='lg' p='xl'>
                <Flex
                  gap="xl"
                  align="flex-start"
                >
                  <Box sx={{ width: '200px' }}>
                    <Center>
                      <Avatar src="" size={200} color='indigo' radius={200}>
                        <IconSpy size={150} stroke={1} />
                      </Avatar>
                    </Center>
                    <Center mt={'lg'}>
                      <Button color='red' variant='filled' leftIcon={<IconFingerprint size={18} />}>RFID</Button>
                    </Center>
                    <Center mt={'lg'}>
                      <Button color='red' variant='filled' leftIcon={<IconActivityHeartbeat size={18} />}>Emergency</Button>
                    </Center>
                  </Box>
                  <Box sx={{ width: '100%' }}>

                    <Text mt="sm" size="sm" weight={700} color="dimmed" sx={{ textTransform: "uppercase" }}>{user.user.title ? user.user.title : "Maker"}</Text>
                    <Group>
                      <Text mb='xs' weight={600} size={26}>{user.user.name}</Text>
                      <Text mb='xs' color='dimmed' weight={300} size={26}>{user.user.email.toLowerCase()}</Text>
                    </Group>
                    <Group spacing='lg'>
                      <Center><IconCake size={20} stroke={2.0} color='gray' /><Text ml={4} >{dayjs(parseInt(user.user.createdAt)).format(DEFAULT_DATE)}</Text></Center>
                      <Center><IconPhone size={20} stroke={2.0} color='gray' /><Text ml={4} >{formatPhone(user.user.phone)}</Text></Center>
                      <Center><IconAccessPoint size={20} stroke={2.0} color='gray' /><Text ml={4} >{user.user.accessLevel}</Text></Center>
                    </Group>
                    <Text color='dimmed' mt='md' mb='lg'>{user.user.bio}</Text>
                    <Group>
                      <Badge variant='filled' color='gray'>CNC</Badge>
                      <Badge variant='filled' color='gray'>Laser Cutter</Badge>
                      <Badge variant='filled' color='gray'>3D Printing</Badge>
                    </Group>
                  </Box>
                </Flex>
              </Paper>
            </>)
        }

      </Container>
    </MainLayout >
  );
};

export default Settings;
