1. Merge the blog with the weebly blog
2. Fix linting error (rouge): DONE 
-> https://bnhr.xyz/2017/03/25/add-syntax-highlighting-to-your-jekyll-site-with-rouge.html
-> https://demisx.github.io/jekyll/2014/01/13/improve-code-highlighting-in-jekyll.html

Need to add syntax highlighter CSS file as css/syntax.css to my existing or newly generated Jekyll site

3. Make a nav bar that wraps the list of the posts
4. Make a self introduction page
5. Sort the list of the posts by categories: DONE
see https://stackoverflow.com/questions/20872861/jekyll-display-posts-by-category
https://blog.webjeda.com/jekyll-categories/
https://stackoverflow.com/questions/22405225/how-to-make-list-order-ascending-with-jekyll-and-liquid?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
https://blog.webjeda.com/jekyll-filters/

```html
{% assign sorted-posts = site.posts | where: "categories","Web-Design" %}
{% for post in sorted-posts limit: 5 %}
<li>{{post.title}}</li>
{% endfor %}
```

```html
{% for post in site.categories.Personal %}
 <li><span>{{ post.date | date_to_string }}</span> &nbsp; <a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
```

https://stackoverflow.com/questions/43034183/jekyll-grouping-and-sorting-collection-by-category-and-priority

```html
# _config.yml
categories-order:
 - getting started
 - tutorials
 - advanced
Then :

{% assign docs_by_category = site.documentation | group_by: "category" %}
{% for cat in site.categories-order %}
  {% assign currentCat = docs_by_category | where: 'name', cat | first %}
  <div class="category_wrapper">
    <div class="category">{{ currentCat.name }}</div>
    <ul>
    {% for item in currentCat.items %}
      <li class="collapsed">
        <a href="{{ site.baseurl }}{{ item.url }}">
        {% if item.url == navurl %}
          <u>{{ item.title }}</u>
        {% else %}
          {{ item.title }}
        {% endif %}
        </a>
      </li>
    {% endfor %}
    </ul>
  </div>
{% endfor %}
```

6. Nav bar mobile optimization: DONE
7. Paused at linking the li and href

Windows Registry
MD5 / hash
File signatures
TCP/UDP checksum
session in networking
TCP three way handshake
DNS mechanism
XOR debugging?

---------------

* Cross browser compatibility
* Package managers (npm, yarn, ...)
* 