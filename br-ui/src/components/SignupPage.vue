<template>
    <div class="auth-container">
      <h2>Signup</h2>
      <div class="row">
        <div class="col-6">

        </div>
        <div class="col-6">
          <form @submit.prevent="handleSignup">
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" id="name" v-model="name" required />
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" v-model="email" required />
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" id="password" v-model="password" required />
            </div>
            <div class="form-group">
              <label for="password">Confirm Password:</label>
              <input type="password" id="password" v-model="password" required />
            </div>
            <button type="submit">Sign up</button>
          </form>
        </div>
      </div>
      
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: "",
        email: "",
        password: "",
      };
    },
    methods: {
      handleSignup() {
        alert(`Signed up with: ${this.name}, ${this.email}`);
      },
    },
  };
  </script>
  