!function(t,n,e,r){"use strict";n.factory("localStorage",function(){function t(){return Math.random().toString(36).substr(2,9)}return r.config({driver:r.LOCALSTORAGE,name:"memento"}),r.clear(function(){console.log("localStorage is now empty.")}),function(n,o){var u=0,i=t();r.setItem(i+"_orig",n),r.setItem(i+"_stack",[]),this.root=function(){return u=0,r.getItem(i+"_orig").then(function(t){return t})},this.prev=function(){var t=this;return this.atTail().then(function(n){return n?t.getRoot():(u--,u-1>=0?t.getStack().then(function(t){return t[u-1]}):t.getRoot())})},this.next=function(){var t=this;return this.atHead().then(function(n){return n?n:(u++,t.getStack().then(function(t){return t[u-1]}))})},this.put=function(t){return this.getStack().then(function(n){if(angular.equals(n[u-1],t))return!1;u<n.length&&(n=n.slice(0,u)),angular.isNumber(o)&&n.length>=o?n.shift():u++;var c=!!n.push(e.copy(t));return console.log("stack",n),r.setItem(i+"_stack",n).then(function(){return c})})},this.atTail=function(){return this.getStack().then(function(t){return!(t.length&&u>0)})},this.atHead=function(){return this.getStack().then(function(t){return!(t.length&&u<t.length)})},this.getStack=function(){return r.getItem(i+"_stack").then(function(t){return t})},this.getRoot=function(){return r.getItem(i+"_orig").then(function(t){return t})}}})}(window,angular.module("Memento"),angular,localforage);