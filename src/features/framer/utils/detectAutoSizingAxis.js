export function detectAutoSizingAxis(props) {
  let ref, ref1;
  return {
    width: ((ref = props.style) === null || ref === void 0 ? void 0 : ref.width) !== '100%',
    height: ((ref1 = props.style) === null || ref1 === void 0 ? void 0 : ref1.height) !== '100%'
  };
}
