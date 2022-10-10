import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Places from "../../assets/images/searchResults/Places.svg";
import Events from "../../assets/images/searchResults/Events.svg";
import Library from "../../assets/images/searchResults/Library.svg";
import Media from "../../assets/images/searchResults/Media.svg";
import { LabelProps, SearchResultTabsProps, tabNameProps, TabPanelProps } from '../../types/SearchResultsTabsProps';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PlacesTab from './Places';
import EventsTab from './Events';


function TabPanel(props: TabPanelProps) {
    const { children, value, index, className, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }} className={className}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const TabLabels = [
    {
        img: Places,
        label: 'Places'
    },
    {
        img: Events,
        label: 'Events'
    },
    {
        img: Library,
        label: 'Library'
    },
    {
        img: Media,
        label: 'Media'
    },
]

const Label = ({
    img, label
}: LabelProps) => {

    return <>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5em'
        }}>
            <Box component="img" alt={""} src={img} />
            <Box sx={{
                color: 'initial'
            }}>{label}</Box>
        </Box>
    </>
}

const tabIndexBasedOnName = (tabName: tabNameProps) => {
    switch (tabName) {
        case 'Places': return 0
        case 'Events': return 1
        case 'Library': return 2
        case 'Media': return 3
    }
}

const SearchResultTabs = ({
    tabIndex
}: SearchResultTabsProps) => {
    const [value, setValue] = React.useState(0);
    let { tabName } = useParams<{tabName?: tabNameProps}>();

    const navigate = useNavigate();


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        let newLabel = TabLabels[newValue].label
        navigate(`/search-results/${newLabel ? newLabel : 'Places'}`, {replace: true})
    };

    useEffect(() => {
        if(tabName) {
            const newTabIndex = tabIndexBasedOnName(tabName)
            setValue(newTabIndex)
        }
    }, [tabName])


    return (
        <div className={`${styles['search-results-wrapper']}`}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    className={`${styles['tab-titles']}`}
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    indicatorColor="secondary"
                    TabIndicatorProps={{
                        sx: {
                            backgroundColor: "var(--clr-gold)"
                        }
                    }}
                    sx={{
                        paddingInline: 'var( --container-spacing)'
                    }}
                >
                    {
                        TabLabels.map((labelObj, index) => (
                            <Tab key={index} label={
                                <Label
                                    img={labelObj.img}
                                    label={labelObj.label}
                                />} {...a11yProps(index)}
                                sx={{
                                    textTransform: 'initial',
                                    padding: '0.2em 2em'
                                }}
                            />
                        ))
                    }
                </Tabs>
            </Box>
            <TabPanel value={value} index={0} className={`${styles['tab-pannel-wrapper']}`}>
                <PlacesTab />
            </TabPanel>
            <TabPanel value={value} index={1} className={`${styles['tab-pannel-wrapper']}`}>
                <EventsTab />
            </TabPanel>
            <TabPanel value={value} index={2} className={`${styles['tab-pannel-wrapper']}`}>
                Item Three
            </TabPanel>
        </div >
    );
}

export default SearchResultTabs;