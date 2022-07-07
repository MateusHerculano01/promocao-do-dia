import React, { useState, useEffect } from "react";
import { Alert, Keyboard, ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/native";
import { AxiosError } from "axios";
import { api } from "@services/api";
import { ProductAnnouncedInterface } from "@dtos/ProductAnnouncedDTOS";
import { InputWithMask } from "@components/Form/InputMask";
import { ContainerBackground } from "@components/ContainerBackground";
import { Button } from "@components/Form/Button";
import { HeaderButton } from "@components/HeaderButton";
import { LoadCart } from "@components/LoadCart";
import { Container, Header, Icone, ReturnButton, Title, Form, LeftView, Photo } from "./styles";

type NavigationProps = {
  id: string;
}

export function EditAnnouncedProduct() {
  const navigation = useNavigation();
  const route = useRoute();

  const { id } = route.params as NavigationProps;

  const [isLogging, setIsLogging] = useState(false);
  const [adValue, setAdValue] = useState('');
  const [photo, setPhoto] = useState('');
  const [errorAdValue, setErrorAdValue] = useState<string | null>();
  const [loading, setLoading] = useState(false);

  function validate() {
    let error = false

    if (!adValue) {
      setErrorAdValue("Preencha o valor")
      error = true
    }

    return !error

  }

  async function fetchCategory() {
    try {
      setLoading(true);

      const { data } = await api.get<ProductAnnouncedInterface>(`/products-announced/info/${id}`);

      setAdValue(data.adValue);
      setPhoto(data.product.photos_url[0]);

      setLoading(false);

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Erro data", error.response?.data)

      }

    }

  }

  async function handleUpdateAdValue() {

    const formData = new FormData();

    if (validate()) {

      formData.append('adValue', adValue!.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'));

      try {
        setIsLogging(true);

        await api.put(`/products-announced/update/${id}`, formData, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          }
        })

        setIsLogging(false);

        navigation.navigate('HomeAnnouncedProducts');

      } catch (error) {
        setIsLogging(false);

        if (error instanceof AxiosError) {
          console.log(error.response?.data)
          console.log(error.response?.status)
        }
        Alert.alert("Editar valor", "Houve um erro ao editar o valor, tente novamente. ❌");
      }

    }

  }

  useEffect(() => {
    fetchCategory();
  }, []);

  if (loading)
    return <LoadCart />

  return (

    <ScrollView>

      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        containerStyle={{ flex: 1 }}
        style={{ flex: 1 }}
      >
        <Container>

          <ContainerBackground />
          <Header>
            <LeftView>
              <ReturnButton onPress={() => navigation.dispatch(CommonActions.goBack())}>
                <Icone name="arrow-back" />
              </ReturnButton>
              <Title>Editar valor em oferta</Title>
            </LeftView>

            <HeaderButton
              title="Cancelar"
              color="delete"
              onPress={() => navigation.dispatch(CommonActions.goBack())}
            />

          </Header>

          <Form>
            <Photo source={{ uri: photo }} />

            <InputWithMask
              name="price"
              mask="currency"
              value={adValue}
              inputMaskChange={(text: any) => {
                setAdValue(text)
                setErrorAdValue(null)
              }}
              errorMessage={errorAdValue}
              inputType="numeric"
              placeholder="Valor em oferta"
              iconName="pricetags-outline"
            />

            <Button
              title="Atualizar"
              backgroundColor="primary"
              iconRight
              isLoading={isLogging}
              iconName="save-outline"
              onPress={handleUpdateAdValue}
            />

          </Form>

        </Container>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}