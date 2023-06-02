import React, { useState } from 'react';

function Logout() {
    const handleLogout = () => {

      fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
      
          console.log(data);
        })
        .catch((error) => {

          console.error(error);
        });
    };
  }

export default Logout;
