import React, { createContext, useContext, useState } from "react";

const InputImagesContext = createContext<null | {
  inputImages: string[];
  setInputImages: React.Dispatch<React.SetStateAction<string[]>>;
}>(null);

export const InputImagesProvider: React.FC = ({ children }) => {
  const [inputImages, setInputImages] = useState<string[]>([]);

  return (
    <InputImagesContext.Provider value={{ inputImages, setInputImages }}>
      {children}
    </InputImagesContext.Provider>
  );
};

export const useInputImagesContext = () => {
  const context = useContext(InputImagesContext);

  return context;
};
