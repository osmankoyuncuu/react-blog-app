import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { cyan, grey } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";
import ModalDelete from "../component/ModalDelete";
import { useEffect, useState } from "react";
import {
  commentAddBlog,
  favoriteAddBlog,
  favoriteNoneBlog,
  getDataById,
} from "../auth/firebase";
import { useAuth } from "../context/AuthContext";
import Comment from "../component/Comment";
import SendIcon from "@mui/icons-material/Send";
import { Form, Formik } from "formik";
import * as yup from "yup";
import Loading from "../component/Loading";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const commentSchema = yup.object().shape({
  comment: yup.string().required("Please  enter an comment"),
});

const Detail = () => {
  const [detail, setDetail] = useState("");
  const [open, setOpen] = useState(false);
  const { currentUser, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleFavorite = (items) => {
    if (items?.favoriteList.includes(`${currentUser?.email}`)) {
      favoriteNoneBlog(items, currentUser);
    } else {
      favoriteAddBlog(items, currentUser);
    }
  };

  const getDetail = async () => {
    await getDataById(id, setDetail);
  };
  setTimeout(() => {
    setLoading(false);
  }, 1000);

  useEffect(() => {
    setLoading(true);
    getDetail();
  }, []);

  return loading ? (
    <Loading />
  ) : (
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
        <CardContent sx={{ backgroundColor: grey[200] }}>
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
          <IconButton
            aria-label="add to favorites"
            onClick={() => handleFavorite(detail)}
          >
            <FavoriteIcon
              sx={{
                color:
                  detail?.favoriteList?.includes(`${currentUser?.email}`) &&
                  "red",
              }}
            />
          </IconButton>
          <Typography>{detail?.favoriteList?.length}</Typography>
          <IconButton aria-label="comment" sx={{ marginLeft: "1rem" }}>
            <MessageIcon />
          </IconButton>
          <Typography>{detail?.commentList?.length}</Typography>
        </CardActions>
      </Card>
      <Box
        mt={2}
        sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}
        onClick={() => navigate(-1)}
      >
        <Button
          type="button"
          variant="contained"
          startIcon={<ArrowBackIosIcon />}
        >
          Go Back
        </Button>
      </Box>
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
            Delete
          </Button>
        </Box>
      )}
      <Box sx={{ maxWidth: 700, margin: "auto", mt: 2 }}>
        <Formik
          initialValues={{
            comment: "",
            date: new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            author: currentUser?.displayName,
            user: currentUser?.email,
          }}
          validationSchema={commentSchema}
          onSubmit={(values, actions) => {
            commentAddBlog(detail, values);
            actions.resetForm();
            actions.setSubmitting(false);
          }}
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ".5rem",
                }}
              >
                <TextField
                  label="Comment"
                  name="comment"
                  type="text"
                  variant="outlined"
                  value={values.comment}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.comment && Boolean(errors.comment)}
                  helperText={touched.comment && errors.comment}
                />
              </Box>
              <Box sx={{ mt: 2, display: "flex", justifyContent: "end" }}>
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                >
                  Send
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>

      <Comment commentList={detail?.commentList} />

      <ModalDelete open={open} setOpen={setOpen} id={detail?.id} />
    </Box>
  );
};

export default Detail;
