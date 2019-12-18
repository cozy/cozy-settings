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
/******/ 		"intents": 0
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
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "/+tk":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

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

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("201c");
__webpack_require__("7NIr");
module.exports = __webpack_require__("d/w2");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "2d4v":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Instellingen"},"DeleteAccount":{"title":"Account verwijderen","label":"Je kunt je Cozy op elk gewenst moment verwijderen. Maar wees voorzichtig, want als je account verwijdert, worden al je gegevens ook verwijderd en dit is onomkeerbaar!","button":{"label":"Mijn account verwijderen"},"error":{"message":"Er is een fout opgetreden tijdens het verwijderingsverzoek. Probeer het opnieuw of neem contact op met onze ondersteuning."},"modal":{"confirm":{"title":"Wil je je Cozy verwijderen?","description":{"line":{"1":"Je Cozy zal worden verwijderd.","2":"Hierdoor heb je geen toegang meer tot je Cozy.","3":"Al je gegevens worden verwijderd."}},"button":{"cancel":{"label":"Annuleren"},"submit":{"label":"Verwijderen"}}},"form":{"title":"Verwijderingsverzoek voor je Cozy","reason":{"label":"Waarom wil je je Cozy verwijderen (optioneel)?"},"button":{"cancel":{"label":"Annuleren"},"submit":{"label":"Versturen"}}}},"request":{"mail":{"subject":"Verwijderingsverzoek voor %{domain}"}},"success":{"message":"Je verwijderingsverzoek is verstuurd."}},"Nav":{"profile":"Profiel","activated_services":"Ingeschakelde diensten","connected_devices":"Verbonden diensten","sessions":"Verbindingen","storage":"Opslag","email_notifications":"E-mailmeldingen"},"Loading":{"loading":"Bezig met laden"},"Empty":{"devices":{"title":"Je hebt geen apparaten verbonden.","text":"Door het installeren van de verschillende clients, heb je toegang tot je bestanden op alle schermen tegelijkertijd. Cozy is altijd binnen handbereik, zelfs als je onderweg bent!","link":{"href":"https://cozy.io/en/download/","text":"Download één van onze apps"}}},"ProfileView":{"instance":{"server_error":"Er is een fout opgetreden op de server. Herlaad de pagina."},"title":"Profiel","password":{"title":"Wachtwoord","show":"Tonen","hide":"Verbergen","server_error":"Er is een fout opgetreden; je wachtwoord is niet opgeslagen.","password_too_weak":"Je wachtwoord is te zwak. Je moet een hoofdletter, getal of speciaal teken toevoegen of een langer wachtwoord kiezen.","wrong_password":"Je huidige wachtwoord is onjuist.","wrong_two_fa_code":"De opgegeven tweestapscode is onjuist.","success":"Je wachtwoord is gewijzigd.","reset_link":"Ben je je huidige wachtwoord vergeten?","submit_label":"Wachtwoord wijzigen","reload":"Je wachtwoord is gewijzigd. De pagina wordt herladen zodat de wijziging kan worden toegepast."},"current_password":{"label":"Voer je huidige wachtwoord in","placeholder":"Huidige wachtwoord"},"new_password":{"label":"Voer je nieuwe wachtwoord in","placeholder":"Nieuwe wachtwoord"},"infos":{"success":"Je gegevens zijn gewijzigd.","server_error":"Er is een fout opgetreden; je gegevens zijn niet opgeslagen.","empty":"Dit veld mag niet leeg worden gelaten"},"email":{"title":"E-mailadres","label":"Cozy heeft je e-mailadres nodig zodat je meldingen kunt ontvangen en je je wachtwoord kunt herstellen.","error":"Dit e-mailadres lijkt onjuist. Weet je zeker dat je het goed geschreven hebt (bijv. jan@jansen.nl)?"},"twofa":{"title":{"activate":"Authenticatie in twee stappen","desactivate":"Authenticatie in twee stappen uitschakelen","validation":"Verificatie van authenticatie in twee stappen"},"passphrase":{"title":"Authenticatie in twee stappen","description":"Cozy heeft een verificatiecode van 6 getallen verstuurd naar %{email}.<br/>Voer die code hier in om je wachtwoord te wijzigen:"},"label":"Twee stappen zijn beter dan één: daarom kun je de veiligheid verbeteren met een extra stap.<br/>[Bekijk onze hulppagina →](%{link})","modal":{"code":"code","protect":"Bescherm je Cozy met authenticatie in twee stappen","change":"**Wat verandert er?** Elke keer als je verbindt met je Cozy, dan heb je je wachtwoord nodig en een verificatiecode.<br/>[Bekijk onze hulppagina →](%{link})","secu_title":"Voeg een extra beveiligingsniveau toe","secu_description":"Een wachtwoord is goed, maar als het niet \"complex\" genoeg is, dan kan een dief dit gemakkelijk raden. Ontvang per mail een verificatiecode om de veiligheid van je Cozy te waarborgen.","protect_title":"Verbeter de beveiliging van je gegevens","protect_description":"Zelfs als een dief je wachtwoord raadt, dan blijf jij de enige die kan verbinden met je Cozy.","desactivate_title":"Weet je zeker dat je deze optie wilt uitschakelen?","desactivate_description":"Door het klikken op de knop \"Uitschakelen\", zal je wachtwoord de enige toegang zijn tot je Cozy. Je verwijdert een beveiligingsniveau.","confirmation_title":"Verificatiecode-bevestiging","confirmation_description":"Cozy heeft een verificatiecode van 6 getallen verstuurd naar %{email}.<br/>Voer die code hier in om de authenticatie in te schakelen:","nocode":"Heb je geen code ontvangen?","nocode_claude":"Neem dan contact op met Claude via","validation_title":"Gefeliciteerd! Je e-mailadres is bevestigd.","validation_description":"Je Cozy wordt nu beveiligd door authenticatie in twee stappen.","validation_logs":"Inloggegevens onthouden:","email":"Je moet een geldig e-mailadres opgeven.","button":{"activate":"Authenticatie activeren","cancel":"annuleren","desactivate":"uitschakelen","validate":"verifiëren","terminate":"afbreken"}}},"public_name":{"title":"Gebruikersnaam","label":"Je gebruikersnaam wordt getoond als je bestanden deelt met Cozy-gebruikers."},"tracking":{"title":"Help mee ons product te verbeteren","label":"Geef Cozy Cloud toestemming om anonieme gebruiksgegevens te verzamelen voor het verbeteren van ons product.<br/>[Lees meer over Cozy's privacywaarborg](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"Mijn gegevens","label":"Cozy zorgt ervoor dat alle opgeslagen gegevens met je worden gedeeld:","link":"Mijn gegevens downloaden","server_error":"Er is een fout opgetreden. Probeer het opnieuw of neem contact met ons op.","fetch_error":"Er is een fout opgetreden tijdens het opvragen van je gegevens. Probeer het opnieuw of neem contact met ons op.","missing_error":"Het archief ontbreekt of is verouderd. Probeer het opnieuw of neem contact met ons op.","success":"Je verzoek is verstuurd!","modal":{"title":"Geef me mijn gegevens terug","description":"Cozy is bezig al je opgeslagen gegevens te verzamelen en dit om te zetten naar een downloadbaar archief.<br/><br/>De downloadlink zal worden verstuurd naar het e-mailadres '__%{email}__' zodra het archief beschikbaar is.","cancel":"Annuleren","CTA":"Geef me mijn gegevens"},"download":{"title":"Download mijn gegevens","description":"Hier zijn alle gegevensarchieven, beschikbaar in je Cozy:","CTA":"Archief downloaden","CTA_part":"(part %{number}) downloaden"}},"locale":{"title":"Taal","label":"Dit is de taal die zal worden gebruikt in je Cozy.","contrib":"Wil je meehelpen Cozy te vertalen? [Kijk dan op https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937 hoe je een handje kunt helpen.]","fr":"Frans","en":"Engels","es":"Spaans","ja":"Japans","nl":"Nederlands","de":"Duits","ru":"Russisch","nl_NL":"Nederlands (Nederland)","ko":"Koreaans","pl":"Pools","pt":"Portugees","da":"Deens","ro_RO":"Roemeens (Roemenië)","pt_BR":"Portugees (Brazilië)","zh_CN":"Chinees (China)","ar":"Arabisch","it":"Italiaans","ro":"Roemeens","eo":"Esperanto","de_DE":"Duits (Duitsland)","sq":"Albanees","tr":"Turks","uk_UA":"Oekraïens (Oekraïne)","ru_RU":"Russisch (Rusland)","sq_AL":"Albanees (Albanië)","ca":"Catalaans","ca_ES":"Catalaans (Spanje)","zh":"Chinees","zh_TW":"Chinees (Taiwan)","cs":"Tsjechisch","cs_CZ":"Tsjechisch (Tsjechië)","el":"Grieks","id":"Indonesisch","it_IT":"Italiaans (Italië)","sk":"Slowaaks","sk_SK":"Slowaaks (Slowakije)","es_CO":"Spaans (Colombia)","es_ES":"Spaans (Spanje)","sv":"Zweeds"}},"DevicesView":{"title":"Verbonden apparaten","load_error":"Er is een fout opgetreden tijdens het laden van je apparaten. Probeer het later opnieuw.","head_name":"Naam","head_sync":"Laatste synchronisatie","head_activity":"Laatste activiteit","head_permissions":"Machtigingen","head_actions":"Acties","revoke":"intrekken","sync_date_format":"D MMM YYYY"},"StorageView":{"title":"Opslag","load_error":"Er is een fout opgetreden tijdens het laden van je opslaginformatie. Probeer het later opnieuw.","storage_title":"Totale ruimte","storage_phrase":"%{diskUsage} GB van %{diskQuota} GB gebruikt","more_space":"Meer opslagruimte nodig?","see_offer":"Mijn opslag uitbreiden"},"SessionsView":{"title":"Verbindingsgeschiedenis","sync_date_format":"D MMM YYYY","delete":"Alle andere sessie verwijderen","infos":{"server_error":"Er is een fout opgetreden op de server. Herlaad de pagina.","sessions_deleted":"Alle andere sessies zijn verwijderd."}},"revokeDevice":{"title":"Dit apparaat intrekken","description":"Je staat op het punt om **%{name}** te ontkoppelen.","subText":"De synchronisatie met dit apparaat zal direct stoppen.","validate":"Apparaat ontkoppelen","error":"Het ontkoppelen is mislukt; probeer het later opnieuw."},"ServicesView":{"title":"Ingeschakelde diensten","load_error":"Er is een fout opgetreden tijdens het laden van je diensten. Probeer het later opnieuw.","head_services":"Diensten","head_account":"Account","head_sync":"Laatste synchronisatie","head_status":"Status","unsync":"Niet-gesynchroniseerd","konnector_link":"Klik hier voor de volledige lijst met diensten"},"soon":{"title":"Binnenkort","description":"Deze functie is nog niet beschikbaar. Neem, voor meer informatie, contact met ons op: contact@cozycloud.cc"},"support":{"title":"Hallo! Kunnen we je helpen?","emailDetail":"Je bericht wordt verstuurd middels het e-mailadres dat je hebt opgegeven in je Cozy-instellingen.","fields":{"message":{"title":"Je verzoek","placeholder":"Vertel ons iets (vraag om hulp, deel feedback of zeg gewoon 'hallo'). We staan klaar om met je te praten."}},"response_email":{"subject":"Je verzoek is ontvangen.","body":"Hallo,\n\nwe hebben je ondersteuningsverzoek ontvangen:\n%{message}\n\nWe doen ons best om dit zo snel mogelijk te beantwoorden.\n\nClaude van Cozy."},"button":"Gaan met die banaan!","sending":"Bezig met versturen...","success":"👏 Je bericht is verstuurd. Dank je!","error":"Er is een fout opgetreden tijdens het versturen van je bericht."},"claudy":{"title":"Hoe ga ik met Cozy om?","actions":{"desktop":{"title":"Verkrijg toegang tot alle bestanden op je computer","description":"Synchroniseer alle Cozy Drive-bestanden naar je computer","button":"Installeer Cozy Drive op je computer","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back-up en synchroniseer de afbeeldingen op je telefoon","description":"Al je herinneringen zijn veilig op Cozy Drive","button":"Installeer de Cozy Drive-app op je telefoon","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Krijg je rekeningen direct terug","description":"Cozy Collect - organiseer al je bestanden direct","button":"Ontdek Cozy Collect"},"support":{"title":"Neem contact met ons op","description":"Hallo! Kunnen we je helpen?","emailDetail":"Je bericht wordt verstuurd middels het e-mailadres dat je hebt opgegeven in je Cozy-instellingen.","fields":{"message":{"title":"Je verzoek","placeholder":"Vertel ons iets (vraag om hulp, deel feedback of zeg gewoon 'hallo'). We staan klaar om met je te praten."}},"button":"Gaan met die banaan!","sending":"Bezig met versturen...","success":"👏 Je bericht is verstuurd. Dank je!","error":"Er is een fout opgetreden tijdens het versturen van je bericht."}}},"errors":{"noEmailFound":"Er is geen e-mailadres aangetroffen. Voeg er één toe in je Cozy-instellingen en probeer het opnieuw."}};

