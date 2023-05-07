import { createRef } from "react";
import { Button } from "antd";
import SignatureCanvas from "react-signature-canvas";
import style from "./style.module.scss";

type SignatureFieldProps = {
  onChange?: (imgBase64: string | undefined) => void;
  value?: string | undefined;
};

export const SignatureField = ({ onChange, value }: SignatureFieldProps) => {
  const sigPadRef = createRef<SignatureCanvas>();

  const onClear = () => {
    sigPadRef.current?.clear();
  };

  const onEnd = () => {
    onChange?.(sigPadRef.current?.getTrimmedCanvas().toDataURL("image/png"));
  };

  return (
    <>
      <SignatureCanvas
        canvasProps={{
          height: 120,
          width: 250,
          className: style.sigCanvas
        }}
        onEnd={onEnd}
        ref={sigPadRef}
      />
      <Button onClick={onClear}>Clear</Button>
    </>
  );
};
