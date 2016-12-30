define('web-api',["require", "exports"], function (require, exports) {
    "use strict";
    var latency = 200;
    var id = 0;
    function getId() {
        return ++id;
    }
    var contacts = [
        {
            id: getId(),
            firstName: 'John',
            lastName: 'Tolkien',
            email: 'tolkien@inklings.com',
            phoneNumber: '867-5309'
        },
        {
            id: getId(),
            firstName: 'Clive',
            lastName: 'Lewis',
            email: 'lewis@inklings.com',
            phoneNumber: '867-5309'
        },
        {
            id: getId(),
            firstName: 'Owen',
            lastName: 'Barfield',
            email: 'barfield@inklings.com',
            phoneNumber: '867-5309'
        },
        {
            id: getId(),
            firstName: 'Charles',
            lastName: 'Williams',
            email: 'williams@inklings.com',
            phoneNumber: '867-5309'
        },
        {
            id: getId(),
            firstName: 'Roger',
            lastName: 'Green',
            email: 'green@inklings.com',
            phoneNumber: '867-5309'
        }
    ];
    var WebAPI = (function () {
        function WebAPI() {
            this.isRequesting = false;
        }
        WebAPI.prototype.getContactList = function () {
            var _this = this;
            this.isRequesting = true;
            return new Promise(function (resolve) {
                setTimeout(function () {
                    var results = contacts.map(function (x) {
                        return {
                            id: x.id,
                            firstName: x.firstName,
                            lastName: x.lastName,
                            email: x.email
                        };
                    });
                    resolve(results);
                    _this.isRequesting = false;
                }, latency);
            });
        };
        WebAPI.prototype.getContactDetails = function (id) {
            var _this = this;
            this.isRequesting = true;
            return new Promise(function (resolve) {
                setTimeout(function () {
                    var found = contacts.filter(function (x) { return x.id == id; })[0];
                    resolve(JSON.parse(JSON.stringify(found)));
                    _this.isRequesting = false;
                }, latency);
            });
        };
        WebAPI.prototype.saveContact = function (contact) {
            var _this = this;
            this.isRequesting = true;
            return new Promise(function (resolve) {
                setTimeout(function () {
                    var instance = JSON.parse(JSON.stringify(contact));
                    var found = contacts.filter(function (x) { return x.id == contact.id; })[0];
                    if (found) {
                        var index = contacts.indexOf(found);
                        contacts[index] = instance;
                    }
                    else {
                        instance.id = getId();
                        contacts.push(instance);
                    }
                    _this.isRequesting = false;
                    resolve(instance);
                }, latency);
            });
        };
        return WebAPI;
    }());
    exports.WebAPI = WebAPI;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app',["require", "exports", "aurelia-framework", "./web-api"], function (require, exports, aurelia_framework_1, web_api_1) {
    "use strict";
    var App = (function () {
        function App(api) {
            this.api = api;
        }
        App.prototype.configureRouter = function (config, router) {
            config.title = 'Aurelia-cli-ts';
            config.map([
                { route: [''], redirect: 'contacts' },
                { route: 'contacts', moduleId: './pages/contacts/index', nav: true, title: 'Contacts' },
                { route: 'projects', moduleId: './pages/projects/index', nav: true, title: 'Projects' },
                { route: 'flow-builder', moduleId: './pages/flow-builder/index', nav: true, title: 'Flow Builder' },
                { route: 'form-builder', moduleId: './pages/form-builder/index', nav: true, title: 'Form Builder' },
                { route: 'harness', moduleId: './pages/harness/index', nav: true, title: 'Harness' }
            ]);
            this.router = router;
        };
        return App;
    }());
    App = __decorate([
        aurelia_framework_1.inject(web_api_1.WebAPI),
        __metadata("design:paramtypes", [web_api_1.WebAPI])
    ], App);
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", "./environment", "bootstrap", "jquery"], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        longStackTraces: environment_1.default.debug,
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources')
            .plugin('aurelia-sortablejs');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('message',["require", "exports"], function (require, exports) {
    "use strict";
    var ContactUpdated = (function () {
        function ContactUpdated(contact) {
            this.contact = contact;
        }
        return ContactUpdated;
    }());
    exports.ContactUpdated = ContactUpdated;
    var ContactViewed = (function () {
        function ContactViewed(contact) {
            this.contact = contact;
        }
        return ContactViewed;
    }());
    exports.ContactViewed = ContactViewed;
});

define('utility',["require", "exports"], function (require, exports) {
    "use strict";
    function areEqual(obj1, obj2) {
        return Object.keys(obj1).every(function (key) { return obj2.hasOwnProperty(key) && (obj1[key] === obj2[key]); });
    }
    exports.areEqual = areEqual;
    ;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
        config.globalResources([
            './elements/loading-indicator',
            './elements/nav-bar/nav-bar',
            './elements/modal/modal',
            './elements/modal/modal-header',
            './elements/modal/modal-body',
            './elements/modal/modal-footer',
            './attributes/bs-popover'
        ]);
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('pages/contacts/detail',["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "../../web-api", "../../utility", "../../message"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, web_api_1, utility_1, message_1) {
    "use strict";
    var ContactDetail = (function () {
        function ContactDetail(api, ea) {
            this.api = api;
            this.ea = ea;
        }
        ContactDetail.prototype.activate = function (params, routeConfig) {
            var _this = this;
            this.routeConfig = routeConfig;
            return this.api.getContactDetails(params.id).then(function (contact) {
                _this.contact = contact;
                _this.routeConfig.navModel.setTitle(_this.contact.firstName);
                _this.originalContact = JSON.parse(JSON.stringify(_this.contact));
                _this.ea.publish(new message_1.ContactViewed(_this.contact));
            });
        };
        Object.defineProperty(ContactDetail.prototype, "canSave", {
            get: function () {
                return this.contact.firstName &&
                    this.contact.lastName &&
                    !this.api.isRequesting &&
                    !utility_1.areEqual(this.originalContact, this.contact);
            },
            enumerable: true,
            configurable: true
        });
        ContactDetail.prototype.save = function () {
            var _this = this;
            this.message = "Saving...";
            this.api.saveContact(this.contact).then(function (contact) {
                _this.contact = contact;
                _this.routeConfig.navModel.setTitle(_this.contact.firstName);
                _this.originalContact = JSON.parse(JSON.stringify(_this.contact));
                _this.message = "Saved";
                _this.ea.publish(new message_1.ContactUpdated(_this.contact));
                setTimeout(function () { return _this.message = ""; }, 1000);
            });
        };
        ContactDetail.prototype.canDeactivate = function () {
            if (!utility_1.areEqual(this.originalContact, this.contact)) {
                var result = confirm('You have unsaved changes. Are you sure you wish to leave?');
                if (!result) {
                    this.ea.publish(new message_1.ContactViewed(this.contact));
                }
                return result;
            }
            return true;
        };
        return ContactDetail;
    }());
    ContactDetail = __decorate([
        aurelia_framework_1.inject(web_api_1.WebAPI, aurelia_event_aggregator_1.EventAggregator),
        __metadata("design:paramtypes", [web_api_1.WebAPI, aurelia_event_aggregator_1.EventAggregator])
    ], ContactDetail);
    exports.ContactDetail = ContactDetail;
});

define('pages/contacts/index',["require", "exports"], function (require, exports) {
    "use strict";
    var ContactIndex = (function () {
        function ContactIndex() {
        }
        ContactIndex.prototype.configureRouter = function (config, router) {
            config.map([
                { route: '', name: 'no-selection', moduleId: './no-selection', nav: false },
                { route: ':id', name: 'contact', moduleId: './detail', nav: false }
            ]);
            this.router = router;
        };
        return ContactIndex;
    }());
    exports.ContactIndex = ContactIndex;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('pages/contacts/list',["require", "exports", "../../web-api", "aurelia-framework", "aurelia-event-aggregator", "../../message"], function (require, exports, web_api_1, aurelia_framework_1, aurelia_event_aggregator_1, message_1) {
    "use strict";
    var ContactList = (function () {
        function ContactList(api, ea) {
            var _this = this;
            this.api = api;
            this.selectId = 0;
            ea.subscribe(message_1.ContactViewed, function (msg) { return _this.select(msg.contact); });
            ea.subscribe(message_1.ContactUpdated, function (msg) {
                var id = msg.contact.id;
                var found = _this.contacts.find(function (x) { return x.id == id; });
                Object.assign(found, msg.contact);
            });
        }
        ContactList.prototype.created = function () {
            var _this = this;
            this.api.getContactList().then(function (contacts) { return _this.contacts = contacts; });
        };
        ContactList.prototype.select = function (contact) {
            this.selectId = contact.id;
            return true;
        };
        return ContactList;
    }());
    ContactList = __decorate([
        aurelia_framework_1.inject(web_api_1.WebAPI, aurelia_event_aggregator_1.EventAggregator),
        __metadata("design:paramtypes", [web_api_1.WebAPI, aurelia_event_aggregator_1.EventAggregator])
    ], ContactList);
    exports.ContactList = ContactList;
});

define('pages/contacts/no-selection',["require", "exports"], function (require, exports) {
    "use strict";
    var NoSelection = (function () {
        function NoSelection() {
            this.message = "Please select a contact to start";
            this.showing = false;
            this.options = [
                { id: false, text: 'Hide' },
                { id: true, text: 'Show' }
            ];
            this.content = "../../../pages/contacts/list";
        }
        NoSelection.prototype.closeDialog = function () {
            this.showing = false;
        };
        return NoSelection;
    }());
    exports.NoSelection = NoSelection;
});

define('pages/flow-builder/builder',["require", "exports"], function (require, exports) {
    "use strict";
    var FlowBuilder = (function () {
        function FlowBuilder() {
        }
        return FlowBuilder;
    }());
    exports.FlowBuilder = FlowBuilder;
});

define('pages/flow-builder/index',["require", "exports"], function (require, exports) {
    "use strict";
    var FlowBuild = (function () {
        function FlowBuild() {
        }
        return FlowBuild;
    }());
    exports.FlowBuild = FlowBuild;
});

define('pages/flow-builder/toolbox',["require", "exports"], function (require, exports) {
    "use strict";
    var FlowToolbox = (function () {
        function FlowToolbox() {
        }
        return FlowToolbox;
    }());
    exports.FlowToolbox = FlowToolbox;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('pages/form-builder/builder',["require", "exports", "aurelia-framework", "aurelia-event-aggregator"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1) {
    "use strict";
    var FormBuilder = (function () {
        function FormBuilder(ea) {
            var _this = this;
            this.widgets = [];
            this.sortOptions = {
                group: {
                    name: 'builder',
                    put: ['palette']
                },
                onAdd: function (e) {
                    _this.addWidget(e);
                }
            };
            ea.subscribe('clearReport', function () {
                _this.widgets = [];
            });
        }
        FormBuilder.prototype.addWidget = function (evt) {
            var t = evt.item.getAttribute('data-id');
            this.widgets.splice(evt.newIndex, 0, {
                id: new Date(),
                type: t,
                model: {
                    name: "aaa",
                    value: 'test'
                }
            });
        };
        FormBuilder.prototype.removeWidget = function (widget) {
            var idx = this.widgets.map(function (obj, index) {
                if (obj.id === widget.id)
                    return index;
            }).reduce(function (prev, current) {
                return current || prev;
            });
            this.widgets.splice(idx, 1);
        };
        return FormBuilder;
    }());
    FormBuilder = __decorate([
        aurelia_framework_1.inject(aurelia_event_aggregator_1.EventAggregator),
        __metadata("design:paramtypes", [aurelia_event_aggregator_1.EventAggregator])
    ], FormBuilder);
    exports.FormBuilder = FormBuilder;
});

define('pages/form-builder/index',["require", "exports"], function (require, exports) {
    "use strict";
    var FormDesigner = (function () {
        function FormDesigner() {
            this.heading = "Form designer";
        }
        return FormDesigner;
    }());
    exports.FormDesigner = FormDesigner;
});

define('modules/fields/base/base',["require", "exports"], function (require, exports) {
    "use strict";
    var FieldBase = (function () {
        function FieldBase() {
            this.id = 0;
        }
        FieldBase.prototype.getId = function () {
            return this.id++;
        };
        FieldBase.prototype.sayHello = function () {
            console.info('***', this.type);
        };
        return FieldBase;
    }());
    exports.FieldBase = FieldBase;
});

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define('modules/fields/textbox/textbox',["require", "exports", "../base/base"], function (require, exports, base_1) {
    "use strict";
    var Textbox = (function (_super) {
        __extends(Textbox, _super);
        function Textbox() {
            var _this = _super.apply(this, arguments) || this;
            _this.type = 'textbox';
            _this.name = 'Text box';
            _this.icon = 'fa-font';
            _this.text = 'Lorem ipsum';
            return _this;
        }
        Textbox.prototype.activate = function (model) {
            this.text = model;
            this.sayHello();
        };
        return Textbox;
    }(base_1.FieldBase));
    exports.Textbox = Textbox;
});

define('modules/fields/header/header',["require", "exports"], function (require, exports) {
    "use strict";
    var Header = (function () {
        function Header() {
            this.type = 'header';
            this.name = 'Header';
            this.icon = 'fa-font';
        }
        return Header;
    }());
    exports.Header = Header;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('pages/form-builder/toolbox',["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "../../modules/fields/textbox/textbox", "../../modules/fields/header/header"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, textbox_1, header_1) {
    "use strict";
    var FormToolbox = (function () {
        function FormToolbox(ea, textbox, header) {
            this.sortOptions = {
                group: {
                    name: 'palette',
                    pull: 'clone'
                },
                sort: false,
                setData: function (dataTransfer, dragEl) {
                    dataTransfer.setData('draggedCtrl', dragEl.getAttribute('data-id'));
                },
                onEnd: function (evt) {
                    evt.item.parentNode.removeChild(evt.item);
                }
            };
            this.widgets = [
                header,
                textbox
            ];
        }
        return FormToolbox;
    }());
    FormToolbox = __decorate([
        aurelia_framework_1.inject(aurelia_event_aggregator_1.EventAggregator, textbox_1.Textbox, header_1.Header),
        __metadata("design:paramtypes", [aurelia_event_aggregator_1.EventAggregator, textbox_1.Textbox, header_1.Header])
    ], FormToolbox);
    exports.FormToolbox = FormToolbox;
});

define('pages/harness/hello',["require", "exports"], function (require, exports) {
    "use strict";
    var Hello = (function () {
        function Hello() {
        }
        return Hello;
    }());
    exports.Hello = Hello;
});

define('pages/harness/index',["require", "exports"], function (require, exports) {
    "use strict";
    var Harness = (function () {
        function Harness() {
            this.menus = [
                {
                    id: 'layout-side-main',
                    title: 'Layout'
                },
                {
                    id: 'table',
                    title: 'Table'
                }
            ];
        }
        Harness.prototype.selectMenu = function (menu) {
            this.router.navigate(menu.title);
        };
        Harness.prototype.configureRouter = function (config, router) {
            var conf = [
                { route: '', moduleId: './hello', nav: true }
            ];
            this.menus.forEach(function (menu) {
                conf.push({
                    route: menu.title,
                    moduleId: './components/' + menu.id + '-demo',
                    nav: true
                });
            });
            config.map(conf);
            this.router = router;
        };
        Harness.prototype.bind = function () {
            console.info('#####', this.router);
        };
        return Harness;
    }());
    exports.Harness = Harness;
});



define("pages/harness/menus", [],function(){});

define('pages/projects/index',["require", "exports"], function (require, exports) {
    "use strict";
    var Projects = (function () {
        function Projects() {
        }
        return Projects;
    }());
    exports.Projects = Projects;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/attributes/bs-popover',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    var Popover = (function () {
        function Popover(element) {
            this.placement = 'right';
            this.elem = element;
        }
        Popover.prototype.bind = function () {
            $(this.elem).popover({
                container: 'body',
                title: this.title,
                placement: this.placement,
                content: this.content,
                trigger: 'hover'
            });
        };
        Popover.prototype.propertyChanged = function (name, newValue, oldValue) {
            $(this.elem).data('bs.popover').options[name] = newValue;
        };
        return Popover;
    }());
    Popover = __decorate([
        aurelia_framework_1.autoinject,
        aurelia_framework_1.customAttribute('bs-popover'),
        aurelia_framework_1.dynamicOptions,
        __metadata("design:paramtypes", [Element])
    ], Popover);
    exports.Popover = Popover;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/loading-indicator',["require", "exports", "nprogress", "aurelia-framework"], function (require, exports, nprogress, aurelia_framework_1) {
    "use strict";
    var LoadingIndicator = (function () {
        function LoadingIndicator() {
            this.loading = false;
        }
        LoadingIndicator.prototype.loadingChanged = function (newValue) {
            if (newValue) {
                nprogress.start();
            }
            else {
                nprogress.done();
            }
        };
        return LoadingIndicator;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], LoadingIndicator.prototype, "loading", void 0);
    LoadingIndicator = __decorate([
        aurelia_framework_1.noView(['nprogress/nprogress.css']),
        __metadata("design:paramtypes", [])
    ], LoadingIndicator);
    exports.LoadingIndicator = LoadingIndicator;
});

define('resources/view-models/list-view-model',["require", "exports"], function (require, exports) {
    "use strict";
    var ListViewModel = (function () {
        function ListViewModel(route, router, service) {
            this.entities = [];
            this.pageSize = 100;
            this.pageCount = 0;
            this.pageIndex = 0;
            this.isLoading = false;
            this.route = route;
            this.router = router;
            this.service = service;
        }
        ListViewModel.prototype.activate = function () {
            this.load();
        };
        ListViewModel.prototype.load = function () {
            var _this = this;
            this.isLoading = true;
            this.service.getPage(this.pageIndex)
                .then(function (result) {
                _this.entities = result.entities;
                _this.pageCount = result.pageCount;
                _this.isLoading = false;
            });
        };
        ListViewModel.prototype.setPage = function (index) {
            this.pageIndex = index;
            this.load();
        };
        ListViewModel.prototype.open = function (id) {
            this.router.navigate(this.route + '/' + id);
        };
        return ListViewModel;
    }());
    exports.ListViewModel = ListViewModel;
});



define("resources/value-converters/date-format", [],function(){});



define("resources/value-converters/number-format", [],function(){});



define("modules/fields/checkbox/checkbox", [],function(){});



define("modules/triggers/base/base", [],function(){});



define("modules/triggers/timer/timer", [],function(){});

define('pages/harness/components/layout-side-main-demo',["require", "exports"], function (require, exports) {
    "use strict";
    var LayoutSideMainDemo = (function () {
        function LayoutSideMainDemo() {
        }
        return LayoutSideMainDemo;
    }());
    exports.LayoutSideMainDemo = LayoutSideMainDemo;
});

define('pages/harness/components/layout-side-main',["require", "exports"], function (require, exports) {
    "use strict";
    var LayoutSideMain = (function () {
        function LayoutSideMain() {
        }
        return LayoutSideMain;
    }());
    exports.LayoutSideMain = LayoutSideMain;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('pages/harness/components/navigator',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    var Navigator = (function () {
        function Navigator() {
        }
        return Navigator;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], Navigator.prototype, "menus", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], Navigator.prototype, "select", void 0);
    exports.Navigator = Navigator;
});

define('pages/harness/components/table-demo',["require", "exports"], function (require, exports) {
    "use strict";
    var TableDemo = (function () {
        function TableDemo() {
        }
        return TableDemo;
    }());
    exports.TableDemo = TableDemo;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('pages/harness/components/toper',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    var Toper = (function () {
        function Toper() {
        }
        Toper.prototype.bind = function () {
            console.info('####', this.router);
        };
        return Toper;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], Toper.prototype, "router", void 0);
    exports.Toper = Toper;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/nav-bar/nav-bar',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    var NavBar = (function () {
        function NavBar() {
        }
        return NavBar;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], NavBar.prototype, "router", void 0);
    NavBar = __decorate([
        aurelia_framework_1.customElement('nav-bar'),
        __metadata("design:paramtypes", [])
    ], NavBar);
    exports.NavBar = NavBar;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/modal/modal-body',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    var ModalBody = (function () {
        function ModalBody() {
        }
        return ModalBody;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], ModalBody.prototype, "contentView", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], ModalBody.prototype, "contentModel", void 0);
    exports.ModalBody = ModalBody;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/modal/modal-footer',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    var ModalFooter = (function () {
        function ModalFooter() {
            this.buttons = [];
        }
        return ModalFooter;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], ModalFooter.prototype, "buttons", void 0);
    exports.ModalFooter = ModalFooter;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/modal/modal-header',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    var ModalHeader = (function () {
        function ModalHeader(element) {
            this.title = '';
            this.close = null;
            this.elem = element;
        }
        ModalHeader.prototype.attached = function () {
        };
        return ModalHeader;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], ModalHeader.prototype, "title", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], ModalHeader.prototype, "close", void 0);
    ModalHeader = __decorate([
        aurelia_framework_1.inject(Element),
        __metadata("design:paramtypes", [Element])
    ], ModalHeader);
    exports.ModalHeader = ModalHeader;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/modal/modal',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    var Modal = (function () {
        function Modal(element) {
            this.showing = false;
            this.elem = element;
        }
        Modal.prototype.attached = function () {
            var _this = this;
            $(this.modal).modal({
                show: false
            })
                .on('show.bs.modal', function () {
                _this.showing = true;
            })
                .on('hide.bs.modal', function () {
                _this.showing = false;
            });
        };
        Modal.prototype.showingChanged = function (newValue) {
            if (newValue) {
                $(this.elem).find('.modal').modal('show');
            }
            else {
                $(this.elem).find('.modal').modal('hide');
            }
        };
        return Modal;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Boolean)
    ], Modal.prototype, "showing", void 0);
    Modal = __decorate([
        aurelia_framework_1.customElement('modal'),
        aurelia_framework_1.inject(Element),
        __metadata("design:paramtypes", [Element])
    ], Modal);
    exports.Modal = Modal;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <require from=\"./styles.css\"></require>\n\n  <loading-indicator loading.bind=\"router.isNavigating || api.isRequesting\"></loading-indicator>\n\n  <nav-bar router.bind=\"router\"></nav-bar>\n\n  <router-view></router-view>\n</template>\n"; });
