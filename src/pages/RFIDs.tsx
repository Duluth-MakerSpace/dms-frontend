import { ActionIcon, Avatar, Box, Button, Center, Container, Divider, Group, Loader, NumberInput, SimpleGrid, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useResizeObserver } from "@mantine/hooks";
import { IconAt, IconPhoneCall, IconX } from "@tabler/icons";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { RfidsQuery, useRfidLoginMutation, useRfidLogoutMutation, useRfidsQuery } from '../graphql/graphql';
import MainLayout from "../layouts/MainLayout";



const RFIDs = (): JSX.Element => {
  const navigate = useNavigate();
  const [{ fetching: fetchingRfids, data: rfids }] = useRfidsQuery();
  const [{ fetching: loggingIn }, rfidLogin] = useRfidLoginMutation();
  const [{ fetching: loggingOut }, rfidLogout] = useRfidLogoutMutation();
  const [layoutRef] = useResizeObserver();

  const form = useForm({
    initialValues: {
      rfid: '',
      durationSeconds: 30,
    },
  });



  const currentUsers = useCallback(
    () => {
      if (!rfids.rfids) {
        return null;
      }

      return (
        <Box>
          {rfids.rfids.length ?
            (rfids.rfids.map((key) => (
              <Group spacing={0} key={key}>
                <ActionIcon onClick={() => { rfidLogout({ uuid: key }) }}>
                  <IconX size={18} color='red' />
                </ActionIcon>
                {key}
              </Group>
            )))
            : <Text italic>No users found</Text>
          }
        </Box>
      )
    },
    [rfids, rfidLogout]
  )



  return (
    <MainLayout layoutRef={layoutRef}>
      <Container size="lg" mb="lg" pt={60}>
        <Title mb='xl'>RFID Login Simulator</Title>

        <Container size={'xs'}>
          <form onSubmit={form.onSubmit(
            async (values) => {
              const response = await rfidLogin({ rfid: values.rfid, durationSeconds: values.durationSeconds });
              if (response.data?.rfidLogin) {
                navigate(0)
              }
            }
          )}>
            <Group>
              <TextInput
                label="RFID"
                placeholder="Enter any fake value"
                {...form.getInputProps('rfid')} />
              <NumberInput
                label="Duration (seconds)"
                placeholder="30"
                {...form.getInputProps('durationSeconds')} />
            </Group>
            <Button type="submit" mt="xl" loading={loggingIn}>
              Sign in
            </Button>
          </form>
        </Container>

        <Divider my={'lg'} />

        <Title mb='xl'>Currently in the shop</Title>

        {fetchingRfids
          ? (<Container p='lg'><Center><Loader size='xl' /></Center></Container>)
          : currentUsers()
        }
      </Container>
    </MainLayout>
  );
};

export default RFIDs;
