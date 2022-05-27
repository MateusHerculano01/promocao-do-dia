import React, { useState, useEffect } from "react";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { ContainerBackground } from "@components/ContainerBackground";
import { CommonActions } from "@react-navigation/native";
import { InputDefault } from "@components/Form/Input";
import { Button } from "@components/Form/Button";
import { PhotoSuggestion } from "@components/PhotoSuggestion";
import { UploadImageProduct } from "@components/UploadImageProduct";
import { PhotoProduct } from "@components/PhotoProduct";
import { Container, Fields, Form, Header, Icone, ImagesView, ReturnButton, SuggestionView, Title, TitleSuggestion } from "./styles";

interface Props {
  navigation: BottomTabNavigationProp<any, any>;
  route?: any;
}

export function RegisterProduct({ navigation }: Props) {
  const [product, setProduct] = useState('');
  const [errorProduct, setErrorProduct] = useState<string | null>(null);
  const [size, setSize] = useState('');
  const [errorSize, setErrorSize] = useState<string | null>(null);
  const [brand, setBrand] = useState('');
  const [errorBrand, setErrorBrand] = useState<string | null>(null);
  const [category, setCategory] = useState('');
  const [errorCategory, setErrorCategory] = useState<string | null>(null);
  const [price, setPrice] = useState('');
  const [errorPrice, setErrorPrice] = useState<string | null>(null);

  function handleSaveProduct() {
    const data = {
      Product: product,
      Size: size,
      Brand: brand,
      Category: category,
      Price: price
    }

    if (product === '' && size === '' && brand === '' && category === '' && price === '') {
      return Alert.alert("Cadastrar produto", "Preencha todos os campos.")
    }

    console.log(data)
  }

  const suggestionImages = [
    "https://araujo.vteximg.com.br/arquivos/ids/4143344-1000-1000/7894900011517_1.jpg?v=637770769575870000",
    "https://www.bernardaoemcasa.com.br/media/catalog/product/cache/1/image/500x500/9df78eab33525d08d6e5fb8d27136e95/w/h/whatsapp_image_2020-07-17_at_09.41.20.jpeg",
    "https://static.distribuidoracaue.com.br/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/r/e/refrigerante-fanta-uva-2-litros.jpg?v=1",
  ]

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1, backgroundColor: "#37474F" }}>

        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          containerStyle={{ flex: 1 }}
          style={{ flex: 1 }}
        >
          <Container>
            <ContainerBackground />
            <Header>
              <ReturnButton onPress={() => navigation.dispatch(CommonActions.goBack())}>
                <Icone name="arrow-back" />
              </ReturnButton>
              <Title>Editar anúncio</Title>
            </Header>

            <Form>
              <Fields>
                <InputDefault
                  name="product"
                  onChangeText={setProduct}
                  iconNameL="basket-outline"
                  inputType="default"
                  autoCapitalize="words"
                  placeholder="Nome do produto"
                  error={errorProduct}
                />
                <InputDefault
                  name="size"
                  onChangeText={setSize}
                  iconNameL="code-working-outline"
                  inputType="default"
                  autoCapitalize="words"
                  placeholder="Tamanho"
                  error={errorSize}
                />
                <InputDefault
                  name="brand"
                  onChangeText={setBrand}
                  iconNameL="bookmark-outline"
                  inputType="default"
                  autoCapitalize="words"
                  placeholder="Marca"
                  error={errorBrand}
                />
                <InputDefault
                  name="category"
                  onChangeText={setCategory}
                  iconNameL="filter-outline"
                  inputType="default"
                  autoCapitalize="words"
                  placeholder="Categoria"
                  error={errorCategory}
                />
                <InputDefault
                  name="price"
                  onChangeText={setPrice}
                  iconNameL="pricetags-outline"
                  inputType="numeric"
                  placeholder="Preço"
                  error={errorPrice}
                />
              </Fields>
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

              <PhotoProduct uri={"https://araujo.vteximg.com.br/arquivos/ids/4143344-1000-1000/7894900011517_1.jpg?v=637770769575870000"} />
              <PhotoProduct uri={"https://araujo.vteximg.com.br/arquivos/ids/4143344-1000-1000/7894900011517_1.jpg?v=637770769575870000"} />

              <UploadImageProduct />
            </Form>

            <Button
              title="Salvar produto"
              backgroundColor="primary"
              iconRight
              iconName="save-outline"
              onPress={handleSaveProduct}
            />

          </Container>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}