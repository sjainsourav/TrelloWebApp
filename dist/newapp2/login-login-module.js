(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login-login-module"],{

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, http) {
        this.router = router;
        this.http = http;
    }
    LoginComponent.prototype.loginsub = function (form) {
        var _this = this;
        this.http.post('/user/signin', {
            email: form.email,
            password: form.password
        }).subscribe(function (res) {
            if (res.success) {
                localStorage.setItem('token', res.token);
                localStorage.setItem('userid', res.userId);
                _this.router.navigate(['/dashboard']);
            }
        });
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./login.html */ "./src/app/login/login.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], LoginComponent);
    return LoginComponent;
}());

// for creating new item localStorage.setItem('name',value)
// for getting a new item localStorage.getItem('name')
// for removing localStorage.removeItem('name')
// for clearing local storage localStorage.clear()


/***/ }),

/***/ "./src/app/login/login.html":
/*!**********************************!*\
  !*** ./src/app/login/login.html ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<style>\n  .container {\n    margin-top: 0rem;\n\n  }\n\n  @media(max-width:500px) {\n\n    .container {\n      margin-top: 6rem;\n    }\n  }\n\n  .centeredButton {\n    display: flex;\n    justify-content: center;\n    margin: 50px;\n  }\n</style>\n\n\n<br>\n<br>\n<br>\n<h1 style=\"text-align: center; color:white;\">Welcome to Trello!</h1>\n<br>\n<h1 style=\"text-align: center; color:white;\">Log in to Trello</h1>\n<h5 style=\"text-align: center; color:white;\"> or\n  <a href=\"/login/signup\" style=\"color:#52a5cb;\">\n    <u>Create a new account</u>\n  </a>\n</h5>\n\n<div class=\"container\">\n  <div class=\"row justify-content-center\">\n    <div class=\"col-md-6 col-sm-6 col-xs-6 col-lg-6\">\n\n\n      <form #loginform=\"ngForm\" (ngSubmit)=\"loginsub(loginform.value)\">\n\n        <div class=\"form-group\">\n          <label for=\"email\" style=\"color: white; font-weight: 600\">Email\n            <!-- <span style=\"color:#52a5cb;\">(or username)</span> -->\n          </label>\n          <input type=\"email\" name=\"email\" #username=\"ngModel\" ngModel required class=\"form-control\">\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"pwd\" style=\"color: white; font-weight: bold\">Password</label>\n          <input type=\"password\" name=\"password\" ngModel required class=\"form-control\">\n        </div>\n        <div *ngIf=\"username.errors\">\n          <small *ngIf=\"username.errors.required && username.touched\">username is required</small>\n          <small *ngIf=\"username.errors.minlength && username.dirty\" class=\"bg-info\">\n            {{username.errors.minlength.requiredLength-username.errors.minlength.actualLength}} more characters\n          </small>\n        </div>\n\n        <div class=\"centeredButton\">\n          <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"loginform.invalid\">Log In</button>\n        </div>\n\n\n        <!-- <script src=\"https://apis.google.com/js/platform.js\" async defer></script>\n        <div class=\"g-signin2\" data-onsuccess=\"onSignIn\">\n          <button (click)=\"socialSignIn('google')\">Sign in with Google</button>\n        </div> -->\n      </form>\n\n      <div class=\"centeredButton\">\n        <a href=\"#\" style=\"color:#52a5cb;\">\n          <b>\n            <u>Forgot your password?</u>\n          </b>\n        </a>\n      </div>\n      <br>\n      <br>\n\n    </div>\n  </div>\n</div>\n\n\n\n\n<!-- <h1>This is the login component</h1>\n\n<form #loginform=\"ngForm\" (ngSubmit)=\"loginsub(loginform.value)\">\n    <input type=\"text\" name=\"email\" #username=\"ngModel\" ngModel required minlength=\"5\">\n    <br><br>\n    <input type=\"text\" name=\"password\" ngModel required>\n    <br><br>\n    <div *ngIf=\"username.errors\">\n        <small *ngIf=\"username.errors.required && username.touched\">username is required</small>\n        <small *ngIf=\"username.errors.minlength && username.dirty\" class=\"bg-info\">\n            {{username.errors.minlength.requiredLength-username.errors.minlength.actualLength}} more characters\n        </small>\n    </div>\n<button type=\"submit\" class=\"btn btn-success\" [disabled]=\"loginform.invalid\">Submit</button>\n</form>\n<button routerLink=\"signup\" class=\"btn btn-warning\">Signup</button> -->"

/***/ }),

/***/ "./src/app/login/login.module.ts":
/*!***************************************!*\
  !*** ./src/app/login/login.module.ts ***!
  \***************************************/
