<template>
        <header class="light-section navbar-light sticky-top container">
            <div class="row">
                <h2 class="col navbar-brand">{{ logoName }}</h2>
                <nav class="col">
                    <ul class="nav justify-content-end">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/">Search</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/bookmarks">Bookmarks <span v-if="bookmarkBadgeNr" class="badge badge-warning">{{ bookmarkBadgeNr }}</span></router-link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
</template>

<script>
    import { eventBus } from '../../main';

    export default {
        name: 'Header',
        props: {
            logoName: String
        },

        data() {
            return {
                bookmarkBadgeNr: '',
                localStorageKey: 'bookmarkIds'
            }
        },

        created: function () {
            this.getBookmarkCount();
            eventBus.$on('bookmarkUpdated', () => this.getBookmarkCount());
        },

        methods: {
            getBookmarkCount: function () {
                const bookmarks = localStorage.getItem(this.localStorageKey);
                if (!bookmarks) {
                    return
                }

                this.bookmarkBadgeNr =  JSON.parse(bookmarks).length;
            }
        }
    }
</script>