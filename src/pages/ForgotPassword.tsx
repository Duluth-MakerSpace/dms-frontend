import {
  Alert,
  Anchor, Button, Center, Container, Text,
  TextInput,
  Title
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useResizeObserver } from "@mantine/hooks";
import { IconAlertCircle } from "@tabler/icons";
import { useState } from "react";
import { SLACK_URL } from "../constants/makerspace";
import { useForgotPasswordMutation } from "../graphql/graphql";
import ModalLayout from "../layouts/ModalLayout";


const ForgotPassword = (): JSX.Element => {
  const [{ fetching: emailingResetLink }, emailResetLink] = useForgotPasswordMutation();
  const [isComplete, setIsComplete] = useState(false);
  const [layoutRef] = useResizeObserver();

  const form = useForm({
    initialValues: {
      email: '',
    },
  });

  return (
    <ModalLayout verticalCenter layoutRef={layoutRef} >

      <Container size={'xs'} mb={40}>
        {
          isComplete
            ? (<><Alert icon={<IconAlertCircle size={24} />} title="Success" color="teal" variant="outline">
              If this account exists, we sent you an email with a link to reset your password. This link
              expires in 48 hours.
            </Alert>
              <Center mt={'lg'}>
                <Text>
                  <Anchor href={"/"}>Home</Anchor>
                </Text>
              </Center>
            </>)
            : (<>
              <Title align="center">
                Forgot password?
              </Title>
              <Text color="dimmed" size="sm" align="center" mt={5}>
                No problem! We'll email you a link to reset it.
              </Text>

              <Container px={80} py={30} >

                <form onSubmit={form.onSubmit(
                  async (values) => {
                    await emailResetLink({ email: values.email });
                    setIsComplete(true);
                  }
                )}>
                  <TextInput label="Email" placeholder="email@duluthmakerspace.com"  {...form.getInputProps('email')} required />
                  <Button type="submit" fullWidth mt="xl" loading={emailingResetLink}>
                    Submit
                  </Button>
                </form>
              </Container>
              {SLACK_URL && (
                <Text color="dimmed" size="sm" align="center" mt={5}>
                  Please <Anchor href={SLACK_URL} target="_blank">join our Slack channel</Anchor> if you need more help!
                </Text>
              )}
            </>)}

      </Container>
    </ModalLayout >
  );
};

export default ForgotPassword;