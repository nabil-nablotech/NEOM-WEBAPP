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
import { Place } from "../../../../types/Place";
import { setEventEdit } from "../../../../store/reducers/eventReducer";
import { StepperKeywordsComponent } from "../../../StepperKeywordsComponent";

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

  return (
    <>
      <Box component="div" className={`${styles["form"]}`}>
        {activeStep === 0 && (
          <>
            <AutoCompleteSingleSelect
              className={`${styles["custom-search-field"]}`}
              label="Search Place*"
              placeholder="Search Place*"
              value={formik.values.place || ''}
              // defaultValue={formik.}
              handleClear={() => {}}
              itemsList={places || []}
              handleSelectChange={(e, value, r, d) =>
                {console.log('value...', value)
                  formik.setFieldValue("place", value)}
              }
              handleChange={handleChange}
              renderOption={(props, option: any) => (
                <Box
                  component="li"
                  sx={{ display: "flex", justifyContent: "space-between" }}
                  {...props}
                >
                  <Typography>
                    {option?.attributes?.placeNameEnglish || ''}
                    {option?.attributes?.placeNameArabic || ''}
                  </Typography>

                  <Typography style={{ float: "right" }}>
                    {option?.attributes?.placeNumber || '-'}
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
              type="number"
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
            <StepperKeywordsComponent
              onKeyDown={(keywordString) => {
                formik.setFieldValue("keywords", [
                  ...new Set([...formik.values.keywords, keywordString]),
                ]);
              }}

              onDelete={(value) => {
                const newArr = [...formik.values.keywords].filter(
                  (element: string) => element !== value
                );
                formik.setFieldValue("keywords", [...new Set(newArr)]);
              }}

              currentKeywordArray={formik.values.keywords}

              setCurrentKeywordsArray={(arr: string[]) =>  formik.setFieldValue("keywords", [...new Set(arr)])}
            />
          </>
        )}
      </Box>
    </>
  );
};


export default StepContent;