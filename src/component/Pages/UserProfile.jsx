import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Avatar, Card, CardContent, IconButton, TextField, Button, LinearProgress, InputAdornment } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { staysContext } from "../AppContext/TentsContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Edit } from "@mui/icons-material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const UserProfile = () => {
  const { userDetails, isLoggedIn } = useContext(staysContext);
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((resp) => {
      const matchedUser = resp.data.find((user) => user.email === userDetails.email);
      if (matchedUser) {
        setUserData(matchedUser);
        setUpdatedData(matchedUser);
      }
    }).catch((error) => {
      console.error("Error fetching user data:", error);
    });
  }, [userDetails.email]);

  const handleEdit = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios.put(`http://localhost:5000/users/${userData.id}`, updatedData)
      .then(() => {
        setUserData(updatedData);
        setEditMode({});
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  return (
    isLoggedIn ? (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", p: 2 }}>
        <Card sx={{ maxWidth: 400, width: "100%", textAlign: "center", p: 3, boxShadow: 3 }}>
          <Avatar src={userData?.profilePicture || ""} sx={{ bgcolor: deepPurple[500], width: 80, height: 80, fontSize: 32, margin: "auto" }}>
            {userData ? userData.username.charAt(0).toUpperCase() : "?"}
          </Avatar>

          <CardContent>
            {userData ? (
              <>
                {["username", "email", "contact"].map((field) => (
                  <Box key={field} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                    {editMode[field] ? (
                      <TextField name={field} value={updatedData[field] || ""} onChange={handleChange} fullWidth />
                    ) : (
                      <Typography variant="body1" color="text.secondary" sx={{ flexGrow: 1, textAlign: "left" }}>
                        {userData[field]}
                      </Typography>
                    )}
                    <IconButton onClick={() => handleEdit(field)}>
                      <Edit />
                    </IconButton>
                  </Box>
                ))}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                  {editMode.password ? (
                    <TextField
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={updatedData.password || ""}
                      onChange={handleChange}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  ) : (
                    <Typography variant="body1" color="text.secondary" sx={{ flexGrow: 1, textAlign: "left" }}>
                      ********
                    </Typography>
                  )}
                  <IconButton onClick={() => handleEdit("password")}>
                    <Edit />
                  </IconButton>
                </Box>

                {Object.values(editMode).some((val) => val) && (
                  <Button variant="contained" color="primary" onClick={handleSave} fullWidth>
                    Save Changes
                  </Button>
                )}
              </>
            ) : (
              <Typography variant="h6" color="text.secondary">
                User not found
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    ) : (
      <Box sx={{ width: "100%", height: "80vh" }}>
        <LinearProgress />
      </Box>
    )
  );
};

export default UserProfile;