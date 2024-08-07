<script setup>

import Loader from '../components/Loader.vue';
import Header from '../components/Header.vue';
import Content from '../components/Content.vue';
import MovieList from '../components/MovieList.vue';

</script>

<template>


<div class="flex flex-col">

    <Header />
    <Suspense>
        <template #default>
            <Content :component="MovieList"/>
        </template>
        <template #fallback>
            <div class="flex justify-center items-center h-screen">
                <Loader loading />
            </div>
        </template>
    </Suspense>

</div>


</template>