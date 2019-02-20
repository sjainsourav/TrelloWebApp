(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["dashboard-dashboard-module"],{

/***/ "./node_modules/ng-drag-drop/index.js":
/*!********************************************!*\
  !*** ./node_modules/ng-drag-drop/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ng_drag_drop_module_1 = __webpack_require__(/*! ./src/ng-drag-drop.module */ "./node_modules/ng-drag-drop/src/ng-drag-drop.module.js");
exports.NgDragDropModule = ng_drag_drop_module_1.NgDragDropModule;
var drop_event_model_1 = __webpack_require__(/*! ./src/shared/drop-event.model */ "./node_modules/ng-drag-drop/src/shared/drop-event.model.js");
exports.DropEvent = drop_event_model_1.DropEvent;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ng-drag-drop/src/directives/draggable.directive.js":
/*!*************************************************************************!*\
  !*** ./node_modules/ng-drag-drop/src/directives/draggable.directive.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var ng_drag_drop_service_1 = __webpack_require__(/*! ../services/ng-drag-drop.service */ "./node_modules/ng-drag-drop/src/services/ng-drag-drop.service.js");
var dom_helper_1 = __webpack_require__(/*! ../shared/dom-helper */ "./node_modules/ng-drag-drop/src/shared/dom-helper.js");
var Draggable = /** @class */ (function () {
    function Draggable(el, renderer, ng2DragDropService, zone) {
        this.el = el;
        this.renderer = renderer;
        this.ng2DragDropService = ng2DragDropService;
        this.zone = zone;
        /**
         * Currently not used
         */
        this.dragEffect = 'move';
        /**
         * Defines compatible drag drop pairs. Values must match both in draggable and droppable.dropScope.
         */
        this.dragScope = 'default';
        /**
         * The CSS class applied to a draggable element. If a dragHandle is defined then its applied to that handle
         * element only. By default it is used to change the mouse over pointer.
         */
        this.dragHandleClass = 'drag-handle';
        /**
         * CSS class applied on the source draggable element while being dragged.
         */
        this.dragClass = 'drag-border';
        /**
         * CSS class applied on the drag ghost when being dragged.
         */
        this.dragTransitClass = 'drag-transit';
        /**
         * Event fired when Drag is started
         */
        this.onDragStart = new core_1.EventEmitter();
        /**
         * Event fired while the element is being dragged
         */
        this.onDrag = new core_1.EventEmitter();
        /**
         * Event fired when drag ends
         */
        this.onDragEnd = new core_1.EventEmitter();
        /**
         * @private
         * Backing field for the dragEnabled property
         */
        this._dragEnabled = true;
    }
    Object.defineProperty(Draggable.prototype, "dragImage", {
        get: function () {
            return this._dragImage;
        },
        /**
         * The url to image that will be used as custom drag image when the draggable is being dragged.
         */
        set: function (value) {
            this._dragImage = value;
            this.dragImageElement = new Image();
            this.dragImageElement.src = this.dragImage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Draggable.prototype, "dragEnabled", {
        get: function () {
            return this._dragEnabled;
        },
        /**
         * Defines if drag is enabled. `true` by default.
         */
        set: function (value) {
            this._dragEnabled = value;
            this.applyDragHandleClass();
        },
        enumerable: true,
        configurable: true
    });
    ;
    Draggable.prototype.ngOnInit = function () {
        this.applyDragHandleClass();
    };
    Draggable.prototype.ngOnDestroy = function () {
        this.unbindDragListeners();
    };
    Draggable.prototype.dragStart = function (e) {
        var _this = this;
        if (this.allowDrag()) {
            // This is a kludgy approach to apply CSS to the drag helper element when an image is being dragged.
            dom_helper_1.DomHelper.addClass(this.el, this.dragTransitClass);
            setTimeout(function () {
                dom_helper_1.DomHelper.addClass(_this.el, _this.dragClass);
                dom_helper_1.DomHelper.removeClass(_this.el, _this.dragTransitClass);
            }, 10);
            this.ng2DragDropService.dragData = this.dragData;
            this.ng2DragDropService.scope = this.dragScope;
            // Firefox requires setData() to be called otherwise the drag does not work.
            // We don't use setData() to transfer data anymore so this is just a dummy call.
            if (e.dataTransfer != null) {
                e.dataTransfer.setData('text', '');
            }
            // Set dragImage
            if (this.dragImage) {
                e.dataTransfer.setDragImage(this.dragImageElement, 0, 0);
            }
            e.stopPropagation();
            this.onDragStart.emit(e);
            this.ng2DragDropService.onDragStart.next();
            this.zone.runOutsideAngular(function () {
                _this.unbindDragListener = _this.renderer.listen(_this.el.nativeElement, 'drag', function (dragEvent) {
                    _this.drag(dragEvent);
                });
            });
        }
        else {
            e.preventDefault();
        }
    };
    Draggable.prototype.drag = function (e) {
        this.onDrag.emit(e);
    };
    Draggable.prototype.dragEnd = function (e) {
        this.unbindDragListeners();
        dom_helper_1.DomHelper.removeClass(this.el, this.dragClass);
        this.ng2DragDropService.onDragEnd.next();
        this.onDragEnd.emit(e);
        e.stopPropagation();
        e.preventDefault();
    };
    Draggable.prototype.mousedown = function (e) {
        this.mouseDownElement = e.target;
    };
    Draggable.prototype.allowDrag = function () {
        if (this.dragHandle) {
            return dom_helper_1.DomHelper.matches(this.mouseDownElement, this.dragHandle) && this.dragEnabled;
        }
        else {
            return this.dragEnabled;
        }
    };
    Draggable.prototype.applyDragHandleClass = function () {
        var dragElement = this.getDragHandleElement();
        if (!dragElement) {
            return;
        }
        if (this.dragEnabled) {
            dom_helper_1.DomHelper.addClass(dragElement, this.dragHandleClass);
        }
        else {
            dom_helper_1.DomHelper.removeClass(this.el, this.dragHandleClass);
        }
    };
    Draggable.prototype.getDragHandleElement = function () {
        var dragElement = this.el;
        if (this.dragHandle) {
            dragElement = this.el.nativeElement.querySelector(this.dragHandle);
        }
        return dragElement;
    };
    Draggable.prototype.unbindDragListeners = function () {
        if (this.unbindDragListener) {
            this.unbindDragListener();
        }
    };
    Draggable.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[draggable]'
                },] },
    ];
    /** @nocollapse */
    Draggable.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: ng_drag_drop_service_1.NgDragDropService },
        { type: core_1.NgZone }
    ]; };
    Draggable.propDecorators = {
        dragData: [{ type: core_1.Input }],
        dragHandle: [{ type: core_1.Input }],
        dragEffect: [{ type: core_1.Input }],
        dragScope: [{ type: core_1.Input }],
        dragHandleClass: [{ type: core_1.Input }],
        dragClass: [{ type: core_1.Input }],
        dragTransitClass: [{ type: core_1.Input }],
        dragImage: [{ type: core_1.Input }],
        dragEnabled: [{ type: core_1.HostBinding, args: ['draggable',] }, { type: core_1.Input }],
        onDragStart: [{ type: core_1.Output }],
        onDrag: [{ type: core_1.Output }],
        onDragEnd: [{ type: core_1.Output }],
        dragStart: [{ type: core_1.HostListener, args: ['dragstart', ['$event'],] }],
        dragEnd: [{ type: core_1.HostListener, args: ['dragend', ['$event'],] }],
        mousedown: [{ type: core_1.HostListener, args: ['mousedown', ['$event'],] }, { type: core_1.HostListener, args: ['touchstart', ['$event'],] }]
    };
    return Draggable;
}());
exports.Draggable = Draggable;
//# sourceMappingURL=draggable.directive.js.map

