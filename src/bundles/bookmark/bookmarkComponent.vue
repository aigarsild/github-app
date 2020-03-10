<template>
    <section class="vh-100">
        <h1>{{ msg }}</h1>

        <div v-for="result in storedBookmarks" :key="result.id" class="col-3 mt-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{ result.id }}</h5>
                    <p class="card-text">Author: <strong>{{ result.owner.login }}</strong></p>
                    <p class="card-text">Stars: <strong>{{ result.stargazers_count }}</strong></p>
                    <p class="card-text">Forks: <strong>{{ result.forks }}</strong></p>
                    <a target="_blank" :href="result.html_url" class="btn btn-primary">Go to repo page</a>
                    <p class="btn btn-dark mt-3" ref="addToBookmarkBtn" v-on:click="addToBookmark" :data-bookmark-id="result.id">Add to bookmark</p>
                </div>
            </div>
        </div>

    </section>
</template>

<script>
    //import axios from 'axios';

    export default {
        name: 'Bookmark',
        props: {
            msg: String,
            storedBookmarks: [],
        },

        //async created () {
        //    try {
        //        this.storedBookmarks = await axios.get();
        //    } catch (e) {
        //        console.error(e);
        //    }
        //},

        //methods: {
        //    getBookmarks: function () {
        //        this.storedBookmarks = JSON.parse(localStorage.getItem('bookmarkIds'));
        //    }
        //}
    }
</script>