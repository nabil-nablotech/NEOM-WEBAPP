import React, { useEffect } from "react";
import styles from "./index.module.css";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { SelectChangeEvent } from "@mui/material/Select";

import Places from "../../assets/images/searchResults/Places.svg";
import Events from "../../assets/images/searchResults/Events.svg";
import Library from "../../assets/images/searchResults/Library.svg";
import Media from "../../assets/images/searchResults/Media.svg";
import {
  LabelProps,
  SearchResultTabsProps,
  tabNameProps,
  TabPanelProps,
} from "../../types/SearchResultsTabsProps";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PlacesTab from "./Places";
import EventsTab from "./Events";
import LibraryTab from "./Library";
import MediaTab from "./Media/index";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RefinedSearchInputs from "../RefinedSearchInputs";
import { tabIndexBasedOnName } from "../../utils/services/helpers";
import DetailsPage from "./DetailsPage";
import { useDispatch } from "react-redux";
import {setSelectedValue} from '../../store/reducers/refinedSearchReducer';

function TabPanel(props: TabPanelProps) {
  const { children, value, index, className, ...other } = props;

  return (
    <div
      className={`${styles["tab-panel-component"]}`}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} className={className}>
          <Grid>{children}</Grid>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const TabLabels = [
  {
    img: Places,
    label: "Places",
  },
  {
    img: Events,
    label: "Events",
  },
  {
    img: Library,
    label: "Library",
  },
  {
    img: Media,
    label: "Media",
  },
];

const Label = ({ img, label }: LabelProps) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5em",
        }}
      >
        <Box component="img" alt={""} src={img} />
        <Box
          sx={{
            color: "initial",
          }}
        >
          {label}
        </Box>
      </Box>
    </>
  );
};

const initialState = {
  stateOfConservation: [],
  period: [],
  recommendation: [],
  researchValue: [],
  tourismValue: [],
  risk: [],
  assessmentType: [],
  artifacts: [],
  location: '',
}
const SearchResultTabs = ({ tabIndex, handleSubmit }: SearchResultTabsProps) => {
  const [value, setValue] = React.useState(0);
  let { tabName, itemId } = useParams<{ tabName?: tabNameProps, itemId: string }>();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchText } = useSelector((state: RootState) => state.searchResults);
  const { options, selectedValue } = useSelector((state: RootState) => state.refinedSearch);

  useEffect(() => {
    if (tabName) {
      const newTabIndex = tabIndexBasedOnName(tabName);
      setValue(newTabIndex);
      dispatch(setSelectedValue(initialState));
    }
  }, [tabName]);

  const handleSelectChange =(e: SelectChangeEvent<string | string[]>) => {
    const selectedValueCopy = JSON.parse(JSON.stringify(selectedValue));
    selectedValueCopy[e.target.name] = e.target.value;
    e.preventDefault();
    dispatch(setSelectedValue(selectedValueCopy));
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    let newLabel = TabLabels[newValue].label;
    event.preventDefault();
    navigate(`/search-results/${newLabel ? newLabel : "Places"}${searchText ? '?search=' : ''}${searchText}`, {
      replace: true,
    });
  };

  const handleButtonSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const copiedValue = JSON.parse(JSON.stringify(selectedValue));
    Object.keys(copiedValue).map(x => {
      if (copiedValue[x].length === 0) {delete copiedValue[x];}
      return x;
    });
    const searchParams = new URLSearchParams(copiedValue);
    if (handleSubmit) {
      handleSubmit();
    }
    navigate(`/search-results/${tabName}${searchText ? '?search=' : ''}${searchText}?${searchParams}`, {
      replace: true,
    });
  };

  const handleClear = (e: any, name?: string) => {
    const selectedValueCopy = JSON.parse(JSON.stringify(selectedValue));
    console.log('e...........', name);
    if (name) {
      selectedValueCopy[name] = name === 'location' ? '' : [];
      e.preventDefault();
      dispatch(setSelectedValue(selectedValueCopy));
    }
  };

  /** If get itedId, means its details page
   * Hence replace tabs view and open normal view
   */
  if(itemId) {
    return <>
      <div className={`${styles["search-results-wrapper"]}`}>
        <DetailsPage />
      </div>
    </>
  }

  return (
    <div className={`${styles["search-results-wrapper"]}`}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          className={`${styles["tab-titles"]}`}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          indicatorColor="secondary"
          TabIndicatorProps={{
            sx: {
              backgroundColor: "var(--clr-gold)",
            },
          }}
          sx={{
            paddingInline: "var( --container-spacing)",
          }}
        >
          {TabLabels.map((labelObj, index) => (
            <Tab
              key={index}
              label={<Label img={labelObj.img} label={labelObj.label} />}
              {...a11yProps(index)}
              sx={{
                textTransform: "initial",
                padding: "0em 2em",
                minHeight: "35px",
              }}
              className={`${styles["tab"]}`}
            />
          ))}
        </Tabs>
      </Box>
      {value !== 2 && <Box className={`${styles["refined-search-box"]}`} sx={{
        '& .Mui-expanded.MuiPaper-root.MuiAccordion-root': {
          marginInline: 'auto',
        },
        '& .MuiPaper-root.MuiAccordion-root': {
          backgroundColor: 'transparent',
          boxShadow: 'none'
        },
        '& .MuiAccordionSummary-root': {
          marginInline: 'auto',
          width: 'fit-content'
        }
      }}>
        <Accordion className={`${styles["refined-search-wrapper"]}`} sx={{
          '& .Mui-expanded': {
          }
        }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{
              color: 'var(--grey-text)'
            }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div style={{
              letterSpacing: '0.1em',
              color: 'var(--grey-text)'
            }}>Refine Search</div>
          </AccordionSummary>
          <AccordionDetails style={{
            padding: 0
          }}>
            <RefinedSearchInputs handleClear={handleClear} handleChange={handleSelectChange} handleSubmit={handleButtonSubmit} selectedValue={selectedValue} options={options} activeTabIndex={value} />
          </AccordionDetails>
        </Accordion>
      </Box>}
      <TabPanel
        value={value}
        index={0}
        className={`${styles["tab-pannel-wrapper"]}`}
      >
        <PlacesTab />
      </TabPanel>
      <TabPanel
        value={value}
        index={1}
        className={`${styles["tab-pannel-wrapper"]}`}
      >
        <EventsTab />
      </TabPanel>
      <TabPanel
        value={value}
        index={2}
        className={`${styles["tab-pannel-wrapper"]}`}
      >
        <LibraryTab />
      </TabPanel>
      <TabPanel
        value={value}
        index={3}
        className={`${styles["tab-pannel-wrapper"]}`}
      >
        <MediaTab />
      </TabPanel>
    </div>
  );
};

export default SearchResultTabs;
