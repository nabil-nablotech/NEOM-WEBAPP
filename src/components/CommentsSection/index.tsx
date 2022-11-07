import { ChangeEvent, useState } from 'react';
import { Grid, Box } from "@mui/material";
import { CommentSectionProps, SingleCommentProps } from '../../types/SearchResultsTabsProps';
import { commonFormControlSxStyles, textInputSxStyles } from '../../utils/services/helpers';
import TextInput from "../../components/TextInput";
import styles from './index.module.css'
import { CustomMoreOptionsComponent } from '../CustomMoreOptionsComponent';

const SingleComment = ({
    SelfIcon,
    getRemarks,
    remarks,
    addRemarks,
    commentObj,
}: SingleCommentProps) => {

    const actionsArray = [
        {
            label: 'Support',
            action: () => { }
        },
        {
            label: 'Delete',
            action: () => { }
        }
    ]

    return <>
        <Box component="div">
            <Grid container style={{
                justifyContent: 'start',
                alignItems: 'start',
                gap: '0.5em',
                marginBottom: '1em',
                marginLeft: `calc(${commentObj.nestingLevel}* 10%)`
            }}>
                <Grid item sm={1}>
                    <SelfIcon />
                </Grid>
                <Grid item sm={8}>
                    <Box component="div" style={{
                        display: 'inline-block',
                        lineHeight: '1.2'
                    }}>
                        <Box component="div" style={{
                            fontWeight: 'bold',
                            float: 'left',
                            marginRight: '0.5em'
                        }}>{commentObj.commentor}</Box>
                        <Box component="div">{commentObj.comment}</Box>
                    </Box>
                    <Grid container style={{
                        color: 'var(--medium-gray)',
                        alignItems: 'center'
                    }}>
                        <Grid item style={{
                            marginRight: '1em'
                        }}>{commentObj.timeStamp}</Grid>
                        <Grid item style={{
                            marginRight: '2em'
                        }}>Reply</Grid>
                        <Grid item>
                            <CustomMoreOptionsComponent
                                menuActions={actionsArray}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {
                commentObj.nestedCommentsCount > 0 ?
                    <>
                        {
                            commentObj.nestedComments && commentObj.nestedComments?.map((singleCommentItem, index: number) => (
                                <div key={index}>
                                    <SingleComment
                                        remarks={remarks}
                                        addRemarks={addRemarks}
                                        getRemarks={getRemarks}
                                        SelfIcon={SelfIcon}
                                        commentObj={singleCommentItem}
                                    />
                                </div>
                            ))
                        }
                    </> :
                    <></>
            }
        </Box>
    </>
}

const CommentsSection = ({
    SelfIcon,
    remarks,
    addRemarks,
    getRemarks
}: CommentSectionProps) => {

    const [inputs, setInputs] = useState('')

    const commentsJson = [
        {
            commentor: 'Mark Stein',
            comment: 'Sed ut perspiciatis unde omnis iste natus error sign ut sai gon perspiciatis unde omnis iste ut',
            timeStamp: '1 day ago',
            nestedCommentsCount: 0,
            nestingLevel: 0
        },
        {
            commentor: 'Robert Phil',
            comment: 'Sed ut perspiciatis unde omnis iste nis iste ut',
            nestedCommentsCount: 1,
            timeStamp: '1 day ago',
            nestingLevel: 0,
            nestedComments: [
                {
                    commentor: 'Mark Stein',
                    comment: ' perspiciatis unde omnis iste ut',
                    nestedCommentsCount: 0,
                    timeStamp: '1 day ago',
                    nestingLevel: 1
                }
            ]
        },
    ]

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
       e.preventDefault();
        console.log('e....', e.keyCode)
    }

    return (
        <Box component="div" className={`${styles['comments-container']}`}>
            <Grid container style={{
                justifyContent: 'start',
                alignItems: 'center',
                gap: '1em',
                marginBottom: '2em'
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
                            setInputs(e.target.value)
                        }}
                        onKeyDown={onKeyDown}
                        sx={{
                            ...textInputSxStyles,
                            '& .MuiFormControl-root.MuiTextField': {
                                height: 'fit-content'
                            }
                        }}
                        formControlSx={commonFormControlSxStyles}
                    />
                   
                </Grid>
            </Grid>
            <Box component="div" className={`${styles['comments-list-parent-box']}`}>
                {
                    commentsJson.map((singleCommentItem, index: number) => (
                        <div key={index}>
                            <SingleComment
                                remarks={remarks}
                                addRemarks={addRemarks}
                                getRemarks={getRemarks}
                                SelfIcon={SelfIcon}
                                commentObj={singleCommentItem}
                            />
                        </div>
                    ))
                }
            </Box>
        </Box>
    );
}

export default CommentsSection;