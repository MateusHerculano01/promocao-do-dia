import React, { useState, useEffect } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { api } from "@services/api";
import { AxiosError } from "axios";
import { ContainerBackground } from "@components/ContainerBackground";
import { InputDefault } from "@components/Form/Input";
import { Button } from "@components/Form/Button";
import { PhotoProduct } from "@components/PhotoProduct";
import { LoadCart } from "@components/LoadCart";
import { ButtonView, Container, DescriptionGroup, Form, Header, IconCamera, Icone, InputDescription, InputGroupHeader, Label, LabelDescription, MaxCharacters, ReturnButton, Title, UploadImage } from "./styles";

export function RegisterProduct() {
  const navigation = useNavigation();

  const [name, setName] = useState<string>();
  const [size, setSize] = useState<string>();
  const [brand, setBrand] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [price, setPrice] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [photosProduct, setPhotosProduct] = useState<string[]>([]);

  const [errorName, setErrorName] = useState<string | null>(null);
  const [errorSize, setErrorSize] = useState<string | null>(null);
  const [errorBrand, setErrorBrand] = useState<string | null>(null);
  const [errorCategory, setErrorCategory] = useState<string | null>(null);
  const [errorPrice, setErrorPrice] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [isLogging, setIsLogging] = useState(false);


  function validate() {
    let error = false;

    if (!name) {
      setErrorName("Preencha o nome do produto");
      error = true
    }
    if (!size) {
      setErrorSize("Preencha o tamanho do produto");
      error = true
    }
    if (!brand) {
      setErrorBrand("Preencha a marca do produto");
      error = true
    }
    if (!category) {
      setErrorCategory("Preencha a categoria do produto");
      error = true
    }
    if (!price) {
      setErrorPrice("Preencha o preço do produto");
      error = true
    }

    return !error;

  }

  async function handleImagePicker() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1
      });

      if (!result.cancelled) {
        setPhotosProduct([...photosProduct, result.uri]);
      }
    }
  }

  function handleRemovePhoto(photoProduct: string) {

    setPhotosProduct(oldValues => {
      oldValues.splice(oldValues.indexOf(photoProduct), 1)
      return [...oldValues]
    }
    );
  }


  async function handleRegisterProduct() {
    if (!photosProduct.length) {
      Alert.alert("Cadastrar produto", "Adicione pelomenos uma imagem. 📷")
    }

    if (!description!.trim()) {
      Alert.alert("Cadastrar produto", "Adicione uma descrição ao produto. ✍")
    }

    const formData = new FormData();

    if (validate()) {

      formData.append('name', name!.trim());
      formData.append('size', size!.trim());
      formData.append('brand', brand!.trim());
      formData.append('category', category!.trim());
      formData.append('price', price!.trim());
      formData.append('description', description!.trim());
      formData.append('photos', photosProduct[0]);
      formData.append('photos', photosProduct[1]);
      formData.append('photos', photosProduct[2]);

      try {
        setIsLogging(true);

        await api.post('/products/new', formData, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          }
        })

        setIsLogging(false);

        Alert.alert("Cadastrar Produto", "Produto cadastrado com sucesso. ✔");

        navigation.navigate('HomeProduct');

      } catch (error) {
        setIsLogging(false);

        if (error instanceof AxiosError) {
          console.log(error.response?.data)
          console.log(error.response?.status)
        }
        Alert.alert("Cadastrar Produto", "Houve um erro ao cadastrar o produto, tente novamente. ❌");
      }

    }

  }

  if (loading)
    return <LoadCart />

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

        <ScrollView
          showsVerticalScrollIndicator={false}
        >

          <Form>

            <InputDefault
              name="Name"
              defaultValue={name}
              onChangeText={text => {
                setName(text)
                setErrorName(null)
              }}
              iconNameL="basket-outline"
              inputType="default"
              autoCapitalize="words"
              placeholder="Nome do produto"
              errorMessage={errorName}

            />
            <InputDefault
              name="Size"
              defaultValue={size}
              onChangeText={text => {
                setSize(text)
                setErrorSize(null)
              }}
              iconNameL="code-working-outline"
              inputType="default"
              autoCapitalize="words"
              placeholder="Tamanho"
              errorMessage={errorSize}
            />
            <InputDefault
              name="Brand"
              defaultValue={brand}
              onChangeText={text => {
                setBrand(text)
                setErrorBrand(null)
              }}
              iconNameL="bookmark-outline"
              inputType="default"
              autoCapitalize="words"
              placeholder="Marca"
              errorMessage={errorBrand}
            />
            <InputDefault
              name="Category"
              defaultValue={category}
              onChangeText={text => {
                setCategory(text)
                setErrorCategory(null)
              }}
              iconNameL="filter-outline"
              inputType="default"
              autoCapitalize="words"
              placeholder="Categoria"
              errorMessage={errorCategory}
            />
            <InputDefault
              name="Price"
              defaultValue={price}
              onChangeText={text => {
                setPrice(text)
                setErrorPrice(null)
              }}
              iconNameL="pricetags-outline"
              inputType="numeric"
              placeholder="Preço"
              errorMessage={errorPrice}
            />

            <DescriptionGroup>
              <InputGroupHeader>
                <LabelDescription>Descrição</LabelDescription>
                <MaxCharacters>0 de 200</MaxCharacters>
              </InputGroupHeader>

              <InputDescription
                multiline
                maxLength={200}
                onChangeText={setDescription}
                defaultValue={description}
              />
            </DescriptionGroup>

            {
              !!photosProduct[0] && (
                <PhotoProduct
                  uri={photosProduct[0]}
                  key={photosProduct[0]}
                  onPress={() => { handleRemovePhoto(photosProduct[0]) }}
                />
              )
            }

            {
              !!photosProduct[1] && (
                <PhotoProduct
                  uri={photosProduct[1]}
                  key={photosProduct[1]}
                  onPress={() => { handleRemovePhoto(photosProduct[1]) }}
                />
              )
            }

            {
              !!photosProduct[2] && (
                <PhotoProduct
                  uri={photosProduct[2]}
                  key={photosProduct[2]}
                  onPress={() => { handleRemovePhoto(photosProduct[2]) }}
                />
              )
            }

            {photosProduct.length < 3 ?
              <UploadImage>
                <ButtonView
                  onPress={handleImagePicker}
                >
                  <IconCamera name="camera-plus-outline" />
                  <Label>Enviar uma imagem</Label>
                </ButtonView>
              </UploadImage>

              :
              <>
              </>
            }

          </Form>

        </ScrollView>

        <Button
          title="Salvar produto"
          backgroundColor="primary"
          iconRight
          iconName="save-outline"
          isLoading={isLogging}
          onPress={handleRegisterProduct}
        />

      </Container>
    </TouchableWithoutFeedback>
  )
}