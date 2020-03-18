<template>

  <section class="search-section container-fluid min-vh-100 flex-wrap d-flex align-content-center" :style="bookmarkTxt">

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

              <p class="bookmark-btn btn btn-dark mt-3 w-100"
                 :class="{ add_to_bookmark: !result.bookmarkStatus }"
                 v-on:click="bookmarkBtnAction"
                 :data-bookmark-status="result.bookmarkStatus"
                 :data-bookmark-id="result.id" >
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
  import { eventBus } from '../../main'

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
        localStorageKey: 'bookmarkIds',

        bookmarkTxt: String,
        bookmarkData: {
          bookmarkAddTxt: 'Add bookmark',
          bookmarkAddedTxt: 'Bookmarked',
          bookmarkRemoveTxt: 'Remove bookmark',
          bookmarkToggleClass: 'add_to_bookmark'
        }
      }
    },

    created: function () {
      this.setBookmarkTxts();
    },

    methods: {
      setBookmarkTxts: function() {
        this.bookmarkTxt =
                `--add-bookmark-txt: '${this.bookmarkData.bookmarkAddTxt}';
                --remove-bookmark-txt: '${this.bookmarkData.bookmarkRemoveTxt}';
                --added-bookmark-txt: '${this.bookmarkData.bookmarkAddedTxt}';
                `;
      },

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

        if (!retrievedBookmarkData) {
          return searchResults;
        }

        //Parse bookmark ids to int
        let parsedBookmarkData = retrievedBookmarkData.map(id => parseInt(id, 10));
        //If fetched search results contain bookmarked id then add new property bookmarkStatus to results
        searchResults.filter(element => (parsedBookmarkData.includes(element.id) ? element.bookmarkStatus = true : element.bookmarkStatus = false));
        return searchResults;
      },

      triggerBookmarkUpdate: function() {
        eventBus.$emit('bookmarkUpdated');
      },

      bookmarkBtnAction: function(element) {
        const bookmarkStatus = element.target.dataset.bookmarkStatus;
        const bookmarkId = element.target.dataset.bookmarkId;

        this.toggleClass(element, this.bookmarkData.bookmarkToggleClass);

        if (bookmarkStatus === 'true') {
          element.target.dataset.bookmarkStatus = false;
          this.removeBookmark(bookmarkId);
          this.triggerBookmarkUpdate();

         return;
        }

        element.target.dataset.bookmarkStatus = true;
        this.addToBookmark(bookmarkId);
        this.triggerBookmarkUpdate();
      },

      toggleClass: function(element, toggleClass) {
        const button = element.target;
        button.classList.toggle(toggleClass);
      },

      retrieveBookmarks: function() {
        return JSON.parse(localStorage.getItem(this.localStorageKey));
      },

      addToBookmark: function(elementId) {
        if (localStorage.getItem(this.localStorageKey)) {
          const retrievedData = this.retrieveBookmarks();

          //Check if id is already stored
          this.checkForId = this.filterOutExistingId(retrievedData, elementId);
          this.pushItemToBookmark(this.checkForId, elementId);

          return;
        }

        this.pushItemToBookmark(this.checkForId, elementId);
      },

      filterOutExistingId: function(array, elementId) {
        return array.filter(existingId => elementId !== existingId);
      },

      removeBookmark: function(elementId) {

        const retrievedData = this.retrieveBookmarks();
        this.checkForId = this.filterOutExistingId(retrievedData, elementId);

        this.pushItemToBookmark(this.checkForId, false);
      },

      pushItemToBookmark: function(array, id) {
        if (id) {
          array.push(id);
        }

        localStorage.setItem(this.localStorageKey, JSON.stringify(array));
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

    .bookmark-btn.btn {
      background-color: #ffb200;
      border: none;
    }

    .bookmark-btn.btn:hover {
      background-color: #e19600;
      border: none;
    }

    .bookmark-btn.btn:hover::after {
      content: var(--remove-bookmark-txt);

      border: none;
    }

    .bookmark-btn::after {
      content: var(--added-bookmark-txt);
    }

    .bookmark-btn.add_to_bookmark {
      background-color: #343a40;
    }

    .bookmark-btn.add_to_bookmark:hover {
      background-color: #23272b;
    }

    .bookmark-btn.add_to_bookmark::after {
      content: var(--add-bookmark-txt);
    }

    .bookmark-btn.add_to_bookmark:hover::after {
      content: var(--add-bookmark-txt);
    }

</style>
