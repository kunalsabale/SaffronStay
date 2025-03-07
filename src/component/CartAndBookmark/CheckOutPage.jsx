"use client";

import React, { useState, useEffect, useContext } from "react";
import { Toaster, toast } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import { staysContext } from "../AppContext/TentsContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Divider,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import {
  CreditCard as CreditCardIcon,
  Wallet as WalletIcon,
  DollarSign as DollarSignIcon,
  PhoneCall as PhoneCallIcon,
} from "lucide-react";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { addCart = [] } = useContext(staysContext) || {};
  const [paymentMethod, setPaymentMethod] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update user info
    setUserInfo({ ...userInfo, [name]: value });

    // Validate inputs
    if (name === "phone" && !/^\d*$/.test(value)) {
      setErrors({ ...errors, phone: "Phone number must contain only digits." });
    } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrors({ ...errors, email: "Please enter a valid email address." });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Handle checkout
  const handleCheckout = async () => {
    if (!userInfo.name || !userInfo.email || !userInfo.phone) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (errors.phone || errors.email) {
      toast.error("Please fix the errors before proceeding.");
      return;
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    const bookingData = {
      userId: Date.now().toString(36), // Unique ID for the user
      userDetails: {
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        paymentMethod: paymentMethod,
      },
      bookings: addCart.map((stay) => ({
        campId: stay.id,
        campName: stay.campName,
        fromDate: "2025-03-02", // Example: Replace with selected dates
        toDate: "2025-03-04",
        adults: 2, // Example: Replace with user input
        children: 2,
        totalGuests: 4,
        pricePerNight: stay.prices.afterDiscount,
        totalPrice: stay.prices.afterDiscount * 2, // Assuming 2 nights
      })),
    };

    try {
      const response = await fetch("http://localhost:5000/bookingDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        toast.success("Booking Successful! 🎉");
        await fetch("http://localhost:5000/cart", {
          method: "DELETE",
        });
        setTimeout(() => {
          navigate("/confirmpage");
        }, 500);
      } else {
        toast.error("Failed to book. Please try again.");
      }
    } catch (error) {
      console.error("Error booking:", error);
      toast.error("Error processing booking.");
    }
  };

  // Calculate GST (18%) with null checks
  const subtotal = (addCart || []).reduce((sum, stay) => {
    const price = stay?.prices?.afterDiscount || 0;
    return sum + price;
  }, 0);

  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  return (
    <Box sx={{ padding: { xs: "10px", sm: "20px" }, maxWidth: "900px", margin: "auto", textAlign: "center" }}>
      {/* Toast Notifications */}
      <Toaster />

      {/* Header */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Complete Your Booking
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Just a few more steps to confirm your stay
      </Typography>

      <Divider sx={{ marginY: "20px" }} />

      <Grid container spacing={2}>
        {/* User Information */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ padding: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Your Details
              </Typography>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                placeholder="Kunal Sabale"
                margin="dense"
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={userInfo.email}
                onChange={handleChange}
                placeholder="kkunalsabale@example.com"
                margin="dense"
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
                placeholder="9762016975"
                margin="dense"
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Payment Method */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ padding: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Payment Method
              </Typography>
              <RadioGroup
                aria-label="payment-method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="Credit Card"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CreditCardIcon className="h-5 w-5" />
                      <span>Credit Card</span>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="UPI"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <WalletIcon className="h-5 w-5" />
                      <span>UPI</span>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="Net Banking"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <DollarSignIcon className="h-5 w-5" />
                      <span>Net Banking</span>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="Phone Pay"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PhoneCallIcon className="h-5 w-5" />
                      <span>Phone Pay</span>
                    </Box>
                  }
                />
              </RadioGroup>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Booking Summary */}
      <Card sx={{ padding: 2, marginTop: "20px" }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Booking Summary
          </Typography>
          {(addCart || []).map((stay) => (
            <Box key={stay?.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="body1">🏕 {stay?.campName}</Typography>
              <Typography variant="body1">₹{stay?.prices?.afterDiscount || 0} per day</Typography>
            </Box>
          ))}
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography variant="body1">Subtotal</Typography>
            <Typography variant="body1">₹{subtotal.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography variant="body1">GST (18%)</Typography>
            <Typography variant="body1">₹{gst.toFixed(2)}</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" fontWeight="bold">Total Price</Typography>
            <Typography variant="h6" fontWeight="bold">₹{total.toFixed(2)}</Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Checkout Button */}
      <Button
        variant="contained"
        size="large"
        onClick={handleCheckout}
        sx={{ mt: 4, width: { xs: "100%", sm: "auto" }, px: 6, py: 1.5 }}
      >
        Confirm & Pay
      </Button>
    </Box>
  );
};

export default CheckoutPage;