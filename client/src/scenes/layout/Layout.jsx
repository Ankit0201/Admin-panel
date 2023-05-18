import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "state/api";
import { useSelector } from "react-redux";
import Header from "components/Header";

const Layout = () => {
  const { userId } = useSelector((state) => state.global);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { data } = useGetUserQuery(userId);
  const { pathname } = useLocation();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const getTitle = () => {
    switch (pathname) {
      case "/customers":
        setTitle("CUSTOMERS");
        setSubtitle("List of Customers. ");
        break;
      case "/products":
        setTitle("PRODUCTS");
        setSubtitle("See your list of products. ");
        break;
      case "/transactions":
        setTitle("TRANSACTIONS");
        setSubtitle("See your list of transactions. ");
        break;
      case "/geography":
        setTitle("GEOGRAPHY");
        setSubtitle("Find where your users are located. ");
        break;
      case "/overview":
        setTitle("OverView");
        setSubtitle("Overview of general revenue and profit. ");
        break;
      case "/daily":
        setTitle("DAILY SALES");
        setSubtitle("Charts of daily sales. ");
        break;
      case "/monthly":
        setTitle("MONTHLY SALES");
        setSubtitle("Charts of monthly sales. ");
        break;
      case "/breakdown":
        setTitle("BREAKDOWN");
        setSubtitle("Breakdown of Sales By Category. ");
        break;
        case "/admin":
        setTitle("ADMIN");
        setSubtitle("Manage admins and list of admins. ");
        break;
        case "/performance":
        setTitle("PERFORMANCE");
        setSubtitle("Track your Affiliate Sales Performance Here. ");
        break;
      default:
        setTitle(null);
        setSubtitle(null);
    }
  };

  useEffect(() => {
    getTitle();
  }, [pathname]);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={(data && data.user) || {}}
        isNonMobile={isNonMobile}
        drawerWidth={isSidebarOpen ? "250px" : "0"}
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          isSidebarOpen={isSidebarOpen}
          user={(data && data.user) || {}}
          setSidebarOpen={setSidebarOpen}
        />
        <Box m="1.5rem 2.5rem">
          {title && <Header title={title} subtitle={subtitle} />}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
