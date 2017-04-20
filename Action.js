let winston = require("winston");

/** The action that the AI executes when a specific Qualifier is selected. */
function Action() {}

// Perform whatever the action is
Action.prototype.execute = function(context) {
	//do nothing for default implementation
}

// Notification that this is no longer being exectued
Action.prototype.terminate = function(context) {

}

function BaseAction() {
	Action.apply(this);
}
BaseAction.prototype = Object.create(Action.prototype);

module.exports = { Action, BaseAction };