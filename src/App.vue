<template>

  <v-app>
    <section id="ABC">
      <v-img
         :src="require('@/assets/images/Logo.png')" height="125px" width="125px" class="center">
      </v-img>
    </section>
    <v-toolbar class="teal">
      <v-toolbar-title>
        <span class="white--text">
          Eagle Financial Services
        </span>
      </v-toolbar-title>
      <v-toolbar-items>
        <v-btn flat dark @click="goHome">Home
            <v-icon right>home</v-icon>
        </v-btn>
        <v-btn flat dark @click="viewCustomers">Customers
            <v-icon right>people</v-icon>
        </v-btn>
        <v-btn center flat dark @click="viewStocks">Stocks
            <v-icon right>stock</v-icon>
        </v-btn>
        <v-btn flat dark @click="viewInvestments">Investments
            <v-icon right>domain</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn class="pull-right" flat dark v-if="!authenticated"
               @click="login">Log in
        </v-btn>
        <v-btn class="pull-right" flat dark v-if="authenticated"
               @click="logout">Log Out
               <v-icon right>exit_to_app</v-icon> 
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>

      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  import router from './router';
  import {APIService} from './http/APIService';
  const apiService = new APIService();

  export default {
    name: 'App',
    data: () => ({
      authenticated: false,
    }),

    mounted() {
        apiService.getCustomerList().then(response => {
          this.authenticated = true;
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('isAuthenticates');
            localStorage.removeItem('log_user');
            localStorage.removeItem('token');
            this.authenticated = false;
          }
        });
        console.log('this.authenticated--'+this.authenticated);
    },

    methods: {
      logout() {
        localStorage.removeItem('isAuthenticates');
        localStorage.removeItem('log_user');
        localStorage.removeItem('token');
        this.authenticated = false;
       // router.push('/');
         window.location = "/"
      },
      viewCustomers() {
        router.push('/customer-list');
      },
       viewInvestments() {
        router.push('/investment-list');
      },

      viewStocks() {
        router.push('/stock-list');
      },
      
      login() {
        router.push("/auth");
      },

      goHome() {
        router.push('/');
      }
    }
  };
</script>

<style>
  #ABC {
    background-color: #29293d;
  }
  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: auto;
  }
</style>

