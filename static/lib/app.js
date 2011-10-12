/*
 * Copyright header comes here
 */
"use strict";

(function() {
  var canvasInit, constants, controlsInit, keyDown, lookAtToQuaternion, math_sqrt2, modifySubAttr, mouseCoordsWithinElement, mouseDown, mouseMove, mouseUp, mouseWheel, recordToVec3, recordToVec4, registerControlEvents, registerDOMEvents, sceneIdle, sceneInit, state, vec3ToRecord, vec4ToRecord, windowResize;
  modifySubAttr = function(node, attr, subAttr, value) {
    var attrRecord;
    attrRecord = node.get(attr);
    attrRecord[subAttr] = value;
    return node.set(attr, attrRecord);
  };
  recordToVec3 = function(record) {
    return [record.x, record.y, record.z];
  };
  recordToVec4 = function(record) {
    return [record.x, record.y, record.z, record.w];
  };
  vec3ToRecord = function(vec) {
    return {
      x: vec[0],
      y: vec[1],
      z: vec[2]
    };
  };
  vec4ToRecord = function(vec) {
    return {
      x: vec[0],
      y: vec[1],
      z: vec[2],
      w: vec[3]
    };
  };
  lookAtToQuaternion = function(lookAt) {
    var eye, look, up, x, y, z;
    eye = recordToVec3(lookAt.eye);
    look = recordToVec3(lookAt.look);
    up = recordToVec3(lookAt.up);
    x = [0.0, 0.0, 0.0];
    y = [0.0, 0.0, 0.0];
    z = [0.0, 0.0, 0.0];
    SceneJS_math_subVec3(look, eye, z);
    SceneJS_math_cross3Vec3(up, z, x);
    SceneJS_math_cross3Vec3(z, x, y);
    SceneJS_math_normalizeVec3(x);
    SceneJS_math_normalizeVec3(y);
    SceneJS_math_normalizeVec3(z);
    return SceneJS_math_newQuaternionFromMat3(x.concat(y, z));
  };
  math_sqrt2 = Math.sqrt(2.0);
  constants = {
    canvas: {
      defaultSize: [512, 512]
    }
  };
  Math.clamp = function(s, min, max) {
    return Math.min(Math.max(s, min), max);
  };
  state = {
    scene: SceneJS.scene('Scene'),
    canvas: document.getElementById('scenejsCanvas'),
    viewport: {
      domElement: document.getElementById('viewport'),
      mouse: {
        last: [0, 0],
        leftDragging: false,
        middleDragging: false
      }
    },
    application: {
      initialized: false
    }
  };
  mouseCoordsWithinElement = function(event) {
    var coords, element, totalOffsetLeft, totalOffsetTop;
    coords = [0, 0];
    if (!event) {
      event = window.event;
      coords = [event.x, event.y];
    } else {
      element = event.target;
      totalOffsetLeft = 0;
      totalOffsetTop = 0;
      while (element.offsetParent) {
        totalOffsetLeft += element.offsetLeft;
        totalOffsetTop += element.offsetTop;
        element = element.offsetParent;
      }
      coords = [event.pageX - totalOffsetLeft, event.pageY - totalOffsetTop];
    }
    return coords;
  };
  windowResize = function() {};
  mouseDown = function(event) {
    switch (event.which) {
      case 1:
        return state.viewport.mouse.leftDragging = true;
    }
  };
  mouseUp = function(event) {
    return state.viewport.mouse.leftDragging = false;
  };
  mouseMove = function(event) {
    return state.viewport.mouse.last = [event.clientX, event.clientY];
  };
  mouseWheel = function(event) {};
  keyDown = function(event) {};
  registerDOMEvents = function() {
    state.viewport.domElement.addEventListener('mousedown', mouseDown, true);
    state.viewport.domElement.addEventListener('mouseup', mouseUp, true);
    state.viewport.domElement.addEventListener('mousemove', mouseMove, true);
    state.viewport.domElement.addEventListener('mousewheel', mouseWheel, true);
    state.viewport.domElement.addEventListener('DOMMouseScroll', mouseWheel, true);
    document.addEventListener('keydown', keyDown, true);
    return window.addEventListener('resize', windowResize, true);
  };
  registerControlEvents = function() {};
  sceneIdle = function() {};
  canvasInit = function() {
    return windowResize();
  };
  sceneInit = function() {};
  controlsInit = function() {};
  canvasInit();
  sceneInit();
  state.scene.start({
    idleFunc: sceneIdle
  });
  $(function() {
    controlsInit();
    registerDOMEvents();
    registerControlEvents();
    return state.application.initialized = true;
  });
}).call(this);
