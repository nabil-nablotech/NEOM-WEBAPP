import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {Box, Grid, Button} from "@mui/material";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import {
  SearchResultTabsProps,
  tabNameProps,
} from "../../types/SearchResultsTabsProps";
import Header from "../../components/Header";
import SearchResultTabs from "../../components/SearchResultTabs";
import useEvent from "../../hooks/useEvent";
import usePlace from "../../hooks/usePlace";
import useLibrary from "../../hooks/useLibrary";
import useMedia from "../../hooks/useMedia";
import {
  setActiveTab,
  toggleShowAddSuccess,
  toggleShowEditSuccess
} from "../../store/reducers/searchResultsReducer";
import PositionedSnackbar from "../../components/Snackbar";
import { PLACES_TAB_NAME } from "../../utils/services/helpers";
import useRefinedSearch from "../../hooks/useRefinedSearchOptions";
import {setSearchText, } from '../../store/reducers/searchResultsReducer';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import styles from './index.module.css'

const SearchResults = ({ tabIndex }: SearchResultTabsProps) => {
  let { tabName, uniqueId } = useParams<{ tabName?: tabNameProps, uniqueId?: string}>();
  useRefinedSearch();
  const navigate = useNavigate();
  // const { searchText, activeTab, newItemWindowOpen, showAddSuccess } =
  const { searchText, showAddSuccess,addNewItemWindowType, showEditSuccess} =
    useSelector((state: RootState) => state.searchResults);
  const { fetchEvents, clearSearch: clearEventSearch, setEdit: setEditEvents } = useEvent();
  const { fetchLibraryItems, setEdit: setEditLibrary } = useLibrary();
  const { fetchPlaces, clearSearch: clearPlaceSearch, setEdit: setEditPlaces } = usePlace();
  const { fetchMediaItems, setEdit: setEditMedia } = useMedia();

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      /** default set tabname in store */
      tabName
    ) {
      dispatch(setActiveTab(tabName));
    }
  }, []);

  const handleSubmit = () => {
    switch (tabName) {
      case "Places":
        fetchPlaces(0, true);
        break;
      case "Events":
        fetchEvents(0, true);
        break;
      case "Library":
        fetchLibraryItems(0, true);
        break;
      case "Media":
        fetchMediaItems(0, true);
        break;
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && searchText.trim().length >= 3) {
      handleSubmit();
      e.preventDefault();
      navigate({
        pathname: `/search-results/${tabName}`,
        search: decodeURIComponent(JSON.stringify({
          search: searchText
        }))
      });
    }
  };

  /**on click on cross icon on global search text input */
  const handleClearSearchText = async () => {
    await dispatch(setSearchText(""));
    switch (tabName) {
      case "Places":
        clearPlaceSearch();
        break;
      case "Events":
        clearEventSearch();
        break;
      case "Library":
        fetchLibraryItems(0, true, true);
        break;
      case "Media":
        fetchMediaItems(0, true, true);
        break;
    }
    navigate({
      pathname: `/search-results/${tabName}`,
    });
  };

  const handleLogo = async () => {
    await dispatch(setSearchText(""));
    await navigate("/");
  };

  const handleEdit = () => {
    if (uniqueId) {
      let record = {}
      switch (tabName) {
        case 'Media':
          setEditMedia({attributes: {
            uniqueId
          }});
          break;
        case 'Library':
          setEditLibrary({record: {attributes: {
            uniqueId
          }}, type: tabName})
          break;
        case 'Events':
          setEditEvents({record: {attributes: {
            uniqueId
          }}, type: tabName})
          break;
        case 'Places':
          setEditPlaces({record: {attributes: {
            uniqueId
          }}, type: tabName})
          break;
      }
      dispatch(toggleShowAddSuccess(false));
      return record;
    }
  }

  const ContinueEditing = () => {
    
    return <Box component="div">
      <Grid container style={{
        gap: '10px',
        alignItems: 'center'
      }}>
        <Grid item>{`New ${tabName} added.`}</Grid>
        <Grid item className={`${styles['continue-btn']}`}>
          <Button variant="text" onClick={e => {
              handleEdit();
           }}
            startIcon={<CreateOutlinedIcon fontSize="small" />}
            style={{
              minWidth: 'fit-content',
              padding: 0,
              color: '#fff',
              borderColor: '#fff',
              fontSize: 'smaller'
            }}
            sx={{
              '& .MuiButton-startIcon': {
                marginRight: '2px'
              }
            }}
          >CONTINUE EDITING</Button>
        </Grid>
      </Grid>
    </Box>
  }

  const successMessage = () => {
    let screen = 'Place';
    switch (tabName) {
      case 'Events':
        screen = 'Event'
        break;
      case 'Library':
        screen = 'Library'
        break;
      case 'Media':
        screen = 'Media'
        break;
    }
    return screen;
  }
  return (
    <>
      <Header
        handleLogo={handleLogo}
        onKeyDown={onKeyDown}
        handleClearSearchText={handleClearSearchText}
        showSearch={true}
      />
      <Box component="div">
        <SearchResultTabs handleSubmit={handleSubmit} tabIndex={tabIndex} />
      </Box>
      <PositionedSnackbar
        message={<ContinueEditing />}
        severity={"success"}
        open={showAddSuccess && !showEditSuccess}
        handleClose={() => dispatch(toggleShowAddSuccess(false))}
        duration={10000}
      />
      <PositionedSnackbar
        message={`${successMessage()} updated`}
        severity={"success"}
        open={showEditSuccess}
        handleClose={() => {
          dispatch(toggleShowEditSuccess(false))
        }}
        duration={5000}
      />
    </>
  );
};

export default SearchResults;
