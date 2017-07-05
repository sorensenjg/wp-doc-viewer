# wp-doc-viewer
A document viewer plugin for wordpress that handles jpg, png, gif, pdf, doc, xls and ppt files, using google document viewer.

<hr>

<h2>How to use:</h2>
<p>This plugin exposes a function that accepts two parameters:</p>
<ul>
<li>$url – provides the path to the file for display.</li>
<li>$name – displays a title, otherwise defaults to the filename (optional).</li>
</ul>
<pre><code>echo docViewer($url, $name);</code></pre>

<hr>

<h2>How to build:</h2>
<p>At the root of the plugin run:</p>
<pre><code>npm install</code></pre>

<p>After the dependencies have downloaded, run:</p>
<pre><code>gulp</code></pre>
