import { Stack } from "@mui/material";
import { HomePageLink } from "./HomePageLink";
import { Terapeutti } from "@/types";
import { Therapist } from "@prisma/client";

export function HomepageCell({ therapist }: { therapist: Therapist }) {
  return <>{therapist.homePage && <HomePageLink url={therapist.homePage} />}</>;
}
