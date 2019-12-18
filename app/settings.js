/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([2,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "+688":
/***/ (function(module, exports) {

// Return given password srength as an object {percentage, label}
module.exports.getStrength = function (password) {
  if (!password && password !== '') {
    throw new Error('password parameter is missing');
  }

  if (!password.length) {
    return {
      percentage: 0,
      label: 'weak'
    };
  }

  var charsets = [// upper
  {
    regexp: /[A-Z]/g,
    size: 26
  }, // lower
  {
    regexp: /[a-z]/g,
    size: 26
  }, // digit
  {
    regexp: /[0-9]/g,
    size: 10
  }, // special
  {
    regexp: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g,
    size: 30
  }];
  var possibleChars = charsets.reduce(function (possibleChars, charset) {
    if (charset.regexp.test(password)) possibleChars += charset.size;
    return possibleChars;
  }, 0);
  var passwordStrength = Math.log(Math.pow(possibleChars, password.length)) / Math.log(2); // levels

  var _at33percent = 50;
  var _at66percent = 100;
  var _at100percent = 150;
  var strengthLabel = '';
  var strengthPercentage = 0; // between 0% and 33%

  if (passwordStrength <= _at33percent) {
    strengthPercentage = passwordStrength * 33 / _at33percent;
    strengthLabel = 'weak';
  } else if (passwordStrength > _at33percent && passwordStrength <= _at66percent) {
    // between 33% and 66%
    strengthPercentage = passwordStrength * 66 / _at66percent;
    strengthLabel = 'moderate';
  } else {
    // passwordStrength > 192
    strengthPercentage = passwordStrength * 100 / _at100percent;
    if (strengthPercentage > 100) strengthPercentage = 100;
    strengthLabel = 'strong';
  }

  return {
    percentage: strengthPercentage,
    label: strengthLabel
  };
};

/***/ }),

/***/ "/+tk":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "/Jse":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("J+JL");
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styles_view__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("eO8H");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("kyGY");
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("KXWi");
/* harmony import */ var cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("V2U0");
/* harmony import */ var components_DeleteAccount__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("PsWn");
/* harmony import */ var components_Input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("efN2");
/* harmony import */ var components_LanguageSection__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("JAnA");
/* harmony import */ var components_2FA__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("0HVM");
/* harmony import */ var components_export_ExportSection__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("zmIX");
/* harmony import */ var components_TrackingSection__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("lCjD");
/* harmony import */ var actions_twoFactor__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("jYLR");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

















var ProfileView =
/*#__PURE__*/
function (_Component) {
  _inherits(ProfileView, _Component);

  function ProfileView() {
    _classCallCheck(this, ProfileView);

    return _possibleConstructorReturn(this, _getPrototypeOf(ProfileView).apply(this, arguments));
  }

  _createClass(ProfileView, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.props.fetchInfos();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          t = _this$props.t,
          match = _this$props.match,
          fields = _this$props.fields,
          isFetching = _this$props.isFetching,
          onFieldChange = _this$props.onFieldChange,
          instance = _this$props.instance,
          updateInfo = _this$props.updateInfo,
          exportData = _this$props.exportData,
          _fetchExportData = _this$props.fetchExportData,
          requestExport = _this$props.requestExport,
          twoFactor = _this$props.twoFactor,
          checkTwoFactorCode = _this$props.checkTwoFactorCode,
          activate2FA = _this$props.activate2FA,
          desactivate2FA = _this$props.desactivate2FA,
          cancel2FAActivation = _this$props.cancel2FAActivation;
      var exportId = null;

      if (match && match.params) {
        exportId = match.params.exportId;
      }

      var isTwoFactorEnabled = fields.auth_mode && fields.auth_mode.value === actions_twoFactor__WEBPACK_IMPORTED_MODULE_14__["AUTH_MODE"].TWO_FA_MAIL;
      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        role: "contentinfo"
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(styles_view__WEBPACK_IMPORTED_MODULE_0___default.a['set-view-content'], styles_view__WEBPACK_IMPORTED_MODULE_0___default.a['set-view-content--narrow'])
      }, isFetching && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_7__["default"], {
        className: 'u-pos-fixed-s',
        middle: true,
        size: "xxlarge",
        loadingType: t('Loading.loading')
      }), !isFetching && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h2", {
        className: styles_view__WEBPACK_IMPORTED_MODULE_0___default.a['set-view-title']
      }, t('ProfileView.title')), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Input__WEBPACK_IMPORTED_MODULE_9__["default"], _extends({
        name: "email",
        type: "email",
        title: t('ProfileView.email.title'),
        label: t('ProfileView.email.label')
      }, fields.email, {
        onBlur: onFieldChange
      })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Input__WEBPACK_IMPORTED_MODULE_9__["default"], _extends({
        name: "public_name",
        type: "text",
        title: t('ProfileView.public_name.title'),
        label: t("ProfileView.public_name.label")
      }, fields.public_name, {
        onBlur: onFieldChange
      })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h3", null, t('ProfileView.password.title')), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_5__["Text"], {
        tag: "p",
        className: "u-black"
      }, "Votre cozy est actuellement prot\xE9g\xE9 par un mot de passe."), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_6__["default"], {
        tag: react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"],
        to: "/profile/password",
        label: "Modifier le mot de passe",
        theme: "secondary",
        className: "u-mh-0"
      }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_2FA__WEBPACK_IMPORTED_MODULE_11__["default"], {
        isTwoFactorEnabled: isTwoFactorEnabled,
        instance: instance,
        checkTwoFactorCode: checkTwoFactorCode,
        twoFactor: twoFactor,
        activate2FA: activate2FA,
        desactivate2FA: desactivate2FA,
        cancel2FAActivation: cancel2FAActivation,
        updateInfo: updateInfo
      }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_LanguageSection__WEBPACK_IMPORTED_MODULE_10__["default"], {
        fields: fields,
        onChange: onFieldChange
      }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_TrackingSection__WEBPACK_IMPORTED_MODULE_13__["default"], {
        instance: instance,
        fields: fields,
        onChange: onFieldChange
      }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_export_ExportSection__WEBPACK_IMPORTED_MODULE_12__["default"], {
        email: fields.email && fields.email.value,
        exportData: exportData,
        exportId: exportId,
        requestExport: requestExport,
        fetchExportData: function fetchExportData() {
          return _fetchExportData(exportId);
        },
        parent: '/profile'
      }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: styles_view__WEBPACK_IMPORTED_MODULE_0___default.a['set-delete-account']
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_DeleteAccount__WEBPACK_IMPORTED_MODULE_8__["default"], null)))));
    }
  }]);

  return ProfileView;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_4__["translate"])()(ProfileView));

/***/ }),

/***/ "/KVF":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./ar": "rwi/",
	"./ar.json": "rwi/",
	"./ca": "pOQv",
	"./ca.json": "pOQv",
	"./cs": "xoYS",
	"./cs.json": "xoYS",
	"./cs_CZ": "fKxt",
	"./cs_CZ.json": "fKxt",
	"./da": "IarV",
	"./da.json": "IarV",
	"./de": "bOJm",
	"./de.json": "bOJm",
	"./de_DE": "eeWi",
	"./de_DE.json": "eeWi",
	"./el": "8YQ7",
	"./el.json": "8YQ7",
	"./en": "7dT6",
	"./en.json": "7dT6",
	"./eo": "JhSQ",
	"./eo.json": "JhSQ",
	"./es": "oway",
	"./es.json": "oway",
	"./es_CO": "K3H9",
	"./es_CO.json": "K3H9",
	"./es_ES": "kVId",
	"./es_ES.json": "kVId",
	"./fr": "9pOX",
	"./fr.json": "9pOX",
	"./it": "CCUm",
	"./it.json": "CCUm",
	"./ja": "BCMW",
	"./ja.json": "BCMW",
	"./ko": "3RGN",
	"./ko.json": "3RGN",
	"./nl": "piUo",
	"./nl.json": "piUo",
	"./nl_NL": "2d4v",
	"./nl_NL.json": "2d4v",
	"./pl": "ibJU",
	"./pl.json": "ibJU",
	"./pt": "XWeM",
	"./pt.json": "XWeM",
	"./pt_BR": "DDHO",
	"./pt_BR.json": "DDHO",
	"./ro": "lUKR",
	"./ro.json": "lUKR",
	"./ro_RO": "DFSm",
	"./ro_RO.json": "DFSm",
	"./ru": "dwRe",
	"./ru.json": "dwRe",
	"./ru_RU": "xHNF",
	"./ru_RU.json": "xHNF",
	"./sk": "Pana",
	"./sk.json": "Pana",
	"./sk_SK": "Dah1",
	"./sk_SK.json": "Dah1",
	"./sq": "614y",
	"./sq.json": "614y",
	"./sq_AL": "mra9",
	"./sq_AL.json": "mra9",
	"./sv": "TFsx",
	"./sv.json": "TFsx",
	"./tr": "/+tk",
	"./tr.json": "/+tk",
	"./uk_UA": "MSm8",
	"./uk_UA.json": "MSm8",
	"./zh": "NQRv",
	"./zh.json": "NQRv",
	"./zh_CN": "dSv/",
	"./zh_CN.json": "dSv/",
	"./zh_TW": "Fk5t",
	"./zh_TW.json": "Fk5t"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "/KVF";

/***/ }),

/***/ "/kYV":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"u-shake":"u-shake--R7aZx","shake":"shake--ZcmO4","u-o-100":"u-o-100--mPHO6","u-o-90":"u-o-90--2kd9N","u-o-80":"u-o-80--tJtcx","u-o-70":"u-o-70--1J1Xb","u-o-60":"u-o-60--1PJea","u-o-50":"u-o-50--Es7HO","u-o-40":"u-o-40--1jR-E","u-o-30":"u-o-30--2NXXP","u-o-20":"u-o-20--cVH7R","u-o-10":"u-o-10--3tZZw","u-o-05":"u-o-05--1Rdg-","u-o-025":"u-o-025--SAP0E","u-o-0":"u-o-0--3WE75","set-markdown-link":"set-markdown-link--3DAUI","spin":"spin--2iFLV"};

/***/ }),

/***/ "0HVM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("buk/");
/* harmony import */ var components_Input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("efN2");
/* harmony import */ var components_2FA_Activate2FA__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("qVAH");
/* harmony import */ var components_2FA_Desactivate2FA__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("TN2E");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var twoFaModalBanner = __webpack_require__("U/On");

var twoFaModalProtect = __webpack_require__("WYRb");

var twoFaModalSecu = __webpack_require__("YkMg");

var TwoFA =
/*#__PURE__*/
function (_Component) {
  _inherits(TwoFA, _Component);

  function TwoFA(props) {
    var _this;

    _classCallCheck(this, TwoFA);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TwoFA).call(this, props));
    _this.state = {
      twoFAActivationModalIsOpen: false,
      twoFADesactivationModalIsOpen: false,
      twoFAPassphraseModalIsOpen: false,
      mailConfirmationCodeIsValid: false
    }; // binding

    _this.activate2FA = _this.activate2FA.bind(_assertThisInitialized(_this));
    _this.desactivate2FA = _this.desactivate2FA.bind(_assertThisInitialized(_this));
    _this.openTwoFAActivationModal = _this.openTwoFAActivationModal.bind(_assertThisInitialized(_this));
    _this.closeTwoFAActivationModal = _this.closeTwoFAActivationModal.bind(_assertThisInitialized(_this));
    _this.openTwoFADesactivationModal = _this.openTwoFADesactivationModal.bind(_assertThisInitialized(_this));
    _this.closeTwoFADesactivationModal = _this.closeTwoFADesactivationModal.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TwoFA, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      !this.props.isTwoFactorEnabled && nextProps.isTwoFactorEnabled && this.setState({
        mailConfirmationCodeIsValid: true
      });
    }
  }, {
    key: "activate2FA",
    value: function activate2FA() {
      // TODO: Open the password modal
      this.props.activate2FA();
    }
  }, {
    key: "desactivate2FA",
    value: function desactivate2FA() {
      this.props.desactivate2FA();
      this.setState({
        mailConfirmationCodeIsValid: false
      });
      this.closeTwoFADesactivationModal();
    }
  }, {
    key: "openTwoFAActivationModal",
    value: function openTwoFAActivationModal() {
      this.setState({
        twoFAActivationModalIsOpen: true
      });
    }
  }, {
    key: "closeTwoFAActivationModal",
    value: function closeTwoFAActivationModal() {
      this.props.cancel2FAActivation();
      this.setState({
        twoFAActivationModalIsOpen: false
      });
    }
  }, {
    key: "openTwoFADesactivationModal",
    value: function openTwoFADesactivationModal() {
      this.setState({
        twoFADesactivationModalIsOpen: true
      });
    }
  }, {
    key: "closeTwoFADesactivationModal",
    value: function closeTwoFADesactivationModal() {
      this.setState({
        twoFADesactivationModalIsOpen: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          t = _this$props.t,
          isTwoFactorEnabled = _this$props.isTwoFactorEnabled,
          instance = _this$props.instance,
          checkTwoFactorCode = _this$props.checkTwoFactorCode,
          twoFactor = _this$props.twoFactor;
      var _this$state = this.state,
          twoFAActivationModalIsOpen = _this$state.twoFAActivationModalIsOpen,
          twoFADesactivationModalIsOpen = _this$state.twoFADesactivationModalIsOpen,
          mailConfirmationCodeIsValid = _this$state.mailConfirmationCodeIsValid;
      var root = document.querySelector('[role=application]');
      var data = root.dataset;
      var cozyDomain = data.cozyDomain;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Input__WEBPACK_IMPORTED_MODULE_2__["default"], {
        name: "two_fa",
        type: "checkbox",
        title: t('ProfileView.twofa.title.activate'),
        label: t('ProfileView.twofa.label', {
          link: 'https://support.cozy.io/article/114-doubleauthentification'
        }),
        value: isTwoFactorEnabled,
        onChange: isTwoFactorEnabled ? this.openTwoFADesactivationModal : this.openTwoFAActivationModal
      }), twoFAActivationModalIsOpen && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_2FA_Activate2FA__WEBPACK_IMPORTED_MODULE_3__["default"], {
        activate2FA: function activate2FA() {
          return _this2.activate2FA();
        },
        checkTwoFactorCode: checkTwoFactorCode,
        mailConfirmationCodeIsValid: mailConfirmationCodeIsValid,
        closeTwoFAActivationModal: function closeTwoFAActivationModal() {
          return _this2.closeTwoFAActivationModal();
        },
        instance: instance,
        cozyDomain: cozyDomain,
        isTwoFactorEnabled: isTwoFactorEnabled,
        twoFactor: twoFactor,
        images: {
          twoFaModalBanner: twoFaModalBanner,
          twoFaModalSecu: twoFaModalSecu,
          twoFaModalProtect: twoFaModalProtect
        }
      }), twoFADesactivationModalIsOpen && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_2FA_Desactivate2FA__WEBPACK_IMPORTED_MODULE_4__["default"], {
        desactivate2FA: function desactivate2FA() {
          return _this2.desactivate2FA();
        },
        twoFactor: twoFactor,
        closeTwoFADesactivationModal: function closeTwoFADesactivationModal() {
          return _this2.closeTwoFADesactivationModal();
        }
      }));
    }
  }]);

  return TwoFA;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__["translate"])()(TwoFA));

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("201c");
__webpack_require__("7NIr");
module.exports = __webpack_require__("LiWt");


/***/ }),

/***/ "2ahd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styles_table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("F+se");
/* harmony import */ var styles_table__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styles_table__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("J+JL");
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styles_view__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("V2U0");
/* harmony import */ var components_SessionsViewRow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("phCq");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("KXWi");
/* harmony import */ var cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("7YkG");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










var SessionsView =
/*#__PURE__*/
function (_Component) {
  _inherits(SessionsView, _Component);

  function SessionsView() {
    _classCallCheck(this, SessionsView);

    return _possibleConstructorReturn(this, _getPrototypeOf(SessionsView).apply(this, arguments));
  }

  _createClass(SessionsView, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.props.fetchSessions();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          t = _this$props.t,
          f = _this$props.f,
          isFetching = _this$props.isFetching,
          sessions = _this$props.sessions,
          deleteOtherSessions = _this$props.deleteOtherSessions;
      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        role: "contentinfo"
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h2", {
        className: styles_view__WEBPACK_IMPORTED_MODULE_1___default.a['set-view-title']
      }, t('SessionsView.title')), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
        className: styles_view__WEBPACK_IMPORTED_MODULE_1___default.a['set-view-title']
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_6__["Button"], {
        theme: "danger",
        onClick: function onClick() {
          return deleteOtherSessions();
        },
        label: t('SessionsView.delete')
      })), isFetching && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_3__["default"], {
        className: 'u-pos-fixed-s',
        middle: true,
        size: "xxlarge",
        loadingType: t('Loading.loading')
      }), !isFetching && sessions && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_7__["Table"], {
        className: styles_table__WEBPACK_IMPORTED_MODULE_0___default.a['coz-table']
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_7__["TableHead"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_7__["TableRow"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_7__["TableHeader"], {
        className: styles_table__WEBPACK_IMPORTED_MODULE_0___default.a['set-table-date']
      }, "Date"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_7__["TableHeader"], {
        className: styles_table__WEBPACK_IMPORTED_MODULE_0___default.a['set-table-os']
      }, "OS"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_7__["TableHeader"], {
        className: styles_table__WEBPACK_IMPORTED_MODULE_0___default.a['set-table-browser']
      }, "Browser"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_7__["TableHeader"], {
        className: styles_table__WEBPACK_IMPORTED_MODULE_0___default.a['set-table-ip']
      }, "IP"))), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_7__["TableBody"], {
        className: styles_table__WEBPACK_IMPORTED_MODULE_0___default.a['set-table-sessions']
      }, sessions.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.created_at) - new Date(a.created_at);
      }).map(function (session, index) {
        return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_SessionsViewRow__WEBPACK_IMPORTED_MODULE_4__["default"], {
          session: session,
          t: t,
          f: f,
          key: index
        });
      }))));
    }
  }]);

  return SessionsView;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_5__["translate"])()(SessionsView));

/***/ }),

/***/ "2c5B":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormModal", function() { return FormModal; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("buk/");
/* harmony import */ var styles_deleteAccountFormModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("8BRP");
/* harmony import */ var styles_deleteAccountFormModal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styles_deleteAccountFormModal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var actions_email__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("rttf");
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("KXWi");
/* harmony import */ var cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("cLsY");
/* harmony import */ var actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("9At1");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var DONE = 'done';
var ERRORED = 'errored';
var IDLE = 'idle';
var SENDING = 'sending';
var REASON_MAXLENGTH = 500;
var FormModal =
/*#__PURE__*/
function (_Component) {
  _inherits(FormModal, _Component);

  function FormModal() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FormModal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FormModal)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      status: IDLE
    });

    _defineProperty(_assertThisInitialized(_this), "setStatus", function (status) {
      return _this.setState({
        status: status
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSuccess", function () {
      var onSuccess = _this.props.onSuccess;

      _this.setStatus(DONE);

      onSuccess && onSuccess();
    });

    _defineProperty(_assertThisInitialized(_this), "onError", function (error) {
      var onError = _this.props.onError;

      _this.setStatus(ERRORED);

      onError && onError(error);
    });

    _defineProperty(_assertThisInitialized(_this), "onSend",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(event) {
        var t, domain, reason;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                event.preventDefault();
                t = _this.props.t;
                domain = actions__WEBPACK_IMPORTED_MODULE_7__["STACK_DOMAIN"].replace('//', '');
                reason = _this.reasonElement.value;

                _this.setStatus(SENDING);

                _context.prev = 5;
                _context.next = 8;
                return Object(actions_email__WEBPACK_IMPORTED_MODULE_4__["sendDeleteAccountRequest"])(t('DeleteAccount.request.mail.subject', {
                  domain: domain
                }), reason.substring(0, REASON_MAXLENGTH));

              case 8:
                return _context.abrupt("return", _this.onSuccess());

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](5);
                return _context.abrupt("return", _this.onError(_context.t0));

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[5, 11]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var _this$props = _this.props,
          dismissAction = _this$props.dismissAction,
          t = _this$props.t;
      var status = _this.state.status;
      var isSending = status === SENDING;
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_6__["default"], {
        closable: true,
        dismissAction: dismissAction,
        mobileFullScreen: true,
        size: "small"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_6__["ModalHeader"], null, t('DeleteAccount.modal.form.title')), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", {
        onSubmit: _this.onSend
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_6__["ModalContent"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", null, t('DeleteAccount.modal.form.reason.label')), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: styles_deleteAccountFormModal__WEBPACK_IMPORTED_MODULE_3___default.a['coz-textarea-wrapper']
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("textarea", {
        "aria-busy": isSending,
        maxength: REASON_MAXLENGTH,
        readOnly: isSending,
        ref: function ref(element) {
          _this.reasonElement = element;
        }
      }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_6__["ModalFooter"], {
        className: styles_deleteAccountFormModal__WEBPACK_IMPORTED_MODULE_3___default.a['set-delete-account-form-controls']
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_5__["default"], {
        disabled: isSending,
        label: t('DeleteAccount.modal.form.button.cancel.label'),
        onClick: dismissAction,
        theme: "secondary",
        type: "button"
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_5__["default"], {
        busy: isSending,
        disabled: isSending,
        label: t('DeleteAccount.modal.form.button.submit.label'),
        theme: "danger",
        type: "submit"
      }))));
    });

    return _this;
  }

  return FormModal;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__["translate"])()(FormModal));

/***/ }),

/***/ "2d4v":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Instellingen"},"DeleteAccount":{"title":"Account verwijderen","label":"Je kunt je Cozy op elk gewenst moment verwijderen. Maar wees voorzichtig, want als je account verwijdert, worden al je gegevens ook verwijderd en dit is onomkeerbaar!","button":{"label":"Mijn account verwijderen"},"error":{"message":"Er is een fout opgetreden tijdens het verwijderingsverzoek. Probeer het opnieuw of neem contact op met onze ondersteuning."},"modal":{"confirm":{"title":"Wil je je Cozy verwijderen?","description":{"line":{"1":"Je Cozy zal worden verwijderd.","2":"Hierdoor heb je geen toegang meer tot je Cozy.","3":"Al je gegevens worden verwijderd."}},"button":{"cancel":{"label":"Annuleren"},"submit":{"label":"Verwijderen"}}},"form":{"title":"Verwijderingsverzoek voor je Cozy","reason":{"label":"Waarom wil je je Cozy verwijderen (optioneel)?"},"button":{"cancel":{"label":"Annuleren"},"submit":{"label":"Versturen"}}}},"request":{"mail":{"subject":"Verwijderingsverzoek voor %{domain}"}},"success":{"message":"Je verwijderingsverzoek is verstuurd."}},"Nav":{"profile":"Profiel","activated_services":"Ingeschakelde diensten","connected_devices":"Verbonden diensten","sessions":"Verbindingen","storage":"Opslag","email_notifications":"E-mailmeldingen"},"Loading":{"loading":"Bezig met laden"},"Empty":{"devices":{"title":"Je hebt geen apparaten verbonden.","text":"Door het installeren van de verschillende clients, heb je toegang tot je bestanden op alle schermen tegelijkertijd. Cozy is altijd binnen handbereik, zelfs als je onderweg bent!","link":{"href":"https://cozy.io/en/download/","text":"Download één van onze apps"}}},"ProfileView":{"instance":{"server_error":"Er is een fout opgetreden op de server. Herlaad de pagina."},"title":"Profiel","password":{"title":"Wachtwoord","show":"Tonen","hide":"Verbergen","server_error":"Er is een fout opgetreden; je wachtwoord is niet opgeslagen.","password_too_weak":"Je wachtwoord is te zwak. Je moet een hoofdletter, getal of speciaal teken toevoegen of een langer wachtwoord kiezen.","wrong_password":"Je huidige wachtwoord is onjuist.","wrong_two_fa_code":"De opgegeven tweestapscode is onjuist.","success":"Je wachtwoord is gewijzigd.","reset_link":"Ben je je huidige wachtwoord vergeten?","submit_label":"Wachtwoord wijzigen","reload":"Je wachtwoord is gewijzigd. De pagina wordt herladen zodat de wijziging kan worden toegepast."},"current_password":{"label":"Voer je huidige wachtwoord in","placeholder":"Huidige wachtwoord"},"new_password":{"label":"Voer je nieuwe wachtwoord in","placeholder":"Nieuwe wachtwoord"},"infos":{"success":"Je gegevens zijn gewijzigd.","server_error":"Er is een fout opgetreden; je gegevens zijn niet opgeslagen.","empty":"Dit veld mag niet leeg worden gelaten"},"email":{"title":"E-mailadres","label":"Cozy heeft je e-mailadres nodig zodat je meldingen kunt ontvangen en je je wachtwoord kunt herstellen.","error":"Dit e-mailadres lijkt onjuist. Weet je zeker dat je het goed geschreven hebt (bijv. jan@jansen.nl)?"},"twofa":{"title":{"activate":"Authenticatie in twee stappen","desactivate":"Authenticatie in twee stappen uitschakelen","validation":"Verificatie van authenticatie in twee stappen"},"passphrase":{"title":"Authenticatie in twee stappen","description":"Cozy heeft een verificatiecode van 6 getallen verstuurd naar %{email}.<br/>Voer die code hier in om je wachtwoord te wijzigen:"},"label":"Twee stappen zijn beter dan één: daarom kun je de veiligheid verbeteren met een extra stap.<br/>[Bekijk onze hulppagina →](%{link})","modal":{"code":"code","protect":"Bescherm je Cozy met authenticatie in twee stappen","change":"**Wat verandert er?** Elke keer als je verbindt met je Cozy, dan heb je je wachtwoord nodig en een verificatiecode.<br/>[Bekijk onze hulppagina →](%{link})","secu_title":"Voeg een extra beveiligingsniveau toe","secu_description":"Een wachtwoord is goed, maar als het niet \"complex\" genoeg is, dan kan een dief dit gemakkelijk raden. Ontvang per mail een verificatiecode om de veiligheid van je Cozy te waarborgen.","protect_title":"Verbeter de beveiliging van je gegevens","protect_description":"Zelfs als een dief je wachtwoord raadt, dan blijf jij de enige die kan verbinden met je Cozy.","desactivate_title":"Weet je zeker dat je deze optie wilt uitschakelen?","desactivate_description":"Door het klikken op de knop \"Uitschakelen\", zal je wachtwoord de enige toegang zijn tot je Cozy. Je verwijdert een beveiligingsniveau.","confirmation_title":"Verificatiecode-bevestiging","confirmation_description":"Cozy heeft een verificatiecode van 6 getallen verstuurd naar %{email}.<br/>Voer die code hier in om de authenticatie in te schakelen:","nocode":"Heb je geen code ontvangen?","nocode_claude":"Neem dan contact op met Claude via","validation_title":"Gefeliciteerd! Je e-mailadres is bevestigd.","validation_description":"Je Cozy wordt nu beveiligd door authenticatie in twee stappen.","validation_logs":"Inloggegevens onthouden:","email":"Je moet een geldig e-mailadres opgeven.","button":{"activate":"Authenticatie activeren","cancel":"annuleren","desactivate":"uitschakelen","validate":"verifiëren","terminate":"afbreken"}}},"public_name":{"title":"Gebruikersnaam","label":"Je gebruikersnaam wordt getoond als je bestanden deelt met Cozy-gebruikers."},"tracking":{"title":"Help mee ons product te verbeteren","label":"Geef Cozy Cloud toestemming om anonieme gebruiksgegevens te verzamelen voor het verbeteren van ons product.<br/>[Lees meer over Cozy's privacywaarborg](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"Mijn gegevens","label":"Cozy zorgt ervoor dat alle opgeslagen gegevens met je worden gedeeld:","link":"Mijn gegevens downloaden","server_error":"Er is een fout opgetreden. Probeer het opnieuw of neem contact met ons op.","fetch_error":"Er is een fout opgetreden tijdens het opvragen van je gegevens. Probeer het opnieuw of neem contact met ons op.","missing_error":"Het archief ontbreekt of is verouderd. Probeer het opnieuw of neem contact met ons op.","success":"Je verzoek is verstuurd!","modal":{"title":"Geef me mijn gegevens terug","description":"Cozy is bezig al je opgeslagen gegevens te verzamelen en dit om te zetten naar een downloadbaar archief.<br/><br/>De downloadlink zal worden verstuurd naar het e-mailadres '__%{email}__' zodra het archief beschikbaar is.","cancel":"Annuleren","CTA":"Geef me mijn gegevens"},"download":{"title":"Download mijn gegevens","description":"Hier zijn alle gegevensarchieven, beschikbaar in je Cozy:","CTA":"Archief downloaden","CTA_part":"(part %{number}) downloaden"}},"locale":{"title":"Taal","label":"Dit is de taal die zal worden gebruikt in je Cozy.","contrib":"Wil je meehelpen Cozy te vertalen? [Kijk dan op https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937 hoe je een handje kunt helpen.]","fr":"Frans","en":"Engels","es":"Spaans","ja":"Japans","nl":"Nederlands","de":"Duits","ru":"Russisch","nl_NL":"Nederlands (Nederland)","ko":"Koreaans","pl":"Pools","pt":"Portugees","da":"Deens","ro_RO":"Roemeens (Roemenië)","pt_BR":"Portugees (Brazilië)","zh_CN":"Chinees (China)","ar":"Arabisch","it":"Italiaans","ro":"Roemeens","eo":"Esperanto","de_DE":"Duits (Duitsland)","sq":"Albanees","tr":"Turks","uk_UA":"Oekraïens (Oekraïne)","ru_RU":"Russisch (Rusland)","sq_AL":"Albanees (Albanië)","ca":"Catalaans","ca_ES":"Catalaans (Spanje)","zh":"Chinees","zh_TW":"Chinees (Taiwan)","cs":"Tsjechisch","cs_CZ":"Tsjechisch (Tsjechië)","el":"Grieks","id":"Indonesisch","it_IT":"Italiaans (Italië)","sk":"Slowaaks","sk_SK":"Slowaaks (Slowakije)","es_CO":"Spaans (Colombia)","es_ES":"Spaans (Spanje)","sv":"Zweeds"}},"DevicesView":{"title":"Verbonden apparaten","load_error":"Er is een fout opgetreden tijdens het laden van je apparaten. Probeer het later opnieuw.","head_name":"Naam","head_sync":"Laatste synchronisatie","head_activity":"Laatste activiteit","head_permissions":"Machtigingen","head_actions":"Acties","revoke":"intrekken","sync_date_format":"D MMM YYYY"},"StorageView":{"title":"Opslag","load_error":"Er is een fout opgetreden tijdens het laden van je opslaginformatie. Probeer het later opnieuw.","storage_title":"Totale ruimte","storage_phrase":"%{diskUsage} GB van %{diskQuota} GB gebruikt","more_space":"Meer opslagruimte nodig?","see_offer":"Mijn opslag uitbreiden"},"SessionsView":{"title":"Verbindingsgeschiedenis","sync_date_format":"D MMM YYYY","delete":"Alle andere sessie verwijderen","infos":{"server_error":"Er is een fout opgetreden op de server. Herlaad de pagina.","sessions_deleted":"Alle andere sessies zijn verwijderd."}},"revokeDevice":{"title":"Dit apparaat intrekken","description":"Je staat op het punt om **%{name}** te ontkoppelen.","subText":"De synchronisatie met dit apparaat zal direct stoppen.","validate":"Apparaat ontkoppelen","error":"Het ontkoppelen is mislukt; probeer het later opnieuw."},"ServicesView":{"title":"Ingeschakelde diensten","load_error":"Er is een fout opgetreden tijdens het laden van je diensten. Probeer het later opnieuw.","head_services":"Diensten","head_account":"Account","head_sync":"Laatste synchronisatie","head_status":"Status","unsync":"Niet-gesynchroniseerd","konnector_link":"Klik hier voor de volledige lijst met diensten"},"soon":{"title":"Binnenkort","description":"Deze functie is nog niet beschikbaar. Neem, voor meer informatie, contact met ons op: contact@cozycloud.cc"},"support":{"title":"Hallo! Kunnen we je helpen?","emailDetail":"Je bericht wordt verstuurd middels het e-mailadres dat je hebt opgegeven in je Cozy-instellingen.","fields":{"message":{"title":"Je verzoek","placeholder":"Vertel ons iets (vraag om hulp, deel feedback of zeg gewoon 'hallo'). We staan klaar om met je te praten."}},"response_email":{"subject":"Je verzoek is ontvangen.","body":"Hallo,\n\nwe hebben je ondersteuningsverzoek ontvangen:\n%{message}\n\nWe doen ons best om dit zo snel mogelijk te beantwoorden.\n\nClaude van Cozy."},"button":"Gaan met die banaan!","sending":"Bezig met versturen...","success":"👏 Je bericht is verstuurd. Dank je!","error":"Er is een fout opgetreden tijdens het versturen van je bericht."},"claudy":{"title":"Hoe ga ik met Cozy om?","actions":{"desktop":{"title":"Verkrijg toegang tot alle bestanden op je computer","description":"Synchroniseer alle Cozy Drive-bestanden naar je computer","button":"Installeer Cozy Drive op je computer","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back-up en synchroniseer de afbeeldingen op je telefoon","description":"Al je herinneringen zijn veilig op Cozy Drive","button":"Installeer de Cozy Drive-app op je telefoon","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Krijg je rekeningen direct terug","description":"Cozy Collect - organiseer al je bestanden direct","button":"Ontdek Cozy Collect"},"support":{"title":"Neem contact met ons op","description":"Hallo! Kunnen we je helpen?","emailDetail":"Je bericht wordt verstuurd middels het e-mailadres dat je hebt opgegeven in je Cozy-instellingen.","fields":{"message":{"title":"Je verzoek","placeholder":"Vertel ons iets (vraag om hulp, deel feedback of zeg gewoon 'hallo'). We staan klaar om met je te praten."}},"button":"Gaan met die banaan!","sending":"Bezig met versturen...","success":"👏 Je bericht is verstuurd. Dank je!","error":"Er is een fout opgetreden tijdens het versturen van je bericht."}}},"errors":{"noEmailFound":"Er is geen e-mailadres aangetroffen. Voeg er één toe in je Cozy-instellingen en probeer het opnieuw."}};

