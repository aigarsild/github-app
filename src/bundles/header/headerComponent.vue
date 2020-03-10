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
                            <a class="nav-link">Bookmarks</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
</template>

<script>
    export default {
        name: 'Header',
        props: {
            logoName: String
        }
    }
</script>