/***/ }),

/***/ "2hWv":
/***/ (function(module, exports) {

module.exports = "/img/icon-question-mark.svg";

/***/ }),

/***/ "3RGN":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "3z1J":
/***/ (function(module, exports) {

module.exports = "/img/icon-check.svg";

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

/***/ "B0KA":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Support", function() { return Support; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("KXWi");
/* harmony import */ var cozy_ui_react_Textarea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("jWvl");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var Support =
/*#__PURE__*/
function (_Component) {
  _inherits(Support, _Component);

  function Support(props) {
    var _this;

    _classCallCheck(this, Support);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Support).call(this, props));
    _this.state = {
      message: ''
    };
    _this.sendMessage = _this.sendMessage.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Support, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      // reset message if successfully sent
      if (nextProps.emailStatus.isSent && this.props.emailStatus.isSending) {
        this.setState({
          message: ''
        });
      }
    }
  }, {
    key: "sendMessage",
    value: function sendMessage() {
      this.props.sendMessageToSupport(this.state.message);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          t = _this$props.t,
          iconSrc = _this$props.iconSrc,
          emailStatus = _this$props.emailStatus;
      var message = this.state.message;
      var isSent = emailStatus.isSent,
          isSending = emailStatus.isSending,
          error = emailStatus.error;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "set-support-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "set-support-form-header"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        className: "set-support-form-header-icon",
        src: iconSrc
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "set-support-form-header-title"
      }, t("support.title"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "set-support-form-content coz-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "coz-form-label"
      }, t('support.fields.message.title'), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Textarea__WEBPACK_IMPORTED_MODULE_3__["default"], {
        className: "set-services-support-form-textarea",
        value: message,
        ref: function ref(input) {
          _this2.messageInput = input;
        },
        placeholder: t('support.fields.message.placeholder'),
        onChange: function onChange(e) {
          _this2.setState({
            message: e.target.value
          });
        }
      })), (!isSent && !isSending && !error || isSent && !isSending && !error && message) && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "set-support-form-detail"
      }, t('support.emailDetail')), !isSending && isSent && !message && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "set-support-form-success"
      }, t('support.success')), !isSending && error && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "set-support-form-error"
      }, error.i18n && "".concat(t(error.i18n)), error.message && "".concat(t('support.error'), " : ").concat(error.message), !error.i18n && !error.message && t('support.error')), isSending && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "set-support-form-detail"
      }, t('support.sending')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        onClick: function onClick() {
          return _this2.sendMessage();
        },
        disabled: !message,
        busy: isSending,
        icon: "paperplane",
        label: t('support.button')
      })));
    }
  }]);

  return Support;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__["translate"])()(Support));

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

