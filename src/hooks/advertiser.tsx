import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { api } from "@services/api";
import { AxiosError } from "axios";
import { AdvertiserDTOS } from "@dtos/AdvertiserDTOS";

type AdvertiserContextData = {
  isLoading: boolean;
  isLogging: boolean;
  hasError: boolean;
  isRegistered: boolean;
  advertiser: AdvertiserDTOS;
  registerAdvertisement: (formData: globalThis.FormData) => Promise<void>;
}

type AdvertiserProviderProps = {
  children: ReactNode;
}

const AdvertiserContext = createContext<AdvertiserContextData>({} as AdvertiserContextData);

function AdvertiserProvider({ children }: AdvertiserProviderProps) {
  const [data, setData] = useState<AdvertiserDTOS>({} as AdvertiserDTOS);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [error, setError] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  async function fetchAdvertiser() {

    await api.get('/advertiser/advertise')
      .then(response => {

        setData(response.data);

      })
      .catch(error => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false)
      })

  }

  async function registerAdvertisement(formData: globalThis.FormData): Promise<void> {

    try {
      setIsLogging(true);

      await api.post('/advertiser/new', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }
      })

      setIsLogging(false);

      setIsRegistered(true);

    } catch (error) {
      setIsLogging(false);

      if (error instanceof AxiosError) {
        console.log(error.response?.data)
        console.log(error.response?.status)
      }
      Alert.alert("Cadastrar Anúncio", "Houve um erro ao cadastrar o anúncio, tente novamente.");
    }

  }


  useEffect(() => {
    fetchAdvertiser();
  }, [data]);

  return (
    <AdvertiserContext.Provider value={{ isLoading, isLogging, isRegistered, hasError: error, registerAdvertisement, advertiser: data }}>
      {children}
    </AdvertiserContext.Provider>
  )
}

function useAdvertiser() {
  const context = useContext(AdvertiserContext);

  return context;
}

export { AdvertiserContext, AdvertiserProvider, useAdvertiser }