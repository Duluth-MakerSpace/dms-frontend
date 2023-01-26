import {
  Anchor, Button, Checkbox, Container,
  Group, PasswordInput, Text,
  TextInput,
  Title
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useResizeObserver } from "@mantine/hooks";
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from "../graphql/graphql";
import ModalLayout from "../layouts/ModalLayout";
import { toErrorMap } from "../utils/toErrorMap";


const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [{ fetching }, login] = useLoginMutation();
  const [layoutRef] = useResizeObserver();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      stayLoggedIn: false,
    },
    validate: (values) => {
      return {
        email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
      };
    },
  });

  return (
    <ModalLayout verticalCenter layoutRef={layoutRef} >

      <Container size={'xs'} mb={40}>
        <Title align="center">
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Please log in to manage shop access, classes, and more.
        </Text>

        <Container px={80} py={30} >
          <form onSubmit={form.onSubmit(
            async (values) => {
              const response = await login({ email: values.email, password: values.password });
              if (response.data?.login.errors) {
                form.setErrors(toErrorMap(response.data.login.errors));
              } else if (response.data?.login.user) {
                navigate(state && state.previousPath ? state.previousPath : "/")
              }
            },
            (validationErrors) => {
              form.setErrors(validationErrors);
            }
          )}>
            <TextInput label="Email" placeholder="email@duluthmakerspace.com"  {...form.getInputProps('email')} required />
            <PasswordInput label="Password" placeholder="Your password" {...form.getInputProps('password')} required mt="md" />
            <Group position="apart" mt="md">
              <Checkbox label="Remember me" {...form.getInputProps('stayLoggedIn', { type: 'checkbox' })} />
              <Anchor href="/reset-password" size="sm">
                Forgot password?
              </Anchor>
            </Group>
            <Button type="submit" fullWidth mt="xl" loading={fetching}>
              Sign in
            </Button>
          </form>
        </Container>

        <Text color="dimmed" size="sm" align="center">
          Don't have an account yet?{' '}
          <Anchor href="/register" size="sm">
            Create one!
          </Anchor>
        </Text>
      </Container>
    </ModalLayout >
  );
};

export default Login;