import {
  Box,
  Button as DefaultButton,
  Step,
  StepLabel,
  Stepper,
  Typography,
  StepButton,
  Chip
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  AddNewItemProps,
  StepContentTypes,
} from "../../../../types/CustomDrawerTypes";
import { tabNameProps } from "../../../../types/SearchResultsTabsProps";
import { addItemLibrarySteps, handleEnter } from "../../../../utils/services/helpers";
import styles from '../../Places/AddNewItem/addNewItem.module.css'
import TextInput from "../../../../components/TextInput";
import Button from "../../../../components/Button";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAddNewItemWindowType, storeAddItemProgressState, toggleAddItemWindowMinimized, toggleAssociationsStepOpen, toggleNewItemWindow, toggleShowAddSuccess } from "../../../../store/reducers/searchResultsReducer";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useFormik } from "formik";
import FileUpload from "../../../Upload/FileUpload";
import DetachedIcon from "../../../Icons/DetachedIcon";
import AddedPlaces from "../../../AssociationsList/AddedPlaces";
import CloseIcon from '@mui/icons-material/Close';
import AddedEvents from "../../../AssociationsList/AddedEvents";

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
  const { associatedPlaces, associatedEvents } = useSelector(
    (state: RootState) => state.searchResults
  );
  const [currentKeyword, setCurrentKeyword] = useState<string>('')

  return (
    <>
      <Box component="div" className={`${styles["form"]}`}>
        {activeStep === 0 && (
          <>
            <FileUpload />
            <TextInput
              required
              className={`${styles["title"]}`}
              label="Title"
              name="title"
              multiline
              minRows={2}
              maxRows={2}
              value={formik.values.title}
              onChange={(e) => {
                formik.setFieldValue("title", e.target.value);
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
              required
              className={`${styles["description"]}`}
              label="Description"
              name="description"
              multiline
              minRows={3}
              maxRows={3}
              value={formik.values.description}
              onChange={(e) => {
                formik.setFieldValue("description", e.target.value);
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
              className={`${styles["referenceUrl"]}`}
              label="Reference URL"
              name="referenceUrl"
              multiline
              minRows={2}
              maxRows={2}
              value={formik.values.referenceUrl}
              onChange={(e) => {
                formik.setFieldValue("referenceUrl", e.target.value);
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
              className={`${styles["citation"]}`}
              label="Citation"
              name="citation"
              multiline
              minRows={3}
              maxRows={3}
              value={formik.values.citation}
              onChange={(e) => {
                formik.setFieldValue("citation", e.target.value);
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
            
          </>
        )}
        {activeStep === 1 && (
          <Box component="div">
            <Box component="div" style={{
              display: 'inline-block',
              lineHeight: 1.5
            }}>
              Click on{' '}
              <DetachedIcon
                style={{
                  height: '18px',
                  position: 'relative',
                  top: '3px',
                }}
                onClick={e => {
                  
                }}
              />
              {' '}to select the places and events you want to associate this library item to.
            </Box>
            <AddedPlaces
              list={associatedPlaces}
            />
            <AddedEvents
              list={associatedEvents}
            />
          </Box>
        )}
        {activeStep === 2 && <>
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
        </>}
      </Box>
    </>
  );
};

const AddNewLibraryItem = ({ onHide, create }: AddNewItemProps) => {
  let { tabName } = useParams<{ tabName?: tabNameProps }>();

  const { showAddSuccess, addItemProgressState, addNewItemWindowType } = useSelector(
    (state: RootState) => state.searchResults
  );
  const { options } = useSelector((state: RootState) => state.refinedSearch);
  const { edit } = useSelector((state: RootState) => state.tabEdit);

  const [activeStep, setActiveStep] = useState(0);
  const [formState, setFormState] = useState({
    siteDescription: "",
  });
  const [skipped, setSkipped] = useState(new Set<number>());

  const [steps, setSteps] = useState<Array<string>>(addItemLibrarySteps);

  const dispatch = useDispatch();

  useEffect(() => {
    if (showAddSuccess) {
      dispatch(toggleShowAddSuccess(true));
    }
  }, [showAddSuccess]);

  useEffect(() => {

    if (activeStep >= 1) {
      dispatch(toggleAssociationsStepOpen(true));
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
  const handleNext = (e: any, data?: any) => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep + 1 === steps.length) {
      handleHide();
      dispatch(toggleShowAddSuccess(true));
    }

    if (activeStep + 1 === steps.length && data) {
      if (create && !edit) {
        create({
          ...data,
        });
      }
      handleHide()
      dispatch(toggleNewItemWindow(false))
    }

    if (edit && create && data) {
      create({
        ...data,
      });
      handleHide();
      dispatch(toggleNewItemWindow(false));
    }
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      dispatch(toggleNewItemWindow(false))
      dispatch(setAddNewItemWindowType(null))
      dispatch(toggleAddItemWindowMinimized(null))

      /** remove the data when change in add item type window occurs */
      dispatch(storeAddItemProgressState(null))
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
      place: "",
      eventDate: new Date(),
      recordingTeam: "",
      siteDescription: "",
      fieldNarrative: "",
      siteType: "",
      keywords: [],
    },
    onSubmit: (values) => {
      handleNext(null, values);
    },
  });

  useEffect(() => {
    /** Effect needed to load history data,
     * and remove the data when change in add item type window occurs
     */
    if(addItemProgressState && addItemProgressState.formData) {

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
              Add Library
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

                return (
                  <Step key={label} {...stepProps}>
                    <StepButton color="inherit" onClick={handleStep(index)}>
                      <StepLabel {...labelProps} className={`${styles['step-label']}`}
                        StepIconProps={{
                          sx: {
                            ...stepperIconSx
                          }
                        }}
                      >{label}
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
            <Button
              label={activeStep === steps.length - 1 ? "Add" : "Next"}
              type="submit"
            />
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default AddNewLibraryItem;
