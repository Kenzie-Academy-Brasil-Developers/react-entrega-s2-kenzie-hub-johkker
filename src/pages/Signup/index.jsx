import { Container, Box, Button, TextField} from "@material-ui/core";
import Logo from "../../assets/Logo";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller }  from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Signup () {


  const [moduleValue, setModuleValue] = useState(
    "Primeiro módulo (Introdução ao Frontend)"
  );

  const handleChange = (event, newValue) => {
    setModuleValue(newValue);
  };

      const history = useHistory();

      const handleNavigation = (path) => {
        return history.push(path);
      };

      const schema = yup.object().shape({
        email: yup
          .string()
          .email("E-mail inválido")
          .required("Campo obrigatório"),
        password: yup.string().required("Campo obrigatório").min(6, "Mínimo de 6 caracteres."),
        confirm_password: yup.string().required("Campo obrigatório").oneOf([yup.ref("password")], "As senhas não conferem."),
        name: yup.string().required("Campo obrigatório"),
        bio: yup.string().required("Campo obrigatório"),
        contact: yup.string().required("Campo obrigatório"),
        course_module: yup.string().required("Campo obrigatório")
      });

      const {
        register,
        handleSubmit,
        formState: { errors },
        control,
      } = useForm({
        resolver: yupResolver(schema)
      });


      const submitFunction = ({email, password, name, bio, contact, course_module}) => {
        const user = {
            email,
            password,
            name,
            bio,
            contact,
            course_module
          };
          console.log(user);
        axios
          .post("https://kenziehub.herokuapp.com/users", user)
          .then((response) => {
            toast.success("Cadastro efetuado com sucesso! Agora é só fazer login :)")
          })
          .catch((err) => {
            toast.error(`${err.message}`);
            console.log(err)
          });
      };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "3rem",
        mt: "3rem",
        transition: "0.6s",
      }}
    >
      <Toaster />
      <Logo />
    
      <Box
        component="form"
        onSubmit={handleSubmit(submitFunction)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem",
          border: "1px solid #e0e0e0",
          borderRadius: "0.3rem",
          width: "90vw",
          maxWidth: "500px",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Nome"
          variant="outlined"
          type="text"
          sx={{ bgcolor: "#f5f5f5" }}
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
          type="text"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          id="outlined-basic"
          label="Bio"
          variant="outlined"
          type="text"
          {...register("bio")}
          error={!!errors.bio}
          helperText={errors.bio?.message}
        />
        <TextField
          id="outlined-basic"
          label="Contato"
          variant="outlined"
          type="text"
          {...register("contact")}
          error={!!errors.contact}
          helperText={errors.contact?.message}
        />

        <Box component="span" sx={{ color: "#5f5f5f", paddingLeft: "0.5rem" }}>
          Selecione seu módulo:
        </Box>
        {!!errors.course_module && <span>{errors.course_module?.message}</span>}
        <Controller
          render={({ field }) => (
            <ToggleButtonGroup
              component="input"
              sx={{
                display: "flex",
                flexDirection: "row",
                maxWidth: "100%",
                fontSize: "0.5rem",
                gap: "1rem",
                alignItems: "center",
                justifyContent: "center",
              }}
              color="primary"
              exclusive
              value={moduleValue}
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
                value="Primeiro módulo (Introdução ao Frontend)"
                key="Q1"
              >
                Primeiro
              </ToggleButton>
              <ToggleButton
                sx={{
                  fontSize: "0.6rem",
                  border: "none",
                  padding: "0",
                  width: "25%",
                  height: "2rem",
                }}
                value="Segundo módulo (Frontend Avançado)"
                key="Q2"
              >
                Segundo
              </ToggleButton>
              <ToggleButton
                sx={{
                  fontSize: "0.6rem",
                  border: "none",
                  padding: "0",
                  width: "25%",
                  height: "2rem",
                }}
                value="Terceiro módulo (Introdução ao Backend)"
                key="Q3"
              >
                Terceiro
              </ToggleButton>
              <ToggleButton
                sx={{
                  fontSize: "0.6rem",
                  border: "none",
                  padding: "0",
                  width: "25%",
                  height: "2rem",
                }}
                value="Quarto módulo (Backend Avançado)"
                key="Q4"
              >
                Quarto
              </ToggleButton>
            </ToggleButtonGroup>
          )}
          name="course_module"
          control={control}
          defaultValue=""
          value={moduleValue}
        />

        <TextField
          id="outlined-basic"
          label="Senha"
          variant="outlined"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          id="outlined-basic"
          label="Confirmar senha"
          variant="outlined"
          type="password"
          {...register("confirm_password")}
          error={!!errors.confirm_password}
          helperText={errors.confirm_password?.message}
        />
        <Button type="submit" variant="contained" sx={{ height: "2rem" }}>
          CADASTRAR
        </Button>
        <Button
          onClick={() => handleNavigation("/")}
        >
          LOGIN
        </Button>
      </Box>
    </Container>
  );
};

export default Signup;
