import { useState } from "react";
import "./App.css";
import CryptoJS from "crypto-js";

const SECRET_PASS = "Digbijaya@123";

function App() {
  const [text, setText] = useState("");
  const [screen, setScreen] = useState("encrypt");
  const [errorMessage, setErrorMessage] = useState("");

  // Store Encrypted data
  const [encryptedData, setEncryptedData] = useState("");

  // Store Decrypted data
  const [decryptedData, setDecryptedData] = useState("");

  // Switch between encrypt and decrypt screens
  const switchScreen = (type) => {
    setScreen(type);
    setText("");
    setErrorMessage("");
    setEncryptedData("");
    setDecryptedData("");
  };

  // Encrypt text
  const encryptData = () => {
    try {
      const data = CryptoJS.AES.encrypt(
        JSON.stringify(text),
        SECRET_PASS
      ).toString();
      setEncryptedData(data);
      setErrorMessage("");
    } catch (error) {
      console.error("Encryption error:", error);
      setErrorMessage("Something went wrong. Please try later.");
    }
  };

  // Decrypt text
  const decryptData = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(text, SECRET_PASS);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      if (!originalText) throw new Error();
      setDecryptedData(originalText);
      setErrorMessage("");
    } catch (error) {
      console.error("Decryption error:", error);
      setErrorMessage("Invalid encrypted text or password.");
    }
  };

  // Handle Encrypt and Decrypt button click
  const handleClick = () => {
    if (!text) {
      setErrorMessage("Please enter some text");
      return;
    }

    if (screen === "encrypt") {
      // Encrypt text
      encryptData();
    } else {
      // Decrypt text
      decryptData();
    }
  };

  return (
    <div className="container">
      <div>
        {/* Buttons */}
        <button
          className={`btn btn-left ${screen === "encrypt" ? "active" : ""}`}
          onClick={() => switchScreen("encrypt")}
        >
          Encrypt
        </button>
        <button
          className={`btn btn-right ${screen === "decrypt" ? "active" : ""}`}
          onClick={() => switchScreen("decrypt")}
        >
          Decrypt
        </button>
      </div>
      <div className="card">
        {/* Textarea for user input */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            screen === "encrypt"
              ? "Enter your text here"
              : "Enter your encrypted text here"
          }
        />
        {/* Error Message */}
        {errorMessage && <div className="error">{errorMessage}</div>}

        {/* Encrypt or Decrypt Button */}
        <button
          className={`btn submit-btn ${
            screen === "encrypt" ? "encrypt-btn" : "decrypt-btn"
          }`}
          onClick={handleClick}
        >
          {screen === "encrypt" ? "Encrypt" : "Decrypt"}
        </button>
      </div>

      {/* Encrypted or Decrypted data Display */}
      {(encryptedData || decryptedData) && (
        <div className="content-display">
          <label>{screen === "encrypt" ? "ENCRYPTED" : "DECRYPTED"}</label>
          <p>{screen === "encrypt" ? encryptedData : decryptedData}</p>
        </div>
      )}
    </div>
  );
}

export default App;
