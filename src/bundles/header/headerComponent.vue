<template>
        <header class="light-section navbar-light sticky-top container">
            <div class="row">
                <h2 class="col navbar-brand">{{ logoName }}</h2>
                <nav class="col">
                    <ul class="nav justify-content-end">
                        <li class="nav-item">
                            <a class="nav-link">Search</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link">Bookmarks <span v-if="bookmarkBadgeNr" class="badge badge-warning">{{ bookmarkBadgeNr }}</span></a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
</template>

<script>
    import { eventBus } from '../../main'

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
                if (!localStorage.getItem(this.localStorageKey)) {
                    return
                }

                this.bookmarkBadgeNr =  JSON.parse(localStorage.getItem(this.localStorageKey)).length;
            }
        }
    }
</script>