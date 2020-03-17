<template>

  <section class="search-section container-fluid min-vh-100 flex-wrap d-flex align-content-center">
    <div class="container">
      <h1 class="display-3 text-center w-100">Search for a Github repo.</h1>
      <p class="lead text-center w-100">Search results are fetched trough Github API</p>
      <section class="search">
        <input class="searchbar rounded shadow border-0 p-3 w-100" v-on:keyup="getSearchResults" type="text">
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

              <p class="btn btn-dark mt-3 w-100" v-on:click="bookmarkBtnAction(result.bookmarkStatus, result.id)" :data-bookmark-id="result.id">
                <span v-if="!result.bookmarkStatus">Add bookmark <font-awesome-icon class="bookmarks-star-empty" icon="star" /></span>
                <span v-if="result.bookmarkStatus">Remove bookmark <font-awesome-icon class="bookmarks-star" icon="star" /></span>
              </p>

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
        requestUrl: 'https://api.github.com/search/repositories?sort=stars&q=',
        noSearchResults: false,
        checkForId: [],
        localStorageKey: 'bookmarkIds'
      }
    },

    methods: {
      getSearchResults: function(searchValue) {
        this.searchValue = searchValue.target.value;
        this.setParams();
      },

      setParams: function() {
        if (this.searchValue) {
          this.getCall();
          return;
        }

        this.loading = false;
        this.searchResults = [];
      },

      getCall: _.debounce(function () {
        this.loading = true;

        axios.get(this.requestUrl + this.searchValue)
                .then((response)  =>  {
                  this.loading = false;

                  if (response.data.total_count) {
                    this.noSearchResults = false;
                    this.searchResults = this.checkForBookmarks(response.data.items);

                    return;
                  }

                  this.noSearchResults = true;
                  this.searchResults = [];

                }).catch(error => {
                  console.error(error);
                  this.loading = false;
        });
      }, 500),

      checkForBookmarks: function(searchResults) {
        const retrievedBookmarkData = JSON.parse(localStorage.getItem(this.localStorageKey));
        //Parse bookmark ids to int
        const parsedBookmarkData = retrievedBookmarkData.map(id => parseInt(id, 10));

        //If fetched search results contain bookmarked id then add new property bookmarkStatus to results
        searchResults.filter(element => (parsedBookmarkData.includes(element.id) ? element.bookmarkStatus = true : element.bookmarkStatus = false));
        return searchResults;
      },

      bookmarkBtnAction: function(bookmarkStatus, bookmarkId) {

        if (bookmarkStatus) {
          this.removeBookmark(bookmarkId);
         return;
        }

        this.addToBookmark(bookmarkId);
      },

      addToBookmark: function(elementId) {
        if (localStorage.getItem(this.localStorageKey)) {
          const retrievedData = JSON.parse(localStorage.getItem(this.localStorageKey));

          //Check if id is already stored
          this.checkForId = retrievedData.filter(id => elementId !== id ? true : this.itemAlreadyAddedToBookmarks());
          this.pushItemToBookmark(this.checkForId, elementId);

          return;
        }

        this.pushItemToBookmark(this.checkForId, elementId);
      },

      removeBookmark: function(bookmarkId) {
        console.log('removeeee' + bookmarkId);
      },

      pushItemToBookmark: function(array, id) {
        if (!id) {
          return;
        }

        array.push(id);
        localStorage.setItem(this.localStorageKey, JSON.stringify(array));
      },

      itemAlreadyAddedToBookmarks: function() {
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

    .add-to-bookmarks, .remove-from-bookmarks {
      color: gold;
    }

    .bookmarks-star path {
      fill: gold;
    }

    .bookmarks-star-empty path {
      stroke: gold;
      fill: none;
      stroke-width: 60px;
    }

</style>