/***/ }),

/***/ "./node_modules/ng-drag-drop/src/directives/droppable.directive.js":
/*!*************************************************************************!*\
  !*** ./node_modules/ng-drag-drop/src/directives/droppable.directive.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var drop_event_model_1 = __webpack_require__(/*! ../shared/drop-event.model */ "./node_modules/ng-drag-drop/src/shared/drop-event.model.js");
var ng_drag_drop_service_1 = __webpack_require__(/*! ../services/ng-drag-drop.service */ "./node_modules/ng-drag-drop/src/services/ng-drag-drop.service.js");
var dom_helper_1 = __webpack_require__(/*! ../shared/dom-helper */ "./node_modules/ng-drag-drop/src/shared/dom-helper.js");
var Droppable = /** @class */ (function () {
    function Droppable(el, renderer, ng2DragDropService, zone) {
        this.el = el;
        this.renderer = renderer;
        this.ng2DragDropService = ng2DragDropService;
        this.zone = zone;
        /**
         *  Event fired when Drag dragged element enters a valid drop target.
         */
        this.onDragEnter = new core_1.EventEmitter();
        /**
         * Event fired when an element is being dragged over a valid drop target
         */
        this.onDragOver = new core_1.EventEmitter();
        /**
         * Event fired when a dragged element leaves a valid drop target.
         */
        this.onDragLeave = new core_1.EventEmitter();
        /**
         * Event fired when an element is dropped on a valid drop target.
         */
        this.onDrop = new core_1.EventEmitter();
        /**
         * CSS class that is applied when a compatible draggable is being dragged over this droppable.
         */
        this.dragOverClass = 'drag-over-border';
        /**
         * CSS class applied on this droppable when a compatible draggable item is being dragged.
         * This can be used to visually show allowed drop zones.
         */
        this.dragHintClass = 'drag-hint-border';
        /**
         * Defines compatible drag drop pairs. Values must match both in draggable and droppable.dropScope.
         */
        this.dropScope = 'default';
        /**
         * @private
         * Backing field for the dropEnabled property
         */
        this._dropEnabled = true;
        /**
         * @private
         * Field for tracking drag state. Helps when
         * drag stop event occurs before the allowDrop()
         * can be calculated (async).
         */
        this._isDragActive = false;
        /**
         * @private
         * Field for tracking if service is subscribed.
         * Avoids creating multiple subscriptions of service.
         */
        this._isServiceActive = false;
    }
    Object.defineProperty(Droppable.prototype, "dropEnabled", {
        get: function () {
            return this._dropEnabled;
        },
        /**
         * Defines if drop is enabled. `true` by default.
         */
        set: function (value) {
            this._dropEnabled = value;
            if (this._dropEnabled === true) {
                this.subscribeService();
            }
            else {
                this.unsubscribeService();
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    Droppable.prototype.ngOnInit = function () {
        if (this.dropEnabled === true) {
            this.subscribeService();
        }
    };
    Droppable.prototype.ngOnDestroy = function () {
        this.unsubscribeService();
        this.unbindDragListeners();
    };
    Droppable.prototype.dragEnter = function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.onDragEnter.emit(e);
    };
    Droppable.prototype.dragOver = function (e, result) {
        if (result) {
            dom_helper_1.DomHelper.addClass(this.el, this.dragOverClass);
            e.preventDefault();
            this.onDragOver.emit(e);
        }
    };
    Droppable.prototype.dragLeave = function (e) {
        dom_helper_1.DomHelper.removeClass(this.el, this.dragOverClass);
        e.preventDefault();
        this.onDragLeave.emit(e);
    };
    Droppable.prototype.drop = function (e) {
        var _this = this;
        this.allowDrop().subscribe(function (result) {
            if (result && _this._isDragActive) {
                dom_helper_1.DomHelper.removeClass(_this.el, _this.dragOverClass);
                e.preventDefault();
                e.stopPropagation();
                _this.ng2DragDropService.onDragEnd.next();
                _this.onDrop.emit(new drop_event_model_1.DropEvent(e, _this.ng2DragDropService.dragData));
                _this.ng2DragDropService.dragData = null;
                _this.ng2DragDropService.scope = null;
            }
        });
    };
    Droppable.prototype.allowDrop = function () {
        var _this = this;
        var allowed = false;
        /* tslint:disable:curly */
        /* tslint:disable:one-line */
        if (typeof this.dropScope === 'string') {
            if (typeof this.ng2DragDropService.scope === 'string')
                allowed = this.ng2DragDropService.scope === this.dropScope;
            else if (this.ng2DragDropService.scope instanceof Array)
                allowed = this.ng2DragDropService.scope.indexOf(this.dropScope) > -1;
        }
        else if (this.dropScope instanceof Array) {
            if (typeof this.ng2DragDropService.scope === 'string')
                allowed = this.dropScope.indexOf(this.ng2DragDropService.scope) > -1;
            else if (this.ng2DragDropService.scope instanceof Array)
                allowed = this.dropScope.filter(function (item) {
                    return _this.ng2DragDropService.scope.indexOf(item) !== -1;
                }).length > 0;
        }
        else if (typeof this.dropScope === 'function') {
            allowed = this.dropScope(this.ng2DragDropService.dragData);
            if (allowed instanceof rxjs_1.Observable) {
                return allowed.pipe(operators_1.map(function (result) { return result && _this.dropEnabled; }));
            }
        }
        /* tslint:enable:curly */
        /* tslint:disable:one-line */
        return rxjs_1.of(allowed && this.dropEnabled);
    };
    Droppable.prototype.subscribeService = function () {
        var _this = this;
        if (this._isServiceActive === true) {
            return;
        }
        this._isServiceActive = true;
        this.dragStartSubscription = this.ng2DragDropService.onDragStart.subscribe(function () {
            _this._isDragActive = true;
            _this.allowDrop().subscribe(function (result) {
                if (result && _this._isDragActive) {
                    dom_helper_1.DomHelper.addClass(_this.el, _this.dragHintClass);
                    _this.zone.runOutsideAngular(function () {
                        _this.unbindDragEnterListener = _this.renderer.listen(_this.el.nativeElement, 'dragenter', function (dragEvent) {
                            _this.dragEnter(dragEvent);
                        });
                        _this.unbindDragOverListener = _this.renderer.listen(_this.el.nativeElement, 'dragover', function (dragEvent) {
                            _this.dragOver(dragEvent, result);
                        });
                        _this.unbindDragLeaveListener = _this.renderer.listen(_this.el.nativeElement, 'dragleave', function (dragEvent) {
                            _this.dragLeave(dragEvent);
                        });
                    });
                }
            });
        });
        this.dragEndSubscription = this.ng2DragDropService.onDragEnd.subscribe(function () {
            _this._isDragActive = false;
            dom_helper_1.DomHelper.removeClass(_this.el, _this.dragHintClass);
            _this.unbindDragListeners();
        });
    };
    Droppable.prototype.unsubscribeService = function () {
        this._isServiceActive = false;
        if (this.dragStartSubscription) {
            this.dragStartSubscription.unsubscribe();
        }
        if (this.dragEndSubscription) {
            this.dragEndSubscription.unsubscribe();
        }
    };
    Droppable.prototype.unbindDragListeners = function () {
        if (this.unbindDragEnterListener) {
            this.unbindDragEnterListener();
        }
        if (this.unbindDragOverListener) {
            this.unbindDragOverListener();
        }
        if (this.unbindDragLeaveListener) {
            this.unbindDragLeaveListener();
        }
    };
    Droppable.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[droppable]'
                },] },
    ];
    /** @nocollapse */
    Droppable.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: ng_drag_drop_service_1.NgDragDropService },
        { type: core_1.NgZone }
    ]; };
    Droppable.propDecorators = {
        onDragEnter: [{ type: core_1.Output }],
        onDragOver: [{ type: core_1.Output }],
        onDragLeave: [{ type: core_1.Output }],
        onDrop: [{ type: core_1.Output }],
        dragOverClass: [{ type: core_1.Input }],
        dragHintClass: [{ type: core_1.Input }],
        dropScope: [{ type: core_1.Input }],
        dropEnabled: [{ type: core_1.Input }],
        drop: [{ type: core_1.HostListener, args: ['drop', ['$event'],] }]
    };
    return Droppable;
}());
exports.Droppable = Droppable;
//# sourceMappingURL=droppable.directive.js.map

