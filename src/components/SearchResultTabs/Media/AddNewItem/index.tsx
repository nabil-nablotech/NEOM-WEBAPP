import { Box, Button as DefaultButton, Step, StepLabel, Stepper, Typography, StepButton, Chip } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddNewItemProps, StepContentTypes } from '../../../../types/CustomDrawerTypes';
import { tabNameProps } from '../../../../types/SearchResultsTabsProps';
import { addItemDefaultSteps, MEDIA_TAB_NAME, handleEnter } from '../../../../utils/services/helpers';
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
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { useFormik } from 'formik';
import AutoComplete from '../../../AutoComplete';
import CloseIcon from '@mui/icons-material/Close';

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
    handleBack,
    options,
    formik
}: StepContentTypes) => {

    // const formik = useFormik({
    //     initialValues: {
    //         mediaType: '',
    //     },
    //     onSubmit: values => {
    //         alert(JSON.stringify(values, null, 2));
    //     },
    // });

    const handleSelectChange = (e: React.SyntheticEvent, value: string[] | [], stateName: string) => {
        e.preventDefault();
        formik.setFieldValue(stateName, [...new Set([...formik.values[stateName], ...value])]);
    }

    const [mediaKeywords, setMediaKeywords] = useState<Array<string>>([])
    const [currentKeyword, setCurrentKeyword] = useState<string>('')

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
                   
                    <TextInput
                        className={`${styles["english-name"]}`}
                        label="Title"
                        name="title"
                        value={''}
                        // onChange={(e) => { }}
                        sx={{
                            ...textInputSxStyles
                        }}
                        formControlSx={commonFormControlSxStyles}
                    />
                    <TextInput
                        className={`${styles["site-description"]}`}
                        label="Description"
                        name="description"
                        value={''}
                        onChange={e => {
                            
                        }}
                        multiline
                        minRows={3}
                        maxRows={3}
                        sx={{
                            ...textInputSxStyles,
                            marginBottom: '4em',
                            '& .MuiInputBase-inputMultiline': {
                                paddingInline: '0 !important'
                            }
                        }}
                        formControlSx={{
                            ...commonFormControlSxStyles,
                        }}
                    />
                     <TextInput
                        className={`${styles["english-name"]}`}
                        label="Bearing"
                        name="bearing"
                        value={''}
                        // onChange={(e) => { }}
                        sx={{
                            ...textInputSxStyles
                        }}
                        formControlSx={commonFormControlSxStyles}
                    />
                    <TextInput
                        className={`${styles["english-name"]}`}
                        label="Author"
                        name="Author"
                        value={''}
                        // onChange={(e) => { }}
                        sx={{
                            ...textInputSxStyles
                        }}
                        formControlSx={commonFormControlSxStyles}
                    />
                     <AutoComplete
                        className={`${styles["dropdown"]}`}
                        label={"Category Type"}
                        name="categoryType"
                        value={[]}
                        multiple={true}
                        handleSelectChange={(e, value) => handleSelectChange(e, value, 'categoryType')}
                        handleChange={() => { }}
                        handleClear={(e) => { }}
                        itemsList={options?.actionType || []}
                        selectStylesSx={commonSelectSxStyles}
                        formControlSx={commonFormControlSxStyles}
                    />
                     <TextInput
                        className={`${styles["english-name"]}`}
                        label="Longitude"
                        name="longitude"
                        value={''}
                        // onChange={(e) => { }}
                        sx={{
                            ...textInputSxStyles
                        }}
                        formControlSx={commonFormControlSxStyles}
                    />
                     <TextInput
                        className={`${styles["english-name"]}`}
                        label="Latitude"
                        name="latitude"
                        value={''}
                        // onChange={(e) => { }}
                        sx={{
                            ...textInputSxStyles
                        }}
                        formControlSx={commonFormControlSxStyles}
                    />
                     <TextInput
                        className={`${styles["english-name"]}`}
                        label="Reference URL"
                        name="refrerenceUrl"
                        value={''}
                        // onChange={(e) => { }}
                        sx={{
                            ...textInputSxStyles
                        }}
                        formControlSx={commonFormControlSxStyles}
                    />
                </>
            }
              {
                activeStep === 2 &&
                <Box component="div">
                    Click on <InsertLinkIcon/> to select the places and events you want to associate this library item to.</Box>
              }
              {
                activeStep === 3 &&
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
            }
            
        </Box>
    </>
}


const AddNewMedia = ({
    onHide
}: AddNewItemProps) => {
    let { tabName } = useParams<{ tabName?: tabNameProps }>();
    const { options } = useSelector((state: RootState) => state.refinedSearch);

    const { showAddSuccess } = useSelector((state: RootState) => state.searchResults);

    const [activeStep, setActiveStep] = useState(0);
    const [formState, setFormState] = useState({
        siteDescription: ''
    });
    const [skipped, setSkipped] = useState(new Set<number>());
    const [formError, setFormError] = useState<string>('');

    const getSteps = () => {
        return addItemMediaSteps
        // if (tabName === MEDIA_TAB_NAME) {
        //     return addItemMediaSteps
        // } else {
        //     return addItemDefaultSteps
        // }
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

    const handleNext = (e: any, data: any) => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        if (activeStep + 1 === steps.length) {
            // if (create) {
            //     create({
            //         ...data
            //     });
            // }
            // onClose()
            onHide()
            dispatch(toggleShowAddSuccess(true))
            // dispatch(toggleNewItemWindow(false))
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

    const formik = useFormik({
        initialValues: {
            placeNumber: '',
            placeNameEnglish: '',
            placeNameArabic: '',
            siteDescription: '',
            siteType: [],
            period: [],
            stateOfConservation: '',
            risk: '',
            tourismValue: '',
            researchValue: '',
            artifacts: '',
            recommendation: '',
            latitude: null,
            longitude: null,
            keywords: []
        },
        validate: values => {
            if (!values.placeNumber) {
                setFormError('Place Number is required')
            } else {
                setFormError('')
            }
        },
        onSubmit: (values) => {

            if (!formError) {
                handleNext(null, values);
            }
        },
    });


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
                                options={options}
                                formik={formik}
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
                        label='Cancel'
                        onClick={handleBack}
                        style={{
                            paddingInline: 0
                        }}
                    />
                    {activeStep > 0 && (
                        <Button label='Back' />
                    )}
                    <Button
                        label={activeStep === steps.length - 1 ? 'Add' : 'Next'}  />
                </Box>
            </Box>
        </Box>
    );
}

export default AddNewMedia;