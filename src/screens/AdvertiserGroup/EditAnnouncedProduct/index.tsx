import React, { useState, useEffect } from "react";
import { Alert, Keyboard, ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/native";
import { AxiosError } from "axios";
import { api } from "@services/api";
import { ProductAnnouncedDTOS } from "@dtos/ProductAnnouncedDTOS";
import { ProductDTOS } from "@dtos/ProductDTOS";
import { InputWithMask } from "@components/Form/InputMask";
import { ContainerBackground } from "@components/ContainerBackground";
import { Button } from "@components/Form/Button";
import { HeaderButton } from "@components/HeaderButton";
import { LoadCart } from "@components/LoadCart";
import { Container, Header, Icone, ReturnButton, Title, Form, LeftView, Photo } from "./styles";

type NavigationProps = {
  id: string;
  action: string;
}

export function EditAnnouncedProduct() {
  const navigation = useNavigation();
  const route = useRoute();

  const { id, action } = route.params as NavigationProps;

  const [isLogging, setIsLogging] = useState(false);
  const [adValue, setAdValue] = useState('');
  const [photo, setPhoto] = useState('');
  const [errorAdValue, setErrorAdValue] = useState<string | null>();
  const [loading, setLoading] = useState(false);

  function validate() {
    let error = false
    const regex = /[a-z]/;

    if (!adValue) {
      setErrorAdValue("Preencha o valor");
      error = true
    }

    if (regex.test(adValue)) {
      setErrorAdValue("Preencha um valor válido.");
      error = true
    }

    return !error

  }

  // async function handleUpdateAdValue() {

  //   if (validate()) {
  //     try {
  //       setIsLogging(true);

  //       await api.put(`/products-announced/update/${id}`, { adValue })

  //       setIsLogging(false);

  //       navigation.navigate('HomeAnnouncedProducts');

  //     } catch (error) {
  //       setIsLogging(false);

  //       if (error instanceof AxiosError) {
  //         console.log(error.response?.data)
  //         console.log(error.response?.status)
  //       }
  //       Alert.alert("Editar valor", "Houve um erro ao editar o valor, tente novamente. ❌");
  //     }

  //   }

  // }

  async function fetchProduct() {
    try {
      setLoading(true);

      const { data } = await api.get<ProductDTOS>(`/products/${id}`);

      setPhoto(data.photos_url[0]);
      setAdValue(!!data.adValue ? data.adValue : '');

      setLoading(false);

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Erro data", error.response?.data)

      }

    }

  }

  async function handleUpdateProduct() {

    if (validate()) {

      try {
        setIsLogging(true);

        await api.put(`/products/edit/${id}`, { adValue })

        setIsLogging(false);

        action === "update" ? navigation.navigate("HomeAnnouncedProducts") : navigation.navigate('HomeAdvertiseProducts');

      } catch (error) {
        setIsLogging(false);

        if (error instanceof AxiosError) {
          console.log(error.response?.data)
          console.log(error.response?.statusText)
          console.log(error.response?.status)
          console.log(error)
        }

        Alert.alert("Atualizar Produto", "Houve um erro ao atualizar o produto, tente novamente. ❌");
      }

    }

  }

  useEffect(() => {
    fetchProduct();
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
              <Title>Editar valor de oferta</Title>
            </LeftView>

            <HeaderButton
              title="Cancelar"
              color="delete"
              onPress={() => navigation.dispatch(CommonActions.goBack())}
            />

          </Header>

          <Form>
            <Photo source={{ uri: photo }} resizeMode="contain" />

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
              placeholder="Valor de oferta"
              iconName="pricetags-outline"
              onSubmitEditing={handleUpdateProduct}
            />

            <Button
              title="Atualizar"
              backgroundColor="primary"
              iconRight
              isLoading={isLogging}
              iconName="save-outline"
              onPress={handleUpdateProduct}
            />

          </Form>

        </Container>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}