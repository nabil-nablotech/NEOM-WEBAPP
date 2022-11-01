import {
  Box,
  Button as DefaultButton,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Chip,
  StepButton,
  Grid,
} from "@mui/material";
import React, { ChangeEventHandler, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AddNewItemProps,
  StepContentTypes,
} from "../../../../types/CustomDrawerTypes";
import { tabNameProps } from "../../../../types/SearchResultsTabsProps";
import {
  addItemDefaultSteps,
  handleEnter,
} from "../../../../utils/services/helpers";
import styles from "../../Places/AddNewItem/addNewItem.module.css";
import TextInput from "../../../../components/TextInput";
import Button from "../../../../components/Button";
import DropdownComponent from "../../../Dropdown/index";
import AutoCompleteSingleSelect from "../../../AutoComplete/singleSelect";
import AutoComplete from "../../../AutoComplete";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  toggleNewItemWindow,
  toggleShowAddSuccess,
} from "../../../../store/reducers/searchResultsReducer";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { SelectChangeEvent } from "@mui/material/Select";
import { useFormik } from "formik";
import ReactDatePicker from "react-datepicker";
import { Place } from "../../../../types/Place";
import { setEventEdit } from "../../../../store/reducers/eventReducer";

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
  activeStep,
  steps,
  handleNext,
  handleBack,
  formik,
  places,
  handleChange,
}: StepContentTypes) => {
  const [currentKeyword, setCurrentKeyword] = useState<string>("");

  return (
    <>
      <Box component="div" className={`${styles["form"]}`}>
        {activeStep === 0 && (
          <>
            <AutoCompleteSingleSelect
              className={`${styles["custom-search-field"]}`}
              label="Search Place*"
              placeholder="Search Place*"
              value={formik.Place}
              handleClear={() => {}}
              itemsList={places || []}
              handleSelectChange={(e, value, r, d) =>
                formik.setFieldValue("place", value)
              }
              handleChange={handleChange}
              renderOption={(props, option: any) => (
                <Box
                  component="li"
                  sx={{ display: "flex", justifyContent: "space-between" }}
                  {...props}
                >
                  <Typography>
                    {option.attributes.placeNameEnglish}
                    {option.attributes.placeNameArabic}
                  </Typography>

                  <Typography style={{ float: "right" }}>
                    {option.attributes.placeNumber}
                  </Typography>
                </Box>
              )}
              selectStylesSx={commonFormControlSxStyles}
            />
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

            <ReactDatePicker
              placeholderText="Event Date"
              className={`${styles["date"]}`}
              selected={
                formik.values.eventDate && new Date(formik.values.eventDate)
              }
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
            <AutoComplete
              className={`${styles["period"]}`}
              label={"Site Type"}
              name="site-type"
              value={formik.values.siteType}
              multiple={true}
              handleClear={() => {}}
              handleSelectChange={(e, value) =>
                formik.setFieldValue("siteType", value)
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
                formik.setFieldValue(
                  "stateOfConservation",
                  e.target.value as string
                )
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
                setCurrentKeyword(e.target.value);
              }}
              onKeyDown={(e) => {
                handleEnter(e, () => {
                  formik.setFieldValue("keywords", [
                    ...new Set([...formik.values.keywords, currentKeyword]),
                  ]);
                  setCurrentKeyword("");
                });
              }}
              sx={{
                ...textInputSxStyles,
              }}
              formControlSx={commonFormControlSxStyles}
            />
            {
              <Box
                component="div"
                style={{
                  display: "flex",
                  gap: "5px",
                }}
              >
                {formik.values.keywords.map((item: string, index: any) => (
                  <Chip
                    key={index}
                    size="small"
                    variant="outlined"
                    label={item}
                    deleteIcon={<CloseIcon fontSize="small" />}
                    onDelete={(e) => {
                      const newArr = [...formik.values.keywords].filter(
                        (element: string) => element !== item
                      );
                      formik.setFieldValue("keywords", [...new Set(newArr)]);
                    }}
                  />
                ))}
              </Box>
            }
          </>
        )}
      </Box>
    </>
  );
};

