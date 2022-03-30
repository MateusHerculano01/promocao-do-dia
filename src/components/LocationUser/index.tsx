import React from 'react';

import {
  Container,
  View,
  LocationInfo,
  TextLocation,
  Location,
  IconLocation,
  IconRowRigh
} from './styles';

interface Props {
  location: string;
  textLocation: string;
  onPress: () => void;
}

export function LocationUser({ location, textLocation, onPress }: Props) {
  return (
    <Container onPress={onPress}>
      <View>
        <IconLocation name="location" />
      </View>

      <LocationInfo>
        <TextLocation>{textLocation}</TextLocation>
        <Location>{location}</Location>
      </LocationInfo>

      <IconRowRigh name="chevron-right" />
    </Container>
  )
}