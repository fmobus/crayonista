'use strict';

// Add support for Promise objects via polyfills
import 'babel-polyfill';

// Add support for all files in the test directory
const testsContext = require.context('.', true, /(\.test\.js$)/);
testsContext.keys().forEach(testsContext);
