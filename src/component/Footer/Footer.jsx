import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider, Button } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, Email, Phone, LocationOn, KeyboardArrowUp } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <Box 
      component={motion.footer}
      initial="hidden"
      whileInView="visible"
      variants={footerVariants}
      viewport={{ once: true }}
      sx={{ 
        bgcolor: '#1a1a1a',
        color: 'white',
        pt: 8,
        pb: 4,
        position: 'relative'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ 
              fontSize: '2rem',
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(45deg, #FFD700, #FFA500)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              SaffronStay
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: '#rgba(255,255,255,0.7)' }}>
              Discover unique stays and experiences across India. Your perfect getaway awaits with SaffronStay.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton sx={{bgcolor:"white"}} >
                <Facebook />
              </IconButton >
              <IconButton sx={{bgcolor:"white"}}>
                <Twitter />
              </IconButton>
              <IconButton sx={{bgcolor:"white"}}  >
                <Instagram />
              </IconButton>
              <IconButton sx={{bgcolor:"white"}}>
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Home', 'About', 'Stays'].map((text) => (
                <Link
                  key={text}
                  component="button"
                  onClick={() => navigate(`/${text.toLowerCase()}`)}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'primary.main',
                      textDecoration: 'none'
                    }
                  }}
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Support */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['FAQ', 'Contact Us', 'Terms & Conditions', 'Privacy Policy', 'Cancellation Policy'].map((text) => (
                <Link
                  key={text}
                  component="button"
                  onClick={() => navigate(`/${text.toLowerCase().replace(/\s+/g, '-')}`)}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'primary.main',
                      textDecoration: 'none'
                    }
                  }}
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ color: 'primary.main' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  JM Road, Pune, India
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ color: 'primary.main' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  +91 9762016975
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ color: 'primary.main' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  info@saffronstay.com
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.1)' }} />

        {/* Bottom Section */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            © {new Date().getFullYear()} SaffronStay. All rights reserved.
          </Typography>
          <Button
            onClick={scrollToTop}
            startIcon={<KeyboardArrowUp />}
            sx={{
              color: 'white',
              bgcolor: 'rgba(255,255,255,0.1)',
              '&:hover': {
                bgcolor: 'primary.main'
              }
            }}
          >
            Back to Top
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
