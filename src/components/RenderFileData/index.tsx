import { Box } from "@mui/material";
import { RenderFileDataProps } from "../../types/SearchResultsTabsProps";

/** component created to erender normal image -video - blob based on props */
const RenderFileData = ({
    fileType,
    fileData
}: RenderFileDataProps) => {
    return (
        <>
            {
                fileType === 'image' &&
                <Box
                    className={fileData.className}
                    component="img"
                    alt={fileData.alt ? fileData.alt : ''}
                    src={fileData.src}
                />
            }
            {
                fileType === 'video' &&
                <>
                    <Box
                        className={fileData.className}
                        component="img"
                        alt={fileData.alt ? fileData.alt : ''}
                        src={fileData.thumbNail}
                    />
                </>
            }
        </>
    );
}
 
export default RenderFileData;