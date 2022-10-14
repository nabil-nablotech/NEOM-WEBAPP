import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  SearchResultTabsProps,
  tabNameProps,
} from "../../types/SearchResultsTabsProps";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import SearchResultTabs from "../../components/SearchResultTabs";;

const SearchResults = ({ tabIndex }: SearchResultTabsProps) => {
  let { tabName } = useParams<{ tabName?: tabNameProps }>();

  const navigate = useNavigate();
  const {searchText} = useSelector((state: RootState) => state.searchResults);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' && searchText.length > 3) {
      e.preventDefault()
      navigate(`/search-results/${tabName}?search=${encodeURIComponent(searchText)}`);
    }
  };

  return (
    <>
      <Header onKeyDown={onKeyDown} showSearch={true} showRefinedSearch={true}/>
      <Box>
        <SearchResultTabs tabIndex={tabIndex} />
      </Box>
    </>
  );
};

export default SearchResults;
