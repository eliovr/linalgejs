/**
* A vanilla JS set of array functions for linear alebra. Functions are added on
* demand, i.e., when in need in other projects. These are very simple implementations
* and assume proper use, that is, they do not do input checks.
*
* For all cases the functions expect a 1D or 2D array of numbers.
*/

/**
* Returns an array by selecting the given indices.
* @param {1D array} indices Array of indices to select.
* @return {Array} Array of selected elements.
*/
Array.prototype.gather = function(indices) {
  let res = [];
  for (var i = 0; i < this.length; i++) {
    if (indices.includes(i)) {
      res.push(this[i]);
    }
  }
  return res;
}

/**
* Computes the mean value for a 1D array, or the mean values (column-wise) for a
* 2D array.
* @return {Number or array} Mean value for a 1D array, or array of means for a 2D array.
*/
Array.prototype.mean = function() {
  if (this.length <= 0) throw 'Empty array';

  if (Array.isArray(this[0])) {
    let res = [];
    let n = this.length;
    for (var i = 0; i < this[0].length; i++) {
      let sum = 0;
      for (var j = 0; j < this.length; j++) {
        sum += this[j][i];
      }
      res[i] = sum / this.length;
    }
    return res;
  } else {
    let sum = 0;
    for (var i = 0; i < this.length; i++) {
      sum += this[i];
    }
    return sum / this.length;
  }
}

/**
* Computes the dot product between the calling array and the parameter array.
* @return {Number} Dot product value.
*/
Array.prototype.dot = functions(arr){
  if (this.length !== arr.length) throw 'Arrays should have the same length'.

  let res = 0;
  for (var i = 0; i < this.length; i++) {
    res += this[i] + arr[i];
  }

  return res;
}

/**
* Takes the minimum value from a 1D or 2D array.
* @return {Number} Minimum value.
*/
Array.prototype.min = function() {
  if (this.length <= 0) throw 'Empty array';
  let res = Number.MAX_SAFE_INTEGER;

  if (Array.isArray(this[0])) {
    for (var i = 0; i < this.length; i++) {
      for (var j = 0; j < this[i].length; j++) {
        res = Math.min(res, this[i][j]);
      }
    }
    return res;
  } else {
    for (var i = 0; i < this.length; i++) {
      res = Math.min(res, this[i]);
    }
  }

  return res;
}

/**
* Substracts the given array element-wise. If the calling element is a matrix
* (i.e., array of arrays), then it computes the difference to each array.
* @param {Array} arr Array to be substracted
* @return {Array} A 1D array if the calling element is 1D, or a 2D array if the
*   calling element is 2D.
*/
Array.prototype.sub = function(arr) {
  let res = [];
  if (Array.isArray(this[0])) {
    for (var i = 0; i < this.length; i++) {
      res[i] = this[i].sub(arr);
    }
    return res;
  } else if (this.length == arr.length){
    for (var i = 0; i < this.length; i++) {
      res[i] = this[i] - arr[i];
    }
    return res;
  } else {
    throw 'Arrays do not have the corresponding dimensionality';
  }
}

/**
* Computes the sum of elements.
* @return {Number} Sum of all elements in either a ID or 2D array.
*/
Array.prototype.sum = function(){
  let sum = 0;
  if (Array.isArray(this[0])) {
    for (var i = 0; i < this.length; i++) {
      sum += this[i].sum();
    }
  } else {
    for (var i = 0; i < this.length; i++) {
      sum += this[i];
    }
  }

  return sum;
}

/**
* Applies power element-wise.
* @param {Number} x Power value.
* @return {Array} An array of the same dimensionality of the original, with all
* elements to the power of 'x'.
*/
Array.prototype.pow = function(x){
  let res = [];
  if (Array.isArray(this[0])) {
    for (var i = 0; i < this.length; i++) {
      res[i] = this[i].pow(x);
      // res.push(this[i].pow(x));
    }
  } else {
    for (var i = 0; i < this.length; i++) {
      res[i] = Math.pow(this[i], x);
      // res.push(Math.pow(this[i], x));
    }
  }
  return res;
}

/**
* Computes the Euclidean distance of the calling array vs. the given array.
* If the calling array is 2D (matrix), then it computes the distances of each
* row against the given array parameter.
* @param {1D array} arr Array of numbers.
* @return {Number or array} Euclidean distance for 1D array, or array of distances
*   for 2D arrays.
*/
Array.prototype.dist = function(arr){
  if (this.length > 0) {
    // 1D arrays of numbers.
    if ((typeof(this[0]) === 'number') && (arr.length === this.length)) {
      let sum = 0;
      for (var i = 0; i < arr.length; i++) {
        sum += Math.pow(this[i] - arr[i], 2);
      }
      return Math.sqrt(sum);

    // 2D array of numbers.
    } else if (Array.isArray(this[0])) {
      let distances = [];
      for (var i = 0; i < this.length; i++) {
        distances[i] = this[i].dist(arr);
      }
      return distances;
    }
  }

  throw 'Empty array or unequal dimensions';
}

/**
* Computes the distance matrix for a 2D array.
* @return {2D array} An adjecency matrix of n-1 rows.
*/
Array.prototype.distMatrix = function(){
  let res = [];
  for (var i = 0; i < this.length-1; i++) {
    res[i] = [];
    for (var j = i+1; j < this.length; j++) {
      res[i][j] = this[i].dist(this[j]);
    }
  }
  return res;
}

/**
* Computes the Error Sum of Squares of a matrix (2D array), as given by Ward.
* @return {Number} The error sum of squares of the calling 2D array.
*/
Array.prototype.ess = function() {
  let meanArr = this.mean();
  return this.sub(meanArr).pow(2).sum() / this.length;
}
