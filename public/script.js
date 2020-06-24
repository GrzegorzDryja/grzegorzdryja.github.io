// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

"use strict";

// @ts-nocheck
/* eslint-disable */
let System, __instantiateAsync, __instantiate;

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

  __instantiateAsync = async (m) => {
    System = __instantiateAsync = __instantiate = undefined;
    rF(m);
    return gExpA(m);
  };

  __instantiate = (m) => {
    System = __instantiateAsync = __instantiate = undefined;
    rF(m);
    return gExp(m);
  };
})();

System.register("github/model", [], function (exports_1, context_1) {
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
System.register("github/service", ["github/model"], function (exports_2, context_2) {
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
            RAW_URL = 'https://raw.githubusercontent.com/GrzegorzDryja/grzegorzdryja.github.io/deno-markdown/data/';
            FORBIDDEN_ROPOS = ['Strefanoid', 'Kalkulator', 'Console-Calculator', 'BallparkOrders'];
            convert = ({ name, html_url, language, description }) => new model_ts_1.GitHubRepo({
                name,
                html_url,
                language,
                description
            });
        }
    };
});
System.register("github/mod", ["github/service"], function (exports_3, context_3) {
    "use strict";
    var service_ts_1;
    var __moduleName = context_3 && context_3.id;
    async function default_1() {
        const arr = await service_ts_1.default();
        arr.forEach((repo) => {
            console.log(repo.name + "/" +
                repo.html_url + "/" +
                repo.language + "/" +
                repo.description);
        });
        //(await getRepos()).forEach((r: any) => console.log(r["name"]))
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
System.register("src/mod", ["github/mod", "github/service"], function (exports_4, context_4) {
    "use strict";
    var mod_ts_1, service_ts_2;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (mod_ts_1_1) {
                mod_ts_1 = mod_ts_1_1;
            },
            function (service_ts_2_1) {
                service_ts_2 = service_ts_2_1;
            }
        ],
        execute: function () {
            mod_ts_1.default();
            service_ts_2.getAboutMe().then((bio) => {
                const md = document.createElement('about-me');
                const main = document.getElementsByTagName("main");
                md.textContent = bio;
                main[0].appendChild(md);
            });
        }
    };
});

__instantiate("src/mod");
