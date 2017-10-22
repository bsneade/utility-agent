/**
  Returns the sum of all Scorers
*/
class SumOfChildrenQualifier {
	scorers: Scorer[];
	action: Action;
	
	constrcutor(scorers: Scorer[], action: Action) {
		this.scorers = scorers;
		this.action = action;
	}

	score = function(context: Context) {
		//loop through the scorers and sum them up
		var scorerPromises = this.scorers.map(scorer => {
			return scorer.score(context);
		});
		return Promise.all(scorerPromises)
		    .then(values => {
		    	var sum = values.reduce(function(acc, val) {
	  					return acc + val;
					}, 0);
		    	return Promise.resolve(sum);
		    })
		    .catch(error => { return Promise.reject(error); } );
	}
}