/***/ "Fk5t":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

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

/***/ "Hz7n":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IntentView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var services_Claudy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("toXQ");
/* harmony import */ var services_Support__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("B0KA");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var IntentView =
/*#__PURE__*/
function (_Component) {
  _inherits(IntentView, _Component);

  function IntentView(props) {
    var _this;

    _classCallCheck(this, IntentView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(IntentView).call(this, props));
    var window = props.window;
    var intentType = window.location.href.match(/.*\/services\/(.*)\?.*/)[1];
    _this.state = {
      intentType: intentType
    }; // Maybe the logic about getting the intent from location.search should be
    // encapsulated in cozy.client.createService

    var intent = window.location.search.split('=')[1];

    _this.props.createIntentService(intent, window);

    return _this;
  }

  _createClass(IntentView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      switch (this.state.intentType) {
        case 'claudy':
          this.props.fetchInfos();
          this.props.fetchClaudy();
      }
    }
  }, {
    key: "terminate",
    value: function terminate() {
      var service = this.props.service.instance;
      service.terminate();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var intentType = this.state.intentType;
      var _this$props = this.props,
          service = _this$props.service,
          claudy = _this$props.claudy,
          emailStatus = _this$props.emailStatus,
          sendMessageToSupport = _this$props.sendMessageToSupport;

      switch (intentType) {
        case 'claudy':
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(services_Claudy__WEBPACK_IMPORTED_MODULE_1__["default"], {
            claudyInfos: claudy,
            onClose: function onClose() {
              return _this2.terminate();
            },
            service: service,
            emailStatus: emailStatus,
            sendMessageToSupport: sendMessageToSupport
          });

        case 'support':
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(services_Support__WEBPACK_IMPORTED_MODULE_2__["default"], {
            service: service,
            iconSrc: __webpack_require__("2hWv"),
            emailStatus: emailStatus,
            sendMessageToSupport: sendMessageToSupport
          });
      }
    }
  }]);

  return IntentView;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "IarV":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "JhSQ":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "K3H9":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "K5fM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Support", function() { return Support; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("KXWi");
/* harmony import */ var cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("y6ex");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var Support =
/*#__PURE__*/
function (_Component) {
  _inherits(Support, _Component);

  function Support(props) {
    var _this;

    _classCallCheck(this, Support);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Support).call(this, props));
    _this.state = {
      hideContent: false,
      // to avoid scrollbar in actions list view
      message: ''
    };
    _this.sendMessage = _this.sendMessage.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Support, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.onOpen();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.opened !== this.props.opened) {
        nextProps.opened ? this.onOpen() : this.onReturn();
      } // if message successfully sent


      if (nextProps.emailStatus.isSent && this.props.emailStatus.isSending && !this.props.emailStatus.isSent) {
        this.setState({
          message: ''
        }); // usually go back on success

        this.props.onSuccess(this.props.t('claudy.actions.support.success'));
      }
    }
  }, {
    key: "onOpen",
    value: function onOpen() {
      var _this2 = this;

      this.props.resizeIntent(30 * 16); // 30em

      this.setState({
        hideContent: false
      });

      var listenerToFocus = function listenerToFocus(e) {
        if (e.propertyName === 'transform') {
          if (_this2.messageInput && _this2.messageInput.focus) _this2.messageInput.focus();
          e.target.removeEventListener('transitionend', listenerToFocus);
        }
      };

      this.props.container.addEventListener('transitionend', listenerToFocus, false);
    }
  }, {
    key: "onReturn",
    value: function onReturn() {
      var _this3 = this;

      this.props.resizeIntentDefault();

      var listenerToHide = function listenerToHide(e) {
        if (e.propertyName === 'transform') {
          _this3.setState({
            hideContent: true
          });

          e.target.removeEventListener('transitionend', listenerToHide);
        }
      };

      this.props.container.addEventListener('transitionend', listenerToHide, false);
    }
  }, {
    key: "sendMessage",
    value: function sendMessage() {
      this.props.sendMessageToSupport(this.state.message);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props = this.props,
          t = _this$props.t,
          iconSrc = _this$props.iconSrc,
          emailStatus = _this$props.emailStatus;
      var _this$state = this.state,
          hideContent = _this$state.hideContent,
          message = _this$state.message;
      var isSent = emailStatus.isSent,
          isSending = emailStatus.isSending,
          error = emailStatus.error;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "coz-claudy-menu-action-description coz-claudy-menu-action--support"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "coz-claudy-menu-action-description-header"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        className: "coz-claudy-menu-action-icon",
        src: iconSrc
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "coz-claudy-menu-action-title"
      }, t("claudy.actions.support.description"))), !hideContent && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "coz-claudy-menu-action-description-content coz-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "coz-form-label"
      }, t('claudy.actions.support.fields.message.title'), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
        className: "set-services-claudy-textarea",
        value: message,
        ref: function ref(input) {
          _this4.messageInput = input;
        },
        placeholder: t('claudy.actions.support.fields.message.placeholder'),
        onChange: function onChange(e) {
          _this4.setState({
            message: e.target.value
          });
        }
      })), (!isSent && !isSending && !error || isSent && !isSending && !error) && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "coz-claudy-menu-action-description-detail"
      }, t('claudy.actions.support.emailDetail')), !isSending && error && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "coz-claudy-menu-action-description-error"
      }, error.i18n && "".concat(t(error.i18n)), error.message && "".concat(t('claudy.actions.support.error'), " : ").concat(error.message), !error.i18n && !error.message && t('claudy.actions.support.error')), isSending && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "coz-claudy-menu-action-description-detail"
      }, t('claudy.actions.support.sending')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        onClick: function onClick() {
          return _this4.sendMessage();
        },
        disabled: !message,
        busy: isSending
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_3__["default"], {
        icon: "paperplane"
      }), t('claudy.actions.support.button'))));
    }
  }]);

  return Support;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__["translate"])()(Support));

