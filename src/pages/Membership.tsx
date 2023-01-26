import { Button, Center, Container, createStyles, Loader, Paper, SimpleGrid, Text, ThemeIcon, Title } from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import { IconHeartbeat, IconSchool, IconUser, IconUsers } from "@tabler/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { DEFAULT_DATE } from "../constants/dateFormats";
import { useMembershipQuery, useCreateMembershipMutation, useMeQuery } from '../graphql/graphql';
import MainLayout from "../layouts/MainLayout";
import { alertNotification } from "../utils/alertNotification";

const useStyles = createStyles((theme) => ({
  card: {
    padding: theme.spacing.xl * 1.5,
  },

  ul: {
    paddingLeft: theme.spacing.lg
  }
}));




const Membership = (): JSX.Element => {
  const navigate = useNavigate();
  const [{ data: me, fetching: fetchingMe }] = useMeQuery();
  const [{ data: membership, fetching: fetchingMembership }] = useMembershipQuery();
  // const [{ fetching: fetchingUser, data: user }] = useUserQuery({ variables: { uuid: uuid } });
  const { classes, theme } = useStyles();
  const [layoutRef] = useResizeObserver();
  const [{ fetching: updatingMembership }, updateMembership] = useCreateMembershipMutation();


  function renderPlan(title, icon, description, price, timeunit, details, color = 'red', disabled = false) {

    return (
      <Paper withBorder shadow='md' radius="md" className={classes.card}>
        <Center mt={18} mb={36}>
          <ThemeIcon size={60} radius='xl' variant='light' color={color}>
            {icon}
          </ThemeIcon>
        </Center>
        <Center>
          <Text size={40} weight={100} sx={{ lineHeight: 1 }}>{price}</Text>
          <Text ml={4} weight={100} size={20} sx={{ alignSelf: 'flex-end' }}>{timeunit}</Text>
        </Center>
        <Text size="xl" weight={700} mt='xs'>
          <Center>
            {title}
          </Center >
        </Text>

        <Text mt='lg' color='dimmed'>
          <ul className={classes.ul}>
            <li>Full shop access</li>
          </ul>
        </Text>

        <Button
          size='md'
          fullWidth
          mt='lg'
          disabled={disabled}
          onClick={
            async () => {
              const { data, error } = await updateMembership(details);
              if (error) {
                alertNotification({ message: error.message });
              } else if (data?.createMembership.errors) {
                alertNotification({ message: data?.createMembership.errors[0].message });
                console.log("MAKE A POPUP:", data?.createMembership.errors);
              } else if (data?.createMembership.membership) {
                navigate(0);
              }
            }
          }
          color={color}>Activate membership</Button>
      </Paper >
    )

  }

  return (
    <MainLayout layoutRef={layoutRef}>

      {!me || !me.me || fetchingMe ? null : (
        <Container fluid sx={{ background: "white", boxShadow: theme.shadows.sm }}>
          <Container size="xl" py="xl">
            {
              fetchingMembership || !membership?.membership
                ? <Center><Loader size='xl' /></Center>
                : (
                  <>
                    <Title size='h3'>
                      Your membership is{' '}
                      <Text
                        component="span"
                        inherit
                        variant="gradient"
                        gradient={{ from: 'red', to: 'yellow' }}
                      >{membership.membership?.status} until {dayjs(membership.membership?.expirationDate).format(DEFAULT_DATE)}
                      </Text>
                    </Title>

                    <Text mt='md'>
                      You can add more time below. To cancel or amend your membership, you will need to talk to staff on Slack or in person.
                    </Text>
                  </>
                )
            }



          </Container>
        </Container>
      )}

      <Container size="xl" mb="lg" mt={60}>
        <Text size='lg' weight={700} mb='lg'>Current membership plans</Text>

        <Text mb='lg'>
          For all memberships:
          <ul>
            <li>Full shop access. By default, RFID access is limited to 6 AM to 10 PM, but access can be changed to 24-hour (especially for potters running the kiln overnight!)</li>
            <li>Users must be 18+ years old. Children are allowed in the shop if accompanied by an adult member.</li>
            <li>Members receive $5 off most classes. All members can teach classes, too.</li>
            <li>Materials, heat, and some equipment may have additional fees.</li>
          </ul>
        </Text>

        <SimpleGrid
          cols={3}
          spacing='xl'
        >

          {renderPlan("Monthly rate", <IconUser />, "desc", "$55", "/mo", { cost: 10.00, days: 31, type: "normal" })}
          {renderPlan("Yearly rate", <IconUser />, "desc", "$550", "/yr", { cost: 10.00, days: 365, type: "normal" }, 'violet',)}
          {renderPlan("Create a free account", <IconSchool />, "desc", "Taking a class?", "", null, 'teal', true)}

          {renderPlan("Couples monthly rate", <IconUsers />, "desc", "$75", "/mo", { cost: 10.00, days: 31, type: "couple" })}
          {renderPlan("Couples yearly rate", <IconUsers />, "desc", "$750", "/yr", { cost: 10.00, days: 365, type: "couple" }, 'violet')}
          {renderPlan("Volunteer rate", <IconHeartbeat />, "desc", "Discounted", "", { cost: 10.00, days: 31, type: "volunteer" }, 'teal', true)}


        </SimpleGrid>

      </Container>
    </MainLayout >
  );
};

export default Membership;
