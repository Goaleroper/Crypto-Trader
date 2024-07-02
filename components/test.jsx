import { Formik, Form, useField } from "formik";
import { useRef } from "react";
import * as Yup from "yup";

export default function App() {
  const initialValues = {
    files: ""
  };
  const fileRef = useRef(null);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        files: Yup.mixed()
          .test("is-file-too-big", "File exceeds 10MB", () => {
            let valid = true;
            const files = fileRef?.current?.files;
            if (files) {
              const fileArr = Array.from(files);
              fileArr.forEach((file) => {
                const size = file.size / 1024 / 1024;
                if (size > 10) {
                  valid = false;
                }
              });
            }
            return valid;
          })
          .test(
            "is-file-of-correct-type",
            "File is not of supported type",
            () => {
              let valid = true;
              const files = fileRef?.current?.files;
              if (files) {
                const fileArr = Array.from(files);
                fileArr.forEach((file) => {
                  const type = file.type.split("/")[1];
                  const validTypes = [
                    "zip",
                    "xml",
                    "xhtml+xml",
                    "plain",
                    "svg+xml",
                    "rtf",
                    "pdf",
                    "jpeg",
                    "png",
                    "jpg",
                    "ogg",
                    "json",
                    "html",
                    "gif",
                    "csv"
                  ];
                  if (!validTypes.includes(type)) {
                    valid = false;
                  }
                });
              }
              return valid;
            }
          )
      })}
      onSubmit={(values) => {
        console.log("form values", values);
        console.log("all selected files", fileRef.current.files);
      }}
    >
      <Form>
        <FileUpload name="files" fileRef={fileRef} />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}

const FileUpload = ({ fileRef, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor="files">Choose files</label>{" "}
      <input ref={fileRef} multiple={true} type="file" {...field} />
      {meta.touched && meta.error ? (
        <div style={{ color: "red" }}>{meta.error}</div>
      ) : null}
    </div>
  );
};
