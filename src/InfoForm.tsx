import { setSpec, spec } from "./specStore";
import TextField from "./TextField";

const InfoForm = () => {
  return (
    <form>
      <TextField
        id="title"
        label="Title"
        value={spec.info.title}
        onInput={(e) => setSpec("info", "title", e.currentTarget.value)}
      />

      <TextField
        id="contactEmail"
        label="Contact email"
        value={spec.info.contact?.email ?? ""}
        onInput={(e) =>
          setSpec("info", "contact", "email", e.currentTarget.value)
        }
      />
    </form>
  );
};

export default InfoForm;
