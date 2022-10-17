import { useState } from 'react';
import { Box, Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";
import DropdownComponent from './../Dropdown/index';
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import styles from './index.module.css';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { RefinedSearchInputProps } from '../../types/RefinedSeachTypes';
import { EVENTS_TAB_NAME, MEDIA_TAB_NAME, tabNameBasedOnIndex } from '../../utils/services/helpers';

const RefinedSearchInputs = ({
    activeTabIndex
}: RefinedSearchInputProps) => {
    const commonSelectSxStyles = {
        textAlign: 'left',
        '& .MuiSelect-select': {
            borderColor: 'var(--lightest-border)',
            padding: '0.5em 1em',
            color: 'var(--grey-text)'
        }
    }
    const commonFormControlSxStyles = {
        width: '100%',
        flexGrow: 0,
        '& .MuiInputBase-root': {
            backgroundColor: '#fff',
            border: 'none'
        }
    }
    const textInputSxStyles = {

        '& .MuiInputBase-input.MuiOutlinedInput-input': {
        },
        '& .MuiFormLabel-root.MuiInputLabel-root ': {
        },
        '& .MuiInputBase-input.MuiOutlinedInput-input ': {
            lineHeight: '1.2',
            border: '1.4px solid #fff',
            padding: '0.5em 1em',
            height: '1.3em',
            borderRadius: '0.3em'
        },
        '& .MuiOutlinedInput-notchedOutline span': {
            opacity: 1
        }

    }

    const [startDate, setStartDate] = useState(new Date());

    const activeTab = tabNameBasedOnIndex(activeTabIndex)

    const BaseInputs = () => {

        return <>
            <Grid item sm={2} className={`${styles["input-field"]}`}>
                <DropdownComponent
                    className={`${styles["dropdown"]}`}
                    label={"State of Conservation"}
                    name="conservation"
                    value={''}
                    handleChange={(e) => { }}
                    itemsList={[]}
                    selectStylesSx={commonSelectSxStyles}
                    formControlSx={commonFormControlSxStyles}
                />
            </Grid>
            <Grid item sm={2} className={`${styles["input-field"]}`}>
                <DropdownComponent
                    className={`${styles["dropdown"]} ${styles["extra-width"]}`}
                    label={"Period"}
                    name="period"
                    value={''}
                    handleChange={(e) => { }}
                    itemsList={[]}
                    selectStylesSx={commonSelectSxStyles}
                    formControlSx={commonFormControlSxStyles}
                />
            </Grid>
            <Grid item sm={2} className={`${styles["input-field"]}`}>
                <DropdownComponent
                    className={`${styles["dropdown"]}`}
                    label={"Recommendation"}
                    name="recommendation"
                    value={''}
                    handleChange={(e) => { }}
                    itemsList={[]}
                    selectStylesSx={commonSelectSxStyles}
                    formControlSx={commonFormControlSxStyles}
                />
            </Grid>
            <Grid item sm={2} className={`${styles["input-field"]}`}>
                <DropdownComponent
                    className={`${styles["dropdown"]}`}
                    label={"Research Value"}
                    name="research Value"
                    value={''}
                    handleChange={(e) => { }}
                    itemsList={[]}
                    selectStylesSx={commonSelectSxStyles}
                    formControlSx={commonFormControlSxStyles}
                />
            </Grid>
            <Grid item sm={2} className={`${styles["input-field"]}`}>
                <DropdownComponent
                    className={`${styles["dropdown"]} ${styles["extra-width"]}`}
                    label={"Tourism Value"}
                    name="tourism Value"
                    value={''}
                    handleChange={(e) => { }}
                    itemsList={[]}
                    selectStylesSx={commonSelectSxStyles}
                    formControlSx={commonFormControlSxStyles}
                />
            </Grid>
            <Grid item sm={2} className={`${styles["input-field"]}`}>
                <DropdownComponent
                    className={`${styles["dropdown"]} ${styles["extra-width"]}`}
                    label={"Risk"}
                    name="risk"
                    value={''}
                    handleChange={(e) => { }}
                    itemsList={[]}
                    selectStylesSx={commonSelectSxStyles}
                    formControlSx={commonFormControlSxStyles}
                />
            </Grid>
            {
                activeTab === EVENTS_TAB_NAME &&
                <Grid item sm={2} className={`${styles["input-field"]}`}>
                    <DropdownComponent
                        className={`${styles["dropdown"]}`}
                        label={"Assessment"}
                        name="Assessment"
                        value={''}
                        handleChange={(e) => { }}
                        itemsList={[]}
                        selectStylesSx={{
                            ...commonSelectSxStyles
                        }}
                        formControlSx={commonFormControlSxStyles}
                    />
                </Grid>
            }
            <Grid item sm={2} className={`${styles["location-grid-item"]}`}>
                <TextInput
                    className={`${styles["location"]}`}
                    label="Location"
                    name="location"
                    value={''}
                    onChange={(e) => { }}
                    // onBlur={() => validateCredentials('email')}
                    sx={{
                        ...textInputSxStyles
                    }}
                    formControlSx={commonFormControlSxStyles}
                />
            </Grid>
            <Grid item sm={2} className={`${styles["input-field"]}`}>
                <DropdownComponent
                    className={`${styles["dropdown"]} ${styles["extra-width"]}`}
                    label={"Artifacts"}
                    name="artifacts"
                    value={''}
                    handleChange={(e) => { }}
                    itemsList={[]}
                    selectStylesSx={commonSelectSxStyles}
                    formControlSx={commonFormControlSxStyles}
                />
            </Grid>
            {activeTab === EVENTS_TAB_NAME && <Grid item sm={2} className={`${styles["date-grid-item"]}`}>
                <DatePicker placeholderText='Date Range' className={`${styles["date"]}`} selected={startDate} onChange={(date: Date) => setStartDate(date)} />
            </Grid>}
        </>
    }

    const MediaInputs = () => {

        return <>
            <Grid item sm={2} className={`${styles["input-field"]}`}>
                <DropdownComponent
                    className={`${styles["dropdown"]} ${styles["extra-width"]}`}
                    label={"Artifacts"}
                    name="artifacts"
                    value={''}
                    handleChange={(e) => { }}
                    itemsList={[]}
                    selectStylesSx={commonSelectSxStyles}
                    formControlSx={commonFormControlSxStyles}
                />
            </Grid>
            <Grid item sm={2} className={`${styles["input-field"]}`}>
                <DropdownComponent
                    className={`${styles["dropdown"]} ${styles["extra-width"]}`}
                    label={"Artifacts"}
                    name="artifacts"
                    value={''}
                    handleChange={(e) => { }}
                    itemsList={[]}
                    selectStylesSx={commonSelectSxStyles}
                    formControlSx={commonFormControlSxStyles}
                />
            </Grid>
            <Grid item sm={2} className={`${styles["input-field"]}`}>
                <FormGroup className={`${styles["black-90-pct"]}`}>
                    <FormControlLabel style={{
                        accentColor: 'red'
                    }} control={<Checkbox  sx={{
                        color: "var(--grey-text)",
                        '&.Mui-checked': {
                          color: "var(--grey-text)",
                        },
                      }}/>} label="Featured Image" />
                </FormGroup>
            </Grid>
        </>
    }

    return (
        <Box className={`refined-inputs-container ${styles["refined-inputs-container"]}`}>
            <Grid container className={`${styles["refined-inputs-grid"]}`}>
                {
                    activeTab !== MEDIA_TAB_NAME &&
                    <BaseInputs />
                }
                {
                    activeTab === MEDIA_TAB_NAME &&
                    <MediaInputs />
                }
                <Grid item>
                    <Button label="SEARCH" colors={['transparent', 'var(--black-90-pct)', 'rgb(0 0 0) 0px 0px 2px -1px']} style={{
                        padding: '0 2em',
                        width: '100%'
                    }} />
                </Grid>
                {/* <Grid item>
                    <Button label="Reset" colors={['#000', '#fff', 'none']} style={{
                        padding: '0 2em',
                        textTransform: 'unset'
                    }} />
                </Grid> */}
            </Grid>
        </Box>
    );
}

export default RefinedSearchInputs;