(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"7pXE":function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a("q1tI"),r=a.n(n),l=a("Wbzz"),o=a("YwZP"),s=(a("cRmv"),function(){var e=Object(o.useLocation)();return console.log(),[["Posts","/"],["Journals","/journals/"],["Tags","/tags/"]].map((function(t){var a=t[0],n=t[1];return r.a.createElement(l.Link,{key:a,className:"navigation-link",style:{display:"block",cursor:"pointer"},href:n},e.pathname===n?"👉  "+a:a)}))})},"9bSa":function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),r=a.n(n),l=(a("EDuE"),a("PhRZ"));t.default=function(e){return r.a.createElement(l.a,Object.assign({},e,{title:"Joel's dev blog: journals"}))}},EDuE:function(e,t,a){},PhRZ:function(e,t,a){"use strict";a.d(t,"a",(function(){return p}));var n=a("q1tI"),r=a.n(n),l=a("Wbzz"),o=a("6Gk8"),s=a("Bl7J"),c=a("7pXE"),i=a("vrFN"),u=a("upwP"),m=function(){return r.a.createElement("section",{style:u.a.darkText})},d=a("p3AD"),p=function(e){var t=e.data,a=e.location,n=e.title,u=n||t.site.siteMetadata.title,p=t.allMarkdownRemark.edges,f="/journals"===a.pathname||"/journals/"===a.pathname;return r.a.createElement(s.a,{location:a,title:u},r.a.createElement(i.a,{title:"Joel's dev blog",keywords:["blog","javascript","typescript","react"]}),r.a.createElement("a",{href:"https://hits.seeyoufarm.com",style:{border:"none",color:"transparent"}},r.a.createElement("img",{style:{marginBottom:0},src:"https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2F9oelm.github.io&count_bg=%23848683&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits+since+2022&edge_flat=false"})),r.a.createElement("div",{style:{height:"10px"}}),r.a.createElement(o.a,null),r.a.createElement(m,null),r.a.createElement("section",{style:{width:"100%"}},r.a.createElement(c.a,null)),p.map((function(e,t){var a=e.node,n=a.frontmatter.title||a.fields.slug;return r.a.createElement("div",{key:t},r.a.createElement("h3",{style:{marginBottom:Object(d.a)(1/4)}},r.a.createElement(l.Link,{style:{boxShadow:"none"},to:f?"/journals"+a.fields.slug:a.fields.slug},n)),r.a.createElement("small",null,a.frontmatter.date),r.a.createElement("p",{dangerouslySetInnerHTML:{__html:a.frontmatter.description||a.excerpt}}))})))}},cRmv:function(e,t,a){}}]);
//# sourceMappingURL=component---src-pages-journals-js-5a2408bb1f2bb4dbc778.js.map