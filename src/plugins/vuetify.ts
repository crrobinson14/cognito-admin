import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#7a3d65',
        secondary: '#b0bec5',
        footer: '#512843',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
    },
  },
});
