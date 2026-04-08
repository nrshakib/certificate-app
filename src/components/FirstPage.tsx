import React from "react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import type { RlpCertificateData } from "../lib/types";
import { CERTIFICATE_TYPE_LABELS, formatGrade } from "../lib/types";

interface FirstPageProps {
  data: RlpCertificateData;
}

const FirstPage: React.FC<FirstPageProps> = ({ data }) => {
  const {
    trainee,
    school,
    theoryGrades,
    schoolYearFrom,
    schoolYearTo,
    trainingYear,
    certificateType,
  } = data;

  const theoryKbs = [
    {
      num: "I",
      key: 1,
      desc: "Pflegeprozesse und Pflegediagnostik in akuten und dauerhaften\nPflegesituationen verantwortlich planen, organisieren, gestalten, durchführen, steuern und evaluieren",
    },
    {
      num: "II",
      key: 2,
      desc: "Kommunikation und Beratung personen- und situationsbezogen gestalten",
    },
    {
      num: "III",
      key: 3,
      desc: "Intra- und interprofessionelles Handeln in unterschiedlichen systemischen Kontexten verantwortlich gestalten und mitgestalten",
    },
    {
      num: "IV",
      key: 4,
      desc: "Das eigene Handeln auf der Grundlage von Gesetzen, Verordnungen und ethischen Leitlinien reflektieren und begründen",
    },
    {
      num: "V",
      key: 5,
      desc: "Das eigene Handeln auf der Grundlage von wissenschaftlichen Erkenntnissen und berufsethischen Werthaltungen und Einstellungen reflektieren und begründen",
    },
  ];

  // const traineeName = `${trainee.firstName || ""} ${trainee.lastName || ""}`
  //   .trim()
  //   .toLocaleLowerCase();
  const traineeAddress = [trainee.street, trainee.postalCode, trainee.city]
    .filter(Boolean)
    .join(", ");
  const schoolName = school.name || "Lernwerkstatt-Pflege GmbH";

  const cellStyle: React.CSSProperties = {
    borderTop: "0.4pt solid #000",
    borderLeft: "0.4pt solid #000",
    borderRight: "none",
    borderBottom: "none",
    paddingTop: "0px",
    paddingBottom: "10px",
    paddingLeft: "5px",
    paddingRight: "0px",
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: "1.1",
    fontSize: "12px",
    boxSizing: "border-box",
  };

  // const addFont: React.CSSProperties = {
  //   fontFamily: '"Times New Roman", Times, serif',
  // };

  return (
    <div
      style={{
        // fontFamily: '"Georgia", serif',
        fontSize: "12px",
        letterSpacing: "0.6px",
        // lineHeight: "1.3",
        color: "#000",
      }}
    >
      {/* Header */}
      <section
        style={{
          backgroundColor: "#E5E7EB",
          padding: "20px 50px",
          marginBottom: "2px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          minHeight: "75px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold", fontSize: "14px" }}>
            {schoolName}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              fontFamily: '"Inter", sans-serif',
            }}
          >
            {school.street || "Liebigstraße 14-16"}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              fontFamily: '"Inter", sans-serif',
            }}
          >
            {school.postalCode || "35390"} {school.city || "Giessen"}
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <img
            src="/Certificate_logo.png"
            alt="Logo"
            style={{ width: "130px", height: "60px", objectFit: "contain" }}
          />
        </div>
      </section>

      {/* Title */}
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          letterSpacing: "0.05em",
          marginBottom: "30px",
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        {CERTIFICATE_TYPE_LABELS[certificateType].toUpperCase()}
      </div>

      {/* Trainee Info */}
      <section style={{ margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            width: "60%",
            alignItems: "center",
            justifyItems: "center",
            gap: "2px",
            margin: "0 auto",
            marginLeft: "32%",
          }}
        >
          {/* Key */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "40%",
              justifyContent: "center",
              marginBottom: "6px",
              gap: "8px",
              fontSize: "12px",
            }}
          >
            <span
              style={{
                width: "120px",
                textAlign: "right",
                // marginRight: "10px",
                letterSpacing: "1px",
              }}
            >
              Vor-/ Zuname
            </span>{" "}
            <span
              style={{
                width: "120px",
                textAlign: "right",
                // marginRight: "10px",
                letterSpacing: "1px",
              }}
            >
              Geburtstag
            </span>{" "}
            <span
              style={{
                width: "120px",
                textAlign: "right",
                // marginRight: "10px",
                letterSpacing: "1px",
              }}
            >
              Anschrift
            </span>
          </div>

          {/* value */}
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              justifyContent: "center",
              marginBottom: "10px",
              gap: "10px",
              fontSize: "12px",
            }}
          >
            <span
              style={{
                width: "35%",
                textAlign: "left",
                textDecoration: "underline",
                textUnderlineOffset: "8px",
                fontFamily: "'Inter', sans-serif",
                lineHeight: "2",
                fontWeight: "500",
              }}
            >
              trainee trainsee
            </span>
            <span
              style={{
                width: "25%",
                textAlign: "left",
                textDecoration: "underline",
                textUnderlineOffset: "8px",
                fontFamily: "'Inter', sans-serif",
                lineHeight: "2",
              }}
            >
              {trainee.dateOfBirth
                ? format(new Date(trainee.dateOfBirth), "yyyy-MM-dd", {
                    locale: de,
                  })
                : ""}
            </span>
            <span
              style={{
                width: "70%",
                textAlign: "left",
                textDecoration: "underline",
                textUnderlineOffset: "8px",
                fontFamily: "'Inter', sans-serif",
                lineHeight: "2",
              }}
            >
              {traineeAddress}
            </span>
          </div>
        </div>
        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "6px",
            gap: "12px",
            fontSize: "12px",
          }}
        ></div> */}
        <p
          style={{
            marginTop: "18px",
            lineHeight: "1.2",
            textAlign: "left",
            fontSize: "12px",
            fontFamily: '"Inter", serif',
          }}
        >
          Hat im Schuljahr{" "}
          <b>
            {schoolYearFrom && schoolYearTo
              ? `${format(schoolYearFrom, "dd.MM.yyyy")} bis ${format(
                  schoolYearTo,
                  "dd.MM.yyyy",
                )}`
              : ""}
          </b>{" "}
          das {trainingYear}. Ausbildungsjahr an der o.a. Pflegeschule besucht.
        </p>
        <p
          style={{
            marginTop: "4px",
            marginBottom: "10px",
            textAlign: "left",
            fontSize: "12px",
            fontFamily: '"Arial", sans-serif',
          }}
        >
          Die Leistungen in den einzelnen Ausbildungsbereichen werden wie folgt
          beurteilt:
        </p>
      </section>

      {/* Theory Table */}
      <section>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "12px",
            textAlign: "center",
            padding: "4px 0 ",
            backgroundColor: "#DBEAFE",
            margin: 0,
          }}
        >
          Theoretischer und praktischer Unterricht
        </p>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            tableLayout: "fixed",
          }}
        >
          <thead style={{ backgroundColor: "#DBEAFE" }}>
            <tr>
              <th
                style={{
                  ...cellStyle,
                  fontSize: "12px",
                  width: "41%",
                  textAlign: "left",
                  paddingLeft: "32px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                }}
              >
                Kompetenzbereich
              </th>
              <th
                style={{
                  ...cellStyle,
                  fontSize: "12px",
                  width: "14.3%",
                  textAlign: "left",
                  paddingLeft: "5px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                }}
              >
                Note
              </th>
              <th
                style={{
                  ...cellStyle,
                  fontSize: "12px",
                  width: "14.3%",
                  textAlign: "left",
                  paddingLeft: "5px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                }}
              >
                Faktor
              </th>
              <th
                style={{
                  ...cellStyle,
                  fontSize: "12px",
                  width: "14.3%",
                  textAlign: "left",
                  paddingLeft: "5px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                }}
              >
                Ʃ-Wert¹
              </th>
              <th
                style={{
                  ...cellStyle,
                  fontSize: "12px",
                  width: "15%",
                  borderRight: "0.5pt solid #000",
                  textAlign: "left",
                  paddingLeft: "5px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                }}
              >
                Gesamt-Ʃ²
              </th>
            </tr>
          </thead>
          <tbody>
            {theoryKbs.map((kb, index) => {
              const kbData = theoryGrades.kbGrades[kb.key];
              const isLastRow = index === theoryKbs.length - 1;
              const bottomBorder = isLastRow ? "0.5pt solid #000" : "none";

              return (
                <tr key={kb.key}>
                  <td
                    style={{
                      ...cellStyle,
                      borderBottom: bottomBorder,
                      textAlign: "left",
                      padding: 0,
                      height: "100%",
                    }}
                  >
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        height: "100%",
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            style={{
                              width: "30px",
                              borderRight: "0.5pt solid #000",
                              textAlign: "center",
                              verticalAlign: "middle",
                              padding: "1px 0 4px",
                            }}
                          >
                            {kb.num}.
                          </td>
                          <td
                            style={{
                              padding: "6px 4px",
                              fontSize: "13px",
                              fontFamily: "Inter, sans-serif",
                              height: "100%",
                              lineHeight: "1.3",
                              display: "flex",
                              alignItems: "center", // ✅ perfect vertical centering
                            }}
                          >
                            {kb.desc}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>

                  <td
                    style={{
                      ...cellStyle,
                      fontSize: "13px",
                      fontFamily: "Inter, sans-serif",
                      borderBottom: bottomBorder,
                    }}
                  >
                    {kbData?.grade !== null ? formatGrade(kbData.grade) : ""}
                  </td>
                  <td
                    style={{
                      ...cellStyle,
                      fontSize: "13px",
                      fontFamily: "Inter, sans-serif",
                      borderBottom: bottomBorder,
                    }}
                  >
                    {kbData?.factor !== null ? kbData.factor.toFixed(1) : ""}
                  </td>
                  <td
                    style={{
                      ...cellStyle,
                      fontSize: "13px",
                      fontFamily: "Inter, sans-serif",
                      borderBottom: bottomBorder,
                    }}
                  >
                    {kbData?.weightedValue !== null
                      ? kbData.weightedValue!.toFixed(2)
                      : ""}
                  </td>

                  {index === 0 && (
                    <td
                      rowSpan={theoryKbs.length}
                      style={{
                        ...cellStyle,
                        fontSize: "13px",
                        verticalAlign: "middle",
                        fontFamily: "Inter, sans-serif",
                        borderRight: "0.5pt solid #000",
                        borderBottom: "0.5pt solid #000",
                        height: "100%",
                      }}
                    >
                      {theoryGrades.totalWeightedSum?.toFixed(2) || ""}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div
          style={{
            marginTop: "8px",
            fontSize: "12px",
            textAlign: "left",
            fontFamily: '"Inter", sans-serif',
          }}
        >
          <p style={{ margin: "2px 0" }}>
            ¹ Note und Faktor müssen multipliziert werden, daraus ergibt sich
            der Ʃ Wert.
          </p>
          <p style={{ margin: "2px 0" }}>
            ² Alle Ʃ Wert von I-V. müssen addiert werden, daraus ergibt sich die
            Gesamt-Ʃ.
          </p>
        </div>
      </section>

      {/* Summary Table */}
      <section style={{ marginTop: "16px" }}>
        <table
          style={{
            width: "45%",
            marginLeft: "55%",
            borderCollapse: "collapse",
          }}
        >
          <thead style={{ backgroundColor: "#DBEAFE" }}>
            <tr>
              <th
                style={{
                  ...cellStyle,
                  fontSize: "13px",
                  width: "45%",
                  padding: "5px 0",
                }}
              >
                Übertragene Gesamt-Ʃ
              </th>
              <th
                style={{
                  ...cellStyle,
                  fontSize: "13px",
                  width: "auto",
                  whiteSpace: "nowrap",
                  paddingRight: "5px",
                  paddingLeft: "5px",
                }}
              >
                Division
              </th>
              <th
                style={{
                  ...cellStyle,
                  fontSize: "13px",
                  borderRight: "0.5pt solid #000",
                  width: "50%",
                  padding: "5px 0",
                }}
              >
                Gesamtnote für den schulischen Unterricht
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  ...cellStyle,
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  borderBottom: "0.5pt solid #000",
                  padding: "6px 4px",
                }}
              >
                {theoryGrades.totalWeightedSum?.toFixed(2) || ""}
              </td>
              <td
                style={{
                  ...cellStyle,
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  borderBottom: "0.5pt solid #000",
                  padding: "6px 4px",
                }}
              >
                {theoryGrades.factorSum?.toFixed(1) || ""}
              </td>
              <td
                style={{
                  ...cellStyle,
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  fontWeight: "bold",
                  borderBottom: "0.5pt solid #000",
                  borderRight: "0.5pt solid #000",
                  padding: "6px 4px",
                }}
              >
                {theoryGrades.overallGrade !== null
                  ? formatGrade(theoryGrades.overallGrade)
                  : ""}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <footer style={{ marginTop: "110px" }}>
        <p
          style={{
            fontSize: "10px",
            fontFamily: "Arial, Helvetica, sans-serif;",
            textAlign: "left",
          }}
        >
          * Bei den Kompetenzbereichen und Einsatzbereichen, die in diesem Jahr
          nicht unterrichtet bzw. absolviert wurden, stehen keine Noten.
        </p>
      </footer>
    </div>
  );
};

export default FirstPage;