/***/ }),

/***/ "./node_modules/ng-drag-drop/src/ng-drag-drop.module.js":
/*!**************************************************************!*\
  !*** ./node_modules/ng-drag-drop/src/ng-drag-drop.module.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var draggable_directive_1 = __webpack_require__(/*! ./directives/draggable.directive */ "./node_modules/ng-drag-drop/src/directives/draggable.directive.js");
var droppable_directive_1 = __webpack_require__(/*! ./directives/droppable.directive */ "./node_modules/ng-drag-drop/src/directives/droppable.directive.js");
var ng_drag_drop_service_1 = __webpack_require__(/*! ./services/ng-drag-drop.service */ "./node_modules/ng-drag-drop/src/services/ng-drag-drop.service.js");
var NgDragDropModule = /** @class */ (function () {
    function NgDragDropModule() {
    }
    NgDragDropModule.forRoot = function () {
        return {
            ngModule: NgDragDropModule,
            providers: [ng_drag_drop_service_1.NgDragDropService]
        };
    };
    NgDragDropModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [],
                    declarations: [
                        draggable_directive_1.Draggable,
                        droppable_directive_1.Droppable
                    ],
                    exports: [
                        draggable_directive_1.Draggable,
                        droppable_directive_1.Droppable
                    ]
                },] },
    ];
    return NgDragDropModule;
}());
exports.NgDragDropModule = NgDragDropModule;
//# sourceMappingURL=ng-drag-drop.module.js.map

