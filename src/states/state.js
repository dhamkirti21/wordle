import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    word: "",
    chance: 6,
    letterNumber: 5,
    checkEnter: false,
    guess: Array(6).fill(null),
    error: "",
};

export const wordleSlice = createSlice({
    name: "wordle",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setWord: (state, action) => {
            state.word = action.payload;
        },
        setGuess: (state, action) => {
            state.guess[action.payload.row] = action.payload.guess;
        },
        setEnter: (state, action) => {
            state.checkEnter = !state.checkEnter
        },
        setChance: (state, action) => {
            state.chance = action.payload;
        }

    },
});

export const {
    setMode,
    setWord,
    setGuess
} = wordleSlice.actions;
export default wordleSlice.reducer;