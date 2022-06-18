import React, { useState, useEffect } from "react";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { ContainerBackground } from "@components/ContainerBackground";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { InputDefault } from "@components/Form/Input";
import { Button } from "@components/Form/Button";
import { PhotoSuggestion } from "@components/PhotoSuggestion";
import { UploadImageProduct } from "@components/UploadImageProduct";
import { PhotoProduct } from "@components/PhotoProduct";
import { Container, Form, Header, Icone, ImagesView, ReturnButton, SuggestionView, Title, TitleSuggestion } from "./styles";

export function RegisterProduct() {
  const navigation = useNavigation();

  const [name, setName] = useState<string>();
  const [size, setSize] = useState<string>();
  const [brand, setBrand] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [price, setPrice] = useState<string>();
  const [errorName, setErrorName] = useState<string | null>(null);
  const [errorSize, setErrorSize] = useState<string | null>(null);
  const [errorBrand, setErrorBrand] = useState<string | null>(null);
  const [errorCategory, setErrorCategory] = useState<string | null>(null);
  const [errorPrice, setErrorPrice] = useState<string | null>(null);
  const [validate, setValidate] = useState(false);

  function valida() {
    setErrorName("Preencha o nome do produto")
    setValidate(true);
  }

  function handleSaveProduct() {
    if (validate) {
      const data = {
        name,
        size,
        brand,
        category,
        price
      }

      // if (product === '' && size === '' && brand === '' && category === '' && price === '') {
      //   return Alert.alert("Cadastrar produto", "Preencha todos os campos.")
      // }

      console.log(data)
    }

  }

  const suggestionImages = [
    "https://araujo.vteximg.com.br/arquivos/ids/4143344-1000-1000/7894900011517_1.jpg?v=637770769575870000",
    "https://www.bernardaoemcasa.com.br/media/catalog/product/cache/1/image/500x500/9df78eab33525d08d6e5fb8d27136e95/w/h/whatsapp_image_2020-07-17_at_09.41.20.jpeg",
    "https://static.distribuidoracaue.com.br/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/r/e/refrigerante-fanta-uva-2-litros.jpg?v=1",
  ]

  return (

    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
    >
      <Container>
        <ContainerBackground />
        <Header>
          <ReturnButton onPress={() => navigation.dispatch(CommonActions.goBack())}>
            <Icone name="arrow-back" />
          </ReturnButton>
          <Title>Produto</Title>
        </Header>

        <ScrollView>

          <Form>

            <InputDefault
              name="Name"
              onChangeText={text => setName(text)}
              iconNameL="basket-outline"
              inputType="default"
              autoCapitalize="words"
              placeholder="Nome do produto"
              errorMessage={errorName}

            />
            <InputDefault
              name="Size"
              onChangeText={text => setSize(text)}
              iconNameL="code-working-outline"
              inputType="default"
              autoCapitalize="words"
              placeholder="Tamanho"
              errorMessage={errorSize}
            />
            <InputDefault
              name="Brand"
              onChangeText={text => setBrand(text)}
              iconNameL="bookmark-outline"
              inputType="default"
              autoCapitalize="words"
              placeholder="Marca"
              errorMessage={errorBrand}
            />
            <InputDefault
              name="Category"
              onChangeText={text => setCategory(text)}
              iconNameL="filter-outline"
              inputType="default"
              autoCapitalize="words"
              placeholder="Categoria"
              errorMessage={errorCategory}
            />
            <InputDefault
              name="Price"
              onChangeText={text => setPrice(text)}
              iconNameL="pricetags-outline"
              inputType="numeric"
              placeholder="Preço"
              errorMessage={errorPrice}
            />

            {/* <SuggestionView>
                <TitleSuggestion>Sugestões de imagens</TitleSuggestion>
                <ImagesView>
                  {suggestionImages && (
                    suggestionImages.map((linkImage) => (
                      <PhotoSuggestion key={linkImage} uri={linkImage} />
                    ))
                  )}
                </ImagesView>
              </SuggestionView> */}

            <UploadImageProduct />

          </Form>

        </ScrollView>

        <Button
          title="Salvar produto"
          backgroundColor="primary"
          iconRight
          iconName="save-outline"
          onPress={handleSaveProduct}
        />

      </Container>
    </TouchableWithoutFeedback>
  )
}