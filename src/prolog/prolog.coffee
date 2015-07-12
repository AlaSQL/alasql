################################################
# MINDAY 0.008BI 
# prolog.coffee
# Часть программы, связанная с языком Пролог
################################################


rules = [] # Правила для Пролога

addfact = (fact) ->
	add fact, kind:FACT

addrule = (rule) ->
	rules.push rule
	add rule, kind:RULE

factsProlog = -> 
	for ia in idea
		if ia.kind is FACT
			if ia.length > 0
				s = "#"+(-ia.id)
				s += "("+("#"+(-a.id) for a in ia.data).join(",")+")"
				s += ". "
				rules.push s

			for k,v of ia.prop
#				if isIdea(v)
#				 s= "#"+(-Number(k))+"(#"+(-ia.id)+",#"+(-v.id)+"). "
#				 rules.push s
#				else if isArray(v)
				for a in v
					s ="#"+(-Number(k))+"(#"+(-ia.id)
					s +=",#"+(-a.id)
					s +="). "
					rules.push s




sout = ""
answer = []

print = (str) ->
	sout += str

applyOne = (f, arg1) ->
		(arg2) ->
			f arg1, arg2

printVars = (which, environment) ->
		if which.length is 0
			print "Правда."
			answ=[['','Правда']]
			answer.push answ
		else
			i = 0
			answ = []
			while i < which.length
				sv = (provalue(new Variable(which[i].name + ".0"), environment)).print()
				if sv[0] is "#" # Значит число
					sv = idea[sv.substr(1)].txt
				answ.push [which[i].name, sv]  # Ответы
				i++
			answer.push answ
		print "\n"

provalue = (x, env) ->
		if x.type is "Term"
			l = []
			i = 0
			while i < x.partlist.list.length
				l[i] = provalue(x.partlist.list[i], env)
				i++
			return new Term(x.name, l)
		return x unless x.type is "Variable"
		binding = env[x.name]
		return x unless binding?
		provalue binding, env

newEnv = (n, z, e) ->
		ne = []
		ne[n] = z
		for i of e
			ne[i] = e[i]  unless i is n
		ne

unify = (x, y, env) ->
		x = provalue(x, env)
		y = provalue(y, env)
		return newEnv(x.name, y, env)  if x.type is "Variable"
		return newEnv(y.name, x, env)  if y.type is "Variable"
		if x.type is "Atom" or y.type is "Atom"
			if x.type is y.type and x.name is y.name
				return env
			else
				return null
		return null  unless x.name is y.name
		return null  unless x.partlist.list.length is y.partlist.list.length
		i = 0

		while i < x.partlist.list.length
			env = unify(x.partlist.list[i], y.partlist.list[i], env)
			return null  unless env?
			i++
		env
	
renameVariables = (list, level, parent) ->
		out = []
		if list.type is "Atom"
			return list
		else if list.type is "Variable"
			return new Variable(list.name + "." + level)
		else if list.type is "Term"
			out = new Term(list.name, renameVariables(list.partlist.list, level, parent))
			out.parent = parent
			return out
		i = 0

		while i < list.length
			out[i] = renameVariables(list[i], level, parent)
			i++
		out

varNames = (list) ->
		out = []
		maincont = undefined
		innercont = undefined
		i = 0
		while i < list.length
			maincont = true
			if list[i].type is "Variable"
				j = 0

				while j < out.length
					maincont = false  if out[j].name is list[i].name
					j++
				out[out.length] = list[i]  if maincont
			else if list[i].type is "Term"
				o2 = varNames(list[i].partlist.list)
				j = 0

				while j < o2.length
					innercont = true
					k = 0

					while k < out.length
						innercont = false  if o2[j].name is out[k].name
						k++
					out[out.length] = o2[j]  if innercont
					j++
			i++
		out


		
