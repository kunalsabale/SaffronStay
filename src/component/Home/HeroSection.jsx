"use client"

import { Box, Typography, Button } from "@mui/material"
import { useEffect, useState } from "react"
import HeroImg from "../../assets/HomePage/beachImg.jpg"
import { KeyboardArrowDown } from "@mui/icons-material"

const HeroSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  // Handle scroll effect for parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Fade-in animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  // Scroll to content function
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "80vh", sm: "100vh" },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Image with Parallax Effect */}
      <Box
        component="img"
        src={HeroImg}
        alt="Scenic beach landscape"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          transform: `translateY(${scrollPosition * 0.4}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Overlay for better text readability */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* Content Container */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "1200px",
          textAlign: "center",
          padding: { xs: 2, sm: 4 },
          opacity: isVisible ? 1 : 0,
          transition: "opacity 1.5s ease, transform 1.5s ease",
          transform: isVisible ? "translate(-50%, -50%)" : "translate(-50%, -40%)",
        }}
      >
        {/* Tagline with staggered animation */}
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: 500,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 2,
            opacity: isVisible ? 1 : 0,
            transition: "opacity 1s ease 0.3s",
            textShadow: "0px 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          Discover Extraordinary Destinations
        </Typography>

        {/* Main Heading */}
        <Typography
          variant="h2"
          sx={{
            color: "white",
            fontWeight: 700,
            fontSize: { xs: "2rem", sm: "3rem", md: "4rem", lg: "5rem" },
            lineHeight: 1.2,
            marginBottom: 3,
            fontFamily: "'Playfair Display', serif",
            textShadow: "0px 2px 6px rgba(0,0,0,0.4)",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 1s ease 0.6s",
          }}
        >
          Leave Only Footprints,
          <br />
          Take Only Memories
        </Typography>

        {/* CTA Button */}
        <Box
          sx={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 1s ease 0.9s",
          }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "white",
              color: "#1976d2",
              fontWeight: 600,
              padding: "12px 30px",
              borderRadius: "30px",
              textTransform: "none",
              fontSize: "1rem",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                boxShadow: "0px 6px 15px rgba(0,0,0,0.2)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Explore Destinations
          </Button>
        </Box>
      </Box>

      {/* Scroll Down Indicator */}
      <Box
        sx={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 1s ease 1.2s",
        }}
        onClick={scrollToContent}
      >
        <Typography
          variant="body2"
          sx={{
            color: "white",
            marginBottom: 1,
            textShadow: "0px 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          Scroll Down
        </Typography>
        <KeyboardArrowDown
          sx={{
            color: "white",
            fontSize: 30,
            animation: "bounce 2s infinite",
            "@keyframes bounce": {
              "0%, 20%, 50%, 80%, 100%": {
                transform: "translateY(0)",
              },
              "40%": {
                transform: "translateY(-10px)",
              },
              "60%": {
                transform: "translateY(-5px)",
              },
            },
          }}
        />
      </Box>
    </Box>
  )
}

export default HeroSection

