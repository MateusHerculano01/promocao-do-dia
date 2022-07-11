import React from "react";
import { AdvertiserDTOS } from "@dtos/AdvertiserDTOS";
// import { BannerBig, Title, BannerGroup, BannerMini, Container, ImageAds } from "./styles";
import { Container, ImageAds } from "./styles";

interface Props extends AdvertiserDTOS {
  data: AdvertiserDTOS;
  onPress: () => void;
}

// export function AdvertisementsCard({ data, onPress }: Props) {
//   switch (data?.size) {
//     case "group":
//       return (
//         <BannerGroup>
//           {data?.announces.map((ads, index) => (
//             <BannerMini
//               onPress={onPress}
//               style={index === 0 ? { marginRight: 10 } : {}}
//             >
//               <Title>{ads?.title}</Title>
//             </BannerMini>
//           ))}
//         </BannerGroup>
//       );
//     default:
//       return (
//         <BannerGroup>
//           {data.announces.map((ads) => (
//             <BannerBig onPress={onPress}>
//               {ads.imageProduct ? (
//                 <ImageAds source={ads.imageProduct} />
//               ) : (
//                 <Title>{ads?.title}</Title>
//               )}
//             </BannerBig>
//           ))}
//         </BannerGroup>
//       );
//   }
// }

export function AdvertisementsCard({ data }: Props) {
  return (
    <Container size={data.size === "big" ? "big" : "small"}>
      <ImageAds source={{ uri: data.photo_url }} />
    </Container>
  )
}