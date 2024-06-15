import Translate from "@girishsawant999/react-translate-with-google-api";

const Paragraph = ({component}) => {
  return (
    <Translate language="fr" className="font-bold" style={{ color: "red" }}>
      {component}
    </Translate>
  );
};

export default Paragraph;
