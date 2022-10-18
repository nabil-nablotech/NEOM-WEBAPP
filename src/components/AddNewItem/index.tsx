import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { AddNewItemProps } from '../../types/CustomDrawerTypes';
import { tabNameProps } from '../../types/SearchResultsTabsProps';
import { PLACES_TAB_NAME } from '../../utils/services/helpers';
import styles from './index.module.css'


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

const AddNewItem = ({
    onClose
}: AddNewItemProps) => {
    let { tabName } = useParams<{ tabName?: tabNameProps }>();

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());

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
        if(activeStep + 1 === steps.length ) {
            onClose()
        }
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
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

    const steps = ['Item Details', 'Keywords']
    return (
        <Box>
            {
                tabName === PLACES_TAB_NAME ?
                    <Box className={`${styles['add-new-item-container']}`}>
                        <Box style={{
                            marginRight: 0,
                            marginLeft: 'auto',
                            width: 'fit-content'
                        }}>
                            <Button variant="text" onClick={e => onClose()}
                                style={{
                                    // paddingInline: 0,
                                    minWidth: 'fit-content'
                                }}
                            >Hide</Button>
                        </Box>
                        <Typography variant="h4" component="h4">
                            Add Place
                        </Typography>
                        <Stepper activeStep={activeStep} alternativeLabel>
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
                                        <StepLabel {...labelProps} className={`${styles['step-label']}`}
                                            StepIconProps={{
                                                sx: {
                                                    ...stepperIconSx
                                                }
                                            }}
                                        >{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {/* {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </React.Fragment>
                        ) : ( */}
                                <>
                                    <React.Fragment>
                                        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                            <Button
                                                color="inherit"
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                sx={{ mr: 1 }}
                                            >
                                                Back
                                            </Button>
                                            <Box sx={{ flex: '1 1 auto' }} />
                                            {/* {isStepOptional(activeStep) && (
                                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                                    Skip
                                                </Button>
                                            )} */}
                                            <Button onClick={handleNext}>
                                                {activeStep === steps.length - 1 ? 'Add' : 'Next'}
                                            </Button>
                                        </Box>
                                    </React.Fragment>
                            </>
                        {/* )} */}
                    </Box> :
                    <Box>&&&</Box>
            }
        </Box>
    );
}

export default AddNewItem;