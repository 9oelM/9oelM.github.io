(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"7pXE":function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a("q1tI"),l=a.n(n),o=a("Wbzz"),r=a("YwZP"),s=(a("cRmv"),function(){var e=Object(r.useLocation)();return console.log(),[["Posts","/"],["Journals","/journals/"],["Tags","/tags/"]].map((function(t){var a=t[0],n=t[1];return l.a.createElement(o.Link,{key:a,className:"navigation-link",style:{display:"block",cursor:"pointer"},href:n},e.pathname===n?"👉  "+a:a)}))})},MN1z:function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),l=a.n(n),o=a("Bl7J"),r=a("Wbzz"),s=(a("p3AD"),a("vrFN")),c=a("6Gk8"),i=a("7pXE");t.default=function(e){var t=e.pageContext,a=e.data,n=e.location,u=t.tag,m=a.allMarkdownRemark,g=m.edges,p=m.totalCount,d=p+" post"+(1===p?"":"s")+' tagged with "'+u+'"';return l.a.createElement(o.a,{location:n,title:"Joel's dev blog: tags"},l.a.createElement(s.a,{title:"Joel's dev blog - tagged as "+u,keywords:["blog","javascript","typescript","react","security",u]}),l.a.createElement("a",{href:"https://hits.seeyoufarm.com",style:{border:"none",color:"transparent"}},l.a.createElement("img",{style:{marginBottom:0},src:"https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2F9oelm.github.io&count_bg=%23848683&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits+since+2022&edge_flat=false"})),l.a.createElement("div",{style:{height:"10px"}}),l.a.createElement(c.a,null),l.a.createElement(i.a,null),l.a.createElement("h1",null,d),l.a.createElement("ul",null,g.map((function(e){var t=e.node,a=t.fields.slug,n=t.frontmatter,o=n.title,s=n.tab;return l.a.createElement("li",{key:a},l.a.createElement(r.Link,{to:"journal"===s?"/journals"+a:a},o))}))),l.a.createElement(r.Link,{to:"/tags"},"All tags"))}},cRmv:function(e,t,a){}}]);
//# sourceMappingURL=component---src-templates-tags-js-f19d7eef937ceeb68f12.js.map