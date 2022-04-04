import React, { createContext } from "react";

//const [colorContext, setColorContext] = useState('#ff23');
const ColorPickerContext = createContext({colorContext: '#ff24', setColorContext: (colorContext: string)=> {}});
//const ColorPickerContext = createContext({colorContext: '#ff24', setColorContext: (colorContext: string)=> {}});

export default ColorPickerContext;

