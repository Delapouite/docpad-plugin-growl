// Generated by CoffeeScript 1.6.3
var APP_DIR, BIN_DIR, CAKE, COFFEE, DOCPAD, DOCPAD_DIR, EXT, MODULES_DIR, NODE, NPM, OUT_DIR, SRC_DIR, TEST_DIR, WINDOWS, clean, compile, exec, finish, install, pathUtil, reset, safe, setup, spawn, test, test_install, test_run, test_setup, watch, _ref;

WINDOWS = process.platform.indexOf('win') === 0;

NODE = process.execPath;

NPM = WINDOWS ? process.execPath.replace('node.exe', 'npm.cmd') : 'npm';

EXT = (WINDOWS ? '.cmd' : '');

APP_DIR = process.cwd();

SRC_DIR = "" + APP_DIR + "/src";

OUT_DIR = "" + APP_DIR + "/out";

TEST_DIR = "" + APP_DIR + "/test";

MODULES_DIR = "" + APP_DIR + "/node_modules";

BIN_DIR = "" + MODULES_DIR + "/.bin";

DOCPAD_DIR = "" + MODULES_DIR + "/docpad";

CAKE = "" + BIN_DIR + "/cake" + EXT;

COFFEE = "" + BIN_DIR + "/coffee" + EXT;

DOCPAD = "" + APP_DIR + "/docpad" + EXT;

pathUtil = require('path');

_ref = require('child_process'), exec = _ref.exec, spawn = _ref.spawn;

safe = function(next, fn) {
  return function(err) {
    if (err) {
      return next(err);
    }
    return fn();
  };
};

clean = function(opts, next) {
  var args;
  if (next == null) {
    next = opts;
    opts = {};
  }
  args = ['-Rf', OUT_DIR, pathUtil.join(APP_DIR, 'node_modules'), pathUtil.join(APP_DIR, '*out'), pathUtil.join(APP_DIR, '*log'), pathUtil.join(TEST_DIR, 'node_modules'), pathUtil.join(TEST_DIR, '*out'), pathUtil.join(TEST_DIR, '*log')];
  return spawn('rm', args, {
    stdio: 'inherit',
    cwd: APP_DIR
  }).on('exit', safe(next, function() {
    return next();
  }));
};

compile = function(opts, next) {
  if (next == null) {
    next = opts;
    opts = {};
  }
  return spawn(COFFEE, ['-bco', OUT_DIR, SRC_DIR], {
    stdio: 'inherit',
    cwd: APP_DIR
  }).on('exit', safe(next, function() {
    return next();
  }));
};

watch = function(opts, next) {
  if (next == null) {
    next = opts;
    opts = {};
  }
  return spawn(COFFEE, ['-bwco', OUT_DIR, SRC_DIR], {
    stdio: 'inherit',
    cwd: APP_DIR
  }).on('exit', safe(next, function() {
    return next();
  }));
};

install = function(opts, next) {
  if (next == null) {
    next = opts;
    opts = {};
  }
  return spawn(NPM, ['install'], {
    stdio: 'inherit',
    cwd: APP_DIR
  }).on('exit', safe(next, function() {
    return spawn(NPM, ['install'], {
      stdio: 'inherit',
      cwd: TEST_DIR
    }).on('exit', safe(next, function() {
      return next();
    }));
  }));
};

reset = function(opts, next) {
  if (next == null) {
    next = opts;
    opts = {};
  }
  return clean(opts, safe(next, function() {
    return install(opts, safe(next, function() {
      return compile(opts, safe(next, function() {
        return next();
      }));
    }));
  }));
};

setup = function(opts, next) {
  if (next == null) {
    next = opts;
    opts = {};
  }
  return install(opts, safe(next, function() {
    return compile(opts, safe(next, function() {
      return next();
    }));
  }));
};

test = function(opts, next) {
  if (next == null) {
    next = opts;
    opts = {};
  }
  return compile(opts, safe(next, function() {
    return test_run(opts, safe(next, function() {
      return next();
    }));
  }));
};

test_run = function(opts, next) {
  if (next == null) {
    next = opts;
    opts = {};
  }
  return spawn(NPM, ['test'], {
    stdio: 'inherit',
    cwd: APP_DIR
  }).on('exit', safe(next, function() {
    return next();
  }));
};

test_install = function(opts, next) {
  if (next == null) {
    next = opts;
    opts = {};
  }
  return spawn(NPM, ['install'], {
    stdio: 'inherit',
    cwd: DOCPAD_DIR
  }).on('exit', safe(next, function() {
    return next();
  }));
};

test_setup = function(opts, next) {
  if (next == null) {
    next = opts;
    opts = {};
  }
  return install(opts, safe(next, function() {
    return test_install(opts, safe(next, function() {
      return compile(opts, safe(next, function() {
        return next();
      }));
    }));
  }));
};

finish = function(err) {
  if (err) {
    throw err;
  }
  return console.log('OK');
};

task('clean', 'clean up instance', function() {
  return clean(finish);
});

task('compile', 'compile our files', function() {
  return compile(finish);
});

task('dev', 'watch and recompile our files', function() {
  return watch(finish);
});

task('watch', 'watch and recompile our files', function() {
  return watch(finish);
});

task('install', 'install dependencies', function() {
  return install(finish);
});

task('reset', 'reset instance', function() {
  return reset(finish);
});

task('setup', 'setup for development', function() {
  return setup(finish);
});

task('test', 'run our tests', function() {
  return test(finish);
});

task('test-debug', 'run our tests in debug mode', function() {
  return test({
    debug: true
  }, finish);
});

task('test-setup', 'setup for testing', function() {
  return test_setup(finish);
});