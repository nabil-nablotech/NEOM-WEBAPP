import {
  Box,
  Button as DefaultButton,
  Chip,
} from "@mui/material";
import React, { useState } from "react";
import {
  StepContentTypes,
} from "../../../../types/CustomDrawerTypes";
import {
  handleEnter,
} from "../../../../utils/services/helpers";
import styles from "../../Places/AddNewItem/addNewItem.module.css";
import TextInput from "../../../../components/TextInput";
import DropdownComponent from "../../../Dropdown/index";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { baseUrl } from "./../../../../utils/services/helpers";
import CustomUpload from "../../../Upload/ImageUpload";
import { SelectChangeEvent } from "@mui/material/Select";
import AutoComplete from "../../../AutoComplete";
import CloseIcon from "@mui/icons-material/Close";

import DetachedIcon from "../../../Icons/DetachedIcon";
import AddedPlaces from "../../../AssociationsList/AddedPlaces";
import AddedEvents from "../../../AssociationsList/AddedEvents";
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
  formState,
  setFormState,
  activeStep,
  steps,
  handleNext,
  handleBack,
  options,
  formik,
}: StepContentTypes) => {
  const { associatedPlaces, associatedEvents } = useSelector(
    (state: RootState) => state.searchResults
  );
  console.log("====formik", formik.values)
  const handleSelectChange = (
    e: React.SyntheticEvent,
    value: string[] | [],
    stateName: string
  ) => {
    e.preventDefault();
    formik.setFieldValue(stateName, [
      ...new Set([...formik.values[stateName], ...value]),
    ]);
  };

  const [mediaKeywords, setMediaKeywords] = useState<Array<string>>([]);
  const [currentKeyword, setCurrentKeyword] = useState<string>("");

  return (
    <>
      <Box component="div" className={`${styles["form"]}`}>
        {activeStep === 0 && (
          <>
            <DropdownComponent
              className={`${styles["media-type"]}`}
              label={"Media Type"}
              name="media-type"
              value={formik.values.media_type}
              // handleChange={(e) => setFormState((state: any) => ({
              //     ...state,
              //     media_type: e.target.value
              // }))}

              handleChange={(e: SelectChangeEvent<string | string[]>) => {
                formik.setFieldValue("media_type", e.target.value);
              }}
              handleClear={(e: React.MouseEvent) => { }}
              itemsList={[
                {
                  label: "Image",
                  value: "IMAGE",
                },
                {
                  label: "Video",
                  value: "VIDEO",
                },
                {
                  label: "3D Model",
                  value: "3DMODEL",
                },
              ]}
              selectStylesSx={commonSelectSxStyles}
              formControlSx={commonFormControlSxStyles}
            />
            {formik.values.media_type.toLowerCase() === "image" && (
              <>
                <CustomUpload title={"Drag and drop your file here"} existingImageUrl={`${baseUrl}${formik.values.object}`} />
              </>
            )}
          </>
        )}
        {activeStep === 1 && (
          <>
            <TextInput
              className={`${styles["english-name"]}`}
              label="Title*"
              name="title"
              value={formik.values.title}
              onChange={(e) => {
                formik.setFieldValue("title", e.target.value);
              }}
              sx={{
                ...textInputSxStyles,
              }}
              formControlSx={commonFormControlSxStyles}
            />
            <TextInput
              className={`${styles["site-description"]}`}
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={(e) => {
                formik.setFieldValue("description", e.target.value);
              }}
              multiline
              minRows={3}
              maxRows={3}
              sx={{
                ...textInputSxStyles,
                marginBottom: "4em",
                "& .MuiInputBase-inputMultiline": {
                  paddingInline: "0 !important",
                },
              }}
              formControlSx={{
                ...commonFormControlSxStyles,
              }}
            />
            <TextInput
              className={`${styles["english-name"]}`}
              label="Bearing"
              name="bearing"
              value={formik.values.bearing}
              onChange={(e) => {
                formik.setFieldValue("bearing", e.target.value);
              }}
              sx={{
                ...textInputSxStyles,
              }}
              formControlSx={commonFormControlSxStyles}
            />
            <TextInput
              className={`${styles["english-name"]}`}
              label="Author"
              name="Author"
              value={formik.values.Author}
              onChange={(e) => {
                formik.setFieldValue("Author", e.target.value);
              }}
              sx={{
                ...textInputSxStyles,
              }}
              formControlSx={commonFormControlSxStyles}
            />
            <AutoComplete
              className={`${styles["dropdown"]}`}
              label={"Category Type"}
              name="categoryType"
              value={[...formik.values.categoryType]}
              multiple={true}
              handleSelectChange={(e, value) =>
                handleSelectChange(e, value, "categoryType")
              }
              handleClear={(e) => { }}
              itemsList={options?.actionType || []}
              selectStylesSx={commonSelectSxStyles}
              formControlSx={commonFormControlSxStyles}
            />
            <TextInput
              className={`${styles["english-name"]}`}
              label="Longitude"
              name="longitude"
              value={formik.values.longitude}
              onChange={(e) => {
                formik.setFieldValue("longitude", e.target.value);
              }}
              sx={{
                ...textInputSxStyles,
              }}
              formControlSx={commonFormControlSxStyles}
            />
            <TextInput
              className={`${styles["english-name"]}`}
              label="Latitude"
              name="latitude"
              value={formik.values.latitude}
              onChange={(e) => {
                formik.setFieldValue("latitude", e.target.value);
              }}
              sx={{
                ...textInputSxStyles,
              }}
              formControlSx={commonFormControlSxStyles}
            />
            <TextInput
              className={`${styles["english-name"]}`}
              label="Reference URL"
              name="referenceURL"
              value={formik.values.referenceURL}
              onChange={(e) => {
                formik.setFieldValue("referenceURL", e.target.value);
              }}
              sx={{
                ...textInputSxStyles,
              }}
              formControlSx={commonFormControlSxStyles}
            />
          </>
        )}
        {activeStep === 2 && (
          <Box component="div">
            <Box
              component="div"
              style={{
                display: "inline-block",
                lineHeight: 1.5,
              }}
            >
              Click on{" "}
              <DetachedIcon
                style={{
                  height: "18px",
                  position: "relative",
                  top: "3px",
                }}
                className="remove-motion"
                onClick={(e) => { }}
              />{" "}
              to select the places and events you want to associate this library
              item to.
            </Box>
            <AddedPlaces list={associatedPlaces} />
            <AddedEvents list={associatedEvents} />
          </Box>
        )}
        {activeStep === 3 && (
          <>
            <StepperKeywordsComponent
              onKeyDown={(keywordString) => {
                formik.setFieldValue("keywords", [
                  ...new Set([...formik.values.keywords, keywordString]),
                ].filter(ele => ele !== ''));
              }}

              onDelete={(value) => {
                const newArr = [...formik.values.keywords].filter(
                  (element: string) => element !== value
                );
                formik.setFieldValue("keywords", [...new Set(newArr)]);
              }}

              currentKeywordArray={formik.values.keywords}
            />
          </>
        )}
      </Box>
    </>
  );
};

export default StepContent;
