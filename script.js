// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

"use strict";

// @ts-nocheck
/* eslint-disable */
let System, __instantiate;
(() => {
  const r = new Map();

  System = {
    register(id, d, f) {
      r.set(id, { d, f, exp: {} });
    },
  };
  async function dI(mid, src) {
    let id = mid.replace(/\.\w+$/i, "");
    if (id.includes("./")) {
      const [o, ...ia] = id.split("/").reverse(),
        [, ...sa] = src.split("/").reverse(),
        oa = [o];
      let s = 0,
        i;
      while ((i = ia.shift())) {
        if (i === "..") s++;
        else if (i === ".") break;
        else oa.push(i);
      }
      if (s < sa.length) oa.push(...sa.slice(s));
      id = oa.reverse().join("/");
    }
    return r.has(id) ? gExpA(id) : import(mid);
  }

  function gC(id, main) {
    return {
      id,
      import: (m) => dI(m, id),
      meta: { url: id, main },
    };
  }

  function gE(exp) {
    return (id, v) => {
      v = typeof id === "string" ? { [id]: v } : id;
      for (const [id, value] of Object.entries(v)) {
        Object.defineProperty(exp, id, {
          value,
          writable: true,
          enumerable: true,
        });
      }
    };
  }

  function rF(main) {
    for (const [id, m] of r.entries()) {
      const { f, exp } = m;
      const { execute: e, setters: s } = f(gE(exp), gC(id, id === main));
      delete m.f;
      m.e = e;
      m.s = s;
    }
  }

  async function gExpA(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](await gExpA(d[i]));
      const r = e();
      if (r) await r;
    }
    return m.exp;
  }

  function gExp(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](gExp(d[i]));
      e();
    }
    return m.exp;
  }
  __instantiate = (m, a) => {
    System = __instantiate = undefined;
    rF(m);
    return a ? gExpA(m) : gExp(m);
  };
})();

