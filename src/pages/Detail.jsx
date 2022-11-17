import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Detail = () => {
  return (
    <Box m={3}>
      <Card sx={{ maxWidth: 700, margin: "auto" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="370"
          image="https://picsum.photos/200/300"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" align="justify">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon sx={{ color: "red" }} />
          </IconButton>
          <Typography>3</Typography>
          <IconButton aria-label="comment" sx={{ marginLeft: "1rem" }}>
            <MessageIcon />
          </IconButton>
          <Typography>3</Typography>
        </CardActions>
      </Card>
      <Box
        mt={2}
        sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}
      >
        <Button color="warning" variant="contained" startIcon={<EditIcon />}>
          Update
        </Button>
        <Button color="error" variant="contained" endIcon={<DeleteIcon />}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Detail;