/*! exports provided: LoginModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return LoginModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _signup_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./signup.component */ "./src/app/login/signup.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"],
                _signup_component__WEBPACK_IMPORTED_MODULE_5__["SignupComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild([{
                        path: '',
                        component: _login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"]
                    }, {
                        path: 'signup',
                        component: _signup_component__WEBPACK_IMPORTED_MODULE_5__["SignupComponent"]
                    }])
            ]
        })
    ], LoginModule);
    return LoginModule;
}());



/***/ }),

/***/ "./src/app/login/signup.component.ts":
/*!*******************************************!*\
  !*** ./src/app/login/signup.component.ts ***!
  \*******************************************/
/*! exports provided: SignupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupComponent", function() { return SignupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SignupComponent = /** @class */ (function () {
    function SignupComponent(http, router) {
        this.http = http;
        this.router = router;
    }
    SignupComponent.prototype.signupsub = function (form) {
        this.http.post('/user', {
            fullname: form.fullname,
            email: form.email,
            password: form.password,
            address: form.address,
            username: form.username
        }).subscribe(function (res) {
            console.log(res.message);
            // this.router.navigate(['/dashboard']);
        });
    };
    SignupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./signup.html */ "./src/app/login/signup.html")
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], SignupComponent);
    return SignupComponent;
}());



/***/ }),

/***/ "./src/app/login/signup.html":
/*!***********************************!*\
  !*** ./src/app/login/signup.html ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<head>\n    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\">\n    \n</head>\n\n<style>\n    .container{\n    margin-top:0rem;\n    }\n    @media(max-width:500px){\n    .container{\n        margin-top: 6rem;\n    }\n    }\n    </style>\n\n    <br><br><br><br>\n    <div class=\"container\">\n        <div class=\"row justify-content-center\">\n            <div class=\"col-md-6 col-sm-6 col-xs-6\">\n    <div class=\"card mb-5\">\n        <h3 class=\"card-header text-center text-white bg-primary\">Signup</h3>\n        <div class=\"card-body\">\n        \n          <form #signupform=\"ngForm\" (ngSubmit)=\"signupsub(signupform.value)\">\n          <div class=\"row\">\n          <div class=\"form-group col-md-6\">\n          <label>Username</label>\n          <div class=\"input-group mb-3\">\n          <div class=\"input-group-prepend\">\n            <span class=\"input-group-text\"><i class=\"fa fa-user\"></i></span>\n            \n          </div>\n          <input type=\"text\" name=\"username\" #username=\"ngModel\" ngModel required minlength=\"5\" placeholder=\"username\" class=\"form-control\">\n        </div>\n          \n          </div>\n          <div class=\"form-group col-md-6\">\n          <label>Password</label>\n          <div class=\"input-group mb-3\">\n          <div class=\"input-group-prepend\">\n            <span class=\"input-group-text\"><i class=\"fa fa-key\"></i></span>\n        \n          </div>\n          <input type=\"text\" name=\"password\" ngModel required placeholder=\"password\" class=\"form-control\">\n        </div>\n          \n          </div> \n          <div class=\"form-group col-md-6\">\n          <label>Email</label>\n          <div class=\"input-group mb-3\">\n          <div class=\"input-group-prepend\">\n            <span class=\"input-group-text\"><i class=\"fa fa-envelope-o\"></i></span>\n            \n          </div>\n          <input type=\"text\" name=\"email\" ngModel required placeholder=\"email\" class=\"form-control\">\n        </div>\n          \n          </div>\n          <div class=\"form-group col-md-6\">\n          <label>Address</label>\n          \n          <div class=\"input-group mb-3\">\n          <div class=\"input-group-prepend\">\n            <span class=\"input-group-text\"><i class=\"fa fa-address-card\"></i></span>\n            \n          </div>\n          <input type=\"text\" name=\"address\" ngModel required placeholder=\"address\" class=\"form-control\">\n        </div>\n          \n          </div>\n          <div class=\"form-group col-md-12\">\n          <label>Fullname</label>\n          <div class=\"input-group mb-3\">\n          \n          <input type=\"text\" name=\"fullname\" ngModel required placeholder=\"fullname\" class=\"form-control\">\n        </div>\n          \n          </div>\n          <div *ngIf=\"username.errors\">\n              <small *ngIf=\"username.errors.required && username.touched\">username is required</small>\n              <small *ngIf=\"username.errors.minlength && username.dirty\">\n                  {{username.errors.minlength.requiredLength-username.errors.minlength.actualLength}} more characters\n              </small>\n          </div>\n      \n      </div>\n      <button type=\"submit\" [disabled]=\"signupform.invalid\" class=\"btn btn-primary btn-block col-md-12\">Submit</button>\n      </form>\n        \n        </div>\n        </div>\n        </div></div>\n        </div>\n    `\n    "

/***/ })

}]);
//# sourceMappingURL=login-login-module.js.map