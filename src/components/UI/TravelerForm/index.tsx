import moment from "moment";
import { Form, Input, Card, DatePicker, Row, Col, Button, Space } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import { SignatureField } from "../SignatureField";
import { CountrySelect } from "../CountrySelect";
import { TravelerFormData } from "./types";
import { placeOfBirthPlaceholder, travelersHas18years } from "./constants";

import style from "./style.module.scss";

export type TravelerFormProps = {
  onFinish?: (values: TravelerFormData) => void;
  checkInDate?: moment.Moment;
  checkOutDate?: moment.Moment;
  nbTravelers?: number;
};

export const TravelerForm = ({
  onFinish,
  checkInDate,
  checkOutDate,
  nbTravelers
}: TravelerFormProps) => {
  const [form] = Form.useForm<TravelerFormData>();

  const travelers = Form.useWatch("travelers", form);

  const initiamFormValue = {
    checkInDate,
    checkOutDate,
    travelers: nbTravelers
      ? Array.from({ length: nbTravelers }, () => ({}))
      : []
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      wrapperCol={{ span: 24, offset: 0 }}
      initialValues={initiamFormValue}
    >
      <Form.Item
        className={style.withBorderBottom}
        name={`checkInDate`}
        rules={[{ required: true, message: "Field required" }]}
      >
        <DatePicker
          bordered={false}
          placeholder="Check in date"
          style={{ width: "100%" }}
          size="small"
        />
      </Form.Item>

      <Form.Item
        className={style.withBorderBottom}
        name={`checkInDate`}
        rules={[{ required: true, message: "Field required" }]}
      >
        <DatePicker
          bordered={false}
          placeholder="Check out date"
          style={{ width: "100%" }}
          size="small"
        />
      </Form.Item>

      <Form.List name="travelers">
        {(fields, { add, remove }) => (
          <>
            <Row gutter={[16, 16]}>
              {fields.map(({ name, key, ...restField }, i) => (
                <Col lg={8} md={12} sm={12} xs={24} key={key}>
                  <Card
                    size="small"
                    title={`Traveler ${name + 1}`}
                    extra={
                      <Button
                        size="small"
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => remove(name)}
                      />
                    }
                  >
                    <Form.Item
                      {...restField}
                      className={style.withBorderBottom}
                      name={[name, `firstname`]}
                      rules={[{ required: true, message: "Field required" }]}
                    >
                      <Input
                        bordered={false}
                        placeholder="Prénom (Firstname)"
                        size="small"
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      className={style.withBorderBottom}
                      name={[name, `lastname`]}
                      rules={[{ required: true, message: "Field required" }]}
                    >
                      <Input
                        bordered={false}
                        placeholder="Nom (Lastname)"
                        size="small"
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      className={style.withBorderBottom}
                      name={[name, `nationality`]}
                      rules={[{ required: true, message: "Field required" }]}
                      wrapperCol={{ span: 24 }}
                    >
                      <CountrySelect />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      className={style.withBorderBottom}
                      name={[name, `dateOfBirth`]}
                      rules={[{ required: true, message: "Field required" }]}
                    >
                      <DatePicker
                        bordered={false}
                        placeholder="Date de naissance (Date of birth)"
                        style={{ width: "100%" }}
                        size="small"
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      className={style.withBorderBottom}
                      name={[name, `placeOfBirth`]}
                      rules={[{ required: true, message: "Field required" }]}
                    >
                      <Input.TextArea
                        size="small"
                        bordered={false}
                        placeholder={placeOfBirthPlaceholder}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      className={style.withBorderBottom}
                      name={[name, `address`]}
                      rules={[{ required: true, message: "Field required" }]}
                    >
                      <Input.TextArea
                        size="small"
                        bordered={false}
                        placeholder="Adresse du domicile complète (Full home address)"
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      className={style.withBorderBottom}
                      name={[name, `phone`]}
                      rules={[{ required: true, message: "Field required" }]}
                    >
                      <Input
                        bordered={false}
                        placeholder="Téléphone (Phone)"
                        size="small"
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      className={style.withBorderBottom}
                      name={[name, `email`]}
                      rules={[{ required: true, message: "Field required" }]}
                    >
                      <Input
                        bordered={false}
                        placeholder="Email"
                        size="small"
                      />
                    </Form.Item>
                    {travelersHas18years(travelers?.[i]) && (
                      <Form.Item
                        {...restField}
                        name={[name, `signature`]}
                        tooltip="Draw directly bellow"
                        label="Signature"
                        rules={[{ required: true, message: "Field required" }]}
                      >
                        <SignatureField />
                      </Form.Item>
                    )}
                  </Card>
                </Col>
              ))}
            </Row>
            <Space style={{ marginTop: 20 }}>
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add a traveler
                </Button>
              </Form.Item>

              <Form.Item>
                <Button htmlType="reset">Reset form</Button>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Space>
          </>
        )}
      </Form.List>
    </Form>
  );
};
