import { Divider, Grid, Typography, Box, Button } from "@mui/material";
import "@src/components/common/presentational/documentSection/documentSection.scss";
import deleteIcon from "@src/assets/svgs/Delete.svg";
import docIcon from "@src/assets/svgs/doc.svg";
import uploadIcon from "@src/assets/svgs/paperupload.svg";
import showIcon from "@src/assets/svgs/Show.svg";
import ThreeDotter from "@src/assets/svgs/ThreeDotter.svg";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";

const DocumentSection = () => {
  const constantData: LocalizationInterface = localizedData();
  const { employeeExperienceLetters, uploadDocument } = constantData.Employee;
  return (
    <Box className="documentation-main">
      <Box className="documentation-heading">
        <Typography className="heading-text">
          {employeeExperienceLetters}
        </Typography>
        <img className="heading-img" src={ThreeDotter} alt="menu" />
      </Box>
      <Grid container className="documentation-grid">
        <Grid className="doc-box" item xs={6} sm={6}>
          <Box className="doc-img-box">
            <img className="doc-img" src={docIcon} alt="doc" />
          </Box>
          <Box className="doc-info-box">
            <Typography className="file-name">
              {" "}
              Product Designer at 12c.inc_Experience.pdf
            </Typography>
            <Typography className="file-szie"> 250 KB</Typography>
          </Box>
        </Grid>
        <Grid className="doc-actions" item xs={6} sm={6}>
          <img className="delete-img" src={deleteIcon} alt="delete" />
          <img className="show-img" src={showIcon} alt="show" />
        </Grid>
      </Grid>
      <Divider sx={{ color: "#E7E7E7", mt: "25px" }} />
      <Grid container className="documentation-grid">
        <Grid className="doc-box" item xs={6} sm={6}>
          <Box className="doc-img-box">
            <img className="doc-img" src={docIcon} alt="doc" />
          </Box>
          <Box className="doc-info-box">
            <Typography className="file-name">
              {" "}
              Product Designer at 12c.inc_Experience.pdf
            </Typography>
            <Typography className="file-szie"> 250 KB</Typography>
          </Box>
        </Grid>
        <Grid className="doc-actions" item xs={6} sm={6}>
          <img className="delete-img" src={deleteIcon} alt="delete" />
          <img className="show-img" src={showIcon} alt="show" />
        </Grid>
      </Grid>
      <Divider sx={{ color: "#E7E7E7", mt: "25px" }} />
      <Box className="upload-box">
        <Button className="upload-btn">
          <span>
            {" "}
            <img className="upload-img" src={uploadIcon} alt="doc" />
          </span>{" "}
          {uploadDocument}
        </Button>
      </Box>
    </Box>
  );
};

export default DocumentSection;
