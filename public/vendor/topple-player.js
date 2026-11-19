(()=>{var Uv=Object.create;var{getPrototypeOf:Fv,defineProperty:Ef,getOwnPropertyNames:Ov}=Object;var Tf=Object.prototype.hasOwnProperty;function Bv(e){return this[e]}var zv,Hv,Gv=(e,t,n)=>{var i=e!=null&&typeof e==="object";if(i){var r=t?zv??=new WeakMap:Hv??=new WeakMap,s=r.get(e);if(s)return s}n=e!=null?Uv(Fv(e)):{};let a=t||!e||!e.__esModule||!Tf.call(e,"default")?Ef(n,"default",{value:e,enumerable:!0}):n;if(e&&typeof e==="object"||typeof e==="function"){for(let o of Ov(e))if(!Tf.call(a,o))Ef(a,o,{get:Bv.bind(e,o),enumerable:!0})}if(i)r.set(e,a);return a};var Xe=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var za=Xe(function(cP,Ff){var $v="\x00",Di="\x00",Df="\x01";class Uf{_isDirected=!0;_isMultigraph=!1;_isCompound=!1;_label;_defaultNodeLabelFn=()=>{return};_defaultEdgeLabelFn=()=>{return};_nodes={};_in={};_preds={};_out={};_sucs={};_edgeObjs={};_edgeLabels={};_nodeCount=0;_edgeCount=0;_parent;_children;constructor(e){if(e)this._isDirected=Object.hasOwn(e,"directed")?e.directed:!0,this._isMultigraph=Object.hasOwn(e,"multigraph")?e.multigraph:!1,this._isCompound=Object.hasOwn(e,"compound")?e.compound:!1;if(this._isCompound)this._parent={},this._children={},this._children[Di]={}}isDirected(){return this._isDirected}isMultigraph(){return this._isMultigraph}isCompound(){return this._isCompound}setGraph(e){return this._label=e,this}graph(){return this._label}setDefaultNodeLabel(e){if(this._defaultNodeLabelFn=e,typeof e!=="function")this._defaultNodeLabelFn=()=>e;return this}nodeCount(){return this._nodeCount}nodes(){return Object.keys(this._nodes)}sources(){var e=this;return this.nodes().filter((t)=>Object.keys(e._in[t]).length===0)}sinks(){var e=this;return this.nodes().filter((t)=>Object.keys(e._out[t]).length===0)}setNodes(e,t){var n=arguments,i=this;return e.forEach(function(r){if(n.length>1)i.setNode(r,t);else i.setNode(r)}),this}setNode(e,t){if(Object.hasOwn(this._nodes,e)){if(arguments.length>1)this._nodes[e]=t;return this}if(this._nodes[e]=arguments.length>1?t:this._defaultNodeLabelFn(e),this._isCompound)this._parent[e]=Di,this._children[e]={},this._children[Di][e]=!0;return this._in[e]={},this._preds[e]={},this._out[e]={},this._sucs[e]={},++this._nodeCount,this}node(e){return this._nodes[e]}hasNode(e){return Object.hasOwn(this._nodes,e)}removeNode(e){var t=this;if(Object.hasOwn(this._nodes,e)){var n=(i)=>t.removeEdge(t._edgeObjs[i]);if(delete this._nodes[e],this._isCompound)this._removeFromParentsChildList(e),delete this._parent[e],this.children(e).forEach(function(i){t.setParent(i)}),delete this._children[e];Object.keys(this._in[e]).forEach(n),delete this._in[e],delete this._preds[e],Object.keys(this._out[e]).forEach(n),delete this._out[e],delete this._sucs[e],--this._nodeCount}return this}setParent(e,t){if(!this._isCompound)throw Error("Cannot set parent in a non-compound graph");if(t===void 0)t=Di;else{t+="";for(var n=t;n!==void 0;n=this.parent(n))if(n===e)throw Error("Setting "+t+" as parent of "+e+" would create a cycle");this.setNode(t)}return this.setNode(e),this._removeFromParentsChildList(e),this._parent[e]=t,this._children[t][e]=!0,this}_removeFromParentsChildList(e){delete this._children[this._parent[e]][e]}parent(e){if(this._isCompound){var t=this._parent[e];if(t!==Di)return t}}children(e=Di){if(this._isCompound){var t=this._children[e];if(t)return Object.keys(t)}else if(e===Di)return this.nodes();else if(this.hasNode(e))return[]}predecessors(e){var t=this._preds[e];if(t)return Object.keys(t)}successors(e){var t=this._sucs[e];if(t)return Object.keys(t)}neighbors(e){var t=this.predecessors(e);if(t){let i=new Set(t);for(var n of this.successors(e))i.add(n);return Array.from(i.values())}}isLeaf(e){var t;if(this.isDirected())t=this.successors(e);else t=this.neighbors(e);return t.length===0}filterNodes(e){var t=new this.constructor({directed:this._isDirected,multigraph:this._isMultigraph,compound:this._isCompound});t.setGraph(this.graph());var n=this;Object.entries(this._nodes).forEach(function([s,a]){if(e(s))t.setNode(s,a)}),Object.values(this._edgeObjs).forEach(function(s){if(t.hasNode(s.v)&&t.hasNode(s.w))t.setEdge(s,n.edge(s))});var i={};function r(s){var a=n.parent(s);if(a===void 0||t.hasNode(a))return i[s]=a,a;else if(a in i)return i[a];else return r(a)}if(this._isCompound)t.nodes().forEach((s)=>t.setParent(s,r(s)));return t}setDefaultEdgeLabel(e){if(this._defaultEdgeLabelFn=e,typeof e!=="function")this._defaultEdgeLabelFn=()=>e;return this}edgeCount(){return this._edgeCount}edges(){return Object.values(this._edgeObjs)}setPath(e,t){var n=this,i=arguments;return e.reduce(function(r,s){if(i.length>1)n.setEdge(r,s,t);else n.setEdge(r,s);return s}),this}setEdge(){var e,t,n,i,r=!1,s=arguments[0];if(typeof s==="object"&&s!==null&&"v"in s){if(e=s.v,t=s.w,n=s.name,arguments.length===2)i=arguments[1],r=!0}else if(e=s,t=arguments[1],n=arguments[3],arguments.length>2)i=arguments[2],r=!0;if(e=""+e,t=""+t,n!==void 0)n=""+n;var a=_s(this._isDirected,e,t,n);if(Object.hasOwn(this._edgeLabels,a)){if(r)this._edgeLabels[a]=i;return this}if(n!==void 0&&!this._isMultigraph)throw Error("Cannot set a named edge when isMultigraph = false");this.setNode(e),this.setNode(t),this._edgeLabels[a]=r?i:this._defaultEdgeLabelFn(e,t,n);var o=qv(this._isDirected,e,t,n);return e=o.v,t=o.w,Object.freeze(o),this._edgeObjs[a]=o,kf(this._preds[t],e),kf(this._sucs[e],t),this._in[t][a]=o,this._out[e][a]=o,this._edgeCount++,this}edge(e,t,n){var i=arguments.length===1?md(this._isDirected,arguments[0]):_s(this._isDirected,e,t,n);return this._edgeLabels[i]}edgeAsObj(){let e=this.edge(...arguments);if(typeof e!=="object")return{label:e};return e}hasEdge(e,t,n){var i=arguments.length===1?md(this._isDirected,arguments[0]):_s(this._isDirected,e,t,n);return Object.hasOwn(this._edgeLabels,i)}removeEdge(e,t,n){var i=arguments.length===1?md(this._isDirected,arguments[0]):_s(this._isDirected,e,t,n),r=this._edgeObjs[i];if(r)e=r.v,t=r.w,delete this._edgeLabels[i],delete this._edgeObjs[i],Nf(this._preds[t],e),Nf(this._sucs[e],t),delete this._in[t][i],delete this._out[e][i],this._edgeCount--;return this}inEdges(e,t){var n=this._in[e];if(n){var i=Object.values(n);if(!t)return i;return i.filter((r)=>r.v===t)}}outEdges(e,t){var n=this._out[e];if(n){var i=Object.values(n);if(!t)return i;return i.filter((r)=>r.w===t)}}nodeEdges(e,t){var n=this.inEdges(e,t);if(n)return n.concat(this.outEdges(e,t))}}function kf(e,t){if(e[t])e[t]++;else e[t]=1}function Nf(e,t){if(!--e[t])delete e[t]}function _s(e,t,n,i){var r=""+t,s=""+n;if(!e&&r>s){var a=r;r=s,s=a}return r+Df+s+Df+(i===void 0?$v:i)}function qv(e,t,n,i){var r=""+t,s=""+n;if(!e&&r>s){var a=r;r=s,s=a}var o={v:r,w:s};if(i)o.name=i;return o}function md(e,t){return _s(e,t.v,t.w,t.name)}Ff.exports=Uf});var Bf=Xe(function(dP,Of){Of.exports="2.2.4"});var Hf=Xe(function(hP,zf){zf.exports={Graph:za(),version:Bf()}});var Vf=Xe(function(uP,Gf){var Xv=za();Gf.exports={write:Yv,read:Kv};function Yv(e){var t={options:{directed:e.isDirected(),multigraph:e.isMultigraph(),compound:e.isCompound()},nodes:jv(e),edges:Zv(e)};if(e.graph()!==void 0)t.value=structuredClone(e.graph());return t}function jv(e){return e.nodes().map(function(t){var n=e.node(t),i=e.parent(t),r={v:t};if(n!==void 0)r.value=n;if(i!==void 0)r.parent=i;return r})}function Zv(e){return e.edges().map(function(t){var n=e.edge(t),i={v:t.v,w:t.w};if(t.name!==void 0)i.name=t.name;if(n!==void 0)i.value=n;return i})}function Kv(e){var t=new Xv(e.options).setGraph(e.value);return e.nodes.forEach(function(n){if(t.setNode(n.v,n.value),n.parent)t.setParent(n.v,n.parent)}),e.edges.forEach(function(n){t.setEdge({v:n.v,w:n.w,name:n.name},n.value)}),t}});var $f=Xe(function(fP,Wf){Wf.exports=Jv;function Jv(e){var t={},n=[],i;function r(s){if(Object.hasOwn(t,s))return;t[s]=!0,i.push(s),e.successors(s).forEach(r),e.predecessors(s).forEach(r)}return e.nodes().forEach(function(s){if(i=[],r(s),i.length)n.push(i)}),n}});var gd=Xe(function(pP,Xf){class qf{_arr=[];_keyIndices={};size(){return this._arr.length}keys(){return this._arr.map(function(e){return e.key})}has(e){return Object.hasOwn(this._keyIndices,e)}priority(e){var t=this._keyIndices[e];if(t!==void 0)return this._arr[t].priority}min(){if(this.size()===0)throw Error("Queue underflow");return this._arr[0].key}add(e,t){var n=this._keyIndices;if(e=String(e),!Object.hasOwn(n,e)){var i=this._arr,r=i.length;return n[e]=r,i.push({key:e,priority:t}),this._decrease(r),!0}return!1}removeMin(){this._swap(0,this._arr.length-1);var e=this._arr.pop();return delete this._keyIndices[e.key],this._heapify(0),e.key}decrease(e,t){var n=this._keyIndices[e];if(t>this._arr[n].priority)throw Error("New priority is greater than current priority. Key: "+e+" Old: "+this._arr[n].priority+" New: "+t);this._arr[n].priority=t,this._decrease(n)}_heapify(e){var t=this._arr,n=2*e,i=n+1,r=e;if(n<t.length){if(r=t[n].priority<t[r].priority?n:r,i<t.length)r=t[i].priority<t[r].priority?i:r;if(r!==e)this._swap(e,r),this._heapify(r)}}_decrease(e){var t=this._arr,n=t[e].priority,i;while(e!==0){if(i=e>>1,t[i].priority<n)break;this._swap(e,i),e=i}}_swap(e,t){var n=this._arr,i=this._keyIndices,r=n[e],s=n[t];n[e]=s,n[t]=r,i[s.key]=e,i[r.key]=t}}Xf.exports=qf});var xd=Xe(function(mP,Yf){var Qv=gd();Yf.exports=t_;var e_=()=>1;function t_(e,t,n,i){return n_(e,String(t),n||e_,i||function(r){return e.outEdges(r)})}function n_(e,t,n,i){var r={},s=new Qv,a,o,l=function(c){var d=c.v!==a?c.v:c.w,h=r[d],u=n(c),p=o.distance+u;if(u<0)throw Error("dijkstra does not allow negative edge weights. Bad edge: "+c+" Weight: "+u);if(p<h.distance)h.distance=p,h.predecessor=a,s.decrease(d,p)};e.nodes().forEach(function(c){var d=c===t?0:Number.POSITIVE_INFINITY;r[c]={distance:d},s.add(c,d)});while(s.size()>0){if(a=s.removeMin(),o=r[a],o.distance===Number.POSITIVE_INFINITY)break;i(a).forEach(l)}return r}});var Zf=Xe(function(gP,jf){var i_=xd();jf.exports=r_;function r_(e,t,n){return e.nodes().reduce(function(i,r){return i[r]=i_(e,r,t,n),i},{})}});var vd=Xe(function(xP,Kf){Kf.exports=s_;function s_(e){var t=0,n=[],i={},r=[];function s(a){var o=i[a]={onStack:!0,lowlink:t,index:t++};if(n.push(a),e.successors(a).forEach(function(d){if(!Object.hasOwn(i,d))s(d),o.lowlink=Math.min(o.lowlink,i[d].lowlink);else if(i[d].onStack)o.lowlink=Math.min(o.lowlink,i[d].index)}),o.lowlink===o.index){var l=[],c;do c=n.pop(),i[c].onStack=!1,l.push(c);while(a!==c);r.push(l)}}return e.nodes().forEach(function(a){if(!Object.hasOwn(i,a))s(a)}),r}});var Qf=Xe(function(vP,Jf){var a_=vd();Jf.exports=o_;function o_(e){return a_(e).filter(function(t){return t.length>1||t.length===1&&e.hasEdge(t[0],t[0])})}});var tp=Xe(function(_P,ep){ep.exports=c_;var l_=()=>1;function c_(e,t,n){return d_(e,t||l_,n||function(i){return e.outEdges(i)})}function d_(e,t,n){var i={},r=e.nodes();return r.forEach(function(s){i[s]={},i[s][s]={distance:0},r.forEach(function(a){if(s!==a)i[s][a]={distance:Number.POSITIVE_INFINITY}}),n(s).forEach(function(a){var o=a.v===s?a.w:a.v,l=t(a);i[s][o]={distance:l,predecessor:s}})}),r.forEach(function(s){var a=i[s];r.forEach(function(o){var l=i[o];r.forEach(function(c){var d=l[s],h=a[c],u=l[c],p=d.distance+h.distance;if(p<u.distance)u.distance=p,u.predecessor=h.predecessor})})}),i}});var _d=Xe(function(yP,ip){function np(e){var t={},n={},i=[];function r(s){if(Object.hasOwn(n,s))throw new Ha;if(!Object.hasOwn(t,s))n[s]=!0,t[s]=!0,e.predecessors(s).forEach(r),delete n[s],i.push(s)}if(e.sinks().forEach(r),Object.keys(t).length!==e.nodeCount())throw new Ha;return i}class Ha extends Error{constructor(){super(...arguments)}}ip.exports=np;np.CycleException=Ha});var ap=Xe(function(bP,sp){var rp=_d();sp.exports=h_;function h_(e){try{rp(e)}catch(t){if(t instanceof rp.CycleException)return!1;throw t}return!0}});var yd=Xe(function(SP,lp){lp.exports=u_;function u_(e,t,n){if(!Array.isArray(t))t=[t];var i=e.isDirected()?(o)=>e.successors(o):(o)=>e.neighbors(o),r=n==="post"?f_:p_,s=[],a={};return t.forEach((o)=>{if(!e.hasNode(o))throw Error("Graph does not have node: "+o);r(o,i,a,s)}),s}function f_(e,t,n,i){var r=[[e,!1]];while(r.length>0){var s=r.pop();if(s[1])i.push(s[0]);else if(!Object.hasOwn(n,s[0]))n[s[0]]=!0,r.push([s[0],!0]),op(t(s[0]),(a)=>r.push([a,!1]))}}function p_(e,t,n,i){var r=[e];while(r.length>0){var s=r.pop();if(!Object.hasOwn(n,s))n[s]=!0,i.push(s),op(t(s),(a)=>r.push(a))}}function op(e,t){var n=e.length;while(n--)t(e[n],n,e);return e}});var dp=Xe(function(wP,cp){var m_=yd();cp.exports=g_;function g_(e,t){return m_(e,t,"post")}});var up=Xe(function(MP,hp){var x_=yd();hp.exports=v_;function v_(e,t){return x_(e,t,"pre")}});var pp=Xe(function(EP,fp){var __=za(),y_=gd();fp.exports=b_;function b_(e,t){var n=new __,i={},r=new y_,s;function a(l){var c=l.v===s?l.w:l.v,d=r.priority(c);if(d!==void 0){var h=t(l);if(h<d)i[c]=s,r.decrease(c,h)}}if(e.nodeCount()===0)return n;e.nodes().forEach(function(l){r.add(l,Number.POSITIVE_INFINITY),n.setNode(l)}),r.decrease(e.nodes()[0],0);var o=!1;while(r.size()>0){if(s=r.removeMin(),Object.hasOwn(i,s))n.setEdge(s,i[s]);else if(o)throw Error("Input graph is not connected: "+e);else o=!0;e.nodeEdges(s).forEach(a)}return n}});var gp=Xe(function(TP,mp){mp.exports={components:$f(),dijkstra:xd(),dijkstraAll:Zf(),findCycles:Qf(),floydWarshall:tp(),isAcyclic:ap(),postorder:dp(),preorder:up(),prim:pp(),tarjan:vd(),topsort:_d()}});var Mn=Xe(function(AP,vp){var xp=Hf();vp.exports={Graph:xp.Graph,json:Vf(),alg:gp(),version:xp.version}});var Sp=Xe(function(CP,bp){class yp{constructor(){let e={};e._next=e._prev=e,this._sentinel=e}dequeue(){let e=this._sentinel,t=e._prev;if(t!==e)return _p(t),t}enqueue(e){let t=this._sentinel;if(e._prev&&e._next)_p(e);e._next=t._next,t._next._prev=e,t._next=e,e._prev=t}toString(){let e=[],t=this._sentinel,n=t._prev;while(n!==t)e.push(JSON.stringify(n,S_)),n=n._prev;return"["+e.join(", ")+"]"}}function _p(e){e._prev._next=e._next,e._next._prev=e._prev,delete e._next,delete e._prev}function S_(e,t){if(e!=="_next"&&e!=="_prev")return t}bp.exports=yp});var Mp=Xe(function(RP,wp){var w_=Mn().Graph,M_=Sp();wp.exports=T_;var E_=()=>1;function T_(e,t){if(e.nodeCount()<=1)return[];let n=C_(e,t||E_);return A_(n.graph,n.buckets,n.zeroIdx).flatMap((r)=>e.outEdges(r.v,r.w))}function A_(e,t,n){let i=[],r=t[t.length-1],s=t[0],a;while(e.nodeCount()){while(a=s.dequeue())bd(e,t,n,a);while(a=r.dequeue())bd(e,t,n,a);if(e.nodeCount()){for(let o=t.length-2;o>0;--o)if(a=t[o].dequeue(),a){i=i.concat(bd(e,t,n,a,!0));break}}}return i}function bd(e,t,n,i,r){let s=r?[]:void 0;return e.inEdges(i.v).forEach((a)=>{let o=e.edge(a),l=e.node(a.v);if(r)s.push({v:a.v,w:a.w});l.out-=o,Sd(t,n,l)}),e.outEdges(i.v).forEach((a)=>{let o=e.edge(a),l=a.w,c=e.node(l);c.in-=o,Sd(t,n,c)}),e.removeNode(i.v),s}function C_(e,t){let n=new w_,i=0,r=0;e.nodes().forEach((o)=>{n.setNode(o,{v:o,in:0,out:0})}),e.edges().forEach((o)=>{let l=n.edge(o.v,o.w)||0,c=t(o),d=l+c;n.setEdge(o.v,o.w,d),r=Math.max(r,n.node(o.v).out+=c),i=Math.max(i,n.node(o.w).in+=c)});let s=R_(r+i+3).map(()=>new M_),a=i+1;return n.nodes().forEach((o)=>{Sd(s,a,n.node(o))}),{graph:n,buckets:s,zeroIdx:a}}function Sd(e,t,n){if(!n.out)e[0].enqueue(n);else if(!n.in)e[e.length-1].enqueue(n);else e[n.out-n.in+t].enqueue(n)}function R_(e){let t=[];for(let n=0;n<e;n++)t.push(n);return t}});var Mt=Xe(function(PP,Ip){var Ep=Mn().Graph;Ip.exports={addBorderNode:O_,addDummyNode:Tp,applyWithChunking:Ga,asNonCompoundGraph:I_,buildLayerMatrix:N_,intersectRect:k_,mapValues:$_,maxRank:Cp,normalizeRanks:U_,notime:G_,partition:z_,pick:W_,predecessorWeights:D_,range:Pp,removeEmptyRanks:F_,simplify:P_,successorWeights:L_,time:H_,uniqueId:Rp,zipObject:wd};function Tp(e,t,n,i){var r=i;while(e.hasNode(r))r=Rp(i);return n.dummy=t,e.setNode(r,n),r}function P_(e){let t=new Ep().setGraph(e.graph());return e.nodes().forEach((n)=>t.setNode(n,e.node(n))),e.edges().forEach((n)=>{let i=t.edge(n.v,n.w)||{weight:0,minlen:1},r=e.edge(n);t.setEdge(n.v,n.w,{weight:i.weight+r.weight,minlen:Math.max(i.minlen,r.minlen)})}),t}function I_(e){let t=new Ep({multigraph:e.isMultigraph()}).setGraph(e.graph());return e.nodes().forEach((n)=>{if(!e.children(n).length)t.setNode(n,e.node(n))}),e.edges().forEach((n)=>{t.setEdge(n,e.edge(n))}),t}function L_(e){let t=e.nodes().map((n)=>{let i={};return e.outEdges(n).forEach((r)=>{i[r.w]=(i[r.w]||0)+e.edge(r).weight}),i});return wd(e.nodes(),t)}function D_(e){let t=e.nodes().map((n)=>{let i={};return e.inEdges(n).forEach((r)=>{i[r.v]=(i[r.v]||0)+e.edge(r).weight}),i});return wd(e.nodes(),t)}function k_(e,t){let{x:n,y:i}=e,r=t.x-n,s=t.y-i,a=e.width/2,o=e.height/2;if(!r&&!s)throw Error("Not possible to find intersection inside of the rectangle");let l,c;if(Math.abs(s)*a>Math.abs(r)*o){if(s<0)o=-o;l=o*r/s,c=o}else{if(r<0)a=-a;l=a,c=a*s/r}return{x:n+l,y:i+c}}function N_(e){let t=Pp(Cp(e)+1).map(()=>[]);return e.nodes().forEach((n)=>{let i=e.node(n),r=i.rank;if(r!==void 0)t[r][i.order]=n}),t}function U_(e){let t=e.nodes().map((i)=>{let r=e.node(i).rank;if(r===void 0)return Number.MAX_VALUE;return r}),n=Ga(Math.min,t);e.nodes().forEach((i)=>{let r=e.node(i);if(Object.hasOwn(r,"rank"))r.rank-=n})}function F_(e){let t=e.nodes().map((a)=>e.node(a).rank),n=Ga(Math.min,t),i=[];e.nodes().forEach((a)=>{let o=e.node(a).rank-n;if(!i[o])i[o]=[];i[o].push(a)});let r=0,s=e.graph().nodeRankFactor;Array.from(i).forEach((a,o)=>{if(a===void 0&&o%s!==0)--r;else if(a!==void 0&&r)a.forEach((l)=>e.node(l).rank+=r)})}function O_(e,t,n,i){let r={width:0,height:0};if(arguments.length>=4)r.rank=n,r.order=i;return Tp(e,"border",r,t)}function B_(e,t=Ap){let n=[];for(let i=0;i<e.length;i+=t){let r=e.slice(i,i+t);n.push(r)}return n}var Ap=65535;function Ga(e,t){if(t.length>Ap){let n=B_(t);return e.apply(null,n.map((i)=>e.apply(null,i)))}else return e.apply(null,t)}function Cp(e){let n=e.nodes().map((i)=>{let r=e.node(i).rank;if(r===void 0)return Number.MIN_VALUE;return r});return Ga(Math.max,n)}function z_(e,t){let n={lhs:[],rhs:[]};return e.forEach((i)=>{if(t(i))n.lhs.push(i);else n.rhs.push(i)}),n}function H_(e,t){let n=Date.now();try{return t()}finally{console.log(e+" time: "+(Date.now()-n)+"ms")}}function G_(e,t){return t()}var V_=0;function Rp(e){var t=++V_;return e+(""+t)}function Pp(e,t,n=1){if(t==null)t=e,e=0;let i=(s)=>s<t;if(n<0)i=(s)=>t<s;let r=[];for(let s=e;i(s);s+=n)r.push(s);return r}function W_(e,t){let n={};for(let i of t)if(e[i]!==void 0)n[i]=e[i];return n}function $_(e,t){let n=t;if(typeof t==="string")n=(i)=>i[t];return Object.entries(e).reduce((i,[r,s])=>(i[r]=n(s,r),i),{})}function wd(e,t){return e.reduce((n,i,r)=>(n[i]=t[r],n),{})}});var Dp=Xe(function(IP,Lp){var q_=Mp(),X_=Mt().uniqueId;Lp.exports={run:Y_,undo:Z_};function Y_(e){(e.graph().acyclicer==="greedy"?q_(e,n(e)):j_(e)).forEach((i)=>{let r=e.edge(i);e.removeEdge(i),r.forwardName=i.name,r.reversed=!0,e.setEdge(i.w,i.v,r,X_("rev"))});function n(i){return(r)=>i.edge(r).weight}}function j_(e){let t=[],n={},i={};function r(s){if(Object.hasOwn(i,s))return;i[s]=!0,n[s]=!0,e.outEdges(s).forEach((a)=>{if(Object.hasOwn(n,a.w))t.push(a);else r(a.w)}),delete n[s]}return e.nodes().forEach(r),t}function Z_(e){e.edges().forEach((t)=>{let n=e.edge(t);if(n.reversed){e.removeEdge(t);let i=n.forwardName;delete n.reversed,delete n.forwardName,e.setEdge(t.w,t.v,n,i)}})}});var Up=Xe(function(LP,Np){var kp=Mt();Np.exports={run:K_,undo:Q_};function K_(e){e.graph().dummyChains=[],e.edges().forEach((t)=>J_(e,t))}function J_(e,t){let n=t.v,i=e.node(n).rank,r=t.w,s=e.node(r).rank,a=t.name,o=e.edge(t),l=o.labelRank;if(s===i+1)return;e.removeEdge(t);let c,d,h;for(h=0,++i;i<s;++h,++i){if(o.points=[],d={width:0,height:0,edgeLabel:o,edgeObj:t,rank:i},c=kp.addDummyNode(e,"edge",d,"_d"),i===l)d.width=o.width,d.height=o.height,d.dummy="edge-label",d.labelpos=o.labelpos;if(e.setEdge(n,c,{weight:o.weight},a),h===0)e.graph().dummyChains.push(c);n=c}e.setEdge(n,r,{weight:o.weight},a)}function Q_(e){e.graph().dummyChains.forEach((t)=>{let n=e.node(t),i=n.edgeLabel,r;e.setEdge(n.edgeObj,i);while(n.dummy){if(r=e.successors(t)[0],e.removeNode(t),i.points.push({x:n.x,y:n.y}),n.dummy==="edge-label")i.x=n.x,i.y=n.y,i.width=n.width,i.height=n.height;t=r,n=e.node(t)}})}});var ys=Xe(function(DP,Fp){var{applyWithChunking:ey}=Mt();Fp.exports={longestPath:ty,slack:ny};function ty(e){var t={};function n(i){var r=e.node(i);if(Object.hasOwn(t,i))return r.rank;t[i]=!0;let s=e.outEdges(i).map((o)=>{if(o==null)return Number.POSITIVE_INFINITY;return n(o.w)-e.edge(o).minlen});var a=ey(Math.min,s);if(a===Number.POSITIVE_INFINITY)a=0;return r.rank=a}e.sources().forEach(n)}function ny(e,t){return e.node(t.w).rank-e.node(t.v).rank-e.edge(t).minlen}});var Md=Xe(function(kP,Op){var iy=Mn().Graph,Va=ys().slack;Op.exports=ry;function ry(e){var t=new iy({directed:!1}),n=e.nodes()[0],i=e.nodeCount();t.setNode(n,{});var r,s;while(sy(t,e)<i)r=ay(t,e),s=t.hasNode(r.v)?Va(e,r):-Va(e,r),oy(t,e,s);return t}function sy(e,t){function n(i){t.nodeEdges(i).forEach((r)=>{var s=r.v,a=i===s?r.w:s;if(!e.hasNode(a)&&!Va(t,r))e.setNode(a,{}),e.setEdge(i,a,{}),n(a)})}return e.nodes().forEach(n),e.nodeCount()}function ay(e,t){return t.edges().reduce((i,r)=>{let s=Number.POSITIVE_INFINITY;if(e.hasNode(r.v)!==e.hasNode(r.w))s=Va(t,r);if(s<i[0])return[s,r];return i},[Number.POSITIVE_INFINITY,null])[1]}function oy(e,t,n){e.nodes().forEach((i)=>t.node(i).rank+=n)}});var Xp=Xe(function(NP,qp){var ly=Md(),Bp=ys().slack,cy=ys().longestPath,dy=Mn().alg.preorder,hy=Mn().alg.postorder,uy=Mt().simplify;qp.exports=ki;ki.initLowLimValues=Td;ki.initCutValues=Ed;ki.calcCutValue=Hp;ki.leaveEdge=Vp;ki.enterEdge=Wp;ki.exchangeEdges=$p;function ki(e){e=uy(e),cy(e);var t=ly(e);Td(t),Ed(t,e);var n,i;while(n=Vp(t))i=Wp(t,e,n),$p(t,e,n,i)}function Ed(e,t){var n=hy(e,e.nodes());n=n.slice(0,n.length-1),n.forEach((i)=>fy(e,t,i))}function fy(e,t,n){var i=e.node(n),r=i.parent;e.edge(n,r).cutvalue=Hp(e,t,n)}function Hp(e,t,n){var i=e.node(n),r=i.parent,s=!0,a=t.edge(n,r),o=0;if(!a)s=!1,a=t.edge(r,n);return o=a.weight,t.nodeEdges(n).forEach((l)=>{var c=l.v===n,d=c?l.w:l.v;if(d!==r){var h=c===s,u=t.edge(l).weight;if(o+=h?u:-u,my(e,n,d)){var p=e.edge(n,d).cutvalue;o+=h?-p:p}}}),o}function Td(e,t){if(arguments.length<2)t=e.nodes()[0];Gp(e,{},1,t)}function Gp(e,t,n,i,r){var s=n,a=e.node(i);if(t[i]=!0,e.neighbors(i).forEach((o)=>{if(!Object.hasOwn(t,o))n=Gp(e,t,n,o,i)}),a.low=s,a.lim=n++,r)a.parent=r;else delete a.parent;return n}function Vp(e){return e.edges().find((t)=>e.edge(t).cutvalue<0)}function Wp(e,t,n){var{v:i,w:r}=n;if(!t.hasEdge(i,r))i=n.w,r=n.v;var s=e.node(i),a=e.node(r),o=s,l=!1;if(s.lim>a.lim)o=a,l=!0;var c=t.edges().filter((d)=>l===zp(e,e.node(d.v),o)&&l!==zp(e,e.node(d.w),o));return c.reduce((d,h)=>{if(Bp(t,h)<Bp(t,d))return h;return d})}function $p(e,t,n,i){var{v:r,w:s}=n;e.removeEdge(r,s),e.setEdge(i.v,i.w,{}),Td(e),Ed(e,t),py(e,t)}function py(e,t){var n=e.nodes().find((r)=>!t.node(r).parent),i=dy(e,n);i=i.slice(1),i.forEach((r)=>{var s=e.node(r).parent,a=t.edge(r,s),o=!1;if(!a)a=t.edge(s,r),o=!0;t.node(r).rank=t.node(s).rank+(o?a.minlen:-a.minlen)})}function my(e,t,n){return e.hasEdge(t,n)}function zp(e,t,n){return n.low<=t.lim&&t.lim<=n.lim}});var Kp=Xe(function(UP,Zp){var gy=ys(),jp=gy.longestPath,xy=Md(),vy=Xp();Zp.exports=_y;function _y(e){var t=e.graph().ranker;if(t instanceof Function)return t(e);switch(e.graph().ranker){case"network-simplex":Yp(e);break;case"tight-tree":by(e);break;case"longest-path":yy(e);break;case"none":break;default:Yp(e)}}var yy=jp;function by(e){jp(e),xy(e)}function Yp(e){vy(e)}});var Qp=Xe(function(FP,Jp){Jp.exports=Sy;function Sy(e){let t=My(e);e.graph().dummyChains.forEach((n)=>{let i=e.node(n),r=i.edgeObj,s=wy(e,t,r.v,r.w),{path:a,lca:o}=s,l=0,c=a[l],d=!0;while(n!==r.w){if(i=e.node(n),d){while((c=a[l])!==o&&e.node(c).maxRank<i.rank)l++;if(c===o)d=!1}if(!d){while(l<a.length-1&&e.node(c=a[l+1]).minRank<=i.rank)l++;c=a[l]}e.setParent(n,c),n=e.successors(n)[0]}})}function wy(e,t,n,i){let r=[],s=[],a=Math.min(t[n].low,t[i].low),o=Math.max(t[n].lim,t[i].lim),l,c;l=n;do l=e.parent(l),r.push(l);while(l&&(t[l].low>a||o>t[l].lim));c=l,l=i;while((l=e.parent(l))!==c)s.push(l);return{path:r.concat(s.reverse()),lca:c}}function My(e){let t={},n=0;function i(r){let s=n;e.children(r).forEach(i),t[r]={low:s,lim:n++}}return e.children().forEach(i),t}});var nm=Xe(function(OP,tm){var mi=Mt();tm.exports={run:Ey,cleanup:Cy};function Ey(e){let t=mi.addDummyNode(e,"root",{},"_root"),n=Ty(e),i=Object.values(n),r=mi.applyWithChunking(Math.max,i)-1,s=2*r+1;e.graph().nestingRoot=t,e.edges().forEach((o)=>e.edge(o).minlen*=s);let a=Ay(e)+1;e.children().forEach((o)=>em(e,t,s,a,r,n,o)),e.graph().nodeRankFactor=s}function em(e,t,n,i,r,s,a){let o=e.children(a);if(!o.length){if(a!==t)e.setEdge(t,a,{weight:0,minlen:n});return}let l=mi.addBorderNode(e,"_bt"),c=mi.addBorderNode(e,"_bb"),d=e.node(a);if(e.setParent(l,a),d.borderTop=l,e.setParent(c,a),d.borderBottom=c,o.forEach((h)=>{em(e,t,n,i,r,s,h);let u=e.node(h),p=u.borderTop?u.borderTop:h,g=u.borderBottom?u.borderBottom:h,x=u.borderTop?i:2*i,m=p!==g?1:r-s[a]+1;e.setEdge(l,p,{weight:x,minlen:m,nestingEdge:!0}),e.setEdge(g,c,{weight:x,minlen:m,nestingEdge:!0})}),!e.parent(a))e.setEdge(t,l,{weight:0,minlen:r+s[a]})}function Ty(e){var t={};function n(i,r){var s=e.children(i);if(s&&s.length)s.forEach((a)=>n(a,r+1));t[i]=r}return e.children().forEach((i)=>n(i,1)),t}function Ay(e){return e.edges().reduce((t,n)=>t+e.edge(n).weight,0)}function Cy(e){var t=e.graph();e.removeNode(t.nestingRoot),delete t.nestingRoot,e.edges().forEach((n)=>{var i=e.edge(n);if(i.nestingEdge)e.removeEdge(n)})}});var am=Xe(function(BP,sm){var rm=Mt();sm.exports=Ry;function Ry(e){function t(n){let i=e.children(n),r=e.node(n);if(i.length)i.forEach(t);if(Object.hasOwn(r,"minRank")){r.borderLeft=[],r.borderRight=[];for(let s=r.minRank,a=r.maxRank+1;s<a;++s)im(e,"borderLeft","_bl",n,r,s),im(e,"borderRight","_br",n,r,s)}}e.children().forEach(t)}function im(e,t,n,i,r,s){let a={width:0,height:0,rank:s,borderType:t},o=r[t][s-1],l=rm.addDummyNode(e,"border",a,n);if(r[t][s]=l,e.setParent(l,i),o)e.setEdge(o,l,{weight:1})}});var dm=Xe(function(zP,cm){cm.exports={adjust:Py,undo:Iy};function Py(e){let t=e.graph().rankdir.toLowerCase();if(t==="lr"||t==="rl")lm(e)}function Iy(e){let t=e.graph().rankdir.toLowerCase();if(t==="bt"||t==="rl")Ly(e);if(t==="lr"||t==="rl")Dy(e),lm(e)}function lm(e){e.nodes().forEach((t)=>om(e.node(t))),e.edges().forEach((t)=>om(e.edge(t)))}function om(e){let t=e.width;e.width=e.height,e.height=t}function Ly(e){e.nodes().forEach((t)=>Ad(e.node(t))),e.edges().forEach((t)=>{let n=e.edge(t);if(n.points.forEach(Ad),Object.hasOwn(n,"y"))Ad(n)})}function Ad(e){e.y=-e.y}function Dy(e){e.nodes().forEach((t)=>Cd(e.node(t))),e.edges().forEach((t)=>{let n=e.edge(t);if(n.points.forEach(Cd),Object.hasOwn(n,"x"))Cd(n)})}function Cd(e){let t=e.x;e.x=e.y,e.y=t}});var um=Xe(function(HP,hm){var Wa=Mt();hm.exports=ky;function ky(e){let t={},n=e.nodes().filter((l)=>!e.children(l).length),i=n.map((l)=>e.node(l).rank),r=Wa.applyWithChunking(Math.max,i),s=Wa.range(r+1).map(()=>[]);function a(l){if(t[l])return;t[l]=!0;let c=e.node(l);s[c.rank].push(l),e.successors(l).forEach(a)}return n.sort((l,c)=>e.node(l).rank-e.node(c).rank).forEach(a),s}});var pm=Xe(function(GP,fm){var Ny=Mt().zipObject;fm.exports=Uy;function Uy(e,t){let n=0;for(let i=1;i<t.length;++i)n+=Fy(e,t[i-1],t[i]);return n}function Fy(e,t,n){let i=Ny(n,n.map((c,d)=>d)),r=t.flatMap((c)=>e.outEdges(c).map((d)=>({pos:i[d.w],weight:e.edge(d).weight})).sort((d,h)=>d.pos-h.pos)),s=1;while(s<n.length)s<<=1;let a=2*s-1;s-=1;let o=Array(a).fill(0),l=0;return r.forEach((c)=>{let d=c.pos+s;o[d]+=c.weight;let h=0;while(d>0){if(d%2)h+=o[d+1];d=d-1>>1,o[d]+=c.weight}l+=c.weight*h}),l}});var gm=Xe(function(VP,mm){mm.exports=Oy;function Oy(e,t=[]){return t.map((n)=>{let i=e.inEdges(n);if(!i.length)return{v:n};else{let r=i.reduce((s,a)=>{let o=e.edge(a),l=e.node(a.v);return{sum:s.sum+o.weight*l.order,weight:s.weight+o.weight}},{sum:0,weight:0});return{v:n,barycenter:r.sum/r.weight,weight:r.weight}}})}});var _m=Xe(function(WP,vm){var xm=Mt();vm.exports=By;function By(e,t){let n={};e.forEach((r,s)=>{let a=n[r.v]={indegree:0,in:[],out:[],vs:[r.v],i:s};if(r.barycenter!==void 0)a.barycenter=r.barycenter,a.weight=r.weight}),t.edges().forEach((r)=>{let s=n[r.v],a=n[r.w];if(s!==void 0&&a!==void 0)a.indegree++,s.out.push(n[r.w])});let i=Object.values(n).filter((r)=>!r.indegree);return zy(i)}function zy(e){let t=[];function n(r){return(s)=>{if(s.merged)return;if(s.barycenter===void 0||r.barycenter===void 0||s.barycenter>=r.barycenter)Hy(r,s)}}function i(r){return(s)=>{if(s.in.push(r),--s.indegree===0)e.push(s)}}while(e.length){let r=e.pop();t.push(r),r.in.reverse().forEach(n(r)),r.out.forEach(i(r))}return t.filter((r)=>!r.merged).map((r)=>xm.pick(r,["vs","i","barycenter","weight"]))}function Hy(e,t){let n=0,i=0;if(e.weight)n+=e.barycenter*e.weight,i+=e.weight;if(t.weight)n+=t.barycenter*t.weight,i+=t.weight;e.vs=t.vs.concat(e.vs),e.barycenter=n/i,e.weight=i,e.i=Math.min(t.i,e.i),t.merged=!0}});var wm=Xe(function($P,Sm){var bm=Mt();Sm.exports=Gy;function Gy(e,t){let n=bm.partition(e,(d)=>Object.hasOwn(d,"barycenter")),i=n.lhs,r=n.rhs.sort((d,h)=>h.i-d.i),s=[],a=0,o=0,l=0;i.sort(Vy(!!t)),l=ym(s,r,l),i.forEach((d)=>{l+=d.vs.length,s.push(d.vs),a+=d.barycenter*d.weight,o+=d.weight,l=ym(s,r,l)});let c={vs:s.flat(!0)};if(o)c.barycenter=a/o,c.weight=o;return c}function ym(e,t,n){let i;while(t.length&&(i=t[t.length-1]).i<=n)t.pop(),e.push(i.vs),n++;return n}function Vy(e){return(t,n)=>{if(t.barycenter<n.barycenter)return-1;else if(t.barycenter>n.barycenter)return 1;return!e?t.i-n.i:n.i-t.i}}});var Tm=Xe(function(qP,Em){var Wy=gm(),$y=_m(),qy=wm();Em.exports=Mm;function Mm(e,t,n,i){let r=e.children(t),s=e.node(t),a=s?s.borderLeft:void 0,o=s?s.borderRight:void 0,l={};if(a)r=r.filter((u)=>u!==a&&u!==o);let c=Wy(e,r);c.forEach((u)=>{if(e.children(u.v).length){let p=Mm(e,u.v,n,i);if(l[u.v]=p,Object.hasOwn(p,"barycenter"))Yy(u,p)}});let d=$y(c,n);Xy(d,l);let h=qy(d,i);if(a){if(h.vs=[a,h.vs,o].flat(!0),e.predecessors(a).length){let u=e.node(e.predecessors(a)[0]),p=e.node(e.predecessors(o)[0]);if(!Object.hasOwn(h,"barycenter"))h.barycenter=0,h.weight=0;h.barycenter=(h.barycenter*h.weight+u.order+p.order)/(h.weight+2),h.weight+=2}}return h}function Xy(e,t){e.forEach((n)=>{n.vs=n.vs.flatMap((i)=>{if(t[i])return t[i].vs;return i})})}function Yy(e,t){if(e.barycenter!==void 0)e.barycenter=(e.barycenter*e.weight+t.barycenter*t.weight)/(e.weight+t.weight),e.weight+=t.weight;else e.barycenter=t.barycenter,e.weight=t.weight}});var Rm=Xe(function(XP,Cm){var jy=Mn().Graph,Am=Mt();Cm.exports=Zy;function Zy(e,t,n,i){if(!i)i=e.nodes();let r=Ky(e),s=new jy({compound:!0}).setGraph({root:r}).setDefaultNodeLabel((a)=>e.node(a));return i.forEach((a)=>{let o=e.node(a),l=e.parent(a);if(o.rank===t||o.minRank<=t&&t<=o.maxRank){if(s.setNode(a),s.setParent(a,l||r),e[n](a).forEach((c)=>{let d=c.v===a?c.w:c.v,h=s.edge(d,a),u=h!==void 0?h.weight:0;s.setEdge(d,a,{weight:e.edge(c).weight+u})}),Object.hasOwn(o,"minRank"))s.setNode(a,{borderLeft:o.borderLeft[t],borderRight:o.borderRight[t]})}}),s}function Ky(e){var t;while(e.hasNode(t=Am.uniqueId("_root")));return t}});var Im=Xe(function(YP,Pm){Pm.exports=Jy;function Jy(e,t,n){let i={},r;n.forEach((s)=>{let a=e.parent(s),o,l;while(a){if(o=e.parent(a),o)l=i[o],i[o]=a;else l=r,r=a;if(l&&l!==a){t.setEdge(l,a);return}a=o}})}});var Um=Xe(function(jP,Nm){var Qy=um(),eb=pm(),tb=Tm(),nb=Rm(),ib=Im(),rb=Mn().Graph,gi=Mt();Nm.exports=km;function km(e,t){if(t&&typeof t.customOrder==="function"){t.customOrder(e,km);return}let n=gi.maxRank(e),i=Lm(e,gi.range(1,n+1),"inEdges"),r=Lm(e,gi.range(n-1,-1,-1),"outEdges"),s=Qy(e);if(Dm(e,s),t&&t.disableOptimalOrderHeuristic)return;let a=Number.POSITIVE_INFINITY,o;for(let l=0,c=0;c<4;++l,++c){sb(l%2?i:r,l%4>=2),s=gi.buildLayerMatrix(e);let d=eb(e,s);if(d<a)c=0,o=Object.assign({},s),a=d}Dm(e,o)}function Lm(e,t,n){let i=new Map,r=(s,a)=>{if(!i.has(s))i.set(s,[]);i.get(s).push(a)};for(let s of e.nodes()){let a=e.node(s);if(typeof a.rank==="number")r(a.rank,s);if(typeof a.minRank==="number"&&typeof a.maxRank==="number"){for(let o=a.minRank;o<=a.maxRank;o++)if(o!==a.rank)r(o,s)}}return t.map(function(s){return nb(e,s,n,i.get(s)||[])})}function sb(e,t){let n=new rb;e.forEach(function(i){let r=i.graph().root,s=tb(i,r,n,t);s.vs.forEach((a,o)=>i.node(a).order=o),ib(i,n,s.vs)})}function Dm(e,t){Object.values(t).forEach((n)=>n.forEach((i,r)=>e.node(i).order=r))}});var qm=Xe(function(ZP,$m){var ab=Mn().Graph,kt=Mt();$m.exports={positionX:cb,findType1Conflicts:Fm,findType2Conflicts:Om,addConflict:Rd,hasConflict:Bm,verticalAlignment:zm,horizontalCompaction:Hm,alignCoordinates:Vm,findSmallestWidthAlignment:Gm,balance:Wm};function Fm(e,t){let n={};function i(r,s){let a=0,o=0,l=r.length,c=s[s.length-1];return s.forEach((d,h)=>{let u=ob(e,d),p=u?e.node(u).order:l;if(u||d===c)s.slice(o,h+1).forEach((g)=>{e.predecessors(g).forEach((x)=>{let m=e.node(x),f=m.order;if((f<a||p<f)&&!(m.dummy&&e.node(g).dummy))Rd(n,x,g)})}),o=h+1,a=p}),s}return t.length&&t.reduce(i),n}function Om(e,t){let n={};function i(s,a,o,l,c){let d;kt.range(a,o).forEach((h)=>{if(d=s[h],e.node(d).dummy)e.predecessors(d).forEach((u)=>{let p=e.node(u);if(p.dummy&&(p.order<l||p.order>c))Rd(n,u,d)})})}function r(s,a){let o=-1,l,c=0;return a.forEach((d,h)=>{if(e.node(d).dummy==="border"){let u=e.predecessors(d);if(u.length)l=e.node(u[0]).order,i(a,c,h,o,l),c=h,o=l}i(a,c,a.length,l,s.length)}),a}return t.length&&t.reduce(r),n}function ob(e,t){if(e.node(t).dummy)return e.predecessors(t).find((n)=>e.node(n).dummy)}function Rd(e,t,n){if(t>n){let r=t;t=n,n=r}let i=e[t];if(!i)e[t]=i={};i[n]=!0}function Bm(e,t,n){if(t>n){let i=t;t=n,n=i}return!!e[t]&&Object.hasOwn(e[t],n)}function zm(e,t,n,i){let r={},s={},a={};return t.forEach((o)=>{o.forEach((l,c)=>{r[l]=l,s[l]=l,a[l]=c})}),t.forEach((o)=>{let l=-1;o.forEach((c)=>{let d=i(c);if(d.length){d=d.sort((u,p)=>a[u]-a[p]);let h=(d.length-1)/2;for(let u=Math.floor(h),p=Math.ceil(h);u<=p;++u){let g=d[u];if(s[c]===c&&l<a[g]&&!Bm(n,c,g))s[g]=c,s[c]=r[c]=r[g],l=a[g]}}})}),{root:r,align:s}}function Hm(e,t,n,i,r){let s={},a=lb(e,t,n,r),o=r?"borderLeft":"borderRight";function l(h,u){let p=a.nodes(),g=p.pop(),x={};while(g){if(x[g])h(g);else x[g]=!0,p.push(g),p=p.concat(u(g));g=p.pop()}}function c(h){s[h]=a.inEdges(h).reduce((u,p)=>Math.max(u,s[p.v]+a.edge(p)),0)}function d(h){let u=a.outEdges(h).reduce((g,x)=>Math.min(g,s[x.w]-a.edge(x)),Number.POSITIVE_INFINITY),p=e.node(h);if(u!==Number.POSITIVE_INFINITY&&p.borderType!==o)s[h]=Math.max(s[h],u)}return l(c,a.predecessors.bind(a)),l(d,a.successors.bind(a)),Object.keys(i).forEach((h)=>s[h]=s[n[h]]),s}function lb(e,t,n,i){let r=new ab,s=e.graph(),a=db(s.nodesep,s.edgesep,i);return t.forEach((o)=>{let l;o.forEach((c)=>{let d=n[c];if(r.setNode(d),l){var h=n[l],u=r.edge(h,d);r.setEdge(h,d,Math.max(a(e,c,l),u||0))}l=c})}),r}function Gm(e,t){return Object.values(t).reduce((n,i)=>{let{NEGATIVE_INFINITY:r,POSITIVE_INFINITY:s}=Number;Object.entries(i).forEach(([o,l])=>{let c=hb(e,o)/2;r=Math.max(l+c,r),s=Math.min(l-c,s)});let a=r-s;if(a<n[0])n=[a,i];return n},[Number.POSITIVE_INFINITY,null])[1]}function Vm(e,t){let n=Object.values(t),i=kt.applyWithChunking(Math.min,n),r=kt.applyWithChunking(Math.max,n);["u","d"].forEach((s)=>{["l","r"].forEach((a)=>{let o=s+a,l=e[o];if(l===t)return;let c=Object.values(l),d=i-kt.applyWithChunking(Math.min,c);if(a!=="l")d=r-kt.applyWithChunking(Math.max,c);if(d)e[o]=kt.mapValues(l,(h)=>h+d)})})}function Wm(e,t){return kt.mapValues(e.ul,(n,i)=>{if(t)return e[t.toLowerCase()][i];else{let r=Object.values(e).map((s)=>s[i]).sort((s,a)=>s-a);return(r[1]+r[2])/2}})}function cb(e){let t=kt.buildLayerMatrix(e),n=Object.assign(Fm(e,t),Om(e,t)),i={},r;["u","d"].forEach((a)=>{r=a==="u"?t:Object.values(t).reverse(),["l","r"].forEach((o)=>{if(o==="r")r=r.map((h)=>Object.values(h).reverse());let l=(a==="u"?e.predecessors:e.successors).bind(e),c=zm(e,r,n,l),d=Hm(e,r,c.root,c.align,o==="r");if(o==="r")d=kt.mapValues(d,(h)=>-h);i[a+o]=d})});let s=Gm(e,i);return Vm(i,s),Wm(i,e.graph().align)}function db(e,t,n){return(i,r,s)=>{let a=i.node(r),o=i.node(s),l=0,c;if(l+=a.width/2,Object.hasOwn(a,"labelpos"))switch(a.labelpos.toLowerCase()){case"l":c=-a.width/2;break;case"r":c=a.width/2;break}if(c)l+=n?c:-c;if(c=0,l+=(a.dummy?t:e)/2,l+=(o.dummy?t:e)/2,l+=o.width/2,Object.hasOwn(o,"labelpos"))switch(o.labelpos.toLowerCase()){case"l":c=o.width/2;break;case"r":c=-o.width/2;break}if(c)l+=n?c:-c;return c=0,l}}function hb(e,t){return e.node(t).width}});var Ym=Xe(function(KP,Xm){var $a=Mt(),ub=qm().positionX;Xm.exports=fb;function fb(e){e=$a.asNonCompoundGraph(e),pb(e),Object.entries(ub(e)).forEach(([t,n])=>e.node(t).x=n)}function pb(e){let t=$a.buildLayerMatrix(e),n=e.graph().ranksep,i=0;t.forEach((r)=>{let s=r.reduce((a,o)=>{let l=e.node(o).height;if(a>l)return a;else return l},0);r.forEach((a)=>e.node(a).y=i+s/2),i+=s+n})}});var Km=Xe(function(JP,Zm){var qa=Dp(),Xa=Up(),mb=Kp(),gb=Mt().normalizeRanks,xb=Qp(),vb=Mt().removeEmptyRanks,Ya=nm(),_b=am(),ja=dm(),yb=Um(),bb=Ym(),gt=Mt(),Sb=Mn().Graph;Zm.exports=wb;function wb(e,t){let n=t&&t.debugTiming?gt.time:gt.notime;n("layout",()=>{let i=n("  buildLayoutGraph",()=>Db(e));n("  runLayout",()=>Mb(i,n,t)),n("  updateInputGraph",()=>Eb(e,i))})}function Mb(e,t,n){t("    makeSpaceForEdgeLabels",()=>kb(e)),t("    removeSelfEdges",()=>Vb(e)),t("    acyclic",()=>qa.run(e)),t("    nestingGraph.run",()=>Ya.run(e)),t("    rank",()=>mb(gt.asNonCompoundGraph(e))),t("    injectEdgeLabelProxies",()=>Nb(e)),t("    removeEmptyRanks",()=>vb(e)),t("    nestingGraph.cleanup",()=>Ya.cleanup(e)),t("    normalizeRanks",()=>gb(e)),t("    assignRankMinMax",()=>Ub(e)),t("    removeEdgeLabelProxies",()=>Fb(e)),t("    normalize.run",()=>Xa.run(e)),t("    parentDummyChains",()=>xb(e)),t("    addBorderSegments",()=>_b(e)),t("    order",()=>yb(e,n)),t("    insertSelfEdges",()=>Wb(e)),t("    adjustCoordinateSystem",()=>ja.adjust(e)),t("    position",()=>bb(e)),t("    positionSelfEdges",()=>$b(e)),t("    removeBorderNodes",()=>Gb(e)),t("    normalize.undo",()=>Xa.undo(e)),t("    fixupEdgeLabelCoords",()=>zb(e)),t("    undoCoordinateSystem",()=>ja.undo(e)),t("    translateGraph",()=>Ob(e)),t("    assignNodeIntersects",()=>Bb(e)),t("    reversePoints",()=>Hb(e)),t("    acyclic.undo",()=>qa.undo(e))}function Eb(e,t){e.nodes().forEach((n)=>{let i=e.node(n),r=t.node(n);if(i){if(i.x=r.x,i.y=r.y,i.rank=r.rank,t.children(n).length)i.width=r.width,i.height=r.height}}),e.edges().forEach((n)=>{let i=e.edge(n),r=t.edge(n);if(i.points=r.points,Object.hasOwn(r,"x"))i.x=r.x,i.y=r.y}),e.graph().width=t.graph().width,e.graph().height=t.graph().height}var Tb=["nodesep","edgesep","ranksep","marginx","marginy"],Ab={ranksep:50,edgesep:20,nodesep:50,rankdir:"tb"},Cb=["acyclicer","ranker","rankdir","align"],Rb=["width","height","rank"],jm={width:0,height:0},Pb=["minlen","weight","width","height","labeloffset"],Ib={minlen:1,weight:1,width:0,height:0,labeloffset:10,labelpos:"r"},Lb=["labelpos"];function Db(e){let t=new Sb({multigraph:!0,compound:!0}),n=Id(e.graph());return t.setGraph(Object.assign({},Ab,Pd(n,Tb),gt.pick(n,Cb))),e.nodes().forEach((i)=>{let r=Id(e.node(i)),s=Pd(r,Rb);Object.keys(jm).forEach((a)=>{if(s[a]===void 0)s[a]=jm[a]}),t.setNode(i,s),t.setParent(i,e.parent(i))}),e.edges().forEach((i)=>{let r=Id(e.edge(i));t.setEdge(i,Object.assign({},Ib,Pd(r,Pb),gt.pick(r,Lb)))}),t}function kb(e){let t=e.graph();t.ranksep/=2,e.edges().forEach((n)=>{let i=e.edge(n);if(i.minlen*=2,i.labelpos.toLowerCase()!=="c")if(t.rankdir==="TB"||t.rankdir==="BT")i.width+=i.labeloffset;else i.height+=i.labeloffset})}function Nb(e){e.edges().forEach((t)=>{let n=e.edge(t);if(n.width&&n.height){let i=e.node(t.v),s={rank:(e.node(t.w).rank-i.rank)/2+i.rank,e:t};gt.addDummyNode(e,"edge-proxy",s,"_ep")}})}function Ub(e){let t=0;e.nodes().forEach((n)=>{let i=e.node(n);if(i.borderTop)i.minRank=e.node(i.borderTop).rank,i.maxRank=e.node(i.borderBottom).rank,t=Math.max(t,i.maxRank)}),e.graph().maxRank=t}function Fb(e){e.nodes().forEach((t)=>{let n=e.node(t);if(n.dummy==="edge-proxy")e.edge(n.e).labelRank=n.rank,e.removeNode(t)})}function Ob(e){let t=Number.POSITIVE_INFINITY,n=0,i=Number.POSITIVE_INFINITY,r=0,s=e.graph(),a=s.marginx||0,o=s.marginy||0;function l(c){let{x:d,y:h,width:u,height:p}=c;t=Math.min(t,d-u/2),n=Math.max(n,d+u/2),i=Math.min(i,h-p/2),r=Math.max(r,h+p/2)}e.nodes().forEach((c)=>l(e.node(c))),e.edges().forEach((c)=>{let d=e.edge(c);if(Object.hasOwn(d,"x"))l(d)}),t-=a,i-=o,e.nodes().forEach((c)=>{let d=e.node(c);d.x-=t,d.y-=i}),e.edges().forEach((c)=>{let d=e.edge(c);if(d.points.forEach((h)=>{h.x-=t,h.y-=i}),Object.hasOwn(d,"x"))d.x-=t;if(Object.hasOwn(d,"y"))d.y-=i}),s.width=n-t+a,s.height=r-i+o}function Bb(e){e.edges().forEach((t)=>{let n=e.edge(t),i=e.node(t.v),r=e.node(t.w),s,a;if(!n.points)n.points=[],s=r,a=i;else s=n.points[0],a=n.points[n.points.length-1];n.points.unshift(gt.intersectRect(i,s)),n.points.push(gt.intersectRect(r,a))})}function zb(e){e.edges().forEach((t)=>{let n=e.edge(t);if(Object.hasOwn(n,"x")){if(n.labelpos==="l"||n.labelpos==="r")n.width-=n.labeloffset;switch(n.labelpos){case"l":n.x-=n.width/2+n.labeloffset;break;case"r":n.x+=n.width/2+n.labeloffset;break}}})}function Hb(e){e.edges().forEach((t)=>{let n=e.edge(t);if(n.reversed)n.points.reverse()})}function Gb(e){e.nodes().forEach((t)=>{if(e.children(t).length){let n=e.node(t),i=e.node(n.borderTop),r=e.node(n.borderBottom),s=e.node(n.borderLeft[n.borderLeft.length-1]),a=e.node(n.borderRight[n.borderRight.length-1]);n.width=Math.abs(a.x-s.x),n.height=Math.abs(r.y-i.y),n.x=s.x+n.width/2,n.y=i.y+n.height/2}}),e.nodes().forEach((t)=>{if(e.node(t).dummy==="border")e.removeNode(t)})}function Vb(e){e.edges().forEach((t)=>{if(t.v===t.w){var n=e.node(t.v);if(!n.selfEdges)n.selfEdges=[];n.selfEdges.push({e:t,label:e.edge(t)}),e.removeEdge(t)}})}function Wb(e){var t=gt.buildLayerMatrix(e);t.forEach((n)=>{var i=0;n.forEach((r,s)=>{var a=e.node(r);a.order=s+i,(a.selfEdges||[]).forEach((o)=>{gt.addDummyNode(e,"selfedge",{width:o.label.width,height:o.label.height,rank:a.rank,order:s+ ++i,e:o.e,label:o.label},"_se")}),delete a.selfEdges})})}function $b(e){e.nodes().forEach((t)=>{var n=e.node(t);if(n.dummy==="selfedge"){var i=e.node(n.e.v),r=i.x+i.width/2,s=i.y,a=n.x-r,o=i.height/2;e.setEdge(n.e,n.label),e.removeNode(t),n.label.points=[{x:r+2*a/3,y:s-o},{x:r+5*a/6,y:s-o},{x:r+a,y:s},{x:r+5*a/6,y:s+o},{x:r+2*a/3,y:s+o}],n.label.x=n.x,n.label.y=n.y}})}function Pd(e,t){return gt.mapValues(gt.pick(e,t),Number)}function Id(e){var t={};if(e)Object.entries(e).forEach(([n,i])=>{if(typeof n==="string")n=n.toLowerCase();t[n]=i});return t}});var eg=Xe(function(QP,Qm){var Jm=Mt(),qb=Mn().Graph;Qm.exports={debugOrdering:Xb};function Xb(e){let t=Jm.buildLayerMatrix(e),n=new qb({compound:!0,multigraph:!0}).setGraph({});return e.nodes().forEach((i)=>{n.setNode(i,{label:i}),n.setParent(i,"layer"+e.node(i).rank)}),e.edges().forEach((i)=>n.setEdge(i.v,i.w,{},i.name)),t.forEach((i,r)=>{let s="layer"+r;n.setNode(s,{rank:"same"}),i.reduce((a,o)=>(n.setEdge(a,o,{style:"invis"}),o))}),n}});var ng=Xe(function(eI,tg){tg.exports="1.1.8"});var rg=Xe(function(tI,ig){ig.exports={graphlib:Mn(),layout:Km(),debug:eg(),util:{time:Mt().time,notime:Mt().notime},version:ng()}});var Kl=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"}]];var Jl=[["path",{d:"M2 12 7 2"}],["path",{d:"m7 12 5-10"}],["path",{d:"m12 12 5-10"}],["path",{d:"m17 12 5-10"}],["path",{d:"M4.5 7h15"}],["path",{d:"M12 16v6"}]];var Ql=[["path",{d:"M8 3 4 7l4 4"}],["path",{d:"M4 7h16"}],["path",{d:"m16 21 4-4-4-4"}],["path",{d:"M20 17H4"}]];var ec=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"}]];var tc=[["path",{d:"M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"}],["rect",{x:"14",y:"2",width:"8",height:"8",rx:"1"}]];var nc=[["path",{d:"M12 8V4H8"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2"}],["path",{d:"M2 14h2"}],["path",{d:"M20 14h2"}],["path",{d:"M15 13v2"}],["path",{d:"M9 13v2"}]];var cs=[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}],["path",{d:"m3.3 7 8.7 5 8.7-5"}],["path",{d:"M12 22V12"}]];var ic=[["path",{d:"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"}],["path",{d:"m7 16.5-4.74-2.85"}],["path",{d:"m7 16.5 5-3"}],["path",{d:"M7 16.5v5.17"}],["path",{d:"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"}],["path",{d:"m17 16.5-5-3"}],["path",{d:"m17 16.5 4.74-2.85"}],["path",{d:"M17 16.5v5.17"}],["path",{d:"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"}],["path",{d:"M12 8 7.26 5.15"}],["path",{d:"m12 8 4.74-2.85"}],["path",{d:"M12 13.5V8"}]];var rc=[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"}],["path",{d:"M9 13a4.5 4.5 0 0 0 3-4"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516"}],["path",{d:"M12 13h4"}],["path",{d:"M12 18h6a2 2 0 0 1 2 2v1"}],["path",{d:"M12 8h8"}],["path",{d:"M16 8V5a2 2 0 0 1 2-2"}],["circle",{cx:"16",cy:"13",r:".5"}],["circle",{cx:"18",cy:"3",r:".5"}],["circle",{cx:"20",cy:"21",r:".5"}],["circle",{cx:"20",cy:"8",r:".5"}]];var sc=[["path",{d:"M16 3v2.107"}],["path",{d:"M17 9c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 22 17a5 5 0 0 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C13 11.5 16 9 17 9"}],["path",{d:"M21 8.274V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.938"}],["path",{d:"M3 15h5.253"}],["path",{d:"M3 9h8.228"}],["path",{d:"M8 15v6"}],["path",{d:"M8 3v6"}]];var ac=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M12 9v6"}],["path",{d:"M16 15v6"}],["path",{d:"M16 3v6"}],["path",{d:"M3 15h18"}],["path",{d:"M3 9h18"}],["path",{d:"M8 15v6"}],["path",{d:"M8 3v6"}]];var oc=[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"}],["path",{d:"M10 6h4"}],["path",{d:"M10 10h4"}],["path",{d:"M10 14h4"}],["path",{d:"M10 18h4"}]];var lc=[["path",{d:"M20 6 9 17l-5-5"}]];var cc=[["path",{d:"M12 6v6l4 2"}],["circle",{cx:"12",cy:"12",r:"10"}]];var dc=[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"}]];var xr=[["path",{d:"m16 18 6-6-6-6"}],["path",{d:"m8 6-6 6 6 6"}]];var La=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M12 3v18"}]];var hc=[["path",{d:"M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z"}],["path",{d:"M10 21.9V14L2.1 9.1"}],["path",{d:"m10 14 11.9-6.9"}],["path",{d:"M14 19.8v-8.1"}],["path",{d:"M18 17.5V9.4"}]];var uc=[["path",{d:"M12 20v2"}],["path",{d:"M12 2v2"}],["path",{d:"M17 20v2"}],["path",{d:"M17 2v2"}],["path",{d:"M2 12h2"}],["path",{d:"M2 17h2"}],["path",{d:"M2 7h2"}],["path",{d:"M20 12h2"}],["path",{d:"M20 17h2"}],["path",{d:"M20 7h2"}],["path",{d:"M7 20v2"}],["path",{d:"M7 2v2"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1"}]];var fc=[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10"}]];var pc=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5"}],["path",{d:"M3 12A9 3 0 0 0 21 12"}]];var mc=[["path",{d:"M11 20H2"}],["path",{d:"M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z"}],["path",{d:"M11 4H8a2 2 0 0 0-2 2v14"}],["path",{d:"M14 12h.01"}],["path",{d:"M22 20h-3"}]];var gc=[["path",{d:"M12 16h.01"}],["path",{d:"M16 16h.01"}],["path",{d:"M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"}],["path",{d:"M8 16h.01"}]];var xc=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M12 18v-6"}],["path",{d:"m9 15 3 3 3-3"}]];var vc=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M10 9H8"}],["path",{d:"M16 13H8"}],["path",{d:"M16 17H8"}]];var _c=[["path",{d:"M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"}],["path",{d:"M14 13.12c0 2.38 0 6.38-1 8.88"}],["path",{d:"M17.29 21.02c.12-.6.43-2.3.5-3.02"}],["path",{d:"M2 12a10 10 0 0 1 18-6"}],["path",{d:"M2 16h.01"}],["path",{d:"M21.8 16c.2-2 .131-5.354 0-6"}],["path",{d:"M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"}],["path",{d:"M8.65 22c.21-.66.45-1.32.57-2"}],["path",{d:"M9 6.8a6 6 0 0 1 9 5.2v2"}]];var Da=[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"}]];var yc=[["path",{d:"m12 14 4-4"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0"}]];var bc=[["line",{x1:"6",x2:"6",y1:"3",y2:"15"}],["circle",{cx:"18",cy:"6",r:"3"}],["circle",{cx:"6",cy:"18",r:"3"}],["path",{d:"M18 9a9 9 0 0 1-9 9"}]];var Sc=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],["path",{d:"M2 12h20"}]];var ds=[["path",{d:"m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9"}],["path",{d:"m18 15 4-4"}],["path",{d:"m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"}]];var wc=[["line",{x1:"22",x2:"2",y1:"12",y2:"12"}],["path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"}],["line",{x1:"6",x2:"6.01",y1:"16",y2:"16"}],["line",{x1:"10",x2:"10.01",y1:"16",y2:"16"}]];var Mc=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["circle",{cx:"9",cy:"9",r:"2"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"}]];var Ec=[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor"}]];var Tc=[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"}],["path",{d:"m21 2-9.6 9.6"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5"}]];var ka=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"}]];var Ac=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1"}]];var Na=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}]];var Cc=[["line",{x1:"2",x2:"5",y1:"12",y2:"12"}],["line",{x1:"19",x2:"22",y1:"12",y2:"12"}],["line",{x1:"12",x2:"12",y1:"2",y2:"5"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22"}],["circle",{cx:"12",cy:"12",r:"7"}],["circle",{cx:"12",cy:"12",r:"3"}]];var Rc=[["circle",{cx:"12",cy:"16",r:"1"}],["rect",{x:"3",y:"10",width:"18",height:"12",rx:"2"}],["path",{d:"M7 10V7a5 5 0 0 1 10 0v3"}]];var Pc=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4"}]];var Ic=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}]];var Lc=[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3"}]];var Dc=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"}]];var kc=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21"}]];var Nc=[["path",{d:"M12 2v20"}],["path",{d:"m15 19-3 3-3-3"}],["path",{d:"m19 9 3 3-3 3"}],["path",{d:"M2 12h20"}],["path",{d:"m5 9-3 3 3 3"}],["path",{d:"m9 5 3-3 3 3"}]];var Uc=[["rect",{x:"16",y:"16",width:"6",height:"6",rx:"1"}],["rect",{x:"2",y:"16",width:"6",height:"6",rx:"1"}],["rect",{x:"9",y:"2",width:"6",height:"6",rx:"1"}],["path",{d:"M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"}],["path",{d:"M12 12V8"}]];var Fc=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"}],["path",{d:"M12 22V12"}],["polyline",{points:"3.29 7 12 12 20.71 7"}],["path",{d:"m7.5 4.27 9 5.15"}]];var Oc=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1"}]];var Bc=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];var zc=[["path",{d:"M19.07 4.93A10 10 0 0 0 6.99 3.34"}],["path",{d:"M4 6h.01"}],["path",{d:"M2.29 9.62A10 10 0 1 0 21.31 8.35"}],["path",{d:"M16.24 7.76A6 6 0 1 0 8.23 16.67"}],["path",{d:"M12 18h.01"}],["path",{d:"M17.99 11.66A6 6 0 0 1 15.77 16.67"}],["circle",{cx:"12",cy:"12",r:"2"}],["path",{d:"m13.41 10.59 5.66-5.66"}]];var Hc=[["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"}],["path",{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"}],["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"}]];var Gc=[["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2"}],["path",{d:"M6.01 18H6"}],["path",{d:"M10.01 18H10"}],["path",{d:"M15 10v4"}],["path",{d:"M17.84 7.17a4 4 0 0 0-5.66 0"}],["path",{d:"M20.66 4.34a8 8 0 0 0-11.31 0"}]];var Vc=[["path",{d:"m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"}],["path",{d:"m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"}],["path",{d:"M7 21h10"}],["path",{d:"M12 3v18"}],["path",{d:"M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"}]];var Wc=[["path",{d:"M15 12h-5"}],["path",{d:"M15 8h-5"}],["path",{d:"M19 17V5a2 2 0 0 0-2-2H4"}],["path",{d:"M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"}]];var $c=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];var Ua=[["rect",{width:"20",height:"8",x:"2",y:"2",rx:"2",ry:"2"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",ry:"2"}],["line",{x1:"6",x2:"6.01",y1:"6",y2:"6"}],["line",{x1:"6",x2:"6.01",y1:"18",y2:"18"}]];var qc=[["circle",{cx:"18",cy:"5",r:"3"}],["circle",{cx:"6",cy:"12",r:"3"}],["circle",{cx:"18",cy:"19",r:"3"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49"}]];var Xc=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"M12 8v4"}],["path",{d:"M12 16h.01"}]];var Yc=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m9 12 2 2 4-4"}]];var jc=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}]];var Zc=[["path",{d:"M12 13v8"}],["path",{d:"M12 3v3"}],["path",{d:"M18 6a2 2 0 0 1 1.387.56l2.307 2.22a1 1 0 0 1 0 1.44l-2.307 2.22A2 2 0 0 1 18 13H6a2 2 0 0 1-1.387-.56l-2.306-2.22a1 1 0 0 1 0-1.44l2.306-2.22A2 2 0 0 1 6 6z"}]];var Kc=[["path",{d:"M7 18v-6a5 5 0 1 1 10 0v6"}],["path",{d:"M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z"}],["path",{d:"M21 12h1"}],["path",{d:"M18.5 4.5 18 5"}],["path",{d:"M2 12h1"}],["path",{d:"M12 2v1"}],["path",{d:"m4.929 4.929.707.707"}],["path",{d:"M12 12v6"}]];var Jc=[["path",{d:"M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z"}],["path",{d:"M3 20V4"}]];var Qc=[["path",{d:"M21 4v16"}],["path",{d:"M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"}]];var hs=[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2"}],["path",{d:"M12 18h.01"}]];var ed=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}]];var td=[["path",{d:"M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5"}],["path",{d:"M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244"}],["path",{d:"M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05"}]];var nd=[["path",{d:"M12 19h8"}],["path",{d:"m4 17 6-6-6-6"}]];var id=[["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"}],["path",{d:"M15 18H9"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"}],["circle",{cx:"17",cy:"18",r:"2"}],["circle",{cx:"7",cy:"18",r:"2"}]];var rd=[["path",{d:"M9 14 4 9l5-5"}],["path",{d:"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"}]];var sd=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]];var ad=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}],["circle",{cx:"9",cy:"7",r:"4"}]];var Fa=[["path",{d:"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"}],["rect",{x:"2",y:"6",width:"14",height:"12",rx:"2"}]];var od=[["path",{d:"M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11"}],["path",{d:"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z"}],["path",{d:"M6 13h12"}],["path",{d:"M6 17h12"}]];var ld=[["path",{d:"M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2"}],["path",{d:"m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06"}],["path",{d:"m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8"}]];var us=[["rect",{width:"8",height:"8",x:"3",y:"3",rx:"2"}],["path",{d:"M7 11v4a2 2 0 0 0 2 2h4"}],["rect",{width:"8",height:"8",x:"13",y:"13",rx:"2"}]];var fs=[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"}]];var cd=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"}]];var dd={id:"outage",name:"Outage",states:[{id:"healthy",label:"Healthy",tone:"ok",reject:0,emits:!0},{id:"degraded",label:"Degraded",tone:"warn",reject:0.25,emits:!0},{id:"overloaded",label:"Overloaded",tone:"hot",reject:0.6,emits:!0},{id:"failed",label:"Failed",tone:"down",reject:1,emits:!1},{id:"recovering",label:"Recovering",tone:"mend",reject:0.15,emits:!0},{id:"offline",label:"Offline",tone:"idle",reject:1,emits:!1}],aliases:{heals:"healthy",healed:"healthy",restored:"healthy",up:"healthy",ok:"healthy",degrades:"degraded",overloads:"overloaded",fails:"failed",down:"failed",dies:"failed",recovers:"recovering"}},Af={id:"spread",name:"Spread",states:[{id:"susceptible",label:"Susceptible",tone:"idle",reject:0,emits:!1},{id:"exposed",label:"Exposed",tone:"warn",reject:0,emits:!1},{id:"infected",label:"Infected",tone:"down",reject:0,emits:!0},{id:"recovered",label:"Recovered",tone:"ok",reject:1,emits:!1}],aliases:{catches:"infected",recovers:"recovered"}},Cf={id:"plain",name:"Plain",states:[{id:"idle",label:"Idle",tone:"idle",reject:0,emits:!0},{id:"active",label:"Active",tone:"ok",reject:0,emits:!0},{id:"waiting",label:"Waiting",tone:"warn",reject:0,emits:!0},{id:"blocked",label:"Blocked",tone:"down",reject:1,emits:!1},{id:"done",label:"Done",tone:"mend",reject:0,emits:!1}],aliases:{starts:"active",waits:"waiting",blocks:"blocked",finishes:"done"}},Rf={id:"agents",name:"Agents",states:[{id:"idle",label:"Idle",tone:"idle",reject:0,emits:!0},{id:"thinking",label:"Thinking",tone:"hot",reject:0,emits:!0},{id:"waiting",label:"Waiting",tone:"warn",reject:0,emits:!0},{id:"working",label:"Working",tone:"mend",reject:0,emits:!0},{id:"done",label:"Done",tone:"ok",reject:0,emits:!0},{id:"failed",label:"Failed",tone:"down",reject:1,emits:!1}],aliases:{thinks:"thinking",waits:"waiting",works:"working",runs:"working",finishes:"done",fails:"failed",idles:"idle",rests:"idle"}},ps={[dd.id]:dd,[Rf.id]:Rf,[Af.id]:Af,[Cf.id]:Cf},hd=dd.id,Oa=["ok","warn","hot","down","mend","idle"],Ba={ok:0,idle:0,mend:1,warn:2,hot:3,down:4},ms=["flowing","slow","dropping","cut"],Pf={flows:"flowing",restored:"flowing",open:"flowing",slows:"slow",drops:"dropping",lossy:"dropping",cuts:"cut",severed:"cut",down:"cut",fails:"cut",failed:"cut"};function Ct(e,t){let n=0,i=e.length-1;while(n<i){let r=n+i+1>>1;if(e[r].t<=t)n=r;else i=r-1}return e[n]}function vr(e,t){let n=0,i=e.length-1;while(n<i){let r=n+i+1>>1;if(e[r].t<=t)n=r;else i=r-1}return n}function gs(e,t){let n=-1;for(let i=0;i<e.length;i++)if(e[i].t<=t+0.000001)n=i;else break;return n}function xs(e,t,n){let i=e.packets,r=0,s=i.length;while(r<s){let a=r+s>>1;if(i[a].depart<=t)r=a+1;else s=a}for(let a=r-1;a>=0;a--){let o=i[a];if(t-o.depart>30)break;if(o.end>=t)n(o)}}function ud(e){let t=new Set([0]);for(let n of e.beats)if(!n.derived)t.add(If(n.t));for(let n of e.scene.chapters)t.add(If(n.t));return[...t].filter((n)=>n<=e.duration).sort((n,i)=>n-i)}function vs(e,t,n=6){let i=new Map;for(let r of e){if(r.t>t)break;if(!r.note)continue;i.set(`${r.target.kind}:${r.target.id}`,r)}return[...i.values()].filter((r)=>t-r.t<=n)}function If(e){return Math.round(e*1000)/1000}function wn(e){let t=Math.max(0,Math.floor(e));return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}var ei=0.25,fd=3,Vv=0.4,Wv=2,pd=(e,t,n)=>Math.min(n,Math.max(t,e));function Lf(e){let{nodes:t,edges:n,states:i,duration:r}=e,s=Math.max(1,Math.ceil(r/ei)+1),a=new Map(t.map((E,D)=>[E.id,D])),o=t.length,l=t.map(()=>!1);for(let E of n)l[a.get(E.to)]=!0;let c=new Float64Array(o),d=new Float64Array(o),h=new Float64Array(o).fill(1),u=t.map(()=>null),p=new Int32Array(o),g=t.map(()=>null),x=new Map;for(let E of t){if(!E.capacity)continue;let D=E.capacity[0].value;x.set(E.id,{capacity:D,load:new Float32Array(s),queue:new Float32Array(s),rejected:new Float32Array(s),queueLimit:D*fd,capacityAt:E.capacity.length>1?new Float32Array(s):void 0})}let m=new Map(t.map((E)=>[E.id,[]])),f=new Map(n.map((E)=>[E.id,[]])),w=[],S=Math.max(1,...n.flatMap((E)=>E.segments.map((D)=>D.rate)))/40,R=new Float64Array(o),T=new Float64Array(o);for(let E=0;E<s;E++){let D=E*ei,y=t.map((_)=>i.get(Ct(_.segments,D).state));R.fill(0),T.fill(0);for(let _ of n){let A=Ct(_.segments,D),F=a.get(_.from),q=a.get(_.to);T[q]+=A.rate;let B=0;if(A.state!=="cut"&&y[F]?.emits!==!1)B=A.rate*h[F]*(1+_.retries*d[q]);R[q]+=A.state==="dropping"?B*Vv:B;let ee=Math.round(B/S)*S,j=f.get(_.id),ae=j[j.length-1];if(!ae||ae.state!==A.state||ae.rate!==ee)j.push({t:D,state:A.state,rate:ee})}for(let _=0;_<o;_++){let A=t[_],F=y[_],q=F?.reject??0,B=Ba[F?.tone??"idle"]===0&&q<1,ee=R[_],j=null,ae;if(A.capacity){let N=x.get(A.id),ne=Ct(A.capacity,D).value;if(N.capacityAt)N.capacityAt[E]=ne;N.queueLimit=Math.max(N.queueLimit,ne*fd);let Y=ne*fd,le=ne*(1-q),pe=c[_],L=pe+(ee-le)*ei,X=0;if(le<=0)L=0,X=ee>0?1:0;else{if(L<0)L=0;if(L>Y)X=ee>0?pd((L-Y)/(ee*ei),0,1):0,L=Y}let ie=le<=0?0:Math.max(0,(pe+ee*ei*(1-X)-L)/ei);if(c[_]=L,d[_]=X,h[_]=T[_]>0?pd(ie/T[_],0,3):1,N.load[E]=ee,N.queue[E]=L,N.rejected[E]=X,X>0.02)j=e.overloadState;else if(L>Y*0.2||ee>ne*0.88)j=e.strainState;if(B)ae=Math.round(X*10)/10}else d[_]=q,h[_]=l[_]&&T[_]>0?pd(ee*(1-q)/T[_],0,3):1;if(j===u[_])p[_]++;else u[_]=j,p[_]=1;if(p[_]>=Wv||E===0)g[_]=u[_];let W=Ct(A.segments,D).state,me=B&&g[_]!==null,fe=me?g[_]:W,Ae=m.get(A.id),Se=Ae[Ae.length-1];if(!Se||Se.state!==fe||Se.reject!==ae){if(Se&&Se.state!==fe&&(me||Se.derived))w.push({t:D,node:A.id,state:fe});Ae.push({t:D,state:fe,derived:me,...ae!==void 0?{reject:ae}:{}})}}}return{nodeSegments:m,edgeSegments:f,flows:x,changes:w}}var Ld=Gv(rg(),1),Ni=140,ag=82,Yb=50,jb=110,Za=36,_r=24,Zb=16,sg=14;function Kb(e,t,n,i,r){let s=r*r,a=s*r,o=(l,c,d,h)=>0.5*(2*c+(d-l)*r+(2*l-5*c+4*d-h)*s+(3*c-l-3*d+h)*a);return{x:o(e.x,t.x,n.x,i.x),y:o(e.y,t.y,n.y,i.y)}}function Jb(e){if(e.length<3)return e;let t=[e[0]];for(let n=0;n<e.length-1;n++){let i=e[Math.max(0,n-1)],r=e[n],s=e[n+1],a=e[Math.min(e.length-1,n+2)];for(let o=1;o<=sg;o++)t.push(Kb(i,r,s,a,o/sg))}return t}function Dd(e){let t=[0];for(let n=1;n<e.length;n++)t.push(t[n-1]+Math.hypot(e[n].x-e[n-1].x,e[n].y-e[n-1].y));return{lengths:t,length:t[t.length-1]}}function In(e,t,n){let i=t[t.length-1],r=Math.min(Math.max(n,0),i),s=0,a=t.length-1;while(a-s>1){let c=s+a>>1;if(t[c]<=r)s=c;else a=c}let o=t[a]-t[s]||1,l=(r-t[s])/o;return{x:e[s].x+(e[a].x-e[s].x)*l,y:e[s].y+(e[a].y-e[s].y)*l}}function Qb(e,t){let{lengths:n,length:i}=Dd(e);if(i<=t*2+8)return e;let r=t,s=i-t,a=[In(e,n,r)];for(let o=0;o<e.length;o++)if(n[o]>r&&n[o]<s)a.push(e[o]);return a.push(In(e,n,s)),a}function eS(e,t){return e.map((n,i)=>{let r=e[Math.max(0,i-1)],s=e[Math.min(e.length-1,i+1)],a=s.x-r.x,o=s.y-r.y,l=Math.hypot(a,o)||1;return{x:n.x+-o/l*t,y:n.y+a/l*t}})}function og(e){let t=new Ld.default.graphlib.Graph({compound:!0});t.setGraph({rankdir:e.direction==="down"?"TB":"LR",nodesep:Yb,ranksep:jb,marginx:_r,marginy:_r}),t.setDefaultEdgeLabel(()=>({}));for(let f of e.groups)t.setNode(`group:${f.id}`,{});for(let f of e.nodes)if(t.setNode(f.id,{width:Ni,height:Ni}),f.group)t.setParent(f.id,`group:${f.group}`);let n=new Set(e.edges.map((f)=>f.id)),i=new Set;for(let f of e.edges){if(i.has(`${f.to}->${f.from}`))continue;i.add(f.id),t.setEdge(f.from,f.to)}Ld.default.layout(t);let r=new Map,s=new Set;for(let f of e.nodes){let w=t.node(f.id);if(f.x!==void 0&&f.y!==void 0)s.add(f.id),r.set(f.id,{x:f.x,y:f.y,width:Ni,height:Ni});else r.set(f.id,{x:w.x,y:w.y,width:Ni,height:Ni})}let a=new Map;for(let f of e.groups){let w=e.nodes.filter((E)=>E.group===f.id).map((E)=>r.get(E.id));if(!w.length)continue;let v=Math.min(...w.map((E)=>E.x-E.width/2))-Za,S=Math.max(...w.map((E)=>E.x+E.width/2))+Za,R=Math.min(...w.map((E)=>E.y-E.height/2))-Za,T=Math.max(...w.map((E)=>E.y+E.height/2))+Za;a.set(f.id,{x:(v+S)/2,y:(R+T)/2,width:S-v,height:T-R})}let o=new Map,l=new Map;for(let f of e.edges){let w=l.get(`${f.to}->${f.from}`),v;if(w)v=w.map((S)=>({...S})).reverse();else{let T=((s.has(f.from)||s.has(f.to)?void 0:t.edge(f.from,f.to))?.points??[]).slice(1,-1).map((y)=>({x:y.x,y:y.y})),E=r.get(f.from),D=r.get(f.to);v=Qb(Jb([{x:E.x,y:E.y},...T,{x:D.x,y:D.y}]),ag),l.set(f.id,v)}if(n.has(`${f.to}->${f.from}`))v=eS(v,Zb);o.set(f.id,{path:v,...Dd(v)})}let c=1/0,d=1/0,h=-1/0,u=-1/0,p=(f)=>{c=Math.min(c,f.x-f.width/2),h=Math.max(h,f.x+f.width/2),d=Math.min(d,f.y-f.height/2),u=Math.max(u,f.y+f.height/2)};if(r.forEach(p),a.forEach(p),!Number.isFinite(c))return{width:0,height:0,origin:{x:0,y:0},nodes:r,groups:a,edges:o};let g=_r-c,x=_r-d,m=(f)=>{f.x+=g,f.y+=x};return r.forEach(m),a.forEach(m),o.forEach((f)=>f.path.forEach(m)),{width:h-c+_r*2,height:u-d+_r*2,origin:{x:g,y:x},nodes:r,groups:a,edges:o}}var tS=300,lg=2.6,cg=0.45,nS=9,dg=0.8,iS=230,rS=0.16,sS=16;function aS(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let n=t;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}}function hg(e){let{segments:t,from:n,to:i,states:r,duration:s,length:a}=e,o=aS(e.seed*7919),l=[];if(a<=0)return l;let c=o();for(let d=0;d<t.length;d++){let h=t[d],u=d+1<t.length?t[d+1].t:s,p=Math.min(sS,h.rate*e.rateScale);if(p<=0)continue;let g=1/p,x=h.t+(1-c)*g;for(;x<u;x+=g){let m=(o()*2-1)*nS,f=o(),w=0.3+o()*0.4,v=o();if(h.state==="cut")continue;let S=r.get(Ct(n,x).state);if(S&&!S.emits)continue;let R=Math.max(cg,a/tS*(h.state==="slow"?lg:1));if(h.state==="dropping"&&f<0.6){let y=x+R*w;l.push({depart:x,arrive:y,end:y+0.45,fate:"drop",reach:w,lane:m});continue}let T=x+R,E=Ct(i,T),D=E.reject??r.get(E.state)?.reject??0;if(v<D)l.push({depart:x,arrive:T,end:T+R*dg,fate:"bounce",reach:1,lane:m});else l.push({depart:x,arrive:T,end:T,fate:"ok",reach:1,lane:m})}c=(u-(x-g))/g,c-=Math.floor(c)}for(let d of e.pulses)for(let h=0;h<d.count;h++){let u=d.t+h*rS;if(u>=s)break;let p=Ct(t,u);if(p.state==="cut")continue;let g=Math.max(cg,a/iS*(p.state==="slow"?lg:1)),x=u+g,m=Ct(i,x),f=m.reject??r.get(m.state)?.reject??0;if(f>=1||o()<f)l.push({depart:u,arrive:x,end:x+g*dg,fate:"bounce",reach:1,lane:0,message:!0});else l.push({depart:u,arrive:x,end:x,fate:"ok",reach:1,lane:0,message:!0})}if(e.pulses.length)l.sort((d,h)=>d.depart-h.depart);return l}var oS=4,lS=6,cS=10,dS=4000,kd=1.5,hS=9,bs=new Map;function uS(e){let t=JSON.stringify([e.direction,e.groups.map((i)=>i.id),e.nodes.map((i)=>[i.id,i.group??"",i.x??"",i.y??""]),e.edges.map((i)=>i.id)]),n=bs.get(t);if(!n){if(n=og(e),bs.size>=12)bs.delete(bs.keys().next().value);bs.set(t,n)}return n}function Nd(e,t={}){let n=new Map(e.states.map((N)=>[N.id,N])),i=(N)=>Ba[n.get(N)?.tone??"idle"],r=(...N)=>{for(let ne of N){let Y=e.states.find((le)=>le.tone===ne);if(Y)return Y.id}return},s=e.states[0].id,a=r("down")??e.states[e.states.length-1].id,o=r("warn","hot")??a,l=r("hot","warn")??a,c=new Map(e.edges.map((N)=>[N.id,N.rate])),d=new Map(e.nodes.map((N)=>[N.id,N.capacity]));for(let N of e.sliders){let ne=t.sliders?.[N.id],Y=Math.min(N.max,Math.max(N.min,ne??N.value));if(N.property==="rate")c.set(N.target.id,Y);else d.set(N.target.id,Y)}let h=new Map(e.nodes.map((N)=>[N.id,[]])),u=new Map(e.nodes.map((N)=>[N.id,[]]));for(let N of e.edges)h.get(N.from).push(N.to),u.get(N.to).push(N.from);let p=new Map(e.groups.map((N)=>[N.id,[]]));for(let N of e.nodes)if(N.group)p.get(N.group)?.push(N.id);let g=new Map(e.nodes.map((N)=>[N.id,[{t:0,state:N.state,derived:!1}]])),x=new Map(e.nodes.map((N)=>[N.id,N.state])),m=new Map(x),f=[],w=new Map([...e.nodes.map((N)=>[N.id,N.label]),...e.groups.map((N)=>[N.id,N.label])]),v=e.rules.length?[]:[{when:a,then:o,after:kd,toward:"dependents",line:0},{when:o,then:o,after:kd,toward:"dependents",line:0},{when:s,then:s,after:kd,toward:"dependents",line:0}],S=0,R=[],T=(N)=>{R.push({...N,seq:S++})},E=new Map;for(let N of e.events){if(N.target.kind==="edge")continue;let ne=N.target.kind==="group"?p.get(N.target.id)??[]:[N.target.id];if(N.capacity!==void 0)for(let Y of ne){if(!d.get(Y))continue;if(!E.has(Y))E.set(Y,[]);E.get(Y).push({t:N.t,value:N.capacity})}if(f.push({t:N.t,target:N.target,targetLabel:w.get(N.target.id)??N.target.id,state:N.state,note:N.note??(N.capacity!==void 0&&!N.state?`Capacity set to ${N.capacity} per second`:void 0),log:N.log,derived:!1}),!N.state)continue;for(let Y of ne)T({t:N.t,node:Y,state:N.state,derived:!1,sandbox:!1})}let D=-1;for(let N of t.interventions??[]){if(!x.has(N.node))continue;let ne=N.action==="break"?a:s;D=Math.max(D,N.t),f.push({t:N.t,target:{kind:"node",id:N.node},targetLabel:w.get(N.node)??N.node,state:ne,note:N.action==="break"?"You broke this":"You fixed this",derived:!1}),T({t:N.t,node:N.node,state:ne,derived:!1,sandbox:!0})}let y=0;while(R.length){let N=0;for(let X=1;X<R.length;X++)if(R[X].t<R[N].t||R[X].t===R[N].t&&R[X].seq<R[N].seq)N=X;let ne=R.splice(N,1)[0],Y=x.get(ne.node);if(ne.derived&&ne.toward==="self"){if(Y!==ne.expect)continue}else if(ne.derived&&ne.toward==="targets"){if(Y!==m.get(ne.node))continue}else if(ne.derived){if(i(ne.state)===0){if(i(Y)===0)continue;if(h.get(ne.node).some((ie)=>i(x.get(ie))>0))continue}else if(i(ne.state)<=i(Y))continue}if(ne.derived)f.push({t:ne.t,target:{kind:"node",id:ne.node},targetLabel:w.get(ne.node)??ne.node,state:ne.state,derived:!0});if(ne.state===Y)continue;x.set(ne.node,ne.state);let le=g.get(ne.node);if(le[le.length-1].t===ne.t)le[le.length-1]={t:ne.t,state:ne.state,derived:ne.derived};else le.push({t:ne.t,state:ne.state,derived:ne.derived});let L=ne.sandbox&&v.length?v:e.rules;for(let X of L){if(X.when!==ne.state)continue;let ie=X.toward==="self"?[ne.node]:(X.toward==="targets"?h:u).get(ne.node);for(let Pe of ie){if(y++>=dS)break;T({t:ne.t+X.after,node:Pe,state:X.then,derived:!0,sandbox:ne.sandbox,toward:X.toward,expect:X.when})}}}let _=new Map(e.edges.map((N)=>[N.id,[{t:0,state:N.state,rate:c.get(N.id)}]])),A=new Map(e.edges.map((N)=>[N.id,`${w.get(N.from)} to ${w.get(N.to)}`])),F=new Map;for(let N of e.events){if(N.target.kind!=="edge")continue;if(N.send){if(!F.has(N.target.id))F.set(N.target.id,[]);F.get(N.target.id).push({t:N.t,count:N.send})}f.push({t:N.t,target:N.target,targetLabel:A.get(N.target.id)??N.target.id,state:N.state,note:N.note,derived:!1,sent:Boolean(N.send),log:N.log});let ne=_.get(N.target.id),Y=ne[ne.length-1],le={t:N.t,state:N.state??Y.state,rate:N.rateFactor!==void 0?c.get(N.target.id)*N.rateFactor:N.rate??Y.rate};if(le.state===Y.state&&le.rate===Y.rate)continue;if(Y.t===N.t)ne[ne.length-1]=le;else ne.push(le)}let q=Math.max(0,...f.map((N)=>N.t),...e.chapters.map((N)=>N.t)),B=Math.max(e.duration??q+oS,q+0.5,D>=0?D+cS:0,lS),ee=Math.max(1,...[..._.values()].flatMap((N)=>N.map((ne)=>ne.rate)),...e.sliders.filter((N)=>N.property==="rate").map((N)=>N.max)),j=Math.min(1,hS/ee),ae=new Map;if([...d.values()].some(Boolean)){let N=Lf({nodes:e.nodes.map((ne)=>{let Y=d.get(ne.id);if(!Y)return{id:ne.id,segments:g.get(ne.id)};let le=[{t:0,value:Y}];for(let pe of E.get(ne.id)??[])if(pe.t<=0)le[0].value=pe.value;else le.push(pe);return{id:ne.id,capacity:le,segments:g.get(ne.id)}}),edges:e.edges.map((ne)=>({id:ne.id,from:ne.from,to:ne.to,retries:ne.retries??e.retries,segments:_.get(ne.id)})),states:n,duration:B,overloadState:l,strainState:o});ae=N.flows,_=N.edgeSegments,g=new Map(e.nodes.map((ne)=>[ne.id,d.get(ne.id)?N.nodeSegments.get(ne.id):g.get(ne.id)]));for(let ne of N.changes)f.push({t:ne.t,target:{kind:"node",id:ne.node},targetLabel:w.get(ne.node)??ne.node,state:ne.state,derived:!0})}f.sort((N,ne)=>N.t-ne.t);let W=uS(e),me=e.nodes.map((N)=>({...N,capacity:d.get(N.id),box:W.nodes.get(N.id),segments:g.get(N.id),dependsOn:h.get(N.id),dependents:u.get(N.id),flow:ae.get(N.id)})),fe=new Map(me.map((N)=>[N.id,N])),Ae=e.groups.filter((N)=>W.groups.has(N.id)).map((N)=>({...N,box:W.groups.get(N.id),members:p.get(N.id)})),Se=e.edges.map((N,ne)=>{let Y=W.edges.get(N.id),le=_.get(N.id);return{...N,rate:c.get(N.id),...Y,segments:le,packets:hg({seed:ne+1,length:Y.length,duration:B,rateScale:j,pulses:F.get(N.id)??[],segments:le,from:fe.get(N.from).segments,to:fe.get(N.to).segments,states:n})}});return{scene:e,width:W.width,height:W.height,origin:W.origin,duration:B,nodes:me,groups:Ae,edges:Se,beats:f,states:n,flowStep:ei,breakState:a,fixState:s}}var xi=0.5,fS=2.5;function pS(e){let t=2166136261;for(let n=0;n<e.length;n++)t=Math.imul(t^e.charCodeAt(n),16777619);return t>>>0}var Ss=(e,t)=>e[pS(t)%e.length],mS={ok:"info",idle:"info",mend:"info",warn:"warn",hot:"warn",down:"error"};function gS(e,t,n){let i=t.toLowerCase();switch(e){case"down":return Ss([`health check failed, marking ${i}`,`unrecoverable error, state is now ${i}`,`process exited, status ${i}`],n);case"hot":return Ss([`resource saturation, state is now ${i}`,`latency above threshold, ${i}`,`worker pool exhausted, ${i}`],n);case"warn":return Ss([`elevated error rate, state is now ${i}`,`responses slowing, ${i}`,`retrying upstream calls, ${i}`],n);case"mend":return Ss([`starting up, ${i}`,`warming caches, ${i}`,`reconnecting, ${i}`],n);case"ok":return Ss([`health check passed, ${i}`,`ready to serve, ${i}`,`all checks green, ${i}`],n);default:return`state is now ${i}`}}function Ud(e){let t=new Map(e.nodes.map((x)=>[x.id,x.label])),n=(x)=>e.states.get(x),i=[],r=(x)=>i.push(x),s=new Set(e.beats.filter((x)=>x.log).map((x)=>`${x.target.id}@${Math.round(x.t*20)}`)),a=e.scene.kit==="outage";for(let x of e.beats){if(x.log&&x.note){let w=x.target.kind==="edge"?x.target.id.split("->")[0]:x.target.id;r({t:x.t,level:x.log,source:w,sourceLabel:t.get(w)??x.targetLabel,message:x.note,authored:!0});continue}if(x.target.kind==="edge"){let[w,v]=x.target.id.split("->"),S=t.get(v)??v,R=t.get(w)??w;if(x.sent)r({t:x.t,level:"debug",source:w,sourceLabel:R,message:`sent to ${S}${x.note?`: ${x.note}`:""}`,authored:!1});else if(x.state==="cut")r({t:x.t,level:"error",source:w,sourceLabel:R,message:`connection to ${S} refused${x.note?`: ${x.note}`:""}`,authored:!1});else if(x.state==="dropping")r({t:x.t,level:"warn",source:w,sourceLabel:R,message:`packet loss to ${S}`,authored:!1});else if(x.state==="slow")r({t:x.t,level:"warn",source:w,sourceLabel:R,message:`slow responses from ${S}`,authored:!1});else if(x.state==="flowing")r({t:x.t,level:"info",source:w,sourceLabel:R,message:`connection to ${S} restored`,authored:!1});else if(x.note)r({t:x.t,level:"info",source:w,sourceLabel:R,message:x.note,authored:!1});continue}if(x.target.kind==="group")continue;let m=x.target.id,f=x.state?n(x.state):void 0;if(f&&!x.note&&s.has(`${m}@${Math.round(x.t*20)}`))continue;if(f){let w=f.tone;r({t:x.t,level:mS[w],source:m,sourceLabel:t.get(m)??m,message:x.note??(a?gS(w,f.label,`${m}:${x.t}`):`now ${f.label.toLowerCase()}`),authored:Boolean(x.note)})}else if(x.note)r({t:x.t,level:"info",source:m,sourceLabel:t.get(m)??m,message:x.note,authored:!0})}let o=Math.max(1,Math.ceil(e.duration/xi)),l=new Float32Array(o),c=new Float32Array(o);for(let x of e.edges)for(let m of x.packets){let f=Math.min(o-1,Math.floor(m.depart/xi));if(l[f]+=1/xi,m.fate!=="ok")c[Math.min(o-1,Math.floor(m.arrive/xi))]+=1/xi}let d=new Float32Array(o);for(let x=0;x<o;x++)d[x]=l[x]>0?Math.min(100,c[x]/l[x]*100):0;let h=[{id:"requests",label:"Requests",unit:"/s",values:l,tone:"mend"},{id:"errors",label:"Errors",unit:"/s",values:c,tone:"down"},{id:"error-rate",label:"Error rate",unit:"%",values:d,tone:"hot"}],u=[],p=e.flowStep;for(let x of e.nodes){let m=x.flow;if(!m)continue;let f=new Float32Array(o),w=new Float32Array(o);for(let R=0;R<o;R++){let T=Math.min(m.load.length-1,Math.round(R*xi/p)),E=m.capacityAt?m.capacityAt[T]:m.capacity;f[R]=m.load[T],w[R]=E>0?m.queue[T]/E*1000:0}u.push({id:`${x.id}:load`,label:`${x.label} load`,unit:"/s",values:f,limit:m.capacity,tone:"ok"}),u.push({id:`${x.id}:wait`,label:`${x.label} wait`,unit:"ms",values:w,tone:"warn"});let v=-1/0,S=!1;for(let R=0;R<m.load.length;R++){let T=R*p;if(T>e.duration)break;let E=m.rejected[R],D=m.capacityAt?m.capacityAt[R]:m.capacity;if(E>0.02&&T-v>=fS)v=T,S=!0,r({t:T,level:E>0.4?"error":"warn",source:x.id,sourceLabel:x.label,message:`queue full (${Math.round(m.queue[R])}/${Math.round(D*3)}), rejected ${Math.round(E*100)}% of ${Math.round(m.load[R])} req/s`,authored:!1});else if(S&&E<=0.02)S=!1,r({t:T,level:"info",source:x.id,sourceLabel:x.label,message:"queue draining, no longer shedding load",authored:!1})}}let g=e.nodes.map((x)=>{let m=[];for(let f=0;f<o;f++)m.push(n(Ct(x.segments,f*xi).state)?.tone??"idle");return{id:x.id,label:x.label,tones:m}});return i.sort((x,m)=>x.t-m.t),{logs:i,bucket:xi,overview:h,services:u,lanes:g}}var Ka={red:"#e5484d",orange:"#f76b15",amber:"#ffb224",yellow:"#f5d90a",lime:"#99d52a",green:"#30a46c",teal:"#12a594",cyan:"#05a2c2",blue:"#0090ff",indigo:"#3e63dd",violet:"#6e56cf",purple:"#8e4ec6",pink:"#d6409f",magenta:"#c8106f",brown:"#ad7f58",slate:"#8b8d98",white:"#f4f4f2",black:"#26282e"},Ja=["sans","serif","mono","rounded"],Qa=["studio","midnight","blueprint","terminal","paper"];function eo(e){let t=e.trim().toLowerCase();if(Ka[t])return Ka[t];let n=/^#?([0-9a-f])([0-9a-f])([0-9a-f])$/.exec(t);if(n)return`#${n[1]}${n[1]}${n[2]}${n[2]}${n[3]}${n[3]}`;let i=/^#?([0-9a-f]{6})$/.exec(t);return i?`#${i[1]}`:null}function Fd(e){let t=Object.entries(Ka).find(([,n])=>n===e.toLowerCase());return t?t[0]:e.toLowerCase()}var ug=(e)=>`"${e.replace(/\\/g,"\\\\").replace(/"/g,"\\\"")}"`,Od=(e)=>String(Math.round(e*1000)/1000),Bd=2;function fg(e,t){let n=new Set([...t.nodes.map((s)=>s.id),...t.groups.map((s)=>s.id)]),i=e.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"");if(!i||!/^[a-z_]/.test(i))i=`thing_${i}`.replace(/_$/,"");let r=i;for(let s=2;n.has(r);s++)r=`${i}_${s}`;return r}function zd(e,t){let n=[`node ${e.id}`,ug(e.label)];if(e.icon)n.push(`icon=${e.icon}`);if(e.color)n.push(`color=${Fd(e.color)}`);if(e.state&&e.state!==t)n.push(`state=${e.state}`);if(e.capacity)n.push(`capacity=${Od(e.capacity)}`);if(e.x!==void 0&&e.y!==void 0)n.push(`x=${Math.round(e.x)}`,`y=${Math.round(e.y)}`);return n.join(" ")}function Hd(e,t=Bd){let n=[`${e.from} -> ${e.to}`];if(e.label)n.push(ug(e.label));if(e.rate!==t)n.push(`rate=${Od(e.rate)}`);if(e.retries!==void 0)n.push(`retries=${Od(e.retries)}`);if(e.state&&e.state!=="flowing")n.push(`state=${e.state}`);return n.join(" ")}var to=(e)=>e.replace(/\r\n?/g,`
`).split(`
`),Gn=(e)=>e.join(`
`).replace(/\n{3,}/g,`

`),pg=(e)=>/^\s*/.exec(e)[0],xS=(e)=>e===void 0||!e.trim();function mg(e,t,n){let i=[...e];while(i.length&&xS(i[i.length-1]))i.pop();if(i.length&&n)i.push("");return[...i,...t,""]}function yr(e,t,n){return[...e.slice(0,t),...n,...e.slice(t)]}function br(e,t){let n=e[t.line-1]??"";return!n.includes("->")&&new RegExp(`^\\s*(node\\s+)?${t.id.replace(/[.-]/g,"\\$&")}(\\s|$)`).test(n)}function ws(e){return e.reduce((t,n)=>Math.max(t,n.line),0)}function Gd(e,t,n){let i=to(e),r=fg(n.label,t),s=zd({id:r,label:n.label.trim()||r,icon:n.icon,capacity:n.capacity,x:n.x,y:n.y}),a=t.groups.find((c)=>c.id===n.group);if(a){let c=t.nodes.filter((h)=>h.group===a.id&&br(i,h)),d=Math.max(a.line,ws(c));return{source:Gn(yr(i,d,[`  ${s}`])),id:r}}let o=t.nodes.filter((c)=>!c.group&&br(i,c));if(o.length)return{source:Gn(yr(i,ws(o),[s])),id:r};let l=t.edges.reduce((c,d)=>Math.min(c,d.line),1/0);if(Number.isFinite(l))return{source:Gn(yr(i,l-1,[s,""])),id:r};return{source:Gn(mg(i,[s],!0)),id:r}}function gg(e,t,n,i){let r=t.nodes.find((h)=>h.id===n);if(!r)return e;let s=to(e),a={id:n,label:i.label??r.label,icon:"icon"in i?i.icon:r.icon,capacity:"capacity"in i?i.capacity:r.capacity,color:"color"in i?i.color:r.color,x:"x"in i?i.x:r.x,y:"y"in i?i.y:r.y,state:r.state},o=zd(a,t.states[0]?.id);if(br(s,r))return s[r.line-1]=pg(s[r.line-1])+o,Gn(s);let l=t.nodes.filter((h)=>!h.group&&br(s,h)),c=t.edges.reduce((h,u)=>Math.min(h,u.line),1/0),d=l.length?ws(l):Number.isFinite(c)?c-1:0;return Gn(yr(s,d,l.length?[o]:[o,""]))}function Vd(e,t,n){let i=t.nodes.find((o)=>o.id===n);if(!i)return e;let r=to(e),s=r;if(br(s,i))r[i.line-1]=null;let a=new Map;for(let o of t.edges)a.set(o.line,[...a.get(o.line)??[],o]);for(let[o,l]of a){if(!l.some((h)=>h.from===n||h.to===n))continue;let c=l.filter((h)=>h.from!==n&&h.to!==n),d=pg(s[o-1]??"");r[o-1]=c.length?c.map((h)=>d+Hd(h,t.traffic?Bd:0)).join(`
`):null}for(let o of t.events)if(o.target.kind==="edge"?o.target.id.split("->").includes(n):o.target.id===n)r[o.line-1]=null;for(let o of t.sliders)if(o.target.kind==="edge"?o.target.id.split("->").includes(n):o.target.id===n)r[o.line-1]=null;return Gn(r.filter((o)=>o!==null))}function no(e,t,n){let i=e;for(let r of Object.keys(n)){let s=i===e?t:xg(i);i=gg(i,s,r,n[r])}return i}var xg=()=>{throw Error("edit.ts: the parser has not been connected")};function vg(e){xg=e}function Wd(e,t,n){if(n.from===n.to||t.edges.some((o)=>o.id===`${n.from}->${n.to}`))return e;let i=to(e),r=t.traffic?Bd:0,s=Hd({from:n.from,to:n.to,label:n.label?.trim()||void 0,rate:n.rate??r,state:"flowing"},r);if(t.edges.length)return Gn(yr(i,ws(t.edges),[s]));let a=t.nodes.filter((o)=>br(i,o));if(a.length)return Gn(yr(i,ws(a),["",s]));return Gn(mg(i,[s],!0))}var io=/^[A-Za-z_][\w.-]*$/,_g=/^(title|summary|date|kit|direction|duration|source|retries|traffic|accent|font|look)\s*:\s*(.*)$/i,vS=2,_S=["debug","info","warn","error"],yg=1e5;function $d(e){let t=[],n=0,i=()=>{let r="";n++;while(n<e.length&&e[n]!=='"'){if(e[n]==="\\"&&n+1<e.length)n++;r+=e[n++]}return n++,r};while(n<e.length){let r=e[n];if(r===" "||r==="\t"||r===",")n++;else if(r==='"')t.push({kind:"string",value:i()});else if(e.startsWith("<->",n))t.push({kind:"arrow",value:"<->"}),n+=3;else if(e.startsWith("->",n))t.push({kind:"arrow",value:"->"}),n+=2;else{let s="";while(n<e.length&&!/[\s,"]/.test(e[n])&&!e.startsWith("->",n)&&!e.startsWith("<->",n)){if(e[n]==="="&&s&&e[n+1]==='"'){n++,t.push({kind:"pair",key:s.toLowerCase(),value:i()}),s="";break}s+=e[n++]}if(!s)continue;let a=s.indexOf("=");if(a>0)t.push({kind:"pair",key:s.slice(0,a).toLowerCase(),value:s.slice(a+1)});else t.push({kind:"word",value:s})}}return t}function Ms(e){let t=e.trim().toLowerCase();if(!t)return null;let n=/^(\d+):(\d{1,2}(?:\.\d+)?)$/.exec(t);if(n)return Number(n[1])*60+Number(n[2]);if(/^\d+(\.\d+)?$/.test(t))return Number(t);let i=/^(?:(\d+(?:\.\d+)?)m(?!s))?(?:(\d+(?:\.\d+)?)s)?(?:(\d+(?:\.\d+)?)ms)?$/.exec(t);if(!i||i[1]===void 0&&i[2]===void 0&&i[3]===void 0)return null;return Number(i[1]??0)*60+Number(i[2]??0)+Number(i[3]??0)/1000}function yS(e){let t=/(https?:\/\/\S+)\s*$/.exec(e);if(!t)return null;let n=t[1],i=e.slice(0,t.index).trim();if(!i)try{i=new URL(n).hostname.replace(/^www\./,"")}catch{i=n}return{label:i,url:n}}function bS(e,t,n){let i=new Map,r=/^option\s+([A-Za-z_][\w.-]*)\s*(?:"((?:[^"\\]|\\.)*)")?\s*(.*)$/i,s=/^unless\s+([A-Za-z_][\w.-]*)\s*$/i;e.forEach((l,c)=>{let d=/^\S/.test(l)?r.exec(l.trim()):null;if(!d)return;let h=d[1],u=/\bdefault\s*=\s*(on|true|yes)\b/i.test(d[3]);i.set(h,{id:h,label:d[2]??h,defaultOn:u,enabled:t[h]??u,line:c+1})});let a=[],o=null;return e.forEach((l,c)=>{let d=/^\s/.test(l);if(!l.trim()){a.push("");return}if(!d){let u=l.trim(),p=r.exec(u),g=s.exec(u);if(p){o={keep:i.get(p[1]).enabled,indent:null},a.push("");return}if(g){let x=i.get(g[1]);if(!x)n(c+1,`"unless ${g[1]}" refers to an option that is never declared.`);o={keep:!(x?.enabled??!1),indent:null},a.push("");return}o=null,a.push(l);return}if(!o){a.push(l);return}let h=/^\s*/.exec(l)[0].length;o.indent??=h,a.push(o.keep?l.slice(Math.min(h,o.indent)):"")}),{lines:a,options:[...i.values()]}}function Sr(e,t={}){let n=[],i=(L,X)=>n.push({line:L,message:X,severity:"error"}),r=(L,X)=>n.push({line:L,message:X,severity:"warning"}),s="",a,o,l=hd,c="right",d,h=[],u=0,p=!0,g={},x=[],m=new Map,f=new Map,w=new Map,v=[],S=[],R=[],T=[],E=[],D=(L,X)=>{if(!m.has(L))m.set(L,{id:L,label:L,state:"",line:X,declared:!1});return m.get(L)},y=(L,X,ie)=>{let Pe=L[0];if(!Pe||Pe.kind!=="word"||!io.test(Pe.value)){i(X,'A node needs an id, like: node api "API server"');return}let I=Pe.value;if(f.has(I)){i(X,`"${I}" is already a group, so it cannot also be a node.`);return}if(m.get(I)?.declared)r(X,`Node "${I}" is declared twice. The later line wins.`);let J=D(I,X);if(J.declared=!0,J.line=X,ie)J.group=ie;for(let U of L.slice(1))if(U.kind==="string")J.label=U.value;else if(U.kind==="pair")if(U.key==="icon")J.icon=U.value.toLowerCase();else if(U.key==="state")E.push({id:I,word:U.value,line:X});else if(U.key==="group")J.group=U.value;else if(U.key==="label")J.label=U.value;else if(U.key==="color"||U.key==="colour"){let H=eo(U.value);if(H)J.color=H;else r(X,`Unknown colour "${U.value}". Use a name like blue or a code like #3e63dd.`)}else if(U.key==="x"||U.key==="y"){let H=Number(U.value);if(Number.isFinite(H))J[U.key]=H;else r(X,`${U.key} should be a number.`)}else if(U.key==="capacity"){let H=Number(U.value);if(Number.isFinite(H)&&H>0)J.capacity=H;else r(X,"capacity should be a positive number of requests per second.")}else r(X,`Unknown node option "${U.key}".`);else if(U.kind==="word")J.icon=U.value.toLowerCase()},_=(L,X)=>{let ie=[],Pe=[],I=0;while(I<L.length){let V=L[I];if(V.kind!=="word"||!io.test(V.value))break;ie.push(V.value);let ce=L[I+1];if(ce?.kind!=="arrow"){I++;break}Pe.push(ce.value),I+=2}if(ie.length<2||Pe.length!==ie.length-1){i(X,"A connection needs a thing on both sides, like: api -> db");return}let oe,J=vS,U=!1,H,he;for(let V of L.slice(I))if(V.kind==="string")oe=V.value;else if(V.kind==="pair"&&V.key==="rate"){let ce=Number(V.value);if(Number.isFinite(ce)&&ce>=0)J=Math.min(ce,yg),U=!0;else r(X,"rate should be a number of requests per second.")}else if(V.kind==="pair"&&V.key==="retries"){let ce=Number(V.value);if(Number.isFinite(ce)&&ce>=0)H=Math.min(ce,10);else r(X,"retries should be a number, like retries=3.")}else if(V.kind==="pair"&&V.key==="state")he=V.value;else if(V.kind==="pair"&&V.key==="label")oe=V.value;else if(V.kind==="pair")r(X,`Unknown connection option "${V.key}".`);else r(X,`Did not understand "${V.value}" on this connection.`);let Z=(V,ce)=>{if(V===ce){i(X,`"${V}" cannot connect to itself.`);return}for(let ze of[V,ce])if(f.has(ze)){i(X,`"${ze}" is a group. Connect the things inside it instead.`);return}let Le=`${V}->${ce}`;if(w.has(Le)){r(X,`${V} -> ${ce} is already connected. Ignoring the repeat.`);return}D(V,X),D(ce,X),w.set(Le,{id:Le,from:V,to:ce,label:oe,rate:J,rateGiven:U,retries:H,state:"flowing",stateWord:he,line:X})};Pe.forEach((V,ce)=>{if(Z(ie[ce],ie[ce+1]),V==="<->")Z(ie[ce+1],ie[ce])})},A=(L,X,ie)=>{let Pe=$d(L),I=Pe[0];if(!I||I.kind!=="word"){i(ie,"An event names what changes, like: at 5s: db fails");return}let oe=[I.value],J=1;if(Pe[1]?.kind==="arrow"){let H=Pe[2];if(!H||H.kind!=="word"){i(ie,"This event names half a connection. Write both ends, like: api -> db cut");return}oe=[I.value,H.value],J=3}let U={t:X,target:oe,line:ie};for(let H of Pe.slice(J))if(H.kind==="word"&&U.word==="log"&&U.log===void 0&&_S.includes(H.value.toLowerCase()))U.log=H.value.toLowerCase();else if(H.kind==="word"&&U.word===void 0)U.word=H.value.toLowerCase();else if(H.kind==="pair"&&H.key==="capacity"){let he=Number(H.value);if(Number.isFinite(he)&&he>0)U.capacity=he;else r(ie,"capacity should be a positive number of requests per second.")}else if(H.kind==="string")U.note=H.value;else if(H.kind==="pair"&&H.key==="rate"&&/^x[\d.]+$/i.test(H.value))U.rateFactor=Number(H.value.slice(1));else if(H.kind==="pair"&&H.key==="rate"){let he=Number(H.value);if(Number.isFinite(he)&&he>=0)U.rate=Math.min(he,yg);else r(ie,"rate should be a number of requests per second.")}else if(H.kind==="pair"&&H.key==="note")U.note=H.value;else if(H.kind==="pair"&&H.key==="count")U.send=Math.min(12,Math.max(1,Math.round(Number(H.value))||1));else if(H.kind==="pair"&&H.key==="state")U.word=H.value.toLowerCase();else r(ie,`Did not understand "${H.kind==="pair"?H.key:H.value}" in this event.`);if(U.word==="note")U.word=void 0;if(U.word==="log"){if(U.word=void 0,U.log??="info",U.note===void 0){i(ie,'A log line needs a message, like: at 5s: api log error "connection refused"');return}}if(U.word==="send"||U.word==="sends")U.word=void 0,U.send??=1;else U.send=void 0;if(U.word===void 0&&U.note===void 0&&U.rate===void 0&&U.rateFactor===void 0&&U.send===void 0&&U.capacity===void 0){i(ie,'This event does not change anything. Add a state or a "note".');return}R.push(U)},F=null,q=()=>{if(F?.kind==="chapter"&&F.paragraph.length)F.chapter.body.push(F.paragraph.join(" ")),F.paragraph=[]},B=bS(e.replace(/\r\n?/g,`
`).split(`
`),t.options??{},r);B.lines.forEach((L,X)=>{let ie=X+1,Pe=L.trim(),I=/^\s/.test(L);if(!Pe){q();return}if(I&&F?.kind==="chapter"){F.paragraph.push(Pe);return}if(Pe.startsWith("#")||Pe.startsWith("//"))return;if(I&&F?.kind==="group"){let Z=$d(Pe),V=Z[0],ce=V?.kind==="word"&&V.value.toLowerCase()==="node",Le=!Z.some((ze)=>ze.kind==="arrow")&&!/^(at|chapter|rule|group|state|slider)\b/i.test(Pe)&&!_g.test(Pe);if(ce){y(Z.slice(1),ie,F.id);return}if(Le){y(Z,ie,F.id);return}}else q(),F=null;let oe=_g.exec(Pe);if(oe){let Z=oe[1].toLowerCase(),V=oe[2].trim().replace(/^"(.*)"$/,"$1");if(Z==="title")s=V;else if(Z==="summary")a=V;else if(Z==="date")o=V;else if(Z==="kit")if(ps[V.toLowerCase()])l=V.toLowerCase();else r(ie,`Unknown kit "${V}". Available: ${Object.keys(ps).join(", ")}.`);else if(Z==="direction"){let ce=V.toLowerCase();if(ce==="right"||ce==="lr")c="right";else if(ce==="down"||ce==="tb")c="down";else r(ie,'direction is either "right" or "down".')}else if(Z==="duration"){let ce=Ms(V);if(ce&&ce>0)d=ce;else r(ie,`Could not read the duration "${V}". Try something like 60s.`)}else if(Z==="accent"){let ce=eo(V);if(ce)g.accent=ce;else r(ie,`Unknown colour "${V}". Use a name like blue or a code like #3e63dd.`)}else if(Z==="font")if(Ja.includes(V.toLowerCase()))g.font=V.toLowerCase();else r(ie,`font is one of: ${Ja.join(", ")}.`);else if(Z==="look")if(Qa.includes(V.toLowerCase()))g.look=V.toLowerCase();else r(ie,`look is one of: ${Qa.join(", ")}.`);else if(Z==="traffic")p=!/^(off|no|none|false|0)$/i.test(V);else if(Z==="retries"){let ce=Number(V);if(Number.isFinite(ce)&&ce>=0)u=Math.min(ce,10);else r(ie,"retries should be a number, like retries: 2.")}else if(Z==="source"){let ce=yS(V);if(ce)h.push(ce);else r(ie,"A source needs a link, like: source: Meta Engineering https://...")}return}let J=/^at\s+([\d.:]+(?:ms|m|s)?(?:[\d.]+(?:ms|s))?)\s*:?\s*(.*)$/i.exec(Pe);if(J){let Z=Ms(J[1]);if(Z===null)i(ie,`Could not read the time "${J[1]}". Try 5s or 1m20s.`);else A(J[2],Z,ie);return}let U=$d(Pe),H=U[0],he=H?.kind==="word"?H.value.toLowerCase().replace(/:$/,""):"";if(he==="slider"){let Z=U[1],V=U.slice(2),ce=V.find((ye)=>ye.kind==="string"),Le=V.filter((ye)=>ye.kind==="word").map((ye)=>ye.value),C=V.some((ye)=>ye.kind==="arrow")?Le.slice(0,2):Le.slice(0,1),b=Le[C.length]?.toLowerCase(),O=/^(-?[\d.]+)\.\.(-?[\d.]+)$/.exec(Le[C.length+1]??""),se=V.find((ye)=>ye.kind==="pair"&&ye.key==="value");if(!Z||Z.kind!=="word"||!C.length||b!=="rate"&&b!=="capacity"||!O){i(ie,'A slider looks like: slider traffic "Visitors" users -> web rate 20..200');return}let de=Number(O[1]),te=Number(O[2]);if(!(te>de)){i(ie,"A slider's range needs to go from low to high, like 20..200.");return}x.push({id:Z.value,label:ce?.kind==="string"?ce.value:Z.value,target:C,property:b,min:de,max:te,value:se?.kind==="pair"&&Number.isFinite(Number(se.value))?Number(se.value):void 0,line:ie});return}if(U.some((Z)=>Z.kind==="arrow")&&he!=="rule"){_(U,ie);return}if(he==="node")y(U.slice(1),ie);else if(he==="group"){let Z=U[1];if(!Z||Z.kind!=="word"||!io.test(Z.value)){i(ie,'A group needs an id, like: group edge "Edge network"');return}if(m.has(Z.value)){i(ie,`"${Z.value}" is already a node, so it cannot also be a group.`);return}let V=U.slice(2).find((ce)=>ce.kind==="string");f.set(Z.value,{id:Z.value,label:V?.value??Z.value,line:ie}),F={kind:"group",id:Z.value}}else if(he==="chapter"){let Z=U[1],V=Z?.kind==="word"?Ms(Z.value):null;if(V===null){i(ie,'A chapter starts at a time, like: chapter 12s "The cascade"');return}let ce=U.slice(2).find((C)=>C.kind==="string"),Le=U.find((C)=>C.kind==="pair"&&C.key==="tag"),ze={t:V,title:ce?.value??`Chapter ${S.length+1}`,tag:Le?.kind==="pair"?Le.value:void 0,body:[],line:ie};S.push(ze),F={kind:"chapter",chapter:ze,paragraph:[]}}else if(he==="state"){let Z=U[1];if(!Z||Z.kind!=="word"||!io.test(Z.value)){i(ie,'A state needs an id, like: state throttled "Throttled" tone=warn');return}let V={id:Z.value.toLowerCase(),label:Z.value,tone:"idle",reject:0,emits:!0};for(let ce of U.slice(2))if(ce.kind==="string")V.label=ce.value;else if(ce.kind==="pair"&&ce.key==="tone")if(Oa.includes(ce.value))V.tone=ce.value;else r(ie,`tone is one of: ${Oa.join(", ")}.`);else if(ce.kind==="pair"&&ce.key==="reject"){let Le=Number(ce.value);if(Number.isFinite(Le))V.reject=Math.min(1,Math.max(0,Le))}else if(ce.kind==="pair"&&ce.key==="emits")V.emits=!/^(false|no|0)$/i.test(ce.value);v.push(V)}else if(he==="rule"){let Z=/^rule\s*:?\s*([\w-]+)\s*->\s*(dependents|targets|self)\s+([\w-]+)(?:\s+after\s+(\S+))?\s*$/i.exec(Pe),V=Z?.[4]?Ms(Z[4]):0;if(!Z||V===null){i(ie,"A rule looks like: rule: failed -> dependents degraded after 3s");return}T.push({when:Z[1].toLowerCase(),then:Z[3].toLowerCase(),after:V,toward:Z[2].toLowerCase(),line:ie})}else i(ie,"Did not understand this line. Statements start with node, group, chapter, at, rule, state, option or slider, or connect things with ->.")}),q();let j=ps[l],ae=[...j.states];for(let L of v){let X=ae.findIndex((ie)=>ie.id===L.id);if(X>=0)ae[X]=L;else ae.push(L)}let W=new Set(ae.map((L)=>L.id)),me=ae[0].id,fe=(L)=>{let X=L.toLowerCase();if(W.has(X))return X;let ie=j.aliases[X];return ie&&W.has(ie)?ie:null},Ae=(L)=>{let X=L.toLowerCase();if(ms.includes(X))return X;return Pf[X]??null},Se=`Known states: ${ae.map((L)=>L.id).join(", ")}.`;for(let L of m.values()){if(L.state=me,L.x===void 0!==(L.y===void 0))L.x=L.y=void 0;if(L.group&&!f.has(L.group))r(L.line,`Node "${L.id}" refers to a group "${L.group}" that does not exist.`),L.group=void 0}for(let L of E){let X=fe(L.word);if(X)m.get(L.id).state=X;else r(L.line,`Unknown state "${L.word}". ${Se}`)}for(let L of w.values()){if(!L.rateGiven&&!p)L.rate=0;if(!L.stateWord)continue;let X=Ae(L.stateWord);if(X)L.state=X;else r(L.line,`Unknown connection state "${L.stateWord}". Use ${ms.join(", ")}.`)}let N=[];for(let L of R){let{line:X,t:ie,note:Pe,rate:I}=L;if(L.target.length===2){let H=`${L.target[0]}->${L.target[1]}`;if(!w.has(H)){i(X,`There is no connection ${L.target[0]} -> ${L.target[1]} to change.`);continue}let he;if(L.word){if(he=Ae(L.word)??void 0,!he){i(X,`Unknown connection state "${L.word}". Use ${ms.join(", ")}.`);continue}}if(L.capacity!==void 0)r(X,"capacity applies to things, not connections.");N.push({t:ie,target:{kind:"edge",id:H},state:he,rate:I,rateFactor:L.rateFactor,send:L.send,log:L.log,note:Pe,line:X});continue}let oe=L.target[0],J=m.has(oe)?"node":f.has(oe)?"group":null;if(!J){i(X,`Nothing called "${oe}" exists in this scene.`);continue}if(I!==void 0)r(X,"rate only applies to connections, like: at 5s: api -> db rate=6");if(L.send!==void 0){i(X,"Messages travel along a connection, like: at 5s: agent -> model send");continue}let U;if(L.word){if(U=fe(L.word)??void 0,!U){i(X,`Unknown state "${L.word}". ${Se}`);continue}}if(U===void 0&&Pe===void 0&&L.capacity===void 0)continue;N.push({t:ie,target:{kind:J,id:oe},state:U,note:Pe,capacity:L.capacity,log:L.log,line:X})}N.sort((L,X)=>L.t-X.t||L.line-X.line);let ne=[];for(let L of T){let X=fe(L.when),ie=fe(L.then);if(!X||!ie)i(L.line,`Unknown state in rule. ${Se}`);else ne.push({when:X,then:ie,after:L.after,toward:L.toward,line:L.line})}S.sort((L,X)=>L.t-X.t||L.line-X.line);let Y=[];for(let L of x){let X=(ie)=>Math.min(L.max,Math.max(L.min,ie));if(L.property==="rate"){let ie=w.get(L.target.join("->"));if(L.target.length!==2||!ie){i(L.line,"A rate slider needs an existing connection, like: users -> web rate 20..200");continue}Y.push({id:L.id,label:L.label,target:{kind:"edge",id:ie.id},property:"rate",min:L.min,max:L.max,value:X(L.value??ie.rate),line:L.line})}else{let ie=m.get(L.target[0]);if(L.target.length!==1||!ie){i(L.line,"A capacity slider needs an existing thing, like: web capacity 50..300");continue}Y.push({id:L.id,label:L.label,target:{kind:"node",id:ie.id},property:"capacity",min:L.min,max:L.max,value:X(L.value??ie.capacity??L.max),line:L.line})}}let le=new Set([...m.values()].map((L)=>L.group));for(let L of f.values())if(!le.has(L.id))r(L.line,`Group "${L.id}" has nothing in it.`);let pe={title:s||"Untitled scene",summary:a,date:o,kit:l,direction:c,duration:d,sources:h,retries:u,traffic:p,style:g,options:B.options,sliders:Y,states:ae,nodes:[...m.values()].map(({declared:L,...X})=>X),groups:[...f.values()].filter((L)=>le.has(L.id)),edges:[...w.values()].map(({stateWord:L,rateGiven:X,...ie})=>ie),events:N,chapters:S,rules:ne};return n.sort((L,X)=>L.line-X.line),{scene:pe,diagnostics:n}}vg((e)=>Sr(e).scene);function ro(e,t={}){let{scene:n,diagnostics:i}=Sr(e,t);return{compiled:Nd(n,t),diagnostics:i}}var Ft={top:18,right:6,bottom:4,left:6};function bg(e,t){let n=Math.max(120,e.clientWidth||e.parentElement?.clientWidth||300),i=Math.min(2,window.devicePixelRatio||1);e.width=Math.round(n*i),e.height=Math.round(t*i),e.style.height=`${t}px`;let r=e.getContext("2d");return r.setTransform(i,0,0,i,0,0),r.clearRect(0,0,n,t),{ctx:r,width:n}}var SS=(e)=>e>=1e4?`${Math.round(e/1000)}k`:e>=1000?`${(e/1000).toFixed(1)}k`:e>=100?String(Math.round(e)):String(Math.round(e*10)/10);function Sg(e,t,n,i=64){let{ctx:r,width:s}=bg(e,i),a=t.values,o=Math.max(t.limit??0,...a,0.000001)*1.12,l=s-Ft.left-Ft.right,c=i-Ft.top-Ft.bottom,d=(m)=>Ft.left+(a.length<=1?0:m/(a.length-1)*l),h=(m)=>Ft.top+c-m/o*c,u=n.tones[t.tone];r.strokeStyle=n.name==="dark"?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)",r.lineWidth=1,r.beginPath(),r.moveTo(Ft.left,Ft.top+c+0.5),r.lineTo(Ft.left+l,Ft.top+c+0.5),r.stroke();let p=r.createLinearGradient(0,Ft.top,0,Ft.top+c);if(p.addColorStop(0,`${u}55`),p.addColorStop(1,`${u}05`),r.beginPath(),r.moveTo(d(0),h(0)),a.forEach((m,f)=>r.lineTo(d(f),h(m))),r.lineTo(d(a.length-1),h(0)),r.closePath(),r.fillStyle=p,r.fill(),r.beginPath(),a.forEach((m,f)=>f===0?r.moveTo(d(f),h(m)):r.lineTo(d(f),h(m))),r.strokeStyle=u,r.lineWidth=1.6,r.lineJoin="round",r.stroke(),t.limit)r.setLineDash([4,3]),r.strokeStyle=n.textMuted,r.lineWidth=1,r.beginPath(),r.moveTo(Ft.left,Math.round(h(t.limit))+0.5),r.lineTo(Ft.left+l,Math.round(h(t.limit))+0.5),r.stroke(),r.setLineDash([]);r.font=`600 11px ${n.font}`,r.textBaseline="top",r.fillStyle=n.text,r.fillText(t.label,Ft.left,2),r.textAlign="right",r.fillStyle=n.textMuted,r.font=`500 11px ${n.font}`;let g=Math.max(...a),x=(m)=>t.unit==="ms"&&m>=1000?`${(m/1000).toFixed(1)}s`:`${SS(m)}${t.unit}`;r.fillText(`peak ${x(g)}${t.limit?`, limit ${x(t.limit)}`:""}`,s-Ft.right,2),r.textAlign="left"}function wg(e,t,n){let s=t.length*15+4,{ctx:a,width:o}=bg(e,s),l=o-92-Ft.right;a.font=`500 11px ${n.font}`,a.textBaseline="middle",t.forEach((c,d)=>{let h=2+d*15;a.fillStyle=n.textMuted;let u=c.label;while(u.length>3&&a.measureText(u).width>84)u=u.slice(0,-1);a.fillText(u===c.label?u:`${u.trimEnd()}…`,0,h+7.5);let p=l/c.tones.length,g=0;for(let x=1;x<=c.tones.length;x++){if(x<c.tones.length&&c.tones[x]===c.tones[g])continue;a.fillStyle=n.tones[c.tones[g]],a.globalAlpha=c.tones[g]==="ok"?0.55:0.95,a.beginPath(),a.roundRect(92+g*p,h+2,Math.max(1,(x-g)*p-1),11,2),a.fill(),g=x}a.globalAlpha=1})}var Mg=92;var wS={width:1080,height:1920};class Es{source;theme;telemetry;layout;canvas=document.createElement("canvas");ctx=this.canvas.getContext("2d");constructor(e,t,n=null,i="wide"){this.source=e;this.theme=t;this.telemetry=n;this.layout=i}draw(e){if(this.layout==="vertical"){this.drawVertical(e);return}let t=Math.min(1,(this.telemetry?1382.3999999999999:1920)/this.source.width),n=Math.floor(this.source.width*t/2)*2,i=Math.floor(this.source.height*t/2)*2,r=this.telemetry?Math.floor(Math.max(340,n*0.38)/2)*2:0;if(this.canvas.width!==n+r||this.canvas.height!==i)this.canvas.width=n+r,this.canvas.height=i;let s=this.ctx,a=this.theme;if(s.drawImage(this.source,0,0,n,i),this.telemetry&&r)this.drawPanel(this.telemetry,n,r,i,e.time);let o=Math.max(11,Math.min(n,i*1.6)/62),l=o*1.6;if(s.textBaseline="top",s.fillStyle=a.text,s.font=`700 ${o*1.35}px ${this.theme.font}`,s.fillText(e.title,l,l,n-l*2),e.chapterTitle){let c=s.createLinearGradient(0,i-o*7,0,i),d=a.name==="dark"?"12, 14, 19":"243, 242, 238";c.addColorStop(0,`rgba(${d}, 0)`),c.addColorStop(1,`rgba(${d}, 0.92)`),s.fillStyle=c,s.fillRect(0,i-o*7,n,o*7),s.textBaseline="alphabetic";let h=l,u=i-l-o*0.5;if(e.chapterTag)s.font=`600 ${o*0.95}px ${this.theme.font}`,s.fillStyle=a.textMuted,s.fillText(e.chapterTag,h,u),h+=s.measureText(e.chapterTag).width+o;s.font=`700 ${o*1.25}px ${this.theme.font}`,s.fillStyle=a.text,s.fillText(e.chapterTitle,h,u,n-h-l-o*5)}s.textBaseline="alphabetic",s.textAlign="right",s.font=`700 ${o*0.9}px ${this.theme.font}`,s.fillStyle=a.textMuted,s.fillText("topple",n-l,i-l-o*0.5),s.textAlign="left",s.fillStyle=a.name==="dark"?"rgba(255, 255, 255, 0.14)":"rgba(0, 0, 0, 0.12)",s.fillRect(0,i-Math.max(3,o*0.22),n,Math.max(3,o*0.22)),s.fillStyle=a.text,s.fillRect(0,i-Math.max(3,o*0.22),n*e.progress,Math.max(3,o*0.22))}drawVertical(e){let{width:t,height:n}=wS;if(this.canvas.width!==t||this.canvas.height!==n)this.canvas.width=t,this.canvas.height=n;let i=this.ctx,r=this.theme,s=r.font,a=72;i.fillStyle=r.background,i.fillRect(0,0,t,n),i.textBaseline="top",i.fillStyle=r.textMuted,i.font=`700 30px ${s}`,i.fillText((e.credit??"topple").toUpperCase(),a,96),i.fillStyle=r.text,i.font=`700 62px ${s}`;let o=this.wrapText(e.title,a,150,t-a*2,72,3);if(e.chapterTitle){if(o+=34,e.chapterTag)i.font=`600 30px ${s}`,i.fillStyle=r.accent,i.fillText(e.chapterTag,a,o),o+=46;if(i.font=`700 42px ${s}`,i.fillStyle=r.text,o=this.wrapText(e.chapterTitle,a,o,t-a*2,52,2),e.chapterBody?.length)i.font=`400 31px ${s}`,i.fillStyle=r.textMuted,o=this.wrapText(e.chapterBody.join(" "),a,o+16,t-a*2,44,4)}let l=o+48,c=700,d=this.source.width/this.source.height,h=t/c,u=0,p=0,g=this.source.width,x=this.source.height;if(d>h)g=this.source.height*h,u=(this.source.width-g)/2;else x=this.source.width/h,p=(this.source.height-x)/2;i.drawImage(this.source,u,p,g,x,0,l,t,c);let m=l+c;if(this.telemetry)this.drawPanel(this.telemetry,0,t,n-m-12,e.time,m,22);i.fillStyle=r.name==="dark"?"rgba(255, 255, 255, 0.14)":"rgba(0, 0, 0, 0.12)",i.fillRect(0,n-12,t,12),i.fillStyle=r.accent,i.fillRect(0,n-12,t*e.progress,12)}wrapText(e,t,n,i,r,s){let a=this.ctx,o=e.split(/\s+/),l=[],c="";for(let h of o){let u=c?`${c} ${h}`:h;if(c&&a.measureText(u).width>i)l.push(c),c=h;else c=u}if(c)l.push(c);let d=l.slice(0,s);if(l.length>s)d[s-1]=`${d[s-1].replace(/\s+\S*$/,"")}…`;return d.forEach((h,u)=>a.fillText(h,t,n+u*r)),n+d.length*r}drawPanel(e,t,n,i,r,s=0,a){let o=this.ctx;o.save(),o.translate(0,s),o.beginPath(),o.rect(t,0,n,i),o.clip(),this.drawPanelContent(e,t,n,i,r,a),o.restore()}drawPanelContent(e,t,n,i,r,s){let a=this.ctx,o=this.theme,l=o.name==="dark",c=s??Math.max(11,i/52),d=c*1.2;a.fillStyle=l?"#0a0c10":"#fbfaf7",a.fillRect(t,0,n,i),a.fillStyle=l?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.08)",a.fillRect(t,0,1,i);let h=c*4.6,u=e.overview.slice(0,2),p=i-d-u.length*(h+c*0.8);u.forEach((y,_)=>{let A=p+_*(h+c*0.8),F=t+d,q=n-d*2,B=y.values,ee=Math.max(...B,0.000001)*1.15,j=o.tones[y.tone];a.font=`600 ${c*0.85}px ${this.theme.font}`,a.textBaseline="top",a.fillStyle=o.textMuted,a.fillText(`${y.label.toUpperCase()} ${y.unit}`,F,A);let ae=A+c*1.3,W=h-c*1.3,me=(Se)=>F+(B.length<=1?0:Se/(B.length-1)*q),fe=(Se)=>ae+W-Se/ee*W,Ae=Math.min(B.length-1,Math.floor(r/e.bucket));a.beginPath(),a.moveTo(me(0),fe(0));for(let Se=0;Se<=Ae;Se++)a.lineTo(me(Se),fe(B[Se]));a.lineTo(me(Ae),fe(0)),a.closePath(),a.fillStyle=`${j}40`,a.fill(),a.beginPath();for(let Se=0;Se<=Ae;Se++)Se?a.lineTo(me(Se),fe(B[Se])):a.moveTo(me(Se),fe(B[Se]));a.strokeStyle=j,a.lineWidth=Math.max(1.5,c*0.14),a.stroke(),a.fillStyle=l?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)",a.fillRect(F,ae+W,q,1)}),a.font=`700 ${c*0.85}px ${this.theme.font}`,a.textBaseline="top",a.fillStyle=o.textMuted,a.fillText("LOGS",t+d,d);let g=`${c*0.82}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`,x=c*1.35,m=d+c*1.8,f=p-c,w=Math.max(1,Math.floor((f-m)/x)),v=e.logs.filter((y)=>y.t<=r&&y.level!=="debug"),S={debug:o.textMuted,info:o.tones.mend,warn:o.tones.warn,error:o.tones.down};a.font=g;let R=t+d+c*6.6,T=t+n-d-R,E=[];for(let y of v.slice(-w)){let _=`${y.sourceLabel}: ${y.message}`.split(" "),A="",F=!0;for(let q of _){let B=A?`${A} ${q}`:q;if(A&&a.measureText(B).width>T)E.push({text:A,level:y.level,t:y.t,head:F}),F=!1,A=q;else A=B}E.push({text:A,level:y.level,t:y.t,head:F})}let D=(y)=>`${Math.floor(y/60)}:${String(Math.floor(y%60)).padStart(2,"0")}`;E.slice(-w).forEach((y,_)=>{let A=m+_*x;if(y.head)a.fillStyle=o.textMuted,a.fillText(D(y.t),t+d,A),a.fillStyle=S[y.level],a.font=`700 ${c*0.78}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`,a.fillText(y.level.toUpperCase(),t+d+c*3.2,A+c*0.04),a.font=g;a.fillStyle=y.level==="error"?o.text:l?"#c9cfdb":"#3b3d44",a.fillText(y.text,R,A)})}toBlob(e="image/png"){return new Promise((t)=>this.canvas.toBlob(t,e))}}var MS=["video/mp4;codecs=avc1","video/mp4","video/webm;codecs=vp9","video/webm;codecs=vp8","video/webm"];function qd(){if(typeof MediaRecorder>"u")return null;return MS.find((e)=>MediaRecorder.isTypeSupported(e))??null}function Eg(e,t=30){let n=qd();if(!n||!e.captureStream)return null;let i=e.captureStream(t),r=new MediaRecorder(i,{mimeType:n,videoBitsPerSecond:8000000}),s=[];r.ondataavailable=(o)=>{if(o.data.size)s.push(o.data)};let a=new Promise((o)=>{r.onstop=()=>{i.getTracks().forEach((l)=>l.stop()),o({blob:new Blob(s,{type:n.split(";")[0]}),extension:n.startsWith("video/mp4")?"mp4":"webm"})}});return r.start(250),{stop:()=>{if(r.state!=="inactive")r.stop()},done:a}}var ke=(e,t)=>({node:e,shape:t}),so={server:ke(Ua,"box"),rack:ke(Ua,"rack"),database:ke(pc,"cylinder"),cache:ke(cd,"cylinder"),queue:ke(ka,"stack"),storage:ke(wc,"cylinder"),dns:ke(Zc,"hex"),router:ke(Gc,"hex"),network:ke(Uc,"hex"),lb:ke(Vc,"hex"),users:ke(ad,"people"),user:ke(sd,"person"),datacenter:ke(oc,"towers"),globe:ke(Sc,"sphere"),cloud:ke(dc,"sphere"),container:ke(hc,"pods"),cluster:ke(ic,"pods"),tool:ke(fs,"box"),lock:ke(Pc,"vault"),shield:ke(jc,"box"),gateway:ke(mc,"gate"),proxy:ke(Ql,"gate"),zerotrust:ke(Yc,"gate"),firewall:ke(ac,"wall"),waf:ke(sc,"wall"),ddos:ke(Xc,"wall"),vpn:ke(Rc,"vault"),identity:ke(_c,"vault"),secrets:ke(Ec,"vault"),iot:ke(Jl,"cone"),cpu:ke(uc,"box"),phone:ke(hs,"slab"),monitor:ke(kc,"slab"),bot:ke(nc,"sphere"),brain:ke(rc,"sphere"),package:ke(Fc,"box"),truck:ke(id,"box"),factory:ke(gc,"towers"),store:ke(td,"box"),warehouse:ke(od,"towers"),mail:ke(Ic,"slab"),payment:ke(fc,"slab"),search:ke($c,"box"),message:ke(Dc,"slab"),git:ke(bc,"hex"),pipeline:ke(us,"hex"),webhook:ke(ld,"hex"),metrics:ke(Kl,"slab"),dashboard:ke(Ac,"slab"),logs:ke(Wc,"stack"),ingest:ke(Da,"funnel"),monitoring:ke(zc,"hex"),gauge:ke(yc,"slab"),alert:ke(Kc,"cone"),terminal:ke(nd,"slab"),iac:ke(tc,"box"),clock:ke(cc,"cylinder"),key:ke(Tc,"box"),rocket:ke(Hc,"cone"),file:ke(vc,"slab"),bell:ke(ec,"cone"),code:ke(xr,"slab"),box:ke(cs,"box")},ES={service:"server",api:"server",app:"server",backend:"server",host:"server",vm:"server",instance:"server",ec2:"server",gce:"server",compute:"server",nginx:"proxy",envoy:"proxy",haproxy:"proxy",reverseproxy:"proxy",sidecar:"proxy",servicemesh:"proxy",istio:"proxy",servers:"rack",fleet:"rack",db:"database",sql:"database",postgres:"database",mysql:"database",rds:"database",aurora:"database",cloudsql:"database",dynamodb:"database",spanner:"database",bigquery:"database",warehousing:"database",redis:"cache",memcached:"cache",elasticache:"cache",stream:"queue",topic:"queue",kafka:"queue",sqs:"queue",sns:"queue",pubsub:"queue",kinesis:"queue",rabbitmq:"queue",disk:"storage",bucket:"storage",s3:"storage",gcs:"storage",blob:"storage",ebs:"storage",switch:"router",apigateway:"gateway",ingress:"gateway",egress:"gateway",natgateway:"gateway",nat:"gateway",bastion:"gateway",jumphost:"gateway",zta:"zerotrust",beyondcorp:"zerotrust",tunnel:"vpn",wireguard:"vpn",ipsec:"vpn",openvpn:"vpn",sso:"identity",okta:"identity",oauth:"identity",mfa:"identity",sensor:"iot",edgedevice:"iot",backbone:"network",vpc:"network",subnet:"network",route53:"dns",clouddns:"dns",loadbalancer:"lb",balancer:"lb",alb:"lb",elb:"lb",nlb:"lb",people:"users",team:"users",crowd:"users",customers:"users",oncall:"user",person:"user",client:"user",customer:"user",engineer:"user",building:"datacenter",region:"datacenter",zone:"datacenter",az:"datacenter",office:"datacenter",internet:"globe",web:"globe",world:"globe",cdn:"cloud",cloudfront:"cloud",docker:"container",pod:"container",pods:"container",ecs:"container",fargate:"container",cloudrun:"container",kubernetes:"cluster",k8s:"cluster",eks:"cluster",gke:"cluster",aks:"cluster",nomad:"cluster",tools:"tool",auth:"identity",iam:"identity",vault:"secrets",kms:"secrets",secretsmanager:"secrets",security:"shield",securitygroup:"firewall",nacl:"firewall",cloudarmor:"waf",shieldadvanced:"ddos",scrubbing:"ddos",function:"cpu",worker:"cpu",job:"cpu",lambda:"cpu",cloudfunctions:"cpu",mobile:"phone",device:"phone",browser:"monitor",desktop:"monitor",grafana:"dashboard",kibana:"dashboard",agent:"bot",model:"brain",llm:"brain",ai:"bot",deploy:"rocket",release:"rocket",shop:"store",email:"mail",card:"payment",bank:"payment",chat:"message",repo:"git",ci:"pipeline",cd:"pipeline",actions:"pipeline",jenkins:"pipeline",workflow:"pipeline",prometheus:"monitoring",datadog:"monitoring",cloudwatch:"monitoring",observability:"monitoring",loki:"logs",log:"logs",elasticsearch:"logs",opensearch:"logs",splunk:"logs",fluentbit:"ingest",fluentd:"ingest",logstash:"ingest",vector:"ingest",otel:"ingest",collector:"ingest",ingestor:"ingest",pager:"alert",pagerduty:"alert",alertmanager:"alert",incident:"alert",timer:"clock",cron:"clock",scheduler:"clock",secret:"secrets",doc:"file",config:"file",terraform:"iac",pulumi:"iac",cloudformation:"iac",ansible:"iac",shell:"terminal",cli:"terminal"};function Ui(e){let t=(e??"").toLowerCase().replace(/[^a-z0-9]/g,"");return so[t]??so[ES[t]]??so.box}var JI=Object.keys(so),Vt=(e,t=0)=>e===void 0?t:Number(e);function Tg(e,t,n,i=2){e.save(),e.strokeStyle=n,e.lineWidth=i,e.lineCap="round",e.lineJoin="round";for(let[r,s]of t){if(e.beginPath(),r==="path"){e.stroke(new Path2D(String(s.d)));continue}else if(r==="circle")e.arc(Vt(s.cx),Vt(s.cy),Vt(s.r),0,Math.PI*2);else if(r==="ellipse")e.ellipse(Vt(s.cx),Vt(s.cy),Vt(s.rx),Vt(s.ry),0,0,Math.PI*2);else if(r==="rect"){let a=Vt(s.rx??s.ry);e.roundRect(Vt(s.x),Vt(s.y),Vt(s.width),Vt(s.height),a)}else if(r==="line")e.moveTo(Vt(s.x1),Vt(s.y1)),e.lineTo(Vt(s.x2),Vt(s.y2));else if(r==="polyline"||r==="polygon"){let a=String(s.points).trim().split(/[\s,]+/).map(Number);for(let o=0;o+1<a.length;o+=2)if(o===0)e.moveTo(a[o],a[o+1]);else e.lineTo(a[o],a[o+1]);if(r==="polygon")e.closePath()}e.stroke()}e.restore()}function Ts(e,t=16){let n=e.map(([i,r])=>{let s=Object.entries(r).map(([a,o])=>`${a}="${String(o).replace(/"/g,"&quot;")}"`).join(" ");return`<${i} ${s}/>`}).join("");return`<svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${n}</svg>`}var TS=["labels","rates","limits","notes","steps","legend"];function ao(e){let t=(e??"all").toLowerCase().split(/[\s,]+/).filter(Boolean),n=t.includes("all"),i=t.includes("none");return Object.fromEntries(TS.map((r)=>[r,!i&&(n||t.includes(r))]))}var wr=136,Fi=56,Vn=70,Ag=7,AS=3.6,CS=12,rn=(e)=>e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),Cg=(e,t)=>e.length>t?`${e.slice(0,t-1)}…`:e;class Xd{element;onSelect=()=>{};svg;key;compiled=null;theme;annotations=ao(null);steps=[];selected=null;t=0;notesKey="";stepIndex=-2;constructor(e){this.element=document.createElement("div"),this.element.className="flat",e.appendChild(this.element),this.element.addEventListener("click",(t)=>{let i=t.target.closest("[data-node]")?.dataset.node??null;this.select(i),this.onSelect(i)})}setScene(e,t,n){this.compiled=e,this.theme=t,this.annotations=n,this.steps=this.buildSteps(e),this.render(),this.setTime(this.t)}setAnnotations(e){if(this.annotations=e,this.compiled)this.setScene(this.compiled,this.theme,e)}select(e){this.selected=e,this.svg?.querySelectorAll("[data-box]").forEach((t)=>{let n=t.dataset.box===e;if(t.setAttribute("stroke-width",n?"3":"1.5"),n)t.setAttribute("stroke",this.theme.accent)}),this.setTime(this.t)}setTime(e){this.t=e;let t=this.compiled;if(!t||!this.svg)return;let n=this.theme;for(let i of t.nodes){let r=this.svg.querySelector(`[data-box="${CSS.escape(i.id)}"]`),s=this.svg.querySelector(`[data-dot="${CSS.escape(i.id)}"]`),a=this.svg.querySelector(`[data-status="${CSS.escape(i.id)}"]`),o=t.states.get(Ct(i.segments,e).state),l=o?.tone??"idle",c=n.tones[l];if(r&&i.id!==this.selected)r.setAttribute("stroke",l==="ok"||l==="idle"?n.chipBorder:c);if(s?.setAttribute("fill",c),a)a.textContent=this.annotations.labels&&l!=="ok"&&l!=="idle"?o?.label??"":"";if(a)a.setAttribute("fill",c);let d=this.svg.querySelector(`[data-load="${CSS.escape(i.id)}"]`);if(d&&i.flow){let h=Math.min(i.flow.load.length-1,Math.max(0,Math.floor(e/t.flowStep))),u=Math.round(i.flow.load[h]);d.textContent=`${u} / ${i.flow.capacity} per s`,d.setAttribute("fill",u>i.flow.capacity?n.tones.hot:n.textMuted)}}for(let i of t.edges){let r=Ct(i.segments,e);this.svg.querySelector(`[data-edge="${CSS.escape(i.id)}"]`)?.setAttribute("stroke",n.edges[r.state]);let s=this.svg.querySelector(`[data-rate="${CSS.escape(i.id)}"]`);if(s)s.textContent=[r.rate?`${Math.round(r.rate)} req/s`:"",i.retries?`retries ×${i.retries}`:""].filter(Boolean).join(" · ")}if(this.drawPackets(t,e),this.annotations.notes)this.drawNotes(t,e);if(this.annotations.steps)this.markSteps(e)}async toCanvas(e=2){let t=this.compiled,n=t.width+Vn*2,i=t.height+Vn*2,r=this.svg.cloneNode(!0);r.setAttribute("width",String(n*e)),r.setAttribute("height",String(i*e));let s=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(r)],{type:"image/svg+xml"}));try{let a=new Image;a.src=s,await a.decode();let o=document.createElement("canvas");o.width=n*e,o.height=i*e;let l=o.getContext("2d");return l.fillStyle=this.theme.background,l.fillRect(0,0,o.width,o.height),l.drawImage(a,0,0),o}finally{URL.revokeObjectURL(s)}}dispose(){this.element.remove()}render(){let e=this.compiled,t=this.theme,n=this.annotations,i=e.width+Vn*2,r=e.height+Vn*2,s=rn(t.font),a=Object.entries(t.edges).map(([h,u])=>`<marker id="tf-arrow-${h}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${u}"/></marker>`).join(""),o=e.groups.map((h)=>{let{x:u,y:p,width:g,height:x}=h.box;return`<g><rect x="${u-g/2}" y="${p-x/2}" width="${g}" height="${x}" rx="14" fill="${t.platform}" fill-opacity="0.35" stroke="${t.platformEdge}" stroke-dasharray="7 6"/>
          ${n.labels?`<text x="${u-g/2+14}" y="${p+x/2-14}" font-size="13" fill="${t.textMuted}" font-weight="600">${rn(h.label)}</text>`:""}</g>`}).join(""),l=e.edges.map((h)=>{let u=h.path.map((x,m)=>`${m?"L":"M"}${x.x.toFixed(1)} ${x.y.toFixed(1)}`).join(" "),p=h.path[Math.floor(h.path.length/2)],g=h.segments[0]?.state??"flowing";return`<path data-edge="${rn(h.id)}" d="${u}" fill="none" stroke="${t.edges[g]}" stroke-width="2" marker-end="url(#tf-arrow-${g})"/>
          ${n.labels&&h.label?`<text x="${p.x}" y="${p.y+18}" text-anchor="middle" font-size="12" fill="${t.textMuted}" font-style="italic">${rn(h.label)}</text>`:""}
          ${n.rates?`<text data-rate="${rn(h.id)}" x="${p.x}" y="${p.y-10}" text-anchor="middle" font-size="11.5" fill="${t.tones.warn}" stroke="${t.background}" stroke-width="4" paint-order="stroke"></text>`:""}`}).join(""),c=e.nodes.map((h)=>this.nodeMarkup(h)).join(""),d=n.steps?this.steps.map((h)=>`<g data-step="${h.n}"><circle cx="${h.x}" cy="${h.y}" r="11" fill="${t.background}" stroke="${t.accent}" stroke-width="2"/><text x="${h.x}" y="${h.y+4}" text-anchor="middle" font-size="11.5" font-weight="700" fill="${t.accent}">${h.n}</text></g>`).join(""):"";this.element.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-Vn} ${-Vn} ${i} ${r}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${rn(e.scene.title??"Scene")} as a diagram" font-family="${s}">
      <defs>${a}<pattern id="tf-dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.2" fill="${t.gridDot}"/></pattern></defs>
      <rect x="${-Vn}" y="${-Vn}" width="${i}" height="${r}" fill="${t.background}"/>
      <rect x="${-Vn}" y="${-Vn}" width="${i}" height="${r}" fill="url(#tf-dots)"/>
      ${o}${l}<g data-layer="packets"></g>${c}${d}<g data-layer="notes"></g>
    </svg>
    <ol class="flat-key"${n.steps&&this.steps.length?"":" hidden"}>${this.steps.map((h)=>`<li data-key="${h.n}"><b>${h.n}</b>${rn(h.text)}</li>`).join("")}</ol>`,this.svg=this.element.querySelector("svg"),this.key=this.element.querySelector(".flat-key"),this.notesKey="",this.stepIndex=-2,this.select(this.selected)}nodeMarkup(e){let t=this.theme,n=this.annotations,{x:i,y:r}=e.box,s=Ts(Ui(e.icon).node,18).replace("<svg ",`<svg x="${i-wr/2+12}" y="${r-9}" `),a=e.capacity??e.flow?.capacity;return`<g data-node="${rn(e.id)}" style="cursor:pointer">
      <rect data-box="${rn(e.id)}" x="${i-wr/2}" y="${r-Fi/2}" width="${wr}" height="${Fi}" rx="10" fill="${e.color??t.chip}" stroke="${t.chipBorder}" stroke-width="1.5"/>
      <g style="color:${t.text}" color="${t.text}">${s}</g>
      <text x="${i-wr/2+38}" y="${r+5}" font-size="13.5" font-weight="600" fill="${t.text}">${rn(Cg(e.label,13))}</text>
      <circle data-dot="${rn(e.id)}" cx="${i+wr/2-11}" cy="${r-Fi/2+11}" r="4" fill="${t.tones.idle}"/>
      <text data-status="${rn(e.id)}" x="${i}" y="${r+Fi/2+16}" text-anchor="middle" font-size="11.5" font-weight="600"></text>
      ${n.limits&&a?`<text data-load="${rn(e.id)}" x="${i}" y="${r-Fi/2-8}" text-anchor="middle" font-size="11" fill="${t.textMuted}">limit ${a} per s</text>`:""}
    </g>`}buildSteps(e){let t=e.beats.filter((i)=>!i.derived&&!i.log&&(i.note||i.state)).slice(0,CS),n=new Map;return t.flatMap((i,r)=>{let s=r+1,a=e.nodes.find((h)=>h.id===i.target.id)?.label??i.targetLabel,o=i.note??`${a} becomes ${e.states.get(i.state??"")?.label??i.state}`,l=n.get(i.target.id)??0;if(n.set(i.target.id,l+1),i.target.kind==="node"){let h=e.nodes.find((u)=>u.id===i.target.id);if(!h)return[];return[{n:s,beat:i,text:o,x:h.box.x-wr/2-4+l*24,y:h.box.y-Fi/2-4}]}let c=this.edgeFor(e,i.target.id);if(!c)return[];let d=c.path[Math.floor(c.path.length/2)];return[{n:s,beat:i,text:o,x:d.x-34+l*24,y:d.y+6}]})}edgeFor(e,t){let[n,i]=t.split(/<?->/);return e.edges.find((r)=>r.id===t||r.from===n&&r.to===i||r.from===i&&r.to===n)}drawPackets(e,t){let n=this.theme,i="";for(let r of e.edges)xs(r,t,(s)=>{let a,o=n.packet,l=s.message?6:3.5;if(t<=s.arrive)a=(t-s.depart)/(s.arrive-s.depart)*s.reach*r.length;else if(s.fate==="bounce"){let d=(t-s.arrive)/(s.end-s.arrive);a=r.length*(1-d*0.6),o=n.tones.down,l*=1-d*0.6}else{let d=(t-s.arrive)/(s.end-s.arrive);a=s.reach*r.length,o=n.tones.hot,l*=1-d}let c=In(r.path,r.lengths,a);i+=`<circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="${Math.max(0.5,l).toFixed(1)}" fill="${o}"/>`});this.svg.querySelector('[data-layer="packets"]').innerHTML=i}drawNotes(e,t){let n=vs(e.beats,t,Ag).filter((a)=>!a.log&&t-a.t<=(a.sent?AS:Ag)),i=n.map((a)=>`${a.t}:${a.target.id}`).join("|");if(i===this.notesKey)return;this.notesKey=i;let r=this.theme,s=n.map((a)=>{let o,l;if(a.target.kind==="node"){let p=e.nodes.find((g)=>g.id===a.target.id);if(!p)return"";o=p.box.x,l=p.box.y-Fi/2-30}else{let p=this.edgeFor(e,a.target.id);if(!p)return"";let g=p.path[Math.floor(p.path.length/2)];o=g.x,l=g.y-34}let c=Cg(a.note,42),d=c.length*6.6+20,h=a.state?e.states.get(a.state):void 0,u=a.state?r.tones[h?.tone??"idle"]:r.chipBorder;return`<g><rect x="${o-d/2}" y="${l-15}" width="${d}" height="24" rx="7" fill="${r.chip}" stroke="${u}"/><text x="${o}" y="${l+1.5}" text-anchor="middle" font-size="12" fill="${r.text}">${rn(c)}</text></g>`}).join("");this.svg.querySelector('[data-layer="notes"]').innerHTML=s}markSteps(e){let t=-1;for(let i=0;i<this.steps.length;i++)if(this.steps[i].beat.t<=e+0.000001)t=i;if(t===this.stepIndex)return;this.stepIndex=t;let n=this.theme;this.steps.forEach((i,r)=>{let s=this.svg.querySelector(`[data-step="${i.n}"]`),a=r<=t;s?.querySelector("circle")?.setAttribute("fill",a?n.accent:n.background),s?.querySelector("text")?.setAttribute("fill",a?n.background:n.accent),this.key.querySelector(`[data-key="${i.n}"]`)?.toggleAttribute("data-current",r===t)}),this.key.querySelector("[data-current]")?.scrollIntoView({block:"nearest"})}}class Yd{time=0;duration=0;speed=1;loop=!1;playing=!1;onTime=()=>{};onState=()=>{};onEnd=()=>{};raf=0;last=0;play(){if(this.playing||this.duration<=0)return;if(this.time>=this.duration-0.01)this.time=0;this.playing=!0,this.last=performance.now(),this.raf=requestAnimationFrame(this.tick),this.onState(!0),this.onTime(this.time)}pause(){if(!this.playing)return;this.playing=!1,cancelAnimationFrame(this.raf),this.onState(!1)}toggle(){if(this.playing)this.pause();else this.play()}seek(e){this.time=Math.min(this.duration,Math.max(0,e)),this.onTime(this.time)}dispose(){cancelAnimationFrame(this.raf),this.playing=!1}tick=(e)=>{if(!this.playing)return;let t=Math.min(0.1,(e-this.last)/1000);this.last=e;let n=this.time+t*this.speed;if(n>=this.duration)if(this.loop)n=0;else{this.time=this.duration,this.onTime(this.time),this.playing=!1,this.onState(!1),this.onEnd();return}this.time=n,this.onTime(n),this.raf=requestAnimationFrame(this.tick)}}var Rg=(e)=>{let t="";for(let n=0;n<e.length;n+=32768)t+=String.fromCharCode(...e.subarray(n,n+32768));return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")};async function RS(e,t){let n=new Blob([e]).stream().pipeThrough(t);return new Uint8Array(await new Response(n).arrayBuffer())}async function PS(e){let t=new TextEncoder().encode(e);if(typeof CompressionStream<"u")try{return`z=${Rg(await RS(t,new CompressionStream("deflate-raw")))}`}catch{}return`s=${Rg(t)}`}async function IS(e){let t=new URLSearchParams;if(e.src)t.set("src",e.src);if(e.theme&&e.theme!=="auto")t.set("theme",e.theme);if(e.autoplay)t.set("autoplay","1");if(e.loop)t.set("loop","1");if(e.start)t.set("t",String(Math.round(e.start*10)/10));if(e.rail==="none")t.set("rail","none");if(e.controls&&e.controls!=="full")t.set("controls",e.controls);if(e.tools==="none")t.set("tools","none");if(e.view&&e.view!=="3d")t.set("view",e.view);if(e.annotations&&e.annotations!=="all")t.set("annotations",e.annotations);let n=t.toString(),i=!e.src&&e.source?`#${await PS(e.source)}`:"";return`${e.base.replace(/\/$/,"")}/embed/${n?`?${n}`:""}${i}`}var jd=(e)=>e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");async function Pg(e){let t=await IS(e),n=e.base.replace(/\/$/,""),i=e.title??"Topple scene",r=e.height??560,s=jd(i),a=`<iframe src="${t}" title="${s}" width="100%" height="${r}" style="border:0;border-radius:14px" loading="lazy" allow="fullscreen"></iframe>`,o=[e.src?`src="${jd(e.src)}"`:"",e.theme&&e.theme!=="auto"?`theme="${e.theme}"`:"",e.autoplay?"autoplay":"",e.loop?"loop":"",e.rail==="none"?'rail="none"':"",e.controls&&e.controls!=="full"?`controls="${e.controls}"`:"",e.tools==="none"?'tools="none"':"",e.view&&e.view!=="3d"?`view="${e.view}"`:"",e.annotations&&e.annotations!=="all"?`annotations="${jd(e.annotations)}"`:""].filter(Boolean).join(" "),l=`<topple-player${o?` ${o}`:""}>`,c=e.src?`${l}</topple-player>`:`${l}
  <script type="text/topple">
${(e.source??"").trim().replace(/<\/script/gi,"<\\/script")}
  </script>
</topple-player>`,d=`<script src="${n}/topple.js" defer></script>
${c}`,h=`${a}

<!-- If your Markdown host strips iframes, use a link instead: -->
[▶ ${i.replace(/[[\]]/g,"")}](${t})`,u=`<iframe
  src="${t}"
  title="${s}"
  width="100%"
  height={${r}}
  style={{ border: 0, borderRadius: 14 }}
  loading="lazy"
  allow="fullscreen"
/>`;return{link:t,iframe:a,markdown:h,html:d,react:u}}async function Ig(e,t){let n=await fetch(`${e.replace(/\/$/,"")}/api/scenes`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({source:t})}),i=await n.json().catch(()=>({}));if(!n.ok||!i.id||!i.url)throw Error(i.error??`The link service answered ${n.status}.`);return{id:i.id,url:i.url}}function oo(e,t){let n=URL.createObjectURL(e),i=document.createElement("a");i.href=n,i.download=t,i.click(),setTimeout(()=>URL.revokeObjectURL(n),2000)}function Lg(e){return e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60)||"scene"}async function Zd(e){try{return await navigator.clipboard.writeText(e),!0}catch{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();let n=document.execCommand("copy");return t.remove(),n}}function Dg(e,t){let n=0,i=()=>{n=0;let s=e.getBoundingClientRect(),a=window.innerHeight,o=(a-s.top)/(a+s.height);t.seek(Math.min(1,Math.max(0,o))*t.duration)},r=()=>{if(!n)n=requestAnimationFrame(i)};return window.addEventListener("scroll",r,{passive:!0}),window.addEventListener("resize",r),r(),()=>{cancelAnimationFrame(n),window.removeEventListener("scroll",r),window.removeEventListener("resize",r)}}function kg(e,t){let n=[...document.querySelectorAll(e)];if(!n.length)return()=>{};let i=null,r=new IntersectionObserver((s)=>{for(let a of s){if(!a.isIntersecting||a.target===i)continue;i=a.target,n.forEach((h)=>h.toggleAttribute("data-step-active",h===i));let o=i.dataset.step??String(n.indexOf(i)+1),l=/s$/.test(o)?parseFloat(o):NaN;if(Number.isFinite(l)){t.playRange(l,t.duration);continue}let c=Math.max(0,Number.parseInt(o,10)-1),d=t.chapterStart(c);if(d!==void 0)t.playRange(d,t.chapterEnd(c))}},{rootMargin:"-45% 0px -45% 0px"});return n.forEach((s)=>r.observe(s)),()=>r.disconnect()}var px="180",Mi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ei={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},mx=0,Ch=1,gx=2;var Rh=1,Oo=2,$n=3,Xr=0,Jt=1,Qt=2,Rt=0,qs=1,Xs=2,Ph=3,Ih=4,Bo=5,Un=100,xx=101,vx=102,_x=103,yx=104,Wi=200,bx=201,Sx=202,wx=203,Mx=204,Ex=205,Ys=206,Tx=207,js=208,Ax=209,Cx=210,Rx=211,Px=212,Ix=213,Lx=214,zo=0,Ho=1,Go=2,Zs=3,Vo=4,Wo=5,$o=6,qo=7,Dx=0,kx=1,Nx=2,oi=0,Xo=1,Yo=2,jo=3,Yr=4,Zo=5,Ko=6,Jo=7;var jr=301,$i=302,Qo=303,el=304,Ks=306,qn=1000,Ux=1001,Fx=1002,li=1003,Ox=1004;var Js=1005;var ci=1006,tl=1007;var Ti=1008;var Xn=1009,Bx=1010,zx=1011,Qs=1012,Lh=1013,Zr=1014,Ai=1015,Bt=1016,Dh=1017,kh=1018,Ci=1020,Hx=35902,Gx=35899,Vx=1021,Wx=1022,An=1023,nl=1026,qi=1027,$x=1028,Nh=1029,qx=1030,Uh=1031;var Fh=1033,il=33776,rl=33777,sl=33778,al=33779,Oh=35840,Bh=35841,zh=35842,Hh=35843,Gh=36196,Vh=37492,Wh=37496,$h=37808,qh=37809,Xh=37810,Yh=37811,jh=37812,Zh=37813,Kh=37814,Jh=37815,Qh=37816,eu=37817,tu=37818,nu=37819,iu=37820,ru=37821,su=36492,au=36494,ou=36495,lu=36283,cu=36284,du=36285,hu=36286;var Xx=3201;var Yx=0,jx=1,Xi="",Yi="srgb",ea="srgb-linear",uu="linear",dt="srgb";var Zx=512,Kx=513,Jx=514,fu=515,Qx=516,e0=517,t0=518,n0=519;var pu="300 es",mu=2000;class di{addEventListener(e,t){if(this._listeners===void 0)this._listeners={};let n=this._listeners;if(n[e]===void 0)n[e]=[];if(n[e].indexOf(t)===-1)n[e].push(t)}hasEventListener(e,t){let n=this._listeners;if(n===void 0)return!1;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);if(r!==-1)i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,s=i.length;r<s;r++)i[r].call(this,e);e.target=null}}}var Wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ng=1234567,Os=Math.PI/180,Wr=180/Math.PI;function Wn(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Wt[e&255]+Wt[e>>8&255]+Wt[e>>16&255]+Wt[e>>24&255]+"-"+Wt[t&255]+Wt[t>>8&255]+"-"+Wt[t>>16&15|64]+Wt[t>>24&255]+"-"+Wt[n&63|128]+Wt[n>>8&255]+"-"+Wt[n>>16&255]+Wt[n>>24&255]+Wt[i&255]+Wt[i>>8&255]+Wt[i>>16&255]+Wt[i>>24&255]).toLowerCase()}function $e(e,t,n){return Math.max(t,Math.min(n,e))}function gu(e,t){return(e%t+t)%t}function LS(e,t,n,i,r){return i+(e-t)*(r-i)/(n-t)}function DS(e,t,n){if(e!==t)return(n-e)/(t-e);else return 0}function Bs(e,t,n){return(1-n)*e+n*t}function kS(e,t,n,i){return Bs(e,t,1-Math.exp(-n*i))}function NS(e,t=1){return t-Math.abs(gu(e,t*2)-t)}function US(e,t,n){if(e<=t)return 0;if(e>=n)return 1;return e=(e-t)/(n-t),e*e*(3-2*e)}function FS(e,t,n){if(e<=t)return 0;if(e>=n)return 1;return e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10)}function OS(e,t){return e+Math.floor(Math.random()*(t-e+1))}function BS(e,t){return e+Math.random()*(t-e)}function zS(e){return e*(0.5-Math.random())}function HS(e){if(e!==void 0)Ng=e;let t=Ng+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function GS(e){return e*Os}function VS(e){return e*Wr}function WS(e){return(e&e-1)===0&&e!==0}function $S(e){return Math.pow(2,Math.ceil(Math.log(e)/Math.LN2))}function qS(e){return Math.pow(2,Math.floor(Math.log(e)/Math.LN2))}function XS(e,t,n,i,r){let{cos:s,sin:a}=Math,o=s(n/2),l=a(n/2),c=s((t+i)/2),d=a((t+i)/2),h=s((t-i)/2),u=a((t-i)/2),p=s((i-t)/2),g=a((i-t)/2);switch(r){case"XYX":e.set(o*d,l*h,l*u,o*c);break;case"YZY":e.set(l*u,o*d,l*h,o*c);break;case"ZXZ":e.set(l*h,l*u,o*d,o*c);break;case"XZX":e.set(o*d,l*g,l*p,o*c);break;case"YXY":e.set(l*p,o*d,l*g,o*c);break;case"ZYZ":e.set(l*g,l*p,o*d,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Nn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error("Invalid component type.")}}function st(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error("Invalid component type.")}}var ta={DEG2RAD:Os,RAD2DEG:Wr,generateUUID:Wn,clamp:$e,euclideanModulo:gu,mapLinear:LS,inverseLerp:DS,lerp:Bs,damp:kS,pingpong:NS,smoothstep:US,smootherstep:FS,randInt:OS,randFloat:BS,randFloatSpread:zS,seededRandom:HS,degToRad:GS,radToDeg:VS,isPowerOfTwo:WS,ceilPowerOfTwo:$S,floorPowerOfTwo:qS,setQuaternionFromProperEuler:XS,normalize:st,denormalize:Nn};class re{constructor(e=0,t=0){re.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,s=this.y-e.y;return this.x=r*n-s*i+e.x,this.y=r*i+s*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Fn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,s,a){let o=n[i+0],l=n[i+1],c=n[i+2],d=n[i+3],h=r[s+0],u=r[s+1],p=r[s+2],g=r[s+3];if(a===0){e[t+0]=o,e[t+1]=l,e[t+2]=c,e[t+3]=d;return}if(a===1){e[t+0]=h,e[t+1]=u,e[t+2]=p,e[t+3]=g;return}if(d!==g||o!==h||l!==u||c!==p){let x=1-a,m=o*h+l*u+c*p+d*g,f=m>=0?1:-1,w=1-m*m;if(w>Number.EPSILON){let S=Math.sqrt(w),R=Math.atan2(S,m*f);x=Math.sin(x*R)/S,a=Math.sin(a*R)/S}let v=a*f;if(o=o*x+h*v,l=l*x+u*v,c=c*x+p*v,d=d*x+g*v,x===1-a){let S=1/Math.sqrt(o*o+l*l+c*c+d*d);o*=S,l*=S,c*=S,d*=S}}e[t]=o,e[t+1]=l,e[t+2]=c,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,r,s){let a=n[i],o=n[i+1],l=n[i+2],c=n[i+3],d=r[s],h=r[s+1],u=r[s+2],p=r[s+3];return e[t]=a*p+c*d+o*u-l*h,e[t+1]=o*p+c*h+l*d-a*u,e[t+2]=l*p+c*u+a*h-o*d,e[t+3]=c*p-a*d-o*h-l*u,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let{_x:n,_y:i,_z:r,_order:s}=e,{cos:a,sin:o}=Math,l=a(n/2),c=a(i/2),d=a(r/2),h=o(n/2),u=o(i/2),p=o(r/2);switch(s){case"XYZ":this._x=h*c*d+l*u*p,this._y=l*u*d-h*c*p,this._z=l*c*p+h*u*d,this._w=l*c*d-h*u*p;break;case"YXZ":this._x=h*c*d+l*u*p,this._y=l*u*d-h*c*p,this._z=l*c*p-h*u*d,this._w=l*c*d+h*u*p;break;case"ZXY":this._x=h*c*d-l*u*p,this._y=l*u*d+h*c*p,this._z=l*c*p+h*u*d,this._w=l*c*d-h*u*p;break;case"ZYX":this._x=h*c*d-l*u*p,this._y=l*u*d+h*c*p,this._z=l*c*p-h*u*d,this._w=l*c*d+h*u*p;break;case"YZX":this._x=h*c*d+l*u*p,this._y=l*u*d+h*c*p,this._z=l*c*p-h*u*d,this._w=l*c*d-h*u*p;break;case"XZY":this._x=h*c*d-l*u*p,this._y=l*u*d-h*c*p,this._z=l*c*p+h*u*d,this._w=l*c*d+h*u*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}if(t===!0)this._onChangeCallback();return this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],s=t[1],a=t[5],o=t[9],l=t[2],c=t[6],d=t[10],h=n+a+d;if(h>0){let u=0.5/Math.sqrt(h+1);this._w=0.25/u,this._x=(c-o)*u,this._y=(r-l)*u,this._z=(s-i)*u}else if(n>a&&n>d){let u=2*Math.sqrt(1+n-a-d);this._w=(c-o)/u,this._x=0.25*u,this._y=(i+s)/u,this._z=(r+l)/u}else if(a>d){let u=2*Math.sqrt(1+a-n-d);this._w=(r-l)/u,this._x=(i+s)/u,this._y=0.25*u,this._z=(o+c)/u}else{let u=2*Math.sqrt(1+d-n-a);this._w=(s-i)/u,this._x=(r+l)/u,this._y=(o+c)/u,this._z=0.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;if(n<0.00000001)if(n=0,Math.abs(e.x)>Math.abs(e.z))this._x=-e.y,this._y=e.x,this._z=0,this._w=n;else this._x=0,this._y=-e.z,this._z=e.y,this._w=n;else this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n;return this.normalize()}angleTo(e){return 2*Math.acos(Math.abs($e(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();if(e===0)this._x=0,this._y=0,this._z=0,this._w=1;else e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e;return this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let{_x:n,_y:i,_z:r,_w:s}=e,{_x:a,_y:o,_z:l,_w:c}=t;return this._x=n*c+s*a+i*l-r*o,this._y=i*c+s*o+r*a-n*l,this._z=r*c+s*l+n*o-i*a,this._w=s*c-n*a-i*o-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,r=this._z,s=this._w,a=s*e._w+n*e._x+i*e._y+r*e._z;if(a<0)this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a;else this.copy(e);if(a>=1)return this._w=s,this._x=n,this._y=i,this._z=r,this;let o=1-a*a;if(o<=Number.EPSILON){let u=1-t;return this._w=u*s+t*this._w,this._x=u*n+t*this._x,this._y=u*i+t*this._y,this._z=u*r+t*this._z,this.normalize(),this}let l=Math.sqrt(o),c=Math.atan2(l,a),d=Math.sin((1-t)*c)/l,h=Math.sin(t*c)/l;return this._w=s*d+this._w*h,this._x=n*d+this._x*h,this._y=i*d+this._y*h,this._z=r*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,n=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){if(n===void 0)n=this.z;return this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ug.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ug.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,s=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*s,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*s,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*s,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,{x:r,y:s,z:a,w:o}=e,l=2*(s*i-a*n),c=2*(a*t-r*i),d=2*(r*n-s*t);return this.x=t+o*l+s*d-a*c,this.y=n+o*c+a*l-r*d,this.z=i+o*d+r*c-s*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let{x:n,y:i,z:r}=e,{x:s,y:a,z:o}=t;return this.x=i*o-r*a,this.y=r*s-n*o,this.z=n*a-i*s,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Kd.copy(this).projectOnVector(e),this.sub(Kd)}reflect(e){return this.sub(Kd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var Kd=new P,Ug=new Fn;class Ke{constructor(e,t,n,i,r,s,a,o,l){if(Ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0)this.set(e,t,n,i,r,s,a,o,l)}set(e,t,n,i,r,s,a,o,l){let c=this.elements;return c[0]=e,c[1]=i,c[2]=a,c[3]=t,c[4]=r,c[5]=o,c[6]=n,c[7]=s,c[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,s=n[0],a=n[3],o=n[6],l=n[1],c=n[4],d=n[7],h=n[2],u=n[5],p=n[8],g=i[0],x=i[3],m=i[6],f=i[1],w=i[4],v=i[7],S=i[2],R=i[5],T=i[8];return r[0]=s*g+a*f+o*S,r[3]=s*x+a*w+o*R,r[6]=s*m+a*v+o*T,r[1]=l*g+c*f+d*S,r[4]=l*x+c*w+d*R,r[7]=l*m+c*v+d*T,r[2]=h*g+u*f+p*S,r[5]=h*x+u*w+p*R,r[8]=h*m+u*v+p*T,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],s=e[4],a=e[5],o=e[6],l=e[7],c=e[8];return t*s*c-t*a*l-n*r*c+n*a*o+i*r*l-i*s*o}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],s=e[4],a=e[5],o=e[6],l=e[7],c=e[8],d=c*s-a*l,h=a*o-c*r,u=l*r-s*o,p=t*d+n*h+i*u;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let g=1/p;return e[0]=d*g,e[1]=(i*l-c*n)*g,e[2]=(a*n-i*s)*g,e[3]=h*g,e[4]=(c*t-i*o)*g,e[5]=(i*r-a*t)*g,e[6]=u*g,e[7]=(n*o-l*t)*g,e[8]=(s*t-n*r)*g,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,s,a){let o=Math.cos(r),l=Math.sin(r);return this.set(n*o,n*l,-n*(o*s+l*a)+s+e,-i*l,i*o,-i*(-l*s+o*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Jd.makeScale(e,t)),this}rotate(e){return this.premultiply(Jd.makeRotation(-e)),this}translate(e,t){return this.premultiply(Jd.makeTranslation(e,t)),this}makeTranslation(e,t){if(e.isVector2)this.set(1,0,e.x,0,1,e.y,0,0,1);else this.set(1,0,e,0,1,t,0,0,1);return this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}var Jd=new Ke;function xu(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Gs(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function i0(){let e=Gs("canvas");return e.style.display="block",e}var Fg={};function $r(e){if(e in Fg)return;Fg[e]=!0,console.warn(e)}function r0(e,t,n){return new Promise(function(i,r){function s(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:r();break;case e.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}var Og=new Ke().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),Bg=new Ke().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function YS(){let e={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(r,s,a){if(this.enabled===!1||s===a||!s||!a)return r;if(this.spaces[s].transfer==="srgb")r.r=ai(r.r),r.g=ai(r.g),r.b=ai(r.b);if(this.spaces[s].primaries!==this.spaces[a].primaries)r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ);if(this.spaces[a].transfer==="srgb")r.r=Vr(r.r),r.g=Vr(r.g),r.b=Vr(r.b);return r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){if(r==="")return"linear";return this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return $r("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return $r("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(r,s)}},t=[0.64,0.33,0.3,0.6,0.15,0.06],n=[0.2126,0.7152,0.0722],i=[0.3127,0.329];return e.define({["srgb-linear"]:{primaries:t,whitePoint:i,transfer:"linear",toXYZ:Og,fromXYZ:Bg,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:t,whitePoint:i,transfer:"srgb",toXYZ:Og,fromXYZ:Bg,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),e}var nt=YS();function ai(e){return e<0.04045?e*0.0773993808:Math.pow(e*0.9478672986+0.0521327014,2.4)}function Vr(e){return e<0.0031308?e*12.92:1.055*Math.pow(e,0.41666)-0.055}var Mr;class vu{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src))return e.src;if(typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{if(Mr===void 0)Mr=Gs("canvas");Mr.width=e.width,Mr.height=e.height;let i=Mr.getContext("2d");if(e instanceof ImageData)i.putImageData(e,0,0);else i.drawImage(e,0,0,e.width,e.height);n=Mr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Gs("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let s=0;s<r.length;s++)r[s]=ai(r[s]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)if(t instanceof Uint8Array||t instanceof Uint8ClampedArray)t[n]=Math.floor(ai(t[n]/255)*255);else t[n]=ai(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}var jS=0;class na{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:jS++}),this.uuid=Wn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;if(typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement)e.set(t.videoWidth,t.videoHeight,0);else if(t instanceof VideoFrame)e.set(t.displayHeight,t.displayWidth,0);else if(t!==null)e.set(t.width,t.height,t.depth||0);else e.set(0,0,0);return e}set needsUpdate(e){if(e===!0)this.version++}toJSON(e){let t=e===void 0||typeof e==="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let s=0,a=i.length;s<a;s++)if(i[s].isDataTexture)r.push(Qd(i[s].image));else r.push(Qd(i[s]))}else r=Qd(i);n.url=r}if(!t)e.images[this.uuid]=n;return n}}function Qd(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap)return vu.getDataURL(e);else if(e.data)return{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name};else return console.warn("THREE.Texture: Unable to serialize Texture."),{}}var ZS=0,eh=new P;class Ot extends di{constructor(e=Ot.DEFAULT_IMAGE,t=Ot.DEFAULT_MAPPING,n=1001,i=1001,r=1006,s=1008,a=1023,o=1009,l=Ot.DEFAULT_ANISOTROPY,c=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:ZS++}),this.uuid=Wn(),this.name="",this.source=new na(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=s,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=o,this.offset=new re(0,0),this.repeat=new re(1,1),this.center=new re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=e&&e.depth&&e.depth>1?!0:!1,this.pmremVersion=0}get width(){return this.source.getSize(eh).x}get height(){return this.source.getSize(eh).y}get depth(){return this.source.getSize(eh).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}if(i&&n&&(i.isVector2&&n.isVector2))i.copy(n);else if(i&&n&&(i.isVector3&&n.isVector3))i.copy(n);else if(i&&n&&(i.isMatrix3&&n.isMatrix3))i.copy(n);else this[t]=n}}toJSON(e){let t=e===void 0||typeof e==="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)n.userData=this.userData;if(!t)e.textures[this.uuid]=n;return n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1000:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(e.x)%2)===1)e.x=Math.ceil(e.x)-e.x;else e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case 1000:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(e.y)%2)===1)e.y=Math.ceil(e.y)-e.y;else e.y=e.y-Math.floor(e.y);break}if(this.flipY)e.y=1-e.y;return e}set needsUpdate(e){if(e===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(e){if(e===!0)this.pmremVersion++}}Ot.DEFAULT_IMAGE=null;Ot.DEFAULT_MAPPING=300;Ot.DEFAULT_ANISOTROPY=1;class it{constructor(e=0,t=0,n=0,i=1){it.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i+s[12]*r,this.y=s[1]*t+s[5]*n+s[9]*i+s[13]*r,this.z=s[2]*t+s[6]*n+s[10]*i+s[14]*r,this.w=s[3]*t+s[7]*n+s[11]*i+s[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);if(t<0.0001)this.x=1,this.y=0,this.z=0;else this.x=e.x/t,this.y=e.y/t,this.z=e.z/t;return this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,s=0.01,a=0.1,o=e.elements,l=o[0],c=o[4],d=o[8],h=o[1],u=o[5],p=o[9],g=o[2],x=o[6],m=o[10];if(Math.abs(c-h)<0.01&&Math.abs(d-g)<0.01&&Math.abs(p-x)<0.01){if(Math.abs(c+h)<0.1&&Math.abs(d+g)<0.1&&Math.abs(p+x)<0.1&&Math.abs(l+u+m-3)<0.1)return this.set(1,0,0,0),this;t=Math.PI;let w=(l+1)/2,v=(u+1)/2,S=(m+1)/2,R=(c+h)/4,T=(d+g)/4,E=(p+x)/4;if(w>v&&w>S)if(w<0.01)n=0,i=0.707106781,r=0.707106781;else n=Math.sqrt(w),i=R/n,r=T/n;else if(v>S)if(v<0.01)n=0.707106781,i=0,r=0.707106781;else i=Math.sqrt(v),n=R/i,r=E/i;else if(S<0.01)n=0.707106781,i=0.707106781,r=0;else r=Math.sqrt(S),n=T/r,i=E/r;return this.set(n,i,r,t),this}let f=Math.sqrt((x-p)*(x-p)+(d-g)*(d-g)+(h-c)*(h-c));if(Math.abs(f)<0.001)f=1;return this.x=(x-p)/f,this.y=(d-g)/f,this.z=(h-c)/f,this.w=Math.acos((l+u+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this.w=$e(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this.w=$e(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class _u extends di{constructor(e=1,t=1,n={}){super();n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new it(0,0,e,t),this.scissorTest=!1,this.viewport=new it(0,0,e,t);let i={width:e,height:t,depth:n.depth},r=new Ot(i);this.textures=[];let s=n.count;for(let a=0;a<s;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};if(e.mapping!==void 0)t.mapping=e.mapping;if(e.wrapS!==void 0)t.wrapS=e.wrapS;if(e.wrapT!==void 0)t.wrapT=e.wrapT;if(e.wrapR!==void 0)t.wrapR=e.wrapR;if(e.magFilter!==void 0)t.magFilter=e.magFilter;if(e.minFilter!==void 0)t.minFilter=e.minFilter;if(e.format!==void 0)t.format=e.format;if(e.type!==void 0)t.type=e.type;if(e.anisotropy!==void 0)t.anisotropy=e.anisotropy;if(e.colorSpace!==void 0)t.colorSpace=e.colorSpace;if(e.flipY!==void 0)t.flipY=e.flipY;if(e.generateMipmaps!==void 0)t.generateMipmaps=e.generateMipmaps;if(e.internalFormat!==void 0)t.internalFormat=e.internalFormat;for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){if(this._depthTexture!==null)this._depthTexture.renderTarget=null;if(e!==null)e.renderTarget=this;this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new na(i)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null)this.depthTexture=e.depthTexture.clone();return this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Et extends _u{constructor(e=1,t=1,n={}){super(e,t,n);this.isWebGLRenderTarget=!0}}class ol extends Ot{constructor(e=null,t=1,n=1,i=1){super(null);this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class yu extends Ot{constructor(e=null,t=1,n=1,i=1){super(null);this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class an{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ln.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ln.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Ln.copy(t).multiplyScalar(0.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let s=0,a=r.count;s<a;s++){if(e.isMesh===!0)e.getVertexPosition(s,Ln);else Ln.fromBufferAttribute(r,s);Ln.applyMatrix4(e.matrixWorld),this.expandByPoint(Ln)}else{if(e.boundingBox!==void 0){if(e.boundingBox===null)e.computeBoundingBox();lo.copy(e.boundingBox)}else{if(n.boundingBox===null)n.computeBoundingBox();lo.copy(n.boundingBox)}lo.applyMatrix4(e.matrixWorld),this.union(lo)}}let i=e.children;for(let r=0,s=i.length;r<s;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ln),Ln.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;if(e.normal.x>0)t=e.normal.x*this.min.x,n=e.normal.x*this.max.x;else t=e.normal.x*this.max.x,n=e.normal.x*this.min.x;if(e.normal.y>0)t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y;else t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y;if(e.normal.z>0)t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z;else t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z;return t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(As),co.subVectors(this.max,As),Er.subVectors(e.a,As),Tr.subVectors(e.b,As),Ar.subVectors(e.c,As),vi.subVectors(Tr,Er),_i.subVectors(Ar,Tr),Oi.subVectors(Er,Ar);let t=[0,-vi.z,vi.y,0,-_i.z,_i.y,0,-Oi.z,Oi.y,vi.z,0,-vi.x,_i.z,0,-_i.x,Oi.z,0,-Oi.x,-vi.y,vi.x,0,-_i.y,_i.x,0,-Oi.y,Oi.x,0];if(!th(t,Er,Tr,Ar,co))return!1;if(t=[1,0,0,0,1,0,0,0,1],!th(t,Er,Tr,Ar,co))return!1;return ho.crossVectors(vi,_i),t=[ho.x,ho.y,ho.z],th(t,Er,Tr,Ar,co)}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ln).distanceTo(e)}getBoundingSphere(e){if(this.isEmpty())e.makeEmpty();else this.getCenter(e.center),e.radius=this.getSize(Ln).length()*0.5;return e}intersect(e){if(this.min.max(e.min),this.max.min(e.max),this.isEmpty())this.makeEmpty();return this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){if(this.isEmpty())return this;return ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ti),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}var ti=[new P,new P,new P,new P,new P,new P,new P,new P],Ln=new P,lo=new an,Er=new P,Tr=new P,Ar=new P,vi=new P,_i=new P,Oi=new P,As=new P,co=new P,ho=new P,Bi=new P;function th(e,t,n,i,r){for(let s=0,a=e.length-3;s<=a;s+=3){Bi.fromArray(e,s);let o=r.x*Math.abs(Bi.x)+r.y*Math.abs(Bi.y)+r.z*Math.abs(Bi.z),l=t.dot(Bi),c=n.dot(Bi),d=i.dot(Bi);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}var KS=new an,Cs=new P,nh=new P;class On{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;if(t!==void 0)n.copy(t);else KS.setFromPoints(e).getCenter(n);let i=0;for(let r=0,s=e.length;r<s;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);if(t.copy(e),n>this.radius*this.radius)t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center);return t}getBoundingBox(e){if(this.isEmpty())return e.makeEmpty(),e;return e.set(this.center,this.center),e.expandByScalar(this.radius),e}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Cs.subVectors(e,this.center);let t=Cs.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*0.5;this.center.addScaledVector(Cs,i/n),this.radius+=i}return this}union(e){if(e.isEmpty())return this;if(this.isEmpty())return this.copy(e),this;if(this.center.equals(e.center)===!0)this.radius=Math.max(this.radius,e.radius);else nh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Cs.copy(e.center).add(nh)),this.expandByPoint(Cs.copy(e.center).sub(nh));return this}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}var ni=new P,ih=new P,uo=new P,yi=new P,rh=new P,fo=new P,sh=new P;class Kr{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ni)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);if(n<0)return t.copy(this.origin);return t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ni.subVectors(e,this.origin).dot(this.direction);if(t<0)return this.origin.distanceToSquared(e);return ni.copy(this.origin).addScaledVector(this.direction,t),ni.distanceToSquared(e)}distanceSqToSegment(e,t,n,i){ih.copy(e).add(t).multiplyScalar(0.5),uo.copy(t).sub(e).normalize(),yi.copy(this.origin).sub(ih);let r=e.distanceTo(t)*0.5,s=-this.direction.dot(uo),a=yi.dot(this.direction),o=-yi.dot(uo),l=yi.lengthSq(),c=Math.abs(1-s*s),d,h,u,p;if(c>0)if(d=s*o-a,h=s*a-o,p=r*c,d>=0)if(h>=-p)if(h<=p){let g=1/c;d*=g,h*=g,u=d*(d+s*h+2*a)+h*(s*d+h+2*o)+l}else h=r,d=Math.max(0,-(s*h+a)),u=-d*d+h*(h+2*o)+l;else h=-r,d=Math.max(0,-(s*h+a)),u=-d*d+h*(h+2*o)+l;else if(h<=-p)d=Math.max(0,-(-s*r+a)),h=d>0?-r:Math.min(Math.max(-r,-o),r),u=-d*d+h*(h+2*o)+l;else if(h<=p)d=0,h=Math.min(Math.max(-r,-o),r),u=h*(h+2*o)+l;else d=Math.max(0,-(s*r+a)),h=d>0?r:Math.min(Math.max(-r,-o),r),u=-d*d+h*(h+2*o)+l;else h=s>0?-r:r,d=Math.max(0,-(s*h+a)),u=-d*d+h*(h+2*o)+l;if(n)n.copy(this.origin).addScaledVector(this.direction,d);if(i)i.copy(ih).addScaledVector(uo,h);return u}intersectSphere(e,t){ni.subVectors(e.center,this.origin);let n=ni.dot(this.direction),i=ni.dot(ni)-n*n,r=e.radius*e.radius;if(i>r)return null;let s=Math.sqrt(r-i),a=n-s,o=n+s;if(o<0)return null;if(a<0)return this.at(o,t);return this.at(a,t)}intersectsSphere(e){if(e.radius<0)return!1;return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0){if(e.distanceToPoint(this.origin)===0)return 0;return null}let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);if(n===null)return null;return this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);if(t===0)return!0;if(e.normal.dot(this.direction)*t<0)return!0;return!1}intersectBox(e,t){let n,i,r,s,a,o,l=1/this.direction.x,c=1/this.direction.y,d=1/this.direction.z,h=this.origin;if(l>=0)n=(e.min.x-h.x)*l,i=(e.max.x-h.x)*l;else n=(e.max.x-h.x)*l,i=(e.min.x-h.x)*l;if(c>=0)r=(e.min.y-h.y)*c,s=(e.max.y-h.y)*c;else r=(e.max.y-h.y)*c,s=(e.min.y-h.y)*c;if(n>s||r>i)return null;if(r>n||isNaN(n))n=r;if(s<i||isNaN(i))i=s;if(d>=0)a=(e.min.z-h.z)*d,o=(e.max.z-h.z)*d;else a=(e.max.z-h.z)*d,o=(e.min.z-h.z)*d;if(n>o||a>i)return null;if(a>n||n!==n)n=a;if(o<i||i!==i)i=o;if(i<0)return null;return this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,ni)!==null}intersectTriangle(e,t,n,i,r){rh.subVectors(t,e),fo.subVectors(n,e),sh.crossVectors(rh,fo);let s=this.direction.dot(sh),a;if(s>0){if(i)return null;a=1}else if(s<0)a=-1,s=-s;else return null;yi.subVectors(this.origin,e);let o=a*this.direction.dot(fo.crossVectors(yi,fo));if(o<0)return null;let l=a*this.direction.dot(rh.cross(yi));if(l<0)return null;if(o+l>s)return null;let c=-a*yi.dot(sh);if(c<0)return null;return this.at(c/s,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class et{constructor(e,t,n,i,r,s,a,o,l,c,d,h,u,p,g,x){if(et.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0)this.set(e,t,n,i,r,s,a,o,l,c,d,h,u,p,g,x)}set(e,t,n,i,r,s,a,o,l,c,d,h,u,p,g,x){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=r,m[5]=s,m[9]=a,m[13]=o,m[2]=l,m[6]=c,m[10]=d,m[14]=h,m[3]=u,m[7]=p,m[11]=g,m[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new et().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/Cr.setFromMatrixColumn(e,0).length(),r=1/Cr.setFromMatrixColumn(e,1).length(),s=1/Cr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*s,t[9]=n[9]*s,t[10]=n[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,{x:n,y:i,z:r}=e,s=Math.cos(n),a=Math.sin(n),o=Math.cos(i),l=Math.sin(i),c=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let h=s*c,u=s*d,p=a*c,g=a*d;t[0]=o*c,t[4]=-o*d,t[8]=l,t[1]=u+p*l,t[5]=h-g*l,t[9]=-a*o,t[2]=g-h*l,t[6]=p+u*l,t[10]=s*o}else if(e.order==="YXZ"){let h=o*c,u=o*d,p=l*c,g=l*d;t[0]=h+g*a,t[4]=p*a-u,t[8]=s*l,t[1]=s*d,t[5]=s*c,t[9]=-a,t[2]=u*a-p,t[6]=g+h*a,t[10]=s*o}else if(e.order==="ZXY"){let h=o*c,u=o*d,p=l*c,g=l*d;t[0]=h-g*a,t[4]=-s*d,t[8]=p+u*a,t[1]=u+p*a,t[5]=s*c,t[9]=g-h*a,t[2]=-s*l,t[6]=a,t[10]=s*o}else if(e.order==="ZYX"){let h=s*c,u=s*d,p=a*c,g=a*d;t[0]=o*c,t[4]=p*l-u,t[8]=h*l+g,t[1]=o*d,t[5]=g*l+h,t[9]=u*l-p,t[2]=-l,t[6]=a*o,t[10]=s*o}else if(e.order==="YZX"){let h=s*o,u=s*l,p=a*o,g=a*l;t[0]=o*c,t[4]=g-h*d,t[8]=p*d+u,t[1]=d,t[5]=s*c,t[9]=-a*c,t[2]=-l*c,t[6]=u*d+p,t[10]=h-g*d}else if(e.order==="XZY"){let h=s*o,u=s*l,p=a*o,g=a*l;t[0]=o*c,t[4]=-d,t[8]=l*c,t[1]=h*d+g,t[5]=s*c,t[9]=u*d-p,t[2]=p*d-u,t[6]=a*c,t[10]=g*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(JS,e,QS)}lookAt(e,t,n){let i=this.elements;if(un.subVectors(e,t),un.lengthSq()===0)un.z=1;if(un.normalize(),bi.crossVectors(n,un),bi.lengthSq()===0){if(Math.abs(n.z)===1)un.x+=0.0001;else un.z+=0.0001;un.normalize(),bi.crossVectors(n,un)}return bi.normalize(),po.crossVectors(un,bi),i[0]=bi.x,i[4]=po.x,i[8]=un.x,i[1]=bi.y,i[5]=po.y,i[9]=un.y,i[2]=bi.z,i[6]=po.z,i[10]=un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,s=n[0],a=n[4],o=n[8],l=n[12],c=n[1],d=n[5],h=n[9],u=n[13],p=n[2],g=n[6],x=n[10],m=n[14],f=n[3],w=n[7],v=n[11],S=n[15],R=i[0],T=i[4],E=i[8],D=i[12],y=i[1],_=i[5],A=i[9],F=i[13],q=i[2],B=i[6],ee=i[10],j=i[14],ae=i[3],W=i[7],me=i[11],fe=i[15];return r[0]=s*R+a*y+o*q+l*ae,r[4]=s*T+a*_+o*B+l*W,r[8]=s*E+a*A+o*ee+l*me,r[12]=s*D+a*F+o*j+l*fe,r[1]=c*R+d*y+h*q+u*ae,r[5]=c*T+d*_+h*B+u*W,r[9]=c*E+d*A+h*ee+u*me,r[13]=c*D+d*F+h*j+u*fe,r[2]=p*R+g*y+x*q+m*ae,r[6]=p*T+g*_+x*B+m*W,r[10]=p*E+g*A+x*ee+m*me,r[14]=p*D+g*F+x*j+m*fe,r[3]=f*R+w*y+v*q+S*ae,r[7]=f*T+w*_+v*B+S*W,r[11]=f*E+w*A+v*ee+S*me,r[15]=f*D+w*F+v*j+S*fe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],s=e[1],a=e[5],o=e[9],l=e[13],c=e[2],d=e[6],h=e[10],u=e[14],p=e[3],g=e[7],x=e[11],m=e[15];return p*(+r*o*d-i*l*d-r*a*h+n*l*h+i*a*u-n*o*u)+g*(+t*o*u-t*l*h+r*s*h-i*s*u+i*l*c-r*o*c)+x*(+t*l*d-t*a*u-r*s*d+n*s*u+r*a*c-n*l*c)+m*(-i*a*c-t*o*d+t*a*h+i*s*d-n*s*h+n*o*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;if(e.isVector3)i[12]=e.x,i[13]=e.y,i[14]=e.z;else i[12]=e,i[13]=t,i[14]=n;return this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],s=e[4],a=e[5],o=e[6],l=e[7],c=e[8],d=e[9],h=e[10],u=e[11],p=e[12],g=e[13],x=e[14],m=e[15],f=d*x*l-g*h*l+g*o*u-a*x*u-d*o*m+a*h*m,w=p*h*l-c*x*l-p*o*u+s*x*u+c*o*m-s*h*m,v=c*g*l-p*d*l+p*a*u-s*g*u-c*a*m+s*d*m,S=p*d*o-c*g*o-p*a*h+s*g*h+c*a*x-s*d*x,R=t*f+n*w+i*v+r*S;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let T=1/R;return e[0]=f*T,e[1]=(g*h*r-d*x*r-g*i*u+n*x*u+d*i*m-n*h*m)*T,e[2]=(a*x*r-g*o*r+g*i*l-n*x*l-a*i*m+n*o*m)*T,e[3]=(d*o*r-a*h*r-d*i*l+n*h*l+a*i*u-n*o*u)*T,e[4]=w*T,e[5]=(c*x*r-p*h*r+p*i*u-t*x*u-c*i*m+t*h*m)*T,e[6]=(p*o*r-s*x*r-p*i*l+t*x*l+s*i*m-t*o*m)*T,e[7]=(s*h*r-c*o*r+c*i*l-t*h*l-s*i*u+t*o*u)*T,e[8]=v*T,e[9]=(p*d*r-c*g*r-p*n*u+t*g*u+c*n*m-t*d*m)*T,e[10]=(s*g*r-p*a*r+p*n*l-t*g*l-s*n*m+t*a*m)*T,e[11]=(c*a*r-s*d*r-c*n*l+t*d*l+s*n*u-t*a*u)*T,e[12]=S*T,e[13]=(c*g*i-p*d*i+p*n*h-t*g*h-c*n*x+t*d*x)*T,e[14]=(p*a*i-s*g*i-p*n*o+t*g*o+s*n*x-t*a*x)*T,e[15]=(s*d*i-c*a*i+c*n*o-t*d*o-s*n*h+t*a*h)*T,this}scale(e){let t=this.elements,{x:n,y:i,z:r}=e;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){if(e.isVector3)this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1);else this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1);return this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,{x:s,y:a,z:o}=e,l=r*s,c=r*a;return this.set(l*s+n,l*a-i*o,l*o+i*a,0,l*a+i*o,c*a+n,c*o-i*s,0,l*o-i*a,c*o+i*s,r*o*o+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,s){return this.set(1,n,r,0,e,1,s,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,{_x:r,_y:s,_z:a,_w:o}=t,l=r+r,c=s+s,d=a+a,h=r*l,u=r*c,p=r*d,g=s*c,x=s*d,m=a*d,f=o*l,w=o*c,v=o*d,{x:S,y:R,z:T}=n;return i[0]=(1-(g+m))*S,i[1]=(u+v)*S,i[2]=(p-w)*S,i[3]=0,i[4]=(u-v)*R,i[5]=(1-(h+m))*R,i[6]=(x+f)*R,i[7]=0,i[8]=(p+w)*T,i[9]=(x-f)*T,i[10]=(1-(h+g))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,r=Cr.set(i[0],i[1],i[2]).length(),s=Cr.set(i[4],i[5],i[6]).length(),a=Cr.set(i[8],i[9],i[10]).length();if(this.determinant()<0)r=-r;e.x=i[12],e.y=i[13],e.z=i[14],Dn.copy(this);let l=1/r,c=1/s,d=1/a;return Dn.elements[0]*=l,Dn.elements[1]*=l,Dn.elements[2]*=l,Dn.elements[4]*=c,Dn.elements[5]*=c,Dn.elements[6]*=c,Dn.elements[8]*=d,Dn.elements[9]*=d,Dn.elements[10]*=d,t.setFromRotationMatrix(Dn),n.x=r,n.y=s,n.z=a,this}makePerspective(e,t,n,i,r,s,a=2000,o=!1){let l=this.elements,c=2*r/(t-e),d=2*r/(n-i),h=(t+e)/(t-e),u=(n+i)/(n-i),p,g;if(o)p=r/(s-r),g=s*r/(s-r);else if(a===2000)p=-(s+r)/(s-r),g=-2*s*r/(s-r);else if(a===2001)p=-s/(s-r),g=-s*r/(s-r);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,s,a=2000,o=!1){let l=this.elements,c=2/(t-e),d=2/(n-i),h=-(t+e)/(t-e),u=-(n+i)/(n-i),p,g;if(o)p=1/(s-r),g=s/(s-r);else if(a===2000)p=-2/(s-r),g=-(s+r)/(s-r);else if(a===2001)p=-1/(s-r),g=-r/(s-r);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=d,l[9]=0,l[13]=u,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}var Cr=new P,Dn=new et,JS=new P(0,0,0),QS=new P(1,1,1),bi=new P,po=new P,un=new P,zg=new et,Hg=new Fn;class Tn{constructor(e=0,t=0,n=0,i=Tn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],s=i[4],a=i[8],o=i[1],l=i[5],c=i[9],d=i[2],h=i[6],u=i[10];switch(t){case"XYZ":if(this._y=Math.asin($e(a,-1,1)),Math.abs(a)<0.9999999)this._x=Math.atan2(-c,u),this._z=Math.atan2(-s,r);else this._x=Math.atan2(h,l),this._z=0;break;case"YXZ":if(this._x=Math.asin(-$e(c,-1,1)),Math.abs(c)<0.9999999)this._y=Math.atan2(a,u),this._z=Math.atan2(o,l);else this._y=Math.atan2(-d,r),this._z=0;break;case"ZXY":if(this._x=Math.asin($e(h,-1,1)),Math.abs(h)<0.9999999)this._y=Math.atan2(-d,u),this._z=Math.atan2(-s,l);else this._y=0,this._z=Math.atan2(o,r);break;case"ZYX":if(this._y=Math.asin(-$e(d,-1,1)),Math.abs(d)<0.9999999)this._x=Math.atan2(h,u),this._z=Math.atan2(o,r);else this._x=0,this._z=Math.atan2(-s,l);break;case"YZX":if(this._z=Math.asin($e(o,-1,1)),Math.abs(o)<0.9999999)this._x=Math.atan2(-c,l),this._y=Math.atan2(-d,r);else this._x=0,this._y=Math.atan2(a,u);break;case"XZY":if(this._z=Math.asin(-$e(s,-1,1)),Math.abs(s)<0.9999999)this._x=Math.atan2(h,l),this._y=Math.atan2(a,r);else this._x=Math.atan2(-c,u),this._y=0;break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}if(this._order=t,n===!0)this._onChangeCallback();return this}setFromQuaternion(e,t,n){return zg.makeRotationFromQuaternion(e),this.setFromRotationMatrix(zg,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Hg.setFromEuler(this),this.setFromQuaternion(Hg,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){if(this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0)this._order=e[3];return this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Tn.DEFAULT_ORDER="XYZ";class ji{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}var e1=0,Gg=new P,Rr=new Fn,ii=new et,mo=new P,Rs=new P,t1=new P,n1=new Fn,Vg=new P(1,0,0),Wg=new P(0,1,0),$g=new P(0,0,1),qg={type:"added"},i1={type:"removed"},Pr={type:"childadded",child:null},ah={type:"childremoved",child:null};class yt extends di{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:e1++}),this.uuid=Wn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=yt.DEFAULT_UP.clone();let e=new P,t=new Tn,n=new Fn,i=new P(1,1,1);function r(){n.setFromEuler(t,!1)}function s(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new et},normalMatrix:{value:new Ke}}),this.matrix=new et,this.matrixWorld=new et,this.matrixAutoUpdate=yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ji,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Rr.setFromAxisAngle(e,t),this.quaternion.multiply(Rr),this}rotateOnWorldAxis(e,t){return Rr.setFromAxisAngle(e,t),this.quaternion.premultiply(Rr),this}rotateX(e){return this.rotateOnAxis(Vg,e)}rotateY(e){return this.rotateOnAxis(Wg,e)}rotateZ(e){return this.rotateOnAxis($g,e)}translateOnAxis(e,t){return Gg.copy(e).applyQuaternion(this.quaternion),this.position.add(Gg.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Vg,e)}translateY(e){return this.translateOnAxis(Wg,e)}translateZ(e){return this.translateOnAxis($g,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ii.copy(this.matrixWorld).invert())}lookAt(e,t,n){if(e.isVector3)mo.copy(e);else mo.set(e,t,n);let i=this.parent;if(this.updateWorldMatrix(!0,!1),Rs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)ii.lookAt(Rs,mo,this.up);else ii.lookAt(mo,Rs,this.up);if(this.quaternion.setFromRotationMatrix(ii),i)ii.extractRotation(i.matrixWorld),Rr.setFromRotationMatrix(ii),this.quaternion.premultiply(Rr.invert())}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}if(e===this)return console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this;if(e&&e.isObject3D)e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(qg),Pr.child=e,this.dispatchEvent(Pr),Pr.child=null;else console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e);return this}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);if(t!==-1)e.parent=null,this.children.splice(t,1),e.dispatchEvent(i1),ah.child=e,this.dispatchEvent(ah),ah.child=null;return this}removeFromParent(){let e=this.parent;if(e!==null)e.remove(this);return this}clear(){return this.remove(...this.children)}attach(e){if(this.updateWorldMatrix(!0,!1),ii.copy(this.matrixWorld).invert(),e.parent!==null)e.parent.updateWorldMatrix(!0,!1),ii.multiply(e.parent.matrixWorld);return e.applyMatrix4(ii),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(qg),Pr.child=e,this.dispatchEvent(Pr),Pr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}return}getObjectsByProperty(e,t,n=[]){if(this[e]===t)n.push(this);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rs,e,t1),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rs,n1,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;if(t!==null)e(t),t.traverseAncestors(e)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||e){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,e=!0}let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null)n.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);if(t===!0){let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e==="string",n={};if(t)e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"};let i={};if(i.uuid=this.uuid,i.type=this.type,this.name!=="")i.name=this.name;if(this.castShadow===!0)i.castShadow=!0;if(this.receiveShadow===!0)i.receiveShadow=!0;if(this.visible===!1)i.visible=!1;if(this.frustumCulled===!1)i.frustumCulled=!1;if(this.renderOrder!==0)i.renderOrder=this.renderOrder;if(Object.keys(this.userData).length>0)i.userData=this.userData;if(i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1)i.matrixAutoUpdate=!1;if(this.isInstancedMesh){if(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)i.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map((a)=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map((a)=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null)i.colorsTexture=this._colorsTexture.toJSON(e);if(this.boundingSphere!==null)i.boundingSphere=this.boundingSphere.toJSON();if(this.boundingBox!==null)i.boundingBox=this.boundingBox.toJSON()}function r(a,o){if(a[o.uuid]===void 0)a[o.uuid]=o.toJSON(e);return o.uuid}if(this.isScene){if(this.background){if(this.background.isColor)i.background=this.background.toJSON();else if(this.background.isTexture)i.background=this.background.toJSON(e).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)i.environment=this.environment.toJSON(e).uuid}else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let o=a.shapes;if(Array.isArray(o))for(let l=0,c=o.length;l<c;l++){let d=o[l];r(e.shapes,d)}else r(e.shapes,o)}}if(this.isSkinnedMesh){if(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let o=0,l=this.material.length;o<l;o++)a.push(r(e.materials,this.material[o]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let o=this.animations[a];i.animations.push(r(e.animations,o))}}if(t){let a=s(e.geometries),o=s(e.materials),l=s(e.textures),c=s(e.images),d=s(e.shapes),h=s(e.skeletons),u=s(e.animations),p=s(e.nodes);if(a.length>0)n.geometries=a;if(o.length>0)n.materials=o;if(l.length>0)n.textures=l;if(c.length>0)n.images=c;if(d.length>0)n.shapes=d;if(h.length>0)n.skeletons=h;if(u.length>0)n.animations=u;if(p.length>0)n.nodes=p}return n.object=i,n;function s(a){let o=[];for(let l in a){let c=a[l];delete c.metadata,o.push(c)}return o}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}}yt.DEFAULT_UP=new P(0,1,0);yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var kn=new P,ri=new P,oh=new P,si=new P,Ir=new P,Lr=new P,Xg=new P,lh=new P,ch=new P,dh=new P,hh=new it,uh=new it,fh=new it;class mn{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),kn.subVectors(e,t),i.cross(kn);let r=i.lengthSq();if(r>0)return i.multiplyScalar(1/Math.sqrt(r));return i.set(0,0,0)}static getBarycoord(e,t,n,i,r){kn.subVectors(i,t),ri.subVectors(n,t),oh.subVectors(e,t);let s=kn.dot(kn),a=kn.dot(ri),o=kn.dot(oh),l=ri.dot(ri),c=ri.dot(oh),d=s*l-a*a;if(d===0)return r.set(0,0,0),null;let h=1/d,u=(l*o-a*c)*h,p=(s*c-a*o)*h;return r.set(1-u-p,p,u)}static containsPoint(e,t,n,i){if(this.getBarycoord(e,t,n,i,si)===null)return!1;return si.x>=0&&si.y>=0&&si.x+si.y<=1}static getInterpolation(e,t,n,i,r,s,a,o){if(this.getBarycoord(e,t,n,i,si)===null){if(o.x=0,o.y=0,"z"in o)o.z=0;if("w"in o)o.w=0;return null}return o.setScalar(0),o.addScaledVector(r,si.x),o.addScaledVector(s,si.y),o.addScaledVector(a,si.z),o}static getInterpolatedAttribute(e,t,n,i,r,s){return hh.setScalar(0),uh.setScalar(0),fh.setScalar(0),hh.fromBufferAttribute(e,t),uh.fromBufferAttribute(e,n),fh.fromBufferAttribute(e,i),s.setScalar(0),s.addScaledVector(hh,r.x),s.addScaledVector(uh,r.y),s.addScaledVector(fh,r.z),s}static isFrontFacing(e,t,n,i){return kn.subVectors(n,t),ri.subVectors(e,t),kn.cross(ri).dot(i)<0?!0:!1}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return kn.subVectors(this.c,this.b),ri.subVectors(this.a,this.b),kn.cross(ri).length()*0.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(e){return mn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return mn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return mn.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return mn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return mn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,s,a;Ir.subVectors(i,n),Lr.subVectors(r,n),lh.subVectors(e,n);let o=Ir.dot(lh),l=Lr.dot(lh);if(o<=0&&l<=0)return t.copy(n);ch.subVectors(e,i);let c=Ir.dot(ch),d=Lr.dot(ch);if(c>=0&&d<=c)return t.copy(i);let h=o*d-c*l;if(h<=0&&o>=0&&c<=0)return s=o/(o-c),t.copy(n).addScaledVector(Ir,s);dh.subVectors(e,r);let u=Ir.dot(dh),p=Lr.dot(dh);if(p>=0&&u<=p)return t.copy(r);let g=u*l-o*p;if(g<=0&&l>=0&&p<=0)return a=l/(l-p),t.copy(n).addScaledVector(Lr,a);let x=c*p-u*d;if(x<=0&&d-c>=0&&u-p>=0)return Xg.subVectors(r,i),a=(d-c)/(d-c+(u-p)),t.copy(i).addScaledVector(Xg,a);let m=1/(x+g+h);return s=g*m,a=h*m,t.copy(n).addScaledVector(Ir,s).addScaledVector(Lr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}var s0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Si={h:0,s:0,l:0},go={h:0,s:0,l:0};function ph(e,t,n){if(n<0)n+=1;if(n>1)n-=1;if(n<0.16666666666666666)return e+(t-e)*6*n;if(n<0.5)return t;if(n<0.6666666666666666)return e+(t-e)*6*(0.6666666666666666-n);return e}class Ne{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;if(i&&i.isColor)this.copy(i);else if(typeof i==="number")this.setHex(i);else if(typeof i==="string")this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t="srgb"){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,nt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=nt.workingColorSpace){return this.r=e,this.g=t,this.b=n,nt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=nt.workingColorSpace){if(e=gu(e,1),t=$e(t,0,1),n=$e(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=0.5?n*(1+t):n+t-n*t,s=2*n-r;this.r=ph(s,r,e+0.3333333333333333),this.g=ph(s,r,e),this.b=ph(s,r,e-0.3333333333333333)}return nt.colorSpaceToWorking(this,i),this}setStyle(e,t="srgb"){function n(r){if(r===void 0)return;if(parseFloat(r)<1)console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,s=i[1],a=i[2];switch(s){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],s=r.length;if(s===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);else if(s===6)return this.setHex(parseInt(r,16),t);else console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t="srgb"){let n=s0[e.toLowerCase()];if(n!==void 0)this.setHex(n,t);else console.warn("THREE.Color: Unknown color "+e);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ai(e.r),this.g=ai(e.g),this.b=ai(e.b),this}copyLinearToSRGB(e){return this.r=Vr(e.r),this.g=Vr(e.g),this.b=Vr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e="srgb"){return nt.workingToColorSpace($t.copy(this),e),Math.round($e($t.r*255,0,255))*65536+Math.round($e($t.g*255,0,255))*256+Math.round($e($t.b*255,0,255))}getHexString(e="srgb"){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=nt.workingColorSpace){nt.workingToColorSpace($t.copy(this),t);let{r:n,g:i,b:r}=$t,s=Math.max(n,i,r),a=Math.min(n,i,r),o,l,c=(a+s)/2;if(a===s)o=0,l=0;else{let d=s-a;switch(l=c<=0.5?d/(s+a):d/(2-s-a),s){case n:o=(i-r)/d+(i<r?6:0);break;case i:o=(r-n)/d+2;break;case r:o=(n-i)/d+4;break}o/=6}return e.h=o,e.s=l,e.l=c,e}getRGB(e,t=nt.workingColorSpace){return nt.workingToColorSpace($t.copy(this),t),e.r=$t.r,e.g=$t.g,e.b=$t.b,e}getStyle(e="srgb"){nt.workingToColorSpace($t.copy(this),e);let{r:t,g:n,b:i}=$t;if(e!=="srgb")return`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`;return`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Si),this.setHSL(Si.h+e,Si.s+t,Si.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Si),e.getHSL(go);let n=Bs(Si.h,go.h,t),i=Bs(Si.s,go.s,t),r=Bs(Si.l,go.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var $t=new Ne;Ne.NAMES=s0;var r1=0;class Yn extends di{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:r1++}),this.uuid=Wn(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ne(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){if(this._alphaTest>0!==e>0)this.version++;this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e===void 0)return;for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}if(i&&i.isColor)i.set(n);else if(i&&i.isVector3&&(n&&n.isVector3))i.copy(n);else this[t]=n}}toJSON(e){let t=e===void 0||typeof e==="string";if(t)e={textures:{},images:{}};let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};if(n.uuid=this.uuid,n.type=this.type,this.name!=="")n.name=this.name;if(this.color&&this.color.isColor)n.color=this.color.getHex();if(this.roughness!==void 0)n.roughness=this.roughness;if(this.metalness!==void 0)n.metalness=this.metalness;if(this.sheen!==void 0)n.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)n.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)n.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)n.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1)n.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)n.specular=this.specular.getHex();if(this.specularIntensity!==void 0)n.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)n.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)n.shininess=this.shininess;if(this.clearcoat!==void 0)n.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)n.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.sheenColorMap&&this.sheenColorMap.isTexture)n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid;if(this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture)n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid;if(this.dispersion!==void 0)n.dispersion=this.dispersion;if(this.iridescence!==void 0)n.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)n.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)n.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid;if(this.anisotropy!==void 0)n.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)n.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid;if(this.map&&this.map.isTexture)n.map=this.map.toJSON(e).uuid;if(this.matcap&&this.matcap.isTexture)n.matcap=this.matcap.toJSON(e).uuid;if(this.alphaMap&&this.alphaMap.isTexture)n.alphaMap=this.alphaMap.toJSON(e).uuid;if(this.lightMap&&this.lightMap.isTexture)n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)n.roughnessMap=this.roughnessMap.toJSON(e).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)n.metalnessMap=this.metalnessMap.toJSON(e).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)n.emissiveMap=this.emissiveMap.toJSON(e).uuid;if(this.specularMap&&this.specularMap.isTexture)n.specularMap=this.specularMap.toJSON(e).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)n.specularColorMap=this.specularColorMap.toJSON(e).uuid;if(this.envMap&&this.envMap.isTexture){if(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0)n.combine=this.combine}if(this.envMapRotation!==void 0)n.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)n.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)n.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)n.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)n.gradientMap=this.gradientMap.toJSON(e).uuid;if(this.transmission!==void 0)n.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)n.transmissionMap=this.transmissionMap.toJSON(e).uuid;if(this.thickness!==void 0)n.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)n.thicknessMap=this.thicknessMap.toJSON(e).uuid;if(this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0)n.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)n.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)n.size=this.size;if(this.shadowSide!==null)n.shadowSide=this.shadowSide;if(this.sizeAttenuation!==void 0)n.sizeAttenuation=this.sizeAttenuation;if(this.blending!==1)n.blending=this.blending;if(this.side!==0)n.side=this.side;if(this.vertexColors===!0)n.vertexColors=!0;if(this.opacity<1)n.opacity=this.opacity;if(this.transparent===!0)n.transparent=!0;if(this.blendSrc!==204)n.blendSrc=this.blendSrc;if(this.blendDst!==205)n.blendDst=this.blendDst;if(this.blendEquation!==100)n.blendEquation=this.blendEquation;if(this.blendSrcAlpha!==null)n.blendSrcAlpha=this.blendSrcAlpha;if(this.blendDstAlpha!==null)n.blendDstAlpha=this.blendDstAlpha;if(this.blendEquationAlpha!==null)n.blendEquationAlpha=this.blendEquationAlpha;if(this.blendColor&&this.blendColor.isColor)n.blendColor=this.blendColor.getHex();if(this.blendAlpha!==0)n.blendAlpha=this.blendAlpha;if(this.depthFunc!==3)n.depthFunc=this.depthFunc;if(this.depthTest===!1)n.depthTest=this.depthTest;if(this.depthWrite===!1)n.depthWrite=this.depthWrite;if(this.colorWrite===!1)n.colorWrite=this.colorWrite;if(this.stencilWriteMask!==255)n.stencilWriteMask=this.stencilWriteMask;if(this.stencilFunc!==519)n.stencilFunc=this.stencilFunc;if(this.stencilRef!==0)n.stencilRef=this.stencilRef;if(this.stencilFuncMask!==255)n.stencilFuncMask=this.stencilFuncMask;if(this.stencilFail!==7680)n.stencilFail=this.stencilFail;if(this.stencilZFail!==7680)n.stencilZFail=this.stencilZFail;if(this.stencilZPass!==7680)n.stencilZPass=this.stencilZPass;if(this.stencilWrite===!0)n.stencilWrite=this.stencilWrite;if(this.rotation!==void 0&&this.rotation!==0)n.rotation=this.rotation;if(this.polygonOffset===!0)n.polygonOffset=!0;if(this.polygonOffsetFactor!==0)n.polygonOffsetFactor=this.polygonOffsetFactor;if(this.polygonOffsetUnits!==0)n.polygonOffsetUnits=this.polygonOffsetUnits;if(this.linewidth!==void 0&&this.linewidth!==1)n.linewidth=this.linewidth;if(this.dashSize!==void 0)n.dashSize=this.dashSize;if(this.gapSize!==void 0)n.gapSize=this.gapSize;if(this.scale!==void 0)n.scale=this.scale;if(this.dithering===!0)n.dithering=!0;if(this.alphaTest>0)n.alphaTest=this.alphaTest;if(this.alphaHash===!0)n.alphaHash=!0;if(this.alphaToCoverage===!0)n.alphaToCoverage=!0;if(this.premultipliedAlpha===!0)n.premultipliedAlpha=!0;if(this.forceSinglePass===!0)n.forceSinglePass=!0;if(this.wireframe===!0)n.wireframe=!0;if(this.wireframeLinewidth>1)n.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!=="round")n.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!=="round")n.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading===!0)n.flatShading=!0;if(this.visible===!1)n.visible=!1;if(this.toneMapped===!1)n.toneMapped=!1;if(this.fog===!1)n.fog=!1;if(Object.keys(this.userData).length>0)n.userData=this.userData;function i(r){let s=[];for(let a in r){let o=r[a];delete o.metadata,s.push(o)}return s}if(t){let r=i(e.textures),s=i(e.images);if(r.length>0)n.textures=r;if(s.length>0)n.images=s}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){if(e===!0)this.version++}}class en extends Yn{constructor(e){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}var At=new P,xo=new re,s1=0;class sn{constructor(e,t,n=!1){if(Array.isArray(e))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:s1++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){if(e===!0)this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)xo.fromBufferAttribute(this,t),xo.applyMatrix3(e),this.setXY(t,xo.x,xo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];if(this.normalized)n=Nn(n,this.array);return n}setComponent(e,t,n){if(this.normalized)n=st(n,this.array);return this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];if(this.normalized)t=Nn(t,this.array);return t}setX(e,t){if(this.normalized)t=st(t,this.array);return this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];if(this.normalized)t=Nn(t,this.array);return t}setY(e,t){if(this.normalized)t=st(t,this.array);return this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];if(this.normalized)t=Nn(t,this.array);return t}setZ(e,t){if(this.normalized)t=st(t,this.array);return this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];if(this.normalized)t=Nn(t,this.array);return t}setW(e,t){if(this.normalized)t=st(t,this.array);return this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){if(e*=this.itemSize,this.normalized)t=st(t,this.array),n=st(n,this.array);return this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){if(e*=this.itemSize,this.normalized)t=st(t,this.array),n=st(n,this.array),i=st(i,this.array);return this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){if(e*=this.itemSize,this.normalized)t=st(t,this.array),n=st(n,this.array),i=st(i,this.array),r=st(r,this.array);return this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};if(this.name!=="")e.name=this.name;if(this.usage!==35044)e.usage=this.usage;return e}}class ll extends sn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class cl extends sn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Qe extends sn{constructor(e,t,n){super(new Float32Array(e),t,n)}}var a1=0,En=new et,mh=new yt,Dr=new P,fn=new an,Ps=new an,Nt=new P;class Tt extends di{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:a1++}),this.uuid=Wn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){if(Array.isArray(e))this.index=new((xu(e))?cl:ll)(e,1);else this.index=e;return this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;if(t!==void 0)t.applyMatrix4(e),t.needsUpdate=!0;let n=this.attributes.normal;if(n!==void 0){let r=new Ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;if(i!==void 0)i.transformDirection(e),i.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this}applyQuaternion(e){return En.makeRotationFromQuaternion(e),this.applyMatrix4(En),this}rotateX(e){return En.makeRotationX(e),this.applyMatrix4(En),this}rotateY(e){return En.makeRotationY(e),this.applyMatrix4(En),this}rotateZ(e){return En.makeRotationZ(e),this.applyMatrix4(En),this}translate(e,t,n){return En.makeTranslation(e,t,n),this.applyMatrix4(En),this}scale(e,t,n){return En.makeScale(e,t,n),this.applyMatrix4(En),this}lookAt(e){return mh.lookAt(e),mh.updateMatrix(),this.applyMatrix4(mh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Dr).negate(),this.translate(Dr.x,Dr.y,Dr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let s=e[i];n.push(s.x,s.y,s.z||0)}this.setAttribute("position",new Qe(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}if(e.length>t.count)console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");t.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new an;let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];if(fn.setFromBufferAttribute(r),this.morphTargetsRelative)Nt.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Nt),Nt.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Nt);else this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new On;let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){let n=this.boundingSphere.center;if(fn.setFromBufferAttribute(e),t)for(let r=0,s=t.length;r<s;r++){let a=t[r];if(Ps.setFromBufferAttribute(a),this.morphTargetsRelative)Nt.addVectors(fn.min,Ps.min),fn.expandByPoint(Nt),Nt.addVectors(fn.max,Ps.max),fn.expandByPoint(Nt);else fn.expandByPoint(Ps.min),fn.expandByPoint(Ps.max)}fn.getCenter(n);let i=0;for(let r=0,s=e.count;r<s;r++)Nt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Nt));if(t)for(let r=0,s=t.length;r<s;r++){let a=t[r],o=this.morphTargetsRelative;for(let l=0,c=a.count;l<c;l++){if(Nt.fromBufferAttribute(a,l),o)Dr.fromBufferAttribute(e,l),Nt.add(Dr);i=Math.max(i,n.distanceToSquared(Nt))}}if(this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius))console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:n,normal:i,uv:r}=t;if(this.hasAttribute("tangent")===!1)this.setAttribute("tangent",new sn(new Float32Array(4*n.count),4));let s=this.getAttribute("tangent"),a=[],o=[];for(let E=0;E<n.count;E++)a[E]=new P,o[E]=new P;let l=new P,c=new P,d=new P,h=new re,u=new re,p=new re,g=new P,x=new P;function m(E,D,y){l.fromBufferAttribute(n,E),c.fromBufferAttribute(n,D),d.fromBufferAttribute(n,y),h.fromBufferAttribute(r,E),u.fromBufferAttribute(r,D),p.fromBufferAttribute(r,y),c.sub(l),d.sub(l),u.sub(h),p.sub(h);let _=1/(u.x*p.y-p.x*u.y);if(!isFinite(_))return;g.copy(c).multiplyScalar(p.y).addScaledVector(d,-u.y).multiplyScalar(_),x.copy(d).multiplyScalar(u.x).addScaledVector(c,-p.x).multiplyScalar(_),a[E].add(g),a[D].add(g),a[y].add(g),o[E].add(x),o[D].add(x),o[y].add(x)}let f=this.groups;if(f.length===0)f=[{start:0,count:e.count}];for(let E=0,D=f.length;E<D;++E){let y=f[E],{start:_,count:A}=y;for(let F=_,q=_+A;F<q;F+=3)m(e.getX(F+0),e.getX(F+1),e.getX(F+2))}let w=new P,v=new P,S=new P,R=new P;function T(E){S.fromBufferAttribute(i,E),R.copy(S);let D=a[E];w.copy(D),w.sub(S.multiplyScalar(S.dot(D))).normalize(),v.crossVectors(R,D);let _=v.dot(o[E])<0?-1:1;s.setXYZW(E,w.x,w.y,w.z,_)}for(let E=0,D=f.length;E<D;++E){let y=f[E],{start:_,count:A}=y;for(let F=_,q=_+A;F<q;F+=3)T(e.getX(F+0)),T(e.getX(F+1)),T(e.getX(F+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new sn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,u=n.count;h<u;h++)n.setXYZ(h,0,0,0);let i=new P,r=new P,s=new P,a=new P,o=new P,l=new P,c=new P,d=new P;if(e)for(let h=0,u=e.count;h<u;h+=3){let p=e.getX(h+0),g=e.getX(h+1),x=e.getX(h+2);i.fromBufferAttribute(t,p),r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,x),c.subVectors(s,r),d.subVectors(i,r),c.cross(d),a.fromBufferAttribute(n,p),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),a.add(c),o.add(c),l.add(c),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z)}else for(let h=0,u=t.count;h<u;h+=3)i.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),s.fromBufferAttribute(t,h+2),c.subVectors(s,r),d.subVectors(i,r),c.cross(d),n.setXYZ(h+0,c.x,c.y,c.z),n.setXYZ(h+1,c.x,c.y,c.z),n.setXYZ(h+2,c.x,c.y,c.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Nt.fromBufferAttribute(e,t),Nt.normalize(),e.setXYZ(t,Nt.x,Nt.y,Nt.z)}toNonIndexed(){function e(a,o){let{array:l,itemSize:c,normalized:d}=a,h=new l.constructor(o.length*c),u=0,p=0;for(let g=0,x=o.length;g<x;g++){if(a.isInterleavedBufferAttribute)u=o[g]*a.data.stride+a.offset;else u=o[g]*c;for(let m=0;m<c;m++)h[p++]=l[u++]}return new sn(h,c,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new Tt,n=this.index.array,i=this.attributes;for(let a in i){let o=i[a],l=e(o,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let o=[],l=r[a];for(let c=0,d=l.length;c<d;c++){let h=l[c],u=e(h,n);o.push(u)}t.morphAttributes[a]=o}t.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let a=0,o=s.length;a<o;a++){let l=s[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!=="")e.name=this.name;if(Object.keys(this.userData).length>0)e.userData=this.userData;if(this.parameters!==void 0){let o=this.parameters;for(let l in o)if(o[l]!==void 0)e[l]=o[l];return e}e.data={attributes:{}};let t=this.index;if(t!==null)e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)};let n=this.attributes;for(let o in n){let l=n[o];e.data.attributes[o]=l.toJSON(e.data)}let i={},r=!1;for(let o in this.morphAttributes){let l=this.morphAttributes[o],c=[];for(let d=0,h=l.length;d<h;d++){let u=l[d];c.push(u.toJSON(e.data))}if(c.length>0)i[o]=c,r=!0}if(r)e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;if(s.length>0)e.data.groups=JSON.parse(JSON.stringify(s));let a=this.boundingSphere;if(a!==null)e.data.boundingSphere=a.toJSON();return e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;if(n!==null)this.setIndex(n.clone());let i=e.attributes;for(let l in i){let c=i[l];this.setAttribute(l,c.clone(t))}let r=e.morphAttributes;for(let l in r){let c=[],d=r[l];for(let h=0,u=d.length;h<u;h++)c.push(d[h].clone(t));this.morphAttributes[l]=c}this.morphTargetsRelative=e.morphTargetsRelative;let s=e.groups;for(let l=0,c=s.length;l<c;l++){let d=s[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;if(a!==null)this.boundingBox=a.clone();let o=e.boundingSphere;if(o!==null)this.boundingSphere=o.clone();return this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}var Yg=new et,zi=new Kr,vo=new On,jg=new P,_o=new P,yo=new P,bo=new P,gh=new P,So=new P,Zg=new P,wo=new P;class Ze extends yt{constructor(e=new Tt,t=new en){super();this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){if(super.copy(e,t),e.morphTargetInfluences!==void 0)this.morphTargetInfluences=e.morphTargetInfluences.slice();if(e.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary);return this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=i.length;r<s;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,s=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(r&&a){So.set(0,0,0);for(let o=0,l=r.length;o<l;o++){let c=a[o],d=r[o];if(c===0)continue;if(gh.fromBufferAttribute(d,e),s)So.addScaledVector(gh,c);else So.addScaledVector(gh.sub(t),c)}t.add(So)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;if(i===void 0)return;if(n.boundingSphere===null)n.computeBoundingSphere();if(vo.copy(n.boundingSphere),vo.applyMatrix4(r),zi.copy(e.ray).recast(e.near),vo.containsPoint(zi.origin)===!1){if(zi.intersectSphere(vo,jg)===null)return;if(zi.origin.distanceToSquared(jg)>(e.far-e.near)**2)return}if(Yg.copy(r).invert(),zi.copy(e.ray).applyMatrix4(Yg),n.boundingBox!==null){if(zi.intersectsBox(n.boundingBox)===!1)return}this._computeIntersections(e,t,zi)}_computeIntersections(e,t,n){let i,r=this.geometry,s=this.material,a=r.index,o=r.attributes.position,l=r.attributes.uv,c=r.attributes.uv1,d=r.attributes.normal,{groups:h,drawRange:u}=r;if(a!==null)if(Array.isArray(s))for(let p=0,g=h.length;p<g;p++){let x=h[p],m=s[x.materialIndex],f=Math.max(x.start,u.start),w=Math.min(a.count,Math.min(x.start+x.count,u.start+u.count));for(let v=f,S=w;v<S;v+=3){let R=a.getX(v),T=a.getX(v+1),E=a.getX(v+2);if(i=Mo(this,m,e,n,l,c,d,R,T,E),i)i.faceIndex=Math.floor(v/3),i.face.materialIndex=x.materialIndex,t.push(i)}}else{let p=Math.max(0,u.start),g=Math.min(a.count,u.start+u.count);for(let x=p,m=g;x<m;x+=3){let f=a.getX(x),w=a.getX(x+1),v=a.getX(x+2);if(i=Mo(this,s,e,n,l,c,d,f,w,v),i)i.faceIndex=Math.floor(x/3),t.push(i)}}else if(o!==void 0)if(Array.isArray(s))for(let p=0,g=h.length;p<g;p++){let x=h[p],m=s[x.materialIndex],f=Math.max(x.start,u.start),w=Math.min(o.count,Math.min(x.start+x.count,u.start+u.count));for(let v=f,S=w;v<S;v+=3){let R=v,T=v+1,E=v+2;if(i=Mo(this,m,e,n,l,c,d,R,T,E),i)i.faceIndex=Math.floor(v/3),i.face.materialIndex=x.materialIndex,t.push(i)}}else{let p=Math.max(0,u.start),g=Math.min(o.count,u.start+u.count);for(let x=p,m=g;x<m;x+=3){let f=x,w=x+1,v=x+2;if(i=Mo(this,s,e,n,l,c,d,f,w,v),i)i.faceIndex=Math.floor(x/3),t.push(i)}}}}function o1(e,t,n,i,r,s,a,o){let l;if(t.side===1)l=i.intersectTriangle(a,s,r,!0,o);else l=i.intersectTriangle(r,s,a,t.side===0,o);if(l===null)return null;wo.copy(o),wo.applyMatrix4(e.matrixWorld);let c=n.ray.origin.distanceTo(wo);if(c<n.near||c>n.far)return null;return{distance:c,point:wo.clone(),object:e}}function Mo(e,t,n,i,r,s,a,o,l,c){e.getVertexPosition(o,_o),e.getVertexPosition(l,yo),e.getVertexPosition(c,bo);let d=o1(e,t,n,i,_o,yo,bo,Zg);if(d){let h=new P;if(mn.getBarycoord(Zg,_o,yo,bo,h),r)d.uv=mn.getInterpolatedAttribute(r,o,l,c,h,new re);if(s)d.uv1=mn.getInterpolatedAttribute(s,o,l,c,h,new re);if(a){if(d.normal=mn.getInterpolatedAttribute(a,o,l,c,h,new P),d.normal.dot(i.direction)>0)d.normal.multiplyScalar(-1)}let u={a:o,b:l,c,normal:new P,materialIndex:0};mn.getNormal(_o,yo,bo,u.normal),d.face=u,d.barycoord=h}return d}class wt extends Tt{constructor(e=1,t=1,n=1,i=1,r=1,s=1){super();this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:s};let a=this;i=Math.floor(i),r=Math.floor(r),s=Math.floor(s);let o=[],l=[],c=[],d=[],h=0,u=0;p("z","y","x",-1,-1,n,t,e,s,r,0),p("z","y","x",1,-1,n,t,-e,s,r,1),p("x","z","y",1,1,e,n,t,i,s,2),p("x","z","y",1,-1,e,n,-t,i,s,3),p("x","y","z",1,-1,e,t,n,i,r,4),p("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(o),this.setAttribute("position",new Qe(l,3)),this.setAttribute("normal",new Qe(c,3)),this.setAttribute("uv",new Qe(d,2));function p(g,x,m,f,w,v,S,R,T,E,D){let y=v/T,_=S/E,A=v/2,F=S/2,q=R/2,B=T+1,ee=E+1,j=0,ae=0,W=new P;for(let me=0;me<ee;me++){let fe=me*_-F;for(let Ae=0;Ae<B;Ae++){let Se=Ae*y-A;W[g]=Se*f,W[x]=fe*w,W[m]=q,l.push(W.x,W.y,W.z),W[g]=0,W[x]=0,W[m]=R>0?1:-1,c.push(W.x,W.y,W.z),d.push(Ae/T),d.push(1-me/E),j+=1}}for(let me=0;me<E;me++)for(let fe=0;fe<T;fe++){let Ae=h+fe+B*me,Se=h+fe+B*(me+1),N=h+(fe+1)+B*(me+1),ne=h+(fe+1)+B*me;o.push(Ae,Se,ne),o.push(Se,N,ne),ae+=6}a.addGroup(u,ae,D),u+=ae,h+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Zi(e){let t={};for(let n in e){t[n]={};for(let i in e[n]){let r=e[n][i];if(r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion))if(r.isRenderTargetTexture)console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null;else t[n][i]=r.clone();else if(Array.isArray(r))t[n][i]=r.slice();else t[n][i]=r}}return t}function Xt(e){let t={};for(let n=0;n<e.length;n++){let i=Zi(e[n]);for(let r in i)t[r]=i[r]}return t}function l1(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function bu(e){let t=e.getRenderTarget();if(t===null)return e.outputColorSpace;if(t.isXRRenderTarget===!0)return t.texture.colorSpace;return nt.workingColorSpace}var Ut={clone:Zi,merge:Xt},c1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,d1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ot extends Yn{constructor(e){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=c1,this.fragmentShader=d1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0)this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Zi(e.uniforms),this.uniformsGroups=l1(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let s=this.uniforms[i].value;if(s&&s.isTexture)t.uniforms[i]={type:"t",value:s.toJSON(e).uuid};else if(s&&s.isColor)t.uniforms[i]={type:"c",value:s.getHex()};else if(s&&s.isVector2)t.uniforms[i]={type:"v2",value:s.toArray()};else if(s&&s.isVector3)t.uniforms[i]={type:"v3",value:s.toArray()};else if(s&&s.isVector4)t.uniforms[i]={type:"v4",value:s.toArray()};else if(s&&s.isMatrix3)t.uniforms[i]={type:"m3",value:s.toArray()};else if(s&&s.isMatrix4)t.uniforms[i]={type:"m4",value:s.toArray()};else t.uniforms[i]={value:s}}if(Object.keys(this.defines).length>0)t.defines=this.defines;t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)if(this.extensions[i]===!0)n[i]=!0;if(Object.keys(n).length>0)t.extensions=n;return t}}class dl extends yt{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new et,this.projectionMatrix=new et,this.projectionMatrixInverse=new et,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}var wi=new P,Kg=new re,Jg=new re;class qt extends dl{constructor(e=50,t=1,n=0.1,i=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=0.5*this.getFilmHeight()/e;this.fov=Wr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Os*0.5*this.fov);return 0.5*this.getFilmHeight()/e}getEffectiveFOV(){return Wr*2*Math.atan(Math.tan(Os*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){wi.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),t.set(wi.x,wi.y).multiplyScalar(-e/wi.z),wi.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),n.set(wi.x,wi.y).multiplyScalar(-e/wi.z)}getViewSize(e,t){return this.getViewBounds(e,Kg,Jg),t.subVectors(Jg,Kg)}setViewOffset(e,t,n,i,r,s){if(this.aspect=e/t,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Os*0.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-0.5*i,s=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:o,fullHeight:l}=s;r+=s.offsetX*i/o,t-=s.offsetY*n/l,i*=s.width/o,n*=s.height/l}let a=this.filmOffset;if(a!==0)r+=e*a/this.getFilmWidth();this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);if(t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null)t.object.view=Object.assign({},this.view);return t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}var kr=-90,Nr=1;class Su extends yt{constructor(e,t,n){super();this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new qt(kr,Nr,e,t);i.layers=this.layers,this.add(i);let r=new qt(kr,Nr,e,t);r.layers=this.layers,this.add(r);let s=new qt(kr,Nr,e,t);s.layers=this.layers,this.add(s);let a=new qt(kr,Nr,e,t);a.layers=this.layers,this.add(a);let o=new qt(kr,Nr,e,t);o.layers=this.layers,this.add(o);let l=new qt(kr,Nr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,s,a,o]=t;for(let l of t)this.remove(l);if(e===2000)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;if(this.coordinateSystem!==e.coordinateSystem)this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem();let[r,s,a,o,l,c]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,s),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,o),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,c),e.setRenderTarget(d,h,u),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class hl extends Ot{constructor(e=[],t=301,n,i,r,s,a,o,l,c){super(e,t,n,i,r,s,a,o,l,c);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class wu extends Et{constructor(e=1,t={}){super(e,e,t);this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new hl(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new wt(5,5,5),r=new ot({name:"CubemapFromEquirect",uniforms:Zi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});r.uniforms.tEquirect.value=t;let s=new Ze(i,r),a=t.minFilter;if(t.minFilter===1008)t.minFilter=1006;return new Su(1,10,this).update(e,s),t.minFilter=a,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let r=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,n,i);e.setRenderTarget(r)}}class gn extends yt{constructor(){super();this.isGroup=!0,this.type="Group"}}var h1={type:"move"};class ia{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new gn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new gn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new gn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P;return this._grip}dispatchEvent(e){if(this._targetRay!==null)this._targetRay.dispatchEvent(e);if(this._grip!==null)this._grip.dispatchEvent(e);if(this._hand!==null)this._hand.dispatchEvent(e);return this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){if(this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(e,t,n){let i=null,r=null,s=null,a=this._targetRay,o=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){s=!0;for(let g of e.hand.values()){let x=t.getJointPose(g,n),m=this._getHandJoint(l,g);if(x!==null)m.matrix.fromArray(x.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=x.radius;m.visible=x!==null}let c=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=c.position.distanceTo(d.position),u=0.02,p=0.005;if(l.inputState.pinching&&h>u+p)l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this});else if(!l.inputState.pinching&&h<=u-p)l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this})}else if(o!==null&&e.gripSpace){if(r=t.getPose(e.gripSpace,n),r!==null){if(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity)o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity);else o.hasLinearVelocity=!1;if(r.angularVelocity)o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity);else o.hasAngularVelocity=!1}}if(a!==null){if(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null)i=r;if(i!==null){if(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity)a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity);else a.hasLinearVelocity=!1;if(i.angularVelocity)a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity);else a.hasAngularVelocity=!1;this.dispatchEvent(h1)}}}if(a!==null)a.visible=i!==null;if(o!==null)o.visible=r!==null;if(l!==null)l.visible=s!==null;return this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new gn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class ra{constructor(e,t=1,n=1000){this.isFog=!0,this.name="",this.color=new Ne(e),this.near=t,this.far=n}clone(){return new ra(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Ki extends yt{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Tn,this.environmentIntensity=1,this.environmentRotation=new Tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){if(super.copy(e,t),e.background!==null)this.background=e.background.clone();if(e.environment!==null)this.environment=e.environment.clone();if(e.fog!==null)this.fog=e.fog.clone();if(this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null)this.overrideMaterial=e.overrideMaterial.clone();return this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);if(this.fog!==null)t.object.fog=this.fog.toJSON();if(this.backgroundBlurriness>0)t.object.backgroundBlurriness=this.backgroundBlurriness;if(this.backgroundIntensity!==1)t.object.backgroundIntensity=this.backgroundIntensity;if(t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1)t.object.environmentIntensity=this.environmentIntensity;return t.object.environmentRotation=this.environmentRotation.toArray(),t}}class ul{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=Wn()}onUploadCallback(){}set needsUpdate(e){if(e===!0)this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){if(e.arrayBuffers===void 0)e.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=Wn();if(e.arrayBuffers[this.array.buffer._uuid]===void 0)e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer;let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){if(e.arrayBuffers===void 0)e.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=Wn();if(e.arrayBuffers[this.array.buffer._uuid]===void 0)e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer));return{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}var Kt=new P;class xn{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix4(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyNormalMatrix(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.transformDirection(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];if(this.normalized)n=Nn(n,this.array);return n}setComponent(e,t,n){if(this.normalized)n=st(n,this.array);return this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){if(this.normalized)t=st(t,this.array);return this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){if(this.normalized)t=st(t,this.array);return this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){if(this.normalized)t=st(t,this.array);return this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){if(this.normalized)t=st(t,this.array);return this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];if(this.normalized)t=Nn(t,this.array);return t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];if(this.normalized)t=Nn(t,this.array);return t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];if(this.normalized)t=Nn(t,this.array);return t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];if(this.normalized)t=Nn(t,this.array);return t}setXY(e,t,n){if(e=e*this.data.stride+this.offset,this.normalized)t=st(t,this.array),n=st(n,this.array);return this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){if(e=e*this.data.stride+this.offset,this.normalized)t=st(t,this.array),n=st(n,this.array),i=st(i,this.array);return this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){if(e=e*this.data.stride+this.offset,this.normalized)t=st(t,this.array),n=st(n,this.array),i=st(i,this.array),r=st(r,this.array);return this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new sn(new this.array.constructor(t),this.itemSize,this.normalized)}else{if(e.interleavedBuffers===void 0)e.interleavedBuffers={};if(e.interleavedBuffers[this.data.uuid]===void 0)e.interleavedBuffers[this.data.uuid]=this.data.clone(e);return new xn(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else{if(e.interleavedBuffers===void 0)e.interleavedBuffers={};if(e.interleavedBuffers[this.data.uuid]===void 0)e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e);return{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}}class Ri extends Yn{constructor(e){super();this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}var Ur,Is=new P,Fr=new P,Or=new P,Br=new re,Ls=new re,a0=new et,Eo=new P,Ds=new P,To=new P,Qg=new re,xh=new re,ex=new re;class Ji extends yt{constructor(e=new Ri){super();if(this.isSprite=!0,this.type="Sprite",Ur===void 0){Ur=new Tt;let t=new Float32Array([-0.5,-0.5,0,0,0,0.5,-0.5,0,1,0,0.5,0.5,0,1,1,-0.5,0.5,0,0,1]),n=new ul(t,5);Ur.setIndex([0,1,2,0,2,3]),Ur.setAttribute("position",new xn(n,3,0,!1)),Ur.setAttribute("uv",new xn(n,2,3,!1))}this.geometry=Ur,this.material=e,this.center=new re(0.5,0.5),this.count=1}raycast(e,t){if(e.camera===null)console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.');if(Fr.setFromMatrixScale(this.matrixWorld),a0.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Or.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1)Fr.multiplyScalar(-Or.z);let n=this.material.rotation,i,r;if(n!==0)r=Math.cos(n),i=Math.sin(n);let s=this.center;Ao(Eo.set(-0.5,-0.5,0),Or,s,Fr,i,r),Ao(Ds.set(0.5,-0.5,0),Or,s,Fr,i,r),Ao(To.set(0.5,0.5,0),Or,s,Fr,i,r),Qg.set(0,0),xh.set(1,0),ex.set(1,1);let a=e.ray.intersectTriangle(Eo,Ds,To,!1,Is);if(a===null){if(Ao(Ds.set(-0.5,0.5,0),Or,s,Fr,i,r),xh.set(0,1),a=e.ray.intersectTriangle(Eo,To,Ds,!1,Is),a===null)return}let o=e.ray.origin.distanceTo(Is);if(o<e.near||o>e.far)return;t.push({distance:o,point:Is.clone(),uv:mn.getInterpolation(Is,Eo,Ds,To,Qg,xh,ex,new re),face:null,object:this})}copy(e,t){if(super.copy(e,t),e.center!==void 0)this.center.copy(e.center);return this.material=e.material,this}}function Ao(e,t,n,i,r,s){if(Br.subVectors(e,n).addScalar(0.5).multiply(i),r!==void 0)Ls.x=s*Br.x-r*Br.y,Ls.y=r*Br.x+s*Br.y;else Ls.copy(Br);e.copy(t),e.x+=Ls.x,e.y+=Ls.y,e.applyMatrix4(a0)}class Qi extends Ot{constructor(e=null,t=1,n=1,i,r,s,a,o,l=1003,c=1003,d,h){super(null,s,a,o,l,c,i,r,d,h);this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class No extends sn{constructor(e,t,n,i=1){super(e,t,n);this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}var zr=new et,tx=new et,Co=[],nx=new an,u1=new et,ks=new Ze,Ns=new On;class er extends Ze{constructor(e,t,n){super(e,t);this.isInstancedMesh=!0,this.instanceMatrix=new No(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,u1)}computeBoundingBox(){let e=this.geometry,t=this.count;if(this.boundingBox===null)this.boundingBox=new an;if(e.boundingBox===null)e.computeBoundingBox();this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,zr),nx.copy(e.boundingBox).applyMatrix4(zr),this.boundingBox.union(nx)}computeBoundingSphere(){let e=this.geometry,t=this.count;if(this.boundingSphere===null)this.boundingSphere=new On;if(e.boundingSphere===null)e.computeBoundingSphere();this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,zr),Ns.copy(e.boundingSphere).applyMatrix4(zr),this.boundingSphere.union(Ns)}copy(e,t){if(super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null)this.morphTexture=e.morphTexture.clone();if(e.instanceColor!==null)this.instanceColor=e.instanceColor.clone();if(this.count=e.count,e.boundingBox!==null)this.boundingBox=e.boundingBox.clone();if(e.boundingSphere!==null)this.boundingSphere=e.boundingSphere.clone();return this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,s=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[s+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(ks.geometry=this.geometry,ks.material=this.material,ks.material===void 0)return;if(this.boundingSphere===null)this.computeBoundingSphere();if(Ns.copy(this.boundingSphere),Ns.applyMatrix4(n),e.ray.intersectsSphere(Ns)===!1)return;for(let r=0;r<i;r++){this.getMatrixAt(r,zr),tx.multiplyMatrices(n,zr),ks.matrixWorld=tx,ks.raycast(e,Co);for(let s=0,a=Co.length;s<a;s++){let o=Co[s];o.instanceId=r,o.object=this,t.push(o)}Co.length=0}}setColorAt(e,t){if(this.instanceColor===null)this.instanceColor=new No(new Float32Array(this.instanceMatrix.count*3).fill(1),3);t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;if(this.morphTexture===null)this.morphTexture=new Qi(new Float32Array(i*this.count),i,this.count,1028,1015);let r=this.morphTexture.source.data.data,s=0;for(let l=0;l<n.length;l++)s+=n[l];let a=this.geometry.morphTargetsRelative?1:1-s,o=i*e;r[o]=a,r.set(n,o+1)}updateMorphTargets(){}dispose(){if(this.dispatchEvent({type:"dispose"}),this.morphTexture!==null)this.morphTexture.dispose(),this.morphTexture=null}}var vh=new P,f1=new P,p1=new Ke;class pn{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=vh.subVectors(n,t).cross(f1.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(vh),i=this.normal.dot(n);if(i===0){if(this.distanceToPoint(e.start)===0)return t.copy(e.start);return null}let r=-(e.start.dot(this.normal)+this.constant)/i;if(r<0||r>1)return null;return t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||p1.getNormalMatrix(e),i=this.coplanarPoint(vh).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}var Hi=new On,m1=new re(0.5,0.5),Ro=new P;class sa{constructor(e=new pn,t=new pn,n=new pn,i=new pn,r=new pn,s=new pn){this.planes=[e,t,n,i,r,s]}set(e,t,n,i,r,s){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(s),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2000,n=!1){let i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],d=r[5],h=r[6],u=r[7],p=r[8],g=r[9],x=r[10],m=r[11],f=r[12],w=r[13],v=r[14],S=r[15];if(i[0].setComponents(l-s,u-c,m-p,S-f).normalize(),i[1].setComponents(l+s,u+c,m+p,S+f).normalize(),i[2].setComponents(l+a,u+d,m+g,S+w).normalize(),i[3].setComponents(l-a,u-d,m-g,S-w).normalize(),n)i[4].setComponents(o,h,x,v).normalize(),i[5].setComponents(l-o,u-h,m-x,S-v).normalize();else if(i[4].setComponents(l-o,u-h,m-x,S-v).normalize(),t===2000)i[5].setComponents(l+o,u+h,m+x,S+v).normalize();else if(t===2001)i[5].setComponents(o,h,x,v).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0){if(e.boundingSphere===null)e.computeBoundingSphere();Hi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld)}else{let t=e.geometry;if(t.boundingSphere===null)t.computeBoundingSphere();Hi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hi)}intersectsSprite(e){Hi.center.set(0,0,0);let t=m1.distanceTo(e.center);return Hi.radius=0.7071067811865476+t,Hi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hi)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Ro.x=i.normal.x>0?e.max.x:e.min.x,Ro.y=i.normal.y>0?e.max.y:e.min.y,Ro.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ro)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class tr extends Ot{constructor(e,t,n,i,r,s,a,o,l){super(e,t,n,i,r,s,a,o,l);this.isCanvasTexture=!0,this.needsUpdate=!0}}class Jr extends Ot{constructor(e,t,n=1014,i,r,s,a=1003,o=1003,l,c=1026,d=1){if(c!==1026&&c!==1027)throw Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:d};super(h,i,r,s,a,o,c,n,l);this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new na(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);if(this.compareFunction!==null)t.compareFunction=this.compareFunction;return t}}class fl extends Ot{constructor(e=null){super();this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class aa extends Tt{constructor(e=1,t=1,n=4,i=8,r=1){super();this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),r=Math.max(1,Math.floor(r));let s=[],a=[],o=[],l=[],c=t/2,d=Math.PI/2*e,h=t,u=2*d+h,p=n*2+r,g=i+1,x=new P,m=new P;for(let f=0;f<=p;f++){let w=0,v=0,S=0,R=0;if(f<=n){let D=f/n,y=D*Math.PI/2;v=-c-e*Math.cos(y),S=e*Math.sin(y),R=-e*Math.cos(y),w=D*d}else if(f<=n+r){let D=(f-n)/r;v=-c+D*t,S=e,R=0,w=d+D*h}else{let D=(f-n-r)/n,y=D*Math.PI/2;v=c+e*Math.sin(y),S=e*Math.cos(y),R=e*Math.sin(y),w=d+h+D*d}let T=Math.max(0,Math.min(1,w/u)),E=0;if(f===0)E=0.5/i;else if(f===p)E=-0.5/i;for(let D=0;D<=i;D++){let y=D/i,_=y*Math.PI*2,A=Math.sin(_),F=Math.cos(_);m.x=-S*F,m.y=v,m.z=S*A,a.push(m.x,m.y,m.z),x.set(-S*F,R,S*A),x.normalize(),o.push(x.x,x.y,x.z),l.push(y+E,T)}if(f>0){let D=(f-1)*g;for(let y=0;y<i;y++){let _=D+y,A=D+y+1,F=f*g+y,q=f*g+y+1;s.push(_,A,F),s.push(A,q,F)}}}this.setIndex(s),this.setAttribute("position",new Qe(a,3)),this.setAttribute("normal",new Qe(o,3)),this.setAttribute("uv",new Qe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new aa(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Pt extends Tt{constructor(e=1,t=1,n=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o};let l=this;i=Math.floor(i),r=Math.floor(r);let c=[],d=[],h=[],u=[],p=0,g=[],x=n/2,m=0;if(f(),s===!1){if(e>0)w(!0);if(t>0)w(!1)}this.setIndex(c),this.setAttribute("position",new Qe(d,3)),this.setAttribute("normal",new Qe(h,3)),this.setAttribute("uv",new Qe(u,2));function f(){let v=new P,S=new P,R=0,T=(t-e)/n;for(let E=0;E<=r;E++){let D=[],y=E/r,_=y*(t-e)+e;for(let A=0;A<=i;A++){let F=A/i,q=F*o+a,B=Math.sin(q),ee=Math.cos(q);S.x=_*B,S.y=-y*n+x,S.z=_*ee,d.push(S.x,S.y,S.z),v.set(B,T,ee).normalize(),h.push(v.x,v.y,v.z),u.push(F,1-y),D.push(p++)}g.push(D)}for(let E=0;E<i;E++)for(let D=0;D<r;D++){let y=g[D][E],_=g[D+1][E],A=g[D+1][E+1],F=g[D][E+1];if(e>0||D!==0)c.push(y,_,F),R+=3;if(t>0||D!==r-1)c.push(_,A,F),R+=3}l.addGroup(m,R,0),m+=R}function w(v){let S=p,R=new re,T=new P,E=0,D=v===!0?e:t,y=v===!0?1:-1;for(let A=1;A<=i;A++)d.push(0,x*y,0),h.push(0,y,0),u.push(0.5,0.5),p++;let _=p;for(let A=0;A<=i;A++){let q=A/i*o+a,B=Math.cos(q),ee=Math.sin(q);T.x=D*ee,T.y=x*y,T.z=D*B,d.push(T.x,T.y,T.z),h.push(0,y,0),R.x=B*0.5+0.5,R.y=ee*0.5*y+0.5,u.push(R.x,R.y),p++}for(let A=0;A<i;A++){let F=S+A,q=_+A;if(v===!0)c.push(q,q+1,F);else c.push(q+1,q,F);E+=3}l.addGroup(m,E,v===!0?1:2),m+=E}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class nr extends Pt{constructor(e=1,t=1,n=32,i=1,r=!1,s=0,a=Math.PI*2){super(0,e,t,n,i,r,s,a);this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:s,thetaLength:a}}static fromJSON(e){return new nr(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Cn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let s=1;s<=e;s++)n=this.getPoint(s/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,r=n.length,s;if(t)s=t;else s=e*n[r-1];let a=0,o=r-1,l;while(a<=o)if(i=Math.floor(a+(o-a)/2),l=n[i]-s,l<0)a=i+1;else if(l>0)o=i-1;else{o=i;break}if(i=o,n[i]===s)return i/(r-1);let c=n[i],h=n[i+1]-c,u=(s-c)/h;return(i+u)/(r-1)}getTangent(e,t){let i=e-0.0001,r=e+0.0001;if(i<0)i=0;if(r>1)r=1;let s=this.getPoint(i),a=this.getPoint(r),o=t||(s.isVector2?new re:new P);return o.copy(a).sub(s).normalize(),o}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new P,i=[],r=[],s=[],a=new P,o=new et;for(let u=0;u<=e;u++){let p=u/e;i[u]=this.getTangentAt(p,new P)}r[0]=new P,s[0]=new P;let l=Number.MAX_VALUE,c=Math.abs(i[0].x),d=Math.abs(i[0].y),h=Math.abs(i[0].z);if(c<=l)l=c,n.set(1,0,0);if(d<=l)l=d,n.set(0,1,0);if(h<=l)n.set(0,0,1);a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),s[0].crossVectors(i[0],r[0]);for(let u=1;u<=e;u++){if(r[u]=r[u-1].clone(),s[u]=s[u-1].clone(),a.crossVectors(i[u-1],i[u]),a.length()>Number.EPSILON){a.normalize();let p=Math.acos($e(i[u-1].dot(i[u]),-1,1));r[u].applyMatrix4(o.makeRotationAxis(a,p))}s[u].crossVectors(i[u],r[u])}if(t===!0){let u=Math.acos($e(r[0].dot(r[e]),-1,1));if(u/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0)u=-u;for(let p=1;p<=e;p++)r[p].applyMatrix4(o.makeRotationAxis(i[p],u*p)),s[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:s}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class oa extends Cn{constructor(e=0,t=0,n=1,i=1,r=0,s=Math.PI*2,a=!1,o=0){super();this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=s,this.aClockwise=a,this.aRotation=o}getPoint(e,t=new re){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,s=Math.abs(r)<Number.EPSILON;while(r<0)r+=i;while(r>i)r-=i;if(r<Number.EPSILON)if(s)r=0;else r=i;if(this.aClockwise===!0&&!s)if(r===i)r=-i;else r=r-i;let a=this.aStartAngle+e*r,o=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let c=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=o-this.aX,u=l-this.aY;o=h*c-u*d+this.aX,l=h*d+u*c+this.aY}return n.set(o,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Mu extends oa{constructor(e,t,n,i,r,s){super(e,t,n,n,i,r,s);this.isArcCurve=!0,this.type="ArcCurve"}}function Eu(){let e=0,t=0,n=0,i=0;function r(s,a,o,l){e=s,t=o,n=-3*s+3*a-2*o-l,i=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,d,h){let u=(a-s)/c-(o-s)/(c+d)+(o-a)/d,p=(o-a)/d-(l-a)/(d+h)+(l-o)/h;u*=d,p*=d,r(a,o,u,p)},calc:function(s){let a=s*s,o=a*s;return e+t*s+n*a+i*o}}}var Po=new P,_h=new Eu,yh=new Eu,bh=new Eu;class la extends Cn{constructor(e=[],t=!1,n="centripetal",i=0.5){super();this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new P){let n=t,i=this.points,r=i.length,s=(r-(this.closed?0:1))*e,a=Math.floor(s),o=s-a;if(this.closed)a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r;else if(o===0&&a===r-1)a=r-2,o=1;let l,c;if(this.closed||a>0)l=i[(a-1)%r];else Po.subVectors(i[0],i[1]).add(i[0]),l=Po;let d=i[a%r],h=i[(a+1)%r];if(this.closed||a+2<r)c=i[(a+2)%r];else Po.subVectors(i[r-1],i[r-2]).add(i[r-1]),c=Po;if(this.curveType==="centripetal"||this.curveType==="chordal"){let u=this.curveType==="chordal"?0.5:0.25,p=Math.pow(l.distanceToSquared(d),u),g=Math.pow(d.distanceToSquared(h),u),x=Math.pow(h.distanceToSquared(c),u);if(g<0.0001)g=1;if(p<0.0001)p=g;if(x<0.0001)x=g;_h.initNonuniformCatmullRom(l.x,d.x,h.x,c.x,p,g,x),yh.initNonuniformCatmullRom(l.y,d.y,h.y,c.y,p,g,x),bh.initNonuniformCatmullRom(l.z,d.z,h.z,c.z,p,g,x)}else if(this.curveType==="catmullrom")_h.initCatmullRom(l.x,d.x,h.x,c.x,this.tension),yh.initCatmullRom(l.y,d.y,h.y,c.y,this.tension),bh.initCatmullRom(l.z,d.z,h.z,c.z,this.tension);return n.set(_h.calc(o),yh.calc(o),bh.calc(o)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new P().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function ix(e,t,n,i,r){let s=(i-t)*0.5,a=(r-n)*0.5,o=e*e,l=e*o;return(2*n-2*i+s+a)*l+(-3*n+3*i-2*s-a)*o+s*e+n}function g1(e,t){let n=1-e;return n*n*t}function x1(e,t){return 2*(1-e)*e*t}function v1(e,t){return e*e*t}function zs(e,t,n,i){return g1(e,t)+x1(e,n)+v1(e,i)}function _1(e,t){let n=1-e;return n*n*n*t}function y1(e,t){let n=1-e;return 3*n*n*e*t}function b1(e,t){return 3*(1-e)*e*e*t}function S1(e,t){return e*e*e*t}function Hs(e,t,n,i,r){return _1(e,t)+y1(e,n)+b1(e,i)+S1(e,r)}class pl extends Cn{constructor(e=new re,t=new re,n=new re,i=new re){super();this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new re){let n=t,i=this.v0,r=this.v1,s=this.v2,a=this.v3;return n.set(Hs(e,i.x,r.x,s.x,a.x),Hs(e,i.y,r.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Tu extends Cn{constructor(e=new P,t=new P,n=new P,i=new P){super();this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new P){let n=t,i=this.v0,r=this.v1,s=this.v2,a=this.v3;return n.set(Hs(e,i.x,r.x,s.x,a.x),Hs(e,i.y,r.y,s.y,a.y),Hs(e,i.z,r.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class ml extends Cn{constructor(e=new re,t=new re){super();this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new re){let n=t;if(e===1)n.copy(this.v2);else n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1);return n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new re){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Au extends Cn{constructor(e=new P,t=new P){super();this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){let n=t;if(e===1)n.copy(this.v2);else n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1);return n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class gl extends Cn{constructor(e=new re,t=new re,n=new re){super();this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new re){let n=t,i=this.v0,r=this.v1,s=this.v2;return n.set(zs(e,i.x,r.x,s.x),zs(e,i.y,r.y,s.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class xl extends Cn{constructor(e=new P,t=new P,n=new P){super();this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){let n=t,i=this.v0,r=this.v1,s=this.v2;return n.set(zs(e,i.x,r.x,s.x),zs(e,i.y,r.y,s.y),zs(e,i.z,r.z,s.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class vl extends Cn{constructor(e=[]){super();this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new re){let n=t,i=this.points,r=(i.length-1)*e,s=Math.floor(r),a=r-s,o=i[s===0?s:s-1],l=i[s],c=i[s>i.length-2?i.length-1:s+1],d=i[s>i.length-3?i.length-1:s+2];return n.set(ix(a,o.x,l.x,c.x,d.x),ix(a,o.y,l.y,c.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new re().fromArray(i))}return this}}var Uo=Object.freeze({__proto__:null,ArcCurve:Mu,CatmullRomCurve3:la,CubicBezierCurve:pl,CubicBezierCurve3:Tu,EllipseCurve:oa,LineCurve:ml,LineCurve3:Au,QuadraticBezierCurve:gl,QuadraticBezierCurve3:xl,SplineCurve:vl});class Cu extends Cn{constructor(){super();this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Uo[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;while(r<i.length){if(i[r]>=n){let s=i[r]-n,a=this.curves[r],o=a.getLength(),l=o===0?0:1-s/o;return a.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));if(this.autoClose)t.push(t[0]);return t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let s=r[i],a=s.isEllipseCurve?e*2:s.isLineCurve||s.isLineCurve3?1:s.isSplineCurve?e*s.points.length:e,o=s.getPoints(a);for(let l=0;l<o.length;l++){let c=o[l];if(n&&n.equals(c))continue;t.push(c),n=c}}if(this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0]))t.push(t[0]);return t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new Uo[i.type]().fromJSON(i))}return this}}class Fo extends Cu{constructor(e){super();if(this.type="Path",this.currentPoint=new re,e)this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ml(this.currentPoint.clone(),new re(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let r=new gl(this.currentPoint.clone(),new re(e,t),new re(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,s){let a=new pl(this.currentPoint.clone(),new re(e,t),new re(n,i),new re(r,s));return this.curves.push(a),this.currentPoint.set(r,s),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new vl(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,s){let a=this.currentPoint.x,o=this.currentPoint.y;return this.absarc(e+a,t+o,n,i,r,s),this}absarc(e,t,n,i,r,s){return this.absellipse(e,t,n,n,i,r,s),this}ellipse(e,t,n,i,r,s,a,o){let l=this.currentPoint.x,c=this.currentPoint.y;return this.absellipse(e+l,t+c,n,i,r,s,a,o),this}absellipse(e,t,n,i,r,s,a,o){let l=new oa(e,t,n,i,r,s,a,o);if(this.curves.length>0){let d=l.getPoint(0);if(!d.equals(this.currentPoint))this.lineTo(d.x,d.y)}this.curves.push(l);let c=l.getPoint(1);return this.currentPoint.copy(c),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class ca extends Fo{constructor(e){super(e);this.uuid=Wn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new Fo().fromJSON(i))}return this}}function w1(e,t,n=2){let i=t&&t.length,r=i?t[0]*n:e.length,s=o0(e,0,r,n,!0),a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(i)s=C1(e,t,s,n);if(e.length>80*n){o=1/0,l=1/0;let d=-1/0,h=-1/0;for(let u=n;u<r;u+=n){let p=e[u],g=e[u+1];if(p<o)o=p;if(g<l)l=g;if(p>d)d=p;if(g>h)h=g}c=Math.max(d-o,h-l),c=c!==0?32767/c:0}return Vs(s,a,n,o,l,c,0),a}function o0(e,t,n,i,r){let s;if(r===B1(e,t,n,i)>0)for(let a=t;a<n;a+=i)s=rx(a/i|0,e[a],e[a+1],s);else for(let a=n-i;a>=t;a-=i)s=rx(a/i|0,e[a],e[a+1],s);if(s&&qr(s,s.next))$s(s),s=s.next;return s}function Vi(e,t){if(!e)return e;if(!t)t=e;let n=e,i;do if(i=!1,!n.steiner&&(qr(n,n.next)||_t(n.prev,n,n.next)===0)){if($s(n),n=t=n.prev,n===n.next)break;i=!0}else n=n.next;while(i||n!==t);return t}function Vs(e,t,n,i,r,s,a){if(!e)return;if(!a&&s)D1(e,i,r,s);let o=e;while(e.prev!==e.next){let l=e.prev,c=e.next;if(s?E1(e,i,r,s):M1(e)){t.push(l.i,e.i,c.i),$s(e),e=c.next,o=c.next;continue}if(e=c,e===o){if(!a)Vs(Vi(e),t,n,i,r,s,1);else if(a===1)e=T1(Vi(e),t),Vs(e,t,n,i,r,s,2);else if(a===2)A1(e,t,n,i,r,s);break}}}function M1(e){let t=e.prev,n=e,i=e.next;if(_t(t,n,i)>=0)return!1;let r=t.x,s=n.x,a=i.x,o=t.y,l=n.y,c=i.y,d=Math.min(r,s,a),h=Math.min(o,l,c),u=Math.max(r,s,a),p=Math.max(o,l,c),g=i.next;while(g!==t){if(g.x>=d&&g.x<=u&&g.y>=h&&g.y<=p&&Fs(r,o,s,l,a,c,g.x,g.y)&&_t(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function E1(e,t,n,i){let r=e.prev,s=e,a=e.next;if(_t(r,s,a)>=0)return!1;let o=r.x,l=s.x,c=a.x,d=r.y,h=s.y,u=a.y,p=Math.min(o,l,c),g=Math.min(d,h,u),x=Math.max(o,l,c),m=Math.max(d,h,u),f=Eh(p,g,t,n,i),w=Eh(x,m,t,n,i),{prevZ:v,nextZ:S}=e;while(v&&v.z>=f&&S&&S.z<=w){if(v.x>=p&&v.x<=x&&v.y>=g&&v.y<=m&&v!==r&&v!==a&&Fs(o,d,l,h,c,u,v.x,v.y)&&_t(v.prev,v,v.next)>=0)return!1;if(v=v.prevZ,S.x>=p&&S.x<=x&&S.y>=g&&S.y<=m&&S!==r&&S!==a&&Fs(o,d,l,h,c,u,S.x,S.y)&&_t(S.prev,S,S.next)>=0)return!1;S=S.nextZ}while(v&&v.z>=f){if(v.x>=p&&v.x<=x&&v.y>=g&&v.y<=m&&v!==r&&v!==a&&Fs(o,d,l,h,c,u,v.x,v.y)&&_t(v.prev,v,v.next)>=0)return!1;v=v.prevZ}while(S&&S.z<=w){if(S.x>=p&&S.x<=x&&S.y>=g&&S.y<=m&&S!==r&&S!==a&&Fs(o,d,l,h,c,u,S.x,S.y)&&_t(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function T1(e,t){let n=e;do{let i=n.prev,r=n.next.next;if(!qr(i,r)&&c0(i,n,n.next,r)&&Ws(i,r)&&Ws(r,i))t.push(i.i,n.i,r.i),$s(n),$s(n.next),n=e=r;n=n.next}while(n!==e);return Vi(n)}function A1(e,t,n,i,r,s){let a=e;do{let o=a.next.next;while(o!==a.prev){if(a.i!==o.i&&U1(a,o)){let l=d0(a,o);a=Vi(a,a.next),l=Vi(l,l.next),Vs(a,t,n,i,r,s,0),Vs(l,t,n,i,r,s,0);return}o=o.next}a=a.next}while(a!==e)}function C1(e,t,n,i){let r=[];for(let s=0,a=t.length;s<a;s++){let o=t[s]*i,l=s<a-1?t[s+1]*i:e.length,c=o0(e,o,l,i,!1);if(c===c.next)c.steiner=!0;r.push(N1(c))}r.sort(R1);for(let s=0;s<r.length;s++)n=P1(r[s],n);return n}function R1(e,t){let n=e.x-t.x;if(n===0){if(n=e.y-t.y,n===0){let i=(e.next.y-e.y)/(e.next.x-e.x),r=(t.next.y-t.y)/(t.next.x-t.x);n=i-r}}return n}function P1(e,t){let n=I1(e,t);if(!n)return t;let i=d0(n,e);return Vi(i,i.next),Vi(n,n.next)}function I1(e,t){let n=t,{x:i,y:r}=e,s=-1/0,a;if(qr(e,n))return n;do{if(qr(e,n.next))return n.next;else if(r<=n.y&&r>=n.next.y&&n.next.y!==n.y){let h=n.x+(r-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(h<=i&&h>s){if(s=h,a=n.x<n.next.x?n:n.next,h===i)return a}}n=n.next}while(n!==t);if(!a)return null;let o=a,l=a.x,c=a.y,d=1/0;n=a;do{if(i>=n.x&&n.x>=l&&i!==n.x&&l0(r<c?i:s,r,l,c,r<c?s:i,r,n.x,n.y)){let h=Math.abs(r-n.y)/(i-n.x);if(Ws(n,e)&&(h<d||h===d&&(n.x>a.x||n.x===a.x&&L1(a,n))))a=n,d=h}n=n.next}while(n!==o);return a}function L1(e,t){return _t(e.prev,e,t.prev)<0&&_t(t.next,e,e.next)<0}function D1(e,t,n,i){let r=e;do{if(r.z===0)r.z=Eh(r.x,r.y,t,n,i);r.prevZ=r.prev,r.nextZ=r.next,r=r.next}while(r!==e);r.prevZ.nextZ=null,r.prevZ=null,k1(r)}function k1(e){let t,n=1;do{let i=e,r;e=null;let s=null;t=0;while(i){t++;let a=i,o=0;for(let c=0;c<n;c++)if(o++,a=a.nextZ,!a)break;let l=n;while(o>0||l>0&&a){if(o!==0&&(l===0||!a||i.z<=a.z))r=i,i=i.nextZ,o--;else r=a,a=a.nextZ,l--;if(s)s.nextZ=r;else e=r;r.prevZ=s,s=r}i=a}s.nextZ=null,n*=2}while(t>1);return e}function Eh(e,t,n,i,r){return e=(e-n)*r|0,t=(t-i)*r|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function N1(e){let t=e,n=e;do{if(t.x<n.x||t.x===n.x&&t.y<n.y)n=t;t=t.next}while(t!==e);return n}function l0(e,t,n,i,r,s,a,o){return(r-a)*(t-o)>=(e-a)*(s-o)&&(e-a)*(i-o)>=(n-a)*(t-o)&&(n-a)*(s-o)>=(r-a)*(i-o)}function Fs(e,t,n,i,r,s,a,o){return!(e===a&&t===o)&&l0(e,t,n,i,r,s,a,o)}function U1(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!F1(e,t)&&(Ws(e,t)&&Ws(t,e)&&O1(e,t)&&(_t(e.prev,e,t.prev)||_t(e,t.prev,t))||qr(e,t)&&_t(e.prev,e,e.next)>0&&_t(t.prev,t,t.next)>0)}function _t(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function qr(e,t){return e.x===t.x&&e.y===t.y}function c0(e,t,n,i){let r=Lo(_t(e,t,n)),s=Lo(_t(e,t,i)),a=Lo(_t(n,i,e)),o=Lo(_t(n,i,t));if(r!==s&&a!==o)return!0;if(r===0&&Io(e,n,t))return!0;if(s===0&&Io(e,i,t))return!0;if(a===0&&Io(n,e,i))return!0;if(o===0&&Io(n,t,i))return!0;return!1}function Io(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function Lo(e){return e>0?1:e<0?-1:0}function F1(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&c0(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function Ws(e,t){return _t(e.prev,e,e.next)<0?_t(e,t,e.next)>=0&&_t(e,e.prev,t)>=0:_t(e,t,e.prev)<0||_t(e,e.next,t)<0}function O1(e,t){let n=e,i=!1,r=(e.x+t.x)/2,s=(e.y+t.y)/2;do{if(n.y>s!==n.next.y>s&&n.next.y!==n.y&&r<(n.next.x-n.x)*(s-n.y)/(n.next.y-n.y)+n.x)i=!i;n=n.next}while(n!==e);return i}function d0(e,t){let n=Th(e.i,e.x,e.y),i=Th(t.i,t.x,t.y),r=e.next,s=t.prev;return e.next=t,t.prev=e,n.next=r,r.prev=n,i.next=n,n.prev=i,s.next=i,i.prev=s,i}function rx(e,t,n,i){let r=Th(e,t,n);if(!i)r.prev=r,r.next=r;else r.next=i.next,r.prev=i,i.next.prev=r,i.next=r;return r}function $s(e){if(e.next.prev=e.prev,e.prev.next=e.next,e.prevZ)e.prevZ.nextZ=e.nextZ;if(e.nextZ)e.nextZ.prevZ=e.prevZ}function Th(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function B1(e,t,n,i){let r=0;for(let s=t,a=n-i;s<n;s+=i)r+=(e[a]-e[s])*(e[s+1]+e[a+1]),a=s;return r}class h0{static triangulate(e,t,n=2){return w1(e,t,n)}}class Gi{static area(e){let t=e.length,n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*0.5}static isClockWise(e){return Gi.area(e)<0}static triangulateShape(e,t){let n=[],i=[],r=[];sx(e),ax(n,e);let s=e.length;t.forEach(sx);for(let o=0;o<t.length;o++)i.push(s),s+=t[o].length,ax(n,t[o]);let a=h0.triangulate(n,i);for(let o=0;o<a.length;o+=3)r.push(a.slice(o,o+3));return r}}function sx(e){let t=e.length;if(t>2&&e[t-1].equals(e[0]))e.pop()}function ax(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}class da extends Tt{constructor(e=new ca([new re(0.5,0.5),new re(-0.5,0.5),new re(-0.5,-0.5),new re(0.5,-0.5)]),t={}){super();this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],r=[];for(let a=0,o=e.length;a<o;a++){let l=e[a];s(l)}this.setAttribute("position",new Qe(i,3)),this.setAttribute("uv",new Qe(r,2)),this.computeVertexNormals();function s(a){let o=[],l=t.curveSegments!==void 0?t.curveSegments:12,c=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1,h=t.bevelEnabled!==void 0?t.bevelEnabled:!0,u=t.bevelThickness!==void 0?t.bevelThickness:0.2,p=t.bevelSize!==void 0?t.bevelSize:u-0.1,g=t.bevelOffset!==void 0?t.bevelOffset:0,x=t.bevelSegments!==void 0?t.bevelSegments:3,m=t.extrudePath,f=t.UVGenerator!==void 0?t.UVGenerator:z1,w,v=!1,S,R,T,E;if(m)w=m.getSpacedPoints(c),v=!0,h=!1,S=m.computeFrenetFrames(c,!1),R=new P,T=new P,E=new P;if(!h)x=0,u=0,p=0,g=0;let D=a.extractPoints(l),{shape:y,holes:_}=D;if(!Gi.isClockWise(y)){y=y.reverse();for(let oe=0,J=_.length;oe<J;oe++){let U=_[oe];if(Gi.isClockWise(U))_[oe]=U.reverse()}}function F(oe){let H=oe[0];for(let he=1;he<=oe.length;he++){let Z=he%oe.length,V=oe[Z],ce=V.x-H.x,Le=V.y-H.y,ze=ce*ce+Le*Le,C=Math.max(Math.abs(V.x),Math.abs(V.y),Math.abs(H.x),Math.abs(H.y)),b=0.000000000000000000010000000000000001*C*C;if(ze<=b){oe.splice(Z,1),he--;continue}H=V}}F(y),_.forEach(F);let q=_.length,B=y;for(let oe=0;oe<q;oe++){let J=_[oe];y=y.concat(J)}function ee(oe,J,U){if(!J)console.error("THREE.ExtrudeGeometry: vec does not exist");return oe.clone().addScaledVector(J,U)}let j=y.length;function ae(oe,J,U){let H,he,Z,V=oe.x-J.x,ce=oe.y-J.y,Le=U.x-oe.x,ze=U.y-oe.y,C=V*V+ce*ce,b=V*ze-ce*Le;if(Math.abs(b)>Number.EPSILON){let O=Math.sqrt(C),se=Math.sqrt(Le*Le+ze*ze),de=J.x-ce/O,te=J.y+V/O,ye=U.x-ze/se,_e=U.y+Le/se,Ie=((ye-de)*ze-(_e-te)*Le)/(V*ze-ce*Le);H=de+V*Ie-oe.x,he=te+ce*Ie-oe.y;let Ge=H*H+he*he;if(Ge<=2)return new re(H,he);else Z=Math.sqrt(Ge/2)}else{let O=!1;if(V>Number.EPSILON){if(Le>Number.EPSILON)O=!0}else if(V<-Number.EPSILON){if(Le<-Number.EPSILON)O=!0}else if(Math.sign(ce)===Math.sign(ze))O=!0;if(O)H=-ce,he=V,Z=Math.sqrt(C);else H=V,he=ce,Z=Math.sqrt(C/2)}return new re(H/Z,he/Z)}let W=[];for(let oe=0,J=B.length,U=J-1,H=oe+1;oe<J;oe++,U++,H++){if(U===J)U=0;if(H===J)H=0;W[oe]=ae(B[oe],B[U],B[H])}let me=[],fe,Ae=W.concat();for(let oe=0,J=q;oe<J;oe++){let U=_[oe];fe=[];for(let H=0,he=U.length,Z=he-1,V=H+1;H<he;H++,Z++,V++){if(Z===he)Z=0;if(V===he)V=0;fe[H]=ae(U[H],U[Z],U[V])}me.push(fe),Ae=Ae.concat(fe)}let Se;if(x===0)Se=Gi.triangulateShape(B,_);else{let oe=[],J=[];for(let U=0;U<x;U++){let H=U/x,he=u*Math.cos(H*Math.PI/2),Z=p*Math.sin(H*Math.PI/2)+g;for(let V=0,ce=B.length;V<ce;V++){let Le=ee(B[V],W[V],Z);if(L(Le.x,Le.y,-he),H===0)oe.push(Le)}for(let V=0,ce=q;V<ce;V++){let Le=_[V];fe=me[V];let ze=[];for(let C=0,b=Le.length;C<b;C++){let O=ee(Le[C],fe[C],Z);if(L(O.x,O.y,-he),H===0)ze.push(O)}if(H===0)J.push(ze)}}Se=Gi.triangulateShape(oe,J)}let N=Se.length,ne=p+g;for(let oe=0;oe<j;oe++){let J=h?ee(y[oe],Ae[oe],ne):y[oe];if(!v)L(J.x,J.y,0);else T.copy(S.normals[0]).multiplyScalar(J.x),R.copy(S.binormals[0]).multiplyScalar(J.y),E.copy(w[0]).add(T).add(R),L(E.x,E.y,E.z)}for(let oe=1;oe<=c;oe++)for(let J=0;J<j;J++){let U=h?ee(y[J],Ae[J],ne):y[J];if(!v)L(U.x,U.y,d/c*oe);else T.copy(S.normals[oe]).multiplyScalar(U.x),R.copy(S.binormals[oe]).multiplyScalar(U.y),E.copy(w[oe]).add(T).add(R),L(E.x,E.y,E.z)}for(let oe=x-1;oe>=0;oe--){let J=oe/x,U=u*Math.cos(J*Math.PI/2),H=p*Math.sin(J*Math.PI/2)+g;for(let he=0,Z=B.length;he<Z;he++){let V=ee(B[he],W[he],H);L(V.x,V.y,d+U)}for(let he=0,Z=_.length;he<Z;he++){let V=_[he];fe=me[he];for(let ce=0,Le=V.length;ce<Le;ce++){let ze=ee(V[ce],fe[ce],H);if(!v)L(ze.x,ze.y,d+U);else L(ze.x,ze.y+w[c-1].y,w[c-1].x+U)}}}Y(),le();function Y(){let oe=i.length/3;if(h){let J=0,U=j*J;for(let H=0;H<N;H++){let he=Se[H];X(he[2]+U,he[1]+U,he[0]+U)}J=c+x*2,U=j*J;for(let H=0;H<N;H++){let he=Se[H];X(he[0]+U,he[1]+U,he[2]+U)}}else{for(let J=0;J<N;J++){let U=Se[J];X(U[2],U[1],U[0])}for(let J=0;J<N;J++){let U=Se[J];X(U[0]+j*c,U[1]+j*c,U[2]+j*c)}}n.addGroup(oe,i.length/3-oe,0)}function le(){let oe=i.length/3,J=0;pe(B,J),J+=B.length;for(let U=0,H=_.length;U<H;U++){let he=_[U];pe(he,J),J+=he.length}n.addGroup(oe,i.length/3-oe,1)}function pe(oe,J){let U=oe.length;while(--U>=0){let H=U,he=U-1;if(he<0)he=oe.length-1;for(let Z=0,V=c+x*2;Z<V;Z++){let ce=j*Z,Le=j*(Z+1),ze=J+H+ce,C=J+he+ce,b=J+he+Le,O=J+H+Le;ie(ze,C,b,O)}}}function L(oe,J,U){o.push(oe),o.push(J),o.push(U)}function X(oe,J,U){Pe(oe),Pe(J),Pe(U);let H=i.length/3,he=f.generateTopUV(n,i,H-3,H-2,H-1);I(he[0]),I(he[1]),I(he[2])}function ie(oe,J,U,H){Pe(oe),Pe(J),Pe(H),Pe(J),Pe(U),Pe(H);let he=i.length/3,Z=f.generateSideWallUV(n,i,he-6,he-3,he-2,he-1);I(Z[0]),I(Z[1]),I(Z[3]),I(Z[1]),I(Z[2]),I(Z[3])}function Pe(oe){i.push(o[oe*3+0]),i.push(o[oe*3+1]),i.push(o[oe*3+2])}function I(oe){r.push(oe.x),r.push(oe.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return H1(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,s=e.shapes.length;r<s;r++){let a=t[e.shapes[r]];n.push(a)}let i=e.options.extrudePath;if(i!==void 0)e.options.extrudePath=new Uo[i.type]().fromJSON(i);return new da(n,e.options)}}var z1={generateTopUV:function(e,t,n,i,r){let s=t[n*3],a=t[n*3+1],o=t[i*3],l=t[i*3+1],c=t[r*3],d=t[r*3+1];return[new re(s,a),new re(o,l),new re(c,d)]},generateSideWallUV:function(e,t,n,i,r,s){let a=t[n*3],o=t[n*3+1],l=t[n*3+2],c=t[i*3],d=t[i*3+1],h=t[i*3+2],u=t[r*3],p=t[r*3+1],g=t[r*3+2],x=t[s*3],m=t[s*3+1],f=t[s*3+2];if(Math.abs(o-d)<Math.abs(a-c))return[new re(a,1-l),new re(c,1-h),new re(u,1-g),new re(x,1-f)];else return[new re(o,1-l),new re(d,1-h),new re(p,1-g),new re(m,1-f)]}};function H1(e,t,n){if(n.shapes=[],Array.isArray(e))for(let i=0,r=e.length;i<r;i++){let s=e[i];n.shapes.push(s.uuid)}else n.shapes.push(e.uuid);if(n.options=Object.assign({},t),t.extrudePath!==void 0)n.options.extrudePath=t.extrudePath.toJSON();return n}class ha extends Tt{constructor(e=[new re(0,-0.5),new re(0.5,0),new re(0,0.5)],t=12,n=0,i=Math.PI*2){super();this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=$e(i,0,Math.PI*2);let r=[],s=[],a=[],o=[],l=[],c=1/t,d=new P,h=new re,u=new P,p=new P,g=new P,x=0,m=0;for(let f=0;f<=e.length-1;f++)switch(f){case 0:x=e[f+1].x-e[f].x,m=e[f+1].y-e[f].y,u.x=m*1,u.y=-x,u.z=m*0,g.copy(u),u.normalize(),o.push(u.x,u.y,u.z);break;case e.length-1:o.push(g.x,g.y,g.z);break;default:x=e[f+1].x-e[f].x,m=e[f+1].y-e[f].y,u.x=m*1,u.y=-x,u.z=m*0,p.copy(u),u.x+=g.x,u.y+=g.y,u.z+=g.z,u.normalize(),o.push(u.x,u.y,u.z),g.copy(p)}for(let f=0;f<=t;f++){let w=n+f*c*i,v=Math.sin(w),S=Math.cos(w);for(let R=0;R<=e.length-1;R++){d.x=e[R].x*v,d.y=e[R].y,d.z=e[R].x*S,s.push(d.x,d.y,d.z),h.x=f/t,h.y=R/(e.length-1),a.push(h.x,h.y);let T=o[3*R+0]*v,E=o[3*R+1],D=o[3*R+0]*S;l.push(T,E,D)}}for(let f=0;f<t;f++)for(let w=0;w<e.length-1;w++){let v=w+f*e.length,S=v,R=v+e.length,T=v+e.length+1,E=v+1;r.push(S,R,E),r.push(T,E,R)}this.setIndex(r),this.setAttribute("position",new Qe(s,3)),this.setAttribute("uv",new Qe(a,2)),this.setAttribute("normal",new Qe(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ha(e.points,e.segments,e.phiStart,e.phiLength)}}class hi extends Tt{constructor(e=1,t=1,n=1,i=1){super();this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,s=t/2,a=Math.floor(n),o=Math.floor(i),l=a+1,c=o+1,d=e/a,h=t/o,u=[],p=[],g=[],x=[];for(let m=0;m<c;m++){let f=m*h-s;for(let w=0;w<l;w++){let v=w*d-r;p.push(v,-f,0),g.push(0,0,1),x.push(w/a),x.push(1-m/o)}}for(let m=0;m<o;m++)for(let f=0;f<a;f++){let w=f+l*m,v=f+l*(m+1),S=f+1+l*(m+1),R=f+1+l*m;u.push(w,v,R),u.push(v,S,R)}this.setIndex(u),this.setAttribute("position",new Qe(p,3)),this.setAttribute("normal",new Qe(g,3)),this.setAttribute("uv",new Qe(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hi(e.width,e.height,e.widthSegments,e.heightSegments)}}class ir extends Tt{constructor(e=0.5,t=1,n=32,i=1,r=0,s=Math.PI*2){super();this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:s},n=Math.max(3,n),i=Math.max(1,i);let a=[],o=[],l=[],c=[],d=e,h=(t-e)/i,u=new P,p=new re;for(let g=0;g<=i;g++){for(let x=0;x<=n;x++){let m=r+x/n*s;u.x=d*Math.cos(m),u.y=d*Math.sin(m),o.push(u.x,u.y,u.z),l.push(0,0,1),p.x=(u.x/t+1)/2,p.y=(u.y/t+1)/2,c.push(p.x,p.y)}d+=h}for(let g=0;g<i;g++){let x=g*(n+1);for(let m=0;m<n;m++){let f=m+x,w=f,v=f+n+1,S=f+n+2,R=f+1;a.push(w,v,R),a.push(v,S,R)}}this.setIndex(a),this.setAttribute("position",new Qe(o,3)),this.setAttribute("normal",new Qe(l,3)),this.setAttribute("uv",new Qe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ir(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class ui extends Tt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,s=0,a=Math.PI){super();this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:s,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let o=Math.min(s+a,Math.PI),l=0,c=[],d=new P,h=new P,u=[],p=[],g=[],x=[];for(let m=0;m<=n;m++){let f=[],w=m/n,v=0;if(m===0&&s===0)v=0.5/t;else if(m===n&&o===Math.PI)v=-0.5/t;for(let S=0;S<=t;S++){let R=S/t;d.x=-e*Math.cos(i+R*r)*Math.sin(s+w*a),d.y=e*Math.cos(s+w*a),d.z=e*Math.sin(i+R*r)*Math.sin(s+w*a),p.push(d.x,d.y,d.z),h.copy(d).normalize(),g.push(h.x,h.y,h.z),x.push(R+v,1-w),f.push(l++)}c.push(f)}for(let m=0;m<n;m++)for(let f=0;f<t;f++){let w=c[m][f+1],v=c[m][f],S=c[m+1][f],R=c[m+1][f+1];if(m!==0||s>0)u.push(w,v,R);if(m!==n-1||o<Math.PI)u.push(v,S,R)}this.setIndex(u),this.setAttribute("position",new Qe(p,3)),this.setAttribute("normal",new Qe(g,3)),this.setAttribute("uv",new Qe(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ui(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class jn extends Tt{constructor(e=1,t=0.4,n=12,i=48,r=Math.PI*2){super();this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);let s=[],a=[],o=[],l=[],c=new P,d=new P,h=new P;for(let u=0;u<=n;u++)for(let p=0;p<=i;p++){let g=p/i*r,x=u/n*Math.PI*2;d.x=(e+t*Math.cos(x))*Math.cos(g),d.y=(e+t*Math.cos(x))*Math.sin(g),d.z=t*Math.sin(x),a.push(d.x,d.y,d.z),c.x=e*Math.cos(g),c.y=e*Math.sin(g),h.subVectors(d,c).normalize(),o.push(h.x,h.y,h.z),l.push(p/i),l.push(u/n)}for(let u=1;u<=n;u++)for(let p=1;p<=i;p++){let g=(i+1)*u+p-1,x=(i+1)*(u-1)+p-1,m=(i+1)*(u-1)+p,f=(i+1)*u+p;s.push(g,x,f),s.push(x,m,f)}this.setIndex(s),this.setAttribute("position",new Qe(a,3)),this.setAttribute("normal",new Qe(o,3)),this.setAttribute("uv",new Qe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jn(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class ua extends Tt{constructor(e=new xl(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),t=64,n=1,i=8,r=!1){super();this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};let s=e.computeFrenetFrames(t,r);this.tangents=s.tangents,this.normals=s.normals,this.binormals=s.binormals;let a=new P,o=new P,l=new re,c=new P,d=[],h=[],u=[],p=[];g(),this.setIndex(p),this.setAttribute("position",new Qe(d,3)),this.setAttribute("normal",new Qe(h,3)),this.setAttribute("uv",new Qe(u,2));function g(){for(let w=0;w<t;w++)x(w);x(r===!1?t:0),f(),m()}function x(w){c=e.getPointAt(w/t,c);let v=s.normals[w],S=s.binormals[w];for(let R=0;R<=i;R++){let T=R/i*Math.PI*2,E=Math.sin(T),D=-Math.cos(T);o.x=D*v.x+E*S.x,o.y=D*v.y+E*S.y,o.z=D*v.z+E*S.z,o.normalize(),h.push(o.x,o.y,o.z),a.x=c.x+n*o.x,a.y=c.y+n*o.y,a.z=c.z+n*o.z,d.push(a.x,a.y,a.z)}}function m(){for(let w=1;w<=t;w++)for(let v=1;v<=i;v++){let S=(i+1)*(w-1)+(v-1),R=(i+1)*w+(v-1),T=(i+1)*w+v,E=(i+1)*(w-1)+v;p.push(S,R,E),p.push(R,T,E)}}function f(){for(let w=0;w<=t;w++)for(let v=0;v<=i;v++)l.x=w/t,l.y=v/i,u.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new ua(new Uo[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class _l extends Tt{constructor(e=null){super();if(this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new P,r=new P;if(e.index!==null){let s=e.attributes.position,{index:a,groups:o}=e;if(o.length===0)o=[{start:0,count:a.count,materialIndex:0}];for(let l=0,c=o.length;l<c;++l){let d=o[l],{start:h,count:u}=d;for(let p=h,g=h+u;p<g;p+=3)for(let x=0;x<3;x++){let m=a.getX(p+x),f=a.getX(p+(x+1)%3);if(i.fromBufferAttribute(s,m),r.fromBufferAttribute(s,f),ox(i,r,n)===!0)t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z)}}}else{let s=e.attributes.position;for(let a=0,o=s.count/3;a<o;a++)for(let l=0;l<3;l++){let c=3*a+l,d=3*a+(l+1)%3;if(i.fromBufferAttribute(s,c),r.fromBufferAttribute(s,d),ox(i,r,n)===!0)t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z)}}this.setAttribute("position",new Qe(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function ox(e,t,n){let i=`${e.x},${e.y},${e.z}-${t.x},${t.y},${t.z}`,r=`${t.x},${t.y},${t.z}-${e.x},${e.y},${e.z}`;if(n.has(i)===!0||n.has(r)===!0)return!1;else return n.add(i),n.add(r),!0}class yl extends ot{constructor(e){super(e);this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Yt extends Yn{constructor(e){super();this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ne(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Pi extends Yt{constructor(e){super();this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new re(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return $e(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+0.4*t)/(1-0.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ne(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ne(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ne(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){if(this._anisotropy>0!==e>0)this.version++;this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){if(this._clearcoat>0!==e>0)this.version++;this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){if(this._iridescence>0!==e>0)this.version++;this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){if(this._dispersion>0!==e>0)this.version++;this._dispersion=e}get sheen(){return this._sheen}set sheen(e){if(this._sheen>0!==e>0)this.version++;this._sheen=e}get transmission(){return this._transmission}set transmission(e){if(this._transmission>0!==e>0)this.version++;this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class bl extends Yn{constructor(e){super();this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class Sl extends Yn{constructor(e){super();this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ru extends Yn{constructor(e){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Pu extends Yn{constructor(e){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Do(e,t){if(!e||e.constructor===t)return e;if(typeof t.BYTES_PER_ELEMENT==="number")return new t(e);return Array.prototype.slice.call(e)}function G1(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}class Qr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let s;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break e}s=t.length;break t}if(!(e>=r)){let a=t[1];if(e<a)n=2,r=a;for(let o=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===o)break;if(i=r,r=t[--n-1],e>=r)break e}s=n,n=0;break t}break n}while(n<s){let a=n+s>>>1;if(e<t[a])s=a;else n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let s=0;s!==i;++s)t[s]=n[r+s];return t}interpolate_(){throw Error("call to abstract method")}intervalChanged_(){}}class Iu extends Qr{constructor(e,t,n,i){super(e,t,n,i);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,s=e+1,a=i[r],o=i[s];if(a===void 0)switch(this.getSettings_().endingStart){case 2401:r=e,a=2*t-n;break;case 2402:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(o===void 0)switch(this.getSettings_().endingEnd){case 2401:s=e,o=2*n-t;break;case 2402:s=1,o=n+i[1]-i[0];break;default:s=e-1,o=t}let l=(n-t)*0.5,c=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(o-n),this._offsetPrev=r*c,this._offsetNext=s*c}interpolate_(e,t,n,i){let r=this.resultBuffer,s=this.sampleValues,a=this.valueSize,o=e*a,l=o-a,c=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,u=this._weightNext,p=(n-t)/(i-t),g=p*p,x=g*p,m=-h*x+2*h*g-h*p,f=(1+h)*x+(-1.5-2*h)*g+(-0.5+h)*p+1,w=(-1-u)*x+(1.5+u)*g+0.5*p,v=u*x-u*g;for(let S=0;S!==a;++S)r[S]=m*s[c+S]+f*s[l+S]+w*s[o+S]+v*s[d+S];return r}}class Lu extends Qr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,s=this.sampleValues,a=this.valueSize,o=e*a,l=o-a,c=(n-t)/(i-t),d=1-c;for(let h=0;h!==a;++h)r[h]=s[l+h]*d+s[o+h]*c;return r}}class Du extends Qr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Rn{constructor(e,t,n,i){if(e===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Do(t,this.TimeBufferType),this.values=Do(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Do(e.times,Array),values:Do(e.values,Array)};let i=e.getInterpolation();if(i!==e.DefaultInterpolation)n.interpolation=i}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Du(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Lu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Iu(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case 2300:t=this.InterpolantFactoryMethodDiscrete;break;case 2301:t=this.InterpolantFactoryMethodLinear;break;case 2302:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,s=i-1;while(r!==i&&n[r]<e)++r;while(s!==-1&&n[s]>t)--s;if(++s,r!==0||s!==i){if(r>=s)s=Math.max(s,1),r=s-1;let a=this.getValueSize();this.times=n.slice(r,s),this.values=this.values.slice(r*a,s*a)}return this}validate(){let e=!0,t=this.getValueSize();if(t-Math.floor(t)!==0)console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1;let n=this.times,i=this.values,r=n.length;if(r===0)console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1;let s=null;for(let a=0;a!==r;a++){let o=n[a];if(typeof o==="number"&&isNaN(o)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,o),e=!1;break}if(s!==null&&s>o){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,o,s),e=!1;break}s=o}if(i!==void 0){if(G1(i))for(let a=0,o=i.length;a!==o;++a){let l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===2302,r=e.length-1,s=1;for(let a=1;a<r;++a){let o=!1,l=e[a],c=e[a+1];if(l!==c&&(a!==1||l!==e[0]))if(!i){let d=a*n,h=d-n,u=d+n;for(let p=0;p!==n;++p){let g=t[d+p];if(g!==t[h+p]||g!==t[u+p]){o=!0;break}}}else o=!0;if(o){if(a!==s){e[s]=e[a];let d=a*n,h=s*n;for(let u=0;u!==n;++u)t[h+u]=t[d+u]}++s}}if(r>0){e[s]=e[r];for(let a=r*n,o=s*n,l=0;l!==n;++l)t[o+l]=t[a+l];++s}if(s!==e.length)this.times=e.slice(0,s),this.values=t.slice(0,s*n);else this.times=e,this.values=t;return this}clone(){let e=this.times.slice(),t=this.values.slice(),i=new this.constructor(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Rn.prototype.ValueTypeName="";Rn.prototype.TimeBufferType=Float32Array;Rn.prototype.ValueBufferType=Float32Array;Rn.prototype.DefaultInterpolation=2301;class rr extends Rn{constructor(e,t,n){super(e,t,n)}}rr.prototype.ValueTypeName="bool";rr.prototype.ValueBufferType=Array;rr.prototype.DefaultInterpolation=2300;rr.prototype.InterpolantFactoryMethodLinear=void 0;rr.prototype.InterpolantFactoryMethodSmooth=void 0;class ku extends Rn{constructor(e,t,n,i){super(e,t,n,i)}}ku.prototype.ValueTypeName="color";class Nu extends Rn{constructor(e,t,n,i){super(e,t,n,i)}}Nu.prototype.ValueTypeName="number";class Uu extends Qr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,s=this.sampleValues,a=this.valueSize,o=(n-t)/(i-t),l=e*a;for(let c=l+a;l!==c;l+=4)Fn.slerpFlat(r,0,s,l-a,s,l,o);return r}}class wl extends Rn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Uu(this.times,this.values,this.getValueSize(),e)}}wl.prototype.ValueTypeName="quaternion";wl.prototype.InterpolantFactoryMethodSmooth=void 0;class sr extends Rn{constructor(e,t,n){super(e,t,n)}}sr.prototype.ValueTypeName="string";sr.prototype.ValueBufferType=Array;sr.prototype.DefaultInterpolation=2300;sr.prototype.InterpolantFactoryMethodLinear=void 0;sr.prototype.InterpolantFactoryMethodSmooth=void 0;class Fu extends Rn{constructor(e,t,n,i){super(e,t,n,i)}}Fu.prototype.ValueTypeName="vector";class Ou{constructor(e,t,n){let i=this,r=!1,s=0,a=0,o=void 0,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(c){if(a++,r===!1){if(i.onStart!==void 0)i.onStart(c,s,a)}r=!0},this.itemEnd=function(c){if(s++,i.onProgress!==void 0)i.onProgress(c,s,a);if(s===a){if(r=!1,i.onLoad!==void 0)i.onLoad()}},this.itemError=function(c){if(i.onError!==void 0)i.onError(c)},this.resolveURL=function(c){if(o)return o(c);return c},this.setURLModifier=function(c){return o=c,this},this.addHandler=function(c,d){return l.push(c,d),this},this.removeHandler=function(c){let d=l.indexOf(c);if(d!==-1)l.splice(d,2);return this},this.getHandler=function(c){for(let d=0,h=l.length;d<h;d+=2){let u=l[d],p=l[d+1];if(u.global)u.lastIndex=0;if(u.test(c))return p}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}var u0=new Ou;class Bu{constructor(e){this.manager=e!==void 0?e:u0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Bu.DEFAULT_MATERIAL_NAME="__DEFAULT";class fa extends yt{constructor(e,t=1){super();this.isLight=!0,this.type="Light",this.color=new Ne(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);if(t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0)t.object.groundColor=this.groundColor.getHex();if(this.distance!==void 0)t.object.distance=this.distance;if(this.angle!==void 0)t.object.angle=this.angle;if(this.decay!==void 0)t.object.decay=this.decay;if(this.penumbra!==void 0)t.object.penumbra=this.penumbra;if(this.shadow!==void 0)t.object.shadow=this.shadow.toJSON();if(this.target!==void 0)t.object.target=this.target.uuid;return t}}class Ml extends fa{constructor(e,t,n){super(e,n);this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ne(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}var Sh=new et,lx=new P,cx=new P;class zu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new re(512,512),this.mapType=1009,this.map=null,this.mapPass=null,this.matrix=new et,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new sa,this._frameExtents=new re(1,1),this._viewportCount=1,this._viewports=[new it(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;if(lx.setFromMatrixPosition(e.matrixWorld),t.position.copy(lx),cx.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(cx),t.updateMatrixWorld(),Sh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sh,t.coordinateSystem,t.reversedDepth),t.reversedDepth)n.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,1,0,0,0,0,1);else n.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,0.5,0.5,0,0,0,1);n.multiply(Sh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};if(this.intensity!==1)e.intensity=this.intensity;if(this.bias!==0)e.bias=this.bias;if(this.normalBias!==0)e.normalBias=this.normalBias;if(this.radius!==1)e.radius=this.radius;if(this.mapSize.x!==512||this.mapSize.y!==512)e.mapSize=this.mapSize.toArray();return e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}var dx=new et,Us=new P,wh=new P;class f0 extends zu{constructor(){super(new qt(90,1,0.5,500));this.isPointLightShadow=!0,this._frameExtents=new re(4,2),this._viewportCount=6,this._viewports=[new it(2,1,1,1),new it(0,1,1,1),new it(3,1,1,1),new it(1,1,1,1),new it(3,0,1,1),new it(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,r=e.distance||n.far;if(r!==n.far)n.far=r,n.updateProjectionMatrix();Us.setFromMatrixPosition(e.matrixWorld),n.position.copy(Us),wh.copy(n.position),wh.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(wh),n.updateMatrixWorld(),i.makeTranslation(-Us.x,-Us.y,-Us.z),dx.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(dx,n.coordinateSystem,n.reversedDepth)}}class El extends fa{constructor(e,t,n=0,i=2){super(e,t);this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new f0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class es extends dl{constructor(e=-1,t=1,n=1,i=-1,r=0.1,s=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,s){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,s=n+e,a=i+t,o=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,s=r+l*this.view.width,a-=c*this.view.offsetY,o=a-c*this.view.height}this.projectionMatrix.makeOrthographic(r,s,a,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);if(t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null)t.object.view=Object.assign({},this.view);return t}}class p0 extends zu{constructor(){super(new es(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}}class pa extends fa{constructor(e,t){super(e,t);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.shadow=new p0}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Tl extends Tt{constructor(){super();this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class Hu extends qt{constructor(e=[]){super();this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Al{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1000,this.oldTime=t,this.elapsedTime+=e}return e}}var Gu="\\[\\]\\.:\\/",V1=new RegExp("["+Gu+"]","g"),Vu="[^"+Gu+"]",W1="[^"+Gu.replace("\\.","")+"]",$1=/((?:WC+[\/:])*)/.source.replace("WC",Vu),q1=/(WCOD+)?/.source.replace("WCOD",W1),X1=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Vu),Y1=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Vu),j1=new RegExp("^"+$1+q1+X1+Y1+"$"),Z1=["material","materials","bones","map"];class m0{constructor(e,t,n){let i=n||at.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];if(i!==void 0)i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class at{constructor(e,t,n){this.path=t,this.parsedPath=n||at.parseTrackName(t),this.node=at.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){if(!(e&&e.isAnimationObjectGroup))return new at(e,t,n);else return new at.Composite(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(V1,"")}static parseTrackName(e){let t=j1.exec(e);if(t===null)throw Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);if(Z1.indexOf(r)!==-1)n.nodeName=n.nodeName.substring(0,i),n.objectName=r}if(n.propertyName===null||n.propertyName.length===0)throw Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let s=0;s<r.length;s++){let a=r[s];if(a.name===t||a.uuid===t)return a;let o=n(a.children);if(o)return o}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,{objectName:n,propertyName:i,propertyIndex:r}=t;if(!e)e=at.findNode(this.rootNode,t.nodeName),this.node=e;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let c=0;c<e.length;c++)if(e[c].name===l){l=c;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let s=e[i];if(s===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;if(this.targetObject=e,e.isMaterial===!0)a=this.Versioning.NeedsUpdate;else if(e.isObject3D===!0)a=this.Versioning.MatrixWorldNeedsUpdate;let o=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(e.morphTargetDictionary[r]!==void 0)r=e.morphTargetDictionary[r]}o=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=r}else if(s.fromArray!==void 0&&s.toArray!==void 0)o=this.BindingType.HasFromToArray,this.resolvedProperty=s;else if(Array.isArray(s))o=this.BindingType.EntireArray,this.resolvedProperty=s;else this.propertyName=i;this.getValue=this.GetterByBindingType[o],this.setValue=this.SetterByBindingTypeAndVersioning[o][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}at.Composite=m0;at.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};at.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};at.prototype.GetterByBindingType=[at.prototype._getValue_direct,at.prototype._getValue_array,at.prototype._getValue_arrayElement,at.prototype._getValue_toArray];at.prototype.SetterByBindingTypeAndVersioning=[[at.prototype._setValue_direct,at.prototype._setValue_direct_setNeedsUpdate,at.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[at.prototype._setValue_array,at.prototype._setValue_array_setNeedsUpdate,at.prototype._setValue_array_setMatrixWorldNeedsUpdate],[at.prototype._setValue_arrayElement,at.prototype._setValue_arrayElement_setNeedsUpdate,at.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[at.prototype._setValue_fromArray,at.prototype._setValue_fromArray_setNeedsUpdate,at.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var oL=new Float32Array(1);class ar extends ul{constructor(e,t,n=1){super(e,t);this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}var hx=new et;class Cl{constructor(e,t,n=0,i=1/0){this.ray=new Kr(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new ji,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){if(t.isPerspectiveCamera)this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,0.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t;else if(t.isOrthographicCamera)this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t;else console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return hx.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(hx),this}intersectObject(e,t=!0,n=[]){return Ah(e,this,n,t),n.sort(ux),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)Ah(e[i],this,n,t);return n.sort(ux),n}}function ux(e,t){return e.distance-t.distance}function Ah(e,t,n,i){let r=!0;if(e.layers.test(t.layers)){if(e.raycast(t,n)===!1)r=!1}if(r===!0&&i===!0){let s=e.children;for(let a=0,o=s.length;a<o;a++)Ah(s[a],t,n,!0)}}class ma{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=$e(this.phi,0.000001,Math.PI-0.000001),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){if(this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0)this.theta=0,this.phi=0;else this.theta=Math.atan2(e,n),this.phi=Math.acos($e(t/this.radius,-1,1));return this}clone(){return new this.constructor().copy(this)}}var fx=new P,ko=new P,Hr=new P,Gr=new P,Mh=new P,K1=new P,J1=new P;class Rl{constructor(e=new P,t=new P){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(0.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){fx.subVectors(e,this.start),ko.subVectors(this.end,this.start);let n=ko.dot(ko),r=ko.dot(fx)/n;if(t)r=$e(r,0,1);return r}closestPointToPoint(e,t,n){let i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}distanceSqToLine3(e,t=K1,n=J1){let r,s,a=this.start,o=e.start,l=this.end,c=e.end;Hr.subVectors(l,a),Gr.subVectors(c,o),Mh.subVectors(a,o);let d=Hr.dot(Hr),h=Gr.dot(Gr),u=Gr.dot(Mh);if(d<=0.00000000000000010000000000000001&&h<=0.00000000000000010000000000000001)return t.copy(a),n.copy(o),t.sub(n),t.dot(t);if(d<=0.00000000000000010000000000000001)r=0,s=u/h,s=$e(s,0,1);else{let p=Hr.dot(Mh);if(h<=0.00000000000000010000000000000001)s=0,r=$e(-p/d,0,1);else{let g=Hr.dot(Gr),x=d*h-g*g;if(x!==0)r=$e((g*u-p*h)/x,0,1);else r=0;if(s=(g*r+u)/h,s<0)s=0,r=$e(-p/d,0,1);else if(s>1)s=1,r=$e((g-p)/d,0,1)}}return t.copy(a).add(Hr.multiplyScalar(r)),n.copy(o).add(Gr.multiplyScalar(s)),t.sub(n),t.dot(t)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}class Pl extends di{constructor(e,t=null){super();this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}if(this.domElement!==null)this.disconnect();this.domElement=e}disconnect(){}dispose(){}update(){}}function Wu(e,t,n,i){let r=Q1(i);switch(n){case 1021:return e*t;case 1028:return e*t/r.components*r.byteLength;case 1029:return e*t/r.components*r.byteLength;case 1030:return e*t*2/r.components*r.byteLength;case 1031:return e*t*2/r.components*r.byteLength;case 1022:return e*t*3/r.components*r.byteLength;case 1023:return e*t*4/r.components*r.byteLength;case 1033:return e*t*4/r.components*r.byteLength;case 33776:case 33777:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case 33778:case 33779:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case 35841:case 35843:return Math.max(e,16)*Math.max(t,8)/4;case 35840:case 35842:return Math.max(e,8)*Math.max(t,8)/2;case 36196:case 37492:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case 37496:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case 37808:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case 37809:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case 37810:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case 37811:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case 37812:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case 37813:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case 37814:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case 37815:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case 37816:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case 37817:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case 37818:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case 37819:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case 37820:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case 37821:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(e/4)*Math.ceil(t/4)*16;case 36283:case 36284:return Math.ceil(e/4)*Math.ceil(t/4)*8;case 36285:case 36286:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Q1(e){switch(e){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`Unknown texture type ${e}.`)}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));if(typeof window<"u")if(window.__THREE__)console.warn("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="180";function B0(){let e=null,t=!1,n=null,i=null;function r(s,a){n(s,a),i=e.requestAnimationFrame(r)}return{start:function(){if(t===!0)return;if(n===null)return;i=e.requestAnimationFrame(r),t=!0},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){n=s},setContext:function(s){e=s}}}function ew(e){let t=new WeakMap;function n(o,l){let{array:c,usage:d}=o,h=c.byteLength,u=e.createBuffer();e.bindBuffer(l,u),e.bufferData(l,c,d),o.onUploadCallback();let p;if(c instanceof Float32Array)p=e.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=e.HALF_FLOAT;else if(c instanceof Uint16Array)if(o.isFloat16BufferAttribute)p=e.HALF_FLOAT;else p=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=e.SHORT;else if(c instanceof Uint32Array)p=e.UNSIGNED_INT;else if(c instanceof Int32Array)p=e.INT;else if(c instanceof Int8Array)p=e.BYTE;else if(c instanceof Uint8Array)p=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=e.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){let{array:d,updateRanges:h}=l;if(e.bindBuffer(c,o),h.length===0)e.bufferSubData(c,0,d);else{h.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<h.length;p++){let g=h[u],x=h[p];if(x.start<=g.start+g.count+1)g.count=Math.max(g.count,x.start+x.count-g.start);else++u,h[u]=x}h.length=u+1;for(let p=0,g=h.length;p<g;p++){let x=h[p];e.bufferSubData(c,x.start*d.BYTES_PER_ELEMENT,d,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){if(o.isInterleavedBufferAttribute)o=o.data;return t.get(o)}function s(o){if(o.isInterleavedBufferAttribute)o=o.data;let l=t.get(o);if(l)e.deleteBuffer(l.buffer),t.delete(o)}function a(o,l){if(o.isInterleavedBufferAttribute)o=o.data;if(o.isGLBufferAttribute){let d=t.get(o);if(!d||d.version<o.version)t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var tw=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,nw=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,iw=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,rw=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sw=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,aw=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ow=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,lw=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cw=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,dw=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,hw=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,uw=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fw=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,pw=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,mw=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,gw=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,xw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,vw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_w=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,yw=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,bw=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Sw=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ww=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Mw=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ew=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Tw=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Aw=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Cw=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rw=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Pw=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Iw="gl_FragColor = linearToOutputTexel( gl_FragColor );",Lw=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Dw=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,kw=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Nw=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Uw=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Fw=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ow=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bw=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zw=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Hw=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Gw=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Vw=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ww=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$w=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,qw=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Xw=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Yw=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,jw=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Zw=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Kw=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Jw=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Qw=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,eM=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,tM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,nM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,iM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,rM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,aM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,oM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,lM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,cM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,dM=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,uM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,fM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,pM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,mM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gM=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,xM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,_M=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,yM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,SM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,wM=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,MM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,EM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,TM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,AM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,CM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,RM=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,PM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,IM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,LM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,DM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,kM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,NM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,UM=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,FM=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,OM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,BM=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,zM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,HM=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,GM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,VM=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,WM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$M=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,XM=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,YM=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,jM=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ZM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,KM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,JM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,QM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,eE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,tE=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,iE=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,aE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,oE=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,lE=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,cE=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,dE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uE=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,fE=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,mE=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gE=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`;var xE=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vE=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,_E=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yE=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,bE=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,SE=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wE=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ME=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,EE=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,TE=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,AE=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,CE=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,RE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,PE=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,IE=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,LE=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,DE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Je={alphahash_fragment:tw,alphahash_pars_fragment:nw,alphamap_fragment:iw,alphamap_pars_fragment:rw,alphatest_fragment:sw,alphatest_pars_fragment:aw,aomap_fragment:ow,aomap_pars_fragment:lw,batching_pars_vertex:cw,batching_vertex:dw,begin_vertex:hw,beginnormal_vertex:uw,bsdfs:fw,iridescence_fragment:pw,bumpmap_pars_fragment:mw,clipping_planes_fragment:gw,clipping_planes_pars_fragment:xw,clipping_planes_pars_vertex:vw,clipping_planes_vertex:_w,color_fragment:yw,color_pars_fragment:bw,color_pars_vertex:Sw,color_vertex:ww,common:Mw,cube_uv_reflection_fragment:Ew,defaultnormal_vertex:Tw,displacementmap_pars_vertex:Aw,displacementmap_vertex:Cw,emissivemap_fragment:Rw,emissivemap_pars_fragment:Pw,colorspace_fragment:Iw,colorspace_pars_fragment:Lw,envmap_fragment:Dw,envmap_common_pars_fragment:kw,envmap_pars_fragment:Nw,envmap_pars_vertex:Uw,envmap_physical_pars_fragment:Xw,envmap_vertex:Fw,fog_vertex:Ow,fog_pars_vertex:Bw,fog_fragment:zw,fog_pars_fragment:Hw,gradientmap_pars_fragment:Gw,lightmap_pars_fragment:Vw,lights_lambert_fragment:Ww,lights_lambert_pars_fragment:$w,lights_pars_begin:qw,lights_toon_fragment:Yw,lights_toon_pars_fragment:jw,lights_phong_fragment:Zw,lights_phong_pars_fragment:Kw,lights_physical_fragment:Jw,lights_physical_pars_fragment:Qw,lights_fragment_begin:eM,lights_fragment_maps:tM,lights_fragment_end:nM,logdepthbuf_fragment:iM,logdepthbuf_pars_fragment:rM,logdepthbuf_pars_vertex:sM,logdepthbuf_vertex:aM,map_fragment:oM,map_pars_fragment:lM,map_particle_fragment:cM,map_particle_pars_fragment:dM,metalnessmap_fragment:hM,metalnessmap_pars_fragment:uM,morphinstance_vertex:fM,morphcolor_vertex:pM,morphnormal_vertex:mM,morphtarget_pars_vertex:gM,morphtarget_vertex:xM,normal_fragment_begin:vM,normal_fragment_maps:_M,normal_pars_fragment:yM,normal_pars_vertex:bM,normal_vertex:SM,normalmap_pars_fragment:wM,clearcoat_normal_fragment_begin:MM,clearcoat_normal_fragment_maps:EM,clearcoat_pars_fragment:TM,iridescence_pars_fragment:AM,opaque_fragment:CM,packing:RM,premultiplied_alpha_fragment:PM,project_vertex:IM,dithering_fragment:LM,dithering_pars_fragment:DM,roughnessmap_fragment:kM,roughnessmap_pars_fragment:NM,shadowmap_pars_fragment:UM,shadowmap_pars_vertex:FM,shadowmap_vertex:OM,shadowmask_pars_fragment:BM,skinbase_vertex:zM,skinning_pars_vertex:HM,skinning_vertex:GM,skinnormal_vertex:VM,specularmap_fragment:WM,specularmap_pars_fragment:$M,tonemapping_fragment:qM,tonemapping_pars_fragment:XM,transmission_fragment:YM,transmission_pars_fragment:jM,uv_pars_fragment:ZM,uv_pars_vertex:KM,uv_vertex:JM,worldpos_vertex:QM,background_vert:eE,background_frag:tE,backgroundCube_vert:nE,backgroundCube_frag:iE,cube_vert:rE,cube_frag:sE,depth_vert:aE,depth_frag:oE,distanceRGBA_vert:lE,distanceRGBA_frag:cE,equirect_vert:dE,equirect_frag:hE,linedashed_vert:uE,linedashed_frag:fE,meshbasic_vert:pE,meshbasic_frag:mE,meshlambert_vert:gE,meshlambert_frag:xE,meshmatcap_vert:vE,meshmatcap_frag:_E,meshnormal_vert:yE,meshnormal_frag:bE,meshphong_vert:SE,meshphong_frag:wE,meshphysical_vert:ME,meshphysical_frag:EE,meshtoon_vert:TE,meshtoon_frag:AE,points_vert:CE,points_frag:RE,shadow_vert:PE,shadow_frag:IE,sprite_vert:LE,sprite_frag:DE},be={common:{diffuse:{value:new Ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new Ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new Ne(16777215)},opacity:{value:1},center:{value:new re(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},tn={basic:{uniforms:Xt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:Je.meshbasic_vert,fragmentShader:Je.meshbasic_frag},lambert:{uniforms:Xt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Ne(0)}}]),vertexShader:Je.meshlambert_vert,fragmentShader:Je.meshlambert_frag},phong:{uniforms:Xt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Ne(0)},specular:{value:new Ne(1118481)},shininess:{value:30}}]),vertexShader:Je.meshphong_vert,fragmentShader:Je.meshphong_frag},standard:{uniforms:Xt([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new Ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag},toon:{uniforms:Xt([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new Ne(0)}}]),vertexShader:Je.meshtoon_vert,fragmentShader:Je.meshtoon_frag},matcap:{uniforms:Xt([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:Je.meshmatcap_vert,fragmentShader:Je.meshmatcap_frag},points:{uniforms:Xt([be.points,be.fog]),vertexShader:Je.points_vert,fragmentShader:Je.points_frag},dashed:{uniforms:Xt([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Je.linedashed_vert,fragmentShader:Je.linedashed_frag},depth:{uniforms:Xt([be.common,be.displacementmap]),vertexShader:Je.depth_vert,fragmentShader:Je.depth_frag},normal:{uniforms:Xt([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:Je.meshnormal_vert,fragmentShader:Je.meshnormal_frag},sprite:{uniforms:Xt([be.sprite,be.fog]),vertexShader:Je.sprite_vert,fragmentShader:Je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Je.background_vert,fragmentShader:Je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:Je.backgroundCube_vert,fragmentShader:Je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Je.cube_vert,fragmentShader:Je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Je.equirect_vert,fragmentShader:Je.equirect_frag},distanceRGBA:{uniforms:Xt([be.common,be.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:Je.distanceRGBA_vert,fragmentShader:Je.distanceRGBA_frag},shadow:{uniforms:Xt([be.lights,be.fog,{color:{value:new Ne(0)},opacity:{value:1}}]),vertexShader:Je.shadow_vert,fragmentShader:Je.shadow_frag}};tn.physical={uniforms:Xt([tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new Ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new Ne(0)},specularColor:{value:new Ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag};var Il={r:0,b:0,g:0},or=new Tn,kE=new et;function NE(e,t,n,i,r,s,a){let o=new Ne(0),l=s===!0?0:1,c,d,h=null,u=0,p=null;function g(v){let S=v.isScene===!0?v.background:null;if(S&&S.isTexture)S=(v.backgroundBlurriness>0?n:t).get(S);return S}function x(v){let S=!1,R=g(v);if(R===null)f(o,l);else if(R&&R.isColor)f(R,1),S=!0;let T=e.xr.getEnvironmentBlendMode();if(T==="additive")i.buffers.color.setClear(0,0,0,1,a);else if(T==="alpha-blend")i.buffers.color.setClear(0,0,0,0,a);if(e.autoClear||S)i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil)}function m(v,S){let R=g(S);if(R&&(R.isCubeTexture||R.mapping===Ks)){if(d===void 0)d=new Ze(new wt(1,1,1),new ot({name:"BackgroundCubeMaterial",uniforms:Zi(tn.backgroundCube.uniforms),vertexShader:tn.backgroundCube.vertexShader,fragmentShader:tn.backgroundCube.fragmentShader,side:Jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(T,E,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d);if(or.copy(S.backgroundRotation),or.x*=-1,or.y*=-1,or.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1)or.y*=-1,or.z*=-1;if(d.material.uniforms.envMap.value=R,d.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(kE.makeRotationFromEuler(or)),d.material.toneMapped=nt.getTransfer(R.colorSpace)!==dt,h!==R||u!==R.version||p!==e.toneMapping)d.material.needsUpdate=!0,h=R,u=R.version,p=e.toneMapping;d.layers.enableAll(),v.unshift(d,d.geometry,d.material,0,0,null)}else if(R&&R.isTexture){if(c===void 0)c=new Ze(new hi(2,2),new ot({name:"BackgroundMaterial",uniforms:Zi(tn.background.uniforms),vertexShader:tn.background.vertexShader,fragmentShader:tn.background.fragmentShader,side:Xr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c);if(c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=nt.getTransfer(R.colorSpace)!==dt,R.matrixAutoUpdate===!0)R.updateMatrix();if(c.material.uniforms.uvTransform.value.copy(R.matrix),h!==R||u!==R.version||p!==e.toneMapping)c.material.needsUpdate=!0,h=R,u=R.version,p=e.toneMapping;c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)}}function f(v,S){v.getRGB(Il,bu(e)),i.buffers.color.setClear(Il.r,Il.g,Il.b,S,a)}function w(){if(d!==void 0)d.geometry.dispose(),d.material.dispose(),d=void 0;if(c!==void 0)c.geometry.dispose(),c.material.dispose(),c=void 0}return{getClearColor:function(){return o},setClearColor:function(v,S=1){o.set(v),l=S,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,f(o,l)},render:x,addToRenderList:m,dispose:w}}function UE(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},r=u(null),s=r,a=!1;function o(_,A,F,q,B){let ee=!1,j=h(q,F,A);if(s!==j)s=j,c(s.object);if(ee=p(_,q,F,B),ee)g(_,q,F,B);if(B!==null)t.update(B,e.ELEMENT_ARRAY_BUFFER);if(ee||a){if(a=!1,S(_,A,F,q),B!==null)e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(B).buffer)}}function l(){return e.createVertexArray()}function c(_){return e.bindVertexArray(_)}function d(_){return e.deleteVertexArray(_)}function h(_,A,F){let q=F.wireframe===!0,B=i[_.id];if(B===void 0)B={},i[_.id]=B;let ee=B[A.id];if(ee===void 0)ee={},B[A.id]=ee;let j=ee[q];if(j===void 0)j=u(l()),ee[q]=j;return j}function u(_){let A=[],F=[],q=[];for(let B=0;B<n;B++)A[B]=0,F[B]=0,q[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:F,attributeDivisors:q,object:_,attributes:{},index:null}}function p(_,A,F,q){let B=s.attributes,ee=A.attributes,j=0,ae=F.getAttributes();for(let W in ae)if(ae[W].location>=0){let fe=B[W],Ae=ee[W];if(Ae===void 0){if(W==="instanceMatrix"&&_.instanceMatrix)Ae=_.instanceMatrix;if(W==="instanceColor"&&_.instanceColor)Ae=_.instanceColor}if(fe===void 0)return!0;if(fe.attribute!==Ae)return!0;if(Ae&&fe.data!==Ae.data)return!0;j++}if(s.attributesNum!==j)return!0;if(s.index!==q)return!0;return!1}function g(_,A,F,q){let B={},ee=A.attributes,j=0,ae=F.getAttributes();for(let W in ae)if(ae[W].location>=0){let fe=ee[W];if(fe===void 0){if(W==="instanceMatrix"&&_.instanceMatrix)fe=_.instanceMatrix;if(W==="instanceColor"&&_.instanceColor)fe=_.instanceColor}let Ae={};if(Ae.attribute=fe,fe&&fe.data)Ae.data=fe.data;B[W]=Ae,j++}s.attributes=B,s.attributesNum=j,s.index=q}function x(){let _=s.newAttributes;for(let A=0,F=_.length;A<F;A++)_[A]=0}function m(_){f(_,0)}function f(_,A){let F=s.newAttributes,q=s.enabledAttributes,B=s.attributeDivisors;if(F[_]=1,q[_]===0)e.enableVertexAttribArray(_),q[_]=1;if(B[_]!==A)e.vertexAttribDivisor(_,A),B[_]=A}function w(){let _=s.newAttributes,A=s.enabledAttributes;for(let F=0,q=A.length;F<q;F++)if(A[F]!==_[F])e.disableVertexAttribArray(F),A[F]=0}function v(_,A,F,q,B,ee,j){if(j===!0)e.vertexAttribIPointer(_,A,F,B,ee);else e.vertexAttribPointer(_,A,F,q,B,ee)}function S(_,A,F,q){x();let B=q.attributes,ee=F.getAttributes(),j=A.defaultAttributeValues;for(let ae in ee){let W=ee[ae];if(W.location>=0){let me=B[ae];if(me===void 0){if(ae==="instanceMatrix"&&_.instanceMatrix)me=_.instanceMatrix;if(ae==="instanceColor"&&_.instanceColor)me=_.instanceColor}if(me!==void 0){let fe=me.normalized,Ae=me.itemSize,Se=t.get(me);if(Se===void 0)continue;let{buffer:N,type:ne,bytesPerElement:Y}=Se,le=ne===e.INT||ne===e.UNSIGNED_INT||me.gpuType===Lh;if(me.isInterleavedBufferAttribute){let pe=me.data,L=pe.stride,X=me.offset;if(pe.isInstancedInterleavedBuffer){for(let ie=0;ie<W.locationSize;ie++)f(W.location+ie,pe.meshPerAttribute);if(_.isInstancedMesh!==!0&&q._maxInstanceCount===void 0)q._maxInstanceCount=pe.meshPerAttribute*pe.count}else for(let ie=0;ie<W.locationSize;ie++)m(W.location+ie);e.bindBuffer(e.ARRAY_BUFFER,N);for(let ie=0;ie<W.locationSize;ie++)v(W.location+ie,Ae/W.locationSize,ne,fe,L*Y,(X+Ae/W.locationSize*ie)*Y,le)}else{if(me.isInstancedBufferAttribute){for(let pe=0;pe<W.locationSize;pe++)f(W.location+pe,me.meshPerAttribute);if(_.isInstancedMesh!==!0&&q._maxInstanceCount===void 0)q._maxInstanceCount=me.meshPerAttribute*me.count}else for(let pe=0;pe<W.locationSize;pe++)m(W.location+pe);e.bindBuffer(e.ARRAY_BUFFER,N);for(let pe=0;pe<W.locationSize;pe++)v(W.location+pe,Ae/W.locationSize,ne,fe,Ae*Y,Ae/W.locationSize*pe*Y,le)}}else if(j!==void 0){let fe=j[ae];if(fe!==void 0)switch(fe.length){case 2:e.vertexAttrib2fv(W.location,fe);break;case 3:e.vertexAttrib3fv(W.location,fe);break;case 4:e.vertexAttrib4fv(W.location,fe);break;default:e.vertexAttrib1fv(W.location,fe)}}}}w()}function R(){D();for(let _ in i){let A=i[_];for(let F in A){let q=A[F];for(let B in q)d(q[B].object),delete q[B];delete A[F]}delete i[_]}}function T(_){if(i[_.id]===void 0)return;let A=i[_.id];for(let F in A){let q=A[F];for(let B in q)d(q[B].object),delete q[B];delete A[F]}delete i[_.id]}function E(_){for(let A in i){let F=i[A];if(F[_.id]===void 0)continue;let q=F[_.id];for(let B in q)d(q[B].object),delete q[B];delete F[_.id]}}function D(){if(y(),a=!0,s===r)return;s=r,c(s.object)}function y(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:D,resetDefaultState:y,dispose:R,releaseStatesOfGeometry:T,releaseStatesOfProgram:E,initAttributes:x,enableAttribute:m,disableUnusedAttributes:w}}function FE(e,t,n){let i;function r(c){i=c}function s(c,d){e.drawArrays(i,c,d),n.update(d,i,1)}function a(c,d,h){if(h===0)return;e.drawArraysInstanced(i,c,d,h),n.update(d,i,h)}function o(c,d,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,d,0,h);let p=0;for(let g=0;g<h;g++)p+=d[g];n.update(p,i,1)}function l(c,d,h,u){if(h===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)a(c[g],d[g],u[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,d,0,u,0,h);let g=0;for(let x=0;x<h;x++)g+=d[x]*u[x];n.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function OE(e,t,n,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){let E=t.get("EXT_texture_filter_anisotropic");r=e.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(E){if(E!==An&&i.convert(E)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function o(E){let D=E===Bt&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));if(E!==Xn&&i.convert(E)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Ai&&!D)return!1;return!0}function l(E){if(E==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";E="mediump"}if(E==="mediump"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let c=n.precision!==void 0?n.precision:"highp",d=l(c);if(d!==c)console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d;let h=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=e.getParameter(e.MAX_TEXTURE_SIZE),m=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),f=e.getParameter(e.MAX_VERTEX_ATTRIBS),w=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),v=e.getParameter(e.MAX_VARYING_VECTORS),S=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,T=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:w,maxVaryings:v,maxFragmentUniforms:S,vertexTextures:R,maxSamples:T}}function BE(e){let t=this,n=null,i=0,r=!1,s=!1,a=new pn,o=new Ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let p=h.length!==0||u||i!==0||r;return r=u,i=h.length,p},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){n=d(h,u,0)},this.setState=function(h,u,p){let{clippingPlanes:g,clipIntersection:x,clipShadows:m}=h,f=e.get(h);if(!r||g===null||g.length===0||s&&!m)if(s)d(null);else c();else{let w=s?0:i,v=w*4,S=f.clippingState||null;l.value=S,S=d(g,u,v,p);for(let R=0;R!==v;++R)S[R]=n[R];f.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=w}};function c(){if(l.value!==n)l.value=n,l.needsUpdate=i>0;t.numPlanes=i,t.numIntersection=0}function d(h,u,p,g){let x=h!==null?h.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let f=p+x*4,w=u.matrixWorldInverse;if(o.getNormalMatrix(w),m===null||m.length<f)m=new Float32Array(f);for(let v=0,S=p;v!==x;++v,S+=4)a.copy(h[v]).applyMatrix4(w,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function zE(e){let t=new WeakMap;function n(a,o){if(o===Qo)a.mapping=jr;else if(o===el)a.mapping=$i;return a}function i(a){if(a&&a.isTexture){let o=a.mapping;if(o===Qo||o===el)if(t.has(a)){let l=t.get(a).texture;return n(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new wu(l.height);return c.fromEquirectangularTexture(e,a),t.set(a,c),a.addEventListener("dispose",r),n(c.texture,a.mapping)}else return null}}return a}function r(a){let o=a.target;o.removeEventListener("dispose",r);let l=t.get(o);if(l!==void 0)t.delete(o),l.dispose()}function s(){t=new WeakMap}return{get:i,dispose:s}}var ns=4,g0=[0.125,0.215,0.35,0.446,0.526,0.582],dr=20,$u=new es,x0=new Ne,qu=null,Xu=0,Yu=0,ju=!1,cr=(1+Math.sqrt(5))/2,ts=1/cr,v0=[new P(-cr,ts,0),new P(cr,ts,0),new P(-ts,0,cr),new P(ts,0,cr),new P(0,cr,-ts),new P(0,cr,ts),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],HE=new P;class va{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=0.1,i=100,r={}){let{size:s=256,position:a=HE}=r;qu=this._renderer.getRenderTarget(),Xu=this._renderer.getActiveCubeFace(),Yu=this._renderer.getActiveMipmapLevel(),ju=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);let o=this._allocateTargets();if(o.depthBuffer=!0,this._sceneToCubeUV(e,n,i,o,a),t>0)this._blur(o,0,0,t);return this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=b0(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=y0(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(qu,Xu,Yu),this._renderer.xr.enabled=ju,e.scissorTest=!1,Ll(e,0,0,e.width,e.height)}_fromTexture(e,t){if(e.mapping===jr||e.mapping===$i)this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width);else this._setSize(e.image.width/4);qu=this._renderer.getRenderTarget(),Xu=this._renderer.getActiveCubeFace(),Yu=this._renderer.getActiveMipmapLevel(),ju=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ci,minFilter:ci,generateMipmaps:!1,type:Bt,format:An,colorSpace:ea,depthBuffer:!1},i=_0(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=_0(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=GE(r)),this._blurMaterial=VE(r,e,t)}return i}_compileMaterial(e){let t=new Ze(this._lodPlanes[0],e);this._renderer.compile(t,$u)}_sceneToCubeUV(e,t,n,i,r){let o=new qt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,{autoClear:h,toneMapping:u}=d;if(d.getClearColor(x0),d.toneMapping=oi,d.autoClear=!1,d.state.buffers.depth.getReversed())d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null);let g=new en({name:"PMREM.Background",side:Jt,depthWrite:!1,depthTest:!1}),x=new Ze(new wt,g),m=!1,f=e.background;if(f){if(f.isColor)g.color.copy(f),e.background=null,m=!0}else g.color.copy(x0),m=!0;for(let w=0;w<6;w++){let v=w%3;if(v===0)o.up.set(0,l[w],0),o.position.set(r.x,r.y,r.z),o.lookAt(r.x+c[w],r.y,r.z);else if(v===1)o.up.set(0,0,l[w]),o.position.set(r.x,r.y,r.z),o.lookAt(r.x,r.y+c[w],r.z);else o.up.set(0,l[w],0),o.position.set(r.x,r.y,r.z),o.lookAt(r.x,r.y,r.z+c[w]);let S=this._cubeSize;if(Ll(i,v*S,w>2?S:0,S,S),d.setRenderTarget(i),m)d.render(x,o);d.render(e,o)}x.geometry.dispose(),x.material.dispose(),d.toneMapping=u,d.autoClear=h,e.background=f}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===jr||e.mapping===$i;if(i){if(this._cubemapMaterial===null)this._cubemapMaterial=b0();this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=y0();let r=i?this._cubemapMaterial:this._equirectMaterial,s=new Ze(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let o=this._cubeSize;Ll(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(s,$u)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let r=1;r<i;r++){let s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=v0[(i-r-1)%v0.length];this._blur(e,r-1,r,s,a)}t.autoClear=n}_blur(e,t,n,i,r){let s=this._pingPongRenderTarget;this._halfBlur(e,s,t,n,i,"latitudinal",r),this._halfBlur(s,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,s,a){let o=this._renderer,l=this._blurMaterial;if(s!=="latitudinal"&&s!=="longitudinal")console.error("blur direction must be either latitudinal or longitudinal!");let c=3,d=new Ze(this._lodPlanes[i],l),h=l.uniforms,u=this._sizeLods[n]-1,p=isFinite(r)?Math.PI/(2*u):2*Math.PI/(2*dr-1),g=r/p,x=isFinite(r)?1+Math.floor(c*g):dr;if(x>dr)console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${dr}`);let m=[],f=0;for(let T=0;T<dr;++T){let E=T/g,D=Math.exp(-E*E/2);if(m.push(D),T===0)f+=D;else if(T<x)f+=2*D}for(let T=0;T<m.length;T++)m[T]=m[T]/f;if(h.envMap.value=e.texture,h.samples.value=x,h.weights.value=m,h.latitudinal.value=s==="latitudinal",a)h.poleAxis.value=a;let{_lodMax:w}=this;h.dTheta.value=p,h.mipInt.value=w-n;let v=this._sizeLods[i],S=3*v*(i>w-ns?i-w+ns:0),R=4*(this._cubeSize-v);Ll(t,S,R,3*v,2*v),o.setRenderTarget(t),o.render(d,$u)}}function GE(e){let t=[],n=[],i=[],r=e,s=e-ns+1+g0.length;for(let a=0;a<s;a++){let o=Math.pow(2,r);n.push(o);let l=1/o;if(a>e-ns)l=g0[a-e+ns-1];else if(a===0)l=0;i.push(l);let c=1/(o-2),d=-c,h=1+c,u=[d,d,h,d,h,h,d,d,h,h,d,h],p=6,g=6,x=3,m=2,f=1,w=new Float32Array(x*g*p),v=new Float32Array(m*g*p),S=new Float32Array(f*g*p);for(let T=0;T<p;T++){let E=T%3*2/3-1,D=T>2?0:-1,y=[E,D,0,E+0.6666666666666666,D,0,E+0.6666666666666666,D+1,0,E,D,0,E+0.6666666666666666,D+1,0,E,D+1,0];w.set(y,x*g*T),v.set(u,m*g*T);let _=[T,T,T,T,T,T];S.set(_,f*g*T)}let R=new Tt;if(R.setAttribute("position",new sn(w,x)),R.setAttribute("uv",new sn(v,m)),R.setAttribute("faceIndex",new sn(S,f)),t.push(R),r>ns)r--}return{lodPlanes:t,sizeLods:n,sigmas:i}}function _0(e,t,n){let i=new Et(e,t,n);return i.texture.mapping=Ks,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ll(e,t,n,i,r){e.viewport.set(t,n,i,r),e.scissor.set(t,n,i,r)}function VE(e,t,n){let i=new Float32Array(dr),r=new P(0,1,0);return new ot({name:"SphericalGaussianBlur",defines:{n:dr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ju(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Rt,depthTest:!1,depthWrite:!1})}function y0(){return new ot({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ju(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Rt,depthTest:!1,depthWrite:!1})}function b0(){return new ot({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ju(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Rt,depthTest:!1,depthWrite:!1})}function Ju(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function WE(e){let t=new WeakMap,n=null;function i(o){if(o&&o.isTexture){let l=o.mapping,c=l===Qo||l===el,d=l===jr||l===$i;if(c||d){let h=t.get(o),u=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u){if(n===null)n=new va(e);return h=c?n.fromEquirectangular(o,h):n.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),h.texture}else if(h!==void 0)return h.texture;else{let p=o.image;if(c&&p&&p.height>0||d&&p&&r(p)){if(n===null)n=new va(e);return h=c?n.fromEquirectangular(o):n.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),o.addEventListener("dispose",s),h.texture}else return null}}}return o}function r(o){let l=0,c=6;for(let d=0;d<c;d++)if(o[d]!==void 0)l++;return l===c}function s(o){let l=o.target;l.removeEventListener("dispose",s);let c=t.get(l);if(c!==void 0)t.delete(l),c.dispose()}function a(){if(t=new WeakMap,n!==null)n.dispose(),n=null}return{get:i,dispose:a}}function $E(e){let t={};function n(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=e.getExtension(i)}return t[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){let r=n(i);if(r===null)$r("THREE.WebGLRenderer: "+i+" extension not supported.");return r}}}function qE(e,t,n,i){let r={},s=new WeakMap;function a(h){let u=h.target;if(u.index!==null)t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete r[u.id];let p=s.get(u);if(p)t.remove(p),s.delete(u);if(i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0)delete u._maxInstanceCount;n.memory.geometries--}function o(h,u){if(r[u.id]===!0)return u;return u.addEventListener("dispose",a),r[u.id]=!0,n.memory.geometries++,u}function l(h){let u=h.attributes;for(let p in u)t.update(u[p],e.ARRAY_BUFFER)}function c(h){let u=[],p=h.index,g=h.attributes.position,x=0;if(p!==null){let w=p.array;x=p.version;for(let v=0,S=w.length;v<S;v+=3){let R=w[v+0],T=w[v+1],E=w[v+2];u.push(R,T,T,E,E,R)}}else if(g!==void 0){let w=g.array;x=g.version;for(let v=0,S=w.length/3-1;v<S;v+=3){let R=v+0,T=v+1,E=v+2;u.push(R,T,T,E,E,R)}}else return;let m=new((xu(u))?cl:ll)(u,1);m.version=x;let f=s.get(h);if(f)t.remove(f);s.set(h,m)}function d(h){let u=s.get(h);if(u){let p=h.index;if(p!==null){if(u.version<p.version)c(h)}}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:d}}function XE(e,t,n){let i;function r(u){i=u}let s,a;function o(u){s=u.type,a=u.bytesPerElement}function l(u,p){e.drawElements(i,p,s,u*a),n.update(p,i,1)}function c(u,p,g){if(g===0)return;e.drawElementsInstanced(i,p,s,u*a,g),n.update(p,i,g)}function d(u,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,u,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];n.update(m,i,1)}function h(u,p,g,x){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<u.length;f++)c(u[f]/a,p[f],x[f]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,u,0,x,0,g);let f=0;for(let w=0;w<g;w++)f+=p[w]*x[w];n.update(f,i,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function YE(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(n.calls++,a){case e.TRIANGLES:n.triangles+=o*(s/3);break;case e.LINES:n.lines+=o*(s/2);break;case e.LINE_STRIP:n.lines+=o*(s-1);break;case e.LINE_LOOP:n.lines+=o*s;break;case e.POINTS:n.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:r,update:i}}function jE(e,t,n){let i=new WeakMap,r=new it;function s(a,o,l){let c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0,u=i.get(o);if(u===void 0||u.count!==h){let y=function(){E.dispose(),i.delete(o),o.removeEventListener("dispose",y)};if(u!==void 0)u.texture.dispose();let p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],w=o.morphAttributes.color||[],v=0;if(p===!0)v=1;if(g===!0)v=2;if(x===!0)v=3;let S=o.attributes.position.count*v,R=1;if(S>t.maxTextureSize)R=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize;let T=new Float32Array(S*R*4*h),E=new ol(T,S,R,h);E.type=Ai,E.needsUpdate=!0;let D=v*4;for(let _=0;_<h;_++){let A=m[_],F=f[_],q=w[_],B=S*R*4*_;for(let ee=0;ee<A.count;ee++){let j=ee*D;if(p===!0)r.fromBufferAttribute(A,ee),T[B+j+0]=r.x,T[B+j+1]=r.y,T[B+j+2]=r.z,T[B+j+3]=0;if(g===!0)r.fromBufferAttribute(F,ee),T[B+j+4]=r.x,T[B+j+5]=r.y,T[B+j+6]=r.z,T[B+j+7]=0;if(x===!0)r.fromBufferAttribute(q,ee),T[B+j+8]=r.x,T[B+j+9]=r.y,T[B+j+10]=r.z,T[B+j+11]=q.itemSize===4?r.w:1}}u={count:h,texture:E,size:new re(S,R)},i.set(o,u),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",a.morphTexture,n);else{let p=0;for(let x=0;x<c.length;x++)p+=c[x];let g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(e,"morphTargetBaseInfluence",g),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",u.texture,n),l.getUniforms().setValue(e,"morphTargetsTextureSize",u.size)}return{update:s}}function ZE(e,t,n,i){let r=new WeakMap;function s(l){let c=i.render.frame,d=l.geometry,h=t.get(l,d);if(r.get(h)!==c)t.update(h),r.set(h,c);if(l.isInstancedMesh){if(l.hasEventListener("dispose",o)===!1)l.addEventListener("dispose",o);if(r.get(l)!==c){if(n.update(l.instanceMatrix,e.ARRAY_BUFFER),l.instanceColor!==null)n.update(l.instanceColor,e.ARRAY_BUFFER);r.set(l,c)}}if(l.isSkinnedMesh){let u=l.skeleton;if(r.get(u)!==c)u.update(),r.set(u,c)}return h}function a(){r=new WeakMap}function o(l){let c=l.target;if(c.removeEventListener("dispose",o),n.remove(c.instanceMatrix),c.instanceColor!==null)n.remove(c.instanceColor)}return{update:s,dispose:a}}var z0=new Ot,S0=new Jr(1,1),H0=new ol,G0=new yu,V0=new hl,w0=[],M0=[],E0=new Float32Array(16),T0=new Float32Array(9),A0=new Float32Array(4);function is(e,t,n){let i=e[0];if(i<=0||i>0)return e;let r=t*n,s=w0[r];if(s===void 0)s=new Float32Array(r),w0[r]=s;if(t!==0){i.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=n,e[a].toArray(s,o)}return s}function It(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function Lt(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function kl(e,t){let n=M0[t];if(n===void 0)n=new Int32Array(t),M0[t]=n;for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function KE(e,t){let n=this.cache;if(n[0]===t)return;e.uniform1f(this.addr,t),n[0]=t}function JE(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y)e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y}else{if(It(n,t))return;e.uniform2fv(this.addr,t),Lt(n,t)}}function QE(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z}else if(t.r!==void 0){if(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b}else{if(It(n,t))return;e.uniform3fv(this.addr,t),Lt(n,t)}}function eT(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w}else{if(It(n,t))return;e.uniform4fv(this.addr,t),Lt(n,t)}}function tT(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(It(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Lt(n,t)}else{if(It(n,i))return;A0.set(i),e.uniformMatrix2fv(this.addr,!1,A0),Lt(n,i)}}function nT(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(It(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Lt(n,t)}else{if(It(n,i))return;T0.set(i),e.uniformMatrix3fv(this.addr,!1,T0),Lt(n,i)}}function iT(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(It(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Lt(n,t)}else{if(It(n,i))return;E0.set(i),e.uniformMatrix4fv(this.addr,!1,E0),Lt(n,i)}}function rT(e,t){let n=this.cache;if(n[0]===t)return;e.uniform1i(this.addr,t),n[0]=t}function sT(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y)e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y}else{if(It(n,t))return;e.uniform2iv(this.addr,t),Lt(n,t)}}function aT(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z}else{if(It(n,t))return;e.uniform3iv(this.addr,t),Lt(n,t)}}function oT(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w}else{if(It(n,t))return;e.uniform4iv(this.addr,t),Lt(n,t)}}function lT(e,t){let n=this.cache;if(n[0]===t)return;e.uniform1ui(this.addr,t),n[0]=t}function cT(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y)e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y}else{if(It(n,t))return;e.uniform2uiv(this.addr,t),Lt(n,t)}}function dT(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z}else{if(It(n,t))return;e.uniform3uiv(this.addr,t),Lt(n,t)}}function hT(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w}else{if(It(n,t))return;e.uniform4uiv(this.addr,t),Lt(n,t)}}function uT(e,t,n){let i=this.cache,r=n.allocateTextureUnit();if(i[0]!==r)e.uniform1i(this.addr,r),i[0]=r;let s;if(this.type===e.SAMPLER_2D_SHADOW)S0.compareFunction=fu,s=S0;else s=z0;n.setTexture2D(t||s,r)}function fT(e,t,n){let i=this.cache,r=n.allocateTextureUnit();if(i[0]!==r)e.uniform1i(this.addr,r),i[0]=r;n.setTexture3D(t||G0,r)}function pT(e,t,n){let i=this.cache,r=n.allocateTextureUnit();if(i[0]!==r)e.uniform1i(this.addr,r),i[0]=r;n.setTextureCube(t||V0,r)}function mT(e,t,n){let i=this.cache,r=n.allocateTextureUnit();if(i[0]!==r)e.uniform1i(this.addr,r),i[0]=r;n.setTexture2DArray(t||H0,r)}function gT(e){switch(e){case 5126:return KE;case 35664:return JE;case 35665:return QE;case 35666:return eT;case 35674:return tT;case 35675:return nT;case 35676:return iT;case 5124:case 35670:return rT;case 35667:case 35671:return sT;case 35668:case 35672:return aT;case 35669:case 35673:return oT;case 5125:return lT;case 36294:return cT;case 36295:return dT;case 36296:return hT;case 35678:case 36198:case 36298:case 36306:case 35682:return uT;case 35679:case 36299:case 36307:return fT;case 35680:case 36300:case 36308:case 36293:return pT;case 36289:case 36303:case 36311:case 36292:return mT}}function xT(e,t){e.uniform1fv(this.addr,t)}function vT(e,t){let n=is(t,this.size,2);e.uniform2fv(this.addr,n)}function _T(e,t){let n=is(t,this.size,3);e.uniform3fv(this.addr,n)}function yT(e,t){let n=is(t,this.size,4);e.uniform4fv(this.addr,n)}function bT(e,t){let n=is(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function ST(e,t){let n=is(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function wT(e,t){let n=is(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function MT(e,t){e.uniform1iv(this.addr,t)}function ET(e,t){e.uniform2iv(this.addr,t)}function TT(e,t){e.uniform3iv(this.addr,t)}function AT(e,t){e.uniform4iv(this.addr,t)}function CT(e,t){e.uniform1uiv(this.addr,t)}function RT(e,t){e.uniform2uiv(this.addr,t)}function PT(e,t){e.uniform3uiv(this.addr,t)}function IT(e,t){e.uniform4uiv(this.addr,t)}function LT(e,t,n){let i=this.cache,r=t.length,s=kl(n,r);if(!It(i,s))e.uniform1iv(this.addr,s),Lt(i,s);for(let a=0;a!==r;++a)n.setTexture2D(t[a]||z0,s[a])}function DT(e,t,n){let i=this.cache,r=t.length,s=kl(n,r);if(!It(i,s))e.uniform1iv(this.addr,s),Lt(i,s);for(let a=0;a!==r;++a)n.setTexture3D(t[a]||G0,s[a])}function kT(e,t,n){let i=this.cache,r=t.length,s=kl(n,r);if(!It(i,s))e.uniform1iv(this.addr,s),Lt(i,s);for(let a=0;a!==r;++a)n.setTextureCube(t[a]||V0,s[a])}function NT(e,t,n){let i=this.cache,r=t.length,s=kl(n,r);if(!It(i,s))e.uniform1iv(this.addr,s),Lt(i,s);for(let a=0;a!==r;++a)n.setTexture2DArray(t[a]||H0,s[a])}function UT(e){switch(e){case 5126:return xT;case 35664:return vT;case 35665:return _T;case 35666:return yT;case 35674:return bT;case 35675:return ST;case 35676:return wT;case 5124:case 35670:return MT;case 35667:case 35671:return ET;case 35668:case 35672:return TT;case 35669:case 35673:return AT;case 5125:return CT;case 36294:return RT;case 36295:return PT;case 36296:return IT;case 35678:case 36198:case 36298:case 36306:case 35682:return LT;case 35679:case 36299:case 36307:return DT;case 35680:case 36300:case 36308:case 36293:return kT;case 36289:case 36303:case 36311:case 36292:return NT}}class W0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=gT(t.type)}}class $0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=UT(t.type)}}class q0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,s=i.length;r!==s;++r){let a=i[r];a.setValue(e,t[a.id],n)}}}var Zu=/(\w+)(\])?(\[|\.)?/g;function C0(e,t){e.seq.push(t),e.map[t.id]=t}function FT(e,t,n){let i=e.name,r=i.length;Zu.lastIndex=0;while(!0){let s=Zu.exec(i),a=Zu.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l)o=o|0;if(c===void 0||c==="["&&a+2===r){C0(n,c===void 0?new W0(o,e,t):new $0(o,e,t));break}else{let h=n.map[o];if(h===void 0)h=new q0(o),C0(n,h);n=h}}}class xa{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=e.getActiveUniform(t,i),s=e.getUniformLocation(t,r.name);FT(r,s,this)}}setValue(e,t,n,i){let r=this.map[t];if(r!==void 0)r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];if(i!==void 0)this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,s=t.length;r!==s;++r){let a=t[r],o=n[a.id];if(o.needsUpdate!==!1)a.setValue(e,o.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let s=e[i];if(s.id in t)n.push(s)}return n}}function R0(e,t,n){let i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}var OT=37297,BT=0;function zT(e,t){let n=e.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,n.length);for(let a=r;a<s;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}var P0=new Ke;function HT(e){nt._getMatrix(P0,nt.workingColorSpace,e);let t=`mat3( ${P0.elements.map((n)=>n.toFixed(4))} )`;switch(nt.getTransfer(e)){case uu:return[t,"LinearTransferOETF"];case dt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function I0(e,t,n){let i=e.getShaderParameter(t,e.COMPILE_STATUS),s=(e.getShaderInfoLog(t)||"").trim();if(i&&s==="")return"";let a=/ERROR: 0:(\d+)/.exec(s);if(a){let o=parseInt(a[1]);return n.toUpperCase()+`

`+s+`

`+zT(e.getShaderSource(t),o)}else return s}function GT(e,t){let n=HT(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function VT(e,t){let n;switch(t){case Xo:n="Linear";break;case Yo:n="Reinhard";break;case jo:n="Cineon";break;case Yr:n="ACESFilmic";break;case Ko:n="AgX";break;case Jo:n="Neutral";break;case Zo:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}var Dl=new P;function WT(){nt.getLuminanceCoefficients(Dl);let e=Dl.x.toFixed(4),t=Dl.y.toFixed(4),n=Dl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function $T(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ga).join(`
`)}function qT(e){let t=[];for(let n in e){let i=e[n];if(i===!1)continue;t.push("#define "+n+" "+i)}return t.join(`
`)}function XT(e,t){let n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=e.getActiveAttrib(t,r),a=s.name,o=1;if(s.type===e.FLOAT_MAT2)o=2;if(s.type===e.FLOAT_MAT3)o=3;if(s.type===e.FLOAT_MAT4)o=4;n[a]={type:s.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function ga(e){return e!==""}function L0(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function D0(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var YT=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ku(e){return e.replace(YT,ZT)}var jT=new Map;function ZT(e,t){let n=Je[t];if(n===void 0){let i=jT.get(t);if(i!==void 0)n=Je[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw Error("Can not resolve #include <"+t+">")}return Ku(n)}var KT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function k0(e){return e.replace(KT,JT)}function JT(e,t,n,i){let r="";for(let s=parseInt(t);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function N0(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;if(e.precision==="highp")t+=`
#define HIGH_PRECISION`;else if(e.precision==="mediump")t+=`
#define MEDIUM_PRECISION`;else if(e.precision==="lowp")t+=`
#define LOW_PRECISION`;return t}function QT(e){let t="SHADOWMAP_TYPE_BASIC";if(e.shadowMapType===Rh)t="SHADOWMAP_TYPE_PCF";else if(e.shadowMapType===Oo)t="SHADOWMAP_TYPE_PCF_SOFT";else if(e.shadowMapType===$n)t="SHADOWMAP_TYPE_VSM";return t}function eA(e){let t="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case jr:case $i:t="ENVMAP_TYPE_CUBE";break;case Ks:t="ENVMAP_TYPE_CUBE_UV";break}return t}function tA(e){let t="ENVMAP_MODE_REFLECTION";if(e.envMap)switch(e.envMapMode){case $i:t="ENVMAP_MODE_REFRACTION";break}return t}function nA(e){let t="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case Dx:t="ENVMAP_BLENDING_MULTIPLY";break;case kx:t="ENVMAP_BLENDING_MIX";break;case Nx:t="ENVMAP_BLENDING_ADD";break}return t}function iA(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function rA(e,t,n,i){let r=e.getContext(),{defines:s,vertexShader:a,fragmentShader:o}=n,l=QT(n),c=eA(n),d=tA(n),h=nA(n),u=iA(n),p=$T(n),g=qT(s),x=r.createProgram(),m,f,w=n.glslVersion?"#version "+n.glslVersion+`
`:"";if(n.isRawShaderMaterial){if(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(ga).join(`
`),m.length>0)m+=`
`;if(f=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(ga).join(`
`),f.length>0)f+=`
`}else m=[N0(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(ga).join(`
`),f=[N0(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+d:"",n.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==oi?"#define TONE_MAPPING":"",n.toneMapping!==oi?Je.tonemapping_pars_fragment:"",n.toneMapping!==oi?VT("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Je.colorspace_pars_fragment,GT("linearToOutputTexel",n.outputColorSpace),WT(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(ga).join(`
`);if(a=Ku(a),a=L0(a,n),a=D0(a,n),o=Ku(o),o=L0(o,n),o=D0(o,n),a=k0(a),o=k0(o),n.isRawShaderMaterial!==!0)w=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",n.glslVersion===pu?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===pu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f;let v=w+m+a,S=w+f+o,R=R0(r,r.VERTEX_SHADER,v),T=R0(r,r.FRAGMENT_SHADER,S);if(r.attachShader(x,R),r.attachShader(x,T),n.index0AttributeName!==void 0)r.bindAttribLocation(x,0,n.index0AttributeName);else if(n.morphTargets===!0)r.bindAttribLocation(x,0,"position");r.linkProgram(x);function E(A){if(e.debug.checkShaderErrors){let F=r.getProgramInfoLog(x)||"",q=r.getShaderInfoLog(R)||"",B=r.getShaderInfoLog(T)||"",ee=F.trim(),j=q.trim(),ae=B.trim(),W=!0,me=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(W=!1,typeof e.debug.onShaderError==="function")e.debug.onShaderError(r,x,R,T);else{let fe=I0(r,R,"vertex"),Ae=I0(r,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+ee+`
`+fe+`
`+Ae)}else if(ee!=="")console.warn("THREE.WebGLProgram: Program Info Log:",ee);else if(j===""||ae==="")me=!1;if(me)A.diagnostics={runnable:W,programLog:ee,vertexShader:{log:j,prefix:m},fragmentShader:{log:ae,prefix:f}}}r.deleteShader(R),r.deleteShader(T),D=new xa(r,x),y=XT(r,x)}let D;this.getUniforms=function(){if(D===void 0)E(this);return D};let y;this.getAttributes=function(){if(y===void 0)E(this);return y};let _=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(_===!1)_=r.getProgramParameter(x,OT);return _},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=BT++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=R,this.fragmentShader=T,this}var sA=0;class X0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let{vertexShader:t,fragmentShader:n}=e,i=this._getShaderStage(t),r=this._getShaderStage(n),s=this._getShaderCacheForMaterial(e);if(s.has(i)===!1)s.add(i),i.usedTimes++;if(s.has(r)===!1)s.add(r),r.usedTimes++;return this}remove(e){let t=this.materialCache.get(e);for(let n of t)if(n.usedTimes--,n.usedTimes===0)this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);if(n===void 0)n=new Set,t.set(e,n);return n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);if(n===void 0)n=new Y0(e),t.set(e,n);return n}}class Y0{constructor(e){this.id=sA++,this.code=e,this.usedTimes=0}}function aA(e,t,n,i,r,s,a){let o=new ji,l=new X0,c=new Set,d=[],{logarithmicDepthBuffer:h,vertexTextures:u,precision:p}=r,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(y){if(c.add(y),y===0)return"uv";return`uv${y}`}function m(y,_,A,F,q){let B=F.fog,ee=q.geometry,j=y.isMeshStandardMaterial?F.environment:null,ae=(y.isMeshStandardMaterial?n:t).get(y.envMap||j),W=!!ae&&ae.mapping===Ks?ae.image.height:null,me=g[y.type];if(y.precision!==null){if(p=r.getMaxPrecision(y.precision),p!==y.precision)console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead.")}let fe=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,Ae=fe!==void 0?fe.length:0,Se=0;if(ee.morphAttributes.position!==void 0)Se=1;if(ee.morphAttributes.normal!==void 0)Se=2;if(ee.morphAttributes.color!==void 0)Se=3;let N,ne,Y,le;if(me){let lt=tn[me];N=lt.vertexShader,ne=lt.fragmentShader}else N=y.vertexShader,ne=y.fragmentShader,l.update(y),Y=l.getVertexShaderID(y),le=l.getFragmentShaderID(y);let pe=e.getRenderTarget(),L=e.state.buffers.depth.getReversed(),X=q.isInstancedMesh===!0,ie=q.isBatchedMesh===!0,Pe=!!y.map,I=!!y.matcap,oe=!!ae,J=!!y.aoMap,U=!!y.lightMap,H=!!y.bumpMap,he=!!y.normalMap,Z=!!y.displacementMap,V=!!y.emissiveMap,ce=!!y.metalnessMap,Le=!!y.roughnessMap,ze=y.anisotropy>0,C=y.clearcoat>0,b=y.dispersion>0,O=y.iridescence>0,se=y.sheen>0,de=y.transmission>0,te=ze&&!!y.anisotropyMap,ye=C&&!!y.clearcoatMap,_e=C&&!!y.clearcoatNormalMap,Ie=C&&!!y.clearcoatRoughnessMap,Ge=O&&!!y.iridescenceMap,xe=O&&!!y.iridescenceThicknessMap,Te=se&&!!y.sheenColorMap,Be=se&&!!y.sheenRoughnessMap,Ue=!!y.specularMap,Ee=!!y.specularColorMap,Ye=!!y.specularIntensityMap,k=de&&!!y.transmissionMap,we=de&&!!y.thicknessMap,Me=!!y.gradientMap,De=!!y.alphaMap,ge=y.alphaTest>0,ue=!!y.alphaHash,Oe=!!y.extensions,je=oi;if(y.toneMapped){if(pe===null||pe.isXRRenderTarget===!0)je=e.toneMapping}let ut={shaderID:me,shaderType:y.type,shaderName:y.name,vertexShader:N,fragmentShader:ne,defines:y.defines,customVertexShaderID:Y,customFragmentShaderID:le,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:ie,batchingColor:ie&&q._colorsTexture!==null,instancing:X,instancingColor:X&&q.instanceColor!==null,instancingMorph:X&&q.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:pe===null?e.outputColorSpace:pe.isXRRenderTarget===!0?pe.texture.colorSpace:ea,alphaToCoverage:!!y.alphaToCoverage,map:Pe,matcap:I,envMap:oe,envMapMode:oe&&ae.mapping,envMapCubeUVHeight:W,aoMap:J,lightMap:U,bumpMap:H,normalMap:he,displacementMap:u&&Z,emissiveMap:V,normalMapObjectSpace:he&&y.normalMapType===jx,normalMapTangentSpace:he&&y.normalMapType===Yx,metalnessMap:ce,roughnessMap:Le,anisotropy:ze,anisotropyMap:te,clearcoat:C,clearcoatMap:ye,clearcoatNormalMap:_e,clearcoatRoughnessMap:Ie,dispersion:b,iridescence:O,iridescenceMap:Ge,iridescenceThicknessMap:xe,sheen:se,sheenColorMap:Te,sheenRoughnessMap:Be,specularMap:Ue,specularColorMap:Ee,specularIntensityMap:Ye,transmission:de,transmissionMap:k,thicknessMap:we,gradientMap:Me,opaque:y.transparent===!1&&y.blending===qs&&y.alphaToCoverage===!1,alphaMap:De,alphaTest:ge,alphaHash:ue,combine:y.combine,mapUv:Pe&&x(y.map.channel),aoMapUv:J&&x(y.aoMap.channel),lightMapUv:U&&x(y.lightMap.channel),bumpMapUv:H&&x(y.bumpMap.channel),normalMapUv:he&&x(y.normalMap.channel),displacementMapUv:Z&&x(y.displacementMap.channel),emissiveMapUv:V&&x(y.emissiveMap.channel),metalnessMapUv:ce&&x(y.metalnessMap.channel),roughnessMapUv:Le&&x(y.roughnessMap.channel),anisotropyMapUv:te&&x(y.anisotropyMap.channel),clearcoatMapUv:ye&&x(y.clearcoatMap.channel),clearcoatNormalMapUv:_e&&x(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ie&&x(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Ge&&x(y.iridescenceMap.channel),iridescenceThicknessMapUv:xe&&x(y.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&x(y.sheenColorMap.channel),sheenRoughnessMapUv:Be&&x(y.sheenRoughnessMap.channel),specularMapUv:Ue&&x(y.specularMap.channel),specularColorMapUv:Ee&&x(y.specularColorMap.channel),specularIntensityMapUv:Ye&&x(y.specularIntensityMap.channel),transmissionMapUv:k&&x(y.transmissionMap.channel),thicknessMapUv:we&&x(y.thicknessMap.channel),alphaMapUv:De&&x(y.alphaMap.channel),vertexTangents:!!ee.attributes.tangent&&(he||ze),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,pointsUvs:q.isPoints===!0&&!!ee.attributes.uv&&(Pe||De),fog:!!B,useFog:y.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:L,skinning:q.isSkinnedMesh===!0,morphTargets:ee.morphAttributes.position!==void 0,morphNormals:ee.morphAttributes.normal!==void 0,morphColors:ee.morphAttributes.color!==void 0,morphTargetsCount:Ae,morphTextureStride:Se,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:e.shadowMap.enabled&&A.length>0,shadowMapType:e.shadowMap.type,toneMapping:je,decodeVideoTexture:Pe&&y.map.isVideoTexture===!0&&nt.getTransfer(y.map.colorSpace)===dt,decodeVideoTextureEmissive:V&&y.emissiveMap.isVideoTexture===!0&&nt.getTransfer(y.emissiveMap.colorSpace)===dt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Qt,flipSided:y.side===Jt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Oe&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Oe&&y.extensions.multiDraw===!0||ie)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return ut.vertexUv1s=c.has(1),ut.vertexUv2s=c.has(2),ut.vertexUv3s=c.has(3),c.clear(),ut}function f(y){let _=[];if(y.shaderID)_.push(y.shaderID);else _.push(y.customVertexShaderID),_.push(y.customFragmentShaderID);if(y.defines!==void 0)for(let A in y.defines)_.push(A),_.push(y.defines[A]);if(y.isRawShaderMaterial===!1)w(_,y),v(_,y),_.push(e.outputColorSpace);return _.push(y.customProgramCacheKey),_.join()}function w(y,_){y.push(_.precision),y.push(_.outputColorSpace),y.push(_.envMapMode),y.push(_.envMapCubeUVHeight),y.push(_.mapUv),y.push(_.alphaMapUv),y.push(_.lightMapUv),y.push(_.aoMapUv),y.push(_.bumpMapUv),y.push(_.normalMapUv),y.push(_.displacementMapUv),y.push(_.emissiveMapUv),y.push(_.metalnessMapUv),y.push(_.roughnessMapUv),y.push(_.anisotropyMapUv),y.push(_.clearcoatMapUv),y.push(_.clearcoatNormalMapUv),y.push(_.clearcoatRoughnessMapUv),y.push(_.iridescenceMapUv),y.push(_.iridescenceThicknessMapUv),y.push(_.sheenColorMapUv),y.push(_.sheenRoughnessMapUv),y.push(_.specularMapUv),y.push(_.specularColorMapUv),y.push(_.specularIntensityMapUv),y.push(_.transmissionMapUv),y.push(_.thicknessMapUv),y.push(_.combine),y.push(_.fogExp2),y.push(_.sizeAttenuation),y.push(_.morphTargetsCount),y.push(_.morphAttributeCount),y.push(_.numDirLights),y.push(_.numPointLights),y.push(_.numSpotLights),y.push(_.numSpotLightMaps),y.push(_.numHemiLights),y.push(_.numRectAreaLights),y.push(_.numDirLightShadows),y.push(_.numPointLightShadows),y.push(_.numSpotLightShadows),y.push(_.numSpotLightShadowsWithMaps),y.push(_.numLightProbes),y.push(_.shadowMapType),y.push(_.toneMapping),y.push(_.numClippingPlanes),y.push(_.numClipIntersection),y.push(_.depthPacking)}function v(y,_){if(o.disableAll(),_.supportsVertexTextures)o.enable(0);if(_.instancing)o.enable(1);if(_.instancingColor)o.enable(2);if(_.instancingMorph)o.enable(3);if(_.matcap)o.enable(4);if(_.envMap)o.enable(5);if(_.normalMapObjectSpace)o.enable(6);if(_.normalMapTangentSpace)o.enable(7);if(_.clearcoat)o.enable(8);if(_.iridescence)o.enable(9);if(_.alphaTest)o.enable(10);if(_.vertexColors)o.enable(11);if(_.vertexAlphas)o.enable(12);if(_.vertexUv1s)o.enable(13);if(_.vertexUv2s)o.enable(14);if(_.vertexUv3s)o.enable(15);if(_.vertexTangents)o.enable(16);if(_.anisotropy)o.enable(17);if(_.alphaHash)o.enable(18);if(_.batching)o.enable(19);if(_.dispersion)o.enable(20);if(_.batchingColor)o.enable(21);if(_.gradientMap)o.enable(22);if(y.push(o.mask),o.disableAll(),_.fog)o.enable(0);if(_.useFog)o.enable(1);if(_.flatShading)o.enable(2);if(_.logarithmicDepthBuffer)o.enable(3);if(_.reversedDepthBuffer)o.enable(4);if(_.skinning)o.enable(5);if(_.morphTargets)o.enable(6);if(_.morphNormals)o.enable(7);if(_.morphColors)o.enable(8);if(_.premultipliedAlpha)o.enable(9);if(_.shadowMapEnabled)o.enable(10);if(_.doubleSided)o.enable(11);if(_.flipSided)o.enable(12);if(_.useDepthPacking)o.enable(13);if(_.dithering)o.enable(14);if(_.transmission)o.enable(15);if(_.sheen)o.enable(16);if(_.opaque)o.enable(17);if(_.pointsUvs)o.enable(18);if(_.decodeVideoTexture)o.enable(19);if(_.decodeVideoTextureEmissive)o.enable(20);if(_.alphaToCoverage)o.enable(21);y.push(o.mask)}function S(y){let _=g[y.type],A;if(_){let F=tn[_];A=Ut.clone(F.uniforms)}else A=y.uniforms;return A}function R(y,_){let A;for(let F=0,q=d.length;F<q;F++){let B=d[F];if(B.cacheKey===_){A=B,++A.usedTimes;break}}if(A===void 0)A=new rA(e,_,y,s),d.push(A);return A}function T(y){if(--y.usedTimes===0){let _=d.indexOf(y);d[_]=d[d.length-1],d.pop(),y.destroy()}}function E(y){l.remove(y)}function D(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:S,acquireProgram:R,releaseProgram:T,releaseShaderCache:E,programs:d,dispose:D}}function oA(){let e=new WeakMap;function t(a){return e.has(a)}function n(a){let o=e.get(a);if(o===void 0)o={},e.set(a,o);return o}function i(a){e.delete(a)}function r(a,o,l){e.get(a)[o]=l}function s(){e=new WeakMap}return{has:t,get:n,remove:i,update:r,dispose:s}}function lA(e,t){if(e.groupOrder!==t.groupOrder)return e.groupOrder-t.groupOrder;else if(e.renderOrder!==t.renderOrder)return e.renderOrder-t.renderOrder;else if(e.material.id!==t.material.id)return e.material.id-t.material.id;else if(e.z!==t.z)return e.z-t.z;else return e.id-t.id}function U0(e,t){if(e.groupOrder!==t.groupOrder)return e.groupOrder-t.groupOrder;else if(e.renderOrder!==t.renderOrder)return e.renderOrder-t.renderOrder;else if(e.z!==t.z)return t.z-e.z;else return e.id-t.id}function F0(){let e=[],t=0,n=[],i=[],r=[];function s(){t=0,n.length=0,i.length=0,r.length=0}function a(h,u,p,g,x,m){let f=e[t];if(f===void 0)f={id:h.id,object:h,geometry:u,material:p,groupOrder:g,renderOrder:h.renderOrder,z:x,group:m},e[t]=f;else f.id=h.id,f.object=h,f.geometry=u,f.material=p,f.groupOrder=g,f.renderOrder=h.renderOrder,f.z=x,f.group=m;return t++,f}function o(h,u,p,g,x,m){let f=a(h,u,p,g,x,m);if(p.transmission>0)i.push(f);else if(p.transparent===!0)r.push(f);else n.push(f)}function l(h,u,p,g,x,m){let f=a(h,u,p,g,x,m);if(p.transmission>0)i.unshift(f);else if(p.transparent===!0)r.unshift(f);else n.unshift(f)}function c(h,u){if(n.length>1)n.sort(h||lA);if(i.length>1)i.sort(u||U0);if(r.length>1)r.sort(u||U0)}function d(){for(let h=t,u=e.length;h<u;h++){let p=e[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:d,sort:c}}function cA(){let e=new WeakMap;function t(i,r){let s=e.get(i),a;if(s===void 0)a=new F0,e.set(i,[a]);else if(r>=s.length)a=new F0,s.push(a);else a=s[r];return a}function n(){e=new WeakMap}return{get:t,dispose:n}}function dA(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new P,color:new Ne};break;case"SpotLight":n={position:new P,direction:new P,color:new Ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new P,color:new Ne,distance:0,decay:0};break;case"HemisphereLight":n={direction:new P,skyColor:new Ne,groundColor:new Ne};break;case"RectAreaLight":n={color:new Ne,position:new P,halfWidth:new P,halfHeight:new P};break}return e[t.id]=n,n}}}function hA(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re,shadowCameraNear:1,shadowCameraFar:1000};break}return e[t.id]=n,n}}}var uA=0;function fA(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function pA(e){let t=new dA,n=hA(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new P);let r=new P,s=new et,a=new et;function o(c){let d=0,h=0,u=0;for(let y=0;y<9;y++)i.probe[y].set(0,0,0);let p=0,g=0,x=0,m=0,f=0,w=0,v=0,S=0,R=0,T=0,E=0;c.sort(fA);for(let y=0,_=c.length;y<_;y++){let A=c[y],{color:F,intensity:q,distance:B}=A,ee=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)d+=F.r*q,h+=F.g*q,u+=F.b*q;else if(A.isLightProbe){for(let j=0;j<9;j++)i.probe[j].addScaledVector(A.sh.coefficients[j],q);E++}else if(A.isDirectionalLight){let j=t.get(A);if(j.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){let ae=A.shadow,W=n.get(A);W.shadowIntensity=ae.intensity,W.shadowBias=ae.bias,W.shadowNormalBias=ae.normalBias,W.shadowRadius=ae.radius,W.shadowMapSize=ae.mapSize,i.directionalShadow[p]=W,i.directionalShadowMap[p]=ee,i.directionalShadowMatrix[p]=A.shadow.matrix,w++}i.directional[p]=j,p++}else if(A.isSpotLight){let j=t.get(A);j.position.setFromMatrixPosition(A.matrixWorld),j.color.copy(F).multiplyScalar(q),j.distance=B,j.coneCos=Math.cos(A.angle),j.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),j.decay=A.decay,i.spot[x]=j;let ae=A.shadow;if(A.map){if(i.spotLightMap[R]=A.map,R++,ae.updateMatrices(A),A.castShadow)T++}if(i.spotLightMatrix[x]=ae.matrix,A.castShadow){let W=n.get(A);W.shadowIntensity=ae.intensity,W.shadowBias=ae.bias,W.shadowNormalBias=ae.normalBias,W.shadowRadius=ae.radius,W.shadowMapSize=ae.mapSize,i.spotShadow[x]=W,i.spotShadowMap[x]=ee,S++}x++}else if(A.isRectAreaLight){let j=t.get(A);j.color.copy(F).multiplyScalar(q),j.halfWidth.set(A.width*0.5,0,0),j.halfHeight.set(0,A.height*0.5,0),i.rectArea[m]=j,m++}else if(A.isPointLight){let j=t.get(A);if(j.color.copy(A.color).multiplyScalar(A.intensity),j.distance=A.distance,j.decay=A.decay,A.castShadow){let ae=A.shadow,W=n.get(A);W.shadowIntensity=ae.intensity,W.shadowBias=ae.bias,W.shadowNormalBias=ae.normalBias,W.shadowRadius=ae.radius,W.shadowMapSize=ae.mapSize,W.shadowCameraNear=ae.camera.near,W.shadowCameraFar=ae.camera.far,i.pointShadow[g]=W,i.pointShadowMap[g]=ee,i.pointShadowMatrix[g]=A.shadow.matrix,v++}i.point[g]=j,g++}else if(A.isHemisphereLight){let j=t.get(A);j.skyColor.copy(A.color).multiplyScalar(q),j.groundColor.copy(A.groundColor).multiplyScalar(q),i.hemi[f]=j,f++}}if(m>0)if(e.has("OES_texture_float_linear")===!0)i.rectAreaLTC1=be.LTC_FLOAT_1,i.rectAreaLTC2=be.LTC_FLOAT_2;else i.rectAreaLTC1=be.LTC_HALF_1,i.rectAreaLTC2=be.LTC_HALF_2;i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=u;let D=i.hash;if(D.directionalLength!==p||D.pointLength!==g||D.spotLength!==x||D.rectAreaLength!==m||D.hemiLength!==f||D.numDirectionalShadows!==w||D.numPointShadows!==v||D.numSpotShadows!==S||D.numSpotMaps!==R||D.numLightProbes!==E)i.directional.length=p,i.spot.length=x,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=S+R-T,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=E,D.directionalLength=p,D.pointLength=g,D.spotLength=x,D.rectAreaLength=m,D.hemiLength=f,D.numDirectionalShadows=w,D.numPointShadows=v,D.numSpotShadows=S,D.numSpotMaps=R,D.numLightProbes=E,i.version=uA++}function l(c,d){let h=0,u=0,p=0,g=0,x=0,m=d.matrixWorldInverse;for(let f=0,w=c.length;f<w;f++){let v=c[f];if(v.isDirectionalLight){let S=i.directional[h];S.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),h++}else if(v.isSpotLight){let S=i.spot[p];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),p++}else if(v.isRectAreaLight){let S=i.rectArea[g];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(m),a.identity(),s.copy(v.matrixWorld),s.premultiply(m),a.extractRotation(s),S.halfWidth.set(v.width*0.5,0,0),S.halfHeight.set(0,v.height*0.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),g++}else if(v.isPointLight){let S=i.point[u];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(m),u++}else if(v.isHemisphereLight){let S=i.hemi[x];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(m),x++}}}return{setup:o,setupView:l,state:i}}function O0(e){let t=new pA(e),n=[],i=[];function r(d){c.camera=d,n.length=0,i.length=0}function s(d){n.push(d)}function a(d){i.push(d)}function o(){t.setup(n)}function l(d){t.setupView(n,d)}let c={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function mA(e){let t=new WeakMap;function n(r,s=0){let a=t.get(r),o;if(a===void 0)o=new O0(e),t.set(r,[o]);else if(s>=a.length)o=new O0(e),a.push(o);else o=a[s];return o}function i(){t=new WeakMap}return{get:n,dispose:i}}var gA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function vA(e,t,n){let i=new sa,r=new re,s=new re,a=new it,o=new Ru({depthPacking:Xx}),l=new Pu,c={},d=n.maxTextureSize,h={[Xr]:Jt,[Jt]:Xr,[Qt]:Qt},u=new ot({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new re},radius:{value:4}},vertexShader:gA,fragmentShader:xA}),p=u.clone();p.defines.HORIZONTAL_PASS=1;let g=new Tt;g.setAttribute("position",new sn(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let x=new Ze(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rh;let f=this.type;this.render=function(T,E,D){if(m.enabled===!1)return;if(m.autoUpdate===!1&&m.needsUpdate===!1)return;if(T.length===0)return;let y=e.getRenderTarget(),_=e.getActiveCubeFace(),A=e.getActiveMipmapLevel(),F=e.state;if(F.setBlending(Rt),F.buffers.depth.getReversed()===!0)F.buffers.color.setClear(0,0,0,0);else F.buffers.color.setClear(1,1,1,1);F.buffers.depth.setTest(!0),F.setScissorTest(!1);let q=f!==$n&&this.type===$n,B=f===$n&&this.type!==$n;for(let ee=0,j=T.length;ee<j;ee++){let ae=T[ee],W=ae.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",ae,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;r.copy(W.mapSize);let me=W.getFrameExtents();if(r.multiply(me),s.copy(W.mapSize),r.x>d||r.y>d){if(r.x>d)s.x=Math.floor(d/me.x),r.x=s.x*me.x,W.mapSize.x=s.x;if(r.y>d)s.y=Math.floor(d/me.y),r.y=s.y*me.y,W.mapSize.y=s.y}if(W.map===null||q===!0||B===!0){let Ae=this.type!==$n?{minFilter:li,magFilter:li}:{};if(W.map!==null)W.map.dispose();W.map=new Et(r.x,r.y,Ae),W.map.texture.name=ae.name+".shadowMap",W.camera.updateProjectionMatrix()}e.setRenderTarget(W.map),e.clear();let fe=W.getViewportCount();for(let Ae=0;Ae<fe;Ae++){let Se=W.getViewport(Ae);a.set(s.x*Se.x,s.y*Se.y,s.x*Se.z,s.y*Se.w),F.viewport(a),W.updateMatrices(ae,Ae),i=W.getFrustum(),S(E,D,W.camera,ae,this.type)}if(W.isPointLightShadow!==!0&&this.type===$n)w(W,D);W.needsUpdate=!1}f=this.type,m.needsUpdate=!1,e.setRenderTarget(y,_,A)};function w(T,E){let D=t.update(x);if(u.defines.VSM_SAMPLES!==T.blurSamples)u.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0;if(T.mapPass===null)T.mapPass=new Et(r.x,r.y);u.uniforms.shadow_pass.value=T.map.texture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,e.setRenderTarget(T.mapPass),e.clear(),e.renderBufferDirect(E,null,D,u,x,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,e.setRenderTarget(T.map),e.clear(),e.renderBufferDirect(E,null,D,p,x,null)}function v(T,E,D,y){let _=null,A=D.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(A!==void 0)_=A;else if(_=D.isPointLight===!0?l:o,e.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){let F=_.uuid,q=E.uuid,B=c[F];if(B===void 0)B={},c[F]=B;let ee=B[q];if(ee===void 0)ee=_.clone(),B[q]=ee,E.addEventListener("dispose",R);_=ee}if(_.visible=E.visible,_.wireframe=E.wireframe,y===$n)_.side=E.shadowSide!==null?E.shadowSide:E.side;else _.side=E.shadowSide!==null?E.shadowSide:h[E.side];if(_.alphaMap=E.alphaMap,_.alphaTest=E.alphaToCoverage===!0?0.5:E.alphaTest,_.map=E.map,_.clipShadows=E.clipShadows,_.clippingPlanes=E.clippingPlanes,_.clipIntersection=E.clipIntersection,_.displacementMap=E.displacementMap,_.displacementScale=E.displacementScale,_.displacementBias=E.displacementBias,_.wireframeLinewidth=E.wireframeLinewidth,_.linewidth=E.linewidth,D.isPointLight===!0&&_.isMeshDistanceMaterial===!0){let F=e.properties.get(_);F.light=D}return _}function S(T,E,D,y,_){if(T.visible===!1)return;if(T.layers.test(E.layers)&&(T.isMesh||T.isLine||T.isPoints)){if((T.castShadow||T.receiveShadow&&_===$n)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,T.matrixWorld);let q=t.update(T),B=T.material;if(Array.isArray(B)){let ee=q.groups;for(let j=0,ae=ee.length;j<ae;j++){let W=ee[j],me=B[W.materialIndex];if(me&&me.visible){let fe=v(T,me,y,_);T.onBeforeShadow(e,T,E,D,q,fe,W),e.renderBufferDirect(D,null,q,fe,T,W),T.onAfterShadow(e,T,E,D,q,fe,W)}}}else if(B.visible){let ee=v(T,B,y,_);T.onBeforeShadow(e,T,E,D,q,ee,null),e.renderBufferDirect(D,null,q,ee,T,null),T.onAfterShadow(e,T,E,D,q,ee,null)}}}let F=T.children;for(let q=0,B=F.length;q<B;q++)S(F[q],E,D,y,_)}function R(T){T.target.removeEventListener("dispose",R);for(let D in c){let y=c[D],_=T.target.uuid;if(_ in y)y[_].dispose(),delete y[_]}}}var _A={[zo]:Ho,[Go]:$o,[Vo]:qo,[Zs]:Wo,[Ho]:zo,[$o]:Go,[qo]:Vo,[Wo]:Zs};function yA(e,t){function n(){let k=!1,we=new it,Me=null,De=new it(0,0,0,0);return{setMask:function(ge){if(Me!==ge&&!k)e.colorMask(ge,ge,ge,ge),Me=ge},setLocked:function(ge){k=ge},setClear:function(ge,ue,Oe,je,ut){if(ut===!0)ge*=je,ue*=je,Oe*=je;if(we.set(ge,ue,Oe,je),De.equals(we)===!1)e.clearColor(ge,ue,Oe,je),De.copy(we)},reset:function(){k=!1,Me=null,De.set(-1,0,0,0)}}}function i(){let k=!1,we=!1,Me=null,De=null,ge=null;return{setReversed:function(ue){if(we!==ue){let Oe=t.get("EXT_clip_control");if(ue)Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.ZERO_TO_ONE_EXT);else Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.NEGATIVE_ONE_TO_ONE_EXT);we=ue;let je=ge;ge=null,this.setClear(je)}},getReversed:function(){return we},setTest:function(ue){if(ue)pe(e.DEPTH_TEST);else L(e.DEPTH_TEST)},setMask:function(ue){if(Me!==ue&&!k)e.depthMask(ue),Me=ue},setFunc:function(ue){if(we)ue=_A[ue];if(De!==ue){switch(ue){case zo:e.depthFunc(e.NEVER);break;case Ho:e.depthFunc(e.ALWAYS);break;case Go:e.depthFunc(e.LESS);break;case Zs:e.depthFunc(e.LEQUAL);break;case Vo:e.depthFunc(e.EQUAL);break;case Wo:e.depthFunc(e.GEQUAL);break;case $o:e.depthFunc(e.GREATER);break;case qo:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}De=ue}},setLocked:function(ue){k=ue},setClear:function(ue){if(ge!==ue){if(we)ue=1-ue;e.clearDepth(ue),ge=ue}},reset:function(){k=!1,Me=null,De=null,ge=null,we=!1}}}function r(){let k=!1,we=null,Me=null,De=null,ge=null,ue=null,Oe=null,je=null,ut=null;return{setTest:function(lt){if(!k)if(lt)pe(e.STENCIL_TEST);else L(e.STENCIL_TEST)},setMask:function(lt){if(we!==lt&&!k)e.stencilMask(lt),we=lt},setFunc:function(lt,zn,Hn){if(Me!==lt||De!==zn||ge!==Hn)e.stencilFunc(lt,zn,Hn),Me=lt,De=zn,ge=Hn},setOp:function(lt,zn,Hn){if(ue!==lt||Oe!==zn||je!==Hn)e.stencilOp(lt,zn,Hn),ue=lt,Oe=zn,je=Hn},setLocked:function(lt){k=lt},setClear:function(lt){if(ut!==lt)e.clearStencil(lt),ut=lt},reset:function(){k=!1,we=null,Me=null,De=null,ge=null,ue=null,Oe=null,je=null,ut=null}}}let s=new n,a=new i,o=new r,l=new WeakMap,c=new WeakMap,d={},h={},u=new WeakMap,p=[],g=null,x=!1,m=null,f=null,w=null,v=null,S=null,R=null,T=null,E=new Ne(0,0,0),D=0,y=!1,_=null,A=null,F=null,q=null,B=null,ee=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,ae=0,W=e.getParameter(e.VERSION);if(W.indexOf("WebGL")!==-1)ae=parseFloat(/^WebGL (\d)/.exec(W)[1]),j=ae>=1;else if(W.indexOf("OpenGL ES")!==-1)ae=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),j=ae>=2;let me=null,fe={},Ae=e.getParameter(e.SCISSOR_BOX),Se=e.getParameter(e.VIEWPORT),N=new it().fromArray(Ae),ne=new it().fromArray(Se);function Y(k,we,Me,De){let ge=new Uint8Array(4),ue=e.createTexture();e.bindTexture(k,ue),e.texParameteri(k,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(k,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let Oe=0;Oe<Me;Oe++)if(k===e.TEXTURE_3D||k===e.TEXTURE_2D_ARRAY)e.texImage3D(we,0,e.RGBA,1,1,De,0,e.RGBA,e.UNSIGNED_BYTE,ge);else e.texImage2D(we+Oe,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,ge);return ue}let le={};le[e.TEXTURE_2D]=Y(e.TEXTURE_2D,e.TEXTURE_2D,1),le[e.TEXTURE_CUBE_MAP]=Y(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[e.TEXTURE_2D_ARRAY]=Y(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),le[e.TEXTURE_3D]=Y(e.TEXTURE_3D,e.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),pe(e.DEPTH_TEST),a.setFunc(Zs),H(!1),he(Ch),pe(e.CULL_FACE),J(Rt);function pe(k){if(d[k]!==!0)e.enable(k),d[k]=!0}function L(k){if(d[k]!==!1)e.disable(k),d[k]=!1}function X(k,we){if(h[k]!==we){if(e.bindFramebuffer(k,we),h[k]=we,k===e.DRAW_FRAMEBUFFER)h[e.FRAMEBUFFER]=we;if(k===e.FRAMEBUFFER)h[e.DRAW_FRAMEBUFFER]=we;return!0}return!1}function ie(k,we){let Me=p,De=!1;if(k){if(Me=u.get(we),Me===void 0)Me=[],u.set(we,Me);let ge=k.textures;if(Me.length!==ge.length||Me[0]!==e.COLOR_ATTACHMENT0){for(let ue=0,Oe=ge.length;ue<Oe;ue++)Me[ue]=e.COLOR_ATTACHMENT0+ue;Me.length=ge.length,De=!0}}else if(Me[0]!==e.BACK)Me[0]=e.BACK,De=!0;if(De)e.drawBuffers(Me)}function Pe(k){if(g!==k)return e.useProgram(k),g=k,!0;return!1}let I={[Un]:e.FUNC_ADD,[xx]:e.FUNC_SUBTRACT,[vx]:e.FUNC_REVERSE_SUBTRACT};I[_x]=e.MIN,I[yx]=e.MAX;let oe={[Wi]:e.ZERO,[bx]:e.ONE,[Sx]:e.SRC_COLOR,[Mx]:e.SRC_ALPHA,[Cx]:e.SRC_ALPHA_SATURATE,[js]:e.DST_COLOR,[Ys]:e.DST_ALPHA,[wx]:e.ONE_MINUS_SRC_COLOR,[Ex]:e.ONE_MINUS_SRC_ALPHA,[Ax]:e.ONE_MINUS_DST_COLOR,[Tx]:e.ONE_MINUS_DST_ALPHA,[Rx]:e.CONSTANT_COLOR,[Px]:e.ONE_MINUS_CONSTANT_COLOR,[Ix]:e.CONSTANT_ALPHA,[Lx]:e.ONE_MINUS_CONSTANT_ALPHA};function J(k,we,Me,De,ge,ue,Oe,je,ut,lt){if(k===Rt){if(x===!0)L(e.BLEND),x=!1;return}if(x===!1)pe(e.BLEND),x=!0;if(k!==Bo){if(k!==m||lt!==y){if(f!==Un||S!==Un)e.blendEquation(e.FUNC_ADD),f=Un,S=Un;if(lt)switch(k){case qs:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Xs:e.blendFunc(e.ONE,e.ONE);break;case Ph:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Ih:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case qs:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Xs:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case Ph:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ih:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}w=null,v=null,R=null,T=null,E.set(0,0,0),D=0,m=k,y=lt}return}if(ge=ge||we,ue=ue||Me,Oe=Oe||De,we!==f||ge!==S)e.blendEquationSeparate(I[we],I[ge]),f=we,S=ge;if(Me!==w||De!==v||ue!==R||Oe!==T)e.blendFuncSeparate(oe[Me],oe[De],oe[ue],oe[Oe]),w=Me,v=De,R=ue,T=Oe;if(je.equals(E)===!1||ut!==D)e.blendColor(je.r,je.g,je.b,ut),E.copy(je),D=ut;m=k,y=!1}function U(k,we){k.side===Qt?L(e.CULL_FACE):pe(e.CULL_FACE);let Me=k.side===Jt;if(we)Me=!Me;H(Me),k.blending===qs&&k.transparent===!1?J(Rt):J(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),s.setMask(k.colorWrite);let De=k.stencilWrite;if(o.setTest(De),De)o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass);V(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?pe(e.SAMPLE_ALPHA_TO_COVERAGE):L(e.SAMPLE_ALPHA_TO_COVERAGE)}function H(k){if(_!==k){if(k)e.frontFace(e.CW);else e.frontFace(e.CCW);_=k}}function he(k){if(k!==mx){if(pe(e.CULL_FACE),k!==A)if(k===Ch)e.cullFace(e.BACK);else if(k===gx)e.cullFace(e.FRONT);else e.cullFace(e.FRONT_AND_BACK)}else L(e.CULL_FACE);A=k}function Z(k){if(k!==F){if(j)e.lineWidth(k);F=k}}function V(k,we,Me){if(k){if(pe(e.POLYGON_OFFSET_FILL),q!==we||B!==Me)e.polygonOffset(we,Me),q=we,B=Me}else L(e.POLYGON_OFFSET_FILL)}function ce(k){if(k)pe(e.SCISSOR_TEST);else L(e.SCISSOR_TEST)}function Le(k){if(k===void 0)k=e.TEXTURE0+ee-1;if(me!==k)e.activeTexture(k),me=k}function ze(k,we,Me){if(Me===void 0)if(me===null)Me=e.TEXTURE0+ee-1;else Me=me;let De=fe[Me];if(De===void 0)De={type:void 0,texture:void 0},fe[Me]=De;if(De.type!==k||De.texture!==we){if(me!==Me)e.activeTexture(Me),me=Me;e.bindTexture(k,we||le[k]),De.type=k,De.texture=we}}function C(){let k=fe[me];if(k!==void 0&&k.type!==void 0)e.bindTexture(k.type,null),k.type=void 0,k.texture=void 0}function b(){try{e.compressedTexImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function O(){try{e.compressedTexImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function se(){try{e.texSubImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function de(){try{e.texSubImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function te(){try{e.compressedTexSubImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ye(){try{e.compressedTexSubImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function _e(){try{e.texStorage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ie(){try{e.texStorage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ge(){try{e.texImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function xe(){try{e.texImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Te(k){if(N.equals(k)===!1)e.scissor(k.x,k.y,k.z,k.w),N.copy(k)}function Be(k){if(ne.equals(k)===!1)e.viewport(k.x,k.y,k.z,k.w),ne.copy(k)}function Ue(k,we){let Me=c.get(we);if(Me===void 0)Me=new WeakMap,c.set(we,Me);let De=Me.get(k);if(De===void 0)De=e.getUniformBlockIndex(we,k.name),Me.set(k,De)}function Ee(k,we){let De=c.get(we).get(k);if(l.get(we)!==De)e.uniformBlockBinding(we,De,k.__bindingPointIndex),l.set(we,De)}function Ye(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),a.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),d={},me=null,fe={},h={},u=new WeakMap,p=[],g=null,x=!1,m=null,f=null,w=null,v=null,S=null,R=null,T=null,E=new Ne(0,0,0),D=0,y=!1,_=null,A=null,F=null,q=null,B=null,N.set(0,0,e.canvas.width,e.canvas.height),ne.set(0,0,e.canvas.width,e.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:pe,disable:L,bindFramebuffer:X,drawBuffers:ie,useProgram:Pe,setBlending:J,setMaterial:U,setFlipSided:H,setCullFace:he,setLineWidth:Z,setPolygonOffset:V,setScissorTest:ce,activeTexture:Le,bindTexture:ze,unbindTexture:C,compressedTexImage2D:b,compressedTexImage3D:O,texImage2D:Ge,texImage3D:xe,updateUBOMapping:Ue,uniformBlockBinding:Ee,texStorage2D:_e,texStorage3D:Ie,texSubImage2D:se,texSubImage3D:de,compressedTexSubImage2D:te,compressedTexSubImage3D:ye,scissor:Te,viewport:Be,reset:Ye}}function bA(e,t,n,i,r,s,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new re,d=new WeakMap,h,u=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(C){}function g(C,b){return p?new OffscreenCanvas(C,b):Gs("canvas")}function x(C,b,O){let se=1,de=ze(C);if(de.width>O||de.height>O)se=O/Math.max(de.width,de.height);if(se<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let te=Math.floor(se*de.width),ye=Math.floor(se*de.height);if(h===void 0)h=g(te,ye);let _e=b?g(te,ye):h;return _e.width=te,_e.height=ye,_e.getContext("2d").drawImage(C,0,0,te,ye),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+de.width+"x"+de.height+") to ("+te+"x"+ye+")."),_e}else{if("data"in C)console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+de.width+"x"+de.height+").");return C}return C}function m(C){return C.generateMipmaps}function f(C){e.generateMipmap(C)}function w(C){if(C.isWebGLCubeRenderTarget)return e.TEXTURE_CUBE_MAP;if(C.isWebGL3DRenderTarget)return e.TEXTURE_3D;if(C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture)return e.TEXTURE_2D_ARRAY;return e.TEXTURE_2D}function v(C,b,O,se,de=!1){if(C!==null){if(e[C]!==void 0)return e[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let te=b;if(b===e.RED){if(O===e.FLOAT)te=e.R32F;if(O===e.HALF_FLOAT)te=e.R16F;if(O===e.UNSIGNED_BYTE)te=e.R8}if(b===e.RED_INTEGER){if(O===e.UNSIGNED_BYTE)te=e.R8UI;if(O===e.UNSIGNED_SHORT)te=e.R16UI;if(O===e.UNSIGNED_INT)te=e.R32UI;if(O===e.BYTE)te=e.R8I;if(O===e.SHORT)te=e.R16I;if(O===e.INT)te=e.R32I}if(b===e.RG){if(O===e.FLOAT)te=e.RG32F;if(O===e.HALF_FLOAT)te=e.RG16F;if(O===e.UNSIGNED_BYTE)te=e.RG8}if(b===e.RG_INTEGER){if(O===e.UNSIGNED_BYTE)te=e.RG8UI;if(O===e.UNSIGNED_SHORT)te=e.RG16UI;if(O===e.UNSIGNED_INT)te=e.RG32UI;if(O===e.BYTE)te=e.RG8I;if(O===e.SHORT)te=e.RG16I;if(O===e.INT)te=e.RG32I}if(b===e.RGB_INTEGER){if(O===e.UNSIGNED_BYTE)te=e.RGB8UI;if(O===e.UNSIGNED_SHORT)te=e.RGB16UI;if(O===e.UNSIGNED_INT)te=e.RGB32UI;if(O===e.BYTE)te=e.RGB8I;if(O===e.SHORT)te=e.RGB16I;if(O===e.INT)te=e.RGB32I}if(b===e.RGBA_INTEGER){if(O===e.UNSIGNED_BYTE)te=e.RGBA8UI;if(O===e.UNSIGNED_SHORT)te=e.RGBA16UI;if(O===e.UNSIGNED_INT)te=e.RGBA32UI;if(O===e.BYTE)te=e.RGBA8I;if(O===e.SHORT)te=e.RGBA16I;if(O===e.INT)te=e.RGBA32I}if(b===e.RGB){if(O===e.UNSIGNED_INT_5_9_9_9_REV)te=e.RGB9_E5;if(O===e.UNSIGNED_INT_10F_11F_11F_REV)te=e.R11F_G11F_B10F}if(b===e.RGBA){let ye=de?uu:nt.getTransfer(se);if(O===e.FLOAT)te=e.RGBA32F;if(O===e.HALF_FLOAT)te=e.RGBA16F;if(O===e.UNSIGNED_BYTE)te=ye===dt?e.SRGB8_ALPHA8:e.RGBA8;if(O===e.UNSIGNED_SHORT_4_4_4_4)te=e.RGBA4;if(O===e.UNSIGNED_SHORT_5_5_5_1)te=e.RGB5_A1}if(te===e.R16F||te===e.R32F||te===e.RG16F||te===e.RG32F||te===e.RGBA16F||te===e.RGBA32F)t.get("EXT_color_buffer_float");return te}function S(C,b){let O;if(C){if(b===null||b===Zr||b===Ci)O=e.DEPTH24_STENCIL8;else if(b===Ai)O=e.DEPTH32F_STENCIL8;else if(b===Qs)O=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(b===null||b===Zr||b===Ci)O=e.DEPTH_COMPONENT24;else if(b===Ai)O=e.DEPTH_COMPONENT32F;else if(b===Qs)O=e.DEPTH_COMPONENT16;return O}function R(C,b){if(m(C)===!0||C.isFramebufferTexture&&C.minFilter!==li&&C.minFilter!==ci)return Math.log2(Math.max(b.width,b.height))+1;else if(C.mipmaps!==void 0&&C.mipmaps.length>0)return C.mipmaps.length;else if(C.isCompressedTexture&&Array.isArray(C.image))return b.mipmaps.length;else return 1}function T(C){let b=C.target;if(b.removeEventListener("dispose",T),D(b),b.isVideoTexture)d.delete(b)}function E(C){let b=C.target;b.removeEventListener("dispose",E),_(b)}function D(C){let b=i.get(C);if(b.__webglInit===void 0)return;let O=C.source,se=u.get(O);if(se){let de=se[b.__cacheKey];if(de.usedTimes--,de.usedTimes===0)y(C);if(Object.keys(se).length===0)u.delete(O)}i.remove(C)}function y(C){let b=i.get(C);e.deleteTexture(b.__webglTexture);let O=C.source,se=u.get(O);delete se[b.__cacheKey],a.memory.textures--}function _(C){let b=i.get(C);if(C.depthTexture)C.depthTexture.dispose(),i.remove(C.depthTexture);if(C.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(b.__webglFramebuffer[se]))for(let de=0;de<b.__webglFramebuffer[se].length;de++)e.deleteFramebuffer(b.__webglFramebuffer[se][de]);else e.deleteFramebuffer(b.__webglFramebuffer[se]);if(b.__webglDepthbuffer)e.deleteRenderbuffer(b.__webglDepthbuffer[se])}else{if(Array.isArray(b.__webglFramebuffer))for(let se=0;se<b.__webglFramebuffer.length;se++)e.deleteFramebuffer(b.__webglFramebuffer[se]);else e.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer)e.deleteRenderbuffer(b.__webglDepthbuffer);if(b.__webglMultisampledFramebuffer)e.deleteFramebuffer(b.__webglMultisampledFramebuffer);if(b.__webglColorRenderbuffer){for(let se=0;se<b.__webglColorRenderbuffer.length;se++)if(b.__webglColorRenderbuffer[se])e.deleteRenderbuffer(b.__webglColorRenderbuffer[se])}if(b.__webglDepthRenderbuffer)e.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let O=C.textures;for(let se=0,de=O.length;se<de;se++){let te=i.get(O[se]);if(te.__webglTexture)e.deleteTexture(te.__webglTexture),a.memory.textures--;i.remove(O[se])}i.remove(C)}let A=0;function F(){A=0}function q(){let C=A;if(C>=r.maxTextures)console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+r.maxTextures);return A+=1,C}function B(C){let b=[];return b.push(C.wrapS),b.push(C.wrapT),b.push(C.wrapR||0),b.push(C.magFilter),b.push(C.minFilter),b.push(C.anisotropy),b.push(C.internalFormat),b.push(C.format),b.push(C.type),b.push(C.generateMipmaps),b.push(C.premultiplyAlpha),b.push(C.flipY),b.push(C.unpackAlignment),b.push(C.colorSpace),b.join()}function ee(C,b){let O=i.get(C);if(C.isVideoTexture)ce(C);if(C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&O.__version!==C.version){let se=C.image;if(se===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{le(O,C,b);return}}else if(C.isExternalTexture)O.__webglTexture=C.sourceTexture?C.sourceTexture:null;n.bindTexture(e.TEXTURE_2D,O.__webglTexture,e.TEXTURE0+b)}function j(C,b){let O=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&O.__version!==C.version){le(O,C,b);return}n.bindTexture(e.TEXTURE_2D_ARRAY,O.__webglTexture,e.TEXTURE0+b)}function ae(C,b){let O=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&O.__version!==C.version){le(O,C,b);return}n.bindTexture(e.TEXTURE_3D,O.__webglTexture,e.TEXTURE0+b)}function W(C,b){let O=i.get(C);if(C.version>0&&O.__version!==C.version){pe(O,C,b);return}n.bindTexture(e.TEXTURE_CUBE_MAP,O.__webglTexture,e.TEXTURE0+b)}let me={[qn]:e.REPEAT,[Ux]:e.CLAMP_TO_EDGE,[Fx]:e.MIRRORED_REPEAT},fe={[li]:e.NEAREST,[Ox]:e.NEAREST_MIPMAP_NEAREST,[Js]:e.NEAREST_MIPMAP_LINEAR,[ci]:e.LINEAR,[tl]:e.LINEAR_MIPMAP_NEAREST,[Ti]:e.LINEAR_MIPMAP_LINEAR},Ae={[Zx]:e.NEVER,[n0]:e.ALWAYS,[Kx]:e.LESS,[fu]:e.LEQUAL,[Jx]:e.EQUAL,[t0]:e.GEQUAL,[Qx]:e.GREATER,[e0]:e.NOTEQUAL};function Se(C,b){if(b.type===Ai&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===ci||b.magFilter===tl||b.magFilter===Js||b.magFilter===Ti||b.minFilter===ci||b.minFilter===tl||b.minFilter===Js||b.minFilter===Ti))console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(e.texParameteri(C,e.TEXTURE_WRAP_S,me[b.wrapS]),e.texParameteri(C,e.TEXTURE_WRAP_T,me[b.wrapT]),C===e.TEXTURE_3D||C===e.TEXTURE_2D_ARRAY)e.texParameteri(C,e.TEXTURE_WRAP_R,me[b.wrapR]);if(e.texParameteri(C,e.TEXTURE_MAG_FILTER,fe[b.magFilter]),e.texParameteri(C,e.TEXTURE_MIN_FILTER,fe[b.minFilter]),b.compareFunction)e.texParameteri(C,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(C,e.TEXTURE_COMPARE_FUNC,Ae[b.compareFunction]);if(t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===li)return;if(b.minFilter!==Js&&b.minFilter!==Ti)return;if(b.type===Ai&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){let O=t.get("EXT_texture_filter_anisotropic");e.texParameterf(C,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,r.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function N(C,b){let O=!1;if(C.__webglInit===void 0)C.__webglInit=!0,b.addEventListener("dispose",T);let se=b.source,de=u.get(se);if(de===void 0)de={},u.set(se,de);let te=B(b);if(te!==C.__cacheKey){if(de[te]===void 0)de[te]={texture:e.createTexture(),usedTimes:0},a.memory.textures++,O=!0;de[te].usedTimes++;let ye=de[C.__cacheKey];if(ye!==void 0){if(de[C.__cacheKey].usedTimes--,ye.usedTimes===0)y(b)}C.__cacheKey=te,C.__webglTexture=de[te].texture}return O}function ne(C,b,O){return Math.floor(Math.floor(C/O)/b)}function Y(C,b,O,se){let te=C.updateRanges;if(te.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,b.width,b.height,O,se,b.data);else{te.sort((xe,Te)=>xe.start-Te.start);let ye=0;for(let xe=1;xe<te.length;xe++){let Te=te[ye],Be=te[xe],Ue=Te.start+Te.count,Ee=ne(Be.start,b.width,4),Ye=ne(Te.start,b.width,4);if(Be.start<=Ue+1&&Ee===Ye&&ne(Be.start+Be.count-1,b.width,4)===Ee)Te.count=Math.max(Te.count,Be.start+Be.count-Te.start);else++ye,te[ye]=Be}te.length=ye+1;let _e=e.getParameter(e.UNPACK_ROW_LENGTH),Ie=e.getParameter(e.UNPACK_SKIP_PIXELS),Ge=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,b.width);for(let xe=0,Te=te.length;xe<Te;xe++){let Be=te[xe],Ue=Math.floor(Be.start/4),Ee=Math.ceil(Be.count/4),Ye=Ue%b.width,k=Math.floor(Ue/b.width),we=Ee,Me=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,Ye),e.pixelStorei(e.UNPACK_SKIP_ROWS,k),n.texSubImage2D(e.TEXTURE_2D,0,Ye,k,we,1,O,se,b.data)}C.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,_e),e.pixelStorei(e.UNPACK_SKIP_PIXELS,Ie),e.pixelStorei(e.UNPACK_SKIP_ROWS,Ge)}}function le(C,b,O){let se=e.TEXTURE_2D;if(b.isDataArrayTexture||b.isCompressedArrayTexture)se=e.TEXTURE_2D_ARRAY;if(b.isData3DTexture)se=e.TEXTURE_3D;let de=N(C,b),te=b.source;n.bindTexture(se,C.__webglTexture,e.TEXTURE0+O);let ye=i.get(te);if(te.version!==ye.__version||de===!0){n.activeTexture(e.TEXTURE0+O);let _e=nt.getPrimaries(nt.workingColorSpace),Ie=b.colorSpace===Xi?null:nt.getPrimaries(b.colorSpace),Ge=b.colorSpace===Xi||_e===Ie?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,b.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ge);let xe=x(b.image,!1,r.maxTextureSize);xe=Le(b,xe);let Te=s.convert(b.format,b.colorSpace),Be=s.convert(b.type),Ue=v(b.internalFormat,Te,Be,b.colorSpace,b.isVideoTexture);Se(se,b);let Ee,Ye=b.mipmaps,k=b.isVideoTexture!==!0,we=ye.__version===void 0||de===!0,Me=te.dataReady,De=R(b,xe);if(b.isDepthTexture){if(Ue=S(b.format===qi,b.type),we)if(k)n.texStorage2D(e.TEXTURE_2D,1,Ue,xe.width,xe.height);else n.texImage2D(e.TEXTURE_2D,0,Ue,xe.width,xe.height,0,Te,Be,null)}else if(b.isDataTexture)if(Ye.length>0){if(k&&we)n.texStorage2D(e.TEXTURE_2D,De,Ue,Ye[0].width,Ye[0].height);for(let ge=0,ue=Ye.length;ge<ue;ge++)if(Ee=Ye[ge],k){if(Me)n.texSubImage2D(e.TEXTURE_2D,ge,0,0,Ee.width,Ee.height,Te,Be,Ee.data)}else n.texImage2D(e.TEXTURE_2D,ge,Ue,Ee.width,Ee.height,0,Te,Be,Ee.data);b.generateMipmaps=!1}else if(k){if(we)n.texStorage2D(e.TEXTURE_2D,De,Ue,xe.width,xe.height);if(Me)Y(b,xe,Te,Be)}else n.texImage2D(e.TEXTURE_2D,0,Ue,xe.width,xe.height,0,Te,Be,xe.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){if(k&&we)n.texStorage3D(e.TEXTURE_2D_ARRAY,De,Ue,Ye[0].width,Ye[0].height,xe.depth);for(let ge=0,ue=Ye.length;ge<ue;ge++)if(Ee=Ye[ge],b.format!==An)if(Te!==null)if(k){if(Me)if(b.layerUpdates.size>0){let Oe=Wu(Ee.width,Ee.height,b.format,b.type);for(let je of b.layerUpdates){let ut=Ee.data.subarray(je*Oe/Ee.data.BYTES_PER_ELEMENT,(je+1)*Oe/Ee.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,ge,0,0,je,Ee.width,Ee.height,1,Te,ut)}b.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,ge,0,0,0,Ee.width,Ee.height,xe.depth,Te,Ee.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,ge,Ue,Ee.width,Ee.height,xe.depth,0,Ee.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(k){if(Me)n.texSubImage3D(e.TEXTURE_2D_ARRAY,ge,0,0,0,Ee.width,Ee.height,xe.depth,Te,Be,Ee.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,ge,Ue,Ee.width,Ee.height,xe.depth,0,Te,Be,Ee.data)}else{if(k&&we)n.texStorage2D(e.TEXTURE_2D,De,Ue,Ye[0].width,Ye[0].height);for(let ge=0,ue=Ye.length;ge<ue;ge++)if(Ee=Ye[ge],b.format!==An)if(Te!==null)if(k){if(Me)n.compressedTexSubImage2D(e.TEXTURE_2D,ge,0,0,Ee.width,Ee.height,Te,Ee.data)}else n.compressedTexImage2D(e.TEXTURE_2D,ge,Ue,Ee.width,Ee.height,0,Ee.data);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(k){if(Me)n.texSubImage2D(e.TEXTURE_2D,ge,0,0,Ee.width,Ee.height,Te,Be,Ee.data)}else n.texImage2D(e.TEXTURE_2D,ge,Ue,Ee.width,Ee.height,0,Te,Be,Ee.data)}else if(b.isDataArrayTexture)if(k){if(we)n.texStorage3D(e.TEXTURE_2D_ARRAY,De,Ue,xe.width,xe.height,xe.depth);if(Me)if(b.layerUpdates.size>0){let ge=Wu(xe.width,xe.height,b.format,b.type);for(let ue of b.layerUpdates){let Oe=xe.data.subarray(ue*ge/xe.data.BYTES_PER_ELEMENT,(ue+1)*ge/xe.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,ue,xe.width,xe.height,1,Te,Be,Oe)}b.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,xe.width,xe.height,xe.depth,Te,Be,xe.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,Ue,xe.width,xe.height,xe.depth,0,Te,Be,xe.data);else if(b.isData3DTexture)if(k){if(we)n.texStorage3D(e.TEXTURE_3D,De,Ue,xe.width,xe.height,xe.depth);if(Me)n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,xe.width,xe.height,xe.depth,Te,Be,xe.data)}else n.texImage3D(e.TEXTURE_3D,0,Ue,xe.width,xe.height,xe.depth,0,Te,Be,xe.data);else if(b.isFramebufferTexture){if(we)if(k)n.texStorage2D(e.TEXTURE_2D,De,Ue,xe.width,xe.height);else{let ge=xe.width,ue=xe.height;for(let Oe=0;Oe<De;Oe++)n.texImage2D(e.TEXTURE_2D,Oe,Ue,ge,ue,0,Te,Be,null),ge>>=1,ue>>=1}}else if(Ye.length>0){if(k&&we){let ge=ze(Ye[0]);n.texStorage2D(e.TEXTURE_2D,De,Ue,ge.width,ge.height)}for(let ge=0,ue=Ye.length;ge<ue;ge++)if(Ee=Ye[ge],k){if(Me)n.texSubImage2D(e.TEXTURE_2D,ge,0,0,Te,Be,Ee)}else n.texImage2D(e.TEXTURE_2D,ge,Ue,Te,Be,Ee);b.generateMipmaps=!1}else if(k){if(we){let ge=ze(xe);n.texStorage2D(e.TEXTURE_2D,De,Ue,ge.width,ge.height)}if(Me)n.texSubImage2D(e.TEXTURE_2D,0,0,0,Te,Be,xe)}else n.texImage2D(e.TEXTURE_2D,0,Ue,Te,Be,xe);if(m(b))f(se);if(ye.__version=te.version,b.onUpdate)b.onUpdate(b)}C.__version=b.version}function pe(C,b,O){if(b.image.length!==6)return;let se=N(C,b),de=b.source;n.bindTexture(e.TEXTURE_CUBE_MAP,C.__webglTexture,e.TEXTURE0+O);let te=i.get(de);if(de.version!==te.__version||se===!0){n.activeTexture(e.TEXTURE0+O);let ye=nt.getPrimaries(nt.workingColorSpace),_e=b.colorSpace===Xi?null:nt.getPrimaries(b.colorSpace),Ie=b.colorSpace===Xi||ye===_e?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,b.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);let Ge=b.isCompressedTexture||b.image[0].isCompressedTexture,xe=b.image[0]&&b.image[0].isDataTexture,Te=[];for(let ue=0;ue<6;ue++){if(!Ge&&!xe)Te[ue]=x(b.image[ue],!0,r.maxCubemapSize);else Te[ue]=xe?b.image[ue].image:b.image[ue];Te[ue]=Le(b,Te[ue])}let Be=Te[0],Ue=s.convert(b.format,b.colorSpace),Ee=s.convert(b.type),Ye=v(b.internalFormat,Ue,Ee,b.colorSpace),k=b.isVideoTexture!==!0,we=te.__version===void 0||se===!0,Me=de.dataReady,De=R(b,Be);Se(e.TEXTURE_CUBE_MAP,b);let ge;if(Ge){if(k&&we)n.texStorage2D(e.TEXTURE_CUBE_MAP,De,Ye,Be.width,Be.height);for(let ue=0;ue<6;ue++){ge=Te[ue].mipmaps;for(let Oe=0;Oe<ge.length;Oe++){let je=ge[Oe];if(b.format!==An)if(Ue!==null)if(k){if(Me)n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Oe,0,0,je.width,je.height,Ue,je.data)}else n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Oe,Ye,je.width,je.height,0,je.data);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(k){if(Me)n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Oe,0,0,je.width,je.height,Ue,Ee,je.data)}else n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Oe,Ye,je.width,je.height,0,Ue,Ee,je.data)}}}else{if(ge=b.mipmaps,k&&we){if(ge.length>0)De++;let ue=ze(Te[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,De,Ye,ue.width,ue.height)}for(let ue=0;ue<6;ue++)if(xe){if(k){if(Me)n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,Te[ue].width,Te[ue].height,Ue,Ee,Te[ue].data)}else n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,Ye,Te[ue].width,Te[ue].height,0,Ue,Ee,Te[ue].data);for(let Oe=0;Oe<ge.length;Oe++){let ut=ge[Oe].image[ue].image;if(k){if(Me)n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Oe+1,0,0,ut.width,ut.height,Ue,Ee,ut.data)}else n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Oe+1,Ye,ut.width,ut.height,0,Ue,Ee,ut.data)}}else{if(k){if(Me)n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,Ue,Ee,Te[ue])}else n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,Ye,Ue,Ee,Te[ue]);for(let Oe=0;Oe<ge.length;Oe++){let je=ge[Oe];if(k){if(Me)n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Oe+1,0,0,Ue,Ee,je.image[ue])}else n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Oe+1,Ye,Ue,Ee,je.image[ue])}}}if(m(b))f(e.TEXTURE_CUBE_MAP);if(te.__version=de.version,b.onUpdate)b.onUpdate(b)}C.__version=b.version}function L(C,b,O,se,de,te){let ye=s.convert(O.format,O.colorSpace),_e=s.convert(O.type),Ie=v(O.internalFormat,ye,_e,O.colorSpace),Ge=i.get(b),xe=i.get(O);if(xe.__renderTarget=b,!Ge.__hasExternalTextures){let Te=Math.max(1,b.width>>te),Be=Math.max(1,b.height>>te);if(de===e.TEXTURE_3D||de===e.TEXTURE_2D_ARRAY)n.texImage3D(de,te,Ie,Te,Be,b.depth,0,ye,_e,null);else n.texImage2D(de,te,Ie,Te,Be,0,ye,_e,null)}if(n.bindFramebuffer(e.FRAMEBUFFER,C),V(b))o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,se,de,xe.__webglTexture,0,Z(b));else if(de===e.TEXTURE_2D||de>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&de<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)e.framebufferTexture2D(e.FRAMEBUFFER,se,de,xe.__webglTexture,te);n.bindFramebuffer(e.FRAMEBUFFER,null)}function X(C,b,O){if(e.bindRenderbuffer(e.RENDERBUFFER,C),b.depthBuffer){let se=b.depthTexture,de=se&&se.isDepthTexture?se.type:null,te=S(b.stencilBuffer,de),ye=b.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,_e=Z(b);if(V(b))o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,_e,te,b.width,b.height);else if(O)e.renderbufferStorageMultisample(e.RENDERBUFFER,_e,te,b.width,b.height);else e.renderbufferStorage(e.RENDERBUFFER,te,b.width,b.height);e.framebufferRenderbuffer(e.FRAMEBUFFER,ye,e.RENDERBUFFER,C)}else{let se=b.textures;for(let de=0;de<se.length;de++){let te=se[de],ye=s.convert(te.format,te.colorSpace),_e=s.convert(te.type),Ie=v(te.internalFormat,ye,_e,te.colorSpace),Ge=Z(b);if(O&&V(b)===!1)e.renderbufferStorageMultisample(e.RENDERBUFFER,Ge,Ie,b.width,b.height);else if(V(b))o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ge,Ie,b.width,b.height);else e.renderbufferStorage(e.RENDERBUFFER,Ie,b.width,b.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function ie(C,b){if(b&&b.isWebGLCubeRenderTarget)throw Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(e.FRAMEBUFFER,C),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let se=i.get(b.depthTexture);if(se.__renderTarget=b,!se.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0;ee(b.depthTexture,0);let de=se.__webglTexture,te=Z(b);if(b.depthTexture.format===nl)if(V(b))o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,de,0,te);else e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,de,0);else if(b.depthTexture.format===qi)if(V(b))o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,de,0,te);else e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,de,0);else throw Error("Unknown depthTexture format")}function Pe(C){let b=i.get(C),O=C.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==C.depthTexture){let se=C.depthTexture;if(b.__depthDisposeCallback)b.__depthDisposeCallback();if(se){let de=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,se.removeEventListener("dispose",de)};se.addEventListener("dispose",de),b.__depthDisposeCallback=de}b.__boundDepthTexture=se}if(C.depthTexture&&!b.__autoAllocateDepthBuffer){if(O)throw Error("target.depthTexture not supported in Cube render targets");let se=C.texture.mipmaps;if(se&&se.length>0)ie(b.__webglFramebuffer[0],C);else ie(b.__webglFramebuffer,C)}else if(O){b.__webglDepthbuffer=[];for(let se=0;se<6;se++)if(n.bindFramebuffer(e.FRAMEBUFFER,b.__webglFramebuffer[se]),b.__webglDepthbuffer[se]===void 0)b.__webglDepthbuffer[se]=e.createRenderbuffer(),X(b.__webglDepthbuffer[se],C,!1);else{let de=C.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,te=b.__webglDepthbuffer[se];e.bindRenderbuffer(e.RENDERBUFFER,te),e.framebufferRenderbuffer(e.FRAMEBUFFER,de,e.RENDERBUFFER,te)}}else{let se=C.texture.mipmaps;if(se&&se.length>0)n.bindFramebuffer(e.FRAMEBUFFER,b.__webglFramebuffer[0]);else n.bindFramebuffer(e.FRAMEBUFFER,b.__webglFramebuffer);if(b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=e.createRenderbuffer(),X(b.__webglDepthbuffer,C,!1);else{let de=C.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,te=b.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,te),e.framebufferRenderbuffer(e.FRAMEBUFFER,de,e.RENDERBUFFER,te)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function I(C,b,O){let se=i.get(C);if(b!==void 0)L(se.__webglFramebuffer,C,C.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0);if(O!==void 0)Pe(C)}function oe(C){let b=C.texture,O=i.get(C),se=i.get(b);C.addEventListener("dispose",E);let de=C.textures,te=C.isWebGLCubeRenderTarget===!0,ye=de.length>1;if(!ye){if(se.__webglTexture===void 0)se.__webglTexture=e.createTexture();se.__version=b.version,a.memory.textures++}if(te){O.__webglFramebuffer=[];for(let _e=0;_e<6;_e++)if(b.mipmaps&&b.mipmaps.length>0){O.__webglFramebuffer[_e]=[];for(let Ie=0;Ie<b.mipmaps.length;Ie++)O.__webglFramebuffer[_e][Ie]=e.createFramebuffer()}else O.__webglFramebuffer[_e]=e.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){O.__webglFramebuffer=[];for(let _e=0;_e<b.mipmaps.length;_e++)O.__webglFramebuffer[_e]=e.createFramebuffer()}else O.__webglFramebuffer=e.createFramebuffer();if(ye)for(let _e=0,Ie=de.length;_e<Ie;_e++){let Ge=i.get(de[_e]);if(Ge.__webglTexture===void 0)Ge.__webglTexture=e.createTexture(),a.memory.textures++}if(C.samples>0&&V(C)===!1){O.__webglMultisampledFramebuffer=e.createFramebuffer(),O.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let _e=0;_e<de.length;_e++){let Ie=de[_e];O.__webglColorRenderbuffer[_e]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,O.__webglColorRenderbuffer[_e]);let Ge=s.convert(Ie.format,Ie.colorSpace),xe=s.convert(Ie.type),Te=v(Ie.internalFormat,Ge,xe,Ie.colorSpace,C.isXRRenderTarget===!0),Be=Z(C);e.renderbufferStorageMultisample(e.RENDERBUFFER,Be,Te,C.width,C.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+_e,e.RENDERBUFFER,O.__webglColorRenderbuffer[_e])}if(e.bindRenderbuffer(e.RENDERBUFFER,null),C.depthBuffer)O.__webglDepthRenderbuffer=e.createRenderbuffer(),X(O.__webglDepthRenderbuffer,C,!0);n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(te){n.bindTexture(e.TEXTURE_CUBE_MAP,se.__webglTexture),Se(e.TEXTURE_CUBE_MAP,b);for(let _e=0;_e<6;_e++)if(b.mipmaps&&b.mipmaps.length>0)for(let Ie=0;Ie<b.mipmaps.length;Ie++)L(O.__webglFramebuffer[_e][Ie],C,b,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ie);else L(O.__webglFramebuffer[_e],C,b,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0);if(m(b))f(e.TEXTURE_CUBE_MAP);n.unbindTexture()}else if(ye){for(let _e=0,Ie=de.length;_e<Ie;_e++){let Ge=de[_e],xe=i.get(Ge),Te=e.TEXTURE_2D;if(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)Te=C.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY;if(n.bindTexture(Te,xe.__webglTexture),Se(Te,Ge),L(O.__webglFramebuffer,C,Ge,e.COLOR_ATTACHMENT0+_e,Te,0),m(Ge))f(Te)}n.unbindTexture()}else{let _e=e.TEXTURE_2D;if(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)_e=C.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY;if(n.bindTexture(_e,se.__webglTexture),Se(_e,b),b.mipmaps&&b.mipmaps.length>0)for(let Ie=0;Ie<b.mipmaps.length;Ie++)L(O.__webglFramebuffer[Ie],C,b,e.COLOR_ATTACHMENT0,_e,Ie);else L(O.__webglFramebuffer,C,b,e.COLOR_ATTACHMENT0,_e,0);if(m(b))f(_e);n.unbindTexture()}if(C.depthBuffer)Pe(C)}function J(C){let b=C.textures;for(let O=0,se=b.length;O<se;O++){let de=b[O];if(m(de)){let te=w(C),ye=i.get(de).__webglTexture;n.bindTexture(te,ye),f(te),n.unbindTexture()}}}let U=[],H=[];function he(C){if(C.samples>0){if(V(C)===!1){let{textures:b,width:O,height:se}=C,de=e.COLOR_BUFFER_BIT,te=C.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ye=i.get(C),_e=b.length>1;if(_e)for(let Ge=0;Ge<b.length;Ge++)n.bindFramebuffer(e.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ge,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,ye.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ge,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer);let Ie=C.texture.mipmaps;if(Ie&&Ie.length>0)n.bindFramebuffer(e.DRAW_FRAMEBUFFER,ye.__webglFramebuffer[0]);else n.bindFramebuffer(e.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let Ge=0;Ge<b.length;Ge++){if(C.resolveDepthBuffer){if(C.depthBuffer)de|=e.DEPTH_BUFFER_BIT;if(C.stencilBuffer&&C.resolveStencilBuffer)de|=e.STENCIL_BUFFER_BIT}if(_e){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,ye.__webglColorRenderbuffer[Ge]);let xe=i.get(b[Ge]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,xe,0)}if(e.blitFramebuffer(0,0,O,se,0,0,O,se,de,e.NEAREST),l===!0){if(U.length=0,H.length=0,U.push(e.COLOR_ATTACHMENT0+Ge),C.depthBuffer&&C.resolveDepthBuffer===!1)U.push(te),H.push(te),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,H);e.invalidateFramebuffer(e.READ_FRAMEBUFFER,U)}}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),_e)for(let Ge=0;Ge<b.length;Ge++){n.bindFramebuffer(e.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ge,e.RENDERBUFFER,ye.__webglColorRenderbuffer[Ge]);let xe=i.get(b[Ge]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,ye.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ge,e.TEXTURE_2D,xe,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){let b=C.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[b])}}}function Z(C){return Math.min(r.maxSamples,C.samples)}function V(C){let b=i.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function ce(C){let b=a.render.frame;if(d.get(C)!==b)d.set(C,b),C.update()}function Le(C,b){let{colorSpace:O,format:se,type:de}=C;if(C.isCompressedTexture===!0||C.isVideoTexture===!0)return b;if(O!==ea&&O!==Xi)if(nt.getTransfer(O)===dt){if(se!==An||de!==Xn)console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else console.error("THREE.WebGLTextures: Unsupported texture color space:",O);return b}function ze(C){if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement)c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height;else if(typeof VideoFrame<"u"&&C instanceof VideoFrame)c.width=C.displayWidth,c.height=C.displayHeight;else c.width=C.width,c.height=C.height;return c}this.allocateTextureUnit=q,this.resetTextureUnits=F,this.setTexture2D=ee,this.setTexture2DArray=j,this.setTexture3D=ae,this.setTextureCube=W,this.rebindTextures=I,this.setupRenderTarget=oe,this.updateRenderTargetMipmap=J,this.updateMultisampleRenderTarget=he,this.setupDepthRenderbuffer=Pe,this.setupFrameBufferTexture=L,this.useMultisampledRTT=V}function SA(e,t){function n(i,r=Xi){let s,a=nt.getTransfer(r);if(i===Xn)return e.UNSIGNED_BYTE;if(i===Dh)return e.UNSIGNED_SHORT_4_4_4_4;if(i===kh)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Hx)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===Gx)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===Bx)return e.BYTE;if(i===zx)return e.SHORT;if(i===Qs)return e.UNSIGNED_SHORT;if(i===Lh)return e.INT;if(i===Zr)return e.UNSIGNED_INT;if(i===Ai)return e.FLOAT;if(i===Bt)return e.HALF_FLOAT;if(i===Vx)return e.ALPHA;if(i===Wx)return e.RGB;if(i===An)return e.RGBA;if(i===nl)return e.DEPTH_COMPONENT;if(i===qi)return e.DEPTH_STENCIL;if(i===$x)return e.RED;if(i===Nh)return e.RED_INTEGER;if(i===qx)return e.RG;if(i===Uh)return e.RG_INTEGER;if(i===Fh)return e.RGBA_INTEGER;if(i===il||i===rl||i===sl||i===al)if(a===dt)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===il)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===rl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===sl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===al)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===il)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===rl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===sl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===al)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Oh||i===Bh||i===zh||i===Hh)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Oh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Bh)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===zh)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Hh)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Gh||i===Vh||i===Wh)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Gh||i===Vh)return a===dt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Wh)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===$h||i===qh||i===Xh||i===Yh||i===jh||i===Zh||i===Kh||i===Jh||i===Qh||i===eu||i===tu||i===nu||i===iu||i===ru)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===$h)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===qh)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Xh)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Yh)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===jh)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Zh)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Kh)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Jh)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Qh)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===eu)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===tu)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===nu)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===iu)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ru)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===su||i===au||i===ou)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===su)return a===dt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===au)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ou)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===lu||i===cu||i===du||i===hu)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===lu)return s.COMPRESSED_RED_RGTC1_EXT;if(i===cu)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===du)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===hu)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(i===Ci)return e.UNSIGNED_INT_24_8;return e[i]!==void 0?e[i]:null}return{convert:n}}var wA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,MA=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class j0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new fl(e.texture);if(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)this.depthNear=e.depthNear,this.depthFar=e.depthFar;this.texture=n}}getMesh(e){if(this.texture!==null){if(this.mesh===null){let t=e.cameras[0].viewport,n=new ot({vertexShader:wA,fragmentShader:MA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ze(new hi(20,20),n)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Z0 extends di{constructor(e,t){super();let n=this,i=null,r=1,s=null,a="local-floor",o=1,l=null,c=null,d=null,h=null,u=null,p=null,g=typeof XRWebGLBinding<"u",x=new j0,m={},f=t.getContextAttributes(),w=null,v=null,S=[],R=[],T=new re,E=null,D=new qt;D.viewport=new it;let y=new qt;y.viewport=new it;let _=[D,y],A=new Hu,F=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let le=S[Y];if(le===void 0)le=new ia,S[Y]=le;return le.getTargetRaySpace()},this.getControllerGrip=function(Y){let le=S[Y];if(le===void 0)le=new ia,S[Y]=le;return le.getGripSpace()},this.getHand=function(Y){let le=S[Y];if(le===void 0)le=new ia,S[Y]=le;return le.getHandSpace()};function B(Y){let le=R.indexOf(Y.inputSource);if(le===-1)return;let pe=S[le];if(pe!==void 0)pe.update(Y.inputSource,Y.frame,l||s),pe.dispatchEvent({type:Y.type,data:Y.inputSource})}function ee(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",ee),i.removeEventListener("inputsourceschange",j);for(let Y=0;Y<S.length;Y++){let le=R[Y];if(le===null)continue;R[Y]=null,S[Y].disconnect(le)}F=null,q=null,x.reset();for(let Y in m)delete m[Y];e.setRenderTarget(w),u=null,h=null,d=null,i=null,v=null,ne.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){if(r=Y,n.isPresenting===!0)console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){if(a=Y,n.isPresenting===!0)console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||s},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return h!==null?h:u},this.getBinding=function(){if(d===null&&g)d=new XRWebGLBinding(i,t);return d},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(w=e.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",ee),i.addEventListener("inputsourceschange",j),f.xrCompatible!==!0)await t.makeXRCompatible();if(E=e.getPixelRatio(),e.getSize(T),!(g&&("createProjectionLayer"in XRWebGLBinding.prototype))){let pe={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:r};u=new XRWebGLLayer(i,t,pe),i.updateRenderState({baseLayer:u}),e.setPixelRatio(1),e.setSize(u.framebufferWidth,u.framebufferHeight,!1),v=new Et(u.framebufferWidth,u.framebufferHeight,{format:An,type:Xn,colorSpace:e.outputColorSpace,stencilBuffer:f.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let pe=null,L=null,X=null;if(f.depth)X=f.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=f.stencil?qi:nl,L=f.stencil?Ci:Zr;let ie={colorFormat:t.RGBA8,depthFormat:X,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(ie),i.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),v=new Et(h.textureWidth,h.textureHeight,{format:An,type:Xn,depthTexture:new Jr(h.textureWidth,h.textureHeight,L,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:f.stencil,colorSpace:e.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(o),l=null,s=await i.requestReferenceSpace(a),ne.setContext(i),ne.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function j(Y){for(let le=0;le<Y.removed.length;le++){let pe=Y.removed[le],L=R.indexOf(pe);if(L>=0)R[L]=null,S[L].disconnect(pe)}for(let le=0;le<Y.added.length;le++){let pe=Y.added[le],L=R.indexOf(pe);if(L===-1){for(let ie=0;ie<S.length;ie++)if(ie>=R.length){R.push(pe),L=ie;break}else if(R[ie]===null){R[ie]=pe,L=ie;break}if(L===-1)break}let X=S[L];if(X)X.connect(pe)}}let ae=new P,W=new P;function me(Y,le,pe){ae.setFromMatrixPosition(le.matrixWorld),W.setFromMatrixPosition(pe.matrixWorld);let L=ae.distanceTo(W),X=le.projectionMatrix.elements,ie=pe.projectionMatrix.elements,Pe=X[14]/(X[10]-1),I=X[14]/(X[10]+1),oe=(X[9]+1)/X[5],J=(X[9]-1)/X[5],U=(X[8]-1)/X[0],H=(ie[8]+1)/ie[0],he=Pe*U,Z=Pe*H,V=L/(-U+H),ce=V*-U;if(le.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(ce),Y.translateZ(V),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),X[10]===-1)Y.projectionMatrix.copy(le.projectionMatrix),Y.projectionMatrixInverse.copy(le.projectionMatrixInverse);else{let Le=Pe+V,ze=I+V,C=he-ce,b=Z+(L-ce),O=oe*I/ze*Le,se=J*I/ze*Le;Y.projectionMatrix.makePerspective(C,b,O,se,Le,ze),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function fe(Y,le){if(le===null)Y.matrixWorld.copy(Y.matrix);else Y.matrixWorld.multiplyMatrices(le.matrixWorld,Y.matrix);Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;let{near:le,far:pe}=Y;if(x.texture!==null){if(x.depthNear>0)le=x.depthNear;if(x.depthFar>0)pe=x.depthFar}if(A.near=y.near=D.near=le,A.far=y.far=D.far=pe,F!==A.near||q!==A.far)i.updateRenderState({depthNear:A.near,depthFar:A.far}),F=A.near,q=A.far;A.layers.mask=Y.layers.mask|6,D.layers.mask=A.layers.mask&3,y.layers.mask=A.layers.mask&5;let L=Y.parent,X=A.cameras;fe(A,L);for(let ie=0;ie<X.length;ie++)fe(X[ie],L);if(X.length===2)me(A,D,y);else A.projectionMatrix.copy(D.projectionMatrix);Ae(Y,A,L)};function Ae(Y,le,pe){if(pe===null)Y.matrix.copy(le.matrixWorld);else Y.matrix.copy(pe.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(le.matrixWorld);if(Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(le.projectionMatrix),Y.projectionMatrixInverse.copy(le.projectionMatrixInverse),Y.isPerspectiveCamera)Y.fov=Wr*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1}this.getCamera=function(){return A},this.getFoveation=function(){if(h===null&&u===null)return;return o},this.setFoveation=function(Y){if(o=Y,h!==null)h.fixedFoveation=Y;if(u!==null&&u.fixedFoveation!==void 0)u.fixedFoveation=Y},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(A)},this.getCameraTexture=function(Y){return m[Y]};let Se=null;function N(Y,le){if(c=le.getViewerPose(l||s),p=le,c!==null){let pe=c.views;if(u!==null)e.setRenderTargetFramebuffer(v,u.framebuffer),e.setRenderTarget(v);let L=!1;if(pe.length!==A.cameras.length)A.cameras.length=0,L=!0;for(let I=0;I<pe.length;I++){let oe=pe[I],J=null;if(u!==null)J=u.getViewport(oe);else{let H=d.getViewSubImage(h,oe);if(J=H.viewport,I===0)e.setRenderTargetTextures(v,H.colorTexture,H.depthStencilTexture),e.setRenderTarget(v)}let U=_[I];if(U===void 0)U=new qt,U.layers.enable(I),U.viewport=new it,_[I]=U;if(U.matrix.fromArray(oe.transform.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale),U.projectionMatrix.fromArray(oe.projectionMatrix),U.projectionMatrixInverse.copy(U.projectionMatrix).invert(),U.viewport.set(J.x,J.y,J.width,J.height),I===0)A.matrix.copy(U.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale);if(L===!0)A.cameras.push(U)}let X=i.enabledFeatures;if(X&&X.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&g){d=n.getBinding();let I=d.getDepthInformation(pe[0]);if(I&&I.isValid&&I.texture)x.init(I,i.renderState)}if(X&&X.includes("camera-access")&&g){e.state.unbindTexture(),d=n.getBinding();for(let I=0;I<pe.length;I++){let oe=pe[I].camera;if(oe){let J=m[oe];if(!J)J=new fl,m[oe]=J;let U=d.getCameraImage(oe);J.sourceTexture=U}}}}for(let pe=0;pe<S.length;pe++){let L=R[pe],X=S[pe];if(L!==null&&X!==void 0)X.update(L,le,l||s)}if(Se)Se(Y,le);if(le.detectedPlanes)n.dispatchEvent({type:"planesdetected",data:le});p=null}let ne=new B0;ne.setAnimationLoop(N),this.setAnimationLoop=function(Y){Se=Y},this.dispose=function(){}}}var lr=new Tn,EA=new et;function TA(e,t){function n(m,f){if(m.matrixAutoUpdate===!0)m.updateMatrix();f.value.copy(m.matrix)}function i(m,f){if(f.color.getRGB(m.fogColor.value,bu(e)),f.isFog)m.fogNear.value=f.near,m.fogFar.value=f.far;else if(f.isFogExp2)m.fogDensity.value=f.density}function r(m,f,w,v,S){if(f.isMeshBasicMaterial)s(m,f);else if(f.isMeshLambertMaterial)s(m,f);else if(f.isMeshToonMaterial)s(m,f),h(m,f);else if(f.isMeshPhongMaterial)s(m,f),d(m,f);else if(f.isMeshStandardMaterial){if(s(m,f),u(m,f),f.isMeshPhysicalMaterial)p(m,f,S)}else if(f.isMeshMatcapMaterial)s(m,f),g(m,f);else if(f.isMeshDepthMaterial)s(m,f);else if(f.isMeshDistanceMaterial)s(m,f),x(m,f);else if(f.isMeshNormalMaterial)s(m,f);else if(f.isLineBasicMaterial){if(a(m,f),f.isLineDashedMaterial)o(m,f)}else if(f.isPointsMaterial)l(m,f,w,v);else if(f.isSpriteMaterial)c(m,f);else if(f.isShadowMaterial)m.color.value.copy(f.color),m.opacity.value=f.opacity;else if(f.isShaderMaterial)f.uniformsNeedUpdate=!1}function s(m,f){if(m.opacity.value=f.opacity,f.color)m.diffuse.value.copy(f.color);if(f.emissive)m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity);if(f.map)m.map.value=f.map,n(f.map,m.mapTransform);if(f.alphaMap)m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform);if(f.bumpMap){if(m.bumpMap.value=f.bumpMap,n(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Jt)m.bumpScale.value*=-1}if(f.normalMap){if(m.normalMap.value=f.normalMap,n(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Jt)m.normalScale.value.negate()}if(f.displacementMap)m.displacementMap.value=f.displacementMap,n(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias;if(f.emissiveMap)m.emissiveMap.value=f.emissiveMap,n(f.emissiveMap,m.emissiveMapTransform);if(f.specularMap)m.specularMap.value=f.specularMap,n(f.specularMap,m.specularMapTransform);if(f.alphaTest>0)m.alphaTest.value=f.alphaTest;let w=t.get(f),{envMap:v,envMapRotation:S}=w;if(v){if(m.envMap.value=v,lr.copy(S),lr.x*=-1,lr.y*=-1,lr.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1)lr.y*=-1,lr.z*=-1;m.envMapRotation.value.setFromMatrix4(EA.makeRotationFromEuler(lr)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio}if(f.lightMap)m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,n(f.lightMap,m.lightMapTransform);if(f.aoMap)m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,n(f.aoMap,m.aoMapTransform)}function a(m,f){if(m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map)m.map.value=f.map,n(f.map,m.mapTransform)}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,w,v){if(m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*w,m.scale.value=v*0.5,f.map)m.map.value=f.map,n(f.map,m.uvTransform);if(f.alphaMap)m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform);if(f.alphaTest>0)m.alphaTest.value=f.alphaTest}function c(m,f){if(m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map)m.map.value=f.map,n(f.map,m.mapTransform);if(f.alphaMap)m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform);if(f.alphaTest>0)m.alphaTest.value=f.alphaTest}function d(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,0.0001)}function h(m,f){if(f.gradientMap)m.gradientMap.value=f.gradientMap}function u(m,f){if(m.metalness.value=f.metalness,f.metalnessMap)m.metalnessMap.value=f.metalnessMap,n(f.metalnessMap,m.metalnessMapTransform);if(m.roughness.value=f.roughness,f.roughnessMap)m.roughnessMap.value=f.roughnessMap,n(f.roughnessMap,m.roughnessMapTransform);if(f.envMap)m.envMapIntensity.value=f.envMapIntensity}function p(m,f,w){if(m.ior.value=f.ior,f.sheen>0){if(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap)m.sheenColorMap.value=f.sheenColorMap,n(f.sheenColorMap,m.sheenColorMapTransform);if(f.sheenRoughnessMap)m.sheenRoughnessMap.value=f.sheenRoughnessMap,n(f.sheenRoughnessMap,m.sheenRoughnessMapTransform)}if(f.clearcoat>0){if(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap)m.clearcoatMap.value=f.clearcoatMap,n(f.clearcoatMap,m.clearcoatMapTransform);if(f.clearcoatRoughnessMap)m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,n(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform);if(f.clearcoatNormalMap){if(m.clearcoatNormalMap.value=f.clearcoatNormalMap,n(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Jt)m.clearcoatNormalScale.value.negate()}}if(f.dispersion>0)m.dispersion.value=f.dispersion;if(f.iridescence>0){if(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap)m.iridescenceMap.value=f.iridescenceMap,n(f.iridescenceMap,m.iridescenceMapTransform);if(f.iridescenceThicknessMap)m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,n(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform)}if(f.transmission>0){if(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),f.transmissionMap)m.transmissionMap.value=f.transmissionMap,n(f.transmissionMap,m.transmissionMapTransform);if(m.thickness.value=f.thickness,f.thicknessMap)m.thicknessMap.value=f.thicknessMap,n(f.thicknessMap,m.thicknessMapTransform);m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)}if(f.anisotropy>0){if(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap)m.anisotropyMap.value=f.anisotropyMap,n(f.anisotropyMap,m.anisotropyMapTransform)}if(m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap)m.specularColorMap.value=f.specularColorMap,n(f.specularColorMap,m.specularColorMapTransform);if(f.specularIntensityMap)m.specularIntensityMap.value=f.specularIntensityMap,n(f.specularIntensityMap,m.specularIntensityMapTransform)}function g(m,f){if(f.matcap)m.matcap.value=f.matcap}function x(m,f){let w=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function AA(e,t,n,i){let r={},s={},a=[],o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,v){let S=v.program;i.uniformBlockBinding(w,S)}function c(w,v){let S=r[w.id];if(S===void 0)g(w),S=d(w),r[w.id]=S,w.addEventListener("dispose",m);let R=v.program;i.updateUBOMapping(w,R);let T=t.render.frame;if(s[w.id]!==T)u(w),s[w.id]=T}function d(w){let v=h();w.__bindingPointIndex=v;let S=e.createBuffer(),{__size:R,usage:T}=w;return e.bindBuffer(e.UNIFORM_BUFFER,S),e.bufferData(e.UNIFORM_BUFFER,R,T),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,v,S),S}function h(){for(let w=0;w<o;w++)if(a.indexOf(w)===-1)return a.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(w){let v=r[w.id],{uniforms:S,__cache:R}=w;e.bindBuffer(e.UNIFORM_BUFFER,v);for(let T=0,E=S.length;T<E;T++){let D=Array.isArray(S[T])?S[T]:[S[T]];for(let y=0,_=D.length;y<_;y++){let A=D[y];if(p(A,T,y,R)===!0){let F=A.__offset,q=Array.isArray(A.value)?A.value:[A.value],B=0;for(let ee=0;ee<q.length;ee++){let j=q[ee],ae=x(j);if(typeof j==="number"||typeof j==="boolean")A.__data[0]=j,e.bufferSubData(e.UNIFORM_BUFFER,F+B,A.__data);else if(j.isMatrix3)A.__data[0]=j.elements[0],A.__data[1]=j.elements[1],A.__data[2]=j.elements[2],A.__data[3]=0,A.__data[4]=j.elements[3],A.__data[5]=j.elements[4],A.__data[6]=j.elements[5],A.__data[7]=0,A.__data[8]=j.elements[6],A.__data[9]=j.elements[7],A.__data[10]=j.elements[8],A.__data[11]=0;else j.toArray(A.__data,B),B+=ae.storage/Float32Array.BYTES_PER_ELEMENT}e.bufferSubData(e.UNIFORM_BUFFER,F,A.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(w,v,S,R){let T=w.value,E=v+"_"+S;if(R[E]===void 0){if(typeof T==="number"||typeof T==="boolean")R[E]=T;else R[E]=T.clone();return!0}else{let D=R[E];if(typeof T==="number"||typeof T==="boolean"){if(D!==T)return R[E]=T,!0}else if(D.equals(T)===!1)return D.copy(T),!0}return!1}function g(w){let v=w.uniforms,S=0,R=16;for(let E=0,D=v.length;E<D;E++){let y=Array.isArray(v[E])?v[E]:[v[E]];for(let _=0,A=y.length;_<A;_++){let F=y[_],q=Array.isArray(F.value)?F.value:[F.value];for(let B=0,ee=q.length;B<ee;B++){let j=q[B],ae=x(j),W=S%R,me=W%ae.boundary,fe=W+me;if(S+=me,fe!==0&&R-fe<ae.storage)S+=R-fe;F.__data=new Float32Array(ae.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=S,S+=ae.storage}}}let T=S%R;if(T>0)S+=R-T;return w.__size=S,w.__cache={},this}function x(w){let v={boundary:0,storage:0};if(typeof w==="number"||typeof w==="boolean")v.boundary=4,v.storage=4;else if(w.isVector2)v.boundary=8,v.storage=8;else if(w.isVector3||w.isColor)v.boundary=16,v.storage=12;else if(w.isVector4)v.boundary=16,v.storage=16;else if(w.isMatrix3)v.boundary=48,v.storage=48;else if(w.isMatrix4)v.boundary=64,v.storage=64;else if(w.isTexture)console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.");else console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w);return v}function m(w){let v=w.target;v.removeEventListener("dispose",m);let S=a.indexOf(v.__bindingPointIndex);a.splice(S,1),e.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function f(){for(let w in r)e.deleteBuffer(r[w]);a=[],r={},s={}}return{bind:l,update:c,dispose:f}}class Qu{constructor(e={}){let{canvas:t=i0(),context:n=null,depth:i=!0,stencil:r=!1,alpha:s=!1,antialias:a=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:l=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let u;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=n.getContextAttributes().alpha}else u=s;let p=new Uint32Array(4),g=new Int32Array(4),x=null,m=null,f=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=oi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let v=this,S=!1;this._outputColorSpace=Yi;let R=0,T=0,E=null,D=-1,y=null,_=new it,A=new it,F=null,q=new Ne(0),B=0,{width:ee,height:j}=t,ae=1,W=null,me=null,fe=new it(0,0,ee,j),Ae=new it(0,0,ee,j),Se=!1,N=new sa,ne=!1,Y=!1,le=new et,pe=new P,L=new it,X={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ie=!1;function Pe(){return E===null?ae:1}let I=n;function oe(M,z){return t.getContext(M,z)}try{let M={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:o,preserveDrawingBuffer:l,powerPreference:c,failIfMajorPerformanceCaveat:d};if("setAttribute"in t)t.setAttribute("data-engine",`three.js r${px}`);if(t.addEventListener("webglcontextlost",we,!1),t.addEventListener("webglcontextrestored",Me,!1),t.addEventListener("webglcontextcreationerror",De,!1),I===null){if(I=oe("webgl2",M),I===null)if(oe("webgl2"))throw Error("Error creating WebGL context with your selected attributes.");else throw Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let J,U,H,he,Z,V,ce,Le,ze,C,b,O,se,de,te,ye,_e,Ie,Ge,xe,Te,Be,Ue,Ee;function Ye(){if(J=new $E(I),J.init(),Be=new SA(I,J),U=new OE(I,J,e,Be),H=new yA(I,J),U.reversedDepthBuffer&&h)H.buffers.depth.setReversed(!0);he=new YE(I),Z=new oA,V=new bA(I,J,H,Z,U,Be,he),ce=new zE(v),Le=new WE(v),ze=new ew(I),Ue=new UE(I,ze),C=new qE(I,ze,he,Ue),b=new ZE(I,C,ze,he),Ge=new jE(I,U,V),ye=new BE(Z),O=new aA(v,ce,Le,J,U,Ue,ye),se=new TA(v,Z),de=new cA,te=new mA(J),Ie=new NE(v,ce,Le,H,b,u,o),_e=new vA(v,b,U),Ee=new AA(I,he,U,H),xe=new FE(I,J,he),Te=new XE(I,J,he),he.programs=O.programs,v.capabilities=U,v.extensions=J,v.properties=Z,v.renderLists=de,v.shadowMap=_e,v.state=H,v.info=he}Ye();let k=new Z0(v,I);this.xr=k,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let M=J.get("WEBGL_lose_context");if(M)M.loseContext()},this.forceContextRestore=function(){let M=J.get("WEBGL_lose_context");if(M)M.restoreContext()},this.getPixelRatio=function(){return ae},this.setPixelRatio=function(M){if(M===void 0)return;ae=M,this.setSize(ee,j,!1)},this.getSize=function(M){return M.set(ee,j)},this.setSize=function(M,z,K=!0){if(k.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}if(ee=M,j=z,t.width=Math.floor(M*ae),t.height=Math.floor(z*ae),K===!0)t.style.width=M+"px",t.style.height=z+"px";this.setViewport(0,0,M,z)},this.getDrawingBufferSize=function(M){return M.set(ee*ae,j*ae).floor()},this.setDrawingBufferSize=function(M,z,K){ee=M,j=z,ae=K,t.width=Math.floor(M*K),t.height=Math.floor(z*K),this.setViewport(0,0,M,z)},this.getCurrentViewport=function(M){return M.copy(_)},this.getViewport=function(M){return M.copy(fe)},this.setViewport=function(M,z,K,Q){if(M.isVector4)fe.set(M.x,M.y,M.z,M.w);else fe.set(M,z,K,Q);H.viewport(_.copy(fe).multiplyScalar(ae).round())},this.getScissor=function(M){return M.copy(Ae)},this.setScissor=function(M,z,K,Q){if(M.isVector4)Ae.set(M.x,M.y,M.z,M.w);else Ae.set(M,z,K,Q);H.scissor(A.copy(Ae).multiplyScalar(ae).round())},this.getScissorTest=function(){return Se},this.setScissorTest=function(M){H.setScissorTest(Se=M)},this.setOpaqueSort=function(M){W=M},this.setTransparentSort=function(M){me=M},this.getClearColor=function(M){return M.copy(Ie.getClearColor())},this.setClearColor=function(){Ie.setClearColor(...arguments)},this.getClearAlpha=function(){return Ie.getClearAlpha()},this.setClearAlpha=function(){Ie.setClearAlpha(...arguments)},this.clear=function(M=!0,z=!0,K=!0){let Q=0;if(M){let G=!1;if(E!==null){let ve=E.texture.format;G=ve===Fh||ve===Uh||ve===Nh}if(G){let ve=E.texture.type,Ce=ve===Xn||ve===Zr||ve===Qs||ve===Ci||ve===Dh||ve===kh,Fe=Ie.getClearColor(),Re=Ie.getClearAlpha(),{r:We,g:qe,b:He}=Fe;if(Ce)p[0]=We,p[1]=qe,p[2]=He,p[3]=Re,I.clearBufferuiv(I.COLOR,0,p);else g[0]=We,g[1]=qe,g[2]=He,g[3]=Re,I.clearBufferiv(I.COLOR,0,g)}else Q|=I.COLOR_BUFFER_BIT}if(z)Q|=I.DEPTH_BUFFER_BIT;if(K)Q|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);I.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",we,!1),t.removeEventListener("webglcontextrestored",Me,!1),t.removeEventListener("webglcontextcreationerror",De,!1),Ie.dispose(),de.dispose(),te.dispose(),Z.dispose(),ce.dispose(),Le.dispose(),b.dispose(),Ue.dispose(),Ee.dispose(),O.dispose(),k.dispose(),k.removeEventListener("sessionstart",zn),k.removeEventListener("sessionend",Hn),Ii.stop()};function we(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function Me(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;let M=he.autoReset,z=_e.enabled,K=_e.autoUpdate,Q=_e.needsUpdate,G=_e.type;Ye(),he.autoReset=M,_e.enabled=z,_e.autoUpdate=K,_e.needsUpdate=Q,_e.type=G}function De(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function ge(M){let z=M.target;z.removeEventListener("dispose",ge),ue(z)}function ue(M){Oe(M),Z.remove(M)}function Oe(M){let z=Z.get(M).programs;if(z!==void 0){if(z.forEach(function(K){O.releaseProgram(K)}),M.isShaderMaterial)O.releaseShaderCache(M)}}this.renderBufferDirect=function(M,z,K,Q,G,ve){if(z===null)z=X;let Ce=G.isMesh&&G.matrixWorld.determinant()<0,Fe=Pv(M,z,K,Q,G);H.setMaterial(Q,Ce);let Re=K.index,We=1;if(Q.wireframe===!0){if(Re=C.getWireframeAttribute(K),Re===void 0)return;We=2}let qe=K.drawRange,He=K.attributes.position,tt=qe.start*We,ct=(qe.start+qe.count)*We;if(ve!==null)tt=Math.max(tt,ve.start*We),ct=Math.min(ct,(ve.start+ve.count)*We);if(Re!==null)tt=Math.max(tt,0),ct=Math.min(ct,Re.count);else if(He!==void 0&&He!==null)tt=Math.max(tt,0),ct=Math.min(ct,He.count);let St=ct-tt;if(St<0||St===1/0)return;Ue.setup(G,Q,Fe,K,Re);let mt,ft=xe;if(Re!==null)mt=ze.get(Re),ft=Te,ft.setIndex(mt);if(G.isMesh)if(Q.wireframe===!0)H.setLineWidth(Q.wireframeLinewidth*Pe()),ft.setMode(I.LINES);else ft.setMode(I.TRIANGLES);else if(G.isLine){let Ve=Q.linewidth;if(Ve===void 0)Ve=1;if(H.setLineWidth(Ve*Pe()),G.isLineSegments)ft.setMode(I.LINES);else if(G.isLineLoop)ft.setMode(I.LINE_LOOP);else ft.setMode(I.LINE_STRIP)}else if(G.isPoints)ft.setMode(I.POINTS);else if(G.isSprite)ft.setMode(I.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)$r("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ft.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(!J.get("WEBGL_multi_draw")){let{_multiDrawStarts:Ve,_multiDrawCounts:xt,_multiDrawCount:rt}=G,dn=Re?ze.get(Re).bytesPerElement:1,gr=Z.get(Q).currentProgram.getUniforms();for(let hn=0;hn<rt;hn++)gr.setValue(I,"_gl_DrawID",hn),ft.render(Ve[hn]/dn,xt[hn])}else ft.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else if(G.isInstancedMesh)ft.renderInstances(tt,St,G.count);else if(K.isInstancedBufferGeometry){let Ve=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,xt=Math.min(K.instanceCount,Ve);ft.renderInstances(tt,St,xt)}else ft.render(tt,St)};function je(M,z,K){if(M.transparent===!0&&M.side===Qt&&M.forceSinglePass===!1)M.side=Jt,M.needsUpdate=!0,Ia(M,z,K),M.side=Xr,M.needsUpdate=!0,Ia(M,z,K),M.side=Qt;else Ia(M,z,K)}this.compile=function(M,z,K=null){if(K===null)K=M;if(m=te.get(K),m.init(z),w.push(m),K.traverseVisible(function(G){if(G.isLight&&G.layers.test(z.layers)){if(m.pushLight(G),G.castShadow)m.pushShadow(G)}}),M!==K)M.traverseVisible(function(G){if(G.isLight&&G.layers.test(z.layers)){if(m.pushLight(G),G.castShadow)m.pushShadow(G)}});m.setupLights();let Q=new Set;return M.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let ve=G.material;if(ve)if(Array.isArray(ve))for(let Ce=0;Ce<ve.length;Ce++){let Fe=ve[Ce];je(Fe,K,G),Q.add(Fe)}else je(ve,K,G),Q.add(ve)}),m=w.pop(),Q},this.compileAsync=function(M,z,K=null){let Q=this.compile(M,z,K);return new Promise((G)=>{function ve(){if(Q.forEach(function(Ce){if(Z.get(Ce).currentProgram.isReady())Q.delete(Ce)}),Q.size===0){G(M);return}setTimeout(ve,10)}if(J.get("KHR_parallel_shader_compile")!==null)ve();else setTimeout(ve,10)})};let ut=null;function lt(M){if(ut)ut(M)}function zn(){Ii.stop()}function Hn(){Ii.start()}let Ii=new B0;if(Ii.setAnimationLoop(lt),typeof self<"u")Ii.setContext(self);this.setAnimationLoop=function(M){ut=M,k.setAnimationLoop(M),M===null?Ii.stop():Ii.start()},k.addEventListener("sessionstart",zn),k.addEventListener("sessionend",Hn),this.render=function(M,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(M.matrixWorldAutoUpdate===!0)M.updateMatrixWorld();if(z.parent===null&&z.matrixWorldAutoUpdate===!0)z.updateMatrixWorld();if(k.enabled===!0&&k.isPresenting===!0){if(k.cameraAutoUpdate===!0)k.updateCamera(z);z=k.getCamera()}if(M.isScene===!0)M.onBeforeRender(v,M,z,E);if(m=te.get(M,w.length),m.init(z),w.push(m),le.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),N.setFromProjectionMatrix(le,mu,z.reversedDepth),Y=this.localClippingEnabled,ne=ye.init(this.clippingPlanes,Y),x=de.get(M,f.length),x.init(),f.push(x),k.enabled===!0&&k.isPresenting===!0){let ve=v.xr.getDepthSensingMesh();if(ve!==null)jl(ve,z,-1/0,v.sortObjects)}if(jl(M,z,0,v.sortObjects),x.finish(),v.sortObjects===!0)x.sort(W,me);if(ie=k.enabled===!1||k.isPresenting===!1||k.hasDepthSensing()===!1,ie)Ie.addToRenderList(x,M);if(this.info.render.frame++,ne===!0)ye.beginShadows();let K=m.state.shadowsArray;if(_e.render(K,M,z),ne===!0)ye.endShadows();if(this.info.autoReset===!0)this.info.reset();let Q=x.opaque,G=x.transmissive;if(m.setupLights(),z.isArrayCamera){let ve=z.cameras;if(G.length>0)for(let Ce=0,Fe=ve.length;Ce<Fe;Ce++){let Re=ve[Ce];bf(Q,G,M,Re)}if(ie)Ie.render(M);for(let Ce=0,Fe=ve.length;Ce<Fe;Ce++){let Re=ve[Ce];yf(x,M,Re,Re.viewport)}}else{if(G.length>0)bf(Q,G,M,z);if(ie)Ie.render(M);yf(x,M,z)}if(E!==null&&T===0)V.updateMultisampleRenderTarget(E),V.updateRenderTargetMipmap(E);if(M.isScene===!0)M.onAfterRender(v,M,z);if(Ue.resetDefaultState(),D=-1,y=null,w.pop(),w.length>0){if(m=w[w.length-1],ne===!0)ye.setGlobalState(v.clippingPlanes,m.state.camera)}else m=null;if(f.pop(),f.length>0)x=f[f.length-1];else x=null};function jl(M,z,K,Q){if(M.visible===!1)return;if(M.layers.test(z.layers)){if(M.isGroup)K=M.renderOrder;else if(M.isLOD){if(M.autoUpdate===!0)M.update(z)}else if(M.isLight){if(m.pushLight(M),M.castShadow)m.pushShadow(M)}else if(M.isSprite){if(!M.frustumCulled||N.intersectsSprite(M)){if(Q)L.setFromMatrixPosition(M.matrixWorld).applyMatrix4(le);let Ce=b.update(M),Fe=M.material;if(Fe.visible)x.push(M,Ce,Fe,K,L.z,null)}}else if(M.isMesh||M.isLine||M.isPoints){if(!M.frustumCulled||N.intersectsObject(M)){let Ce=b.update(M),Fe=M.material;if(Q){if(M.boundingSphere!==void 0){if(M.boundingSphere===null)M.computeBoundingSphere();L.copy(M.boundingSphere.center)}else{if(Ce.boundingSphere===null)Ce.computeBoundingSphere();L.copy(Ce.boundingSphere.center)}L.applyMatrix4(M.matrixWorld).applyMatrix4(le)}if(Array.isArray(Fe)){let Re=Ce.groups;for(let We=0,qe=Re.length;We<qe;We++){let He=Re[We],tt=Fe[He.materialIndex];if(tt&&tt.visible)x.push(M,Ce,tt,K,L.z,He)}}else if(Fe.visible)x.push(M,Ce,Fe,K,L.z,null)}}}let ve=M.children;for(let Ce=0,Fe=ve.length;Ce<Fe;Ce++)jl(ve[Ce],z,K,Q)}function yf(M,z,K,Q){let{opaque:G,transmissive:ve,transparent:Ce}=M;if(m.setupLightsView(K),ne===!0)ye.setGlobalState(v.clippingPlanes,K);if(Q)H.viewport(_.copy(Q));if(G.length>0)Pa(G,z,K);if(ve.length>0)Pa(ve,z,K);if(Ce.length>0)Pa(Ce,z,K);H.buffers.depth.setTest(!0),H.buffers.depth.setMask(!0),H.buffers.color.setMask(!0),H.setPolygonOffset(!1)}function bf(M,z,K,Q){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;if(m.state.transmissionRenderTarget[Q.id]===void 0)m.state.transmissionRenderTarget[Q.id]=new Et(1,1,{generateMipmaps:!0,type:J.has("EXT_color_buffer_half_float")||J.has("EXT_color_buffer_float")?Bt:Xn,minFilter:Ti,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:nt.workingColorSpace});let ve=m.state.transmissionRenderTarget[Q.id],Ce=Q.viewport||_;ve.setSize(Ce.z*v.transmissionResolutionScale,Ce.w*v.transmissionResolutionScale);let Fe=v.getRenderTarget(),Re=v.getActiveCubeFace(),We=v.getActiveMipmapLevel();if(v.setRenderTarget(ve),v.getClearColor(q),B=v.getClearAlpha(),B<1)v.setClearColor(16777215,0.5);if(v.clear(),ie)Ie.render(K);let qe=v.toneMapping;v.toneMapping=oi;let He=Q.viewport;if(Q.viewport!==void 0)Q.viewport=void 0;if(m.setupLightsView(Q),ne===!0)ye.setGlobalState(v.clippingPlanes,Q);if(Pa(M,K,Q),V.updateMultisampleRenderTarget(ve),V.updateRenderTargetMipmap(ve),J.has("WEBGL_multisampled_render_to_texture")===!1){let tt=!1;for(let ct=0,St=z.length;ct<St;ct++){let mt=z[ct],{object:ft,geometry:Ve,material:xt,group:rt}=mt;if(xt.side===Qt&&ft.layers.test(Q.layers)){let dn=xt.side;xt.side=Jt,xt.needsUpdate=!0,Sf(ft,K,Q,Ve,xt,rt),xt.side=dn,xt.needsUpdate=!0,tt=!0}}if(tt===!0)V.updateMultisampleRenderTarget(ve),V.updateRenderTargetMipmap(ve)}if(v.setRenderTarget(Fe,Re,We),v.setClearColor(q,B),He!==void 0)Q.viewport=He;v.toneMapping=qe}function Pa(M,z,K){let Q=z.isScene===!0?z.overrideMaterial:null;for(let G=0,ve=M.length;G<ve;G++){let Ce=M[G],{object:Fe,geometry:Re,group:We,material:qe}=Ce;if(qe.allowOverride===!0&&Q!==null)qe=Q;if(Fe.layers.test(K.layers))Sf(Fe,z,K,Re,qe,We)}}function Sf(M,z,K,Q,G,ve){if(M.onBeforeRender(v,z,K,Q,G,ve),M.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),G.onBeforeRender(v,z,K,Q,M,ve),G.transparent===!0&&G.side===Qt&&G.forceSinglePass===!1)G.side=Jt,G.needsUpdate=!0,v.renderBufferDirect(K,z,Q,G,M,ve),G.side=Xr,G.needsUpdate=!0,v.renderBufferDirect(K,z,Q,G,M,ve),G.side=Qt;else v.renderBufferDirect(K,z,Q,G,M,ve);M.onAfterRender(v,z,K,Q,G,ve)}function Ia(M,z,K){if(z.isScene!==!0)z=X;let Q=Z.get(M),G=m.state.lights,ve=m.state.shadowsArray,Ce=G.state.version,Fe=O.getParameters(M,G.state,ve,z,K),Re=O.getProgramCacheKey(Fe),We=Q.programs;if(Q.environment=M.isMeshStandardMaterial?z.environment:null,Q.fog=z.fog,Q.envMap=(M.isMeshStandardMaterial?Le:ce).get(M.envMap||Q.environment),Q.envMapRotation=Q.environment!==null&&M.envMap===null?z.environmentRotation:M.envMapRotation,We===void 0)M.addEventListener("dispose",ge),We=new Map,Q.programs=We;let qe=We.get(Re);if(qe!==void 0){if(Q.currentProgram===qe&&Q.lightsStateVersion===Ce)return Mf(M,Fe),qe}else Fe.uniforms=O.getUniforms(M),M.onBeforeCompile(Fe,v),qe=O.acquireProgram(Fe,Re),We.set(Re,qe),Q.uniforms=Fe.uniforms;let He=Q.uniforms;if(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)He.clippingPlanes=ye.uniform;if(Mf(M,Fe),Q.needsLights=Lv(M),Q.lightsStateVersion=Ce,Q.needsLights)He.ambientLightColor.value=G.state.ambient,He.lightProbe.value=G.state.probe,He.directionalLights.value=G.state.directional,He.directionalLightShadows.value=G.state.directionalShadow,He.spotLights.value=G.state.spot,He.spotLightShadows.value=G.state.spotShadow,He.rectAreaLights.value=G.state.rectArea,He.ltc_1.value=G.state.rectAreaLTC1,He.ltc_2.value=G.state.rectAreaLTC2,He.pointLights.value=G.state.point,He.pointLightShadows.value=G.state.pointShadow,He.hemisphereLights.value=G.state.hemi,He.directionalShadowMap.value=G.state.directionalShadowMap,He.directionalShadowMatrix.value=G.state.directionalShadowMatrix,He.spotShadowMap.value=G.state.spotShadowMap,He.spotLightMatrix.value=G.state.spotLightMatrix,He.spotLightMap.value=G.state.spotLightMap,He.pointShadowMap.value=G.state.pointShadowMap,He.pointShadowMatrix.value=G.state.pointShadowMatrix;return Q.currentProgram=qe,Q.uniformsList=null,qe}function wf(M){if(M.uniformsList===null){let z=M.currentProgram.getUniforms();M.uniformsList=xa.seqWithValue(z.seq,M.uniforms)}return M.uniformsList}function Mf(M,z){let K=Z.get(M);K.outputColorSpace=z.outputColorSpace,K.batching=z.batching,K.batchingColor=z.batchingColor,K.instancing=z.instancing,K.instancingColor=z.instancingColor,K.instancingMorph=z.instancingMorph,K.skinning=z.skinning,K.morphTargets=z.morphTargets,K.morphNormals=z.morphNormals,K.morphColors=z.morphColors,K.morphTargetsCount=z.morphTargetsCount,K.numClippingPlanes=z.numClippingPlanes,K.numIntersection=z.numClipIntersection,K.vertexAlphas=z.vertexAlphas,K.vertexTangents=z.vertexTangents,K.toneMapping=z.toneMapping}function Pv(M,z,K,Q,G){if(z.isScene!==!0)z=X;V.resetTextureUnits();let ve=z.fog,Ce=Q.isMeshStandardMaterial?z.environment:null,Fe=E===null?v.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:ea,Re=(Q.isMeshStandardMaterial?Le:ce).get(Q.envMap||Ce),We=Q.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,qe=!!K.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),He=!!K.morphAttributes.position,tt=!!K.morphAttributes.normal,ct=!!K.morphAttributes.color,St=oi;if(Q.toneMapped){if(E===null||E.isXRRenderTarget===!0)St=v.toneMapping}let mt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,ft=mt!==void 0?mt.length:0,Ve=Z.get(Q),xt=m.state.lights;if(ne===!0){if(Y===!0||M!==y){let Zt=M===y&&Q.id===D;ye.setState(Q,M,Zt)}}let rt=!1;if(Q.version===Ve.__version){if(Ve.needsLights&&Ve.lightsStateVersion!==xt.state.version)rt=!0;else if(Ve.outputColorSpace!==Fe)rt=!0;else if(G.isBatchedMesh&&Ve.batching===!1)rt=!0;else if(!G.isBatchedMesh&&Ve.batching===!0)rt=!0;else if(G.isBatchedMesh&&Ve.batchingColor===!0&&G.colorTexture===null)rt=!0;else if(G.isBatchedMesh&&Ve.batchingColor===!1&&G.colorTexture!==null)rt=!0;else if(G.isInstancedMesh&&Ve.instancing===!1)rt=!0;else if(!G.isInstancedMesh&&Ve.instancing===!0)rt=!0;else if(G.isSkinnedMesh&&Ve.skinning===!1)rt=!0;else if(!G.isSkinnedMesh&&Ve.skinning===!0)rt=!0;else if(G.isInstancedMesh&&Ve.instancingColor===!0&&G.instanceColor===null)rt=!0;else if(G.isInstancedMesh&&Ve.instancingColor===!1&&G.instanceColor!==null)rt=!0;else if(G.isInstancedMesh&&Ve.instancingMorph===!0&&G.morphTexture===null)rt=!0;else if(G.isInstancedMesh&&Ve.instancingMorph===!1&&G.morphTexture!==null)rt=!0;else if(Ve.envMap!==Re)rt=!0;else if(Q.fog===!0&&Ve.fog!==ve)rt=!0;else if(Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==ye.numPlanes||Ve.numIntersection!==ye.numIntersection))rt=!0;else if(Ve.vertexAlphas!==We)rt=!0;else if(Ve.vertexTangents!==qe)rt=!0;else if(Ve.morphTargets!==He)rt=!0;else if(Ve.morphNormals!==tt)rt=!0;else if(Ve.morphColors!==ct)rt=!0;else if(Ve.toneMapping!==St)rt=!0;else if(Ve.morphTargetsCount!==ft)rt=!0}else rt=!0,Ve.__version=Q.version;let dn=Ve.currentProgram;if(rt===!0)dn=Ia(Q,z,G);let gr=!1,hn=!1,ls=!1,vt=dn.getUniforms(),bn=Ve.uniforms;if(H.useProgram(dn.program))gr=!0,hn=!0,ls=!0;if(Q.id!==D)D=Q.id,hn=!0;if(gr||y!==M){if(H.buffers.depth.getReversed()&&M.reversedDepth!==!0)M._reversedDepth=!0,M.updateProjectionMatrix();vt.setValue(I,"projectionMatrix",M.projectionMatrix),vt.setValue(I,"viewMatrix",M.matrixWorldInverse);let nn=vt.map.cameraPosition;if(nn!==void 0)nn.setValue(I,pe.setFromMatrixPosition(M.matrixWorld));if(U.logarithmicDepthBuffer)vt.setValue(I,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2));if(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)vt.setValue(I,"isOrthographic",M.isOrthographicCamera===!0);if(y!==M)y=M,hn=!0,ls=!0}if(G.isSkinnedMesh){vt.setOptional(I,G,"bindMatrix"),vt.setOptional(I,G,"bindMatrixInverse");let Zt=G.skeleton;if(Zt){if(Zt.boneTexture===null)Zt.computeBoneTexture();vt.setValue(I,"boneTexture",Zt.boneTexture,V)}}if(G.isBatchedMesh){if(vt.setOptional(I,G,"batchingTexture"),vt.setValue(I,"batchingTexture",G._matricesTexture,V),vt.setOptional(I,G,"batchingIdTexture"),vt.setValue(I,"batchingIdTexture",G._indirectTexture,V),vt.setOptional(I,G,"batchingColorTexture"),G._colorsTexture!==null)vt.setValue(I,"batchingColorTexture",G._colorsTexture,V)}let Sn=K.morphAttributes;if(Sn.position!==void 0||Sn.normal!==void 0||Sn.color!==void 0)Ge.update(G,K,dn);if(hn||Ve.receiveShadow!==G.receiveShadow)Ve.receiveShadow=G.receiveShadow,vt.setValue(I,"receiveShadow",G.receiveShadow);if(Q.isMeshGouraudMaterial&&Q.envMap!==null)bn.envMap.value=Re,bn.flipEnvMap.value=Re.isCubeTexture&&Re.isRenderTargetTexture===!1?-1:1;if(Q.isMeshStandardMaterial&&Q.envMap===null&&z.environment!==null)bn.envMapIntensity.value=z.environmentIntensity;if(hn){if(vt.setValue(I,"toneMappingExposure",v.toneMappingExposure),Ve.needsLights)Iv(bn,ls);if(ve&&Q.fog===!0)se.refreshFogUniforms(bn,ve);se.refreshMaterialUniforms(bn,Q,ae,j,m.state.transmissionRenderTarget[M.id]),xa.upload(I,wf(Ve),bn,V)}if(Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0)xa.upload(I,wf(Ve),bn,V),Q.uniformsNeedUpdate=!1;if(Q.isSpriteMaterial)vt.setValue(I,"center",G.center);if(vt.setValue(I,"modelViewMatrix",G.modelViewMatrix),vt.setValue(I,"normalMatrix",G.normalMatrix),vt.setValue(I,"modelMatrix",G.matrixWorld),Q.isShaderMaterial||Q.isRawShaderMaterial){let Zt=Q.uniformsGroups;for(let nn=0,Zl=Zt.length;nn<Zl;nn++){let Li=Zt[nn];Ee.update(Li,dn),Ee.bind(Li,dn)}}return dn}function Iv(M,z){M.ambientLightColor.needsUpdate=z,M.lightProbe.needsUpdate=z,M.directionalLights.needsUpdate=z,M.directionalLightShadows.needsUpdate=z,M.pointLights.needsUpdate=z,M.pointLightShadows.needsUpdate=z,M.spotLights.needsUpdate=z,M.spotLightShadows.needsUpdate=z,M.rectAreaLights.needsUpdate=z,M.hemisphereLights.needsUpdate=z}function Lv(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(M,z,K){let Q=Z.get(M);if(Q.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,Q.__autoAllocateDepthBuffer===!1)Q.__useRenderToTexture=!1;Z.get(M.texture).__webglTexture=z,Z.get(M.depthTexture).__webglTexture=Q.__autoAllocateDepthBuffer?void 0:K,Q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,z){let K=Z.get(M);K.__webglFramebuffer=z,K.__useDefaultFramebuffer=z===void 0};let Dv=I.createFramebuffer();this.setRenderTarget=function(M,z=0,K=0){E=M,R=z,T=K;let Q=!0,G=null,ve=!1,Ce=!1;if(M){let Re=Z.get(M);if(Re.__useDefaultFramebuffer!==void 0)H.bindFramebuffer(I.FRAMEBUFFER,null),Q=!1;else if(Re.__webglFramebuffer===void 0)V.setupRenderTarget(M);else if(Re.__hasExternalTextures)V.rebindTextures(M,Z.get(M.texture).__webglTexture,Z.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let He=M.depthTexture;if(Re.__boundDepthTexture!==He){if(He!==null&&Z.has(He)&&(M.width!==He.image.width||M.height!==He.image.height))throw Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");V.setupDepthRenderbuffer(M)}}let We=M.texture;if(We.isData3DTexture||We.isDataArrayTexture||We.isCompressedArrayTexture)Ce=!0;let qe=Z.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget){if(Array.isArray(qe[z]))G=qe[z][K];else G=qe[z];ve=!0}else if(M.samples>0&&V.useMultisampledRTT(M)===!1)G=Z.get(M).__webglMultisampledFramebuffer;else if(Array.isArray(qe))G=qe[K];else G=qe;_.copy(M.viewport),A.copy(M.scissor),F=M.scissorTest}else _.copy(fe).multiplyScalar(ae).floor(),A.copy(Ae).multiplyScalar(ae).floor(),F=Se;if(K!==0)G=Dv;if(H.bindFramebuffer(I.FRAMEBUFFER,G)&&Q)H.drawBuffers(M,G);if(H.viewport(_),H.scissor(A),H.setScissorTest(F),ve){let Re=Z.get(M.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+z,Re.__webglTexture,K)}else if(Ce){let Re=z;for(let We=0;We<M.textures.length;We++){let qe=Z.get(M.textures[We]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+We,qe.__webglTexture,K,Re)}}else if(M!==null&&K!==0){let Re=Z.get(M.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Re.__webglTexture,K)}D=-1},this.readRenderTargetPixels=function(M,z,K,Q,G,ve,Ce,Fe=0){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=Z.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Ce!==void 0)Re=Re[Ce];if(Re){H.bindFramebuffer(I.FRAMEBUFFER,Re);try{let We=M.textures[Fe],{format:qe,type:He}=We;if(!U.textureFormatReadable(qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!U.textureTypeReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(z>=0&&z<=M.width-Q&&(K>=0&&K<=M.height-G)){if(M.textures.length>1)I.readBuffer(I.COLOR_ATTACHMENT0+Fe);I.readPixels(z,K,Q,G,Be.convert(qe),Be.convert(He),ve)}}finally{let We=E!==null?Z.get(E).__webglFramebuffer:null;H.bindFramebuffer(I.FRAMEBUFFER,We)}}},this.readRenderTargetPixelsAsync=async function(M,z,K,Q,G,ve,Ce,Fe=0){if(!(M&&M.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=Z.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Ce!==void 0)Re=Re[Ce];if(Re)if(z>=0&&z<=M.width-Q&&(K>=0&&K<=M.height-G)){H.bindFramebuffer(I.FRAMEBUFFER,Re);let We=M.textures[Fe],{format:qe,type:He}=We;if(!U.textureFormatReadable(qe))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!U.textureTypeReadable(He))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let tt=I.createBuffer();if(I.bindBuffer(I.PIXEL_PACK_BUFFER,tt),I.bufferData(I.PIXEL_PACK_BUFFER,ve.byteLength,I.STREAM_READ),M.textures.length>1)I.readBuffer(I.COLOR_ATTACHMENT0+Fe);I.readPixels(z,K,Q,G,Be.convert(qe),Be.convert(He),0);let ct=E!==null?Z.get(E).__webglFramebuffer:null;H.bindFramebuffer(I.FRAMEBUFFER,ct);let St=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await r0(I,St,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,tt),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ve),I.deleteBuffer(tt),I.deleteSync(St),ve}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,z=null,K=0){let Q=Math.pow(2,-K),G=Math.floor(M.image.width*Q),ve=Math.floor(M.image.height*Q),Ce=z!==null?z.x:0,Fe=z!==null?z.y:0;V.setTexture2D(M,0),I.copyTexSubImage2D(I.TEXTURE_2D,K,0,0,Ce,Fe,G,ve),H.unbindTexture()};let kv=I.createFramebuffer(),Nv=I.createFramebuffer();if(this.copyTextureToTexture=function(M,z,K=null,Q=null,G=0,ve=null){if(ve===null)if(G!==0)$r("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ve=G,G=0;else ve=0;let Ce,Fe,Re,We,qe,He,tt,ct,St,mt=M.isCompressedTexture?M.mipmaps[ve]:M.image;if(K!==null)Ce=K.max.x-K.min.x,Fe=K.max.y-K.min.y,Re=K.isBox3?K.max.z-K.min.z:1,We=K.min.x,qe=K.min.y,He=K.isBox3?K.min.z:0;else{let Sn=Math.pow(2,-G);if(Ce=Math.floor(mt.width*Sn),Fe=Math.floor(mt.height*Sn),M.isDataArrayTexture)Re=mt.depth;else if(M.isData3DTexture)Re=Math.floor(mt.depth*Sn);else Re=1;We=0,qe=0,He=0}if(Q!==null)tt=Q.x,ct=Q.y,St=Q.z;else tt=0,ct=0,St=0;let ft=Be.convert(z.format),Ve=Be.convert(z.type),xt;if(z.isData3DTexture)V.setTexture3D(z,0),xt=I.TEXTURE_3D;else if(z.isDataArrayTexture||z.isCompressedArrayTexture)V.setTexture2DArray(z,0),xt=I.TEXTURE_2D_ARRAY;else V.setTexture2D(z,0),xt=I.TEXTURE_2D;I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,z.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,z.unpackAlignment);let rt=I.getParameter(I.UNPACK_ROW_LENGTH),dn=I.getParameter(I.UNPACK_IMAGE_HEIGHT),gr=I.getParameter(I.UNPACK_SKIP_PIXELS),hn=I.getParameter(I.UNPACK_SKIP_ROWS),ls=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,mt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,mt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,We),I.pixelStorei(I.UNPACK_SKIP_ROWS,qe),I.pixelStorei(I.UNPACK_SKIP_IMAGES,He);let vt=M.isDataArrayTexture||M.isData3DTexture,bn=z.isDataArrayTexture||z.isData3DTexture;if(M.isDepthTexture){let Sn=Z.get(M),Zt=Z.get(z),nn=Z.get(Sn.__renderTarget),Zl=Z.get(Zt.__renderTarget);H.bindFramebuffer(I.READ_FRAMEBUFFER,nn.__webglFramebuffer),H.bindFramebuffer(I.DRAW_FRAMEBUFFER,Zl.__webglFramebuffer);for(let Li=0;Li<Re;Li++){if(vt)I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Z.get(M).__webglTexture,G,He+Li),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Z.get(z).__webglTexture,ve,St+Li);I.blitFramebuffer(We,qe,Ce,Fe,tt,ct,Ce,Fe,I.DEPTH_BUFFER_BIT,I.NEAREST)}H.bindFramebuffer(I.READ_FRAMEBUFFER,null),H.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(G!==0||M.isRenderTargetTexture||Z.has(M)){let Sn=Z.get(M),Zt=Z.get(z);H.bindFramebuffer(I.READ_FRAMEBUFFER,kv),H.bindFramebuffer(I.DRAW_FRAMEBUFFER,Nv);for(let nn=0;nn<Re;nn++){if(vt)I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Sn.__webglTexture,G,He+nn);else I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Sn.__webglTexture,G);if(bn)I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Zt.__webglTexture,ve,St+nn);else I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Zt.__webglTexture,ve);if(G!==0)I.blitFramebuffer(We,qe,Ce,Fe,tt,ct,Ce,Fe,I.COLOR_BUFFER_BIT,I.NEAREST);else if(bn)I.copyTexSubImage3D(xt,ve,tt,ct,St+nn,We,qe,Ce,Fe);else I.copyTexSubImage2D(xt,ve,tt,ct,We,qe,Ce,Fe)}H.bindFramebuffer(I.READ_FRAMEBUFFER,null),H.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(bn)if(M.isDataTexture||M.isData3DTexture)I.texSubImage3D(xt,ve,tt,ct,St,Ce,Fe,Re,ft,Ve,mt.data);else if(z.isCompressedArrayTexture)I.compressedTexSubImage3D(xt,ve,tt,ct,St,Ce,Fe,Re,ft,mt.data);else I.texSubImage3D(xt,ve,tt,ct,St,Ce,Fe,Re,ft,Ve,mt);else if(M.isDataTexture)I.texSubImage2D(I.TEXTURE_2D,ve,tt,ct,Ce,Fe,ft,Ve,mt.data);else if(M.isCompressedTexture)I.compressedTexSubImage2D(I.TEXTURE_2D,ve,tt,ct,mt.width,mt.height,ft,mt.data);else I.texSubImage2D(I.TEXTURE_2D,ve,tt,ct,Ce,Fe,ft,Ve,mt);if(I.pixelStorei(I.UNPACK_ROW_LENGTH,rt),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,dn),I.pixelStorei(I.UNPACK_SKIP_PIXELS,gr),I.pixelStorei(I.UNPACK_SKIP_ROWS,hn),I.pixelStorei(I.UNPACK_SKIP_IMAGES,ls),ve===0&&z.generateMipmaps)I.generateMipmap(xt);H.unbindTexture()},this.initRenderTarget=function(M){if(Z.get(M).__webglFramebuffer===void 0)V.setupRenderTarget(M)},this.initTexture=function(M){if(M.isCubeTexture)V.setTextureCube(M,0);else if(M.isData3DTexture)V.setTexture3D(M,0);else if(M.isDataArrayTexture||M.isCompressedArrayTexture)V.setTexture2DArray(M,0);else V.setTexture2D(M,0);H.unbindTexture()},this.resetState=function(){R=0,T=0,E=null,H.reset(),Ue.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mu}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=nt._getDrawingBufferColorSpace(e),t.unpackColorSpace=nt._getUnpackColorSpace()}}var K0={type:"change"},tf={type:"start"},Q0={type:"end"},Nl=new Kr,J0=new pn,CA=Math.cos(70*ta.DEG2RAD),Dt=new P,on=2*Math.PI,ht={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ef=0.000001;class nf extends Pl{constructor(e,t=null){super(e,t);if(this.state=ht.NONE,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=0.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Mi.ROTATE,MIDDLE:Mi.DOLLY,RIGHT:Mi.PAN},this.touches={ONE:Ei.ROTATE,TWO:Ei.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new P,this._lastQuaternion=new Fn,this._lastTargetPosition=new P,this._quat=new Fn().setFromUnitVectors(e.up,new P(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ma,this._sphericalDelta=new ma,this._scale=1,this._panOffset=new P,this._rotateStart=new re,this._rotateEnd=new re,this._rotateDelta=new re,this._panStart=new re,this._panEnd=new re,this._panDelta=new re,this._dollyStart=new re,this._dollyEnd=new re,this._dollyDelta=new re,this._dollyDirection=new P,this._mouse=new re,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=PA.bind(this),this._onPointerDown=RA.bind(this),this._onPointerUp=IA.bind(this),this._onContextMenu=OA.bind(this),this._onMouseWheel=kA.bind(this),this._onKeyDown=NA.bind(this),this._onTouchStart=UA.bind(this),this._onTouchMove=FA.bind(this),this._onMouseDown=LA.bind(this),this._onMouseMove=DA.bind(this),this._interceptControlDown=BA.bind(this),this._interceptControlUp=zA.bind(this),this.domElement!==null)this.connect(this.domElement);this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){if(this._domElementKeyEvents!==null)this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(K0),this.update(),this.state=ht.NONE}update(e=null){let t=this.object.position;if(Dt.copy(t).sub(this.target),Dt.applyQuaternion(this._quat),this._spherical.setFromVector3(Dt),this.autoRotate&&this.state===ht.NONE)this._rotateLeft(this._getAutoRotationAngle(e));if(this.enableDamping)this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor;else this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi;let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;if(isFinite(n)&&isFinite(i)){if(n<-Math.PI)n+=on;else if(n>Math.PI)n-=on;if(i<-Math.PI)i+=on;else if(i>Math.PI)i-=on;if(n<=i)this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta));else this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)}if(this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0)this.target.addScaledVector(this._panOffset,this.dampingFactor);else this.target.add(this._panOffset);this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let s=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=s!=this._spherical.radius}if(Dt.setFromSpherical(this._spherical),Dt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Dt),this.object.lookAt(this.target),this.enableDamping===!0)this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor);else this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0);if(this.zoomToCursor&&this._performCursorZoom){let s=null;if(this.object.isPerspectiveCamera){let a=Dt.length();s=this._clampDistance(a*this._scale);let o=a-s;this.object.position.addScaledVector(this._dollyDirection,o),this.object.updateMatrixWorld(),r=!!o}else if(this.object.isOrthographicCamera){let a=new P(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=o!==this.object.zoom;let l=new P(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),s=Dt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;if(s!==null)if(this.screenSpacePanning)this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(s).add(this.object.position);else if(Nl.origin.copy(this.object.position),Nl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Nl.direction))<CA)this.object.lookAt(this.target);else J0.setFromNormalAndCoplanarPoint(this.object.up,this.target),Nl.intersectPlane(J0,this.target)}else if(this.object.isOrthographicCamera){let s=this.object.zoom;if(this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),s!==this.object.zoom)this.object.updateProjectionMatrix(),r=!0}if(this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>ef||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ef||this._lastTargetPosition.distanceToSquared(this.target)>ef)return this.dispatchEvent(K0),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0;return!1}_getAutoRotationAngle(e){if(e!==null)return on/60*this.autoRotateSpeed*e;else return on/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*0.01);return Math.pow(0.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Dt.setFromMatrixColumn(t,0),Dt.multiplyScalar(-e),this._panOffset.add(Dt)}_panUp(e,t){if(this.screenSpacePanning===!0)Dt.setFromMatrixColumn(t,1);else Dt.setFromMatrixColumn(t,0),Dt.crossVectors(this.object.up,Dt);Dt.multiplyScalar(e),this._panOffset.add(Dt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let i=this.object.position;Dt.copy(i).sub(this.target);let r=Dt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else if(this.object.isOrthographicCamera)this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix);else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1}_dollyOut(e){if(this.object.isPerspectiveCamera||this.object.isOrthographicCamera)this._scale/=e;else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1}_dollyIn(e){if(this.object.isPerspectiveCamera||this.object.isOrthographicCamera)this._scale*=e;else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),i=e-n.left,r=t-n.top,{width:s,height:a}=n;this._mouse.x=i/s*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(on*this._rotateDelta.x/t.clientHeight),this._rotateUp(on*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){if(this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0)this._dollyOut(this._getZoomScale(this._dollyDelta.y));else if(this._dollyDelta.y<0)this._dollyIn(this._getZoomScale(this._dollyDelta.y));this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){if(this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0)this._dollyIn(this._getZoomScale(e.deltaY));else if(e.deltaY>0)this._dollyOut(this._getZoomScale(e.deltaY));this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate)this._rotateUp(on*this.keyRotateSpeed/this.domElement.clientHeight)}else if(this.enablePan)this._pan(0,this.keyPanSpeed);t=!0;break;case this.keys.BOTTOM:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate)this._rotateUp(-on*this.keyRotateSpeed/this.domElement.clientHeight)}else if(this.enablePan)this._pan(0,-this.keyPanSpeed);t=!0;break;case this.keys.LEFT:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate)this._rotateLeft(on*this.keyRotateSpeed/this.domElement.clientHeight)}else if(this.enablePan)this._pan(this.keyPanSpeed,0);t=!0;break;case this.keys.RIGHT:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate)this._rotateLeft(-on*this.keyRotateSpeed/this.domElement.clientHeight)}else if(this.enablePan)this._pan(-this.keyPanSpeed,0);t=!0;break}if(t)e.preventDefault(),this.update()}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=0.5*(e.pageX+t.x),i=0.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=0.5*(e.pageX+t.x),i=0.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){if(this.enableZoom)this._handleTouchStartDolly(e);if(this.enablePan)this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){if(this.enableZoom)this._handleTouchStartDolly(e);if(this.enableRotate)this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),i=0.5*(e.pageX+n.x),r=0.5*(e.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(on*this._rotateDelta.x/t.clientHeight),this._rotateUp(on*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=0.5*(e.pageX+t.x),i=0.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let s=(e.pageX+t.x)*0.5,a=(e.pageY+t.y)*0.5;this._updateZoomParameters(s,a)}_handleTouchMoveDollyPan(e){if(this.enableZoom)this._handleTouchMoveDolly(e);if(this.enablePan)this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){if(this.enableZoom)this._handleTouchMoveDolly(e);if(this.enableRotate)this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];if(t===void 0)t=new re,this._pointerPositions[e.pointerId]=t;t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}if(e.ctrlKey&&!this._controlActive)n.deltaY*=10;return n}}function RA(e){if(this.enabled===!1)return;if(this._pointers.length===0)this.domElement.setPointerCapture(e.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp);if(this._isTrackingPointer(e))return;if(this._addPointer(e),e.pointerType==="touch")this._onTouchStart(e);else this._onMouseDown(e)}function PA(e){if(this.enabled===!1)return;if(e.pointerType==="touch")this._onTouchMove(e);else this._onMouseMove(e)}function IA(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Q0),this.state=ht.NONE;break;case 1:let t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y});break}}function LA(e){let t;switch(e.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Mi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=ht.DOLLY;break;case Mi.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=ht.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=ht.ROTATE}break;case Mi.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=ht.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=ht.PAN}break;default:this.state=ht.NONE}if(this.state!==ht.NONE)this.dispatchEvent(tf)}function DA(e){switch(this.state){case ht.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case ht.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case ht.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e);break}}function kA(e){if(this.enabled===!1||this.enableZoom===!1||this.state!==ht.NONE)return;e.preventDefault(),this.dispatchEvent(tf),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(Q0)}function NA(e){if(this.enabled===!1)return;this._handleKeyDown(e)}function UA(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case Ei.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=ht.TOUCH_ROTATE;break;case Ei.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=ht.TOUCH_PAN;break;default:this.state=ht.NONE}break;case 2:switch(this.touches.TWO){case Ei.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=ht.TOUCH_DOLLY_PAN;break;case Ei.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=ht.TOUCH_DOLLY_ROTATE;break;default:this.state=ht.NONE}break;default:this.state=ht.NONE}if(this.state!==ht.NONE)this.dispatchEvent(tf)}function FA(e){switch(this._trackPointer(e),this.state){case ht.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case ht.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case ht.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case ht.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=ht.NONE}}function OA(e){if(this.enabled===!1)return;e.preventDefault()}function BA(e){if(e.key==="Control")this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0})}function zA(e){if(e.key==="Control")this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0})}class rf extends Ki{constructor(){super();let e=new wt;e.deleteAttribute("uv");let t=new Yt({side:Jt}),n=new Yt,i=new El(16777215,900,28,2);i.position.set(0.418,16.199,0.3),this.add(i);let r=new Ze(e,t);r.position.set(-0.757,13.219,0.717),r.scale.set(31.713,28.305,28.591),this.add(r);let s=new er(e,n,6),a=new yt;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-0.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),s.setMatrixAt(0,a.matrix),a.position.set(-5.607,-0.754,-0.758),a.rotation.set(0,0.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),s.setMatrixAt(1,a.matrix),a.position.set(6.167,0.857,7.803),a.rotation.set(0,0.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),s.setMatrixAt(2,a.matrix),a.position.set(-2.017,0.018,6.124),a.rotation.set(0,0.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),s.setMatrixAt(3,a.matrix),a.position.set(2.291,-0.756,-2.621),a.rotation.set(0,-0.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),s.setMatrixAt(4,a.matrix),a.position.set(-2.193,-0.369,-5.547),a.rotation.set(0,0.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),s.setMatrixAt(5,a.matrix),this.add(s);let o=new Ze(e,rs(50));o.position.set(-16.116,14.37,8.208),o.scale.set(0.1,2.428,2.739),this.add(o);let l=new Ze(e,rs(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(0.1,2.425,2.751),this.add(l);let c=new Ze(e,rs(17));c.position.set(14.904,12.198,-1.832),c.scale.set(0.15,4.265,6.331),this.add(c);let d=new Ze(e,rs(43));d.position.set(-0.462,8.89,14.52),d.scale.set(4.38,5.441,0.088),this.add(d);let h=new Ze(e,rs(20));h.position.set(3.235,11.486,-12.541),h.scale.set(2.5,2,0.1),this.add(h);let u=new Ze(e,rs(100));u.position.set(0,20,0),u.scale.set(1,0.1,1),this.add(u)}dispose(){let e=new Set;this.traverse((t)=>{if(t.isMesh)e.add(t.geometry),e.add(t.material)});for(let t of e)t.dispose()}}function rs(e){return new Sl({color:0,emissive:16777215,emissiveIntensity:e})}var ev=new an,Ul=new P;class _a extends Tl{constructor(){super();this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new Qe(e,3)),this.setAttribute("uv",new Qe(t,2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;if(t!==void 0)t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this}setPositions(e){let t;if(e instanceof Float32Array)t=e;else if(Array.isArray(e))t=new Float32Array(e);let n=new ar(t,6,1);return this.setAttribute("instanceStart",new xn(n,3,0)),this.setAttribute("instanceEnd",new xn(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;if(e instanceof Float32Array)t=e;else if(Array.isArray(e))t=new Float32Array(e);let n=new ar(t,6,1);return this.setAttribute("instanceColorStart",new xn(n,3,0)),this.setAttribute("instanceColorEnd",new xn(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new _l(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new an;let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0)this.boundingBox.setFromBufferAttribute(e),ev.setFromBufferAttribute(t),this.boundingBox.union(ev)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new On;if(this.boundingBox===null)this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let r=0,s=e.count;r<s;r++)Ul.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Ul)),Ul.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ul));if(this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius))console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}be.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new re(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};tn.line={uniforms:Ut.merge([be.common,be.fog,be.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class fi extends ot{constructor(e){super({type:"LineMaterial",uniforms:Ut.clone(tn.line.uniforms),vertexShader:tn.line.vertexShader,fragmentShader:tn.line.fragmentShader,clipping:!0});this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){if(e===!0)this.defines.WORLD_UNITS="";else delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){if(!this.uniforms.linewidth)return;this.uniforms.linewidth.value=e}get dashed(){return"USE_DASH"in this.defines}set dashed(e){if(e===!0!==this.dashed)this.needsUpdate=!0;if(e===!0)this.defines.USE_DASH="";else delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){if(!this.uniforms)return;this.uniforms.opacity.value=e}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){if(!this.defines)return;if(e===!0!==this.alphaToCoverage)this.needsUpdate=!0;if(e===!0)this.defines.USE_ALPHA_TO_COVERAGE="";else delete this.defines.USE_ALPHA_TO_COVERAGE}}var sf=new it,tv=new P,nv=new P,zt=new it,Ht=new it,Zn=new it,af=new P,of=new et,Gt=new Rl,iv=new P,Fl=new an,Ol=new On,Kn=new it,Jn,hr;function rv(e,t,n){return Kn.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),Kn.multiplyScalar(1/Kn.w),Kn.x=hr/n.width,Kn.y=hr/n.height,Kn.applyMatrix4(e.projectionMatrixInverse),Kn.multiplyScalar(1/Kn.w),Math.abs(Math.max(Kn.x,Kn.y))}function HA(e,t){let{matrixWorld:n,geometry:i}=e,r=i.attributes.instanceStart,s=i.attributes.instanceEnd,a=Math.min(i.instanceCount,r.count);for(let o=0,l=a;o<l;o++){Gt.start.fromBufferAttribute(r,o),Gt.end.fromBufferAttribute(s,o),Gt.applyMatrix4(n);let c=new P,d=new P;if(Jn.distanceSqToSegment(Gt.start,Gt.end,d,c),d.distanceTo(c)<hr*0.5)t.push({point:d,pointOnLine:c,distance:Jn.origin.distanceTo(d),object:e,face:null,faceIndex:o,uv:null,uv1:null})}}function GA(e,t,n){let i=t.projectionMatrix,s=e.material.resolution,{matrixWorld:a,geometry:o}=e,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,d=Math.min(o.instanceCount,l.count),h=-t.near;Jn.at(1,Zn),Zn.w=1,Zn.applyMatrix4(t.matrixWorldInverse),Zn.applyMatrix4(i),Zn.multiplyScalar(1/Zn.w),Zn.x*=s.x/2,Zn.y*=s.y/2,Zn.z=0,af.copy(Zn),of.multiplyMatrices(t.matrixWorldInverse,a);for(let u=0,p=d;u<p;u++){if(zt.fromBufferAttribute(l,u),Ht.fromBufferAttribute(c,u),zt.w=1,Ht.w=1,zt.applyMatrix4(of),Ht.applyMatrix4(of),zt.z>h&&Ht.z>h)continue;if(zt.z>h){let v=zt.z-Ht.z,S=(zt.z-h)/v;zt.lerp(Ht,S)}else if(Ht.z>h){let v=Ht.z-zt.z,S=(Ht.z-h)/v;Ht.lerp(zt,S)}zt.applyMatrix4(i),Ht.applyMatrix4(i),zt.multiplyScalar(1/zt.w),Ht.multiplyScalar(1/Ht.w),zt.x*=s.x/2,zt.y*=s.y/2,Ht.x*=s.x/2,Ht.y*=s.y/2,Gt.start.copy(zt),Gt.start.z=0,Gt.end.copy(Ht),Gt.end.z=0;let x=Gt.closestPointToPointParameter(af,!0);Gt.at(x,iv);let m=ta.lerp(zt.z,Ht.z,x),f=m>=-1&&m<=1,w=af.distanceTo(iv)<hr*0.5;if(f&&w){Gt.start.fromBufferAttribute(l,u),Gt.end.fromBufferAttribute(c,u),Gt.start.applyMatrix4(a),Gt.end.applyMatrix4(a);let v=new P,S=new P;Jn.distanceSqToSegment(Gt.start,Gt.end,S,v),n.push({point:S,pointOnLine:v,distance:Jn.origin.distanceTo(S),object:e,face:null,faceIndex:u,uv:null,uv1:null})}}}class lf extends Ze{constructor(e=new _a,t=new fi({color:Math.random()*16777215})){super(e,t);this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let s=0,a=0,o=t.count;s<o;s++,a+=2)tv.fromBufferAttribute(t,s),nv.fromBufferAttribute(n,s),i[a]=a===0?0:i[a-1],i[a+1]=i[a]+tv.distanceTo(nv);let r=new ar(i,2,1);return e.setAttribute("instanceDistanceStart",new xn(r,1,0)),e.setAttribute("instanceDistanceEnd",new xn(r,1,1)),this}raycast(e,t){let n=this.material.worldUnits,i=e.camera;if(i===null&&!n)console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let r=e.params.Line2!==void 0?e.params.Line2.threshold||0:0;Jn=e.ray;let s=this.matrixWorld,a=this.geometry,o=this.material;if(hr=o.linewidth+r,a.boundingSphere===null)a.computeBoundingSphere();Ol.copy(a.boundingSphere).applyMatrix4(s);let l;if(n)l=hr*0.5;else{let d=Math.max(i.near,Ol.distanceToPoint(Jn.origin));l=rv(i,d,o.resolution)}if(Ol.radius+=l,Jn.intersectsSphere(Ol)===!1)return;if(a.boundingBox===null)a.computeBoundingBox();Fl.copy(a.boundingBox).applyMatrix4(s);let c;if(n)c=hr*0.5;else{let d=Math.max(i.near,Fl.distanceToPoint(Jn.origin));c=rv(i,d,o.resolution)}if(Fl.expandByScalar(c),Jn.intersectsBox(Fl)===!1)return;if(n)HA(this,t);else GA(this,i,t)}onBeforeRender(e){let t=this.material.uniforms;if(t&&t.resolution)e.getViewport(sf),this.material.uniforms.resolution.value.set(sf.z,sf.w)}}class ur extends _a{constructor(){super();this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e){let t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setColors(n),this}setFromPoints(e){let t=e.length-1,n=new Float32Array(6*t);for(let i=0;i<t;i++)n[6*i]=e[i].x,n[6*i+1]=e[i].y,n[6*i+2]=e[i].z||0,n[6*i+3]=e[i+1].x,n[6*i+4]=e[i+1].y,n[6*i+5]=e[i+1].z||0;return super.setPositions(n),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class ya extends lf{constructor(e=new ur,t=new fi({color:Math.random()*16777215})){super(e,t);this.isLine2=!0,this.type="Line2"}}var Qn={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class ln{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}var VA=new es(-1,1,1,-1,0,1);class sv extends Tt{constructor(){super();this.setAttribute("position",new Qe([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Qe([0,2,0,0,2,0],2))}}var WA=new sv;class pi{constructor(e){this._mesh=new Ze(WA,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,VA)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class ba extends ln{constructor(e,t="tDiffuse"){super();if(this.textureID=t,this.uniforms=null,this.material=null,e instanceof ot)this.uniforms=e.uniforms,this.material=e;else if(e)this.uniforms=Ut.clone(e.uniforms),this.material=new ot({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader});this._fsQuad=new pi(this.material)}render(e,t,n){if(this.uniforms[this.textureID])this.uniforms[this.textureID].value=n.texture;if(this._fsQuad.material=this.material,this.renderToScreen)e.setRenderTarget(null),this._fsQuad.render(e);else{if(e.setRenderTarget(t),this.clear)e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil);this._fsQuad.render(e)}}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Bl extends ln{constructor(e,t){super();this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let s,a;if(this.inverse)s=0,a=1;else s=1,a=0;if(r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,s,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear)e.clear();if(e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear)e.clear();e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class cf extends ln{constructor(){super();this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class zl{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new re);this._width=n.width,this._height=n.height,t=new Et(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Bt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ba(Qn),this.copyPass.material.blending=Rt,this.clock=new Al}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);if(t!==-1)this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){if(e===void 0)e=this.clock.getDelta();let t=this.renderer.getRenderTarget(),n=!1;for(let i=0,r=this.passes.length;i<r;i++){let s=this.passes[i];if(s.enabled===!1)continue;if(s.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),s.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),s.needsSwap){if(n){let a=this.renderer.getContext(),o=this.renderer.state.buffers.stencil;o.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),o.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}if(Bl!==void 0){if(s instanceof Bl)n=!0;else if(s instanceof cf)n=!1}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new re);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}var Sa={name:"GTAOShader",defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new re},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new et},cameraProjectionMatrixInverse:{value:new et},cameraWorldMatrix:{value:new et},radius:{value:0.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new P(-1,-1,-1)},sceneBoxMax:{value:new P(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif

		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}

		void main() {
			float depth = getDepth(vUv.xy);
			if (depth >= 1.0) {
				discard;
				return;
			}
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {

				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w);
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));

				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));

				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},wa={name:"GTAODepthShader",defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},Hl={name:"GTAOBlendShader",uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function av(e=5){let t=Math.floor(e)%2===0?Math.floor(e)+1:Math.floor(e),n=$A(t),i=n.length,r=new Uint8Array(i*4);for(let a=0;a<i;++a){let o=n[a],l=2*Math.PI*o/i,c=new P(Math.cos(l),Math.sin(l),0).normalize();r[a*4]=(c.x*0.5+0.5)*255,r[a*4+1]=(c.y*0.5+0.5)*255,r[a*4+2]=127,r[a*4+3]=255}let s=new Qi(r,t,t);return s.wrapS=qn,s.wrapT=qn,s.needsUpdate=!0,s}function $A(e){let t=Math.floor(e)%2===0?Math.floor(e)+1:Math.floor(e),n=t*t,i=Array(n).fill(0),r=Math.floor(t/2),s=t-1;for(let a=1;a<=n;){if(r===-1&&s===t)s=t-2,r=0;else{if(s===t)s=0;if(r<0)r=t-1}if(i[r*t+s]!==0){s-=2,r++;continue}else i[r*t+s]=a++;s++,r--}return i}var Ma={name:"PoissonDenoiseShader",defines:{SAMPLES:16,SAMPLE_VECTORS:df(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new re},cameraProjectionMatrixInverse:{value:new et},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;

		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);

			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;

			denoised += w * neighborColor;
			totalWeight += w;
		}

		void main() {
			float depth = getDepth(vUv.xy);
			vec3 viewNormal = getViewNormal(vUv);
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);

			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}

			if (totalWeight > 0.) {
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function df(e,t,n){let i=qA(e,t,n),r="vec3[SAMPLES](";for(let s=0;s<e;s++){let a=i[s];r+=`vec3(${a.x}, ${a.y}, ${a.z})${s<e-1?",":")"}`}return r}function qA(e,t,n){let i=[];for(let r=0;r<e;r++){let s=2*Math.PI*t*r/e,a=Math.pow(r/(e-1),n);i.push(new P(Math.cos(s),Math.sin(s),a))}return i}class hf{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let n,i,r,s=0.5*(Math.sqrt(3)-1),a=(e+t)*s,o=Math.floor(e+a),l=Math.floor(t+a),c=(3-Math.sqrt(3))/6,d=(o+l)*c,h=o-d,u=l-d,p=e-h,g=t-u,x,m;if(p>g)x=1,m=0;else x=0,m=1;let f=p-x+c,w=g-m+c,v=p-1+2*c,S=g-1+2*c,R=o&255,T=l&255,E=this.perm[R+this.perm[T]]%12,D=this.perm[R+x+this.perm[T+m]]%12,y=this.perm[R+1+this.perm[T+1]]%12,_=0.5-p*p-g*g;if(_<0)n=0;else _*=_,n=_*_*this._dot(this.grad3[E],p,g);let A=0.5-f*f-w*w;if(A<0)i=0;else A*=A,i=A*A*this._dot(this.grad3[D],f,w);let F=0.5-v*v-S*S;if(F<0)r=0;else F*=F,r=F*F*this._dot(this.grad3[y],v,S);return 70*(n+i+r)}noise3d(e,t,n){let i,r,s,a,o=0.3333333333333333,l=(e+t+n)*0.3333333333333333,c=Math.floor(e+l),d=Math.floor(t+l),h=Math.floor(n+l),u=0.16666666666666666,p=(c+d+h)*0.16666666666666666,g=c-p,x=d-p,m=h-p,f=e-g,w=t-x,v=n-m,S,R,T,E,D,y;if(f>=w)if(w>=v)S=1,R=0,T=0,E=1,D=1,y=0;else if(f>=v)S=1,R=0,T=0,E=1,D=0,y=1;else S=0,R=0,T=1,E=1,D=0,y=1;else if(w<v)S=0,R=0,T=1,E=0,D=1,y=1;else if(f<v)S=0,R=1,T=0,E=0,D=1,y=1;else S=0,R=1,T=0,E=1,D=1,y=0;let _=f-S+0.16666666666666666,A=w-R+0.16666666666666666,F=v-T+0.16666666666666666,q=f-E+0.3333333333333333,B=w-D+0.3333333333333333,ee=v-y+0.3333333333333333,j=f-1+0.5,ae=w-1+0.5,W=v-1+0.5,me=c&255,fe=d&255,Ae=h&255,Se=this.perm[me+this.perm[fe+this.perm[Ae]]]%12,N=this.perm[me+S+this.perm[fe+R+this.perm[Ae+T]]]%12,ne=this.perm[me+E+this.perm[fe+D+this.perm[Ae+y]]]%12,Y=this.perm[me+1+this.perm[fe+1+this.perm[Ae+1]]]%12,le=0.6-f*f-w*w-v*v;if(le<0)i=0;else le*=le,i=le*le*this._dot3(this.grad3[Se],f,w,v);let pe=0.6-_*_-A*A-F*F;if(pe<0)r=0;else pe*=pe,r=pe*pe*this._dot3(this.grad3[N],_,A,F);let L=0.6-q*q-B*B-ee*ee;if(L<0)s=0;else L*=L,s=L*L*this._dot3(this.grad3[ne],q,B,ee);let X=0.6-j*j-ae*ae-W*W;if(X<0)a=0;else X*=X,a=X*X*this._dot3(this.grad3[Y],j,ae,W);return 32*(i+r+s+a)}noise4d(e,t,n,i){let r=this.grad4,s=this.simplex,a=this.perm,o=(Math.sqrt(5)-1)/4,l=(5-Math.sqrt(5))/20,c,d,h,u,p,g=(e+t+n+i)*o,x=Math.floor(e+g),m=Math.floor(t+g),f=Math.floor(n+g),w=Math.floor(i+g),v=(x+m+f+w)*l,S=x-v,R=m-v,T=f-v,E=w-v,D=e-S,y=t-R,_=n-T,A=i-E,F=D>y?32:0,q=D>_?16:0,B=y>_?8:0,ee=D>A?4:0,j=y>A?2:0,ae=_>A?1:0,W=F+q+B+ee+j+ae,me=s[W][0]>=3?1:0,fe=s[W][1]>=3?1:0,Ae=s[W][2]>=3?1:0,Se=s[W][3]>=3?1:0,N=s[W][0]>=2?1:0,ne=s[W][1]>=2?1:0,Y=s[W][2]>=2?1:0,le=s[W][3]>=2?1:0,pe=s[W][0]>=1?1:0,L=s[W][1]>=1?1:0,X=s[W][2]>=1?1:0,ie=s[W][3]>=1?1:0,Pe=D-me+l,I=y-fe+l,oe=_-Ae+l,J=A-Se+l,U=D-N+2*l,H=y-ne+2*l,he=_-Y+2*l,Z=A-le+2*l,V=D-pe+3*l,ce=y-L+3*l,Le=_-X+3*l,ze=A-ie+3*l,C=D-1+4*l,b=y-1+4*l,O=_-1+4*l,se=A-1+4*l,de=x&255,te=m&255,ye=f&255,_e=w&255,Ie=a[de+a[te+a[ye+a[_e]]]]%32,Ge=a[de+me+a[te+fe+a[ye+Ae+a[_e+Se]]]]%32,xe=a[de+N+a[te+ne+a[ye+Y+a[_e+le]]]]%32,Te=a[de+pe+a[te+L+a[ye+X+a[_e+ie]]]]%32,Be=a[de+1+a[te+1+a[ye+1+a[_e+1]]]]%32,Ue=0.6-D*D-y*y-_*_-A*A;if(Ue<0)c=0;else Ue*=Ue,c=Ue*Ue*this._dot4(r[Ie],D,y,_,A);let Ee=0.6-Pe*Pe-I*I-oe*oe-J*J;if(Ee<0)d=0;else Ee*=Ee,d=Ee*Ee*this._dot4(r[Ge],Pe,I,oe,J);let Ye=0.6-U*U-H*H-he*he-Z*Z;if(Ye<0)h=0;else Ye*=Ye,h=Ye*Ye*this._dot4(r[xe],U,H,he,Z);let k=0.6-V*V-ce*ce-Le*Le-ze*ze;if(k<0)u=0;else k*=k,u=k*k*this._dot4(r[Te],V,ce,Le,ze);let we=0.6-C*C-b*b-O*O-se*se;if(we<0)p=0;else we*=we,p=we*we*this._dot4(r[Be],C,b,O,se);return 27*(c+d+h+u+p)}_dot(e,t,n){return e[0]*t+e[1]*n}_dot3(e,t,n,i){return e[0]*t+e[1]*n+e[2]*i}_dot4(e,t,n,i,r){return e[0]*t+e[1]*n+e[2]*i+e[3]*r}}class Bn extends ln{constructor(e,t,n=512,i=512,r,s,a){super();if(this.width=n,this.height=i,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=av(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new Et(this.width,this.height,{type:Bt}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new ot({defines:Object.assign({},Sa.defines),uniforms:Ut.clone(Sa.uniforms),vertexShader:Sa.vertexShader,fragmentShader:Sa.fragmentShader,blending:Rt,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new bl,this.normalMaterial.blending=Rt,this.pdMaterial=new ot({defines:Object.assign({},Ma.defines),uniforms:Ut.clone(Ma.uniforms),vertexShader:Ma.vertexShader,fragmentShader:Ma.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new ot({defines:Object.assign({},wa.defines),uniforms:Ut.clone(wa.uniforms),vertexShader:wa.vertexShader,fragmentShader:wa.fragmentShader,blending:Rt}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new ot({uniforms:Ut.clone(Qn.uniforms),vertexShader:Qn.vertexShader,fragmentShader:Qn.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:js,blendDst:Wi,blendEquation:Un,blendSrcAlpha:Ys,blendDstAlpha:Wi,blendEquationAlpha:Un}),this.blendMaterial=new ot({uniforms:Ut.clone(Hl.uniforms),vertexShader:Hl.vertexShader,fragmentShader:Hl.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:Bo,blendSrc:js,blendDst:Wi,blendEquation:Un,blendSrcAlpha:Ys,blendDstAlpha:Wi,blendEquationAlpha:Un}),this._fsQuad=new pi(null),this._originalClearColor=new Ne,this.setGBuffer(r?r.depthTexture:void 0,r?r.normalTexture:void 0),s!==void 0)this.updateGtaoMaterial(s);if(a!==void 0)this.updatePdMaterial(a)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){if(e!==void 0)this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1;else this.depthTexture=new Jr,this.depthTexture.format=qi,this.depthTexture.type=Ci,this.normalRenderTarget=new Et(this.width,this.height,{minFilter:li,magFilter:li,type:Bt,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0;let n=this.normalTexture?1:0,i=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=i,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=i,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){if(e)this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max);else this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0}updateGtaoMaterial(e){if(e.radius!==void 0)this.gtaoMaterial.uniforms.radius.value=e.radius;if(e.distanceExponent!==void 0)this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent;if(e.thickness!==void 0)this.gtaoMaterial.uniforms.thickness.value=e.thickness;if(e.distanceFallOff!==void 0)this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0;if(e.scale!==void 0)this.gtaoMaterial.uniforms.scale.value=e.scale;if(e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES)this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0;if(e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS)this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0}updatePdMaterial(e){let t=!1;if(e.lumaPhi!==void 0)this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi;if(e.depthPhi!==void 0)this.pdMaterial.uniforms.depthPhi.value=e.depthPhi;if(e.normalPhi!==void 0)this.pdMaterial.uniforms.normalPhi.value=e.normalPhi;if(e.radius!==void 0&&e.radius!==this.radius)this.pdMaterial.uniforms.radius.value=e.radius;if(e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent)this.pdRadiusExponent=e.radiusExponent,t=!0;if(e.rings!==void 0&&e.rings!==this.pdRings)this.pdRings=e.rings,t=!0;if(e.samples!==void 0&&e.samples!==this.pdSamples)this.pdSamples=e.samples,t=!0;if(t)this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=df(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0}render(e,t,n){if(this._renderGBuffer)this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility();switch(this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case Bn.OUTPUT.Off:break;case Bn.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=Rt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Bn.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=Rt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Bn.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=Rt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Bn.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case Bn.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=Rt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Bn.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=Rt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(e,t,n,i,r){e.getClearColor(this._originalClearColor);let s=e.getClearAlpha(),a=e.autoClear;if(e.setRenderTarget(n),e.autoClear=!1,i!==void 0&&i!==null)e.setClearColor(i),e.setClearAlpha(r||0),e.clear();this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=a,e.setClearColor(this._originalClearColor),e.setClearAlpha(s)}_renderOverride(e,t,n,i,r){e.getClearColor(this._originalClearColor);let s=e.getClearAlpha(),a=e.autoClear;if(e.setRenderTarget(n),e.autoClear=!1,i=t.clearColor||i,r=t.clearAlpha||r,i!==void 0&&i!==null)e.setClearColor(i),e.setClearAlpha(r||0),e.clear();this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=a,e.setClearColor(this._originalClearColor),e.setClearAlpha(s)}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(n){if((n.isPoints||n.isLine||n.isLine2)&&n.visible)n.visible=!1,t.push(n)})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){let t=new hf,n=e*e*4,i=new Uint8Array(n);for(let s=0;s<e;s++)for(let a=0;a<e;a++){let o=s,l=a;i[(s*e+a)*4]=(t.noise(o,l)*0.5+0.5)*255,i[(s*e+a)*4+1]=(t.noise(o+e,l)*0.5+0.5)*255,i[(s*e+a)*4+2]=(t.noise(o,l+e)*0.5+0.5)*255,i[(s*e+a)*4+3]=(t.noise(o+e,l+e)*0.5+0.5)*255}let r=new Qi(i,e,e,An,Xn);return r.wrapS=qn,r.wrapT=qn,r.needsUpdate=!0,r}}Bn.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var Ea={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class uf extends ln{constructor(){super();this.uniforms=Ut.clone(Ea.uniforms),this.material=new yl({name:Ea.name,uniforms:this.uniforms,vertexShader:Ea.vertexShader,fragmentShader:Ea.fragmentShader}),this._fsQuad=new pi(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){if(this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping){if(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},nt.getTransfer(this._outputColorSpace)===dt)this.material.defines.SRGB_TRANSFER="";if(this._toneMapping===Xo)this.material.defines.LINEAR_TONE_MAPPING="";else if(this._toneMapping===Yo)this.material.defines.REINHARD_TONE_MAPPING="";else if(this._toneMapping===jo)this.material.defines.CINEON_TONE_MAPPING="";else if(this._toneMapping===Yr)this.material.defines.ACES_FILMIC_TONE_MAPPING="";else if(this._toneMapping===Ko)this.material.defines.AGX_TONE_MAPPING="";else if(this._toneMapping===Jo)this.material.defines.NEUTRAL_TONE_MAPPING="";else if(this._toneMapping===Zo)this.material.defines.CUSTOM_TONE_MAPPING="";this.material.needsUpdate=!0}if(this.renderToScreen===!0)e.setRenderTarget(null),this._fsQuad.render(e);else{if(e.setRenderTarget(t),this.clear)e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil);this._fsQuad.render(e)}}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Gl extends ln{constructor(e,t,n=null,i=null,r=null){super();this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ne}render(e,t,n){let i=e.autoClear;e.autoClear=!1;let r,s;if(this.overrideMaterial!==null)s=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial;if(this.clearColor!==null)e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha());if(this.clearAlpha!==null)r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha);if(this.clearDepth==!0)e.clearDepth();if(e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0)e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil);if(e.render(this.scene,this.camera),this.clearColor!==null)e.setClearColor(this._oldClearColor);if(this.clearAlpha!==null)e.setClearAlpha(r);if(this.overrideMaterial!==null)this.scene.overrideMaterial=s;e.autoClear=i}}var ov={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ne(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class fr extends ln{constructor(e,t=1,n,i){super();this.strength=t,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new re(e.x,e.y):new re(256,256),this.clearColor=new Ne(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new Et(r,s,{type:Bt}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let c=0;c<this.nMips;c++){let d=new Et(r,s,{type:Bt});d.texture.name="UnrealBloomPass.h"+c,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let h=new Et(r,s,{type:Bt});h.texture.name="UnrealBloomPass.v"+c,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),r=Math.round(r/2),s=Math.round(s/2)}let a=ov;this.highPassUniforms=Ut.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=0.01,this.materialHighPassFilter=new ot({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];let o=[3,5,7,9,11];r=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let c=0;c<this.nMips;c++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(o[c])),this.separableBlurMaterials[c].uniforms.invSize.value=new re(1/r,1/s),r=Math.round(r/2),s=Math.round(s/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=0.1;let l=[1,0.8,0.6,0.4,0.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Ut.clone(Qn.uniforms),this.blendMaterial=new ot({uniforms:this.copyUniforms,vertexShader:Qn.vertexShader,fragmentShader:Qn.fragmentShader,blending:Xs,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ne,this._oldClearAlpha=1,this._basic=new en,this._fsQuad=new pi(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new re(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let s=e.autoClear;if(e.autoClear=!1,e.setClearColor(this.clearColor,0),r)e.state.buffers.stencil.setTest(!1);if(this.renderToScreen)this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e);this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let a=this.renderTargetBright;for(let o=0;o<this.nMips;o++)this._fsQuad.material=this.separableBlurMaterials[o],this.separableBlurMaterials[o].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[o].uniforms.direction.value=fr.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[o]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[o].uniforms.colorTexture.value=this.renderTargetsHorizontal[o].texture,this.separableBlurMaterials[o].uniforms.direction.value=fr.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[o]),e.clear(),this._fsQuad.render(e),a=this.renderTargetsVertical[o];if(this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r)e.state.buffers.stencil.setTest(!0);if(this.renderToScreen)e.setRenderTarget(null),this._fsQuad.render(e);else e.setRenderTarget(n),this._fsQuad.render(e);e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=s}_getSeparableBlurMaterial(e){let t=[];for(let n=0;n<e;n++)t.push(0.39894*Math.exp(-0.5*n*n/(e*e))/e);return new ot({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new re(0.5,0.5)},direction:{value:new re(0.5,0.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(e){return new ot({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}fr.BlurDirectionX=new re(1,0);fr.BlurDirectionY=new re(0,1);var Vl=3,Wl=0.0085;function ss(e,t){let n=document.createElement("canvas");n.width=Math.ceil(e*Vl),n.height=Math.ceil(t*Vl);let i=n.getContext("2d");return i.scale(Vl,Vl),{canvas:n,ctx:i}}function Ta(e,t,n){let i=new tr(e);return i.colorSpace=Yi,i.minFilter=Ti,i.magFilter=ci,i.anisotropy=4,{texture:i,width:t,height:n}}var ff=null;function as(e,t){return ff??=document.createElement("canvas").getContext("2d"),ff.font=t,ff.measureText(e).width}function lv(e,t,n){if(as(e,t)<=n)return e;let i=e;while(i.length>1&&as(`${i}…`,t)>n)i=i.slice(0,-1);return`${i.trimEnd()}…`}function XA(e,t,n){let i=[],r="";for(let s of e.split(/\s+/)){let a=r?`${r} ${s}`:s;if(r&&as(a,t)>n)i.push(r),r=s;else r=a}if(r)i.push(r);return i}function pf(e,t){let n=parseInt(e.slice(1),16);return`rgba(${n>>16&255}, ${n>>8&255}, ${n&255}, ${t})`}function cv(e,t,n,i){let r=`600 13.5px ${e.font}`,s=lv(n,r,190),a=4,o=37+as(s,r)+12,l=34,c=o+8,d=42,{canvas:h,ctx:u}=ss(c,42);return u.shadowColor="rgba(0, 0, 0, 0.28)",u.shadowBlur=4,u.shadowOffsetY=1,u.fillStyle=e.chip,u.beginPath(),u.roundRect(4,4,o,34,10),u.fill(),u.shadowColor="transparent",u.strokeStyle=e.chipBorder,u.lineWidth=1,u.stroke(),u.fillStyle=pf(i,0.2),u.beginPath(),u.roundRect(9,9,24,24,7),u.fill(),u.save(),u.translate(13.5,13.5),u.scale(0.625,0.625),Tg(u,t,i,2.3),u.restore(),u.fillStyle=e.text,u.font=r,u.textBaseline="middle",u.fillText(s,41,21.5),Ta(h,c,42)}function dv(e,t,n){let i=`500 12.5px ${e.font}`,r=XA(t,i,216),s=17,a=Math.max(...r.map((w)=>as(w,i))),o=5,l=7,c=a+13+12+4,d=r.length*17+15,h=c+10,u=d+10+7,{canvas:p,ctx:g}=ss(h,u),x=e.name==="dark",m=x?"#f4f5f8":"#1b1d23",f=x?"#14161b":"#f6f6f4";return g.shadowColor="rgba(0, 0, 0, 0.3)",g.shadowBlur=5,g.shadowOffsetY=1.5,g.fillStyle=m,g.beginPath(),g.roundRect(5,5,c,d,9),g.fill(),g.beginPath(),g.moveTo(h/2-7,5+d-0.5),g.lineTo(h/2,5+d+7),g.lineTo(h/2+7,5+d-0.5),g.closePath(),g.fill(),g.shadowColor="transparent",g.fillStyle=n,g.beginPath(),g.roundRect(12,13,3,d-16,1.5),g.fill(),g.fillStyle=f,g.font=i,g.textBaseline="alphabetic",r.forEach((w,v)=>g.fillText(w,22,25+v*17)),Ta(p,h,u)}function hv(e,t){let n=`500 11px ${e.font}`,i=lv(t,n,200),r=as(i,n)+18,s=22,{canvas:a,ctx:o}=ss(r,22);return o.fillStyle=pf(e.chip,0.92),o.beginPath(),o.roundRect(1,1,r-2,20,10),o.fill(),o.strokeStyle=pf(e.chipBorder,0.9),o.lineWidth=1,o.stroke(),o.fillStyle=e.textMuted,o.font=n,o.textBaseline="middle",o.fillText(i,9,11.5),Ta(a,r,22)}function uv(e,t){let n=`700 13px ${e.font}`,i=t.toUpperCase(),{ctx:r}=ss(1,1);if(r.font=n,"letterSpacing"in r)r.letterSpacing="1.6px";let s=r.measureText(i).width+6,a=20,{canvas:o,ctx:l}=ss(s,a);if(l.font=n,"letterSpacing"in l)l.letterSpacing="1.6px";return l.fillStyle=e.textMuted,l.textBaseline="middle",l.fillText(i,2,a/2+1),Ta(o,s,a)}function fv(e,t){let{canvas:i,ctx:r}=ss(22,22);return r.fillStyle=t,r.beginPath(),r.arc(11,11,10,0,Math.PI*2),r.fill(),r.strokeStyle=e,r.lineWidth=2,r.stroke(),r.lineCap="round",r.lineWidth=2.4,r.beginPath(),r.moveTo(7.5,7.5),r.lineTo(14.5,14.5),r.moveTo(14.5,7.5),r.lineTo(7.5,14.5),r.stroke(),Ta(i,22,22)}function pv(e,t){let i=document.createElement("canvas");i.width=64,i.height=64;let r=i.getContext("2d");r.fillStyle=t,r.fillRect(0,0,64,64),r.fillStyle=e,r.beginPath(),r.arc(32,32,2.6,0,Math.PI*2),r.fill();let s=new tr(i);return s.colorSpace=Yi,s.anisotropy=8,s}var Aa=new P;function Pn(e,t,n,i,r,s){let a=2*Math.PI*r/4,o=Math.max(s-2*r,0),l=Math.PI/4;Aa.copy(t),Aa[i]=0,Aa.normalize();let c=0.5*a/(a+o),d=1-Aa.angleTo(e)/l;if(Math.sign(Aa[n])===1)return d*c;else return o/(a+o)+c+c*(1-d)}class cn extends wt{constructor(e=1,t=1,n=1,i=2,r=0.1){let s=i*2+1;r=Math.min(e/2,t/2,n/2,r);super(1,1,1,s,s,s);if(this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:i,radius:r},s===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let o=new P,l=new P,c=new P(e,t,n).divideScalar(2).subScalar(r),d=this.attributes.position.array,h=this.attributes.normal.array,u=this.attributes.uv.array,p=d.length/6,g=new P,x=0.5/s;for(let m=0,f=0;m<d.length;m+=3,f+=2)switch(o.fromArray(d,m),l.copy(o),l.x-=Math.sign(l.x)*x,l.y-=Math.sign(l.y)*x,l.z-=Math.sign(l.z)*x,l.normalize(),d[m+0]=c.x*Math.sign(o.x)+l.x*r,d[m+1]=c.y*Math.sign(o.y)+l.y*r,d[m+2]=c.z*Math.sign(o.z)+l.z*r,h[m+0]=l.x,h[m+1]=l.y,h[m+2]=l.z,Math.floor(m/p)){case 0:g.set(1,0,0),u[f+0]=Pn(g,l,"z","y",r,n),u[f+1]=1-Pn(g,l,"y","z",r,t);break;case 1:g.set(-1,0,0),u[f+0]=1-Pn(g,l,"z","y",r,n),u[f+1]=1-Pn(g,l,"y","z",r,t);break;case 2:g.set(0,1,0),u[f+0]=1-Pn(g,l,"x","z",r,e),u[f+1]=Pn(g,l,"z","x",r,n);break;case 3:g.set(0,-1,0),u[f+0]=1-Pn(g,l,"x","z",r,e),u[f+1]=1-Pn(g,l,"z","x",r,n);break;case 4:g.set(0,0,1),u[f+0]=1-Pn(g,l,"x","y",r,e),u[f+1]=1-Pn(g,l,"y","x",r,t);break;case 5:g.set(0,0,-1),u[f+0]=Pn(g,l,"x","y",r,e),u[f+1]=1-Pn(g,l,"y","x",r,t);break}}static fromJSON(e){return new cn(e.width,e.height,e.depth,e.segments,e.radius)}}function mf(e,t=48){return new ha(e.map(([n,i])=>new re(n,i)),t)}function mv(e,t){let{main:n,detail:i,glow:r}=t,s=new gn,a=(d,h,u=0,p=0,g=0,x=!0)=>{let m=new Ze(d,h);return m.position.set(u,p,g),m.castShadow=x,m.receiveShadow=!0,s.add(m),m},o=(d,h,u,p=0.032)=>a(new ui(p,12,8),r,d,h,u,!1),l=(d,h,u,p)=>a(new wt(d,0.018,0.01),r,h,u,p,!1),c=(d,h,u)=>{a(new aa(0.105*u,0.2*u,8,20),n,d,0.20500000000000002*u,h).scale.set(1,1,0.8),a(new ui(0.088*u,24,18),n,d,0.5*u,h)};switch(e){case"cylinder":{for(let[d,h]of[0.1,0.3,0.5].entries())if(a(new Pt(0.4,0.4,0.18,56),n,0,h,0),d<2){let u=a(new jn(0.392,0.012,8,64),r,0,h+0.1,0,!1);u.rotation.x=Math.PI/2}return a(new Pt(0.3,0.3,0.012,48),i,0,0.596,0,!1),{group:s,height:0.6,halfWidth:0.4,tips:!0,floats:!1}}case"stack":{for(let d=0;d<5;d++){let h=a(new cn(0.74,0.085,0.56,2,0.025),d%2?i:n,d%2*0.04-0.02,0.05+d*0.1,0);h.rotation.y=(d-2)*0.05,l(0.4,d%2*0.04-0.02,0.05+d*0.1,0.285)}return{group:s,height:0.54,halfWidth:0.38,tips:!0,floats:!1}}case"hex":{a(new Pt(0.44,0.48,0.3,6),n,0,0.15,0),a(new Pt(0.27,0.31,0.1,6),i,0,0.35,0);for(let d=0;d<4;d++)o(-0.15+d*0.1,0.17,0.4,0.026);return{group:s,height:0.42,halfWidth:0.44,tips:!0,floats:!1}}case"funnel":{a(mf([[0.06,0],[0.1,0.08],[0.12,0.2],[0.42,0.52],[0.44,0.58],[0.38,0.58]]),n,0,0,0);let d=a(new jn(0.42,0.018,8,48),r,0,0.575,0,!1);return d.rotation.x=Math.PI/2,{group:s,height:0.6,halfWidth:0.3,tips:!0,floats:!1}}case"gate":{for(let d of[-0.34,0.34])a(new cn(0.16,0.74,0.32,3,0.03),n,d,0.37,0),l(0.02,d+(d<0?0.081:-0.081),0.45,0).scale.set(1,18,20);return a(new cn(0.88,0.14,0.36,3,0.03),i,0,0.8,0),a(new wt(0.52,0.015,0.015),r,0,0.3,0,!1),a(new wt(0.52,0.015,0.015),r,0,0.5,0,!1),{group:s,height:0.87,halfWidth:0.44,tips:!0,floats:!1}}case"wall":{for(let d=0;d<4;d++){let h=d%2?0.11:0;for(let u=-2;u<=2;u++){let p=u*0.22+h;if(Math.abs(p)>0.46)continue;a(new cn(0.205,0.13,0.26,2,0.02),d%2?i:n,p,0.07+d*0.14,0)}}return a(new wt(0.86,0.02,0.02),r,0,0.6,0.12,!1),{group:s,height:0.62,halfWidth:0.46,tips:!0,floats:!1}}case"vault":{a(new cn(0.74,0.6,0.62,4,0.06),n,0,0.3,0),a(new cn(0.58,0.46,0.04,3,0.02),i,0,0.3,0.31);let d=a(new Pt(0.11,0.11,0.04,32),i,0.08,0.32,0.345);d.rotation.x=Math.PI/2;let h=a(new jn(0.115,0.012,8,40),r,0.08,0.32,0.37,!1);return h.rotation.z=0,o(-0.19,0.46,0.335,0.026),{group:s,height:0.6,halfWidth:0.37,tips:!0,floats:!1}}case"people":return c(-0.22,0.08,1),c(0.22,0.08,1),c(0,-0.1,1.18),{group:s,height:0.7,halfWidth:0.34,tips:!0,floats:!1};case"person":return c(0,0,1.3),{group:s,height:0.78,halfWidth:0.16,tips:!0,floats:!1};case"towers":return[0.78,0.96,0.66].forEach((h,u)=>{let p=(u-1)*0.27;a(new cn(0.21,h,0.64,3,0.03),n,p,h/2,0);for(let g=0;g<Math.floor((h-0.12)/0.14);g++)l(0.13,p,0.12+g*0.14,0.322)}),{group:s,height:0.96,halfWidth:0.38,tips:!0,floats:!1};case"rack":{a(new cn(0.56,0.98,0.6,3,0.03),i,0,0.49,0);for(let d=0;d<6;d++){let h=0.12+d*0.145;a(new wt(0.48,0.11,0.04),n,0,h,0.29,!1),o(0.19,h,0.315,0.02),l(0.2,-0.08,h,0.312)}return{group:s,height:0.98,halfWidth:0.3,tips:!0,floats:!1}}case"pods":{a(new Pt(0.16,0.2,0.22,6),i,0,0.11,0);for(let d=0;d<6;d++){let h=d/6*Math.PI*2,u=a(new cn(0.2,0.2,0.2,2,0.03),n,Math.cos(h)*0.32,0.12+d%2*0.12,Math.sin(h)*0.32);u.rotation.y=-h}return o(0,0.27,0,0.05),{group:s,height:0.48,halfWidth:0.42,tips:!1,floats:!1}}case"sphere":{a(new Pt(0.16,0.24,0.07,32),i,0,0.035,0),a(new ui(0.36,56,40),n,0,0.5,0);let d=a(new jn(0.47,0.016,12,80),r,0,0.5,0,!1);return d.rotation.x=Math.PI/2-0.35,d.name="orbit",{group:s,height:0.88,halfWidth:0.4,tips:!1,floats:!0}}case"cone":return a(new Pt(0.3,0.34,0.12,40),i,0,0.06,0),a(new nr(0.26,0.72,40),n,0,0.48,0),o(0,0.36,0.2,0.04),{group:s,height:0.84,halfWidth:0.3,tips:!0,floats:!1};case"slab":{a(new wt(0.36,0.04,0.24),i,0,0.02,0),a(new wt(0.05,0.16,0.04),i,0,0.11,-0.02);let d=a(new cn(0.78,0.5,0.06,3,0.025),n,0,0.42,0);d.rotation.x=-0.12;let h=a(new wt(0.68,0.4,0.01),r,0,0.424,0.033,!1);return h.rotation.x=-0.12,{group:s,height:0.7,halfWidth:0.2,tips:!0,floats:!1}}default:{a(new cn(0.8,0.56,0.8,4,0.07),n,0,0.28,0);for(let d of[0.4,0.3,0.2])a(new wt(0.46,0.022,0.02),i,-0.08,d,0.401,!1);return o(0.27,0.4,0.405),l(0.16,0.24,0.2,0.404),{group:s,height:0.56,halfWidth:0.4,tips:!0,floats:!1}}}}var vn=0.01,gv=30,xv=1800,$l=2,vv=600,YA=24,ql=0.7,_v=7,jA=3.6,Ca=1.25,_n=0.1,jt=0.76,ZA=2.6,Ra=1,KA=[0.78,1.3],JA=[0.86,1.35],QA=[0.84,1.15],gf={width:760,height:480},e2={"3d":{theta:-0.2,phi:0.72},top:{theta:0,phi:0.02}},yv=(e,t,n)=>e.left<t.right+n&&e.right>t.left-n&&e.top<t.bottom+n&&e.bottom>t.top-n;function t2(e,t){if(e.nodes.length!==t.nodes.length||e.edges.length!==t.edges.length||e.groups.length!==t.groups.length)return!1;if(e.width!==t.width||e.height!==t.height||e.states.size!==t.states.size)return!1;for(let n=0;n<e.nodes.length;n++){let i=e.nodes[n],r=t.nodes[n];if(i.id!==r.id||i.label!==r.label||i.icon!==r.icon||i.box.x!==r.box.x||i.box.y!==r.box.y)return!1;if(Boolean(i.capacity)!==Boolean(r.capacity))return!1}for(let n=0;n<e.edges.length;n++)if(e.edges[n].id!==t.edges[n].id||e.edges[n].label!==t.edges[n].label)return!1;for(let n=0;n<e.groups.length;n++)if(e.groups[n].id!==t.groups[n].id||e.groups[n].label!==t.groups[n].label)return!1;return!0}var os=(e)=>{let t=Math.min(1,Math.max(0,e));return t*t*(3-2*t)};function n2(e){let t=Math.min(1,Math.max(0,e)),n=7.5625,i=2.75;if(t<0.36363636363636365)return 7.5625*t*t;if(t<0.7272727272727273)return 7.5625*(t-0.5454545454545454)**2+0.75;if(t<0.9090909090909091)return 7.5625*(t-0.8181818181818182)**2+0.9375;return 7.5625*(t-0.9545454545454546)**2+0.984375}function i2(e){e.traverse((t)=>{let n=t;n.geometry?.dispose?.();let i=n.material;for(let r of Array.isArray(i)?i:i?[i]:[])r.map?.dispose?.(),r.alphaMap?.dispose?.(),r.dispose()})}function r2(){let t=document.createElement("canvas");t.width=t.height=128;let n=t.getContext("2d"),i=n.createRadialGradient(64,64,0,64,64,64);return i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(0.45,"rgba(255,255,255,0.55)"),i.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=i,n.fillRect(0,0,128,128),new tr(t)}class Xl{container;follower;quality;canvas;onSelect=()=>{};onCamera=()=>{};onFrame=()=>{};onScrollPast=()=>{};onEdit=()=>{};renderer;scene=new Ki;overlay=new Ki;camera=new qt(gv,1,0.1,2000);controls;composer=null;glowComposer=null;bloom=null;bloomLayers=new ji;darkMaterial=new en({color:"#000000"});environment=null;content=new gn;labels=new gn;theme;compiled=null;nodeViews=[];nodeById=new Map;edgeViews=[];notes=new Map;packets=null;queued=null;pickTargets=[];selection=null;shadowTexture=r2();t=0;clock=0;dirty=!0;raf=0;width=1;height=1;view="3d";userMoved=!1;tween=null;following=!1;driving=!1;selected=null;hovered=null;pointerDown=null;cursorOverride=null;resizeObserver;visibility;onScreen=!0;ambient=!window.matchMedia("(prefers-reduced-motion: reduce)").matches;engaged=!1;wheelZoom="click";annotate={labels:!0,notes:!0};editing=!1;drag=null;floor=new pn(new P(0,1,0),0);raycaster=new Cl;scratch=new yt;scratchVector=new P;chipBoxes=[];color=new Ne;packetColors={ok:new Ne,bounce:new Ne,drop:new Ne,trail:new Ne};constructor(e,t,n=!1,i="high"){this.container=e;this.follower=n;this.quality=i;this.theme=t,this.userMoved=n,this.renderer=new Qu({antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.outputColorSpace=Yi,this.renderer.toneMapping=Yr,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Oo,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.canvas=this.renderer.domElement,this.canvas.style.display="block",this.canvas.style.width="100%",this.canvas.style.height="100%",this.canvas.style.touchAction="none",e.appendChild(this.canvas);let r=new va(this.renderer);this.environment=r.fromScene(new rf,0.04).texture,r.dispose(),this.scene.environment=this.environment,this.scene.add(this.content),this.overlay.add(this.labels),this.buildComposer(),this.controls=new nf(this.camera,this.canvas),this.controls.enableDamping=!0,this.controls.dampingFactor=0.09,this.controls.maxPolarAngle=1.45,this.controls.zoomSpeed=0.7,this.controls.addEventListener("change",()=>{if(this.invalidate(),!this.following&&(this.driving||!this.follower))this.onCamera()}),this.controls.addEventListener("start",()=>{this.userMoved=!0,this.driving=!0,this.tween=null}),this.canvas.addEventListener("wheel",this.handleWheel,{capture:!0,passive:!0}),this.canvas.addEventListener("pointerdown",this.handleEditDown,{capture:!0}),this.canvas.addEventListener("pointermove",this.handleEditMove,{capture:!0}),this.canvas.addEventListener("pointerup",this.handleEditUp,{capture:!0}),this.canvas.addEventListener("pointercancel",this.handleEditUp,{capture:!0}),this.canvas.addEventListener("pointerdown",this.handlePointerDown),this.canvas.addEventListener("pointerup",this.handlePointerUp),this.canvas.addEventListener("pointermove",this.handlePointerMove),this.canvas.addEventListener("pointerleave",this.handlePointerLeave),this.visibility=new IntersectionObserver((s)=>{this.onScreen=s.some((a)=>a.isIntersecting),this.invalidate()}),this.visibility.observe(e),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),this.resize(),this.raf=requestAnimationFrame(this.frame)}setScene(e){let t=this.compiled;if(this.compiled=e,t&&this.nodeViews.length&&t2(t,e)){this.swapData(e);return}let n=this.editing&&t!==null;if(!n)this.selected=null;if(this.hovered=null,this.rebuild(),this.follower)return;if(n){let i={x:t.origin.x-t.width/2,y:t.origin.y-t.height/2},r={x:e.origin.x-e.width/2,y:e.origin.y-e.height/2},s=new P((r.x-i.x)*vn,0,(r.y-i.y)*vn);this.camera.position.add(s),this.controls.target.add(s),this.controls.update();return}this.userMoved=!1,this.fitCamera(!1)}setAnnotations(e){this.annotate={labels:e.labels,notes:e.notes},this.invalidate()}setEditing(e){this.editing=e,this.cancelDrag(),this.invalidate()}floorAt(e,t){let n=this.floorPoint(e,t);return n?this.toScene(n):null}followCamera(e){this.following=!0,this.driving=!1,this.userMoved=!0,this.tween=null,this.camera.position.copy(e.camera.position),this.controls.target.copy(e.controls.target),this.camera.lookAt(this.controls.target),this.controls.update(),this.following=!1,this.invalidate()}recenter(){if(this.follower)return;this.userMoved=!1,this.fitCamera(!0)}setWheelZoom(e){this.wheelZoom=e}setCursor(e){this.cursorOverride=e,this.canvas.style.cursor=e??""}setTheme(e){if(this.theme=e,this.applyThemeToPipeline(),this.compiled)this.rebuild()}setQuality(e){if(e===this.quality)return;this.quality=e,this.buildComposer(),this.invalidate()}setTime(e){this.t=e,this.invalidate()}setView(e,t=!0){if(this.view=e,this.follower)return;this.userMoved=!1,this.fitCamera(t)}getView(){return this.view}select(e){this.selected=e,this.invalidate()}invalidate(){this.dirty=!0}renderNow(){this.draw()}dispose(){cancelAnimationFrame(this.raf),this.resizeObserver.disconnect(),this.visibility.disconnect(),this.canvas.removeEventListener("wheel",this.handleWheel,{capture:!0}),this.canvas.removeEventListener("pointerdown",this.handleEditDown,{capture:!0}),this.canvas.removeEventListener("pointermove",this.handleEditMove,{capture:!0}),this.canvas.removeEventListener("pointerup",this.handleEditUp,{capture:!0}),this.canvas.removeEventListener("pointercancel",this.handleEditUp,{capture:!0}),this.canvas.removeEventListener("pointerdown",this.handlePointerDown),this.canvas.removeEventListener("pointerup",this.handlePointerUp),this.canvas.removeEventListener("pointermove",this.handlePointerMove),this.canvas.removeEventListener("pointerleave",this.handlePointerLeave),this.controls.dispose(),this.clear(),this.composer?.dispose(),this.glowComposer?.dispose(),this.darkMaterial.dispose(),this.environment?.dispose(),this.shadowTexture.dispose(),this.renderer.dispose(),this.canvas.remove()}buildComposer(){if(this.composer?.dispose(),this.glowComposer?.dispose(),this.composer=null,this.glowComposer=null,this.bloom=null,this.bloomLayers.set(Ra),this.quality==="low")return;let e=new zl(this.renderer,new Et(this.width,this.height,{type:Bt}));e.renderToScreen=!1,e.setPixelRatio(Math.min(1,this.renderer.getPixelRatio())),e.setSize(this.width,this.height),e.addPass(new Gl(this.scene,this.camera));let t=new fr(new re(this.width/2,this.height/2),this.theme.bloom,0.5,0);e.addPass(t);let n=new Et(this.width,this.height,{samples:4,type:Bt}),i=new zl(this.renderer,n);i.setPixelRatio(this.renderer.getPixelRatio()),i.setSize(this.width,this.height),i.addPass(new Gl(this.scene,this.camera));let r=new Bn(this.scene,this.camera,this.width,this.height);r.updateGtaoMaterial({radius:0.32,distanceExponent:1.6,thickness:1,scale:1.2,samples:12}),r.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:6,rings:2,samples:12}),r.blendIntensity=1,i.addPass(r);let s=new ba(new ot({uniforms:{baseTexture:{value:null},glowTexture:{value:e.renderTarget2.texture}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"uniform sampler2D baseTexture; uniform sampler2D glowTexture; varying vec2 vUv; void main() { gl_FragColor = texture2D(baseTexture, vUv) + vec4(texture2D(glowTexture, vUv).rgb, 0.0); }"}),"baseTexture");s.needsSwap=!0,i.addPass(s),i.addPass(new uf),this.composer=i,this.glowComposer=e,this.bloom=t}renderGlow(){let e=new Map,t=[],n=this.scene.background,i=this.scene.fog;this.scene.background=null,this.scene.fog=null,this.scene.traverse((r)=>{if(r.layers.test(this.bloomLayers)||!r.visible)return;let s=r;if(s.isLine2)t.push(r),r.visible=!1;else if(s.isMesh){let a=s.material;if(!Array.isArray(a)&&a.transparent)t.push(r),r.visible=!1;else e.set(s,s.material),s.material=this.darkMaterial}}),this.glowComposer.render();for(let[r,s]of e)r.material=s;for(let r of t)r.visible=!0;this.scene.background=n,this.scene.fog=i}applyThemeToPipeline(){if(this.renderer.toneMappingExposure=this.theme.exposure,this.scene.environmentIntensity=this.theme.environmentIntensity,this.bloom)this.bloom.strength=this.theme.bloom}clear(){i2(this.content),this.content.clear();for(let e of this.nodeViews)for(let t of e.chipArt.values())t.texture.dispose();for(let e of this.notes.values())e.art.texture.dispose();this.labels.traverse((e)=>{let t=e;if(t.isSprite)t.material.dispose()}),this.labels.clear(),this.nodeViews=[],this.nodeById.clear(),this.edgeViews=[],this.notes.clear(),this.pickTargets=[],this.packets=null,this.queued=null,this.selection=null}swapData(e){this.nodeViews.forEach((t,n)=>{t.node=e.nodes[n],t.looks=t.node.segments.map((i)=>this.lookFor(e.states.get(i.state),t.node.color))}),this.edgeViews.forEach((t)=>{t.edge=e.edges.find((n)=>n.id===t.edge.id)});for(let t of this.notes.values())t.sprite.removeFromParent(),t.sprite.material.dispose(),t.art.texture.dispose();this.notes.clear(),this.invalidate()}toWorld(e,t,n=0){let i=this.compiled;return new P((e-i.width/2)*vn,n,(t-i.height/2)*vn)}rebuild(){this.clear();let e=this.compiled;if(!e)return;let t=this.theme;this.applyThemeToPipeline(),this.scene.background=new Ne(t.background),this.scene.fog=new ra(t.background,10,40),this.packetColors.ok.set(t.packet).multiplyScalar(t.name==="dark"?2.6:1.4),this.packetColors.bounce.set(t.tones.down).multiplyScalar(2.2),this.packetColors.drop.set(t.tones.hot).multiplyScalar(2.2),this.packetColors.trail.set(t.packet).multiplyScalar(t.name==="dark"?1.1:0.9);let n=Math.max(e.width,e.height,gf.width)*vn;this.content.add(new Ml(t.hemisphereSky,t.hemisphereGround,t.ambientIntensity));let i=new pa("#fff6ea",t.sunIntensity);i.position.set(-n*0.35,n*0.9+4,n*0.45),i.castShadow=!0,i.shadow.mapSize.set(2048,2048);let r=n*0.75+2;Object.assign(i.shadow.camera,{left:-r,right:r,top:r,bottom:-r,near:0.5,far:n*3+20}),i.shadow.bias=-0.0004,i.shadow.normalBias=0.025,i.shadow.radius=4,this.content.add(i,i.target);let s=new pa("#b9cbff",t.sunIntensity*0.35);s.position.set(n*0.5,n*0.4+2,-n*0.8),this.content.add(s);let a=pv(t.gridDot,t.ground);a.wrapS=a.wrapT=qn;let o=n*6+40;a.repeat.set(o/0.5,o/0.5);let l=new Ze(new hi(o,o),new Yt({map:a,roughness:0.94,metalness:0,envMapIntensity:0.12}));l.rotation.x=-Math.PI/2,l.receiveShadow=!0,this.content.add(l),this.buildGroups(e);for(let u of e.edges)this.buildEdge(u);e.nodes.forEach((u,p)=>this.buildNode(u,p));let c=new er(new ui(0.055,16,12),new en({color:"#ffffff"}),xv*($l+1));c.frustumCulled=!1,c.layers.enable(Ra),c.count=0,this.content.add(c),this.packets=c;let d=new er(new wt(0.085,0.085,0.085),new Pi({color:t.packet,roughness:0.35,metalness:0,clearcoat:0.6}),vv);d.frustumCulled=!1,d.castShadow=!0,d.count=0,this.content.add(d),this.queued=d;let h=new Ze(new ir(jt+0.08,jt+0.14,72),new en({color:t.text,transparent:!0,opacity:0.9,side:Qt,depthWrite:!1}));h.rotation.x=-Math.PI/2,h.visible=!1,this.content.add(h),this.selection=h,this.invalidate()}buildGroups(e){let t=this.theme;for(let n of e.groups){let i=n.box.width*vn,r=n.box.height*vn,s=0.22,a=new ca;a.moveTo(-i/2+0.22,-r/2),a.lineTo(i/2-0.22,-r/2),a.quadraticCurveTo(i/2,-r/2,i/2,-r/2+0.22),a.lineTo(i/2,r/2-0.22),a.quadraticCurveTo(i/2,r/2,i/2-0.22,r/2),a.lineTo(-i/2+0.22,r/2),a.quadraticCurveTo(-i/2,r/2,-i/2,r/2-0.22),a.lineTo(-i/2,-r/2+0.22),a.quadraticCurveTo(-i/2,-r/2,-i/2+0.22,-r/2);let o=this.toWorld(n.box.x,n.box.y),l=new Ze(new da(a,{depth:0.035,bevelEnabled:!0,bevelThickness:0.012,bevelSize:0.02,bevelSegments:3,curveSegments:12}),new Pi({color:t.platform,roughness:0.62,metalness:0.05,clearcoat:0.3,clearcoatRoughness:0.5}));l.rotation.x=-Math.PI/2,l.position.set(o.x,0.012,o.z),l.receiveShadow=!0,l.castShadow=!0,this.content.add(l);let c=[];for(let x of[...a.getPoints(10),a.getPoints(10)[0]])c.push(o.x+x.x,0.062,o.z-x.y);let d=new ya(new ur().setPositions(c),new fi({color:new Ne(t.platformEdge).getHex(),linewidth:1.4,transparent:!0,opacity:0.9}));this.content.add(d);let h=uv(t,n.label),u=h.width*Wl*1.25,p=h.height*Wl*1.25,g=new Ze(new hi(u,p),new en({map:h.texture,transparent:!0,depthWrite:!1,toneMapped:!1}));g.rotation.x=-Math.PI/2,g.position.set(o.x-i/2+0.2+u/2,0.064,o.z+r/2-0.1-p/2),this.content.add(g)}}buildEdge(e){let t=this.theme,n=e.path.map((w)=>this.toWorld(w.x,w.y,0.06));if(n.length<2)return;let i=new la(n,!1,"centripetal"),r=new Yt({color:t.edges.flowing,roughness:0.38,metalness:0.35}),s=new Ze(new ua(i,Math.max(24,n.length*2),0.02,8,!1),r);s.castShadow=!0,s.receiveShadow=!0,this.content.add(s);let a=[];for(let w of n)a.push(w.x,w.y+0.01,w.z);let o=new fi({color:new Ne(t.edges.cut).getHex(),linewidth:2.8,dashed:!0,dashSize:0.06,gapSize:0.12,transparent:!0}),l=new ya(new ur().setPositions(a),o);l.computeLineDistances(),l.visible=!1,this.content.add(l);let c=n[n.length-1],d=n[n.length-2],h=new Yt({color:t.edges.flowing,roughness:0.35,metalness:0.35}),u=new Ze(new nr(0.075,0.2,24),h);u.position.copy(c).y=0.07,u.quaternion.setFromUnitVectors(new P(0,1,0),c.clone().sub(d).setY(0).normalize()),u.castShadow=!0,this.content.add(u);let p=In(e.path,e.lengths,e.length/2),g=this.toWorld(p.x,p.y,0.06),x=fv(t.tones.down,t.chip),m=new Ji(new Ri({map:x.texture,depthTest:!1,transparent:!0,toneMapped:!1}));m.position.copy(g).y=0.16,m.scale.setScalar(0.3),m.renderOrder=6,m.visible=!1,this.labels.add(m);let f={edge:e,tube:s,tubeMaterial:r,dashes:l,dashMaterial:o,arrow:h,cutMark:m,middle:g};if(e.label){let w=hv(t,e.label),v=new Ji(new Ri({map:w.texture,depthTest:!1,transparent:!0,toneMapped:!1})),S=In(e.path,e.lengths,e.length*0.36);v.position.copy(this.toWorld(S.x,S.y,0.3)),v.renderOrder=5,this.labels.add(v),f.label=v,f.labelArt=w}this.edgeViews.push(f)}lookFor(e,t){let n=this.theme,i=new Ne(t??n.body),r=e?.tone??"idle",s=new Ne(n.tones[r]),a={color:i,tone:s,toneName:r,opacity:1,roughness:0.3,tilt:0,jitter:0,pulse:0,glow:0,blink:0,lit:1,spin:0.5};switch(r){case"ok":return{...a,blink:0.35,lit:0.9};case"warn":return{...a,color:i.clone().lerp(s,0.72),pulse:0.35,glow:0.06,blink:1.2,spin:1};case"hot":return{...a,color:s.clone().lerp(i,0.12),jitter:0.013,pulse:1,glow:0.18,blink:4,spin:3.2};case"down":return{...a,color:s.clone().multiplyScalar(0.45),roughness:0.7,tilt:1,glow:0.04,blink:0.6,lit:0.35,spin:0};case"mend":return{...a,color:i.clone().lerp(s,0.62),pulse:0.6,glow:0.08,blink:0.9,spin:1.4};default:return{...a,color:i.clone().lerp(new Ne(n.ground),0.5),opacity:e&&e.reject>=1?0.45:0.92,roughness:0.55,lit:0.15,spin:0.15}}}buildNode(e,t){let n=this.compiled,i=this.theme,r=Ui(e.icon),s=new Pi({color:i.body,roughness:0.3,metalness:0.12,clearcoat:0.85,clearcoatRoughness:0.22,transparent:!0}),a=new Yt({color:i.body,roughness:0.32,metalness:0.7,transparent:!0}),o=new Yt({color:"#0b0d12",roughness:0.25,metalness:0,emissive:i.tones.ok}),l=mv(r.shape,{main:s,detail:a,glow:o});l.height*=Ca,l.halfWidth*=Ca,l.group.scale.setScalar(Ca),l.group.traverse((A)=>{if(A.material===o)A.layers.enable(Ra)});let c=this.toWorld(e.box.x,e.box.y,0),d=new gn;d.position.copy(c);let h=new Pi({color:i.plinth,roughness:0.45,metalness:0.1,clearcoat:0.5,clearcoatRoughness:0.4}),u=new Ze(mf([[0,0],[jt-0.02,0],[jt,0.015],[jt,_n-0.03],[jt-0.03,_n],[0,_n]],64),h);u.castShadow=!0,u.receiveShadow=!0,d.add(u);let p=new Yt({color:"#0b0d12",emissive:i.tones.ok,roughness:0.3}),g=new Ze(new jn(jt+0.004,0.013,10,96),p);g.layers.enable(Ra),g.rotation.x=Math.PI/2,g.position.y=_n*0.55,d.add(g);let x=new Ze(new hi(jt*3,jt*3),new en({color:"#000000",alphaMap:this.shadowTexture,transparent:!0,opacity:i.shadowOpacity*0.8,depthWrite:!1}));x.rotation.x=-Math.PI/2,x.position.y=0.003,d.add(x);let m=t*2.399963%(Math.PI*2)+0.6,f=new re(Math.cos(m),Math.sin(m)),w=new gn;w.position.set(f.x*l.halfWidth,_n,f.y*l.halfWidth),l.group.position.set(-f.x*l.halfWidth,0,-f.y*l.halfWidth),w.add(l.group),d.add(w);let v=(A,F)=>(A.rotation.x=-Math.PI/2,A.position.y=F,d.add(A),A),S=new en({transparent:!0,opacity:0,depthWrite:!1,side:Qt}),R=v(new Ze(new ir(jt,jt+0.05,72),S),0.008),T=v(new Ze(new ir(jt+0.06,jt+0.1,72),new en({color:i.text,transparent:!0,opacity:0.5,depthWrite:!1,side:Qt})),0.009);T.visible=!1;let E=new Ji(new Ri({depthTest:!1,transparent:!0,toneMapped:!1}));E.center.set(0.5,0),E.position.set(c.x,_n+l.height+0.2,c.z),E.renderOrder=10,this.labels.add(E);let D;if(e.capacity){let A=new Ze(new Pt(0.06,0.06,ql,20,1,!0),new Pi({color:"#ffffff",roughness:0.05,metalness:0,transmission:0.9,thickness:0.05,transparent:!0,opacity:0.35,side:Qt,depthWrite:!1}));A.position.set(0.9,_n+ql/2,0.5);let F=new Ze(new Pt(0.075,0.075,0.016,20),new Yt({color:i.text,roughness:0.4,metalness:0.6}));F.position.set(0.9,_n+ql,0.5);let q=new Ze(new Pt(0.085,0.09,0.03,20),new Yt({color:i.plinth,roughness:0.4,metalness:0.5}));q.position.set(0.9,0.015,0.5);let B=new Yt({color:"#0b0d12",emissive:i.tones.ok,emissiveIntensity:1.6}),ee=new Ze(new Pt(0.045,0.045,1,16),B);ee.layers.enable(Ra),ee.position.set(0.9,_n,0.5),d.add(A,F,q,ee),D={bar:ee,material:B}}let y=new Ze(new Pt(jt,jt,_n+l.height+0.1,12),new en({visible:!1}));y.position.set(c.x,(_n+l.height+0.1)/2,c.z),y.userData.id=e.id,this.content.add(y),this.pickTargets.push(y),this.content.add(d);let _={node:e,body:l,root:d,pivot:w,main:s,detail:a,glow:o,ringMaterial:p,ripple:R,rippleMaterial:S,halo:T,orbit:l.group.getObjectByName("orbit"),gauge:D,chip:E,chipArt:new Map,chipState:"",looks:e.segments.map((A)=>this.lookFor(n.states.get(A.state),e.color)),axis:new P(f.y,0,-f.x),phase:t*1.7,position:c,chipPx:30,liftPx:0};this.nodeViews.push(_),this.nodeById.set(e.id,_)}cameraOffset(e,t,n){return new P(Math.sin(t)*Math.sin(e),Math.cos(t),Math.sin(t)*Math.cos(e)).multiplyScalar(n)}fitRadius(e,t){let n=this.compiled;if(!n)return 10;let i=Math.max(n.width,gf.width)/2*vn,r=Math.max(n.height,gf.height)/2*vn,s=[];for(let p of[-i,i])for(let g of[-r,r])for(let x of[0,1.3])s.push(new P(p,x,g));let a=this.camera.clone(),o=this.controls.target,l=Math.max(0.5,1-100/this.width),c=Math.max(0.4,1-100/this.height),d=-Math.max(0.5,1-80/this.height),h=1,u=200;for(let p=0;p<22;p++){let g=(h+u)/2;if(a.position.copy(o).add(this.cameraOffset(e,t,g)),a.lookAt(o),a.updateMatrixWorld(),a.updateProjectionMatrix(),s.every((m)=>{let f=m.clone().project(a);return Math.abs(f.x)<=l&&f.y<=c&&f.y>=d&&f.z<1}))u=g;else h=g}return u}fitCamera(e){if(!this.compiled)return;let{theta:t,phi:n}=e2[this.view];this.controls.target.set(0,0.3,0);let i=this.fitRadius(t,n),r=this.controls.target.clone().add(this.cameraOffset(t,n,i));if(this.controls.minDistance=i*0.3,this.controls.maxDistance=i*2.6,this.camera.far=i*8+100,this.camera.updateProjectionMatrix(),e)this.tween={from:this.camera.position.clone(),to:r,start:performance.now(),duration:650};else this.tween=null,this.camera.position.copy(r),this.camera.lookAt(this.controls.target);this.controls.update(),this.invalidate()}resize(){let e=Math.max(1,this.container.clientWidth),t=Math.max(1,this.container.clientHeight);if(e===this.width&&t===this.height)return;if(this.width=e,this.height=t,this.renderer.setSize(e,t,!1),this.composer?.setSize(e,t),this.glowComposer?.setSize(e,t),this.bloom?.resolution.set(e/2,t/2),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),!this.userMoved)this.fitCamera(!1);this.invalidate(),this.draw()}pick(e){let t=this.canvas.getBoundingClientRect(),n=new re((e.clientX-t.left)/t.width*2-1,-((e.clientY-t.top)/t.height)*2+1);return this.raycaster.setFromCamera(n,this.camera),this.raycaster.intersectObjects(this.pickTargets,!1)[0]?.object.userData.id??null}floorPoint(e,t){let n=this.canvas.getBoundingClientRect(),i=new re((e-n.left)/n.width*2-1,-((t-n.top)/n.height)*2+1);return this.raycaster.setFromCamera(i,this.camera),this.raycaster.ray.intersectPlane(this.floor,new P)}toScene(e){let t=this.compiled;return{x:Math.round(e.x/vn+t.width/2-t.origin.x),y:Math.round(e.z/vn+t.height/2-t.origin.y)}}handleEditDown=(e)=>{if(!this.editing||e.button!==0)return;let t=this.pick(e),n=t?this.nodeById.get(t):void 0,i=this.floorPoint(e.clientX,e.clientY);if(!n||!i)return;e.stopImmediatePropagation(),this.engaged=!0,this.canvas.setPointerCapture(e.pointerId),this.drag={id:n.node.id,mode:e.shiftKey?"connect":"move",pointerId:e.pointerId,offset:n.position.clone().sub(i).setY(0),moved:!1,startX:e.clientX,startY:e.clientY},this.canvas.style.cursor=e.shiftKey?"crosshair":"grabbing"};handleEditMove=(e)=>{let t=this.drag;if(!t||e.pointerId!==t.pointerId)return;if(e.stopImmediatePropagation(),!t.moved&&Math.hypot(e.clientX-t.startX,e.clientY-t.startY)<4)return;t.moved=!0;let n=this.floorPoint(e.clientX,e.clientY),i=this.nodeById.get(t.id);if(!n||!i)return;if(t.mode==="move"){let s=n.add(t.offset).clone().sub(i.position).setY(0);for(let a of[i.root,i.chip,this.pickTargets.find((o)=>o.userData.id===t.id)])a?.position.add(s);i.position.add(s)}else{if(!t.line){let a=new fi({color:this.theme.accent,linewidth:2.5,dashed:!0,dashSize:0.12,gapSize:0.08,depthTest:!1});a.resolution.set(this.width,this.height),t.line=new ya(new ur,a),t.line.renderOrder=20,this.content.add(t.line)}let r=this.pick(e),s=r&&r!==t.id?this.nodeById.get(r).position:n;t.line.geometry.setPositions([i.position.x,0.08,i.position.z,s.x,0.08,s.z]),t.line.computeLineDistances()}this.invalidate()};handleEditUp=(e)=>{let t=this.drag;if(!t||e.pointerId!==t.pointerId)return;if(e.stopImmediatePropagation(),this.cancelDrag(),this.canvas.style.cursor=this.cursorOverride??"",!t.moved)this.selected=t.id,this.onSelect(t.id);else if(t.mode==="move"&&e.type==="pointerup")this.onEdit({type:"move",id:t.id,...this.toScene(this.nodeById.get(t.id).position)});else if(t.mode==="connect"&&e.type==="pointerup"){let n=this.pick(e);if(n&&n!==t.id)this.onEdit({type:"connect",from:t.id,to:n})}this.invalidate()};cancelDrag(){let e=this.drag?.line;if(e)e.removeFromParent(),e.geometry.dispose(),e.material.dispose();this.drag=null}handleWheel=(e)=>{let t=this.wheelZoom==="always"||this.engaged||e.ctrlKey||e.metaKey;if(this.controls.enableZoom=t,!t)this.onScrollPast()};handlePointerDown=(e)=>{this.pointerDown={x:e.clientX,y:e.clientY},this.engaged=!0};handlePointerUp=(e)=>{let t=this.pointerDown;if(this.pointerDown=null,!t||Math.hypot(e.clientX-t.x,e.clientY-t.y)>5)return;let n=this.pick(e);this.selected=n,this.onSelect(n),this.invalidate()};handlePointerMove=(e)=>{if(e.buttons)return;let t=this.pick(e);if(t===this.hovered)return;this.hovered=t,this.canvas.style.cursor=this.cursorOverride??(t?"pointer":""),this.invalidate()};handlePointerLeave=()=>{if(this.engaged=!1,this.hovered===null)return;this.hovered=null,this.invalidate()};frame=(e)=>{if(this.raf=requestAnimationFrame(this.frame),this.clock=e/1000,this.tween){let n=os((e-this.tween.start)/this.tween.duration);if(this.camera.position.lerpVectors(this.tween.from,this.tween.to,n),n>=1)this.tween=null;this.dirty=!0}this.controls.update();let t=this.ambient&&this.onScreen&&!document.hidden;if(this.dirty||t&&this.compiled)this.draw()};draw(){if(this.dirty=!1,this.compiled)this.updateNodes(),this.updateEdges(),this.updatePackets(),this.updateQueues(),this.updateNotes();let e=this.camera.position.distanceTo(this.controls.target),t=this.scene.fog;if(t)t.near=e*1.15,t.far=e*3.4;if(this.composer)this.renderGlow(),this.composer.render();else this.renderer.render(this.scene,this.camera);this.renderer.autoClear=!1,this.renderer.clearDepth(),this.renderer.render(this.overlay,this.camera),this.renderer.autoClear=!0,this.onFrame()}worldPerPixel(e){let t=this.camera.position.distanceTo(e);return 2*Math.tan(gv*Math.PI/360)*t/this.height}sizeSprite(e,t,n,i,r=1){let s=this.worldPerPixel(i),a=this.width<640?0.78:1,o=Math.min(n[1],Math.max(n[0],Wl/s))*r*a,l=t.height*o;return e.scale.set(t.width*o*s,l*s,1),l}blink(e,t){if(!this.ambient||e<=0)return 1;let n=0.5+0.5*Math.sin((this.clock*e+t)*Math.PI*2);return e>=2?n>0.5?1:0.15:0.35+0.65*n}updateNodes(){let e=this.compiled,t=this.t,n=new P;for(let i of this.nodeViews){let r=i.node.segments,s=vr(r,t),a=i.looks[s],o=i.looks[s-1]??a,l=s===0?1/0:t-r[s].t,c=os(l/0.5);i.main.color.copy(o.color).lerp(a.color,c),i.detail.color.copy(i.main.color).multiplyScalar(0.55),i.main.roughness=o.roughness+(a.roughness-o.roughness)*c,i.main.clearcoat=a.toneName==="down"?0.15:0.85;let d=o.opacity+(a.opacity-o.opacity)*c;i.main.opacity=i.detail.opacity=d,i.main.depthWrite=i.detail.depthWrite=d>0.95;let h=this.color.copy(o.tone).lerp(a.tone,c),u=o.glow+(a.glow-o.glow)*c;i.main.emissive.copy(h).multiplyScalar(u);let p=(o.lit+(a.lit-o.lit)*c)*this.blink(a.blink,i.phase*0.37);i.glow.emissive.copy(h).multiplyScalar(ZA*p),i.ringMaterial.emissive.copy(h).multiplyScalar(0.9+1.1*p),i.rippleMaterial.color.copy(h);let g=a.tilt;if(a.tilt>o.tilt)g=n2(l/0.95);else if(a.tilt<o.tilt)g=1-os(l/0.8);if(i.body.tips)i.pivot.quaternion.setFromAxisAngle(i.axis,g*1.44),i.body.group.scale.setScalar(Ca);else i.pivot.quaternion.identity(),i.body.group.scale.set(1+g*0.12,1-g*0.42,1+g*0.12).multiplyScalar(Ca);let x=o.jitter+(a.jitter-o.jitter)*c,m=x?Math.abs(Math.sin(t*31+i.phase))*x:0;if(i.body.floats&&this.ambient)m+=(0.5+0.5*Math.sin(this.clock*1.3+i.phase))*0.06*(1-g);if(i.pivot.position.y=_n+m,i.orbit&&this.ambient)i.orbit.rotation.z=this.clock*a.spin+i.phase;let f=o.pulse+(a.pulse-o.pulse)*c;if(i.ringMaterial.emissiveIntensity=1+Math.sin(t*5.2+i.phase)*0.25*f,l<1.1)i.ripple.visible=!0,i.ripple.scale.setScalar(1+l*1.15),i.rippleMaterial.opacity=(1-l/1.1)*0.75;else i.ripple.visible=!1;i.halo.visible=i.node.id===this.hovered&&i.node.id!==this.selected;let w=e.states.get(r[s].state)?.tone??"idle";if(w!==i.chipState){let S=i.chipArt.get(w);if(!S)S=cv(this.theme,Ui(i.node.icon).node,i.node.label,this.theme.tones[w]),i.chipArt.set(w,S);i.chip.material.map=S.texture,i.chip.material.needsUpdate=!0,i.chipState=w}let v=i.chipArt.get(w);i.chip.getWorldPosition(n),i.chipPx=this.sizeSprite(i.chip,v,KA,n)}if(this.declutter(),this.selection){let i=this.selected?this.nodeById.get(this.selected):void 0;if(this.selection.visible=Boolean(i),i)this.selection.position.set(i.position.x,0.01,i.position.z)}}declutter(){let e=new P,t=Math.abs(this.camera.getWorldDirection(this.scratchVector).y),n=this.nodeViews.map((r)=>{let s=jt*t/this.worldPerPixel(r.position),o=(1-(e.copy(r.position).project(this.camera).y*0.5+0.5))*this.height-s;r.chip.getWorldPosition(e);let l=e.project(this.camera),c=r.chipArt.get(r.chipState),d=(1-(l.y*0.5+0.5))*this.height;return{view:r,x:(l.x*0.5+0.5)*this.width,y:d,w:c.width/c.height*r.chipPx,h:r.chipPx,depth:l.z,base:Math.max(0,d-o)}});n.sort((r,s)=>r.depth-s.depth);let i=[];for(let r of n){let s=r.base;for(let a=0;a<8;a++){let o={left:r.x-r.w/2,right:r.x+r.w/2,top:r.y-s-r.h,bottom:r.y-s},l=i.find((c)=>yv(o,c,2));if(!l)break;if(s=r.y-l.top+3,s>r.base+r.h*2.4){s=r.base;break}}r.view.liftPx=s,r.view.chip.center.set(0.5,-s/r.h),i.push({left:r.x-r.w/2,right:r.x+r.w/2,top:r.y-s-r.h,bottom:r.y-s})}this.chipBoxes=i}updateEdges(){let e=this.theme,t=this.t;for(let n of this.edgeViews){let i=n.edge.segments,r=vr(i,t),s=i[r].state,a=i[r-1]?.state??s,o=r===0?1/0:t-i[r].t,l=os(o/0.4);this.color.set(e.edges[a]).lerp(new Ne(e.edges[s]),l),n.tubeMaterial.color.copy(this.color),n.arrow.color.copy(this.color),n.tubeMaterial.emissive.copy(this.color).multiplyScalar(s==="flowing"?0:0.35);let c=s==="cut"||s==="dropping";if(n.tube.visible=!c,n.dashes.visible=c,c)n.dashMaterial.color.copy(this.color),n.dashMaterial.dashSize=s==="cut"?0.05:0.09,n.dashMaterial.gapSize=s==="cut"?0.14:0.1,n.dashMaterial.dashOffset=s==="dropping"?-(t*0.45%0.19):0,n.dashMaterial.resolution.set(this.width,this.height);let d=s==="cut";if(n.cutMark.visible=d,d){let h=this.worldPerPixel(n.cutMark.position);n.cutMark.scale.setScalar(Math.max(0.3,20*h)*(0.6+0.4*os(o/0.3)))}if(n.label&&n.labelArt){let h=this.sizeSprite(n.label,n.labelArt,QA,n.label.position),u=this.scratchVector.copy(n.label.position).project(this.camera),p=(u.x*0.5+0.5)*this.width,g=(1-(u.y*0.5+0.5))*this.height,x=n.labelArt.width/n.labelArt.height*h,m={left:p-x/2,right:p+x/2,top:g-h/2,bottom:g+h/2};n.label.visible=this.annotate.labels&&!this.chipBoxes.some((f)=>yv(m,f,0))}}}placePacket(e,t,n,i,r,s,a){let o=this.packets,l=this.compiled,c=In(e.path,e.lengths,t),d=In(e.path,e.lengths,t+3),h=In(e.path,e.lengths,t-3),u=d.x-h.x,p=d.y-h.y,g=Math.hypot(u,p)||1;this.scratch.position.set((c.x+-p/g*n-l.width/2)*vn,i,(c.y+u/g*n-l.height/2)*vn),this.scratch.scale.setScalar(Math.max(0.001,r)),this.scratch.updateMatrix(),o.setMatrixAt(a,this.scratch.matrix),o.setColorAt(a,s)}updatePackets(){let e=this.packets;if(!e)return;let t=this.t,n=0,i=xv*($l+1);for(let r of this.edgeViews){let s=r.edge;xs(s,t,(a)=>{if(n+$l+1>i)return;let o,l=0.15,c=Math.min(1,(t-a.depart)/0.12)*(a.message?1.9:1),d=this.packetColors.ok,h=!1;if(t<=a.arrive){if(o=(t-a.depart)/(a.arrive-a.depart)*a.reach*s.length,a.fate==="ok")c*=Math.min(1,(a.arrive-t)/0.08+0.25);h=!0}else if(a.fate==="bounce"){let u=(t-a.arrive)/(a.end-a.arrive);o=s.length*(1-u*0.6),l+=Math.sin(Math.PI*u)*0.42,c*=1-u*u,d=this.packetColors.bounce}else{let u=(t-a.arrive)/(a.end-a.arrive);o=a.reach*s.length,l-=u*u*0.2,c*=1-u,d=this.packetColors.drop}if(this.placePacket(s,o,a.lane,l,c,d,n++),h)for(let u=1;u<=$l;u++){let p=o-u*7;if(p<=0)break;this.placePacket(s,p,a.lane,l,c*(1-u*0.28),this.packetColors.trail,n++)}})}if(e.count=n,e.instanceMatrix.needsUpdate=!0,e.instanceColor)e.instanceColor.needsUpdate=!0}updateQueues(){let e=this.compiled,t=this.queued;if(!t)return;let n=this.scratch,i=this.t/e.flowStep,r=0;for(let s of this.nodeViews){let a=s.node.flow;if(!a||!s.gauge)continue;let o=a.load.length-1,l=Math.min(o,Math.floor(i)),c=Math.min(o,l+1),d=Math.min(1,Math.max(0,i-l)),h=a.load[l]+(a.load[c]-a.load[l])*d,u=a.queue[l]+(a.queue[c]-a.queue[l])*d,p=a.capacityAt?a.capacityAt[Math.min(o,l)]:a.capacity,g=Math.min(1.9,h/p),x=Math.max(0.012,g*ql);s.gauge.bar.scale.y=x,s.gauge.bar.position.y=_n+x/2;let m=g>1?"hot":g>0.88?"warn":"ok";s.gauge.material.emissive.set(this.theme.tones[m]);let f=Math.round(u/a.queueLimit*YA);for(let w=0;w<f&&r<vv;w++){let v=Math.floor(w/6),S=w%6;n.position.set(s.position.x-0.98+S%3*0.1,0.045+v*0.092,s.position.z+0.5+Math.floor(S/3)*0.1),n.scale.setScalar(1),n.updateMatrix(),t.setMatrixAt(r++,n.matrix)}}t.count=r,t.instanceMatrix.needsUpdate=!0}updateNotes(){let e=this.compiled,t=this.t,n=(r)=>r.sent?jA:_v,i=new Set(this.annotate.notes?vs(e.beats,t,_v).filter((r)=>!r.log&&t-r.t<=n(r)):[]);for(let[r,s]of this.notes)if(!i.has(r))s.sprite.visible=!1;for(let r of i){let s=this.notes.get(r);if(!s){let c=r.state?e.states.get(r.state):void 0,d=r.target.kind==="edge"?this.theme.edges[r.state??"flowing"]:this.theme.tones[c?.tone??"idle"],h=dv(this.theme,r.note,r.state?d:this.theme.textMuted),u=new Ji(new Ri({map:h.texture,depthTest:!1,transparent:!0,toneMapped:!1}));u.center.set(0.5,0),u.renderOrder=20,this.labels.add(u),s={sprite:u,art:h},this.notes.set(r,s)}let a=this.noteAnchor(r);if(!a){s.sprite.visible=!1;continue}let o=t-r.t;s.sprite.visible=!0,s.sprite.position.copy(a.position),s.sprite.material.opacity=Math.min(1,o/0.2)*Math.min(1,(n(r)-o)/0.7);let l=this.sizeSprite(s.sprite,s.art,JA,a.position,0.86+0.14*os(o/0.25));s.sprite.center.set(0.5,-a.raisePx/l)}}noteAnchor(e){let t=this.compiled;if(e.target.kind==="node"){let i=this.nodeById.get(e.target.id);if(!i)return null;return{position:i.chip.position.clone(),raisePx:i.chipPx+i.liftPx+4}}if(e.target.kind==="edge"){let i=this.edgeViews.find((r)=>r.edge.id===e.target.id);return i?{position:i.middle.clone().setY(0.16),raisePx:16}:null}let n=t.groups.find((i)=>i.id===e.target.id);return n?{position:this.toWorld(n.box.x,n.box.y-n.box.height/2,0.5),raisePx:0}:null}}var bv=`
:host {
  display: block;
  position: relative;
  height: var(--topple-height, 600px);
  min-height: 320px;
  container-type: inline-size;
  font-family: var(--topple-font, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);
  font-size: 14px;
  line-height: 1.5;
  text-align: left;
  -webkit-font-smoothing: antialiased;
}
:host([hidden]) { display: none; }
:host(:fullscreen) { height: 100vh; }

*, *::before, *::after { box-sizing: border-box; }

.tp {
  --bg: #f3f2ee;
  --surface: #ffffff;
  --surface-2: #f4f3ef;
  --line: #e0ddd3;
  --text: #17181c;
  --muted: #6b6d75;
  --accent: var(--topple-accent, #c8106f);
  --accent-ink: #ffffff;
  --overlay: rgba(255, 255, 255, 0.82);
  --ok: #12a871;
  --warn: #d98a0b;
  --hot: #e8621a;
  --down: #e03a4e;
  --mend: #2f86e0;
  --idle: #8a919e;
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr) auto;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--topple-radius, 14px);
  background: var(--bg);
  color: var(--text);
  outline: none;
}
.tp[data-theme="dark"] {
  --bg: #0c0e13;
  --surface: #14171e;
  --surface-2: #1b1f28;
  --line: #272c38;
  --text: #f1f3f7;
  --muted: #98a1b3;
  --accent: var(--topple-accent, #f0569f);
  --accent-ink: #0c0e13;
  --overlay: rgba(18, 21, 28, 0.78);
  --ok: #3ddc97;
  --warn: #f7b955;
  --hot: #ff8a4c;
  --down: #ff5d6c;
  --mend: #5fb4ff;
  --idle: #7b8494;
}
.tp[data-rail="none"] .rail { display: none; }

@container (min-width: 1000px) {
  .tp:not([data-rail="none"]) {
    grid-template-columns: minmax(0, 1fr) 328px;
    grid-template-rows: minmax(0, 1fr);
  }
  .tp:not([data-rail="none"]) .rail {
    border-top: 0;
    border-left: 1px solid var(--line);
    max-height: none;
    height: auto;
  }
  .tp:not([data-rail="none"]) .caption { display: none; }
}

button {
  font: inherit;
  color: inherit;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
}
button:focus-visible, a:focus-visible, .track:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
svg { display: block; }

/* -- Stage ---------------------------------------------------------------- */

.main { display: grid; grid-template-rows: minmax(0, 1fr) auto; min-width: 0; min-height: 0; }
.stage { position: relative; min-height: 0; overflow: hidden; cursor: grab; }
.stage:active { cursor: grabbing; }
.views { position: absolute; inset: 0; display: flex; gap: 1px; background: var(--line); }
.view { position: relative; flex: 1; min-width: 0; background: var(--bg); }
.view[hidden] { display: none; }
.canvas, .canvas-b { position: absolute; inset: 0; }
.badge {
  position: absolute;
  left: 50%;
  bottom: 12px;
  transform: translateX(-50%);
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--overlay);
  backdrop-filter: blur(8px);
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;
}
.badge[hidden] { display: none; }
.tp[data-comparing] .legend, .tp[data-comparing] .caption { display: none; }
.tp[data-breaking] .tool[data-act="break"] { color: var(--accent-ink); background: var(--accent); border-color: var(--accent); }

.top {
  position: absolute;
  inset: 0 0 auto 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  pointer-events: none;
}
.heading { min-width: 0; padding: 4px 6px; }
.heading strong {
  display: block;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.25;
  text-wrap: balance;
}
.heading span { display: block; margin-top: 2px; font-size: 12px; color: var(--muted); }

.tools { display: flex; gap: 6px; pointer-events: auto; flex: none; }
.tool {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 9px;
  border: 1px solid var(--line);
  background: var(--overlay);
  backdrop-filter: blur(8px);
  color: var(--muted);
  transition: color 0.15s, border-color 0.15s;
}
.tool:hover, .tool[aria-pressed="true"], .tool[aria-expanded="true"] { color: var(--text); border-color: var(--muted); }
.tool[hidden] { display: none; }

.legend {
  position: absolute;
  left: 12px;
  bottom: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 12px;
  max-width: calc(100% - 24px);
  padding: 6px 10px;
  border-radius: 9px;
  border: 1px solid var(--line);
  background: var(--overlay);
  backdrop-filter: blur(8px);
  font-size: 11.5px;
  color: var(--muted);
  pointer-events: none;
}
.legend:empty { display: none; }
.legend span { display: inline-flex; align-items: center; gap: 5px; white-space: nowrap; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: var(--idle); flex: none; }
.dot[data-tone="ok"] { background: var(--ok); }
.dot[data-tone="warn"] { background: var(--warn); }
.dot[data-tone="hot"] { background: var(--hot); }
.dot[data-tone="down"] { background: var(--down); }
.dot[data-tone="mend"] { background: var(--mend); }

.caption {
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  display: none;
  align-items: baseline;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: var(--overlay);
  backdrop-filter: blur(8px);
  pointer-events: none;
}
.tp[data-rail="none"] .caption:not(:empty) { display: flex; }
.tp[data-rail="none"] .legend { display: none; }
.caption em { font-style: normal; font-size: 11.5px; font-weight: 600; color: var(--muted); white-space: nowrap; }
.caption b { font-size: 13.5px; font-weight: 650; }

.message {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 24px;
  text-align: center;
  color: var(--muted);
  background: var(--bg);
}
.message[hidden] { display: none; }
/* The credit sits in the corner of embeds; the controls bar never covers it. */
.credit {
  position: absolute;
  right: 12px;
  bottom: 12px;
  z-index: 3;
  padding: 4px 9px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--overlay);
  backdrop-filter: blur(8px);
  font-size: 11px;
  font-weight: 600;
  color: var(--muted);
  text-decoration: none;
}
.credit:hover { color: var(--text); border-color: var(--muted); }
.credit[hidden] { display: none; }
.tp:has(.credit:not([hidden])) .caption { right: 140px; }

/* The 2D annotated view: an SVG drawing in place of the 3D canvas, with a key to its numbered steps. */
.flat { position: absolute; inset: 0; display: none; grid-template-columns: minmax(0, 1fr) auto; }
.tp[data-mode="2d"] .flat { display: grid; }
.tp[data-mode="2d"] .canvas { display: none; }
.flat svg { display: block; width: 100%; height: 100%; min-height: 0; }
/* The key sits beside the drawing, never over it, and below it on narrow players. */
.flat-key {
  width: 230px;
  align-self: start;
  max-height: calc(100% - 112px);
  margin: 56px 12px 0 0;
  overflow: auto;
  padding: 8px 10px;
  list-style: none;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: var(--overlay);
  font-size: 11.5px;
  line-height: 1.35;
  color: var(--muted);
}
@media (max-width: 640px) {
  .flat { grid-template-columns: minmax(0, 1fr); grid-template-rows: minmax(0, 1fr) auto; }
  .flat-key { width: auto; max-height: 34%; margin: 0 12px 52px; }
}
.flat-key[hidden] { display: none; }
.flat-key li { display: flex; gap: 7px; padding: 2px 0; }
.flat-key b { flex: none; min-width: 14px; color: var(--accent); }
.flat-key li[data-current] { color: var(--text); }
.tp[data-no-legend] .legend { display: none; }
/* Recording reads the 3D canvas, so video export is offered in the 3D views. */
.tp[data-mode="2d"] [data-share^="video"] { display: none; }

/* Editing by hand: a strip of parts to drag in, replacing the legend and caption. */
.palette {
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  z-index: 4;
  padding: 8px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: var(--overlay);
  backdrop-filter: blur(8px);
}
.palette[hidden] { display: none; }
.palette p { margin: 0 2px 6px; font-size: 11.5px; color: var(--muted); }
.palette div { display: flex; flex-wrap: wrap; gap: 4px; }
.palette button {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--text);
  font: inherit;
  font-size: 12px;
  cursor: grab;
}
.palette button:hover { border-color: var(--muted); }
.palette svg { color: var(--accent); }
.tp[data-editing] .legend, .tp[data-editing] .caption, .tp[data-editing] .credit, .tp[data-editing] .blank { display: none; }
.tp[data-editing] .tool[data-act="edit"] { color: var(--accent); border-color: var(--accent); }

.hint {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.72);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  pointer-events: none;
  z-index: 4;
}
.hint[hidden] { display: none; }
.blank {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: min(360px, calc(100% - 32px));
  padding: 16px 20px;
  border-radius: 12px;
  border: 1px dashed var(--line);
  background: var(--overlay);
  backdrop-filter: blur(8px);
  text-align: center;
  font-size: 13px;
  color: var(--muted);
  pointer-events: none;
}
.blank[hidden] { display: none; }
.blank strong { display: block; margin-bottom: 4px; font-size: 15px; color: var(--text); }
.blank code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 12px; color: var(--text); }
.message div { max-width: 360px; }
.message strong { display: block; margin-bottom: 4px; color: var(--text); font-size: 15px; }

.problems {
  position: absolute;
  left: 12px;
  top: 58px;
  max-width: min(420px, calc(100% - 24px));
  padding: 8px 10px;
  border-radius: 9px;
  border: 1px solid color-mix(in srgb, var(--down) 45%, var(--line));
  background: var(--overlay);
  backdrop-filter: blur(8px);
  font-size: 12px;
  color: var(--text);
}
.problems[hidden] { display: none; }
.problems b { color: var(--down); }
.problems ul { margin: 4px 0 0; padding: 0; list-style: none; }
.problems li { color: var(--muted); }

/* -- Share menu ----------------------------------------------------------- */

.share {
  position: absolute;
  top: 52px;
  right: 12px;
  width: 248px;
  padding: 6px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: var(--surface);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.22);
  z-index: 5;
}
.share[hidden] { display: none; }
.share p { margin: 6px 8px 4px; font-size: 11px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--muted); }
.share button {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 7px 8px;
  border-radius: 8px;
  font-size: 13px;
  text-align: left;
}
.share button:hover { background: var(--surface-2); }
.share button svg { color: var(--muted); flex: none; }
.share button[data-done] svg { color: var(--ok); }
.share button:disabled { opacity: 0.5; cursor: default; }

.recording {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 6px 6px 12px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--surface);
  font-size: 12.5px;
  font-variant-numeric: tabular-nums;
  z-index: 6;
}
.recording[hidden] { display: none; }
.recording i { width: 9px; height: 9px; border-radius: 50%; background: var(--down); animation: blink 1s steps(2) infinite; }
.recording button { padding: 3px 10px; border-radius: 999px; background: var(--surface-2); font-weight: 600; }
@keyframes blink { 50% { opacity: 0.25; } }

/* -- Transport ------------------------------------------------------------ */

.bar {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 10px;
  border-top: 1px solid var(--line);
  background: var(--surface);
}
.tp[data-controls="none"] .bar { display: none; }
.tp[data-tools="none"] .tools { display: none; }
.tp[data-controls="minimal"] .step, .tp[data-controls="minimal"] .speed { display: none; }
.btn {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 9px;
  color: var(--muted);
  flex: none;
}
.btn:hover { color: var(--text); background: var(--surface-2); }
.btn.play { width: 36px; height: 36px; border-radius: 50%; background: var(--text); color: var(--bg); }
.btn.play:hover { background: var(--text); color: var(--bg); opacity: 0.88; }
.time { flex: none; min-width: 78px; padding: 0 6px; font-size: 12px; color: var(--muted); font-variant-numeric: tabular-nums; text-align: center; }
.speed { flex: none; width: 40px; height: 28px; border-radius: 8px; font-size: 12px; font-weight: 600; color: var(--muted); font-variant-numeric: tabular-nums; }
.speed:hover { color: var(--text); background: var(--surface-2); }

.track { position: relative; flex: 1; min-width: 60px; height: 32px; cursor: pointer; touch-action: none; border-radius: 6px; }
.rails { position: absolute; left: 0; right: 0; top: 13px; height: 6px; display: flex; gap: 2px; }
.rails i { display: block; height: 100%; border-radius: 3px; background: var(--line); min-width: 2px; overflow: hidden; position: relative; }
.rails i b { position: absolute; inset: 0 auto 0 0; background: var(--text); border-radius: 0; }
.ticks { position: absolute; left: 0; right: 0; top: 4px; height: 6px; pointer-events: none; }
.ticks i { position: absolute; top: 0; width: 5px; height: 5px; margin-left: -2.5px; border-radius: 50%; background: var(--idle); }
.ticks i[data-tone="ok"] { background: var(--ok); }
.ticks i[data-tone="warn"] { background: var(--warn); }
.ticks i[data-tone="hot"] { background: var(--hot); }
.ticks i[data-tone="down"] { background: var(--down); }
.ticks i[data-tone="mend"] { background: var(--mend); }
.thumb {
  position: absolute;
  top: 9px;
  width: 14px;
  height: 14px;
  margin-left: -7px;
  border-radius: 50%;
  background: var(--text);
  border: 2px solid var(--surface);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  pointer-events: none;
}
.tip {
  position: absolute;
  bottom: 30px;
  transform: translateX(-50%);
  padding: 3px 8px;
  border-radius: 7px;
  background: var(--text);
  color: var(--bg);
  font-size: 11.5px;
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;
}
.tip[hidden] { display: none; }

/* -- Rail ----------------------------------------------------------------- */

.rail {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  min-height: 0;
  height: 172px;
  border-top: 1px solid var(--line);
  background: var(--surface);
}
.tabs { display: flex; gap: 2px; padding: 8px 10px 0; border-bottom: 1px solid var(--line); }
.tab { padding: 6px 8px 8px; font-size: 12.5px; font-weight: 600; color: var(--muted); border-bottom: 2px solid transparent; margin-bottom: -1px; }
.tab:hover { color: var(--text); }
.tab[aria-selected="true"] { color: var(--text); border-bottom-color: var(--text); }
.panel { overflow-y: auto; min-height: 0; padding: 10px; scrollbar-width: thin; scrollbar-color: var(--line) transparent; }
.panel[hidden] { display: none; }
.empty { margin: 14px 6px; color: var(--muted); font-size: 13px; }

.summary { margin: 2px 6px 12px; font-size: 13px; color: var(--muted); }

.chapter { border-radius: 10px; }
.chapter + .chapter { margin-top: 2px; }
.chapter > button { display: flex; align-items: baseline; gap: 8px; width: 100%; padding: 7px 8px; border-radius: 10px; text-align: left; }
.chapter > button:hover { background: var(--surface-2); }
.chapter .num { flex: none; width: 18px; font-size: 11.5px; font-weight: 600; color: var(--muted); font-variant-numeric: tabular-nums; }
.chapter .name { flex: 1; min-width: 0; font-size: 13.5px; font-weight: 600; color: var(--muted); }
.chapter .tag { flex: none; font-size: 11px; color: var(--muted); white-space: nowrap; }
.chapter .text { display: none; padding: 0 8px 10px 34px; font-size: 13.5px; line-height: 1.55; color: var(--text); }
.chapter .text p { margin: 0 0 8px; }
.chapter .text p:last-child { margin-bottom: 0; }
.chapter[data-active] { background: var(--surface-2); }
.chapter[data-active] .name { color: var(--text); }
.chapter[data-active] .num { color: var(--accent); }
.chapter[data-active] .text { display: block; }
.chapter[data-past] .name { color: var(--text); }

.sources { margin: 14px 8px 4px; padding-top: 10px; border-top: 1px solid var(--line); font-size: 12px; color: var(--muted); }
.sources a { color: var(--text); text-decoration: underline; text-decoration-color: var(--line); text-underline-offset: 3px; }
.sources a:hover { text-decoration-color: var(--text); }

.event { display: grid; grid-template-columns: 34px 10px minmax(0, 1fr); gap: 8px; align-items: baseline; width: 100%; padding: 6px 8px; border-radius: 9px; text-align: left; }
.event:hover { background: var(--surface-2); }
.event time { font-size: 11.5px; color: var(--muted); font-variant-numeric: tabular-nums; }
.event .dot { align-self: center; }
.event .what { font-size: 13px; font-weight: 600; }
.event .what span { font-weight: 500; color: var(--muted); }
.event .note { display: block; font-size: 12.5px; font-weight: 400; color: var(--muted); }
.event[data-future] { opacity: 0.45; }
.event[data-current] { background: var(--surface-2); }
.event small { font-size: 10.5px; font-weight: 600; letter-spacing: 0.03em; text-transform: uppercase; color: var(--muted); margin-left: 6px; }

.inspect h3 { display: flex; align-items: center; gap: 8px; margin: 4px 6px 2px; font-size: 15px; font-weight: 700; }
.inspect .now { display: flex; align-items: center; gap: 6px; margin: 0 6px 12px; font-size: 13px; color: var(--muted); }
.inspect h4 { margin: 12px 6px 6px; font-size: 11px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--muted); }
.links { display: flex; flex-wrap: wrap; gap: 6px; margin: 0 6px; }
.links button { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 999px; border: 1px solid var(--line); font-size: 12.5px; }
.links button:hover { border-color: var(--muted); }
.links em { font-style: normal; color: var(--muted); font-size: 12.5px; }
.history { margin: 0 6px; padding: 0; list-style: none; font-size: 12.5px; }
.history li { display: flex; align-items: center; gap: 8px; padding: 3px 0; color: var(--muted); }
.history li[data-current] { color: var(--text); font-weight: 600; }
.history time { width: 34px; font-variant-numeric: tabular-nums; }

/* -- Logs ----------------------------------------------------------------- */

.panel.logs { display: grid; grid-template-rows: auto minmax(0, 1fr); padding: 0; overflow: hidden; }
.panel.logs[hidden] { display: none; }
.log-tools { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; padding: 8px 10px; border-bottom: 1px solid var(--line); }
.levels { display: flex; gap: 2px; padding: 2px; border-radius: 8px; background: var(--surface-2); }
.levels button { padding: 2px 8px; border-radius: 6px; font-size: 11.5px; font-weight: 600; color: var(--muted); }
.levels button[aria-pressed="true"] { background: var(--surface); color: var(--text); box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15); }
.log-source, .log-search {
  min-width: 0;
  height: 26px;
  padding: 0 8px;
  border-radius: 7px;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--text);
  font: inherit;
  font-size: 12px;
}
.log-source { flex: 1 1 96px; }
.log-search { flex: 1 1 110px; }
.log-search:focus, .log-source:focus { outline: none; border-color: var(--accent); }
.log-lines {
  overflow-y: auto;
  padding: 6px 0;
  background: color-mix(in srgb, var(--bg) 70%, var(--surface));
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11.5px;
  line-height: 1.45;
  scrollbar-width: thin;
  scrollbar-color: var(--line) transparent;
}
.log { display: grid; grid-template-columns: 34px 40px minmax(0, 1fr); gap: 6px; width: 100%; padding: 2px 10px; text-align: left; }
.log:hover { background: var(--surface-2); }
.log[hidden] { display: none; }
.log time { color: var(--muted); font-variant-numeric: tabular-nums; }
.log b { font-weight: 700; font-size: 10.5px; letter-spacing: 0.03em; color: var(--muted); padding-top: 1px; }
.log[data-level="info"] b { color: var(--mend); }
.log[data-level="warn"] b { color: var(--warn); }
.log[data-level="error"] b { color: var(--down); }
.log[data-level="error"] { background: color-mix(in srgb, var(--down) 7%, transparent); }
.log em { font-style: normal; font-weight: 600; color: var(--text); }
.log span { color: color-mix(in srgb, var(--text) 82%, var(--muted)); overflow-wrap: anywhere; }
.log-lines .empty { font-family: inherit; }

/* -- Metrics -------------------------------------------------------------- */

.metrics h4 { margin: 12px 4px 6px; font-size: 11px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--muted); }
.metrics h4:first-child { margin-top: 2px; }
.chart { position: relative; margin: 0 2px 8px; padding: 6px 6px 2px; border-radius: 9px; border: 1px solid var(--line); background: var(--surface); }
.chart canvas { display: block; width: 100%; }
.playhead { position: absolute; top: 4px; bottom: 4px; width: 1px; background: var(--text); opacity: 0.55; pointer-events: none; }

.action {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 2px 6px 4px;
  padding: 6px 12px;
  border-radius: 9px;
  border: 1px solid var(--line);
  background: var(--surface);
  font-size: 13px;
  font-weight: 600;
}
.action:hover { border-color: var(--muted); }
.action[data-on] { background: var(--accent); border-color: var(--accent); color: var(--accent-ink); }
.action.quiet { border-color: transparent; color: var(--muted); font-weight: 500; }
.action.quiet:hover { color: var(--text); border-color: transparent; background: var(--surface-2); }
.action[hidden] { display: none; }

.readings { display: grid; gap: 2px; margin: 0 6px 10px; font-size: 12.5px; }
.readings div { display: flex; justify-content: space-between; gap: 12px; }
.readings dt { color: var(--muted); }
.readings dd { margin: 0; font-variant-numeric: tabular-nums; font-weight: 600; }

.lab h4 { margin: 14px 6px 6px; font-size: 11px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--muted); }
.lab h4:first-child { margin-top: 4px; }
.hint { margin: 0 6px 8px; font-size: 12.5px; color: var(--muted); }
.switch { display: flex; align-items: center; gap: 10px; padding: 6px; border-radius: 9px; font-size: 13.5px; cursor: pointer; }
.switch:hover { background: var(--surface-2); }
.switch input { position: absolute; opacity: 0; pointer-events: none; }
.switch i { position: relative; flex: none; width: 32px; height: 19px; border-radius: 999px; background: var(--line); transition: background 0.15s; }
.switch i::after { content: ""; position: absolute; top: 2px; left: 2px; width: 15px; height: 15px; border-radius: 50%; background: var(--surface); box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3); transition: transform 0.15s; }
.switch input:checked + i { background: var(--accent); }
.switch input:checked + i::after { transform: translateX(13px); }
.switch input:focus-visible + i { outline: 2px solid var(--accent); outline-offset: 2px; }
.dial { display: block; padding: 4px 6px 8px; font-size: 13.5px; }
.dial span { display: flex; justify-content: space-between; gap: 12px; }
.dial output { font-variant-numeric: tabular-nums; font-weight: 600; }
.dial input { display: block; width: 100%; margin: 6px 0 0; accent-color: var(--accent); }
.changes { margin: 4px 6px 0; padding: 0; list-style: none; font-size: 12.5px; color: var(--muted); }
.changes li { display: flex; gap: 8px; padding: 2px 0; }
.changes time { width: 34px; font-variant-numeric: tabular-nums; }

/* Phone-sized players: a two-line title, smaller controls, more room for the scene. */
@container (max-width: 560px) {
  .top { padding: 8px; gap: 8px; }
  .heading { padding: 2px 4px; }
  .heading strong {
    font-size: 13px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .heading span { display: none; }
  .tools { gap: 4px; }
  .tool { width: 28px; height: 28px; border-radius: 8px; }
  .tool svg { width: 14px; height: 14px; }
  .legend { left: 8px; bottom: 8px; padding: 4px 8px; gap: 2px 8px; font-size: 10.5px; }
  .bar { padding: 6px 8px; gap: 2px; }
  .time { min-width: 0; font-size: 11px; padding: 0 4px; }
  .tab { padding: 6px 6px 8px; font-size: 12px; }
}

@media (prefers-reduced-motion: reduce) {
  .switch i, .switch i::after { transition: none; }
  .recording i { animation: none; }
}
`;var xf={sans:'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',serif:'ui-serif, "New York", "Iowan Old Style", Georgia, Cambria, "Times New Roman", serif',mono:'ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',rounded:'ui-rounded, "SF Pro Rounded", "Hiragino Maru Gothic ProN", Quicksand, Nunito, system-ui, sans-serif'},yn={ok:"#3ddc97",warn:"#f7b955",hot:"#ff8a4c",down:"#ff5d6c",mend:"#5fb4ff",idle:"#7b8494"},pr={ok:"#12a871",warn:"#d98a0b",hot:"#e8621a",down:"#e03a4e",mend:"#2f86e0",idle:"#8a919e"},Sv={dark:{name:"dark",background:"#0c0e13",ground:"#12151c",gridDot:"#2a303d",platform:"#181c26",platformEdge:"#323a4b",body:"#c9cfdb",edge:"#56607a",packet:"#b8f3ff",chip:"#191d27",chipBorder:"#343c4e",text:"#f1f3f7",textMuted:"#9aa3b5",tones:yn,edges:{flowing:"#56607a",slow:yn.warn,dropping:yn.hot,cut:yn.down},hemisphereSky:"#c9d6ff",hemisphereGround:"#1a1d26",sunIntensity:2.6,ambientIntensity:0.55,environmentIntensity:0.55,exposure:1.05,bloom:0.9,shadowOpacity:0.5,plinth:"#1f2430",font:'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',accent:"#f0569f"},light:{name:"light",background:"#f3f2ee",ground:"#e3e0d8",gridDot:"#cfccc2",platform:"#efede7",platformEdge:"#cdc9bd",body:"#e8e6e1",edge:"#9a9689",packet:"#3a3fd8",chip:"#ffffff",chipBorder:"#d9d5c9",text:"#17181c",textMuted:"#6b6d75",tones:pr,edges:{flowing:"#9a9689",slow:pr.warn,dropping:pr.hot,cut:pr.down},hemisphereSky:"#ffffff",hemisphereGround:"#cfc9ba",sunIntensity:2.7,ambientIntensity:0.28,environmentIntensity:0.3,exposure:0.9,bloom:0.55,shadowOpacity:0.5,plinth:"#d3cfc4",font:'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',accent:"#c8106f"}},wv={midnight:{base:"dark",overrides:{background:"#070b1a",ground:"#0b1126",gridDot:"#1e2a4d",platform:"#111a36",platformEdge:"#2a3a6b",plinth:"#141d3a",body:"#c7d2f0",chip:"#0f1630",chipBorder:"#2a3766",edge:"#4a5a8f",edges:{flowing:"#4a5a8f",slow:yn.warn,dropping:yn.hot,cut:yn.down},packet:"#9fb6ff",hemisphereSky:"#9fb3ff",accent:"#8ea2ff"}},blueprint:{base:"dark",overrides:{background:"#0b3a6e",ground:"#0d4280",gridDot:"#3f74b3",platform:"#0f4c90",platformEdge:"#7fb0ec",plinth:"#12589f",body:"#e8f1ff",chip:"#0d3d75",chipBorder:"#5d93d6",text:"#f2f7ff",textMuted:"#b8d0f0",edge:"#a9cbf5",edges:{flowing:"#a9cbf5",slow:yn.warn,dropping:yn.hot,cut:yn.down},packet:"#ffffff",hemisphereSky:"#d6e7ff",hemisphereGround:"#0b3a6e",bloom:0.6,accent:"#9fd0ff"}},terminal:{base:"dark",overrides:{background:"#050806",ground:"#080d09",gridDot:"#163a20",platform:"#0b130d",platformEdge:"#1f5a2c",plinth:"#0e1a10",body:"#b9c9bc",chip:"#08110a",chipBorder:"#1f5a2c",text:"#c8f7d1",textMuted:"#6fae7c",edge:"#2c6a3a",edges:{flowing:"#2c6a3a",slow:yn.warn,dropping:yn.hot,cut:yn.down},packet:"#4dff7c",hemisphereSky:"#b8ffc8",accent:"#4dff7c",font:xf.mono}},paper:{base:"light",overrides:{background:"#f6f1e6",ground:"#efe7d6",gridDot:"#d9ccb2",platform:"#f3ebdb",platformEdge:"#cdbd9c",plinth:"#e2d6bd",body:"#fbf7ee",chip:"#fffaf0",chipBorder:"#dccfb3",text:"#2b241a",textMuted:"#7a6b55",edge:"#a8977a",edges:{flowing:"#a8977a",slow:pr.warn,dropping:pr.hot,cut:pr.down},packet:"#b5541d",accent:"#b5541d",font:xf.serif}}};function Mv(e,t){return e?.look&&e.look!=="studio"?wv[e.look].base:t}function Ev(e,t){if(!t)return e;let n=t.look&&t.look!=="studio"?wv[t.look].overrides:{},i={...e,...n};if(t.accent)i.accent=t.accent,i.packet=t.accent;if(t.font)i.font=xf[t.font];return i}var vf=[0.5,1,2,4],s2=[{label:"Service",icon:"server"},{label:"Database",icon:"database"},{label:"Cache",icon:"cache"},{label:"Queue",icon:"queue"},{label:"Users",icon:"users"},{label:"Gateway",icon:"gateway"},{label:"Storage",icon:"storage"},{label:"Function",icon:"function"},{label:"Agent",icon:"bot"},{label:"Model",icon:"llm"},{label:"Tool",icon:"tool"},{label:"Firewall",icon:"firewall"}],_f="application/x-topple-part",Tv={ok:1,idle:0,mend:2,warn:3,hot:4,down:5},pt=(e)=>e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),bt=(e,t=16)=>Ts(e,t),Av={debug:0,info:1,warn:2,error:3},Yl=(e)=>Math.abs(e)>=100?String(Math.round(e)):String(Math.round(e*10)/10);class mr extends HTMLElement{static observedAttributes=["src","theme","controls","rail","tools","view","speed","loop","options","compare","quality","wheel-zoom","no-credit","scroll","scroll-steps","editable","annotations"];static shareBase=null;static shortener=null;root;frame;stage=null;playback=new Yd;compiled=null;diagnosticList=[];sourceText=null;loadedSrc=null;loadToken=0;built=!1;tab="story";selected=null;steps=[];bounds=[0,1];lastChapter=-2;lastBeat=-2;telemetry=null;metricsDrawn=!1;logFilter={level:"all",source:"",search:""};logShown=-1;lastReading=-1;recording=null;chosenOptions={};chosenSliders={};interventions=[];breakMode=!1;comparing=!1;stageB=null;labKey="";media=window.matchMedia("(prefers-color-scheme: dark)");constructor(){super();this.root=this.attachShadow({mode:"open"})}get source(){return this.sourceText??""}set source(e){if(this.sourceText=e,this.loadedSrc=null,this.built)this.applySource(e)}get currentTime(){return this.playback.time}set currentTime(e){this.playback.seek(e)}get duration(){return this.playback.duration}get paused(){return!this.playback.playing}get diagnostics(){return this.diagnosticList}play(){this.playback.play()}pause(){this.playback.pause()}seek(e){this.playback.seek(e)}showTab(e){this.tab=e,this.syncTabs()}inspect(e){this.select(e)}track(e,t={}){this.dispatchEvent(new CustomEvent("topple-action",{detail:{action:e,scene:this.compiled?.scene.title??"",...t},bubbles:!0,composed:!0}))}sliderTracked=new Set;setOption(e,t){this.track("what_if",{option:e,on:t}),this.chosenOptions[e]=t,this.recompile()}setSlider(e,t){if(!this.sliderTracked.has(e))this.sliderTracked.add(e),this.track("dial",{dial:e});this.chosenSliders[e]=t,this.recompile()}breakNode(e,t){let n=this.compiled,i=n?.nodes.find((a)=>a.id===e);if(!n||!i)return;let r=this.playback.time,s=this.toneOf(Ct(i.segments,r).state)==="down";if(this.interventions.push({t:Math.round(r*100)/100,node:e,action:t??(s?"fix":"break")}),this.track(s?"fix":"break",{node:e}),this.recompile(),!this.playback.playing)this.playback.play()}resetChanges(){this.chosenOptions=this.optionsFromAttribute(),this.chosenSliders={},this.interventions=[],this.recompile()}async snapshot(e=!1,t="wide"){if(!this.compiled)return null;if(this.mode==="2d"&&this.flat){let i=new Es(await this.flat.toCanvas(2),this.sceneTheme(),e?this.telemetry:null,t);return i.draw(this.frameInfo()),i.toBlob()}if(!this.stage)return null;let n=new Es(this.stage.canvas,this.sceneTheme(),e?this.telemetry:null,t);return this.stage.renderNow(),n.draw(this.frameInfo()),n.toBlob()}connectedCallback(){if(!this.built)this.build();if(this.media.addEventListener("change",this.handleScheme),document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>this.resolveSource(),{once:!0});else queueMicrotask(()=>this.resolveSource())}disconnectedCallback(){this.media.removeEventListener("change",this.handleScheme),this.playback.pause(),this.stopScroll?.(),this.stopScroll=null}stopScroll=null;stopAt=null;applyScroll(){if(this.stopScroll?.(),this.stopScroll=null,!this.compiled||!this.isConnected)return;let e=this.getAttribute("scroll"),t=this.compiled.scene.chapters,n={duration:this.compiled.duration,seek:(i)=>{this.stopAt=null,this.playback.pause(),this.playback.seek(i)},playRange:(i,r)=>{this.playback.seek(i),this.stopAt=r,this.playback.play()},chapterStart:(i)=>t[i]?.t,chapterEnd:(i)=>t[i+1]?.t??this.compiled.duration};if(e==="scrub")this.stopScroll=Dg(this,n);else if(e==="chapters")this.stopScroll=kg(this.getAttribute("scroll-steps")??"[data-step]",n)}applyCredit(){let e=this.$(".credit");e.hidden=this.hasAttribute("no-credit"),e.href=`${this.shareBase()}/?ref=embed`}attributeChangedCallback(e,t,n){if(!this.built||t===n)return;if(e==="src")this.resolveSource();else if(e==="theme")this.applyTheme();else if(e==="annotations")this.applyAnnotations();else if(e==="view")this.setMode(this.stage?this.modeFromAttribute():"2d");else if(e==="speed")this.setSpeed(Number(n)||1);else if(e==="loop")this.playback.loop=n!==null;else if(e==="options")this.chosenOptions=this.optionsFromAttribute(),this.recompile();else if(e==="compare")this.setComparing(n!==null);else if(e==="quality")this.stage?.setQuality(this.qualityName());else if(e==="wheel-zoom")this.stage?.setWheelZoom(n==="always"?"always":"click");else if(e==="no-credit")this.applyCredit();else if(e==="scroll"||e==="scroll-steps")this.applyScroll();else if(e==="editable"){if(this.$('[data-act="edit"]').hidden=n===null,n===null)this.setEditing(!1)}else this.applyChrome();this.syncView()}$(e){return this.root.querySelector(e)}build(){this.built=!0,this.root.innerHTML=`
      <style>${bv}</style>
      <div class="tp" tabindex="0" part="frame">
        <div class="main">
          <div class="stage">
            <div class="views">
              <div class="view" data-view="b" hidden><div class="canvas-b"></div><span class="badge">As written</span></div>
              <div class="view" data-view="a"><div class="canvas"></div><span class="badge" hidden>With your changes</span></div>
            </div>
            <div class="top">
              <div class="heading"><strong></strong><span></span></div>
              <div class="tools">
                <button class="tool" data-act="edit" title="Edit layout: drag things to move them, Shift-drag to connect" aria-label="Edit layout" aria-pressed="false" hidden>${bt(Nc)}</button>
                <button class="tool" data-act="break" title="Break mode: click anything to break or fix it" aria-label="Break mode" aria-pressed="false">${bt(ds)}</button>
                <button class="tool" data-act="recenter" title="Recenter the scene" aria-label="Recenter the scene">${bt(Cc)}</button>
                <button class="tool" data-act="view" title="Switch between 3D and top-down view" aria-label="Switch between 3D and top-down view"></button>
                <button class="tool" data-act="fullscreen" title="Full screen" aria-label="Full screen">${bt(Lc)}</button>
                <button class="tool" data-act="share" title="Share and export" aria-label="Share and export" aria-expanded="false">${bt(qc)}</button>
              </div>
            </div>
            <div class="problems" hidden></div>
            <div class="legend"></div>
            <div class="caption"></div>
            <div class="share" hidden>
              <p>Share</p>
              <button data-share="link">${bt(Na)}<span>Copy link</span></button>
              <button data-share="short" hidden>${bt(Na)}<span>Copy short link</span></button>
              <button data-share="iframe">${bt(xr)}<span>Copy embed code</span></button>
              <button data-share="html">${bt(xr)}<span>Copy HTML widget</span></button>
              <p>Export</p>
              <button data-share="image">${bt(Mc)}<span>Save image</span></button>
              <button data-share="video">${bt(Fa)}<span>Record video</span></button>
              <button data-share="video-logs">${bt(Fa)}<span>Record with logs and metrics</span></button>
              <button data-share="video-vertical">${bt(hs)}<span>Record vertical video (9:16)</span></button>
              <button data-share="file">${bt(xc)}<span>Download scene file</span></button>
            </div>
            <div class="recording" hidden><i></i><span></span><button data-act="stop-recording">Stop</button></div>
            <div class="message" hidden></div>
            <div class="hint" hidden>Click the scene, or hold Ctrl or ⌘, to zoom</div>
            <a class="credit" target="_blank" rel="noopener">Made with Topple</a>
            <div class="palette" hidden>
              <p>Drag to move · Shift-drag to connect · Delete removes · drag in new parts</p>
              <div>${s2.map((t)=>`<button draggable="true" data-part="${t.icon}" data-label="${t.label}" title="Drag onto the scene, or click to add">${Ts(Ui(t.icon).node,14)}<span>${t.label}</span></button>`).join("")}</div>
            </div>
            <div class="blank" hidden><strong>An empty canvas</strong>Add your first thing, or write a line like <code>web -> api -> db</code></div>
          </div>
          <div class="bar">
            <button class="btn play" data-act="toggle" aria-label="Play"></button>
            <button class="btn step" data-act="prev" title="Previous step" aria-label="Previous step">${bt(Jc)}</button>
            <button class="btn step" data-act="next" title="Next step" aria-label="Next step">${bt(Qc)}</button>
            <div class="time">0:00 / 0:00</div>
            <div class="track" tabindex="0" role="slider" aria-label="Timeline" aria-valuemin="0">
              <div class="ticks"></div>
              <div class="rails"></div>
              <div class="thumb"></div>
              <div class="tip" hidden></div>
            </div>
            <button class="speed" data-act="speed" title="Playback speed" aria-label="Playback speed">1x</button>
          </div>
        </div>
        <aside class="rail">
          <div class="tabs" role="tablist">
            <button class="tab" role="tab" data-tab="story">Story</button>
            <button class="tab" role="tab" data-tab="logs">Logs</button>
            <button class="tab" role="tab" data-tab="metrics">Metrics</button>
            <button class="tab" role="tab" data-tab="inspect">Inspect</button>
            <button class="tab" role="tab" data-tab="lab">Lab</button>
          </div>
          <div class="panel" data-panel="story"></div>
          <div class="panel logs" data-panel="logs" hidden>
            <div class="log-tools">
              <div class="levels" role="group" aria-label="Log level">
                <button data-level="all" aria-pressed="true">All</button>
                <button data-level="info" aria-pressed="false">Info</button>
                <button data-level="warn" aria-pressed="false">Warn</button>
                <button data-level="error" aria-pressed="false">Error</button>
              </div>
              <select class="log-source" aria-label="Source"></select>
              <input class="log-search" type="search" placeholder="Search" aria-label="Search logs" />
            </div>
            <div class="log-lines" role="log" aria-live="off"></div>
          </div>
          <div class="panel metrics" data-panel="metrics" hidden></div>
          <div class="panel inspect" data-panel="inspect" hidden></div>
          <div class="panel lab" data-panel="lab" hidden></div>
        </aside>
      </div>`,this.frame=this.$(".tp"),this.$('[data-act="edit"]').hidden=!this.hasAttribute("editable");try{this.stage=new Xl(this.$(".canvas"),this.sceneTheme(),!1,this.qualityName()),this.stage.onSelect=(t)=>{if(this.breakMode&&t)this.stage?.select(this.selected),this.breakNode(t);else this.select(t,!0)},this.stage.onCamera=()=>{if(this.comparing&&this.stage)this.stageB?.followCamera(this.stage)},this.stage.onScrollPast=()=>this.showHint(),this.stage.onEdit=(t)=>this.applyEdit(t),this.bindPalette(),this.stage.setWheelZoom(this.getAttribute("wheel-zoom")==="always"?"always":"click")}catch{this.stage=null,this.$('[data-act="view"]').hidden=!0,this.$('[data-act="edit"]').hidden=!0}this.applyAnnotations(),this.setMode(this.stage?this.modeFromAttribute():"2d"),this.playback.onTime=(t)=>this.handleTime(t);let e=!1;if(this.playback.onState=(t)=>{if(t&&!e)e=!0,this.track("play");this.syncPlayButton(),this.dispatchEvent(new CustomEvent(t?"topple-play":"topple-pause"))},this.playback.onEnd=()=>{this.track("finish"),this.dispatchEvent(new CustomEvent("topple-ended"))},this.playback.loop=this.hasAttribute("loop"),this.chosenOptions=this.optionsFromAttribute(),this.frame.addEventListener("click",this.handleClick),this.frame.addEventListener("input",this.handleInput),this.frame.addEventListener("keydown",this.handleKey),this.bindTrack(),this.applyTheme(),this.applyChrome(),this.setSpeed(Number(this.getAttribute("speed"))||1),this.syncPlayButton(),this.syncView(),this.syncTabs(),this.$('[data-share="short"]').hidden=!this.shortenerUrl(),!qd())this.$('[data-share="video"]').disabled=!0,this.$('[data-share="video-logs"]').disabled=!0,this.$('[data-share="video-vertical"]').disabled=!0}hintTimer=0;showHint(){let e=this.$(".hint");e.hidden=!1,clearTimeout(this.hintTimer),this.hintTimer=window.setTimeout(()=>e.hidden=!0,1400)}qualityName(){return this.getAttribute("quality")==="low"?"low":"high"}themeName(){let e=this.getAttribute("theme"),t=e==="light"||e==="dark"?e:this.media.matches?"dark":"light";return Mv(this.compiled?.scene.style,t)}sceneTheme(){return Ev(Sv[this.themeName()],this.compiled?.scene.style)}handleScheme=()=>{if(!this.hasAttribute("theme")||this.getAttribute("theme")==="auto")this.applyTheme()};applyTheme(){let e=this.themeName(),t=this.sceneTheme();this.frame.dataset.theme=e;let n=this.compiled?.scene.style;if(this.frame.style.setProperty("--accent",n?.accent||n?.look&&n.look!=="studio"?t.accent:""),this.frame.style.fontFamily=n?.font||n?.look==="terminal"||n?.look==="paper"?t.font:"",this.stage?.setTheme(t),this.mode==="2d"&&this.compiled)this.flat?.setScene(this.compiled,t,this.annotate);if(this.metricsDrawn){if(this.metricsDrawn=!1,this.tab==="metrics")this.renderMetrics()}this.stageB?.setTheme(t)}mode="3d";flat=null;annotate=ao(null);modeFromAttribute(){let e=this.getAttribute("view");return e==="2d"||e==="top"?e:"3d"}setMode(e){if(e==="2d"){if(this.comparing)this.setComparing(!1);if(this.editing)this.setEditing(!1);if(!this.flat)this.flat=new Xd(this.$('[data-view="a"]')),this.flat.onSelect=(t)=>{if(this.breakMode&&t)this.flat?.select(this.selected),this.breakNode(t);else this.select(t,!0)};if(this.compiled)this.flat.setScene(this.compiled,this.sceneTheme(),this.annotate);this.flat.select(this.selected),this.flat.setTime(this.playback.time)}else if(this.stage)this.stage.setView(e),this.stage.setTime(this.playback.time);if(e!==this.mode)this.track("view",{view:e});this.mode=e,this.frame.dataset.mode=e,this.syncView()}applyAnnotations(){this.annotate=ao(this.getAttribute("annotations")),this.stage?.setAnnotations({labels:this.annotate.labels,notes:this.annotate.notes}),this.flat?.setAnnotations(this.annotate),this.frame.toggleAttribute("data-no-legend",!this.annotate.legend)}applyChrome(){this.frame.dataset.controls=this.getAttribute("controls")??"full",this.frame.dataset.rail=this.getAttribute("rail")==="none"?"none":"auto",this.frame.dataset.tools=this.getAttribute("tools")==="none"?"none":"full"}showMessage(e,t){let n=this.$(".message");n.hidden=!1,n.innerHTML=`<div><strong>${pt(e)}</strong>${pt(t)}</div>`}async resolveSource(){if(this.sourceText!==null&&this.loadedSrc===null){this.applySource(this.sourceText);return}let e=this.getAttribute("src");if(e){if(e===this.loadedSrc)return;let n=++this.loadToken;try{let i=await fetch(e);if(!i.ok)throw Error(String(i.status));let r=await i.text();if(n!==this.loadToken)return;this.loadedSrc=e,this.sourceText=r,this.applySource(r)}catch{if(n!==this.loadToken)return;this.showMessage("Could not load this scene",`Nothing could be fetched from ${e}.`),this.dispatchEvent(new CustomEvent("topple-error",{detail:{src:e}}))}return}let t=this.querySelector('script[type="text/topple"]')?.textContent??this.textContent??"";if(t.trim())this.sourceText=t,this.applySource(t)}optionsFromAttribute(){let e={};for(let t of(this.getAttribute("options")??"").split(/[\s,]+/))if(t)e[t]=!0;return e}applySource(e){this.interventions=[],this.sourceText=e,this.recompile();let t=this.compiled,n=this.diagnosticList,i=!this.hasAttribute("data-loaded");if(this.setAttribute("data-loaded",""),i){let r=Number(this.getAttribute("start"));if(r>0)this.playback.seek(r);if(this.hasAttribute("compare"))this.setComparing(!0);if(this.hasAttribute("autoplay"))this.playback.play()}this.applyScroll(),this.applyCredit(),this.dispatchEvent(new CustomEvent("topple-ready",{detail:{diagnostics:n,duration:t.duration}}))}recompile(){if(this.sourceText===null||!this.built)return;let e=this.playback.playing,{compiled:t,diagnostics:n}=ro(this.sourceText,{options:this.chosenOptions,sliders:this.chosenSliders,interventions:this.interventions}),i=JSON.stringify(this.compiled?.scene.style??{});if(this.compiled=t,this.diagnosticList=n,this.$(".message").hidden=!0,JSON.stringify(t.scene.style)!==i)this.applyTheme();this.$(".blank").hidden=t.nodes.length>0;let r=Math.min(this.playback.time,t.duration);if(this.playback.pause(),this.playback.duration=t.duration,this.steps=ud(t),this.selected&&!t.nodes.some((s)=>s.id===this.selected))this.selected=null;if(this.stage?.setScene(t),this.stage?.select(this.selected),this.mode==="2d")this.flat?.setScene(t,this.sceneTheme(),this.annotate);if(this.comparing)this.stageB?.setScene(ro(this.sourceText).compiled);if(this.renderStatic(),this.renderLab(),this.lastChapter=-2,this.lastBeat=-2,this.playback.seek(r),e)this.playback.play();this.dispatchEvent(new CustomEvent("topple-change",{detail:{options:{...this.chosenOptions},sliders:{...this.chosenSliders},interventions:[...this.interventions]}}))}hasChanges(){let e=this.compiled?.scene;if(!e)return!1;return this.interventions.length>0||e.options.some((t)=>t.enabled!==t.defaultOn)||e.sliders.some((t)=>this.chosenSliders[t.id]!==void 0&&this.chosenSliders[t.id]!==t.value)}setComparing(e){if(e!==this.comparing)this.track("compare",{on:e});if(e===this.comparing||!this.stage)return;if(e&&this.mode==="2d")this.setMode("3d");this.comparing=e;let t=this.$('[data-view="b"]');if(t.hidden=!e,this.$('[data-view="a"] .badge').hidden=!e,this.frame.toggleAttribute("data-comparing",e),e){if(!this.stageB)this.stageB=new Xl(this.$(".canvas-b"),this.sceneTheme(),!0,this.qualityName()),this.stageB.onCamera=()=>{if(this.stageB)this.stage?.followCamera(this.stageB)};if(this.sourceText!==null)this.stageB.setScene(ro(this.sourceText).compiled);this.stageB.setTime(this.playback.time);let n=this.stage;requestAnimationFrame(()=>requestAnimationFrame(()=>this.stageB?.followCamera(n)))}this.renderLab()}renderLab(){let e=this.$('[data-panel="lab"]'),t=this.compiled;if(!t)return;let n=t.scene,i=JSON.stringify([n.options.map((s)=>[s.id,s.label]),n.sliders.map((s)=>[s.id,s.label,s.min,s.max])]);if(i!==this.labKey){this.labKey=i;let s=n.options.length?`<h4>What if</h4>${n.options.map((o)=>`<label class="switch"><input type="checkbox" data-option="${pt(o.id)}"><i></i><span>${pt(o.label)}</span></label>`).join("")}`:"",a=n.sliders.length?`<h4>Dials</h4>${n.sliders.map((o)=>{let l=(o.max-o.min)/200;return`<label class="dial"><span>${pt(o.label)}<output data-output="${pt(o.id)}"></output></span><input type="range" data-slider="${pt(o.id)}" min="${o.min}" max="${o.max}" step="${l}"></label>`}).join("")}`:"";e.innerHTML=`
        ${s}${a}
        <h4>Break it yourself</h4>
        <p class="hint">Turn on break mode, then click anything in the scene to knock it over and watch what follows. Click it again to fix it.</p>
        <button class="action" data-act="break">${bt(ds,15)}<span></span></button>
        <ul class="changes"></ul>
        <h4>Compare</h4>
        <p class="hint">See the scene as written next to your version, playing in step.</p>
        <button class="action" data-act="compare">${bt(La,15)}<span></span></button>
        <button class="action quiet" data-act="reset-lab">${bt(rd,15)}<span>Undo all changes</span></button>`}for(let s of n.options){let a=e.querySelector(`[data-option="${CSS.escape(s.id)}"]`);if(a)a.checked=s.enabled}for(let s of n.sliders){let a=Math.min(s.max,Math.max(s.min,this.chosenSliders[s.id]??s.value)),o=e.querySelector(`[data-slider="${CSS.escape(s.id)}"]`);if(o&&this.root.activeElement!==o)o.value=String(a);let l=e.querySelector(`[data-output="${CSS.escape(s.id)}"]`);if(l)l.textContent=Yl(a)}let r=(s)=>t.nodes.find((a)=>a.id===s)?.label??s;e.querySelector(".changes").innerHTML=this.interventions.map((s)=>`<li><time>${wn(s.t)}</time>You ${s.action==="break"?"broke":"fixed"} ${pt(r(s.node))}</li>`).join(""),e.querySelector('[data-act="break"] span').textContent=this.breakMode?"Break mode is on":"Turn on break mode",e.querySelector('[data-act="break"]').toggleAttribute("data-on",this.breakMode),e.querySelector('[data-act="compare"] span').textContent=this.comparing?"Stop comparing":"Compare side by side",e.querySelector('[data-act="compare"]').toggleAttribute("data-on",this.comparing),e.querySelector('[data-act="reset-lab"]').hidden=!this.hasChanges(),this.$('.tools [data-act="break"]').setAttribute("aria-pressed",String(this.breakMode))}editing=!1;viewBeforeEditing="3d";setEditing(e){if(e===this.editing||!this.stage)return;if(e&&this.mode==="2d")this.setMode("top");if(this.editing=e,e){if(this.track("edit_mode"),this.breakMode)this.setBreakMode(!1);if(this.viewBeforeEditing=this.stage.getView(),this.viewBeforeEditing!=="top")this.stage.setView("top")}else if(this.viewBeforeEditing!==this.stage.getView())this.stage.setView(this.viewBeforeEditing);this.stage.setEditing(e),this.syncView(),this.frame.toggleAttribute("data-editing",e),this.$(".palette").hidden=!e,this.$('[data-act="edit"]').setAttribute("aria-pressed",String(e))}bindPalette(){let e=this.$(".palette"),t=this.$(".stage");e.addEventListener("dragstart",(n)=>{let i=n.target.closest("[data-part]");if(!i||!n.dataTransfer)return;n.dataTransfer.setData(_f,JSON.stringify({icon:i.dataset.part,label:i.dataset.label})),n.dataTransfer.effectAllowed="copy"}),e.addEventListener("click",(n)=>{let i=n.target.closest("[data-part]"),r=this.$(".canvas").getBoundingClientRect(),s=i&&this.stage?.floorAt(r.left+r.width/2,r.top+r.height/2);if(i&&s)this.addPart(i.dataset.part,i.dataset.label,s)}),t.addEventListener("dragover",(n)=>{if(!this.editing||!n.dataTransfer?.types.includes(_f))return;n.preventDefault(),n.dataTransfer.dropEffect="copy"}),t.addEventListener("drop",(n)=>{let i=this.editing?n.dataTransfer?.getData(_f):"";if(!i)return;n.preventDefault();let r=JSON.parse(i),s=this.stage?.floorAt(n.clientX,n.clientY);if(s)this.addPart(r.icon,r.label,s)})}addPart(e,t,n){let i=new Set(this.compiled?.scene.nodes.map((s)=>s.label)),r=t;for(let s=2;i.has(r);s++)r=`${t} ${s}`;this.applyEdit({type:"add",icon:e,label:r,x:n.x,y:n.y})}applyEdit(e){let t=this.compiled;if(!t||this.sourceText===null)return;let{scene:n,origin:i}=t,r={};for(let o of t.nodes){let l=n.nodes.find((c)=>c.id===o.id);if(l&&(l.x===void 0||l.y===void 0)&&!(e.type==="remove"&&e.id===o.id))r[o.id]={x:Math.round(o.box.x-i.x),y:Math.round(o.box.y-i.y)}}let s=this.sourceText,a;if(e.type==="move")s=no(s,n,{...r,[e.id]:{x:e.x,y:e.y}}),a=e;else{if(Object.keys(r).length)s=no(s,n,r);let o=s===this.sourceText?n:Sr(s).scene;if(e.type==="connect")s=Wd(s,o,{from:e.from,to:e.to}),a=e;else if(e.type==="remove")s=Vd(s,o,e.id),a=e,this.select(null);else{let l=Gd(s,o,{label:e.label,icon:e.icon,x:e.x,y:e.y});s=l.source,a={type:"add",id:l.id,x:e.x,y:e.y}}}if(s===this.sourceText)return;if(this.track("edit",{kind:e.type}),this.source=s,a.type==="add")this.select(a.id);this.dispatchEvent(new CustomEvent("topple-edit",{detail:{source:s,edit:a},bubbles:!0,composed:!0}))}setBreakMode(e){if(e)this.track("break_mode");if(e&&this.editing)this.setEditing(!1);this.breakMode=e,this.stage?.setCursor(e?"crosshair":null),this.frame.toggleAttribute("data-breaking",e),this.renderLab()}handleInput=(e)=>{let t=e.target;if(t.dataset.slider)this.setSlider(t.dataset.slider,Number(t.value));else if(t.dataset.option)this.setOption(t.dataset.option,t.checked);else if(t.classList.contains("log-search"))this.logFilter.search=t.value,this.renderLogs();else if(t.classList.contains("log-source"))this.logFilter.source=t.value,this.renderLogs()};toneOf(e){return this.compiled?.states.get(e??"")?.tone??"idle"}stateLabel(e){return this.compiled?.states.get(e)?.label??e}renderStatic(){let e=this.compiled,t=e.scene;this.$(".heading strong").textContent=t.title,this.$(".heading span").textContent=t.date??"";let n=this.diagnosticList.filter((u)=>u.severity==="error"),i=this.$(".problems");i.hidden=n.length===0,i.innerHTML=n.length?`<b>${n.length} ${n.length===1?"line was":"lines were"} skipped</b><ul>${n.slice(0,3).map((u)=>`<li>Line ${u.line}: ${pt(u.message)}</li>`).join("")}</ul>`:"";let r=new Set;for(let u of e.nodes)for(let p of u.segments)r.add(p.state);this.$(".legend").innerHTML=t.states.filter((u)=>r.has(u.id)).map((u)=>`<span><i class="dot" data-tone="${u.tone}"></i>${pt(u.label)}</span>`).join("");let s=t.chapters.map((u)=>u.t).filter((u)=>u>0.01&&u<e.duration);this.bounds=[0,...new Set(s),e.duration],this.$(".rails").innerHTML=this.bounds.slice(0,-1).map((u,p)=>`<i style="flex:${this.bounds[p+1]-u}"><b></b></i>`).join("");let a=new Map;for(let u of e.beats){if(u.derived||!u.state||u.target.kind==="edge")continue;let p=Math.round(u.t/e.duration*400)/4,g=this.toneOf(u.state),x=a.get(p);if(!x||Tv[g]>Tv[x])a.set(p,g)}this.$(".ticks").innerHTML=[...a].map(([u,p])=>`<i data-tone="${p}" style="left:${u}%"></i>`).join(""),this.$(".track").setAttribute("aria-valuemax",String(Math.round(e.duration)));let o=this.$('[data-panel="story"]'),l=t.sources.length?`<div class="sources">Sources: ${t.sources.map((u)=>`<a href="${pt(u.url)}" target="_blank" rel="noopener noreferrer">${pt(u.label)}</a>`).join(", ")}</div>`:"",c=t.summary?`<p class="summary">${pt(t.summary)}</p>`:"";o.innerHTML=t.chapters.length?c+t.chapters.map((u,p)=>`
          <div class="chapter" data-chapter="${p}">
            <button data-seek="${u.t}">
              <span class="num">${p+1}</span>
              <span class="name">${pt(u.title)}</span>
              ${u.tag?`<span class="tag">${pt(u.tag)}</span>`:""}
            </button>
            <div class="text">${u.body.map((g)=>`<p>${pt(g)}</p>`).join("")}</div>
          </div>`).join("")+l:`${c}<p class="empty">This scene has no chapters. Press play to watch it run.</p>${l}`,this.telemetry=Ud(e),this.metricsDrawn=!1;let d=[...new Map(this.telemetry.logs.map((u)=>[u.source,u.sourceLabel])).entries()],h=this.$(".log-source");if(!d.some(([u])=>u===this.logFilter.source))this.logFilter.source="";if(h.innerHTML='<option value="">Every source</option>'+d.map(([u,p])=>`<option value="${pt(u)}"${u===this.logFilter.source?" selected":""}>${pt(p)}</option>`).join(""),this.renderLogs(),this.tab==="metrics")this.renderMetrics();this.renderInspect()}renderLogs(){let e=this.telemetry,t=this.$(".log-lines");if(!e)return;let{level:n,source:i,search:r}=this.logFilter,s=r.trim().toLowerCase(),a=e.logs.filter((o)=>(n==="all"||Av[o.level]>=Av[n])&&(!i||o.source===i)&&(!s||`${o.sourceLabel} ${o.message}`.toLowerCase().includes(s)));t.innerHTML=a.length?a.map((o)=>`<button class="log" data-level="${o.level}" data-t="${o.t}" data-seek="${o.t}"><time>${wn(o.t)}</time><b>${o.level.toUpperCase()}</b><span><em>${pt(o.sourceLabel)}</em> ${pt(o.message)}</span></button>`).join(""):`<p class="empty">${e.logs.length?"No lines match these filters.":"This scene has not logged anything yet."}</p>`,this.logShown=-1,this.followLogs(this.playback.time)}followLogs(e){let t=this.root.querySelectorAll(".log"),n=0;if(t.forEach((a)=>{let o=Number(a.dataset.t)<=e+0.000001;if(a.hidden=!o,o)n++}),n===this.logShown)return;let i=n>this.logShown;this.logShown=n;let r=this.$(".log-lines"),s=this.$('[data-panel="logs"]');if(i&&!s.hidden)r.scrollTop=r.scrollHeight}renderMetrics(){let e=this.telemetry,t=this.$('[data-panel="metrics"]');if(!e||t.hidden)return;let n=this.sceneTheme(),i=(r)=>`<div class="chart" data-chart="${r}"><canvas></canvas><i class="playhead"></i></div>`;t.innerHTML=`
      <h4>Traffic</h4>
      ${e.overview.map((r)=>i(r.id)).join("")}
      ${e.services.length?`<h4>Services with a capacity</h4>${e.services.map((r)=>i(r.id)).join("")}`:""}
      <h4>Health</h4>
      <div class="chart lanes" data-chart="lanes"><canvas></canvas><i class="playhead"></i></div>`;for(let r of[...e.overview,...e.services])Sg(t.querySelector(`[data-chart="${CSS.escape(r.id)}"] canvas`),r,n);wg(t.querySelector('[data-chart="lanes"] canvas'),e.lanes,n),this.metricsDrawn=!0,this.followMetrics(this.playback.time)}followMetrics(e){if(!this.metricsDrawn||!this.compiled)return;let t=this.compiled.duration?e/this.compiled.duration:0;this.root.querySelectorAll(".chart").forEach((n)=>{let i=n.querySelector(".playhead"),r=n.classList.contains("lanes")?Mg:6;i.style.left=`calc(${r}px + (100% - ${r+6}px) * ${t})`})}renderInspect(){let e=this.$('[data-panel="inspect"]'),t=this.compiled,n=t?.nodes.find((d)=>d.id===this.selected);if(!t||!n){e.innerHTML='<p class="empty">Click anything in the scene to see what it depends on and what has happened to it.</p>';return}let i=this.playback.time,r=vr(n.segments,i),s=n.segments[r],a=(d)=>{let h=t.nodes.find((p)=>p.id===d),u=Ct(h.segments,i).state;return`<button data-select="${pt(d)}"><i class="dot" data-tone="${this.toneOf(u)}"></i>${pt(h.label)}</button>`},o=(d,h)=>d.length?d.map(a).join(""):`<em>${h}</em>`,l=this.toneOf(s.state)==="down",c="";if(n.flow){let d=Math.min(n.flow.load.length-1,Math.round(i/t.flowStep));c=`
      <dl class="readings">
        <div><dt>Load</dt><dd>${Yl(n.flow.load[d])} of ${Yl(n.flow.capacity)} per second</dd></div>
        <div><dt>Waiting</dt><dd>${Yl(n.flow.queue[d])}</dd></div>
        <div><dt>Turned away</dt><dd>${Math.round(n.flow.rejected[d]*100)}%</dd></div>
      </dl>`}e.innerHTML=`
      <h3>${pt(n.label)}</h3>
      <div class="now"><i class="dot" data-tone="${this.toneOf(s.state)}"></i>${pt(this.stateLabel(s.state))} at ${wn(i)}</div>
      ${c}
      <button class="action" data-act="break-selected">${bt(l?fs:ds,15)}<span>${l?"Fix it":"Break it"}</span></button>
      <h4>Depends on</h4>
      <div class="links">${o(n.dependsOn,"Nothing")}</div>
      <h4>Depended on by</h4>
      <div class="links">${o(n.dependents,"Nothing")}</div>
      <h4>History</h4>
      <ul class="history">${n.segments.map((d,h)=>`<li${h===r?" data-current":""}><time>${wn(d.t)}</time><i class="dot" data-tone="${this.toneOf(d.state)}"></i>${pt(this.stateLabel(d.state))}</li>`).join("")}</ul>`}frameInfo(){let e=this.compiled,t=e.scene.chapters[gs(e.scene.chapters,this.playback.time)];return{title:e.scene.title,chapterTag:t?.tag,chapterTitle:t?.title,progress:e.duration?this.playback.time/e.duration:0,time:this.playback.time,chapterBody:t?.body,credit:new URL(this.shareBase()).host||"topple"}}handleTime(e){let t=this.compiled;if(!t)return;if(this.mode==="2d")this.flat?.setTime(e);else this.stage?.setTime(e);if(this.comparing)this.stageB?.setTime(e);let n=t.duration;this.$(".time").textContent=`${wn(e)} / ${wn(n)}`,this.$(".thumb").style.left=`${e/n*100}%`,this.$(".track").setAttribute("aria-valuenow",String(Math.round(e))),this.root.querySelectorAll(".rails b").forEach((a,o)=>{let l=this.bounds[o],c=this.bounds[o+1];a.style.width=`${Math.min(1,Math.max(0,(e-l)/(c-l)))*100}%`});let r=gs(t.scene.chapters,e);if(r!==this.lastChapter){this.lastChapter=r,this.root.querySelectorAll(".chapter").forEach((c,d)=>{c.toggleAttribute("data-active",d===r),c.toggleAttribute("data-past",d<r)});let a=this.root.querySelector(".chapter[data-active]"),o=this.$('[data-panel="story"]');if(a&&!o.hidden)o.scrollTo({top:Math.max(0,a.offsetTop-o.offsetTop-8),behavior:"smooth"});let l=t.scene.chapters[r];this.$(".caption").innerHTML=l?`${l.tag?`<em>${pt(l.tag)}</em>`:""}<b>${pt(l.title)}</b>`:"",this.dispatchEvent(new CustomEvent("topple-chapter",{detail:{index:r}}))}let s=-1;for(let a=0;a<t.beats.length&&t.beats[a].t<=e+0.000001;a++)s=a;if(s!==this.lastBeat){if(this.lastBeat=s,this.selected&&!this.selectedHasFlow())this.renderInspect()}if(this.followLogs(e),this.followMetrics(e),this.selected&&this.tab==="inspect"&&this.selectedHasFlow()&&Math.abs(e-this.lastReading)>=0.25)this.lastReading=e,this.renderInspect();if(this.recording)this.$(".recording span").textContent=`Recording ${wn(e)} / ${wn(n)}`;if(this.stopAt!==null&&e>=this.stopAt-0.001&&this.playback.playing){let a=this.stopAt;if(this.stopAt=null,this.playback.pause(),e>a)this.playback.seek(a)}this.dispatchEvent(new CustomEvent("topple-timeupdate",{detail:{time:e}}))}syncPlayButton(){let e=this.$(".play"),t=this.playback.playing;e.innerHTML=bt(t?Oc:Bc,17),e.setAttribute("aria-label",t?"Pause":"Play")}syncView(){let e=this.$('[data-act="view"]'),t={"3d":{icon:ed,label:"Top-down view"},top:{icon:us,label:"2D annotated diagram"},"2d":{icon:cs,label:"3D view"}}[this.mode];e.innerHTML=bt(t.icon),e.title=`Switch to the ${t.label.toLowerCase()}`,e.setAttribute("aria-label",e.title)}syncTabs(){if(this.root.querySelectorAll(".tab").forEach((e)=>e.setAttribute("aria-selected",String(e.dataset.tab===this.tab))),this.root.querySelectorAll(".panel").forEach((e)=>e.hidden=e.dataset.panel!==this.tab),this.tab==="metrics"&&!this.metricsDrawn)this.renderMetrics();if(this.tab==="logs"){let e=this.$(".log-lines");e.scrollTop=e.scrollHeight}}setSpeed(e){this.playback.speed=e,this.$(".speed").textContent=`${e}x`}select(e,t=!1){if(this.selected=e,!t)this.stage?.select(e),this.flat?.select(e);if(e)this.tab="inspect",this.syncTabs();this.renderInspect(),this.dispatchEvent(new CustomEvent("topple-select",{detail:{id:e}}))}selectedHasFlow(){return Boolean(this.compiled?.nodes.find((e)=>e.id===this.selected)?.flow)}step(e){let t=this.playback.time,n=e===1?this.steps.find((i)=>i>t+0.05):[...this.steps].reverse().find((i)=>i<t-(this.playback.playing?0.6:0.05));this.playback.seek(n??(e===1?this.playback.duration:0))}handleClick=(e)=>{let t=e.target,n=this.$(".share"),i=t.closest(".share"),r=t.closest("[data-act], [data-seek], [data-tab], [data-select], [data-share], [data-level]");if(!i&&r?.dataset.act!=="share")this.toggleShare(!1);if(!r)return;if(r.dataset.seek!==void 0)this.playback.seek(Number(r.dataset.seek));else if(r.dataset.tab)this.tab=r.dataset.tab,this.track("tab",{tab:this.tab}),this.syncTabs();else if(r.dataset.level)this.logFilter.level=r.dataset.level,this.root.querySelectorAll("[data-level]").forEach((s)=>{if(s.tagName==="BUTTON"&&s.parentElement?.classList.contains("levels"))s.setAttribute("aria-pressed",String(s.dataset.level===this.logFilter.level))}),this.renderLogs();else if(r.dataset.select)this.select(r.dataset.select);else if(r.dataset.share)this.handleShare(r);else if(r.dataset.act==="toggle")this.playback.toggle();else if(r.dataset.act==="prev")this.step(-1);else if(r.dataset.act==="next")this.step(1);else if(r.dataset.act==="speed")this.setSpeed(vf[(vf.indexOf(this.playback.speed)+1)%vf.length]);else if(r.dataset.act==="view")this.setMode(this.mode==="3d"?"top":this.mode==="top"?"2d":"3d");else if(r.dataset.act==="fullscreen")if(document.fullscreenElement)document.exitFullscreen();else this.requestFullscreen?.();else if(r.dataset.act==="share")this.toggleShare(n.hidden);else if(r.dataset.act==="stop-recording")this.recording?.stop();else if(r.dataset.act==="recenter"){if(this.stage?.recenter(),this.comparing&&this.stage){let s=this.stage;setTimeout(()=>this.stageB?.followCamera(s),700)}}else if(r.dataset.act==="edit")this.setEditing(!this.editing);else if(r.dataset.act==="break")this.setBreakMode(!this.breakMode);else if(r.dataset.act==="break-selected"&&this.selected)this.breakNode(this.selected);else if(r.dataset.act==="compare")this.setComparing(!this.comparing);else if(r.dataset.act==="reset-lab")this.resetChanges()};handleKey=(e)=>{if(e.metaKey||e.ctrlKey||e.altKey)return;if(e.key===" "&&e.target.tagName!=="BUTTON")this.playback.toggle();else if(e.key==="ArrowRight")e.shiftKey?this.playback.seek(this.playback.time+1):this.step(1);else if(e.key==="ArrowLeft")e.shiftKey?this.playback.seek(this.playback.time-1):this.step(-1);else if(e.key==="Home")this.playback.seek(0);else if(e.key==="c"||e.key==="C")this.stage?.recenter();else if(e.key==="Escape")this.toggleShare(!1);else if((e.key==="Delete"||e.key==="Backspace")&&this.editing&&this.selected)this.applyEdit({type:"remove",id:this.selected});else return;e.preventDefault()};bindTrack(){let e=this.$(".track"),t=this.$(".tip"),n=(s)=>{let a=e.getBoundingClientRect();return Math.min(1,Math.max(0,(s.clientX-a.left)/a.width))*this.playback.duration},i=!1;e.addEventListener("pointerdown",(s)=>{i=!0,e.setPointerCapture(s.pointerId),this.playback.seek(n(s))}),e.addEventListener("pointermove",(s)=>{let a=n(s);if(i)this.playback.seek(a);let o=this.compiled?.scene.chapters??[],l=o[gs(o,a)];t.hidden=!1,t.textContent=l?`${wn(a)} · ${l.title}`:wn(a);let c=e.getBoundingClientRect(),d=t.offsetWidth/2;t.style.left=`${Math.min(c.width-d,Math.max(d,s.clientX-c.left))}px`});let r=()=>{i=!1};e.addEventListener("pointerup",r),e.addEventListener("pointercancel",r),e.addEventListener("pointerleave",()=>t.hidden=!0)}toggleShare(e){this.$(".share").hidden=!e,this.$('[data-act="share"]').setAttribute("aria-expanded",String(e))}shortenerUrl(){return this.getAttribute("shortener")??mr.shortener}shareBase(){return(this.getAttribute("share-base")??mr.shareBase??location.origin).replace(/\/$/,"")}flash(e,t){let n=e.querySelector("span"),i=n.textContent,r=e.querySelector("svg").outerHTML;e.setAttribute("data-done",""),e.querySelector("svg").outerHTML=bt(lc),n.textContent=t,setTimeout(()=>{e.removeAttribute("data-done"),e.querySelector("svg").outerHTML=r,n.textContent=i},1600)}async handleShare(e){let t=this.compiled;if(!t)return;let n=e.dataset.share;this.track("share",{kind:n});let i=Lg(t.scene.title);if(n==="short"){let r=this.shortenerUrl();if(!r)return;try{let{url:s}=await Ig(r,this.source),a=this.getAttribute("theme"),o=await Zd(a==="light"||a==="dark"?`${s}?theme=${a}`:s);this.flash(e,o?"Copied":"Could not copy")}catch{this.flash(e,"Link service unavailable")}return}if(n==="link"||n==="iframe"||n==="html"){let r=this.loadedSrc?new URL(this.loadedSrc,location.href).href:void 0,s=this.getAttribute("theme"),a=await Pg({base:this.shareBase(),source:this.source,src:r,theme:s==="light"||s==="dark"?s:void 0,title:t.scene.title}),o=await Zd(a[n]);this.flash(e,o?"Copied":"Could not copy")}else if(n==="image"){let r=await this.snapshot();if(r)oo(r,`${i}.png`);this.flash(e,r?"Saved":"Could not save")}else if(n==="file")oo(new Blob([this.source],{type:"text/plain"}),`${i}.topple`),this.flash(e,"Downloaded");else if(n==="video"||n==="video-logs"||n==="video-vertical")this.toggleShare(!1),await this.recordVideo(i,n!=="video",n==="video-vertical"?"vertical":"wide")}async recordVideo(e,t=!1,n="wide"){let i=this.stage;if(!i||this.recording)return;let r=new Es(i.canvas,this.sceneTheme(),t?this.telemetry:null,n),s=this.playback.speed,a=this.playback.loop;this.playback.pause(),this.playback.loop=!1,this.setSpeed(1),this.playback.seek(0),i.onFrame=()=>r.draw(this.frameInfo()),i.renderNow();let o=Eg(r.canvas);if(!o){i.onFrame=()=>{};return}this.recording=o,this.$(".recording").hidden=!1;let l=()=>setTimeout(()=>o.stop(),500);this.addEventListener("topple-ended",l,{once:!0}),this.playback.play();let{blob:c,extension:d}=await o.done;if(this.removeEventListener("topple-ended",l),this.playback.pause(),i.onFrame=()=>{},this.recording=null,this.$(".recording").hidden=!0,this.playback.loop=a,this.setSpeed(s),c.size)oo(c,`${e}.${d}`)}}function Cv(e="topple-player"){if(typeof customElements<"u"&&!customElements.get(e))customElements.define(e,mr)}var Rv=document.currentScript;if(Rv?.src&&!mr.shareBase)mr.shareBase=new URL(".",Rv.src).href.replace(/\/$/,"");Cv();})();