/***/ }),

/***/ "./node_modules/ng-drag-drop/src/services/ng-drag-drop.service.js":
/*!************************************************************************!*\
  !*** ./node_modules/ng-drag-drop/src/services/ng-drag-drop.service.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by orehman on 2/22/2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var rxjs_1 = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var NgDragDropService = /** @class */ (function () {
    function NgDragDropService() {
        this.onDragStart = new rxjs_1.Subject();
        this.onDragEnd = new rxjs_1.Subject();
    }
    NgDragDropService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    NgDragDropService.ctorParameters = function () { return []; };
    return NgDragDropService;
}());
exports.NgDragDropService = NgDragDropService;
//# sourceMappingURL=ng-drag-drop.service.js.map

/***/ }),

/***/ "./node_modules/ng-drag-drop/src/shared/dom-helper.js":
/*!************************************************************!*\
  !*** ./node_modules/ng-drag-drop/src/shared/dom-helper.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by orehman on 2/22/2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var DomHelper = /** @class */ (function () {
    function DomHelper() {
    }
    /**
     * Polyfill for element.matches()
     * See: https://developer.mozilla.org/en/docs/Web/API/Element/matches#Polyfill
     * @param element
     * @param selectorName
     */
    DomHelper.matches = function (element, selectorName) {
        var proto = Element.prototype;
        var func = proto['matches'] ||
            proto.matchesSelector ||
            proto.mozMatchesSelector ||
            proto.msMatchesSelector ||
            proto.oMatchesSelector ||
            proto.webkitMatchesSelector ||
            function (s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s), i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {
                }
                return i > -1;
            };
        return func.call(element, selectorName);
    };
    /**
     * Applies the specified css class on nativeElement
     * @param elementRef
     * @param className
     */
    DomHelper.addClass = function (elementRef, className) {
        var e = this.getElementWithValidClassList(elementRef);
        if (e) {
            e.classList.add(className);
        }
    };
    /**
     * Removes the specified class from nativeElement
     * @param elementRef
     * @param className
     */
    DomHelper.removeClass = function (elementRef, className) {
        var e = this.getElementWithValidClassList(elementRef);
        if (e) {
            e.classList.remove(className);
        }
    };
    /**
     * Gets element with valid classList
     *
     * @param elementRef
     * @returns ElementRef | null
     */
    DomHelper.getElementWithValidClassList = function (elementRef) {
        var e = elementRef instanceof core_1.ElementRef ? elementRef.nativeElement : elementRef;
        if (e.classList !== undefined && e.classList !== null) {
            return e;
        }
        return null;
    };
    return DomHelper;
}());
exports.DomHelper = DomHelper;
//# sourceMappingURL=dom-helper.js.map

