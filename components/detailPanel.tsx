import { Terapeutti } from "@/types";
import { MRT_Row } from "material-react-table";
import { DetailBox } from "./detailBox";

export function DetailPanel({row }: { row: MRT_Row<Terapeutti> }) {

    const terapeutti = row.original;
    return (
      <div className="detail-container">
        <DetailBox
          title="Vastaanotot"
          content={terapeutti.Vastaanotot.join("\n")}
        />
        <DetailBox title="Ajanvaraus" content={terapeutti.Ajanvaraus} />
        <DetailBox title="Puhelin" content={terapeutti.Puhelin} />
        <DetailBox title="Sähköposti" content={terapeutti.Sähköposti} />
        <DetailBox title="Kieli" content={terapeutti.Kieli} />
        <DetailBox
          title="Kotisivut"
          link
          content={`${terapeutti.Kotisivut}`}
        />
        <DetailBox
          title="TAYS"
          link
          content={terapeutti.href as string}
        />
        <DetailBox title="Kela" content={terapeutti.Kela} />
        <DetailBox
          title="Kela lisätiedot"
          content={terapeutti.Kelalisätiedot}
        />
        <DetailBox title="Koulutus" content={terapeutti.Koulutus} />
        <DetailBox title="Lisätiedot" content={terapeutti.Lisätiedot} />
      </div>
      // <Grid container spacing={3}>
      //   <Grid item lg={2} md={4} xs={6}>
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
      //   <Grid item lg={2} md={4} xs={6}>
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
      //   <Grid item lg={2} md={4} xs={6}>
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
      //   <Grid item lg={2} md={4} xs={6}>
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