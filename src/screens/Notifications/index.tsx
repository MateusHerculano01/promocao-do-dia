import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from "@hooks/auth";
import { AxiosError } from "axios";
import { api } from "@services/api";
import { NotificationDTOS } from '@dtos/NotificationDTOS';
import { ContainerBackground } from '@components/ContainerBackground';
import { HeaderButton } from '@components/HeaderButton';
import { ListDivider } from '@components/ListDivider';

import { Content, Container, Header, Icone, Image, ImageView, LeftView, MessageNotification, NotificationCard, NotificationData, ReturnButton, Title, TitleNotification, RowView, DateNotification } from './styles';

export function Notifications() {

    const navigation = useNavigation();
    const route = useRoute();
    const { user } = useAuth();

    const [notifications, setNotifications] = useState<NotificationDTOS[]>([]);
    const [loading, setLoading] = useState(false);

    async function fetchNotifications() {
        setLoading(true);

        await api.get('/notifications')
            .then(response => {

                setNotifications(response.data);

            })
            .catch(error => {

                if (error instanceof AxiosError) {
                    console.log(error.response?.data)
                }
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            });

    }

    useEffect(() => {
        fetchNotifications();
    }, [])

    return (
        <Container>
            <StatusBar
                backgroundColor='transparent'
            />
            <ContainerBackground />
            <Header>
                <LeftView>
                    <ReturnButton onPress={() => navigation.dispatch(CommonActions.goBack())}>
                        <Icone name="arrow-back" />
                    </ReturnButton>
                    <Title>Notificações</Title>
                </LeftView>

                {/* <HeaderButton
                    title="Cancelar"
                    color="delete"
                    onPress={() => navigation.dispatch(CommonActions.goBack())}
                /> */}

            </Header>

            <FlatList
                data={notifications}
                keyExtractor={(item) => String(item._id)}
                style={{ marginBottom: 10, paddingVertical: 5 }}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <ListDivider />}
                renderItem={({ item }) => (
                    <NotificationCard visualized={!!notifications.filter(notification =>
                        notification?.users?.filter(notificationFind =>
                            notificationFind.user === user.id && notificationFind.visualized === true)
                    )}>
                        <Content>
                            <ImageView>
                                <Image source={{ uri: item.advertiser?.photo_url }} resizeMode="contain" />
                            </ImageView>

                            <NotificationData>
                                <RowView>
                                    <TitleNotification>{item.notificationTitle}</TitleNotification>
                                    <DateNotification>15:57</DateNotification>
                                </RowView>
                                <MessageNotification>{item.notificationMessage}</MessageNotification>
                            </NotificationData>
                        </Content>
                    </NotificationCard>
                )}
            />
        </Container>
    )
}

