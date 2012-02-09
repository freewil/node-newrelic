var metric = require('../lib/metric.js');
var stats = require('../lib/stats.js');

function Agent(apdexT) {
	this.getApdexT = function() {
		return apdexT;
	}
}

exports['recordWebTransactionMetrics satisfying'] = function(beforeExit, assert) {
	var agent = new Agent(0.06);
	var s = new stats.StatsCollection(agent);
	metric.recordWebTransactionMetrics(s, '/test', 55, 200);
	console.log(JSON.stringify(s));
	assert.equal('{"WebTransaction/Uri/test":[1,0.055,0,0.055,0.055,0.003025],"Apdex/Uri/test":[1,0,0,0,0,0],"Apdex":[1,0,0,0,0,0],"WebTransaction":[1,0.055,0.055,0.055,0.055,0.003025],"HttpDispatcher":[1,0.055,0.055,0.055,0.055,0.003025]}', JSON.stringify(s));
}


exports['recordWebTransactionMetrics tolerating'] = function(beforeExit, assert) {
	var agent = new Agent(0.05);
	var s = new stats.StatsCollection(agent);
	metric.recordWebTransactionMetrics(s, '/test', 55, 200);
	assert.equal('{"WebTransaction/Uri/test":[1,0.055,0,0.055,0.055,0.003025],"Apdex/Uri/test":[0,1,0,0,0,0],"Apdex":[0,1,0,0,0,0],"WebTransaction":[1,0.055,0.055,0.055,0.055,0.003025],"HttpDispatcher":[1,0.055,0.055,0.055,0.055,0.003025]}', JSON.stringify(s));
}

exports['recordWebTransactionMetrics frustrating'] = function(beforeExit, assert) {
	var agent = new Agent(0.01);
	var s = new stats.StatsCollection(agent);
	metric.recordWebTransactionMetrics(s, '/test', 55, 200);
	assert.equal('{"WebTransaction/Uri/test":[1,0.055,0,0.055,0.055,0.003025],"Apdex/Uri/test":[0,0,1,0,0,0],"Apdex":[0,0,1,0,0,0],"WebTransaction":[1,0.055,0.055,0.055,0.055,0.003025],"HttpDispatcher":[1,0.055,0.055,0.055,0.055,0.003025]}', JSON.stringify(s));
}


