import { useState } from "react";
import { Divider, Grid, Typography, Menu, MenuItem } from "@mui/material";
import CompanyIconFour from "@src/assets/svgs/CompanyIconFour.svg";
import CompanyIconThree from "@src/assets/svgs/CompanyIconThree.svg";
import deleteIcon from "@src/assets/svgs/Delete.svg";
import editIcon from "@src/assets/svgs/Edit.svg";
import ThreeDotter from "@src/assets/svgs/ThreeDotter.svg";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import "@src/components/common/presentational/education/education.scss";

function Education() {
  const constantData: LocalizationInterface = localizedData();
  const { educationHeading, editBtn, deleteBtn } = constantData.Education;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Education */}
      <Grid className="education-main" container>
        <Grid className="child-div-one" container item xs={12} sm={12}>
          <Grid item xs={10} sm={10} className="child-div-one-container-A">
            <Typography className="experience-text">
              {educationHeading}
            </Typography>
          </Grid>

          <Grid className="child-div-one-container-B" item xs={2} sm={2}>
            <div className="box">
              <div className="subBox">
                <img
                  className="profile-pic"
                  src={ThreeDotter}
                  alt="profile pic"
                  onClick={handleClick}
                />
                <Menu
                  PaperProps={{ sx: { width: "115px", height: "92px" } }}
                  id="demo-positioned-menu"
                  aria-labelledby="client-options-button"
                  anchorEl={anchorEl}
                  open={open}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  className="dropdownMenu"
                  onClose={handleClose}
                >
                  <MenuItem
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                    onClick={handleClose}
                  >
                    <img src={editIcon} alt="edit" />
                    {editBtn}
                  </MenuItem>
                  <MenuItem
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                    onClick={handleClose}
                  >
                    <img src={deleteIcon} alt="delete" />
                    {deleteBtn}
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </Grid>
        </Grid>

        <Grid
          className="child-div-two"
          container
          item
          xs={12}
          sm={12}
          height={90}
        >
          {/* B */}
          <Grid item className="child-div-two-A">
            <img
              className="profile-pic"
              src={CompanyIconThree}
              alt="profile pic"
            />
          </Grid>

          <Grid container item className="child-div-two-B">
            <Grid className="child-div-two-A" item>
              <Typography variant="body1" className="para">
                Bachelor in Computer Science
              </Typography>
            </Grid>

            <Grid
              container
              item
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              className="child-div-three-A"
            >
              <Grid item className="para-One-Div">
                <Typography variant="body1" className="para">
                  Pakistan Institute of Engineering and Applied Sciences Lahore,
                  Pakistan{" "}
                </Typography>
              </Grid>
              <Grid item className="para-Two-Div">
                <Typography variant="body1" className="para">
                  2016-2022
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid className="divider" xs={12} sm={12}>
          <Divider
            sx={{ color: "#E7E7E7", marginLeft: "24px", marginRight: "24px" }}
          />
        </Grid>

        <Grid
          className="child-div-two"
          container
          item
          xs={12}
          sm={12}
          height={90}
        >
          <Grid item className="child-div-two-A">
            <img
              className="profile-pic"
              src={CompanyIconFour}
              alt="profile pic"
            />
          </Grid>

          <Grid container item className="child-div-two-B">
            <Grid className="child-div-two-A" item>
              <Typography variant="body1" className="para">
                Intermediate in Computer Science
              </Typography>
            </Grid>

            <Grid
              container
              item
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              className="child-div-three-A"
            >
              <Grid item className="para-One-Div">
                <Typography variant="body1" className="para">
                  Kips College Johar Town, Lahore, Pakistan{" "}
                </Typography>
              </Grid>
              <Grid item className="para-Two-Div">
                <Typography variant="body1" className="para">
                  2016-2022
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Education;
