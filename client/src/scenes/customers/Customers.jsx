import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import React from "react";
import { useGetCustomersQuery } from "state/api";

const Customers = () => {
  const theme = useTheme();
  const { data: { customers } = {}, isLoading } = useGetCustomersQuery();
  console.log(customers, "co");
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 0.5,
    },
  ];
  return (
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeadersInner": {
            backgroundColor:theme.palette.background.alt,
            color:theme.palette.secondary[100],
            borderBottom:"none",
            width:"100%"
          },
          "& .MuiDataGrid-virtualScroller":{
            backgroundColor:theme.palette.primary.light,
            msOverflowStyle: "none" /* IE and Edge */,
            scrollbarWidth: "none",
          },
          "& .MuiDataGrid-footerContainer":{
            backgroundColor:theme.palette.background.alt,
            color:theme.palette.secondary[100],
            borderTop:"none"
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
            color:`${theme.palette.secondary[200]} !important`,
          },
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <DataGrid
          loading={isLoading || !customers}
          getRowId={(row) => row._id}
          rows={customers || []}
          columns={columns}
          initialState={{
            ...customers,
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 25]}
        ></DataGrid>
      </Box>
    
  );
};

export default Customers;
