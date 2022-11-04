import {
  Box,
  Button as DefaultButton,
  Step,
  StepLabel,
  Stepper,
  Typography,
  StepButton,
  Chip,
  Grid
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  AddNewItemProps,
  StepContentTypes,
} from "../../../../types/CustomDrawerTypes";
import { addItemLibrarySteps, baseUrl, handleEnter } from "../../../../utils/services/helpers";
import styles from '../../Places/AddNewItem/addNewItem.module.css'
import TextInput from "../../../../components/TextInput";import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import FileUpload from "../../../Upload/FileUpload";
import DetachedIcon from "../../../Icons/DetachedIcon";
import AddedPlaces from "../../../AssociationsList/AddedPlaces";
import CloseIcon from '@mui/icons-material/Close';
import AddedEvents from "../../../AssociationsList/AddedEvents";

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
  uploadImage,
  activeStep,
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
            {uploadImage && <FileUpload uploadImage={uploadImage} />}
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
                className="remove-motion"
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

export default StepContent;
