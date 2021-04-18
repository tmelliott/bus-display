(this["webpackJsonpbus-display"]=this["webpackJsonpbus-display"]||[]).push([[0],{108:function(e,t,n){},110:function(e,t,n){},131:function(e,t,n){"use strict";n.r(t);var i,c,a=n(0),o=n.n(a),r=n(61),l=n.n(r),s=(n(108),n(2)),u=n(22),d=n(66),b=n(4),p=n(3),f=n(16),h=(n(110),n(9)),j=n.n(h),m=n(62),O=n(1);j.a.workerClass=m.a,j.a.accessToken="pk.eyJ1IjoidG9tZWxsaW90dG56IiwiYSI6ImNrbmswb2hteDA1amwyb3A5YzlxZmZtMWoifQ.z4AcPvAC_QamiORckX-CTQ";var v,g,x,y,w,k,_=function(e){var t=e.vehicles,n=e.refresh,i=e.palette,c=Object(a.useRef)(),o=Object(a.useState)(174.812378),r=Object(b.a)(o,1)[0],l=Object(a.useState)(-36.845794),s=Object(b.a)(l,1)[0],u=Object(a.useState)(12),d=Object(b.a)(u,1)[0],p=Object(a.useState)(),h=Object(b.a)(p,2),m=h[0],v=h[1],g=Object(a.useState)(),x=Object(b.a)(g,2),y=x[0],w=x[1],k=Object(a.useState)(),_=Object(b.a)(k,2),A=_[0],E=_[1],C=Object(a.useState)([]),I=Object(b.a)(C,2),T=I[0],M=I[1];return Object(a.useEffect)((function(){console.log("-- set map --"),w(new j.a.Map({container:c.current,style:{version:8,sources:{"raster-tiles":{type:"raster",tiles:["https://abcd.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png"],tileSize:256}},layers:[{id:"simple-tiles",type:"raster",source:"raster-tiles",minzoom:0,maxzoom:22}]},center:[r,s],zoom:d}))}),[s,r,d]),Object(a.useEffect)((function(){void 0!==y&&(console.log("-- set container --"),y.on("load",(function(){y.scrollZoom.disable(),v(y.getCanvasContainer())})))}),[y]),Object(a.useEffect)((function(){if(void 0!==m)return console.log("-- set svg --"),E(f.b(m).append("svg").attr("height","100%").attr("width","100%").style("position","absolute").style("z-index","2")),function(){return E()}}),[m]),Object(a.useEffect)((function(){void 0!==A&&0!==t.length&&M(t.map((function(e){return{id:e.key,pos:y.project(new j.a.LngLat(e.position.longitude,e.position.latitude)),occ_stat:e.occupancy_status,status:void 0===e.occupancy_status?0:e.occupancy_status+1}})))}),[A,t,y]),Object(a.useEffect)((function(){if(0!==T.length){console.log("-- set data points --");var e=A.selectAll("circle").data(T,(function(e){return e.id}));return e.exit().transition().duration(500).attr("r",0).remove(),e.enter().append("circle").style("fill",(function(e){return i[e.status]})).attr("r",0).attr("cx",(function(e){return e.pos.x})).attr("cy",(function(e){return e.pos.y})).transition().duration(500).attr("r",5),e.transition().duration(n).attr("cx",(function(e){return e.pos.x})).attr("cy",(function(e){return e.pos.y})).style("fill",(function(e){return i[e.status]})),function(){return A.selectAll("circle").data([])}}}),[T,A,y,i,n]),Object(O.jsx)(S,{children:Object(O.jsx)(z,{ref:c})})},S=p.a.div(i||(i=Object(s.a)([""]))),z=p.a.div(c||(c=Object(s.a)(["\n    position: fixed;\n    top: 0;\n    left: 0;\n    height: 100vh;\n    width: 100vw;\n    background: #262626;\n"])));var A,E,C,I=function(e){var t=e.data,n=e.xlab,i=Object(a.useState)(0),c=Object(b.a)(i,2),o=c[0],r=c[1];return Object(a.useEffect)((function(){0!==t.length&&r(Math.max.apply(Math,t.map((function(e){return e.count}))))}),[t]),Object(O.jsxs)(T,{children:[Object(O.jsx)(M,{children:n}),t.length&&t.map((function(e){return Object(O.jsxs)(D,{children:[Object(O.jsx)(F,{height:e.count/o*100,colour:e.colour}),Object(O.jsx)(P,{children:e.count}),Object(O.jsx)(L,{children:e.label})]})}))]})},T=p.a.div(v||(v=Object(s.a)(["\n    margin-bottom: 2em;\n    margin-top: 1em;\n    /* left: 2em;\n    bottom: 2em; */\n    /* height: 30vh; */\n    display: flex;\n    flex-direction: column;\n    /* background: rgba(0,0,0,0.3); */\n    /* padding: 0.5em; */\n    border-top: solid 4px white;\n    /* padding-top: 0.5em; */\n    border-bottom: solid 1px white;\n"]))),M=p.a.div(g||(g=Object(s.a)(["\n    color: white;\n    /* width: 180px; */\n    /* text-align: right; */\n    font-weight: bold;\n    /* background: pink; */\n    padding: 0.5em;\n    border-bottom: solid 1px white;\n"]))),D=p.a.div(x||(x=Object(s.a)(["\n    width: 100%;\n    flex: 1;\n    display: flex;\n    flex-direction: row-reverse;\n    color: white;\n    text-align: center;\n    font-weight: bold;\n    font-size: 0.7em;\n    overflow: hidden;\n    height: 2em;\n"]))),F=p.a.div(y||(y=Object(s.a)(["\n    flex: 1;\n    margin: 2px 0;\n    position: relative;\n\n    &:before {\n        content: '';\n        display: block;\n        position: absolute;\n        height: 100%;\n        left: 0;\n        width: ","%;\n        background: ",";\n        transition: width 5s ease-in-out;\n    }\n"])),(function(e){return e.height}),(function(e){return e.colour})),P=p.a.div(w||(w=Object(s.a)(["\n    padding: 0.5em;\n    width: 3em;\n    align-items: center;\n    display: flex;\n    justify-content: center;\n"]))),L=p.a.div(k||(k=Object(s.a)(["\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n    border-right: solid 1px white;\n    padding-right: 10px;\n    width: 180px;\n    overflow: hidden;\n"])));var R,Z,J,N=function(e){var t=e.total,n=e.refresh;return Object(O.jsxs)(Q,{children:[Object(O.jsxs)("p",{children:[Object(O.jsx)("strong",{children:"Real-time vehicle locations"})," of buses and trains are obtained from Auckland Transport's public API. The data on the map is updated once every ",Object(O.jsxs)("strong",{children:[n," seconds"]}),"."]}),Object(O.jsxs)("p",{children:["Map points are coloured by the bus's ",Object(O.jsx)("strong",{children:"occupancy status"}),", which indicates the number of passengers on board."]}),Object(O.jsx)(W,{children:Object(O.jsxs)(B,{children:[Object(O.jsx)("label",{children:"Total Vehicles:"}),Object(O.jsx)("p",{children:t})]})})]})},Q=p.a.div(A||(A=Object(s.a)(["\n    /* position: fixed;\n    top: 1.0em;\n    left: 1.0em;\n    width: 25vw;\n    z-index: 1000; */\n\n    width: 100%;\n    font-size: 1.2rem;\n    line-height: 1.5;\n    /* background: rgba(0,0,0,0.4); */\n    /* padding: 1em 2em 0; */\n    color: #fff;\n    /* border: 4px solid #fff; */\n\n    p {\n        margin: 0 0 1em 0;\n    }\n\n"]))),W=p.a.div(E||(E=Object(s.a)(["\n    font-size: 1.5em;\n"]))),B=p.a.div(C||(C=Object(s.a)(["\n    display: flex;\n    label {\n        /* display: inline-block; */\n        width: 50%;\n        text-align: right;\n        padding-right: 1em;\n    }\n"])));var G=function(){var e=Object(a.useState)([]),t=Object(b.a)(e,2),n=t[0],i=t[1],c=Object(a.useState)([]),o=Object(b.a)(c,2),r=o[0],l=o[1],s=Object(a.useState)([]),p=Object(b.a)(s,2),h=p[0],j=p[1],m=Object(a.useState)([]),v=Object(b.a)(m,2),g=v[0],x=v[1],y=[].concat(Object(d.a)(f.a[7]),["#cecece"]).reverse();return Object(a.useEffect)((function(){var e=!1,t=function(){if(!e){console.log(" --- fetch data --- "),e=!0;return fetch("https://api.at.govt.nz/v2/public/realtime/",{headers:{"Ocp-Apim-Subscription-Key":"921fa76f32d94d9d9d645f4db9f0f498"}}).then((function(e){if(e.ok)return e.json();console.log(e)})).then((function(e){return i(e.response.entity)})).then((function(){e=!1})),function(){e=!1}}};t();var n=setInterval((function(){return t()}),2e4);return function(){return clearInterval(n)}}),[]),Object(a.useEffect)((function(){l(n.filter((function(e){return!e.is_deleted&&e.vehicle&&e.vehicle.trip&&e.vehicle.timestamp>Date.now()/1e3-300&&e.vehicle.position&&e.vehicle.position.latitude>-38&&e.vehicle.position.latitude<-36&&e.vehicle.position.longitude>174&&e.vehicle.position.longitude<176})).map((function(e){var t,i=n.filter((function(t){var n;return t.trip_update&&(null===(n=t.trip_update.vehicle)||void 0===n?void 0:n.id)===e.vehicle.vehicle.id}));return Object(u.a)(Object(u.a)({},e.vehicle),{},{key:e.vehicle.vehicle.id,trip_update:null===(t=i[0])||void 0===t?void 0:t.trip_update})})))}),[n]),Object(a.useEffect)((function(){console.log(r);for(var e=r.map((function(e){return void 0===e.occupancy_status?0:e.occupancy_status+1})),t=new Array(8).fill(0),n=0;n<e.length;n++)t[e[n]]++;j([{label:"Unknown",count:t[0],colour:y[0]},{label:"Empty",count:t[1],colour:y[1]},{label:"Many seats",count:t[2],colour:y[2]},{label:"Few seats",count:t[3],colour:y[3]},{label:"Standing room only",count:t[4],colour:y[4]},{label:"Full",count:t[6],colour:y[6]},{label:"Not accepting passengers",count:t[7],colour:y[7]}]);var i=r.map((function(e){if(void 0!==e.trip_update)return e.trip_update.stop_time_update.arrival?e.trip_update.stop_time_update.arrival.delay:e.trip_update.stop_time_update.departure.delay}));t=new Array(8).fill(0);for(var c=0;c<i.length;c++)void 0===i[c]?t[0]++:i[c]<=-300?t[1]++:i[c]<=60?t[2]++:i[c]>=300?t[3]++:i[c]>=600?t[4]++:i[c]>=1200?t[5]++:i[c]>=1800?t[6]++:t[7]++;x([{label:"No data",count:t[0],colour:"#95a5a6"},{label:">5m early",count:t[1],colour:"#3c42a5"},{label:"1-5m early",count:t[2],colour:"#28aebb"},{label:"On time",count:t[3],colour:"#26d926"},{label:"5-10m late",count:t[4],colour:"#f39c12"},{label:"10-20m late",count:t[5],colour:"#d35400"},{label:"20-30m late",count:t[6],colour:"red"},{label:"30+m late",count:t[7],colour:"#990000"}])}),[r]),Object(O.jsxs)(V,{children:[Object(O.jsx)(_,{vehicles:r,refresh:15e3,palette:y}),Object(O.jsxs)(K,{children:[Object(O.jsx)("h1",{children:"Real-time Public Transport Data"}),Object(O.jsx)("h2",{children:"Vehicle Occupancy in Central Auckland"})]}),Object(O.jsxs)(Y,{children:[Object(O.jsx)(N,{total:r.length,refresh:20}),Object(O.jsx)(I,{data:h,xlab:"Occupancy Status"}),Object(O.jsx)(I,{data:g,xlab:"Arrival and Departure Delays"})]})]})},V=p.a.div(R||(R=Object(s.a)([""]))),Y=p.a.div(Z||(Z=Object(s.a)(["\n  position: fixed;\n  z-index: 5;\n  top: 2em;\n  right: 2em;\n  width: 30em;\n  padding: 1em 2em;\n  background: rgba(0,0,0,0.2);\n"]))),K=p.a.div(J||(J=Object(s.a)(["\n  position: fixed;\n  z-index: 10;\n  top: 1em;\n  left: 0em;\n  color: black;\n  padding: 1em 3em;\n  width: 50vw;\n  text-align: right;\n  background: rgba(255,255,255,0.7);\n\n  h1 {\n    font-size: 45px;\n  }\n  h2 {\n    font-size: 30px;\n    font-style: italic;\n  }\n"]))),U=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,132)).then((function(t){var n=t.getCLS,i=t.getFID,c=t.getFCP,a=t.getLCP,o=t.getTTFB;n(e),i(e),c(e),a(e),o(e)}))};l.a.render(Object(O.jsx)(o.a.StrictMode,{children:Object(O.jsx)(G,{})}),document.getElementById("root")),U()}},[[131,1,2]]]);
//# sourceMappingURL=main.257abec4.chunk.js.map