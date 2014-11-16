module.exports = {
   /**
    * Evaluate an arithmetic string expression and return the result.
    *
    * @param {String} expression
    * @return {Number}
    */
   evaluate: function (expression) {
      var digits = {
         '0': 0, '1': 1, '2': 2,
         '3': 3, '4': 4, '5': 5,
         '6': 6, '7': 7, '8': 8,
         '9': 9
      };
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
};
