import { Box, Container, Paper, Typography } from "@mui/material";
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import React, { useState, useEffect, useContext } from "react";
import { staysContext } from "../AppContext/TentsContext";
import StarIcon from '@mui/icons-material/Star';
import { BiLeaf } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const HomeSection4 = () => {
    const { allApartments } = useContext(staysContext);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [stayType, setStayType] = useState("apartments");
    const navigate = useNavigate();
    const HotelData = allApartments.slice(0, 8);

    // Automatic image change every 3 seconds
    useEffect(() => {
        if (HotelData.length > 0) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HotelData[0].about.images.length);
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [HotelData]);

    return (
        <Container
            maxWidth={false} // Remove max-width restriction
            sx={{ width: "100%", marginTop: "40px", px: { xs: 2, sm: 4 } }} // Add horizontal padding for better spacing
        >
            {/* Title */}
            <Typography
                data-aos="zoom-up"
                data-aos-duration="2000"
                variant="h5"
                sx={{
                    mb: 2,
                    marginBottom: "20px",
                    borderBottom: "2px solid grey",
                    width: { xs: "100%", sm: "20%" }, // Adjust width for smaller screens
                    borderImage: 'linear-gradient(to right, black, white) 10',
                }}
            >
                New Destinations
            </Typography>

            {/* Grid Layout */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr", // 1 column on extra-small screens
                        sm: "1fr 1fr", // 2 columns on small screens
                        md: "1fr 1fr 1fr", // 3 columns on medium screens
                        lg: "1fr 1fr 1fr 1fr", // 4 columns on large screens
                    },
                    gap: 2,
                }}
            >
                {HotelData.map((val, i) => (
                    <Paper
                        key={i}
                        sx={{
                            p: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "",
                            textAlign: "",
                            transition: "transform 0.3s ease-in-out",
                            "&:hover": { transform: "scale(1.05)" },
                        }}
                        data-aos="fade-up"
                        data-aos-duration="2000"
                    >
                        {/* Image Section */}
                        <Box
                            sx={{
                                width: "100%",
                                height: { xs: "200px", md: "300px" },
                                borderRadius: "10px",
                                objectFit: "cover",
                                position: "relative",
                            }}
                        >
                            <Box
                                component="img"
                                onClick={() => navigate("/productDetails", { state: { val, stayType } })}
                                src={val.about.images?.[currentImageIndex] || "fallback-image.jpg"}
                                sx={{
                                    width: "100%",
                                    height: { xs: "200px", md: "300px" },
                                    borderRadius: "20px",
                                    objectFit: "cover",
                                    position: "absolute",
                                    cursor: "pointer",
                                }}
                            />
                            {/* Weather and Rating */}
                            <Typography
                                variant="body2"
                                color="black"
                                sx={{
                                    position: "absolute",
                                    backgroundColor: "transparent",
                                    borderRadius: "10px",
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "end",
                                    paddingTop: "4px",
                                    paddingRight: "4px",
                                }}
                            >
                                <span className="bg-white p-1 rounded-lg font-bold">
                                    {val.weather.currentTemp} | <StarIcon sx={{ color: "orange" }} />
                                    {val.ratings.location}
                                </span>
                            </Typography>

                            {/* Image Dots */}
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "5px",
                                    position: "absolute",
                                    bottom: "10px",
                                }}
                            >
                                {val.about.images.map((_, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: "3px",
                                            height: "3px",
                                            borderRadius: "50%",
                                            backgroundColor: currentImageIndex === index ? "orange" : "gray",
                                            cursor: "pointer",
                                            transition: "background-color 0.3s ease",
                                        }}
                                        onClick={() => setCurrentImageIndex(index)}
                                    />
                                ))}
                            </Box>
                        </Box>

                        {/* Location and Name */}
                        <Typography variant="body1" sx={{ mt: 1, paddingLeft: "10px" }}>
                            {val.address.tal}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="body1" sx={{ mt: 0, paddingLeft: "10px", fontWeight: "bold" }}>
                                {val.campName}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <Typography
                                    sx={{
                                        width: "30px",
                                        height: "30px",
                                        border: "1px solid black",
                                        backgroundColor: "lightgrey",
                                        borderRadius: "50%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        mr: 1,
                                        mb: 1,
                                    }}
                                >
                                    <BedOutlinedIcon fontSize="small" sx={{ color: "#293E67" }} />
                                </Typography>
                                <Typography
                                    sx={{
                                        width: "30px",
                                        height: "30px",
                                        border: "1px solid black",
                                        backgroundColor: "lightgrey",
                                        borderRadius: "50%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        mr: 1,
                                        mb: 1,
                                    }}
                                >
                                    <BiLeaf color="#5B7830" />
                                </Typography>
                            </Box>
                        </Box>

                        {/* Price */}
                        <Typography variant="body1" sx={{ fontWeight: "semibold", color: "black", mt: 1, paddingLeft: "10px" }}>
                            ₹{val.prices.afterDiscount}{" "}
                            <s style={{ color: "gray", marginLeft: "5px" }}>₹{val.prices.actual}</s>
                        </Typography>
                    </Paper>
                ))}
            </Box>
        </Container>
    );
};

export default HomeSection4;