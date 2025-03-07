import { Box, Typography } from "@mui/material";
import React from "react";
import img1 from "../../assets/HomePage/img1.png";
import img2 from "../../assets/HomePage/img2.png";
import img3 from "../../assets/HomePage/img3.png";
import img4 from "../../assets/HomePage/img4.png";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const HomeSection2 = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 10,
      }}
    >
      {/* Title */}
      <Typography
        data-aos="zoom-up"
        data-aos-duration="2000"
        variant="h5"
        sx={{
          mb: 10,
          bgcolor: "amber.100",
          textAlign: "center",
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          borderRadius: 2,
        }}
      >
        Discover the Touch of Nature
      </Typography>

      {/* Image Grid */}
      <Box
  sx={{
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
    gap: 2, // Reduced gap for tighter spacing
    width: '100%', // Ensures the container spans the full width
    px: 2, // Optional: Add padding to the sides for better spacing
  }}
>
  {/* Image 1 */}
  <Box
    data-aos={window.innerWidth < 600 ? "zoom-in" : "fade-up"}
    sx={{ position: 'relative', mt: { xs: 4, sm: 2 } }}
  >
    <Box
      component="img"
      src={img1}
      alt="Kokan"
      sx={{ width: '100%', height: 'auto', borderRadius: 2 }}
    />
    <Typography
      sx={{
        position: 'absolute',
        top: { xs: 12, sm: 6 },
        right: { xs: 24, sm: 6 },
        bgcolor: 'white',
        color: 'black',
        px: 2,
        py: 1,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <LocationOnOutlinedIcon />
      Kokan
    </Typography>
  </Box>

  {/* Image 2 */}
  <Box
    data-aos={window.innerWidth < 600 ? "zoom-in" : "fade-up"}
    data-aos-delay="200"
    sx={{ position: 'relative', mt: { xs: 2, sm: 10 }, ml: { xs: 10, sm: 0 } }}
  >
    <Box
      component="img"
      src={img2}
      alt="E.Coast"
      sx={{ width: '100%', height: 'auto', borderRadius: 2 }}
    />
    <Typography
      sx={{
        position: 'absolute',
        top: { xs: 6, sm: 22 },
        right: { xs: 12, sm: 6 },
        bgcolor: 'white',
        color: 'black',
        px: 2,
        py: 1,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <LocationOnOutlinedIcon />
      E.Coast
    </Typography>
  </Box>

  {/* Image 3 */}
  <Box
    data-aos={window.innerWidth < 600 ? "zoom-in" : "fade-up"}
    data-aos-delay="300"
    sx={{ position: 'relative', mt: { xs: 2, sm: 0 } }}
  >
    <Box
      component="img"
      src={img3}
      alt="Canada"
      sx={{ width: '100%', height: 'auto', borderRadius: 2 }}
    />
    <Typography
      sx={{
        position: 'absolute',
        top: { xs: 6, sm: 2 },
        right: { xs: 24, sm: 6 },
        bgcolor: 'white',
        color: 'black',
        px: 2,
        py: 1,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <LocationOnOutlinedIcon />
      Canada
    </Typography>
  </Box>

  {/* Image 4 */}
  <Box
    data-aos={window.innerWidth < 600 ? "zoom-in" : "fade-up"}
    data-aos-delay="400"
    sx={{ position: 'relative', mt: { xs: 2, sm: 10 }, ml: { xs: 20, sm: 0 } }}
  >
    <Box
      component="img"
      src={img4}
      alt="Andaman"
      sx={{ width: '100%', height: 'auto', borderRadius: 2 }}
    />
    <Typography
      sx={{
        position: 'absolute',
        top: { xs: 6, sm: 22 },
        right: { xs: 4, sm: 6 },
        bgcolor: 'white',
        color: 'black',
        px: 2,
        py: 1,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <LocationOnOutlinedIcon />
      Andaman
    </Typography>
  </Box>
</Box>
    </Box>
  );
};

export default HomeSection2;
