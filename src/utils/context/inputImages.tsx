import React, { createContext, useContext, useState } from "react";

const InputImagesContext = createContext<null | {
  inputImages: Blob[];
  setInputImages: React.Dispatch<React.SetStateAction<Blob[]>>;
}>(null);

export const InputImagesProvider: React.FC = ({ children }) => {
  const [inputImages, setInputImages] = useState<Blob[]>([]);

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
