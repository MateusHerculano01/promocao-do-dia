import React from "react";
import { DataListProps } from "../../screens/Dashboard";
import { BannerBig, Title, BannerGroup, BannerMini } from "./styles";

interface Props {
  data: DataListProps;
}

export function AdvertisementsCard({ data }: Props) {
  switch (data?.type) {
    case 'group':
      return (
        <BannerGroup>
          {data?.announces.map(ads => (
            <BannerMini onPress={() => {

            }}>
              <Title>{ads?.title}</Title>
            </BannerMini>
          ))}
        </BannerGroup>
      )
    default:
      return (
        <BannerGroup>
          {data.announces.map(ads => (
            <BannerBig>
              <Title>{ads?.title}</Title>
            </BannerBig>
          ))}
        </BannerGroup>
      )
  }
}
