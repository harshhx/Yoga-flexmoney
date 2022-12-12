import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Details() {
  const firstName = sessionStorage.getItem("first_name");
  const lastName = sessionStorage.getItem("last_name");
  const batch_details = JSON.parse(sessionStorage.getItem("batch_details"));

  const getName = () => {
    var name = "";
    if (firstName) {
      name += firstName + " ";
    }
    if (lastName) {
      name += lastName;
    }
    return name;
  };

  return (
    <Card sx={{ minWidth: 275, width: "50%", margin: "10% auto" }}>
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          Welcome
        </Typography>
        <Typography variant="h5" component="div">
          {getName()}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          these are your current seession details
        </Typography>
        <Typography variant="body2">
          {batch_details?.name}
          <br />
          {batch_details?.timings}
        </Typography>
      </CardContent>
      <CardActions>
        <Button disabled size="large" style={{ color: "blue" }}>
          {batch_details?.days_remaining + " days remaining "}
        </Button>
      </CardActions>
    </Card>
  );
}
