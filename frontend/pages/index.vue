
<template>
  <div>
    <h1>SignUp</h1>
    <SignupForm />
  </div>
</template>
<style scoped>
 h1{
   text-align: center;
   padding: 10px;
 }
</style>

<script>
import SignupForm from '.././components/SignupForm';

export default {
  components: {
    SignupForm
  }
};
</script>

