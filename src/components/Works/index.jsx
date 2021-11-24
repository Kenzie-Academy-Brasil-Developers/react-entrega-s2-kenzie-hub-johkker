import {
  Box,
  Grid,
  Popover,
  Button,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

export const Works = ({ refresh, setRefresh, works }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { handleSubmit, control } = useForm();

 

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const deleteWork = (id) => {
    axios
      .delete(`https://kenziehub.herokuapp.com/users/works/${id}`, {
        headers: {
          Authorization: `Bearer: ${JSON.parse(
            localStorage.getItem("@KenzieHub:token")
          )}`,
        },
      })
      .then((response) => {
        refresh === true ? setRefresh(false) : setRefresh(true);
        toast.success("Tecnologia deletada com sucesso!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addWork = (data) => {
    axios
      .post("https://kenziehub.herokuapp.com/users/works/", data, {
        headers: {
          Authorization: `Bearer: ${JSON.parse(
            localStorage.getItem("@KenzieHub:token")
          )}`,
        },
      })
      .then((response) => {
        refresh === true ? setRefresh(false) : setRefresh(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid
      item
      xs={12}
      sm={3.5}
      md={3.5}
      lg={3.5}
      xl={3.5}
      boxShadow={2}
      height={"70vh"}
    >
      <Box component="div" height={"10vh"}>
        <Grid
          container
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.5rem",
          }}
        >
          <Grid item component="span" sx={{ fontWeight: "bolder" }}>
            Meus projetos
          </Grid>
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{
              alignSelf: "center",
              backgroundColor: "secondary.main",
              ":hover": { backgroundColor: "secondary.dark" },
            }}
          >
            +
          </Button>
        </Grid>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit(addWork)}
            sx={{
              width: "50vh",
              height: "40vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              margin: "1rem 1rem",
            }}
          >
            <Controller
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="Projeto"
                  variant="outlined"
                  type="text"
                  sx={{ width: "80%" }}
                  {...field}
                />
              )}
              name="title"
              control={control}
              defaultValue=""
            />
            <Box
              component="span"
              sx={{ fontSize: "1rem", alignSelf: "left" }}
            ></Box>
            <Controller
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="Descrição"
                  variant="outlined"
                  type="text"
                  sx={{ width: "80%" }}
                  {...field}
                />
              )}
              name="description"
              control={control}
              defaultValue=""
            />
            <Controller
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="URL"
                  variant="outlined"
                  type="text"
                  sx={{ width: "80%" }}
                  {...field}
                />
              )}
              name="deploy_url"
              control={control}
              defaultValue=""
            />
            <Button variant="contained" type="submit" sx={{backgroundColor: "secondary.main"}}>
              ADD PROJETO
            </Button>
          </Box>
        </Popover>
      </Box>
      <Box
        component="ul"
        sx={{
          overflow: "auto",
          height: "55vh",
          "::-webkit-scrollbar": { display: "none" },
          paddingLeft: "0.5rem",
          boxShadow: "inset 0px 8px 5px -10px rgba(0,0,0,0.59)",
          margin: "0",
        }}
      >
        {works.map((item, index) => {
          return (
            <Grid
              container
              key={index}
              component="li"
              sx={{
                borderRight: "3px solid #cfcfcf",
                my: "0.5rem",
                px: "0.5rem",
                listStyle: "none",
                height: "14vh",
                width: "97%",
                ":hover": { borderColor: "secondary.dark" },
              }}
              boxshadow={1}
            >
              <Grid
                item
                sx={{
                  height: "12vh",
                  width: "12vh",
                  backgroundColor: "secondary.light",
                  borderRadius: "5px",
                  ":hover": { backgroundColor: "secondary.dark" },
                }}
              ></Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  paddingLeft: "1rem",
                  width: "1%",
                  maxHeight: "90%",
                  flexGrow: "1",
                }}
              >
                <Box
                  component="span"
                  sx={{ fontSize: "0.9rem", fontWeight: "bold" }}
                >
                  {item.title}
                </Box>
                <Box
                  component="span"
                  sx={{
                    fontSize: "0.7rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: "#818181",
                  }}
                >
                  {item.description}
                </Box>
              </Grid>
              <Grid
                item
                component="button"
                onClick={() => deleteWork(item.id)}
                sx={{
                  alignSelf: "center",
                  border: "none",
                  borderRadius: "10%",
                  cursor: "pointer",
                  ml: "0.7rem",
                }}
              >
                X
              </Grid>
            </Grid>
          );
        })}
      </Box>
    </Grid>
  );
};
