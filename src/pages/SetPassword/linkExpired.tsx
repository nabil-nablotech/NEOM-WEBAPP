import styles from "./index.module.css";
import Box from '@mui/material/Box';

export const LinkExpired = () => {
  return <Box className={`${styles["expired-link-content"]}`}>
    <Box>
      LINK EXPIRED
    </Box>
    <Box>
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
