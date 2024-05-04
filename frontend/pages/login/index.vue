<template>
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  </template>
  <style scoped>
  h1{
    text-align: center;
    padding: 10px;
  }
 </style>
  
  <script>
  import LoginForm from '../../components/LoginForm.vue';
  
  export default {
    components: {
      LoginForm
    }
  };
  </script>
  
  
  