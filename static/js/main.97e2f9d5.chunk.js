(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{118:function(t,e,a){"use strict";a.r(e);var n,c,o,i=a(0),l=a.n(i),r=a(9),s=a.n(r),u=(a(95),a(23)),d=a(35),m=a(30),b=a(167),f=a(154),p=a(155),E=a(31),O=["disabled"],v=E.a.div(n||(n=Object(m.a)(["\n  display: flex;\n  align-items: center;\n  padding-bottom: 20px;\n"]))),j=l.a.memo((function(t){var e=t.disabled,a=void 0!==e&&e,n=Object(u.a)(t,O);console.log('AddItemForm with "'.concat(n.addItemCallback.toString(),'" callback was called'));var c=Object(i.useState)(""),o=Object(d.a)(c,2),r=o[0],s=o[1],m=Object(i.useState)(!1),E=Object(d.a)(m,2),j=E[0],y=E[1],k=Object(i.useCallback)((function(){var t=r.trim();t?n.addItemCallback(t):y(!0),s("")}),[r,n.addItemCallback]),S=Object(i.useCallback)((function(t){"Enter"===t.key&&k()}),[k]);return l.a.createElement(v,null,l.a.createElement(b.a,{disabled:a,label:j?"give it a name":"Title",size:"small",variant:"outlined",value:r,error:j,onChange:function(t){j&&y(!1),s(t.currentTarget.value)},onKeyPress:S}),l.a.createElement(f.a,{disabled:a,onClick:k},l.a.createElement(p.a,null)))})),y=a(160),k=a(161),S=a(163),I=a(159),D=a(164),g=a(165),h=a(166),T=a(119),C=a(162),A=a(53),w=a(8),N=a(81),P=a.n(N).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"dd744663-c08a-476e-8a84-c072bf5b7a68"}});!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(c||(c={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.High=2]="High",t[t.Urgent=3]="Urgent",t[t.Someday=4]="Someday"}(o||(o={}));var L,R=function(t,e){return P.put("todo-lists/".concat(t),{title:e})},F=function(t){return P.delete("todo-lists/".concat(t))},x=function(t){return P.post("todo-lists",{title:t})},_=function(){return P.get("todo-lists")},K=function(t,e){return P.post("todo-lists/".concat(t,"/tasks"),{title:e})},U=function(t){return P.get("todo-lists/".concat(t,"/tasks"))},M=function(t,e,a){return P.put("todo-lists/".concat(t,"/tasks/").concat(e),a)},H=function(t,e){return P.delete("/todo-lists/".concat(t,"/tasks/").concat(e))};!function(t){t.APP_SET_STATUS="APP/SET-STATUS",t.APP_SET_ERROR="APP/SET-ERROR"}(L||(L={}));var G,V,B,z={appStatus:"idle",error:null},J=function(t){return{type:L.APP_SET_ERROR,error:t}},W=function(t){return{type:L.APP_SET_STATUS,status:t}},Y=function(t,e){t.messages.length?e(J(t.messages[0])):e(J("some error occurred")),e(W("failed"))},$=function(t,e){e(J(t.message)),e(W("failed"))},q=[],Q=function(t,e){return{type:"SET-LIST-STATUS",payload:{listID:t,entityStatus:e}}},X=a(17),Z=["disabled"],tt=l.a.memo((function(t){var e=t.disabled,a=void 0!==e&&e,n=Object(u.a)(t,Z);console.log("editableSpan was called, text: ".concat(n.itemName));var c=Object(i.useState)(!1),o=Object(d.a)(c,2),r=o[0],s=o[1],m=Object(i.useState)(""),f=Object(d.a)(m,2),p=f[0],E=f[1],O=Object(i.useState)(!1),v=Object(d.a)(O,2),j=v[0],y=v[1],k=Object(i.useCallback)((function(t){y(!1),E(t.currentTarget.value)}),[]),S=Object(i.useCallback)((function(){var t=p.trim();t?(s(!1),n.itemNameChangedCallback(t),E(n.itemName)):(E(""),y(!0))}),[p]),I=Object(i.useCallback)((function(t){"Enter"===t.key&&S()}),[S]);return r?l.a.createElement(b.a,{error:Boolean(j),helperText:j,onKeyPress:I,autoFocus:!0,onBlur:S,value:p,onChange:k}):l.a.createElement("span",{onDoubleClick:function(){a||(s(!0),E(n.itemName))}},n.itemName)})),et=a(153),at=a(158),nt=a(157),ct=a(34),ot={},it=function(t,e,a){return function(n,c){var o=c().tasks[t].find((function(t){return t.id===e}));if(o){var i=Object(w.a)({deadline:o.deadline,description:o.description,priority:o.priority,startDate:o.startDate,status:o.status,title:o.title},a);M(t,e,i).then((function(c){0===c.data.resultCode?n(function(t,e,a){return{type:"UPDATE-TASK-DATA",payload:{listID:t,taskID:e,newData:a}}}(t,e,a)):Y(c.data,n)})).catch((function(t){n(J(t.message))}))}else console.warn("task with id ".concat(e," not found in todo list ").concat(t))}},lt=a(169),rt=a(156),st=l.a.memo((function(t){console.log("Task was called, title: ".concat(t.taskName));var e=Object(i.useCallback)((function(e){var a=e.currentTarget.checked?c.Completed:c.New;t.changeStatus(t.taskID,a)}),[t.changeStatus,t.taskID]),a=Object(i.useCallback)((function(e){t.changeName(t.taskID,e)}),[t.changeName,t.taskID]),n=Object(i.useCallback)((function(){t.removeTask(t.taskID)}),[t.removeTask,t.taskID]);return l.a.createElement(l.a.Fragment,null,l.a.createElement(ut,null,l.a.createElement(lt.a,{checked:t.isDone,color:"primary",onChange:e}),l.a.createElement(tt,{itemName:t.taskName,itemNameChangedCallback:a})),l.a.createElement(f.a,{size:"small",onClick:n},l.a.createElement(rt.a,{color:"primary"})))})),ut=E.a.div(G||(G=Object(m.a)(["\n  //min-width: 260px;\n  //border-bottom: 2px solid gray;\n"]))),dt=["demo","listStatus"],mt=E.a.div(V||(V=Object(m.a)(["\n  min-width: 300px;\n"]))),bt=E.a.div(B||(B=Object(m.a)(["\n  display: flex;\n  justify-content: space-between;\n  padding-right: 0;\n"]))),ft=l.a.memo((function(t){var e=t.demo,a=void 0!==e&&e,n=t.listStatus,o=Object(u.a)(t,dt);console.log("todolist was called, title: ".concat(o.title));var r=Object(X.c)((function(t){return t.tasks[o.todolistID]})),s=Object(X.b)();Object(i.useEffect)((function(){var t;a||s((t=o.todolistID,function(e){e(W("loading")),U(t).then((function(a){e(function(t,e){return{type:"SET-TASKS",payload:{todoListID:t,tasks:e}}}(t,a.data.items)),e(W("succeeded"))})).catch((function(t){$(t,e)}))}))}),[s,o.todolistID]);var d=r;"active"===o.activeFilter&&(d=r.filter((function(t){return t.status===c.New}))),"completed"===o.activeFilter&&(d=r.filter((function(t){return t.status===c.Completed})));var m=Object(i.useCallback)((function(t,e){s(it(o.todolistID,t,{status:e}))}),[s,o.todolistID]),b=Object(i.useCallback)((function(t){var e,a;s((e=o.todolistID,a=t,function(t){t(W("loading")),K(e,a).then((function(a){0===a.data.resultCode?(t(function(t,e){return{type:"ADD-TASK",payload:{listID:t,task:e}}}(e,a.data.data.item)),t(W("succeeded"))):Y(a.data,t)})).catch((function(e){$(e,t)}))}))}),[s,o.todolistID]),p=Object(i.useCallback)((function(t){s(function(t,e){return function(a){H(t,e).then((function(n){a(function(t,e){return{type:"REMOVE-TASK",payload:{listID:t,taskID:e}}}(t,e))})).catch((function(t){$(t,a)}))}}(o.todolistID,t))}),[s,o.todolistID]),E=Object(i.useCallback)((function(t){s({type:"CHANGE-FILTER",payload:{listID:o.todolistID,activeFilter:t}})}),[s,o.todolistID]),O=Object(i.useCallback)((function(){var t,e=(t=o.todolistID,function(e){e(W("loading")),e(Q(t,"loading")),F(t).then((function(a){e(function(t){return{type:"REMOVE-LIST",payload:{listID:t}}}(t)),e(W("succeeded")),e(Q(t,"idle"))})).catch((function(t){$(t,e)}))});s(e)}),[s,o.todolistID]),v=Object(i.useCallback)((function(t,e){s(it(o.todolistID,t,{title:e}))}),[s,o.todolistID]),y=Object(i.useCallback)((function(t){s(function(t,e){return function(a){a(W("loading")),a(Q(t,"loading")),R(t,e).then((function(n){a(function(t,e){return{type:"CHANGE-LIST-NAME",payload:{listID:t,newName:e}}}(t,e)),a(W("succeeded")),a(Q(t,"idle"))})).catch((function(t){$(t,a)}))}}(o.todolistID,t))}),[s,o.todolistID]);return l.a.createElement(mt,null,l.a.createElement("h3",null,l.a.createElement(tt,{itemName:o.title,itemNameChangedCallback:y}),l.a.createElement(f.a,{disabled:"loading"===n,onClick:O},l.a.createElement(nt.a,null))),l.a.createElement(j,{disabled:"loading"===n,addItemCallback:b}),l.a.createElement(et.a,{disablePadding:!0},(d||[]).map((function(t){return l.a.createElement(at.a,{disableGutters:!0,key:t.id,style:{justifyContent:"space-between"}},l.a.createElement(st,{taskID:t.id,isDone:t.status===c.Completed,changeName:v,taskName:t.title,changeStatus:m,removeTask:p}))}))),l.a.createElement(bt,null,l.a.createElement(I.a,{variant:"contained",color:"all"===o.activeFilter?"primary":"default",onClick:function(){return E("all")}},"All"),l.a.createElement(I.a,{variant:"contained",color:"active"===o.activeFilter?"primary":"default",onClick:function(){return E("active")}},"Active"),l.a.createElement(I.a,{variant:"contained",color:"completed"===o.activeFilter?"primary":"default",onClick:function(){return E("completed")}},"Completed")))})),pt=a(171),Et=a(168);function Ot(t){return l.a.createElement(Et.a,Object.assign({elevation:6,variant:"filled"},t))}var vt=function(){var t=Object(X.c)((function(t){return t.app.error})),e=null!==t,a=Object(X.b)(),n=function(t,e){"clickaway"!==e&&a(J(null))};return l.a.createElement(pt.a,{open:e,autoHideDuration:5e3,onClose:n},l.a.createElement(Ot,{onClose:n,severity:"error"},t&&t))},jt=["demo"],yt=function(t){var e=t.demo,a=void 0!==e&&e;Object(u.a)(t,jt);console.log("app was called");var n=Object(X.c)((function(t){return t.lists})),c=Object(X.c)((function(t){return t.app.appStatus})),o=Object(X.b)();Object(i.useEffect)((function(){a||o((function(t){t(W("loading")),_().then((function(e){t({type:"SET-LISTS",payload:{lists:e.data}}),t(W("succeeded"))})).catch((function(e){$(e,t)}))}))}),[o]);var r=Object(i.useCallback)((function(t){var e;t&&o((e=t,function(t){t(W("loading")),x(e).then((function(e){t({type:"ADD-LIST",payload:{todoList:e.data.data.item}}),t(W("succeeded"))})).catch((function(e){$(e,t)}))}))}),[o]);return l.a.createElement("div",null,l.a.createElement(vt,null),l.a.createElement(y.a,{position:"static"},l.a.createElement(k.a,{style:{justifyContent:"space-between"}},l.a.createElement(f.a,{edge:"start",color:"inherit","aria-label":"menu"},l.a.createElement(C.a,null)),l.a.createElement(S.a,{variant:"h6"},"Todolists"),l.a.createElement(I.a,{color:"inherit",variant:"outlined"},"Login")),"loading"===c&&l.a.createElement(D.a,{color:"secondary"})),l.a.createElement(g.a,{fixed:!0},l.a.createElement(h.a,{container:!0,style:{paddingTop:"20px"}},l.a.createElement(j,{addItemCallback:r})),l.a.createElement(h.a,{container:!0,spacing:3},n.map((function(t){return l.a.createElement(h.a,{item:!0,key:t.id},l.a.createElement(T.a,{style:{padding:"20px"},elevation:10},l.a.createElement(ft,{demo:a,listStatus:t.entityStatus,todolistID:t.id,title:t.title,activeFilter:t.activeFilter})))})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var kt=a(54),St=a(82),It=Object(kt.b)({tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ot,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"ADD-TASK":return Object(w.a)(Object(w.a)({},t),{},Object(ct.a)({},e.payload.listID,[e.payload.task].concat(Object(A.a)(t[e.payload.listID]))));case"REMOVE-TASK":return Object(w.a)(Object(w.a)({},t),{},Object(ct.a)({},e.payload.listID,t[e.payload.listID].filter((function(t){return t.id!==e.payload.taskID}))));case"UPDATE-TASK-DATA":return Object(w.a)(Object(w.a)({},t),{},Object(ct.a)({},e.payload.listID,t[e.payload.listID].map((function(t){return t.id===e.payload.taskID?Object(w.a)(Object(w.a)({},t),e.payload.newData):t}))));case"REMOVE-LIST":var a=Object(w.a)({},t);return delete a[e.payload.listID],a;case"SET-TASKS":return Object(w.a)(Object(w.a)({},t),{},Object(ct.a)({},e.payload.todoListID,e.payload.tasks));default:return t}},lists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"ADD-LIST":var a=Object(w.a)(Object(w.a)({},e.payload.todoList),{},{activeFilter:"all",entityStatus:"idle"});return[a].concat(Object(A.a)(t));case"REMOVE-LIST":return t.filter((function(t){return t.id!==e.payload.listID}));case"CHANGE-FILTER":return t.map((function(t){return t.id===e.payload.listID?Object(w.a)(Object(w.a)({},t),{},{activeFilter:e.payload.activeFilter}):t}));case"CHANGE-LIST-NAME":return t.map((function(t){return t.id===e.payload.listID?Object(w.a)(Object(w.a)({},t),{},{title:e.payload.newName}):t}));case"SET-LISTS":return e.payload.lists.map((function(t){return Object(w.a)(Object(w.a)({},t),{},{activeFilter:"all",entityStatus:"idle"})}));case"SET-LIST-STATUS":return t.map((function(t){return t.id===e.payload.listID?Object(w.a)(Object(w.a)({},t),{},{entityStatus:e.payload.entityStatus}):t}));default:return t}},app:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:z,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case L.APP_SET_STATUS:return Object(w.a)(Object(w.a)({},t),{},{appStatus:e.status});case L.APP_SET_ERROR:return Object(w.a)(Object(w.a)({},t),{},{error:e.error});default:return Object(w.a)({},t)}}}),Dt=Object(kt.c)(It,Object(kt.a)(St.a));window.store=Dt,s.a.render(l.a.createElement(X.a,{store:Dt},l.a.createElement(yt,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},90:function(t,e,a){t.exports=a(118)},95:function(t,e,a){}},[[90,1,2]]]);
//# sourceMappingURL=main.97e2f9d5.chunk.js.map