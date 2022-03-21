const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const paraOne = document.querySelector(".firstpara");
const paraSecond = document.querySelector(".secondpara");

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = search.value;

  paraOne.textContent = "Loading...";
  paraSecond.textContent = "";
  const res = await fetch(`http://localhost:3000/weather?address=${location}`);
  const data = await res.json();
  if (data.error) {
    paraOne.textContent = data.error;
  } else {
    paraOne.textContent = data.location;
    paraSecond.textContent = data.forecast;
  }
});
