(this["webpackJsonpbus-display"]=this["webpackJsonpbus-display"]||[]).push([[0],{115:function(e,t,n){},117:function(e,t,n){},138:function(e,t,n){"use strict";n.r(t);var i,o,a=n(0),c=n.n(a),r=n(68),l=n.n(r),s=(n(115),n(2)),u=n(30),d=n(73),b=n(4),p=n(3),f=n(9),h=(n(117),n(10)),j=n.n(h),m=n(69),v=n(1);j.a.workerClass=m.a,j.a.accessToken="pk.eyJ1IjoidG9tZWxsaW90dG56IiwiYSI6ImNrbmswb2hteDA1amwyb3A5YzlxZmZtMWoifQ.z4AcPvAC_QamiORckX-CTQ";var x,g,O,y,w,_,k=function(e){var t=e.vehicles,n=e.refresh,i=e.palette,o=Object(a.useRef)(),c=Object(a.useState)(174.812378),r=Object(b.a)(c,1)[0],l=Object(a.useState)(-36.845794),s=Object(b.a)(l,1)[0],u=Object(a.useState)(12),d=Object(b.a)(u,1)[0],p=Object(a.useState)(),h=Object(b.a)(p,2),m=h[0],x=h[1],g=Object(a.useState)(),O=Object(b.a)(g,2),y=O[0],w=O[1],_=Object(a.useState)(),k=Object(b.a)(_,2),A=k[0],E=k[1],C=Object(a.useState)([]),I=Object(b.a)(C,2),T=I[0],M=I[1];return Object(a.useEffect)((function(){console.log("-- set map --"),w(new j.a.Map({container:o.current,style:{version:8,sources:{"raster-tiles":{type:"raster",tiles:["https://abcd.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png"],tileSize:256}},layers:[{id:"simple-tiles",type:"raster",source:"raster-tiles",minzoom:0,maxzoom:22}]},center:[r,s],zoom:d}))}),[s,r,d]),Object(a.useEffect)((function(){void 0!==y&&(console.log("-- set container --"),y.on("load",(function(){y.scrollZoom.disable(),x(y.getCanvasContainer())})))}),[y]),Object(a.useEffect)((function(){if(void 0!==m)return console.log("-- set svg --"),E(f.c(m).append("svg").attr("height","100%").attr("width","100%").style("position","absolute").style("z-index","2")),function(){return E()}}),[m]),Object(a.useEffect)((function(){void 0!==A&&0!==t.length&&M(t.map((function(e){return{id:e.key,pos:y.project(new j.a.LngLat(e.position.longitude,e.position.latitude)),occ_stat:e.occupancy_status,status:void 0===e.occupancy_status?0:e.occupancy_status+1}})))}),[A,t,y]),Object(a.useEffect)((function(){if(0!==T.length){console.log("-- set data points --");var e=A.selectAll("circle").data(T,(function(e){return e.id}));return e.exit().transition().duration(500).attr("r",0).remove(),e.enter().append("circle").style("fill",(function(e){return i[e.status]})).attr("r",0).attr("cx",(function(e){return e.pos.x})).attr("cy",(function(e){return e.pos.y})).transition().duration(500).attr("r",5),e.transition().ease(f.a).duration(n).attr("cx",(function(e){return e.pos.x})).attr("cy",(function(e){return e.pos.y})).style("fill",(function(e){return i[e.status]})),function(){return A.selectAll("circle").data([])}}}),[T,A,y,i,n]),Object(v.jsx)(S,{children:Object(v.jsx)(z,{ref:o})})},S=p.a.div(i||(i=Object(s.a)([""]))),z=p.a.div(o||(o=Object(s.a)(["\n    position: fixed;\n    top: 0;\n    left: 0;\n    height: 100vh;\n    width: 100vw;\n    background: #262626;\n"])));var A,E,C,I=function(e){var t=e.data,n=e.xlab,i=Object(a.useState)(0),o=Object(b.a)(i,2),c=o[0],r=o[1];return Object(a.useEffect)((function(){0!==t.length&&r(Math.max.apply(Math,t.map((function(e){return e.count}))))}),[t]),Object(v.jsxs)(T,{children:[Object(v.jsx)(M,{children:n}),t.length&&t.map((function(e){return Object(v.jsxs)(D,{children:[Object(v.jsx)(F,{height:e.count/c*100,colour:e.colour}),Object(v.jsx)(P,{children:e.count}),Object(v.jsx)(L,{children:e.label})]})}))]})},T=p.a.div(x||(x=Object(s.a)(["\n    margin-bottom: 2em;\n    margin-top: 1em;\n    /* left: 2em;\n    bottom: 2em; */\n    /* height: 30vh; */\n    display: flex;\n    flex-direction: column;\n    /* background: rgba(0,0,0,0.3); */\n    /* padding: 0.5em; */\n    border-top: solid 4px white;\n    /* padding-top: 0.5em; */\n    border-bottom: solid 1px white;\n"]))),M=p.a.div(g||(g=Object(s.a)(["\n    color: white;\n    /* width: 180px; */\n    /* text-align: right; */\n    font-weight: bold;\n    /* background: pink; */\n    padding: 0.5em;\n    border-bottom: solid 1px white;\n"]))),D=p.a.div(O||(O=Object(s.a)(["\n    width: 100%;\n    flex: 1;\n    display: flex;\n    flex-direction: row-reverse;\n    color: white;\n    text-align: center;\n    font-weight: bold;\n    font-size: 0.7em;\n    overflow: hidden;\n    height: 2em;\n"]))),F=p.a.div(y||(y=Object(s.a)(["\n    flex: 1;\n    margin: 2px 0;\n    position: relative;\n\n    &:before {\n        content: '';\n        display: block;\n        position: absolute;\n        height: 100%;\n        left: 0;\n        width: ","%;\n        background: ",";\n        transition: width 5s ease-in-out;\n    }\n"])),(function(e){return e.height}),(function(e){return e.colour})),P=p.a.div(w||(w=Object(s.a)(["\n    padding: 0.5em;\n    width: 3em;\n    align-items: center;\n    display: flex;\n    justify-content: center;\n"]))),L=p.a.div(_||(_=Object(s.a)(["\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n    border-right: solid 1px white;\n    padding-right: 10px;\n    width: 180px;\n    overflow: hidden;\n"])));var R,W,Z,J=function(e){var t=e.total,n=e.refresh;return Object(v.jsxs)(N,{children:[Object(v.jsxs)("p",{children:[Object(v.jsx)("strong",{children:"Real-time vehicle locations"})," of buses and trains are obtained from Auckland Transport's public API. The data on the map is updated once every ",Object(v.jsxs)("strong",{children:[n," seconds"]}),". Animations are interpolated between consecutive locations (so don't worry if you see a bus swimming in the Waitemat\u0101)."]}),Object(v.jsxs)("p",{children:["Map points are coloured by the bus's ",Object(v.jsx)("strong",{children:"occupancy status"}),", which indicates the number of passengers on board."]}),Object(v.jsx)(Q,{children:Object(v.jsxs)(B,{children:[Object(v.jsx)("label",{children:"Total Vehicles:"}),Object(v.jsx)("p",{children:t})]})})]})},N=p.a.div(A||(A=Object(s.a)(["\n    /* position: fixed;\n    top: 1.0em;\n    left: 1.0em;\n    width: 25vw;\n    z-index: 1000; */\n\n    width: 100%;\n    font-size: 1.2rem;\n    line-height: 1.5;\n    /* background: rgba(0,0,0,0.4); */\n    /* padding: 1em 2em 0; */\n    color: #fff;\n    /* border: 4px solid #fff; */\n\n    p {\n        margin: 0 0 1em 0;\n    }\n\n"]))),Q=p.a.div(E||(E=Object(s.a)(["\n    font-size: 1.5em;\n"]))),B=p.a.div(C||(C=Object(s.a)(["\n    display: flex;\n    label {\n        /* display: inline-block; */\n        width: 50%;\n        text-align: right;\n        padding-right: 1em;\n    }\n"])));var G=function(){var e=Object(a.useState)([]),t=Object(b.a)(e,2),n=t[0],i=t[1],o=Object(a.useState)([]),c=Object(b.a)(o,2),r=c[0],l=c[1],s=Object(a.useState)([]),p=Object(b.a)(s,2),h=p[0],j=p[1],m=Object(a.useState)([]),x=Object(b.a)(m,2),g=x[0],O=x[1],y=[].concat(Object(d.a)(f.b[7]),["#cecece"]).reverse();return Object(a.useEffect)((function(){var e=!1,t=function(){if(!e){console.log(" --- fetch data --- "),e=!0;return fetch("https://api.at.govt.nz/v2/public/realtime/",{headers:{"Ocp-Apim-Subscription-Key":"921fa76f32d94d9d9d645f4db9f0f498"}}).then((function(e){if(e.ok)return e.json();console.log(e)})).then((function(e){return i(e.response.entity)})).then((function(){e=!1})),function(){e=!1}}};t();var n=setInterval((function(){return t()}),2e4);return function(){return clearInterval(n)}}),[]),Object(a.useEffect)((function(){l(n.filter((function(e){return!e.is_deleted&&e.vehicle&&e.vehicle.trip&&e.vehicle.timestamp>Date.now()/1e3-300&&e.vehicle.position&&e.vehicle.position.latitude>-38&&e.vehicle.position.latitude<-36&&e.vehicle.position.longitude>174&&e.vehicle.position.longitude<176})).map((function(e){var t,i=n.filter((function(t){var n;return t.trip_update&&(null===(n=t.trip_update.vehicle)||void 0===n?void 0:n.id)===e.vehicle.vehicle.id}));return Object(u.a)(Object(u.a)({},e.vehicle),{},{key:e.vehicle.vehicle.id,trip_update:null===(t=i[0])||void 0===t?void 0:t.trip_update})})))}),[n]),Object(a.useEffect)((function(){console.log(r);for(var e=r.map((function(e){return void 0===e.occupancy_status?0:e.occupancy_status+1})),t=new Array(8).fill(0),n=0;n<e.length;n++)t[e[n]]++;j([{label:"Unknown",count:t[0],colour:y[0]},{label:"Empty",count:t[1],colour:y[1]},{label:"Many seats",count:t[2],colour:y[2]},{label:"Few seats",count:t[3],colour:y[3]},{label:"Standing room only",count:t[4],colour:y[4]},{label:"Full",count:t[6],colour:y[6]},{label:"Not accepting passengers",count:t[7],colour:y[7]}]);var i=r.map((function(e){var t,n;if(void 0!==e.trip_update&&void 0!==e.trip_update.stop_time_update)return e.trip_update.stop_time_update.arrival?null===(t=e.trip_update.stop_time_update)||void 0===t?void 0:t.arrival.delay:null===(n=e.trip_update.stop_time_update)||void 0===n?void 0:n.departure.delay}));t=new Array(8).fill(0);for(var o=0;o<i.length;o++)void 0===i[o]?t[0]++:i[o]<=-300?t[1]++:i[o]<=60?t[2]++:i[o]>=300?t[3]++:i[o]>=600?t[4]++:i[o]>=1200?t[5]++:i[o]>=1800?t[6]++:t[7]++;O([{label:"No data",count:t[0],colour:"#95a5a6"},{label:">5m early",count:t[1],colour:"#3c42a5"},{label:"1-5m early",count:t[2],colour:"#28aebb"},{label:"On time",count:t[3],colour:"#26d926"},{label:"5-10m late",count:t[4],colour:"#f39c12"},{label:"10-20m late",count:t[5],colour:"#d35400"},{label:"20-30m late",count:t[6],colour:"red"},{label:"30+m late",count:t[7],colour:"#990000"}])}),[r]),Object(v.jsxs)(V,{children:[Object(v.jsx)(k,{vehicles:r,refresh:19e3,palette:y}),Object(v.jsxs)(K,{children:[Object(v.jsx)("h1",{children:"Real-time Public Transport Data"}),Object(v.jsx)("h2",{children:"Vehicle Occupancy in Central Auckland"})]}),Object(v.jsxs)(Y,{children:[Object(v.jsx)(J,{total:r.length,refresh:20}),Object(v.jsx)(I,{data:h,xlab:"Occupancy Status"}),Object(v.jsx)(I,{data:g,xlab:"Arrival and Departure Delays"})]})]})},V=p.a.div(R||(R=Object(s.a)([""]))),Y=p.a.div(W||(W=Object(s.a)(["\n  position: fixed;\n  z-index: 5;\n  top: 2em;\n  right: 2em;\n  bottom: 2em;\n  width: 30em;\n  padding: 1em 2em;\n  background: rgba(0,0,0,0.7);\n  display: flex;\n  flex-direction: column;\n  /* justify-content: space-between; */\n  box-shadow: 5px 3px 10px 5px rgba(0,0,0,0.4);\n  border-radius: 5px;\n"]))),K=p.a.div(Z||(Z=Object(s.a)(["\n  position: fixed;\n  z-index: 10;\n  top: 1em;\n  left: 0em;\n  color: black;\n  padding: 1em 3em;\n  width: 50vw;\n  text-align: right;\n  background: rgba(255,255,255,0.8);\n  box-shadow: 5px 3px 10px 10px rgba(0,0,0,0.4);\n  border-radius: 0 3px 3px 0;\n\n  h1 {\n    font-size: 45px;\n  }\n  h2 {\n    font-size: 30px;\n    font-style: italic;\n  }\n"]))),U=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,139)).then((function(t){var n=t.getCLS,i=t.getFID,o=t.getFCP,a=t.getLCP,c=t.getTTFB;n(e),i(e),o(e),a(e),c(e)}))};l.a.render(Object(v.jsx)(c.a.StrictMode,{children:Object(v.jsx)(G,{})}),document.getElementById("root")),U()}},[[138,1,2]]]);
//# sourceMappingURL=main.faf061ee.chunk.js.map