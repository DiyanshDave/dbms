(function(){
var d=document,root=d.documentElement.getAttribute("data-root")||"./";
d.querySelector(".burger").addEventListener("click",function(){d.body.classList.toggle("menu-open")});
d.querySelector(".sidebar").addEventListener("click",function(e){if(e.target.closest("a"))d.body.classList.remove("menu-open")});
d.querySelector(".themebtn").addEventListener("click",function(){var h=d.documentElement,n=h.getAttribute("data-theme")==="light"?"dark":"light";h.setAttribute("data-theme",n);try{localStorage.setItem("theme",n)}catch(e){}});
d.querySelectorAll(".copy").forEach(function(b){b.addEventListener("click",function(){var c=b.parentNode.querySelector("code").innerText;(navigator.clipboard?navigator.clipboard.writeText(c):Promise.reject()).then(function(){b.textContent="Copied"},function(){b.textContent="Press Ctrl+C"});setTimeout(function(){b.textContent="Copy"},1500)})});
/* toc highlight */
var links=[].slice.call(d.querySelectorAll(".toc a[href^='#']"));
if(links.length&&"IntersectionObserver"in window){var map={};links.forEach(function(a){map[a.getAttribute("href").slice(1)]=a});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.remove("on")});var a=map[e.target.id];if(a){a.classList.add("on");a.scrollIntoView({block:"nearest"})}}})},{rootMargin:"0px 0px -75% 0px"});
Object.keys(map).forEach(function(id){var el=d.getElementById(id);if(el)io.observe(el)})}
/* search */
var box=d.getElementById("search"),inp=box.querySelector("input"),res=d.getElementById("results"),loaded=false,sel=-1,items=[];
function load(cb){if(window.SEARCH){cb();return}var s=d.createElement("script");s.src=root+"assets/search-index.js";s.onload=cb;d.head.appendChild(s)}
function esc(s){return s.replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function open(){box.hidden=false;inp.value="";res.innerHTML="";load(function(){loaded=true});setTimeout(function(){inp.focus()},0)}
function close(){box.hidden=true}
function run(){var q=inp.value.toLowerCase().trim();if(!q||!window.SEARCH){res.innerHTML="";return}var ts=q.split(/\s+/);var out=[];
window.SEARCH.forEach(function(e){var t=e.t.toLowerCase(),x=(e.x||"").toLowerCase(),sc=0;for(var i=0;i<ts.length;i++){var a=t.indexOf(ts[i])>-1,b=x.indexOf(ts[i])>-1;if(!a&&!b){sc=-1;break}sc+=a?3:1}if(sc>0)out.push([sc,e])});
out.sort(function(a,b){return b[0]-a[0]});items=out.slice(0,12).map(function(o){return o[1]});
res.innerHTML=items.length?items.map(function(e,i){return'<li><a href="'+root+e.u+'" data-i="'+i+'"><small>'+esc(e.p)+'</small>'+esc(e.t)+'<em>'+esc((e.x||"").slice(0,110))+'</em></a></li>'}).join(""):'<li><a style="pointer-events:none">No results</a></li>';sel=-1}
function mark(n){var as=res.querySelectorAll("a");as.forEach(function(a){a.classList.remove("sel")});if(as[n]){as[n].classList.add("sel");as[n].scrollIntoView({block:"nearest"})}}
inp.addEventListener("input",run);
inp.addEventListener("keydown",function(e){var n=res.querySelectorAll("a").length;if(e.key==="ArrowDown"){e.preventDefault();sel=(sel+1)%n;mark(sel)}else if(e.key==="ArrowUp"){e.preventDefault();sel=(sel-1+n)%n;mark(sel)}else if(e.key==="Enter"){var a=res.querySelectorAll("a")[Math.max(sel,0)];if(a&&a.href)location.href=a.href}});
box.addEventListener("click",function(e){if(e.target===box)close()});
d.querySelector(".searchbtn").addEventListener("click",open);
d.addEventListener("keydown",function(e){if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();box.hidden?open():close()}else if(e.key==="Escape"&&!box.hidden)close()});
})();
