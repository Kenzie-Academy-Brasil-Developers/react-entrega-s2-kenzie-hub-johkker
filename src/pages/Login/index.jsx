import { Container, Box, Button, TextField} from "@material-ui/core";
import Logo from "../../assets/Logo";
import {useHistory, Redirect} from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Login({auth, setAuth}) {

    const history = useHistory();

    const handleNavigation = (path) => {
      return history.push(path);
    };

    const schema = yup.object().shape({
        email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
        password: yup.string().required("Campo obrigatório"),
    })

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    const submitFunction = (data) => {
      axios
        .post("https://kenziehub.herokuapp.com/sessions", data)
        .then((response) => {
          const {token, user} = response.data;
          localStorage.setItem("@KenzieHub:token", JSON.stringify(token));
          localStorage.setItem("@KenzieHub:user", JSON.stringify(user));
          localStorage.setItem("@KenzieHub:id", JSON.stringify(user.id));
          setAuth(true);
          return handleNavigation("/home");
        })
        .catch((err) => {
            toast.error("E-mail ou senha inválidos!")
        });
    };
    
    if(auth){
      return <Redirect to="/home" />
    }

    return (
        <>
        <Toaster
  position="top-center"
  reverseOrder={true}
/>
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
            error={!!errors.email}
            id="outlined-basic"
            label="Login"
            variant="outlined"
            type="text"
            sx={{ bgcolor: "#f5f5f5" }}
            helperText={errors.email?.message}
            {...register("email")}
          />
          <TextField
            id="outlined-basic"
            label="Senha"
            variant="outlined"
            type="password"
            {...register("password")}
          />
          <Button type="submit" variant="contained" sx={{ height: "3rem" }}>
            Logar
          </Button>
          <Box
            component="span"
            sx={{
              width: "70%",
              color: "#9e9e9e",
              fontSize: "0.7rem",
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            Crie uma página para mostrar suas habilidades, metas e progresso.
          </Box>
          <Button
            onClick={() => handleNavigation("/signup")}
            variant="outlined"
            sx={{ borderColor: "#9e9e9e", color: "#9e9e9e" }}
          >
            CADASTRAR
          </Button>
        </Box>
      </Container>
      </>
    );
}

export default Login;