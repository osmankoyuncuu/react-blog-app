import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import BlogBoard from "../assets/blog-board.jpg";
import { Form, Formik } from "formik";
import { useAuth } from "../context/AuthContext";
import LoadingButton from "@mui/lab/LoadingButton";
import { updateBlog } from "../auth/firebase";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

const newBlogSchema = yup.object().shape({
  title: yup.string().required("Please  enter an title"),
  img: yup.string().required("Please  enter an img"),
  content: yup.string().required("Please  enter an content"),
});

const UpdateBlog = () => {
  const { currentUser, loading, setLoading } = useAuth();
  const { state: item } = useLocation();
  const { id, content, img, title } = item;
  const navigate = useNavigate();
  return (
    <Box
      mt={2}
      sx={{ display: "flex", justifyContent: "center", width: "100%" }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          padding: "2rem 5rem",
        }}
      >
        <img src={BlogBoard} alt="Blog-Board" width="40%" />
        <Box sx={{ width: "40%" }}>
          <Formik
            initialValues={{
              id: id,
              title,
              img,
              content,
              date: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              author: currentUser?.displayName,
              user: currentUser?.email,
            }}
            validationSchema={newBlogSchema}
            onSubmit={(values, actions) => {
              setLoading(true);
              updateBlog(values, setLoading, navigate);
              actions.setSubmitting(false);
            }}
          >
            {({
              values,
              isSubmitting,
              handleChange,
              handleBlur,
              touched,
              errors,
            }) => (
              <Form>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: ".5rem",
                  }}
                >
                  <TextField
                    label="Title"
                    name="title"
                    type="text"
                    variant="outlined"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                  />
                  <TextField
                    label="Image URL"
                    name="img"
                    type="text"
                    variant="outlined"
                    value={values.img}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.img && Boolean(errors.img)}
                    helperText={touched.img && errors.img}
                  />
                  <TextField
                    label="Content"
                    name="content"
                    type="text"
                    variant="outlined"
                    value={values.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.content && Boolean(errors.content)}
                    helperText={touched.content && errors.content}
                    multiline
                    rows={10}
                  />
                  <LoadingButton
                    type="submit"
                    loading={loading}
                    loadingPosition="center"
                    variant="contained"
                  >
                    Submit
                  </LoadingButton>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateBlog;
