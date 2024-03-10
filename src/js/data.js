const apiURL = "https://mindhub-xj03.onrender.com/api/amazing";

const getData = async () => {
  const response = await fetch(apiURL);
  const data = await response.json();
  return data;
};

export { getData };
