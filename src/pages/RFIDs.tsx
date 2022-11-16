import { ActionIcon, Avatar, Box, Button, Center, Container, Divider, Group, Loader, NumberInput, SimpleGrid, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useResizeObserver } from "@mantine/hooks";
import { IconAt, IconPhoneCall, IconX } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { useRfidLoginMutation, useRfidLogoutMutation, useRfidsQuery } from '../graphql/graphql';
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


  return (
    <MainLayout layoutRef={layoutRef}>
      <Container size="xl" mb="lg">
        <Title mb='xl'>RFID Simulator</Title>


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

        {fetchingRfids
          ? (<Container p='lg'><Center><Loader size='xl' /></Center></Container>)
          : (rfids.rfids ? rfids.rfids.map((rfid) => (
            <Box>
              <Group spacing={0}>
                <ActionIcon onClick={() => rfidLogout({ rfid })}><IconX size={18} color='red' /></ActionIcon>{rfid}
              </Group>
            </Box>
          )) : null)
        }
      </Container>
    </MainLayout>
  );
};

export default RFIDs;