/***/ }),

/***/ "3RGN":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "4DAK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("IujW");
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_markdown__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styles_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("/kYV");
/* harmony import */ var styles_index__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styles_index__WEBPACK_IMPORTED_MODULE_2__);




var LinkRenderer = function LinkRenderer(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: props.href,
    target: "_blank",
    rel: "noopener noreferrer",
    className: styles_index__WEBPACK_IMPORTED_MODULE_2___default.a['set-markdown-link']
  }, props.children);
};

var reactMarkdownRendererOptions = {
  link: LinkRenderer,
  linkReference: LinkRenderer
};

var ReactMarkdownWrapper = function ReactMarkdownWrapper(_ref) {
  var source = _ref.source;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_markdown__WEBPACK_IMPORTED_MODULE_1___default.a, {
    source: source,
    renderers: reactMarkdownRendererOptions,
    escapeHtml: false
  });
};

/* harmony default export */ __webpack_exports__["default"] = (ReactMarkdownWrapper);

/***/ }),

/***/ "5hMn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4BeY");
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("IaFt");
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-people_c70f73aaca22c36af7e1f888cdaa6946",
  "use": "icon-people_c70f73aaca22c36af7e1f888cdaa6946-usage",
  "viewBox": "0 0 16 16",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" id=\"icon-people_c70f73aaca22c36af7e1f888cdaa6946\">\n  <path fill-rule=\"evenodd\" d=\"M136,73 C138.209139,73 140,70.9852814 140,68.5 C140,66.0147186 138.209139,64 136,64 C133.790861,64 132,66.0147186 132,68.5 C132,70.9852814 133.790861,73 136,73 Z M128,78 C128,77 130,74 132,74 C134,74 133,75 136,75 C139,75 138,74 140,74 C142,74 144,77 144,78 C144,79 144,80 143,80 L129,80 C128,80 128,79 128,78 Z\" transform=\"translate(-128 -64)\" />\n</symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "5hTT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cLsY");
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("IujW");
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_markdown__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var styles_devicesModaleRevokeView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("Lv2T");
/* harmony import */ var styles_devicesModaleRevokeView__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(styles_devicesModaleRevokeView__WEBPACK_IMPORTED_MODULE_5__);







var devicesModaleRevokeView = function devicesModaleRevokeView(_ref) {
  var t = _ref.t,
      device = _ref.device,
      revokeDevice = _ref.revokeDevice,
      cancelAction = _ref.cancelAction;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: t('revokeDevice.title'),
    primaryText: t('revokeDevice.validate'),
    primaryType: "danger",
    primaryAction: function primaryAction() {
      return revokeDevice(device.id);
    },
    secondaryText: "cancel",
    secondaryAction: function secondaryAction() {
      return cancelAction();
    },
    dismissAction: function dismissAction() {
      return cancelAction();
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_2__["ModalContent"], {
    className: styles_devicesModaleRevokeView__WEBPACK_IMPORTED_MODULE_5___default.a['coz-modal-revoke-content']
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_markdown__WEBPACK_IMPORTED_MODULE_3___default.a, {
    source: t('revokeDevice.description', {
      name: device.client_name
    })
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_markdown__WEBPACK_IMPORTED_MODULE_3___default.a, {
    source: t('revokeDevice.subText'),
    className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(styles_devicesModaleRevokeView__WEBPACK_IMPORTED_MODULE_5___default.a['icon'], styles_devicesModaleRevokeView__WEBPACK_IMPORTED_MODULE_5___default.a['icon-arrows'])
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__["translate"])()(devicesModaleRevokeView));

/***/ }),

/***/ "614y":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "6WKl":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9At1");


var storageData = function storageData() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions__WEBPACK_IMPORTED_MODULE_0__["FETCH_STORAGE_SUCCESS"]:
      return action.storageData;

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (storageData);

/***/ }),

/***/ "7dT6":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"PassphraseView":{"title":"Update my password","current_passphrase":{"label":"Enter your current password:","placeholder":"Current password","wrong_passphrase":"Current password seems wrong."},"new_passphrase":{"label":"Choose a new password:","placeholder":"New cozy password","confirmation_placeholder":"Confirm the password","dont_match":"Password don't match"},"advices":{"strong_passphrase":"**Privilege a strong password:** A long password with numbers and special characters will be impossible to break.","memorize":"**Memorize it well:** In case of loss, you will not be able to recover the encrypted passwords in your cozy.","our_tip":"**Our tip:** Find a short phrase that suits you, for example: "},"hint":{"title":"Leave a hint","placeholder":"Hint","description":"The hint will be emailed to you if you forget your password, choose a hint that only you can understand","same_as_passphrase":"Your hint can not be your password"},"submit":"Update my password","cancel":"Keep my current password","server_error":"Something went wrong. Your password has not been saved.","wrong_two_fa_code":"The provided two factor code seems wrong.","reload":"Your password has been changed. The page is going to reload so the change can take effect.","redirect":"Your password has been changed. You are going to be redirected."},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "7yAG":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_0__);

var client = new cozy_client__WEBPACK_IMPORTED_MODULE_0___default.a({
  schema: {}
});
/* harmony default export */ __webpack_exports__["default"] = (client);

/***/ }),

/***/ "8BRP":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"u-shake":"u-shake--1-1gt","shake":"shake--11EkM","u-o-100":"u-o-100--3U2Ab","u-o-90":"u-o-90--yc5BS","u-o-80":"u-o-80--2kBA0","u-o-70":"u-o-70--1I7Sa","u-o-60":"u-o-60--2vbCd","u-o-50":"u-o-50--3Aw0c","u-o-40":"u-o-40--Jajfl","u-o-30":"u-o-30--1H2Vh","u-o-20":"u-o-20--1l4Ul","u-o-10":"u-o-10--1i4cR","u-o-05":"u-o-05--W9293","u-o-025":"u-o-025--1V7aZ","u-o-0":"u-o-0--1FC0R","set-delete-account-form-controls":"set-delete-account-form-controls--7fw7K","coz-textarea-wrapper":"coz-textarea-wrapper--8UShb","spin":"spin--nmI6-"};

/***/ }),

/***/ "8YQ7":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "9At1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STACK_DOMAIN", function() { return STACK_DOMAIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STACK_TOKEN", function() { return STACK_TOKEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_INFOS", function() { return FETCH_INFOS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_INFOS_SUCCESS", function() { return FETCH_INFOS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_INFOS_FAILURE", function() { return FETCH_INFOS_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_INFO", function() { return UPDATE_INFO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_INFO_SUCCESS", function() { return UPDATE_INFO_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_INFO_FAILURE", function() { return UPDATE_INFO_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESET_INFO_FIELD", function() { return RESET_INFO_FIELD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHECK_MAIL_CONFIRMATION_CODE", function() { return CHECK_MAIL_CONFIRMATION_CODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHECK_MAIL_CONFIRMATION_CODE_FAILURE", function() { return CHECK_MAIL_CONFIRMATION_CODE_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_LANG", function() { return SET_LANG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_DEVICES", function() { return FETCH_DEVICES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_DEVICES_SUCCESS", function() { return FETCH_DEVICES_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_DEVICES_FAILURE", function() { return FETCH_DEVICES_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEVICES_MODALE_REVOKE_OPEN", function() { return DEVICES_MODALE_REVOKE_OPEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEVICES_MODALE_REVOKE_CLOSE", function() { return DEVICES_MODALE_REVOKE_CLOSE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEVICE_REVOKE", function() { return DEVICE_REVOKE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEVICE_REVOKE_SUCCESS", function() { return DEVICE_REVOKE_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEVICE_REVOKE_FAILURE", function() { return DEVICE_REVOKE_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_SESSIONS", function() { return FETCH_SESSIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_SESSIONS_SUCCESS", function() { return FETCH_SESSIONS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_SESSIONS_FAILURE", function() { return FETCH_SESSIONS_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SESSIONS_DELETE_OTHERS", function() { return SESSIONS_DELETE_OTHERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SESSIONS_DELETE_OTHERS_SUCCESS", function() { return SESSIONS_DELETE_OTHERS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SESSIONS_DELETE_OTHERS_FAILURE", function() { return SESSIONS_DELETE_OTHERS_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_STORAGE", function() { return FETCH_STORAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_STORAGE_SUCCESS", function() { return FETCH_STORAGE_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_STORAGE_FAILURE", function() { return FETCH_STORAGE_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchInfos", function() { return fetchInfos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchStorageData", function() { return fetchStorageData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateInfo", function() { return updateInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchDevices", function() { return fetchDevices; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "devicePerformRevoke", function() { return devicePerformRevoke; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deviceModaleRevokeOpen", function() { return deviceModaleRevokeOpen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deviceModaleRevokeClose", function() { return deviceModaleRevokeClose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchSessions", function() { return fetchSessions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteOtherSessions", function() { return deleteOtherSessions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cozyFetch", function() { return cozyFetch; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lib_emailHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("jWgV");
/* harmony import */ var lib_emailHelper__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lib_emailHelper__WEBPACK_IMPORTED_MODULE_1__);


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(Object(source)); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* global fetch */

var STACK_DOMAIN = null;
var STACK_TOKEN = null;

if (document.querySelector('[role=application]')) {
  STACK_DOMAIN = '//' + document.querySelector('[role=application]').dataset.cozyDomain;
  STACK_TOKEN = document.querySelector('[role=application]').dataset.cozyToken;
}

if (!(STACK_TOKEN || STACK_DOMAIN)) {
  // eslint-disable-next-line no-console
  console.error('Settings need the Cozy URL and the token to work correctly. Elements not found.');
}

var FETCH_INFOS = 'FETCH_INFOS';
var FETCH_INFOS_SUCCESS = 'FETCH_INFOS_SUCCESS';
var FETCH_INFOS_FAILURE = 'FETCH_INFOS_FAILURE';
var UPDATE_INFO = 'UPDATE_INFO';
var UPDATE_INFO_SUCCESS = 'UPDATE_INFO_SUCCESS';
var UPDATE_INFO_FAILURE = 'UPDATE_INFO_FAILURE';
var RESET_INFO_FIELD = 'RESET_INFO_FIELD';
var CHECK_MAIL_CONFIRMATION_CODE = 'CHECK_MAIL_CONFIRMATION_CODE';
var CHECK_MAIL_CONFIRMATION_CODE_FAILURE = 'CHECK_MAIL_CONFIRMATION_CODE_FAILURE';
var SET_LANG = 'SET_LANG';
var FETCH_DEVICES = 'FETCH_DEVICES';
var FETCH_DEVICES_SUCCESS = 'FETCH_DEVICES_SUCCESS';
var FETCH_DEVICES_FAILURE = 'FETCH_DEVICES_FAILURE';
var DEVICES_MODALE_REVOKE_OPEN = 'DEVICES_MODALE_REVOKE_OPEN';
var DEVICES_MODALE_REVOKE_CLOSE = 'DEVICES_MODALE_REVOKE_CLOSE';
var DEVICE_REVOKE = 'DEVICE_REVOKE';
var DEVICE_REVOKE_SUCCESS = 'DEVICE_REVOKE_SUCCESS';
var DEVICE_REVOKE_FAILURE = 'DEVICE_REVOKE_FAILURE';
var FETCH_SESSIONS = 'FETCH_SESSIONS';
var FETCH_SESSIONS_SUCCESS = 'FETCH_SESSIONS_SUCCESS';
var FETCH_SESSIONS_FAILURE = 'FETCH_SESSIONS_FAILURE';
var SESSIONS_DELETE_OTHERS = 'SESSIONS_DELETE_OTHERS';
var SESSIONS_DELETE_OTHERS_SUCCESS = 'SESSIONS_DELETE_OTHERS_SUCCESS';
var SESSIONS_DELETE_OTHERS_FAILURE = 'SESSIONS_DELETE_OTHERS_FAILURE';
var FETCH_STORAGE = 'FETCH_STORAGE';
var FETCH_STORAGE_SUCCESS = 'FETCH_STORAGE_SUCCESS';
var FETCH_STORAGE_FAILURE = 'FETCH_STORAGE_FAILURE';
var fetchInfos = function fetchInfos() {
  return function (dispatch) {
    dispatch({
      type: FETCH_INFOS
    });
    cozyFetch('GET', '/settings/instance').then(function (instance) {
      // tracking preference is stored as string, convert it to boolean for the checkbox
      if (instance && instance.data && instance.data.attributes && instance.data.attributes.hasOwnProperty('tracking')) {
        instance.data.attributes.tracking = instance.data.attributes.tracking === 'true';
      }

      dispatch({
        type: FETCH_INFOS_SUCCESS,
        instance: instance
      });
    }).catch(function () {
      dispatch({
        type: FETCH_INFOS_FAILURE,
        error: 'ProfileView.infos.server_error'
      });
    });
  };
};
var fetchStorageData = function fetchStorageData() {
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(dispatch) {
        var offersLink, ctx, instance, managerUrl, enablePremiumLinks, uuid;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dispatch({
                  type: FETCH_STORAGE
                });
                offersLink = null;
                _context.prev = 2;
                _context.next = 5;
                return cozyFetch('GET', '/settings/context');

              case 5:
                ctx = _context.sent;
                _context.next = 8;
                return cozyFetch('GET', '/settings/instance');

              case 8:
                instance = _context.sent;
                managerUrl = ctx && ctx.data && ctx.data.attributes && ctx.data.attributes.manager_url;
                enablePremiumLinks = ctx && ctx.data && ctx.data.attributes && ctx.data.attributes.enable_premium_links;
                uuid = instance && instance.data && instance.data.attributes && instance.data.attributes.uuid;

                if (enablePremiumLinks && managerUrl && uuid) {
                  offersLink = "".concat(managerUrl, "/cozy/instances/").concat(uuid, "/premium");
                }

                _context.next = 18;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](2);

                if (_context.t0.error && _context.t0.error !== 'Not Found') {
                  // eslint-disable-next-line no-console
                  console.warn(_context.t0);
                } else if (!_context.t0.error) {
                  // eslint-disable-next-line no-console
                  console.warn(_context.t0);
                }

              case 18:
                cozyFetch('GET', '/settings/disk-usage').then(function (json) {
                  dispatch({
                    type: FETCH_STORAGE_SUCCESS,
                    storageData: {
                      usage: parseInt(json.data.attributes.used, 10),
                      // TODO Better handling when no quota provided
                      quota: parseInt(json.data.attributes.quota, 10) || 100000000000,
                      isLimited: json.data.attributes.is_limited,
                      offersLink: offersLink
                    }
                  });
                }).catch(function (error) {
                  dispatch({
                    type: FETCH_STORAGE_FAILURE
                  });
                  throw error;
                });

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 15]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};

var tryUpdate =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(instance, _ref2) {
    var _ref2$retries, retries, isConflictError, remoteInstance;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref2$retries = _ref2.retries, retries = _ref2$retries === void 0 ? 0 : _ref2$retries;
            _context2.prev = 1;
            _context2.next = 4;
            return cozyFetch('PUT', '/settings/instance', instance);

          case 4:
            return _context2.abrupt("return", _context2.sent);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](1);
            isConflictError = _context2.t0.errors && _context2.t0.errors[0] && _context2.t0.errors[0].status === '409';

            if (!(isConflictError && retries)) {
              _context2.next = 18;
              break;
            }

            _context2.next = 13;
            return cozyFetch('GET', '/settings/instance');

          case 13:
            remoteInstance = _context2.sent;
            remoteInstance.data.attributes = instance.data.attributes;
            return _context2.abrupt("return", tryUpdate(remoteInstance, {
              retries: retries - 1
            }));

          case 18:
            throw _context2.t0;

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 7]]);
  }));

  return function tryUpdate(_x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

var updateInfo = function updateInfo(field, value) {
  return (
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(dispatch, getState) {
        var instance, updatedInstance;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                dispatch({
                  type: UPDATE_INFO,
                  field: field,
                  value: value
                }); // Check if the field is empty or not

                if (!(value === '')) {
                  _context3.next = 4;
                  break;
                }

                dispatch({
                  type: UPDATE_INFO_FAILURE,
                  field: field,
                  error: 'ProfileView.infos.empty'
                });
                return _context3.abrupt("return");

              case 4:
                if (!(field === 'email' && !lib_emailHelper__WEBPACK_IMPORTED_MODULE_1___default.a.isValidEmail(value))) {
                  _context3.next = 7;
                  break;
                }

                dispatch({
                  type: UPDATE_INFO_FAILURE,
                  field: field,
                  error: 'ProfileView.email.error'
                });
                return _context3.abrupt("return");

              case 7:
                // tracking field must be stored as string
                if (field === 'tracking') value = value.toString();
                instance = _objectSpread({}, getState().instance); // We are actually mutating also getState().instance.data.attributes here.
                // TODO: Avoid mutation of getState().instance.data.attributes, and check
                // if the whole form keeps working.
                // The whole form could be refactored with latests improvements from
                // CozyCllient and use react-final-form.

                instance.data.attributes[field] = value;
                _context3.prev = 10;
                _context3.next = 13;
                return tryUpdate(instance, {
                  retries: 3
                });

              case 13:
                updatedInstance = _context3.sent;
                _context3.next = 20;
                break;

              case 16:
                _context3.prev = 16;
                _context3.t0 = _context3["catch"](10);
                dispatch({
                  type: UPDATE_INFO_FAILURE,
                  field: field,
                  error: 'ProfileView.infos.server_error'
                });
                return _context3.abrupt("return", instance);

              case 20:
                dispatch({
                  type: UPDATE_INFO_SUCCESS,
                  field: field,
                  instance: instance
                });
                setTimeout(function () {
                  dispatch({
                    type: RESET_INFO_FIELD,
                    field: field
                  });
                }, 3000);

                if (field === 'locale') {
                  dispatch({
                    type: SET_LANG,
                    lang: value
                  });
                }

                return _context3.abrupt("return", updatedInstance);

              case 24:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[10, 16]]);
      }));

      return function (_x4, _x5) {
        return _ref4.apply(this, arguments);
      };
    }()
  );
};
var DISPLAYED_CLIENTS = ['mobile', 'desktop'];
var fetchDevices = function fetchDevices() {
  return (
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(dispatch) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                dispatch({
                  type: FETCH_DEVICES
                });
                cozyFetch('GET', '/settings/clients').then(function (response) {
                  // transform th raw data into a more digestable format for the app
                  var devices = response.data.map(function (device) {
                    var deviceData = device.attributes;
                    deviceData.id = device.id;
                    return deviceData;
                  }).filter(function (device) {
                    return DISPLAYED_CLIENTS.includes(device.client_kind);
                  });
                  dispatch({
                    type: FETCH_DEVICES_SUCCESS,
                    devices: devices
                  });
                }).catch(function (error) {
                  dispatch({
                    type: FETCH_DEVICES_FAILURE
                  });
                  throw error;
                });

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x6) {
        return _ref5.apply(this, arguments);
      };
    }()
  );
};
var devicePerformRevoke = function devicePerformRevoke(deviceId) {
  return (
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(dispatch) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                dispatch({
                  type: DEVICE_REVOKE
                });
                cozyFetch('DELETE', '/settings/clients/' + deviceId).then(function () {
                  dispatch({
                    type: DEVICE_REVOKE_SUCCESS,
                    deviceId: deviceId
                  });
                }).catch(function (error) {
                  dispatch({
                    type: DEVICE_REVOKE_FAILURE
                  });
                  throw error;
                });

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x7) {
        return _ref6.apply(this, arguments);
      };
    }()
  );
};
var deviceModaleRevokeOpen = function deviceModaleRevokeOpen(device) {
  return {
    type: DEVICES_MODALE_REVOKE_OPEN,
    device: device
  };
};
var deviceModaleRevokeClose = function deviceModaleRevokeClose() {
  return {
    type: DEVICES_MODALE_REVOKE_CLOSE
  };
};
var fetchSessions = function fetchSessions() {
  return (
    /*#__PURE__*/
    function () {
      var _ref7 = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6(dispatch) {
        var sessions, responseSessions, responseCurrentsSessionsIds, currentsSessions;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                dispatch({
                  type: FETCH_SESSIONS
                });
                sessions = [];
                _context6.prev = 2;
                _context6.next = 5;
                return cozyFetch('GET', '/data/io.cozy.sessions.logins/_all_docs?include_docs=true');

              case 5:
                responseSessions = _context6.sent;
                // Sort allSessions in an array
                responseSessions.rows.map(function (row) {
                  return sessions.push(row.doc);
                }); // GET currents sessions id

                _context6.next = 9;
                return cozyFetch('GET', '/settings/sessions');

              case 9:
                responseCurrentsSessionsIds = _context6.sent;
                _context6.next = 16;
                break;

              case 12:
                _context6.prev = 12;
                _context6.t0 = _context6["catch"](2);
                dispatch({
                  type: FETCH_SESSIONS_FAILURE
                });
                throw _context6.t0;

              case 16:
                // Merge ID and Sessions to inject only currents sessions in the store
                currentsSessions = [];
                responseCurrentsSessionsIds.data.map(function (currentSessionId) {
                  var _iteratorNormalCompletion = true;
                  var _didIteratorError = false;
                  var _iteratorError = undefined;

                  try {
                    for (var _iterator = sessions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                      var session = _step.value;
                      currentSessionId.id === session.session_id && currentsSessions.push(session);
                    }
                  } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                      }
                    } finally {
                      if (_didIteratorError) {
                        throw _iteratorError;
                      }
                    }
                  }
                });
                dispatch({
                  type: FETCH_SESSIONS_SUCCESS,
                  sessions: currentsSessions
                });

              case 19:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[2, 12]]);
      }));

      return function (_x8) {
        return _ref7.apply(this, arguments);
      };
    }()
  );
};
var deleteOtherSessions = function deleteOtherSessions() {
  return (
    /*#__PURE__*/
    function () {
      var _ref8 = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee7(dispatch) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                dispatch({
                  type: SESSIONS_DELETE_OTHERS
                });
                cozyFetch('DELETE', '/auth/login/others').then(function () {
                  dispatch({
                    type: SESSIONS_DELETE_OTHERS_SUCCESS
                  });
                }).then(function () {
                  dispatch(fetchSessions());
                }).catch(function (error) {
                  dispatch({
                    type: SESSIONS_DELETE_OTHERS_FAILURE
                  });
                  throw error;
                });

              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      return function (_x9) {
        return _ref8.apply(this, arguments);
      };
    }()
  );
};
var cozyFetch = function cozyFetch(method, path, body) {
  var params = {
    method: method,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: "Bearer ".concat(STACK_TOKEN)
    }
  };

  if (body) {
    params.body = JSON.stringify(body);
  }

  return fetch("".concat(STACK_DOMAIN).concat(path), params).then(function (response) {
    var data;
    var contentType = response.headers.get('content-type');

    if (contentType && contentType.indexOf('json') >= 0) {
      data = response.json();
    } else {
      data = response.text();
    }

    return response.status >= 200 && response.status <= 204 ? data : data.then(Promise.reject.bind(Promise));
  });
};

/***/ }),

/***/ "9pOX":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Paramètres"},"DeleteAccount":{"title":"Suppression du compte","label":"Vous pouvez supprimer votre Cozy à tout instant. Attention, une fois votre compte supprimé, vos données seront également supprimées, nous ne pourrons pas vous les renvoyer.","button":{"label":"Supprimer mon compte"},"error":{"message":"Une erreur est survenue pendant l'envoi de la demande de suppression. Merci d'essayer à nouveau ou de contacter notre support."},"modal":{"confirm":{"title":"Supprimer votre Cozy ?","description":{"line":{"1":"Votre Cozy sera supprimé","2":"Vous ne pourrez plus accéder à votre Cozy","3":"L'ensemble de vos données seront supprimées"}},"button":{"cancel":{"label":"Annuler"},"submit":{"label":"Supprimer"}}},"form":{"title":"Demande de suppression de votre compte Cozy","reason":{"label":"Pourquoi souhaitez-vous supprimer votre compte ? (Optionnel)"},"button":{"cancel":{"label":"Annuler"},"submit":{"label":"Envoyer"}}}},"request":{"mail":{"subject":"Demande de suppression de %{domain}"}},"success":{"message":"Votre demande a bien été envoyée."}},"Nav":{"profile":"Profil","activated_services":"Services activés","connected_devices":"Appareils connectés","sessions":"Connexions","storage":"Stockage","email_notifications":"Notifications par e-mail"},"Loading":{"loading":"Chargement"},"Empty":{"devices":{"title":"Vous n'avez aucun appareil connecté","text":"En installant les différents clients, vous pourrez accéder à vos fichiers sur tous vos écrans et au même moment. Cozy sera toujours à portée de main même si vous avez la bougeotte !","link":{"href":"https://cozy.io/fr/download/","text":"Télécharger une de nos applications"}}},"ProfileView":{"instance":{"server_error":"Une erreur s'est produite. Merci de recharger la page."},"title":"Profil","password":{"title":"Mot de passe","show":"Montrer","hide":"Cacher","server_error":"Une erreur s'est produite. Votre mot de passe n'a pas été enregistré.","password_too_weak":"Votre mot de passe est trop simple. Il est recommandé d'utiliser des majuscules, des chiffres, des caractères spéciaux et/ou un mot de passe plus long.","wrong_password":"Le mot de passe actuel ne semble pas correct.","wrong_two_fa_code":"Le code d'authentification en deux facteurs fourni semble incorrect.","success":"Votre mot de passe a été modifié.","reset_link":"Mot de passe oublié ?","submit_label":"Changer votre mot de passe","reload":"Votre mot de passe a été modifié. La page va se recharger afin que le changement prenne effet."},"current_password":{"label":"Entrez votre mot de passe actuel","placeholder":"Mot de passe actuel"},"new_password":{"label":"Entrez votre nouveau mot de passe","placeholder":"Nouveau mot de passe"},"infos":{"success":"Vos informations ont été modifiées.","server_error":"Une erreur s'est produite. Vos informations n'ont pas pu être enregistrées.","empty":"Le champ ne peut pas être vide"},"email":{"title":"E-mail","label":"Cozy a besoin de votre e-mail pour vous envoyer des notifications et vous permettre de récupérer votre mot de passe.","error":"L'adresse e-mail que vous avez entré ne semble pas correcte. Êtes-vous sûr(e) de l'avoir bien écrite sous la forme georges@abitbol.com ?"},"twofa":{"title":{"activate":"Authentification en deux étapes","desactivate":"Désactiver l'authentification en deux étapes","validation":"Validation de la double authentification"},"passphrase":{"title":"Authentification en deux étapes","description":"Votre Cozy vous a envoyé un code de validation à 6 chiffres à l'adresse suivante : %{email}<br/>Saississez-le ci-dessous pour activer l'authentification :"},"label":"Parce que deux étapes valent mieux qu'une, renforcez la sécurité de votre Cozy avec une étape supplémentaire.<br/> [Consulter notre site d'aide →](%{link}). ","modal":{"code":"code","protect":"Protégez votre Cozy avec l'authentification en deux étapes","change":" **Qu'est-ce que ça change ?** Chaque fois que vous vous connecterez à votre Cozy, vous aurez besoin de votre mot de passe et d'un code d'activation. <br/>[Consulter notre site d'aide →](%{link}). ","secu_title":"Ajoutez un niveau de sécurité supplémentaire","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Renforcez la protection de vos données","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Êtes-vous certain·e de désactiver cette option ?","desactivate_description":"En cliquant sur le bouton\" Désactiver\", votre mot de passe sera le seul sésame pour accéder à votre Cozy. Vous supprimez ainsi un niveau de sécurité.","confirmation_title":"Confirmation du code de validation","confirmation_description":"Votre Cozy vous a envoyé un code de validation à 6 chiffres à l'adresse suivante : %{email}<br/>Saississez-le ci-dessous pour activer l'authentification :","nocode":"Vous ne recevez aucun code ?","nocode_claude":"Contactez Claude à l'adresse : ","validation_title":"Bravo ! Votre adresse email est confirmée.","validation_description":"La sécurisation de votre Cozy se fera, à partir de maintenant, en deux étapes.","validation_logs":"Remember your identifiers:","email":"Vous devez renseigner une adresse email valide pour que votre Cozy puisse vous envoyer votre code de confirmation.","button":{"activate":"Activer l'authentification","cancel":"Annuler","desactivate":"Désactiver","validate":"Valider","terminate":"Terminer"}}},"public_name":{"title":"Nom d'usage","label":"Votre nom d'usage est utilisé lorsque vous partagez des fichiers avec d'autres utilisateurs de Cozy."},"tracking":{"title":"Nous aider à améliorer notre produit","label":"Autoriser Cozy à récupérer anonymement vos usages pour améliorer notre produit.<br/>[Soyez informé des engagements de Cozy](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"Mes données","label":"Cozy s'engage à vous fournir la totalité des informations qu'il stocke sur vous :","link":"Télécharger une copie de mes données","server_error":"Une erreur s'est produite. Veuillez recommencer ou nous contacter.","fetch_error":"Une erreur en récupérant vos données. Veuillez recommencer ou nous contacter.","missing_error":"L'archive semble être manquant ou a expiré. Veuillez recommencer ou nous contacter.","success":"Votre demande a bien été prise en compte","modal":{"title":"Récupérer mes données","description":"Cozy se charge de récupérer toutes les données qu'il détient sur vous et de vous en envoyer une archive à télécharger.<br/><br/>Le lien de téléchargement vous sera envoyé par mail à l'adresse __%{email}__ dès que l'archive aura été générée.","cancel":"Annuler","CTA":"M'envoyer mes données"},"download":{"title":"Télécharger mes données","description":"Voici vos données disponibles de Cozy :","CTA":"Télécharger","CTA_part":"Télécharger (partie %{number})"}},"locale":{"title":"Langue","label":"C’est la langue de votre Cozy.","contrib":"Vous voulez aider à traduire des applications de Cozy ? [Voilà comment nous aider](https://forum.cozy.io/t/comment-participer-a-la-traduction-de-cozy/3938).","fr":"Français","en":"Anglais","es":"Espagnol","ja":"Japonais","nl":"Néerlandais","de":"Allemand","ru":"Russe","nl_NL":"Neérlandais (Pays-bas)","ko":"Koréen","pl":"Polonais","pt":"Portugais","da":"Danois","ro_RO":"Roumain (Roumanie)","pt_BR":"Portugais (Brésil)","zh_CN":"Chinois (Chine)","ar":"Arabe","it":"Italien","ro":"Roumain","eo":"Esperanto","de_DE":"Allemand (Allemagne)","sq":"Albanais","tr":"Turc","uk_UA":"Ukrainien (Ukraine)","ru_RU":"Russe (Russie)","sq_AL":"Albanais (Albanie)","ca":"Catalan","ca_ES":"Catalan (Espagne)","zh":"Chinois","zh_TW":"Chinois (Taïwan)","cs":"Tchèque","cs_CZ":"Tchèque (République Tchèque)","el":"Grec","id":"Indonésien","it_IT":"Italien (Italy)","sk":"Slovaque","sk_SK":"Slovaque (Slovaquie)","es_CO":"Espagnol (Colombie)","es_ES":"Espagnol (Espagne)","sv":"Suedois"}},"DevicesView":{"title":"Appareils connectés","load_error":"Une erreur s'est produite lors du chargement de vos appareils, merci de réessayer plus tard.","head_name":"Nom","head_sync":"Dernière synchronisation","head_activity":"Dernière activité","head_permissions":"Permissions","head_actions":"Actions","revoke":"révoquer","sync_date_format":"D MMM YYYY"},"StorageView":{"title":"Stockage","load_error":"Une erreur s'est produite lors du chargement de vos informations de stockage, merci de re-essayer plus tard.","storage_title":"Espace total","storage_phrase":"%{diskUsage} Go sur %{diskQuota} Go","more_space":"Besoin de plus de stockage?","see_offer":"Augmenter mon espace"},"SessionsView":{"title":"Historique de connexions","sync_date_format":"D MMM YYYY","delete":"Déconnecter toutes mes sessions","infos":{"server_error":"Une erreur s'est produite. Merci de recharger la page.","sessions_deleted":"Toutes les sessions ont été déconnectées"}},"revokeDevice":{"title":"Révoquer cet appareil","description":"Vous allez révoquer **%{name}**.","subText":"La synchronisation depuis cet appareil s'arrêtera immédiatement.","validate":"Révoquer l’appareil","error":"Je ne parviens pas à révoquer l’appareil, essayez de recharger la page."},"ServicesView":{"title":"Services activés","load_error":"Une erreur s’est produite pendant le chargement de vos services, merci de réessayer prochainement.","head_services":"Services","head_account":"Compte","head_sync":"Dernière sychronisation","head_status":"Statut","unsync":"Non synchronisé","konnector_link":"Accéder ici à la liste de tous les services"},"soon":{"title":"Bientôt","description":"Cette fonctionnalité n’est pas encore disponible. Pour plus d’informations, contactez-nous s’il-vous-plaît à contact@cozycloud.cc"},"support":{"title":"Bonjour ! Pouvons-nous vous aider? ","emailDetail":"Votre message sera envoyé depuis votre adresse courriel enregistrée dans les paramètres de votre Cozy.","fields":{"message":{"title":"Votre message","placeholder":"Dites-nous tout ! Notre équipe est à votre écoute : un problème de connexion, d'activation d'un connecteur ou juste envie de nous dire Bonjour."}},"response_email":{"subject":"Votre demande a bien été prise en compte","body":"Bonjour,\n\nNous avons bien reçu votre demande de support :\n%{message}\n\nNous faisons de notre mieux pour vous répondre dès que possible.\n\nClaude de Cozy."},"button":"C'est parti !","sending":"Envoi en cours...","success":"👏 Votre message a bien été envoyé. Merci!","error":"Une erreur s'est produite lors de l'envoi de votre message"},"claudy":{"title":"Comment utiliser votre Cozy ?","actions":{"desktop":{"title":"Accéder à vos fichiers sur votre ordinateur","description":"Synchroniser tous vos fichiers Cozy Drive sur votre ordinateur","button":"Installer Cozy Drive sur votre ordinateur ","link":"https://cozy.io/fr/download/"},"mobile":{"title":"Sauvegarder vos photos depuis votre mobile","description":"Vos souvenirs sont sauvegardés et synchronisés sur tous vos appareils","button":"Installer l'app Cozy Drive sur votre mobile","link":"https://cozy.io/fr/download/"},"cozy-collect":{"title":"Récupérer automatiquement vos factures","description":"Cozy Collect organise à votre place vos dossiers avec tous vos documents administratifs","button":"Découvrir Cozy Collect"},"support":{"title":"Nous contacter","description":"Bonjour ! Pouvons-nous vous aider? ","emailDetail":"Votre message sera envoyé depuis votre adresse courriel enregistrée dans les paramètres de votre Cozy.","fields":{"message":{"title":"Votre message","placeholder":"Dites-nous tout ! Notre équipe est à votre écoute : un problème de connexion, d'activation d'un connecteur ou juste envie de nous dire Bonjour."}},"button":"C'est parti !","sending":"Envoi en cours...","success":"👏 Votre message a bien été envoyé. Merci!","error":"Une erreur s'est produite lors de l'envoi de votre message"}}},"errors":{"noEmailFound":"Aucune adresse courriel trouvée. Veuillez en ajouter une dans les paramètres de votre Cozy avant de réessayez."}};

