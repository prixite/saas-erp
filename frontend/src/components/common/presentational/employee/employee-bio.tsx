import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import employeeAvatar from "@src/assets/images/avatar.jpeg";

const EmployeeBio = () => {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={11}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              margin: "20px 0px",
              flexGrow: 1,
              backgroundColor: "#ffcdcd3b",
            }}
          >
            <Grid container spacing={2}>
              <Grid item>
                <Avatar alt="employee" src={employeeAvatar} />
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="row">
                  <Grid item xs={12} md={2} lg={2}>
                    <Typography variant="h5" component="h1">
                      Nolan Aminoff
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Chip
                      label="PX-01"
                      size="small"
                      sx={{ bgcolor: "#EDEDED" }}
                    />
                    <Chip
                      label="Permanent"
                      size="small"
                      sx={{ bgcolor: "#FFE5B3", color: "#970000", ml: 2 }}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    lg={6}
                    container
                    spacing={1}
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography
                        gutterBottom
                        variant="body2"
                        sx={{ color: "#6C6C6C" }}
                      >
                        Sr. Product Designer
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <MailOutlineIcon
                        sx={{ width: "15px", color: "#FF2F2F" }}
                      />
                      <Typography
                        gutterBottom
                        variant="body2"
                        sx={{ fontSize: "16px", m: 1 }}
                      >
                        nolan.aminoff@prixite.com
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <PhoneInTalkIcon
                        sx={{ width: "15px", color: "#FF2F2F" }}
                      />
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="h2"
                        sx={{ fontSize: "16px", m: 1 }}
                      >
                        0300 6262988
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default EmployeeBio;
