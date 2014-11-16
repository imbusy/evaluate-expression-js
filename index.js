function _convertToPostfix(expression) {
   // implements the Shunting-yard algorithm
   // http://en.wikipedia.org/wiki/Shunting-yard_algorithm
   
   var digits = {
      '0': 0, '1': 1, '2': 2,
      '3': 3, '4': 4, '5': 5,
      '6': 6, '7': 7, '8': 8,
      '9': 9
   };
   
   // the identity is used when there is only one argument to evaluate
   // expressions such as "-123" and "+123"
   var binaryOps = {
      '+': { precedence: 1, op: function (x, y) { return x + y; }, identity: 0 },
      '-': { precedence: 1, op: function (x, y) { return x - y; }, identity: 0 },
      '/': { precedence: 2, op: function (x, y) { return x / y; }, identity: 1 },
      '*': { precedence: 2, op: function (x, y) { return x * y; }, identity: 1 }
   };
   
   var output = [];
   var curNumber = 0;
   var isNumber = false;
   var opStack = [];
   var index = 0;
   while (index < expression.length) {
      var token = expression[index];
      if (token in digits) {
         curNumber = 10*curNumber + digits[expression[index]];
         isNumber = true;
      } else if (expression[index] in binaryOps) {
         var binaryOp = binaryOps[expression[index]];
         while(opStack.length > 0 && opStack[opStack.length-1].precedence >= binaryOp.precedence) {
            output.push(opStack.pop());
         }
         opStack.push(binaryOp);
         curNumber = 0;
         isNumber = false;
      } else if (expression[index] == ' ') {
         if (isNumber) {
            output.push(curNumber);
         }
         curNumber = 0;
         isNumber = false;
      } else {
         throw new SyntaxError('Unidentified token in expression at '+ index.toString() +': '+ token);
      }
      index += 1;
   }
   if(isNumber) {
      output.push(curNumber);
   }
   while(opStack.length > 0) {
      output.push(opStack.pop());
   }
   return output;
}

function _evaluateInPostfix(input) {
   // evaluates the expression in parsed postfix notation
   // http://en.wikipedia.org/wiki/Reverse_Polish_notation
   
   var stack = [];
   var index = 0;
   while(index < input.length) {
      token = input[index];
      if(isFinite(token)) { // a number
         stack.push(token);
      } else { // an operator
         if (stack.length >= 2) { // evaluate "argument1 op argument2"
            var arg2 = stack.pop();
            var arg1 = stack.pop();
            stack.push(token.op(arg1, arg2));
         } else if (stack.length == 1) { // evaluate "identity op argument"
            var arg2 = stack.pop();
            stack.push(token.op(token.identity, arg2));
         } else {
            throw new SyntaxError('Missing numeric argument for an operator.');
         }
      }
      index += 1;
   }
   if (stack.length == 1) {
      return stack.pop();
   } else {
      throw new SyntaxError('Too many numeric values in expression.');
   }
}

module.exports = {
   version: '1.0.0',
   
   /**
    * Evaluate an arithmetic string expression and return the result.
    *
    * This function may evaluate expressions that might not be valid
    * such as 123 * / + 245 without raising an exception.
    *
    * @param {String} expression
    * @return {Number}
    */
   evaluate: function (expression) {
      return _evaluateInPostfix(_convertToPostfix(expression));
   }
};
