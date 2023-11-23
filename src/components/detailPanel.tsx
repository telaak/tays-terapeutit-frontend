import { Terapeutti } from "@/types";
import { MRT_Row } from "material-react-table";
import { DetailBox } from "./detailBox";
import { Grid } from "@mui/material";
import { ExtraInfoAccordion } from "./ExtraInfoAccordion";

export function DetailPanel({ row }: { row: MRT_Row<Terapeutti> }) {
  const terapeutti = row.original;

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <ExtraInfoAccordion
          title="Paikkakunta"
          content={row.original.Paikkakunta}
        />
      </Grid>
      <Grid item xs={6}>
        <ExtraInfoAccordion
          title="Kohderyhmä"
          content={row.original.Kohderyhmä}
        />
      </Grid>
      <Grid item xs={6}>
        <ExtraInfoAccordion title="Kela" content={row.original.Kela} />
      </Grid>
      <Grid item xs={6}>
        <ExtraInfoAccordion title="Kieli" content={row.original.Kieli} />
      </Grid>
      <Grid item xs={6}>
        <ExtraInfoAccordion
          title="Kotisivut"
          content={row.original.Kotisivut}
        />
      </Grid>
      <Grid item xs={6}>
        <ExtraInfoAccordion title="Koulutus" content={row.original.Koulutus} />
      </Grid>
      <Grid item xs={6}>
        <ExtraInfoAccordion
          title="Lisätiedot"
          content={row.original.Lisätiedot}
        />
      </Grid>
      <Grid item xs={6}>
        <ExtraInfoAccordion
          title="Ajanvaraus"
          content={row.original.Ajanvaraus}
        />
      </Grid>
    </Grid>

    //   <div className="detail-container">
    //     <DetailBox
    //       title="Vastaanotot"
    //       content={terapeutti.Vastaanotot.join("\n")}
    //     />
    //     <DetailBox title="Ajanvaraus" content={terapeutti.Ajanvaraus} />
    //     <DetailBox title="Puhelin" content={terapeutti.Puhelin} />
    //     <DetailBox title="Sähköposti" content={terapeutti.Sähköposti} />
    //     <DetailBox title="Kieli" content={terapeutti.Kieli} />
    //     <DetailBox
    //       title="Kotisivut"
    //       link
    //       content={`${terapeutti.Kotisivut}`}
    //     />
    //     <DetailBox
    //       title="TAYS"
    //       link
    //       content={terapeutti.href as string}
    //     />
    //     <DetailBox title="Kela" content={terapeutti.Kela} />
    //     <DetailBox
    //       title="Kela lisätiedot"
    //       content={terapeutti.Kelalisätiedot}
    //     />
    //     <DetailBox title="Koulutus" content={terapeutti.Koulutus} />
    //     <DetailBox title="Lisätiedot" content={terapeutti.Lisätiedot} />
    //   </div>
    // <Grid container spacing={3}>
    //   <Grid item lg={2} md={4} sm={12}>
    //     <List>
    //       <ListItem disablePadding>
    //         <ListItemText
    //           secondary={terapeutti.Vastaanotot.join(", ")}
    //           primary="Vastaanotot"
    //         />
    //       </ListItem>
    //       <ListItem disablePadding>
    //         <ListItemText
    //           secondary={terapeutti.Ajanvaraus}
    //           primary="Ajanvaraus"
    //         />
    //       </ListItem>
    //     </List>
    //   </Grid>
    //   <Grid item lg={2} md={4} sm={12}>
    //     <List>
    //       <ListItem disablePadding>
    //         <ListItemText
    //           secondary={terapeutti.Puhelin}
    //           primary="Puhelinnumero"
    //         />
    //       </ListItem>
    //       <ListItem disablePadding>
    //         <ListItemText
    //           secondary={terapeutti.Sähköposti}
    //           primary="Sähköposti"
    //         />
    //       </ListItem>
    //     </List>
    //   </Grid>
    //   <Grid item lg={2} md={4} sm={12}>
    //     <List>
    //       <ListItem disablePadding>
    //         <ListItemText
    //           secondary={terapeutti.Koulutus}
    //           primary="Koulutus"
    //         />
    //       </ListItem>
    //       <ListItem disablePadding>
    //         <ListItemText
    //           secondary={terapeutti.Kieli}
    //           primary="Kieli"
    //         />
    //       </ListItem>
    //     </List>
    //   </Grid>
    //   <Grid item lg={2} md={4} sm={12}>
    //     <List>
    //       <ListItem disablePadding>
    //         <ListItemText secondary={terapeutti.Kela} primary="Kela" />
    //       </ListItem>
    //       <ListItem disablePadding>
    //         <ListItemText
    //           secondary={terapeutti.Kelalisätiedot}
    //           primary="Kela lisätiedot"
    //         />
    //       </ListItem>
    //     </List>
    //   </Grid>
    //   <Grid item lg={2} md={4} xs={12}>
    //     <List>
    //       <ListItem disablePadding>
    //         <ListItemText
    //           secondary={terapeutti.Lisätiedot}
    //           primary="Lisätiedot"
    //         />
    //       </ListItem>
    //       <ListItem disablePadding>
    //         <ListItemText
    //           secondary={terapeutti.Kotisivut}
    //           primary="Kotisivut"
    //         />
    //       </ListItem>
    //       <ListItem disablePadding>
    //         <ListItemText
    //           secondary={
    //             <a href={terapeutti.href}>{terapeutti.href}</a>
    //           }
    //           primary="TAYS-sivu"
    //         />
    //       </ListItem>
    //     </List>
    //   </Grid>
    // </Grid>
  );
}
