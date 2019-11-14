const normalize = function (value: any): any {
  try {
    return JSON.parse(value);
  } catch (ex) {
    return value;
  }
};

export { normalize };
