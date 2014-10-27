indent = (str) ->
  ("  #{line}" for line in str.split("\n")).join("\n")

exports.Select = class Select
    constructor: (@fields, @source, @distinct=false, @joins=[], @unions=[]) ->
      @order = null
      @group = null
      @where = null
      @limit = null
    toString: ->
      ret = ["SELECT #{@fields.join(', ')}"] 
      ret.push indent("FROM #{@source}")
      ret.push indent(join.toString()) for join in @joins
      ret.push indent(@where.toString()) if @where
      ret.push indent(@group.toString()) if @group
      ret.push indent(@order.toString()) if @order
      ret.push indent(@limit.toString()) if @limit
      ret.push union.toString() for union in @unions
      ret.join("\n")

exports.SubSelect = class SubSelect
  constructor: (@select, @name=null) -> null
  toString: -> 
    ret = []
    ret.push '('
    ret.push indent(@select.toString())
    ret.push if @name then ") #{@name.toString()}" else ")"
    ret.join("\n")

exports.Join = class Join
  constructor: (@right, @conditions=null, @side=null, @mode=null) -> null
  toString: -> 
    ret = ''
    ret += "#{@side} " if @side?
    ret += "#{@mode} " if @mode?
    ret + "JOIN #{@right}\n" + indent("ON #{@conditions}")

exports.Union = class Union
  constructor: (@query, @all=false) -> null
  toString: -> 
    all = if @all then ' ALL' else ''
    "UNION#{all}\n#{@query.toString()}"

exports.LiteralValue = class LiteralValue
  constructor: (@value, @value2=null) -> 
    if @value2
      @nested = true
      @values = @value.values
      @values.push(value2)
    else
      @nested = false
      @values = [@value]
  toString: -> "`#{@values.join('.')}`"

exports.StringValue = class StringValue
  constructor: (@value, @quoteType="''") -> null
  toString: -> "#{@quoteType}#{@value}#{@quoteType}"

exports.NumberValue = class LiteralValue
  constructor: (value) -> @value = Number(value)
  toString: -> @value.toString()

exports.BooleanValue = class LiteralValue
  constructor: (value) -> 
    @value = switch value.toLowerCase()
      when 'true'
        true
      when 'false'
        false
      else
        null
  toString: -> if @value? then @value.toString().toUpperCase() else 'NULL'

exports.FunctionValue = class FunctionValue
  constructor: (@name, @arguments=[], @udf=false) -> null
  toString: -> "#{@name}(#{@arguments.join(', ')})"

exports.Order = class Order
  constructor: (@orderings) ->
  toString: -> "ORDER BY #{@orderings.join(', ')}"

exports.OrderArgument = class OrderArgument
  constructor: (@value, @direction='ASC') -> null
  toString: -> "#{@value} #{@direction}"

exports.Limit = class Limit
  constructor: (@value) -> null
  toString: -> "LIMIT #{@value}"

exports.Table = class Table
  constructor: (@name, @win=null, @winFn=null, @winArg=null) -> null
  toString: -> 
    if @win
      "#{@name}.#{@win}:#{@winFn}(#{@winArg})"
    else
      @name.toString()

exports.Group = class Group
  constructor: (@fields) ->
    @having = null
  toString: -> 
    ret = ["GROUP BY #{@fields.join(', ')}"]
    ret.push @having.toString() if @having
    ret.join("\n")

exports.Where = class Where
  constructor: (@conditions) -> null
  toString: -> "WHERE #{@conditions}"

exports.Having = class Having
  constructor: (@conditions) -> null
  toString: -> "HAVING #{@conditions}"

exports.Op = class Op
  constructor: (@operation, @left, @right) -> null
  toString: -> "(#{@left} #{@operation} #{@right})"

exports.Field = class Field
  constructor: (@field, @name=null) -> null
  toString: -> if @name then "#{@field} AS #{@name}" else @field.toString()

exports.Star = class Star
  constructor: () -> null
  toString: -> '*'
  star: true
      