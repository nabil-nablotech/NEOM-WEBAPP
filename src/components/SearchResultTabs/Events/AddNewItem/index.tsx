import {
  Box,
  Button as DefaultButton,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Chip
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  AddNewItemProps,
  StepContentTypes,
  InitialValues,
} from "../../../../types/CustomDrawerTypes";
import { tabNameProps } from "../../../../types/SearchResultsTabsProps";
import { addItemDefaultSteps, handleEnter } from "../../../../utils/services/helpers";
import styles from "../../Places/AddNewItem/addNewItem.module.css";
import TextInput from "../../../../components/TextInput";
import Button from "../../../../components/Button";
import DropdownComponent from "../../../Dropdown/index";
import AutoCompleteSingleSelect from "../../../AutoComplete/singleSelect";
import AutoComplete from "../../../AutoComplete";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleNewItemWindow, toggleShowAddSuccess } from "../../../../store/reducers/searchResultsReducer";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import CustomSearchField from "../../../SearchField";
import { SelectChangeEvent } from "@mui/material/Select";
import { useFormik } from "formik";
import ReactDatePicker from "react-datepicker";

const commonSelectSxStyles = {
  textAlign: "left",
  "& .MuiSelect-select": {
    padding: "0.5em 1em",
    color: "var(--grey-text)",
  },
};
const textInputSxStyles = {
  "& .MuiInputBase-input.MuiOutlinedInput-input": {
    border: "none",
  },
  "& .MuiFormLabel-root.MuiInputLabel-root ": {},
  "& .MuiInputBase-input.MuiOutlinedInput-input ": {
    lineHeight: "1.2",
    border: "1.4px solid #fff",
    padding: "0.5em 1em",
    height: "1.4em",
  },
  "& .MuiOutlinedInput-notchedOutline span": {
    opacity: 1,
  },
  "& .MuiOutlinedInput-notchedOutline legend": {
    color: "transparent",
  },
};
const commonFormControlSxStyles = {
  width: "100%",
  flexGrow: 0,
  "& .MuiInputBase-root": {
    backgroundColor: "#fff",
  },
};

export const stepperIconSx = {
  color: "#fff",
  border: "1px solid var(--table-black-text)",
  borderRadius: "50%",
  "& .MuiStepIcon-text": {
    fill: "var(--table-black-text)",
  },
  "&.MuiStepIcon-root.Mui-active .MuiStepIcon-text": {
    fill: "#fff",
  },
  "&.MuiStepIcon-root.Mui-active, &.MuiStepIcon-root.Mui-completed": {
    color: "var(--table-black-text)",
    border: "none",
  },
};

