import {
  Alert, Button, Checkbox, Container, Group, PasswordInput, Select, SimpleGrid, Stepper, Text,
  TextInput,
  Title
} from "@mantine/core";
import { useForm } from '@mantine/form';
import { useResizeObserver } from "@mantine/hooks";
import { IconBulb, IconId, IconShieldHalfFilled, IconUser } from "@tabler/icons";
import { useState } from 'react';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input/input';
import { useNavigate } from "react-router-dom";
import { DMS_PHONE } from "../constants/makerspace";
import { useRegisterMutation } from "../graphql/graphql";
import ModalLayout from "../layouts/ModalLayout";
import { toErrorMap } from "../utils/toErrorMap";


const Register = (): JSX.Element => {
  const navigate = useNavigate();
  const [{ fetching: registering }, register] = useRegisterMutation();
  const [layoutRef] = useResizeObserver();
  const [active, setActive] = useState(0);
  // const [phoneNumber, setPhoneNumber] = useState()

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      name: '',
      phone: '',
      emergPhone: '',
      emergContact: '',
      waiverSigned: false,
      newsletter: true,
      privacyLevel: 1,
    },

    validate: (values) => {
      if (active === 0) {
        return {
          email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
          name: !values.name.includes(' ') ? 'Please include your full name' : null,
          password:
            values.password.length < 6 ? 'Password must include at least 6 characters' : null,
        };
      }

      if (active === 1) {
        return {
          emergContact: values.emergContact.trim().length < 2 ? 'Please list emergency contact, just in case' : null,
          emergPhone: values.emergPhone.trim().length < 2 ? 'Give an emergency phone number in case of emergency' : null,
        };
      }

      if (active === 2) {
        return {
        }
      }

      return {};
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));


  const people = [
    { name: "Sam Maloof", email: "smaloof@email.com" },
    { name: "George Nakashima", email: "gnakashima@email.com" },
    { name: "James Krenov", email: "jkrenov@email.com" },
    { name: "Norm Abram", email: "nabram@email.com" }];
  const person = people[Math.floor(Math.random() * people.length)];


  return (
    <ModalLayout layoutRef={layoutRef}>

      <Container size='sm' mt={40} mb={40}>
        <Title align="center">
          Create account
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Create an account to manage shop access, sign up for classes, and more.
        </Text>

        <Container my={50}>
          <form onSubmit={form.onSubmit(
            async (values) => {
              const response = await register({
                privacyLevel: values.privacyLevel,
                newsletter: values.newsletter,
                password: values.password,
                waivered: values.waiverSigned,
                email: values.email,
                emergPhone: values.emergPhone,
                emergContact: values.emergContact,
                phone: values.phone,
                name: values.name
              });
              if (response.data?.createUser.errors) {
                form.setErrors(toErrorMap(response.data.createUser.errors));
              } else if (response.data?.createUser.user) {
                navigate("/")
              }
            },
            (validationErrors) => {
              form.setErrors(validationErrors);
            }
          )}>
            <Stepper active={active} breakpoint="sm">
              <Stepper.Step icon={<IconUser size={18} />} label="Account info" description="Required">
                <TextInput label="Name" placeholder={person.name} {...form.getInputProps('name')} required mt="md" />
                <TextInput label="Email" placeholder={person.email} {...form.getInputProps('email')} required mt="md" />
                <PasswordInput label="Password" placeholder="Your password" {...form.getInputProps('password')} required mt="md" />
              </Stepper.Step>

              <Stepper.Step icon={<IconShieldHalfFilled size={18} />} label="Waiver" description="Required">
                <Text>
                  <Checkbox
                    label="I agree to sign the waiver."
                    {...form.getInputProps('waiverSigned', { type: 'checkbox' })}
                  />
                  <SimpleGrid cols={2}>
                    <PhoneInput
                      {...form.getInputProps('phone')}
                      placeholder={DMS_PHONE}
                      inputComponent={TextInput}
                      required
                      label="Phone"
                      mt="md"
                      maxLength={14}
                      error={form.values.phone ? (isPossiblePhoneNumber(form.values.phone) ? null : 'Invalid phone number') : 'Invalid phone number'}
                      country="US" />
                    <PhoneInput
                      {...form.getInputProps('emergPhone')}
                      placeholder={DMS_PHONE}
                      inputComponent={TextInput}
                      required
                      label="Emergency Contact Phone"
                      mt="md"
                      maxLength={14}
                      error={form.values.emergPhone ? (isPossiblePhoneNumber(form.values.emergPhone) ? null : 'Invalid phone number') : 'Invalid phone number'}
                      country="US" />
                    <TextInput label="Emergency Contact" placeholder="Name" {...form.getInputProps('emergContact')} required mt="md" />
                  </SimpleGrid>
                </Text>
              </Stepper.Step>

              <Stepper.Step icon={<IconId size={18} />} label="Extra details" description="Optional">
                <Container size='sm' my='md'>
                  <Alert icon={<IconBulb size={26} />} title="Don't worry!" variant='filled' color="teal">
                    You will be able to edit these profile fields and more after your account is created!
                  </Alert>
                </Container>
                <Select
                  label="Privacy level"
                  {...form.getInputProps('privacyLevel')}
                  mt={'md'}
                  data={[
                    { value: 1, label: 'Low' },
                    { value: 2, label: 'Medium' },
                    { value: 3, label: 'High' },
                  ]}
                />
                <Checkbox
                  mt={'md'}
                  label="Include me in optional emails such as newsletters"
                  {...form.getInputProps('newsletter', { type: 'checkbox' })}
                />
              </Stepper.Step>
            </Stepper>

            <Group position="right" mt="xl">
              {active !== 0 && (
                <Button variant="default" onClick={prevStep}>
                  Back
                </Button>
              )}
              {active !== 3 ? <Button onClick={nextStep}>Next</Button> : <Button type="submit" loading={registering}>Finish</Button>}
            </Group>
          </form>
        </Container>

      </Container>
    </ModalLayout>
  );
};

export default Register;
