delete require.cache[require.resolve('tape')];
delete require.cache[require.resolve('tape-css')];
require('tap-dev-tool/register')
const test = require('tape-css')(require('tape'));
const h = require('hyperscript');

export default function (editor) {
	const positionOf = (element) => {
	const {top, right, bottom, left} = element.getBoundingClientRect();
		return {top, right, bottom, left};
	};

	const styles = editor.getValue();
	const contents = h('div', { style: 'width: 193px; height: 122px' });
	const child = h('.child', [contents]);
	const parent = h('.parent', [child]);
	const container = h('.container', { style: 'width: 513px; height: 324px' }, [parent]);

	test((
	  '`.parent` takes up the whole width and height of its container'
	), { dom: container, styles }, (is) => {
	  is.deepEqual(
		positionOf(parent),
		positionOf(container)
	  );
	  is.end();
	});

	test((
	  '`.child` grows and shrink to fit its contents'
	), { dom: container, styles }, (is) => {
	  is.deepEqual(
		positionOf(child),
		positionOf(contents)
	  );
	  is.end();
	});

	test((
	  '`.child` is centered horizontally within its `.parent`'
	), { dom: container, styles }, (is) => {
	  is.equal(
		positionOf(parent).right - positionOf(child).right,
		positionOf(child).left - positionOf(parent).left
	  );
	  is.end();
	});

	test((
	  '`.child` is centered vertically within its `.parent`'
	), { dom: container, styles }, (is) => {
	  is.equal(
		positionOf(parent).bottom - positionOf(child).bottom,
		positionOf(child).top - positionOf(parent).top
	  );
	  is.end();
	});
	// purgeCache('./tape');
};




/**
 * Removes a module from the cache
 */
function purgeCache(moduleName) {
    // Traverse the cache looking for the files
    // loaded by the specified module name
    searchCache(moduleName, function (mod) {
        delete require.cache[mod.id];
    });

    // Remove cached paths to the module.
    // Thanks to @bentael for pointing this out.
    Object.keys(module.constructor._pathCache).forEach(function(cacheKey) {
        if (cacheKey.indexOf(moduleName)>0) {
            delete module.constructor._pathCache[cacheKey];
        }
    });
};

/**
 * Traverses the cache to search for all the cached
 * files of the specified module name
 */
function searchCache(moduleName, callback) {
    // Resolve the module identified by the specified name
    var mod = require.resolve(moduleName);

    // Check if the module has been resolved and found within
    // the cache
    if (mod && ((mod = require.cache[mod]) !== undefined)) {
        // Recursively go over the results
        (function traverse(mod) {
            // Go over each of the module's children and
            // traverse them
            mod.children.forEach(function (child) {
                traverse(child);
            });

            // Call the specified callback providing the
            // found cached module
            callback(mod);
        }(mod));
    }
};
