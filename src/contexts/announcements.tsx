import { createContext, useEffect, useState } from "react";
import api from "../api";

export interface IVehicle {
  id: string;
  announcementType: string;
  title: string;
  year: number;
  km: number;
  price: number;
  description: string;
  vehicleType: string;
  published: boolean;
  images: IMGS[];
  user: User;
  review: Review[];
}
interface IMGS {
  id: string;
  imageUrl: string;
  type: string;
}
export interface User {
  id: string;
  username: string;
  email: string;
  cpf: string;
  phone: string;
  birthdate: string;
  bio: string;
  isAdvertiser: false;
  isAdm: true;
  address: {
    id: string;
    cep: string;
    state: string;
    city: string;
    street: string;
    number: number;
    complement: string;
  };
}
export interface Review {
  id: string;
  text: string;
  createDate: string;
}

export const AnnouncementsContext = createContext({});

export const AnnouncementsProvider = ({ children }: any) => {
  const [cars, setCars] = useState<IVehicle[]>([]);
  const [motocycles, setMotorcycles] = useState<IVehicle[]>([]);
  const [auctions, setAuctions] = useState<IVehicle[]>([]);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const { data } = await api.get("/advertisements/");
        setMotorcycles(
          data.results.filter(
            (motocycle: IVehicle) =>
              motocycle.vehicleType.toLocaleLowerCase() !== "car"
              && motocycle.announcementType === "SALE" && motocycle.published === true
          )
        );
        setCars(
          data.results.filter(
            (car: IVehicle) => car.vehicleType.toLocaleLowerCase() === "car"
              && car.announcementType === "SALE" && car.published === true
          )
        );
        setAuctions(
          data.results.filter(
            (car: IVehicle) => car.announcementType === 'AUCTION' && car.published === true
          )
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchAdvertisements();
  }, []);

  return (
    <AnnouncementsContext.Provider value={{ cars, motocycles, auctions }}>
      {children}
    </AnnouncementsContext.Provider>
  );
};
