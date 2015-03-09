/*
 memento.core.js
 copyright (c) 2015 Naver corp.
 Author: iamdenny hi.iamdenny@navercorp.com
 License: MIT
*/

!function(n,t){"use strict";t.provider("Memento",function(){var n={window:"windowStorage",localStorage:"localStorage",webSql:"webSql",indexedDb:"indexedDb"},t="window",e=function(n){return function(t,e){e=parseInt(e,10)||!1;var r=new n(t,e);this.canUndo=function(){return r.atTail().then(function(n){return!n})},this.undo=function(){return r.prev().then(function(n){return n})},this.canRedo=function(){return r.atHead().then(function(n){return!n})},this.redo=function(){return r.next().then(function(n){return n})},this.push=function(n){return r.put(n).then(function(n){return n})},this.revert=function(){return r.root().then(function(n){return n})}}};return e.$inject=[n[t]],{setStorageMethod:function(r){t=r,e.$inject=[n[t]]},$get:e}})}(window,angular.module("Memento",[]),angular);