/***/ }),

/***/ "./node_modules/ng-drag-drop/src/shared/drop-event.model.js":
/*!******************************************************************!*\
  !*** ./node_modules/ng-drag-drop/src/shared/drop-event.model.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DropEvent = /** @class */ (function () {
    function DropEvent(event, data) {
        this.nativeEvent = event;
        this.dragData = data;
    }
    return DropEvent;
}());
exports.DropEvent = DropEvent;
//# sourceMappingURL=drop-event.model.js.map

/***/ }),

/***/ "./src/app/board/allboards.component.ts":
/*!**********************************************!*\
  !*** ./src/app/board/allboards.component.ts ***!
  \**********************************************/
/*! exports provided: AllBoardsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AllBoardsComponent", function() { return AllBoardsComponent; });
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



var AllBoardsComponent = /** @class */ (function () {
    function AllBoardsComponent(router, http) {
        var _this = this;
        this.router = router;
        this.http = http;
        this.checklen = true;
        this.http.get('/user/getboards/' + localStorage.getItem('userid')).subscribe(function (res) {
            if (res.success) {
                _this.data = res.boards;
                if (_this.data.length == 0) {
                    _this.checklen = false;
                }
            }
        });
    }
    AllBoardsComponent.prototype.viewblog = function (bid) {
        this.router.navigate(['/dashboard', 'user', bid]);
    };
    AllBoardsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-allboard',
            template: __webpack_require__(/*! ./allboards.html */ "./src/app/board/allboards.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], AllBoardsComponent);
    return AllBoardsComponent;
}());



/***/ }),

