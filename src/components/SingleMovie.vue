<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import YouTube from 'vue3-youtube';
import moment from 'moment';
import StarRating from './StarRating.vue';

const BASE_URL = 'https://movie-reviews-backend-sl1q.onrender.com/api/movies/';
const route = useRoute();
const movieId = route.params.id;
const query = '?populate=posterImage,genres,actors,actors.image,review';

const SINGLE_MOVIE = `${BASE_URL}${movieId}${query}`;

const movie = ref(null);
const runtime = ref(null);

const movieData = await fetch(SINGLE_MOVIE);
const res = await movieData.json();
 movie.value = res.data;

onMounted(() => {
    runtime.value = movie.value.attributes.runtime;
});

const formattedRuntime = computed(() => {
  if (runtime.value !== null) {
    const duration = moment.duration(runtime.value, 'minutes');
    const hours = duration.hours();
    const minutes = duration.minutes();
    return `${hours} hrs. ${minutes} min.`;
  }
  return '';
});
</script>

<template>
  <div v-if="movie">
    <div class="single-movie-header flex justify-between items-center mb-6">
      <div class="flex flex-col">
        <h1 class="text-5xl mb-6">{{ movie.attributes.title }}</h1>
        <div class="flex items-center gap-3">
          <p><span class="text-lg font-bold">Released:</span> {{ moment(movie.attributes.releaseDate).format('MMMM D, YYYY') }}</p>
          <p><span class="text-lg font-bold">Runtime:</span> {{ formattedRuntime }}</p>
        </div>
      </div>
      <div class="rating-section flex items-center gap-3">
        <StarRating :rating="movie.attributes.rating" /><span>{{ movie.attributes.rating }}/5</span>
      </div>
    </div>
    <div class="flex gap-6">
      <div class="">
        <img
          class="h-auto object-cover"
          :src="movie.attributes.posterImage.data.attributes.formats.medium.url"
          :alt="movie.attributes.title"
        />
      </div>
      <div class="">
        <section class="pb-12">
            <YouTube width="860" height="483.75" v-if="movie.attributes.trailerLink" :src="movie.attributes.trailerLink" @ready="onReady" ref="youtube" />
          <h3>Summary:</h3>
          <p v-for="paragraph in movie.attributes.summary" :key="paragraph.id">
            {{ paragraph.children[0].text }}
          </p>
        </section>
        <section class="pb-12">
          <h3>My Review:</h3>
          <div v-if="movie.attributes.review">
            <p v-for="paragraph in movie.attributes.review" :key="paragraph.id">
              {{ paragraph.children[0].text }}
            </p>
          </div>
          <div v-else>
            <p class="italic">Review coming soon!</p>
          </div>
        </section>
      </div>
      <div class="flex flex-col gap-6">
        <div>
          <section class="pb-12">
            <h3>Celebs:</h3>
            <ul class="flex">
              <li v-for="star in movie.attributes.actors.data" :key="star.id">
                <img
                  class="block h-16 w-16 rounded-full ring-2 ring-white"
                  :src="star.attributes.image?.data?.attributes?.url"
                />
                <p class="text-sm">{{ star.attributes.firstName }} {{ star.attributes.middleName }} {{ star.attributes.lastName }}</p>
              </li>
            </ul>
          </section>
          <h3>Genres:</h3>
          <ul class="genres">
            <li class="genre" v-for="genre in movie.attributes.genres.data" :key="genre.id">
              {{ genre.attributes.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
