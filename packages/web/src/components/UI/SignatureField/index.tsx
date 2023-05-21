import { createRef, useCallback } from "react";
import { Button, Card } from "antd";
import SignatureCanvas from "react-signature-canvas";
import style from "./style.module.scss";
import { DeleteOutlined } from "@ant-design/icons";

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
    <Card
      title="Signature"
      extra={
        <Button
          size="small"
          onClick={onClear}
          type="primary"
          ghost
          icon={<DeleteOutlined />}
        >
          Clear
        </Button>
      }
      size="small"
    >
      <SignatureCanvas
        canvasProps={{
          height: 90,
          width: 230,
          className: style.sigCanvas,
        }}
        onEnd={onEnd}
        ref={sigPadRef}
      />
    </Card>
  );
};