/***/ }),

/***/ "AKca":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("/MKj");
/* harmony import */ var actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("9At1");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Alerter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("67rm");
/* harmony import */ var components_DevicesView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("QPVV");






var mapStateToProps = function mapStateToProps(state) {
  return {
    devices: state.devices,
    isFetching: state.ui.isFetching,
    openDeviceRevokeModale: state.openDeviceRevokeModale,
    deviceToRevoke: state.deviceToRevoke
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchDevices: function fetchDevices() {
      var t = ownProps.t;
      return dispatch(Object(actions__WEBPACK_IMPORTED_MODULE_1__["fetchDevices"])()).catch(function () {
        return cozy_ui_react_Alerter__WEBPACK_IMPORTED_MODULE_3__["default"].error(t('DevicesView.load_error'));
      });
    },
    onDeviceModaleRevoke: function onDeviceModaleRevoke(device) {
      dispatch(Object(actions__WEBPACK_IMPORTED_MODULE_1__["deviceModaleRevokeOpen"])(device));
    },
    onDeviceModaleRevokeClose: function onDeviceModaleRevokeClose() {
      dispatch(Object(actions__WEBPACK_IMPORTED_MODULE_1__["deviceModaleRevokeClose"])());
    },
    devicePerformRevoke: function devicePerformRevoke(deviceId) {
      var t = ownProps.t;
      dispatch(Object(actions__WEBPACK_IMPORTED_MODULE_1__["devicePerformRevoke"])(deviceId)).catch(function () {
        return cozy_ui_react_Alerter__WEBPACK_IMPORTED_MODULE_3__["default"].error(t('revokeDevice.error'));
      });
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__["translate"])()(Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["connect"])(mapStateToProps, mapDispatchToProps)(components_DevicesView__WEBPACK_IMPORTED_MODULE_4__["default"])));

/***/ }),

/***/ "B/tT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9At1");


var sessions = function sessions() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions__WEBPACK_IMPORTED_MODULE_0__["FETCH_SESSIONS_SUCCESS"]:
      return action.sessions;

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (sessions);

/***/ }),

/***/ "BCMW":
/***/ (function(module) {

module.exports = {"manifest":{"name":"設定"},"DeleteAccount":{"title":"アカウントを削除","label":"Cozy をいつでも削除することができます。 アカウントが削除されると、データが完全に削除され、元に戻ることはありません。","button":{"label":"自分のアカウントを削除"},"error":{"message":"アカウントの削除リクエスト中にエラーが発生しました。 もう一度やり直してください。"},"modal":{"confirm":{"title":"お使いの Cozy を削除しますか?","description":{"line":{"1":"お使いの Cozy が削除されます","2":"お使いの Cozy にもうアクセスすることができなくなります","3":"すべてのデータが削除されます"}},"button":{"cancel":{"label":"キャンセル"},"submit":{"label":"削除"}}},"form":{"title":"お使いの Cozy の削除リクエスト","reason":{"label":"なぜお使いの Cozy を削除したいのですか (オプション)?"},"button":{"cancel":{"label":"キャンセル"},"submit":{"label":"送信"}}}},"request":{"mail":{"subject":"%{domain} の削除リクエスト"}},"success":{"message":"リクエストを送信しました。"}},"Nav":{"profile":"プロフィール","activated_services":"アクティブなサービス","connected_devices":"接続されたデバイス","sessions":"接続","storage":"ストレージ","email_notifications":"メール通知"},"Loading":{"loading":"読み込み中"},"Empty":{"devices":{"title":"接続されたデバイスはありません","text":"さまざまなクライアントをインストールすることで、すべての画面で同時にファイルにアクセスできるようになります。 あなたが道にいても、Cozy はいつも手の届く所にあります!","link":{"href":"https://cozy.io/en/download/","text":"アプリケーションを 1 つダウンロード"}}},"ProfileView":{"instance":{"server_error":"サーバーで問題が発生しました。ページを再読み込みしてください。"},"title":"プロフィール","password":{"title":"パスワード","show":"表示","hide":"非表示","server_error":"何か問題があります。パスワードは保存されませんでした。","password_too_weak":"パスワードが弱すぎます。大文字、数字、特殊文字を追加するか、長いパスワードにする必要があります。","wrong_password":"現在のパスワードが間違っているようです。","wrong_two_fa_code":"入力された二要素コードが間違っているようです。","success":"パスワードが変更されました","reset_link":"現在のパスワードを忘れましたか?","submit_label":"パスワードを変更","reload":"パスワードが変更されました。 ページが再読み込みされて、変更が有効になります。"},"current_password":{"label":"現在のパスワードを入力してください","placeholder":"現在のパスワード"},"new_password":{"label":"新しいパスワードを入力してください","placeholder":"新しいパスワード"},"infos":{"success":"情報が変更されました","server_error":"何か問題があります。情報は保存されませんでした。","empty":"このフィールドは空にできません"},"email":{"title":"メール","label":"パスワードを回復するために、Cozy は通知を送信するメールアドレスが必要です","error":"メールアドレスは正しくないようです。 正しく入力していますか(例：john@wayne.com)?"},"twofa":{"title":{"activate":"二段階認証","desactivate":"二段階認証を無効にする","validation":"二段階認証の検証"},"passphrase":{"title":"二段階認証","description":"Cozy が %{email} に 6 桁の確認コードを送信しました。<br/>コードを入力してパスワードを変更してください:"},"label":"二段階は一段階より安全です。追加のステップで Cozy のセキュリティを向上させます。<br/>[ウェブサイトをご覧ください →](%{link})","modal":{"code":"コード","protect":"二段階認証で Cozy を保護します","change":"**何が変わりますか?** Cozy に接続するたびに、パスワードと確認コードを入力する必要があります。<br/>[ウェブサイトをご覧ください →](%{link})","secu_title":"セキュリティレベルを上げる","secu_description":"パスワードもいいですが、\"複雑\" にしないと、他人が簡単に推測できます。メールで検証コードを受信すると、Cozy の制御が保証されます。","protect_title":"データの保護を向上","protect_description":"他人があなたのパスワードを入手しても、Cozy に接続できるのはあなただけです","desactivate_title":"このオプションを無効にしてもよろしいですか?","desactivate_description":"\"無効にする\" ボタンをクリックすると、Cozy にはパスワードのみでアクセスします。セキュリティレベルが低下します。","confirmation_title":"検証コードの確認","confirmation_description":"Cozy が %{email} に 6 桁の確認コードを送信しました。<br/>コードを入力して認証を有効にしてください。","nocode":"コードを受信していませんか?","nocode_claude":"お問い合せは","validation_title":"おめでとうございます! メールアドレスを確認しました。","validation_description":"Cozy は二段階で安全に保護されます。","validation_logs":"ID 覚えておいてください:","email":"正しいメールアドレスを入力する必要があります","button":{"activate":"認証を有効にする","cancel":"キャンセル","desactivate":"無効にする","validate":"検証","terminate":"終了"}}},"public_name":{"title":"ユーザー名","label":"Cozy ユーザーとファイルを共有するときに、ユーザー名が表示されます。"},"tracking":{"title":"製品の改善にご協力ください","label":"製品を改善するために、Cozy クラウドが使用状況のデータを匿名で取得する権限を与えます。<br/>[Cozy のコミットメントについて](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"自分のデータ","label":"Cozy は、あなたが保管するすべてのデータを提供することを約束します:","link":"自分のデータのコピーをダウンロード","server_error":"何か問題が発生しまいｓた。もう一度やり直すか、お問い合わせください。","fetch_error":"エクスポートデータを取得するときに問題が発生しました。 もう一度やり直すか、お問い合わせください。","missing_error":"アーカイブが見つからないか期限切れになっているようです。 もう一度やり直すか、お問い合わせください。","success":"リクエストは正しく送信されました!","modal":{"title":"自分のデータを取得","description":"Cozy があなたに関するすべてのデータを取得し、アーカイブをダウンロードするように送信します。<br/><br/>アーカイブが利用可能になったら、ダウンロードリンクが __%{email}__ メールアドレスに送信されます。","cancel":"キャンセル","CTA":"自分のデータを送信"},"download":{"title":"自分のデータをダウンロード","description":"Cozy で利用可能なすべてのデータアーカイブがあります:","CTA":"アーカイブをダウンロード","CTA_part":"ダウンロード (パート %{number})"}},"locale":{"title":"言語","label":"Cozy で使用される言語です。","contrib":"Cozy の翻訳に興味がありますか? [**私たちに手を差し伸べる方法**] (https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937)。","fr":"フランス語","en":"英語","es":"スペイン語","ja":"日本語","nl":"オランダ語","de":"ドイツ語","ru":"ロシア語","nl_NL":"オランダ語 (オランダ)","ko":"朝鮮語","pl":"ポーランド語","pt":"ポルトガル語","da":"デンマーク語","ro_RO":"ルーマニア語 (ルーマニア)","pt_BR":"ポルトガル語 (ブラジル)","zh_CN":"中国語 (中国)","ar":"アラビア語","it":"イタリア語","ro":"ルーマニア語","eo":"エスペラント語","de_DE":"ドイツ語 (ドイツ)","sq":"アルバニア語","tr":"トルコ語","uk_UA":"ウクライナ語 (ウクライナ)","ru_RU":"ロシア語 (ロシア)","sq_AL":"アルバニア語 (アルバニア)","ca":"カタロニア語","ca_ES":"カタロニア語 (スペイン)","zh":"中国語","zh_TW":"中国語 (台湾)","cs":"チェコ語","cs_CZ":"チェコ語 (チェコ共和国)","el":"ギリシャ語","id":"インドネシア語","it_IT":"イタリア語 (イタリア)","sk":"スロバキア語","sk_SK":"スロバキア語 (スロバキア)","es_CO":"スペイン語 (コロンビア)","es_ES":"スペイン語 (スペイン)","sv":"スウェーデン語"}},"DevicesView":{"title":"接続されたデバイス","load_error":"デバイスの読み込み中にエラーが発生しました。後でもう一度やり直してください。","head_name":"名前","head_sync":"最後の同期","head_activity":"最後のアクティビティ","head_permissions":"アクセス許可","head_actions":"操作","revoke":"取消","sync_date_format":"YYYY/MM/DD"},"StorageView":{"title":"ストレージ","load_error":"ストレージ情報の読み込み中にエラーが発生しました。後でもう一度やり直してください。","storage_title":"総容量","storage_phrase":"%{diskUsage} GB / %{diskQuota} GB 使用","more_space":"もっとストレージが必要ですか?","see_offer":"ストレージをアップグレード"},"SessionsView":{"title":"接続履歴","sync_date_format":"YYYY/MM/DD","delete":"他のセッションをすべて削除","infos":{"server_error":"サーバーで問題が発生しました。ページを再読み込みしてください。","sessions_deleted":"他のセッションをすべて削除しました"}},"revokeDevice":{"title":"このデバイスを取り消し","description":"**%{name}** のリンクを解除します。","subText":"すぐにこのデバイスとの同期を停止します。","validate":"デバイスの取り消し","error":"デバイスを取り消しできませんでした。ページを再読み込みしてください。"},"ServicesView":{"title":"アクティブなサービス","load_error":"サービスの読み込み中にエラーが発生しました。後でもう一度やり直してください。","head_services":"サービス","head_account":"アカウント","head_sync":"最後の同期","head_status":"ステータス","unsync":"同期されていません","konnector_link":"ここでサービスのリスト全体にアクセスします"},"soon":{"title":"近日登場","description":"この機能はまだご利用できません。 詳細については、 contact@cozycloud.cc までご連絡ください"},"support":{"title":"こんにちは! 何かお手伝いしますか?","emailDetail":"Cozy 設定で保存されたメールアドレスからメッセージが送信されます。","fields":{"message":{"title":"あなたのリクエスト","placeholder":"何でも教えてください (ヘルプを求めたり、フィードバックを共有したり、ちょっと挨拶したり) 私たちはあなたとお話ししたいと思っています。"}},"response_email":{"subject":"あなたのリクエストを受け取りました","body":"こんにちは。\n\n私たちはあなたのサポートリクエストを受け取りました:\n%{message}\n\nできるだけ早くお返事させていただきます。\n\nコージーから、クロード。"},"button":"さあどうぞ!","sending":"送信中...","success":"👏 メッセージを送信しました。ありがとうございます!","error":"メッセージの送信中にエラーが発生しました"},"claudy":{"title":"Cozy をドライブする方法は?","actions":{"desktop":{"title":"コンピュータ内のファイルにアクセスする","description":"コンピュータ上のすべてのファイルを Cozy ドライブに同期させる","button":"デスクトップに Cozy ドライブをインストールする","link":"https://cozy.io/en/download/"},"mobile":{"title":"お使いの携帯から写真をバックアップして同期させる","description":"すべての思い出が Cozy ドライブ上で安全です","button":"Cozy ドライブアプリをモバイルにインストールする","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"即座に請求書を取り出す","description":"Cozy コレクトはすぐにすべてのファイルを整理します","button":"Cozy コレクトを探索"},"support":{"title":"お問い合せ","description":"こんにちは! 何かお手伝いしますか?","emailDetail":"Cozy 設定で保存されたメールアドレスからメッセージが送信されます。","fields":{"message":{"title":"あなたのリクエスト","placeholder":"何でも教えてください (ヘルプを求めたり、フィードバックを共有したり、ちょっと挨拶したり) 私たちはあなたとお話ししたいと思っています。"}},"button":"さあどうぞ!","sending":"送信中...","success":"👏 メッセージを送信しました。ありがとうございます!","error":"メッセージの送信中にエラーが発生しました"}}},"errors":{"noEmailFound":"メールアドレスが見つかりません。 Cozy 設定で追加してからもう一度やり直してください。"}};

/***/ }),

/***/ "BdmE":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSent", function() { return isSent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSending", function() { return isSending; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "error", function() { return error; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ANjH");
/* harmony import */ var actions_email__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("rttf");


var isSent = function isSent() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions_email__WEBPACK_IMPORTED_MODULE_1__["SEND_EMAIL_SUCCESS"]:
      return true;

    case actions_email__WEBPACK_IMPORTED_MODULE_1__["SEND_EMAIL"]:
      return false;

    default:
      return state;
  }
};
var isSending = function isSending() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions_email__WEBPACK_IMPORTED_MODULE_1__["SEND_EMAIL"]:
      return true;

    case actions_email__WEBPACK_IMPORTED_MODULE_1__["SEND_EMAIL_FAILURE"]:
      return false;

    default:
      return state;
  }
};
var error = function error() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions_email__WEBPACK_IMPORTED_MODULE_1__["SEND_EMAIL_FAILURE"]:
      return action.error;

    default:
      return state;
  }
};
var emailStatus = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  isSent: isSent,
  error: error,
  isSending: isSending
});
/* harmony default export */ __webpack_exports__["default"] = (emailStatus);

/***/ }),

/***/ "CCUm":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Elimina il tuo account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Elimina il mio account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Eliminare il tuo Cozy?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"Tutti i tuoi dati verranno rimossi"}},"button":{"cancel":{"label":"Annulla"},"submit":{"label":"Elimina"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Annulla"},"submit":{"label":"Invia"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profilo","activated_services":"Servizi attivi","connected_devices":"Dispositivi connessi","sessions":"Connessioni","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profilo","password":{"title":"Password","show":"Mostra","hide":"Nascondi","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Cambia la tua password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"codice","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "Cp2o":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"u-shake":"u-shake--C0ERx","shake":"shake--3mTST","u-o-100":"u-o-100--h9Zot","u-o-90":"u-o-90--2vZAW","u-o-80":"u-o-80--3asB5","u-o-70":"u-o-70--3mMUL","u-o-60":"u-o-60--1GqMf","u-o-50":"u-o-50--1WQMS","u-o-40":"u-o-40--2Igtc","u-o-30":"u-o-30--328WG","u-o-20":"u-o-20--2fEQ4","u-o-10":"u-o-10--7UsDN","u-o-05":"u-o-05--3iMnx","u-o-025":"u-o-025--3Yi1f","u-o-0":"u-o-0--3Abb9","coz-form-label":"coz-form-label--1MB5-","password-visibility":"password-visibility--3CD-6","password-reset-link":"password-reset-link--2TWQU","coz-form-controls":"coz-form-controls--2INBR","set-field":"set-field--k3D31","set-field-saved":"set-field-saved--1qprf","set-field-input":"set-field-input--2vvCi","saved":"saved--3717T","set-field-checkbox":"set-field-checkbox--3ruTp","set-toggle":"set-toggle--3yzOH","set-field-loading":"set-field-loading--2A1cd","set-field-select":"set-field-select--3SuWY","coz-form-desc":"coz-form-desc--1j4tG","set-field-title":"set-field-title--cX9xs","coz-form-errors":"coz-form-errors--1tEqF","pw-weak":"pw-weak--1CTiA","pw-moderate":"pw-moderate--RO1Ls","pw-strong":"pw-strong--lhH63","coz-form-field-header":"coz-form-field-header--3RfRX","coz-input-group":"coz-input-group--1Pl7y","coz-pwd-input":"coz-pwd-input--NOUP6","coz-input-group-with-strength":"coz-input-group-with-strength--2f5J7","coz-pwd-input-strength":"coz-pwd-input-strength--1ukTe","spin":"spin--3aew2"};

/***/ }),

/***/ "Cz0i":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9At1");


var devices = function devices() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions__WEBPACK_IMPORTED_MODULE_0__["FETCH_DEVICES_SUCCESS"]:
      return action.devices;

    case actions__WEBPACK_IMPORTED_MODULE_0__["DEVICE_REVOKE_SUCCESS"]:
      return state.filter(function (device) {
        return device.id !== action.deviceId;
      });

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (devices);

/***/ }),

/***/ "DDHO":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "DFSm":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "Dah1":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "F+se":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"u-shake":"u-shake--Qafox","shake":"shake--3TvEG","u-o-100":"u-o-100--iS0Bi","u-o-90":"u-o-90--3xr_J","u-o-80":"u-o-80--3T-4-","u-o-70":"u-o-70--3WLva","u-o-60":"u-o-60--CU2J4","u-o-50":"u-o-50--2aHFN","u-o-40":"u-o-40--1OluW","u-o-30":"u-o-30--3TrxN","u-o-20":"u-o-20--2TcwE","u-o-10":"u-o-10--3N8dB","u-o-05":"u-o-05--4JvoJ","u-o-025":"u-o-025--3cche","u-o-0":"u-o-0--N33ZN","coz-table":"coz-table--1cCSC","set-table-name":"set-table-name--3vpGK","set-table-os":"set-table-os--3MvY1","set-table-browser":"set-table-browser--U0Cf8","set-table-activity":"set-table-activity--2Pi79","set-table-permission":"set-table-permission--3nnmW","set-table-actions":"set-table-actions--2AGNc","set-table-ip":"set-table-ip--3mQYS","set-table-date":"set-table-date--23yP0","set-table-devices":"set-table-devices--pDvf2","coz-table-primary":"coz-table-primary--U_fcD","set-table-sessions":"set-table-sessions--21zrs","set-device-laptop":"set-device-laptop--3RSa9","set-device-phone":"set-device-phone--247zP","spin":"spin--3WhAl"};

/***/ }),

/***/ "Fk5t":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "G6th":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntentRedirect", function() { return IntentRedirect; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("eO8H");


var IntentRedirect = function IntentRedirect(_ref) {
  var location = _ref.location;
  var queryString = !!location && location.search;
  var query = queryString && queryString.substring(1).split('&').reduce(function (accumulator, keyValue) {
    var splitted = keyValue.split('=');
    accumulator[splitted[0]] = splitted[1] || true;
    return accumulator;
  }, {});

  if (query.step) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Redirect"], {
      to: "/".concat(query.step)
    });
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Redirect"], {
    to: "/profile"
  });
};
/* harmony default export */ __webpack_exports__["default"] = (IntentRedirect);

/***/ }),

/***/ "HbXj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("eO8H");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_ButtonAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("8+bQ");
/* harmony import */ var cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("V2U0");
/* harmony import */ var cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("cLsY");
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("J+JL");
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(styles_view__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var styles_fields__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("Cp2o");
/* harmony import */ var styles_fields__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(styles_fields__WEBPACK_IMPORTED_MODULE_7__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* global cozy */









var ExportDownload =
/*#__PURE__*/
function (_Component) {
  _inherits(ExportDownload, _Component);

  function ExportDownload(props) {
    var _this;

    _classCallCheck(this, ExportDownload);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ExportDownload).call(this, props));
    props.fetchExportData();
    return _this;
  }

  _createClass(ExportDownload, [{
    key: "download",
    value: function download(cursor) {
      var exportId = this.props.exportId;
      var dataUrl = "".concat(cozy.client._url, "/move/exports/data/").concat(exportId);
      var url = cursor ? "".concat(dataUrl, "?cursor=").concat(cursor) : dataUrl;
      this.downloadFrame.src = url;
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      var _this$props = this.props,
          history = _this$props.history,
          parent = _this$props.parent;
      history.push(parent);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          t = _this$props2.t,
          exportData = _this$props2.exportData;
      var exportDoc = exportData && exportData.data && exportData.data.attributes;
      var cursors = exportDoc && exportDoc.parts_cursors;
      var firstElementName = cursors && cursors.length ? t('ProfileView.export.download.CTA_part', {
        number: 0
      }) : t('ProfileView.export.download.CTA');
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_5__["default"], {
        className: styles_view__WEBPACK_IMPORTED_MODULE_6___default.a['set-export-modal'],
        secondaryAction: function secondaryAction() {
          return _this2.closeModal();
        },
        mobileFullscreen: true
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_5__["ModalHeader"], {
        className: "u-ta-center"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: styles_view__WEBPACK_IMPORTED_MODULE_6___default.a['set-export-modal-title']
      }, t('ProfileView.export.download.title'))), exportData.isFetching ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_4__["default"], {
        className: styles_view__WEBPACK_IMPORTED_MODULE_6___default.a['set-export-modal-spinner'],
        size: "xlarge"
      }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("iframe", {
        style: {
          display: 'none'
        },
        ref: function ref(frame) {
          _this2.downloadFrame = frame;
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_5__["ModalDescription"], null, exportData.error ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: styles_fields__WEBPACK_IMPORTED_MODULE_7___default.a['coz-form-errors']
      }, t(exportData.error)) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, t('ProfileView.export.download.description'), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_ButtonAction__WEBPACK_IMPORTED_MODULE_3__["default"], {
        className: styles_view__WEBPACK_IMPORTED_MODULE_6___default.a['set-export-modal-action'],
        label: firstElementName,
        rightIcon: "download",
        onClick: function onClick() {
          return _this2.download();
        }
      }), cursors && cursors.length && cursors.map(function (cursor, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_ButtonAction__WEBPACK_IMPORTED_MODULE_3__["default"], {
          className: styles_view__WEBPACK_IMPORTED_MODULE_6___default.a['set-export-modal-action'],
          label: t('ProfileView.export.download.CTA_part', {
            number: index + 1
          }),
          rightIcon: "download",
          onClick: function onClick() {
            return _this2.download(cursor);
          },
          key: index
        });
      })))));
    }
  }]);

  return ExportDownload;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__["translate"])()(Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["withRouter"])(ExportDownload)));

/***/ }),

/***/ "HrnS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9At1");


var deviceToRevoke = function deviceToRevoke() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions__WEBPACK_IMPORTED_MODULE_0__["DEVICES_MODALE_REVOKE_OPEN"]:
      return action.device;

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (deviceToRevoke);

/***/ }),

/***/ "IWMv":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"set-storage-bar":"set-storage-bar--1scwE","set-bar-percent":"set-bar-percent--2Jw77","--dark":"_--dark--3caWz","set-offer-button":"set-offer-button--2Y1jZ"};

/***/ }),

/***/ "IarV":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "J+JL":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"u-shake":"u-shake--2Zs4H","shake":"shake--3FF3_","u-o-100":"u-o-100--1RfhY","u-o-90":"u-o-90--1GaY4","u-o-80":"u-o-80--1OH5N","u-o-70":"u-o-70--3rJB7","u-o-60":"u-o-60--1Jw5A","u-o-50":"u-o-50--2xWZp","u-o-40":"u-o-40--3rijP","u-o-30":"u-o-30--2rUHU","u-o-20":"u-o-20--Z8p2m","u-o-10":"u-o-10--2EIE2","u-o-05":"u-o-05--1JYeX","u-o-025":"u-o-025--3CqeN","u-o-0":"u-o-0--2EFuE","set-view-content":"set-view-content--2Ikhu","set-view-title":"set-view-title--1vZWW","set-view-subtitle":"set-view-subtitle--1eHcQ","set-view-content-twofa-modal-wrapper":"set-view-content-twofa-modal-wrapper--3qq69","set-view-content-twofa-modal-content":"set-view-content-twofa-modal-content--d9LVp","set-view-content-twofa-modal-content-button":"set-view-content-twofa-modal-content-button--2mFk-","set-view-section":"set-view-section--1ETyU","set-view-section-label":"set-view-section-label--2CdNR","set-view-section-link":"set-view-section-link--3N-af","set-view-content--narrow":"set-view-content--narrow--3LSmw","devices-view":"devices-view--tfaEn","set-view-content-twofa-modal-confirmation-input":"set-view-content-twofa-modal-confirmation-input--3v3sY","set-view-content-twofa-modal-nocode":"set-view-content-twofa-modal-nocode--L_Y7e","set-view-content-twofa-modal-content-right-buttons":"set-view-content-twofa-modal-content-right-buttons--3UlDO","set-view-content-twofa-point":"set-view-content-twofa-point--5BN4R","set-view-content-twofa-point-image":"set-view-content-twofa-point-image--11CFQ","coz-btn--revoke":"coz-btn--revoke--3YpJz","set-export-modal":"set-export-modal--3DYDI","set-export-modal-spinner":"set-export-modal-spinner--18hTB","set-export-modal-image":"set-export-modal-image--3g3ea","set-export-modal-description":"set-export-modal-description--2R_Bu","set-export-modal-action":"set-export-modal-action--1fUGX","set-export-modal-footer":"set-export-modal-footer--hUzov","spin":"spin--2VTNr"};

/***/ }),

/***/ "JAnA":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LanguageSection", function() { return LanguageSection; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("buk/");
/* harmony import */ var components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("4DAK");
/* harmony import */ var components_Select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("r0LA");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(Object(source)); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var LANG_OPTIONS = ['en', 'fr', 'es'];
var LanguageSection =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(LanguageSection, _PureComponent);

  function LanguageSection() {
    _classCallCheck(this, LanguageSection);

    return _possibleConstructorReturn(this, _getPrototypeOf(LanguageSection).apply(this, arguments));
  }

  _createClass(LanguageSection, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          fields = _this$props.fields,
          _onChange = _this$props.onChange,
          t = _this$props.t;

      var fieldProps = _objectSpread({}, fields.locale, {
        title: t('ProfileView.locale.title'),
        label: t("ProfileView.locale.label")
      });

      var selectedLocale = fields.locale.value;
      var fieldName = 'locale';
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Select__WEBPACK_IMPORTED_MODULE_3__["default"], {
        name: fieldName,
        options: LANG_OPTIONS.map(function (lang) {
          return {
            value: lang,
            label: t("ProfileView.locale.".concat(lang))
          };
        }),
        fieldProps: fieldProps,
        value: {
          value: selectedLocale,
          label: t("ProfileView.locale.".concat(selectedLocale), {
            _: ''
          })
        },
        onChange: function onChange(sel) {
          return _onChange(fieldName, sel.value);
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
        source: t('ProfileView.locale.contrib')
      }));
    }
  }]);

  return LanguageSection;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__["translate"])()(LanguageSection));

/***/ }),

/***/ "JhSQ":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "K3H9":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "LEuk":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivationConfirmed", function() { return ActivationConfirmed; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("KXWi");
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("J+JL");
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styles_view__WEBPACK_IMPORTED_MODULE_3__);




var ActivationConfirmed = function ActivationConfirmed(_ref) {
  var t = _ref.t,
      closeTwoFAActivationModal = _ref.closeTwoFAActivationModal,
      instance = _ref.instance,
      cozyDomain = _ref.cozyDomain;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, t('ProfileView.twofa.modal.validation_title')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, t('ProfileView.twofa.modal.validation_description')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, t('ProfileView.twofa.modal.validation_logs')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, instance && instance.data.attributes.email), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, cozyDomain)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles_view__WEBPACK_IMPORTED_MODULE_3___default.a['set-view-content-twofa-modal-content-right-buttons']
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    onClick: closeTwoFAActivationModal,
    label: t('ProfileView.twofa.modal.button.terminate')
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__["translate"])()(ActivationConfirmed));

/***/ }),

/***/ "LiWt":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styles_index_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("/kYV");
/* harmony import */ var styles_index_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styles_index_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("i8i4");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("/MKj");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("ANjH");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("sINF");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("1mXj");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("SH7X");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("buk/");
/* harmony import */ var lib_PiwikHashRouter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("ygPf");
/* harmony import */ var reducers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("cokx");
/* harmony import */ var components_App__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("xYwX");
/* harmony import */ var lib_client__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("7yAG");
/* global __DEVELOPMENT__ */

/* global cozy */













var loggerMiddleware = Object(redux_logger__WEBPACK_IMPORTED_MODULE_6__["createLogger"])(); // Enable Redux dev tools

var composeEnhancers =  true && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux__WEBPACK_IMPORTED_MODULE_4__["compose"];
var middlewares = [redux_thunk__WEBPACK_IMPORTED_MODULE_5__["default"]];
if (true) middlewares.push(loggerMiddleware);
var store = Object(redux__WEBPACK_IMPORTED_MODULE_4__["createStore"])(reducers__WEBPACK_IMPORTED_MODULE_10__["default"], composeEnhancers(redux__WEBPACK_IMPORTED_MODULE_4__["applyMiddleware"].apply(void 0, middlewares)));
var EnhancedI18n = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(function (state) {
  var lang = state.ui.lang;

  try {
    cozy.bar.setLocale && cozy.bar.setLocale(lang);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn("The dict phrases for \"".concat(lang, "\" can't be loaded"));
  }

  return {
    lang: lang
  };
})(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_8__["default"]);
document.addEventListener('DOMContentLoaded', function () {
  var root = document.querySelector('[role=application]');
  var data = root.dataset;
  cozy.client.init({
    cozyURL: '//' + data.cozyDomain,
    token: data.cozyToken
  });
  var protocol = window.location.protocol;
  lib_client__WEBPACK_IMPORTED_MODULE_12__["default"].login({
    uri: "".concat(protocol, "//").concat(data.cozyDomain),
    token: data.cozyToken
  });
  cozy.bar.init({
    cozyClient: lib_client__WEBPACK_IMPORTED_MODULE_12__["default"],
    appName: data.cozyAppName,
    appEditor: data.cozyAppEditor,
    iconPath: data.cozyIconPath,
    lang: data.cozyLocale
  });
  Object(react_dom__WEBPACK_IMPORTED_MODULE_2__["render"])(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_client__WEBPACK_IMPORTED_MODULE_7__["CozyProvider"], {
    client: lib_client__WEBPACK_IMPORTED_MODULE_12__["default"],
    store: store
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"], {
    store: store
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(EnhancedI18n, {
    dictRequire: function dictRequire(lang) {
      return __webpack_require__("/KVF")("./".concat(lang));
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(lib_PiwikHashRouter__WEBPACK_IMPORTED_MODULE_9__["default"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_App__WEBPACK_IMPORTED_MODULE_11__["default"], null))))), root);
});

/***/ }),

/***/ "Lv2T":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"u-shake":"u-shake--2DaE_","shake":"shake--1lCCE","u-o-100":"u-o-100--Tcv89","u-o-90":"u-o-90--26XEs","u-o-80":"u-o-80--22X75","u-o-70":"u-o-70--2HYWt","u-o-60":"u-o-60--3A5CZ","u-o-50":"u-o-50--Y5vca","u-o-40":"u-o-40--9UpRc","u-o-30":"u-o-30--siI50","u-o-20":"u-o-20--1xXSo","u-o-10":"u-o-10--1H1uS","u-o-05":"u-o-05--27Oy4","u-o-025":"u-o-025--35mOy","u-o-0":"u-o-0--2POSS","coz-modal-content":"coz-modal-content--2-5vk","coz-modal-revoke-content":"coz-modal-revoke-content--3djBK","icon-arrows":"icon-arrows--1EZW_","spin":"spin--31blQ"};

/***/ }),

/***/ "MSm8":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "Mpvr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9At1");


var instance = function instance() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions__WEBPACK_IMPORTED_MODULE_0__["FETCH_INFOS_SUCCESS"]:
    case actions__WEBPACK_IMPORTED_MODULE_0__["UPDATE_INFO_SUCCESS"]:
      return action.instance;

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (instance);

