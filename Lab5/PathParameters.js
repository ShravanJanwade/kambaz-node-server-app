export default function PathParameters(app) {
  const add = (req, res) => {
    const { a, b } = req.params;
    const result = parseInt(a) + parseInt(b);
    res.send(result.toString());
  };

  const subtract = (req, res) => {
    const { a, b } = req.params;
    const result = parseInt(a) - parseInt(b);
    res.send(result.toString());
  };

  const multiply = (req, res) => {
    const { a, b } = req.params;
    const result = parseInt(a) * parseInt(b);
    res.send(result.toString());
  };

  const divide = (req, res) => {
    const { a, b } = req.params;
    const numA = parseInt(a);
    const numB = parseInt(b);

    if (numB === 0) {
      res.status(400).send("Cannot divide by zero");
      return;
    }

    const result = numA / numB;
    res.send(result.toString());
  };

  app.get("/lab5/add/:a/:b", add);
  app.get("/lab5/subtract/:a/:b", subtract);
  app.get("/lab5/multiply/:a/:b", multiply);
  app.get("/lab5/divide/:a/:b", divide);
}
