import {Grid} from "@material-ui/core"

export const Info = () => {
    return (
      <Grid
        item
        xs={12}
         sm={4}
      md={4}
      lg={4}
      xl={4}
        boxShadow={2}
        height={"63vh"}
        sx={{backgroundImage: "url('https://i.ibb.co/Hz1ZWpZ/Screenshot-from-2021-11-24-13-32-29.png')", borderRadius:"5px", backgroundRepeat: "no-repeat", backgroundSize: "contain"}}
      ></Grid>
    );
}