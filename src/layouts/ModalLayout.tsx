import { Container, Flex } from "@mantine/core";
import { ReactNode } from "react";





const ModalLayout = ({
  children = null,
  layoutRef = null,
  verticalCenter = false
}: {
  children?: ReactNode;
  layoutRef?: any;
  verticalCenter?: boolean;
}) => {

  return (
    <div ref={layoutRef}>

      <Flex
        mih="100vh"
        gap="md"
        justify={verticalCenter ? "center" : "flex-start"}
        align="center"
        direction="column"
        wrap="wrap"
      >
        <Container sx={{ width: '100%' }}>
          {children}
        </Container>
      </Flex>
    </div >
  );
};

export default ModalLayout;
