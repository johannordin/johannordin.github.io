import{S as v,i as y,s as A,k as c,L as M,l as h,h as o,n as i,E as d,J as u,e as k,b as p,q as E,m as f,r as b,D as m,u as T}from"./index.d83031ce.js";function D(l){let e,s,n,t;return document.title=e=l[2],{c(){s=c("meta"),n=c("meta"),t=c("meta"),this.h()},l(a){const r=M("svelte-17be3w9",document.head);s=h(r,"META",{property:!0,content:!0}),n=h(r,"META",{property:!0,content:!0}),t=h(r,"META",{property:!0,content:!0}),r.forEach(o),this.h()},h(){i(s,"property","og:site_name"),i(s,"content",g),i(n,"property","og:title"),i(n,"content",l[0]),i(t,"property","og:description"),i(t,"content",l[1])},m(a,r){d(document.head,s),d(document.head,n),d(document.head,t)},p(a,[r]){r&4&&e!==(e=a[2])&&(document.title=e),r&1&&i(n,"content",a[0]),r&2&&i(t,"content",a[1])},i:u,o:u,d(a){o(s),o(n),o(t)}}}const g="SvelteKit + MDsveX Blog";function S(l,e,s){let{title:n}=e,{description:t}=e;const a=n?`${n} | ${g}`:g;return l.$$set=r=>{"title"in r&&s(0,n=r.title),"description"in r&&s(1,t=r.description)},[n,t,a]}class z extends v{constructor(e){super(),y(this,e,S,D,A,{title:0,description:1})}}function P(l){let e,s,n;return{c(){e=c("h2"),s=c("a"),n=E(l[1]),this.h()},l(t){e=h(t,"H2",{class:!0,id:!0});var a=f(e);s=h(a,"A",{href:!0});var r=f(s);n=b(r,l[1]),r.forEach(o),a.forEach(o),this.h()},h(){i(s,"href",l[3]),i(e,"class","heading svelte-9r10v3"),i(e,"id",l[2]),m(e,"large",!l[0])},m(t,a){p(t,e,a),d(e,s),d(s,n)},p(t,a){a&2&&T(n,t[1]),a&1&&m(e,"large",!t[0])},d(t){t&&o(e)}}}function w(l){let e,s,n;return{c(){e=c("h3"),s=c("a"),n=E(l[1]),this.h()},l(t){e=h(t,"H3",{class:!0,id:!0});var a=f(e);s=h(a,"A",{href:!0});var r=f(s);n=b(r,l[1]),r.forEach(o),a.forEach(o),this.h()},h(){i(s,"href",l[3]),i(e,"class","heading svelte-9r10v3"),i(e,"id",l[2]),m(e,"large",!l[0])},m(t,a){p(t,e,a),d(e,s),d(s,n)},p(t,a){a&2&&T(n,t[1]),a&1&&m(e,"large",!t[0])},d(t){t&&o(e)}}}function H(l){let e;function s(a,r){return a[0]?w:P}let n=s(l),t=n(l);return{c(){t.c(),e=k()},l(a){t.l(a),e=k()},m(a,r){t.m(a,r),p(a,e,r)},p(a,[r]){n===(n=s(a))&&t?t.p(a,r):(t.d(1),t=n(a),t&&(t.c(),t.m(e.parentNode,e)))},i:u,o:u,d(a){t.d(a),a&&o(e)}}}function q(l,e,s){let{slug:n=""}=e,{title:t}=e;const a=t.toLowerCase().replace(/[^a-zA-Z ]/g,"").replace(/\s/g,"-"),r=n?`/posts/${n}`:"#"+a;return l.$$set=_=>{"slug"in _&&s(0,n=_.slug),"title"in _&&s(1,t=_.title)},[n,t,a,r]}class B extends v{constructor(e){super(),y(this,e,q,H,A,{slug:0,title:1})}}function C(l){let e,s,n;return{c(){e=c("p"),s=c("span"),n=E(l[0]),this.h()},l(t){e=h(t,"P",{class:!0});var a=f(e);s=h(a,"SPAN",{class:!0});var r=f(s);n=b(r,l[0]),r.forEach(o),a.forEach(o),this.h()},h(){i(s,"class","date svelte-idic31"),i(e,"class","svelte-idic31")},m(t,a){p(t,e,a),d(e,s),d(s,n)},p:u,i:u,o:u,d(t){t&&o(e)}}}function L(l,e,s){let{date:n}=e;const t=new Date(n).toDateString();return l.$$set=a=>{"date"in a&&s(1,n=a.date)},[t,n]}class J extends v{constructor(e){super(),y(this,e,L,C,A,{date:1})}}export{B as A,z as P,J as a};