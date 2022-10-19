import { Box, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { tabNameProps } from "../../../types/SearchResultsTabsProps";

const DetailsPage = () => {
    let { tabName } = useParams<{ tabName?: tabNameProps, itemId: string }>();
    const navigate = useNavigate();

    return (
        <Box>
            <Button type="button" onClick={e => {
                e.preventDefault()
                navigate(`/search-results/${tabName}`, { replace: true })
            }}>
                Back to search results
            </Button>
        </Box>
    );
}

export default DetailsPage;