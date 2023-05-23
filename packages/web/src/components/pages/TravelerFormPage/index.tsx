import { TravelerForm, TravelerFormProps } from "../../UI/TravelerForm";
import { Typography } from "antd";
import { useQueryInfos } from "./hooks/useQueryInfos";
import style from "./style.module.scss";
import { buildTravelerFormOutput } from "../../../services/builders/traveler-form";

export function TravelerFormPage() {
  const { checkInDate, checkOutDate, nbTravelers } = useQueryInfos();

  const handleFinish: TravelerFormProps["onFinish"] = (travelerForm) => {
    const data = buildTravelerFormOutput(travelerForm);

    console.log("data1", data);
  };

  return (
    <div className={style.container}>
      <Typography.Title level={1}>Police form</Typography.Title>

      <Typography.Paragraph>
        This registration form must be completed pursuant the article R. 611-42
        of Code of Entry and Stay of Aliens and of the Right of Asylum.
      </Typography.Paragraph>

      <Typography.Paragraph italic>
        Thank you to register all travelers, children included.
      </Typography.Paragraph>

      <TravelerForm
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        nbTravelers={nbTravelers}
        onFinish={handleFinish}
      />
    </div>
  );
}
