<template>
    <div>
        <form @submit.prevent="submitForm">
        <input type="text" v-model="name" placeholder="Name" required>
        <input type="email" v-model="username" placeholder="Email" required>
        <input type="password" v-model="password" placeholder="Password" required>
        <button type="submit">Sign Up</button>
        <p>Already have an account? <router-link to="/login">Login</router-link></p>
        </form>
    </div>
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

  input[type="text"],
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
    name: 'Signup',
    data() {
      return {
        name: null,
        username: null,
        password: null,
      };
    },
    methods: {
      async submitForm() {
        const data = {
            'name': this.name,
            'username': this.username,
            'password': this.password
        }
        console.log(data);
        try{
            const res = await axios.post('http://localhost:3001/signup',this.$data )
            .then((res)=>{
                this.$router.push('/login');
            }).catch((e)=>{
                console.log(e);
            });
        }catch(e){
            console.log(e.message);
        }
      }
    }
  };
  </script>
  
  