import Box from "@mui/material/Box";
import Header from "../../components/Header";
import SearchResultTabs from "../../components/SearchResultTabs";
import { SearchResultTabsProps } from "../../types/SearchResultsTabsProps";

const SearchResults = ({ tabIndex }: SearchResultTabsProps) => {
  return (
    <>
      <Header showSearch={true} showRefinedSearch={true}/>
      <Box>
        <SearchResultTabs tabIndex={tabIndex} />
      </Box>
    </>
  );
};

export default SearchResults;