/***/ }),

/***/ "NQRv":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "NeM9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_CLAUDY_INFOS", function() { return FETCH_CLAUDY_INFOS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_CLAUDY_INFOS_SUCCESS", function() { return FETCH_CLAUDY_INFOS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_CLAUDY_INFOS_FAILURE", function() { return FETCH_CLAUDY_INFOS_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CREATE_INTENT_SERVICE", function() { return CREATE_INTENT_SERVICE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CREATE_INTENT_SERVICE_SUCCESS", function() { return CREATE_INTENT_SERVICE_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CREATE_INTENT_SERVICE_FAILURE", function() { return CREATE_INTENT_SERVICE_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACCOUNTS_DOCTYPE", function() { return ACCOUNTS_DOCTYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createIntentService", function() { return createIntentService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchClaudyInfos", function() { return fetchClaudyInfos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "consolidateClaudyActionsInfos", function() { return consolidateClaudyActionsInfos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllAccounts", function() { return getAllAccounts; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var config_claudyActions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("zvm5");
var config_claudyActions__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t("zvm5", 1);
/* harmony import */ var actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("9At1");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* global cozy */


var FETCH_CLAUDY_INFOS = 'FETCH_CLAUDY_INFOS';
var FETCH_CLAUDY_INFOS_SUCCESS = 'FETCH_CLAUDY_INFOS_SUCCESS';
var FETCH_CLAUDY_INFOS_FAILURE = 'FETCH_CLAUDY_INFOS_FAILURE';
var CREATE_INTENT_SERVICE = 'CREATE_INTENT_SERVICE';
var CREATE_INTENT_SERVICE_SUCCESS = 'CREATE_INTENT_SERVICE_SUCCESS';
var CREATE_INTENT_SERVICE_FAILURE = 'CREATE_INTENT_SERVICE_FAILURE';
var ACCOUNTS_DOCTYPE = 'io.cozy.accounts';
var createIntentService = function createIntentService(intent, window) {
  return function (dispatch) {
    dispatch({
      type: CREATE_INTENT_SERVICE
    });
    cozy.client.intents.createService(intent, window).then(function (service) {
      dispatch({
        type: CREATE_INTENT_SERVICE_SUCCESS,
        service: service
      });
    }).catch(function (error) {
      dispatch({
        type: CREATE_INTENT_SERVICE_FAILURE,
        error: error
      });
    });
  };
};
var fetchClaudyInfos = function fetchClaudyInfos() {
  return function (dispatch) {
    dispatch({
      type: FETCH_CLAUDY_INFOS
    });
    Object(actions__WEBPACK_IMPORTED_MODULE_2__["cozyFetch"])('GET', '/settings/context').then(function (context) {
      var contextActions = context.data && context.data.attributes && context.data.attributes['claudy_actions'] || null;
      var claudyActions = [];

      if (contextActions) {
        // get an arrays of action
        claudyActions = contextActions.map(function (slug) {
          if (config_claudyActions__WEBPACK_IMPORTED_MODULE_1__.hasOwnProperty(slug)) {
            // adding also the action slug
            return Object.assign({}, config_claudyActions__WEBPACK_IMPORTED_MODULE_1__[slug], {
              slug: slug
            });
          }
        }).filter(function (action) {
          return action;
        });
      }

      dispatch(consolidateClaudyActionsInfos(claudyActions));
    }).catch(function (error) {
      dispatch({
        type: FETCH_CLAUDY_INFOS_FAILURE,
        error: error
      });
    });
  };
};
var consolidateClaudyActionsInfos = function consolidateClaudyActionsInfos(claudyActions) {
  var ACTIONS_WITH_DEVICES = ['desktop', 'mobile'];
  var ACTIONS_WITH_ACCOUNTS = ['gather'];
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(dispatch) {
        var apps, accounts, appsResponse;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                apps = [];
                accounts = []; // if at least one action requires app links

                if (!claudyActions.find(function (a) {
                  return a.link && a.link.type === 'apps';
                })) {
                  _context.next = 14;
                  break;
                }

                _context.prev = 3;
                _context.next = 6;
                return Object(actions__WEBPACK_IMPORTED_MODULE_2__["cozyFetch"])('GET', '/apps/');

              case 6:
                appsResponse = _context.sent;
                apps = appsResponse.data;
                _context.next = 14;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](3);
                // eslint-disable-next-line no-console
                console.warn && // eslint-disable-next-line no-console
                console.warn('Cannot fetch client devices infos for Claudy.');
                apps = []; // keep list empty if apps cannot be fetched

              case 14:
                if (!claudyActions.find(function (a) {
                  return ACTIONS_WITH_DEVICES.includes(a.slug);
                })) {
                  _context.next = 17;
                  break;
                }

                _context.next = 17;
                return dispatch(Object(actions__WEBPACK_IMPORTED_MODULE_2__["fetchDevices"])());

              case 17:
                if (!claudyActions.find(function (a) {
                  return ACTIONS_WITH_ACCOUNTS.includes(a.slug);
                })) {
                  _context.next = 28;
                  break;
                }

                _context.prev = 18;
                _context.next = 21;
                return getAllAccounts();

              case 21:
                accounts = _context.sent;
                _context.next = 28;
                break;

              case 24:
                _context.prev = 24;
                _context.t1 = _context["catch"](18);
                // eslint-disable-next-line no-console
                // eslint-disable-next-line no-console
                console.warn && console.warn('Cannot fetch accounts infos for Claudy.');
                accounts = []; // keep list empty if apps cannot be fetched

              case 28:
                dispatch({
                  type: FETCH_CLAUDY_INFOS_SUCCESS,
                  claudyActions: claudyActions,
                  apps: apps,
                  accounts: accounts
                });

              case 29:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 10], [18, 24]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};
function getAllAccounts() {
  return cozy.client.data.findAll(ACCOUNTS_DOCTYPE).then(function (accountsMap) {
    return Object.values(accountsMap);
  });
}

/***/ }),

/***/ "OL7+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4BeY");
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("IaFt");
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-globe_0e781bc1cee9c9c9de11c1037de16a7a",
  "use": "icon-globe_0e781bc1cee9c9c9de11c1037de16a7a-usage",
  "viewBox": "0 0 16 16",
  "content": "<symbol viewBox=\"0 0 16 16\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" id=\"icon-globe_0e781bc1cee9c9c9de11c1037de16a7a\">\n    <path d=\"M7.88866394,13.9989877 L7,10 L6,9 L4,6 L3.64539075,3.87234452 C2.62559227,4.94785733 2,6.40087117 2,8 C2,11.2765166 4.62632955,13.9396208 7.88866394,13.9989877 Z M8.12663738,2.00130991 L10,3.5 L10,5 L8,6.5 L6.5,7.5 L7,8.5 L10,9 L11,10 L11,11.5 L9.45110858,13.8233371 C12.0637207,13.1744316 14,10.8133371 14,8 C14,4.72860754 11.3818787,2.06871043 8.12663738,2.00130991 Z M8,16 C3.58172178,16 0,12.4182782 0,8 C0,3.58172178 3.58172178,0 8,0 C12.4182782,0 16,3.58172178 16,8 C16,12.4182782 12.4182782,16 8,16 Z\" id=\"icon-globe_0e781bc1cee9c9c9de11c1037de16a7a_path-1\" />\n</symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "OiH8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ANjH");
/* harmony import */ var actions_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("TeUT");



var submitting = function submitting() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions_export__WEBPACK_IMPORTED_MODULE_1__["REQUEST_EXPORT"]:
      return true;

    case actions_export__WEBPACK_IMPORTED_MODULE_1__["REQUEST_EXPORT_FAILURE"]:
    case actions_export__WEBPACK_IMPORTED_MODULE_1__["REQUEST_EXPORT_SUCCESS"]:
      return false;

    default:
      return state;
  }
};

var isFetching = function isFetching() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions_export__WEBPACK_IMPORTED_MODULE_1__["FETCH_EXPORT_DATA"]:
      return true;

    case actions_export__WEBPACK_IMPORTED_MODULE_1__["FETCH_EXPORT_DATA_FAILURE"]:
    case actions_export__WEBPACK_IMPORTED_MODULE_1__["FETCH_EXPORT_DATA_SUCCESS"]:
      return false;

    default:
      return state;
  }
};

var data = function data() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions_export__WEBPACK_IMPORTED_MODULE_1__["FETCH_EXPORT_DATA"]:
      return {};

    case actions_export__WEBPACK_IMPORTED_MODULE_1__["FETCH_EXPORT_DATA_SUCCESS"]:
      return action.data;

    default:
      return state;
  }
};

var error = function error() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions_export__WEBPACK_IMPORTED_MODULE_1__["REQUEST_EXPORT"]:
    case actions_export__WEBPACK_IMPORTED_MODULE_1__["FETCH_EXPORT_DATA"]:
    case actions_export__WEBPACK_IMPORTED_MODULE_1__["REQUEST_EXPORT_SUCCESS"]:
    case actions_export__WEBPACK_IMPORTED_MODULE_1__["FETCH_EXPORT_DATA_SUCCESS"]:
      return null;

    case actions_export__WEBPACK_IMPORTED_MODULE_1__["REQUEST_EXPORT_FAILURE"]:
    case actions_export__WEBPACK_IMPORTED_MODULE_1__["FETCH_EXPORT_DATA_FAILURE"]:
      return action.error;

    default:
      return state;
  }
};

var exportReducer = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  submitting: submitting,
  isFetching: isFetching,
  data: data,
  error: error
});
/* harmony default export */ __webpack_exports__["default"] = (exportReducer);

/***/ }),

/***/ "P/VH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4BeY");
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("IaFt");
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-phone_ad89ff0237dcba75388faea90b2aa496",
  "use": "icon-phone_ad89ff0237dcba75388faea90b2aa496-usage",
  "viewBox": "0 0 16 16",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" id=\"icon-phone_ad89ff0237dcba75388faea90b2aa496\">\n  <path fill-rule=\"evenodd\" d=\"M162,65.0008717 C162,64.4481055 162.455761,64 163.002473,64 L172.997527,64 C173.551177,64 174,64.4446309 174,65.0008717 L174,78.9991283 C174,79.5518945 173.544239,80 172.997527,80 L163.002473,80 C162.448823,80 162,79.5553691 162,78.9991283 L162,65.0008717 Z M164,66 L172,66 L172,76 L164,76 L164,66 Z M168,79 C168.552285,79 169,78.5522847 169,78 C169,77.4477153 168.552285,77 168,77 C167.447715,77 167,77.4477153 167,78 C167,78.5522847 167.447715,79 168,79 Z\" transform=\"translate(-160 -64)\" />\n</symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "PQxa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("/MKj");
/* harmony import */ var actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("9At1");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Alerter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("67rm");
/* harmony import */ var components_SessionsView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("2ahd");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }







var mapStateToProps = function mapStateToProps(state) {
  return {
    sessions: state.sessions,
    isFetching: state.ui.isFetching
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchSessions: function fetchSessions() {
      var t = ownProps.t;
      dispatch(Object(actions__WEBPACK_IMPORTED_MODULE_2__["fetchSessions"])()).catch(function () {
        return cozy_ui_react_Alerter__WEBPACK_IMPORTED_MODULE_4__["default"].error(t('SessionsView.infos.server_error'));
      });
    },
    deleteOtherSessions: function () {
      var _deleteOtherSessions2 = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var t;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                t = ownProps.t;
                _context.prev = 1;
                _context.next = 4;
                return dispatch(Object(actions__WEBPACK_IMPORTED_MODULE_2__["deleteOtherSessions"])());

              case 4:
                cozy_ui_react_Alerter__WEBPACK_IMPORTED_MODULE_4__["default"].success(t('SessionsView.infos.sessions_deleted'));
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](1);
                cozy_ui_react_Alerter__WEBPACK_IMPORTED_MODULE_4__["default"].error(t('SessionsView.infos.server_error'));

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 7]]);
      }));

      function deleteOtherSessions() {
        return _deleteOtherSessions2.apply(this, arguments);
      }

      return deleteOtherSessions;
    }()
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_3__["translate"])()(Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(components_SessionsView__WEBPACK_IMPORTED_MODULE_5__["default"])));

/***/ }),

/***/ "PTEk":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("/MKj");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Alerter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("67rm");
/* harmony import */ var actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("9At1");
/* harmony import */ var actions_twoFactor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("jYLR");
/* harmony import */ var actions_export__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("TeUT");
/* harmony import */ var components_ProfileView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("/Jse");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }









var mapStateToProps = function mapStateToProps(state) {
  return {
    fields: state.fields,
    passphrase: state.passphrase,
    instance: state.instance,
    twoFactor: state.twoFactor,
    exportData: state.exportData,
    isFetching: state.ui.isFetching
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchInfos: function fetchInfos() {
      return dispatch(Object(actions__WEBPACK_IMPORTED_MODULE_4__["fetchInfos"])());
    },
    onFieldChange: function onFieldChange(field, value) {
      dispatch(Object(actions__WEBPACK_IMPORTED_MODULE_4__["updateInfo"])(field, value));
    },
    updateInfo: function updateInfo(field, value) {
      dispatch(Object(actions__WEBPACK_IMPORTED_MODULE_4__["updateInfo"])(field, value));
    },
    requestExport: function () {
      var _requestExport2 = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return dispatch(Object(actions_export__WEBPACK_IMPORTED_MODULE_6__["requestExport"])());

              case 3:
                cozy_ui_react_Alerter__WEBPACK_IMPORTED_MODULE_3__["default"].success(ownProps.t('ProfileView.export.success'));
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                // eslint-disable-next-line no-console
                console.error(_context.t0);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 6]]);
      }));

      function requestExport() {
        return _requestExport2.apply(this, arguments);
      }

      return requestExport;
    }(),
    fetchExportData: function fetchExportData(exportId) {
      dispatch(Object(actions_export__WEBPACK_IMPORTED_MODULE_6__["fetchExportData"])(exportId));
    },
    cancel2FAActivation: function cancel2FAActivation() {
      dispatch(Object(actions_twoFactor__WEBPACK_IMPORTED_MODULE_5__["cancel2FAActivation"])());
    },
    checkTwoFactorCode: function checkTwoFactorCode(value, mode) {
      dispatch(Object(actions_twoFactor__WEBPACK_IMPORTED_MODULE_5__["checkTwoFactorCode"])(value, mode));
    },
    activate2FA: function activate2FA(mode) {
      dispatch(Object(actions_twoFactor__WEBPACK_IMPORTED_MODULE_5__["activate2FA"])(mode));
    },
    desactivate2FA: function desactivate2FA(mode) {
      dispatch(Object(actions_twoFactor__WEBPACK_IMPORTED_MODULE_5__["desactivate2FA"])(mode));
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__["translate"])()(Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(components_ProfileView__WEBPACK_IMPORTED_MODULE_7__["default"])));

/***/ }),

/***/ "Pana":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "PsWn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteAccount", function() { return DeleteAccount; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Alerter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("67rm");
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("KXWi");
/* harmony import */ var components_DeleteAccount_ConfirmModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("jOXx");
/* harmony import */ var components_DeleteAccount_FormModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("2c5B");
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("J+JL");
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(styles_view__WEBPACK_IMPORTED_MODULE_6__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable */







var CONFIRMING = 'confirming';
var IDLE = 'idle';
var REQUESTING = 'requesting';
var DeleteAccount =
/*#__PURE__*/
function (_Component) {
  _inherits(DeleteAccount, _Component);

  function DeleteAccount() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DeleteAccount);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DeleteAccount)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      status: IDLE
    });

    _defineProperty(_assertThisInitialized(_this), "cancel", function () {
      var status = _this.state.status;

      _this.setStatus(IDLE);
    });

    _defineProperty(_assertThisInitialized(_this), "confirm", function () {
      return _this.setStatus(CONFIRMING);
    });

    _defineProperty(_assertThisInitialized(_this), "request", function () {
      return _this.setStatus(REQUESTING);
    });

    _defineProperty(_assertThisInitialized(_this), "setStatus", function (status) {
      return _this.setState({
        status: status
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onError", function (error) {
      var t = _this.props.t;

      _this.setStatus(IDLE);

      console.error(error.message);
      cozy_ui_react_Alerter__WEBPACK_IMPORTED_MODULE_2__["default"].error(t('DeleteAccount.error.message'));
    });

    _defineProperty(_assertThisInitialized(_this), "onRequested", function () {
      var t = _this.props.t;

      _this.setStatus(IDLE);

      cozy_ui_react_Alerter__WEBPACK_IMPORTED_MODULE_2__["default"].success(t('DeleteAccount.success.message'));
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var t = _this.props.t;
      var status = _this.state.status;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, status === CONFIRMING && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_DeleteAccount_ConfirmModal__WEBPACK_IMPORTED_MODULE_4__["default"], {
        dismissAction: _this.cancel,
        primaryAction: _this.request
      }), status === REQUESTING && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_DeleteAccount_FormModal__WEBPACK_IMPORTED_MODULE_5__["default"], {
        dismissAction: _this.cancel,
        onError: _this.onError,
        onSuccess: _this.onRequested
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles_view__WEBPACK_IMPORTED_MODULE_6___default.a['set-view-section']
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, t('DeleteAccount.title')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: styles_view__WEBPACK_IMPORTED_MODULE_6___default.a['set-view-section-label']
      }, t('DeleteAccount.label')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "u-mt-1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
        busy: status === REQUESTING,
        disabled: status !== IDLE,
        extension: "full",
        label: t('DeleteAccount.button.label'),
        onClick: _this.confirm,
        theme: "danger-outline"
      }))));
    });

    return _this;
  }

  return DeleteAccount;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__["translate"])()(DeleteAccount));

/***/ }),

/***/ "QPVV":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styles_table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("F+se");
/* harmony import */ var styles_table__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styles_table__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("J+JL");
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styles_view__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styles_devices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("xqCr");
/* harmony import */ var styles_devices__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styles_devices__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("V2U0");
/* harmony import */ var cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("7YkG");
/* harmony import */ var components_NoDevicesMessage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("QQH1");
/* harmony import */ var components_DevicesModaleRevokeView__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("5hTT");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










 // for the icon, we show a phone if it's a phone, and a laptop in all other cases

var getDeviceKindClass = function getDeviceKindClass(kind) {
  return kind === 'mobile' ? styles_table__WEBPACK_IMPORTED_MODULE_0___default.a['set-device-phone'] : styles_table__WEBPACK_IMPORTED_MODULE_0___default.a['set-device-laptop'];
};

var DevicesView =
/*#__PURE__*/
function (_Component) {
  _inherits(DevicesView, _Component);

  function DevicesView() {
    _classCallCheck(this, DevicesView);

    return _possibleConstructorReturn(this, _getPrototypeOf(DevicesView).apply(this, arguments));
  }

  _createClass(DevicesView, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.props.fetchDevices();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          t = _this$props.t,
          f = _this$props.f,
          isFetching = _this$props.isFetching,
          devices = _this$props.devices,
          openDeviceRevokeModale = _this$props.openDeviceRevokeModale,
          deviceToRevoke = _this$props.deviceToRevoke,
          onDeviceModaleRevoke = _this$props.onDeviceModaleRevoke,
          onDeviceModaleRevokeClose = _this$props.onDeviceModaleRevokeClose,
          devicePerformRevoke = _this$props.devicePerformRevoke;
      return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
        role: "contentinfo",
        className: styles_devices__WEBPACK_IMPORTED_MODULE_2___default.a['devices-view']
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("h2", {
        className: styles_view__WEBPACK_IMPORTED_MODULE_1___default.a['set-view-title']
      }, t('DevicesView.title')), isFetching && react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_6__["default"], {
        className: 'u-pos-fixed-s',
        middle: true,
        size: "xxlarge",
        loadingType: t('Loading.loading')
      }), !isFetching && devices.length === 0 && react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(components_NoDevicesMessage__WEBPACK_IMPORTED_MODULE_8__["default"], null), !isFetching && devices.length > 0 && react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_7__["Table"], {
        className: styles_table__WEBPACK_IMPORTED_MODULE_0___default.a['coz-table']
      }, openDeviceRevokeModale && react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(components_DevicesModaleRevokeView__WEBPACK_IMPORTED_MODULE_9__["default"], {
        cancelAction: onDeviceModaleRevokeClose,
        revokeDevice: devicePerformRevoke,
        device: deviceToRevoke
      }), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_7__["TableHead"], null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_7__["TableRow"], null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_7__["TableHeader"], {
        className: styles_table__WEBPACK_IMPORTED_MODULE_0___default.a['set-table-name']
      }, t('DevicesView.head_name')), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_7__["TableHeader"], {
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(styles_table__WEBPACK_IMPORTED_MODULE_0___default.a['coz-table-header'], styles_table__WEBPACK_IMPORTED_MODULE_0___default.a['set-table-date'])
      }, t('DevicesView.head_sync')), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_7__["TableHeader"], {
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(styles_table__WEBPACK_IMPORTED_MODULE_0___default.a['coz-table-header'], styles_table__WEBPACK_IMPORTED_MODULE_0___default.a['set-table-actions'])
      }, t('DevicesView.head_actions')))), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_7__["TableBody"], {
        className: styles_table__WEBPACK_IMPORTED_MODULE_0___default.a['set-table-devices']
      }, devices.map(function (device) {
        return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_7__["TableRow"], {
          key: device.id
        }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_7__["TableCell"], {
          className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(styles_table__WEBPACK_IMPORTED_MODULE_0___default.a['set-table-name'], styles_table__WEBPACK_IMPORTED_MODULE_0___default.a['coz-table-primary'], getDeviceKindClass(device.client_kind))
        }, device.client_name), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_7__["TableCell"], {
          className: styles_table__WEBPACK_IMPORTED_MODULE_0___default.a['set-table-date']
        }, device.synchronized_at ? f(device.synchronized_at, t('DevicesView.sync_date_format')) : '-'), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_7__["TableCell"], {
          className: styles_table__WEBPACK_IMPORTED_MODULE_0___default.a['set-table-actions']
        }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("button", {
          className: styles_devices__WEBPACK_IMPORTED_MODULE_2___default.a['coz-btn--revoke'],
          onClick: function onClick() {
            onDeviceModaleRevoke(device);
          }
        }, t('DevicesView.revoke'))));
      }))));
    }
  }]);

  return DevicesView;
}(react__WEBPACK_IMPORTED_MODULE_4__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_5__["translate"])()(DevicesView));

/***/ }),

/***/ "QQH1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoDevicesMessage", function() { return NoDevicesMessage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cozy_ui_react_Empty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("GoJ1");
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("KXWi");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("buk/");
/* harmony import */ var assets_icons_icon_devices_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("gwEM");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var NoDevicesMessage =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(NoDevicesMessage, _PureComponent);

  function NoDevicesMessage() {
    _classCallCheck(this, NoDevicesMessage);

    return _possibleConstructorReturn(this, _getPrototypeOf(NoDevicesMessage).apply(this, arguments));
  }

  _createClass(NoDevicesMessage, [{
    key: "render",
    value: function render() {
      var t = this.props.t;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Empty__WEBPACK_IMPORTED_MODULE_2__["default"], {
        icon: assets_icons_icon_devices_svg__WEBPACK_IMPORTED_MODULE_5__["default"],
        title: t('Empty.devices.title'),
        text: t('Empty.devices.text')
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_3__["ButtonLink"], {
        href: t('Empty.devices.link.href'),
        label: t('Empty.devices.link.text')
      }));
    }
  }]);

  return NoDevicesMessage;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);
NoDevicesMessage.propTypes = {
  t: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_4__["translate"])()(NoDevicesMessage));

/***/ }),

/***/ "ScGk":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actions", function() { return actions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "apps", function() { return apps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "accounts", function() { return accounts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "devices", function() { return devices; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "error", function() { return error; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFetching", function() { return isFetching; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ANjH");
/* harmony import */ var actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("9At1");
/* harmony import */ var actions_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("NeM9");



var actions = function actions() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions_services__WEBPACK_IMPORTED_MODULE_2__["FETCH_CLAUDY_INFOS_SUCCESS"]:
      return action.claudyActions;

    default:
      return state;
  }
};
var apps = function apps() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions_services__WEBPACK_IMPORTED_MODULE_2__["FETCH_CLAUDY_INFOS_SUCCESS"]:
      return action.apps;

    default:
      return state;
  }
};
var accounts = function accounts() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions_services__WEBPACK_IMPORTED_MODULE_2__["FETCH_CLAUDY_INFOS_SUCCESS"]:
      return action.accounts;

    default:
      return state;
  }
};
var devices = function devices() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions__WEBPACK_IMPORTED_MODULE_1__["FETCH_DEVICES_SUCCESS"]:
      return action.devices;

    default:
      return state;
  }
};
var error = function error() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions_services__WEBPACK_IMPORTED_MODULE_2__["FETCH_CLAUDY_INFOS_FAILURE"]:
      return action.error;

    default:
      return state;
  }
};
var isFetching = function isFetching() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions_services__WEBPACK_IMPORTED_MODULE_2__["FETCH_CLAUDY_INFOS"]:
      return true;

    default:
      return state;
  }
};
var claudy = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  actions: actions,
  apps: apps,
  accounts: accounts,
  devices: devices,
  error: error,
  isFetching: isFetching
});
/* harmony default export */ __webpack_exports__["default"] = (claudy);

/***/ }),

/***/ "TFsx":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "TN2E":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Desactivate2FA", function() { return Desactivate2FA; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("KXWi");
/* harmony import */ var cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("cLsY");
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("J+JL");
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styles_view__WEBPACK_IMPORTED_MODULE_4__);





var Desactivate2FA = function Desactivate2FA(_ref) {
  var t = _ref.t,
      desactivate2FA = _ref.desactivate2FA,
      closeTwoFADesactivationModal = _ref.closeTwoFADesactivationModal;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles_view__WEBPACK_IMPORTED_MODULE_4___default.a['set-view-content-twofa-modal-wrapper']
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_3__["default"], {
    dismissAction: closeTwoFADesactivationModal,
    className: styles_view__WEBPACK_IMPORTED_MODULE_4___default.a['set-view-content-twofa-modal'],
    title: t('ProfileView.twofa.title.desactivate')
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_3__["ModalContent"], {
    className: styles_view__WEBPACK_IMPORTED_MODULE_4___default.a['set-view-content-twofa-modal-content']
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, t('ProfileView.twofa.modal.desactivate_title'))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, t('ProfileView.twofa.modal.desactivate_description')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles_view__WEBPACK_IMPORTED_MODULE_4___default.a['set-view-content-twofa-modal-content-right-buttons']
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    onClick: closeTwoFADesactivationModal,
    theme: "secondary",
    label: t('ProfileView.twofa.modal.button.cancel')
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    onClick: desactivate2FA,
    theme: "danger",
    label: t('ProfileView.twofa.modal.button.desactivate')
  }))))));
};
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__["translate"])()(Desactivate2FA));

/***/ }),

/***/ "TeUT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_EXPORT", function() { return REQUEST_EXPORT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_EXPORT_FAILURE", function() { return REQUEST_EXPORT_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_EXPORT_SUCCESS", function() { return REQUEST_EXPORT_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_EXPORT_DATA", function() { return FETCH_EXPORT_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_EXPORT_DATA_FAILURE", function() { return FETCH_EXPORT_DATA_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_EXPORT_DATA_SUCCESS", function() { return FETCH_EXPORT_DATA_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestExport", function() { return requestExport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchExportData", function() { return fetchExportData; });
/* harmony import */ var actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9At1");

var REQUEST_EXPORT = 'REQUEST_EXPORT';
var REQUEST_EXPORT_FAILURE = 'REQUEST_EXPORT_FAILURE';
var REQUEST_EXPORT_SUCCESS = 'REQUEST_EXPORT_SUCCESS';
var FETCH_EXPORT_DATA = 'FETCH_EXPORT_DATA';
var FETCH_EXPORT_DATA_FAILURE = 'FETCH_EXPORT_DATA_FAILURE';
var FETCH_EXPORT_DATA_SUCCESS = 'FETCH_EXPORT_DATA_SUCCESS';
var requestExport = function requestExport() {
  return function (dispatch) {
    dispatch({
      type: REQUEST_EXPORT
    }); //  we have to send a body due to the JsonAPI

    return Object(actions__WEBPACK_IMPORTED_MODULE_0__["cozyFetch"])('POST', '/move/exports', {
      data: {
        attributes: {}
      }
    }).then(function () {
      dispatch({
        type: REQUEST_EXPORT_SUCCESS
      });
    }).catch(function () {
      dispatch({
        type: REQUEST_EXPORT_FAILURE,
        error: 'ProfileView.export.server_error'
      });
    });
  };
};
var fetchExportData = function fetchExportData(exportId) {
  return function (dispatch) {
    dispatch({
      type: FETCH_EXPORT_DATA
    });
    return Object(actions__WEBPACK_IMPORTED_MODULE_0__["cozyFetch"])('GET', "/move/exports/".concat(exportId)).then(function (resp) {
      dispatch({
        type: FETCH_EXPORT_DATA_SUCCESS,
        data: resp.data
      });
    }).catch(function (error) {
      dispatch({
        type: FETCH_EXPORT_DATA_FAILURE,
        error: 'ProfileView.export.fetch_error'
      });
      throw error;
    });
  };
};

/***/ }),

/***/ "TgM4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivationConfirmation", function() { return ActivationConfirmation; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("KXWi");
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("J+JL");
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styles_view__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styles_fields__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("Cp2o");
/* harmony import */ var styles_fields__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styles_fields__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("4DAK");






var ActivationConfirmation = function ActivationConfirmation(_ref) {
  var t = _ref.t,
      activate2FA = _ref.activate2FA,
      images = _ref.images,
      twoFactor = _ref.twoFactor;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    alt: t('ProfileView.twofa.title.activate'),
    src: images.twoFaModalBanner
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, t('ProfileView.twofa.modal.protect')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_5__["default"], {
    source: t('ProfileView.twofa.modal.change', {
      link: 'https://support.cozy.io/article/114-doubleauthentification'
    })
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles_view__WEBPACK_IMPORTED_MODULE_3___default.a['set-view-content-twofa']
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles_view__WEBPACK_IMPORTED_MODULE_3___default.a['set-view-content-twofa-point']
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    className: styles_view__WEBPACK_IMPORTED_MODULE_3___default.a['set-view-content-twofa-point-image'],
    alt: "{t('ProfileView.twofa.modal.secu_title')}",
    src: images.twoFaModalSecu
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, t('ProfileView.twofa.modal.secu_title')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, t('ProfileView.twofa.modal.secu_description')))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles_view__WEBPACK_IMPORTED_MODULE_3___default.a['set-view-content-twofa-point']
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    className: styles_view__WEBPACK_IMPORTED_MODULE_3___default.a['set-view-content-twofa-point-image'],
    alt: "{t('ProfileView.twofa.modal.protect_title')}",
    src: images.twoFaModalProtect
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, t('ProfileView.twofa.modal.protect_title')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, t('ProfileView.twofa.modal.protect_description'))))), twoFactor.error && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: styles_fields__WEBPACK_IMPORTED_MODULE_4___default.a['coz-form-errors']
  }, t(twoFactor.error)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles_view__WEBPACK_IMPORTED_MODULE_3___default.a['set-view-content-twofa-modal-content-button']
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    onClick: activate2FA,
    "aria-busy": twoFactor.submitting,
    label: t('ProfileView.twofa.modal.button.activate')
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__["translate"])()(ActivationConfirmation));

/***/ }),

/***/ "U/On":
/***/ (function(module, exports) {

module.exports = "/img/double_authent_prez_banner.svg";

/***/ }),

/***/ "UcVT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9At1");


var openDeviceRevokeModale = function openDeviceRevokeModale() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions__WEBPACK_IMPORTED_MODULE_0__["DEVICES_MODALE_REVOKE_OPEN"]:
      return true;

    case actions__WEBPACK_IMPORTED_MODULE_0__["DEVICES_MODALE_REVOKE_CLOSE"]:
    case actions__WEBPACK_IMPORTED_MODULE_0__["DEVICE_REVOKE_SUCCESS"]:
      return false;

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (openDeviceRevokeModale);

/***/ }),

/***/ "WPLz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TwoFactorCode", function() { return TwoFactorCode; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("KXWi");
/* harmony import */ var cozy_ui_react_Field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("jLsa");
/* harmony import */ var cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("kyGY");
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("J+JL");
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(styles_view__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("4DAK");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("sCQG");
var config__WEBPACK_IMPORTED_MODULE_7___namespace = /*#__PURE__*/__webpack_require__.t("sCQG", 1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









var TwoFactorCode =
/*#__PURE__*/
function (_Component) {
  _inherits(TwoFactorCode, _Component);

  function TwoFactorCode(props) {
    var _this;

    _classCallCheck(this, TwoFactorCode);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TwoFactorCode).call(this, props));
    _this.state = {
      twoFactorCode: ''
    };
    return _this;
  }

  _createClass(TwoFactorCode, [{
    key: "onChange",
    value: function onChange(newVal) {
      this.setState(function () {
        return {
          twoFactorCode: newVal
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          t = _this$props.t,
          checkTwoFactorCode = _this$props.checkTwoFactorCode,
          closeTwoFAActivationModal = _this$props.closeTwoFAActivationModal,
          twoFactor = _this$props.twoFactor,
          email = _this$props.email;
      var twoFactorCode = this.state.twoFactorCode;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, t('ProfileView.twofa.modal.confirmation_title')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_6__["default"], {
        source: t('ProfileView.twofa.modal.confirmation_description', {
          email: email
        })
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Field__WEBPACK_IMPORTED_MODULE_3__["default"], {
        label: t('ProfileView.twofa.modal.code'),
        name: "two_factor_mail",
        type: "text",
        value: twoFactorCode,
        onChange: function onChange(e) {
          return _this2.onChange(e.target.value);
        },
        fullwidth: true,
        id: "two_factor_mail",
        error: Boolean(twoFactor.checkError)
      }), twoFactor.checkError ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_4__["ErrorMessage"], null, t(twoFactor.checkError)) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles_view__WEBPACK_IMPORTED_MODULE_5___default.a['set-view-content-twofa-modal-nocode']
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, t('ProfileView.twofa.modal.nocode')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), t('ProfileView.twofa.modal.nocode_claude'), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "mailto{settingsConfig.contactEmail}"
      }, config__WEBPACK_IMPORTED_MODULE_7__.contactEmail))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles_view__WEBPACK_IMPORTED_MODULE_5___default.a['set-view-content-twofa-modal-content-right-buttons']
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        onClick: closeTwoFAActivationModal,
        theme: "secondary",
        label: t('ProfileView.twofa.modal.button.cancel')
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        onClick: function onClick() {
          return checkTwoFactorCode(twoFactorCode);
        },
        disabled: !twoFactorCode,
        label: t('ProfileView.twofa.modal.button.validate')
      })));
    }
  }]);

  return TwoFactorCode;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__["translate"])()(TwoFactorCode));

