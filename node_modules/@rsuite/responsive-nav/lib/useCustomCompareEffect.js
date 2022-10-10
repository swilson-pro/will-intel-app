"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var useCustomCompareEffect = function useCustomCompareEffect(effect, deps, depsEqual) {
  var ref = (0, _react.useRef)(undefined);

  if (!ref.current || !depsEqual(deps, ref.current)) {
    ref.current = deps;
  } // eslint-disable-next-line react-hooks/exhaustive-deps


  (0, _react.useEffect)(effect, ref.current);
};

var _default = useCustomCompareEffect;
exports.default = _default;