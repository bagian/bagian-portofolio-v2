"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface LoaderContextType {
  isTransitioning: boolean;
  triggerTransition: () => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  // false = belum siap, true = preloader mulai membuka tirai
  const [isTransitioning, setIsTransitioning] = useState(false);

  const triggerTransition = () => {
    setIsTransitioning(true);
  };

  return (
    <LoaderContext.Provider value={{ isTransitioning, triggerTransition }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
};
