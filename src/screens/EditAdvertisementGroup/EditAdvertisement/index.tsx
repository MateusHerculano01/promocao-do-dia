import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CommonActions } from "@react-navigation/native";
import { ContainerBackground } from "@components/ContainerBackground";
import { PhotoAdversitment } from "@components/PhotoAdversitment";
import { InputForm } from "@components/Form/InputForm";
import { Button } from "@components/Form/Button";
import { AdSizeSelect } from "@components/AdSizeSelect";
import { ModalView } from "@components/ModalView";
import { SizeAdvertisement, SizesType } from "../SizeAdvertisement";
import { Container, Header, Icone, ReturnButton, Title, Form, PhotoView, IconView, Icon, Fields } from "./styles";

interface Props {
  navigation: BottomTabNavigationProp<any, any>;
  route: any;
}

interface FormData {
  [key: string]: any;
}

const schema = Yup.object().shape({
  description: Yup.string().required('Descrição é obrigatória'),
  link: Yup.string().required('Link é obrigatório'),
});

export function EditAdvertisement({ navigation }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [size, setSize] = useState<SizesType>({
    id: "1",
    title: "Tamanho do anúncio"
  })

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  function handleOpenModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleModalSelect(sizeSelect: SizesType) {
    setSize(sizeSelect);
    setOpenModal(false);
  }

  function handleEditAdvertisement(form: FormData) {
    const data = {
      description: form.description,
      link: form.link,
      size
    }

    if (size.id === "1") {
      return Alert.alert("Editar anúncio", "Selecione o tamanho do anúncio")
    }

    console.log(data)
  }

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
              <PhotoView>
                <PhotoAdversitment uri="" />
                <IconView>
                  <Icon name="camera-reverse-outline" />
                </IconView>
              </PhotoView>

              <Fields>
                <InputForm
                  name="description"
                  control={control}
                  error={errors.description && errors.description.message}
                  autoCapitalize="words"
                  inputType="default"
                  placeholder="Descrição do anúncio"
                  iconNameL="person-circle-outline"
                />

                <InputForm
                  name="link"
                  control={control}
                  error={errors.link && errors.link.message}
                  autoCapitalize="none"
                  inputType="default"
                  placeholder="Link"
                  iconNameL="ios-link"
                />

                <AdSizeSelect
                  title={size.title ? size.title : "Tamanho do anúncio"}
                  onPress={handleOpenModal}
                />
              </Fields>

              <Button
                title="Salvar"
                backgroundColor="primary"
                iconRight
                iconName="save-outline"
                onPress={handleSubmit(handleEditAdvertisement)}
              />
            </Form>

          </Container>

        </TouchableWithoutFeedback>
      </ScrollView>

      <ModalView visible={openModal} closeModal={handleCloseModal}>
        <SizeAdvertisement handleModalSelect={handleModalSelect} />
      </ModalView>
    </KeyboardAvoidingView >
  )
}