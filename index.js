document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const text = document.getElementById("text").value;
  const type = document.getElementById("tipo").value;
  let result = "";
  if (validateMessage(text)) {
    alert("Solo son permitidas letras minúsculas y sin acentos");
    document.getElementById("result").innerHTML = "";
    document.getElementById("copy-button").disabled = true;
  } else {
    if (type === "encrypt") {
      result = encrypt(text);
    } else {
      result = decrypt(text);
    }
    document.getElementById("result").innerHTML = result;
    document.getElementById("copy-button").disabled = false;
  }
});

document.getElementById("copy-button").addEventListener("click", () => {
  const textArea = document.createElement("textarea");
  textArea.value = document.getElementById("result").innerHTML;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
  alert("Texto copiado al portapapeles");
});

document.getElementById("tipo").addEventListener("change", (selector) => {
  console.log(selector.target.value);
  if (selector.target.value === "decrypt") {
    document.getElementById("cambioTexto").innerText = "Texto a Desencriptar";
  }
  if (selector.target.value === "encrypt") {
    document.getElementById("cambioTexto").innerText = "Texto a Encriptar";
  }
});

const encryptionDict = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat"
};

function validateMessage(text) {
  return text.match(/[A-ZáéíóúÁÉÍÓÚ]/);
}

const isEncrypted = (text) => {
  for (let key in encryptionDict) {
    if (text.indexOf(encryptionDict[key]) !== -1) {
      return true;
    }
  }
  return false;
};

const encrypt = (text) => {
  if (isEncrypted(text)) {
    let confirmEncryption = confirm(
      "El texto ya se encuentra encriptado, ¿desea continuar con la encriptación?"
    );
    if (!confirmEncryption) {
      return text;
    }
  }
  let newText = "";
  for (let char of text) {
    let encryption = encryptionDict[char];
    if (encryption) {
      newText += encryption;
    } else {
      newText += char;
    }
  }
  return newText;
};

const decrypt = (text) => {
  if (!isEncrypted(text)) {
    let confirmDecryption = confirm(
      "El texto no se encuentra encriptado, ¿desea continuar con la desencriptación?"
    );
    if (!confirmDecryption) {
      return "";
    }
  }
  let newText = "";
  let i = 0;
  while (i < text.length) {
    let char = text[i];
    let decryption = Object.keys(encryptionDict).find(
      (key) =>
        encryptionDict[key] === text.substr(i, encryptionDict[key].length)
    );
    if (decryption) {
      newText += decryption;
      i += encryptionDict[decryption].length - 1;
    } else {
      newText += char;
    }
    i++;
  }
  return newText;
};
