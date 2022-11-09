import { useState } from 'react';
import Box from '@mui/material/Box';
import styles from "./index.module.css";
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Icon from '@mui/material/Icon';
import Button from "../../components/Button";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ExportRequestDataType } from '../../types/ExportRequestDataType';
import { exportContentType } from '../../utils/export-import/export-content-type';
import { exportCsvImagesZip } from '../../utils/export-import/export-csv-images-zip';
import client from '../../utils/services/axiosClient';
import { baseUrl } from '../../utils/services/helpers';

import qs from 'qs';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ExportModal({open, setOpen, count, path, filter}:any) {
  const [isAssets, setIsAssets] = useState(false);
  const handleClose = () => setOpen(false);
  const exportData = async () => {
    try {
      const requestData: ExportRequestDataType = {
        collectionTypePlural: path,
      };
      if (filter) {
        requestData.filter = qs.stringify(filter);
      }
      await exportContentType(requestData);
    } catch (err) {
      console.log(err);
    }
  }
  const exportAssestsDataZip = async () => {
    try {
        const response = await client.get(`${baseUrl}/api/custom/${path}`, {
          params: { filter: qs.stringify(filter) },
        });
        if(path === 'visits' || path === 'places'){
          const files: { fileName: string; fileUrl: string }[] = [];
        await exportCsvImagesZip(files, response?.data);
        }else{
        const files = response?.data?.map((item: any) => ({
          fileName: item?.fileName,
          fileUrl: `${baseUrl}${item?.object?.url}`,
        }));
        await exportCsvImagesZip(files, response?.data);
      }
      } catch (err) {
        console.log(err);
      }
  }

  return (
    <div>      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="div" sx={style}> 
            <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Export
                    </Typography>
                </Grid>
                <Grid item xs={6} md={4} display="flex" justifyContent="flex-end" >
                    <Icon onClick={handleClose} sx={{ fontSize: 30 }}>
                          <CloseIcon />
                    </Icon>
                </Grid>
            </Grid>
            <Typography id="modal-modal-title-places" component="p">
                {count} {path}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Select what you want to export.
            </Typography>
            <FormGroup>
                <FormControlLabel  control={<Checkbox disabled defaultChecked color="default" />} label="Export data" />
                <FormControlLabel control={<Checkbox color="default" value={isAssets} onChange={(e: any) => setIsAssets(e.target.checked)}/>}  label="Export associated media and library files" />
            </FormGroup>
            <Grid container spacing={2} columns={12} marginTop={3}>
                <Grid item xs={6} display="flex" justifyContent="flex-start">
                    <Button
                        colors={[
                        "transparent",
                        "var(--table-black-text)",
                        "var(--table-black-text)",
                        ]}
                        label="CANCEL"
                        style={{
                            padding: "0.2em 15px",
                            lineHeight: "2",
                            height: "100%",
                            textAlign: "center",
                        }}
                        onClick={handleClose}
                    />
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="flex-end">
                    <Button
                        label="EXPORT"
                        style={{
                            color:"white",
                            backgroundColor: "black",
                            border: "1px solid var(--light-grey-border)",
                            borderRadius: "40px",
                            padding: "0.2em 15px",
                            lineHeight: "2",
                            height: "100%",
                            textAlign: "center",
                        }}
                        onClick={isAssets?exportAssestsDataZip:exportData}
                    />
                </Grid>
            </Grid>
        </Box>
      </Modal>
    </div>
  );
}