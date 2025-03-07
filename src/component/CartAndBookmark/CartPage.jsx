import {Link} from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";
import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { staysContext } from "../AppContext/TentsContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Calendar,
  Trash2,
  ShoppingCart,
  Receipt,
  CreditCard,
  Users,
  MapPin,
  ChevronRight,
  ArrowLeft,
  Tag,
  Shield,
  Clock,
} from "lucide-react";

// Memoized Cart Item Component
const CartItem = React.memo(
  ({ stay, dates, guests, onDateChange, onGuestChange, onDelete }) => {
    return (
      <Card
        sx={{
          mb: 3,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          textAlign: "left",
        }}
      >
        {/* Camp Image */}
        <CardMedia
          component="img"
          sx={{
            width: { xs: "100%", sm: 220 },
            height: { xs: 180, sm: 200 },
            p: 1,
            borderRadius: "20px",
          }}
          image={stay.about.images[0] || "https://via.placeholder.com/300x200"}
          alt={stay.campName}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight="bold">
            {stay.campName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <MapPin sx={{ fontSize: "1rem", mr: 1 }} />
            {stay.address.tal}, {stay.address.state}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Price: ₹{stay.prices.afterDiscount}
          </Typography>

          {/* Dates Section */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="date"
                size="small"
                value={dates?.from || ""}
                onChange={(e) => onDateChange(stay.id, "from", e.target.value)}
                label="Check-in"
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: dayjs().format("YYYY-MM-DD") }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="date"
                size="small"
                value={dates?.to || ""}
                onChange={(e) => onDateChange(stay.id, "to", e.target.value)}
                label="Check-out"
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  min: dates?.from || dayjs().format("YYYY-MM-DD"),
                }}
              />
            </Grid>
          </Grid>

          {/* Guests Section */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                size="small"
                value={guests?.adults || 1}
                onChange={(e) =>
                  onGuestChange(stay.id, "adults", parseInt(e.target.value))
                }
                label="Adults"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                size="small"
                value={guests?.children || 0}
                onChange={(e) =>
                  onGuestChange(stay.id, "children", parseInt(e.target.value))
                }
                label="Children"
              >
                {[0, 1, 2, 3, 4, 5].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {/* Nights and Remove Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
              pt: 2,
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              <Clock sx={{ fontSize: "1rem", mr: 1 }} />
              {dates?.from && dates?.to
                ? `${dayjs(dates.to).diff(dayjs(dates.from), "day")} nights`
                : "Select dates"}
            </Typography>
            <IconButton onClick={() => onDelete(stay.id)} color="error">
              <Trash2 />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    );
  }
);

// Memoized Order Summary Component
const OrderSummary = React.memo(({ totalPrice, gstAmount, finalAmount }) => {
  return (
    <Box sx={{ position: "sticky", top: 16 }}>
      <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 2, display: "flex", alignItems: "center" }}
          >
            <Receipt sx={{ mr: 1 }} />
            Order Summary
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body2" color="text.secondary">
                Subtotal
              </Typography>
              <Typography variant="body2">₹{totalPrice.toFixed(2)}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body2" color="text.secondary">
                GST (18%)
              </Typography>
              <Typography variant="body2">₹{gstAmount.toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1" fontWeight="bold">
                Total Amount
              </Typography>
              <Typography variant="h6" color="primary">
                ₹{finalAmount.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        
          <Button
            component={Link}
            to="/checkoutpage"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => toast.success("Proceeding to checkout!")}
          >
            Proceed to Checkout
            <ChevronRight sx={{ ml: 1 }} />
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
});

const CartPage = () => {
  const { addCart, setAddCart, isLoggedIn } = useContext(staysContext);
  const [dates, setDates] = useState({});
  const [guests, setGuests] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // GST Calculation
  const GST_RATE = 0.18;
  const gstAmount = totalPrice * GST_RATE;
  const finalAmount = totalPrice + gstAmount;

  // Calculate Total Price
  const calculateTotal = useCallback(
    (cartItems) => {
      let total = 0;
      cartItems.forEach((item) => {
        const fromDate = dates[item.id]?.from || dayjs().format("YYYY-MM-DD");
        const toDate =
          dates[item.id]?.to || dayjs().add(1, "day").format("YYYY-MM-DD");
        const nights = dayjs(toDate).diff(dayjs(fromDate), "day") || 1;
        const totalGuests =
          (guests[item.id]?.adults || 1) + (guests[item.id]?.children || 0);
        total += item.prices.afterDiscount * nights * totalGuests;
      });
      setTotalPrice(total);
    },
    [dates, guests]
  );

  // Handle Date Change
  const handleDateChange = useCallback(
    (id, type, value) => {
      setDates((prev) => ({
        ...prev,
        [id]: { ...prev[id], [type]: value },
      }));
      calculateTotal(addCart);
    },
    [addCart, calculateTotal]
  );

  // Handle Guest Change
  const handleGuestChange = useCallback(
    (id, type, value) => {
      setGuests((prev) => ({
        ...prev,
        [id]: { ...prev[id], [type]: parseInt(value) },
      }));
      calculateTotal(addCart);
    },
    [addCart, calculateTotal]
  );

  // Handle Delete Item
  const handleDelete = useCallback(
    async (id) => {
      try {
        await axios.delete(`http://localhost:5000/cart/${id}`);
        const updatedCart = addCart.filter((item) => item.id !== id);
        setAddCart(updatedCart);
        calculateTotal(updatedCart);
        toast.success("Item removed from cart!");
      } catch (error) {
        console.error("Error removing item:", error);
        toast.error("Failed to remove item. Please try again.");
      }
    },
    [addCart, setAddCart, calculateTotal]
  );

  // Fetch Cart Data
  useEffect(() => {
    axios
      .get("http://localhost:5000/cart")
      .then((resp) => {
        setAddCart(resp.data);
        calculateTotal(resp.data);
      })
      .catch((error) => console.log(error));
  }, [setAddCart, calculateTotal]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Toaster position="top-center" />
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 2 }}
        className="flex justify-center items-center"
      >
        Your Cart
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Review and modify your selected stays before checkout.
      </Typography>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          {addCart.map((stay) => (
            <CartItem
              key={stay.id}
              stay={stay}
              dates={dates[stay.id]}
              guests={guests[stay.id]}
              onDateChange={handleDateChange}
              onGuestChange={handleGuestChange}
              onDelete={handleDelete}
            />
          ))}
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <OrderSummary
            totalPrice={totalPrice}
            gstAmount={gstAmount}
            finalAmount={finalAmount}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
