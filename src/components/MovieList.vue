<script setup>

import { ref } from 'vue';
import { ALL_MOVIES } from '../utils';
import StarRating from './StarRating.vue';

const movieData = await fetch(ALL_MOVIES);
const res = ref(await movieData.json());

const movies = ref(res.value.data);

//console.log(movies.value);


</script>

<template>

<ul class="movie-list">
    <li v-for="movie in movies">
        <RouterLink :to="`/movie/${movie.id}`">
            <div class="movie-poster">
                <img class="w-full h-full object-cover" :src="movie.attributes.posterImage.data.attributes.formats.small.url" :alt="movie.attributes.title" />
            </div>
            <div class="movie-info flex flex-col">
                <div class="rating-section pb-3">
                    <StarRating :rating="movie.attributes.rating" />
                </div>
                <div class="movie-title flex-grow">
                    <h2 class="text-lg truncate">{{ movie.attributes.title }}</h2>
                </div>
                <div class="cta flex-grow-0">
                    <button class="btn">View Details</button>
                </div>
            </div>
        </RouterLink>
    </li>
</ul>


</template>