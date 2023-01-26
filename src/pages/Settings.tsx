import { Avatar, Box, Button, Center, Checkbox, Container, createStyles, FileButton, Grid, Loader, Radio, Select, Text, Textarea, TextInput, Title, Tooltip } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useResizeObserver } from "@mantine/hooks";
import { IconKey, IconPencil, IconSpy } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMeQuery, useUserQuery } from '../graphql/graphql';
import MainLayout from "../layouts/MainLayout";
import { formatPhone } from "../utils/stringUtils";
import { useIsAuth } from "../utils/useIsAuth";

const useStyles = createStyles((theme, _params, getRef) => ({
  sectionHeader: {
    borderBottom: `1px solid ${theme.colors.gray[3]}`,
    fontWeight: 700,
    fontSize: 18,
    marginBottom: 16,
    paddingBottom: 10
  },

  avatarBox: {
    position: "relative"

  },

  avatarEditButton: {
    position: "absolute",
    left: '0px',
    bottom: '8px',
    border: `1px solid ${theme.colors.gray[5]}`,
    boxShadow: '0 0 4px -2px rgba(0, 0, 0, .4)'
  }
}));

const allTitles = [
  { value: '0', label: 'Maker' },
  { value: '1', label: 'Woodworker' },
  { value: '3', label: 'Metalworker' },
  { value: '4', label: 'Potter' },
  { value: '5', label: 'Lapidarist' },
  { value: '6', label: 'Hobbyist' },
  { value: '7', label: 'Enthusiast' },
  { value: '8', label: 'CNC Devotee' },
  { value: '9', label: '3D Printer Expert' },
  { value: '10', label: 'Leatherworker' },
  { value: '11', label: 'Rock Hound' },
  { value: '12', label: 'Likes Lasers' },
  { value: '13', label: 'Seamster' }
];

const Settings = (): JSX.Element => {
  useIsAuth();
  const [{ data: me, fetching: loginFetching }] = useMeQuery();

  const navigate = useNavigate();
  // const { uuid } = useParams();
  const [{ fetching: fetchingUser, data: user }] = useUserQuery({ variables: { uuid: me?.me?.uuid } });
  const { classes } = useStyles();
  const [layoutRef] = useResizeObserver();
  const [avatar, setAvatar] = useState<File | null>(null);

  useEffect(() => {
    console.log(avatar);
  }, [avatar])


  const form = useForm({
    initialValues: {
      phone: '555',
      emergPhone: '666',
      emergContact: '666',
      bio: '',
      newsletter: true,
      allowEmails: true,
      privacyLevel: '2'
    },
    validate: (values) => {
      return {
        // match with Register.tsx
        emergContact: values.emergContact.trim().length < 2 ? 'Please list emergency contact, just in case' : null,
        emergPhone: values.emergPhone.trim().length < 2 ? 'Give an emergency phone number in case of emergency' : null,
      };
    },
  });


  return (
    <MainLayout layoutRef={layoutRef}>
      {fetchingUser
        ? (< Center > <Loader size='xl' /></Center>)
        : !user || !user.user ?
          "TODO. User not found."
          : (<>

            <Container pt={60}>

              <form
              // onSubmit={
              // form.onSubmit(
              //   async (values) => {
              //     const response = await login({ email: values.email, password: values.password });
              //     if (response.data?.login.errors) {
              //       form.setErrors(toErrorMap(response.data.login.errors));
              //     } else if (response.data?.login.user) {
              //       navigate(state && state.previousPath ? state.previousPath : "/")
              //     }
              //   },
              //   (validationErrors) => {
              //     form.setErrors(validationErrors);
              //   }
              // )
              // }
              >
                <Title mb='xl'>Your settings</Title>
                <Grid gutter={80}>
                  <Grid.Col span="auto">

                    <Text className={classes.sectionHeader}>Account</Text>
                    <Grid>
                      <Grid.Col span={6}>
                        <Tooltip label='Contact staff to update this information.'>
                          <TextInput label="Name" placeholder={user.user.name} disabled></TextInput>
                        </Tooltip>
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <Tooltip label='Contact staff to update this information.'>
                          <TextInput label="Email" placeholder={user.user.email} disabled></TextInput>
                        </Tooltip>
                      </Grid.Col>

                      <Grid.Col span={6}>
                        <TextInput {...form.getInputProps('phone')} label="Phone" placeholder={formatPhone(user.user.phone)}></TextInput>
                      </Grid.Col>
                      <Grid.Col span={6}>
                      </Grid.Col>

                      <Grid.Col span={6}>
                        <TextInput {...form.getInputProps('emergContact')} label="Emergency Contact" placeholder='Contact Name'></TextInput>
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <TextInput {...form.getInputProps('emergPhone')} label="Emergency Phone" placeholder='Phone Number'></TextInput>
                      </Grid.Col>
                    </Grid>

                    <Text className={classes.sectionHeader} mt={48}>Profile</Text>

                    <Grid>
                      <Grid.Col span={6}>
                        <Select label="Title" data={allTitles}></Select>
                      </Grid.Col>
                      <Grid.Col span={6}>
                      </Grid.Col>

                      <Grid.Col span={12}>
                        <Textarea {...form.getInputProps('bio')} label="Bio" placeholder="Tell us a little about yourself!" />
                      </Grid.Col>
                    </Grid>


                    <Text className={classes.sectionHeader} mt={48}>Settings</Text>
                    <Grid>
                      <Grid.Col span={12}>
                        <Checkbox.Group
                          label="Email settings"
                          orientation="vertical"
                          spacing="xs"
                        >
                          <Checkbox  {...form.getInputProps('newsletter', { type: 'checkbox' })} value="newsletter" label="Subscribe to newsletter" />
                          <Checkbox  {...form.getInputProps('allowEmails', { type: 'checkbox' })} value="allowEmails" label="Email class updates and important notifications" />
                        </Checkbox.Group>

                      </Grid.Col>

                      <Grid.Col span={12}>
                        <Radio.Group
                          name="privacyLevel"
                          label="Privacy level"
                          {...form.getInputProps('privacyLevel')}
                        >
                          <Radio value="1" label="Low" />
                          <Radio value="2" label="Medium" />
                          <Radio value="3" label="High" />
                        </Radio.Group>
                      </Grid.Col>
                    </Grid>


                  </Grid.Col>
                  <Grid.Col span="content">
                    <Text className={classes.sectionHeader}>Profile picture</Text>
                    <Box className={classes.avatarBox}>
                      <Avatar src={avatar ? URL.createObjectURL(avatar) : null} size={200} color='indigo' radius={200} my='md' >
                        <IconSpy size={150} stroke={1} />
                      </Avatar>
                      <FileButton
                        accept="image/png,image/jpeg"
                        onChange={setAvatar}
                      >
                        {(props) => <Button
                          className={classes.avatarEditButton}
                          variant="white"
                          size='sm'
                          color='gray'
                          leftIcon={<IconPencil size={16} />}
                          {...props}
                        >Edit</Button>
                        }
                      </FileButton>

                    </Box>

                    <Text className={classes.sectionHeader} mt={48}>Actions</Text>
                    <Button
                      component="a"
                      variant='outline'
                      href="/reset-password"
                      leftIcon={<IconKey size={16}
                      />}>Reset password</Button> {/* TODO: break this into separate feature */}

                  </Grid.Col>
                </Grid>
              </form>
            </Container>

          </>)
      }

    </MainLayout >
  );
};

export default Settings;
