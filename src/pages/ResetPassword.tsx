import {
  Alert,
  Anchor, Button, Center, Container, PasswordInput, Text, Title
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useResizeObserver } from "@mantine/hooks";
import { IconAlertCircle } from "@tabler/icons";
import { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { SLACK_URL } from "../constants/makerspace";
import { useChangePasswordMutation } from "../graphql/graphql";
import ModalLayout from "../layouts/ModalLayout";
import { toErrorMap } from "../utils/toErrorMap";


const ResetPassword = (): JSX.Element => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [{ fetching: changingPassword }, changePassword] = useChangePasswordMutation();
  const [layoutRef] = useResizeObserver();
  const [tokenError, setTokenError] = useState('');

  const form = useForm({
    initialValues: {
      verifyPassword: '',
      password: '',
    },
    validate: (values) => {
      return {
        verifyPassword: (values.password === values.verifyPassword) ? null : 'Passwords do not match',
      };
    },

  });

  return (
    <ModalLayout verticalCenter layoutRef={layoutRef} >

      <Container size={'xs'} mb={40}>
        <Title align="center">
          Reset password
        </Title>


        <Container px={80} py={30} >
          {tokenError
            ? (
              <>
                <Alert icon={<IconAlertCircle size={24} />} title="Error" color="orange" variant="filled">
                  {tokenError}
                </Alert>
                <Center mt={'lg'}>
                  <Text>
                    <Anchor href={"/reset-password"}>Reset password again?</Anchor>
                  </Text>
                </Center>
              </>
            )
            : (
              <form onSubmit={form.onSubmit(
                async (values) => {
                  const response = await changePassword({ token: token as string, password: values.password });
                  if (response.data?.changePassword.errors) {
                    const errorMap = toErrorMap(response.data.changePassword.errors);
                    if ('token' in errorMap) {
                      setTokenError(errorMap.token)
                    }
                    form.setErrors(errorMap);
                  } else if (response.data?.changePassword.user) {
                    navigate("/")
                  }
                },
                (validationErrors) => {
                  form.setErrors(validationErrors);
                }
              )}>
                <PasswordInput label="New Password" placeholder="New password" {...form.getInputProps('password')} required mt="md" />
                <PasswordInput label="Repeat" placeholder="Repeat password" {...form.getInputProps('verifyPassword')} required mt="md" />
                <Button type="submit" fullWidth mt="xl" loading={changingPassword}>
                  Submit
                </Button>
              </form>
            )}
        </Container>
        {SLACK_URL && (
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Please <Anchor href={SLACK_URL} target="_blank">join our Slack channel</Anchor> if you need more help!
          </Text>
        )}

      </Container>
    </ModalLayout >
  );
};

export default ResetPassword;