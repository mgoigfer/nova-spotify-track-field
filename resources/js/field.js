/* eslint-disable global-require, no-undef */

Nova.booting((Vue) => {
  Vue.config.devtools = true;
  Vue.config.debug = true;
  Vue.config.silent = false;
  Vue.config.productionTip = true;
  Vue.component('index-nova-spotify-track-field', require('./components/IndexNovaSpotifyTrackField'));
  Vue.component('detail-nova-spotify-track-field', require('./components/DetailNovaSpotifyTrackField'));
  Vue.component('form-nova-spotify-track-field', require('./components/FormNovaSpotifyTrackField'));
});
