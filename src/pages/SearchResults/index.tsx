import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  SearchResultTabsProps,
  tabNameProps,
} from "../../types/SearchResultsTabsProps";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import Header from "../../components/Header";
import SearchResultTabs from "../../components/SearchResultTabs";
import useEvent from '../../hooks/useEvent';
import usePlace from '../../hooks/usePlace';
import useLibrary from "../../hooks/useLibrary";
import useMedia from "../../hooks/useMedia";

const SearchResults = ({ tabIndex }: SearchResultTabsProps) => {
  let { tabName } = useParams<{ tabName?: tabNameProps }>();

  const navigate = useNavigate();
  const {searchText} = useSelector((state: RootState) => state.searchResults);
  const {fetchEvents} = useEvent();
  const {fetchLibraryItems} = useLibrary();
  const {fetchPlaces} = usePlace();
  const {fetchMediaItems} = useMedia();

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' && searchText.length >= 3) {
      switch (tabName) {
        case 'Places':
          fetchPlaces(0, true);
          break;
        case 'Events':
          fetchEvents(0, true);
          break;
        case 'Library':
          fetchLibraryItems(0, true);
          break;
        case 'Media':
          fetchMediaItems(0, true);
          break;
      
        default:
          fetchPlaces(0, true);
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
    </>
  );
};

export default SearchResults;
