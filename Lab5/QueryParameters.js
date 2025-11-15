export default function QueryParameters(app) {
  const calculator = (req, res) => {
    const { a, b, operation } = req.query;

    if (a === undefined || b === undefined || !operation) {
      return res.status(400).send("Missing parameters");
    }

    const numA = parseFloat(a);
    const numB = parseFloat(b);

    if (Number.isNaN(numA) || Number.isNaN(numB)) {
      return res.status(400).send("Parameters must be numbers");
    }

    let result;
    switch (operation) {
      case "add":
        result = numA + numB;
        break;
      case "subtract":
        result = numA - numB;
        break;
      case "multiply":
        result = numA * numB;
        break;
      case "divide":
        if (numB === 0) {
          return res.status(400).send("Cannot divide by zero");
        }
        result = numA / numB;
        break;
      default:
        return res.status(400).send("Invalid operation");
    }
    res.send(result.toString());
  };

  app.get("/lab5/calculator", calculator);
}
