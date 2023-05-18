import { GridColumnMenuContainer,GridToolbarFilterButton } from "@mui/x-data-grid";

  

const CustomColumnMenu = (props) => {
    const { hideMenu, currentColumn, open, field } = props;
    return (
      <GridColumnMenuContainer
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        open={open}
      >
        <GridToolbarFilterButton onClick={hideMenu} column={currentColumn} field={field} />
        {/* <GridColumnMenuHideItem onClick={hideMenu} column={currentColumn} /> */}
      </GridColumnMenuContainer>
    );
}

export default CustomColumnMenu
