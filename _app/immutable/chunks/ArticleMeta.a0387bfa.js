import{S as v,i as y,s as A,k as c,K as M,l as d,h as o,p as l,F as h,n as u,e as k,b as p,r as E,m as f,u as b,L as m,v as T}from"./index.013d6d90.js";function w(i){let e,s,a,t;return document.title=e=i[2],{c(){s=c("meta"),a=c("meta"),t=c("meta"),this.h()},l(n){const r=M("svelte-17be3w9",document.head);s=d(r,"META",{property:!0,content:!0}),a=d(r,"META",{property:!0,content:!0}),t=d(r,"META",{property:!0,content:!0}),r.forEach(o),this.h()},h(){l(s,"property","og:site_name"),l(s,"content",g),l(a,"property","og:title"),l(a,"content",i[0]),l(t,"property","og:description"),l(t,"content",i[1])},m(n,r){h(document.head,s),h(document.head,a),h(document.head,t)},p(n,[r]){r&4&&e!==(e=n[2])&&(document.title=e),r&1&&l(a,"content",n[0]),r&2&&l(t,"content",n[1])},i:u,o:u,d(n){o(s),o(a),o(t)}}}const g="nordin.work";function P(i,e,s){let{title:a}=e,{description:t}=e;const n=a?`${a} | ${g}`:g;return i.$$set=r=>{"title"in r&&s(0,a=r.title),"description"in r&&s(1,t=r.description)},[a,t,n]}class z extends v{constructor(e){super(),y(this,e,P,w,A,{title:0,description:1})}}function S(i){let e,s,a;return{c(){e=c("h2"),s=c("a"),a=E(i[1]),this.h()},l(t){e=d(t,"H2",{class:!0,id:!0});var n=f(e);s=d(n,"A",{href:!0});var r=f(s);a=b(r,i[1]),r.forEach(o),n.forEach(o),this.h()},h(){l(s,"href",i[3]),l(e,"class","heading svelte-9r10v3"),l(e,"id",i[2]),m(e,"large",!i[0])},m(t,n){p(t,e,n),h(e,s),h(s,a)},p(t,n){n&2&&T(a,t[1]),n&1&&m(e,"large",!t[0])},d(t){t&&o(e)}}}function D(i){let e,s,a;return{c(){e=c("h3"),s=c("a"),a=E(i[1]),this.h()},l(t){e=d(t,"H3",{class:!0,id:!0});var n=f(e);s=d(n,"A",{href:!0});var r=f(s);a=b(r,i[1]),r.forEach(o),n.forEach(o),this.h()},h(){l(s,"href",i[3]),l(e,"class","heading svelte-9r10v3"),l(e,"id",i[2]),m(e,"large",!i[0])},m(t,n){p(t,e,n),h(e,s),h(s,a)},p(t,n){n&2&&T(a,t[1]),n&1&&m(e,"large",!t[0])},d(t){t&&o(e)}}}function H(i){let e;function s(n,r){return n[0]?D:S}let a=s(i),t=a(i);return{c(){t.c(),e=k()},l(n){t.l(n),e=k()},m(n,r){t.m(n,r),p(n,e,r)},p(n,[r]){a===(a=s(n))&&t?t.p(n,r):(t.d(1),t=a(n),t&&(t.c(),t.m(e.parentNode,e)))},i:u,o:u,d(n){t.d(n),n&&o(e)}}}function C(i,e,s){let{slug:a=""}=e,{title:t}=e;const n=t.toLowerCase().replace(/[^a-zA-Z ]/g,"").replace(/\s/g,"-"),r=a?`/posts/${a}`:"#"+n;return i.$$set=_=>{"slug"in _&&s(0,a=_.slug),"title"in _&&s(1,t=_.title)},[a,t,n,r]}class F extends v{constructor(e){super(),y(this,e,C,H,A,{slug:0,title:1})}}function L(i){let e,s,a;return{c(){e=c("p"),s=c("span"),a=E(i[0]),this.h()},l(t){e=d(t,"P",{class:!0});var n=f(e);s=d(n,"SPAN",{class:!0});var r=f(s);a=b(r,i[0]),r.forEach(o),n.forEach(o),this.h()},h(){l(s,"class","date svelte-idic31"),l(e,"class","svelte-idic31")},m(t,n){p(t,e,n),h(e,s),h(s,a)},p:u,i:u,o:u,d(t){t&&o(e)}}}function N(i,e,s){let{date:a}=e;const t=new Date(a).toDateString();return i.$$set=n=>{"date"in n&&s(1,a=n.date)},[t,a]}class K extends v{constructor(e){super(),y(this,e,N,L,A,{date:1})}}export{F as A,z as P,K as a};