/***/ "./src/app/board/allboards.html":
/*!**************************************!*\
  !*** ./src/app/board/allboards.html ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<style>\n.pointer{\n    cursor:pointer;\n}\n</style>\n\n<br><br><br><div *ngIf=\"checklen ;else nodata\">\n    <h3 style=\"color:white;\"> Your Personal Boards</h3>\n    <br>\n    <div class=\"row\">\n    <div *ngFor=\"let el of data\" (click)=\"viewblog(el._id)\" class=\"col-lg-3 col-md-4 col-sm-6 col-xs-12\">\n          <div class=\"card pointer\" style=\"width: 15rem;\">\n            <h3 class=\"card-header bg-primary\" style=\"color: white\">{{el.name}}</h3>\n            <div class=\"card-body\">\n            <b>Click Here to see Board</b>\n            </div>\n          </div>\n          <br>\n      </div>\n    </div>\n    </div>\n    <ng-template #nodata><p style=\"color:white\"> You Have No Boards..!! </p></ng-template>"

/***/ }),

/***/ "./src/app/board/board.component.ts":
/*!******************************************!*\
  !*** ./src/app/board/board.component.ts ***!
  \******************************************/
/*! exports provided: BoardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoardComponent", function() { return BoardComponent; });
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



var BoardComponent = /** @class */ (function () {
    function BoardComponent(router, http, activeRoute) {
        var _this = this;
        this.router = router;
        this.http = http;
        this.activeRoute = activeRoute;
        this.checkswim = true;
        this.checkcard = true;
        this.targetItem = null;
        this.id = this.activeRoute.snapshot.params['id'];
        this.http.get('/user/getone/' + this.activeRoute.snapshot.params['id']).subscribe(function (res) {
            if (res.success) {
                _this.data = res.boards;
                if (_this.data.swimlane.length == 0) {
                    _this.checkswim = false;
                }
                if (_this.data.swimlane == null) {
                    _this.checkcard = false;
                }
            }
        });
    }
    BoardComponent.prototype.ngOnInit = function () {
        this.getalldata();
    };
    BoardComponent.prototype.getalldata = function () {
        var _this = this;
        this.http.get('/user/getone/' + this.activeRoute.snapshot.params['id']).subscribe(function (res) {
            if (res.success) {
                _this.data = res.boards;
                if (_this.data.swimlane.length == 0) {
                    _this.checkswim = false;
                }
                if (_this.data.swimlane == null) {
                    _this.checkcard = false;
                }
            }
        });
    };
    BoardComponent.prototype.swimsub = function (form) {
        var _this = this;
        this.http.post('/user/swimlane', {
            id: this.id,
            name: form.name
        }).subscribe(function (res) {
            if (res.success) {
                console.log(res.message);
                _this.getalldata();
            }
        });
    };
    BoardComponent.prototype.cardsub = function (form, swimid) {
        var _this = this;
        this.http.post('/user/card', {
            id: this.id,
            name: form.name,
            swimid: swimid
        }).subscribe(function (res) {
            if (res.success) {
                console.log(res.message);
                _this.getalldata();
            }
        });
    };
    // delform(form, swimid) {
    //     this.http.post('/user/card', {
    //         id: this.id,
    //         name: form.name,
    //         swimid: swimid
    //     }).subscribe((res: any) => {
    //         if (res.success) {
    //             console.log(res.message)
    //             this.getalldata()
    //         }
    //     })
    // }
    BoardComponent.prototype.onItemDrop = function (e, swimid, cardid) {
        var _this = this;
        this.http.post('/user/card', {
            id: this.id,
            name: e.dragData.name,
            swimid: swimid
        }).subscribe(function (res) {
            if (res.success) {
                console.log('Card dropped');
                _this.getalldata();
            }
        });
    };
    BoardComponent.prototype.onItemDrag = function (swimid, cardid) {
        var _this = this;
        this.http.post('/user/card/delete', {
            id: this.id,
            cardid: cardid,
            swimid: swimid
        }).subscribe(function (res) {
            if (res.success) {
                _this.getalldata();
            }
        });
    };
    BoardComponent.prototype.editcard = function (form, cardid, swimid) {
        var _this = this;
        this.http.post('/user/card/edit', {
            id: this.id,
            cardid: cardid,
            swimid: swimid,
            name: form.name
        }).subscribe(function (res) {
            if (res.success) {
                console.log(res.message);
                _this.getalldata();
            }
        });
    };
    BoardComponent.prototype.delcard = function (cardid, swimid) {
        var _this = this;
        this.http.post('/user/card/delete', {
            id: this.id,
            cardid: cardid,
            swimid: swimid
        }).subscribe(function (res) {
            if (res.success) {
                console.log(res.message);
                _this.getalldata();
            }
        });
    };
    BoardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-board',
            template: __webpack_require__(/*! ./board.html */ "./src/app/board/board.html"),
            styleUrls: []
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], BoardComponent);
    return BoardComponent;
}());