/***/ }),

/***/ "WYRb":
/***/ (function(module, exports) {

module.exports = "/img/protect_data_point.svg";

/***/ }),

/***/ "XWeM":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "YkMg":
/***/ (function(module, exports) {

module.exports = "/img/niv_secu_point.svg";

/***/ }),

/***/ "ZIvV":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4BeY");
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("IaFt");
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-box_76b945d5586a41fbf7c07f6d133b138a",
  "use": "icon-box_76b945d5586a41fbf7c07f6d133b138a-usage",
  "viewBox": "0 0 16 16",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" id=\"icon-box_76b945d5586a41fbf7c07f6d133b138a\">\n  <path fill-rule=\"evenodd\" d=\"M225,68 L239,68 L239,78.0044225 C239,78.5542648 238.550051,79 237.993155,79 L226.006845,79 C225.45078,79 225,78.555163 225,78.0044225 L225,68 Z M224,66 C224,65.4477153 224.444631,65 225.000872,65 L238.999128,65 C239.551894,65 240,65.4438648 240,66 L240,67 L224,67 L224,66 Z M229,70 L235,70 L235,72 L229,72 L229,70 Z\" transform=\"translate(-224 -64)\" />\n</symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "a5M7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "instance", function() { return instance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFetching", function() { return isFetching; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "error", function() { return error; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ANjH");
/* harmony import */ var actions_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("NeM9");


var instance = function instance() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions_services__WEBPACK_IMPORTED_MODULE_1__["CREATE_INTENT_SERVICE_SUCCESS"]:
      return action.service;

    default:
      return state;
  }
};
var isFetching = function isFetching() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions_services__WEBPACK_IMPORTED_MODULE_1__["CREATE_INTENT_SERVICE"]:
      return true;

    default:
      return state;
  }
};
var error = function error() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions_services__WEBPACK_IMPORTED_MODULE_1__["CREATE_INTENT_SERVICE_FAILURE"]:
      return action.error;

    default:
      return state;
  }
};
var service = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  instance: instance,
  error: error,
  isFetching: isFetching
});
/* harmony default export */ __webpack_exports__["default"] = (service);

/***/ }),

/***/ "arcr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ANjH");
/* harmony import */ var actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("9At1");
/* harmony import */ var actions_twoFactor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("jYLR");




var composeReducers = function composeReducers() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function (state, action) {
    for (var i = 0; i < fns.length; i++) {
      var reducer = fns[fns.length - i - 1];
      state = reducer(state, action);
    }

    return state;
  };
};
/** Special reducer for the auth_mode value */


var authModeValue = function authModeValue() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : actions_twoFactor__WEBPACK_IMPORTED_MODULE_2__["AUTH_MODE"].BASIC;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions_twoFactor__WEBPACK_IMPORTED_MODULE_2__["CHECK_TWO_FACTOR_CODE_SUCCESS"]:
      return actions_twoFactor__WEBPACK_IMPORTED_MODULE_2__["AUTH_MODE"].TWO_FA_MAIL;

    case actions_twoFactor__WEBPACK_IMPORTED_MODULE_2__["DESACTIVATE_2FA_SUCCESS"]:
      return actions_twoFactor__WEBPACK_IMPORTED_MODULE_2__["AUTH_MODE"].BASIC;

    default:
      return state;
  }
};

var createField = function createField(name) {
  var normalValue = function normalValue() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case actions__WEBPACK_IMPORTED_MODULE_1__["FETCH_INFOS_SUCCESS"]:
        return action.instance.data.attributes[name] || '';

      case actions__WEBPACK_IMPORTED_MODULE_1__["UPDATE_INFO"]:
        return name !== action.field ? state : action.value;

      default:
        return state;
    }
  };

  var value = name == 'auth_mode' ? composeReducers(authModeValue, normalValue) : normalValue;

  var submitting = function submitting() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    if (name !== action.field) return state;

    switch (action.type) {
      case actions__WEBPACK_IMPORTED_MODULE_1__["UPDATE_INFO"]:
        return true;

      case actions__WEBPACK_IMPORTED_MODULE_1__["UPDATE_INFO_SUCCESS"]:
      case actions__WEBPACK_IMPORTED_MODULE_1__["UPDATE_INFO_FAILURE"]:
        return false;

      default:
        return state;
    }
  };

  var saved = function saved() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    if (name !== action.field) return state;

    switch (action.type) {
      case actions__WEBPACK_IMPORTED_MODULE_1__["UPDATE_INFO_SUCCESS"]:
        return true;

      case actions__WEBPACK_IMPORTED_MODULE_1__["RESET_INFO_FIELD"]:
        return false;

      default:
        return state;
    }
  };

  var errors = function errors() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments.length > 1 ? arguments[1] : undefined;
    if (name !== action.field) return state;

    switch (action.type) {
      case actions__WEBPACK_IMPORTED_MODULE_1__["UPDATE_INFO"]:
      case actions__WEBPACK_IMPORTED_MODULE_1__["UPDATE_INFO_SUCCESS"]:
        return [];

      case actions__WEBPACK_IMPORTED_MODULE_1__["UPDATE_INFO_FAILURE"]:
        return [action.error];

      default:
        return state;
    }
  };

  return Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
    value: value,
    submitting: submitting,
    saved: saved,
    errors: errors
  });
};

var fields = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  email: createField('email'),
  locale: createField('locale'),
  public_name: createField('public_name'),
  tracking: createField('tracking'),
  auth_mode: createField('auth_mode') // read only

});
/* harmony default export */ __webpack_exports__["default"] = (fields);

/***/ }),

/***/ "bOJm":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Dein Konto löschen","label":"Du kannst dein Cozy jederzeit löschen. Sei aber vorsichtig, denn sobald dein Konto gelöscht ist, werden  alle deine Daten unwiderruflich gelöscht.","button":{"label":"Mein Konto löschen"},"error":{"message":"Ein Fehler ist während der Löschanfrage deines Kontos aufgetreten. Versuche es erneut oder kontaktiere unseren Support."},"modal":{"confirm":{"title":"Dein Cozy löschen?","description":{"line":{"1":"Dein Cozy wird entfernt","2":"Du wirst nicht mehr auf dein Cozy zugreifen können","3":"Alle deine Daten werden entfernt"}},"button":{"cancel":{"label":"Abbrechen"},"submit":{"label":"Löschen"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Warum möchtest du dein Cozy löschen (optional)?"},"button":{"cancel":{"label":"Abbrechen"},"submit":{"label":"Abschicken"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profil","activated_services":"Aktivierte Dienste","connected_devices":"Verbundene Geräte","sessions":"Verbindungen","storage":"Speicher","email_notifications":"E-mail Benachrichtigung"},"Loading":{"loading":"Laden"},"Empty":{"devices":{"title":"Du hast keine verbundenen Geräte","text":"Durch die Installation der verschiedenen Clients kannst du auf deine Dateien auf all deinen Bildschirmen gleichzeitig zugreifen. Cozy ist immer in Reichweite, auch wenn du immer unterwegs bist!","link":{"href":"https://cozy.io/en/download/","text":"Lade eine unserer Anwendungen herunter"}}},"ProfileView":{"instance":{"server_error":"Etwas ging mit dem Server schief. Bitte lade die Seite neu."},"title":"Profil","password":{"title":"Passwort","show":"Zeige","hide":"Verstecke","server_error":"Etwas ist schief gelaufen. Dein Passwort wurde nicht gespeichert.","password_too_weak":"Dein Passwort ist zu schwach. Du solltest einen Großbuchstaben, eine Zahl, ein Sonderzeichen oder ein längeres Passwort hinzufügen.","wrong_password":"Das aktuelle Passwort scheint falsch zu sein.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Dein Passwort wurde geändert.","reset_link":"Passwort vergessen?","submit_label":"Ändere dein Passwort","reload":"Dein Passwort wurde geändert. Die Seite wird neu geladen, damit die Änderungen wirksam werden."},"current_password":{"label":"Gib dein aktuelles Passwort ein","placeholder":"Aktuelles Passwort"},"new_password":{"label":"Gib ein neues Passwort ein","placeholder":"Neues Passwort"},"infos":{"success":"Deine Informationen wurden geändert","server_error":"Etwas ist schief gelaufen. Deine Informationen wurden nicht gespeichert.","empty":"Dieses Feld kann nicht leer sein"},"email":{"title":"E-mail","label":"Cozy braucht deine E-Mail um Benachrichtigungen zuzusenden und dein Passwort wiederherzustellen","error":"Die E-Mail-Adresse fühlt sich nicht richtig an. Bist du sicher, dass du sie richtig geschrieben hast (z. B. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Benutzername","label":"Dein Benutzername wird angezeigt, wenn du Dateien mit Cozy-Benutzern teilst."},"tracking":{"title":"Hilf uns, unser Produkt zu verbessern","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Sprache","label":"Dies wird die Sprache sein, die in deinem Cozy verwendet wird.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"Französisch ","en":"Englisch","es":"Spanisch","ja":"Japanisch","nl":"Niederländisch","de":"Deutsch","ru":"Russisch","nl_NL":"Niederländisch (Niederlande)","ko":"Koreanisch","pl":"Polnisch","pt":"Portugiesisch","da":"Dänisch","ro_RO":"Rumänisch (Rumänien)","pt_BR":"Portugiesisch (Brasilien)","zh_CN":"Chinesisch (China)","ar":"Arabisch","it":"Italienisch","ro":"Rumänisch","eo":"Esperanto","de_DE":"Deutsch (Deutschland)","sq":"Albanisch","tr":"Türkisch","uk_UA":"Ukrainisch (Ukraine)","ru_RU":"Russisch (Russland)","sq_AL":"Albanisch (Albanien)","ca":"Katalanisch","ca_ES":"Katalanisch (Spanien)","zh":"Chinesisch","zh_TW":"Chinesisch (Taiwan)","cs":"Tschechisch","cs_CZ":"Tschechien (Tschechien)","el":"Griechisch","id":"Indonesisch","it_IT":"Italienisch (Italien)","sk":"Slowakisch","sk_SK":"Slowakisch (Slowakei)","es_CO":"Spanisch (Kolumbien)","es_ES":"Spanisch (Spanien)","sv":"Schwedisch"}},"DevicesView":{"title":"Verbundene Geräte","load_error":"Beim Laden der Geräte ist ein Fehler aufgetreten. Bitte versuche es später erneut.","head_name":"Name","head_sync":"Letzte Synchronisation","head_activity":"Letzte Aktivität","head_permissions":"Berechtigungen","head_actions":"Aktionen","revoke":"Widerrufen","sync_date_format":"MM TT, JJJJ"},"StorageView":{"title":"Speicher","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Gesamtspeicherplatz","storage_phrase":"%{diskUsage} GB von %{diskQuota} verwendet","more_space":"Du brauchst mehr Speicherplatz?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Verbindungshistorie","sync_date_format":"MM TT, JJJJ","delete":"Lösche alle anderen Sitzungen","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"Alle anderen Sitzungen wurden gelöscht."}},"revokeDevice":{"title":"Dieses Gerät widerrufen","description":"Du bist dabei, die Verknüfung mit **%{name}** aufzuheben.","subText":"Das Synchronisieren mit diesem Gerät wird sofort beendet.","validate":"Gerät widerrufen","error":"Kann das Gerät nicht widerrufen, versuche die Seite neu zu laden."},"ServicesView":{"title":"Aktivierte Dienste","load_error":"Beim Laden deiner Dienste ist ein Fehler aufgetreten. Bitte versuche es später erneut.","head_services":"Dienste","head_account":"Konto","head_sync":"Letzte Synchronisation","head_status":"Status","unsync":"Unsynchronisiert","konnector_link":"Zugriff auf die gesamte Liste der Dienste"},"soon":{"title":"Demnächst","description":"Diese Funktion ist noch nicht verfügbar. Für weitere Informationen kontaktiere uns bitte unter contact@cozycloud.cc"},"support":{"title":"Hallo! Wie können wir dir helfen?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Deine Anfrage","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Los geht's!","sending":"Sende...","success":"👏 Deine Nachricht wurde gesendet. Danke!","error":"Ein Fehler beim Sender der Nachricht ist aufgetreten"},"claudy":{"title":"Wie willst du dein Cozy steuern?","actions":{"desktop":{"title":"Hol dir Zugang zu deinen Dateien auf deinem Computer","description":"Synchronisiere alle deine Cozy Drive-Dateien auf deinem Computer","button":"Installiere Cozy Drive auf deinem Desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Sichere und synchronisiere deine Bilder vom Handy","description":"Alle deine Erinnerungen sind auf Cozy Drive sicher","button":"Installiere die Cozy Drive App auf deinem Handy","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Hol dein Geld sofort zurück","description":"Cozy Collect organisiert alle deine Dateien sofort","button":"Entdecke Cozy Collect"},"support":{"title":"Kontaktiere uns","description":"Hallo! Wie können wir dir helfen?","emailDetail":"Deine Nachricht wird von der E-Mail-Adresse gesendet, die du in den Cozy Einstellungen gespeichert hast.","fields":{"message":{"title":"Deine Anfrage","placeholder":"Sag uns etwas (frag nach Hilfe, teile ein Feedback oder sag uns einfach hallo). Wir freuen uns, mit dir zu sprechen."}},"button":"Lass uns gehen!","sending":"Sende...","success":"👏 Deine Nachricht wurde gesendet. Danke!","error":"Ein Fehler ist aufgetreten beim Senden der Nachricht"}}},"errors":{"noEmailFound":"Keine E-Mail-Adresse gefunden. Bitte füge eine in deine Cozy Einstellungen ein und versuche es dann nochmal."}};

/***/ }),

/***/ "cYLk":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseRedirectUrlsFromUrlParams", function() { return parseRedirectUrlsFromUrlParams; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("/MKj");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("mwIZ");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_flowRight__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("BJ98");
/* harmony import */ var lodash_flowRight__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_flowRight__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cozy_ui_react_Alerter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("67rm");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("buk/");
/* harmony import */ var actions_twoFactor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("jYLR");
/* harmony import */ var actions_passphrase__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("nJV4");
/* harmony import */ var actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("9At1");
/* harmony import */ var components_PassphraseView__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("qCrm");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("eO8H");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }












var mapStateToProps = function mapStateToProps(state) {
  return {
    fields: state.fields,
    isTwoFactorEnabled: lodash_get__WEBPACK_IMPORTED_MODULE_2___default()(state, 'fields.auth_mode.value') === actions_twoFactor__WEBPACK_IMPORTED_MODULE_6__["AUTH_MODE"].TWO_FA_MAIL,
    instance: state.instance,
    passphrase: state.passphrase
  };
};

var parseRedirectUrlsFromUrlParams = function parseRedirectUrlsFromUrlParams(urlParamsStr) {
  var urlParams = new URLSearchParams(urlParamsStr);
  return {
    successRedirectUrl: urlParams.get('redirect_success'),
    cancelRedirectUrl: urlParams.get('redirect_cancel')
  };
};

var showSuccessThenReload = function showSuccessThenReload(t, location) {
  var _parseRedirectUrlsFro = parseRedirectUrlsFromUrlParams(location.search),
      successRedirectUrl = _parseRedirectUrlsFro.successRedirectUrl;

  var translatationKey = successRedirectUrl ? 'PassphraseView.redirect' : 'PassphraseView.reload';
  var ALERT_DURATION = 4000;
  cozy_ui_react_Alerter__WEBPACK_IMPORTED_MODULE_4__["default"].info(t(translatationKey), {
    duration: ALERT_DURATION
  });
  setTimeout(function () {
    if (successRedirectUrl) {
      window.location = successRedirectUrl;
    } else {
      // the token changes after a password change, so we need to reload
      // the page to get the new one
      window.location.reload();
    }
  }, ALERT_DURATION);
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    onPassphraseSimpleSubmit: function () {
      var _onPassphraseSimpleSubmit = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(currentPassphrase, newPassphrase, hint) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return dispatch(Object(actions_passphrase__WEBPACK_IMPORTED_MODULE_7__["updateHint"])(hint));

              case 3:
                _context.next = 5;
                return dispatch(Object(actions_passphrase__WEBPACK_IMPORTED_MODULE_7__["updatePassphrase"])(currentPassphrase, newPassphrase));

              case 5:
                showSuccessThenReload(ownProps.t, ownProps.location);
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                // eslint-disable-next-line no-console
                console.error(_context.t0);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));

      function onPassphraseSimpleSubmit(_x, _x2, _x3) {
        return _onPassphraseSimpleSubmit.apply(this, arguments);
      }

      return onPassphraseSimpleSubmit;
    }(),
    onPassphrase2FAStep1: function () {
      var _onPassphrase2FAStep = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(currentPassphrase) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return dispatch(Object(actions_passphrase__WEBPACK_IMPORTED_MODULE_7__["updatePassphrase2FAFirst"])(currentPassphrase));

              case 3:
                _context2.next = 8;
                break;

              case 5:
                _context2.prev = 5;
                _context2.t0 = _context2["catch"](0);
                // eslint-disable-next-line no-console
                console.error(_context2.t0);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 5]]);
      }));

      function onPassphrase2FAStep1(_x4) {
        return _onPassphrase2FAStep.apply(this, arguments);
      }

      return onPassphrase2FAStep1;
    }(),
    onPassphrase2FAStep2: function () {
      var _onPassphrase2FAStep2 = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(currentPassphrase, newPassphrase, twoFactorCode, twoFactorToken, hint) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return dispatch(Object(actions_passphrase__WEBPACK_IMPORTED_MODULE_7__["updateHint"])(hint));

              case 3:
                _context3.next = 5;
                return dispatch(Object(actions_passphrase__WEBPACK_IMPORTED_MODULE_7__["updatePassphrase2FASecond"])(currentPassphrase, newPassphrase, twoFactorCode, twoFactorToken));

              case 5:
                showSuccessThenReload(ownProps.t, ownProps.location);
                _context3.next = 11;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);
                // eslint-disable-next-line no-console
                console.error(_context3.t0);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 8]]);
      }));

      function onPassphrase2FAStep2(_x5, _x6, _x7, _x8, _x9) {
        return _onPassphrase2FAStep2.apply(this, arguments);
      }

      return onPassphrase2FAStep2;
    }(),
    fetchInfos: function fetchInfos() {
      return dispatch(Object(actions__WEBPACK_IMPORTED_MODULE_8__["fetchInfos"])());
    }
  };
};

var Passphrase = lodash_flowRight__WEBPACK_IMPORTED_MODULE_3___default()(react_router_dom__WEBPACK_IMPORTED_MODULE_10__["withRouter"], Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_5__["translate"])(), Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps))(components_PassphraseView__WEBPACK_IMPORTED_MODULE_9__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (Passphrase);

/***/ }),

/***/ "cokx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ANjH");
/* harmony import */ var reducers_fields__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("arcr");
/* harmony import */ var reducers_twoFactor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("phlM");
/* harmony import */ var reducers_export__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("OiH8");
/* harmony import */ var reducers_passphrase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("oEje");
/* harmony import */ var reducers_instance__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("Mpvr");
/* harmony import */ var reducers_claudy__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("ScGk");
/* harmony import */ var reducers_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("a5M7");
/* harmony import */ var reducers_emailStatus__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("BdmE");
/* harmony import */ var reducers_devices__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("Cz0i");
/* harmony import */ var reducers_deviceToRevoke__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("HrnS");
/* harmony import */ var reducers_openDeviceRevokeModale__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("UcVT");
/* harmony import */ var reducers_sessions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("B/tT");
/* harmony import */ var reducers_storageData__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("6WKl");
/* harmony import */ var reducers_ui__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("kuoQ");
/* harmony import */ var lib_client__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("7yAG");
















var appReducer = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  devices: reducers_devices__WEBPACK_IMPORTED_MODULE_9__["default"],
  fields: reducers_fields__WEBPACK_IMPORTED_MODULE_1__["default"],
  twoFactor: reducers_twoFactor__WEBPACK_IMPORTED_MODULE_2__["default"],
  exportData: reducers_export__WEBPACK_IMPORTED_MODULE_3__["default"],
  instance: reducers_instance__WEBPACK_IMPORTED_MODULE_5__["default"],
  claudy: reducers_claudy__WEBPACK_IMPORTED_MODULE_6__["default"],
  service: reducers_service__WEBPACK_IMPORTED_MODULE_7__["default"],
  emailStatus: reducers_emailStatus__WEBPACK_IMPORTED_MODULE_8__["default"],
  openDeviceRevokeModale: reducers_openDeviceRevokeModale__WEBPACK_IMPORTED_MODULE_11__["default"],
  deviceToRevoke: reducers_deviceToRevoke__WEBPACK_IMPORTED_MODULE_10__["default"],
  passphrase: reducers_passphrase__WEBPACK_IMPORTED_MODULE_4__["default"],
  sessions: reducers_sessions__WEBPACK_IMPORTED_MODULE_12__["default"],
  storageData: reducers_storageData__WEBPACK_IMPORTED_MODULE_13__["default"],
  ui: reducers_ui__WEBPACK_IMPORTED_MODULE_14__["default"],
  cozy: lib_client__WEBPACK_IMPORTED_MODULE_15__["default"].reducer()
});
/* harmony default export */ __webpack_exports__["default"] = (appReducer);

/***/ }),

/***/ "dSv/":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"删除您的账号","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"删除我的账号"},"error":{"message":"在删除时出现了错误，请重试或者联系我们的客服人员。"},"modal":{"confirm":{"title":"删除您的Cozy？","description":{"line":{"1":"您的Cozy将被移除","2":"您将不再被允许访问您的Cozy","3":"您的所有数据将被移除"}},"button":{"cancel":{"label":"取消"},"submit":{"label":"删除"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"取消"},"submit":{"label":"发送"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"您的删除请求已发送。"}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"已连接设备","sessions":"Connections","storage":"储存","email_notifications":"E-mail notifications"},"Loading":{"loading":"加载中"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"密码","show":"显示","hide":"隐藏","server_error":"出了点问题。您的密码尚未保存。","password_too_weak":"您的密码太脆弱了。您应该增加大写字母、数字、特殊字符或更长的密码。","wrong_password":"当前的密码似乎错误的。","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"您的密码已经更改成功。","reset_link":"忘记了您的密码？","submit_label":"修改您的密码","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"输入您当前的密码","placeholder":"当前密码"},"new_password":{"label":"输入您的新密码","placeholder":"新密码"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "dwRe":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Профиль","activated_services":"Активные службы","connected_devices":"Подключенные устройства","sessions":"Connections","storage":"Хранилище","email_notifications":"Уведомления по почте"},"Loading":{"loading":"Загрузка"},"Empty":{"devices":{"title":"У вас нет подключенных устройств","text":"Устанавливая различные клиенты,  вы получаете доступ к вашим файлам на любых устройствах.Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Загрузите одно из наших приложений"}}},"ProfileView":{"instance":{"server_error":"Что-то не так с сервером. Перезагрузите страницу."},"title":"Профиль","password":{"title":"Пароль","show":"Показать","hide":"Скрыть","server_error":"Что-то пошло не так. Ваш пароль не сохранен.","password_too_weak":"Ваш пароль слишком легок. Вам нужно добавить заглавных букв, цифр, специальных символов или использовать больше символов.","wrong_password":"Текущий пароль указан неверно.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Ваш пароль был изменен.","reset_link":"Забыли пароль?","submit_label":"Сменить пароль","reload":"Ваш пароль был изменен. Страница будет перезагружена для применения изменений."},"current_password":{"label":"Введите старый пароль","placeholder":"Старый пароль"},"new_password":{"label":"Введите новый пароль","placeholder":"Новый пароль"},"infos":{"success":"Ваша информация была изменена","server_error":"Что-то не так. Ваша информация не изменена.","empty":"Это поле не может быть пустым"},"email":{"title":"E-mail","label":"Cozy нужен ваш e-mail для отправки вам уведомлений и для возможности восстановления пароля","error":"С этим адресом что-то не так. Вы уверены что ввели все корректно (в формате john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Имя пользователя","label":"Ваше имя пользователя будет отображаться когда вы будете делится файлами с другими пользователями."},"tracking":{"title":"Помогите улучшить наш продукт","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Язык","label":"Этот язык будет использоваться в вашем Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Подключенные устройства","load_error":"Произошла ошибка загрузки списка устройств, попробуйте позже.","head_name":"Имя","head_sync":"Last synchronisation","head_activity":"Последний заход","head_permissions":"Разрешения","head_actions":"Действия","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"Это немедленно остановит синхронизацию с этим устройством.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Активные службы","load_error":"Произошла ошибка при загрузке службы, попробуйте позже.","head_services":"Службы","head_account":"Учетная запись","head_sync":"Последняя синхронизация","head_status":"Статус","unsync":"Несинхронизировано","konnector_link":"Access the whole list of services here"},"soon":{"title":"Скоро","description":"Это действие пока недоступно. Для подробной информации свяжитесь с нами по contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Дать доступ к вашим файлам на компьютере","description":"Синхронизировать все ваши файлы в Cozy Drive с компьютером","button":"Установите Cozy Drive на ваш компьютер","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"Все ваши воспоминания сохранены в Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Связатся","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Отправка...","success":"👏 Ваше сообщение отправлено. Спасибо вам!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "eeWi":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profil","activated_services":"Aktivierte Dienste","connected_devices":"Verbundene Geräte","sessions":"Connections","storage":"Speicher","email_notifications":"E-mail Benachrichtigung"},"Loading":{"loading":"Laden"},"Empty":{"devices":{"title":"Du hast keine verbundenen Geräte","text":"Durch die Installation der verschiedenen Clients kannst du auf deine Dateien auf all deinen Bildschirmen gleichzeitig zugreifen. Cozy ist immer in Reichweite, auch wenn du immer unterwegs bist!","link":{"href":"https://cozy.io/en/download/","text":"Lade eine unserer Anwendungen herunter"}}},"ProfileView":{"instance":{"server_error":"Etwas ging mit dem Server schief. Bitte lade die Seite neu."},"title":"Profil","password":{"title":"Passwort","show":"Zeige","hide":"Verstecke","server_error":"Etwas ist schief gelaufen. Dein Passwort wurde nicht gespeichert.","password_too_weak":"Dein Passwort ist zu schwach. Du solltest einen Großbuchstaben, eine Zahl, ein Sonderzeichen oder ein längeres Passwort hinzufügen.","wrong_password":"Das aktuelle Passwort scheint falsch zu sein.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Dein Passwort wurde geändert.","reset_link":"Passwort vergessen?","submit_label":"Ändere dein Passwort","reload":"Dein Passwort wurde geändert. Die Seite wird neu geladen, damit die Änderungen wirksam werden."},"current_password":{"label":"Gib dein aktuelles Passwort ein","placeholder":"Aktuelles Passwort"},"new_password":{"label":"Gib ein neues Passwort ein","placeholder":"Neues Passwort"},"infos":{"success":"Deine Informationen wurden geändert","server_error":"Etwas ist schief gelaufen. Deine Informationen wurden nicht gespeichert.","empty":"Dieses Feld kann nicht leer sein"},"email":{"title":"E-mail","label":"Cozy braucht deine E-Mail um Benachrichtigungen zuzusenden und dein Passwort wiederherzustellen","error":"Die E-Mail-Adresse fühlt sich nicht richtig an. Bist du sicher, dass du sie richtig geschrieben hast (z. B. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Benutzername","label":"Dein Benutzername wird angezeigt, wenn du Dateien mit Cozy-Benutzern teilst."},"tracking":{"title":"Hilf uns, unser Produkt zu verbessern","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Sprache","label":"Dies wird die Sprache sein, die in deinem Cozy verwendet wird.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Verbundene Geräte","load_error":"Beim Laden der Geräte ist ein Fehler aufgetreten. Bitte versuche es später erneut.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Letzte Aktivität","head_permissions":"Berechtigungen","head_actions":"Aktionen","revoke":"Widerrufen","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Dieses Gerät widerrufen","description":"Du bist dabei, die Verknüfung mit **%{name}** aufzuheben.","subText":"Das Synchronisieren mit diesem Gerät wird sofort beendet.","validate":"Gerät widerrufen","error":"Kann das Gerät nicht widerrufen, versuche die Seite neu zu laden."},"ServicesView":{"title":"Aktivierte Dienste","load_error":"Beim Laden deiner Dienste ist ein Fehler aufgetreten. Bitte versuche es später erneut.","head_services":"Dienste","head_account":"Konto","head_sync":"Letzte Synchronisation","head_status":"Status","unsync":"Unsynchronisiert","konnector_link":"Zugriff auf die gesamte Liste der Dienste"},"soon":{"title":"Demnächst","description":"Diese Funktion ist noch nicht verfügbar. Für weitere Informationen kontaktiere uns bitte unter contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"Wie willst du dein Cozy steuern?","actions":{"desktop":{"title":"Hol dir Zugang zu deinen Dateien auf deinem Computer","description":"Synchronisiere alle deine Cozy Drive-Dateien auf deinem Computer","button":"Installiere Cozy Drive auf deinem Desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Sichere und synchronisiere deine Bilder vom Handy","description":"Alle deine Erinnerungen sind auf Cozy Drive sicher","button":"Installiere die Cozy Drive App auf deinem Handy","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Hol dein Geld sofort zurück","description":"Cozy Collect organisiert alle deine Dateien sofort","button":"Entdecke Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "efN2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styles_fields__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("Cp2o");
/* harmony import */ var styles_fields__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styles_fields__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Toggle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Vmsy");
/* harmony import */ var components_Field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("xq6T");
/* harmony import */ var cozy_ui_react_Input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("zA8p");







var Input = function Input(_ref) {
  var name = _ref.name,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'text' : _ref$type,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? '' : _ref$placeholder,
      value = _ref.value,
      submitting = _ref.submitting,
      errors = _ref.errors,
      onChange = _ref.onChange,
      onBlur = _ref.onBlur;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Input__WEBPACK_IMPORTED_MODULE_5__["default"], {
    type: type,
    placeholder: placeholder,
    defaultValue: value,
    value: undefined,
    name: name,
    onChange: onChange && function (e) {
      return onChange(name, e.target.value);
    },
    onBlur: onBlur && function (e) {
      return onBlur(name, e.target.value);
    },
    className: errors && errors.length !== 0 ? styles_fields__WEBPACK_IMPORTED_MODULE_0___default.a['error'] : '',
    "aria-busy": submitting
  });
};

var SwitchCheckBox = function SwitchCheckBox(_ref2) {
  var name = _ref2.name,
      value = _ref2.value,
      onChange = _ref2.onChange;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: styles_fields__WEBPACK_IMPORTED_MODULE_0___default.a['set-toggle']
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Toggle__WEBPACK_IMPORTED_MODULE_3__["default"], {
    id: "set-".concat(name.replace(' ', '_'), "-toggle"),
    checked: !!value,
    onToggle: function onToggle(checked) {
      return onChange(name, checked);
    }
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__["translate"])()(function (props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_Field__WEBPACK_IMPORTED_MODULE_4__["default"], props, props.type === 'checkbox' ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(SwitchCheckBox, props) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Input, props));
}));

/***/ }),

/***/ "fH6n":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sidebar", function() { return Sidebar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("buk/");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("eO8H");
/* harmony import */ var cozy_ui_react_Nav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("fSd/");
/* harmony import */ var cozy_ui_react_Sidebar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("9VR2");
/* harmony import */ var styles_sidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("tsnM");
/* harmony import */ var styles_sidebar__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(styles_sidebar__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var assets_icons_icon_box_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("ZIvV");
/* harmony import */ var assets_icons_icon_globe_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("OL7+");
/* harmony import */ var assets_icons_icon_phone_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("P/VH");
/* harmony import */ var assets_icons_icon_people_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("5hMn");










var Sidebar = function Sidebar(_ref) {
  var t = _ref.t;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Sidebar__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: styles_sidebar__WEBPACK_IMPORTED_MODULE_5___default.a['o-sidebar']
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Nav__WEBPACK_IMPORTED_MODULE_3__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Nav__WEBPACK_IMPORTED_MODULE_3__["NavItem"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
    to: "/profile",
    className: cozy_ui_react_Nav__WEBPACK_IMPORTED_MODULE_3__["NavLink"].className,
    activeClassName: cozy_ui_react_Nav__WEBPACK_IMPORTED_MODULE_3__["NavLink"].activeClassName
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Nav__WEBPACK_IMPORTED_MODULE_3__["NavIcon"], {
    icon: assets_icons_icon_people_svg__WEBPACK_IMPORTED_MODULE_9__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Nav__WEBPACK_IMPORTED_MODULE_3__["NavText"], null, t('Nav.profile')))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Nav__WEBPACK_IMPORTED_MODULE_3__["NavItem"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
    to: "/connectedDevices",
    className: cozy_ui_react_Nav__WEBPACK_IMPORTED_MODULE_3__["NavLink"].className,
    activeClassName: cozy_ui_react_Nav__WEBPACK_IMPORTED_MODULE_3__["NavLink"].activeClassName
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Nav__WEBPACK_IMPORTED_MODULE_3__["NavIcon"], {
    icon: assets_icons_icon_phone_svg__WEBPACK_IMPORTED_MODULE_8__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Nav__WEBPACK_IMPORTED_MODULE_3__["NavText"], null, t('Nav.connected_devices')))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Nav__WEBPACK_IMPORTED_MODULE_3__["NavItem"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
    to: "/sessions",
    className: cozy_ui_react_Nav__WEBPACK_IMPORTED_MODULE_3__["NavLink"].className,
    activeClassName: cozy_ui_react_Nav__WEBPACK_IMPORTED_MODULE_3__["NavLink"].activeClassName
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Nav__WEBPACK_IMPORTED_MODULE_3__["NavIcon"], {
    icon: assets_icons_icon_globe_svg__WEBPACK_IMPORTED_MODULE_7__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Nav__WEBPACK_IMPORTED_MODULE_3__["NavText"], null, t('Nav.sessions')))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Nav__WEBPACK_IMPORTED_MODULE_3__["NavItem"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
    to: "/storage",
    className: cozy_ui_react_Nav__WEBPACK_IMPORTED_MODULE_3__["NavLink"].className,
    activeClassName: cozy_ui_react_Nav__WEBPACK_IMPORTED_MODULE_3__["NavLink"].activeClassName
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Nav__WEBPACK_IMPORTED_MODULE_3__["NavIcon"], {
    icon: assets_icons_icon_box_svg__WEBPACK_IMPORTED_MODULE_6__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Nav__WEBPACK_IMPORTED_MODULE_3__["NavText"], null, t('Nav.storage'))))));
};
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__["translate"])()(Sidebar));

