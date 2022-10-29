import {
  Box,
  Button as DefaultButton,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  AddNewItemProps,
  StepContentTypes,
  InitialValues,
} from "../../../../types/CustomDrawerTypes";
import { tabNameProps } from "../../../../types/SearchResultsTabsProps";
import { addItemDefaultSteps } from "../../../../utils/services/helpers";
import styles from "./index.module.css";
import TextInput from "../../../../components/TextInput";
import Button from "../../../../components/Button";
import DropdownComponent from "../../../Dropdown/index";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleShowAddSuccess } from "../../../../store/reducers/searchResultsReducer";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import CustomSearchField from "../../../SearchField";
import { SelectChangeEvent } from "@mui/material/Select";
import { useFormik } from "formik";
import ReactDatePicker from "react-datepicker";
import { formatDate } from "../../../../utils/services/helpers";

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
}: StepContentTypes) => {
  return (
    <>
      <Box component="div" className={`${styles["form"]}`}>
        {activeStep === 0 && (
          <>
            <CustomSearchField
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
            />
            <ReactDatePicker
              placeholderText="Date Range"
              className={`${styles["date"]}`}
              selected={formik.values.eventDate}
              onChange={(date: Date) => formik.setFieldValue("eventDate", date)}
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
                marginBottom: "4em",
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
          </>
        )}
        {activeStep === 1 && (
          <>
            <Box component="div">Make your content discoverable</Box>
            <TextInput
              className={`${styles["english-name"]}`}
              label="Add Keywords"
              name="english-name"
              value={formik.values.keywords}
              onChange={(e) => {
                formik.setFieldValue("keywords", e.target.value);
              }}
              sx={{
                ...textInputSxStyles,
              }}
              formControlSx={commonFormControlSxStyles}
            />
          </>
        )}
      </Box>
    </>
  );
};

const AddNewEvent = ({ onClose, create }: AddNewItemProps) => {
  let { tabName } = useParams<{ tabName?: tabNameProps }>();

  const { showAddSuccess } = useSelector(
    (state: RootState) => state.searchResults
  );
  const { options } = useSelector((state: RootState) => state.refinedSearch);

  const [activeStep, setActiveStep] = useState(0);
  const [formState, setFormState] = useState({
    siteDescription: "",
  });
  const [skipped, setSkipped] = useState(new Set<number>());

  const [steps, setSteps] = useState<Array<string>>(addItemDefaultSteps);

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
      onClose();
      dispatch(toggleShowAddSuccess(true));
    }
    if (activeStep === 1) {
      
      if (create) {
        create({
          ...data
        });
      }
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
      place: "",
      eventDate: new Date(),
      recordingTeam: "",
      siteDescription: "",
      fieldNarrative: "",
      siteType: "",
      keywords: "",
    },
    onSubmit: (values) => {
      handleNext(null, values);
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
              // onClick={handleNext}
            />
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default AddNewEvent;
