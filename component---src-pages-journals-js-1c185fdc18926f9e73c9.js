(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"7pXE":function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n=a("q1tI"),r=a.n(n),l=a("Wbzz"),o=function(){return[["Posts","/"],["Journals","/journals"],["Tags","/tags"]].map((function(e){var t=e[0],a=e[1];return r.a.createElement(l.Link,{key:t,style:{display:"block",cursor:"pointer"},href:a},t)}))}},"9bSa":function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),r=a.n(n),l=(a("EDuE"),a("PhRZ"));t.default=function(e){return r.a.createElement(l.a,Object.assign({},e,{title:"Joel's dev blog: journals"}))}},EDuE:function(e,t,a){},PhRZ:function(e,t,a){"use strict";a.d(t,"a",(function(){return p}));var n=a("q1tI"),r=a.n(n),l=a("Wbzz"),o=a("6Gk8"),s=a("Bl7J"),c=a("7pXE"),i=a("vrFN"),u=a("upwP"),m=function(){return r.a.createElement("section",{style:u.a.darkText})},d=a("p3AD"),p=function(e){var t=e.data,a=e.location,n=e.title,u=n||t.site.siteMetadata.title,p=t.allMarkdownRemark.edges,f="/journals"===a.pathname||"/journals/"===a.pathname;return r.a.createElement(s.a,{location:a,title:u},r.a.createElement(i.a,{title:"Joel's dev blog",keywords:["blog","javascript","typescript","react"]}),r.a.createElement(o.a,null),r.a.createElement(m,null),r.a.createElement("section",{style:{width:"100%"}},r.a.createElement(c.a,null)),p.map((function(e,t){var a=e.node,n=a.frontmatter.title||a.fields.slug;return r.a.createElement("div",{key:t},r.a.createElement("h3",{style:{marginBottom:Object(d.a)(1/4)}},r.a.createElement(l.Link,{style:{boxShadow:"none"},to:f?"/journals"+a.fields.slug:a.fields.slug},n)),r.a.createElement("small",null,a.frontmatter.date),r.a.createElement("p",{dangerouslySetInnerHTML:{__html:a.frontmatter.description||a.excerpt}}))})))}}}]);
//# sourceMappingURL=component---src-pages-journals-js-1c185fdc18926f9e73c9.js.map