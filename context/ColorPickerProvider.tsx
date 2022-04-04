import { createContext, useState } from "react"
import ColorPickerContext from './ColorPickerContext'

interface ProviderInterface {
    children: React.ReactNode
}

const ColorPickerProvider = ({children} : ProviderInterface) => {

    const [colorContext, setColorContext] = useState('#ff23');
    const value = {
        colorContext: colorContext,
        setColorContext: setColorContext
    };

    return (
        <ColorPickerContext.Provider value={value}>

            {children}

        </ColorPickerContext.Provider>
    );
}

export default ColorPickerProvider;