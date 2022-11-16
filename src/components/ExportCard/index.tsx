import styles from "./index.module.css";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import IconButton from "@mui/material/IconButton";
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import {
    Button
} from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f9f7f2',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 751,
}));

const handleClick = () =>{
    console.log("Download clicked")
}
const ExportCard = () => {

  return (
    <>
        <StyledPaper
            sx={{
            my: 1,
            mx: 'auto',
            p: 2,
            }}
            className={`${styles["content-box"]}`}
        >
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item xs={12} sm={6} md={6} component="div" className={`${styles["grid-one"]}`}>
                    <Grid item xs={12} component="div" className={`${styles["box-heading"]}`}>
                            Places - Data and Files
                    </Grid>
                    <Grid item xs={12} component="div" className={`${styles["box-span"]}`}>
                            3 places | 50 media files | 3 library files
                    </Grid>
                </Grid>
                {/* <Grid item xs={12} sm={6} md={6} component="div"className={`${styles["grid-two"]}`}>
                    <Grid xs={12} component="div" className={`${styles["box-heading"]}`}>
                            Your download is being created
                    </Grid>
                    <Grid xs={12} component="div" className={`${styles["box-span"]}`}>
                            This may take a while. You can come back later.
                    </Grid>
                </Grid> */}
                <Grid item xs={12} sm={6} md={6} component="div"className={`${styles["grid-two"]}`}>
                    <Grid item xs={12} display="flex" justifyContent="flex-end" >
                        <Button
                            variant="text"
                            onClick= {handleClick}                        
                            style={{
                                color:"white",
                                backgroundColor: "black",
                                border: "1px solid var(--light-grey-border)",
                                borderRadius: "40px",
                                padding: "0.2em 15px",
                                lineHeight: "1",
                                height: "100%",
                                textAlign: "center",
                            }}
                        >
                            <IconButton>
                                <GetAppOutlinedIcon 
                                    style={{
                                        color:"white",
                                    }
                                }/>
                            </IconButton>
                            DOWNLOAD
                        </Button>                        
                    </Grid>
                </Grid>
            </Grid>
            
        </StyledPaper>
        
    </>
  );
};

export default ExportCard;