prove = (goalList, environment, db, level, reportFunction) ->
	if goalList.length is 0
				reportFunction environment
				return null
		thisTerm = goalList[0]
		builtin = db.builtin[thisTerm.name + "/" + thisTerm.partlist.list.length]
		if builtin
				newGoals = []
				j = 1
				while j < goalList.length
						newGoals[j - 1] = goalList[j]
						j++
				return builtin(thisTerm, newGoals, environment, db, level + 1, reportFunction)
		i = 0
		provestop = no
		while i < db.length and not provestop
				if thisTerm.excludeRule isnt i
					rule = db[i]
					if rule.head.name is thisTerm.name
						renamedHead = new Term(rule.head.name, renameVariables(rule.head.partlist.list, level, thisTerm))
						env2 = unify(thisTerm, renamedHead, environment)
						if env2?
							body = rule.body
							if body?
									newFirstGoals = renameVariables(rule.body.list, level, renamedHead)
									newGoals = []
									j = 0
									while j < newFirstGoals.length
											newGoals[j] = newFirstGoals[j]
											newGoals[j].excludeRule = i  if rule.body.list[j].excludeThis
											j++
									k = 1
									while k < goalList.length
											newGoals[j++] = goalList[k]
											k++
									ret = prove(newGoals, env2, db, level + 1, reportFunction)
									return ret  if ret?
							else
									newGoals = []
									j = 1
									while j < goalList.length
											newGoals[j - 1] = goalList[j]
											j++
									ret = prove(newGoals, env2, db, level + 1, reportFunction)
									return ret  if ret?
							provestop = yes  if renamedHead.cut
							provestop = yes  if thisTerm.parent.cut
				i++
		null
		
Variable = (head) ->
		@name = head
		@print = ->
			@name
		@type = "Variable"

Atom = (head) ->
		@name = head
		@print = ->
			@name
		@type = "Atom"

Term = (head, list) ->
		@name = head
		@partlist = new Partlist(list)
		@print = ->
			prs = ""
			if @name is "cons"
				x = this
				x = x.partlist.list[1]  while x.type is "Term" and x.name is "cons" and x.partlist.list.length is 2
				if (x.type is "Atom" and x.name is "nil") or x.type is "Variable"
					x = this
					prs+= "["
					com = false
					while x.type is "Term" and x.name is "cons" and x.partlist.list.length is 2
						prs += ", "  if com
						prs += x.partlist.list[0].print()
						com = true
						x = x.partlist.list[1]
					if x.type is "Variable"
						prs += " | "
						prs += x.print()
					prs += "]"
					return prs
			prs += "" + @name + "("
			@partlist.print()
			prs += ")"
			prs
		@type = "Term"

Partlist = (list) ->
		@list = list
		@print = ->
				prs = ""
				i = 0
				while i < @list.length
						prs += @list[i].print()
						prs += ", "  if i < @list.length - 1
						i++
				prs
		@


Body = (list) ->
		@list = list
		@print = ->
				prs = ""
				i = 0
				while i < @list.length
						prs += @list[i].print()
						prs += ", "  if i < @list.length - 1
						i++
				prs
		@


Rule = (head, bodylist) ->
		@head = head
		if bodylist?
				@body = new Body(bodylist)
		else
				@body = null
		@print = ->
				prs = ""
				unless @body?
						prs += @head.print()
						prs += ".\n"
				else
						prs += @head.print()
						prs += " :- "
						prs += @body.print()
						prs +=  ".\n"
				prs
		@

