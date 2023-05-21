import { Form, Input, Card, DatePicker, Row, Col, Button, Space } from "antd";
import { PlusOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";

import { SignatureField } from "../SignatureField";
import { CountrySelect } from "../CountrySelect";

import { travelersHas18years } from "./constants";
import type { Dayjs } from "dayjs";
import type { TravelerForm as TraverlerFormType } from "./types";

export type TravelerFormProps = {
  onFinish?: (values: TraverlerFormType) => void;
  checkInDate?: Dayjs;
  checkOutDate?: Dayjs;
  nbTravelers?: number;
};

export const TravelerForm = ({
  onFinish,
  checkInDate,
  checkOutDate,
  nbTravelers,
}: TravelerFormProps) => {
  const [form] = Form.useForm<TraverlerFormType>();

  const travelers = Form.useWatch("travelers", form);

  const initiamFormValue = {
    checkInDate,
    checkOutDate,
    travelers: nbTravelers
      ? Array.from({ length: nbTravelers }, () => ({}))
      : [],
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      wrapperCol={{ span: 24, offset: 0 }}
      initialValues={initiamFormValue}
    >
      <Row gutter={[16, 16]}>
        <Col md={8} sm={12} xs={24}>
          <Form.Item
            name={`checkInDate`}
            rules={[{ required: true, message: "Field required" }]}
          >
            <DatePicker placeholder="Check in date" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col md={8} sm={12} xs={24}>
          <Form.Item
            name={`checkOutDate`}
            rules={[{ required: true, message: "Field required" }]}
          >
            <DatePicker
              placeholder="Check out date"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.List name="travelers">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ name, key, ...restField }, i) => (
              <Card
                key={key}
                title={
                  <Space>
                    <UserOutlined />
                    {travelers?.[i]?.firstname && travelers?.[i]?.lastname
                      ? `${travelers?.[i]?.firstname} ${travelers?.[i]?.lastname}`
                      : `Traveler ${i + 1}`}
                  </Space>
                }
                extra={<CloseOutlined onClick={() => remove(name)} />}
              >
                <Row gutter={[24, 0]}>
                  <Col span={18}>
                    <Row gutter={[24, 0]}>
                      <Col span={6}>
                        <Form.Item
                          {...restField}
                          name={[name, `firstname`]}
                          rules={[
                            { required: true, message: "Field required" },
                          ]}
                        >
                          <Input placeholder="Firstname" />
                        </Form.Item>
                      </Col>

                      <Col span={6}>
                        <Form.Item
                          {...restField}
                          name={[name, `lastname`]}
                          rules={[
                            { required: true, message: "Field required" },
                          ]}
                        >
                          <Input placeholder="Lastname" />
                        </Form.Item>
                      </Col>

                      <Col span={6}>
                        <Form.Item
                          {...restField}
                          name={[name, `nationality`]}
                          rules={[
                            { required: true, message: "Field required" },
                          ]}
                          wrapperCol={{ span: 24 }}
                        >
                          <CountrySelect />
                        </Form.Item>
                      </Col>

                      <Col span={6}>
                        <Form.Item
                          {...restField}
                          name={[name, `dateOfBirth`]}
                          rules={[
                            { required: true, message: "Field required" },
                          ]}
                        >
                          <DatePicker
                            placeholder="Date of birth"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, `placeOfBirth`]}
                          rules={[
                            { required: true, message: "Field required" },
                          ]}
                        >
                          <Input.TextArea placeholder="Place of birth (city, postal code, country)" />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, `address`]}
                          rules={[
                            { required: true, message: "Field required" },
                          ]}
                        >
                          <Input.TextArea placeholder="Full home address" />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, `phone`]}
                          rules={[
                            { required: true, message: "Field required" },
                          ]}
                        >
                          <Input placeholder="Phone" />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, `email`]}
                          rules={[
                            { required: true, message: "Field required" },
                          ]}
                        >
                          <Input placeholder="Email" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>

                  {travelersHas18years(travelers?.[i]) && (
                    <Col span={6}>
                      <Form.Item
                        {...restField}
                        name={[name, `signature`]}
                        tooltip="Draw directly bellow"
                        rules={[{ required: true, message: "Field required" }]}
                      >
                        <SignatureField />
                      </Form.Item>
                    </Col>
                  )}
                </Row>
              </Card>
            ))}

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
