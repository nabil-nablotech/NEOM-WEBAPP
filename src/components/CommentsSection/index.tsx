import { useState } from 'react';
import { Grid } from "@mui/material";
import { CommentSectionProps } from '../../types/SearchResultsTabsProps';
import { commonFormControlSxStyles, textInputSxStyles } from '../../utils/services/helpers';
import TextInput from "../../components/TextInput";

const CommentsSection = ({
    SelfIcon
}: CommentSectionProps) => {

    const [inputs, setInputs] = useState('')

    return (
        <>
            <Grid container style={{
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1em'
            }}>
                <Grid item>
                    <SelfIcon />
                </Grid>
                <Grid item>
                    <TextInput
                        className={``}
                        label="Site Description"
                        name="site-description"
                        value={inputs}
                        onChange={(e) => {
                            e.preventDefault()
                            console.log(e.target.value)
                            setInputs(e.target.value)
                        }}
                        sx={{
                            ...textInputSxStyles,
                            marginBottom: '4em',
                            '& .MuiFormControl-root.MuiTextField': {
                                height: 'fit-content'
                            }
                        }}
                        formControlSx={commonFormControlSxStyles}
                    />
                </Grid>
            </Grid>

        </>
    );
}

export default CommentsSection;