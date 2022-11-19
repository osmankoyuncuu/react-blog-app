import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { cyan, grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import { v4 as uuid } from "uuid";

const Comment = ({ commentList }) => {
  return commentList?.map((item) => {
    return (
      <Box sx={{ mt: 2 }} key={uuid()}>
        <Card sx={{ maxWidth: 700, margin: "auto" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: cyan[700] }} aria-label="recipe">
                {item?.["author"]?.[0]}
              </Avatar>
            }
            title={item?.author}
            subheader={item?.date}
          />
          <CardContent sx={{ backgroundColor: grey[200] }}>
            <Typography
              variant="body2"
              color="text.secondary"
              align="justify"
              sx={{ fontSize: "1.1rem", color: "black" }}
            >
              {item?.comment}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  });
};

export default Comment;
