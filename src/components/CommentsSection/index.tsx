import { ChangeEvent, useState } from 'react';
import { Grid, Box } from "@mui/material";
import { CommentSectionProps, SingleCommentProps } from '../../types/SearchResultsTabsProps';
import { commonFormControlSxStyles, formatDateTime, textInputSxStyles } from '../../utils/services/helpers';
import TextInput from "../../components/TextInput";
import styles from './index.module.css'
import { CustomMoreOptionsComponent } from '../CustomMoreOptionsComponent';
import { Remark, ChildRemark, RemarkDetails } from '../../types/Remarks';

const SingleComment = ({
    SelfIcon,
    remark,
    addRemarks,
    type
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
                marginLeft: `calc(${1}* 10%)` // TODO: add nesting level hardcode
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
                        }}>{type === "child" ? `${remark?.users_permissions_user?.firstName} ${remark?.users_permissions_user?.lastName}` : `${remark.remark_details?.users_permissions_user?.firstName} ${remark.remark_details?.users_permissions_user?.lastName}`}</Box>
                        <Box component="div">{type === "child" ? remark?.description : remark?.remark_details.description}</Box>
                    </Box>
                    <Grid container style={{
                        color: 'var(--medium-gray)',
                        alignItems: 'center'
                    }}>
                        <Grid item style={{
                            marginRight: '1em'
                        }}>{type === "child" ? formatDateTime(remark?.updatedAt) : formatDateTime(remark?.remark_details.updatedAt)}</Grid>
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
                remark.remark_details?.child?.length > 0 ?
                    <>
                        {remark.remark_details.child?.map((remark: any, index: number) => (
                                <div key={index}>
                                    <SingleComment
                                        remark={remark}
                                        addRemarks={addRemarks}
                                        SelfIcon={SelfIcon}
                                        type="child"
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
    id,
    type,
    SelfIcon,
    remarks,
    addRemarks
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
        if (e.code === "Enter") {
        e.preventDefault();
        addRemarks({
            id,
            type: type,
            description: inputs
        })
        setInputs('')
       }
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
                            setInputs(e.target.value)
                            e.preventDefault();
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
                    remarks && remarks.map((remark: Remark, index: number) => (
                        <div key={index}>
                            <SingleComment
                                remark={remark}
                                addRemarks={addRemarks}
                                SelfIcon={SelfIcon}
                                // commentObj={singleCommentItem}
                            />
                        </div>
                    ))
                }
            </Box>
        </Box>
    );
}

export default CommentsSection;