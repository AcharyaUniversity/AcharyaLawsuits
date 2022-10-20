import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { dateToString } from "../utils/general";
import apiUrl from "../services/api";
import axios from "axios";

const gridStyle = {
  mb: 7,

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
    { field: "case_no", headerName: "Case number" },
    { field: "case_type", headerName: "Case type" },
    { field: "advocate_or_firm_name", headerName: "Advocate/Firm", flex: 1 },
    {
      field: "advocate_or_firm_contact_no",
      headerName: "Firm contact",
      flex: 1,
    },
    { field: "plaintiffs", headerName: "Plantiffs", flex: 1 },
    { field: "defendants", headerName: "Defendants", flex: 1 },
    { field: "appeal_ref_no", headerName: "Appeal ref" },
    { field: "last_hearing_date", headerName: "Last hearing" },
    { field: "next_hearing_date", headerName: "Next hearing" },
    { field: "court_name", headerName: "Court" },
    { field: "stage_of_the_case", headerName: "Stage" },
    { field: "case_status", headerName: "Result" },
    { field: "case_content", headerName: "Content" },
    { field: "remarks", headerName: "Remarks" },
    {
      field: "edit",
      headerName: "Edit",
      flex: 1,
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
      flex: 1,
      type: "actions",
      getActions: (params) => [
        <Tooltip title="Add hearing">
          <IconButton
            onClick={() => navigate(`/CaseForm/AddHearing/${params.row.id}`)}
          >
            <AddIcon sx={{ color: "green" }} />
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
            last_hearing_date: dateToString(new Date(obj.last_hearing_date)),
            next_hearing_date: dateToString(new Date(obj.next_hearing_date)),
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
