import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from "@hooks/auth";
import { useNotifications } from '@hooks/notifications';
import { ContainerBackground } from '@components/ContainerBackground';
import { HeaderButton } from '@components/HeaderButton';
import { LoadAnimation } from '@components/LoadAnimation';
import { ListDivider } from '@components/ListDivider';

import { Content, Container, Header, Icone, Image, ImageView, LeftView, MessageNotification, NotificationCard, NotificationData, ReturnButton, Title, TitleNotification, RowView, DateNotification, NotFindNotificationsView, NotFindNotificationsIcon, NotFindNotificationsText } from './styles';

export function Notifications() {

    const navigation = useNavigation();
    const route = useRoute();
    const { user } = useAuth();
    const { notifications, isLoading } = useNotifications();

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

            {isLoading ? <LoadAnimation />
                :
                !!notifications.length ?
                    <FlatList
                        data={notifications}
                        keyExtractor={(item) => String(item._id)}
                        style={{ marginBottom: 10, paddingVertical: 5 }}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <ListDivider />}
                        renderItem={({ item }) => (
                            <NotificationCard visualized={notifications.findIndex(notification =>
                            (notification._id === item._id && notification?.users?.find(users =>
                                users.user === user.id && users.visualized === true))) !== -1 ? true : false}>
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
                    :
                    <NotFindNotificationsView>
                        <NotFindNotificationsIcon name="notifications-off-outline" />
                        <NotFindNotificationsText>Nenhuma notificação encontrada</NotFindNotificationsText>
                    </NotFindNotificationsView>
            }
        </Container>
    )
}