/***/ }),

/***/ "KuCt":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./icon-bills.svg": "XPvO",
	"./icon-laptop.svg": "ji6z",
	"./icon-phone.svg": "qul3",
	"./icon-question-mark.svg": "2hWv"
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
webpackContext.id = "KuCt";

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

/***/ "Pana":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

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

/***/ "XPvO":
/***/ (function(module, exports) {

module.exports = "/img/icon-bills.svg";

/***/ }),

/***/ "XSRU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("/MKj");
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("buk/");
/* harmony import */ var actions_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("NeM9");
/* harmony import */ var actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("9At1");
/* harmony import */ var actions_email__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("rttf");
/* harmony import */ var components_IntentView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("Hz7n");







var mapStateToProps = function mapStateToProps(state) {
  return {
    claudy: state.claudy,
    service: state.service,
    emailStatus: state.emailStatus
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    createIntentService: function createIntentService(intent, window) {
      dispatch(Object(actions_services__WEBPACK_IMPORTED_MODULE_2__["createIntentService"])(intent, window));
    },
    fetchClaudy: function fetchClaudy() {
      dispatch(Object(actions_services__WEBPACK_IMPORTED_MODULE_2__["fetchClaudyInfos"])());
    },
    fetchInfos: function fetchInfos() {
      dispatch(Object(actions__WEBPACK_IMPORTED_MODULE_3__["fetchInfos"])());
    },
    sendMessageToSupport: function sendMessageToSupport(message) {
      dispatch(Object(actions_email__WEBPACK_IMPORTED_MODULE_4__["sendMessageToSupport"])(message, ownProps.t));
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__["translate"])()(Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["connect"])(mapStateToProps, mapDispatchToProps)(components_IntentView__WEBPACK_IMPORTED_MODULE_5__["default"])));

/***/ }),

/***/ "XWeM":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

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

/***/ "d/w2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styles_services_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("mUip");
/* harmony import */ var styles_services_index__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styles_services_index__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("i8i4");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("y6ex");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("/MKj");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("ANjH");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("sINF");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("1mXj");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var containers_IntentService__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("XSRU");
/* harmony import */ var reducers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("cokx");
/* global cozy, __DEVELOPMENT__ */











var lang = document.documentElement.getAttribute('lang') || 'en';
var loggerMiddleware = Object(redux_logger__WEBPACK_IMPORTED_MODULE_8__["createLogger"])(); // Enable Redux dev tools

var composeEnhancers =  true && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux__WEBPACK_IMPORTED_MODULE_6__["compose"];
var middlewares = [redux_thunk__WEBPACK_IMPORTED_MODULE_7__["default"]];
if (true) middlewares.push(loggerMiddleware); // store

