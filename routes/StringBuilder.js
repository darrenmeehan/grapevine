// Initializes a new instance of the StringBuilder class
// and appends the given value if supplied

// source: http://www.codeproject.com/Articles/12375/JavaScript-StringBuilder
// Accessed: March 11th, 2013

exports.createStringBuilder= function ()
{
  console.log('Creating stringbuilder object...');
  return new StringBuilder();
}

function StringBuilder(value)
{
    this.strings = new Array("");
    this.append(value);
}

// Appends the given value to the end of this instance.
StringBuilder.prototype.append = function (value)
{
    if (value)
    {
        this.strings.push(value);
    }
}

// Appends the given value to the end of this instance.
StringBuilder.prototype.appendln = function (value)
{
    if (value)
    {
    	value+='\n';
        this.strings.push(value);
    }
}

// Clears the string buffer
StringBuilder.prototype.clear = function ()
{
    this.strings.length = 1;
}

// Converts this instance to a String.
StringBuilder.prototype.toString = function ()
{
    return this.strings.join("");
}
