import searchComponent from "./bundles/search/searchComponent";
import bookmarkComponent from "./bundles/bookmark/bookmarkComponent";

export default [
    { path: '/', component: searchComponent },
    { path: '/bookmarks', component: bookmarkComponent }
]