/***/ }),

/***/ "fKxt":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "gwEM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4BeY");
/* harmony import */ var svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("IaFt");
/* harmony import */ var svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new svg_baker_runtime_browser_symbol__WEBPACK_IMPORTED_MODULE_0___default.a({
  "id": "icon-devices_177287e95d2b018b4975aa53b8b31e07",
  "use": "icon-devices_177287e95d2b018b4975aa53b8b31e07-usage",
  "viewBox": "0 0 160 160",
  "content": "<symbol xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 160 160\" id=\"icon-devices_177287e95d2b018b4975aa53b8b31e07\">\n  <g fill=\"none\" fill-rule=\"evenodd\" transform=\"translate(0 16)\">\n    <path fill=\"#32363F\" d=\"M10,105 L10,10 L10,10 C10,4.4771525 14.4771525,1.01453063e-15 20,0 L140,0 L140,0 C145.522847,-1.01453063e-15 150,4.4771525 150,10 L150,105 L10,105 Z\" />\n    <rect width=\"120\" height=\"80\" x=\"20\" y=\"10\" fill=\"#5D6165\" rx=\"1\" />\n    <path fill=\"#95999D\" d=\"M92.5,105 L62.5,105 L62.5,105 C61.1192881,105 60,103.880712 60,102.5 L60,102.5 L60,102.5 C60,101.119288 58.8807119,100 57.5,100 L2.5,100 L2.5,100 C1.11928813,100 -1.69088438e-16,101.119288 0,102.5 L0,110 L0,110 C6.76353751e-16,115.522847 4.4771525,120 10,120 L150,120 L150,120 C155.522847,120 160,115.522847 160,110 L160,102.5 L160,102.5 C160,101.119288 158.880712,100 157.5,100 L97.5,100 L97.5,100 C96.1192881,100 95,101.119288 95,102.5 L95,102.5 L95,102.5 C95,103.880712 93.8807119,105 92.5,105 Z\" />\n    <g transform=\"translate(120 64)\">\n      <path fill=\"#95999D\" d=\"M34.6666667,64 L5.33333333,64 C2.38666667,64 0,61.5067826 0,58.4347826 L0,5.56521739 C0,2.49321739 2.38666667,0 5.33333333,0 L34.6666667,0 C37.6106667,0 40,2.49321739 40,5.56521739 L40,58.4347826 C40,61.5067826 37.6106667,64 34.6666667,64 Z\" />\n      <path stroke=\"#F5F6F7\" d=\"M16,3.00195312 L24,3\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n      <path fill=\"#F5F6F7\" d=\"M23,59 C23,60.656 21.656,62 20,62 C18.344,62 17,60.656 17,59 C17,57.344 18.344,56 20,56 C21.656,56 23,57.344 23,59 L23,59 Z\" />\n      <rect width=\"36\" height=\"50\" x=\"2\" y=\"6\" fill=\"#32363F\" rx=\"1\" />\n    </g>\n  </g>\n</symbol>"
});
var result = svg_sprite_loader_runtime_browser_sprite_build__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),

/***/ "hCC0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Passphrase2FA", function() { return Passphrase2FA; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cLsY");
/* harmony import */ var cozy_ui_react_Input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("zA8p");
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("J+JL");
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styles_view__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var styles_fields__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("Cp2o");
/* harmony import */ var styles_fields__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(styles_fields__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("KXWi");
/* harmony import */ var components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("4DAK");
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("sCQG");
var config__WEBPACK_IMPORTED_MODULE_8___namespace = /*#__PURE__*/__webpack_require__.t("sCQG", 1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










var Passphrase2FA =
/*#__PURE__*/
function (_Component) {
  _inherits(Passphrase2FA, _Component);

  function Passphrase2FA(props) {
    var _this;

    _classCallCheck(this, Passphrase2FA);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Passphrase2FA).call(this, props));
    _this.state = {
      twoFactorCode: ''
    };
    return _this;
  }

  _createClass(Passphrase2FA, [{
    key: "onChange",
    value: function onChange(newVal) {
      this.setState(function () {
        return {
          twoFactorCode: newVal
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          t = _this$props.t,
          onPassphrase2FASubmit = _this$props.onPassphrase2FASubmit,
          closeTwoFAPassphraseModal = _this$props.closeTwoFAPassphraseModal,
          instance = _this$props.instance,
          submitting = _this$props.submitting;
      var twoFactorCode = this.state.twoFactorCode;
      var email = instance && instance.data.attributes.email;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles_view__WEBPACK_IMPORTED_MODULE_4___default.a['set-view-content-twofa-modal-wrapper']
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_2__["default"], {
        dismissAction: closeTwoFAPassphraseModal,
        className: styles_view__WEBPACK_IMPORTED_MODULE_4___default.a['set-view-content-twofa-modal'],
        title: t('ProfileView.twofa.passphrase.title')
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_2__["ModalContent"], {
        className: styles_view__WEBPACK_IMPORTED_MODULE_4___default.a['set-view-content-twofa-modal-content']
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_7__["default"], {
        source: t('ProfileView.twofa.passphrase.description', {
          email: email
        })
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles_view__WEBPACK_IMPORTED_MODULE_4___default.a['set-view-content-twofa-modal-confirmation-input']
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Input__WEBPACK_IMPORTED_MODULE_3__["default"], {
        name: "two_factor_mail",
        type: "text",
        value: twoFactorCode,
        onChange: function onChange(e) {
          return _this2.onChange(e.target.value);
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles_view__WEBPACK_IMPORTED_MODULE_4___default.a['set-view-content-twofa-modal-nocode']
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, t('ProfileView.twofa.modal.nocode')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, t('ProfileView.twofa.modal.nocode_claude'), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "mailto{settingsConfig.contactEmail}"
      }, config__WEBPACK_IMPORTED_MODULE_8__.contactEmail)))), !email && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: styles_fields__WEBPACK_IMPORTED_MODULE_5___default.a['coz-form-errors']
      }, t('ProfileView.twofa.modal.email')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles_view__WEBPACK_IMPORTED_MODULE_4___default.a['set-view-content-twofa-modal-content-right-buttons']
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_6__["Button"], {
        onClick: closeTwoFAPassphraseModal,
        theme: "secondary",
        label: t('ProfileView.twofa.modal.button.cancel')
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_6__["Button"], {
        onClick: function onClick() {
          return onPassphrase2FASubmit(twoFactorCode);
        },
        "aria-busy": submitting,
        disabled: !email,
        label: t('ProfileView.twofa.modal.button.validate')
      })))));
    }
  }]);

  return Passphrase2FA;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__["translate"])()(Passphrase2FA));

/***/ }),

/***/ "ibJU":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profil","activated_services":"Aktywne usługi","connected_devices":"Połączone urządzenia","sessions":"Połączenia","storage":"Magazyn","email_notifications":"Powiadomienie e-mail"},"Loading":{"loading":"Wczytywanie"},"Empty":{"devices":{"title":"Nie masz podłączonych urządzeń","text":"Instalując różne aplikacje klienckie zawsze będziesz równoczesny dostęp do swoich plików na wszystkich urządzeniach. Cozy będzie zawsze w zasięgu ręki, nawet kiedy jesteś w drodze!","link":{"href":"https://cozy.io/en/download/","text":"Pobierz jedną z naszych aplikacji"}}},"ProfileView":{"instance":{"server_error":"Coś poszło nie tak po stronie serwera. Proszę, odśwież stronę."},"title":"Profil","password":{"title":"Hasło","show":"Pokaż","hide":"Ukryj","server_error":"Coś poszło nie tak. Twoje hasło nie zostało zapisane.","password_too_weak":"Twoje hasło jest za słabe. Powinieneś korzystać z dużych liter, cyfr, znaków specjalnych lub dłuższego hasła.","wrong_password":"Aktualne hasło wygląda na błędne.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Twoje hasło zostało zmienione.","reset_link":"Zapomniałeś obecnego hasła?","submit_label":"Zmień swoje hasło","reload":"Twoje hasło zostało zmienione. Strona przeładuje się teraz aby aktywować wprowadzone zmiany."},"current_password":{"label":"Wprowadź swoje obecne hasło","placeholder":"Obecne hasło"},"new_password":{"label":"Wprowadź Twoje nowe hasło","placeholder":"Nowe hasło"},"infos":{"success":"Twoje dane zostały zmienione","server_error":"Coś poszło nie tak. Twoje dane nie mogły zostać zapisane.","empty":"To pole nie może być puste"},"email":{"title":"E-mail","label":"Cozy potrzebuje Twojego adresu e-mail aby wysyłać powiadomienia oraz umożliwić odzyskanie hasła","error":"Adres e-mail nie wygląda na prawidłowy. Czy jesteś pewien, że wpisałeś go prawidłowo (np. janek@kowalski.pl)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Nazwa użytkownika","label":"Twoja nazwa użytkownika będzie wyświetlana gdy udostępniasz pliki za pomocą Cozy innym użytkownikom."},"tracking":{"title":"Pomóż ulepszać nasz produkt","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Język","label":"To będzie język Twojego Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Połączone urządzenia","load_error":"Wystąpił błąd w trakcie wczytywania Twoich urządzeń, proszę spróbuj za chwilę.","head_name":"Nazwa","head_sync":"Ostatnia synchronizacja","head_activity":"Ostatnia aktywność","head_permissions":"Pozwolenia","head_actions":"Akcje","revoke":"unieważnij","sync_date_format":"MMM D, RRRR"},"StorageView":{"title":"Magazyn","load_error":"Wystąpił błąd podczas wczytywania informacji o Twoim magazynie, proszę spróbuj za chwilę.","storage_title":"Całkowita pojemność","storage_phrase":"%{diskUsage} GB z %{diskQuota} GB wykorzystane","more_space":"Potrzebujesz więcej przestrzeni?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Historia połączeń","sync_date_format":"MMM D, RRRR","delete":"Zakończ wszystkie inne sesje","infos":{"server_error":"Coś poszło nie tak po stronie serwera. Proszę odśwież stronę.","sessions_deleted":"Wszystkie inne sesje zostały zakończone."}},"revokeDevice":{"title":"Unieważnij to urządzenie","description":"Chcesz odłączyć **%{name}**.","subText":"To natychmiastowo zatrzyma synchronizację z tym urządzeniem.","validate":"Unieważnij urządzenie","error":"Nie można unieważnić urządzenia, spróbuj odświeżyć stronę."},"ServicesView":{"title":"Uruchomione usługi","load_error":"Wystąpił błąd w trakcie ładowania Twoich usług, proszę spróbuj za chwilę.","head_services":"Usługi","head_account":"Konto","head_sync":"Ostatnia synchronizacja","head_status":"Status","unsync":"Niezsynchronizowany","konnector_link":"Uzyskaj dostęp do całej listy usług"},"soon":{"title":"Dostępne wkrótce","description":"Ta funkcja nie jest jeszcze dostępna. Celem uzyskania dokładniejszych informacji skontaktuj się z nami pod adresem contact@cozycloud.cc"},"support":{"title":"Cześć! Jak możemy Ci pomóc?","emailDetail":"Wiadomość zostanie wysłana z Twojego adresu e-mail zapisanego w ustawieniach Cozy.","fields":{"message":{"title":"Twoje zapytanie","placeholder":"Mów nam o wszystkim (pytaj o pomoc, dziel się opinią albo po prostu powiedz \"Cześć\"). Będzie nam miło móc z Tobą rozmawiać."}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Zaczynajmy!","sending":"Wysyłanie...","success":"Twoja wiadomość została wysłana. Dziękujemy!","error":"Wystąpił błąd podczas wysyłania Twojej wiadomości"},"claudy":{"title":"Jak posługiwać się Twoim Cozy?","actions":{"desktop":{"title":"Uzyskaj dostęp do plików z Twojego komputera","description":"Synchronizuj wszystkie pliki na Cozy Drive z Twoim komputerem","button":"Zainstaluj Cozy Drive na swoim komputerze","link":"https://cozy.io/en/download/"},"mobile":{"title":"Twórz kopie zapasowe i synchronizuj swoje zdjęcia z urządzenia mobilnego","description":"Wszystkie Twoje wspomnienia są bezpieczne na Twoim Cozy Drive","button":"Zainstaluj Cozy Drive na Twoim urządzeniu mobilnym","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Wracaj do swoich rachunków w dowolnej chwili","description":"Cozy Collect natychmiast organizuje wszystkie Twoje pliki","button":"Poznaj Cozy Collect"},"support":{"title":"Skontaktuj się z nami","description":"Cześć! Jak możemy Ci pomóc?","emailDetail":"Twoja wiadomość będzie wysłana z adresu e-mail zapisanego w ustawieniach Cozy.","fields":{"message":{"title":"Twoje zapytanie","placeholder":"Mów nam o wszystkim (pytaj o pomoc, dziel się opinią albo po prostu powiedz \"Cześć\"). Będzie nam miło móc z Tobą rozmawiać."}},"button":"Zaczynajmy!","sending":"Wysyłanie","success":"Twoja wiadomość została wysłana. Dziękujemy!","error":"Wystąpił błąd podczas wysyłania Twojej wiadomości"}}},"errors":{"noEmailFound":"Nie znaleziono adresu e-mail. Dodaj go w ustawieniach Twojego Cozy i spróbuj raz jeszcze."}};

/***/ }),

/***/ "jOXx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmModal", function() { return ConfirmModal; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cLsY");
/* eslint-disable */



var ConfirmModal = function ConfirmModal(props) {
  var dismissAction = props.dismissAction,
      primaryAction = props.primaryAction,
      t = props.t;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_2__["default"], {
    closable: true,
    dismissAction: dismissAction,
    primaryAction: primaryAction,
    primaryText: t('DeleteAccount.modal.confirm.button.submit.label'),
    primaryType: "danger",
    secondaryAction: dismissAction,
    secondaryText: t('DeleteAccount.modal.confirm.button.cancel.label'),
    size: "small"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_2__["ModalHeader"], null, t('DeleteAccount.modal.confirm.title')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_2__["ModalContent"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, t('DeleteAccount.modal.confirm.description.line.1')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, t('DeleteAccount.modal.confirm.description.line.2')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, t('DeleteAccount.modal.confirm.description.line.3')))));
};
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__["translate"])()(ConfirmModal));

/***/ }),

/***/ "jWgV":
/***/ (function(module, exports) {

// Return true if given email is a valid email, false either.
module.exports.isValidEmail = function (email) {
  var emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email != null && email.length > 0 && emailRegexp.test(email);
};

/***/ }),

/***/ "jYLR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTIVATE_2FA", function() { return ACTIVATE_2FA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTIVATE_2FA_FAILURE", function() { return ACTIVATE_2FA_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTIVATE_2FA_SUCCESS", function() { return ACTIVATE_2FA_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DESACTIVATE_2FA", function() { return DESACTIVATE_2FA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DESACTIVATE_2FA_FAILURE", function() { return DESACTIVATE_2FA_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DESACTIVATE_2FA_SUCCESS", function() { return DESACTIVATE_2FA_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHECK_TWO_FACTOR_CODE", function() { return CHECK_TWO_FACTOR_CODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHECK_TWO_FACTOR_CODE_FAILURE", function() { return CHECK_TWO_FACTOR_CODE_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHECK_TWO_FACTOR_CODE_SUCCESS", function() { return CHECK_TWO_FACTOR_CODE_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CANCEL_2FA_ACTIVATION", function() { return CANCEL_2FA_ACTIVATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUTH_MODE", function() { return AUTH_MODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "activate2FA", function() { return activate2FA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "desactivate2FA", function() { return desactivate2FA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cancel2FAActivation", function() { return cancel2FAActivation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkTwoFactorCode", function() { return checkTwoFactorCode; });
/* harmony import */ var actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9At1");

/**
 * The order of actions
 *
 * 1. ACTIVATE_FA
 * 2. CHECK_TWO_FACTOR_CODE
 */

var ACTIVATE_2FA = 'ACTIVATE_2FA';
var ACTIVATE_2FA_FAILURE = 'ACTIVATE_2FA_FAILURE';
var ACTIVATE_2FA_SUCCESS = 'ACTIVATE_2FA_SUCCESS';
var DESACTIVATE_2FA = 'DESACTIVATE_2FA';
var DESACTIVATE_2FA_FAILURE = 'DESACTIVATE_2FA_FAILURE';
var DESACTIVATE_2FA_SUCCESS = 'DESACTIVATE_2FA_SUCCESS';
var CHECK_TWO_FACTOR_CODE = 'CHECK_TWO_FACTOR_CODE';
var CHECK_TWO_FACTOR_CODE_FAILURE = 'CHECK_TWO_FACTOR_CODE_FAILURE';
var CHECK_TWO_FACTOR_CODE_SUCCESS = 'CHECK_TWO_FACTOR_CODE_SUCCESS';
var CANCEL_2FA_ACTIVATION = 'CANCEL_2FA_ACTIVATION';
var AUTH_MODE = {
  TWO_FA_MAIL: 'two_factor_mail',
  BASIC: 'basic'
};
var activate2FA = function activate2FA() {
  var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : AUTH_MODE.TWO_FA_MAIL;
  return function (dispatch) {
    dispatch({
      type: ACTIVATE_2FA
    });
    Object(actions__WEBPACK_IMPORTED_MODULE_0__["cozyFetch"])('PUT', '/settings/instance/auth_mode', {
      auth_mode: mode
    }).then(function () {
      dispatch({
        type: ACTIVATE_2FA_SUCCESS
      });
    }).catch(function () {
      dispatch({
        type: ACTIVATE_2FA_FAILURE,
        error: 'ProfileView.infos.server_error'
      });
    });
  };
};
var desactivate2FA = function desactivate2FA() {
  return function (dispatch) {
    dispatch({
      type: DESACTIVATE_2FA
    });
    Object(actions__WEBPACK_IMPORTED_MODULE_0__["cozyFetch"])('PUT', '/settings/instance/auth_mode', {
      auth_mode: AUTH_MODE.BASIC
    }).then(function () {
      dispatch({
        type: DESACTIVATE_2FA_SUCCESS
      });
    }).catch(function () {
      dispatch({
        type: DESACTIVATE_2FA_FAILURE,
        error: 'ProfileView.infos.server_error'
      });
    });
  };
};
var cancel2FAActivation = function cancel2FAActivation() {
  return function (dispatch) {
    dispatch({
      type: CANCEL_2FA_ACTIVATION
    });
  };
};
var checkTwoFactorCode = function checkTwoFactorCode(code) {
  var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : AUTH_MODE.TWO_FA_MAIL;
  return function (dispatch) {
    dispatch({
      type: CHECK_TWO_FACTOR_CODE,
      code: code
    }); // Check if the field is empty or not

    if (code === '') {
      dispatch({
        type: CHECK_TWO_FACTOR_CODE_FAILURE,
        error: 'ProfileView.infos.empty'
      });
      return;
    }

    Object(actions__WEBPACK_IMPORTED_MODULE_0__["cozyFetch"])('PUT', '/settings/instance/auth_mode', {
      two_factor_activation_code: code,
      auth_mode: mode
    }).then(function () {
      dispatch({
        type: CHECK_TWO_FACTOR_CODE_SUCCESS,
        field: 'auth_mode',
        value: mode
      });
    }).catch(function () {
      dispatch({
        type: CHECK_TWO_FACTOR_CODE_FAILURE,
        error: 'ProfileView.infos.server_error'
      });
    });
  };
};

/***/ }),

/***/ "kVId":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "kuoQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ANjH");
/* harmony import */ var actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("9At1");



var context = function context() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.context || null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    default:
      return state;
  }
};

var lang = function lang() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.documentElement.getAttribute('lang') || 'en';
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions__WEBPACK_IMPORTED_MODULE_1__["SET_LANG"]:
      return action.lang;

    default:
      return state;
  }
};

var isFetching = function isFetching() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions__WEBPACK_IMPORTED_MODULE_1__["FETCH_INFOS"]:
    case actions__WEBPACK_IMPORTED_MODULE_1__["FETCH_DEVICES"]:
    case actions__WEBPACK_IMPORTED_MODULE_1__["DEVICE_REVOKE"]:
    case actions__WEBPACK_IMPORTED_MODULE_1__["FETCH_SESSIONS"]:
    case actions__WEBPACK_IMPORTED_MODULE_1__["FETCH_STORAGE"]:
    case actions__WEBPACK_IMPORTED_MODULE_1__["SESSIONS_DELETE_OTHERS"]:
      return true;

    case actions__WEBPACK_IMPORTED_MODULE_1__["FETCH_INFOS_SUCCESS"]:
    case actions__WEBPACK_IMPORTED_MODULE_1__["FETCH_INFOS_FAILURE"]:
    case actions__WEBPACK_IMPORTED_MODULE_1__["FETCH_DEVICES_SUCCESS"]:
    case actions__WEBPACK_IMPORTED_MODULE_1__["FETCH_DEVICES_FAILURE"]:
    case actions__WEBPACK_IMPORTED_MODULE_1__["DEVICE_REVOKE_SUCCESS"]:
    case actions__WEBPACK_IMPORTED_MODULE_1__["DEVICE_REVOKE_FAILURE"]:
    case actions__WEBPACK_IMPORTED_MODULE_1__["FETCH_SESSIONS_SUCCESS"]:
    case actions__WEBPACK_IMPORTED_MODULE_1__["FETCH_SESSIONS_FAILURE"]:
    case actions__WEBPACK_IMPORTED_MODULE_1__["FETCH_STORAGE_SUCCESS"]:
    case actions__WEBPACK_IMPORTED_MODULE_1__["FETCH_STORAGE_FAILURE"]:
    case actions__WEBPACK_IMPORTED_MODULE_1__["SESSIONS_DELETE_OTHERS_SUCCESS"]:
    case actions__WEBPACK_IMPORTED_MODULE_1__["SESSIONS_DELETE_OTHERS_FAILURE"]:
      return false;

    default:
      return state;
  }
};

var error = function error() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions__WEBPACK_IMPORTED_MODULE_1__["UPDATE_INFO_FAILURE"]:
      return {
        cause: action.error,
        critical: true
      };

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  isFetching: isFetching,
  context: context,
  lang: lang,
  error: error
}));

/***/ }),

/***/ "lCjD":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrackingSection", function() { return TrackingSection; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("buk/");
/* harmony import */ var components_Input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("efN2");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var TrackingSection =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(TrackingSection, _PureComponent);

  function TrackingSection() {
    _classCallCheck(this, TrackingSection);

    return _possibleConstructorReturn(this, _getPrototypeOf(TrackingSection).apply(this, arguments));
  }

  _createClass(TrackingSection, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          instance = _this$props.instance,
          fields = _this$props.fields,
          onChange = _this$props.onChange,
          t = _this$props.t;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Input__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
        name: "tracking",
        type: "checkbox",
        title: t('ProfileView.tracking.title'),
        label: t('ProfileView.tracking.label', {
          version: instance && instance.data.attributes.tos ? "-".concat(instance.data.attributes.tos) : '-201711'
        })
      }, fields.tracking, {
        onChange: onChange
      }));
    }
  }]);

  return TrackingSection;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__["translate"])()(TrackingSection));

/***/ }),

/***/ "lUKR":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "mra9":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "nJV4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_PASSPHRASE", function() { return UPDATE_PASSPHRASE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_PASSPHRASE_SUCCESS", function() { return UPDATE_PASSPHRASE_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_PASSPHRASE_FAILURE", function() { return UPDATE_PASSPHRASE_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESET_PASSPHRASE_FIELD", function() { return RESET_PASSPHRASE_FIELD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_PASSPHRASE_2FA_1", function() { return UPDATE_PASSPHRASE_2FA_1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_PASSPHRASE_2FA_1_SUCCESS", function() { return UPDATE_PASSPHRASE_2FA_1_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_PASSPHRASE_2FA_1_FAILURE", function() { return UPDATE_PASSPHRASE_2FA_1_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_PASSPHRASE_2FA_2", function() { return UPDATE_PASSPHRASE_2FA_2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_PASSPHRASE_2FA_2_SUCCESS", function() { return UPDATE_PASSPHRASE_2FA_2_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_PASSPHRASE_2FA_2_FAILURE", function() { return UPDATE_PASSPHRASE_2FA_2_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_HINT", function() { return UPDATE_HINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_HINT_SUCCESS", function() { return UPDATE_HINT_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_HINT_FAILURE", function() { return UPDATE_HINT_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updatePassphrase", function() { return updatePassphrase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updatePassphrase2FAFirst", function() { return updatePassphrase2FAFirst; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updatePassphrase2FASecond", function() { return updatePassphrase2FASecond; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateHint", function() { return updateHint; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o0o1");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("9At1");
/* harmony import */ var cozy_keys_lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("Bkvo");
/* harmony import */ var lib_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("7yAG");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var UPDATE_PASSPHRASE = 'UPDATE_PASSPHRASE';
var UPDATE_PASSPHRASE_SUCCESS = 'UPDATE_PASSPHRASE_SUCCESS';
var UPDATE_PASSPHRASE_FAILURE = 'UPDATE_PASSPHRASE_FAILURE';
var RESET_PASSPHRASE_FIELD = 'RESET_PASSPHRASE_FIELD'; // two factor steps

var UPDATE_PASSPHRASE_2FA_1 = 'UPDATE_PASSPHRASE_2FA_1';
var UPDATE_PASSPHRASE_2FA_1_SUCCESS = 'UPDATE_PASSPHRASE_2FA_1_SUCCESS';
var UPDATE_PASSPHRASE_2FA_1_FAILURE = 'UPDATE_PASSPHRASE_2FA_1_FAILURE';
var UPDATE_PASSPHRASE_2FA_2 = 'UPDATE_PASSPHRASE_2FA_2';
var UPDATE_PASSPHRASE_2FA_2_SUCCESS = 'UPDATE_PASSPHRASE_2FA_2_SUCCESS';
var UPDATE_PASSPHRASE_2FA_2_FAILURE = 'UPDATE_PASSPHRASE_2FA_2_FAILURE'; // hint

var UPDATE_HINT = 'UPDATE_HINT';
var UPDATE_HINT_SUCCESS = 'UPDATE_HINT_SUCCESS';
var UPDATE_HINT_FAILURE = 'UPDATE_HINT_FAILURE';

var getInstanceURL = function getInstanceURL() {
  return lib_client__WEBPACK_IMPORTED_MODULE_3__["default"].getStackClient().uri;
};

var invalidPassphraseErrorAction = {
  type: UPDATE_PASSPHRASE_FAILURE,
  errors: {
    currentPassphrase: 'PassphraseView.current_passphrase.wrong_passphrase'
  }
};
var defaultErrorAction = {
  type: UPDATE_PASSPHRASE_FAILURE,
  errors: {
    global: 'PassphraseView.server_error'
  }
};

var getErrorDetails = function getErrorDetails(error) {
  var vaultError = error && error.response && error.response.error;
  var stackError = error && error.errors && error.errors[0] && error.errors[0].detail;
  return vaultError || stackError;
};

var isInvalidPassphrase = function isInvalidPassphrase(errorDetails) {
  var potentialErrors = ['invalid password', 'Invalid passphrase'];
  return potentialErrors.includes(errorDetails);
};

var updatePassphraseFailure = function updatePassphraseFailure(error) {
  var details = getErrorDetails(error);

  if (isInvalidPassphrase(details)) {
    return invalidPassphraseErrorAction;
  }

  return defaultErrorAction;
};

var updatePassphrase = function updatePassphrase(currentPassphrase, newPassphrase) {
  var instanceURL = getInstanceURL();
  var vaultClient = new cozy_keys_lib__WEBPACK_IMPORTED_MODULE_2__["WebVaultClient"](instanceURL);
  return function (dispatch) {
    dispatch({
      type: UPDATE_PASSPHRASE
    });
    return vaultClient.login(currentPassphrase).then(function () {
      return vaultClient.computeNewHashAndKeys(currentPassphrase, newPassphrase);
    }).then(function (newHashAndKeys) {
      return Object(actions__WEBPACK_IMPORTED_MODULE_1__["cozyFetch"])('PUT', '/settings/passphrase', {
        current_passphrase: newHashAndKeys.currentPasswordHash,
        new_passphrase: newHashAndKeys.newPasswordHash,
        key: newHashAndKeys.newEncryptionKey.encryptedString,
        iterations: newHashAndKeys.kdfIterations
      });
    }).then(function () {
      dispatch({
        type: UPDATE_PASSPHRASE_SUCCESS
      });
      dispatch({
        type: RESET_PASSPHRASE_FIELD
      });
    }).catch(function (error) {
      var action = updatePassphraseFailure(error);
      dispatch(action);
      throw error;
    });
  };
};
var updatePassphrase2FAFirst = function updatePassphrase2FAFirst(currentPassphrase) {
  var instanceURL = getInstanceURL();
  var vaultClient = new cozy_keys_lib__WEBPACK_IMPORTED_MODULE_2__["WebVaultClient"](instanceURL);
  return function (dispatch) {
    dispatch({
      type: UPDATE_PASSPHRASE_2FA_1
    });
    return vaultClient.login(currentPassphrase).then(function () {
      return vaultClient.computeHashedPassword(currentPassphrase);
    }).then(function (currentPasswordHash) {
      return Object(actions__WEBPACK_IMPORTED_MODULE_1__["cozyFetch"])('PUT', '/settings/passphrase', {
        current_passphrase: currentPasswordHash
      });
    }).then(function (data) {
      dispatch({
        type: UPDATE_PASSPHRASE_2FA_1_SUCCESS,
        twoFactorToken: data.two_factor_token
      });
    }).catch(function (error) {
      var action = updatePassphraseFailure(error);
      dispatch(action);
      throw error;
    });
  };
};
var updatePassphrase2FASecond = function updatePassphrase2FASecond(currentPassphrase, newPassphrase, twoFactorCode, twoFactorToken) {
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(dispatch) {
        var instanceURL, vaultClient;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dispatch({
                  type: UPDATE_PASSPHRASE_2FA_2
                });
                instanceURL = getInstanceURL();
                vaultClient = new cozy_keys_lib__WEBPACK_IMPORTED_MODULE_2__["WebVaultClient"](instanceURL);
                return _context.abrupt("return", vaultClient.login(currentPassphrase).then(function () {
                  return vaultClient.computeNewHashAndKeys(currentPassphrase, newPassphrase);
                }).then(function (newHashAndKeys) {
                  return Object(actions__WEBPACK_IMPORTED_MODULE_1__["cozyFetch"])('PUT', '/settings/passphrase', {
                    new_passphrase: newHashAndKeys.newPasswordHash,
                    key: newHashAndKeys.newEncryptionKey.encryptedString,
                    iterations: newHashAndKeys.kdfIterations,
                    two_factor_token: twoFactorToken,
                    two_factor_passcode: twoFactorCode
                  });
                }).then(function () {
                  dispatch({
                    type: UPDATE_PASSPHRASE_2FA_2_SUCCESS
                  });
                  dispatch({
                    type: RESET_PASSPHRASE_FIELD
                  });
                }).catch(function (error) {
                  var errors = error.errors || [];

                  if (errors.length && errors[0].detail === 'Invalid two-factor parameters') {
                    dispatch({
                      type: UPDATE_PASSPHRASE_2FA_2_FAILURE,
                      errors: {
                        wrongTwoFactor: 'PassphraseView.wrong_two_fa_code'
                      }
                    });
                  } else {
                    dispatch({
                      type: UPDATE_PASSPHRASE_2FA_2_FAILURE,
                      errors: {
                        global: 'PassphraseView.server_error'
                      }
                    });
                  }

                  throw error;
                }));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};
var updateHint = function updateHint(hint) {
  return (
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(dispatch) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                dispatch({
                  type: UPDATE_HINT
                });
                _context2.prev = 1;
                _context2.next = 4;
                return Object(actions__WEBPACK_IMPORTED_MODULE_1__["cozyFetch"])('PUT', '/settings/hint', {
                  hint: hint
                });

              case 4:
                dispatch({
                  type: UPDATE_HINT_SUCCESS
                });
                _context2.next = 11;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](1);
                dispatch({
                  type: UPDATE_HINT_FAILURE,
                  errors: {
                    global: 'PassphraseView.server_error'
                  }
                });
                throw _context2.t0;

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 7]]);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }()
  );
};

/***/ }),

/***/ "nw0P":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./_lib/build_formatting_tokens_reg_exp/index.js": "kOWh",
	"./ar/build_distance_in_words_locale/index.js": "XxX6",
	"./ar/build_format_locale/index.js": "alis",
	"./ar/index.js": "EDRf",
	"./be/build_distance_in_words_locale/index.js": "LQ09",
	"./be/build_format_locale/index.js": "kj7F",
	"./be/index.js": "YEhR",
	"./bg/build_distance_in_words_locale/index.js": "7K3h",
	"./bg/build_format_locale/index.js": "RrdL",
	"./bg/index.js": "isx8",
	"./ca/build_distance_in_words_locale/index.js": "wqqj",
	"./ca/build_format_locale/index.js": "qcV0",
	"./ca/index.js": "Vwa+",
	"./cs/build_distance_in_words_locale/index.js": "ZKDM",
	"./cs/build_format_locale/index.js": "ipyF",
	"./cs/index.js": "dvhP",
	"./da/build_distance_in_words_locale/index.js": "2Mgc",
	"./da/build_format_locale/index.js": "Gned",
	"./da/index.js": "7ur/",
	"./de/build_distance_in_words_locale/index.js": "5IWf",
	"./de/build_format_locale/index.js": "THCn",
	"./de/index.js": "bgw5",
	"./el/build_distance_in_words_locale/index.js": "o/GB",
	"./el/build_format_locale/index.js": "8T9h",
	"./el/index.js": "dH0v",
	"./en/build_distance_in_words_locale/index.js": "LZbM",
	"./en/build_format_locale/index.js": "6DAA",
	"./en/index.js": "Us+F",
	"./eo/build_distance_in_words_locale/index.js": "qrnn",
	"./eo/build_format_locale/index.js": "Bl15",
	"./eo/index.js": "UB7v",
	"./es/build_distance_in_words_locale/index.js": "GEfZ",
	"./es/build_format_locale/index.js": "O+zC",
	"./es/index.js": "/S0t",
	"./fi/build_distance_in_words_locale/index.js": "VHtQ",
	"./fi/build_format_locale/index.js": "Oydx",
	"./fi/index.js": "ndVD",
	"./fil/build_distance_in_words_locale/index.js": "uq4p",
	"./fil/build_format_locale/index.js": "d7hw",
	"./fil/index.js": "pNfm",
	"./fr/build_distance_in_words_locale/index.js": "IzMR",
	"./fr/build_format_locale/index.js": "I3Zg",
	"./fr/index.js": "LKA2",
	"./hr/build_distance_in_words_locale/index.js": "DPvn",
	"./hr/build_format_locale/index.js": "puw3",
	"./hr/index.js": "L9Jq",
	"./hu/build_distance_in_words_locale/index.js": "w2RQ",
	"./hu/build_format_locale/index.js": "/0iD",
	"./hu/index.js": "Nm+E",
	"./id/build_distance_in_words_locale/index.js": "JbvB",
	"./id/build_format_locale/index.js": "0wlw",
	"./id/index.js": "A6C3",
	"./is/build_distance_in_words_locale/index.js": "qzMC",
	"./is/build_format_locale/index.js": "S3yD",
	"./is/index.js": "N4bE",
	"./it/build_distance_in_words_locale/index.js": "MDEp",
	"./it/build_format_locale/index.js": "aUJd",
	"./it/index.js": "hmb4",
	"./ja/build_distance_in_words_locale/index.js": "nNvt",
	"./ja/build_format_locale/index.js": "buui",
	"./ja/index.js": "uAXs",
	"./ko/build_distance_in_words_locale/index.js": "oEw+",
	"./ko/build_format_locale/index.js": "9SQf",
	"./ko/index.js": "iW8+",
	"./mk/build_distance_in_words_locale/index.js": "nmwZ",
	"./mk/build_format_locale/index.js": "htxJ",
	"./mk/index.js": "GzBU",
	"./nb/build_distance_in_words_locale/index.js": "SL1f",
	"./nb/build_format_locale/index.js": "CJ5F",
	"./nb/index.js": "73vv",
	"./nl/build_distance_in_words_locale/index.js": "Uyu0",
	"./nl/build_format_locale/index.js": "doCD",
	"./nl/index.js": "hCQt",
	"./pl/build_distance_in_words_locale/index.js": "FUBD",
	"./pl/build_format_locale/index.js": "nOYf",
	"./pl/index.js": "B6yL",
	"./pt/build_distance_in_words_locale/index.js": "aTPA",
	"./pt/build_format_locale/index.js": "TTT0",
	"./pt/index.js": "gdks",
	"./ro/build_distance_in_words_locale/index.js": "gI+A",
	"./ro/build_format_locale/index.js": "njjO",
	"./ro/index.js": "r2yp",
	"./ru/build_distance_in_words_locale/index.js": "KmPx",
	"./ru/build_format_locale/index.js": "UUBw",
	"./ru/index.js": "nz/o",
	"./sk/build_distance_in_words_locale/index.js": "q2Bs",
	"./sk/build_format_locale/index.js": "9sxn",
	"./sk/index.js": "Wqan",
	"./sl/build_distance_in_words_locale/index.js": "mlv2",
	"./sl/build_format_locale/index.js": "vHkZ",
	"./sl/index.js": "KYSo",
	"./sr/build_distance_in_words_locale/index.js": "LlkS",
	"./sr/build_format_locale/index.js": "RhjJ",
	"./sr/index.js": "7mU3",
	"./sv/build_distance_in_words_locale/index.js": "UNBN",
	"./sv/build_format_locale/index.js": "zTNB",
	"./sv/index.js": "hxgj",
	"./th/build_distance_in_words_locale/index.js": "XAGa",
	"./th/build_format_locale/index.js": "We2s",
	"./th/index.js": "Pk+z",
	"./tr/build_distance_in_words_locale/index.js": "aFZF",
	"./tr/build_format_locale/index.js": "jh7A",
	"./tr/index.js": "3ZWG",
	"./zh_cn/build_distance_in_words_locale/index.js": "KdB7",
	"./zh_cn/build_format_locale/index.js": "l4EP",
	"./zh_cn/index.js": "8tMq",
	"./zh_tw/build_distance_in_words_locale/index.js": "vyyr",
	"./zh_tw/build_format_locale/index.js": "uYH7",
	"./zh_tw/index.js": "QPlQ"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "nw0P";

/***/ }),

/***/ "oEje":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ANjH");
/* harmony import */ var actions_passphrase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("nJV4");



var submitting = function submitting() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["UPDATE_PASSPHRASE"]:
    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["UPDATE_PASSPHRASE_2FA_1"]:
    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["UPDATE_HINT"]:
      return true;

    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["UPDATE_PASSPHRASE_SUCCESS"]:
    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["UPDATE_PASSPHRASE_FAILURE"]:
    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["UPDATE_PASSPHRASE_2FA_1_FAILURE"]:
    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["UPDATE_PASSPHRASE_2FA_1_SUCCESS"]:
      return false;

    default:
      return state;
  }
};

