import React from "react";
import { Box } from "@mui/system";

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
      <div className="container text-center mb-5"> This website is not afiliated with Nintendo. Pokemon is a Nintendo product that we have all grew up loving, and wanted to dedicate this class project to. Please use this website at your own discretion. </div>
      <div className="container text-center mb-5">&copy; 💖 Created By: George Lin, Wendy Vu, Jeffrey Yeh and Madilyn Bariekman 💖</div>
    </Box>
  );
};

export default Footer;