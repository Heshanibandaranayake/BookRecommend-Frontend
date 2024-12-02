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
      async handleSignup() {
        try {
          const response = await fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: this.name,
              email: this.email,
              password: this.password,
            }),
          });

          const data = await response.json();

          if (response.ok) {
            // Notify the user of successful signup
            alert("Signup successful! You can now log in.");
            // Redirect to the login page
            this.$router.push("/");
          } else {
            // Handle errors from the backend
            alert(data.message || "Signup failed.");
          }
        } catch (error) {
          console.error("Error during signup:", error);
          alert("An error occurred. Please try again later.");
        }
      },
    },
  };
  </script>
  