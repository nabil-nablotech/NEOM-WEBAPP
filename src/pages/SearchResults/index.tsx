import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
import CustomDrawer from "../../components/CustomDrawer";
import {
  setActiveTab,
  toggleNewItemWindow,
  toggleShowAddSuccess,
} from "../../store/reducers/searchResultsReducer";
import AddNewItem from "../../components/AddNewItem";
import PositionedSnackbar from "../../components/Snackbar";
import { PLACES_TAB_NAME } from "../../utils/services/helpers";
import useRefinedSearch from "../../hooks/useRefinedSearchOptions";
import {
  setSearchText,
  setSearchApply,
} from "../../store/reducers/searchResultsReducer";

const SearchResults = ({ tabIndex }: SearchResultTabsProps) => {
  let { tabName } = useParams<{ tabName?: tabNameProps }>();
  const { data } = useRefinedSearch();
  const navigate = useNavigate();
  const { searchText, activeTab, newItemWindowOpen, showAddSuccess } =
    useSelector((state: RootState) => state.searchResults);
  const { fetchEvents, clearSearch: clearEventSearch } = useEvent();
  const { fetchLibraryItems } = useLibrary();
  const { fetchPlaces, clearSearch: clearPlaceSearch } = usePlace();
  const { fetchMediaItems } = useMedia();

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
        search: encodeURIComponent(
          JSON.stringify({
            search: searchText,
          })
        ),
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
      <CustomDrawer
        origin="right"
        isOpen={newItemWindowOpen}
        onClose={() => dispatch(toggleNewItemWindow(!newItemWindowOpen))}
      >
        <AddNewItem
          onClose={() => dispatch(toggleNewItemWindow(!newItemWindowOpen))}
        />
      </CustomDrawer>
      <PositionedSnackbar
        message={`New ${tabName === PLACES_TAB_NAME ? "Place" : "Event"} added`}
        severity={"success"}
        open={showAddSuccess}
        handleClose={() => dispatch(toggleShowAddSuccess(false))}
      />
    </>
  );
};

export default SearchResults;
