import {
  Box,
  Grid,
  Popover,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

export const Techs = ({ refresh, setRefresh, techs }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [statusValue, setStatusValue] = useState(
    "Primeiro módulo (Introdução ao Frontend)"
  );
  const { handleSubmit, control } = useForm();

  const handleChange = (event, newValue) => {
    setStatusValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const deleteTech = (id) => {
    axios
      .delete(`https://kenziehub.herokuapp.com/users/techs/${id}`, {
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

  const addTech = (data) => {
    console.log(data);
    axios
      .post("https://kenziehub.herokuapp.com/users/techs/", data, {
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
            Minhas tecnologias
          </Grid>
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{
              alignSelf: "center",
              backgroundColor: "success.light",
              ":hover": { backgroundColor: "success.dark" },
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
            onSubmit={handleSubmit(addTech)}
            sx={{
              width: "50vh",
              height: "40vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Controller
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="Tecnologia"
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
            <Box component="span" sx={{ fontSize: "1rem", alignSelf: "left" }}>
              Experiência:
            </Box>
            <Controller
              render={({ field }) => (
                <ToggleButtonGroup
                  component="input"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "80%",
                    fontSize: "1rem",
                    gap: "2rem",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                  color="primary"
                  exclusive
                  value={statusValue}
                  onChange={handleChange}
                  {...field}
                >
                  <ToggleButton
                    sx={{
                      fontSize: "0.6rem",
                      border: "none",
                      padding: "0",
                      width: "25%",
                      height: "2rem",
                    }}
                    value="Iniciante"
                    key="1"
                  >
                    Iniciante
                  </ToggleButton>
                  <ToggleButton
                    sx={{
                      fontSize: "0.6rem",
                      border: "none",
                      padding: "0",
                      width: "25%",
                      height: "2rem",
                    }}
                    value="Intermediário"
                    key="2"
                  >
                    Intermediário
                  </ToggleButton>
                  <ToggleButton
                    sx={{
                      fontSize: "0.6rem",
                      border: "none",
                      padding: "0",
                      width: "25%",
                      height: "2rem",
                    }}
                    value="Avançado"
                    key="3"
                  >
                    Avançado
                  </ToggleButton>
                </ToggleButtonGroup>
              )}
              name="status"
              control={control}
              defaultValue=""
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: "success.main" }}
            >
              ADD TECNOLOGIA
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
        {techs.map((item, index) => {
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
                ":hover": { borderColor: "success.dark" },
              }}
              boxshadow={1}
            >
              <Grid
                item
                sx={{
                  height: "12vh",
                  width: "12vh",
                  backgroundColor: "success.light",
                  borderRadius: "5px",
                  ":hover": { backgroundColor: "success.dark" },
                }}
              ></Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  paddingLeft: "1rem",
                  flexGrow: "1",
                }}
              >
                <Box component="span">{item.title}</Box>
                <Box component="span" color="#818181">
                  {item.status}
                </Box>
              </Grid>
              <Grid
                item
                component="button"
                onClick={() => deleteTech(item.id)}
                sx={{
                  alignSelf: "center",
                  border: "none",
                  borderRadius: "10%",
                  cursor: "pointer",
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
