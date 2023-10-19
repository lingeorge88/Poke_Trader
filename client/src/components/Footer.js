import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box 
      component="footer" 
      mt={5} 
      p={4} 
      className="bg-secondary w-100" 
      ml={{ xs: 1, sm: 3, md: 8 }} 
      mr={{ xs: 1, sm: 3, md: 8 }}
    >
      <Typography 
        component="p" 
        className="container text-center" 
        variant="body3"
        mb={3}
      >
        This website is not affiliated with Nintendo. Pokémon is a Nintendo product that we have all grown up loving, and wanted to dedicate this class project to. Please use this website at your own discretion.
      </Typography>
      
      <Typography 
        component="p" 
        className="container text-center" 
        variant="body3"
      >
        &copy; 💖 Created By: George Lin, Wendy Vu, Jeffrey Yeh and Madilyn Bariekman 💖
      </Typography>
    </Box>
  );
};

export default Footer;