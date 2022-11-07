import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "../api/axios";

const gridStyle = {
  my: 2,

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

function Report() {
  const [caseNumber, setCaseNumber] = useState("");
  const [pageSize, setPageSize] = useState(20);
  const [rows, setRows] = useState([]);

  const { id } = useParams();

  const columns = [
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
  ];

  const getCases = async () => {
    await axios(`/api//courtCaseDetailsHistoryOnCaseNo?court_cases_id=${id}`)
      .then((res) => {
        setRows(
          res.data.data.map((obj) => ({
            ...obj,
            id: obj.court_cases_history_id,
          }))
        );
        setCaseNumber(res.data.data[0].case_no);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCases();
  }, []);

  return (
    <Box p={2}>
      <Typography
        component="h1"
        sx={{
          fontSize: "2rem",
          color: "#558",
        }}
      >
        History for the case {caseNumber}
      </Typography>
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
    </Box>
  );
}

export default Report;
