import { Redirect } from "react-router-dom";
import { Container, Box, Grid, Avatar } from "@material-ui/core";
import Logo from "../../assets/Logo";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import axios from "axios";
import { Techs } from "../../components/Techs";
import { Works } from "../../components/Works";
import { Info } from "../../components/Info";

function Home() {
  const [techs, setTechs] = useState([]);
  const [works, setWorks] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [id] = useState(
    JSON.parse(localStorage.getItem("@KenzieHub:id")) || ""
  );

  useEffect(() => {
    axios
      .get(`https://kenziehub.herokuapp.com/users/${id}`)
      .then((response) => {
        setTechs(response.data.techs);
        setWorks(response.data.works);
      });
      return () => {
        setTechs([])
        setWorks([])
      }
  }, [refresh]);

  if (id === "") {
    return <Redirect to="/" />;
  }

  return (
    <Container sx={{ flexGrow: 1, width: "100vw", height: "100vh" }}>
      <Toaster />
      <Grid container sx={{ justifyContent: "space-between", gap: "2rem"}}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          my={"2rem"}
          boxShadow={3}
          borderRadius={"4px"}
          sx={{ alignItems: "center", justifyContent: "center", height: "15%" }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1rem",
            }}
          >
            <Logo /> <Avatar />
          </Box>
        </Grid>
        <Techs techs={techs} refresh={refresh} setRefresh={setRefresh} />
        <Works works={works} refresh={refresh} setRefresh={setRefresh} />
        <Info />
      </Grid>
    </Container>
  );
}

export default Home;
