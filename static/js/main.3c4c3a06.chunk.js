(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{124:function(e,t,a){e.exports=a(154)},129:function(e,t,a){},154:function(e,t,a){"use strict";a.r(t);var n,c=a(0),r=a.n(c),i=a(10),o=a.n(i),l=(a(129),a(16)),s=a(55),u=a(209),d=a(201),m=a(202),f=a(197),p=a(206),b=a(194),E=a(205),O=a(203),j=a(157),g=a(204),h=a(7),v=a(198),y=a(156),I=a(20),S=a(51),T=a(40),D=a(207),k=a(195),C=a(41);!function(e){e.APP_SET_STATUS="APP/SET-STATUS",e.APP_SET_ERROR="APP/SET-ERROR",e.APP_SET_INIT="APP/SET-INIT"}(n||(n={}));var A,w,P,N,L,R=function(e){return{type:n.APP_SET_ERROR,error:e}},F=function(e){return{type:n.APP_SET_STATUS,status:e}},_=function(e,t){e.messages.length?t(R(e.messages[0])):t(R("some error occurred")),t(F("failed"))},x=function(e,t){t(R(e.message)),t(F("failed"))},U=function(e){return e.trim()},M=["disabled"],K=C.a.div(A||(A=Object(T.a)(["\n  display: flex;\n  align-items: center;\n  padding-bottom: 20px;\n"]))),H=Object(c.memo)((function(e){var t=e.disabled,a=void 0!==t&&t,n=Object(S.a)(e,M),i=Object(c.useState)(""),o=Object(I.a)(i,2),l=o[0],s=o[1],u=Object(c.useState)(!1),d=Object(I.a)(u,2),m=d[0],f=d[1],p=function(){var e=U(l);e?n.addItemCallback(e):f(!0),s("")};return r.a.createElement(K,null,r.a.createElement(D.a,{disabled:a,label:m?"give it a name":"Title",size:"small",variant:"outlined",value:l,error:m,onChange:function(e){m&&f(!1),s(e.currentTarget.value)},onKeyPress:function(e){"Enter"===e.key&&p()}}),r.a.createElement(b.a,{disabled:a,onClick:p},r.a.createElement(k.a,null)))})),B=a(193),z=a(196),V=a(104),G=a.n(V),J=["disabled"],q=Object(c.memo)((function(e){var t=e.disabled,a=void 0!==t&&t,n=Object(S.a)(e,J),i=Object(c.useState)(!1),o=Object(I.a)(i,2),l=o[0],s=o[1],u=Object(c.useState)(""),d=Object(I.a)(u,2),m=d[0],f=d[1],p=Object(c.useState)(!1),b=Object(I.a)(p,2),E=b[0],O=b[1],j=function(){var e=U(m);e?(s(!1),n.itemNameChangedCallback(e),f(n.itemName)):(f(""),O(!0))},g=Object(c.useCallback)((function(e){"Enter"===e.key&&j()}),[j]);return l?r.a.createElement(D.a,{error:Boolean(E),helperText:E,onKeyPress:g,autoFocus:!0,onBlur:j,value:m,onChange:function(e){O(!1),f(e.currentTarget.value)}}):r.a.createElement("span",{onDoubleClick:function(){a||(s(!0),f(n.itemName))}},n.itemName)})),W=a(211),Y=a(102),$=a.n(Y);!function(e){e[e.New=0]="New",e[e.InProgress=1]="InProgress",e[e.Completed=2]="Completed",e[e.Draft=3]="Draft"}(w||(w={})),function(e){e[e.Low=0]="Low",e[e.Middle=1]="Middle",e[e.High=2]="High",e[e.Urgent=3]="Urgent",e[e.Someday=4]="Someday"}(P||(P={})),function(e){e[e.success=0]="success",e[e.error=1]="error",e[e.captcha=10]="captcha"}(N||(N={}));var Q,X,Z=C.a.div(L||(L=Object(T.a)(["\n  //min-width: 260px;\n  //border-bottom: 2px solid gray;\n"]))),ee=Object(c.memo)((function(e){var t=Object(c.useCallback)((function(t){var a=t.currentTarget.checked?w.Completed:w.New;e.changeStatus(e.taskID,a)}),[e.changeStatus,e.taskID]),a=Object(c.useCallback)((function(t){e.changeName(e.taskID,t)}),[e.changeName,e.taskID]),n=Object(c.useCallback)((function(){e.removeTask(e.taskID)}),[e.removeTask,e.taskID]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(Z,null,r.a.createElement(W.a,{checked:e.isDone,color:"primary",onChange:t}),r.a.createElement(q,{itemName:e.taskName,itemNameChangedCallback:a})),r.a.createElement(b.a,{size:"small",onClick:n},r.a.createElement($.a,{color:"primary"})))})),te=a(71),ae=a(9),ne=a(103),ce=a.n(ne).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"dd744663-c08a-476e-8a84-c072bf5b7a68"}}),re=function(e,t){return ce.put("todo-lists/".concat(e),{title:t})},ie=function(e){return ce.delete("todo-lists/".concat(e))},oe=function(e){return ce.post("todo-lists",{title:e})},le=function(){return ce.get("todo-lists")},se=function(e,t){return ce.post("todo-lists/".concat(e,"/tasks"),{title:t})},ue=function(e){return ce.get("todo-lists/".concat(e,"/tasks"))},de=function(e,t,a){return ce.put("todo-lists/".concat(e,"/tasks/").concat(t),a)},me=function(e,t){return ce.delete("/todo-lists/".concat(e,"/tasks/").concat(t))},fe=function(e){return ce.post("auth/login",e)},pe=function(){return ce.delete("auth/login")},be=function(){return ce.get("auth/me")},Ee=[],Oe=function(e,t){return{type:"SET-LIST-STATUS",payload:{listID:e,entityStatus:t}}},je=a(45),ge={},he=function(e,t,a){return function(n,c){var r=c().tasks[e].find((function(e){return e.id===t}));if(r){var i=Object(ae.a)({deadline:r.deadline,description:r.description,priority:r.priority,startDate:r.startDate,status:r.status,title:r.title},a);de(e,t,i).then((function(c){c.data.resultCode===N.success?n(function(e,t,a){return{type:"UPDATE-TASK-DATA",payload:{listID:e,taskID:t,newData:a}}}(e,t,a)):_(c.data,n)})).catch((function(e){n(R(e.message))}))}else console.warn("task with id ".concat(t," not found in todo list ").concat(e))}},ve=function(e){return e.app.appStatus},ye=function(e){return e.app.isInitialized},Ie=function(e){return e.auth.isLoggedIn},Se=["demo","listStatus"],Te=C.a.div(Q||(Q=Object(T.a)(["\n  min-width: 300px;\n"]))),De=C.a.div(X||(X=Object(T.a)(["\n  display: flex;\n  justify-content: space-between;\n  padding-right: 0;\n"]))),ke=Object(c.memo)((function(e){var t=e.demo,a=void 0!==t&&t,n=e.listStatus,i=Object(S.a)(e,Se),o=Object(l.c)((function(e){return function(e,t){return e.tasks[t]}(e,i.todolistID)})),s=Object(l.b)();Object(c.useEffect)((function(){var e;a||s((e=i.todolistID,function(t){t(F("loading")),ue(e).then((function(a){t(function(e,t){return{type:"SET-TASKS",payload:{todoListID:e,tasks:t}}}(e,a.data.items)),t(F("succeeded"))})).catch((function(e){x(e,t)}))}))}),[s,i.todolistID,a]);var u=o;"active"===i.activeFilter&&(u=o.filter((function(e){return e.status===w.New}))),"completed"===i.activeFilter&&(u=o.filter((function(e){return e.status===w.Completed})));var d=Object(c.useCallback)((function(e,t){s(he(i.todolistID,e,{status:t}))}),[s,i.todolistID]),m=Object(c.useCallback)((function(e){var t,a;s((t=i.todolistID,a=e,function(e){e(F("loading")),se(t,a).then((function(a){a.data.resultCode===N.success?(e(function(e,t){return{type:"ADD-TASK",payload:{listID:e,task:t}}}(t,a.data.data.item)),e(F("succeeded"))):_(a.data,e)})).catch((function(t){x(t,e)}))}))}),[s,i.todolistID]),p=Object(c.useCallback)((function(e){s(function(e,t){return function(a){me(e,t).then((function(n){a(function(e,t){return{type:"REMOVE-TASK",payload:{listID:e,taskID:t}}}(e,t))})).catch((function(e){x(e,a)}))}}(i.todolistID,e))}),[s,i.todolistID]),E=Object(c.useCallback)((function(e){s({type:"CHANGE-FILTER",payload:{listID:i.todolistID,activeFilter:e}})}),[s,i.todolistID]),O=Object(c.useCallback)((function(){var e,t=(e=i.todolistID,function(t){t(F("loading")),t(Oe(e,"loading")),ie(e).then((function(a){a.data.resultCode===N.success?(t(function(e){return{type:"REMOVE-LIST",payload:{listID:e}}}(e)),t(F("succeeded")),t(Oe(e,"idle"))):_(a.data,t)})).catch((function(e){x(e,t)}))});s(t)}),[s,i.todolistID]),j=Object(c.useCallback)((function(e,t){s(he(i.todolistID,e,{title:t}))}),[s,i.todolistID]),g=Object(c.useCallback)((function(e){s(function(e,t){return function(a){a(F("loading")),a(Oe(e,"loading")),re(e,t).then((function(n){n.data.resultCode===N.success?(a(function(e,t){return{type:"CHANGE-LIST-NAME",payload:{listID:e,newName:t}}}(e,t)),a(F("succeeded")),a(Oe(e,"idle"))):_(n.data,a)})).catch((function(e){x(e,a)}))}}(i.todolistID,e))}),[s,i.todolistID]);return r.a.createElement(Te,null,r.a.createElement("h3",null,r.a.createElement(q,{itemName:i.title,itemNameChangedCallback:g}),r.a.createElement(b.a,{disabled:"loading"===n,onClick:O},r.a.createElement(G.a,null))),r.a.createElement(H,{disabled:"loading"===n,addItemCallback:m}),r.a.createElement(B.a,{disablePadding:!0},(u||[]).map((function(e){return r.a.createElement(z.a,{disableGutters:!0,key:e.id,style:{justifyContent:"space-between"}},r.a.createElement(ee,{taskID:e.id,isDone:e.status===w.Completed,changeName:j,taskName:e.title,changeStatus:d,removeTask:p}))}))),r.a.createElement(De,null,r.a.createElement(f.a,{variant:"contained",color:"all"===i.activeFilter?"primary":"default",onClick:function(){return E("all")}},"All"),r.a.createElement(f.a,{variant:"contained",color:"active"===i.activeFilter?"primary":"default",onClick:function(){return E("active")}},"Active"),r.a.createElement(f.a,{variant:"contained",color:"completed"===i.activeFilter?"primary":"default",onClick:function(){return E("completed")}},"Completed")))})),Ce=a(72),Ae=a(105),we={appStatus:"idle",error:null,isInitialized:!1},Pe={isLoggedIn:!1},Ne=function(e){return{type:"authReducer/SET-AUTH-STATE",isLoggedIn:e}},Le=Object(Ce.b)({tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ge,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD-TASK":return Object(ae.a)(Object(ae.a)({},e),{},Object(je.a)({},t.payload.listID,[t.payload.task].concat(Object(te.a)(e[t.payload.listID]))));case"REMOVE-TASK":return Object(ae.a)(Object(ae.a)({},e),{},Object(je.a)({},t.payload.listID,e[t.payload.listID].filter((function(e){return e.id!==t.payload.taskID}))));case"UPDATE-TASK-DATA":return Object(ae.a)(Object(ae.a)({},e),{},Object(je.a)({},t.payload.listID,e[t.payload.listID].map((function(e){return e.id===t.payload.taskID?Object(ae.a)(Object(ae.a)({},e),t.payload.newData):e}))));case"REMOVE-LIST":var a=Object(ae.a)({},e);return delete a[t.payload.listID],a;case"SET-TASKS":return Object(ae.a)(Object(ae.a)({},e),{},Object(je.a)({},t.payload.todoListID,t.payload.tasks));default:return e}},lists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ee,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD-LIST":var a=Object(ae.a)(Object(ae.a)({},t.payload.todoList),{},{activeFilter:"all",entityStatus:"idle"});return[a].concat(Object(te.a)(e));case"REMOVE-LIST":return e.filter((function(e){return e.id!==t.payload.listID}));case"CHANGE-FILTER":return e.map((function(e){return e.id===t.payload.listID?Object(ae.a)(Object(ae.a)({},e),{},{activeFilter:t.payload.activeFilter}):e}));case"CHANGE-LIST-NAME":return e.map((function(e){return e.id===t.payload.listID?Object(ae.a)(Object(ae.a)({},e),{},{title:t.payload.newName}):e}));case"SET-LISTS":return t.payload.lists.map((function(e){return Object(ae.a)(Object(ae.a)({},e),{},{activeFilter:"all",entityStatus:"idle"})}));case"SET-LIST-STATUS":return e.map((function(e){return e.id===t.payload.listID?Object(ae.a)(Object(ae.a)({},e),{},{entityStatus:t.payload.entityStatus}):e}));default:return e}},app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:we,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case n.APP_SET_STATUS:return Object(ae.a)(Object(ae.a)({},e),{},{appStatus:t.status});case n.APP_SET_ERROR:return Object(ae.a)(Object(ae.a)({},e),{},{error:t.error});case n.APP_SET_INIT:return Object(ae.a)(Object(ae.a)({},e),{},{isInitialized:t.isInitialized});default:return Object(ae.a)({},e)}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Pe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"authReducer/SET-AUTH-STATE":return Object(ae.a)(Object(ae.a)({},e),{},{isLoggedIn:t.isLoggedIn});default:return e}}}),Re=Object(Ce.c)(Le,Object(Ce.a)(Ae.a)),Fe=l.c;window.store=Re;var _e=Object(c.memo)((function(e){var t=e.demo,a=void 0!==t&&t,n=Fe((function(e){return e.lists})),i=Object(l.c)(Ie),o=Object(l.b)();Object(c.useEffect)((function(){!a&&i&&o((function(e){e(F("loading")),le().then((function(t){e({type:"SET-LISTS",payload:{lists:t.data}}),e(F("succeeded"))})).catch((function(t){x(t,e)}))}))}),[]);var s=Object(c.useCallback)((function(e){var t;e&&o((t=e,function(e){e(F("loading")),oe(t).then((function(t){t.data.resultCode===N.success?(e({type:"ADD-LIST",payload:{todoList:t.data.data.item}}),e(F("succeeded"))):_(t.data,e)})).catch((function(t){x(t,e)}))}))}),[o]);return i?r.a.createElement(r.a.Fragment,null,r.a.createElement(v.a,{container:!0,style:{paddingTop:"20px"}},r.a.createElement(H,{addItemCallback:s})),r.a.createElement(v.a,{container:!0,spacing:3},n.map((function(e){return r.a.createElement(v.a,{item:!0,key:e.id},r.a.createElement(y.a,{style:{padding:"20px"},elevation:10},r.a.createElement(ke,{demo:a,listStatus:e.entityStatus,todolistID:e.id,title:e.title,activeFilter:e.activeFilter})))})))):r.a.createElement(h.a,{replace:!0,to:"/login"})})),xe=a(213),Ue=a(210),Me=function(e){return r.a.createElement(Ue.a,Object.assign({elevation:6,variant:"filled"},e))},Ke=function(){var e=Fe((function(e){return e.app.error})),t=null!==e,a=Object(l.b)(),n=function(e,t){"clickaway"!==t&&a(R(null))};return r.a.createElement(xe.a,{open:t,autoHideDuration:5e3,onClose:n},r.a.createElement(Me,{onClose:n,severity:"error"},e&&e))},He=a(191),Be=a(192),ze=a(199),Ve=a(200),Ge=a(108),Je=function(){var e=Fe(Ie),t=Object(l.b)(),a=Object(Ge.a)({validate:function(e){return e.email?e.password.length<4?{password:"password is too short"}:e.password?void 0:{password:"password required"}:{email:"email required"}},initialValues:{email:"free@samuraijs.com",password:"free",rememberMe:!1},onSubmit:function(e){var a;t((a=e,function(e){e(F("loading")),fe(a).then((function(t){t.data.resultCode===N.success?(e(Ne(!0)),e(F("succeeded"))):_(t.data,e)})).catch((function(t){x(t,e)}))}))}});return e?r.a.createElement(h.a,{replace:!0,to:"/"}):r.a.createElement(v.a,{container:!0,justify:"center"},r.a.createElement(v.a,{item:!0,xs:2},r.a.createElement("form",{onSubmit:a.handleSubmit},r.a.createElement(He.a,null,r.a.createElement(Be.a,null,r.a.createElement("p",null,"sign up on ",r.a.createElement("a",{href:"https://social-network.samuraijs.com/"},"samuraiJS")),r.a.createElement("p",null,"or use the default credentials")),r.a.createElement(ze.a,null,r.a.createElement(D.a,Object.assign({label:"Email",margin:"normal",type:"email"},a.getFieldProps("email"),{error:Boolean(a.errors.email),helperText:a.errors.email})),r.a.createElement(D.a,Object.assign({label:"Password",margin:"normal",type:a.values.password?"password":""},a.getFieldProps("password"),{error:Boolean(a.errors.password),helperText:a.errors.password})),r.a.createElement(Ve.a,{control:r.a.createElement(W.a,Object.assign({},a.getFieldProps("rememberMe"),{checked:a.values.rememberMe})),label:"remember me"}),r.a.createElement(f.a,{type:"submit",variant:"contained",color:"primary",disabled:Boolean(a.errors.password)||Boolean(a.errors.email)},"Login"))))))},qe=function(){return function(e){be().then((function(t){var a;t.data.resultCode===N.success?(e(Ne(!0)),e(F("succeeded"))):_(t.data,e),e((a=!0,{type:n.APP_SET_INIT,isInitialized:a}))})).catch((function(t){x(t,e)}))}},We=function(e){var t=e.demo,a=void 0!==t&&t,n=Object(l.c)(ve),i=Object(l.c)(ye),o=Object(l.c)(Ie),s=Object(l.b)();if(Object(c.useEffect)((function(){s(qe())}),[]),!i)return r.a.createElement(u.a,{sx:{display:"flex",justifyContent:"center",marginTop:"50vh"}},r.a.createElement(d.a,null));var v="loading"===n;return r.a.createElement("div",null,r.a.createElement(Ke,null),r.a.createElement(m.a,{position:"static"},r.a.createElement(O.a,null,r.a.createElement(b.a,{edge:"start",color:"inherit","aria-label":"menu"},r.a.createElement(g.a,null)),r.a.createElement(j.a,{variant:"h6"},"Todolist"),o&&r.a.createElement(f.a,{color:"inherit",variant:"outlined",onClick:function(){s((function(e){pe().then((function(t){t.data.resultCode===N.success?e(Ne(!1)):_(t.data,e)})).catch((function(t){x(t,e)}))}))},style:{marginLeft:"50px"}},"Log out")),v&&r.a.createElement(E.a,{color:"secondary"})),r.a.createElement(p.a,{fixed:!0},r.a.createElement(h.d,null,r.a.createElement(h.b,{path:"/it-inc-todolist-ts",element:r.a.createElement(_e,{demo:a})}),r.a.createElement(h.b,{path:"/",element:r.a.createElement(_e,{demo:a})}),r.a.createElement(h.b,{path:"/login",element:r.a.createElement(Je,null)}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(l.a,{store:Re},r.a.createElement(s.a,null,r.a.createElement(We,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[124,1,2]]]);
//# sourceMappingURL=main.3c4c3a06.chunk.js.map