var store = Object(redux__WEBPACK_IMPORTED_MODULE_6__["createStore"])(reducers__WEBPACK_IMPORTED_MODULE_10__["default"], composeEnhancers(redux__WEBPACK_IMPORTED_MODULE_6__["applyMiddleware"].apply(void 0, middlewares)));
document.addEventListener('DOMContentLoaded', function () {
  var root = document.querySelector('[role=application]');
  var data = root.dataset;
  cozy.client.init({
    cozyURL: '//' + data.cozyDomain,
    token: data.cozyToken
  });
  Object(react_dom__WEBPACK_IMPORTED_MODULE_2__["render"])(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_5__["Provider"], {
    store: store
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_3__["I18n"], {
    lang: lang,
    dictRequire: function dictRequire(lang) {
      return __webpack_require__("/KVF")("./".concat(lang));
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "set-services"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(containers_IntentService__WEBPACK_IMPORTED_MODULE_9__["default"], {
    window: window
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_4__["Sprite"], null)))), document.querySelector('[role=application]'));
});

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

/***/ "fKxt":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "ibJU":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profil","activated_services":"Aktywne usługi","connected_devices":"Połączone urządzenia","sessions":"Połączenia","storage":"Magazyn","email_notifications":"Powiadomienie e-mail"},"Loading":{"loading":"Wczytywanie"},"Empty":{"devices":{"title":"Nie masz podłączonych urządzeń","text":"Instalując różne aplikacje klienckie zawsze będziesz równoczesny dostęp do swoich plików na wszystkich urządzeniach. Cozy będzie zawsze w zasięgu ręki, nawet kiedy jesteś w drodze!","link":{"href":"https://cozy.io/en/download/","text":"Pobierz jedną z naszych aplikacji"}}},"ProfileView":{"instance":{"server_error":"Coś poszło nie tak po stronie serwera. Proszę, odśwież stronę."},"title":"Profil","password":{"title":"Hasło","show":"Pokaż","hide":"Ukryj","server_error":"Coś poszło nie tak. Twoje hasło nie zostało zapisane.","password_too_weak":"Twoje hasło jest za słabe. Powinieneś korzystać z dużych liter, cyfr, znaków specjalnych lub dłuższego hasła.","wrong_password":"Aktualne hasło wygląda na błędne.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Twoje hasło zostało zmienione.","reset_link":"Zapomniałeś obecnego hasła?","submit_label":"Zmień swoje hasło","reload":"Twoje hasło zostało zmienione. Strona przeładuje się teraz aby aktywować wprowadzone zmiany."},"current_password":{"label":"Wprowadź swoje obecne hasło","placeholder":"Obecne hasło"},"new_password":{"label":"Wprowadź Twoje nowe hasło","placeholder":"Nowe hasło"},"infos":{"success":"Twoje dane zostały zmienione","server_error":"Coś poszło nie tak. Twoje dane nie mogły zostać zapisane.","empty":"To pole nie może być puste"},"email":{"title":"E-mail","label":"Cozy potrzebuje Twojego adresu e-mail aby wysyłać powiadomienia oraz umożliwić odzyskanie hasła","error":"Adres e-mail nie wygląda na prawidłowy. Czy jesteś pewien, że wpisałeś go prawidłowo (np. janek@kowalski.pl)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Nazwa użytkownika","label":"Twoja nazwa użytkownika będzie wyświetlana gdy udostępniasz pliki za pomocą Cozy innym użytkownikom."},"tracking":{"title":"Pomóż ulepszać nasz produkt","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Język","label":"To będzie język Twojego Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Połączone urządzenia","load_error":"Wystąpił błąd w trakcie wczytywania Twoich urządzeń, proszę spróbuj za chwilę.","head_name":"Nazwa","head_sync":"Ostatnia synchronizacja","head_activity":"Ostatnia aktywność","head_permissions":"Pozwolenia","head_actions":"Akcje","revoke":"unieważnij","sync_date_format":"MMM D, RRRR"},"StorageView":{"title":"Magazyn","load_error":"Wystąpił błąd podczas wczytywania informacji o Twoim magazynie, proszę spróbuj za chwilę.","storage_title":"Całkowita pojemność","storage_phrase":"%{diskUsage} GB z %{diskQuota} GB wykorzystane","more_space":"Potrzebujesz więcej przestrzeni?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Historia połączeń","sync_date_format":"MMM D, RRRR","delete":"Zakończ wszystkie inne sesje","infos":{"server_error":"Coś poszło nie tak po stronie serwera. Proszę odśwież stronę.","sessions_deleted":"Wszystkie inne sesje zostały zakończone."}},"revokeDevice":{"title":"Unieważnij to urządzenie","description":"Chcesz odłączyć **%{name}**.","subText":"To natychmiastowo zatrzyma synchronizację z tym urządzeniem.","validate":"Unieważnij urządzenie","error":"Nie można unieważnić urządzenia, spróbuj odświeżyć stronę."},"ServicesView":{"title":"Uruchomione usługi","load_error":"Wystąpił błąd w trakcie ładowania Twoich usług, proszę spróbuj za chwilę.","head_services":"Usługi","head_account":"Konto","head_sync":"Ostatnia synchronizacja","head_status":"Status","unsync":"Niezsynchronizowany","konnector_link":"Uzyskaj dostęp do całej listy usług"},"soon":{"title":"Dostępne wkrótce","description":"Ta funkcja nie jest jeszcze dostępna. Celem uzyskania dokładniejszych informacji skontaktuj się z nami pod adresem contact@cozycloud.cc"},"support":{"title":"Cześć! Jak możemy Ci pomóc?","emailDetail":"Wiadomość zostanie wysłana z Twojego adresu e-mail zapisanego w ustawieniach Cozy.","fields":{"message":{"title":"Twoje zapytanie","placeholder":"Mów nam o wszystkim (pytaj o pomoc, dziel się opinią albo po prostu powiedz \"Cześć\"). Będzie nam miło móc z Tobą rozmawiać."}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Zaczynajmy!","sending":"Wysyłanie...","success":"Twoja wiadomość została wysłana. Dziękujemy!","error":"Wystąpił błąd podczas wysyłania Twojej wiadomości"},"claudy":{"title":"Jak posługiwać się Twoim Cozy?","actions":{"desktop":{"title":"Uzyskaj dostęp do plików z Twojego komputera","description":"Synchronizuj wszystkie pliki na Cozy Drive z Twoim komputerem","button":"Zainstaluj Cozy Drive na swoim komputerze","link":"https://cozy.io/en/download/"},"mobile":{"title":"Twórz kopie zapasowe i synchronizuj swoje zdjęcia z urządzenia mobilnego","description":"Wszystkie Twoje wspomnienia są bezpieczne na Twoim Cozy Drive","button":"Zainstaluj Cozy Drive na Twoim urządzeniu mobilnym","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Wracaj do swoich rachunków w dowolnej chwili","description":"Cozy Collect natychmiast organizuje wszystkie Twoje pliki","button":"Poznaj Cozy Collect"},"support":{"title":"Skontaktuj się z nami","description":"Cześć! Jak możemy Ci pomóc?","emailDetail":"Twoja wiadomość będzie wysłana z adresu e-mail zapisanego w ustawieniach Cozy.","fields":{"message":{"title":"Twoje zapytanie","placeholder":"Mów nam o wszystkim (pytaj o pomoc, dziel się opinią albo po prostu powiedz \"Cześć\"). Będzie nam miło móc z Tobą rozmawiać."}},"button":"Zaczynajmy!","sending":"Wysyłanie","success":"Twoja wiadomość została wysłana. Dziękujemy!","error":"Wystąpił błąd podczas wysyłania Twojej wiadomości"}}},"errors":{"noEmailFound":"Nie znaleziono adresu e-mail. Dodaj go w ustawieniach Twojego Cozy i spróbuj raz jeszcze."}};

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

/***/ "ji6z":
/***/ (function(module, exports) {

module.exports = "/img/icon-laptop.svg";

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

/***/ "lUKR":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "mUip":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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
    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["UPDATE_HINT_SUCCESS"]:
    case actions_passphrase__WEBPACK_IMPORTED_MODULE_1__["UPDATE_HINT_FAILURE"]:
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

/***/ "qul3":
/***/ (function(module, exports) {

module.exports = "/img/icon-phone.svg";

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

/***/ "sOia":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./ClaudyActionComponents/Support.jsx": "K5fM"
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
webpackContext.id = "sOia";

/***/ }),

/***/ "toXQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Claudy", function() { return Claudy; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_helpers_tracker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("4kcP");
/* harmony import */ var cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("y6ex");
/* harmony import */ var services_ClaudyAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("vQ3W");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* global __PIWIK_TRACKER_URL__  __PIWIK_SITEID__ __PIWIK_DIMENSION_ID_APP__ */





var MOBILE_CLIENT_KIND = 'mobile';
var DESKTOP_CLIENT_KIND = 'desktop';
var CLAUDY_ACTION_GATHER = 'gather';
var Claudy =
/*#__PURE__*/
function (_Component) {
  _inherits(Claudy, _Component);

  function Claudy(props) {
    var _this;

    _classCallCheck(this, Claudy);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Claudy).call(this, props));
    _this.state = {
      openedAction: null,
      selectedAction: null,
      alreadyResized: false,
      alert: null
    };
    _this.getIcon = _this.getIcon.bind(_assertThisInitialized(_this));
    _this.computeSelectedActionUrl = _this.computeSelectedActionUrl.bind(_assertThisInitialized(_this));
    _this.selectAction = _this.selectAction.bind(_assertThisInitialized(_this));
    _this.trackActionLink = _this.trackActionLink.bind(_assertThisInitialized(_this));
    _this.goBack = _this.goBack.bind(_assertThisInitialized(_this));
    _this.checkIcon = __webpack_require__("3z1J");
    return _this;
  }

  _createClass(Claudy, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // if tracking enabled, init the piwik tracker
      if (Object(cozy_ui_react_helpers_tracker__WEBPACK_IMPORTED_MODULE_2__["shouldEnableTracking"])()) {
        var trackerInstance = Object(cozy_ui_react_helpers_tracker__WEBPACK_IMPORTED_MODULE_2__["getTracker"])("https://piwik.cozycloud.cc", 8, false, false);
        Object(cozy_ui_react_helpers_tracker__WEBPACK_IMPORTED_MODULE_2__["configureTracker"])({
          appDimensionId: 1,
          app: 'Cozy Settings Services',
          heartbeat: 0
        });
        this.setState({
          usageTracker: trackerInstance
        });
      }
    }
  }, {
    key: "getIcon",
    value: function getIcon(iconName) {
      return __webpack_require__("KuCt")("./".concat(iconName));
    }
  }, {
    key: "computeSelectedActionUrl",
    value: function computeSelectedActionUrl(selectedAction) {
      if (!selectedAction || !selectedAction.link) return null;
      var action = selectedAction;
      var _this$props = this.props,
          t = _this$props.t,
          claudyInfos = _this$props.claudyInfos;

      if (action.link.type === 'apps' && action.link.appSlug) {
        if (!claudyInfos.apps || !claudyInfos.apps.length) {
          // eslint-disable-next-line no-console
          console.warn('No apps found on the Cozy');
          return null;
        }

        var app = claudyInfos.apps.find(function (a) {
          return a.attributes.slug === action.link.appSlug;
        });

        if (app && app.links && app.links.related) {
          var appUrl = "".concat(app.links.related).concat(action.link.path || '');
          return appUrl;
        } else {
          // eslint-disable-next-line no-console
          console.warn("No app with slug '".concat(action.link.appSlug, "' found on the Cozy."));
          return null;
        }
      } else if (action.link.type === 'external') {
        var url = t("claudy.actions.".concat(action.slug, ".link"));
        return url;
      } else {
        return null;
      }
    }
  }, {
    key: "consolidateActions",
    value: function consolidateActions(claudyInfos) {
      return claudyInfos.actions.map(function (action) {
        switch (action.slug) {
          case DESKTOP_CLIENT_KIND:
            action.complete = !!claudyInfos.devices.find(function (d) {
              return d.client_kind === DESKTOP_CLIENT_KIND;
            });
            break;

          case MOBILE_CLIENT_KIND:
            action.complete = !!claudyInfos.devices.find(function (d) {
              return d.client_kind === MOBILE_CLIENT_KIND;
            });
            break;

          case CLAUDY_ACTION_GATHER:
            action.complete = !!claudyInfos.accounts.length;
            break;

          default:
            action.complete = false;
            break;
        }

        return action;
      });
    }
  }, {
    key: "selectAction",
    value: function selectAction(action) {
      // if just previously selected
      var usageTracker = this.state.usageTracker;

      if (usageTracker) {
        usageTracker.push(['trackEvent', 'Claudy', 'openAction', "".concat(action.slug)]);
      }

      if (this.state.selectedAction && this.state.selectedAction.slug === action.slug) {
        this.setState({
          openedAction: true
        });
      } else {
        this.setState({
          selectedAction: action,
          openedAction: true
        });
      }
    }
  }, {
    key: "trackActionLink",
    value: function trackActionLink(action) {
      var usageTracker = this.state.usageTracker;

      if (usageTracker) {
        usageTracker.push(['trackEvent', 'Claudy', 'openActionLink', "".concat(action.slug)]);
      }
    }
  }, {
    key: "goBack",
    value: function goBack(alert) {
      var _this2 = this;

      this.setState({
        openedAction: false
      });

      if (alert) {
        this.setState({
          alert: alert
        }); // In case of alert, we reset it after 30" to make it disappear

        setTimeout(function () {
          _this2.setState({
            alert: null
          });

          _this2.resizeDefaultClaudy();
        }, 30 * 1000);
      }
    }
  }, {
    key: "resizeClaudy",
    value: function resizeClaudy(height) {
      var service = this.props.service;
      var alert = this.state.alert; // to add automatically extra size for alert

      service.instance && typeof service.instance.resizeClient === 'function' && service.instance.resizeClient({
        height: height + (alert ? 44 : 0)
      }, '.2s ease-out');
    }
  }, {
    key: "resizeDefaultClaudy",
    value: function resizeDefaultClaudy() {
      var claudyInfos = this.props.claudyInfos;
      var actionsLength = claudyInfos.actions.length; // actions.length * action{height} (64px) + header{height} (56px) + content{padding} (2 * 8px)

      this.resizeClaudy((actionsLength <= 5 ? actionsLength : 5) * 64 + 56 + 2 * 8);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          t = _this$props2.t,
          claudyInfos = _this$props2.claudyInfos,
          onClose = _this$props2.onClose,
          emailStatus = _this$props2.emailStatus,
          sendMessageToSupport = _this$props2.sendMessageToSupport,
          service = _this$props2.service;
      var _this$state = this.state,
          selectedAction = _this$state.selectedAction,
          openedAction = _this$state.openedAction,
          alreadyResized = _this$state.alreadyResized,
          alert = _this$state.alert;
      var selectedActionUrl = this.computeSelectedActionUrl(selectedAction);
      var claudyActions = this.consolidateActions(claudyInfos);
      var SelectedActionComponent = null;

      if (selectedAction && selectedAction.component) {
        SelectedActionComponent = __webpack_require__("sOia")("./ClaudyActionComponents".concat(selectedAction.component, ".jsx")).default;
      }

      if (!alreadyResized && claudyInfos.actions.length && service.instance) {
        this.resizeDefaultClaudy(); // very first resizing

        this.setState({
          alreadyResized: true
        });
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "coz-service-claudy ".concat(openedAction ? 'coz-claudy-menu--action-selected' : '')
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", {
        className: "coz-claudy-menu-header"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: "coz-claudy-menu-title"
      }, t('claudy.title')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "coz-btn-close",
        onClick: onClose
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Icon__WEBPACK_IMPORTED_MODULE_3__["default"], {
        icon: "cross",
        color: "#95999D",
        width: "24",
        height: "24"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "coz-claudy-menu-header-back-button",
        onClick: function onClick() {
          return _this3.goBack();
        }
      })), alert && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        key: "coz-claudy-menu-action-description-success",
        className: "coz-claudy-menu-action-description-success"
      }, alert), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "coz-claudy-menu-content-wrapper"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "coz-claudy-menu-content",
        ref: function ref(container) {
          _this3.claudyContainer = container;
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "coz-claudy-menu-actions-list"
      }, claudyActions.map(function (action, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          className: "coz-claudy-menu-action",
          "data-complete": action.complete,
          onClick: function onClick() {
            return _this3.selectAction(action);
          },
          key: index
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          className: "coz-claudy-menu-action-icon",
          src: _this3.getIcon(action.icon)
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          className: "coz-claudy-menu-action-title"
        }, t("claudy.actions.".concat(action.slug, ".title"))), action.complete && action.slug !== CLAUDY_ACTION_GATHER && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          className: "coz-claudy-menu-action-check",
          src: _this3.checkIcon
        }), action.complete && action.slug === CLAUDY_ACTION_GATHER && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "coz-claudy-menu-action-count-wrapper"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: "coz-claudy-menu-action-count"
        }, claudyInfos.accounts.length)));
      })), selectedAction && !SelectedActionComponent && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(services_ClaudyAction__WEBPACK_IMPORTED_MODULE_4__["default"], {
        action: selectedAction,
        iconSrc: this.getIcon(selectedAction.icon),
        url: selectedActionUrl,
        onActionClick: function onActionClick() {
          return _this3.trackActionLink(selectedAction);
        }
      }), SelectedActionComponent && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SelectedActionComponent, {
        action: selectedAction,
        iconSrc: this.getIcon(selectedAction.icon),
        url: selectedActionUrl,
        onActionClick: function onActionClick() {
          return _this3.trackActionLink(selectedAction);
        },
        onSuccess: this.goBack,
        container: this.claudyContainer,
        resizeIntent: function resizeIntent(height) {
          return _this3.resizeClaudy(height);
        },
        resizeIntentDefault: function resizeIntentDefault() {
          return _this3.resizeDefaultClaudy();
        },
        opened: openedAction,
        emailStatus: emailStatus,
        sendMessageToSupport: sendMessageToSupport
      }))));
    }
  }]);

  return Claudy;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__["translate"])()(Claudy));

