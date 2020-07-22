const CashChange = (props) => {
  const value = ((props.cash / props.ratio) * props.price).toFixed(2);
  return (
    <div>
      {props.title} {props.value <= 0 ? "0" : value}
    </div>
  );
};
class Caltulator extends React.Component {
  state = {
    cash: "",
    ratioDollar: 3.93,
    ratioEuro: 4.48,
    ratioPound: 4.93,
    product: "electricity",
  };
  static defaultProps = {
    currencies: [
      {
        id: 0,
        name: "zloty",
        title: "Wartość w Złotówkach: ",
      },
      {
        id: 1,
        name: "dollar",
        title: "Wartość w Dolarach: ",
      },
      {
        id: 2,
        name: "euro",
        title: "Wartość w Euro: ",
      },
      {
        id: 3,
        name: "pound",
        title: "Wartość w Funtach: ",
      },
    ],
    prices: {
      electricity: 0.51,
      gas: 4.91,
      oranges: 3.89,
      water: 1.59,
    },
  };
  handleRatioChange = (e) => {
    const currencyRatio = e.target.value * 1;
    this.setState({
      [e.target.name]: currencyRatio.toFixed(4),
    });
  };
  handleCashChange = (e) => {
    this.setState({
      cash: e.target.value,
    });
  };
  handleSelect = (e) => {
    this.setState({
      product: e.target.value,
      cash: "",
    });
  };
  selectPrice = (select) => {
    return this.props.prices[select];
  };
  selectRatio = (currency) => {
    if (currency === 0) return 1;
    else if (currency === 1) return this.state.ratioDollar;
    else if (currency === 2) return this.state.ratioEuro;
    else if (currency === 3) return this.state.ratioPound;
  };
  insertSuffix = (select) => {
    if (select === "electricity") return <em>kWh</em>;
    else if (select === "gas") return <em>litrów</em>;
    else if (select === "oranges") return <em>kilogramów</em>;
    else if (select === "water") return <em>litrów</em>;
    else return null;
  };
  render() {
    const { cash, product } = this.state;
    const price = this.selectPrice(product);
    const calculator = this.props.currencies.map((currency) => (
      <CashChange
        key={currency.id}
        title={currency.title}
        cash={cash}
        price={price}
        ratio={this.selectRatio(currency.id)}
      />
    ));

    return (
      <div className="app">
        <label>
          Podaj aktualny kurs Dolara:
          <input
            type="number"
            name={"ratioDollar"}
            onChange={this.handleRatioChange}
          />
        </label>
        <br />
        <label>
          Podaj aktualny kurs Euro:
          <input
            type="number"
            name={"ratioEuro"}
            onChange={this.handleRatioChange}
          />
        </label>
        <br />
        <label>
          Podaj aktualny kurs Funta:
          <input
            type="number"
            name={"ratioPound"}
            onChange={this.handleRatioChange}
          />
        </label>
        <br />
        <label>
          Wybierz produkt:{" "}
          <select value={this.state.product} onChange={this.handleSelect}>
            <option value="electricity">Prąd</option>
            <option value="gas">Benzyna</option>
            <option value="oranges">Pomarańcze</option>
            <option value="water">Woda</option>
          </select>
        </label>
        <br />
        <label>
          <input type="number" value={cash} onChange={this.handleCashChange} />
        </label>
        {this.insertSuffix(this.state.product)}
        {calculator}
      </div>
    );
  }
}

ReactDOM.render(<Caltulator />, document.getElementById("root"));
