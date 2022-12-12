import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { BACKEND_URL } from "../constant";

import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { notifyError } from "../toast";
import { Grid } from "@mui/material";


function Enroll({active, setActive}) {
  const [batches, setBatches] = React.useState([]);
  const [curBatch, setCurBatch] = React.useState("");
  const firstName = sessionStorage.getItem("first_name");
  const lastName = sessionStorage.getItem("last_name");
  const [loading, setLoading] = React.useState(false);

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

  React.useEffect(() => {
    axios
      .get(BACKEND_URL + "batch/")
      .then((res) => {
        if (res?.data?.success) {
          setBatches(res?.data?.data);
        } else {
          console.log(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log("OOPS! some error occurred");
      })
      .finally(() => {});
  }, []);


  const validate = () => {
    if(parseInt(sessionStorage.getItem('age'))<18 || parseInt(sessionStorage.getItem('age'))>65){
      notifyError("Sorry! Only people between age 18 to 65 can enroll");
      return false;
    }
    return true;
  }

  const handleSubmit = () => {
    const cnt = validate();
    if(!cnt){
      return 
    }
    setLoading(true);
    axios
      .post(BACKEND_URL + "enroll/", {
        user_id: sessionStorage.getItem("user_id"),
        batch_id: curBatch,
      })
      .then((res) => {
        if (res?.data?.success) {
          const temp = res?.data?.data;
          sessionStorage.setItem("user_id", temp?.user_id);
          sessionStorage.setItem("first_name", temp?.first_name);
          sessionStorage.setItem("age", temp?.age);
          sessionStorage.setItem(
            "batch_details",
            JSON.stringify(temp?.batch_details)
          );
          sessionStorage.setItem("session_active", temp?.session_active);
          if (temp?.session_active) {
            setActive(true);
          }
        } else {
            notifyError(res?.data?.message)
        }
      }).catch((err)=>{
        console.log("OOPS! Some error occured")
      }).finally(()=>{
        setLoading(false);
      });
  };

  return (
    <Grid>
    <ToastContainer />
    <Card sx={{ minWidth: 275, width: "50%", margin: "10% auto" }}>
     
     <CardContent>
       <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
         Welcome
       </Typography>
       <Typography variant="h5" component="div">
         {getName()}
       </Typography>
       <Box sx={{ minWidth: 120 }} style={{ marginTop: "8%" }}>
         <FormControl fullWidth>
           <InputLabel id="demo-simple-select-label">Batches</InputLabel>
           <Select
             labelId="demo-simple-select-label"
             id="demo-simple-select"
             value={curBatch}
             label="Batches"
             onChange={(e) => {
               setCurBatch(e.target.value);
             }}
           >
             {batches.map((x) => (
               <MenuItem value={x.id}>{x.name + " " + x.timings}</MenuItem>
             ))}
           </Select>
         </FormControl>
       </Box>
       <br />
       <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         NOTE: If you are enrolling in between of month you would have to pay
         for the complete Month.
       </Typography>

       <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         Once booked timings of the sessions can not be changed
       </Typography>
     </CardContent>
     <CardActions>
       <Button variant="contained" size="large" onClick={handleSubmit} style={{minWidth:"150px", maxHeight:"40px"}}>
       {loading ? (
                 <CircularProgress style={{ color: "white" }} />
               ) : (
                 <Typography>Pay Rs: 500</Typography>
               )}
         
       </Button>
     </CardActions>
   </Card>
    </Grid>
    
  );
}

export default Enroll;
