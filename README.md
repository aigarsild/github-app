# github-app

## About the project
Bookmark application that fetches repositories from Github API and lets you save repositories into the application.
The project is built on vue.js javascript framework and uses Bootstrap style components.

[The demo is live here](https://aigar-github-app.netlify.com/bookmarks)

This is my first experiment with Vue.js. 
Here some pros and cons
### Pros
Easy to learn
Good documentation
Vue is more lightweight than Angular, but that is because Angular is meant for enterprise applications
Vue components have template, script and styles separated by tags in the same file, which makes it easy to create small components that have all the data in one place instead of having different files interplaced.
Vue uses virtual DOM as React
Because styles are in the same file you could set variables with js inside css
### Cons
I found that its not so easy to extend component methods to other components
Debugging .vue files is not so easy, you will need a browser extension for that
The biggest issue in my opinion is that Vue is not backed by big company like React (Facebook) of Angular (Google) that makes it less researched or updated.

### Conclusion
I have experience with Angular and React and I think Vue is pretty good for smaller applications. 
It had all the tools needed to create this API application, 
but I found it a bit difficult to do some simple DOM manipulating for example hide generated elements on click event.
Overall it was easy to start and get into vue because of the good documentation and understandable structure. 
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
