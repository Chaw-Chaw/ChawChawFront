const arrayRemovedItem = (item: any, array: any[]) => {
  const result = array;
  const removeItemIndex = array.findIndex((atom) => atom === item);
  console.log(removeItemIndex, "removeItemIndex");
  if (removeItemIndex !== -1) {
    result.splice(removeItemIndex, 1);
  }
  return result;
};

export { arrayRemovedItem };
