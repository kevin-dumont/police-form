import { TravelerForm } from "../../UI/TravelerForm";
import { Typography } from "antd";
import { useQueryInfos } from "./hooks/useQueryInfos";

export function TravelerFormPage() {
  const { checkInDate, checkOutDate, nbTravelers } = useQueryInfos();

  return (
    <>
      <Typography.Title level={1}>
        Fiche de police <Typography.Text italic>(Police form)</Typography.Text>
      </Typography.Title>

      <Typography.Paragraph>
        La présente fiche est à remplir en application de l'article R. 611-42 du
        code de l'entrée et du séjour des étrangers et du droit d'asile.
      </Typography.Paragraph>

      <Typography.Paragraph italic>
        This registration form must be completed pursuant the article R. 611-42
        of Code of Entry and Stay of Aliens and of the Right of Asylum.
      </Typography.Paragraph>

      <Typography.Paragraph color="red">
        Thank you to register all travelers, children included.
      </Typography.Paragraph>

      <TravelerForm
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        nbTravelers={nbTravelers}
      />
    </>
  );
}
