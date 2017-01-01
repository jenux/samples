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
                { route: 'flow-builder', moduleId: './pages/flow-builder/index', nav: false, title: 'Flow Builder' },
                { route: 'form-builder', moduleId: './pages/form-builder/index', nav: false, title: 'Form Builder' },
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
            this.form = {
                title: 'New Form',
                pages: [
                    {
                        title: 'page 1',
                        fields: []
                    }
                ]
            };
            this.sortOptions = {
                group: {
                    name: 'builder',
                    put: ['palette']
                },
                onAdd: function (e) {
                    _this.addWidget(e);
                }
            };
        }
        FormBuilder.prototype.nextLabel = function (t) {
            return 'label for ' + t;
        };
        FormBuilder.prototype.addWidget = function (evt) {
            var t = evt.item.getAttribute('data-id');
            this.form.pages[0].fields.splice(evt.newIndex, 0, {
                type: t,
                model: {
                    label: this.nextLabel(t),
                    value: '',
                    mode: 'design'
                }
            });
        };
        FormBuilder.prototype.removeWidget = function (widget) {
        };
        return FormBuilder;
    }());
    FormBuilder = __decorate([
        aurelia_framework_1.inject(aurelia_event_aggregator_1.EventAggregator),
        __metadata("design:paramtypes", [aurelia_event_aggregator_1.EventAggregator])
    ], FormBuilder);
    exports.FormBuilder = FormBuilder;
});

