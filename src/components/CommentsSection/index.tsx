import { useState } from 'react';
import { Grid, Box } from "@mui/material";
import { CommentSectionProps, SingleCommentProps } from '../../types/SearchResultsTabsProps';
import { commonFormControlSxStyles, textInputSxStyles } from '../../utils/services/helpers';
import TextInput from "../../components/TextInput";
import styles from './index.module.css'
import { CustomMoreOptionsComponent } from '../CustomMoreOptionsComponent';

const SingleComment = ({
    SelfIcon,
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
        <Box>
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
                    <Box style={{
                        display: 'inline-block',
                        lineHeight: '1.2'
                    }}>
                        <Box style={{
                            fontWeight: 'bold',
                            float: 'left',
                            marginRight: '0.5em'
                        }}>{commentObj.commentor}</Box>
                        <Box>{commentObj.comment}</Box>
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
                            commentObj.nestedComments && commentObj.nestedComments.map(singleCommentItem => (
                                <>
                                    <SingleComment
                                        SelfIcon={SelfIcon}
                                        commentObj={singleCommentItem}
                                    />
                                </>
                            ))
                        }
                    </> :
                    <></>
            }
        </Box>
    </>
}

const CommentsSection = ({
    SelfIcon
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

    return (
        <Box className={`${styles['comments-container']}`}>
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
                            console.log(e.target.value)
                            setInputs(e.target.value)
                        }}
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
            <Box className={`${styles['comments-list-parent-box']}`}>
                {
                    commentsJson.map(singleCommentItem => (
                        <>
                            <SingleComment
                                SelfIcon={SelfIcon}
                                commentObj={singleCommentItem}
                            />
                        </>
                    ))
                }
            </Box>
        </Box>
    );
}

export default CommentsSection;