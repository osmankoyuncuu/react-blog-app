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
import "../App.css";

const BlogCard = () => {
  return [1, 2, 3, 4, 5, 6].map((item) => (
    <Card sx={{ maxWidth: 345 }}>
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
        height="194"
        image="https://picsum.photos/200/300"
        alt="Paella dish"
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          align="justify"
          className="lineClamp"
        >
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like. Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Illum repellat laudantium iure voluptate alias
          maiores quibusdam recusandae ducimus voluptatibus tempore. Enim neque
          tempora quidem nesciunt cumque voluptatibus maiores deserunt eaque!
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <Typography>3</Typography>
        <IconButton aria-label="comment" sx={{ marginLeft: "1rem" }}>
          <MessageIcon />
        </IconButton>
        <Typography>3</Typography>
      </CardActions>
    </Card>
  ));
};

export default BlogCard;
