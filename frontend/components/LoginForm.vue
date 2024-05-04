<template>
    <form @submit.prevent="submitForm">
      <input type="email" v-model="username" placeholder="Email" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit">Login</button>
      <p>don't have an account? <router-link to="/signup">Signup</router-link></p>
    </form>
  </template>

<style scoped>
form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

input[type="email"],
input[type="password"],
button {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
}

button {
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

h1 {
  text-align: center;
}
p {
color: black;
margin-left: 15%;
}

</style>
  
  <script>
import axios from 'axios';

  export default {
    name: 'Login',
    data() {
      return {
        username: null,
        password: null,
      };
    },
    methods: {
      async submitForm() {
        const data = {
            'username': this.username,
            'password': this.password
        }
        console.log(data);
        try{
            const res = await axios.post('https://task-tracker-app-backend.vercel.app/login',this.$data);
            const token = res.data.token
            localStorage.setItem('jwtToken', token);
            this.$store.commit('setAuthenticated', true);
            this.$router.push('/main');
        }catch(e){
            if(e.response){
              if (error.response) {
              window.alert(error.response.data.message);
              } else if (error.request) {
              window.alert('No response from server');
              } else {
               window.alert('Error sending request');
              }
            }
        }
      }
    }
  };
  </script>
  
  
  
