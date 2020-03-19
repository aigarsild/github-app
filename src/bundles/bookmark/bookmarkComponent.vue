<template>
    <section class="search-section container-fluid min-vh-100 flex-wrap d-flex">
        <div class="container">
            <h3 class="w-100 pt-4">Bookmarks</h3>
            <p class="lead w-100">Here you can find all the bookmarked repos</p>

            <div v-if="noBookmarks" class="alert alert-danger" role="alert">
                No added bookmarks :(
            </div>

            <section class="search-results row" v-if="bookmark">
                <div v-for="result in bookmark" :key="result.id" class="col-3 mt-4 card card-body m-3">

                            <div class="spinner-border" role="status" v-if="loading">
                                <span class="sr-only">Loading...</span>
                            </div>

                            <h5 class="card-title">{{ result.name }}</h5>
                            <p class="card-text">Author: <strong>{{ result.owner.login }}</strong></p>
                            <p class="card-text">Stars: <strong>{{ result.stargazers_count }}</strong></p>
                            <p class="card-text">Forks: <strong>{{ result.forks }}</strong></p>
                            <a target="_blank" :href="result.html_url" class="btn btn-primary w-100 ">Go to repo page</a>

                            <p class="bookmark-btn btn btn-dark mt-3 w-100" v-on:click="removeBookmark" :data-bookmark-id="result.id">
                                Remove bookmark
                            </p>

                        </div>

            </section>
        </div>
    </section>
</template>

<script>
    import axios from 'axios';
    import { eventBus } from '../../main'

    export default {
        name: 'Bookmark',

        props: {
            msg: String,
            storedBookmarks: [],
        },

        data() {
            return {
                requestUrl: 'https://api.github.com/repositories/',
                localStorageKey: 'bookmarkIds',
                bookmark: [],
                loading: false,
                noBookmarks: false
            }
        },

        async created () {
            try {
                this.getBookmark();
            } catch (e) {
                console.error(e);
            }
        },

        methods: {
            getBookmarks: function() {
                return JSON.parse(localStorage.getItem(this.localStorageKey));
            },

            getBookmark: function() {
                if (!this.getBookmarks() || !this.getBookmarks().length) {
                    this.noBookmarks = true;
                    return
                }

                this.noBookmarks = false;
                this.getBookmarks().forEach(function(bookmark) {
                    this.getCall(bookmark);
                }.bind(this));
            },

            getCall: function(param) {
                this.loading = true;
                axios.get(this.requestUrl + param)
                    .then((response)  => {
                        this.bookmark.push(response.data);
                        this.loading = false;
                    })
                    .catch(error => {
                        console.error(error);
                        this.loading = false;
                    }
                );
            },

            removeBookmark: function(element) {
                const elementId = element.target.dataset.bookmarkId;
                const retrievedData = this.getBookmarks();
                const bookmarks = retrievedData.filter(existingId => elementId !== existingId);


                const button = element.target;
                button.parentElement.classList.toggle('hidden');

                this.pushItemToBookmark(bookmarks, false);
                eventBus.$emit('bookmarkUpdated');
            },

            pushItemToBookmark: function(array, id) {
                if (id) {
                    array.push(id);
                }

                localStorage.setItem(this.localStorageKey, JSON.stringify(array));
            }
        }
    }
</script>

<style scoped>
    .card-body.hidden {
        display: none;
    }
</style>