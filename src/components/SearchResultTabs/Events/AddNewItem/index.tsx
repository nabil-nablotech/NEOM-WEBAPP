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
  setAddNewItemWindowType,
  storeAddItemProgressState,
  toggleAddItemWindowMinimized,
  toggleNewItemWindow,
  toggleShowAddSuccess,
  toggleShowEditSuccess,
} from "../../../../store/reducers/searchResultsReducer";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { SelectChangeEvent } from "@mui/material/Select";
import { useFormik } from "formik";
import ReactDatePicker from "react-datepicker";
import { StepperKeywordsComponent } from "../../../StepperKeywordsComponent";
import StepContent from './form';
import { updateKeywords } from "../../../../api/keywords";

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

const AddNewEvent = ({ onHide, create, setSearchValue }: AddNewItemProps) => {
  let { tabName } = useParams<{ tabName?: tabNameProps }>();

  const { showAddSuccess, addItemProgressState } = useSelector(
    (state: RootState) => state.searchResults
  );
  const { edit, event, places } = useSelector((state: RootState) => state.event);
  const { options } = useSelector((state: RootState) => state.refinedSearch);

  const [activeStep, setActiveStep] = useState(0);

  const [skipped, setSkipped] = useState(new Set<number>());

  const [steps, setSteps] = useState<Array<string>>(addItemDefaultSteps);
  const [formError, setFormError] = useState<string>("");

  const dispatch = useDispatch();

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

    if ((activeStep + 1 === steps.length) && data) {
      if (create && !edit) {
        create({
          ...data,
        });
        handleReset();
        updateKeywords({
          keywords: data.keywords
        }, 'event')
        dispatch(toggleShowAddSuccess(true));
        dispatch(toggleNewItemWindow(false))
      }
      
    }
    if (edit && create && data) {
      create({
        ...data,
      });
      handleReset();
      updateKeywords({
        keywords: data.keywords
      }, 'event')
      dispatch(toggleNewItemWindow(false));
    }

    setSkipped(newSkipped);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      dispatch(toggleNewItemWindow(false))
      dispatch(setAddNewItemWindowType(null))
      handleReset();
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

    dispatch(toggleAddItemWindowMinimized(null))

    /** remove the data when change in add item type window occurs */
    dispatch(storeAddItemProgressState(null))

    
}

  const handleStep = (step: number) => () => {
    if (activeStep > step) {
      setActiveStep(step);
    }
  };


  const formik = useFormik({
    initialValues: {
      place: (edit && event?.visit_associate && event?.visit_associate?.place_unique_id) ? event?.visit_associate?.place_unique_id : {},
      eventDate:
        edit && event.visitDate ? new Date(event.visitDate) : undefined,
      recordingTeam: edit ? event?.recordingTeam : "",
      visitNumber: edit ? event?.visitNumber : "",
      siteDescription: edit ? event?.siteDescription : "",
      fieldNarrative: edit ? event?.fieldNarrative : "",
      artifacts: (edit && event?.artifacts) ? event?.artifacts[0] : "",
      latitude: edit ? event?.latitude : null,
      longitude: edit ? event?.longitude : null,
      assessmentType: (edit && event?.assessmentType && event?.assessmentType?.length) > 0 ? event?.assessmentType[0] : "",
      stateOfConservation: edit && event?.stateOfConservation ? event?.stateOfConservation[0] : "",
      siteType: edit ? event?.siteType : [],
      risk: edit && event?.risk.length > 0 ? event?.risk[0] : "",
      tourismValue: edit && event?.tourismValue?.length > 0 ? event?.tourismValue[0] : "",
      researchValue: edit && event?.researchValue?.length > 0 ? event?.researchValue[0] : "",
      recommendation: edit && event?.recommendation?.length > 0 ? event?.recommendation[0] : "",
      period: (edit && event?.period) ? event?.period : [],
      keywords: (edit && event?.keywords) ? event?.keywords : [],
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

  useEffect(() => {
    /** Effect needed to load history data,
     * and remove the data when change in add item type window occurs
     */
    if (addItemProgressState && addItemProgressState.formData) {

      setActiveStep(addItemProgressState.activeStep)

      Object.keys(addItemProgressState.formData).forEach(keyName => {
        // @ts-ignore
        formik.setFieldValue(keyName, addItemProgressState.formData[keyName])
      })
    }

  }, [])

  const handleHide = () => {
    onHide()

    /** store data when unmounting */
    dispatch(storeAddItemProgressState({
      activeStep: activeStep,
      formData: {
        ...formik.values
      }
    }))
  }

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
                onClick={(e) => handleHide()}
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
                    {event?.visitNumber || event?.attributes?.visitNumber}
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
                  onClick={handleNext}
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