const AddNewEvent = ({ onClose, create, setSearchValue }: AddNewItemProps) => {
  let { tabName } = useParams<{ tabName?: tabNameProps }>();

  const { showAddSuccess } = useSelector(
    (state: RootState) => state.searchResults
  );
  const { edit, event } = useSelector((state: RootState) => state.event);
  const { options } = useSelector((state: RootState) => state.refinedSearch);
  const { places } = useSelector((state: RootState) => state.event);

  const [activeStep, setActiveStep] = useState(0);

  const [skipped, setSkipped] = useState(new Set<number>());

  const [steps, setSteps] = useState<Array<string>>(addItemDefaultSteps);
  const [formError, setFormError] = useState<string>("");

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
      if (create && !edit) {
        create({
          ...data,
        });
      }
      onClose();
      dispatch(toggleShowAddSuccess(true));
      dispatch(toggleNewItemWindow(false));
    }
    if (edit && create) {
      create({
        ...data,
      });
      onClose();
      dispatch(toggleNewItemWindow(false));
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

  const handleStep = (step: number) => () => {
    if (activeStep > step) {
      setActiveStep(step);
    }
  };

  const formik = useFormik({
    initialValues: {
      place: edit ? event?.visit_associate?.place_unique_id : undefined,
      eventDate:
        edit && event.visitDate ? new Date(event.visitDate) : undefined,
      recordingTeam: edit ? event?.recordingTeam : "",
      visitNumber: edit ? event.visitNumber : "",
      siteDescription: edit ? event?.siteDescription : "",
      fieldNarrative: edit ? event?.fieldNarrative : "",
      artifacts: edit ? event?.artifacts[0] : "",
      latitude: edit ? event?.latitude : null,
      longitude: edit ? event?.longitude : null,
      assessmentType: edit ? event?.assessmentType[0] : "",
      stateOfConservation: edit ? event?.stateOfConservation[0] : "",
      siteType: edit ? event?.siteType : [],
      risk: edit ? event?.risk[0] : "",
      tourismValue: edit ? event?.tourismValue[0] : "",
      researchValue: edit ? event?.researchValue[0] : "",
      recommendation: edit ? event?.recommendation[0] : "",
      period: edit ? event?.period : [],
      keywords: edit ? event?.keywords : [],
    },
    validate: (values) => {
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

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (setSearchValue) {
      setSearchValue(e.target.value);
    }
  };

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
              {edit ? "Edit" : "Add"} Event
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
                    <StepButton color="inherit" onClick={handleStep(index)}>
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
                    </StepButton>
                  </Step>
                );
              })}
            </Stepper>
            <>
              <React.Fragment>
                {edit && event && (
                  <Box component="div" className={`${styles['visit-count']}`}>
                    {event.visitNumber || event?.attributes.visitNumber}
                  </Box>
                )}
                <StepContent
                  tabName={tabName}
                  options={options}
                  places={places}
                  activeStep={activeStep}
                  steps={steps}
                  handleNext={handleNext}
                  formik={formik}
                  handleBack={handleBack}
                  handleChange={handleChange}
                />
              </React.Fragment>
            </>
          </Box>
          {formError && (
            <Box component="div" className={`${styles["form-error"]}`}>
              {formError}
            </Box>
          )}
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
            <Grid item display={"flex"}>
              {!edit && (
                <Button
                  label={activeStep === steps.length - 1 ? "Add" : "Next"}
                  type="submit"
                  disabled={
                    !(
                      formik.values.visitNumber.length > 0 &&
                      formik.values.place
                    )
                  }
                  // onClick={handleNext}
                />
              )}
              {edit && activeStep !== steps.length - 1 && (
                <Button
                  colors={["#fff", "var(--table-black-text)", "none"]}
                  label={"Next"}
                  type="submit"
                  disabled={
                    !(
                      formik.values.visitNumber.length > 0 &&
                      formik.values.place
                    )
                  }
                  // onClick={handleNext}
                />
              )}
              {edit && (
                <Button
                  label={"Update"}
                  type="submit"
                  // disabled={!(formik.values.visitNumber.length > 0 && formik.values.place)}
                  // onClick={handleNext}
                />
              )}
            </Grid>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default AddNewEvent;