var twoFactorToken = function twoFactorToken() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["UPDATE_PASSPHRASE_2FA_1"]:
    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["UPDATE_PASSPHRASE_2FA_1_FAILURE"]:
      return null;

    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["UPDATE_PASSPHRASE_2FA_1_SUCCESS"]:
      return action.twoFactorToken;

    default:
      return state;
  }
};

var submitting2FAStep2 = function submitting2FAStep2() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["UPDATE_PASSPHRASE_2FA_2"]:
      return true;

    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["UPDATE_PASSPHRASE_2FA_2_FAILURE"]:
    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["UPDATE_PASSPHRASE_2FA_2_SUCCESS"]:
      return false;

    default:
      return state;
  }
};

var saved = function saved() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["UPDATE_PASSPHRASE_SUCCESS"]:
    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["UPDATE_PASSPHRASE_2FA_2_SUCCESS"]:
      return true;

    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["RESET_PASSPHRASE_FIELD"]:
      return false;

    default:
      return state;
  }
};

var errors = function errors() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["UPDATE_PASSPHRASE"]:
    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["UPDATE_PASSPHRASE_2FA_1"]:
    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["UPDATE_PASSPHRASE_SUCCESS"]:
    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["UPDATE_PASSPHRASE_2FA_2_SUCCESS"]:
    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["UPDATE_HINT_SUCCESS"]:
      return null;

    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["UPDATE_PASSPHRASE_2FA_1_FAILURE"]:
    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["UPDATE_PASSPHRASE_2FA_2_FAILURE"]:
    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["UPDATE_PASSPHRASE_FAILURE"]:
    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["UPDATE_HINT_FAILURE"]:
      return action.errors;

    default:
      return state;
  }
};

var passphrase = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  submitting: submitting,
  submitting2FAStep2: submitting2FAStep2,
  saved: saved,
  twoFactorToken: twoFactorToken,
  errors: errors
});
/* harmony default export */ __webpack_exports__["default"] = (passphrase);

/***/ }),

/***/ "oway":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Borrar su cuenta","label":"Usted puede borrar su Cozy en cualquier momento. Tenga cuidado, al borrar su cuenta sus datos se borrarán completamente y no hay marcha atrás.","button":{"label":"Eliminar mi cuenta"},"error":{"message":"Ha ocurrido un error durante la solicitud de eliminar la cuenta. Vuelva a ensayar o contacte nuestro servicio de ayuda."},"modal":{"confirm":{"title":"¿Eliminar su Cozy?","description":{"line":{"1":"Su Cozy ha sido eliminado","2":"Usted no podrá acceder mùas a su Cozy","3":"Todos sus datos han sido eliminados"}},"button":{"cancel":{"label":"Anular"},"submit":{"label":"Eliminar"}}},"form":{"title":"Solicitud de eliminación de su Cozy","reason":{"label":"¿Por qué quiere eliminar su Cozy (opcional)?"},"button":{"cancel":{"label":"Anular"},"submit":{"label":"Enviar"}}}},"request":{"mail":{"subject":"Solicitud de eleminación de %{domain}"}},"success":{"message":"Su solicitud de eliminación ha sido enviada."}},"Nav":{"profile":"Perfil","activated_services":"Servicios activados","connected_devices":"Periféricos conectados","sessions":"Conexiones","storage":"Almacenamiento","email_notifications":"Notificaciones por correo electrónico"},"Loading":{"loading":"Cargando"},"Empty":{"devices":{"title":"No hay ningún periférico conectado","text":"Al instalarla en sus distintos periféricos, usted podrá acceder simultáneamente a sus archivos desde las diferentes pantallas.","link":{"href":"https://cozy.io/es/download/\n","text":"Descargue una de nuestras aplicaciones"}}},"ProfileView":{"instance":{"server_error":"Algo no ha funcionado en el servidor. Por favor, recargue la página."},"title":"Perfil","password":{"title":"Contraseña","show":"Mostrar","hide":"Ocultar","server_error":"Algo ha ido mal.  Su contraseña no ha sido grabada.","password_too_weak":"Su contraseña es muy débil. Añada una mayúscula, un número, un carácter especial o escoger una contraseña más larga.","wrong_password":"La contraseña actual parece errónea.","wrong_two_fa_code":"El código de dos factores suministrado parece incorrecto","success":"Su contraseña ha sido cambiada.","reset_link":"¿Ha olvidado su contraseña actual?","submit_label":"Cambie su contraseña","reload":"Su contraseña ha sido cambiada. La página va a recargarse, así los cambios podrán surtir efecto."},"current_password":{"label":"Escriba su contraseña actual ","placeholder":"Contraseña actual"},"new_password":{"label":"Escriba su nueva contraseña","placeholder":"Nueva contraseña"},"infos":{"success":"Sus datos han sido cambiados","server_error":"Algo no funcionó. Sus datos no se han podido guardar.","empty":"Este campo no puede estar vacío"},"email":{"title":"Correo electrónico","label":"Cozy necesita su correo electrónico para enviarle notificaciones y permitirle recuperar su contraseña.","error":"Su correo electrónico no parece correcto. ¿Está usted seguro de haberlo escrito correctamente (p.e. antonio@banderas.com)?"},"twofa":{"title":{"activate":"Autenticación en dos pasos","desactivate":"Desactivar la autenticación en dos pasos","validation":"Validar la autenticación en dos pasos"},"passphrase":{"title":"Autenticación en dos pasos","description":"Su Cozy envía un código de validación de 6 dígitos a %{email}.\\nIntroduzca el código arriba mencionado para cambiar su contraseña:."},"label":"Debido a que dos pasos son mejores que uno, mejore la seguridad de su Cozy con un paso adicional. [Échele un vistazo a nuestro sitio web de asistencia?]( %{link})","modal":{"code":"código","protect":"Proteger su Cozy con una autenticación en dos pasos","change":"¿Qué está cambiando?** Cada vez que usted se conecta a su Cozy, va a necesitar su contraseña y un código de validación. 1[¿Échele un vistazo a nuestro sitio web de asistencia?](%{link})","secu_title":"Agregar un nivel de seguridad adicional","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Mejorar la protección de sus datos","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"¿Etá usted seguro de querer desactivar esta opción?","desactivate_description":"Al hacer clic en el botón \"Desactivar\", su contraseña será la única clave para acceder a su Cozy. Anulará un nivel de seguridad.","confirmation_title":"Validación del código de confirmación","confirmation_description":"Su Cozy envía un código de validación de 6 dígitos a %{email}.\nIntroduzca el código arriba mencionado para activar la autenticación.","nocode":"¿No ha recibido  usted un código?","nocode_claude":"Contactar a Claudia al","validation_title":"Felicitaciones! Su dirección de correo electrónico ha sido confirmada.","validation_description":"Su Cozy ahora esta seguro con la identificación a 2 pasos.","validation_logs":"Remember your identifiers:","email":"Debe suministrar una dirección de correo electrónico válida","button":{"activate":"Activar la autenticación","cancel":"anular","desactivate":"desactivar","validate":"validar","terminate":"terminar"}}},"public_name":{"title":"Usuario","label":"Su nombre de usuario será visualizado cuando usted comparta archivos con usuarios Cozy."},"tracking":{"title":"Ayúdenos a mejorar nuestro producto","label":"Autorizar Cozy Cloud a adquirir anónimamente sus datos de uso para mejorar nuestro producto. [Manténgase informado sobre los compromisis de Cozy](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"Mis datos","label":"Cozy se compromete a proporcionarle todos los datos que la plataforma almacena sobre usted:","link":"Descargar una copia de mis datos","server_error":"Algo ha ido mal, por favor vuelva a ensayar o contáctenos.","fetch_error":"Algo salió mal al tratar de obtener sus datos de exportación. Por favor, inténtelo de nuevo o póngase en contacto con nosotros.","missing_error":"Parece que el archivo ha desaparecido o ha caducado. Por favor, inténtelo de nuevo o póngase en contacto con nosotros.","success":"Su solicitud ha sido correctamente enviada!","modal":{"title":"Recuperar mis datos","description":"Cozy se encarga de obtener todos los datos que le conciernen y de enviarle un archivo para que lo descargue, el cual le será enviado a la dirección de correo electrónico __%{email}__ cuando el archivo esté disponible.","cancel":"Anular","CTA":"Enviarme mis datos"},"download":{"title":"Descargar mis datos","description":"Aquí están todos los archivos de datos disponibles en su Cozy:","CTA":"Descargar el archivo","CTA_part":"Descargar (part %{number})"}},"locale":{"title":"Idioma","label":"Éste será el idioma utilizado en su Cozy.","contrib":"¿Está usted interesado(a) en ayudar a traducir Cozy? [Mire a ver si puede **darnos una mano** en eso](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"Francés","en":"Inglés","es":"Español","ja":"Japonés","nl":"Holandés","de":"Alemán","ru":"Ruso","nl_NL":"Holandés","ko":"Coreano","pl":"Polonés","pt":"Portugués","da":"Danés","ro_RO":"Rumano","pt_BR":"Partugués (Brasil)","zh_CN":"Chino (China)","ar":"Arabe","it":"Italiano","ro":"Rumano","eo":"Esperanto","de_DE":"Alemán (Alemania)","sq":"Albanés","tr":"Turco","uk_UA":"Ucraniano (Ucrania)","ru_RU":"Ruso (Rusia)","sq_AL":"Albanés (Albania)","ca":"Catalán","ca_ES":"Catalán (Esoaña)","zh":"Chino","zh_TW":"Chino (Taiwan)","cs":"Checo","cs_CZ":"Checo (República Checa)","el":"Griego","id":"Indonesio","it_IT":"Italiano (Italia)","sk":"Eslovaco","sk_SK":"Eslovaco (Eslovaquia)","es_CO":"Español (Colombia)","es_ES":"Español (España)","sv":"Sueco"}},"DevicesView":{"title":"Periféricos conectados","load_error":"Ha ocurrido un error al cargar sus periféricos, por favor vuelva a ensayar más tarde.","head_name":"Nombre","head_sync":"Última sincronización","head_activity":"Última actividad","head_permissions":"Autorizaciones","head_actions":"Acciones","revoke":"revocar","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Almacenamiento","load_error":"Ha ocurrido un error al cargar la información de su almacenamiento, por favor vuelva a ensayar más tarde.","storage_title":"Espacio total","storage_phrase":"%{diskUsage} GB de %{diskQuota} GB usado","more_space":"¿Necesita más espacio de almacenamiento?","see_offer":"Actualizar mi almacenamiento"},"SessionsView":{"title":"Historial de conexiones","sync_date_format":"MMM D, YYYY","delete":"Borrar todas las otras sesiones","infos":{"server_error":"Algo no ha funcionado en el servidor. Por favor, recargue la página.","sessions_deleted":"Todas las demás sesiones han sido borradas."}},"revokeDevice":{"title":"Revocar este periférico","description":"Estás desvinculando **%{name}**.","subText":"Esto parará la sincronización con este periférico.","validate":"Revocar el periférico","error":"Incapaz de revocar el periférico, trate de recargar la página."},"ServicesView":{"title":"Servicio activados","load_error":"Ha ocurrido un error al cargar sus servicios, por favor vuelva a ensayar más tarde.","head_services":"Servicios","head_account":"Cuenta","head_sync":"Última sincronización","head_status":"Estatus","unsync":"No sincronizafo","konnector_link":"Acceder a la totalidad de los servicios aquí"},"soon":{"title":"Pronto vendrá","description":"Esta función no está válida todavía. Para mayores informes, no dude en contáctarnos en contact@cozycloud.cc"},"support":{"title":"¡Hola! ¿Podemos ayudarle?","emailDetail":"Su mensaje se enviará a partir de su email que aparece en los parámetros de Cozy.","fields":{"message":{"title":"Su solicitud","placeholder":"Díganos algo (una solicitud de ayuda, comparta un comentario o díganos hola). Contentos estaremos de comunicar con usted."}},"response_email":{"subject":"Su solicitud se ha recibido correctamente","body":"Hola, \n\nHemos recibido correctamente su solicitud de soporte:\n%{message}\n\nEstamos haciendo todo lo posible para responderle lo antes posible.\n\nClaude de Cozy."},"button":"¡Adelante!","sending":"Enviando...","success":"Su mensaje se ha enviado. Gracias!","error":"Ha ocurrido un error al enviar su mensaje"},"claudy":{"title":"¿Cómo pilotear su Cozy?","actions":{"desktop":{"title":"Acceda a sus archivos en su ordenador","description":"Sincronice todos sus archivos Cozy Drive con su ordenador","button":"Instale Cozy Drive en su ordenador de escritorio","link":"https://cozy.io/es/download/\n"},"mobile":{"title":"Haga una copia de seguridad y sincronice todas sus imágenes de su celular","description":"Todos sus archivos en memoria están seguros en su Cozy Drive","button":"Instale la aplicación Coey Drive en su celular","link":"https://cozy.io/es/download/\n"},"cozy-collect":{"title":"Recupere sus facturas instantáneamente","description":"Cozy Collect organiza todos sus archivos instantáneamente","button":"Descubra Cozy Collect"},"support":{"title":"Contáctenos","description":"¡Hola! ¿Podemos ayudarle?","emailDetail":"Su mensaje se enviará a partir de su email que aparece en los parámetros de Cozy.","fields":{"message":{"title":"Su solicitud","placeholder":"Díganos algo (una solicitud de ayuda, comparta un comentario o díganos hola). Contentos estaremos de comunicar con usted."}},"button":"¡Adelante!","sending":"Enviando...","success":"Su mensaje se ha enviado. Gracias!","error":"Ha ocurrido un error al enviar su mensaje"}}},"errors":{"noEmailFound":"No se encontró ninguna dirección email. Por favor, vuelva a poner una en los parámetros de su Cozy."}};

/***/ }),

/***/ "pOQv":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "phCq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styles_table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("F+se");
/* harmony import */ var styles_table__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styles_table__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ua_parser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("K4CH");
/* harmony import */ var ua_parser_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ua_parser_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("7YkG");






var SessionsViewRow = function SessionsViewRow(_ref) {
  var f = _ref.f,
      t = _ref.t,
      session = _ref.session;
  var ua = Object(ua_parser_js__WEBPACK_IMPORTED_MODULE_2__["UAParser"])(session.user_agent);
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_4__["TableRow"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_4__["TableCell"], {
    className: styles_table__WEBPACK_IMPORTED_MODULE_0___default.a['set-table-date']
  }, f(new Date(session.created_at), t('SessionsView.sync_date_format'))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_4__["TableCell"], {
    className: styles_table__WEBPACK_IMPORTED_MODULE_0___default.a['set-table-os']
  }, session.os), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_4__["TableCell"], {
    className: styles_table__WEBPACK_IMPORTED_MODULE_0___default.a['set-table-browser']
  }, ua.browser.name, " ", ua.browser.major), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Table__WEBPACK_IMPORTED_MODULE_4__["TableCell"], {
    className: styles_table__WEBPACK_IMPORTED_MODULE_0___default.a['set-table-ip']
  }, session.ip));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_3__["translate"])()(SessionsViewRow));

/***/ }),

/***/ "phlM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ANjH");
/* harmony import */ var actions_twoFactor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("jYLR");



var submitting = function submitting() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions_twoFactor__WEBPACK_IMPORTED_MODULE_1__["ACTIVATE_2FA"]:
    case actions_twoFactor__WEBPACK_IMPORTED_MODULE_1__["DESACTIVATE_2FA"]:
      return true;

    case actions_twoFactor__WEBPACK_IMPORTED_MODULE_1__["ACTIVATE_2FA_FAILURE"]:
    case actions_twoFactor__WEBPACK_IMPORTED_MODULE_1__["DESACTIVATE_2FA_FAILURE"]:
    case actions_twoFactor__WEBPACK_IMPORTED_MODULE_1__["ACTIVATE_2FA_SUCCESS"]:
    case actions_twoFactor__WEBPACK_IMPORTED_MODULE_1__["DESACTIVATE_2FA_SUCCESS"]:
      return false;

    default:
      return state;
  }
};

var pending = function pending() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions_twoFactor__WEBPACK_IMPORTED_MODULE_1__["ACTIVATE_2FA_SUCCESS"]:
      return true;

    case actions_twoFactor__WEBPACK_IMPORTED_MODULE_1__["ACTIVATE_2FA"]:
    case actions_twoFactor__WEBPACK_IMPORTED_MODULE_1__["ACTIVATE_2FA_FAILURE"]:
    case actions_twoFactor__WEBPACK_IMPORTED_MODULE_1__["CANCEL_2FA_ACTIVATION"]:
      return false;

    default:
      return state;
  }
};

var error = function error() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions_twoFactor__WEBPACK_IMPORTED_MODULE_1__["ACTIVATE_2FA"]:
    case actions_twoFactor__WEBPACK_IMPORTED_MODULE_1__["DESACTIVATE_2FA"]:
    case actions_twoFactor__WEBPACK_IMPORTED_MODULE_1__["ACTIVATE_2FA_SUCCESS"]:
    case actions_twoFactor__WEBPACK_IMPORTED_MODULE_1__["DESACTIVATE_2FA_SUCCESS"]:
      return null;

    case actions_twoFactor__WEBPACK_IMPORTED_MODULE_1__["ACTIVATE_2FA_FAILURE"]:
    case actions_twoFactor__WEBPACK_IMPORTED_MODULE_1__["DESACTIVATE_2FA_FAILURE"]:
      return action.error;

    default:
      return state;
  }
};

var codeChecking = function codeChecking() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions_twoFactor__WEBPACK_IMPORTED_MODULE_1__["CHECK_TWO_FACTOR_CODE"]:
      return true;

    case actions_twoFactor__WEBPACK_IMPORTED_MODULE_1__["CHECK_TWO_FACTOR_CODE_FAILURE"]:
    case actions_twoFactor__WEBPACK_IMPORTED_MODULE_1__["CHECK_TWO_FACTOR_CODE_SUCCESS"]:
      return false;

    default:
      return state;
  }
};

var checkError = function checkError() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions_twoFactor__WEBPACK_IMPORTED_MODULE_1__["CHECK_TWO_FACTOR_CODE"]:
    case actions_twoFactor__WEBPACK_IMPORTED_MODULE_1__["CHECK_TWO_FACTOR_CODE_SUCCESS"]:
      return null;

    case actions_twoFactor__WEBPACK_IMPORTED_MODULE_1__["CHECK_TWO_FACTOR_CODE_FAILURE"]:
      return action.error;

    default:
      return state;
  }
};

var twoFactor = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  submitting: submitting,
  pending: pending,
  codeChecking: codeChecking,
  error: error,
  checkError: checkError
});
/* harmony default export */ __webpack_exports__["default"] = (twoFactor);

/***/ }),

/***/ "piUo":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profiel","activated_services":"Geactiveerde diensten","connected_devices":"Verbonden apparaten","sessions":"Connections","storage":"Opslag","email_notifications":"E-mail notificatie"},"Loading":{"loading":"Laden"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Er is iets mis gegaan met de server. Herlaad a.u.b. de pagina."},"title":"Profiel","password":{"title":"Wachtwoord","show":"Tonen","hide":"Verbergen","server_error":"Er is iets fout gegaan. Jouw wachtwoord is niet opgeslagen.","password_too_weak":"Jouw wachtwoord is te zwak. Je moet een hoofdletter, een nummer, een special karakter of een langer wachtwoord gebruiken.","wrong_password":"Het huidige wachtwoord lijkt verkeerd.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Jouw wachtwoord is veranderd.","reset_link":"Ben je je huidige wachtwoord vergeten?","submit_label":"Verander jouw wachtwoord","reload":"Jouw wachtwoord is veranderd. De pagina zal worden herladen zodat de veranderingen in werking kunnen treden."},"current_password":{"label":"Voer je huidige wachtwoord in","placeholder":"Huidig wachtwoord"},"new_password":{"label":"Voer je nieuwe wachtwoord in","placeholder":"Nieuw wachtwoord"},"infos":{"success":"Jouw informatie is aangepast","server_error":"Er is iets fout gegaan. Jouw informatie is niet opgeslagen","empty":"Dit veld kan niet leeg zijn"},"email":{"title":"E-mail","label":"Cozy heeft jouw e-mail nodig om je notificaties te sturen en geeft je de mogelijkheid jouw wachtwoord te herstellen","error":"Dit e-mail adres lijkt niet goed. Weet je zeker dat je het correct geschreven hebt (bijv. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Gebruikersnaam","label":"Jouw gebruikersnaam wordt getoond als je bestanden deelt met Cozy gebruikers"},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Taal","label":"Dit zal de taal zijn die gebruikt gaat worden in jouw Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Verbonden apparaten","load_error":"Er is een fout opgetreden tijdens het laden van jouw apparaten, probeer het later opnieuw.","head_name":"Naam","head_sync":"Last synchronisation","head_activity":"Laatste activiteit","head_permissions":"Rechten","head_actions":"Acties","revoke":"terugtrekken","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Apparaat terugtrekken","description":"JE staat op het punt om de verbinding te verbreken met **%{name}**.","subText":"Het zal onmiddelijk stoppen te synchroniseren met dit apparaat.","validate":"Apparaat terugtrekken","error":"Kan het apparaat niet terugtrekken, probeer de pagina te herladen."},"ServicesView":{"title":"Geactiveerde diensten","load_error":"Er is een fout opgetreden tijdens het laden van jouw diensten, probeer het later nog eens.","head_services":"Diensten","head_account":"Account","head_sync":"Laatste synchronisatie","head_status":"Status","unsync":"Niet gesynchroniseerd","konnector_link":"Bekijk de hele lijst met diensten hier"},"soon":{"title":"Binnenkort","description":"Deze functie is nog niet beschikbaar. Voor meer informatie, stuur a.u.b. een e-mail naar contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "qCrm":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var components_PassphraseForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yTQK");
/* harmony import */ var components_2FA_Passphrase2FA__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("hCC0");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("J+JL");
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styles_view__WEBPACK_IMPORTED_MODULE_4__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var PassphraseView = function PassphraseView(props) {
  var onPassphraseSimpleSubmit = props.onPassphraseSimpleSubmit,
      onPassphrase2FAStep1 = props.onPassphrase2FAStep1,
      onPassphrase2FAStep2 = props.onPassphrase2FAStep2,
      passphrase = props.passphrase,
      isTwoFactorEnabled = props.isTwoFactorEnabled,
      instance = props.instance,
      fetchInfos = props.fetchInfos;
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    fetchInfos();
  }, []);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      twoFAModalOpen = _useState2[0],
      setTwoFAModalOpen = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(''),
      _useState4 = _slicedToArray(_useState3, 2),
      currentPassphrase = _useState4[0],
      setCurrentPassphrase = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(''),
      _useState6 = _slicedToArray(_useState5, 2),
      newPassphrase = _useState6[0],
      setNewPassphrase = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(''),
      _useState8 = _slicedToArray(_useState7, 2),
      hint = _useState8[0],
      setHint = _useState8[1];

  var handlePassphrase2FAStep1 = function handlePassphrase2FAStep1(currentPassphrase, newPassphrase, hint) {
    setCurrentPassphrase(currentPassphrase);
    setNewPassphrase(newPassphrase);
    setHint(hint);
    setTwoFAModalOpen(true);
    onPassphrase2FAStep1(currentPassphrase);
  };

  var handlePassphrase2FASubmit = function handlePassphrase2FASubmit(twoFactorCode) {
    var twoFactorToken = passphrase.twoFactorToken;
    onPassphrase2FAStep2(currentPassphrase, newPassphrase, twoFactorCode, twoFactorToken, hint).then(function () {
      return setTwoFAModalOpen(false);
    });
  };

  var onSubmit = isTwoFactorEnabled ? handlePassphrase2FAStep1 : onPassphraseSimpleSubmit;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    role: "contentinfo"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(styles_view__WEBPACK_IMPORTED_MODULE_4___default.a['set-view-content'], styles_view__WEBPACK_IMPORTED_MODULE_4___default.a['set-view-content--narrow'])
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_PassphraseForm__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({}, passphrase, {
    onSubmit: onSubmit
  })), twoFAModalOpen && !passphrase.errors && !passphrase.submitting && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_2FA_Passphrase2FA__WEBPACK_IMPORTED_MODULE_2__["default"], {
    onPassphrase2FASubmit: handlePassphrase2FASubmit,
    closeTwoFAPassphraseModal: function closeTwoFAPassphraseModal() {
      return setTwoFAModalOpen(false);
    },
    instance: instance,
    submitting: passphrase.submitting2FAStep2
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (PassphraseView);

/***/ }),

/***/ "qVAH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Activate2FA", function() { return Activate2FA; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cLsY");
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("J+JL");
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styles_view__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var components_2FA_ActivationConfirmation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("TgM4");
/* harmony import */ var components_2FA_TwoFactorCode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("WPLz");
/* harmony import */ var components_2FA_ActivationConfirmed__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("LEuk");







var Activate2FA = function Activate2FA(_ref) {
  var t = _ref.t,
      activate2FA = _ref.activate2FA,
      checkTwoFactorCode = _ref.checkTwoFactorCode,
      mailConfirmationCodeIsValid = _ref.mailConfirmationCodeIsValid,
      closeTwoFAActivationModal = _ref.closeTwoFAActivationModal,
      isTwoFactorEnabled = _ref.isTwoFactorEnabled,
      twoFactor = _ref.twoFactor,
      onChange = _ref.onChange,
      instance = _ref.instance,
      cozyDomain = _ref.cozyDomain,
      images = _ref.images;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles_view__WEBPACK_IMPORTED_MODULE_3___default.a['set-view-content-twofa-modal-wrapper']
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_2__["default"], {
    dismissAction: closeTwoFAActivationModal,
    className: styles_view__WEBPACK_IMPORTED_MODULE_3___default.a['set-view-content-twofa-modal'],
    title: t(isTwoFactorEnabled && mailConfirmationCodeIsValid ? 'ProfileView.twofa.title.validation' : 'ProfileView.twofa.title.activate'),
    size: "large"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_2__["ModalContent"], {
    className: styles_view__WEBPACK_IMPORTED_MODULE_3___default.a['set-view-content-twofa-modal-content']
  }, twoFactor.pending ? mailConfirmationCodeIsValid ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_2FA_ActivationConfirmed__WEBPACK_IMPORTED_MODULE_6__["default"], {
    closeTwoFAActivationModal: closeTwoFAActivationModal,
    instance: instance,
    cozyDomain: cozyDomain
  }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_2FA_TwoFactorCode__WEBPACK_IMPORTED_MODULE_5__["default"], {
    checkTwoFactorCode: checkTwoFactorCode,
    closeTwoFAActivationModal: closeTwoFAActivationModal,
    onChange: onChange,
    twoFactor: twoFactor,
    email: instance && instance.data.attributes.email
  }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_2FA_ActivationConfirmation__WEBPACK_IMPORTED_MODULE_4__["default"], {
    activate2FA: activate2FA,
    images: images,
    twoFactor: twoFactor
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__["translate"])()(Activate2FA));

/***/ }),

/***/ "qZqc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OffersLink", function() { return OffersLink; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("KXWi");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("buk/");
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("J+JL");
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styles_view__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var styles_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("IWMv");
/* harmony import */ var styles_storage__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(styles_storage__WEBPACK_IMPORTED_MODULE_5__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var OffersLink =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(OffersLink, _PureComponent);

  function OffersLink() {
    _classCallCheck(this, OffersLink);

    return _possibleConstructorReturn(this, _getPrototypeOf(OffersLink).apply(this, arguments));
  }

  _createClass(OffersLink, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          storageData = _this$props.storageData,
          t = _this$props.t;
      return storageData.offersLink ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        className: styles_view__WEBPACK_IMPORTED_MODULE_4___default.a['set-view-subtitle']
      }, t('StorageView.more_space')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__["ButtonLink"], {
        theme: "regular",
        className: styles_storage__WEBPACK_IMPORTED_MODULE_5___default.a['set-offer-button'],
        href: storageData.offersLink,
        target: true
      }, t('StorageView.see_offer'))) : null;
    }
  }]);

  return OffersLink;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);
