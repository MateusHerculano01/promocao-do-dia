import React from 'react';
import { DataListProps } from '../../screens/Dashboard';

import {
  Container,
  Title,
} from './styles';

interface Props {
  data: DataListProps;
}

export function AdvertisementsCard({ data }: Props) {
  return (
    <Container>
      <Title>{data.title}</Title>
    </Container>
  )
}