import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { cyan } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { useBlogList } from "../context/BlogListContext";

const BlogCard = () => {
  const navigate = useNavigate();
  const { blogList } = useBlogList();
  return blogList?.map((item) => (
    <Card
      key={item.id}
      sx={{
        width: 345,
        height: 450,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: cyan[700] }} aria-label="recipe">
              {item?.author[0].toUpperCase()}
            </Avatar>
          }
          title={`${item?.author.charAt(0).toUpperCase()}${item?.author.slice(
            1
          )}`}
          subheader={item?.date}
        />
        <Box
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`/detail/${item?.id}`)}
        >
          <CardMedia
            component="img"
            height="200"
            image={item?.img}
            alt={item?.header}
          />
          <CardContent>
            <Typography
              variant="h5"
              color="text.secondary"
              align="justify"
              sx={{ color: "black", mb: 1 }}
            >
              {item?.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="justify"
              className="lineClamp"
            >
              {item?.content}
            </Typography>
          </CardContent>
        </Box>
      </Box>
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
