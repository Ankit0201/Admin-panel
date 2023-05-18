import { Box, useMediaQuery } from "@mui/material";
import { GridLoadingOverlay } from "@mui/x-data-grid";
import Header from "components/Header";
import React from "react";
import { useGetProductsQuery } from "state/api";
import ProductsCard from "./Products-Card";

const Products = () => {
  const { data: { products } = {}, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  console.log(products, "sd");

  return (
    <>
      {products || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4,minmax(0,1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {products.map((item) => {
            return <ProductsCard key={item._id} data={item} />;
          })}
        </Box>
      ) : (
        <>Loading.....</>
      )}
    </>
  );
};

export default Products;
