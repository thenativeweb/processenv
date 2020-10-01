const normalize = function (value: any): any {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export { normalize };
