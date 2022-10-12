import {useState} from 'react';
import { Box } from "@mui/material";
import DropdownComponent from './../Dropdown/index';
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import styles from './index.module.css';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const RefinedSearchInputs = () => {
    const commonSelectSxStyles = {
        textAlign: 'left',
        '& .MuiSelect-select': {
            padding: '0.5em 1em'
        },
    }
    const commonFormControlSxStyles = {
        width: '100%',
    }
    const textInputSxStyles = {
        color: '#fff',

        '& .MuiInputBase-input.MuiOutlinedInput-input': {
            color: '#fff',
        },
        '& .MuiFormLabel-root.MuiInputLabel-root ': {
            color: '#fff',
        },
        '& .MuiInputBase-input.MuiOutlinedInput-input ': {
            lineHeight: '1.2',
            border: '1.4px solid #fff',
            padding: '0.5em 1em',
            height: '1.3em',
            borderRadius: '0.3em'
        },
        '& .MuiOutlinedInput-notchedOutline span': {
            backgroundColor: '#000',
            opacity: 1
        }

    }

    const [startDate, setStartDate] = useState(new Date());

    return (
        <Box className={`refined-inputs-container ${styles["refined-inputs-container"]}`}>
            <DropdownComponent
                className={`${styles["dropdown"]}`}
                label={"State of Conservation"}
                name="conservation"
                value={''}
                handleChange={(e) => { }}
                itemsList={[]}
                selectStylesSx={commonSelectSxStyles}
            />
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
            <DropdownComponent
                className={`${styles["dropdown"]}`}
                label={"Recommendation"}
                name="recommendation"
                value={''}
                handleChange={(e) => { }}
                itemsList={[]}
                selectStylesSx={commonSelectSxStyles}
            />
            <DropdownComponent
                className={`${styles["dropdown"]}`}
                label={"Research Value"}
                name="research Value"
                value={''}
                handleChange={(e) => { }}
                itemsList={[]}
                selectStylesSx={commonSelectSxStyles}
            />
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
            />
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
            />
            <DatePicker placeholderText='Date Range' className={`${styles["date"]}`} selected={null} onChange={(date:Date) => setStartDate(date)} />
            <Button label="SEARCH" colors={['#fff', '#000', 'none']} style={{
                padding: '0 2em'
            }} />
            <Button label="Reset" colors={['#000', '#fff', 'none']} style={{
                padding: '0 2em',
                textTransform: 'unset'
            }} />
        </Box>
    );
}

export default RefinedSearchInputs;