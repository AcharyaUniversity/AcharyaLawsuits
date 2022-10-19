import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
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
  plaintiff: "",
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
  "plaintiff",
  "defendants",
  "court",
  "stageOfCase",
  "caseContent",
  "caseResult",
  "remarks",
];

function Form() {
  const [formType, setFormType] = useState("");
  const [values, setValues] = useState(initValues);
  const [courtOptions, setCourtOptions] = useState([]);
  const [invalid, setInvalid] = useState(false);

  const { setAlertMessage, setAlertOpen } = useAlert();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();

  useEffect(() => {
    getCourtOptions();

    if (pathname.toLowerCase() === "/caseform/new") {
      setFormType("new");
    } else if (pathname.toLowerCase().includes("/caseform/update")) {
      setFormType("update");
    } else if (pathname.toLowerCase().includes("/caseform/addhearing")) {
      setFormType("add");
    }
  }, [pathname]);

  useEffect(() => {
    getCaseDetails();
  }, [formType]);

  const getCaseDetails = async () => {
    await axios(`${apiUrl}/courtCases/${id}`)
      .then((res) => {
        setValues({
          caseType: res.data.data.case_type,
          caseNumber: res.data.data.case_no,
          advoName: res.data.data.advocate_or_firm_name,
          advoContact: res.data.data.advocate_or_firm_contact_no,
          appealRef: res.data.data.appeal_ref_no,
          plaintiff: res.data.data.plaintiffs,
          defendants: res.data.data.defendants,
          court: res.data.data.court_id,
          lastHearing:
            formType === "update"
              ? res.data.data.last_hearing_date
              : res.data.data.next_hearing_date,
          nextHearing:
            formType === "update" ? res.data.data.next_hearing_date : null,
          stageOfCase: res.data.data.stage_of_the_case,
          caseContent: res.data.data.case_content,
          caseResult: res.data.data.case_status,
          remarks: res.data.data.remarks,
        });
      })
      .catch((err) => console.log(err));
  };

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

  const requiredFieldsValid = () => {
    for (let i = 0; i < requiredFields.length; i++)
      if (!values[requiredFields[i]]) return false;
    return true;
  };

  const handleCreate = async () => {
    if (!requiredFieldsValid()) {
      setInvalid(true);
      setAlertMessage({
        severity: "error",
        title: "Invalid entries",
        message: "Please fill all the required fields",
      });
      setAlertOpen(true);
    } else {
      setInvalid(false);
      const temp = {
        active: true,
        advocate_or_firm_contact_no: values.advoContact,
        advocate_or_firm_name: values.advoName,
        appeal_ref_no: values.appealRef,
        case_content: values.caseContent,
        case_no: values.caseNumber,
        case_status: values.caseResult,
        case_type: values.caseType,
        court_id: values.court,
        defendants: values.defendants,
        last_hearing_date: values.lastHearing,
        next_hearing_date: values.nextHearing,
        plaintiffs: values.plaintiff,
        remarks: values.remarks,
        stage_of_the_case: values.stageOfCase,
      };
      await axios
        .post(`${apiUrl}/courtCases`, temp)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            navigate("/Index", { replace: true });
            setAlertMessage({
              severity: "success",
              title: "Form submitted",
              message: "Case has been added to the database",
            });
            setAlertOpen(true);
          } else {
            setAlertMessage({
              severity: "error",
              title: "An error occured",
              message: res.data ? res.data.message : "Something went wrong",
            });
            setAlertOpen(true);
          }
        })
        .catch((err) => {
          console.error(err);
          setAlertMessage({
            severity: "error",
            title: "An error occured",
            message: err.data ? err.data.message : "Something went wrong",
          });
          setAlertOpen(true);
        });
    }
  };

  const handleUpdate = async () => {
    if (!requiredFieldsValid()) {
      setInvalid(true);
      setAlertMessage({
        severity: "error",
        title: "Invalid entries",
        message: "Please fill all the required fields",
      });
      setAlertOpen(true);
    } else {
      setInvalid(false);
      const temp = {
        active: true,
        court_cases_id: id,
        advocate_or_firm_contact_no: values.advoContact,
        advocate_or_firm_name: values.advoName,
        appeal_ref_no: values.appealRef,
        case_content: values.caseContent,
        case_no: values.caseNumber,
        case_status: values.caseResult,
        case_type: values.caseType,
        court_id: values.court,
        defendants: values.defendants,
        last_hearing_date: values.lastHearing,
        next_hearing_date: values.nextHearing,
        plaintiffs: values.plaintiff,
        remarks: values.remarks,
        stage_of_the_case: values.stageOfCase,
      };
      await axios
        .put(`${apiUrl}/courtCasesUpdateOnly/${id}`, temp)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            navigate("/Index", { replace: true });
            setAlertMessage({
              severity: "success",
              title: "Form submitted",
              message: "Case has been added to the database",
            });
            setAlertOpen(true);
          } else {
            setAlertMessage({
              severity: "error",
              title: "An error occured",
              message: res.data ? res.data.message : "Something went wrong",
            });
            setAlertOpen(true);
          }
        })
        .catch((err) => {
          console.error(err);
          setAlertMessage({
            severity: "error",
            title: "An error occured",
            message: err.data ? err.data.message : "Something went wrong",
          });
          setAlertOpen(true);
        });
    }
  };

  const handleAddHearing = async () => {
    if (!requiredFieldsValid()) {
      setInvalid(true);
      setAlertMessage({
        severity: "error",
        title: "Invalid entries",
        message: "Please fill all the required fields",
      });
      setAlertOpen(true);
    } else {
      setInvalid(false);
      const temp = {
        active: true,
        court_cases_id: id,
        advocate_or_firm_contact_no: values.advoContact,
        advocate_or_firm_name: values.advoName,
        appeal_ref_no: values.appealRef,
        case_content: values.caseContent,
        case_no: values.caseNumber,
        case_status: values.caseResult,
        case_type: values.caseType,
        court_id: values.court,
        defendants: values.defendants,
        last_hearing_date: values.lastHearing,
        next_hearing_date: values.nextHearing,
        plaintiffs: values.plaintiff,
        remarks: values.remarks,
        stage_of_the_case: values.stageOfCase,
      };
      await axios
        .put(`${apiUrl}/courtCases/${id}`, temp)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            navigate("/Index", { replace: true });
            setAlertMessage({
              severity: "success",
              title: "Form submitted",
              message: `New hearing has been added for ${values.caseNumber}`,
            });
            setAlertOpen(true);
          } else {
            setAlertMessage({
              severity: "error",
              title: "An error occured",
              message: res.data ? res.data.message : "Something went wrong",
            });
            setAlertOpen(true);
          }
        })
        .catch((err) => {
          console.error(err);
          setAlertMessage({
            severity: "error",
            title: "An error occured",
            message: err.data ? err.data.message : "Something went wrong",
          });
          setAlertOpen(true);
        });
    }
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
            <TextField
              fullWidth
              name="caseNumber"
              label="Case number"
              value={values.caseNumber}
              onChange={handleChange}
              required
              error={invalid && !values.caseNumber}
              disabled={formType === "update" || formType === "add"}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth required error={invalid && !values.caseType}>
              <InputLabel>Case type</InputLabel>
              <Select
                name="caseType"
                label="Case type"
                value={values.caseType}
                onChange={handleChange}
              >
                <MenuItem value={"Non criminal"}>Non criminal</MenuItem>
              </Select>
            </FormControl>
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
              name="plaintiff"
              label="Plaintiffs"
              value={values.plaintiff}
              onChange={handleChange}
              required
              error={invalid && !values.plaintiff}
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
                <MenuItem value={"Pending"}>Pending</MenuItem>
                <MenuItem value={"Disclosed"}>Disclosed</MenuItem>
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
                <MenuItem value={"Pending"}>Pending</MenuItem>
                <MenuItem value={"Disclosed"}>Disclosed</MenuItem>
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
              onClick={() => {
                if (formType === "new") handleCreate();
                else if (formType === "update") handleUpdate();
                else if (formType === "add") handleAddHearing();
              }}
            >
              <strong>
                {formType === "new"
                  ? "Create"
                  : formType === "update"
                  ? "Update"
                  : "Add hearing"}
              </strong>
            </Button>
          </Grid>
        </>
      </Grid>
    </Box>
  );
}

export default Form;
