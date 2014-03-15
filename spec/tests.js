/* Tests for memento.js. */

describe('memento core test suite', function () {
	var memento;
	var seedObject = {
		key: 'value',
		num: 1
	};

	beforeEach(function() {
		module('Memento');

		inject(function(_Memento_) {
			memento = new _Memento_(seedObject);
		});
	});

	it('should initialize', function () {
		expect(memento).toBeTruthy();
		// TODO: Expect memento to return base object.
	});

	// Check functions.
	it('should match expected interface', function () { 
		expect(angular.isFunction(memento.canUndo)).toBe(true);
		expect(angular.isFunction(memento.canRedo)).toBe(true);
		expect(angular.isFunction(memento.undo)).toBe(true);
		expect(angular.isFunction(memento.redo)).toBe(true);
		expect(angular.isFunction(memento.push)).toBe(true);
	});

	it('should push() a changed object', function () {
		expect(memento.push({ key: 'value', num: 2 })).toBe(true);
	});

	it('should not push() an unchanged object', function () {
		expect(memento.push({ key: 'value', num: 2 })).toBe(true);
		expect(memento.push({ key: 'value', num: 2 })).toBe(false);

		// TODO: Deep copy tests.
	});

	it('should return original object on undo()', function () {
		memento.push({ key: 'value', num: 2 });
		expect(memento.undo()).toEqual(seedObject);

		memento.push({ key: 'value', num: 2 });
		memento.push({ key: 'value', num: 3 });
		expect(memento.undo()).toEqual({ key: 'value', num: 2 });
	});

	it('should return modified object on redo()', function () {
		memento.push({ key: 'value', num: 2 });
		memento.undo();
		expect(memento.redo()).toEqual({ key: 'value', num: 2 });
	});

	it('should not undo() if at beginning of stack', function () {
		expect(memento.undo()).toBeUndefined();
		memento.push({ key: 'value', num: 2 });
		memento.undo();
		expect(memento.undo()).toBeUndefined();
	});

	it('should not redo() if at end of stack', function () {
		expect(memento.redo()).toBeUndefined();
		memento.push({ key: 'value', num: 2 });
		memento.undo();
		memento.redo();
		expect(memento.redo()).toBeUndefined();
	});
	
	it('should return seed object on revert()', function () {
		memento.push({ key: 'value', num: 2 });
		memento.push({ key: 'value', num: 3 });
		memento.push({ key: 'value', num: 4 });
		memento.push({ key: 'value', num: 5 });
		expect(memento.revert()).toEqual(seedObject);
	});
 
 	// it('should clear the stack on clear()', function () {
 	// 	this.fail(Error('Test not implemented'));
	// });
});