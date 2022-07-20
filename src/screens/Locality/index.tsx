import React, { useCallback, useEffect, useState } from 'react';

import { localityApi } from "@services/localityApi";
import { AxiosError } from "axios";
import { LocalityUFDTOS } from "@dtos/LocalityUFDTOS";
import { LocalityCityDTOS } from "@dtos/LocalityCityDTOS";

import { ContainerBackground } from '@components/ContainerBackground';
import { ButtonSelect } from '@components/ButtonSelect';

import { Container } from './styles';

export function Locality() {
  const [uf, setUf] = useState('GO');
  const [city, setCity] = useState('');

  const [listUf, setListUf] = useState<LocalityUFDTOS[]>([]);
  const [listCity, setListCity] = useState<LocalityCityDTOS[]>([]);

  const [errorUf, setErrorUf] = useState<string | null>();
  const [errorCity, setErrorCity] = useState<string | null>();

  function validate() {
    let error = false;

    if (!uf) {
      setErrorUf("Estado obrigatório");
      error = true;
    }

    if (!city) {
      setErrorCity("Cidade obrigatória");
      error = true;
    }

    return !error;
  }

  const fetchUf = useCallback(async () => {
    try {

      const { data } = await localityApi.get<LocalityUFDTOS[]>(`api/v1/localidades/estados`);

      data.sort((a, b) => a.nome.localeCompare(b.nome));

      setListUf([...data]);

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Erro data", error.response?.data)
      }
    }
  }, []);

  const fetchCity = useCallback(async (uf: string) => {
    try {

      const { data } = await localityApi.get<LocalityCityDTOS[]>(`api/v1/localidades/estados/${uf}/municipios`);

      data.sort((a, b) => a.nome.localeCompare(b.nome));

      setListCity([...data]);

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Erro data", error.response?.data)
      }
    }
  }, []);


  useEffect(() => {
    fetchUf();
  }, []);

  useEffect(() => {
    if (uf) {
      fetchCity(uf);
    }
  }, [uf]);


  return (
    <Container>
      <ContainerBackground />

      <ButtonSelect
        title="Selecione seu estado"
        icon="location-outline"
        errorMessage={errorUf}
        onPress={() => { }}
      />

      <ButtonSelect
        title="Selecione sua cidade"
        icon="location-outline"
        errorMessage={errorCity}
        onPress={() => { }}
      />
    </Container>
  );
}