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
      async handleLogin() {
        try {
          const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: this.email, password: this.password }),
          });
          //console.log()
          const data = await response.json();
          console.log("reponse",response);
          if (response.ok) {
            alert("Login successful");
            sessionStorage.setItem("username",this.email)
            //console.log(data.token); // Use this token for further requests
            this.$router.push("/bookindex");
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error("Error:", error);
        }
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
  