/***/ }),

/***/ "vQ3W":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClaudyAction", function() { return ClaudyAction; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("buk/");
/* harmony import */ var cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("KXWi");



var ClaudyAction = function ClaudyAction(_ref) {
  var t = _ref.t,
      action = _ref.action,
      iconSrc = _ref.iconSrc,
      url = _ref.url,
      onActionClick = _ref.onActionClick;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "coz-claudy-menu-action-description"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "coz-claudy-menu-action-description-header"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    className: "coz-claudy-menu-action-icon",
    src: iconSrc
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "coz-claudy-menu-action-title"
  }, t("claudy.actions.".concat(action.slug, ".title")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "coz-claudy-menu-action-description-content"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "coz-claudy-menu-action-description-text"
  }, t("claudy.actions.".concat(action.slug, ".description"))), url ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__["ButtonLink"], {
    href: url,
    target: action.link.type === 'external' ? '_blank' : '_parent',
    className: "coz-claudy-menu-action-description-button",
    onClick: onActionClick
  }, t("claudy.actions.".concat(action.slug, ".button"))) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_react_Button__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    className: "coz-claudy-menu-action-description-button",
    disabled: true,
    title: "App ".concat(action.link.appSlug, " not found")
  }, t("claudy.actions.".concat(action.slug, ".button")))));
};
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_react_I18n__WEBPACK_IMPORTED_MODULE_1__["translate"])()(ClaudyAction));

