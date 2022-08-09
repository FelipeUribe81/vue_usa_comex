<template>
  <v-container id="container" fluid fill-height>
    <v-row justify="center">
      <v-col>
        <!-- Login box secction -->
        <v-card id="main-content" class="rounded-lg">
          <!-- Box header -->
          <v-row class="mb-5 mt-2">
            <v-col id="box-header">
              <v-img
                contain
                id="logo"
                src="../assets/img/usaLogo.png"
                alt="Este es el logo"
              >
              </v-img>
              <h1>Login in to your account</h1>
            </v-col>
          </v-row>
          <!-- Box form -->
          <v-row class="mx-10">
            <v-col id="form">
              <v-form id="form-content" @submit.prevent="login()">
                <v-text-field
                  type="email"
                  label="Email"
                  color="usa-yellow"
                  hint="example @usa.edu.co/@correo.usa.edu.co"
                  v-model="user.username"
                  :rules="[rules.required, rules.emailMatch]"
                  filled
                  dense
                  dark
                />
                <router-link to="/login">Forgot password?</router-link>
                <v-text-field
                  :type="showPassword ? 'text' : 'password'"
                  label="Password"
                  class="mt-1"
                  color="usa-yellow"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  :rules="[rules.required, rules.min]"
                  v-model="user.password"
                  filled
                  dense
                  dark
                />
                <v-alert dense outlined text type="error" v-if="alert"
                  >Usuario o contraseña no validos</v-alert
                >
                <v-btn type="submit" color="usa-blue" block dark>Login</v-btn>
              </v-form>
            </v-col>
          </v-row>
          <!-- Signup info -->
          <div id="signup">
            <p>
              New to UsaComex?
              <router-link to="/login">Create an account</router-link>
            </p>
          </div>
          <!-- End login box secction-->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import { Global } from "../Global";

export default {
  name: "LoginComponent",
  data() {
    return {
      pageLogin: true,
      showPassword: false,
      user: {
        username: "",
        password: "",
      },
      url: Global.url,
      usaGmail:
        /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@correo([\.])usa([\.])edu([\.])co\b/,
      usaOutlook:
        /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@usa([\.])edu([\.])co\b/,
      rules: {
        required: (value) => !!value || "This field is Required",
        min: (value) => value.length >= 8 || "Min 8 characters",
        emailMatch: (value) =>
          this.usaGmail.test(value) ||
          this.usaOutlook.test(value) ||
          "The email and password you entered don't match",
      },
      alert: false,
    };
  },
  methods: {
    login() {
      axios
        .post(`${this.url}/users/login/`, this.user)
        .then((res) => {
          this.$cookies.set("sesion", res.data.token, res.data.expiry);
          this.$router.push("/choose-date");
        })
        .catch((error) => {
          this.alert = true;
          serverError(err.response.status, this.$router);
        });
    },
  },
};
</script>

<style>
/* BACKGROOUND STYLES*/

#container {
  background: linear-gradient(rgba(5, 7, 12, 0.54), rgba(5, 7, 12, 0.54)),
    url(../assets/img/background.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

/* BOX STYLES */

#main-content {
  width: 500px;
  height: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.6);
  box-shadow: 1px 0px 1px rgb(5, 7, 12), 0px 0px 8px black !important;
  color: white;
}

/* input[type="email"]{
  height: 10px !important;
} */

#box-header {
  height: 140px;
  width: 100%;
  text-align: center;
}

#box-header h1 {
  line-height: 50px;
  font-size: 18px;
}

#logo {
  margin-top: 20px;
  height: 80px;
}

#form a {
  display: block;
  text-align: right;
  font-size: 14px;
  text-decoration: none;
  color: #0252ca;
}

#form a:hover {
  text-decoration: underline;
}

#form a:active {
  color: #035add;
  font-size: 15px;
}

#signup {
  margin-top: 35px;
  text-align: center;
  font-size: 14px;
}
#signup a {
  text-decoration: none;
  color: #fdf21c;
}
#signup a:hover {
  text-decoration: underline;
  color: #dbd000;
}
#signup a:active {
  color: #8d870d;
  font-size: 15px;
}

#footer {
  height: 100px;
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
}
#form .v-text-field__slot input {
  caret-color: white !important;
}

#form
  .theme--dark.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot
  fieldset {
  color: #fdf21c !important;
}

#form .theme--dark.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: #fdf21c !important;
}

#form
  .v-text-field.v-input--has-state
  > .v-input__control
  > .v-input__slot:before {
  border-color: #ff5252 !important;
}

/* RESPONSIVE

#container {
    height: 100%;
    min-height: 100vh;
    /* background: linear-gradient(rgba(5, 7, 12, 0.9), rgba(5, 7, 12, 0.9)), url(../img/background.jpg); */

/* background: url(../img/background.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    overflow: hidden;
} */

/* #main-content {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    margin: 0px auto;
    padding: 20px;
    color: white;
} */
</style>