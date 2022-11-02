import { Box, Button as DefaultButton, Step, StepLabel, Stepper, Typography, StepButton } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddNewItemProps, StepContentTypes } from '../../../../types/CustomDrawerTypes';
import { tabNameProps } from '../../../../types/SearchResultsTabsProps';
import { addItemDefaultSteps, MEDIA_TAB_NAME } from '../../../../utils/services/helpers';
import styles from '../../Places/AddNewItem/addNewItem.module.css'
import TextInput from "../../../../components/TextInput";
import Button from "../../../../components/Button";
import DropdownComponent from '../../../Dropdown/index';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAddNewItemWindowType, toggleAddItemWindowMinimized, toggleNewItemWindow, toggleShowAddSuccess } from '../../../../store/reducers/searchResultsReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { addItemMediaSteps } from './../../../../utils/services/helpers';
import CustomUpload from '../../../Upload/ImageUpload';
import { SelectChangeEvent } from '@mui/material/Select';
import { useFormik } from 'formik';

const commonSelectSxStyles = {
    textAlign: 'left',
    '& .MuiSelect-select': {
        padding: '0.5em 1em',
        color: 'var(--grey-text)'
    }
}
const textInputSxStyles = {

    '& .MuiInputBase-input.MuiOutlinedInput-input': {
        border: 'none'
    },
    '& .MuiFormLabel-root.MuiInputLabel-root ': {
    },
    '& .MuiInputBase-input.MuiOutlinedInput-input ': {
        lineHeight: '1.2',
        border: '1.4px solid #fff',
        padding: '0.5em 1em',
        height: '1.4em',
    },
    '& .MuiOutlinedInput-notchedOutline span': {
        opacity: 1
    },
    '& .MuiOutlinedInput-notchedOutline legend': {
        color: 'transparent'
    }

}
const commonFormControlSxStyles = {
    width: '100%',
    flexGrow: 0,
    '& .MuiInputBase-root': {
        backgroundColor: '#fff',
    }
}

export const stepperIconSx = {
    color: '#fff',
    border: '1px solid var(--table-black-text)',
    borderRadius: '50%',
    '& .MuiStepIcon-text': {
        fill: 'var(--table-black-text)',
    },
    '&.MuiStepIcon-root.Mui-active .MuiStepIcon-text': {
        fill: '#fff',
    },
    '&.MuiStepIcon-root.Mui-active, &.MuiStepIcon-root.Mui-completed': {
        color: 'var(--table-black-text)',
        border: 'none'
    },
}

const StepContent = ({
    tabName,
    formState,
    setFormState,
    activeStep,
    steps,
    handleNext,
    handleBack
}: StepContentTypes) => {

    const formik = useFormik({
        initialValues: {
            mediaType: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return <>
        <Box component="div" className={`${styles['form']}`}>
            {
                activeStep === 0 &&
                <>
                    <DropdownComponent
                        className={`${styles["media-type"]}`}
                        label={"Media Type"}
                        name="media-type"
                        value={formik.values.mediaType}
                        
                        // handleChange={(e) => setFormState((state: any) => ({
                        //     ...state,
                        //     mediaType: e.target.value
                        // }))}

                        handleChange={(e: SelectChangeEvent<string | string[]>) => {
                            formik.setFieldValue('mediaType', e.target.value)
                        }}
                        handleClear={(e: React.MouseEvent) => { }}
                        itemsList={[
                            {
                                label: 'Image',
                                value: 'Image'
                            },
                            {
                                label: 'Video',
                                value: 'Video'
                            },
                            {
                                label: '3D Model',
                                value: '3D Model'
                            }
                        ]}
                        selectStylesSx={commonSelectSxStyles}
                        formControlSx={commonFormControlSxStyles}
                    />
                    {
                        formik.values.mediaType === 'Image' &&
                        <>
                            <CustomUpload
                                title={'Drag and drop your file here'}
                            />
                        </>
                    }

                </>
            }
            {
                activeStep === 1 &&
                <>
                    <Box component="div">Make your content discoverable</Box>
                    <TextInput
                        className={`${styles["english-name"]}`}
                        label="Add Keywords"
                        name="english-name"
                        value={''}
                        // onChange={(e) => { }}
                        sx={{
                            ...textInputSxStyles
                        }}
                        formControlSx={commonFormControlSxStyles}
                    />
                </>
            }
            
        </Box>
    </>
}


const AddNewMedia = ({
    onHide
}: AddNewItemProps) => {
    let { tabName } = useParams<{ tabName?: tabNameProps }>();

    const { showAddSuccess } = useSelector((state: RootState) => state.searchResults);

    const [activeStep, setActiveStep] = useState(0);
    const [formState, setFormState] = useState({
        siteDescription: ''
    });
    const [skipped, setSkipped] = useState(new Set<number>());


    const getSteps = () => {
        if (tabName === MEDIA_TAB_NAME) {
            return addItemMediaSteps
        } else {
            return addItemDefaultSteps
        }
    }

    const [steps, setSteps] = useState<Array<string>>(getSteps())

    const dispatch = useDispatch()

    useEffect(() => {
        if (showAddSuccess) {
            dispatch(toggleShowAddSuccess(true))
        }
    }, [showAddSuccess])

    const isStepOptional = (step: number) => {
        return step === 1;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };
    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if (activeStep + 1 === steps.length) {
            onHide()
            dispatch(toggleShowAddSuccess(true))
        }
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        if (activeStep === 0) {
            dispatch(toggleNewItemWindow(false))
            dispatch(setAddNewItemWindowType(null))
            dispatch(toggleAddItemWindowMinimized(null))
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



    return (
        <Box component="div">
            <Box component="div" className={`${styles['add-new-item-container']}`}>
                
                <Box component="div" className={`${styles['content-section']}`}>
                    <Box component="div" className={`${styles['hide-btn']}`}
                        style={{
                        marginRight: 0,
                        marginLeft: 'auto',
                        width: 'fit-content'
                    }}>
                        <DefaultButton variant="text" onClick={e => onHide()}
                            style={{
                                // paddingInline: 0,
                                minWidth: 'fit-content',
                                padding: 0,
                                color: 'var(--table-black-text)'
                            }}
                        >Hide</DefaultButton>
                    </Box>
                    <Typography className={`${styles['add-title']}`} variant="h4" component="h4" style={{
                    }}>
                        Add Media
                    </Typography>
                    <Stepper activeStep={activeStep} alternativeLabel
                        className={`${styles['stepper']} ${tabName === MEDIA_TAB_NAME ? styles['add-media-stepper'] : ''}`}
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
                                formState={formState}
                                setFormState={setFormState}
                                activeStep={activeStep}
                                steps={steps}
                                handleNext={handleNext}
                                handleBack={handleBack}
                            />

                        </React.Fragment>
                    </>
                </Box>
                <Box component="div"
                    className={`${styles["btn-row"]}`}
                    sx={{
                        display: 'flex', flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <Button
                        colors={["#fff", "var(--table-black-text)", "none"]}
                        className={`${styles["plain-whitee-btn"]}`}
                        label={activeStep === 0 ? 'Cancel' : 'Back'}
                        onClick={handleBack}
                        style={{
                            paddingInline: 0
                        }}
                    />
                    {/* {isStepOptional(activeStep) && (
                                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                                    Skip
                                                </Button>
                                            )} */}
                    <Button
                        label={activeStep === steps.length - 1 ? 'Add' : 'Next'}
                        onClick={handleNext}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default AddNewMedia;