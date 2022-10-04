import * as React from "react";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Button from '@mui/material/Button';
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type TransitionProps = Omit<SlideProps, "direction">;

function TransitionDown(props: TransitionProps) {
  return <Slide {...props} direction="down" />;
}

type SnackbarProps = {
  message: string | "";
  severity?: "error" | "info" | "warning" | "success";
  open: boolean;
  handleClose: () => void;
};

export default function PositionedSnackbar(props: SnackbarProps) {
  const { message, severity, open, handleClose } = props;
  const [state, setState] = React.useState<SnackbarOrigin>({
    vertical: "top",
    horizontal: "center",
  });

  
  const action:React.ReactNode = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const { vertical, horizontal } = state;

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        TransitionComponent={TransitionDown}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
        action={action}
        autoHideDuration={6000}
      >
        <Alert
          icon={false}
          onClose={handleClose}
          severity={severity ? severity : "success"}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
