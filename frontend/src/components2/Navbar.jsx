import { useColorMode } from "@/components/ui/color-mode";
import { Box, Container, Flex, Text, Button, HStack } from "@chakra-ui/react";
import React from "react";
import { FiPlusSquare } from "react-icons/fi";
import { LuSun } from "react-icons/lu";
import { Link as RouterLink } from "react-router-dom";


import { FaMoon } from "react-icons/fa";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
 
  // Define button colors based on the color mode
  const buttonBgColor = colorMode === "dark" ? "gray.700" : "gray.200"; // Greyish blue for dark mode, light grey for light mode
  const buttonTextColor = colorMode === "dark" ? "white" : "black"; // White text for dark mode, black text for light mode

  return (
    <Box py={4}>
      <Container maxW="1140px">
        <Box px={6} py={3} boxShadow="sm" borderRadius="md">
          <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
              base: "column",
              sm: "row",
            }}
          >
            <Text
              fontSize={{ base: "20px", sm: "28px" }}
              fontWeight="bold"
              textAlign={"center"}
              style={{
                background:
                  "linear-gradient(to right, rgb(84, 159, 245), rgb(30, 116, 235))", // Light blue to dark blue gradient
                WebkitBackgroundClip: "text", // Clips the gradient to the text
                WebkitTextFillColor: "transparent", // Ensures the text itself is transparent
              }}
            >
              <RouterLink to={"/"}> Product Store 🛒 </RouterLink>
            </Text>
            <HStack spacing={2} alignItems={"center"}>
              <RouterLink to={"/create"}>
                <Button
                  aria-label="Add"
                  size="sm"
                  bgColor={buttonBgColor}
                  color={buttonTextColor}
                >
                  {<FiPlusSquare fontSize="20" />}
                </Button>
              </RouterLink>
              <Button
                onClick={toggleColorMode}
                size="sm"
                bgColor={buttonBgColor}
                color={buttonTextColor}
              >
                {colorMode === "dark" ? (
                  <FaMoon size={"20"} />
                ) : (
                  <LuSun size={"20"} />
                )}
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