define('text!styles.css', ['module'], function(module) { module.exports = "html, body {\n  height: 100%;\n}\n\nbody { padding-top: 70px; }\n\nsection {\n  margin: 0 20px;\n}\n\na:focus {\n  outline: none;\n}\n\n.navbar-nav li.loader {\n    margin: 12px 24px 0 6px;\n}\n\n.no-selection {\n  margin: 20px;\n}\n\n.contact-list {\n  overflow-y: auto;\n  border: 1px solid #ddd;\n  padding: 10px;\n}\n\n.panel {\n  margin: 20px;\n}\n\n.button-bar {\n  right: 0;\n  left: 0;\n  bottom: 0;\n  border-top: 1px solid #ddd;\n  background: white;\n}\n\n.button-bar > button {\n  float: right;\n  margin: 20px;\n}\n\nli.list-group-item {\n  list-style: none;\n}\n\nli.list-group-item > a {\n  text-decoration: none;\n}\n\nli.list-group-item.active > a {\n  color: white;\n}\n"; });
define('text!pages/contacts/detail.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"panel panel-primary\">\n    <div class=\"panel-heading\">\n      <h3 class=\"panel-title\"   \n        bs-popover=\"placement:'right'; title.bind: contact.firstName; content.bind: contact.lastName\">Profile</h3>\n      \n    </div>\n    <div class=\"panel-body\">\n      <form role=\"form\" class=\"form-horizontal\">\n        <div textcontent.bind=\"'is: ' + contact.firstName\"></div>\n        \n        <div class=\"form-group\">\n          <label class=\"col-sm-2 control-label\">First Name</label>\n          <div class=\"col-sm-10\">\n            <input type=\"text\" placeholder=\"first name\" class=\"form-control\" value.bind=\"contact.firstName\">\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"col-sm-2 control-label\">Last Name</label>\n          <div class=\"col-sm-10\">\n            <input type=\"text\" placeholder=\"last name\" class=\"form-control\" value.bind=\"contact.lastName\">\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"col-sm-2 control-label\">Email</label>\n          <div class=\"col-sm-10\">\n            <input type=\"text\" placeholder=\"email\" class=\"form-control\" value.bind=\"contact.email\">\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"col-sm-2 control-label\">Phone Number</label>\n          <div class=\"col-sm-10\">\n            <input type=\"text\" placeholder=\"phone number\" class=\"form-control\" value.bind=\"contact.phoneNumber\">\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n\n  <div class=\"button-bar\">\n    <span>${message}</span>\n    <button class=\"btn btn-success\" click.delegate=\"save()\" disabled.bind=\"!canSave\">Save</button>\n  </div>\n</template>\n"; });
define('text!pages/contacts/index.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./list\"></require>\n\n  <div class=\"container\">\n    <div class=\"row\">\n      <contact-list class=\"col-md-4\"></contact-list>\n      <router-view class=\"col-md-8\"></router-view>\n    </div>\n</template>\n"; });
define('text!pages/contacts/list.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"contact-list\">\n    <ul class=\"list-group\">\n      <li repeat.for=\"contact of contacts\" class=\"list-group-item ${contact.id === $parent.selectedId ? 'active' : ''}\">\n        <a route-href=\"route: contact; params.bind: {id:contact.id}\" click.delegate=\"$parent.select(contact)\">\n          <h4 class=\"list-group-item-heading\">${contact.firstName} ${contact.lastName}</h4>\n          <p class=\"list-group-item-text\">${contact.email}</p>\n        </a>\n      </li>\n    </ul>\n  </div>\n</template>\n"; });
define('text!pages/contacts/no-selection.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"no-selection text-center\">\n    <h2>${message}</h2>\n    ${showing}\n    <select value.bind=\"showing\">\n      <option value=\"\">Select</option>\n      <option repeat.for=\"opt of options\" \n        model.bind=\"opt.id\">${opt.text}</option>\n    </select>\n  </div>\n\n  <modal showing.bind=\"showing\">\n    <modal-header slot=\"modal-header\" title=\"Name Goes Here\" close.call=\"closeDialog()\"></modal-header>\n    <modal-body slot=\"modal-body\" content-view=\"${content}\"></modal-body>\n    <modal-footer  slot=\"modal-footer\" buttons.bind=\"['Cancel']\"></modal-footer>\n  </modal>\n</template>\n"; });
define('text!pages/flow-builder/builder.html', ['module'], function(module) { module.exports = "<template>\nReports\n</template>\n"; });
define('text!pages/flow-builder/index.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"container\">\n      <h1 class=\"non-printable\">Report Builder</h1>\n\n      <div class=\"row\">\n          <compose class=\"col-md-2 non-printable\" view-model=\"./toolbox\"></compose>\n          <compose class=\"col-md-10 printable\" view-model=\"./builder\"></compose>\n      </div>\n  </div>\n</template>\n"; });
define('text!pages/flow-builder/toolbox.html', ['module'], function(module) { module.exports = "<template>\n  <h3>Toolbox</h3>\n  <ul class=\"list-unstyled toolbox au-stagger\" ref=\"toolboxList\">\n    <li repeat.for=\"widget of widgets\" class=\"au-animate\" title=\"${widget.type}\"><i class=\"fa ${widget.icon}\"/> ${widget.name}</li>\n  </ul>\n  <button click.delegate=\"printReport()\" type=\"button\" class=\"btn btn-primary fa fa-print\"> Print</button>\n  <button click.delegate=\"clearReport()\" type=\"button\" class=\"btn btn-warning fa fa-remove\"> Clear Report</button>\n</template>\n"; });
define('text!pages/form-builder/builder.html', ['module'], function(module) { module.exports = "<template>\n  <style>\n    .item {\n      clear: both\n    }\n  </style>\n  <div style=\"border: 1px dotted #ddd; min-height: 300px;\"\n    sortable.bind=\"sortOptions\">\n    <div class=\"item\" repeat.for=\"widget of widgets\">\n      <compose\n        model.bind=\"widget.model\"\n        view-model=\"../../modules/fields/${widget.type}/${widget.type}\"></compose>\n      <i class=\"remove-widget fa fa-trash-o col-md-1 non-printable\" click.trigger=\"$parent.removeWidget(widget)\"></i>\n    </div>\n  </div>\n  \n</template>\n"; });
define('text!pages/form-builder/index.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"container\">\n      <div class=\"row\">\n          <compose class=\"col-md-2 non-printable\" view-model=\"./toolbox\"></compose>\n          <compose class=\"col-md-10 printable\" view-model=\"./builder\"></compose>\n      </div>\n  </div>\n</template>\n"; });
define('text!pages/form-builder/toolbox.html', ['module'], function(module) { module.exports = "<template>\n  <!--<button click.delegate=\"printReport()\" type=\"button\" class=\"btn btn-primary fa fa-print\"> Print</button>\n  <button click.delegate=\"clearReport()\" type=\"button\" class=\"btn btn-warning fa fa-remove\"> Clear Report</button>-->\n  <div class=\"panel panel-default\">\n    <div class=\"panel-heading\">\n      <h3 class=\"panel-title\">Tool Box</h3>\n    </div>\n    <div class=\"panel-body\">\n      <div sortable.bind=\"sortOptions\">\n        <div repeat.for=\"t of widgets\" \n          data-id=\"${t.type}\"\n          title=\"${t.type}\" style=\"border:1px solid #ddd\">${t.name}</div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('text!pages/harness/hello.html', ['module'], function(module) { module.exports = "<template>\nHello\n</template>\n"; });
define('text!pages/harness/index.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./components/layout-side-main\"></require>\n  <require from=\"./components/navigator\"></require>\n  <require from=\"./components/toper\"></require>\n  <layout-side-main>\n    <div slot=\"side\">\n      <navigator \n        select.call=\"selectMenu(menu)\"\n        menus.bind=\"menus\"></navigator>\n    </div>\n\n    <div slot=\"main\">\n      <toper router.bind=\"router\" if.bind=\"router.container.parent\"></toper>\n      <!--<compose view-model=\"./components/${currentMenu.id}-demo\"></compose>-->\n      <router-view></router-view>\n    </div>\n  </layout-side-main>\n</template>\n"; });
define('text!pages/projects/index.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"container\">Projects</div>\n</template>\n"; });
define('text!modules/fields/checkbox/checkbox.html', ['module'], function(module) { module.exports = ""; });
define('text!modules/fields/header/header.html', ['module'], function(module) { module.exports = "<template>\n  <div>\n    <div class=\"pull-right\">\n      Funnyroad 123<br />\n      1010 SOME-STATE<br />\n      USA<br />\n    </div>\n\n    <h2>Abstract-IT &trade;</h2>\n    <p>Delivering concrete solutions</p> \n  </div>\n</template>\n"; });
define('text!modules/fields/textbox/textbox.html', ['module'], function(module) { module.exports = "<template>\n  <div>\n    <div>\n      ** ${name}\n    </div>\n  </div>\n</template>\n"; });
define('text!pages/harness/components/layout-side-main-demo.html', ['module'], function(module) { module.exports = "<template>\nYour Template Here\n</template>\n"; });
define('text!pages/harness/components/layout-side-main.html', ['module'], function(module) { module.exports = "<template>\n  <style>\n    .o-layout {\n      display: flex;\n      height: 100%\n    }\n    .o-layout > .main {\n      flex-grow: 1;\n      border-left: 1px solid #ddd;\n    }\n  </style>\n  <div class=\"o-layout\">\n    <div class=\"side\">\n      <slot name=\"side\"></slot>\n    </div>\n\n    <div class=\"main\">\n      <slot name=\"main\"></div>\n    </div>\n  </div>\n</template>\n"; });
define('text!pages/harness/components/navigator.html', ['module'], function(module) { module.exports = "<template>\n  <div>\n    <h1>Logo</h1>\n    <nav>\n      <ul>\n        <li repeat.for=\"menu of menus\"><a click.trigger=\"select({menu: menu})\">${menu.title}</a></li>\n      </ul>\n    </nav>\n  </div>\n</template>\n"; });
define('text!pages/harness/components/table-demo.html', ['module'], function(module) { module.exports = "<template>\nTable Demo\n</template>\n"; });
define('text!pages/harness/components/toper.html', ['module'], function(module) { module.exports = "<template>\n  <div style=\"border-bottom: 1px solid #ddd\">${router.currentInstruction.config.route}</div>\n</template>\n"; });
define('text!resources/elements/modal/modal-body.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"modal-body\">\n    <compose model.bind=\"contentModel\" view-model.bind=\"contentView\"></compose>\n    <slot></slot>\n  </div>\n</template>\n"; });
define('text!resources/elements/modal/modal-footer.html', ['module'], function(module) { module.exports = "<template>  \n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-default\" repeat.for=\"button of buttons\">${button}</button>\n  </div>\n</template>\n"; });
define('text!resources/elements/modal/modal-header.html', ['module'], function(module) { module.exports = "<template>  \n  <div class=\"modal-header\">\n    <button type=\"button\" class=\"close\" \n      data-dismiss=\"modal\" aria-label=\"Close\"\n      click.trigger=\"close()\"\n      if.bind=\"close\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n    <h4 class=\"modal-title\">${title}</h4>\n  </div>\n</template> \n"; });
define('text!resources/elements/modal/modal.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"modal fade\" role=\"dialog\" ref=\"modal\">\n    <div class=\"modal-dialog\">\n      <div class=\"modal-content\">\n        <slot name=\"modal-header\"></slot>\n        <slot name=\"modal-body\"></slot>\n        <slot name=\"modal-footer\"></slot>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('text!resources/elements/nav-bar/nav-bar.html', ['module'], function(module) { module.exports = "<template> \n  <nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n      <div class=\"navbar-header\">\n        <a class=\"navbar-brand\" href=\"#\">\n          <i class=\"fa fa-user\"></i>\n          <span>${router.title}</span>\n        </a>\n      </div>\n    </nav>\n\n    <nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n      <div class=\"navbar-header\">\n        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n          <span class=\"sr-only\">Toggle Navigation</span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n        </button>\n        <a class=\"navbar-brand\" href=\"#\">\n          <i class=\"fa fa-home\"></i>\n          <span>${router.title}</span>\n        </a>\n      </div>\n\n      <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n        <ul class=\"nav navbar-nav\">\n          <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\n            <a data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1.in\" href.bind=\"row.href\">${row.title}</a>\n          </li>\n        </ul>\n\n        <ul class=\"nav navbar-nav navbar-right\">\n          <li class=\"loader\" if.bind=\"router.isNavigating\">\n            <i class=\"fa fa-spinner fa-spin fa-2x\"></i>\n          </li>\n        </ul>\n      </div>\n    </nav>\n  </template>\n"; });
//# sourceMappingURL=app-bundle.js.map