const StepContent = ({
  tabName,
  options,
  formState,
  setFormState,
  activeStep,
  steps,
  handleNext,
  handleBack,
  formik,
  places,
}: StepContentTypes) => {

  const [currentKeyword, setCurrentKeyword] = useState<string>('')

  return (
    <>
      <Box component="div" className={`${styles["form"]}`}>
        {activeStep === 0 && (
          <>
            {/* <CustomSearchField
              handleChangeParent={(e) => {
                // setFormState((state: any) => ({
                //     ...state,
                //     search: e.target.value
                // }))
              }}
              // onKeyDown={onKeyDown}
              className={`${styles["custom-search-field"]}`}
              shouldHandleChangeFromParent={true}
              valueFromParent={formState.search}
            /> */}
            <TextInput
              className={`${styles["visit-number"]}`}
              label="Event Number"
              required
              name="visit-number"
              value={formik.values.visitNumber}
              onChange={(e) => {
                formik.setFieldValue("visitNumber", e.target.value);
              }}
              sx={{
                ...textInputSxStyles,
                "& .MuiInputBase-inputMultiline": {
                  paddingInline: "0 !important",
                },
              }}
              formControlSx={commonFormControlSxStyles}
            />
            <AutoCompleteSingleSelect
              className={`${styles["custom-search-field"]}`}
              label="Search Place"
              placeholder="Search Place"
              value={formState.search}
              handleClear={() => {}}
              itemsList={places || []}
              handleSelectChange={(e, value, r, d) =>
                formik.setFieldValue("place", value)
              }
              selectStylesSx={commonFormControlSxStyles}
            />
            <ReactDatePicker
              placeholderText="Event Date"
              className={`${styles["date"]}`}
              selected={formik.values.eventDate && new Date(formik.values.eventDate)}
              onChange={(date: Date) => formik.setFieldValue("eventDate", date)}
            />
            <DropdownComponent
              className={`${styles["assessment-type"]}`}
              label={"Assessment Type"}
              name="assessment-type"
              value={formik.values.assessmentType}
              handleChange={(e: SelectChangeEvent<string | string[]>) =>
                formik.setFieldValue("assessmentType", e.target.value as string)
              }
              itemsList={options?.assessmentType || []}
              selectStylesSx={commonSelectSxStyles}
              formControlSx={commonFormControlSxStyles}
            />
            <TextInput
              className={`${styles["recording-team"]}`}
              label="Recording Team"
              name="recording-team"
              multiline
              minRows={2}
              maxRows={2}
              value={formik.values.recordingTeam}
              onChange={(e) => {
                formik.setFieldValue("recordingTeam", e.target.value);
              }}
              sx={{
                ...textInputSxStyles,
                marginBottom: "3em",
                "& .MuiInputBase-inputMultiline": {
                  paddingInline: "0 !important",
                },
              }}
              formControlSx={commonFormControlSxStyles}
            />
            <TextInput
              className={`${styles["site-description"]}`}
              label="Site Description"
              name="site-description"
              multiline
              minRows={3}
              maxRows={3}
              value={formik.values.siteDescription}
              onChange={(e) => {
                formik.setFieldValue("siteDescription", e.target.value);
              }}
              sx={{
                ...textInputSxStyles,
                marginBottom: "4em",
                "& .MuiInputBase-inputMultiline": {
                  paddingInline: "0 !important",
                },
              }}
              formControlSx={commonFormControlSxStyles}
            />
            <DropdownComponent
              className={`${styles["site-type"]}`}
              label={"Site Type"}
              name="site-type"
              value={formik.values.siteType}
              handleChange={(e: SelectChangeEvent<string | string[]>) =>
                formik.setFieldValue("siteType", e.target.value as string)
              }
              itemsList={options?.siteType || []}
              selectStylesSx={commonSelectSxStyles}
              formControlSx={commonFormControlSxStyles}
            />
            <AutoComplete
              className={`${styles["period"]}`}
              label={"Period"}
              name="period"
              multiple={true}
              value={formik.values.period}
              handleClear={() => {}}
              handleSelectChange={(e, value) =>
                formik.setFieldValue("period", value)
              }
              // handleSChange={(e: SelectChangeEvent<string | string[]>) =>
              //   formik.setFieldValue("period", e.target.value as string)
              // }
              itemsList={options?.period || []}
              selectStylesSx={commonSelectSxStyles}
              formControlSx={commonFormControlSxStyles}
            />
            <TextInput
              className={`${styles["field-narrative"]}`}
              label="Field Narrative"
              name="field-narrative"
              multiline
              minRows={3}
              maxRows={3}
              value={formik.values.fieldNarrative}
              onChange={(e) => {
                formik.setFieldValue("fieldNarrative", e.target.value);
              }}
              sx={{
                ...textInputSxStyles,
                marginBottom: "4em",
                "& .MuiInputBase-inputMultiline": {
                  paddingInline: "0 !important",
                },
              }}
              formControlSx={commonFormControlSxStyles}
            />
            <DropdownComponent
              className={`${styles["artifacts"]}`}
              label={"Artifacts"}
              name="artifacts"
              value={formik.values.artifacts}
              handleChange={(e: SelectChangeEvent<string | string[]>) =>
                formik.setFieldValue("artifacts", e.target.value as string)
              }
              itemsList={options?.artifacts || []}
              selectStylesSx={commonSelectSxStyles}
              formControlSx={commonFormControlSxStyles}
            />
            <TextInput
              className={`${styles["latitude"]}`}
              label="Latitude"
              name="latitude"
              type="number"
              value={formik.values.latitude}
              onChange={(e) => {
                formik.setFieldValue("latitude", e.target.value);
              }}
              sx={{
                ...textInputSxStyles,
                "& .MuiInputBase-inputMultiline": {
                  paddingInline: "0 !important",
                },
              }}
              formControlSx={commonFormControlSxStyles}
            />
            <TextInput
              className={`${styles["longitude"]}`}
              label="Longitude"
              name="longitude"
              type="number"
              value={formik.values.Longitude}
              onChange={(e) => {
                formik.setFieldValue("Longitude", e.target.value);
              }}
              sx={{
                ...textInputSxStyles,
                "& .MuiInputBase-inputMultiline": {
                  paddingInline: "0 !important",
                },
              }}
              formControlSx={commonFormControlSxStyles}
            />
            <DropdownComponent
              className={`${styles["state-of-conservation"]}`}
              label={"State of conservation"}
              name="stateOfConservation"
              value={formik.values.stateOfConservation}
              handleChange={(e: SelectChangeEvent<string | string[]>) =>
                formik.setFieldValue("stateOfConservation", e.target.value as string)
              }
              itemsList={options?.stateOfConservation || []}
              selectStylesSx={commonSelectSxStyles}
              formControlSx={commonFormControlSxStyles}
            />
            <DropdownComponent
              className={`${styles["risk"]}`}
              label={"Risk"}
              name="risk"
              value={formik.values.risk}
              handleChange={(e: SelectChangeEvent<string | string[]>) =>
                formik.setFieldValue("risk", e.target.value as string)
              }
              itemsList={options?.risk || []}
              selectStylesSx={commonSelectSxStyles}
              formControlSx={commonFormControlSxStyles}
            />
            
            <DropdownComponent
              className={`${styles["tourism-value"]}`}
              label={"Tourism Value"}
              name="tourismValue"
              value={formik.values.tourismValue}
              handleChange={(e: SelectChangeEvent<string | string[]>) =>
                formik.setFieldValue("tourismValue", e.target.value as string)
              }
              itemsList={options?.tourismValue || []}
              selectStylesSx={commonSelectSxStyles}
              formControlSx={commonFormControlSxStyles}
            />
            <DropdownComponent
              className={`${styles["research-value"]}`}
              label={"Research Value"}
              name="researchValue"
              value={formik.values.researchValue}
              handleChange={(e: SelectChangeEvent<string | string[]>) =>
                formik.setFieldValue("researchValue", e.target.value as string)
              }
              itemsList={options?.researchValue || []}
              selectStylesSx={commonSelectSxStyles}
              formControlSx={commonFormControlSxStyles}
            />
            <DropdownComponent
              className={`${styles["recommendation"]}`}
              label={"Recommendation"}
              name="recommendation"
              value={formik.values.recommendation}
              handleChange={(e: SelectChangeEvent<string | string[]>) =>
                formik.setFieldValue("recommendation", e.target.value as string)
              }
              itemsList={options?.recommendation || []}
              selectStylesSx={commonSelectSxStyles}
              formControlSx={commonFormControlSxStyles}
            />
          </>
        )}
        {activeStep === 1 && (
          <>
            <Box component="div">Make your content discoverable</Box>
            <TextInput
              className={`${styles["english-name"]}`}
              id="keyword-div"
              label="Add Keywords"
              name="keywords"
              value={currentKeyword}
              onChange={(e) => {
                setCurrentKeyword(e.target.value)
              }}
              onKeyDown={e => {
                handleEnter(e, () => {
                  formik.setFieldValue('keywords', [...new Set([...formik.values.keywords, currentKeyword])])
                  setCurrentKeyword('')
                })
              }}
              sx={{
                ...textInputSxStyles
              }}
              formControlSx={commonFormControlSxStyles}
            />
            {
              <Box component="div" style={{
                display: 'flex',
                gap: '5px'
              }}>
                {
                  formik.values.keywords.map((item: string, index: any) => (
                    <Chip key={index} size="small" variant="outlined" label={item}
                      deleteIcon={<CloseIcon fontSize="small" />}
                      onDelete={e => {
                        const newArr = [...formik.values.keywords].filter((element: string) => element !== item)
                        formik.setFieldValue('keywords', [...new Set(newArr)])
                      }}
                    />
                  ))
                }
              </Box>
            }
          </>
        )}
      </Box>
    </>
  );
};

