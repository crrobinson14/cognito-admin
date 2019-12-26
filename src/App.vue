<template>
<v-app id="inspire">
  <v-navigation-drawer v-model="drawer" app>
    <v-list dense>
      <v-list-item link to="/">
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link to="/users">
        <v-list-item-action>
          <v-icon>people</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Users</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar app color="indigo" dark>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
    <v-toolbar-title>Cognito User Admin</v-toolbar-title>
  </v-app-bar>

  <v-content>
    <v-container class="fill-height" fluid>
      <router-view></router-view>
    </v-container>
  </v-content>
  <v-footer color="indigo" app>
    <span class="white--text">&copy; 2019</span>
  </v-footer>
</v-app>
</template>

<script lang="ts">
import Vue from 'vue';
// import HelloWorld from './components/HelloWorld.vue';

export default Vue.extend({
	name: 'App',
	components: {
		// HelloWorld,
	},
	props: {
		source: String,
	},
	data: () => ({
		drawer: null,
	}),
});
</script>
