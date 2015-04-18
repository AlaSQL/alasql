# Very Ornate Code

So [Literate Coffeescript](http://coffeescript.org/#literate) is a cool idea,
but why isn't there a standard JS or compile-to-JS version?  JS Programmers want
some love too!  This is my effort to rectify this inequity.

## How to use this

To use in-browser, include the marked source (and optionally the coffee-script 
source if desired):

```html>
<script src="https://raw.github.com/chjj/marked/master/lib/marked.js"></script>
<script src="http://coffeescript.org/extras/coffee-script.js"></script>
```

In tooling, `npm install -g voc` and run against your markdown file:

```>
$ voc yourfile.md
```

## VOC style

VOC searches for markdown code blocks.  Using GFM guards (triple backticks),
hints after the opening backticks are used to direct content.

For example, "\`\`\`&gt;foo.bar" will redirect content in the codeblock to 
`foo.bar`.  

## Preprocessing

If a preprocessor is available, VOC can be told to use it!  This is needed for
certain magic cases like Makefiles (which require explicit tabs).

As described in voc.md, there are two exported methods: `add` and `run`. To add
your own language preprocessor:

1. Define the handler function (accepts code and returns JS)

2. Add the language to the framework

3. Profit!

See the enclosed voc.md for more information.
