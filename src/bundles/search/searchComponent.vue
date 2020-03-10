<template>

  <section class="search-section container-fluid min-vh-100 flex-wrap d-flex align-content-center">
    <div class="container">
      <h1 class="display-3 text-center w-100">Search for a Github repo.</h1>
      <p class="lead text-center w-100">Search results are fetched trough Github API</p>
      <section class="search">
        <input class="searchbar rounded shadow border-0 p-3 w-100" v-on:keyup="getCall" type="text">
        <div class="spinner-border" role="status" v-if="loading">
          <span class="sr-only">Loading...</span>
        </div>
        <p v-if="noSearchResults">No results found :((</p>
      </section>

      <section class="search-results row" v-if="searchResults">
        <div v-for="result in searchResults" :key="result.id" class="col-3 mt-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ result.name }}</h5>
              <p class="card-text">Author: <strong>{{ result.owner.login }}</strong></p>
              <p class="card-text">Stars: <strong>{{ result.stargazers_count }}</strong></p>
              <p class="card-text">Forks: <strong>{{ result.forks }}</strong></p>
              <a target="_blank" :href="result.html_url" class="btn btn-primary w-100 ">Go to repo page</a>
              <p class="btn btn-dark mt-3 w-100 " ref="addToBookmarkBtn" v-on:click="addToBookmark" :data-bookmark-id="result.id">Add to bookmark</p>
              <div class="alert alert-info" role="alert">
                Bookmark already saved!
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  </section>

</template>

<script>
  import axios from 'axios';
  import {_} from 'vue-underscore';


  export default {
    name: 'Search',

    props: {
      msg: String
    },

    data() {
      return {
        loading: false,
        searchValue: String,
        searchResults: [],
        requestUrl: String,
        noSearchResults: false
      }
    },

    methods: {
      getCall: _.debounce(function (e) {
        this.searchValue = e.target.value;
        this.loading = true;
        this.requestUrl = 'https://api.github.com/search/repositories?sort=stars&q=' + this.searchValue;

        if (!this.searchValue) {
          this.loading = false;
          this.searchResults = [];
          return;
        }

        axios.get(this.requestUrl)
                .then((response)  =>  {
                  this.loading = false;

                  if (!response.data.total_count) {
                    this.noSearchResults = true;
                    this.searchResults = [];
                    return;
                  }

                  this.noSearchResults = false;
                  this.searchResults = response.data.items;

                }).catch(error => {
                  console.error(error);
                  this.loading = false;
        });
      }, 500),

      addToBookmark: function (e) {
        if (localStorage.getItem('bookmarkIds')) {
          try {
            const retrievedData = JSON.parse(localStorage.getItem('bookmarkIds'));
            const elementId = e.target.dataset.bookmarkId;

            //Check if id is already stored
            const checkForId = retrievedData.filter(id => elementId !== id ? true : this.alreadyAdded());
            this.pushItemToBookmark(checkForId, elementId);
          } catch(e) {
            localStorage.removeItem('bookmarkIds');
          }

          return;
        }

        let bookmarks = [];
        const bookmarkId = e.target.dataset.bookmarkId;

        this.pushItemToBookmark(bookmarks, bookmarkId);
      },

      pushItemToBookmark: function (array, id) {
        if (!id) {
          return;
        }

        array.push(id);
        localStorage.setItem('bookmarkIds', JSON.stringify(array));
      },

      alreadyAdded: function () {
        return false;
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

    .search-section {
        background: aliceblue;
    }

    .search {
      position: relative;
    }

    .search .spinner-border {
      position: absolute;
      top: 12px;
      right: 30px;
    }

    .searchbar:focus, .searchbar:focus {
    outline: none;
  }
</style>
