(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"4M6O":function(e,t,n){"use strict";var o=n("5NKs");t.__esModule=!0,t.insertScript=function(e,t,n){var o=window.document.createElement("script");return o.async=!0,o.src=e,o.id=t,n.appendChild(o),o},t.removeScript=function(e,t){var n=window.document.getElementById(e);n&&t.removeChild(n)},t.debounce=function(e,t,n){var o;return function(){var r=this,s=arguments,i=function(){o=null,n||e.apply(r,s)},a=n&&!o;window.clearTimeout(o),o=setTimeout(i,t),a&&e.apply(r,s)}},t.isReactElement=i,t.shallowComparison=function e(t,n){var o,s=new Set(Object.keys(t).concat(Object.keys(n)));return 0!==(o=[]).concat.apply(o,(0,r.default)(s)).filter((function(o){if("object"==typeof t[o]){if(e(t[o],n[o]))return!0}else if(t[o]!==n[o]&&!i(t[o]))return!0})).length};var r=o(n("R7tm")),s=o(n("q1tI"));function i(e){return!!s.default.isValidElement(e)||!!Array.isArray(e)&&e.some((function(e){return s.default.isValidElement(e)}))}},ORnI:function(e,t,n){"use strict";var o=n("5NKs");t.__esModule=!0,t.default=void 0;var r=o(n("VUT9"));t.Disqus=r.default;var s=o(n("qASQ"));t.CommentCount=s.default;var i=o(n("vAJ3"));t.CommentEmbed=i.default;var a=r.default;t.default=a},R7tm:function(e,t,n){var o=n("qHws"),r=n("gC2u"),s=n("dQcQ"),i=n("m7BV");e.exports=function(e){return o(e)||r(e)||s(e)||i()},e.exports.default=e.exports,e.exports.__esModule=!0},VUT9:function(e,t,n){"use strict";var o=n("5NKs");t.__esModule=!0,t.default=void 0;var r=o(n("j8BX")),s=o(n("uDP2")),i=o(n("XEEL")),a=o(n("q1tI")),u=o(n("17x9")),l=n("4M6O"),d=function(e){function t(t){var n;return(n=e.call(this,t)||this).shortname="joelmun",n.embedUrl="https://"+n.shortname+".disqus.com/embed.js",n}(0,i.default)(t,e);var n=t.prototype;return n.componentDidMount=function(){this.loadInstance()},n.shouldComponentUpdate=function(e){return this.props!==e&&(0,l.shallowComparison)(this.props,e)},n.componentDidUpdate=function(){this.loadInstance()},n.componentWillUnmount=function(){this.cleanInstance()},n.getDisqusConfig=function(e){return function(){this.page.identifier=e.identifier,this.page.url=e.url,this.page.title=e.title,this.page.remote_auth_s3=e.remoteAuthS3,this.page.api_key=e.apiKey,this.language=e.language}},n.loadInstance=function(){"undefined"!=typeof window&&window.document&&(window.disqus_config=this.getDisqusConfig(this.props.config),window.document.getElementById("dsq-embed-scr")?this.reloadInstance():(0,l.insertScript)(this.embedUrl,"dsq-embed-scr",window.document.body))},n.reloadInstance=function(){window&&window.DISQUS&&window.DISQUS.reset({reload:!0})},n.cleanInstance=function(){(0,l.removeScript)("dsq-embed-scr",window.document.body);try{delete window.DISQUS}catch(n){window.DISQUS=void 0}var e=window.document.getElementById("disqus_thread");if(e)for(;e.hasChildNodes();)e.removeChild(e.firstChild);if(window.document.querySelector('[id^="dsq-app"]')){var t=window.document.getElementById(window.document.querySelector('[id^="dsq-app"]').id);t.parentNode.removeChild(t)}},n.render=function(){var e=this.props,t=(e.config,(0,s.default)(e,["config"]));return a.default.createElement("div",(0,r.default)({id:"disqus_thread"},t,{__self:this,__source:{fileName:"/Users/brettstevenson/Desktop/Folder/gatsby-plugin-workspace/gatsby-plugin-disqus/src/components/Disqus.jsx",lineNumber:86,columnNumber:7}}))},t}(a.default.Component);t.default=d,d.propTypes={config:u.default.shape({identifier:u.default.string,title:u.default.string,url:u.default.string,language:u.default.string,remoteAuthS3:u.default.string,apiKey:u.default.string})}},cXBx:function(e,t,n){},dQcQ:function(e,t,n){var o=n("hMe3");e.exports=function(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}},e.exports.default=e.exports,e.exports.__esModule=!0},gC2u:function(e,t){e.exports=function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)},e.exports.default=e.exports,e.exports.__esModule=!0},hMe3:function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o},e.exports.default=e.exports,e.exports.__esModule=!0},m7BV:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},qASQ:function(e,t,n){"use strict";var o=n("5NKs");t.__esModule=!0,t.default=void 0;var r=o(n("j8BX")),s=o(n("uDP2")),i=o(n("XEEL")),a=o(n("q1tI")),u=o(n("17x9")),l=n("4M6O"),d=(0,l.debounce)((function(){window.DISQUSWIDGETS&&window.DISQUSWIDGETS.getCount({reset:!0})}),300,!1),c=function(e){function t(t){var n;return(n=e.call(this,t)||this).shortname="joelmun",n}(0,i.default)(t,e);var n=t.prototype;return n.componentDidMount=function(){this.loadInstance()},n.shouldComponentUpdate=function(e){return this.props!==e&&(0,l.shallowComparison)(this.props,e)},n.componentDidUpdate=function(){this.loadInstance()},n.componentWillUnmount=function(){this.cleanInstance()},n.loadInstance=function(){window.document.getElementById("dsq-count-scr")?d():(0,l.insertScript)("https://"+this.shortname+".disqus.com/count.js","dsq-count-scr",window.document.body)},n.cleanInstance=function(){(0,l.removeScript)("dsq-count-scr",window.document.body),window.DISQUSWIDGETS=void 0},n.render=function(){var e=this.props,t=e.config,n=e.placeholder,o=(0,s.default)(e,["config","placeholder"]);return a.default.createElement("span",(0,r.default)({className:"disqus-comment-count","data-disqus-identifier":t.identifier,"data-disqus-url":t.url},o,{__self:this,__source:{fileName:"/Users/brettstevenson/Desktop/Folder/gatsby-plugin-workspace/gatsby-plugin-disqus/src/components/CommentCount.jsx",lineNumber:53,columnNumber:7}}),n)},t}(a.default.Component);t.default=c,c.defaultProps={placeholder:"..."},c.propTypes={config:u.default.shape({identifier:u.default.string,title:u.default.string,url:u.default.string}),placeholder:u.default.string}},qHws:function(e,t,n){var o=n("hMe3");e.exports=function(e){if(Array.isArray(e))return o(e)},e.exports.default=e.exports,e.exports.__esModule=!0},vAJ3:function(e,t,n){"use strict";var o=n("5NKs");t.__esModule=!0,t.default=void 0;var r=o(n("XEEL")),s=o(n("q1tI")),i=o(n("17x9")),a=function(e){function t(){return e.apply(this,arguments)||this}(0,r.default)(t,e);var n=t.prototype;return n.getSrc=function(){return"https://embed.disqus.com/p/"+Number(this.props.commentId).toString(36)+"?p="+(this.props.showParentComment?"1":"0")+"&m="+(this.props.showMedia?"1":"0")},n.render=function(){return s.default.createElement("iframe",{src:this.getSrc(),width:this.props.width,height:this.props.height,seamless:"seamless",scrolling:"no",frameBorder:"0",__self:this,__source:{fileName:"/Users/brettstevenson/Desktop/Folder/gatsby-plugin-workspace/gatsby-plugin-disqus/src/components/CommentEmbed.jsx",lineNumber:17,columnNumber:13}})},t}(s.default.Component);t.default=a,a.defaultProps={width:420,height:320,showMedia:!0,showParentComment:!0},a.propTypes={commentId:i.default.string.isRequired,width:i.default.number,height:i.default.number,showMedia:i.default.bool,showParentComment:i.default.bool}},yZlL:function(e,t,n){"use strict";n.r(t);var o=n("9Hrx"),r=n("q1tI"),s=n.n(r),i=n("Wbzz"),a=n("ORnI"),u=n.n(a),l=n("6Gk8"),d=n("Bl7J"),c=n("vrFN"),p=n("p3AD"),f=(n("cXBx"),n("upwP")),m=function(e){function t(){return e.apply(this,arguments)||this}return Object(o.a)(t,e),t.prototype.render=function(){var e=this.props.data.markdownRemark,t=this.props.data.site.siteMetadata,n=t.title,o=t.siteUrl,r=this.props.pageContext,a=r.previous,m=r.next,h=this.props.location,g=h.pathname.startsWith("/journals/");return s.a.createElement(d.a,{location:h,title:""+(g?n+": journals":n)},s.a.createElement(c.a,{title:e.frontmatter.title,description:e.frontmatter.description||e.excerpt,keywords:e.frontmatter.keywords}),s.a.createElement("a",{href:"https://hits.seeyoufarm.com",style:{border:"none",color:"transparent"}},s.a.createElement("img",{style:{marginBottom:0},src:"https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2F9oelm.github.io&count_bg=%23848683&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits+since+2022&edge_flat=false"})),s.a.createElement("h1",{style:Object.assign({},f.a.darkText,{marginTop:"5px"})},e.frontmatter.title),s.a.createElement("p",{style:Object.assign({},Object(p.b)(-.2),{display:"block",marginBottom:Object(p.a)(1),marginTop:Object(p.a)(-1)},f.a.darkText)},e.frontmatter.date),s.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.html}}),s.a.createElement("hr",{style:{marginBottom:Object(p.a)(1)}}),s.a.createElement(l.a,null),s.a.createElement("ul",{style:Object.assign({display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0},f.a.darkText)},s.a.createElement("li",{style:f.a.darkText},a&&s.a.createElement(i.Link,{to:g?"/journals"+a.fields.slug:a.fields.slug,rel:"prev"},"← ",a.frontmatter.title)),s.a.createElement("li",{style:f.a.darkText},m&&s.a.createElement(i.Link,{to:g?"/journals"+m.fields.slug:m.fields.slug,rel:"next"},m.frontmatter.title," →"))),s.a.createElement(u.a,{identifier:e.id,title:e.frontmatter.title,url:""+o+h.pathname}))},t}(s.a.Component);t.default=m}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-8daac0a110424eb1ce6c.js.map