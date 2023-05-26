import { TravelerForm, TravelerFormProps } from "../../UI/TravelerForm";
import { Result, Typography, notification } from "antd";
import { useQueryInfos } from "./hooks/useQueryInfos";
import style from "./style.module.scss";
import { buildTravelerFormOutput } from "../../../services/builders/traveler-form";
import { createTravelerForm } from "../../../services/http-requests/traveler-form/create";
import { useState } from "react";

export function TravelerFormPage() {
  const { checkInDate, checkOutDate, nbTravelers } = useQueryInfos();
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const handleFinish: TravelerFormProps["onFinish"] = (travelerForm) => {
    const data = buildTravelerFormOutput(travelerForm);

    createTravelerForm(data)
      .then(() => setIsFinished(true))
      .catch(() => {
        notification.error({
          message: "Oops, something went wrong",
          description: "Please retry later",
        });
      });
  };

  if (isFinished) {
    return (
      <Result
        status="success"
        title="Check in complete"
        subTitle="Thanks for sumbitting"
      />
    );
  }

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
