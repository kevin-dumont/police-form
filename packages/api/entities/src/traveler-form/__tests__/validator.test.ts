import { ZodError } from "zod";
import { validateTravelerForm } from "../validator";

describe("validateTravelerForm", () => {
  it("should return success true for a valid payload", () => {
    const res = validateTravelerForm({
      checkInDate: "2023-05-09T22:00:00.000Z",
      checkOutDate: "2023-05-08T22:00:00.000Z",
      travelers: [
        {
          firstname: "Kévin",
          lastname: "DUMONT",
          address: "55 avenue de Juvisyy",
          phone: "0762064374",
          email: "k.dumont1994@gmail.com",
          placeOfBirth: "dsqdqsd",
          nationality: "AQ",
          signature:
            "data:image/png;base64,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",
          dateOfBirth: "1992-02-03T23:00:00.000Z",
        },
      ],
    });

    expect(res).toEqual({
      data: {
        checkInDate: "2023-05-09T22:00:00.000Z",
        checkOutDate: "2023-05-08T22:00:00.000Z",
        travelers: [
          {
            address: "55 avenue de Juvisyy",
            dateOfBirth: "1992-02-03T23:00:00.000Z",
            email: "k.dumont1994@gmail.com",
            firstname: "Kévin",
            lastname: "DUMONT",
            nationality: "AQ",
            phone: "0762064374",
            placeOfBirth: "dsqdqsd",
            signature:
              "data:image/png;base64,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",
          },
        ],
      },
      success: true,
    });
  });

  it("should return success false for an invalid payload", () => {
    const res = validateTravelerForm({} as any);

    expect(res).toEqual({
      error: expect.any(ZodError),
      success: false,
    });
  });
});