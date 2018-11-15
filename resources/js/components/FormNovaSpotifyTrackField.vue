<template>
  <default-field
    v-click-outside="{fn: hideDropdown}"
    :field="field"
    :errors="errors"
  >
    <template slot="field">
      <input
        v-model="value"
        :id="field.name"
        :class="errorClasses"
        type="text"
        placeholder="Buscar una canción en Spotify"
        class="w-full form-control form-input form-input-bordered"
        @input="searchSpotifyTracks($event.target.value)"
      >

      <ul
        ref="dropdown"
        class="form-input-bordered hidden px-2 border-t-0 list-reset"
      >
        <li
          v-for="track in dropdownItems"
          :key="track.id"
          class="cursor-pointer hover:bg-blue"
          @click="selectTrack(track)"
        >
          <div
            class="flex flex-row flex-no-wrap justify-between items-center py-2"
          >
            <span class="self-center mr-4 font-bold">
              {{ track.name }}
            </span>

            <a
              role="button"
              class="mr-2 px-2 py-1 text-black text-xs font-semibold bg-success
                rounded"
              style="min-width: 100px;"
              @click.stop="navigateToExternalUrl(track.external_urls.spotify)"
            >
              Ver en Spotify
            </a>
          </div>
        </li>
      </ul>
    </template>
  </default-field>
</template>

<script>
/* eslint-disable vue/require-prop-types */

/* Vendor */
import { FormField, HandlesValidationErrors } from 'laravel-nova';

/* Helpers */
import { clickOutsideDirective } from '../helpers/directives';

/* Services */
import { searchItem } from '../../services/spotify';

export default {
  directives: {
    'click-outside': clickOutsideDirective,
  },

  mixins: [FormField, HandlesValidationErrors],

  props: ['resourceName', 'resourceId', 'field'],

  data() {
    return {
      // The array of tracks received from the Spotify API.
      dropdownItems: [],

      // The selected track.
      track: null,
    };
  },

  methods: {
    async searchSpotifyTracks(value) {
      if (value) {
        const { data } = await searchItem(
          this.field.spotifyAccessToken,
          value,
          'track',
          5,
        );

        if (data.tracks.items.length) {
          this.dropdownItems = data.tracks.items;
          this.showDropdown();
        } else {
          this.hideDropdown();
        }
      } else {
        this.hideDropdown();
      }
    },

    /**
     * Fill the given FormData object with the field's internal value.
     */
    fill(formData) {
      if (this.track) {
        formData.append('spotify_id', this.track.id || '');
        formData.append('name', this.track.name || '');
        formData.append('artist', this.track.artists[0].name || '');
        formData.append('duration_ms', this.track.duration_ms || '');
        formData.append('popularity', this.track.popularity || '');
        formData.append('preview_url', this.track.preview_url || '');
        formData.append('first_letter', this.track.name[0].toLowerCase() || '');
      }
    },

    /**
     * Hide the dropdown.
     */
    hideDropdown() {
      this.$refs.dropdown.style.display = 'none';
      this.dropdownItems = [];
    },

    /**
     * Navigate to external URL.
     */
    navigateToExternalUrl(url) {
      window.open(url, '_blank');
    },

    /**
     * Select track.
     */
    selectTrack(track) {
      this.track = track;
      this.value = track.name;
      this.hideDropdown();
    },

    /**
     * Set the initial, internal value for the field.
     */
    setInitialValue() {
      this.value = this.field.value || '';
    },

    /**
     * Show the dropdown.
     */
    showDropdown() {
      this.$refs.dropdown.style.display = 'block';
    },
  },
};
</script>