OffersLink.propTypes = {
  storageData: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  t: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_3__["translate"])()(OffersLink));

/***/ }),

/***/ "r0LA":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styles_fields__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Cp2o");
/* harmony import */ var styles_fields__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styles_fields__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("buk/");
/* harmony import */ var components_Field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("xq6T");
/* harmony import */ var cozy_ui_react_SelectBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("81zs");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }






/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__["translate"])()(function (props) {
  var fieldProps = props.fieldProps,
      restProps = _objectWithoutProperties(props, ["fieldProps"]);

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Field__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, fieldProps, {
    className: styles_fields__WEBPACK_IMPORTED_MODULE_1___default.a['set-field-select']
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_SelectBox__WEBPACK_IMPORTED_MODULE_4__["default"], _extends({}, restProps, {
    fullwidth: true
  })));
}));

/***/ }),

/***/ "rttf":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEND_EMAIL", function() { return SEND_EMAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEND_EMAIL_SUCCESS", function() { return SEND_EMAIL_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEND_EMAIL_FAILURE", function() { return SEND_EMAIL_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendMessageToSupport", function() { return sendMessageToSupport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendDeleteAccountRequest", function() { return sendDeleteAccountRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendEmail", function() { return sendEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JOB_STATE", function() { return JOB_STATE; });
/* harmony import */ var actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9At1");
/* eslint-disable */

/* global cozy */


var SEND_EMAIL = 'SEND_EMAIL';
var SEND_EMAIL_SUCCESS = 'SEND_EMAIL_SUCCESS';
var SEND_EMAIL_FAILURE = 'SEND_EMAIL_FAILURE';
var CONTACT_ADDRESS = 'contact@cozycloud.cc';
var CONTACT_RECIPIENT_LIST = [{
  name: 'Contact',
  email: CONTACT_ADDRESS
}];

function textPlainContentParts(message) {
  return [{
    type: 'text/plain',
    body: message || 'No reason/message provided.'
  }];
}

function sendMessageToSupport(message, t) {
  return function (dispatch, getState) {
    dispatch({
      type: SEND_EMAIL
    });

    if (!message) {
      return dispatch({
        type: SEND_EMAIL_FAILURE,
        error: new Error('No message provided.')
      });
    }

    var domain = actions__WEBPACK_IMPORTED_MODULE_0__["STACK_DOMAIN"].replace('//', '');
    return sendEmail(CONTACT_RECIPIENT_LIST, textPlainContentParts(message), "[cozy-support] Ask support for ".concat(domain)).then(function () {
      dispatch({
        type: SEND_EMAIL_SUCCESS
      });

      try {
        return sendEmail(null, [{
          type: 'text/plain',
          body: t('support.response_email.body', {
            message: message
          })
        }], "[cozy-support] ".concat(t('support.response_email.subject')), 'noreply');
      } catch (e) {
        // ignore errors for this sending
        console.warn('Something went wrong when copying the support request to the user.');
      }
    }).catch(function (error) {
      // error if no emails found
      if (error.message && error.message.match(/no email in its settings/)) {
        dispatch({
          type: SEND_EMAIL_FAILURE,
          error: {
            i18n: 'errors.noEmailFound'
          }
        });
      } else {
        dispatch({
          type: SEND_EMAIL_FAILURE,
          error: error
        });
      }
    });
  };
}
function sendDeleteAccountRequest(subject, message) {
  return sendEmail(CONTACT_RECIPIENT_LIST, textPlainContentParts(message), subject);
}
function sendEmail(recipientsList, contentParts) {
  var subject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var mode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'from';
  if (!contentParts.length) throw new Error('No email content parts found');
  if (mode === 'from' && !recipientsList.length) throw new Error('No recipients found');
  var options = {
    mode: mode,
    subject: subject,
    parts: contentParts
  };
  if (mode === 'from') options.to = recipientsList;
  return cozy.client.jobs.create('sendmail', options, {
    priority: 10,
    max_exec_count: 1
  }).then(function (job) {
    return waitForJobFinished(job);
  });
} // monitor the status of the job and resolve when the email is sent

var JOB_STATE = {
  READY: 'ready',
  ERRORED: 'errored',
  DONE: 'done'
};

function waitForJobFinished(job) {
  return new Promise(function (resolve, reject) {
    var idInterval;
    idInterval = setInterval(function () {
      Object(actions__WEBPACK_IMPORTED_MODULE_0__["cozyFetch"])('GET', "/jobs/".concat(job._id)).then(function (response) {
        var job = response.data;

        if (job.attributes.state === JOB_STATE.ERRORED) {
          clearInterval(idInterval);
          reject(new Error(job.attributes.error));
        }

        if (job.attributes.state === JOB_STATE.DONE) {
          clearInterval(idInterval);
          resolve(job);
        }
      }).catch(function (error) {
        clearInterval(idInterval);
        reject(error);
      });
    }, 1000);
  });
}

/***/ }),

/***/ "rwi/":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"حذف الحساب","label":"بامكانك حذف حسابك في اي وقت. احذر، سيتم مسح جميع بياناتك عند حذف الحساب وليس هناك طريقة لاستعادتها.","button":{"label":"إحذف حسابي الخاص"},"error":{"message":"حدث خطأ ما عند محاولة حذف الحساب. الرجاء حاول مرة أخرى او اتصل بنا."},"modal":{"confirm":{"title":"حذف الحساب؟","description":{"line":{"1":"سيتم حذف حسابك","2":"لن يكن باستطاعتك الوصول لحسابك بعد هذا","3":"سيتم حذف جميع بياناتك"}},"button":{"cancel":{"label":"الغاء"},"submit":{"label":"حذف"}}},"form":{"title":"طلب حذف الحساب","reason":{"label":"لماذا تريد أن تحذف حسابك (إختياري)؟"},"button":{"cancel":{"label":"الغاء"},"submit":{"label":"إرسال"}}}},"request":{"mail":{"subject":"طلب حذف الحساب لـ "}},"success":{"message":"تم إرسال طلب حذف الحساب."}},"Nav":{"profile":"الملف الشخصي","activated_services":"الخدمات المفعلة","connected_devices":"الأجهزة المتصلة","sessions":"الوصلات","storage":"التخزين","email_notifications":"إخطارات البريد الإلكتروني"},"Loading":{"loading":"جارٍ التحميل"},"Empty":{"devices":{"title":"لا يوجد لديك أجهزة متصلة","text":"عند تنصيب تطبيقاتنا سيكون بإمكانك الوصول لجميع بياناتك على كل الاجهزة. Cozy سيكون دائما في متناول اليد حتى إن كنت دائما في الطريق.","link":{"href":"https://cozy.io/en/download/","text":"قم بتنزيل أحد تطبيقاتنا"}}},"ProfileView":{"instance":{"server_error":"حدث خطأ ما مع الخادم. الرجاء، إعادة تحميل الصفحة."},"title":"الملف الشخصي","password":{"title":"كلمة السر","show":"عرض","hide":"إخفاء","server_error":"حدث خطأ ما. لم يتم حفظ كلمة السر خاصتك.","password_too_weak":"كلمة السر خاصتك ضعيفة جدا. يجب أن تقوم باضافة حرف كبير، رقم، رمز خاص أو كلمة سر أطول.","wrong_password":"يبدو أن الكلمة السرية الحالية خاطئة.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"تم تعديل كلمتك السرية.","reset_link":"هل نسيت كلمة السر ؟","submit_label":"عدِّل كلمتك السرية","reload":"تم تغيير كلمة السر خاصتك. سيتم إعادة تحميل الصفحة لتطبيق التغييرات."},"current_password":{"label":"أدخل كلمة السر الحالية","placeholder":"كلمة السر الحالية"},"new_password":{"label":"أدخل كلمة السر الجديدة","placeholder":"كلمة السر الجديدة"},"infos":{"success":"تم تحديث البيانات الخاصة بك","server_error":"حدث خطأ ما. لم يتم حفظ بياناتك.","empty":"لا يجب أن يبقى هذا الحقل فارغًا"},"email":{"title":"البريد الإلكتروني","label":"تحتاج Cozy الي بريدك الالكتروني حتى تتمكن من إرسال الإشعارات اليك و تمكنك من إستعادة كلمة السر خاصتك","error":"البرسد الالكتروني المدخل لا يبدو صحيحا. هل أنت واثق من كتابته بالشكل الصحيح (مثلا: john@wayne.com)؟"},"twofa":{"title":{"activate":"التحقق بخطوتين","desactivate":"إلغاء التحقق بخطوتين","validation":"تقييم التحقق بخطوتين"},"passphrase":{"title":"التحقق بخطوتين","description":"قام Cozy بارسال عدد متكون من 6 أرقام الى <br/>. قم بإدخال ال عدد لتغيير كلمة السر:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"إسم المستخدم","label":"سوف يُعرض اسم المستخدم الخاص بك عندما تشارك ملفات مع مستخدمي كوزي."},"tracking":{"title":"ساعدنا في تحسين منتوجنا","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"اللغة","label":"سوف تكون اللغة الإفتراضية التي ستستعملها في كوزي الخاص بك.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"الأجهزة المتصلة","load_error":"An error occured while loading your devices, please try again later.","head_name":"الإسم","head_sync":"Last synchronisation","head_activity":"آخر نشاط","head_permissions":"التصريحات","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"حذف كل الجلسات الأخرى","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"تم حذف كل الجلسات الأخرى."}},"revokeDevice":{"title":"إلغاء ترخيص هذا الجهاز","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"إلغاء ترخيص هذا الجهاز","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"الخدمات المفعَّلة","load_error":"An error occured while loading your services, please try again later.","head_services":"الخدمات","head_account":"الحساب","head_sync":"آخِر تزامن","head_status":"الحالة","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"عن قريب","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"أهلا ! هل بإمكاننا مساعدتك ؟","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"طلبُك","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"هيا بنا !","sending":"جارٍ الإرسال ...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"إتصل بنا","description":"أهلا ! هل بإمكاننا مساعدتك ؟","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"طلبُك","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"هيا بنا !","sending":"جارٍ الإرسال ...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "sCQG":
/***/ (function(module) {

module.exports = {"contactEmail":"claude@cozycloud.cc"};

/***/ }),

/***/ "svhW":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"set-passphrase-advices":"set-passphrase-advices--1xsIg"};

/***/ }),

/***/ "tsnM":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"o-sidebar":"o-sidebar--2YUdV"};

/***/ }),

/***/ "unSN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("J+JL");
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styles_view__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styles_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("IWMv");
/* harmony import */ var styles_storage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styles_storage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("V2U0");
/* harmony import */ var components_OffersLink__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("qZqc");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("buk/");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









var StorageView =
/*#__PURE__*/
function (_Component) {
  _inherits(StorageView, _Component);

  function StorageView() {
    _classCallCheck(this, StorageView);

    return _possibleConstructorReturn(this, _getPrototypeOf(StorageView).apply(this, arguments));
  }

  _createClass(StorageView, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.props.fetchStorageData();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          t = _this$props.t,
          isFetching = _this$props.isFetching,
          storageData = _this$props.storageData;
      var diskQuota = Number.isInteger(storageData.quota) ? (storageData.quota / (1000 * 1000 * 1000)).toFixed(2) : storageData.quota;
      var diskUsage = Number.isInteger(storageData.usage) ? (storageData.usage / (1000 * 1000 * 1000)).toFixed(2) : storageData.usage;
      var percent = diskUsage / diskQuota * 100;
      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(styles_view__WEBPACK_IMPORTED_MODULE_0___default.a['set-view-content'], styles_view__WEBPACK_IMPORTED_MODULE_0___default.a['set-view-content--narrow'])
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h2", {
        className: styles_view__WEBPACK_IMPORTED_MODULE_0___default.a['set-view-title']
      }, t('StorageView.title')), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h3", {
        className: styles_view__WEBPACK_IMPORTED_MODULE_0___default.a['set-view-subtitle']
      }, t('StorageView.storage_title')), isFetching && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_4__["default"], {
        className: 'u-pos-fixed-s',
        middle: true,
        size: "xxlarge",
        loadingType: t('Loading.loading')
      }), !isFetching && storageData && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h2", {
        className: styles_view__WEBPACK_IMPORTED_MODULE_0___default.a['set-view-title']
      }, t('StorageView.storage_phrase', {
        diskUsage: diskUsage,
        diskQuota: diskQuota
      })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("progress", {
        className: styles_storage__WEBPACK_IMPORTED_MODULE_1___default.a['set-storage-bar'],
        value: diskUsage,
        max: diskQuota,
        min: "0"
      }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(styles_storage__WEBPACK_IMPORTED_MODULE_1___default.a['set-bar-percent'], percent < 5 ? styles_storage__WEBPACK_IMPORTED_MODULE_1___default.a['--dark'] : '')
      }, "".concat(percent.toFixed(2), "%")), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_OffersLink__WEBPACK_IMPORTED_MODULE_5__["default"], {
        storageData: storageData
      })));
    }
  }]);

  return StorageView;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_6__["translate"])()(StorageView));

/***/ }),

/***/ "xHNF":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Двухфакторная аутентификация","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Двухфакторная аутентификация","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Защитите Cozy с помощью двухфакторной аутентификации","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "xYwX":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("/MKj");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("0cfB");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cozy_ui_react_stylesheet_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("/8/d");
/* harmony import */ var cozy_ui_react_stylesheet_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cozy_ui_react_stylesheet_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("y6ex");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("Bh3+");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("eO8H");
/* harmony import */ var components_Sidebar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("fH6n");
/* harmony import */ var cozy_ui_react_Alerter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("67rm");
/* harmony import */ var containers_Profile__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("PTEk");
/* harmony import */ var containers_Devices__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("AKca");
/* harmony import */ var containers_Sessions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("PQxa");
/* harmony import */ var containers_Storage__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("z/E6");
/* harmony import */ var containers_Passphrase__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("cYLk");
/* harmony import */ var services_IntentRedirect__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("G6th");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

















var App =
/*#__PURE__*/
function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_6__["Layout"], null, App.renderExtra(), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Alerter__WEBPACK_IMPORTED_MODULE_9__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Sidebar__WEBPACK_IMPORTED_MODULE_8__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Layout__WEBPACK_IMPORTED_MODULE_6__["Main"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Switch"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Route"], {
        path: "/redirect",
        component: services_IntentRedirect__WEBPACK_IMPORTED_MODULE_15__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Route"], {
        exact: true,
        path: "/profile",
        component: containers_Profile__WEBPACK_IMPORTED_MODULE_10__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Route"], {
        path: "/profile/password",
        component: containers_Passphrase__WEBPACK_IMPORTED_MODULE_14__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Route"], {
        path: "/connectedDevices",
        component: containers_Devices__WEBPACK_IMPORTED_MODULE_11__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Route"], {
        path: "/sessions",
        component: containers_Sessions__WEBPACK_IMPORTED_MODULE_12__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Route"], {
        path: "/storage",
        component: containers_Storage__WEBPACK_IMPORTED_MODULE_13__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Route"], {
        path: "/exports/:exportId",
        component: containers_Profile__WEBPACK_IMPORTED_MODULE_10__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Redirect"], {
        exact: true,
        from: "/",
        to: "/profile"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Redirect"], {
        from: "*",
        to: "/profile"
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_4__["Sprite"], null));
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]); // This is to facilitate the extension of App in apps overrides

App.renderExtra = function () {
  return null;
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    alert: state.ui.alert
  };
};
/*
withRouter is necessary here to deal with redux
https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
*/


/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_5__["translate"])()(Object(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["withRouter"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(App)))));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ }),

/***/ "xoYS":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "xq6T":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styles_fields__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("Cp2o");
/* harmony import */ var styles_fields__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styles_fields__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("J+JL");
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styles_view__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("TSYQ");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("V2U0");
/* harmony import */ var cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("y6ex");
/* harmony import */ var cozy_ui_stylus_settings_palette_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("yoMi");
var cozy_ui_stylus_settings_palette_json__WEBPACK_IMPORTED_MODULE_7___namespace = /*#__PURE__*/__webpack_require__.t("yoMi", 1);
/* harmony import */ var components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("4DAK");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











var Field = function Field(_ref) {
  var _classNames;

  var t = _ref.t,
      className = _ref.className,
      type = _ref.type,
      title = _ref.title,
      label = _ref.label,
      submitting = _ref.submitting,
      saved = _ref.saved,
      errors = _ref.errors,
      children = _ref.children;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(styles_fields__WEBPACK_IMPORTED_MODULE_0___default.a['coz-form'], styles_fields__WEBPACK_IMPORTED_MODULE_0___default.a['set-field'], className, (_classNames = {}, _defineProperty(_classNames, styles_fields__WEBPACK_IMPORTED_MODULE_0___default.a['set-field-input'], type !== 'checkbox'), _defineProperty(_classNames, styles_fields__WEBPACK_IMPORTED_MODULE_0___default.a['set-field-checkbox'], type === 'checkbox'), _classNames))
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h3", {
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(styles_view__WEBPACK_IMPORTED_MODULE_1___default.a['set-view-subtitle'], styles_fields__WEBPACK_IMPORTED_MODULE_0___default.a['set-field-title'])
  }, title), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("label", {
    className: styles_fields__WEBPACK_IMPORTED_MODULE_0___default.a['coz-form-desc']
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_8__["default"], {
    source: label
  })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "u-pos-relative"
  }, children, submitting && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_react_Spinner__WEBPACK_IMPORTED_MODULE_5__["default"], {
    noMargin: true,
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(styles_fields__WEBPACK_IMPORTED_MODULE_0___default.a['set-field-loading'], 'u-mr-half')
  }), saved && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_6__["default"], {
    icon: "check",
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(styles_fields__WEBPACK_IMPORTED_MODULE_0___default.a['set-field-saved'], 'u-mr-half'),
    color: cozy_ui_stylus_settings_palette_json__WEBPACK_IMPORTED_MODULE_7__['emerald']
  })), errors && errors.length !== 0 && errors.map(function (error, index) {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
      className: styles_fields__WEBPACK_IMPORTED_MODULE_0___default.a['coz-form-errors'],
      key: index
    }, t(error));
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_4__["translate"])()(Field));

/***/ }),

/***/ "xqCr":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"u-shake":"u-shake--28D5l","shake":"shake--fos3A","u-o-100":"u-o-100--25ODy","u-o-90":"u-o-90--17Xwd","u-o-80":"u-o-80--HIxfX","u-o-70":"u-o-70--Mh2fP","u-o-60":"u-o-60--grr4u","u-o-50":"u-o-50--4uRmS","u-o-40":"u-o-40--ZIcsy","u-o-30":"u-o-30--358-0","u-o-20":"u-o-20--260Iz","u-o-10":"u-o-10--36o9I","u-o-05":"u-o-05--2JWHm","u-o-025":"u-o-025--2NEBg","u-o-0":"u-o-0--2Qy93","devices-view":"devices-view--3593m","coz-btn--revoke":"coz-btn--revoke--3Ya_i","spin":"spin--16nP4"};

/***/ }),

/***/ "yTQK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styles_passphrase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("svhW");
/* harmony import */ var styles_passphrase__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styles_passphrase__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("KXWi");
/* harmony import */ var cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("kyGY");
/* harmony import */ var cozy_ui_react_Input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("zA8p");
/* harmony import */ var cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("y6ex");
/* harmony import */ var cozy_ui_react_Stack__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("X+Uv");
/* harmony import */ var cozy_ui_react_UnorderedList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("dfR0");
/* harmony import */ var cozy_ui_stylus_settings_palette_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("yoMi");
var cozy_ui_stylus_settings_palette_json__WEBPACK_IMPORTED_MODULE_9___namespace = /*#__PURE__*/__webpack_require__.t("yoMi", 1);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("eO8H");
/* harmony import */ var lodash_flowRight__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("BJ98");
/* harmony import */ var lodash_flowRight__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(lodash_flowRight__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var cozy_ui_react_PasswordExample__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("edgH");
/* harmony import */ var cozy_ui_react_Labs_PasswordInput__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("vPfS");
/* harmony import */ var lib_passwordHelper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("+688");
/* harmony import */ var lib_passwordHelper__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(lib_passwordHelper__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("4DAK");
/* harmony import */ var containers_Passphrase__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("cYLk");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


















var initialState = {
  currentPassphrase: '',
  newPassphrase: '',
  newPassphraseRepeat: '',
  hint: ''
};

var PassphraseForm =
/*#__PURE__*/
function (_Component) {
  _inherits(PassphraseForm, _Component);

  function PassphraseForm(props) {
    var _this;

    _classCallCheck(this, PassphraseForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PassphraseForm).call(this, props));
    _this.state = initialState;
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(PassphraseForm, [{
    key: "handleInputChange",
    value: function handleInputChange(e) {
      this.setState(_defineProperty({}, e.target.name, e.target.value));
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      var _this2 = this;

      e.preventDefault();
      this.props.onSubmit(this.state.currentPassphrase, this.state.newPassphrase, this.state.hint).then(function () {
        _this2.setState(initialState);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          currentPassphrase = _this$state.currentPassphrase,
          newPassphrase = _this$state.newPassphrase,
          newPassphraseRepeat = _this$state.newPassphraseRepeat,
          hint = _this$state.hint;
      var _this$props = this.props,
          t = _this$props.t,
          errors = _this$props.errors,
          submitting = _this$props.submitting,
          saved = _this$props.saved,
          location = _this$props.location;
      var currentPassphraseError = errors && errors.currentPassphrase;
      var globalError = errors && errors.global;
      var twoFactorError = errors && errors.wrongTwoFactor;
      var strength = lib_passwordHelper__WEBPACK_IMPORTED_MODULE_14___default.a.getStrength(newPassphrase);
      var newPassphraseTouched = newPassphrase !== '' && newPassphraseRepeat !== '';
      var newPassphraseMatch = newPassphrase === newPassphraseRepeat;
      var hintSameAsPassphrase = newPassphraseTouched && newPassphrase === hint;
      var canSubmit = newPassphraseTouched && newPassphraseMatch && strength.label !== 'weak' && hint && !hintSameAsPassphrase;

      var _parseRedirectUrlsFro = Object(containers_Passphrase__WEBPACK_IMPORTED_MODULE_16__["parseRedirectUrlsFromUrlParams"])(location.search),
          cancelRedirectUrl = _parseRedirectUrlsFro.cancelRedirectUrl;

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Stack__WEBPACK_IMPORTED_MODULE_7__["default"], {
        spacing: "xxl",
        tag: "form",
        onSubmit: this.handleSubmit
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_4__["MainTitle"], {
        className: "u-mt-2"
      }, t('PassphraseView.title')), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Stack__WEBPACK_IMPORTED_MODULE_7__["default"], {
        spacing: "m"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_4__["SubTitle"], {
        tag: "label",
        htmlFor: "current-passphrase"
      }, t('PassphraseView.current_passphrase.label')), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Labs_PasswordInput__WEBPACK_IMPORTED_MODULE_13__["default"], {
        name: "currentPassphrase",
        value: currentPassphrase,
        onChange: this.handleInputChange,
        autoComplete: "current-password",
        id: "current-passphrase",
        placeholder: t('PassphraseView.current_passphrase.placeholder'),
        error: Boolean(currentPassphraseError)
      }), currentPassphraseError && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_4__["ErrorMessage"], null, t(currentPassphraseError))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Stack__WEBPACK_IMPORTED_MODULE_7__["default"], {
        spacing: "m"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_4__["SubTitle"], {
        tag: "label",
        htmlFor: "new-passphrase"
      }, t('PassphraseView.new_passphrase.label')), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Stack__WEBPACK_IMPORTED_MODULE_7__["default"], {
        spacing: "xs"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Labs_PasswordInput__WEBPACK_IMPORTED_MODULE_13__["default"], {
        name: "newPassphrase",
        autoComplete: "new-password",
        id: "new-passphrase",
        placeholder: t('PassphraseView.new_passphrase.placeholder'),
        value: newPassphrase,
        onChange: this.handleInputChange,
        showStrength: true,
        error: newPassphraseTouched && !newPassphraseMatch
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Labs_PasswordInput__WEBPACK_IMPORTED_MODULE_13__["default"], {
        name: "newPassphraseRepeat",
        autoComplete: "new-password",
        id: "new-passphrase-repeat",
        placeholder: t('PassphraseView.new_passphrase.confirmation_placeholder'),
        value: newPassphraseRepeat,
        onChange: this.handleInputChange,
        error: newPassphraseTouched && !newPassphraseMatch
      })), newPassphraseTouched && !newPassphraseMatch && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_4__["ErrorMessage"], null, t('PassphraseView.new_passphrase.dont_match')), globalError && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_4__["ErrorMessage"], null, t(globalError)), twoFactorError && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_4__["ErrorMessage"], null, t(twoFactorError)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_UnorderedList__WEBPACK_IMPORTED_MODULE_8__["UnorderedList"], {
        className: styles_passphrase__WEBPACK_IMPORTED_MODULE_0___default.a['set-passphrase-advices']
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_UnorderedList__WEBPACK_IMPORTED_MODULE_8__["ListItem"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_15__["default"], {
        source: t('PassphraseView.advices.strong_passphrase')
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_UnorderedList__WEBPACK_IMPORTED_MODULE_8__["ListItem"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_15__["default"], {
        source: t('PassphraseView.advices.memorize')
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_UnorderedList__WEBPACK_IMPORTED_MODULE_8__["ListItem"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_15__["default"], {
        source: t('PassphraseView.advices.our_tip')
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_PasswordExample__WEBPACK_IMPORTED_MODULE_12__["default"], {
        password: "Cl4ude\u20ACst1Nu@ge"
      })))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Stack__WEBPACK_IMPORTED_MODULE_7__["default"], {
        spacing: "m"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_4__["SubTitle"], {
        tag: "label",
        htmlFor: "hint"
      }, t('PassphraseView.hint.title')), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Stack__WEBPACK_IMPORTED_MODULE_7__["default"], {
        spacing: "xs"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Input__WEBPACK_IMPORTED_MODULE_5__["default"], {
        value: hint,
        onChange: this.handleInputChange,
        placeholder: t('PassphraseView.hint.placeholder'),
        name: "hint",
        id: "hint",
        error: hintSameAsPassphrase
      }), hintSameAsPassphrase && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Text__WEBPACK_IMPORTED_MODULE_4__["ErrorMessage"], null, t('PassphraseView.hint.same_as_passphrase'))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_15__["default"], {
        source: t('PassphraseView.hint.description')
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Stack__WEBPACK_IMPORTED_MODULE_7__["default"], {
        spacing: "xs"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        busy: submitting,
        disabled: !canSubmit,
        label: t('PassphraseView.submit'),
        extension: "full",
        className: "u-mb-half"
      }, saved && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_6__["default"], {
        className: "u-ml-half",
        icon: "check",
        color: cozy_ui_stylus_settings_palette_json__WEBPACK_IMPORTED_MODULE_9__['emerald']
      })), cancelRedirectUrl ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_3__["ButtonLink"], {
        href: cancelRedirectUrl,
        label: t('PassphraseView.cancel'),
        theme: "secondary",
        extension: "full"
      }) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        tag: react_router_dom__WEBPACK_IMPORTED_MODULE_10__["Link"],
        to: "/profile",
        label: t('PassphraseView.cancel'),
        theme: "secondary",
        extension: "full"
      })));
    }
  }]);

  return PassphraseForm;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (lodash_flowRight__WEBPACK_IMPORTED_MODULE_11___default()(Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__["translate"])(), react_router_dom__WEBPACK_IMPORTED_MODULE_10__["withRouter"])(PassphraseForm));

/***/ }),

/***/ "ygPf":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PiwikHashRouter; });
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("eO8H");
/* harmony import */ var cozy_ui_react_helpers_tracker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("4kcP");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var addPiwik = function addPiwik(history) {
  if (Object(cozy_ui_react_helpers_tracker__WEBPACK_IMPORTED_MODULE_1__["shouldEnableTracking"])() && Object(cozy_ui_react_helpers_tracker__WEBPACK_IMPORTED_MODULE_1__["getTracker"])()) {
    var trackerInstance = Object(cozy_ui_react_helpers_tracker__WEBPACK_IMPORTED_MODULE_1__["getTracker"])();
    history = trackerInstance.connectToHistory(history); // when using a hash history, the initial visit is not tracked by piwik react router

    trackerInstance.track(history.location);
  }

  return history;
};

var PiwikHashRouter =
/*#__PURE__*/
function (_HashRouter) {
  _inherits(PiwikHashRouter, _HashRouter);

  function PiwikHashRouter(props) {
    var _this;

    _classCallCheck(this, PiwikHashRouter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PiwikHashRouter).call(this, props));
    _this.history = addPiwik(_this.history);
    return _this;
  }

  return PiwikHashRouter;
}(react_router_dom__WEBPACK_IMPORTED_MODULE_0__["HashRouter"]);



/***/ }),

/***/ "z/E6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("/MKj");
/* harmony import */ var actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("9At1");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Alerter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("67rm");
/* harmony import */ var components_StorageView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("unSN");






var mapStateToProps = function mapStateToProps(state) {
  return {
    storageData: state.storageData,
    isFetching: state.ui.isFetching
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchStorageData: function fetchStorageData() {
      var t = ownProps.t;
      dispatch(Object(actions__WEBPACK_IMPORTED_MODULE_1__["fetchStorageData"])()).catch(function () {
        return cozy_ui_react_Alerter__WEBPACK_IMPORTED_MODULE_3__["default"].error(t('StorageView.load_error'));
      });
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_2__["translate"])()(Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["connect"])(mapStateToProps, mapDispatchToProps)(components_StorageView__WEBPACK_IMPORTED_MODULE_4__["default"])));

/***/ }),

/***/ "zN9O":
/***/ (function(module, exports) {

module.exports = "/img/export-cozy-mail.svg";

/***/ }),

/***/ "zmIX":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cLsY");
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("KXWi");
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("J+JL");
/* harmony import */ var styles_view__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styles_view__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var styles_fields__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("Cp2o");
/* harmony import */ var styles_fields__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(styles_fields__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("4DAK");
/* harmony import */ var components_export_ExportDownload__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("HbXj");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










var exportImage = __webpack_require__("zN9O");

var ExportSection =
/*#__PURE__*/
function (_Component) {
  _inherits(ExportSection, _Component);

  function ExportSection(props) {
    var _this;

    _classCallCheck(this, ExportSection);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ExportSection).call(this, props));
    _this.state = {
      displayModal: false
    };
    _this.toggleModal = _this.toggleModal.bind(_assertThisInitialized(_this));
    _this.submitExport = _this.submitExport.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ExportSection, [{
    key: "toggleModal",
    value: function toggleModal() {
      this.setState(function (currentState) {
        return {
          displayModal: !currentState.displayModal
        };
      });
    }
  }, {
    key: "submitExport",
    value: function submitExport() {
      this.props.requestExport();
      this.toggleModal();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          t = _this$props.t,
          email = _this$props.email,
          exportData = _this$props.exportData,
          exportId = _this$props.exportId,
          fetchExportData = _this$props.fetchExportData,
          parent = _this$props.parent;
      var displayModal = this.state.displayModal;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles_view__WEBPACK_IMPORTED_MODULE_4___default.a['set-view-section']
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, t('ProfileView.export.title')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: styles_view__WEBPACK_IMPORTED_MODULE_4___default.a['set-view-section-label']
      }, t('ProfileView.export.label')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "u-mt-1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        onClick: this.toggleModal,
        label: t('ProfileView.export.link'),
        extension: "full"
      }))), displayModal && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_2__["default"], {
        className: styles_view__WEBPACK_IMPORTED_MODULE_4___default.a['set-export-modal'],
        secondaryAction: this.toggleModal,
        mobileFullscreen: true
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_2__["ModalHeader"], {
        className: "u-ta-center u-pr-0"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        className: styles_view__WEBPACK_IMPORTED_MODULE_4___default.a['set-export-modal-image'],
        alt: t('ProfileView.export.modal.title'),
        src: exportImage
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: styles_view__WEBPACK_IMPORTED_MODULE_4___default.a['set-export-modal-title']
      }, t('ProfileView.export.modal.title'))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_2__["ModalDescription"], {
        className: styles_view__WEBPACK_IMPORTED_MODULE_4___default.a['set-export-modal-description']
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_ReactMarkdownWrapper__WEBPACK_IMPORTED_MODULE_6__["default"], {
        source: t('ProfileView.export.modal.description', {
          email: email
        })
      }), exportData.error && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: styles_fields__WEBPACK_IMPORTED_MODULE_5___default.a['coz-form-errors']
      }, t(exportData.error))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Modal__WEBPACK_IMPORTED_MODULE_2__["ModalFooter"], {
        className: styles_view__WEBPACK_IMPORTED_MODULE_4___default.a['set-export-modal-footer']
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        theme: "secondary",
        onClick: this.toggleModal,
        label: t('ProfileView.export.modal.cancel')
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        theme: "primary",
        onClick: this.submitExport,
        busy: exportData.submitting,
        disabled: exportData.submitting,
        label: t('ProfileView.export.modal.CTA')
      }))), exportId && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_export_ExportDownload__WEBPACK_IMPORTED_MODULE_7__["default"], {
        exportData: exportData,
        exportId: exportId,
        fetchExportData: fetchExportData,
        parent: parent
      }));
    }
  }]);

  return ExportSection;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__["translate"])()(ExportSection));

/***/ }),

/***/ "zvm5":
/***/ (function(module) {

module.exports = {"desktop":{"icon":"icon-laptop.svg","link":{"type":"external"}},"mobile":{"icon":"icon-phone.svg","link":{"type":"external"}},"gather":{"icon":"icon-bills.svg","link":{"type":"apps","appSlug":"home","path":"/intro"}},"support":{"icon":"icon-question-mark.svg","component":"/Support"}};

/***/ })

/******/ });
//# sourceMappingURL=settings.js.map