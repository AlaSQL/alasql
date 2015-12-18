import {extend} from "../utils/object.js";

/* @formerly
//
// Expressions for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/


export function Column(params) { return extend(this, params); }
Column.prototype.toString = function() {
	var s;
	if(this.columnid === +this.columnid) {
		s = '['+this.columnid+']';
	} else {
		s = this.columnid;
	}
	if(this.tableid) {
		if(+this.columnid === this.columnid) {
			s = this.tableid+s;
		} else {
			s = this.tableid+'.'+s;
		}
		if(this.databaseid) {
			s = this.databaseid+'.'+s;
		}
	}
//	if(this.alias) s += ' AS '+this.alias;
	return s;
};

Column.prototype.toJS = function(context, tableid, defcols) {
	var s = '';
	if(!this.tableid && tableid === '' && !defcols) {
		if(this.columnid !== '_') {
			s = context+'[\''+this.columnid+'\']';
		} else {
			if(context === 'g') {
				s = 'g[\'_\']';
			} else {
				s = context;
			}
		}
	} else {
		if(context === 'g') {
			// if(this.columnid == '_') {
			// } else {
				s = 'g[\''+this.nick+'\']';
			// }
		} else if(this.tableid) {
			if(this.columnid !== '_') {
				s = context+'[\''+(this.tableid) + '\'][\''+this.columnid+'\']';
			} else {
				if(context === 'g') {
					s = 'g[\'_\']';
				} else {
					s = context+'[\''+(this.tableid) + '\']';
				}
			}
		} else if(defcols) {
			var tbid = defcols[this.columnid];
			if(tbid === '-') {
				throw new Error('Cannot resolve column "'+this.columnid+'" because it exists in two source tables');
			} else if(tbid) {
				if(this.columnid !== '_') {
					s = context+'[\''+(tbid) + '\'][\''+this.columnid+'\']';
				} else {
					s = context+'[\''+(tbid) + '\']';
				}
			} else {
				if(this.columnid !== '_') {
					s = context+'[\''+(this.tableid || tableid) + '\'][\''+this.columnid+'\']';
				} else {
					s = context+'[\''+(this.tableid || tableid) + '\']';
				}
			}
		} else if(tableid === -1) {
//			if(this.columnid != '') {
				s = context+'[\''+this.columnid+'\']';
//			} else {
//				s = context;
//			}
		} else {
			if(this.columnid !== '_') {
				s = context+'[\''+(this.tableid || tableid) + '\'][\''+this.columnid+'\']';
			} else {
				s = context+'[\''+(this.tableid || tableid) + '\']';
			}
		}
	}
//	console.log(context,s);
//	console.trace(new Error());
	return s;
}