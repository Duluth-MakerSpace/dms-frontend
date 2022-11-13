import { AppShell } from "@mantine/core";
import { ReactNode } from "react";
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

        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        padding={0}
        // navbar={<Navbar height={100} hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>a</Navbar>}
        header={
          // <Header className={classes.header} height={{ base: 50, md: 70 }} p="md">
          //   <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          //     <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          //       <Burger
          //         opened={opened}
          //         onClick={() => setOpened((o) => !o)}
          //         size="sm"
          //         color={theme.colors.gray[6]}
          //         mr="xl"
          //       />
          //     </MediaQuery>

          //     <Text>Duluth Makerspace</Text>
          //   </div>
          // </Header>
          <HeaderMenuColored />
        }
      // footer={<Footer height={60} p="md">Application footer</Footer>}
      >
        {children}
      </AppShell>

    </div >
  );
};

export default MainLayout;