/***/ }),

/***/ "./src/app/board/board.html":
/*!**********************************!*\
  !*** ./src/app/board/board.html ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<style>\n  .container {\n    margin-top: 10rem;\n\n  }\n\n  @media(max-width:500px) {\n\n    .container {\n      margin-top: 6rem;\n    }\n  }\n</style>\n\n<head>\n  <!-- <link rel=\"stylesheet\" href=\"./node_modules/ng-drag-drop/style.css\"> -->\n</head>\n\n<br>\n<br>\n<br>\n\n<nav class=\"navbar navbar-dark bg-custom\">\n  <span class=\"navbar-brand mb-0 h1\">{{data?.name}}</span>\n</nav>\n\n\n\n<div *ngIf=\"data && checkswim;else noswim\">\n  <div class=\"row\">\n    <div *ngFor=\"let el of data.swimlane\" class=\"col-lg-3 col-md-4 col-sm-6 col-xs-12\">\n      <div class=\"card\" style=\"border: 2px solid black; width: 15rem; margin-left: 5px;\">\n        <h4 class=\"card-header text-center text-white bg-primary\">{{el.name}}</h4>\n        <div class=\"card-body\">\n\n          <div *ngIf=\"checkcard;else nocard\">\n            <div *ngFor=\"let k of el.card\" droppable (onDrop)=\"onItemDrop($event,el._id)\">\n              <ul class=\"list-group list-group-flush\">\n                <li class=\"list-group-item\" [dragData]=\"k\" [dragData]=\"el._id\" draggable (onDragEnd)=\" onItemDrag(el._id,k._id)\">{{k.name}}</li>\n              </ul>\n\n              <form #cardedit=\"ngForm\" (ngSubmit)=\"editcard(cardedit.value,k._id,el._id)\">\n                <div class=\"form-group\">\n                  <div class=\"input-group mb-3\">\n                    <input type=\"text\" name=\"name\" ngModel required class=\"form-control\" required>\n                  </div>\n                </div>\n                <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"cardedit.invalid\">Edit</button>\n\n              </form>\n              <button class=\"btn btn-danger\" (click)=\"delcard(k._id,el._id)\">Delete</button>\n\n              <hr>\n              <br>\n\n\n\n            </div>\n\n            <form #cardform=\"ngForm\" (ngSubmit)=\"cardsub(cardform.value,el._id)\" droppable (onDrop)=\"onItemDrop($event,el._id)\">\n              <div class=\"form-group\">\n                <div class=\"input-group mb-3\">\n                  <input type=\"text\" name=\"name\" ngModel class=\"form-control\" required>\n                </div>\n              </div>\n              <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"cardform.invalid\">Add Card</button>\n              <!-- <button type=\"submit\" class=\"btn btn-danger\" (click)=\"delform(k._id,el._id)\">Delete Card</button> -->\n            </form>\n\n          </div>\n          <ng-template #nocard>\n            <p style=\"color:white\">You Have No Cards..!!</p>\n            <form #cardform=\"ngForm\" (ngSubmit)=\"cardsub(cardform.value,el._id)\" droppable (onDrop)=\"onItemDrop($event,el._id)\">\n              <div class=\"form-group\">\n                <div class=\"input-group mb-3\">\n                  <input type=\"text\" name=\"name\" ngModel class=\"form-control\" required>\n                </div>\n              </div>\n              <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"cardform.invalid\">Add Card</button>\n            </form>\n          </ng-template>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<br>\n<ng-template #noswim>\n  <p style=\"color:white\">You Have No Swimlanes..!!</p>\n</ng-template>\n\n\n<div style=\"width:50%; margin: auto\">\n  <form #swimform=\"ngForm\" (ngSubmit)=\"swimsub(swimform.value)\">\n    <div class=\"form-group\">\n      <div class=\"input-group mb-3\">\n        <input type=\"text\" name=\"name\" ngModel required class=\"form-control\" required>\n      </div>\n    </div>\n    <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"swimform.invalid\">Add Swimlane</button>\n  </form>\n</div>"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/*!**************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.ts ***!
  \**************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
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



var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(router, http) {
        this.router = router;
        this.http = http;
    }
    DashboardComponent.prototype.boardsub = function (form) {
        var _this = this;
        this.token = localStorage.getItem('token');
        this.http.post('/user/postboard', {
            name: form.name,
            token: this.token
        }).subscribe(function (res) {
            if (res.success) {
                console.log('Board Created');
                _this.router.navigate(['/']);
            }
        });
    };
    DashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./dashboard.html */ "./src/app/dashboard/dashboard.html"),
            styleUrls: []
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard.html":
/*!******************************************!*\
  !*** ./src/app/dashboard/dashboard.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <br><br><h1>This is dashboard</h1><br><br> -->\n  <!-- <div class=\"jumbotron jumbotron-fluid\">\n      <div class=\"container\">\n        <h1 class=\"display-4\">You can now create new boards</h1>\n        <br>\n        <form #boardform=\"ngForm\" (ngSubmit)=\"boardsub(boardform.value)\">\n          <div class=\"form-group\">\n            <label>Name</label>\n            <div class=\"input-group mb-3\">\n              <div class=\"input-group-prepend\">\n                <span class=\"input-group-text\">\n                  <i class=\"far fa-envelope\"></i>\n                </span>\n              </div>\n              <input type=\"text\" name=\"name\" ngModel required minlength=\"5\" class=\"form-control\"  required>\n            </div> \n          </div>\n          <button type=\"submit\" class=\"btn btn-success btn-block\" [disabled]=\"boardform.invalid\">Submit</button>\n        </form>\n      </div>\n    </div>   -->\n\n  <br><br><br><br>\n  \n <div class=\"d-flex justify-content-center\">\n  <div class=\"card\" style=\"width: 58rem;\">\n    \n    <div class=\"card-body\">\n      <h5 class=\"card-title\">Work smarter with your very own Trello board.</h5>\n      <p class=\"card-text\">Boards are where projects get organized, information is shared, and great work happens. They give everyone a shared perspective on the work getting done and what still needs to get done.</p>\n      <a href=\"#\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#exampleModal\">Create new board</a>\n    </div>\n  </div>\n </div>\n\n  <div class=\"modal fade\" id=\"exampleModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <h5 class=\"modal-title\">Add Board Title</h5>\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n        </div>\n        <form #boardform=\"ngForm\" (ngSubmit)=\"boardsub(boardform.value)\">\n        <div class=\"modal-body\">\n          \n            <div class=\"form-group\">\n              <div class=\"input-group\">\n              <input type=\"text\" minlength=\"5\" name=\"name\" ngModel required class=\"form-control\">\n            </div>\n            </div>\n           \n        </div>\n        <div class=\"modal-footer\">\n          <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n          <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"boardform.invalid\">Create board</button>\n        </div>\n      </form>\n      </div>\n    </div>\n  </div>\n\n  <app-allboard></app-allboard>\n"

/***/ }),

