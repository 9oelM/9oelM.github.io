"use strict";(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[942],{7851:function(e,t,a){a.d(t,{W:function(){return o}});var n=a(7294),l=a(1597),r=a(9499),o=function(){var e=(0,r.useLocation)();return[["Projects","/projects/"],["Posts","/"],["Journals","/journals/"],["Tags","/tags/"]].map((function(t){var a=t[0],r=t[1];return n.createElement(l.Link,{key:a,className:"navigation-link",style:{display:"block",cursor:"pointer"},href:r},e.pathname===r?"👉  "+a:a)}))}},6602:function(e,t,a){a.r(t);var n=a(7294),l=a(8678),r=a(1597),o=(a(9175),a(9357)),s=a(3359),c=a(7851);t.default=function(e){var t=e.pageContext,a=e.data,u=e.location,i=t.tag,g=a.allMarkdownRemark,m=g.edges,k=g.totalCount,p=k+" post"+(1===k?"":"s")+' tagged with "'+i+'"';return n.createElement(l.Z,{location:u,title:"Joel's dev blog: tags"},n.createElement(o.Z,{title:"Joel's dev blog - tagged as "+i,keywords:["blog","javascript","typescript","react","security",i]}),n.createElement(s.Z,null),n.createElement(c.W,null),n.createElement("h1",null,p),n.createElement("ul",null,m.map((function(e){var t=e.node,a=t.fields.slug,l=t.frontmatter,o=l.title,s=l.tab;return n.createElement("li",{key:a},n.createElement(r.Link,{to:"journal"===s?"/journals"+a:a},o))}))),n.createElement(r.Link,{to:"/tags"},"All tags"))}}}]);
//# sourceMappingURL=component---src-templates-tags-js-5aceec175666024e3510.js.map