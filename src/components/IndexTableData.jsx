import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import apiUrl from "../services/api";
import axios from "axios";

const gridStyle = {
  mb: 3,

  ".MuiDataGrid-columnSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeaders": {
    background: "rgba(74, 87, 169, 0.1)",
    color: "#46464E",
  },
  ".MuiDataGrid-row": {
    background: "#FEFBFF",
    borderbottom: "1px solid #767680",
  },
};

function IndexTableData() {
  const [pageSize, setPageSize] = useState(20);
  const [rows, setRows] = useState([]);

  const navigate = useNavigate();

  const columns = [
    {
      field: "history",
      headerName: "History",
      width: 75,
      type: "actions",
      getActions: (params) => [
        <Tooltip title="History">
          <IconButton onClick={() => navigate(`/Report/${params.row.id}`)}>
            <HistoryRoundedIcon color="blue" />
          </IconButton>
        </Tooltip>,
      ],
    },
    { field: "case_no", headerName: "Case number", flex: 1 },
    { field: "case_type", headerName: "Case type", flex: 1 },
    {
      field: "advocate_or_firm_name",
      headerName: "Advocate/Firm",
      flex: 1,
      hide: true,
    },
    {
      field: "advocate_or_firm_contact_no",
      headerName: "Firm contact",
      flex: 1,
      hide: true,
    },
    { field: "plaintiffs", headerName: "Plantiffs", flex: 1, hide: true },
    { field: "defendants", headerName: "Defendants", flex: 1 },
    { field: "appeal_ref_no", headerName: "Appeal ref", flex: 1, hide: true },
    { field: "last_hearing_date", headerName: "Last hearing", flex: 1 },
    { field: "next_hearing_date", headerName: "Next hearing", flex: 1 },
    { field: "court_name", headerName: "Court", flex: 1 },
    { field: "stage_of_the_case", headerName: "Stage", flex: 1 },
    { field: "case_status", headerName: "Result", flex: 1 },
    { field: "case_content", headerName: "Content", flex: 1 },
    { field: "remarks", headerName: "Remarks", flex: 1 },
    {
      field: "edit",
      headerName: "Edit",
      width: 0,
      type: "actions",
      getActions: (params) => [
        <Tooltip title="Edit">
          <IconButton
            onClick={() => navigate(`/CaseForm/Update/${params.row.id}`)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>,
      ],
    },
    {
      field: "addHearing",
      headerName: "Add",
      width: 0,
      type: "actions",
      getActions: (params) => [
        <Tooltip title="Add hearing">
          <IconButton
            onClick={() => navigate(`/CaseForm/AddHearing/${params.row.id}`)}
          >
            <AddBoxIcon color="success" />
          </IconButton>
        </Tooltip>,
      ],
    },
  ];

  const getCases = async () => {
    await axios(
      `${apiUrl}/fetchAllCourtCasesDetails?page=0&page_size=999&sort=created_date`
    )
      .then((res) => {
        setRows(
          res.data.data.Paginated_data.content.map((obj) => ({
            ...obj,
          }))
        );
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCases();
  }, []);

  return (
    <DataGrid
      autoHeight
      rows={rows}
      columns={columns}
      getRowId={(row) => row.id}
      components={{
        Toolbar: GridToolbar,
      }}
      componentsProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
      }}
      sx={gridStyle}
      pageSize={pageSize}
      rowsPerPageOptions={[20, 50, 100]}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      scrollbarSize={0}
    />
  );
}

export default IndexTableData;
