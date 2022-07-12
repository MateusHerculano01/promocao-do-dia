import React, { useState } from 'react';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { ContainerBackground } from '@components/ContainerBackground';
import { Container, Header, Icone, LeftView, ReturnButton, Title } from './styles';
import { HeaderButton } from '@components/HeaderButton';

export function Notification() {
    const navigation = useNavigation();
    const route = useRoute();

    const [notifications, setNotifications] = useState<Notification[]>([]);

    const Data = [
        {
            _id: "62cc834b2a27435c1cdcc4de",
            advertiser: {
                _id: "62c5c2b9d4ec94c0a88c762e",
                user: "628eba9e6350ef48511f80aa",
                photo: "6f6e6302484b8bebe19c-ccfc947eaec1ab23022e-cf04ec06-0da8-45f5-9915-f1ebc274a92a.jpg",
                phone: "(64) 3608-1269",
                title: "Empresa teste",
                link: "https://",
                size: "big",
                photo_url: "http://192.168.2.198:3333/files/6f6e6302484b8bebe19c-ccfc947eaec1ab23022e-cf04ec06-0da8-45f5-9915-f1ebc274a92a.jpg",
                id: "62c5c2b9d4ec94c0a88c762e"
            },
            notificationTitle: "Promoção no Estevam!",
            notificationMessage: "Hoje é a famosa Quinta Feira da Carne aqui no Estevam não fique de fora dessa",
            users: [
                {
                    user: "628eba9e6350ef48511f80aa",
                    visualized: false,
                    _id: "62cc834b2a27435c1cdcc4df"
                },
                {
                    user: "62a8d802ec6d6795e136c879",
                    visualized: false,
                    _id: "62cc834b2a27435c1cdcc4e0"
                },
                {
                    user: "62ab98adf4ca187b73397dda",
                    visualized: false,
                    _id: "62cc834b2a27435c1cdcc4e1"
                },
                {
                    user: "62abaa38cf00647734230c4d",
                    visualized: false,
                    _id: "62cc834b2a27435c1cdcc4e2"
                }
            ],
        },
        {
            _id: "62cc834b2a27435c1cdcc4de",
            advertiser: {
                _id: "62c5c2b9d4ec94c0a88c762e",
                user: "628eba9e6350ef48511f80aa",
                photo: "6f6e6302484b8bebe19c-ccfc947eaec1ab23022e-cf04ec06-0da8-45f5-9915-f1ebc274a92a.jpg",
                phone: "(64) 3608-1269",
                title: "Empresa teste",
                link: "https://",
                size: "big",
                photo_url: "https://www.github.com/MateusHerculano01.png",
                id: "62c5c2b9d4ec94c0a88c762e"
            },
            notificationTitle: "Promoção no Super Bom!",
            notificationMessage: "Venha conferir nossa promoção do HortFrut",
            users: [
                {
                    user: "628eba9e6350ef48511f80aa",
                    visualized: false,
                    _id: "62cc834b2a27435c1cdcc4df"
                },
                {
                    user: "62a8d802ec6d6795e136c879",
                    visualized: false,
                    _id: "62cc834b2a27435c1cdcc4e0"
                },
                {
                    user: "62ab98adf4ca187b73397dda",
                    visualized: false,
                    _id: "62cc834b2a27435c1cdcc4e1"
                },
                {
                    user: "62abaa38cf00647734230c4d",
                    visualized: false,
                    _id: "62cc834b2a27435c1cdcc4e2"
                }
            ],
        },
    ]

    return (
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

            <
        </Container>
    )
}

