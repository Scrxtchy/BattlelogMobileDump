var app = require("app"),
	device = require("device");
device.hasLocalStorage() || app.log("Device does not support localStorage, storage data will not be persisted!");
var data = {},
	storage = {};
storage.set = function(e, t) {
	return typeof t == "object" ? storage.setObject(e, t) : storage.setItem(e, t)
}, storage.get = function(e) {
	return storage.getObject(e)
}, storage.remove = function(e) {
	return storage.removeItem(e)
}, storage.setItem = function(e, t) {
	device.hasLocalStorage() ? localStorage.setItem(e, t) : data[e] = t
}, storage.getItem = function(e) {
	return device.hasLocalStorage() ? localStorage.getItem(e) : data[e]
}, storage.removeItem = function(e) {
	if (device.hasLocalStorage()) return localStorage.removeItem(e);
	delete data[e]
}, storage.setObject = function(e, t) {
	storage.setItem(e, JSON.stringify(t))
}, storage.getObject = function(e) {
	var t = storage.getItem(e);
	if (!t) return;
	try {
		return JSON.parse(t)
	} catch (n) {
		app.error("Unable to parse JSON for a storage item")
	}
}, module.exports = storage;