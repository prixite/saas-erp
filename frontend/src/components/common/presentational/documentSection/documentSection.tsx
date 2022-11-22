import { Divider, Grid, Typography, Box, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import deleteIcon from "@src/assets/svgs/Delete.svg";
import docIcon from "@src/assets/svgs/doc.svg";
import uploadIcon from "@src/assets/svgs/paperupload.svg";
import showIcon from "@src/assets/svgs/Show.svg";
import ThreeDotter from "@src/assets/svgs/ThreeDotter.svg";
import { EmployeeDoc } from "@src/helpers/interfaces/employees-modal";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import "@src/components/common/presentational/documentSection/documentSection.scss";
import { useGetEmployeeDocsQuery } from "@src/store/reducers/employees-api";

const DocumentSection = () => {
  const constantData: LocalizationInterface = localizedData();
  const { employeeExperienceLetters, uploadDocument } = constantData.Employee;
  const { employeeId } = useParams();
  const { data: EmployeeDocs, isLoading } = useGetEmployeeDocsQuery({
    employeeId,
  });
  const openInNewTab = (url: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };
  return (
    <Box className="documentation-main">
      <Box className="documentation-heading">
        <Typography className="heading-text">
          {employeeExperienceLetters}
        </Typography>
        <img className="heading-img" src={ThreeDotter} alt="menu" />
      </Box>
      {!isLoading ? (
        EmployeeDocs?.map((doc: EmployeeDoc, index: number) => {
          return (
            <Box className="documentation-section" key={doc?.name}>
              <Grid
                container
                className="documentation-grid"
                onClick={() => openInNewTab(doc?.document_url)}
              >
                <Grid className="doc-box" item xs={6} sm={6}>
                  <Box className="doc-img-box">
                    <img className="doc-img" src={docIcon} alt="doc" />
                  </Box>
                  <Box className="doc-info-box">
                    <Typography className="file-name"> {doc?.name}</Typography>
                    <Typography className="file-szie"> 250 KB</Typography>
                  </Box>
                </Grid>
                <Grid className="doc-actions" item xs={6} sm={6}>
                  <img
                    className="delete-img"
                    src={deleteIcon}
                    alt="delete"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <img className="show-img" src={showIcon} alt="show" />
                </Grid>
              </Grid>
              {index !== EmployeeDocs.length - 1 ? (
                <Divider sx={{ color: "#E7E7E7", mt: "25px" }} />
              ) : null}
            </Box>
          );
        })
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}

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
