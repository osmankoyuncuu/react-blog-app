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
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";
import ModalDelete from "../component/ModalDelete";
import { useEffect, useState } from "react";
import { getDataById } from "../auth/firebase";
import { useAuth } from "../context/AuthContext";

const Detail = () => {
  const [detail, setDetail] = useState("");
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const getDetail = async () => {
    const newDetail = await getDataById(id);
    setDetail(newDetail);
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <Box m={3}>
      <Card sx={{ maxWidth: 700, margin: "auto" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: cyan[700] }} aria-label="recipe">
              {detail?.["author"]?.[0]}
            </Avatar>
          }
          title={detail?.author}
          subheader={detail?.date}
        />
        <CardMedia
          component="img"
          height="400"
          image={detail?.img}
          alt={detail?.header}
        />
        <CardContent>
          <Typography
            variant="h5"
            color="text.secondary"
            align="justify"
            sx={{ color: "black", mb: 1 }}
          >
            {detail?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="justify">
            {detail?.content}
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
      {currentUser?.email === detail?.user && (
        <Box
          mt={2}
          sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}
        >
          <Button
            color="warning"
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() =>
              navigate(`/update-blog/${detail?.id}`, { state: detail })
            }
          >
            Update
          </Button>
          <Button
            color="error"
            variant="contained"
            endIcon={<DeleteIcon />}
            onClick={() => setOpen(!open)}
          >
            Send
          </Button>
        </Box>
      )}

      <ModalDelete open={open} setOpen={setOpen} id={detail?.id} />
    </Box>
  );
};

export default Detail;
