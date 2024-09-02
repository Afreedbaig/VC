import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Home from "@mui/icons-material/Home";

import { AuthContext } from "../contexts/AuthContext";
import { IconButton } from "@mui/material";

export default function History() {
  const { getuserhistory } = useContext(AuthContext);

  const [meetings, setMeetings] = useState([]);

  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getuserhistory();
        setMeetings(history);
      } catch (e) {
        console.log(e);
      }
    };
    fetchHistory();
  });

  let formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <IconButton onClick={() => routeTo("/home")}>
        <Home />
      </IconButton>
      {meetings.length > 0 ? (
        meetings.map((e, i) => {
          return (
            <Box sx={{ maxWidth: 500 }} key={i}>
              <Card variant="outlined" key={i}>
                <React.Fragment>
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{ color: "text.secondary", fontSize: 14 }}
                    >
                      Code : {e.meetingCode}
                    </Typography>
                    <Typography variant="h5" component="div">
                      Date: {formatDate(e.date)}
                    </Typography>
                  </CardContent>
                </React.Fragment>
              </Card>
            </Box>
          );
        })
      ) : (
        <>
          <p>NO MEETING ATTANDED</p>
        </>
      )}
    </div>
  );
}
