"use strict";(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[942],{7851:function(e,t,a){a.d(t,{W:function(){return o}});var n=a(7294),r=a(1597),l=a(9499),o=function(){var e=(0,l.useLocation)();return[["Projects","/projects/"],["Posts","/"],["Journals","/journals/"],["Tags","/tags/"]].map((function(t){var a=t[0],l=t[1];return n.createElement(r.Link,{key:a,className:"navigation-link",style:{display:"block",cursor:"pointer"},href:l},e.pathname===l?"👉  "+a:a)}))}},6602:function(e,t,a){a.r(t);var n=a(7294),r=a(8678),l=a(1597),o=(a(9175),a(9357)),s=a(3359),c=a(7851);t.default=function(e){var t=e.pageContext,a=e.data,i=e.location,u=t.tag,g=a.allMarkdownRemark,m=g.edges,p=g.totalCount,f=p+" post"+(1===p?"":"s")+' tagged with "'+u+'"';return n.createElement(r.Z,{location:i,title:"Joel's dev blog: tags"},n.createElement(o.Z,{title:"Joel's dev blog - tagged as "+u,keywords:["blog","javascript","typescript","react","security",u]}),n.createElement("a",{href:"https://hits.seeyoufarm.com",style:{border:"none",color:"transparent"}},n.createElement("img",{style:{marginBottom:0},src:"https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2F9oelm.github.io&count_bg=%23848683&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits+since+2022&edge_flat=false"})),n.createElement("div",{style:{height:"10px"}}),n.createElement(s.Z,null),n.createElement(c.W,null),n.createElement("h1",null,f),n.createElement("ul",null,m.map((function(e){var t=e.node,a=t.fields.slug,r=t.frontmatter,o=r.title,s=r.tab;return n.createElement("li",{key:a},n.createElement(l.Link,{to:"journal"===s?"/journals"+a:a},o))}))),n.createElement(l.Link,{to:"/tags"},"All tags"))}}}]);
//# sourceMappingURL=component---src-templates-tags-js-6e931266f95542c2b9b9.js.map