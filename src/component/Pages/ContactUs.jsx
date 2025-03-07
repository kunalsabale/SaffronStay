import { useEffect, useState } from "react";
import { 
  Container, 
  Typography, 
  Grid, 
  Box, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  IconButton,
  Snackbar,
  Alert
} from "@mui/material";
import { 
  Phone, 
  Email, 
  LocationOn, 
  Facebook, 
  Twitter, 
  Instagram, 
  LinkedIn,
  Send as SendIcon
} from "@mui/icons-material";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const [zoom, setZoom] = useState("100%");

  useEffect(() => {
    const interval = setInterval(() => {
      setZoom((prevZoom) => (prevZoom === "100%" ? "110%" : "100%"));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      mirror: false,
    });
    AOS.refresh();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    setSnackbar({
      open: true,
      message: "Thank you for your message! We'll get back to you soon.",
      severity: "success"
    });
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const contactInfo = [
    {
      icon: <LocationOn sx={{ fontSize: 40 }} />,
      title: "Visit Us",
      content: "Qspider Deccan Pune",
      color: "#FF6B6B"
    },
    {
      icon: <Phone sx={{ fontSize: 40 }} />,
      title: "Call Us",
      content: "+91 9762016975",
      color: "#4ECDC4"
    },
    {
      icon: <Email sx={{ fontSize: 40 }} />,
      title: "Email Us",
      content: "info@saffronstays.com",
      color: "#FFD93D"
    }
  ];

  const socialLinks = [
    { icon: <Facebook />, color: "#1877F2", label: "Facebook" },
    { icon: <Twitter />, color: "#1DA1F2", label: "Twitter" },
    { icon: <Instagram />, color: "#E4405F", label: "Instagram" },
    { icon: <LinkedIn />, color: "#0A66C2", label: "LinkedIn" }
  ];

  return (
    <Box className="overflow-hidden">
      {/* Hero Section */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        sx={{
          height: { xs: "40vh", md: "60vh" },
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(src/assets/About/contact.jpg)",
          backgroundSize: zoom,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-size 8s ease-in-out",
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: "center", color: "white" }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{
                fontWeight: 700,
                mb: 2,
                background: "linear-gradient(90deg, #FFD700, #FFA500)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              Contact Us
            </Typography>
            <Typography variant="h5" sx={{ color: "rgba(255,255,255,0.9)" }}>
              Get in touch with Saffron Stays
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Contact Cards Section */}
      <Container maxWidth="lg" sx={{ mt: -8, mb: 8, position: "relative", zIndex: 2 }}>
        <Grid container spacing={3}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    p: 3,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)"
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                      color: info.color,
                      bgcolor: `${info.color}15`
                    }}
                  >
                    {info.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {info.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {info.content}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Main Content Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={7} data-aos="fade-right">
            <Card sx={{ 
              p: 4, 
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              height: "100%",
              display: "flex",
              flexDirection: "column"
            }}>
              <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
                Send Us a Message
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                We'd love to hear from you. Please fill out this form.
              </Typography>
              <form onSubmit={handleSubmit} style={{ flex: 1 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      endIcon={<SendIcon />}
                      sx={{
                        py: 1.5,
                        px: 4,
                        bgcolor: "primary.main",
                        '&:hover': {
                          bgcolor: "primary.dark",
                        }
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>

          {/* Social Links and Map */}
          <Grid item xs={12} md={5} data-aos="fade-left">
            <Card sx={{ 
              p: 4, 
              mb: 4, 
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
            }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Connect With Us
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    sx={{
                      bgcolor: `${social.color}15`,
                      color: social.color,
                      '&:hover': {
                        bgcolor: social.color,
                        color: 'white',
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Card>

            <Card sx={{ 
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
            }}>
              <Box sx={{ height: 400 }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.2498570421017!2d73.8421569746521!3d18.51760786926578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c079d4c6d387%3A0x2ef12f3e384c82a!2sQspiders%20Pune%20Deccan%20Gymkhana!5e0!3m2!1sen!2sin!4v1740677275524!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactUs;