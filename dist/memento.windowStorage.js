/*
 memento.windowStorage.js
 copyright (c) 2015 Naver corp.
 Author: iamdenny hi.iamdenny@navercorp.com
 License: MIT
*/

!function(n,t,i){"use strict";t.factory("windowStorage",function(){return function(n,t){var e=[],o=0,r=i.copy(n);this.root=function(){return o=0,new Promise(function(n){n(i.copy(r))})},this.prev=function(){return this.atTail().then(function(n){return n?void 0:(o--,i.copy(o-1>=0?e[o-1]:r))})},this.next=function(){return this.atHead().then(function(n){return n?void 0:(o++,i.copy(e[o-1]))})},this.put=function(n){return new Promise(function(r){return angular.equals(e[o-1],n)?!1:(o<e.length&&(e=e.slice(0,o)),angular.isNumber(t)&&e.length>=t?e.shift():o++,void r(!!e.push(i.copy(n))))})},this.atTail=function(){return new Promise(function(n){n(!(e.length&&o>0))})},this.atHead=function(){return new Promise(function(n){n(!(e.length&&o<e.length))})}}})}(window,angular.module("Memento"),angular);