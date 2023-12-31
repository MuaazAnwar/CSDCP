"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7858],{7858:(b,u,a)=>{a.r(u),a.d(u,{LoginPageModule:()=>A});var h=a(6814),c=a(95),o=a(6761),d=a(3044),f=a(5861),n=a(6689),m=a(7294);let v=(()=>{var i;class l{constructor(e,t){this.modalCtrl=e,this.configService=t,this.backendUrl=this.configService.baseURL,this.useMockResponse=this.configService.useMockResponse}saveConfig(){this.configService.baseURL=this.backendUrl,this.configService.useMockResponse=this.useMockResponse,this.modalCtrl.dismiss()}close(){this.modalCtrl.dismiss()}}return(i=l).\u0275fac=function(e){return new(e||i)(n.Y36(o.IN),n.Y36(m.j))},i.\u0275cmp=n.Xpm({type:i,selectors:[["app-configuration-modal"]],decls:16,vars:2,consts:[[1,"ion-padding"],["position","stacked"],[3,"ngModel","ngModelChange"],["expand","full",3,"click"]],template:function(e,t){1&e&&(n.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),n._uU(3,"Configuration"),n.qZA()()(),n.TgZ(4,"ion-content",0)(5,"ion-item")(6,"ion-label",1),n._uU(7,"Backend URL"),n.qZA(),n.TgZ(8,"ion-input",2),n.NdJ("ngModelChange",function(g){return t.backendUrl=g}),n.qZA(),n.TgZ(9,"ion-label",1),n._uU(10,"Mock Server"),n.qZA(),n.TgZ(11,"ion-checkbox",2),n.NdJ("ngModelChange",function(g){return t.useMockResponse=g}),n.qZA()(),n.TgZ(12,"ion-button",3),n.NdJ("click",function(){return t.saveConfig()}),n._uU(13,"Save"),n.qZA(),n.TgZ(14,"ion-button",3),n.NdJ("click",function(){return t.close()}),n._uU(15,"Close"),n.qZA()()),2&e&&(n.xp6(8),n.Q6J("ngModel",t.backendUrl),n.xp6(3),n.Q6J("ngModel",t.useMockResponse))},dependencies:[o.YG,o.nz,o.W2,o.Gu,o.pK,o.Ie,o.Q$,o.wd,o.sr,o.w,o.j9,c.JJ,c.On],encapsulation:2}),l})();var p=a(8926),C=a(9671),M=a(813);const Z=[{path:"",component:(()=>{var i;class l{constructor(e,t,r,g,_,S,L){this.router=e,this.alertService=t,this.dataService=r,this.menu=g,this.httpService=_,this.modalCtrl=S,this.RuntimeConfig=L}ngOnInit(){}ionViewWillEnter(){this.menu.enable(!1)}ionViewDidLeave(){this.menu.enable(!0)}onLoginClick(){if(this.RuntimeConfig.useMockResponse){if(!this.email&&!this.password)return void this.alertService.presentErrorAlert("Please enter email and password to login!");this.dataService.addData("userId",1),this.dataService.addData("name","John Doe"),this.dataService.addData("userName","JohnDoe"),this.dataService.addData("earnings",89),this.dataService.addData("rating",4.3),this.router.navigate(["/home"])}else this.httpService.post("/login?login_type=mobile",{username:this.email,password:this.password}).subscribe(e=>{console.log(e),this.dataService.addData("userId",e.userId),this.dataService.addData("name",e.name),this.dataService.addData("userName",e.userName),e.walletAmount||(e.walletAmount=0),this.dataService.addData("earnings",e.walletAmount),e.rating||(e.rating=0),this.dataService.addData("rating",e.rating),this.router.navigate(["/home"])},e=>{console.log("error",e),this.alertService.presentErrorAlertIWithoutButton(e.message)})}openConfigModal(){var e=this;return(0,f.Z)(function*(){yield(yield e.modalCtrl.create({component:v})).present()})()}}return(i=l).\u0275fac=function(e){return new(e||i)(n.Y36(d.F0),n.Y36(p.c),n.Y36(C.D),n.Y36(o._q),n.Y36(M.f),n.Y36(o.IN),n.Y36(m.j))},i.\u0275cmp=n.Xpm({type:i,selectors:[["app-login"]],decls:31,vars:2,consts:[["fullscreen","true","scrollX","false","scrollY","false",1,"ion-padding"],[1,"ion-text-center",2,"margin-top","50%"],["position","floating"],["type","email",3,"ngModel","ngModelChange"],[2,"margin-top","5px"],["type","password",3,"ngModel","ngModelChange"],["fill","solid","color","primary",2,"margin-left","14px","margin-top","25px",3,"click"],[1,"ion-text-center",2,"margin-top","60px"],[1,"ion-text-center","ion-padding"],["fill","outline"],["name","logo-facebook"],["name","logo-google"],["name","logo-github"],["fill","clear",2,"position","absolute","top","5px","right","5px",3,"click"],["name","settings-outline",2,"font-size","0.7em","color","lightgrey"]],template:function(e,t){1&e&&(n.TgZ(0,"ion-content",0)(1,"div",1)(2,"h2"),n._uU(3,"Login"),n.qZA()(),n.TgZ(4,"ion-item")(5,"ion-label",2),n._uU(6,"Email Address"),n.qZA(),n.TgZ(7,"ion-input",3),n.NdJ("ngModelChange",function(g){return t.email=g}),n.qZA()(),n.TgZ(8,"ion-item",4)(9,"ion-label",2),n._uU(10,"Password"),n.qZA(),n.TgZ(11,"ion-input",5),n.NdJ("ngModelChange",function(g){return t.password=g}),n.qZA()(),n.TgZ(12,"ion-button",6),n.NdJ("click",function(){return t.onLoginClick()}),n._uU(13,"Login"),n.qZA(),n.TgZ(14,"div",7)(15,"h6"),n._uU(16,"Or login with:"),n.qZA()(),n.TgZ(17,"ion-grid",8)(18,"ion-row")(19,"ion-col")(20,"ion-button",9),n._UZ(21,"ion-icon",10),n.qZA()(),n.TgZ(22,"ion-col")(23,"ion-button",9),n._UZ(24,"ion-icon",11),n.qZA()(),n.TgZ(25,"ion-col")(26,"ion-button",9),n._UZ(27,"ion-icon",12),n.qZA()()()(),n._UZ(28,"div"),n.TgZ(29,"ion-button",13),n.NdJ("click",function(){return t.openConfigModal()}),n._UZ(30,"ion-icon",14),n.qZA()()),2&e&&(n.xp6(7),n.Q6J("ngModel",t.email),n.xp6(4),n.Q6J("ngModel",t.password))},dependencies:[c.JJ,c.On,o.YG,o.wI,o.W2,o.jY,o.gu,o.pK,o.Ie,o.Q$,o.Nd,o.j9]}),l})()}];let T=(()=>{var i;class l{}return(i=l).\u0275fac=function(e){return new(e||i)},i.\u0275mod=n.oAB({type:i}),i.\u0275inj=n.cJS({imports:[d.Bz.forChild(Z),d.Bz]}),l})(),A=(()=>{var i;class l{}return(i=l).\u0275fac=function(e){return new(e||i)},i.\u0275mod=n.oAB({type:i}),i.\u0275inj=n.cJS({providers:[p.c],imports:[h.ez,c.u5,o.Pc,T]}),l})()}}]);