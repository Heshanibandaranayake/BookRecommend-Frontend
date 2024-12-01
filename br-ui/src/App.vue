<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<!-- <template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />

     Button to open the login popup 
    <button @click="showLogin = true" class="open-login-button">Login</button>

     Login popup modal 
    <div v-if="showLogin" class="login-modal">
      <div class="modal-content">
        <button class="close-button" @click="showLogin = false">&times;</button>
        <LoginPage />
      </div>
    </div>
  </div>
</template>-->

<!-- <script>
import LoginPage from '@login.vue';

export default {
  name: 'App',
  components: {
    LoginPage,
  },
  data() {
    return {
      showLogin: false, // Controls whether the login modal is displayed
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.open-login-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.open-login-button:hover {
  background-color: #0056b3;
}

/* Modal styles */
.login-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
}

.close-button:hover {
  color: #ff0000;
}
</style> --> 
