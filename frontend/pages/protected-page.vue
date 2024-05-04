<template>
    <div>
      <h1>Protected Page</h1>
      <!-- Content of the protected page -->
    </div>
  </template>
  
  <script>
  export default {
    middleware: 'authenticated'
  };
  </script>