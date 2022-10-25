import styles from "./index.module.css";
import Box from '@mui/material/Box';

export const LinkExpired = () => {
  return <Box component="div" className={`${styles["expired-link-content"]}`}>
    <Box component="div">
      LINK EXPIRED
    </Box>
    <Box component="div">
    Please contact{' '}
      <a
        href="mailto: support@neomheritage.com?subject = Neom Heritage Support"
        target={"_blank"}
        rel="noreferrer"
      >
        support@neomheritage.com
      </a>
    </Box>
  </Box>
}
