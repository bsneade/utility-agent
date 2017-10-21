
/** The information available to the AI when calculating the scores. */
function Context() {}

Context.prototype.somefunction = function() {
}

function BaseContext() {
	Context.apply(this);
}
BaseContext.prototype = Object.create(Context.prototype);

module.exports = { Context, BaseContext };