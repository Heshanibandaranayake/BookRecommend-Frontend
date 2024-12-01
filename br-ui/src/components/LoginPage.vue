<template>
    <div class="auth-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p class="signup-caption">
        Not a memeber? <router-link to="/signup">Sign up here</router-link>
      </p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      handleLogin() {
        alert(`Logged in with: ${this.email}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .signup-caption {
    margin-top: 15px;
    font-size: 14px;
  }
  
  .signup-caption a {
    color: #007bff;
    text-decoration: none;
  }
  
  .signup-caption a:hover {
    text-decoration: underline;
  }
  </style>
  