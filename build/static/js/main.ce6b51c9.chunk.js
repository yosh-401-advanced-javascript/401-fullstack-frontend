(window["webpackJsonp401-fullstack-frontend"]=window["webpackJsonp401-fullstack-frontend"]||[]).push([[0],{107:function(e,t,n){e.exports=n(220)},116:function(e,t,n){},120:function(e,t){},122:function(e,t){},161:function(e,t){},162:function(e,t){},219:function(e,t,n){},220:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),c=n(36),r=n.n(c),i=n(37),l=n(18),u=n(103),s=n(106),p=Object(l.combineReducers)({pokemonRedux:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload;switch(n){case"GET_POKEMON":return a;case"ADD_POKEMON":return[].concat(Object(s.a)(e),[a]);default:return e}}}),m=function(){return Object(l.createStore)(p,Object(u.composeWithDevTools)(Object(l.applyMiddleware)()))},h=n(8),d=n(11),f=n(13),b=n(12),g=n(14),E=(n(116),n(104)),O=n.n(E),v=n(58),k=n.n(v),j=o.a.createContext(),y="http://localhost:8080",w=function(e){function t(e){var n;return Object(h.a)(this,t),(n=Object(f.a)(this,Object(b.a)(t).call(this,e))).login=function(e,t,a){var o={method:"POST",mode:"cors",cache:"no-cache",headers:new Headers({Authorization:"Basic ".concat(btoa("".concat(e,":").concat(t)))})};"signup"===a&&(o.body=JSON.stringify({username:e,password:t}),o.headers=new Headers({"Content-type":"application/json"})),fetch("".concat(y,"/").concat(a),o).then((function(e){return e.text()})).then((function(e){return n.validateToken(e)})).catch(console.error)},n.logout=function(){n.setLoginState(!1,null,{})},n.validateToken=function(e){try{var t=O.a.verify(e,"pokepals");console.log(t),n.setLoginState(!0,t,e)}catch(a){n.setLoginState(!1,null,{})}},n.setLoginState=function(e,t,a){k.a.save("auth",a),n.setState({token:a,loggedIn:e,user:t})},n.state={loggedIn:!1,token:null,user:{},login:n.login,logout:n.logout},n}return Object(g.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=k.a.load("auth");this.validateToken(e)}},{key:"render",value:function(){return o.a.createElement(j.Provider,{value:this.state},this.props.children)}}]),t}(o.a.Component),C=function(e){return e.condition?null:e.children},N=function(e){function t(){return Object(h.a)(this,t),Object(f.a)(this,Object(b.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=!1;try{this.props.capability&&this.context.user.capabilities.includes(this.props.capability)&&(e=!0)}catch(t){console.warn("Not Authorized")}return o.a.createElement(C,{condition:e},o.a.createElement("div",null,this.props.children))}}]),t}(o.a.Component);N.contextType=j;var S=N,x=n(105),T=function(e){return e.condition?e.children:null},I=function(e){function t(e){var n;return Object(h.a)(this,t),(n=Object(f.a)(this,Object(b.a)(t).call(this,e))).handleChange=function(e){n.setState(Object(x.a)({},e.target.name,e.target.value))},n.handleSubmit=function(e,t){e.preventDefault(),n.context.login(n.state.username,n.state.password,t)},n.state={username:"",password:""},n}return Object(g.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement(o.a.Fragment,null,o.a.createElement(T,{condition:this.context.loggedIn},o.a.createElement("button",{onClick:this.context.logout},"Log Out")),o.a.createElement(T,{condition:!this.context.loggedIn},o.a.createElement("form",null,o.a.createElement("input",{placeholder:"UserName",name:"username",onChange:this.handleChange}),o.a.createElement("input",{placeholder:"password",name:"password",type:"password",onChange:this.handleChange}),o.a.createElement("button",{onClick:function(t){return e.handleSubmit(t,"signin")}},"Sign In"),o.a.createElement("button",{onClick:function(t){return e.handleSubmit(t,"signup")}},"Sign Up"))))}}]),t}(o.a.Component);I.contextType=j;var P=I,D=(n(219),function(){return o.a.createElement("button",{className:"pokemon-card"},"BUTTON")}),M=function(e){var t=e.pokemon;console.log(t);var n=t.id,a=t.name,c=t.sprites,r=t.type;return o.a.createElement("section",{className:"details-wrapper"},o.a.createElement("img",{src:c,className:"sprites",alt:"sprite"}),o.a.createElement("div",{className:"stats-wrapper"},o.a.createElement("h1",{className:"stats-name"},"ID: ",n," ",a),o.a.createElement("p",{className:"stats"},"Type: ",r," ")))},L=function(){return o.a.createElement("section",{className:"list"},o.a.createElement(D,null,o.a.createElement(M,null)))},R=function e(t){Object(h.a)(this,e),this.id=t.id,this.name=t.name,this.sprites=t.sprites.front_default,this.type=t.types[0].type.name},U=function(e){function t(e){var n;return Object(h.a)(this,t),(n=Object(f.a)(this,Object(b.a)(t).call(this,e))).state={pokemon:{}},n}return Object(g.a)(t,e),Object(d.a)(t,[{key:"handleClick",value:function(e,t){var n=this;fetch("http://pokeapi.co/api/v2/pokemon/".concat(t,"/")).then((function(e){return e.json()})).then((function(e){var t=new R(e);n.props.createNewPokemon(t),console.log(t)})).catch((function(e){return console.log(e)}))}},{key:"render",value:function(){return console.log(this.state),o.a.createElement("div",{className:"Main"},o.a.createElement(L,{handleClick:this.handleClick,pokemon:this.state.pokemon}),o.a.createElement(M,{pokemon:this.state.pokemon}))}}]),t}(o.a.Component),_=Object(i.b)((function(e){return{pokemonRedux:e.pokemonRedux}}),(function(e){return{createNewPokemon:function(t){e({type:"POKEMON_GET",payload:t})}}}))(U),A=function(e){return o.a.createElement(S,{capability:"read"},o.a.createElement("span",null,"Re"))},B=function(e){return o.a.createElement(S,{capability:"update"},o.a.createElement("span",null,"Up"))},J=function(e){function t(){return Object(h.a)(this,t),Object(f.a)(this,Object(b.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(w,null,o.a.createElement(P,null),o.a.createElement("hr",null),o.a.createElement(_,null),o.a.createElement(A,null),o.a.createElement(B,null)))}}]),t}(o.a.Component),K=m(),z=document.getElementById("root");r.a.render(o.a.createElement((function(){return o.a.createElement(i.a,{store:K},o.a.createElement(J,null))}),null),z)}},[[107,1,2]]]);
//# sourceMappingURL=main.ce6b51c9.chunk.js.map