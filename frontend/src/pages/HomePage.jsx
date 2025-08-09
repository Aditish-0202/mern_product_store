import { Container, VStack, Text, SimpleGrid, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "@/store/product";
import { ProductCard } from "@/components2/ProductCard";
import { useColorModeValue } from "@/components/ui/color-mode";

const HomePage = () => {
  const c = useColorModeValue( "gray.300", "rgb(2, 11, 24)" )
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProducts();
        console.log(" products are fetched");
      } catch (error) {
        console.error("Error fetching products: ", error.message);
      }
    };
    fetchData();
  }, [fetchProducts]);
  console.log("products", products);
  console.log("Window width:", window.innerWidth);

  return (
    <Container  maxW={"container.xl"} py={"12"}>
      <VStack spacing={"8"}>
        <Text
          fontSize={" 25px"}
          fontWeight={"bold"}
          style={{
            background:
              "linear-gradient(to right, rgb(84, 159, 245), rgb(30, 116, 235))", // Light blue to dark blue gradient
            WebkitBackgroundClip: "text", // Clips the gradient to the text
            WebkitTextFillColor: "transparent", // Ensures the text itself is transparent
          }}
          textAlign={"center"}
        >
          Current Product 🚀
        </Text>

        {Array.isArray(products) && products.length > 0 ? (
          <Box p={6} bg={c} rounded={"3xl"}>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={12}
              w={"5xl"}
            >
              {products.map((product) => (
                <Box p={4}>
                  <ProductCard key={product._id} product={product} />
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        ) : (
          <Text
            fontSize={"xl"}
            fontWeight={"bold"}
            textAlign={"center"}
            color={"gray.500"}
          >
            No Products found 😥{" "}
            <Link to={"/create"}>
              <Text
                as={"span"}
                color={"blue.500"}
                _hover={{ textDecoration: "underline" }}
              >
                {" "}
                Create a Product{" "}
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