/***/ }),

/***/ "xHNF":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Двухфакторная аутентификация","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Двухфакторная аутентификация","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Защитите Cozy с помощью двухфакторной аутентификации","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "xoYS":
/***/ (function(module) {

module.exports = {"manifest":{"name":"Settings"},"DeleteAccount":{"title":"Delete your account","label":"You can delete you Cozy at anytime. Be careful, once your account is deleted, your data will entirely be deleted, there is no going back.","button":{"label":"Delete my account"},"error":{"message":"An error occurred during account deletion request. Please retry or contact our support."},"modal":{"confirm":{"title":"Delete your Cozy ?","description":{"line":{"1":"Your Cozy will be removed","2":"Your will not be able to access your Cozy anymore","3":"All your data will be removed"}},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Delete"}}},"form":{"title":"Deletion request for your Cozy","reason":{"label":"Why do you want to delete your Cozy (optionnal)?"},"button":{"cancel":{"label":"Cancel"},"submit":{"label":"Send"}}}},"request":{"mail":{"subject":"Deletion request for %{domain}"}},"success":{"message":"Your deletion request has been sent."}},"Nav":{"profile":"Profile","activated_services":"Activated services","connected_devices":"Connected devices","sessions":"Connections","storage":"Storage","email_notifications":"E-mail notifications"},"Loading":{"loading":"Loading"},"Empty":{"devices":{"title":"You don't have any connected devices","text":"By installing the various clients, you will be able to access your files on all your screens et simultaneously. Cozy will always be at hand reach, even if you are always on the road!","link":{"href":"https://cozy.io/en/download/","text":"Download one of our applications"}}},"ProfileView":{"instance":{"server_error":"Something went wrong with the server. Please, reload the page."},"title":"Profile","password":{"title":"Password","show":"Show","hide":"Hide","server_error":"Something went wrong. Your password has not been saved.","password_too_weak":"Your password is too weak. You should add an uppercase, a number, a special character or a longer password.","wrong_password":"Current password seems wrong.","wrong_two_fa_code":"The provided two factor code seems wrong.","success":"Your password has been changed.","reset_link":"Forgot your current password?","submit_label":"Change your password","reload":"Your password has been changed. The page is going to reload so the change can take effect."},"current_password":{"label":"Enter your current password","placeholder":"Current password"},"new_password":{"label":"Enter your new password","placeholder":"New password"},"infos":{"success":"Your informations has been changed","server_error":"Something went wrong. Your informations has not been saved.","empty":"This field cannot be empty"},"email":{"title":"E-mail","label":"Cozy needs your e-mail to send you notifications and allow you to recover your password","error":"The e-mail address does not feel right. Are you sure you wrote it correctly (e.g. john@wayne.com)?"},"twofa":{"title":{"activate":"Two steps authentication","desactivate":"Desactivate two steps authentication","validation":"Two steps authentication validation"},"passphrase":{"title":"Two steps authentication","description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to change your password:"},"label":"Because two steps are better than one, improve your Cozy security with an additionnal step.<br/>[Check out our assistance website →](%{link})","modal":{"code":"code","protect":"Protect your Cozy with two steps authentication","change":"**What's changing?** Everytime you'll connect to your Cozy, you'll need your password and a validation code.<br/>[Check out our assistance website →](%{link})","secu_title":"Add an additionnal security level","secu_description":"Password, that's good, but if it isn't \"complicated\", a thief can easily guess it. Receive a validation code by mail assures the control of your Cozy.","protect_title":"Improve the protection of your data","protect_description":"Even if a thief gets your password, you stay the only captain able to connect to your Cozy","desactivate_title":"Are you sure to disable this option?","desactivate_description":"On clicking on \"Desactivate\" button, your password will be the only key to access your Cozy. You will delete a security level.","confirmation_title":"Validation code confirmation","confirmation_description":"Your Cozy sent a 6 digits validation code to %{email}.<br/>Entre the code inside to activate authentication.","nocode":"You do not receive any code?","nocode_claude":"Contact Claude at ","validation_title":"Congratulations! Your email is confirmed.","validation_description":"Your Cozy is now secured with 2 steps.","validation_logs":"Remember your identifiers:","email":"You should provide a valid email address","button":{"activate":"Activate authentication","cancel":"cancel","desactivate":"desactivate","validate":"validate","terminate":"terminate"}}},"public_name":{"title":"Username","label":"Your username will be displayed when you share files with Cozy users."},"tracking":{"title":"Help us to improve our product","label":"Authorize Cozy Cloud to get anonymously your usage data to improve our product.<br/>[Be informed about Cozy commitments](https://files.cozycloud.cc/TOS%{version}.pdf)"},"export":{"title":"My data","label":"Cozy is committed to provide you all your data that it stores about you:","link":"Download a copy of my data","server_error":"Something went wrong, pleasy try again or contact us.","fetch_error":"Something went wrong when fetching your export data. Please try again or contact us.","missing_error":"The archive seems to be missing or expired. Please try again or contact us.","success":"Your request has correctly be sent!","modal":{"title":"Get back my data","description":"Cozy is in charge of getting all data that its has about you and to send you an archive to download.<br/><br/>The download link will be sent to you to the __%{email}__ email address when the archive will be available.","cancel":"Cancel","CTA":"Send me my data"},"download":{"title":"Download my data","description":"Here are all the data archive(s) available from your Cozy:","CTA":"Download the archive","CTA_part":"Download (part %{number})"}},"locale":{"title":"Language","label":"This will be the language used in your Cozy.","contrib":"Interested in helping translate Cozy? [Check out how you can **give us a hand** on that](https://forum.cozy.io/t/how-to-contribute-to-the-cozy-localization/3937).","fr":"French","en":"English","es":"Spanish","ja":"Japanese","nl":"Dutch","de":"German","ru":"Russian","nl_NL":"Dutch (Netherlands)","ko":"Korean","pl":"Polish","pt":"Portuguese","da":"Danish","ro_RO":"Romanian (Romania)","pt_BR":"Portuguese (Brazil)","zh_CN":"Chinese (China)","ar":"Arabic","it":"Italian","ro":"Romanian","eo":"Esperanto","de_DE":"German (Germany)","sq":"Albanian","tr":"Turkish","uk_UA":"Ukrainian (Ukraine)","ru_RU":"Russian (Russia)","sq_AL":"Albanian (Albania)","ca":"Catalan","ca_ES":"Catalan (Spain)","zh":"Chinese","zh_TW":"Chinese (Taiwan)","cs":"Czech","cs_CZ":"Czech (Czech Republic)","el":"Greek","id":"Indonesian","it_IT":"Italian (Italy)","sk":"Slovak","sk_SK":"Sloval (Slovakia)","es_CO":"Spanish (Colombia)","es_ES":"Spanish (Spain)","sv":"Swedish"}},"DevicesView":{"title":"Connected devices","load_error":"An error occured while loading your devices, please try again later.","head_name":"Name","head_sync":"Last synchronisation","head_activity":"Last activity","head_permissions":"Permissions","head_actions":"Actions","revoke":"revoke","sync_date_format":"MMM D, YYYY"},"StorageView":{"title":"Storage","load_error":"An error occured while loading your storage information, please try again later.","storage_title":"Total space","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","more_space":"Need more storage space?","see_offer":"Upgrade my storage"},"SessionsView":{"title":"Connection history","sync_date_format":"MMM D, YYYY","delete":"Delete all others sessions","infos":{"server_error":"Something went wrong with the server. Please, reload the page.","sessions_deleted":"All others sessions are deleted."}},"revokeDevice":{"title":"Revoke this device","description":"You're about to unlink **%{name}**.","subText":"It will immediately stop syncing with this device.","validate":"Revoke device","error":"Unable to revoke the device, try to reload the page."},"ServicesView":{"title":"Activated services","load_error":"An error occured while loading your services, please try again later.","head_services":"Services","head_account":"Account","head_sync":"Last synchronisation","head_status":"Status","unsync":"Unsynchronised","konnector_link":"Access the whole list of services here"},"soon":{"title":"Coming soon","description":"This feature is not available yet. For more information, please contact us at contact@cozycloud.cc"},"support":{"title":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"response_email":{"subject":"Your request has been correctly received","body":"Hello,\n\nWe correctly received your support request:\n%{message}\n\nWe are doing our best to respond you as soon as possible.\n\nClaude from Cozy."},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"},"claudy":{"title":"How to drive your Cozy?","actions":{"desktop":{"title":"Get access to your files in your computer","description":"Synchronize all your Cozy Drive files on your computer","button":"Install Cozy Drive on your desktop","link":"https://cozy.io/en/download/"},"mobile":{"title":"Back up and sync your pics from your mobile","description":"All your memories are safe on your Cozy Drive","button":"Install the Cozy Drive app on your mobile","link":"https://cozy.io/en/download/"},"cozy-collect":{"title":"Get back your bills instantly","description":"Cozy Collect organize all your files instantly","button":"Discover Cozy Collect"},"support":{"title":"Contact us","description":"Hi! Can we help you?","emailDetail":"Your message will be sent from your email address saved in your Cozy settings.","fields":{"message":{"title":"Your request","placeholder":"Tell us anything (ask for help, share a feedback or just say hello). We'll be happy to talk to you. "}},"button":"Let's go!","sending":"Sending...","success":"👏 Your message has been sent. Thank you!","error":"An error occured while sending your message"}}},"errors":{"noEmailFound":"No email address found. Please add one in your Cozy settings then try again."}};

/***/ }),

/***/ "zvm5":
/***/ (function(module) {

module.exports = {"desktop":{"icon":"icon-laptop.svg","link":{"type":"external"}},"mobile":{"icon":"icon-phone.svg","link":{"type":"external"}},"gather":{"icon":"icon-bills.svg","link":{"type":"apps","appSlug":"home","path":"/intro"}},"support":{"icon":"icon-question-mark.svg","component":"/Support"}};

/***/ })

/******/ });
//# sourceMappingURL=settings.js.map