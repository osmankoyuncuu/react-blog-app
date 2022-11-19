import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import BlogBoard from "../assets/blog-board.jpg";
import { Form, Formik } from "formik";
import { useAuth } from "../context/AuthContext";
import LoadingButton from "@mui/lab/LoadingButton";
import { newBlog } from "../auth/firebase";
import * as yup from "yup";

const newBlogSchema = yup.object().shape({
  title: yup.string().required("Please  enter an title"),
  img: yup.string().required("Please  enter an img"),
  content: yup.string().required("Please  enter an content"),
});

const NewBlog = () => {
  const { currentUser, loading, setLoading } = useAuth();
  return (
    <Box
      mt={2}
      sx={{ display: "flex", justifyContent: "center", width: "100%" }}
    >
      <Box
        sx={{
          width: "100%",
          height: "515px",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          padding: "2rem",
        }}
      >
        {" "}
        <Box
          sx={{
            width: "100%",
            borderRadius: "1rem",
            overflow: "hidden",
            display: { xs: "none", lg: "flex" },
          }}
        >
          <img src={BlogBoard} alt="Blog-Board" width="100%" height="100%" />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Formik
            initialValues={{
              title: "",
              img: "",
              content: "",
              date: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              author: currentUser?.displayName,
              user: currentUser?.email,
              favoriteList: [],
              commentList: [],
            }}
            validationSchema={newBlogSchema}
            onSubmit={(values, actions) => {
              setLoading(true);
              newBlog(values, setLoading);
              actions.resetForm();
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
                    gap: ".7rem",
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

export default NewBlog;
