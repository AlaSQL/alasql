yy.Select.prototype.compileWhereExists = function() {
	return;
	if(!self.whereexists && !self.wherenotexists) return;

	var self = this;
	if(self.whereexists) {
		self.from = self.from.concat(self.whereexists.from);
		if(self.whereexists.where) {
			if(self.where) {
				self.where.expression = new yy.Op({op:'AND',left: self.where.expression, right:self.whereexists.where.expression}); 
			} else {
				self.where = new yy.Expression({expression:self.whereexists.where.expression});
			}
		self.whereexists = undefined;
		};
	} else if(self.wherenotexists) {
		self.from = self.from.concat(self.wherenotexists.from);
		if(self.wherenotexists.where) {
			var nw = new yy.UniOp({op:'NOT', right: self.wherenotexists.where.expression});
			if(self.where) {
				self.where.expression = new yy.Op({op:'AND',left: self.where.expression, right:nw}); 
			} else {
				self.where = new yy.Expression({expression:nw});
			}
		};
		self.wherenotexists = undefined;
	};
}