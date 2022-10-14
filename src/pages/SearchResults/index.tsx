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
    console.log('insdie the on key down', searchText)
    // e.preventDefault();
    if (e.code === 'Enter' && searchText.length > 3) {
    // if (searchText.length > 3) {
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
      // navigate(`${tabName}?search=${encodeURIComponent(searchText)}`);
    }
  };

  return (
    <>

      <Header onKeyDown={onKeyDown} showSearch={true} showRefinedSearch={true}/>
      <Box>
        <SearchResultTabs tabIndex={tabIndex} />
      </Box>
      <Outlet/>
    </>
  );
};

export default SearchResults;
