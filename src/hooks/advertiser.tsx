import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Alert } from "react-native";
import { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { api } from "@services/api";

type Advertiser = {
  _id: string;
  user: object;
  photo: string;
  title: string;
  link: string;
}

type AdvertiserContextData = {
  isAdvertiser?: boolean;
  advertiser: Advertiser;
}

type AdvertiserProviderProps = {
  children: ReactNode;
}

const AdvertiserContext = createContext<AdvertiserContextData>({} as AdvertiserContextData);

function AdvertiserProvider({ children }: AdvertiserProviderProps) {
  const [data, setData] = useState<Advertiser>({} as Advertiser);

  useEffect(() => {
    async function handleAd() {
      try {
        const response = await api.get('/advertiser/advertise');

        const { data } = response;

        await AsyncStorage.setItem(
          "@Promocaododia:advertiser", JSON.stringify(data)
        );

        setData(data);

      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status == 400) {
            setData({} as Advertiser)
          }
        }
        Alert.alert('Anunciante', 'Ocorreu um erro, tente novamente mais tarde.')
      }

    }

    handleAd();
  }, [data]);

  async function loadUserStorageData() {
    const advertiserData = await AsyncStorage.getItem("@Promocaododia:advertiser");

    if (advertiserData) {
      const advertiser = JSON.parse(advertiserData);

      setData(advertiser);
    }
  }

  useEffect(() => {
    loadUserStorageData();
  }, [data]);

  return (
    <AdvertiserContext.Provider value={{ advertiser: data }}>
      {children}
    </AdvertiserContext.Provider>
  )
}

function useAdvertiser() {
  const context = useContext(AdvertiserContext);

  return context;
}

export { AdvertiserContext, AdvertiserProvider, useAdvertiser }
