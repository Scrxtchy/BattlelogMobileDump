var app = require('app');
var dom = require('dom');
var locale = require('locale');
var React = require("react");
var reflux = require('reflux');
var enums = require('enums');
var session = require('session');


exports.SelectUsersDialog = function(options) {
	options = options || {};
	var container = document.createElement('div');


	// ******************** Store ********************
	var selectUsersDialogStore = reflux.createStore({
		init: function() {
			this.users = _.map(app.rootViewController.comcenter.userItems, function(user) {
				return $.extend({
					selected: false,
					fixed: _.some(options.fixedUsers, function(fixedUser) {
						return fixedUser.userId == user.user.userId;
					})
				}, user);
			}).sort(function(a, b) {
				// First sort on presence
				if (a.status == b.status) {
					// Secondly sort on username
					return (a.user.username.toLowerCase() < b.user.username.toLowerCase()) ? -1 : 1;
				} else {
					if (a.status == "online") return -1;
					else if (b.status == "online") return 1;
					else return 0;
				}
			});
		},
		toggleUser: function(user) {
			if (!user.fixed) {
				user.selected = !user.selected;
				this.trigger({
					users: this.users
				});
			}
		},
		getDefaultState: function() {
			return {
				users: this.users
			};
		},
		reset: function() {
			_.each(this.users, function(user) {
				user.selected = false;
			});
		}
	});


	// ******************** Components ********************
	var UserNodes = React.createClass({
		displayName: 'UserNodes',
		onUserClick: function() {
			selectUsersDialogStore.toggleUser(this.props.user);
		},
		render: function() {
			var classes = React.addons.classSet({
				"selected": this.props.user.selected,
				"fixed": this.props.user.fixed
			});

			var avatar = dom.user_avatar(this.props.user.user);
			return (
				React.createElement("li", {
						key: this.props.user.user.userId,
						onClick: this.onUserClick,
						className: classes
					},
					React.createElement("div", {
						dangerouslySetInnerHTML: {
							__html: avatar[0].outerHTML
						}
					}),
					React.createElement("div", {
							className: "info"
						},
						React.createElement("div", {
							className: "name"
						}, this.props.user.user.username),
						React.createElement("div", {
							className: "status"
						})
					)
				)
			);
		}
	});
	var SelectUsersReactDialog = React.createClass({
		displayName: 'SelectUsersReactDialog',
		getInitialState: function() {
			return selectUsersDialogStore.getDefaultState();
		},
		getDefaultProps: function() {
			return {
				title: locale.t('ID_MOBILE_CHAT_ADD_FRIENDS')
			}
		},

		onStoreChange: function(state) {
			this.setState(state);
		},

		componentDidMount: function() {
			console.log("***  componentDidMount")
			this.unsubscribe = selectUsersDialogStore.listen(this.onStoreChange);
		},

		componentWillUnmount: function() {
			console.log("*** componentWillUnmount");
			this.unsubscribe();
		},


		onOkClick: function() {
			this.props.callback(
				_.filter(this.state.users, function(user) {
					return user.selected;
				})
			);
		},
		onCancelClick: function() {
			this.props.callback(false);
		},

		render: function() {
			var userNodes = _.map(this.state.users, function(user) {
				return React.createElement(UserNodes, {
					key: user.user.userId,
					user: user
				});
			});

			var btnOkClasses = React.addons.classSet({
				button: true,
				primary: true,
				// The button should be disabled if no users are selected
				"disabled": !_.find(this.state.users, function(user) {
					return user.selected;
				})
			});


			var game = session.getActiveGame(),
				isWarsaw = (game == enums.Game.WARSAW),
				isBfh = (game == enums.Game.OMAHA),
				isBf3 = (game == enums.Game.BF3),
				classes = React.addons.classSet({
					"nv-warsaw": isWarsaw,
					"nv-omaha": isBfh,
					"nv-bf3": isBf3,
					"select-users-dialog-overlay": true,
					"DialogOverlay": true
				});


			return (
				React.createElement("div", {
						className: classes
					},
					React.createElement("div", {
							className: "DialogView select-users-dialog"
						},
						React.createElement("header", null,
							React.createElement("h1", null, this.props.title)
						),
						React.createElement("div", {
								className: "content"
							},
							React.createElement("ul", {
									className: "user-rows"
								},
								userNodes
							)
						),
						React.createElement("footer", null,
							React.createElement("button", {
								onClick: this.onOkClick,
								className: btnOkClasses
							}, "Ok"),
							React.createElement("button", {
								onClick: this.onCancelClick,
								className: "button close"
							}, "Cancel")
						)
					)
				)
			);
		}
	});



	function init() {
		React.render(
			React.createElement(SelectUsersReactDialog, {
				callback: callback,
				options: options
			}), container
		);
		$("#app").append(container);
	}

	function callback(users) {
		// Remove the dialog
		$(container).remove();
		console.log("users:", users)
		if (options.callback) {
			options.callback(users ? _.map(users, function(user) {
				return user.user;
			}) : false);
		}
	}

	init();
};