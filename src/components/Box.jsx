import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Box = ({ correctWord, guess, checkEnter }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                outline: "none"
            }}
        >
            {guess.map((item, index) => (
                <Line key={index} guess={item} correctWord={correctWord} checkEnter={checkEnter} />
            ))}
        </div>
    );
};

const Line = ({ guess, correctWord, checkEnter }) => {
    return (
        <div style={{ display: "flex", gap: "5px" }}>
            {Array(5).fill("").map((_, index) => (
                <Letter key={index} letter={guess[index]} checkEnter={checkEnter} correctLetter={correctWord[index]} correctWord={correctWord} />
            ))}
        </div>
    );
};

const Letter = ({ letter, checkEnter, correctLetter, correctWord }) => {
    const ref = useRef();
    const mode = useSelector((state) => state.mode);
    const [boxStage, setBoxStage] = useState(false);
    const [boxColor, setBoxColor] = useState("");
    let colors = [mode == "light" ? "#787c7e" : "#3a3a3c", "#538d4e", "#b59f3b"];
    useEffect(() => {
        if (letter) {
            if (checkEnter) {
                if (letter == correctLetter) {
                    setBoxColor(colors[1]);
                } else {
                    if (correctWord.includes(letter)) {
                        setBoxColor(colors[2]);
                    }
                    else {
                        setBoxColor(colors[0]);
                    }
                }
            }
            ref.current.style.transform = "scale(1.2)";
            setTimeout(() => {
                ref.current.style.transform = "scale(1)";
            }, 200);
        }

    }, [letter, checkEnter, boxColor]);

    return (
        <div
            ref={ref}
            className="poppins-bold"
            style={{
                border: `${mode == "light" ? "solid 2px black" : "solid 2px white"} `,
                width: "60px",
                height: "60px",
                color: `${mode === "light" ? "black" : "white"} `,
                display: "flex",
                backgroundColor: boxColor,
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: "bold",
                transition: "transform 0.2s ease-in-out"
            }}
        >
            {letter || ""}
        </div >
    );
};

export default Box;
