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

function StageTableData() {
  const [pageSize, setPageSize] = useState(20);
  const [rows, setRows] = useState([]);

  const navigate = useNavigate();

  const columns = [
    { field: "case_no", headerName: "Stage number", flex: 1 },
    { field: "case_type", headerName: "Stage", flex: 1 },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
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
  ];

  const getCases = async () => {
    await axios(
      `${apiUrl}/fetchAllStageOfTheCaseDetail?page=0&page_size=999&sort=created_date`
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

export default StageTableData;
