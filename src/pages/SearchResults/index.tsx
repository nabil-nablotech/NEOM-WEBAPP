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

const SearchResults = ({ tabIndex }: SearchResultTabsProps) => {
  let { tabName } = useParams<{ tabName?: tabNameProps }>();

  const navigate = useNavigate();
  const {searchText} = useSelector((state: RootState) => state.searchResults);
  const {fetchEvents} = useEvent();
  const {fetchPlaces} = usePlace();

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      switch (tabName) {
        case 'Places':
          fetchPlaces(0, true);
          break;
        case 'Events':
          fetchEvents(0);
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
