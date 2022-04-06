import React from "react";
import {
  Container,
  View,
  LocationInfo,
  TextLocation,
  Location,
  IconLocation,
  IconRowRigh,
  LocationInfoGroup
} from "./styles";
interface Props {
  location: string;
  textLocation: string;
  onPress: () => void;
}

export function LocationUser({ location, textLocation, onPress }: Props) {
  return (
    <Container onPress={onPress}>
      <LocationInfoGroup>
        <View>
          <IconLocation name="location" />
        </View>
        <LocationInfo>
          <TextLocation>{textLocation}</TextLocation>
          <Location>{location}</Location>
        </LocationInfo>
      </LocationInfoGroup>
      <IconRowRigh name="chevron-right" />
    </Container>
  );
}
