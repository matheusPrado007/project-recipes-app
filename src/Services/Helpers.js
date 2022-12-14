const ingredientsAndMeasuresFunc = (ingredientsArray, measuresArray) => {
  const ingredientsAndMeasures = [];
  ingredientsArray
    .forEach((value, index) => measuresArray
      .forEach((value2, index2) => {
        if (index === index2
          && value2 !== '' && value2 !== null && value !== ''
        ) {
          const obj = ({
            [value]: value2,
          });
          ingredientsAndMeasures.push(obj);
        }
      }));
  return ingredientsAndMeasures;
};

export default ingredientsAndMeasuresFunc;
