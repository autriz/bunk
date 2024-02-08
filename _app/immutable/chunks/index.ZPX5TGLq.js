var W=Object.defineProperty;var Q=(t,e,n)=>e in t?W(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var T=(t,e,n)=>(Q(t,typeof e!="symbol"?e+"":e,n),n);import{n as w,h as X,r as v,i as R,j as P,k as Y,l as L,m as Z,p as tt,q as et,v as nt,w as z,x as it,y as st,z as rt}from"./scheduler.fbrv7rja.js";const M=typeof window<"u";let lt=M?()=>window.performance.now():()=>Date.now(),B=M?t=>requestAnimationFrame(t):w;const g=new Set;function k(t){g.forEach(e=>{e.c(t)||(g.delete(e),e.f())}),g.size!==0&&B(k)}function ot(t){let e;return g.size===0&&B(k),{promise:new Promise(n=>{g.add(e={c:t,f:n})}),abort(){g.delete(e)}}}let S=!1;function at(){S=!0}function ct(){S=!1}function ut(t,e,n,i){for(;t<e;){const o=t+(e-t>>1);n(o)<=i?t=o+1:e=o}return t}function ft(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const s=[];for(let a=0;a<e.length;a++){const _=e[a];_.claim_order!==void 0&&s.push(_)}e=s}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let o=0;for(let s=0;s<e.length;s++){const a=e[s].claim_order,_=(o>0&&e[n[o]].claim_order<=a?o+1:ut(1,o,h=>e[n[h]].claim_order,a))-1;i[s]=n[_]+1;const u=_+1;n[u]=s,o=Math.max(u,o)}const c=[],l=[];let r=e.length-1;for(let s=n[o]+1;s!=0;s=i[s-1]){for(c.push(e[s-1]);r>=s;r--)l.push(e[r]);r--}for(;r>=0;r--)l.push(e[r]);c.reverse(),l.sort((s,a)=>s.claim_order-a.claim_order);for(let s=0,a=0;s<l.length;s++){for(;a<c.length&&l[s].claim_order>=c[a].claim_order;)a++;const _=a<c.length?c[a]:null;t.insertBefore(l[s],_)}}function _t(t,e){t.appendChild(e)}function q(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function dt(t){const e=G("style");return e.textContent="/* empty */",ht(q(t),e),e.sheet}function ht(t,e){return _t(t.head||t,e),e.sheet}function mt(t,e){if(S){for(ft(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Lt(t,e,n){S&&!n?mt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function F(t){t.parentNode&&t.parentNode.removeChild(t)}function zt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function G(t){return document.createElement(t)}function pt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function H(t){return document.createTextNode(t)}function It(){return H(" ")}function Mt(){return H("")}function kt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function J(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}const $t=["width","height"];function qt(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set&&$t.indexOf(i)===-1?t[i]=e[i]:J(t,i,e[i])}function Ft(t,e){for(const n in e)J(t,n,e[n])}function Gt(t){return t.dataset.svelteH}function Jt(t){return t===""?null:+t}function yt(t){return Array.from(t.childNodes)}function gt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function K(t,e,n,i,o=!1){gt(t);const c=(()=>{for(let l=t.claim_info.last_index;l<t.length;l++){const r=t[l];if(e(r)){const s=n(r);return s===void 0?t.splice(l,1):t[l]=s,o||(t.claim_info.last_index=l),r}}for(let l=t.claim_info.last_index-1;l>=0;l--){const r=t[l];if(e(r)){const s=n(r);return s===void 0?t.splice(l,1):t[l]=s,o?s===void 0&&t.claim_info.last_index--:t.claim_info.last_index=l,r}}return i()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function U(t,e,n,i){return K(t,o=>o.nodeName===e,o=>{const c=[];for(let l=0;l<o.attributes.length;l++){const r=o.attributes[l];n[r.name]||c.push(r.name)}c.forEach(l=>o.removeAttribute(l))},()=>i(e))}function Kt(t,e,n){return U(t,e,n,G)}function Ut(t,e,n){return U(t,e,n,pt)}function xt(t,e){return K(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>H(e),!0)}function Vt(t){return xt(t," ")}function wt(t,e){e=""+e,t.data!==e&&(t.data=e)}function vt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Wt(t,e,n){~X.indexOf(n)?vt(t,e):wt(t,e)}function Qt(t,e){t.value=e??""}function Xt(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Yt(t,e,n){t.classList.toggle(e,!!n)}function bt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:i})}function Zt(t,e){const n=[];let i=0;for(const o of e.childNodes)if(o.nodeType===8){const c=o.textContent.trim();c===`HEAD_${t}_END`?(i-=1,n.push(o)):c===`HEAD_${t}_START`&&(i+=1,n.push(o))}else i>0&&n.push(o);return n}function te(t,e){return new t(e)}const E=new Map;let A=0;function Nt(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Et(t,e){const n={stylesheet:dt(e),rules:{}};return E.set(t,n),n}function I(t,e,n,i,o,c,l,r=0){const s=16.666/i;let a=`{
`;for(let d=0;d<=1;d+=s){const y=e+(n-e)*c(d);a+=d*100+`%{${l(y,1-y)}}
`}const _=a+`100% {${l(n,1-n)}}
}`,u=`__svelte_${Nt(_)}_${r}`,h=q(t),{stylesheet:$,rules:f}=E.get(h)||Et(h,t);f[u]||(f[u]=!0,$.insertRule(`@keyframes ${u} ${_}`,$.cssRules.length));const m=t.style.animation||"";return t.style.animation=`${m?`${m}, `:""}${u} ${i}ms linear ${o}ms 1 both`,A+=1,u}function At(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?c=>c.indexOf(e)<0:c=>c.indexOf("__svelte")===-1),o=n.length-i.length;o&&(t.style.animation=i.join(", "),A-=o,A||St())}function St(){B(()=>{A||(E.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&F(e)}),E.clear())})}let x;function Ct(){return x||(x=Promise.resolve(),x.then(()=>{x=null})),x}function j(t,e,n){t.dispatchEvent(bt(`${e?"intro":"outro"}${n}`))}const N=new Set;let p;function ee(){p={r:0,c:[],p}}function ne(){p.r||v(p.c),p=p.p}function Dt(t,e){t&&t.i&&(N.delete(t),t.i(e))}function ie(t,e,n,i){if(t&&t.o){if(N.has(t))return;N.add(t),p.c.push(()=>{N.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const Ot={duration:0};function se(t,e,n,i){let c=e(t,n,{direction:"both"}),l=i?0:1,r=null,s=null,a=null,_;function u(){a&&At(t,a)}function h(f,m){const d=f.b-l;return m*=Math.abs(d),{a:l,b:f.b,d,duration:m,start:f.start,end:f.start+m,group:f.group}}function $(f){const{delay:m=0,duration:d=300,easing:y=Y,tick:C=w,css:D}=c||Ot,O={start:lt()+m,b:f};f||(O.group=p,p.r+=1),"inert"in t&&(f?_!==void 0&&(t.inert=_):(_=t.inert,t.inert=!0)),r||s?s=O:(D&&(u(),a=I(t,l,f,d,m,y,D)),f&&C(0,1),r=h(O,d),P(()=>j(t,f,"start")),ot(b=>{if(s&&b>s.start&&(r=h(s,d),s=null,j(t,r.b,"start"),D&&(u(),a=I(t,l,r.b,r.duration,0,y,c.css))),r){if(b>=r.end)C(l=r.b,1-l),j(t,r.b,"end"),s||(r.b?u():--r.group.r||v(r.group.c)),r=null;else if(b>=r.start){const V=b-r.start;l=r.a+r.d*y(V/r.duration),C(l,1-l)}}return!!(r||s)}))}return{run(f){R(c)?Ct().then(()=>{c=c({direction:f?"in":"out"}),$(f)}):$(f)},end(){u(),r=s=null}}}function re(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function le(t){t&&t.c()}function oe(t,e){t&&t.l(e)}function Tt(t,e,n){const{fragment:i,after_update:o}=t.$$;i&&i.m(e,n),P(()=>{const c=t.$$.on_mount.map(it).filter(R);t.$$.on_destroy?t.$$.on_destroy.push(...c):v(c),t.$$.on_mount=[]}),o.forEach(P)}function jt(t,e){const n=t.$$;n.fragment!==null&&(et(n.after_update),v(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Pt(t,e){t.$$.dirty[0]===-1&&(st.push(t),rt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function ae(t,e,n,i,o,c,l=null,r=[-1]){const s=nt;z(t);const a=t.$$={fragment:null,ctx:[],props:c,update:w,not_equal:o,bound:L(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(s?s.$$.context:[])),callbacks:L(),dirty:r,skip_bound:!1,root:e.target||s.$$.root};l&&l(a.root);let _=!1;if(a.ctx=n?n(t,e.props||{},(u,h,...$)=>{const f=$.length?$[0]:h;return a.ctx&&o(a.ctx[u],a.ctx[u]=f)&&(!a.skip_bound&&a.bound[u]&&a.bound[u](f),_&&Pt(t,u)),h}):[],a.update(),_=!0,v(a.before_update),a.fragment=i?i(a.ctx):!1,e.target){if(e.hydrate){at();const u=yt(e.target);a.fragment&&a.fragment.l(u),u.forEach(F)}else a.fragment&&a.fragment.c();e.intro&&Dt(t.$$.fragment),Tt(t,e.target,e.anchor),ct(),Z()}z(s)}class ce{constructor(){T(this,"$$");T(this,"$$set")}$destroy(){jt(this,1),this.$destroy=w}$on(e,n){if(!R(n))return w;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const o=i.indexOf(n);o!==-1&&i.splice(o,1)}}$set(e){this.$$set&&!tt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const Rt="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Rt);export{pt as A,Ut as B,Ft as C,zt as D,qt as E,Qt as F,re as G,Wt as H,Zt as I,Gt as J,Jt as K,se as L,ce as S,ie as a,H as b,Kt as c,yt as d,G as e,xt as f,F as g,Vt as h,ae as i,Lt as j,mt as k,wt as l,Mt as m,ne as n,J as o,Xt as p,ee as q,te as r,It as s,Dt as t,le as u,oe as v,Tt as w,jt as x,Yt as y,kt as z};