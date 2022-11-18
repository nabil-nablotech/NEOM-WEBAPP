import Grid from '@mui/material/Grid';
import ExportCard from "../../components/ExportCard";
import Header from "../../components/Header";
import styles from "./index.module.css";

const ExportDownload = () => {

  return (
    <>
      <div> 
        <Header/>
        <Grid 
          container 
          direction="column"
          justifyContent="flex-start"
          alignItems="center" 
          component="div" className={`${styles["content-section"]}`}
          >
            {/* <Grid item component="div" className={`${styles["section-heading"]}`}>
                your data exports
            </Grid> */}
            <Grid
              item
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              component="div" className={`${styles["section-heading"]}`}
            >
              your data exports
            </Grid>
            <Grid
              item
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
            >
              <ExportCard/>
              <ExportCard/>
              <ExportCard/>
            </Grid>
            {/* <Grid container component="div" className={`${styles["section-card"]}`}>
                <ExportCard/>
            </Grid> */}
        </Grid>
      </div>
    </>
  );
};

export default ExportDownload;
