import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { api } from "@services/api";
import { AdvertiserDTOS } from "@dtos/AdvertiserDTOS";

type AdvertiserContextData = {
  isLoading: boolean;
  advertiser: AdvertiserDTOS;
}

type AdvertiserProviderProps = {
  children: ReactNode;
}

const AdvertiserContext = createContext<AdvertiserContextData>({} as AdvertiserContextData);

function AdvertiserProvider({ children }: AdvertiserProviderProps) {
  const [data, setData] = useState<AdvertiserDTOS>({} as AdvertiserDTOS);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchAdvertiser() {

    setIsLoading(true);

    await api.get('/advertiser/advertise')
      .then(response => {

        setData(response.data);

        setIsLoading(false);
      })
      .catch(error => {
        Alert.alert("Erro de carregamento", "Houve um erro ao carregar, tente novamente.");
        console.log('erro da resposta', error.response)
      })
      .finally(() => {
        setIsLoading(false)
      })

  }

  useEffect(() => {
    fetchAdvertiser();
  }, []);

  return (
    <AdvertiserContext.Provider value={{ isLoading, advertiser: data }}>
      {children}
    </AdvertiserContext.Provider>
  )
}

function useAdvertiser() {
  const context = useContext(AdvertiserContext);

  return context;
}

export { AdvertiserContext, AdvertiserProvider, useAdvertiser }