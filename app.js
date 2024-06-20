let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

let div = document.querySelector("div");
let btn = document.querySelector("button");

let fun = async () => {
  div.innerText = "";

  let input = document.querySelector("input");
  let word = input.value;

  let means = await meaning(word);

  if (div.innerText === "No meaning found!") {
    return;
  }

  let h1 = document.createElement("h1");
  h1.classList.add("word");
  h1.innerText = word;
  div.appendChild(h1);

  for (i of means) {
    for (j of i.meanings) {
      let row = document.createElement("div");
      row.classList.add("row");

      let col1 = document.createElement("div");
      let col2 = document.createElement("div");

      col1.classList.add("cols");
      col2.classList.add("cols");

      col1.classList.add("col1");

      row.appendChild(col1);
      row.appendChild(col2);

      div.appendChild(row);

      col1.innerText = `${j.partOfSpeech}`;

      let h3 = document.createElement("h3");
      h3.innerText = `Definitions:`;
      col2.appendChild(h3);

      let ul = document.createElement("ul");
      col2.appendChild(ul);

      for (k of j.definitions) {
        let li = document.createElement("li");
        li.innerText = k.definition;
        ul.appendChild(li);
      }
    }
    input.value = "";
  }
};

btn.addEventListener("click", fun);

async function meaning(word) {
  try {
    let res = await axios.get(url + word);
    return res.data;
  } catch (err) {
    div.innerText = "No meaning found!";
    div.style.fontSize = "40px";
    div.style.marginTop = "20px";
  }
}
