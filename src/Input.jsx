import React, { useState, useEffect } from "react";
import { Select, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import Record from "./Record";

function Forminput() {
  const options = [
    "USD 50-100",
    "USD 5-20",
    "USD 1",
    "EUR",
    "JPY",
    "GBP",
    "SGD",
    "AUD",
    "CHF",
    "HKD",
    "CAD",
    "NZD",
    "SEK",
    "TWD",
    "NOK",
    "MYR",
    "CNY",
    "KRW",
  ];
  const [selectedOption, setSelectedOption] = useState("");
  const [rate, setRate] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Buying");
  const [data, setData] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("formData");
    };
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInput1Change = (event) => {
    setRate(event.target.value);
  };

  const handleInput2Change = (event) => {
    setAmount(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleAddClick = () => {
    const timestamp = new Date().toLocaleString("en-US", { hour12: false });
    const newData = {
      time: timestamp,
      currency: selectedOption,
      rate,
      amount,
      type,
      total: type === "Buying" ? rate * amount : -(rate * amount),
    };
    setData([...data, newData]);
    setSelectedOption("");
    setRate("");
    setAmount("");
  };

  const handleClearClick = () => {
    setData([]);
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
        const response = await axios.get(
            "https://api.airtable.com/v0/appXvdgNSlqDP9QwS/Table%201",
            {
                headers: {
                    Authorization:
                        "Bearer patJrmzFDvT8Qncac.657ccc7a50caaebd1e4a3a390acca8e67d06047dd779d5726b602d4febe8e383",
                },
            }
        );
        // Filter the data to include only required fields
        const filteredData = response.data.records.map(record => ({
            Flags: record.fields.Flags[0].url,
            Cur: record.fields.Cur,
            Currency: record.fields.Currency,
            Rate: record.fields.Rate
        }));
        console.log(filteredData);
        setData(filteredData);
        
    } catch (error) {
        setError(error);
    } finally {
        setIsLoading(false);
    }
};

  return (
    <div className="p-5">
      <div className="text-3xl text-center">PETEX DATA</div>
      <div className="grid grid-cols-9 gap-4 m-4 p-4 rounded-lg">
        <Select
          value={selectedOption}
          onChange={handleOptionChange}
          className="col-span-2 select"
        >
          <MenuItem value="">Select a Currency</MenuItem>
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <div className="col-span-2">
          <TextField
            id="rate"
            type="text"
            value={rate}
            onChange={handleInput1Change}
            label="Rate"
            variant="outlined"
          />
        </div>
        <div className="col-span-2">
          <TextField
            id="amount"
            type="text"
            value={amount}
            onChange={handleInput2Change}
            label="Amount"
            className="col-span-1 inamount"
            variant="outlined"
          />
        </div>
        <Select
          value={type}
          onChange={handleTypeChange}
          className="col-span-2 type"
        >
          <MenuItem value="Buying">Buying</MenuItem>
          <MenuItem value="Selling">Selling</MenuItem>
        </Select>
        <button
          onClick={handleAddClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
        >
          ADD
        </button>
      </div>
      <Record data={data} />
      <div className="Summary">
        <p className="total">Total : </p>
        <p className="totaldata">
          {data.reduce((acc, item) => acc + item.total, 0)}{" "}
        </p>
      </div>

      <button
        onClick={handleClearClick}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        DELETE
      </button>
    </div>
  );
}

export default Forminput;