System.register("file:///C:/Users/gd/GitHub/grzegorzdryja.github.io/github/model", [], function (exports_1, context_1) {
    "use strict";
    var GitHubRepo;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            GitHubRepo = class GitHubRepo {
                constructor({ name, html_url, language, description }) {
                    this.name = name;
                    this.html_url = html_url;
                    this.language = language;
                    this.description = description;
                }
                toString() {
                    return `${this.name} ${this.html_url} ${this.language} ${this.description}`;
                }
            };
            exports_1("GitHubRepo", GitHubRepo);
        }
    };
});
System.register("file:///C:/Users/gd/GitHub/grzegorzdryja.github.io/github/service", ["file:///C:/Users/gd/GitHub/grzegorzdryja.github.io/github/model"], function (exports_2, context_2) {
    "use strict";
    var model_ts_1, REPOS_URL, RAW_URL, FORBIDDEN_ROPOS, convert;
    var __moduleName = context_2 && context_2.id;
    function getRepos() {
        return fetch(REPOS_URL)
            .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw Error('Response not 200 / something went wrong dowloading repos');
        })
            .then((arr) => arr
            .filter((repo) => !FORBIDDEN_ROPOS.includes(repo.name))
            .map(convert))
            .catch((err) => console.warn(err));
    }
    exports_2("default", getRepos);
    async function getRawFIleContent(pathToFile) {
        try {
            const response = await fetch(`${RAW_URL}${pathToFile}`);
            if (response.ok) {
                return await response.text();
            }
            throw Error('Response not 200/ bio file is not found');
        }
        catch (err) {
            console.log(err);
            return '';
        }
    }
    async function getAboutMe() {
        return getRawFIleContent('about-me.md');
    }
    exports_2("getAboutMe", getAboutMe);
    return {
        setters: [
            function (model_ts_1_1) {
                model_ts_1 = model_ts_1_1;
            }
        ],
        execute: function () {
            REPOS_URL = 'https://api.github.com/users/grzegorzdryja/repos';
            RAW_URL = 'https://raw.githubusercontent.com/GrzegorzDryja/grzegorzdryja.github.io/master/data/';
            FORBIDDEN_ROPOS = ['Strefanoid', 'Kalkulator', 'Console-Calculator', 'BallparkOrders', 'JS_Paint'];
            convert = ({ name, html_url, language, description }) => new model_ts_1.GitHubRepo({
                name,
                html_url,
                language,
                description
            });
        }
    };
});
System.register("file:///C:/Users/gd/GitHub/grzegorzdryja.github.io/github/mod", ["file:///C:/Users/gd/GitHub/grzegorzdryja.github.io/github/service"], function (exports_3, context_3) {
    "use strict";
    var service_ts_1;
    var __moduleName = context_3 && context_3.id;
    async function default_1() {
        const arr = await service_ts_1.default();
        return arr;
    }
    exports_3("default", default_1);
    return {
        setters: [
            function (service_ts_1_1) {
                service_ts_1 = service_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("https://deno.land/x/rimu/src/deno/io", [], function (exports_4, context_4) {
    "use strict";
    var Reader, Writer;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
            Reader = class Reader {
                constructor(text) {
                    text = text.replace("\u0000", " ");
                    text = text.replace("\u0001", " ");
                    text = text.replace("\u0002", " ");
                    this.lines = text.split(/\r\n|\r|\n/g);
                    this.pos = 0;
                }
                get cursor() {
                    console.assert(!this.eof());
                    return this.lines[this.pos];
                }
                set cursor(value) {
                    console.assert(!this.eof());
                    this.lines[this.pos] = value;
                }
                eof() {
                    return this.pos >= this.lines.length;
                }
                next() {
                    if (!this.eof())
                        this.pos++;
                }
                readTo(find) {
                    let result = [];
                    let match = null;
                    while (!this.eof()) {
                        match = this.cursor.match(find);
                        if (match) {
                            if (match[1] !== undefined) {
                                result.push(match[1]);
                            }
                            this.next();
                            break;
                        }
                        result.push(this.cursor);
                        this.next();
                    }
                    if (match || (find.toString() === "/^$/" && this.eof())) {
                        return result;
                    }
                    else {
                        return null;
                    }
                }
                skipBlankLines() {
                    while (!this.eof() && this.cursor.trim() === "") {
                        this.next();
                    }
                }
            };
            exports_4("Reader", Reader);
            Writer = class Writer {
                constructor() {
                    this.buffer = [];
                }
                write(s) {
                    this.buffer.push(s);
                }
                toString() {
                    return this.buffer.join("");
                }
            };
            exports_4("Writer", Writer);
        }
    };
});
System.register("https://deno.land/x/rimu/src/deno/quotes", ["https://deno.land/x/rimu/src/deno/utils"], function (exports_5, context_5) {
    "use strict";
    var Utils, defs, DEFAULT_DEFS, quotesRe, unescapeRe;
    var __moduleName = context_5 && context_5.id;
    function init() {
        defs = DEFAULT_DEFS.map((def) => Utils.copy(def));
        initializeRegExps();
    }
    exports_5("init", init);
    function initializeRegExps() {
        let quotes = defs.map((def) => Utils.escapeRegExp(def.quote));
        exports_5("quotesRe", quotesRe = RegExp("\\\\?(" + quotes.join("|") + ")([^\\s\\\\]|\\S[\\s\\S]*?[^\\s\\\\])\\1", "g"));
        unescapeRe = RegExp("\\\\(" + quotes.join("|") + ")", "g");
    }
    exports_5("initializeRegExps", initializeRegExps);
    function getDefinition(quote) {
        return defs.filter((def) => def.quote === quote)[0];
    }
    exports_5("getDefinition", getDefinition);
    function unescape(s) {
        return s.replace(unescapeRe, "$1");
    }
    exports_5("unescape", unescape);
    function setDefinition(def) {
        for (let d of defs) {
            if (d.quote === def.quote) {
                d.openTag = def.openTag;
                d.closeTag = def.closeTag;
                d.spans = def.spans;
                return;
            }
        }
        if (def.quote.length === 2) {
            defs.unshift(def);
        }
        else {
            defs.push(def);
        }
        initializeRegExps();
    }
    exports_5("setDefinition", setDefinition);
    return {
        setters: [
            function (Utils_1) {
                Utils = Utils_1;
            }
        ],
        execute: function () {
            DEFAULT_DEFS = [
                {
                    quote: "**",
                    openTag: "<strong>",
                    closeTag: "</strong>",
                    spans: true,
                },
                {
                    quote: "*",
                    openTag: "<em>",
                    closeTag: "</em>",
                    spans: true,
                },
                {
                    quote: "__",
                    openTag: "<strong>",
                    closeTag: "</strong>",
                    spans: true,
                },
                {
                    quote: "_",
                    openTag: "<em>",
                    closeTag: "</em>",
                    spans: true,
                },
                {
                    quote: "``",
                    openTag: "<code>",
                    closeTag: "</code>",
                    spans: false,
                },
                {
                    quote: "`",
                    openTag: "<code>",
                    closeTag: "</code>",
                    spans: false,
                },
                {
                    quote: "~~",
                    openTag: "<del>",
                    closeTag: "</del>",
                    spans: true,
                },
            ];
        }
    };
});
System.register("https://deno.land/x/rimu/src/deno/replacements", ["https://deno.land/x/rimu/src/deno/options", "https://deno.land/x/rimu/src/deno/utils"], function (exports_6, context_6) {
    "use strict";
    var Options, Utils, defs, DEFAULT_DEFS;
    var __moduleName = context_6 && context_6.id;
    function init() {
        exports_6("defs", defs = DEFAULT_DEFS.map((def) => Utils.copy(def)));
    }
    exports_6("init", init);
    function setDefinition(regexp, flags, replacement) {
        if (!/g/.test(flags)) {
            flags += "g";
        }
        for (let def of defs) {
            if (def.match.source === regexp) {
                def.match = new RegExp(regexp, flags);
                def.replacement = replacement;
                return;
            }
        }
        defs.push({ match: new RegExp(regexp, flags), replacement: replacement });
    }
    exports_6("setDefinition", setDefinition);
    return {
        setters: [
            function (Options_1) {
                Options = Options_1;
            },
            function (Utils_2) {
                Utils = Utils_2;
            }
        ],
        execute: function () {
            DEFAULT_DEFS = [
                {
                    match: /\\?<<#([a-zA-Z][\w\-]*)>>/g,
                    replacement: '<span id="$1"></span>',
                    filter: function (match) {
                        if (Options.skipBlockAttributes()) {
                            return "";
                        }
                        return Utils.replaceMatch(match, this.replacement);
                    },
                },
                {
                    match: /\\?<image:([^\s|]+)\|([^]*?)>/g,
                    replacement: '<img src="$1" alt="$2">',
                },
                {
                    match: /\\?<image:([^\s|]+?)>/g,
                    replacement: '<img src="$1" alt="$1">',
                },
                {
                    match: /\\?!\[([^[]*?)]\((\S+?)\)/g,
                    replacement: '<img src="$2" alt="$1">',
                },
                {
                    match: /\\?<(\S+@[\w.\-]+)\|([^]+?)>/g,
                    replacement: '<a href="mailto:$1">$$2</a>',
                },
                {
                    match: /\\?<(\S+@[\w.\-]+)>/g,
                    replacement: '<a href="mailto:$1">$1</a>',
                },
                {
                    match: /\\?\[([^[]*?)]\((\S+?)\)/g,
                    replacement: '<a href="$2">$$1</a>',
                },
                {
                    match: /\\?<(\S+?)\|([^]*?)>/g,
                    replacement: '<a href="$1">$$2</a>',
                },
                {
                    match: /\\?(<!--(?:[^<>&]*)?-->|<\/?([a-z][a-z0-9]*)(?:\s+[^<>&]+)?>)/ig,
                    replacement: "",
                    filter: function (match) {
                        return Options.htmlSafeModeFilter(match[1]);
                    },
                },
                {
                    match: /\\?<([^|\s]+?)>/g,
                    replacement: '<a href="$1">$1</a>',
                },
                {
                    match: /\\?((?:http|https):\/\/[^\s"']*[A-Za-z0-9/#])/g,
                    replacement: '<a href="$1">$1</a>',
                },
                {
                    match: /\\?(&[\w#][\w]+;)/g,
                    replacement: "",
                    filter: function (match) {
                        return match[1];
                    },
                },
                {
                    match: /[\\ ]\\(\n|$)/g,
                    replacement: "<br>$1",
                },
                {
                    match: /(\S\\)(?=`)/g,
                    replacement: "$1",
                },
                {
                    match: /([a-zA-Z0-9]_)(?=[a-zA-Z0-9])/g,
                    replacement: "$1",
                },
            ];
        }
    };
});
System.register("https://deno.land/x/rimu/src/deno/spans", ["https://deno.land/x/rimu/src/deno/quotes", "https://deno.land/x/rimu/src/deno/replacements", "https://deno.land/x/rimu/src/deno/utils"], function (exports_7, context_7) {
    "use strict";
    var Quotes, Replacements, Utils, savedReplacements;
    var __moduleName = context_7 && context_7.id;
    function render(source) {
        let result;
        result = preReplacements(source);
        let fragments = [{ text: result, done: false }];
        fragments = fragQuotes(fragments);
        fragSpecials(fragments);
        result = defrag(fragments);
        return postReplacements(result);
    }
    exports_7("render", render);
    function defrag(fragments) {
        return fragments.reduce((result, fragment) => result + fragment.text, "");
    }
    function fragQuotes(fragments) {
        let result;
        result = [];
        fragments.forEach((fragment) => {
            result.push.apply(result, fragQuote(fragment));
        });
        result
            .filter((fragment) => !fragment.done)
            .forEach((fragment) => fragment.text = Quotes.unescape(fragment.text));
        return result;
    }
    function fragQuote(fragment) {
        if (fragment.done) {
            return [fragment];
        }
        let quotesRe = Quotes.quotesRe;
        let match;
        quotesRe.lastIndex = 0;
        while (true) {
            match = quotesRe.exec(fragment.text);
            if (!match) {
                return [fragment];
            }
            if (match[0][0] === "\\") {
                quotesRe.lastIndex = match.index + match[1].length + 1;
                continue;
            }
            break;
        }
        let result = [];
        let def = Quotes.getDefinition(match[1]);
        while (fragment.text[quotesRe.lastIndex] === match[1][0]) {
            match[2] += match[1][0];
            quotesRe.lastIndex += 1;
        }
        let before = match.input.slice(0, match.index);
        let quoted = match[2];
        let after = match.input.slice(quotesRe.lastIndex);
        result.push({ text: before, done: false });
        result.push({ text: def.openTag, done: true });
        if (!def.spans) {
            quoted = Utils.replaceSpecialChars(quoted);
            quoted = quoted.replace(/\u0000/g, "\u0001");
            result.push({ text: quoted, done: true });
        }
        else {
            result.push.apply(result, fragQuote({ text: quoted, done: false }));
        }
        result.push({ text: def.closeTag, done: true });
        result.push.apply(result, fragQuote({ text: after, done: false }));
        return result;
    }
    function preReplacements(text) {
        savedReplacements = [];
        let fragments = fragReplacements([{ text: text, done: false }]);
        return fragments.reduce((result, fragment) => {
            if (fragment.done) {
                savedReplacements.push(fragment);
                return result + "\u0000";
            }
            else {
                return result + fragment.text;
            }
        }, "");
    }
    function postReplacements(text) {
        return text.replace(/[\u0000\u0001]/g, function (match) {
            let fragment = savedReplacements.shift();
            return (match === "\u0000")
                ? fragment.text
                : Utils.replaceSpecialChars(fragment.verbatim);
        });
    }
    function fragReplacements(fragments) {
        let result;
        Replacements.defs.forEach((def) => {
            result = [];
            fragments.forEach((fragment) => {
                result.push.apply(result, fragReplacement(fragment, def));
            });
            fragments = result;
        });
        return fragments;
    }
    function fragReplacement(fragment, def) {
        if (fragment.done) {
            return [fragment];
        }
        let replacementRe = def.match;
        let match;
        replacementRe.lastIndex = 0;
        match = replacementRe.exec(fragment.text);
        if (!match) {
            return [fragment];
        }
        let result = [];
        let before = match.input.slice(0, match.index);
        let after = match.input.slice(replacementRe.lastIndex);
        result.push({ text: before, done: false });
        let replacement;
        if (match[0][0] === "\\") {
            replacement = Utils.replaceSpecialChars(match[0].slice(1));
        }
        else {
            if (!def.filter) {
                replacement = Utils.replaceMatch(match, def.replacement);
            }
            else {
                replacement = def.filter(match);
            }
        }
        result.push({ text: replacement, done: true, verbatim: match[0] });
        result.push.apply(result, fragReplacement({ text: after, done: false }, def));
        return result;
    }
    function fragSpecials(fragments) {
        fragments
            .filter((fragment) => !fragment.done)
            .forEach((fragment) => fragment.text = Utils.replaceSpecialChars(fragment.text));
    }
    return {
        setters: [
            function (Quotes_1) {
                Quotes = Quotes_1;
            },
            function (Replacements_1) {
                Replacements = Replacements_1;
            },
            function (Utils_3) {
                Utils = Utils_3;
            }
        ],
        execute: function () {
        }
    };
});
System.register("https://deno.land/x/rimu/src/deno/utils", ["https://deno.land/x/rimu/src/deno/delimitedblocks", "https://deno.land/x/rimu/src/deno/macros", "https://deno.land/x/rimu/src/deno/options", "https://deno.land/x/rimu/src/deno/spans"], function (exports_8, context_8) {
    "use strict";
    var DelimitedBlocks, Macros, Options, Spans, BlockAttributes;
    var __moduleName = context_8 && context_8.id;
    function escapeRegExp(s) {
        return s.replace(/[\-\/\\^$*+?.()|\[\]{}]/g, "\\$&");
    }
    exports_8("escapeRegExp", escapeRegExp);
    function replaceSpecialChars(s) {
        return s.replace(/&/g, "&amp;")
            .replace(/>/g, "&gt;")
            .replace(/</g, "&lt;");
    }
    exports_8("replaceSpecialChars", replaceSpecialChars);
    function replaceMatch(match, replacement, expansionOptions = {}) {
        return replacement.replace(/(\${1,2})(\d)/g, function () {
            if (arguments[1] === "$$") {
                expansionOptions.spans = true;
            }
            else {
                expansionOptions.specials = true;
            }
            let i = Number(arguments[2]);
            let result = match[i];
            if (result === undefined) {
                Options.errorCallback("undefined replacement group: " + arguments[0]);
                return "";
            }
            return replaceInline(result, expansionOptions);
        });
    }
    exports_8("replaceMatch", replaceMatch);
    function copy(source) {
        let result = {};
        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                result[key] = source[key];
            }
        }
        return result;
    }
    exports_8("copy", copy);
    function merge(target, source) {
        for (let key in source) {
            target[key] = source[key];
        }
    }
    exports_8("merge", merge);
    function replaceInline(text, expansionOptions) {
        if (expansionOptions.macros) {
            text = Macros.render(text);
        }
        if (expansionOptions.spans) {
            text = Spans.render(text);
        }
        else if (expansionOptions.specials) {
            text = replaceSpecialChars(text);
        }
        return text;
    }
    exports_8("replaceInline", replaceInline);
    return {
        setters: [
            function (DelimitedBlocks_1) {
                DelimitedBlocks = DelimitedBlocks_1;
            },
            function (Macros_1) {
                Macros = Macros_1;
            },
            function (Options_2) {
                Options = Options_2;
            },
            function (Spans_1) {
                Spans = Spans_1;
            }
        ],
        execute: function () {
            (function (BlockAttributes) {
                let ids;
                function init() {
                    BlockAttributes.classes = "";
                    BlockAttributes.id = "";
                    BlockAttributes.css = "";
                    BlockAttributes.attributes = "";
                    BlockAttributes.options = {};
                    ids = [];
                }
                BlockAttributes.init = init;
                function parse(match) {
                    let text = match[0];
                    text = replaceInline(text, { macros: true });
                    let m = /^\\?\.((?:\s*[a-zA-Z][\w\-]*)+)*(?:\s*)?(#[a-zA-Z][\w\-]*\s*)?(?:\s*)?(?:"(.+?)")?(?:\s*)?(\[.+])?(?:\s*)?([+-][ \w+-]+)?$/
                        .exec(text);
                    if (!m) {
                        return false;
                    }
                    if (!Options.skipBlockAttributes()) {
                        if (m[1]) {
                            BlockAttributes.classes += " " + m[1].trim();
                            BlockAttributes.classes = BlockAttributes.classes.trim();
                        }
                        if (m[2]) {
                            BlockAttributes.id = m[2].trim().slice(1);
                        }
                        if (m[3]) {
                            if (BlockAttributes.css && BlockAttributes.css.substr(-1) !== ";")
                                BlockAttributes.css += ";";
                            BlockAttributes.css += " " + m[3].trim();
                            BlockAttributes.css = BlockAttributes.css.trim();
                        }
                        if (m[4] && !Options.isSafeModeNz()) {
                            BlockAttributes.attributes += " " + m[4].slice(1, m[4].length - 1).trim();
                            BlockAttributes.attributes = BlockAttributes.attributes.trim();
                        }
                        DelimitedBlocks.setBlockOptions(BlockAttributes.options, m[5]);
                    }
                    return true;
                }
                BlockAttributes.parse = parse;
                function inject(tag, consume = true) {
                    if (!tag) {
                        return tag;
                    }
                    let attrs = "";
                    if (BlockAttributes.classes) {
                        let re = /^(<[^>]*class=")(.*?)"/i;
                        if (re.test(tag)) {
                            tag = tag.replace(re, `$1${BlockAttributes.classes} $2"`);
                        }
                        else {
                            attrs = `class="${BlockAttributes.classes}"`;
                        }
                    }
                    if (BlockAttributes.id) {
                        BlockAttributes.id = BlockAttributes.id.toLowerCase();
                        let has_id = /^<[^<]*id=".*?"/i.test(tag);
                        if (has_id || ids.indexOf(BlockAttributes.id) > -1) {
                            Options.errorCallback(`duplicate 'id' attribute: ${BlockAttributes.id}`);
                        }
                        else {
                            ids.push(BlockAttributes.id);
                        }
                        if (!has_id) {
                            attrs += ` id="${BlockAttributes.id}"`;
                        }
                    }
                    if (BlockAttributes.css) {
                        let re = /^(<[^>]*style=")(.*?)"/i;
                        if (re.test(tag)) {
                            tag = tag.replace(re, function (match, p1, p2) {
                                p2 = p2.trim();
                                if (p2 && p2.substr(-1) !== ";")
                                    p2 += ";";
                                return `${p1}${p2} ${BlockAttributes.css}"`;
                            });
                        }
                        else {
                            attrs += ` style="${BlockAttributes.css}"`;
                        }
                    }
                    if (BlockAttributes.attributes) {
                        attrs += " " + BlockAttributes.attributes;
                    }
                    attrs = attrs.trim();
                    if (attrs) {
                        let match = tag.match(/^<([a-zA-Z]+|h[1-6])(?=[ >])/);
                        if (match) {
                            let before = tag.slice(0, match[0].length);
                            let after = tag.slice(match[0].length);
                            tag = before + " " + attrs + after;
                        }
                    }
                    if (consume) {
                        BlockAttributes.classes = "";
                        BlockAttributes.id = "";
                        BlockAttributes.css = "";
                        BlockAttributes.attributes = "";
                    }
                    return tag;
                }
                BlockAttributes.inject = inject;
                function slugify(text) {
                    let slug = text.replace(/\W+/g, "-")
                        .replace(/-+/g, "-")
                        .replace(/(^-)|(-$)/g, "")
                        .toLowerCase();
                    if (!slug)
                        slug = "x";
                    if (ids.indexOf(slug) > -1) {
                        let i = 2;
                        while (ids.indexOf(slug + "-" + i) > -1) {
                            i++;
                        }
                        slug += "-" + i;
                    }
                    return slug;
                }
                BlockAttributes.slugify = slugify;
            })(BlockAttributes || (BlockAttributes = {}));
            exports_8("BlockAttributes", BlockAttributes);
        }
    };
});
System.register("https://deno.land/x/rimu/src/deno/options", ["https://deno.land/x/rimu/src/deno/api", "https://deno.land/x/rimu/src/deno/utils"], function (exports_9, context_9) {
    "use strict";
    var Api, Utils, safeMode, htmlReplacement, callback;
    var __moduleName = context_9 && context_9.id;
    function init() {
        safeMode = 0;
        htmlReplacement = "<mark>replaced HTML</mark>";
        callback = undefined;
    }
    exports_9("init", init);
    function isSafeModeNz() {
        return safeMode !== 0;
    }
    exports_9("isSafeModeNz", isSafeModeNz);
    function getSafeMode() {
        return safeMode;
    }
    exports_9("getSafeMode", getSafeMode);
    function skipMacroDefs() {
        return safeMode !== 0 && (safeMode & 0x8) === 0;
    }
    exports_9("skipMacroDefs", skipMacroDefs);
    function skipBlockAttributes() {
        return (safeMode & 0x4) !== 0;
    }
    exports_9("skipBlockAttributes", skipBlockAttributes);
    function setSafeMode(value) {
        let n = Number(value);
        if (isNaN(n) || n < 0 || n > 15) {
            errorCallback("illegal safeMode API option value: " + value);
            return;
        }
        safeMode = n;
    }
    function setHtmlReplacement(value) {
        if (value === undefined)
            return;
        htmlReplacement = value;
    }
    function setReset(value) {
        if (value === false || value === "false") {
            return;
        }
        else if (value === true || value === "true") {
            Api.init();
        }
        else {
            errorCallback("illegal reset API option value: " + value);
        }
    }
    function updateOptions(options) {
        for (let key in options) {
            switch (key) {
                case "reset":
                case "safeMode":
                case "htmlReplacement":
                case "callback":
                    break;
                default:
                    errorCallback("illegal API option name: " + key);
                    return;
            }
        }
        if ("callback" in options)
            callback = options.callback;
        if ("reset" in options)
            setReset(options.reset);
        if ("callback" in options)
            callback = options.callback;
        if ("safeMode" in options)
            setSafeMode(options.safeMode);
        if ("htmlReplacement" in options) {
            setHtmlReplacement(options.htmlReplacement);
        }
    }
    exports_9("updateOptions", updateOptions);
    function setOption(name, value) {
        let option = {};
        option[name] = value;
        updateOptions(option);
    }
    exports_9("setOption", setOption);
    function htmlSafeModeFilter(html) {
        switch (safeMode & 0x3) {
            case 0:
                return html;
            case 1:
                return "";
            case 2:
                return htmlReplacement;
            case 3:
                return Utils.replaceSpecialChars(html);
            default:
                return "";
        }
    }
    exports_9("htmlSafeModeFilter", htmlSafeModeFilter);
    function errorCallback(message) {
        if (callback) {
            callback({ type: "error", text: message });
        }
    }
    exports_9("errorCallback", errorCallback);
    function panic(message) {
        let msg = "panic: " + message;
        console.error(msg);
        errorCallback(msg);
    }
    exports_9("panic", panic);
    return {
        setters: [
            function (Api_1) {
                Api = Api_1;
            },
            function (Utils_4) {
                Utils = Utils_4;
            }
        ],
        execute: function () {
        }
    };
});
System.register("https://deno.land/x/rimu/src/deno/macros", ["https://deno.land/x/rimu/src/deno/options", "https://deno.land/x/rimu/src/deno/spans"], function (exports_10, context_10) {
    "use strict";
    var Options, Spans, MATCH_LINE, LINE_DEF, LITERAL_DEF_OPEN, LITERAL_DEF_CLOSE, EXPRESSION_DEF_OPEN, EXPRESSION_DEF_CLOSE, defs;
    var __moduleName = context_10 && context_10.id;
    function init() {
        exports_10("defs", defs = [
            { name: "--", value: "" },
            { name: "--header-ids", value: "" },
        ]);
    }
    exports_10("init", init);
    function getValue(name) {
        for (let def of defs) {
            if (def.name === name) {
                return def.value;
            }
        }
        return null;
    }
    exports_10("getValue", getValue);
    function setValue(name, value, quote) {
        if (Options.skipMacroDefs()) {
            return;
        }
        let existential = false;
        if (name.slice(-1) === "?") {
            name = name.slice(0, -1);
            existential = true;
        }
        if (name === "--" && value !== "") {
            Options.errorCallback("the predefined blank '--' macro cannot be redefined");
            return;
        }
        if (quote === "`") {
            try {
                value = eval(value);
            }
            catch (e) {
                Options.errorCallback(`illegal macro expression: ${e.message}: ${value}`);
            }
        }
        for (let def of defs) {
            if (def.name === name) {
                if (!existential) {
                    def.value = value;
                }
                return;
            }
        }
        defs.push({ name: name, value: value });
    }
    exports_10("setValue", setValue);
    function render(text, silent = false) {
        const MATCH_COMPLEX = /\\?{([\w\-]+)([!=|?](?:|[^]*?[^\\]))}/g;
        const MATCH_SIMPLE = /\\?{([\w\-]+)()}/g;
        let result = text;
        [MATCH_SIMPLE, MATCH_COMPLEX].forEach((find) => {
            result = result.replace(find, function (match, ...submatches) {
                if (match[0] === "\\") {
                    return match.slice(1);
                }
                let name = submatches[0];
                let params = submatches[1] || "";
                if (params[0] === "?") {
                    if (!silent) {
                        Options.errorCallback("existential macro invocations are deprecated: " + match);
                    }
                    return match;
                }
                let value = getValue(name);
                if (value === null) {
                    if (!silent) {
                        Options.errorCallback("undefined macro: " + match + ": " + text);
                    }
                    return match;
                }
                if (find === MATCH_SIMPLE) {
                    return value;
                }
                params = params.replace(/\\}/g, "}");
                switch (params[0]) {
                    case "|":
                        let paramsList = params.slice(1).split("|");
                        const PARAM_RE = /\\?(\$\$?)(\d+)(\\?:(|[^]*?[^\\])\$)?/g;
                        value = (value || "").replace(PARAM_RE, function (match, p1, p2, p3, p4) {
                            if (match[0] === "\\") {
                                return match.slice(1);
                            }
                            if (Number(p2) === 0) {
                                return match;
                            }
                            let param = paramsList[Number(p2) - 1];
                            param = param === undefined ? "" : param;
                            if (p3 !== undefined) {
                                if (p3[0] === "\\") {
                                    param += p3.slice(1);
                                }
                                else {
                                    if (param === "") {
                                        param = p4;
                                        param = param.replace(/\\\$/g, "$");
                                    }
                                }
                            }
                            if (p1 === "$$") {
                                param = Spans.render(param);
                            }
                            return param;
                        });
                        return value;
                    case "!":
                    case "=":
                        let pattern = params.slice(1);
                        let skip = false;
                        try {
                            skip = !RegExp("^" + pattern + "$").test(value || "");
                        }
                        catch {
                            if (!silent) {
                                Options.errorCallback("illegal macro regular expression: " + pattern + ": " + text);
                            }
                            return match;
                        }
                        if (params[0] === "!") {
                            skip = !skip;
                        }
                        return skip ? "\u0002" : "";
                    default:
                        Options.errorCallback("illegal macro syntax: " + match[0]);
                        return "";
                }
            });
        });
        if (result.indexOf("\u0002") !== -1) {
            result = result.split("\n")
                .filter((line) => line.indexOf("\u0002") === -1)
                .join("\n");
        }
        return result;
    }
    exports_10("render", render);
    return {
        setters: [
            function (Options_3) {
                Options = Options_3;
            },
            function (Spans_2) {
                Spans = Spans_2;
            }
        ],
        execute: function () {
            exports_10("MATCH_LINE", MATCH_LINE = /^({(?:[\w\-]+)(?:[!=|?](?:|.*?[^\\]))?}).*$/);
            exports_10("LINE_DEF", LINE_DEF = /^\\?{([\w\-]+\??)}\s*=\s*(['`])(.*)\2$/);
            exports_10("LITERAL_DEF_OPEN", LITERAL_DEF_OPEN = /^\\?{[\w\-]+\??}\s*=\s*'(.*)$/);
            exports_10("LITERAL_DEF_CLOSE", LITERAL_DEF_CLOSE = /^(.*)'$/);
            exports_10("EXPRESSION_DEF_OPEN", EXPRESSION_DEF_OPEN = /^\\?{[\w\-]+\??}\s*=\s*`(.*)$/);
            exports_10("EXPRESSION_DEF_CLOSE", EXPRESSION_DEF_CLOSE = /^(.*)`$/);
            exports_10("defs", defs = []);
        }
    };
});
System.register("https://deno.land/x/rimu/src/deno/delimitedblocks", ["https://deno.land/x/rimu/src/deno/api", "https://deno.land/x/rimu/src/deno/macros", "https://deno.land/x/rimu/src/deno/options", "https://deno.land/x/rimu/src/deno/utils"], function (exports_11, context_11) {
    "use strict";
    var Api, Macros, Options, Utils, utils_ts_1, MATCH_INLINE_TAG, defs, DEFAULT_DEFS;
    var __moduleName = context_11 && context_11.id;
    function init() {
        exports_11("defs", defs = DEFAULT_DEFS.map((def) => Utils.copy(def)));
        defs.forEach((def, i) => def.expansionOptions = Utils.copy(DEFAULT_DEFS[i].expansionOptions));
    }
    exports_11("init", init);
    function render(reader, writer, allowed = []) {
        if (reader.eof())
            Options.panic("premature eof");
        for (let def of defs) {
            if (allowed.length > 0 && allowed.indexOf(def.name ? def.name : "") === -1) {
                continue;
            }
            let match = reader.cursor.match(def.openMatch);
            if (match) {
                if (match[0][0] === "\\" && def.name !== "paragraph") {
                    reader.cursor = reader.cursor.slice(1);
                    continue;
                }
                if (def.verify && !def.verify(match)) {
                    continue;
                }
                let delimiterText = def.delimiterFilter ? def.delimiterFilter(match) : "";
                let lines = [];
                if (delimiterText) {
                    lines.push(delimiterText);
                }
                reader.next();
                let content = reader.readTo(def.closeMatch);
                if (content === null) {
                    Options.errorCallback("unterminated delimited block: " + match[0]);
                }
                if (content) {
                    lines = [...lines, ...content];
                }
                let expansionOptions = {
                    macros: false,
                    spans: false,
                    specials: false,
                    container: false,
                    skip: false,
                };
                Utils.merge(expansionOptions, def.expansionOptions);
                Utils.merge(expansionOptions, utils_ts_1.BlockAttributes.options);
                if (!expansionOptions.skip) {
                    let text = lines.join("\n");
                    if (def.contentFilter) {
                        text = def.contentFilter(text, match, expansionOptions);
                    }
                    let opentag = def.openTag;
                    if (def.name === "html") {
                        text = utils_ts_1.BlockAttributes.inject(text);
                    }
                    else {
                        opentag = utils_ts_1.BlockAttributes.inject(opentag);
                    }
                    if (expansionOptions.container) {
                        delete utils_ts_1.BlockAttributes.options.container;
                        text = Api.render(text);
                    }
                    else {
                        text = Utils.replaceInline(text, expansionOptions);
                    }
                    let closetag = def.closeTag;
                    if (def.name === "division" && opentag === "<div>") {
                        opentag = "";
                        closetag = "";
                    }
                    writer.write(opentag);
                    writer.write(text);
                    writer.write(closetag);
                    if ((opentag || text || closetag) && !reader.eof()) {
                        writer.write("\n");
                    }
                }
                utils_ts_1.BlockAttributes.options = {};
                return true;
            }
        }
        return false;
    }
    exports_11("render", render);
    function getDefinition(name) {
        return defs.filter((def) => def.name === name)[0];
    }
    exports_11("getDefinition", getDefinition);
    function setBlockOptions(blockOptions, optionsString) {
        if (optionsString) {
            let opts = optionsString.trim().split(/\s+/);
            for (let opt of opts) {
                if (Options.isSafeModeNz() && opt === "-specials") {
                    Options.errorCallback("-specials block option not valid in safeMode");
                    continue;
                }
                if (/^[+-](macros|spans|specials|container|skip)$/.test(opt)) {
                    blockOptions[opt.slice(1)] = opt[0] === "+";
                }
                else {
                    Options.errorCallback("illegal block option: " + opt);
                }
            }
        }
    }
    exports_11("setBlockOptions", setBlockOptions);
    function setDefinition(name, value) {
        let def = getDefinition(name);
        if (!def) {
            Options.errorCallback("illegal delimited block name: " + name + ": |" + name + "|='" + value +
                "'");
            return;
        }
        let match = value.trim().match(/^(?:(<[a-zA-Z].*>)\|(<[a-zA-Z/].*>))?(?:\s*)?([+-][ \w+-]+)?$/);
        if (match === null) {
            Options.errorCallback("illegal delimited block definition: |" + name + "|='" + value + "'");
            return;
        }
        if (match[1]) {
            def.openTag = match[1];
            def.closeTag = match[2];
        }
        if (match[3]) {
            setBlockOptions(def.expansionOptions, match[3]);
        }
    }
    exports_11("setDefinition", setDefinition);
    function delimiterTextFilter(match) {
        return match[1];
    }
    function classInjectionFilter(match) {
        if (match[2]) {
            let p1;
            if ((p1 = match[2].trim())) {
                utils_ts_1.BlockAttributes.classes = p1;
            }
        }
        this.closeMatch = RegExp("^" + Utils.escapeRegExp(match[1]) + "$");
        return "";
    }
    function macroDefContentFilter(text, match, expansionOptions) {
        let quote = match[0][match[0].length - match[1].length - 1];
        let name = match[0].match(/^{([\w\-]+\??)}/)[1];
        text = text.replace(RegExp("(" + quote + ") *\\\\\\n", "g"), "$1\n");
        text = text.replace(RegExp("(" + quote + " *[\\\\]+)\\\\\\n", "g"), "$1\n");
        text = Utils.replaceInline(text, expansionOptions);
        Macros.setValue(name, text, quote);
        return "";
    }
    return {
        setters: [
            function (Api_2) {
                Api = Api_2;
            },
            function (Macros_2) {
                Macros = Macros_2;
            },
            function (Options_4) {
                Options = Options_4;
            },
            function (Utils_5) {
                Utils = Utils_5;
                utils_ts_1 = Utils_5;
            }
        ],
        execute: function () {
            MATCH_INLINE_TAG = /^(a|abbr|acronym|address|b|bdi|bdo|big|blockquote|br|cite|code|del|dfn|em|i|img|ins|kbd|mark|q|s|samp|small|span|strike|strong|sub|sup|time|tt|u|var|wbr)$/i;
            DEFAULT_DEFS = [
                {
                    openMatch: Macros.LITERAL_DEF_OPEN,
                    closeMatch: Macros.LITERAL_DEF_CLOSE,
                    openTag: "",
                    closeTag: "",
                    expansionOptions: {
                        macros: true,
                    },
                    delimiterFilter: delimiterTextFilter,
                    contentFilter: macroDefContentFilter,
                },
                {
                    openMatch: Macros.EXPRESSION_DEF_OPEN,
                    closeMatch: Macros.EXPRESSION_DEF_CLOSE,
                    openTag: "",
                    closeTag: "",
                    expansionOptions: {
                        macros: true,
                    },
                    delimiterFilter: delimiterTextFilter,
                    contentFilter: macroDefContentFilter,
                },
                {
                    name: "comment",
                    openMatch: /^\\?\/\*+$/,
                    closeMatch: /^\*+\/$/,
                    openTag: "",
                    closeTag: "",
                    expansionOptions: {
                        skip: true,
                        specials: true,
                    },
                },
                {
                    name: "division",
                    openMatch: /^\\?(\.{2,})([\w\s-]*)$/,
                    openTag: "<div>",
                    closeTag: "</div>",
                    expansionOptions: {
                        container: true,
                        specials: true,
                    },
                    delimiterFilter: classInjectionFilter,
                },
                {
                    name: "quote",
                    openMatch: /^\\?("{2,})([\w\s-]*)$/,
                    openTag: "<blockquote>",
                    closeTag: "</blockquote>",
                    expansionOptions: {
                        container: true,
                        specials: true,
                    },
                    delimiterFilter: classInjectionFilter,
                },
                {
                    name: "code",
                    openMatch: /^\\?(-{2,}|`{2,})([\w\s-]*)$/,
                    openTag: "<pre><code>",
                    closeTag: "</code></pre>",
                    expansionOptions: {
                        macros: false,
                        specials: true,
                    },
                    verify: function (match) {
                        return !(match[1][0] === "-" && match[2].trim() !== "");
                    },
                    delimiterFilter: classInjectionFilter,
                },
                {
                    name: "html",
                    openMatch: /^(<!--.*|<!DOCTYPE(?:\s.*)?|<\/?([a-z][a-z0-9]*)(?:[\s>].*)?)$/i,
                    closeMatch: /^$/,
                    openTag: "",
                    closeTag: "",
                    expansionOptions: {
                        macros: true,
                    },
                    verify: function (match) {
                        if (match[2]) {
                            return !MATCH_INLINE_TAG.test(match[2]);
                        }
                        else {
                            return true;
                        }
                    },
                    delimiterFilter: delimiterTextFilter,
                    contentFilter: Options.htmlSafeModeFilter,
                },
                {
                    name: "indented",
                    openMatch: /^\\?(\s+\S.*)$/,
                    closeMatch: /^$/,
                    openTag: "<pre><code>",
                    closeTag: "</code></pre>",
                    expansionOptions: {
                        macros: false,
                        specials: true,
                    },
                    delimiterFilter: delimiterTextFilter,
                    contentFilter: function (text) {
                        let first_indent = text.search(/\S/);
                        return text.split("\n")
                            .map((line) => {
                            let indent = line.search(/\S|$/);
                            if (indent > first_indent)
                                indent = first_indent;
                            return line.slice(indent);
                        })
                            .join("\n");
                    },
                },
                {
                    name: "quote-paragraph",
                    openMatch: /^\\?(>.*)$/,
                    closeMatch: /^$/,
                    openTag: "<blockquote><p>",
                    closeTag: "</p></blockquote>",
                    expansionOptions: {
                        macros: true,
                        spans: true,
                        specials: true,
                    },
                    delimiterFilter: delimiterTextFilter,
                    contentFilter: function (text) {
                        return text.split("\n")
                            .map((line) => line
                            .replace(/^>/, "")
                            .replace(/^\\>/, ">"))
                            .join("\n");
                    },
                },
                {
                    name: "paragraph",
                    openMatch: /(.*)/,
                    closeMatch: /^$/,
                    openTag: "<p>",
                    closeTag: "</p>",
                    expansionOptions: {
                        macros: true,
                        spans: true,
                        specials: true,
                    },
                    delimiterFilter: delimiterTextFilter,
                },
            ];
        }
    };
});
System.register("https://deno.land/x/rimu/src/deno/lineblocks", ["https://deno.land/x/rimu/src/deno/delimitedblocks", "https://deno.land/x/rimu/src/deno/macros", "https://deno.land/x/rimu/src/deno/options", "https://deno.land/x/rimu/src/deno/quotes", "https://deno.land/x/rimu/src/deno/replacements", "https://deno.land/x/rimu/src/deno/utils"], function (exports_12, context_12) {
    "use strict";
    var DelimitedBlocks, Macros, Options, Quotes, Replacements, Utils, utils_ts_2, defs;
    var __moduleName = context_12 && context_12.id;
    function render(reader, writer, allowed = []) {
        if (reader.eof())
            Options.panic("premature eof");
        for (let def of defs) {
            if (allowed.length > 0 && allowed.indexOf(def.name ? def.name : "") === -1) {
                continue;
            }
            let match = def.match.exec(reader.cursor);
            if (match) {
                if (match[0][0] === "\\") {
                    reader.cursor = reader.cursor.slice(1);
                    continue;
                }
                if (def.verify && !def.verify(match, reader)) {
                    continue;
                }
                let text;
                if (!def.filter) {
                    text = def.replacement
                        ? Utils.replaceMatch(match, def.replacement, { macros: true })
                        : "";
                }
                else {
                    text = def.filter(match, reader);
                }
                if (text) {
                    text = utils_ts_2.BlockAttributes.inject(text);
                    writer.write(text);
                    reader.next();
                    if (!reader.eof()) {
                        writer.write("\n");
                    }
                }
                else {
                    reader.next();
                }
                return true;
            }
        }
        return false;
    }
    exports_12("render", render);
    return {
        setters: [
            function (DelimitedBlocks_2) {
                DelimitedBlocks = DelimitedBlocks_2;
            },
            function (Macros_3) {
                Macros = Macros_3;
            },
            function (Options_5) {
                Options = Options_5;
            },
            function (Quotes_2) {
                Quotes = Quotes_2;
            },
            function (Replacements_2) {
                Replacements = Replacements_2;
            },
            function (Utils_6) {
                Utils = Utils_6;
                utils_ts_2 = Utils_6;
            }
        ],
        execute: function () {
            defs = [
                {
                    match: /^\\?\/{2}(.*)$/,
                },
                {
                    match: Macros.MATCH_LINE,
                    verify: function (match, reader) {
                        if (Macros.LITERAL_DEF_OPEN.test(match[0]) ||
                            Macros.EXPRESSION_DEF_OPEN.test(match[0])) {
                            return false;
                        }
                        let value = Macros.render(match[0], true);
                        if (value.substr(0, match[0].length) === match[0] ||
                            value.indexOf("\n" + match[0]) >= 0) {
                            return false;
                        }
                        let spliceArgs = [
                            reader.pos + 1,
                            0,
                            ...value.split("\n"),
                        ];
                        Array.prototype.splice.apply(reader.lines, spliceArgs);
                        return true;
                    },
                    filter: function (match, reader) {
                        return "";
                    },
                },
                {
                    match: /^\\?\|([\w\-]+)\|\s*=\s*'(.*)'$/,
                    filter: function (match) {
                        if (Options.isSafeModeNz()) {
                            return "";
                        }
                        match[2] = Utils.replaceInline(match[2], { macros: true });
                        DelimitedBlocks.setDefinition(match[1], match[2]);
                        return "";
                    },
                },
                {
                    match: /^(\S{1,2})\s*=\s*'([^|]*)(\|{1,2})(.*)'$/,
                    filter: function (match) {
                        if (Options.isSafeModeNz()) {
                            return "";
                        }
                        Quotes.setDefinition({
                            quote: match[1],
                            openTag: Utils.replaceInline(match[2], { macros: true }),
                            closeTag: Utils.replaceInline(match[4], { macros: true }),
                            spans: match[3] === "|",
                        });
                        return "";
                    },
                },
                {
                    match: /^\\?\/(.+)\/([igm]*)\s*=\s*'(.*)'$/,
                    filter: function (match) {
                        if (Options.isSafeModeNz()) {
                            return "";
                        }
                        let pattern = match[1];
                        let flags = match[2];
                        let replacement = match[3];
                        replacement = Utils.replaceInline(replacement, { macros: true });
                        Replacements.setDefinition(pattern, flags, replacement);
                        return "";
                    },
                },
                {
                    match: Macros.LINE_DEF,
                    filter: function (match) {
                        let name = match[1];
                        let quote = match[2];
                        let value = match[3];
                        value = Utils.replaceInline(value, { macros: true });
                        Macros.setValue(name, value, quote);
                        return "";
                    },
                },
                {
                    match: /^\\?([#=]{1,6})\s+(.+?)(?:\s+\1)?$/,
                    replacement: "<h$1>$$2</h$1>",
                    filter: function (match) {
                        match[1] = match[1].length.toString();
                        if (Macros.getValue("--header-ids") && utils_ts_2.BlockAttributes.id === "") {
                            utils_ts_2.BlockAttributes.id = utils_ts_2.BlockAttributes.slugify(match[2]);
                        }
                        return Utils.replaceMatch(match, this.replacement, { macros: true });
                    },
                },
                {
                    match: /^\\?<image:([^\s|]+)\|([^]+?)>$/,
                    replacement: '<img src="$1" alt="$2">',
                },
                {
                    match: /^\\?<image:([^\s|]+?)>$/,
                    replacement: '<img src="$1" alt="$1">',
                },
                {
                    match: /^\\?<<#([a-zA-Z][\w\-]*)>>$/,
                    replacement: '<div id="$1"></div>',
                    filter: function (match, reader) {
                        if (Options.skipBlockAttributes()) {
                            return "";
                        }
                        else {
                            return Utils.replaceMatch(match, this.replacement, { macros: true });
                        }
                    },
                },
                {
                    name: "attributes",
                    match: /^\\?\.[a-zA-Z#"\[+-].*$/,
                    verify: function (match) {
                        return utils_ts_2.BlockAttributes.parse(match);
                    },
                },
                {
                    match: /^\\?\.(\w+)\s*=\s*'(.*)'$/,
                    filter: function (match) {
                        if (!Options.isSafeModeNz()) {
                            let value = Utils.replaceInline(match[2], { macros: true });
                            Options.setOption(match[1], value);
                        }
                        return "";
                    },
                },
            ];
        }
    };
});
System.register("https://deno.land/x/rimu/src/deno/lists", ["https://deno.land/x/rimu/src/deno/delimitedblocks", "https://deno.land/x/rimu/src/deno/io", "https://deno.land/x/rimu/src/deno/lineblocks", "https://deno.land/x/rimu/src/deno/options", "https://deno.land/x/rimu/src/deno/utils"], function (exports_13, context_13) {
    "use strict";
    var DelimitedBlocks, Io, LineBlocks, Options, Utils, utils_ts_3, defs, ids;
    var __moduleName = context_13 && context_13.id;
    function render(reader, writer) {
        if (reader.eof())
            Options.panic("premature eof");
        let start_item;
        if (!(start_item = matchItem(reader))) {
            return false;
        }
        ids = [];
        renderList(start_item, reader, writer);
        if (ids.length !== 0)
            Options.panic("list stack failure");
        return true;
    }
    exports_13("render", render);
    function renderList(item, reader, writer) {
        ids.push(item.id);
        writer.write(utils_ts_3.BlockAttributes.inject(item.def.listOpenTag));
        let next_item;
        while (true) {
            next_item = renderListItem(item, reader, writer);
            if (!next_item || next_item.id !== item.id) {
                writer.write(item.def.listCloseTag);
                ids.pop();
                return next_item;
            }
            item = next_item;
        }
    }
    function renderListItem(item, reader, writer) {
        let def = item.def;
        let match = item.match;
        let text;
        if (match.length === 4) {
            writer.write(utils_ts_3.BlockAttributes.inject(def.termOpenTag, false));
            utils_ts_3.BlockAttributes.id = "";
            text = Utils.replaceInline(match[1], { macros: true, spans: true });
            writer.write(text);
            writer.write(def.termCloseTag);
        }
        writer.write(utils_ts_3.BlockAttributes.inject(def.itemOpenTag));
        let item_lines = new Io.Writer();
        text = match[match.length - 1];
        item_lines.write(text + "\n");
        reader.next();
        let attached_lines = new Io.Writer();
        let blank_lines;
        let attached_done = false;
        let next_item;
        while (true) {
            blank_lines = consumeBlockAttributes(reader, attached_lines);
            if (blank_lines >= 2 || blank_lines === -1) {
                next_item = null;
                break;
            }
            next_item = matchItem(reader);
            if (next_item) {
                if (ids.indexOf(next_item.id) !== -1) {
                }
                else {
                    next_item = renderList(next_item, reader, attached_lines);
                }
                break;
            }
            if (attached_done) {
                break;
            }
            if (blank_lines === 0) {
                let savedIds = ids;
                ids = [];
                if (DelimitedBlocks.render(reader, attached_lines, ["comment", "code", "division", "html", "quote"])) {
                    attached_done = true;
                }
                else {
                    item_lines.write(reader.cursor + "\n");
                    reader.next();
                }
                ids = savedIds;
            }
            else if (blank_lines === 1) {
                if (DelimitedBlocks.render(reader, attached_lines, ["indented", "quote-paragraph"])) {
                    attached_done = true;
                }
                else {
                    break;
                }
            }
        }
        text = item_lines.toString().trim();
        text = Utils.replaceInline(text, { macros: true, spans: true });
        writer.write(text);
        writer.buffer = [...writer.buffer, ...attached_lines.buffer];
        writer.write(def.itemCloseTag);
        return next_item;
    }
    function consumeBlockAttributes(reader, writer) {
        let blanks = 0;
        while (true) {
            if (reader.eof()) {
                return -1;
            }
            if (LineBlocks.render(reader, writer, ["attributes"])) {
                continue;
            }
            if (reader.cursor !== "") {
                return blanks;
            }
            blanks++;
            reader.next();
        }
    }
    function matchItem(reader) {
        if (reader.eof())
            return null;
        let item = {};
        for (let def of defs) {
            let match = def.match.exec(reader.cursor);
            if (match) {
                if (match[0][0] === "\\") {
                    reader.cursor = reader.cursor.slice(1);
                    return null;
                }
                item.match = match;
                item.def = def;
                item.id = match[match.length - 2];
                return item;
            }
        }
        return null;
    }
    return {
        setters: [
            function (DelimitedBlocks_3) {
                DelimitedBlocks = DelimitedBlocks_3;
            },
            function (Io_1) {
                Io = Io_1;
            },
            function (LineBlocks_1) {
                LineBlocks = LineBlocks_1;
            },
            function (Options_6) {
                Options = Options_6;
            },
            function (Utils_7) {
                Utils = Utils_7;
                utils_ts_3 = Utils_7;
            }
        ],
        execute: function () {
            defs = [
                {
                    match: /^\\?\s*(-|\+|\*{1,4})\s+(.*)$/,
                    listOpenTag: "<ul>",
                    listCloseTag: "</ul>",
                    itemOpenTag: "<li>",
                    itemCloseTag: "</li>",
                },
                {
                    match: /^\\?\s*(?:\d*)(\.{1,4})\s+(.*)$/,
                    listOpenTag: "<ol>",
                    listCloseTag: "</ol>",
                    itemOpenTag: "<li>",
                    itemCloseTag: "</li>",
                },
                {
                    match: /^\\?\s*(.*[^:])(:{2,4})(|\s+.*)$/,
                    listOpenTag: "<dl>",
                    listCloseTag: "</dl>",
                    itemOpenTag: "<dd>",
                    itemCloseTag: "</dd>",
                    termOpenTag: "<dt>",
                    termCloseTag: "</dt>",
                },
            ];
        }
    };
});
System.register("https://deno.land/x/rimu/src/deno/api", ["https://deno.land/x/rimu/src/deno/delimitedblocks", "https://deno.land/x/rimu/src/deno/io", "https://deno.land/x/rimu/src/deno/lineblocks", "https://deno.land/x/rimu/src/deno/lists", "https://deno.land/x/rimu/src/deno/macros", "https://deno.land/x/rimu/src/deno/options", "https://deno.land/x/rimu/src/deno/quotes", "https://deno.land/x/rimu/src/deno/replacements", "https://deno.land/x/rimu/src/deno/utils"], function (exports_14, context_14) {
    "use strict";
    var DelimitedBlocks, Io, LineBlocks, Lists, Macros, Options, Quotes, Replacements, utils_ts_4;
    var __moduleName = context_14 && context_14.id;
    function render(source) {
        let reader = new Io.Reader(source);
        let writer = new Io.Writer();
        while (!reader.eof()) {
            reader.skipBlankLines();
            if (reader.eof())
                break;
            if (LineBlocks.render(reader, writer))
                continue;
            if (Lists.render(reader, writer))
                continue;
            if (DelimitedBlocks.render(reader, writer))
                continue;
            Options.panic("no matching delimited block found");
        }
        return writer.toString();
    }
    exports_14("render", render);
    function init() {
        utils_ts_4.BlockAttributes.init();
        Options.init();
        DelimitedBlocks.init();
        Macros.init();
        Quotes.init();
        Replacements.init();
    }
    exports_14("init", init);
    return {
        setters: [
            function (DelimitedBlocks_4) {
                DelimitedBlocks = DelimitedBlocks_4;
            },
            function (Io_2) {
                Io = Io_2;
            },
            function (LineBlocks_2) {
                LineBlocks = LineBlocks_2;
            },
            function (Lists_1) {
                Lists = Lists_1;
            },
            function (Macros_4) {
                Macros = Macros_4;
            },
            function (Options_7) {
                Options = Options_7;
            },
            function (Quotes_3) {
                Quotes = Quotes_3;
            },
            function (Replacements_3) {
                Replacements = Replacements_3;
            },
            function (utils_ts_4_1) {
                utils_ts_4 = utils_ts_4_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("https://deno.land/x/rimu/src/deno/rimu", ["https://deno.land/x/rimu/src/deno/api", "https://deno.land/x/rimu/src/deno/options"], function (exports_15, context_15) {
    "use strict";
    var Api, Options;
    var __moduleName = context_15 && context_15.id;
    function render(source, opts = {}) {
        Options.updateOptions(opts);
        return Api.render(source);
    }
    exports_15("render", render);
    return {
        setters: [
            function (Api_3) {
                Api = Api_3;
            },
            function (Options_8) {
                Options = Options_8;
            }
        ],
        execute: function () {
            Api.init();
        }
    };
});
System.register("https://deno.land/x/rimu/mod", ["https://deno.land/x/rimu/src/deno/rimu"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_16(exports);
    }
    return {
        setters: [
            function (rimu_ts_1_1) {
                exportStar_1(rimu_ts_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("file:///C:/Users/gd/GitHub/grzegorzdryja.github.io/github/demo", [], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    function checkDemoFiles(name) {
        const url = `./data/${name}/index.html`;
        const xhr = new XMLHttpRequest();
        xhr.open('HEAD', url, false);
        xhr.send();
        if (xhr.status == 404) {
            return ``;
        }
        else {
            return `<a onclick=window.open("./data/${name}/index.html")>[ demo ]</a>`;
        }
    }
    exports_17("default", checkDemoFiles);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("file:///C:/Users/gd/GitHub/grzegorzdryja.github.io/src/mod", ["file:///C:/Users/gd/GitHub/grzegorzdryja.github.io/github/mod", "file:///C:/Users/gd/GitHub/grzegorzdryja.github.io/github/service", "https://deno.land/x/rimu/mod", "file:///C:/Users/gd/GitHub/grzegorzdryja.github.io/github/demo"], function (exports_18, context_18) {
    "use strict";
    var mod_ts_1, service_ts_2, rimu, demo_ts_1;
    var __moduleName = context_18 && context_18.id;
    return {
        setters: [
            function (mod_ts_1_1) {
                mod_ts_1 = mod_ts_1_1;
            },
            function (service_ts_2_1) {
                service_ts_2 = service_ts_2_1;
            },
            function (rimu_1) {
                rimu = rimu_1;
            },
            function (demo_ts_1_1) {
                demo_ts_1 = demo_ts_1_1;
            }
        ],
        execute: function () {
            service_ts_2.getAboutMe().then((bio) => {
                const markdown = document.createElement("about-me");
                const main = document.getElementsByTagName("main");
                const fullBio = rimu.render(bio);
                let status = "show";
                markdown.innerHTML = fullBio.slice(0, 264) + "...";
                main[0].appendChild(markdown);
                const button = document.createElement("a");
                button.innerHTML = status === "show" ? "[ show full bio ]" : "[ hide full bio ]";
                button.setAttribute("id", status);
                markdown.appendChild(button);
                document.getElementById(status).addEventListener("click", () => {
                    if (status == "show") {
                        markdown.removeChild(button);
                        markdown.innerHTML += fullBio.slice(264);
                        status = "hide";
                        button.innerHTML = status === "show" ? "[ show full bio ]" : "[ hide full bio ]";
                        button.setAttribute("id", status);
                        markdown.appendChild(button);
                    }
                    else {
                        markdown.innerHTML = fullBio.slice(0, 263) + "...";
                        status = "show";
                        button.innerHTML = status === "show" ? "[ show full bio ]" : "[ hide full bio ]";
                        button.setAttribute("id", status);
                        markdown.appendChild(button);
                    }
                });
            });
            mod_ts_1.default().then((repos) => {
                const reposComponent = document.createElement("repos");
                const main = document.getElementsByTagName("main");
                const p = document.createElement("p");
                p.innerHTML = "Check out a few of my repos served by the github api:";
                const reposList = document.createElement("ul");
                repos.forEach((repo) => {
                    const li = document.createElement("li");
                    const demo = demo_ts_1.default(repo.name);
                    const language = repo.language || "in develop";
                    li.innerHTML = `<a href="${repo.html_url}">${repo.name}</a><br />Programming language: <span>${language}</span><br />Description: <i>${repo.description}</i> ${demo}`;
                    reposList.appendChild(li);
                });
                reposComponent.appendChild(reposList);
                reposComponent.insertBefore(p, reposList);
                main[0].appendChild(reposComponent);
            });
        }
    };
});

__instantiate("file:///C:/Users/gd/GitHub/grzegorzdryja.github.io/src/mod", false);
