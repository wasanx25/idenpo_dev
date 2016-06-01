//*********************
// polyfills
//*********************

import 'es6-shim';
import 'es6-promise';
// (these modules are what is in 'angular2/bundles/angular2-polyfills' so don't use that here)
import 'es7-reflect-metadata/dist/browser';
import 'zone.js/lib/browser/zone-microtask';

// in Production you may want to remove this
import 'zone.js/lib/browser/long-stack-trace-zone';
