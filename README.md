# linalgejs
Vanilla JS functions for linear algebra (and some other convenience functions).

Functions are:
- Currently added on demand, i.e., when in need in other projects. 
- Very simple implementations and assume proper use (they do not do input checks).
- Expecting, for all cases, a 1D or 2D array of numbers.
- Implemented as prototypes of Array.
- Returning a new value (i.e., no in-place changes).

Current implemented functions:
- `gather(indices)`: returns the values corresponding to the given list of *indices*.
- `mean()`: for 1D arrays it returns the mean value. For 2D arrays it returns an array of mean values (computed column-wise).
- `dot(arr)`: computes the dot product.
- `min()`: returns the minimum value from a 1D or a 2D array.
- `sub(arr)`: for 1D arrays it substracts *arr* in an element-wise manner. For 2D arrays it substracts *arr* from each row in the calling array.
- `sum()`: returns the sum of all elements (in 1D or 2D arrays).
- `pow(x)`: applies power to the *x* to all elements.
- `dist(arr)`: computes the Euclidean distance to *arr*. For 2D arrays, it returns the distances to each row.
- `distMatrix()`: computes the distance matrix (using Euclidean distance). Only for 2D arrays.
- `ess()`: computes the Error Sum of Squares. Only for 2D arrays.
