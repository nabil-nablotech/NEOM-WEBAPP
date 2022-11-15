import { Box, Typography, Button as DefaultButton } from "@mui/material";
import React, { useState } from "react";
import { StepContentTypes } from "../../../../types/CustomDrawerTypes";
import Button from "../../../../components/Button";
import styles from "../../Places/AddNewItem/addNewItem.module.css";
import TextInput from "../../../../components/TextInput";
import DropdownComponent from "../../../Dropdown/index";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { baseUrl, validateNumber } from "./../../../../utils/services/helpers";
import CustomUpload from "../../../Upload/ImageUpload";
import { SelectChangeEvent } from "@mui/material/Select";
import AutoComplete from "../../../AutoComplete";

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
  uploadImage,
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
  const objectURL = `<iframe
width="338"
height="190"
src="https://www.youtube.com/embed/C8AYzPxr_SE"
title="YouTube video player"
frameBorder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowFullScreen
></iframe>`;
  const handleEmbed = (data: string) => {
    return <div dangerouslySetInnerHTML={{ __html: data }} />;
  };

  const handleUrl = () => {
    return (
      <iframe
        width="338"
        height="190"
        onError={(e) => console.log(e, "error")}
        src={formik.values.url}
        srcDoc={
          '<div className="no-preview-url> <img src={iconUrl} width="338" /></div>'
        }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  };

  const renderEmbedSubmitButton = () => {
    return(
      <>
      {formik.values?.embedCode?.length > 10 && (
                  <Box component={"div"} className={`${styles["embed-submit-button"]}`}>
                    <Button
                      colors={["#fff", "var(--table-black-text)"]}
                      variant="outlined"
                      
                      label={"EMBED"}
                      onClick={() => formik.setFieldValue("submitEmbed", true)}
                    />
                  </Box>
                )}
      </>
    )
  }

  const validateUrl = () => {
    const regex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    if (regex.test(formik.values.url)) {
      formik.setFieldValue("valid", true);
    } else {
      formik.setFieldValue("valid", false);
    }
  }

  const handleDropdown = (e: string | string[]) => {
    formik.setFieldValue("media_type", e);
    if (typeof e === 'string' && e.toLowerCase() === 'image') {
      formik.setFieldValue("url", '');
      formik.setFieldValue("showUrl", false);
      formik.setFieldValue("embedCode", '');
      formik.setFieldValue("showEmbeded", false);
      formik.setFieldValue("submitEmbed", false);
      formik.setFieldValue("valid", false);
    }
    else if (typeof e === 'string' && e.toLowerCase() === 'video') {
      formik.setFieldValue("object", undefined);
      formik.setFieldValue("url", '');
      formik.setFieldValue("showUrl", false);
      formik.setFieldValue("embedCode", '');
      formik.setFieldValue("showEmbeded", false);
      formik.setFieldValue("submitEmbed", false);
      formik.setFieldValue("valid", false);
    }
    else if (typeof e === 'string' && e.toLowerCase() === '3dmodel') {
      formik.setFieldValue("object", undefined);
      formik.setFieldValue("url", '');
      formik.setFieldValue("showUrl", false);
      formik.setFieldValue("embedCode", '');
      formik.setFieldValue("showEmbeded", false);
      formik.setFieldValue("submitEmbed", false);
      formik.setFieldValue("valid", false);
    }
  }
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
                handleDropdown(e.target.value)
              }}
              handleClear={(e: React.MouseEvent) => {}}
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

            {formik.values?.media_type.toLowerCase() === "image" && (
              <>
                <CustomUpload
                  defaultImages={formik.values.object}
                  uploadImage={uploadImage}
                  title={"Drag and drop your file here"}
                  existingImageUrl={
                    formik.values?.object && formik.values?.object[0]?.url
                      ? `${baseUrl}${formik.values?.object[0]?.url}`
                      : ""
                  }
                />
                <Typography className={`${styles['file-upload-bottom-text']}`}>Accepted file types: .jpg, .png</Typography>
              </>
            )}
            {formik.values?.media_type.toLowerCase() === "video" && (
              <>
                {formik.values.showEmbeded ? (
                  <>
                    {formik.values.submitEmbed ? (
                      <Box
                        component={"div"}
                        className={`${styles["embed-box"]}`}
                      >
                        {handleEmbed(formik.values.embedCode)}
                        <Typography
                          className={`${styles["file-upload-url-bottom-text"]}`}
                        >
                          YouTube video player
                        </Typography>
                      </Box>
                    ) : (
                      <TextInput
                        // className={`${styles["english-name"]}`}
                        label="Embed Code"
                        name="embedCode"
                        multiline
                        minRows={4}
                        maxRows={4}
                        value={formik.values.embedCode}
                        onChange={(e) => {
                          formik.setFieldValue("embedCode", e.target.value);
                        }}
                        sx={{
                          ...textInputSxStyles,
                          marginBottom: "8em",
                          "& .MuiInputBase-inputMultiline": {
                            paddingInline: "0 !important",
                          },
                        }}
                        formControlSx={commonFormControlSxStyles}
                      />
                    )}
                  </>
                ) : (
                  <>
                    {formik.values.showUrl ? (
                      <>
                        <TextInput
                          className={`${styles["english-name"]}`}
                          label="URL"
                          name="url"
                          value={formik.values.url}
                          onChange={(e) => {
                            formik.setFieldValue("url", e.target.value);
                          }}
                          sx={{
                            ...textInputSxStyles,
                          }}
                          formControlSx={commonFormControlSxStyles}
                        />
                         {!formik.values.valid && formik.values.url?.length > 10 && <Box component={"div"} className={`${styles["embed-submit-button"]}`}>
                            <Button
                              colors={["#fff", "var(--table-black-text)"]}
                              variant="outlined"
                              
                              label={"VALIDATE"}
                              onClick={() => {
                                validateUrl()
                              }}
                            />
                        </Box>}
                        {formik.values.valid && (
                          <Box
                            component={"div"}
                            className={`${styles["embed-box"]}`}
                          >
                            {handleUrl()}
                            <Typography
                              mt={1}
                              className={`${styles["file-upload-url-bottom-text"]}`}
                            >
                              YouTube video player
                            </Typography>
                          </Box>
                        )}
                      </>
                    ) : (
                      <>
                      {formik.values?.object && formik.values?.object[0]?.url ? 
                        <video width="338" height="190" controls>
                        <source
                          src={`${baseUrl}${formik.values.object[0].url}`}
                          type="video/mp4"
                        />
                      </video> :
                      <CustomUpload
                        defaultImages={formik.values.object}
                        uploadImage={uploadImage}
                        title={"Drag and drop your file here"}
                        existingImageUrl={""}
                      />
                      }
                      </>
                    )}
                  </>
                )}

                {formik.values.submitEmbed ? null : renderEmbedSubmitButton()}
                <Typography
                  onClick={() => {
                    formik.setFieldValue(
                      "showEmbeded",
                      !formik.values.showEmbeded
                    );
                    formik.setFieldValue("showUrl", false);
                  }}
                  className={`${styles["file-upload-url-bottom-text"]}`}
                >
                  {formik.values.showEmbeded
                    ? "Upload video instead"
                    : "Add embed code instead"}
                </Typography>
                <Typography
                  className={`${styles["file-upload-url-bottom-text"]}`}
                >
                  or
                </Typography>
                <Typography
                  className={`${styles["file-upload-url-bottom-text"]}`}
                  onClick={() => {
                    formik.setFieldValue("showEmbeded", false);
                    formik.setFieldValue("embedCode", "");
                    formik.setFieldValue("showUrl", !formik.values.showUrl);
                  }}
                >
                  Add URL
                </Typography>
              </>
            )}
            {formik.values?.media_type.toLowerCase() === "3dmodel" && (
              <>
                {formik.values.submitEmbed ? (
                  <Box component={"div"} className={`${styles["embed-box"]}`}>
                    {handleEmbed(formik.values.embedCode)}
                  </Box>
                ) : (
                  <TextInput
                    // className={`${styles["english-name"]}`}
                    label="Embed Code"
                    name="embedCode"
                    multiline
                    minRows={8}
                    maxRows={8}
                    value={formik.values.embedCode}
                    onChange={(e) => {
                      formik.setFieldValue("embedCode", e.target.value);
                    }}
                    sx={{
                      ...textInputSxStyles,
                      marginBottom: "8em",
                      "& .MuiInputBase-inputMultiline": {
                        paddingInline: "0 !important",
                      },
                    }}
                    formControlSx={commonFormControlSxStyles}
                  />
                )}
                {formik.values.submitEmbed ? null : renderEmbedSubmitButton()}
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
              value={formik.values.categoryType}
              multiple={true}
              handleSelectChange={(e, value) =>
                formik.setFieldValue("categoryType", value)
              }
              handleClear={(e) => {}}
              itemsList={options?.actionType || []}
              selectStylesSx={commonSelectSxStyles}
              formControlSx={commonFormControlSxStyles}
            />
            <TextInput
              className={`${styles["english-name"]}`}
              label="Longitude"
              name="longitude"
              type="number"
              value={formik.values.longitude}
              onChange={(e) => {
                if (validateNumber(e.target.value)) {
                  formik.setFieldValue("longitude", e.target.value);
                }
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
              type="number"
              value={formik.values.latitude}
              onChange={(e) => {
                if (validateNumber(e.target.value)) {
                  formik.setFieldValue("latitude", e.target.value);
                }
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
                onClick={(e) => {}}
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
                  ...new Set([keywordString, ...formik.values.keywords ]),
                ]);
              }}
              onDelete={(value) => {
                const newArr = [...formik.values.keywords].filter(
                  (element: string) => element !== value
                );
                formik.setFieldValue("keywords", [...new Set(newArr)]);
              }}
              currentKeywordArray={formik.values.keywords}
              setCurrentKeywordsArray={(arr: string[]) =>
                formik.setFieldValue("keywords", [...new Set(arr)])
              }
            />
          </>
        )}
      </Box>
    </>
  );
};

export default StepContent;