/***/ "./src/app/dashboard/dashboard.module.ts":
/*!***********************************************!*\
  !*** ./src/app/dashboard/dashboard.module.ts ***!
  \***********************************************/
/*! exports provided: DashboardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _dashboard_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _board_allboards_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../board/allboards.component */ "./src/app/board/allboards.component.ts");
/* harmony import */ var _board_board_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../board/board.component */ "./src/app/board/board.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var ng_drag_drop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng-drag-drop */ "./node_modules/ng-drag-drop/index.js");
/* harmony import */ var ng_drag_drop__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(ng_drag_drop__WEBPACK_IMPORTED_MODULE_8__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _dashboard_component__WEBPACK_IMPORTED_MODULE_1__["DashboardComponent"],
                _board_allboards_component__WEBPACK_IMPORTED_MODULE_3__["AllBoardsComponent"],
                _board_board_component__WEBPACK_IMPORTED_MODULE_4__["BoardComponent"]
            ],
            imports: [
                _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"],
                ng_drag_drop__WEBPACK_IMPORTED_MODULE_8__["NgDragDropModule"].forRoot(),
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([{
                        path: '',
                        component: _dashboard_component__WEBPACK_IMPORTED_MODULE_1__["DashboardComponent"]
                    }, {
                        path: 'board/allboards',
                        component: _board_allboards_component__WEBPACK_IMPORTED_MODULE_3__["AllBoardsComponent"]
                    }, {
                        path: 'user/:id',
                        component: _board_board_component__WEBPACK_IMPORTED_MODULE_4__["BoardComponent"]
                    }])
            ],
            providers: []
        })
    ], DashboardModule);
    return DashboardModule;
}());



/***/ })

}]);
//# sourceMappingURL=dashboard-dashboard-module.js.map