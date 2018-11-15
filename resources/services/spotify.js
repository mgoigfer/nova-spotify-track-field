/* global axios */

const transformRequest = [(data, headers) => {
  delete headers.common['X-Requested-With'];
  delete headers.common['X-CSRF-TOKEN'];
  return data;
}];

/**
 * When you register your application, Spotify provides you a Client ID.
 */
const clientId = process.env.MIX_SPOTIFY_CLIENT_ID;

/**
 * Get the Spotify authorization URL.
 */
const getLogin = (redirectUri, scopes) => (
  `https://accounts.spotify.com/authorize?
    client_id=${clientId}&
    redirect_uri=${encodeURIComponent(this.redirectUri)}&
    scope=${encodeURIComponent(scopes.join(' '))}&
    response_type=token`
);

/**
 * Send a request to the Spotify Accounts service.
 *
 * GET https://accounts.spotify.com/authorize
 */
export const login = (redirectUri, scopes) => {
  window.location.href = getLogin(redirectUri, scopes);
};

/**
 * Get a playlist.
 *
 * Get a playlist owned by a Spotify user.
 *
 * GET https://api.spotify.com/v1/users/{user_id}/playlists/{playlist_id}
 */
export const getPlaylist = (accessToken, userId, playlistId) => axios({
  url: `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}`,
  method: 'get',
  transformRequest,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

/**
 * Search for an item.
 *
 * Get Spotify Catalog information about artists, albums, tracks or playlists
 * that match a keyword string.
 *
 * GET https://api.spotify.com/v1/search
 */
export const searchItem = (accessToken, q, type, limit = 10) => axios({
  url: 'https://api.spotify.com/v1/search',
  method: 'get',
  transformRequest,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
  params: {
    q,
    type,
    limit,
  },
});

export default {
  login,
  getPlaylist,
  searchItem,
};

// export {

//   // followPlaylist (Spotify) - PUT https://api.spotify.com/v1/users/{owner_id}/playlists/{playlist_id}/followers
//   // -------------------------
//   followPlaylist(accessToken, ownerID, playlistID) {
//     return $.ajax({
//       url: `https://api.spotify.com/v1/users/${ownerID}/playlists/${playlistID}/followers`,
//       method: 'PUT',
//       dataType: 'json',
//       data: {
//         public: true,
//       },
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         'Content-Type': 'application/json',
//       },
//     });
//   },

//   // getUserTopTracks (Spotify) - GET https://api.spotify.com/v1/me/top/tracks
//   // -------------------------
//   getUserTopTracks(accessToken, limit) {
//     return $.ajax({
//       url: 'https://api.spotify.com/v1/me/top/tracks',
//       dataType: 'json',
//       data: {
//         limit,
//       },
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         'Content-Type': 'application/json',
//       },
//     });
//   },

//   // getAudioFeatures (Spotify) - GET https://api.spotify.com/v1/audio-features
//   // -------------------------
//   getAudioFeatures(accessToken, trackIDs) {
//     return $.ajax({
//       url: 'https://api.spotify.com/v1/audio-features',
//       dataType: 'json',
//       data: {
//         ids: trackIDs.join(),
//       },
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         'Content-Type': 'application/json',
//       },
//     });
//   },
// };
