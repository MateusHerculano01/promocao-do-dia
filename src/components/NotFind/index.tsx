import React from 'react';
import { Content, NotFindView, TextEmoji, TextSubtitle, TextTitle } from './styles';

export function NotFind() {
  return (
    <NotFindView>
      <Content>
        <TextEmoji>
          😕
        </TextEmoji>
        <TextTitle>
          Ops,
        </TextTitle>
        <TextSubtitle>
          nenhum produto {'\n'}
          encontrado
        </TextSubtitle>
      </Content>
    </NotFindView>
  )

}