const AddNewEvent = ({ onClose, create }: AddNewItemProps) => {
  let { tabName } = useParams<{ tabName?: tabNameProps }>();

  const { showAddSuccess, places } = useSelector(
    (state: RootState) => state.searchResults
  );
  const { options } = useSelector((state: RootState) => state.refinedSearch);

  const [activeStep, setActiveStep] = useState(0);
  const [formState, setFormState] = useState({
    siteDescription: "",
  });
  const [skipped, setSkipped] = useState(new Set<number>());

  const [steps, setSteps] = useState<Array<string>>(addItemDefaultSteps);
  const [formError, setFormError] = useState<string>('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (showAddSuccess) {
      dispatch(toggleShowAddSuccess(true));
    }
  }, [showAddSuccess]);

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };
  const handleNext = (e: any, data?: any) => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    if (activeStep + 1 === steps.length) {
      if (create) {
        create({
          ...data
        });
      }
      onClose();
      dispatch(toggleShowAddSuccess(true));
      dispatch(toggleNewItemWindow(false))

    }

    setSkipped(newSkipped);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      onClose();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const formik = useFormik({
    initialValues: {
      place: undefined,
      eventDate: undefined,
      recordingTeam: "",
      visitNumber: "",
      siteDescription: "",
      fieldNarrative: "",
      artifacts: "",
      latitude: null,
      longitude: null,
      assessmentType: "",
      stateOfConservation: "",
      siteType: "",
      risk: "",
      tourismValue: "",
      researchValue: "",
      recommendation: "",
      period: [],
      keywords: [],
    },
    validate: values => {
      // if (!values.visitNumber) {
      //   setFormError('Event Number is required')
      // } else {
      //   setFormError('')
      // }
    },
    onSubmit: (values) => {
      if (!formError) {
        handleNext(null, values);
      }
    },
  });

  return (
    <Box component="div">
      <form onSubmit={formik.handleSubmit}>
        <Box component="div" className={`${styles["add-new-item-container"]}`}>
          <Box component="div" className={`${styles["content-section"]}`}>
            <Box
              component="div"
              className={`${styles["hide-btn"]}`}
              style={{
                marginRight: 0,
                marginLeft: "auto",
                width: "fit-content",
              }}
            >
              <DefaultButton
                variant="text"
                onClick={(e) => onClose()}
                style={{
                  // paddingInline: 0,
                  minWidth: "fit-content",
                  padding: 0,
                  color: "var(--table-black-text)",
                }}
              >
                Hide
              </DefaultButton>
            </Box>
            <Typography
              className={`${styles["add-title"]}`}
              variant="h4"
              component="h4"
              style={{}}
            >
              Add Event
            </Typography>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              className={`${styles["stepper"]}`}
            >
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};
                // if (isStepOptional(index)) {
                //     labelProps.optional = (
                //         <Typography variant="caption">Optional</Typography>
                //     );
                // }
                // if (isStepSkipped(index)) {
                //     stepProps.completed = false;
                // }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel
                      {...labelProps}
                      className={`${styles["step-label"]}`}
                      StepIconProps={{
                        sx: {
                          ...stepperIconSx,
                        },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <>
              <React.Fragment>
                <StepContent
                  tabName={tabName}
                  options={options}
                  places={places}
                  formState={formState}
                  setFormState={setFormState}
                  activeStep={activeStep}
                  steps={steps}
                  handleNext={handleNext}
                  formik={formik}
                  handleBack={handleBack}
                />
              </React.Fragment>
            </>
          </Box>
          {formError && <Box component="div" className={`${styles["form-error"]}`}>
            {formError}
          </Box>}
          <Box
            component="div"
            className={`${styles["btn-row"]}`}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              colors={["#fff", "var(--table-black-text)", "none"]}
              className={`${styles["plain-whitee-btn"]}`}
              label={activeStep === 0 ? "Cancel" : "Back"}
              onClick={handleBack}
              style={{
                paddingInline: 0,
              }}
            />
            {/* {isStepOptional(activeStep) && (
                                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                                    Skip
                                                </Button>
                                            )} */}
            <Button
              label={activeStep === steps.length - 1 ? "Add" : "Next"}
              type="submit"
              disabled={!(formik.values.visitNumber.length > 0)}
              // onClick={handleNext}
            />
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default AddNewEvent;
