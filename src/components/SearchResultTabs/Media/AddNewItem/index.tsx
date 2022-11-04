import {
  Box,
  Grid,
  Button as DefaultButton,
  Step,
  StepLabel,
  Stepper,
  Typography,
  StepButton,
  Chip,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  AddNewItemProps,
  StepContentTypes,
} from "../../../../types/CustomDrawerTypes";
import { tabNameProps } from "../../../../types/SearchResultsTabsProps";
import {
  addItemDefaultSteps,
  MEDIA_TAB_NAME,
  handleEnter,
} from "../../../../utils/services/helpers";
import styles from "../../Places/AddNewItem/addNewItem.module.css";
import TextInput from "../../../../components/TextInput";
import Button from "../../../../components/Button";
import DropdownComponent from "../../../Dropdown/index";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setAddNewItemWindowType,
  toggleAddItemWindowMinimized,
  toggleNewItemWindow,
  toggleShowAddSuccess,
  toggleAssociationsStepOpen,
  storeAddItemProgressState,
  toggleAssociationsIconDisabled,
} from "../../../../store/reducers/searchResultsReducer";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { addItemMediaSteps, baseUrl } from "./../../../../utils/services/helpers";
import CustomUpload from "../../../Upload/ImageUpload";
import { SelectChangeEvent } from "@mui/material/Select";
import { useFormik } from "formik";
import AutoComplete from "../../../AutoComplete";
import CloseIcon from "@mui/icons-material/Close";

import DetachedIcon from "../../../Icons/DetachedIcon";
import AddedPlaces from "../../../AssociationsList/AddedPlaces";
import AddedEvents from "../../../AssociationsList/AddedEvents";
import StepContent from './form';

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

const AddNewMedia = ({ onHide, create }: AddNewItemProps) => {
  let { tabName } = useParams<{ tabName?: tabNameProps }>();
  const { options } = useSelector((state: RootState) => state.refinedSearch);

  const { showAddSuccess, addItemProgressState } = useSelector(
    (state: RootState) => state.searchResults
  );
  const { edit, tabData } = useSelector((state: RootState) => state.tabEdit);
  const [activeStep, setActiveStep] = useState(0);
  const [formState, setFormState] = useState({
    siteDescription: "",
  });
  const [skipped, setSkipped] = useState(new Set<number>());
  const [formError, setFormError] = useState<string>("");

  const getSteps = () => {
    return addItemMediaSteps;
    // if (tabName === MEDIA_TAB_NAME) {
    //     return addItemMediaSteps
    // } else {
    //     return addItemDefaultSteps
    // }
  };

  const [steps, setSteps] = useState<Array<string>>(getSteps());

  const dispatch = useDispatch();

  let mediaInitialValue = {
    media_type: edit ? tabData.media_type[0].typeCode : "",
    title: edit ? tabData.title : "",
    bearing: edit ? tabData.bearing : "",
    description: edit ? tabData.description : "",
    Author: edit ? tabData.Author : "",
    categoryType: edit ? tabData?.categoryType : [],
    latitude: edit ? tabData?.latitude : null,
    longitude: edit ? tabData?.longitude : null,
    referenceURL: edit ? tabData?.referenceURL : "",
    keywords: edit && tabData?.keywords ? tabData?.keywords : [],
    object: edit ? tabData?.object.url : "",
    mediaType: "", 
    refrerenceUrl: ""
  }
  const formik = useFormik({
    initialValues: mediaInitialValue,
    validate: (values) => {
      if (!values.title && activeStep == 1) {
        setFormError("Image Title is required");
      } else {
        setFormError("");
      }
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      if (!formError) {
        handleNext(null, values);
      }
    },
  });

  useEffect(() => {
    if (showAddSuccess) {
      dispatch(toggleShowAddSuccess(true));
    }
  }, [showAddSuccess]);

  useEffect(() => {

    if (activeStep >= 2) {
      dispatch(toggleAssociationsStepOpen(true));

      if (activeStep > 2) {
        dispatch(toggleAssociationsIconDisabled(true));
      } else {
        dispatch(toggleAssociationsIconDisabled(false));
      }

    } else {
      dispatch(toggleAssociationsStepOpen(false));
    }
  }, [activeStep]);

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = (e: any, data: any) => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    if (activeStep + 1 === steps.length) {
      if (create) {
        create({
          ...data,
        });
      }
      handleReset()
      dispatch(toggleShowAddSuccess(true));
      dispatch(toggleNewItemWindow(false))
    }

    setSkipped(newSkipped);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      dispatch(toggleNewItemWindow(false))
      dispatch(setAddNewItemWindowType(null))
      handleReset()
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
              Add Media
            </Typography>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              className={`${styles["stepper"]} ${tabName === MEDIA_TAB_NAME ? styles["add-media-stepper"] : ""
                } ${styles["media-stepper"]}`}
            >
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};
                // if (isStepOptional(index)) {
                //     labelProps.optional = (
                //         <Typography variant='caption'>Optional</Typography>
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
                <StepContent
                  tabName={tabName}
                  formState={formState}
                  setFormState={setFormState}
                  activeStep={activeStep}
                  steps={steps}
                  handleNext={handleNext}
                  handleBack={handleBack}
                  options={options}
                  formik={formik}
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
              gap: '1em'
            }}
          >
            <Button
              colors={["#fff", "var(--table-black-text)", "none"]}
              className={`${styles["plain-whitee-btn"]}`}
              label="Cancel"
              onClick={(e) => {
                dispatch(toggleNewItemWindow(false))
                dispatch(setAddNewItemWindowType(null))
                handleReset()
              }}
              style={{
                paddingInline: 0,
              }}
            />
            {activeStep > 0 && (
              <Box component="div" style={{
                marginRight: 0,
                marginLeft: 'auto',
              }}>
                <Button
                  label="Back"
                  colors={["#fff", "var(--table-black-text)", "none"]}
                  onClick={handleBack}
                  style={{
                    border: '1px solid var(--table-black-text)',
                  }}
                />
              </Box>
            )}
            <Grid item display={"flex"}>
              {activeStep == steps.length - 1 && (
                <Button
                  label="Add"
                  type="submit"
                  disabled={!(formik.values.title.length > 0)}
                />
              )}
              {activeStep !== steps.length - 1 && (
                <Button
                  label={"Next"}
                  onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => handleNext(e, undefined)}
                />
              )}
              {/* {<Button label={"Update"} type="submit" />} */}
            </Grid>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default AddNewMedia;