define('pages/form-builder/conf',["require", "exports"], function (require, exports) {
    "use strict";
    var FormConf = (function () {
        function FormConf() {
        }
        return FormConf;
    }());
    exports.FormConf = FormConf;
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
            this.type = 'base';
            this.archetype = 'field';
            this.id = 0;
        }
        FieldBase.prototype.getId = function () {
            return this.id++;
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
            _this.title = 'Textbox';
            _this.type = 'textbox';
            _this.datatype = 'string';
            return _this;
        }
        Textbox.prototype.activate = function (model, mode) {
            this.model = model;
            console.info('***', mode);
        };
        return Textbox;
    }(base_1.FieldBase));
    exports.Textbox = Textbox;
});

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define('modules/fields/header/header',["require", "exports", "../base/base"], function (require, exports, base_1) {
    "use strict";
    var Header = (function (_super) {
        __extends(Header, _super);
        function Header() {
            var _this = _super.apply(this, arguments) || this;
            _this.title = 'Header';
            _this.type = 'header';
            _this.datatype = 'html';
            return _this;
        }
        Header.prototype.activate = function (model) {
            console.info('***** arche type', this.archetype);
        };
        return Header;
    }(base_1.FieldBase));
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

define('pages/harness/index',["require", "exports"], function (require, exports) {
    "use strict";
    var Harness = (function () {
        function Harness() {
            this.menus = [
                {
                    id: 'dashboard',
                    title: 'Dashboard'
                },
                {
                    id: 'typography',
                    title: 'Typography'
                },
                {
                    id: 'elements',
                    title: 'UI Elements',
                    widgets: [
                        { id: 'elements', title: 'Elements' },
                        { id: 'buttons', title: 'Buttons' },
                        { id: 'icons', title: 'Icons' },
                        { id: 'tree', title: 'Treeview' },
                    ]
                }
            ];
        }
        Harness.prototype.selectMenu = function (menu) {
            var nm = menu.current.id;
            menu.current.active = menu.current.hasOwnProperty('active') ? !menu.current.active : true;
            if (menu.parent && menu.parent.id) {
                nm = menu.parent.id + '/' + nm;
            }
            if (menu.current.widgets) {
            }
            else {
                console.info('***', nm);
                this.router.navigate(nm);
            }
        };
        Harness.prototype.configureRouter = function (config, router) {
            var conf = [
                { route: '', moduleId: './docs/dashboard/dashboard', nav: false }
            ];
            this.menus.forEach(function (menu) {
                if (menu.hasOwnProperty('widgets')) {
                    menu['widgets'].forEach(function (submenu) {
                        conf.push({
                            route: menu.id + '/' + submenu.id,
                            moduleId: './docs/' + menu.id + '/' + submenu.id,
                            nav: true
                        });
                    });
                }
                else {
                    conf.push({
                        route: menu.id,
                        moduleId: './docs/' + menu.id + '/' + menu.id,
                        nav: true
                    });
                }
            });
            config.map(conf);
            this.router = router;
        };
        Harness.prototype.bind = function () {
        };
        return Harness;
    }());
    exports.Harness = Harness;
});

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



define("resources/value-converters/date-format", [],function(){});



define("resources/value-converters/number-format", [],function(){});

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



define("modules/fields/checkbox/checkbox", [],function(){});



define("modules/triggers/base/base", [],function(){});



define("modules/triggers/timer/timer", [],function(){});

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
define('pages/harness/components/breadcrumbs/breadcrumbs',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    var Breadcrumbs = (function () {
        function Breadcrumbs() {
        }
        Breadcrumbs.prototype.bind = function () {
        };
        return Breadcrumbs;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], Breadcrumbs.prototype, "router", void 0);
    exports.Breadcrumbs = Breadcrumbs;
});

define('pages/harness/components/layout/side-main',["require", "exports"], function (require, exports) {
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
define('pages/harness/components/navigator/navigator',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
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

define('pages/harness/components/table/table',["require", "exports"], function (require, exports) {
    "use strict";
    var UITable = (function () {
        function UITable() {
        }
        return UITable;
    }());
    exports.UITable = UITable;
});

define('pages/harness/docs/breadcrumbs/breadcrumbs',["require", "exports"], function (require, exports) {
    "use strict";
    var SampleBreadcrumbs = (function () {
        function SampleBreadcrumbs() {
        }
        return SampleBreadcrumbs;
    }());
    exports.SampleBreadcrumbs = SampleBreadcrumbs;
});

define('pages/harness/docs/dashboard/dashboard',["require", "exports"], function (require, exports) {
    "use strict";
    var SampleDashboard = (function () {
        function SampleDashboard() {
        }
        SampleDashboard.prototype.info = function () { };
        return SampleDashboard;
    }());
    exports.SampleDashboard = SampleDashboard;
});

define('pages/harness/docs/elements/buttons',["require", "exports"], function (require, exports) {
    "use strict";
    var SampleButtons = (function () {
        function SampleButtons() {
        }
        return SampleButtons;
    }());
    exports.SampleButtons = SampleButtons;
});

define('pages/harness/docs/elements/elements',["require", "exports"], function (require, exports) {
    "use strict";
    var SampleElements = (function () {
        function SampleElements() {
        }
        return SampleElements;
    }());
    exports.SampleElements = SampleElements;
});

define('pages/harness/docs/elements/icons',["require", "exports"], function (require, exports) {
    "use strict";
    var SampleIcons = (function () {
        function SampleIcons() {
        }
        return SampleIcons;
    }());
    exports.SampleIcons = SampleIcons;
});

define('pages/harness/docs/elements/tree',["require", "exports"], function (require, exports) {
    "use strict";
    var SampleTree = (function () {
        function SampleTree() {
        }
        return SampleTree;
    }());
    exports.SampleTree = SampleTree;
});

define('pages/harness/docs/layout/side-main',["require", "exports"], function (require, exports) {
    "use strict";
    var SampleLayoutSideMain = (function () {
        function SampleLayoutSideMain() {
        }
        return SampleLayoutSideMain;
    }());
    exports.SampleLayoutSideMain = SampleLayoutSideMain;
});

define('pages/harness/docs/table/table',["require", "exports"], function (require, exports) {
    "use strict";
    var SampleTable = (function () {
        function SampleTable() {
        }
        return SampleTable;
    }());
    exports.SampleTable = SampleTable;
});

define('pages/harness/docs/typography/typography',["require", "exports"], function (require, exports) {
    "use strict";
    var SampleTypography = (function () {
        function SampleTypography() {
        }
        return SampleTypography;
    }());
    exports.SampleTypography = SampleTypography;
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
define('text!pages/form-builder/builder.html', ['module'], function(module) { module.exports = "<template>\n  <style>\n    .item {\n      clear: both\n    }\n  </style>\n  <div sortable.bind=\"sortOptions\">\n    <div class=\"item\" repeat.for=\"f of form.pages[0].fields\">\n      <compose\n        model.bind=\"f.model\"\n        mode.bind=\"f.mode\"\n        view-model=\"../../modules/fields/${f.type}/${f.type}\"></compose>\n      <i class=\"remove-widget fa fa-trash-o col-md-1 non-printable\" click.trigger=\"$parent.removeWidget(f)\"></i>\n    </div>\n  </div>\n</template>\n"; });
define('text!pages/form-builder/conf.html', ['module'], function(module) { module.exports = "<template>\n    <div>\n        <ul class=\"nav navbar-nav\">\n            <li class=\"active\"><a href=\"#\">Element</a></li>\n            <li><a href=\"#\">Page</a></li>\n            <li><a href=\"#\">App</a></li>\n        </ul>\n    </div>\n</template>\n"; });
define('text!pages/form-builder/index.html', ['module'], function(module) { module.exports = "<template>\n    <style>\n        html, body {\n            height: 100%;\n        }\n        body {\n          padding-top: 50px;\n        }\n        .builder {\n            display: flex;\n            height: 100%;\n            border-top: 1px solid #252525;\n        }\n        .sidebar {\n            width: 200px;\n            background: #4b4b4b;\n            border-right: 1px solid #252525;\n        }\n        .canvas {\n            flex-grow: 1;\n        }\n        .configurator {\n            width: 200px;\n            background: #4b4b4b;\n            border-left: 1px solid #252525;\n        }\n    </style>\n    <div class=\"builder\">\n        <compose class=\"sidebar\" view-model=\"./toolbox\"></compose>\n        <compose class=\"canvas\" view-model=\"./builder\"></compose>\n        <compose class=\"configurator\" view-model=\"./conf\"></compose>\n    </div>\n</template>\n"; });
define('text!pages/form-builder/toolbox.html', ['module'], function(module) { module.exports = "<template>\n  <!--<button click.delegate=\"printReport()\" type=\"button\" class=\"btn btn-primary fa fa-print\"> Print</button>\n  <button click.delegate=\"clearReport()\" type=\"button\" class=\"btn btn-warning fa fa-remove\"> Clear Report</button>-->\n  <div class=\"panel panel-default\">\n    <div class=\"panel-heading\">\n      <h3 class=\"panel-title\">Tool Box</h3>\n    </div>\n    <div class=\"panel-body\">\n      <div sortable.bind=\"sortOptions\">\n        <div repeat.for=\"t of widgets\" \n          data-id=\"${t.type}\"\n          style=\"border:1px solid #ddd\">${t.title}</div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('text!pages/harness/index.html', ['module'], function(module) { module.exports = "<template>\n  <style>\n    html, body {\n      height: 100%;\n    }\n    body {\n      padding-top: 50px;\n    }\n    div.stage {\n      height: 100%;\n    }\n    div.stage > .lo-s-m > .side {\n      min-width: 200px;\n      background: #f2f2f2;\n      border-right: 1px solid #ccc;\n      overflow-y: auto;\n      z-index: 101;\n    }\n    div.stage > .lo-s-m > .main {\n      overflow-y: auto;\n      position: relative;\n    }\n    div.stage > .lo-s-m .mainstage {\n      padding: 40px 15px 15px;\n      margin: 0;\n      background: #fff;\n    }\n    /* side menu */\n    div.stage > .lo-s-m > .side .nav-list a {\n      cursor: pointer;\n    }\n    div.stage > .lo-s-m > .side .nav-list li {\n      border-top: 1px solid #fcfcfc;\n      border-bottom: 1px solid #e5e5e5;\n    }\n    div.stage > .lo-s-m > .side .nav-list li.active,\n    div.stage > .lo-s-m > .side .nav-list li ul {\n      background: #fff;\n    }\n    div.stage > .lo-s-m > .side .nav-list li ul {\n      border-top: 1px solid #e5e5e5;\n    }\n\n    /* breadcrumbs */\n    .breadcrumbs {\n      border-bottom: 1px solid #e5e5e5;\n      background-color: #f5f5f5;\n      min-height: 41px;\n      line-height: 40px;\n      padding: 0 15px;\n      display: block;\n      width: 100%;\n      position: fixed;\n      top: 50px;\n      left: 0;\n      padding: 0 15px 0 215px;\n      z-index: 100;\n    }\n    .page-header {\n      margin-top: 0;\n    }\n  </style>\n\n  <require from=\"./components/layout/side-main\"></require>\n  <require from=\"./components/navigator/navigator\"></require>\n  <require from=\"./components/breadcrumbs/breadcrumbs\"></require>\n\n  \n  <div class=\"stage\">\n    <layout-side-main containerless>\n      <div slot=\"side\">\n          <navigator \n            select.call=\"selectMenu(menu)\"\n            menus.bind=\"menus\"></navigator>\n      </div>\n\n      <div slot=\"main\">\n          <breadcrumbs router.bind=\"router\" if.bind=\"router.container.parent\">\n            sub content\n          </breadcrumbs>\n          <div class=\"mainstage\"><router-view></router-view></div>\n        </div>\n      </div>\n    </layout-side-main>\n  </div>\n</template>\n"; });
define('text!pages/projects/index.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"container\">Projects</div>\n</template>\n"; });
define('text!modules/fields/textbox/textbox.html', ['module'], function(module) { module.exports = "<template>\n  <div>\n    <label>\n      ${model.label}:\n      <input type=\"text\">\n    </label>\n  </div>\n</template>\n"; });
define('text!modules/fields/header/header.html', ['module'], function(module) { module.exports = "<template>\n  <div>\n    <div class=\"pull-right\">\n      Funnyroad 123<br />\n      1010 SOME-STATE<br />\n      USA<br />\n    </div>\n\n    <h2>Abstract-IT &trade;</h2>\n    <p>Delivering concrete solutions</p> \n  </div>\n</template>\n"; });
define('text!modules/fields/checkbox/checkbox.html', ['module'], function(module) { module.exports = ""; });
define('text!resources/elements/modal/modal-body.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"modal-body\">\n    <compose model.bind=\"contentModel\" view-model.bind=\"contentView\"></compose>\n    <slot></slot>\n  </div>\n</template>\n"; });
define('text!resources/elements/modal/modal-footer.html', ['module'], function(module) { module.exports = "<template>  \n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-default\" repeat.for=\"button of buttons\">${button}</button>\n  </div>\n</template>\n"; });
define('text!resources/elements/modal/modal-header.html', ['module'], function(module) { module.exports = "<template>  \n  <div class=\"modal-header\">\n    <button type=\"button\" class=\"close\" \n      data-dismiss=\"modal\" aria-label=\"Close\"\n      click.trigger=\"close()\"\n      if.bind=\"close\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n    <h4 class=\"modal-title\">${title}</h4>\n  </div>\n</template> \n"; });
define('text!resources/elements/modal/modal.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"modal fade\" role=\"dialog\" ref=\"modal\">\n    <div class=\"modal-dialog\">\n      <div class=\"modal-content\">\n        <slot name=\"modal-header\"></slot>\n        <slot name=\"modal-body\"></slot>\n        <slot name=\"modal-footer\"></slot>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('text!resources/elements/nav-bar/nav-bar.html', ['module'], function(module) { module.exports = "<template> \n  <nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n      <div class=\"navbar-header\">\n        <a class=\"navbar-brand\" href=\"#\">\n          <i class=\"fa fa-user\"></i>\n          <span>${router.title}</span>\n        </a>\n      </div>\n    </nav>\n\n    <nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n      <div class=\"navbar-header\">\n        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n          <span class=\"sr-only\">Toggle Navigation</span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n        </button>\n        <a class=\"navbar-brand\" href=\"#\">\n          <i class=\"fa fa-home\"></i>\n          <span>${router.title}</span>\n        </a>\n      </div>\n\n      <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n        <ul class=\"nav navbar-nav\">\n          <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\n            <a data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1.in\" href.bind=\"row.href\">${row.title}</a>\n          </li>\n        </ul>\n\n        <ul class=\"nav navbar-nav navbar-right\">\n          <li class=\"loader\" if.bind=\"router.isNavigating\">\n            <i class=\"fa fa-spinner fa-spin fa-2x\"></i>\n          </li>\n        </ul>\n      </div>\n    </nav>\n  </template>\n"; });
define('text!pages/harness/components/breadcrumbs/breadcrumbs.html', ['module'], function(module) { module.exports = "<template>\n  <style>\n    .breadcrumbs {\n      display: flex;\n    }\n    .breadcrumbs div:first-child {\n      flex-grow: 1;\n    }\n  </style>\n  \n  <div class=\"breadcrumbs\">\n    <div>Home > ${router.currentInstruction.config.route}</div>\n    <slot></slot>\n  </div>\n</template>\n"; });
define('text!pages/harness/components/layout/side-main.html', ['module'], function(module) { module.exports = "<template>\n  <style>\n    .lo-s-m {\n      display: flex;\n      height: 100%\n    }\n    .lo-s-m > .main {\n      flex-grow: 1;\n    }\n  </style>\n  <div class=\"lo-s-m\">\n    <div class=\"side\">\n      <slot name=\"side\"></slot>\n    </div>\n\n    <div class=\"main\">\n      <slot name=\"main\"></div>\n    </div>\n  </div>\n</template>\n"; });
define('text!pages/harness/components/navigator/navigator.html', ['module'], function(module) { module.exports = "<template>\n  <style>\n    .nav-list {\n      list-style: none;\n      margin: 0;\n      padding: 0;\n    }\n    .nav-list li {\n      display: block;\n      padding: 0;\n      margin: 0;\n      border: 0;\n      position: relative;\n    }\n    .nav-list a {\n      padding: 10px 15px;\n      display: block;\n    }\n    .nav-list li ul {\n      margin: 0;\n      padding: 0;\n      display: none;\n    }\n    .nav-list li.open ul {\n      display: block;\n    }\n    .nav-list li ul a {\n      padding-left: 2em;\n      text-decoration: none;\n    }\n  </style>\n  <ul class=\"nav nav-list\">\n    <li repeat.for=\"menu of menus\" class=\"${menu.active?'open':''}\">\n      <a click.trigger=\"select({menu: {current: menu}})\">${menu.title}</a>\n      <ul class=\"sub-menu\" if.bind=\"menu.widgets\">\n        <li repeat.for=\"submenu of menu.widgets\">\n          <a click.trigger=\"select({menu: {current: submenu, parent: menu}})\">${submenu.title}</a>\n        </li>\n      </ul>\n    </li>\n  </ul>\n</template>\n"; });
define('text!pages/harness/components/table/table.html', ['module'], function(module) { module.exports = "<template>\n  Table component\n</template>\n"; });
define('text!pages/harness/docs/breadcrumbs/breadcrumbs.html', ['module'], function(module) { module.exports = "<template>Breadcrumbs demo</template>\n"; });
define('text!pages/harness/docs/dashboard/dashboard.html', ['module'], function(module) { module.exports = "<template>\n  Dashboard Sample\n</template>\n"; });
define('text!pages/harness/docs/elements/buttons.html', ['module'], function(module) { module.exports = "<template>\n  Elements/buttons Sample\n</template>\n"; });
define('text!pages/harness/docs/elements/elements.html', ['module'], function(module) { module.exports = "<template>\n  Elements/elements Sample\n</template>\n"; });
define('text!pages/harness/docs/elements/icons.html', ['module'], function(module) { module.exports = "<template>\n  Elements/icons Sample\n</template>\n"; });
define('text!pages/harness/docs/elements/tree.html', ['module'], function(module) { module.exports = "<template>\n  Elements/tree Sample\n</template>\n"; });
define('text!pages/harness/docs/layout/side-main.html', ['module'], function(module) { module.exports = "<template>\nYour Template Here\n</template>\n"; });
define('text!pages/harness/docs/table/table.html', ['module'], function(module) { module.exports = "<template>\nTable Demo\n</template>\n"; });
define('text!pages/harness/docs/typography/typography.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"page-header\">\n    <h1>\n      Typography\n      <small>\n        <i class=\"icon-double-angle-right\"></i>\n        This is page-header (.page-header &gt; h1)\n      </small>\n    </h1>\n  </div><!-- /.page-header -->\n\n  <div class=\"row\">\n    <div class=\"col-xs-12\">\n      <!-- PAGE CONTENT BEGINS -->\n\n      <div class=\"row\">\n        <div class=\"col-sm-6\">\n          <h4>Headings & Paragraphs</h4>\n\n          <hr />\n          <h1>h1. Heading 1</h1>\n          <p class=\"lead\">\n            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.\n          </p>\n          <h2>h2. Heading 2</h2>\n          <p>\n            Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ullamcorper nulla non metus auctor fringilla. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec ullamcorper nulla non metus auctor fringilla.\n          </p>\n          <h3>h3. Heading 3</h3>\n          <p>\n            Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.\n          </p>\n          <h4>h4. Heading 4</h4>\n          <h5>h5. Heading 5</h5>\n          <h6>h6. Heading 6</h6>\n        </div><!-- /span -->\n\n        <div class=\"col-sm-6\">\n          <div class=\"widget-box\">\n            <div class=\"widget-header widget-header-flat\">\n              <h4>Lists</h4>\n            </div>\n\n            <div class=\"widget-body\">\n              <div class=\"widget-main\">\n                <div class=\"row\">\n                  <div class=\"col-sm-6\">\n                    <ul>\n                      <li>Unordered List Item</li>\n\n                      <li>\n                        <small>List Item in small tag</small>\n                      </li>\n\n                      <li>\n                        <b>List Item in bold tag</b>\n                      </li>\n\n                      <li>\n                        <i>List Item in italics tag</i>\n                      </li>\n\n                      <li>\n                        <ul class=\"list-unstyled\">\n                          <li>\n                            <i class=\"icon-caret-right blue\"></i>\n                            Nested List Item\n                          </li>\n\n                          <li>\n                            <i class=\"icon-caret-right blue\"></i>\n                            Nested List Item\n                          </li>\n\n                          <li>\n                            <i class=\"icon-caret-right blue\"></i>\n                            Nested List Item\n                          </li>\n                        </ul>\n                      </li>\n                      <li>Unordered List Item which is a longer item and may break into more lines.</li>\n\n                      <li>\n                        <strong>List Item in strong tag</strong>\n                      </li>\n\n                      <li>\n                        <em>List Item in emphasis tag</em>\n                      </li>\n                    </ul>\n                  </div>\n\n                  <div class=\"col-sm-6\">\n                    <ol>\n                      <li>Ordered List Item</li>\n                      <li class=\"text-primary\">.text-primary Ordered List Item</li>\n                      <li class=\"text-danger\">.text-danger Ordered List Item</li>\n\n                      <li class=\"text-success\">\n                        <b>.text-success</b>\n                        Ordered List Item\n                      </li>\n                      <li class=\"text-warning\">.text-warning Ordered List Item</li>\n                      <li class=\"text-muted\">.text-muted Ordered List Item</li>\n                    </ol>\n                  </div>\n                </div>\n\n                <hr />\n                <div class=\"row\">\n                  <div class=\"col-xs-12\">\n                    <ul class=\"list-unstyled spaced\">\n                      <li>\n                        <i class=\"icon-bell bigger-110 purple\"></i>\n                        List with custom icons and more space\n                      </li>\n\n                      <li>\n                        <i class=\"icon-ok bigger-110 green\"></i>\n                        Unordered List Item # 2\n                      </li>\n\n                      <li>\n                        <i class=\"icon-remove bigger-110 red\"></i>\n                        Unordered List Item # 3\n                      </li>\n                    </ul>\n\n                    <ul class=\"list-unstyled spaced2\">\n                      <li>\n                        <i class=\"icon-circle green\"></i>\n                        Even more space\n                      </li>\n\n                      <li class=\"text-warning bigger-110 orange\">\n                        <i class=\"icon-warning-sign\"></i>\n                        Unordered List Item # 5\n                      </li>\n\n                      <li class=\"muted\">\n                        <i class=\"icon-angle-right bigger-110\"></i>\n                        Unordered List Item # 6\n                      </li>\n\n                      <li>\n                        <ul class=\"list-inline\">\n                          <li>\n                            <i class=\"icon-share-alt green bigger-110\"></i>\n                            Inline List Item # 1\n                          </li>\n                          <li>List Item # 2</li>\n                          <li>List Item # 3</li>\n                        </ul>\n                      </li>\n                    </ul>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div><!-- /span -->\n      </div>\n\n      <hr />\n      <div class=\"row\">\n        <div class=\"col-sm-4\">\n          <div class=\"widget-box\">\n            <div class=\"widget-header widget-header-flat\">\n              <h4 class=\"smaller\">\n                <i class=\"icon-quote-left smaller-80\"></i>\n                BlockQuote & Address\n              </h4>\n            </div>\n\n            <div class=\"widget-body\">\n              <div class=\"widget-main\">\n                <div class=\"row\">\n                  <div class=\"col-xs-12\">\n                    <blockquote class=\"pull-right\">\n                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>\n\n                      <small>\n                        Someone famous\n                        <cite title=\"Source Title\">Source Title</cite>\n                      </small>\n                    </blockquote>\n                  </div>\n                </div>\n\n                <div class=\"row\">\n                  <div class=\"col-xs-12\">\n                    <blockquote>\n                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>\n\n                      <small>\n                        Someone famous\n                        <cite title=\"Source Title\">Source Title</cite>\n                      </small>\n                    </blockquote>\n                  </div>\n                </div>\n\n                <hr />\n                <address>\n                  <strong>Twitter, Inc.</strong>\n\n                  <br />\n                  795 Folsom Ave, Suite 600\n                  <br />\n                  San Francisco, CA 94107\n                  <br />\n                  <abbr title=\"Phone\">P:</abbr>\n                  (123) 456-7890\n                </address>\n\n                <address>\n                  <strong>Full Name</strong>\n\n                  <br />\n                  <a href=\"mailto:#\">first.last@example.com</a>\n                </address>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"col-sm-8\">\n          <div class=\"row\">\n            <div class=\"col-xs-12\">\n              <div class=\"widget-box\">\n                <div class=\"widget-header widget-header-flat\">\n                  <h4 class=\"smaller\">Definition List</h4>\n\n                  <div class=\"widget-toolbar\">\n                    <label>\n                      <small class=\"green\">\n                        <b>Horizontal</b>\n                      </small>\n\n                      <input id=\"id-check-horizontal\" type=\"checkbox\" class=\"ace ace-switch ace-switch-6\" />\n                      <span class=\"lbl\"></span>\n                    </label>\n                  </div>\n                </div>\n\n                <div class=\"widget-body\">\n                  <div class=\"widget-main\">\n                    <code class=\"pull-right\" id=\"dt-list-code\">&lt;dl&gt;</code>\n\n                    <dl id=\"dt-list-1\">\n                      <dt>Description lists</dt>\n                      <dd>A description list is perfect for defining terms.</dd>\n                      <dt>Euismod</dt>\n                      <dd>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>\n                      <dd>Donec id elit non mi porta gravida at eget metus.</dd>\n                      <dt>Malesuada porta</dt>\n                      <dd>Etiam porta sem malesuada magna mollis euismod.</dd>\n                      <dt>Felis euismod semper eget lacinia</dt>\n                      <dd>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</dd>\n                    </dl>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"space-6\"></div>\n\n          <div class=\"row\">\n            <div class=\"col-xs-12\">\n              <div class=\"widget-box\">\n                <div class=\"widget-header widget-header-flat\">\n                  <h4 class=\"smaller\">\n                    <i class=\"icon-code\"></i>\n                    Code view\n                  </h4>\n                </div>\n\n                <div class=\"widget-body\">\n                  <div class=\"widget-main\">\n                    <pre class=\"prettyprint linenums\">&lt;p class=\"muted\"&gt;Fusce dapibus, tellus ac cursus commodo.&lt;/p&gt;\n&lt;p class=\"text-warning\"&gt;Etiam porta sem malesuada.&lt;/p&gt;\n&lt;p class=\"text-error\"&gt;Donec ullamcorper nulla non metus auctor fringilla.&lt;/p&gt;\n&lt;p class=\"text-info\"&gt;Aenean eu leo quam.&lt;/p&gt;\n&lt;p class=\"text-success\"&gt;Duis mollis.&lt;/p&gt;</pre>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div><!-- PAGE CONTENT ENDS -->\n    </div><!-- /.col -->\n  </div><!-- /.row -->\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map