Tokeniser = (str) ->
		@remainder = str
		@current = null
		@type = null
		@consume = ->
			return  if @type is "eof"
			r = @remainder.match(/^\s*(.*)$/)
			@remainder = r[1]  if r
			if @remainder is ""
				@current = null
				@type = "eof"
				return
			r = @remainder.match(/^([\(\)\.,\[\]\|\!]|\:\-)(.*)$/)
			if r
				@remainder = r[2]
				@current = r[1]
				@type = "punc"
				return
			r = @remainder.match(/^([A-Z_][a-zA-Z0-9_]*)(.*)$/) # Переменные английские
			if r
				@remainder = r[2]
				@current = r[1]
				ref = find(@current) # Ищем похожее
				if ref? then @current = "#"+(-ref.id)
				@type = "var"
				return
			r = @remainder.match(/^(\{[^\}]*\})(.*)$/)
			if r
				@remainder = r[2]
				@current = r[1]
				@type = "id"
				return
			r = @remainder.match(/^("[^"]*")(.*)$/)
			if r
				@remainder = r[2]
				@current = r[1]
				@type = "id"
				return
			r = @remainder.match(/^([a-zA-Z0-9][a-zA-Z0-9_]*)(.*)$/) # термы английские
			if r
				@remainder = r[2]
				@current = r[1]
				ref = find(@current) # Ищем похожее
				if ref? then @current = "#"+(-ref.id)				
				@type = "id"
				return
# Русские буквы и ячейки
			r = @remainder.match(/^([А-Я_][а-яА-Я0-9_]*)(.*)$/) # Переменные русский
			if r
				@remainder = r[2]
				@current = r[1]
				ref = find(@current) # Ищем похожее
				if ref? then @current = "#"+(-ref.id)
				@type = "var"
				return
			r = @remainder.match(/^([а-яА-Я0-9][а-яА-Я0-9_]*)(.*)$/) # термы русские
			if r
				@remainder = r[2]
				@current = r[1]
				ref = find(@current) # Ищем похожее
				if ref? then @current = "#"+(-ref.id)
				@type = "id"
				return
			r = @remainder.match(/^([#][0-9]*)(.*)$/)  # Ячейки
			if r
				@remainder = r[2]
				@current = r[1]
				@type = "id"
				return

			if @remainder? and @remainder[0] is "'"	 or @remainder[0] is '"'	
				pos = 1
				while pos<@remainder.length and @remainder[pos] isnt @remainder[0]
					pos++
				if pos > 0
					@current = @remainder.substr(1,pos-1)
					@remainder = @remainder.substr(pos+1)
					ref = find(@current)
					if ref? then @current = "#"+(-ref.id)
					@type = "id"
					return
			###				
			r = @remainder.match(/^([\'].*[\'])(.*)$/)  # Строки
			if r
				if r[1]
				@remainder = r[2]
				@current = r[1].substr(1).slice(0,-1)
				# Проверим, нет ли в базе?
				ref = find(r[1].substr(1).slice(0,-1))
				if ref? then @current = "#"+Math.abs(ref)
				@type = "id"
				console.log @current
				return
			r = @remainder.match(/^([\"].*[\"])(.*)$/)  # Строки
			if r
				@remainder = r[2]
				@current = r[1].substr(1).slice(0,-1)
				# Проверим, нет ли в базе?
				ref = find(r[1].substr(1).slice(0,-1))
				if ref? then @current = "#"+Math.abs(ref)
				@type = "id"
				return
###				
			r = @remainder.match(/^(-[0-9][0-9]*)(.*)$/)
			if r
				@remainder = r[2]
				@current = r[1]
				@type = "id"
				return
			@current = null
			@type = "eof"

		@consume()

tokenstring = "";
currenttoken = "";
	
ParseRule = (tk) ->
		h = ParseHead(tk)
		return null  unless h
		return new Rule(h,null)  if tk.current is "."
		return null  unless tk.current is ":-"
		tk.consume()
		b = ParseBody(tk)
		return null  unless tk.current is "."
		new Rule(h, b)


ParseHead = (tk) ->
		ParseTerm tk
ParseTerm = (tk) ->
		if tk.type is "punc" and tk.current is "!"
			tk.consume()
			return new Term("cut", [])
		notthis = false
		if tk.current is "NOTTHIS"
			notthis = true
			tk.consume()
		return null  unless tk.type is "id"
		name = tk.current
		tk.consume()
		unless tk.current is "("
			return new Term(name, [])  if name is "fail"
			return null
		tk.consume()
		p = []
		i = 0
		until tk.current is ")"
			return null  if tk.type is "eof"
			part = ParsePart(tk)
			return null  unless part?
			if tk.current is ","
				tk.consume()
			else return null  unless tk.current is ")"
			p[i++] = part
		tk.consume()
		term = new Term(name, p)
		term.excludeThis = true  if notthis
		term
ParsePart = (tk) ->
		if tk.type is "var"
			n = tk.current
			tk.consume()
			return new Variable(n)
		unless tk.type is "id"
			return null  if tk.type isnt "punc" or tk.current isnt "["
			tk.consume()
			if tk.type is "punc" and tk.current is "]"
				tk.consume()
				return new Atom("nil")
			l = []
			i = 0
			loop
				t = ParsePart(tk)
				return null  unless t?
				l[i++] = t
				break  unless tk.current is ","
				tk.consume()
			append = undefined
			if tk.current is "|"
				tk.consume()
				return null  unless tk.type is "var"
				append = new Variable(tk.current)
				tk.consume()
			else
				append = new Atom("nil")
			return null  unless tk.current is "]"
			tk.consume()
			--i
			while i >= 0
				append = new Term("cons", [ l[i], append ])
				i--
			return append
		name = tk.current
		tk.consume()
		return new Atom(name)  unless tk.current is "("
		tk.consume()
		p = []
		i = 0
		until tk.current is ")"
			return null  if tk.type is "eof"
			part = ParsePart(tk)
			return null  unless part?
			if tk.current is ","
				tk.consume()
			else return null  unless tk.current is ")"
			p[i++] = part
		tk.consume()
		new Term(name, p)

ParseBody = (tk) ->
		p = []
		i = 0
		t = undefined
		while (t = ParseTerm(tk))?
			p[i++] = t
			break  unless tk.current is ","
			tk.consume()
		return null  if i is 0
		p

Eq = (thisTerm, goalList, environment, db, level, reportFunction) ->
		first = provalue(thisTerm.partlist.list[0], environment)
		return null unless first.type is "Atom"
		second = provalue(thisTerm.partlist.list[1], environment)
		return null unless second.type is "Atom"
		return null unless first.name is second.name
		prove goalList, environment, db, level + 1, reportFunction

Ne = (thisTerm, goalList, environment, db, level, reportFunction) ->
		first = provalue(thisTerm.partlist.list[0], environment)
		return null unless first.type is "Atom"
		second = provalue(thisTerm.partlist.list[1], environment)
		return null unless second.type is "Atom"
		return null unless first.name isnt second.name
		prove goalList, environment, db, level + 1, reportFunction
		
Comparitor = (thisTerm, goalList, environment, db, level, reportFunction) ->
		first = provalue(thisTerm.partlist.list[0], environment)
		return null  unless first.type is "Atom"
		second = provalue(thisTerm.partlist.list[1], environment)
		return null  unless second.type is "Atom"
		cmp = "eq"
		if first.name < second.name
			cmp = "lt"
		else cmp = "gt"  if first.name > second.name
		env2 = unify(thisTerm.partlist.list[2], new Atom(cmp), environment)
		return null  unless env2?
		prove goalList, env2, db, level + 1, reportFunction
		
Cut = (thisTerm, goalList, environment, db, level, reportFunction) ->
		ret = prove(goalList, environment, db, level + 1, reportFunction)
		thisTerm.parent.cut = true
		ret
Call = (thisTerm, goalList, environment, db, level, reportFunction) ->
		first = provalue(thisTerm.partlist.list[0], environment)
		return null  unless first.type is "Term"
		newGoals = []
		newGoals[0] = first
		first.parent = thisTerm
		j = 0
		while j < goalList.length
			newGoals[j + 1] = goalList[j]
			j++
		prove newGoals, environment, db, level + 1, reportFunction
Fail = (thisTerm, goalList, environment, db, level, reportFunction) ->
		null
BagOf = (thisTerm, goalList, environment, db, level, reportFunction) ->
		collect = provalue(thisTerm.partlist.list[0], environment)
		subgoal = provalue(thisTerm.partlist.list[1], environment)
		into = provalue(thisTerm.partlist.list[2], environment)
		collect = renameVariables(collect, level, thisTerm)
		newGoal = new Term(subgoal.name, renameVariables(subgoal.partlist.list, level, thisTerm))
		newGoal.parent = thisTerm
		newGoals = []
		newGoals[0] = newGoal
		anslist = []
		anslist.renumber = -1
		ret = prove(newGoals, environment, db, level + 1, BagOfCollectFunction(collect, anslist))
		answers = new Atom("nil")
		i = anslist.length

		while i > 0
			answers = new Term("cons", [ anslist[i - 1], answers ])
			i--
		env2 = unify(into, answers, environment)
		return null  unless env2?
		prove goalList, env2, db, level + 1, reportFunction
BagOfCollectFunction = (collect, anslist) ->
		(env) ->
			anslist[anslist.length] = renameVariables(provalue(collect, env), anslist.renumber--, [])

EvalContext = []
		
		
External = (thisTerm, goalList, environment, db, level, reportFunction) ->
		first = provalue(thisTerm.partlist.list[0], environment)
		return null  unless first.type is "Atom"
		r = first.name.match(/^"(.*)"$/)
		return null  unless r
		r = r[1]
		second = provalue(thisTerm.partlist.list[1], environment)
		arglist = []
		i = 1
		while second.type is "Term" and second.name is "cons"
			arg = provalue(second.partlist.list[0], environment)
			return null  unless arg.type is "Atom"
			re = new RegExp("\\$" + i, "g")
			r = r.replace(re, arg.name)
			second = second.partlist.list[1]
			i++
		return null  if second.type isnt "Atom" or second.name isnt "nil"
		ret = eval(r)
		ret = "nil"  unless ret
		env2 = unify(thisTerm.partlist.list[2], new Atom(ret), environment)
		return null  unless env2?
		prove goalList, env2, db, level + 1, reportFunction

ExternalAndParse = (thisTerm, goalList, environment, db, level, reportFunction) ->
		first = provalue(thisTerm.partlist.list[0], environment)
		return null  unless first.type is "Atom"
		r = first.name.match(/^"(.*)"$/)
		return null  unless r
		r = r[1]
		second = provalue(thisTerm.partlist.list[1], environment)
		arglist = []
		i = 1
		while second.type is "Term" and second.name is "cons"
			arg = provalue(second.partlist.list[0], environment)
			return null  unless arg.type is "Atom"
			re = new RegExp("\\$" + i, "g")
			r = r.replace(re, arg.name)
			second = second.partlist.list[1]
			i++
		return null  if second.type isnt "Atom" or second.name isnt "nil"
		ret = eval(r)
		ret = "nil"  unless ret
		ret = ParsePart(new Tokeniser(ret))
		env2 = unify(thisTerm.partlist.list[2], ret, environment)
		return null  unless env2?
		prove goalList, env2, db, level + 1, reportFunction
	

#
# Главная исполняющая функция
#
	
runProlog = (query)->
#		query = "связь(Какая)"
#		rules = [ "of(A,B,C) :- has(C,B,A).", "has(i1,#3,i5).", "has(i1,'kisa',i3).", "has(i1,\"собака\",i1).", "связь(Б):-of(A,Б,C)." ]
		outr = []
		outi = 0
		r = 0

		while r < rules.length
			outr[outi++] = ParseRule(new Tokeniser(rules[r]))
			r++
		outr.builtin = []
		outr.builtin["compare/3"] = Comparitor
		outr.builtin["cut/0"] = Cut
		outr.builtin["call/1"] = Call
		outr.builtin["fail/0"] = Fail
		outr.builtin["bagof/3"] = BagOf
		outr.builtin["external/3"] = External
		outr.builtin["external2/3"] = ExternalAndParse
		outr.builtin["eq/2"] = Eq
		outr.builtin["ne/2"] = Ne
		q = ParseBody(new Tokeniser(query))
		unless q?
			print "An error occurred parsing the query.\n"
			return
		q = new Body(q)	
		vs = varNames(q.list)
		prove renameVariables(q.list, 0, []), [], outr, 1, applyOne(printVars, vs)

		answer
