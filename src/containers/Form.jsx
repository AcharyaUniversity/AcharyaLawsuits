import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import useAlert from "../hooks/useAlert";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import apiUrl from "../services/api";
import axios from "axios";

const initValues = {
  caseType: "",
  caseNumber: "",
  advoName: "",
  advoContact: "",
  appealRef: "",
  plantiff: "",
  defendants: "",
  court: "",
  lastHearing: null,
  nextHearing: null,
  stageOfCase: "",
  caseContent: "",
  caseResult: "",
  remarks: "",
};

const requiredFields = [
  "caseType",
  "caseNumber",
  "advoName",
  "advoContact",
  "plantiff",
  "defendants",
  "court",
  "stageOfCase",
  "caseContent",
  "caseResult",
  "remarks",
];

function Form() {
  const [values, setValues] = useState(initValues);
  const [courtOptions, setCourtOptions] = useState([]);
  const [invalid, setInvalid] = useState(false);

  const { setAlertMessage, setAlertOpen } = useAlert();

  useEffect(() => {
    getCourtOptions();
  }, []);

  const getCourtOptions = async () => {
    await axios(`${apiUrl}/court`)
      .then((res) =>
        setCourtOptions(
          res.data.data.map((obj) => ({
            value: obj.court_id,
            label: obj.court_name,
          }))
        )
      )
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    requiredFields.forEach((field) => {
      if (!values[field]) {
        setInvalid(true);
        setAlertMessage({
          severity: "error",
          title: "Invalid entries",
          message: "Please fill all the required fields",
        });
        setAlertOpen(true);
      }
    });
  };

  return (
    <Box component="form" p={4}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        rowSpacing={4}
        columnSpacing={4}
      >
        {/* 1st row */}
        <>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth required error={invalid && !values.caseType}>
              <InputLabel>Case type</InputLabel>
              <Select
                name="caseType"
                label="Case type"
                value={values.caseType}
                onChange={handleChange}
              >
                <MenuItem value={"10"}>Ten</MenuItem>
                <MenuItem value={"20"}>Twenty</MenuItem>
                <MenuItem value={"30"}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              name="caseNumber"
              label="Case number"
              value={values.caseNumber}
              onChange={handleChange}
              required
              error={invalid && !values.caseNumber}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              name="advoName"
              label="Advocate/Firm name"
              value={values.advoName}
              onChange={handleChange}
              required
              error={invalid && !values.advoName}
            />
          </Grid>
        </>

        {/* 2nd row */}
        <>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              name="advoContact"
              label="Advocate contact"
              value={values.advoContact}
              onChange={handleChange}
              required
              error={invalid && !values.advoContact}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              name="plantiff"
              label="Plantiffs"
              value={values.plantiff}
              onChange={handleChange}
              required
              error={invalid && !values.plantiff}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              name="defendants"
              label="Defendants"
              value={values.defendants}
              onChange={handleChange}
              required
              error={invalid && !values.defendants}
            />
          </Grid>
        </>

        {/* 3rd row */}
        <>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              name="appealRef"
              label="Appeal reference number"
              value={values.appealRef}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                inputFormat="DD/MM/YYYY"
                label="Last hearing"
                value={values.lastHearing}
                onChange={(newValue) => {
                  setValues((prev) => ({ ...prev, lastHearing: newValue }));
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                inputFormat="DD/MM/YYYY"
                label="Next hearing"
                value={values.nextHearing}
                onChange={(newValue) => {
                  setValues((prev) => ({ ...prev, nextHearing: newValue }));
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </>

        {/* 4th row */}
        <>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth required error={invalid && !values.court}>
              <InputLabel>Court</InputLabel>
              <Select
                name="court"
                label="Court"
                value={values.court}
                onChange={handleChange}
              >
                {courtOptions.map((op, i) => {
                  return (
                    <MenuItem key={i} value={op.value}>
                      {op.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl
              fullWidth
              required
              error={invalid && !values.stageOfCase}
            >
              <InputLabel>Stage of the case</InputLabel>
              <Select
                name="stageOfCase"
                label="Stage of the case"
                value={values.stageOfCase}
                onChange={handleChange}
              >
                <MenuItem value={"10"}>Ten</MenuItem>
                <MenuItem value={"20"}>Twenty</MenuItem>
                <MenuItem value={"30"}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl
              fullWidth
              required
              error={invalid && !values.caseResult}
            >
              <InputLabel>Case result</InputLabel>
              <Select
                name="caseResult"
                label="Case result"
                value={values.caseResult}
                onChange={handleChange}
              >
                <MenuItem value={"10"}>Ten</MenuItem>
                <MenuItem value={"20"}>Twenty</MenuItem>
                <MenuItem value={"30"}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </>

        {/* 5th row */}
        <>
          <Grid item flexGrow={1}>
            <TextField
              fullWidth
              multiline
              rows={3}
              name="caseContent"
              label="Case content"
              value={values.caseContent}
              onChange={handleChange}
              required
              error={invalid && !values.caseContent}
            />
          </Grid>
          <Grid item flexGrow={1}>
            <TextField
              fullWidth
              multiline
              rows={3}
              name="remarks"
              label="Remarks"
              value={values.remarks}
              onChange={handleChange}
              required
              error={invalid && !values.remarks}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{ borderRadius: 2, fontSize: "1.1rem" }}
              onClick={() => handleSubmit()}
            >
              <strong>Submit</strong>
            </Button>
          </Grid>
        </>
      </Grid>
    </Box>
  );
}

export default Form;
