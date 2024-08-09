import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

export const LayoutPage = () => {
  return (
    <Stack justifyContent="center" alignItems="center" height="100%">
      <Outlet />
    </Stack>
  );
};
