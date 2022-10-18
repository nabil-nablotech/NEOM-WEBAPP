import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  SearchResultTabsProps,
  tabNameProps,
} from "../../types/SearchResultsTabsProps";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import SearchResultTabs from "../../components/SearchResultTabs";
import useEvent from '../../hooks/useEvent';
import usePlace from '../../hooks/usePlace';
import { useEffect } from "react";
import CustomDrawer from "../../components/CustomDrawer";
import { useDispatch } from "react-redux";
import { setActiveTab, toggleNewItemWindow } from "../../store/reducers/searchResultsReducer";

const SearchResults = ({ tabIndex }: SearchResultTabsProps) => {
  let { tabName } = useParams<{ tabName?: tabNameProps }>();

  const navigate = useNavigate();
  const {searchText, activeTab, newItemWindowOpen} = useSelector((state: RootState) => state.searchResults);
  const {fetchEvents} = useEvent();
  const {fetchPlaces} = usePlace();

  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {

    if(
      /** default set tabname in store */
      tabName
    ){
      dispatch(setActiveTab(tabName))
    }
  }, [])

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

    if (e.code === 'Enter') {
      switch (tabName) {
        case 'Places':
          fetchPlaces({search_one: searchText});
          break;
        case 'Events':
          fetchEvents({search_one: searchText});
          break;
      
        default:
          fetchPlaces({search_one: searchText});
          break;
      }
      e.preventDefault();
      navigate(`/search-results/${tabName}?search=${encodeURIComponent(searchText)}`);
    }
  };

  return (
    <>
      <Header onKeyDown={onKeyDown} showSearch={true}/>
      <Box>
        <SearchResultTabs tabIndex={tabIndex} />
      </Box>
      <CustomDrawer origin="right" isOpen = {newItemWindowOpen} onClose={() => dispatch(toggleNewItemWindow(!newItemWindowOpen))}/>
    </>
  );
};

export default SearchResults;
