import { useEffect, useState } from "react";
import { setMode } from "./states/state";
import "./App.css";
import Box from "./components/Box";
import { useDispatch, useSelector } from "react-redux";

const URL = "https://api.frontendexpert.io/api/fe/wordle-words";

function App() {
  const [correct, setCorrect] = useState("");
  const [guess, setGuess] = useState(Array(6).fill(""));
  const [chance, setChance] = useState(6);
  const [letterNumber, setLetterNumber] = useState(5);
  const [checkEnter, setEnter] = useState(false);
  const mode = useSelector((state) => state.mode);
  const dispatch = useDispatch()
  const getWordle = async () => {
    const response = await fetch(URL);
    return response.json();
  };

  const changeMode = () => {
    dispatch(setMode());
  };

  // Function to handle key press
  const handleLetter = (event) => {
    let key = event.key;
    key = key.toUpperCase();
    console.log(key);
    if (key == "ENTER") {
      if (checkEnter) {
        console.log("checked", guess[6 - chance]);
        console.log("Correct", correct);
        if (guess[6 - chance] == correct) {
          alert("Correct")
        }
        else {

          alert("Wrong")
        }
        setChance(chance - 1);
        setEnter(false)
      }
    }
    else if ((key >= 'a' && key <= 'z' || key >= 'A' && key <= 'Z') && !checkEnter && key.length == 1) {
      if (chance >= 1) {
        setGuess((prevGuess) => {
          const newGuess = [...prevGuess];
          const row = 6 - chance;
          console.log("letternum", letterNumber);
          if (newGuess[row].length < 5) {
            newGuess[row] += key;
          }
          return newGuess;
        });



        if (letterNumber === 1) {
          setEnter(true);
          setLetterNumber(5);
        } else {
          setLetterNumber(letterNumber - 1);
        }

      }
    }
  };

  useEffect(() => {
    const fetchWord = async () => {
      try {
        let resWords = ["HINGE", "METAL"];
        let guessWord = resWords[Math.floor(Math.random() * resWords.length)]
        setCorrect(guessWord);
        console.log(guessWord);
      } catch (error) {
        console.error("Error fetching wordle words:", error);
      }
    };

    fetchWord();
  }, []);

  return (
    <>
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          display: "flex",
          width: "100vw", // Ensure full width
          height: "98vh", // Ensure full height
          flexDirection: "column",
          alignItems: "center",
          background: `${mode === "light" ? "#FAF9F6" : "#121213"}`,
          gap: "30px",
        }}

        onKeyDown={handleLetter}
        tabIndex={0}
      >
        <h1 onClick={changeMode} className="poppins-extrabold" style={{ fontSize: "60px", color: "#fede6c", cursor: "pointer" }}>
          WORDLE
        </h1>
        <h2
          className="poppins-extrabold"
          style={{
            color: `${mode === "light" ? "black" : "white"}`,
          }} >Guess This Word!😉</h2>
        <Box
          correctWord={correct}
          guess={guess}
          setGuess={setGuess}
          checkEnter={checkEnter}
        />
      </div >
    </>
  );
}

export default App;
