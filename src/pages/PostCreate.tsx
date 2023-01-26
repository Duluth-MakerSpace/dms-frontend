import { Button, Container, createStyles, Grid, Group, Select, Tabs, Text, Textarea, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useResizeObserver } from "@mantine/hooks";
import { IconArticle, IconEdit } from "@tabler/icons";
import { useNavigate, useParams } from "react-router-dom";
import MarkdownDisplay from "../components/MarkdownDisplay";
import MarkdownEditor from "../components/MarkdownEditor";
import { useCalendarClassQuery, useMeQuery } from '../graphql/graphql';
import MainLayout from "../layouts/MainLayout";

const useStyles = createStyles((theme, _params, getRef) => ({

}));

const Post = (): JSX.Element => {
  const navigate = useNavigate();
  const { title, uuid } = useParams();
  const [{ data: me, fetching: loginFetching }] = useMeQuery();
  const [{ fetching: fetchingCalendarClass, data: calendarClass }] = useCalendarClassQuery({ variables: { uuid: uuid } });
  const { classes } = useStyles();
  const [layoutRef] = useResizeObserver();

  // const [{ fetching: posting }, createPost] = useCreatePostMutation();
  const posting = false;

  const form = useForm({
    initialValues: {
      title: '',
      content: '',
      type: '',
    },
    validate: (values) => {
      return {
        // email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
      };
    },
  });


  return (
    <MainLayout layoutRef={layoutRef}>
      <Container size="md" mb="lg" pt={60}>

        <Title>Create a post</Title>

        <Tabs defaultValue="edit" mt='xl'>
          <Tabs.List>
            <Tabs.Tab value="edit" icon={<IconEdit size={18} />}><Text size='lg'>Edit post</Text></Tabs.Tab>
            <Tabs.Tab value="preview" icon={<IconArticle size={18} />}><Text size='lg'>Preview</Text></Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="edit" pt="xs">

            <Container p='md'>
              <form onSubmit={form.onSubmit(
                async (values) => {
                  console.log('Make post');
                  // const response = await login({ email: values.email, password: values.password });
                  // if (response.data?.login.errors) {
                  //   form.setErrors(toErrorMap(response.data.login.errors));
                  // } else if (response.data?.login.user) {
                  //   navigate(state && state.previousPath ? state.previousPath : "/")
                  // }
                },
                (validationErrors) => {
                  form.setErrors(validationErrors);
                }
              )}>
                <Grid>
                  <Grid.Col span={6}>
                    <TextInput
                      label="Title"
                      size='md'
                      placeholder="Post title"
                      {...form.getInputProps('title')}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Select
                      label="Post type"
                      size='md'
                      placeholder="Pick one"
                      data={[
                        { value: 'project', label: 'Project' },
                        { value: 'request', label: 'Request' },
                        { value: 'news', label: 'News' },
                      ]}
                      {...form.getInputProps('type')}
                    />
                  </Grid.Col>

                  <Grid.Col span={12} mt='md' >
                    <MarkdownEditor></MarkdownEditor>
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Textarea
                      size='md'
                      placeholder="Post content"
                      label="Content"
                      mt='md'
                      minRows={6}
                      {...form.getInputProps('content')}
                    />
                  </Grid.Col>
                </Grid>

                <Group position="right" mt="xl" >
                  <Button type="submit" size='md' loading={posting}>Create post</Button>
                </Group>
              </form>
            </Container>


          </Tabs.Panel>

          <Tabs.Panel value="preview" pt="xs">
            <Title>{form.values.title}</Title>
            <MarkdownDisplay markdown={form.values.content} />
          </Tabs.Panel>
        </Tabs>


      </Container>
    </MainLayout >
  );
};

export default Post;
