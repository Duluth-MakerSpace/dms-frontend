import { ActionIcon, AppShell, Image, Container, createStyles, Group, Text, Title, Flex, Box, Center } from "@mantine/core";
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram, IconLocation, IconAddressBook, IconMapPin, IconPhone, IconClock2, IconClock } from "@tabler/icons";
import { ReactNode } from "react";
import { Footer } from "../components/Footer";
import { HeaderMenuColored } from "../components/Header";




const MainLayout = ({
  children = null,
  layoutRef = null,
}: {
  children?: ReactNode;
  layoutRef?: any;
}) => {

  return (
    <div ref={layoutRef}>
      <AppShell
        styles={{
          main: {
            minHeight: 0
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        padding={0}
        // navbar={<Navbar height={100} hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>a</Navbar>}
        header={<HeaderMenuColored />}
        footer={<Footer />}
      >
        {children}
      </AppShell >

    </div >
  );
};

export default MainLayout;
