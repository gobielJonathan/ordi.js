import { AppComponentType } from "ordijs/core";
import { useHistory } from "ordijs/route";

const Person: AppComponentType = () => {
  const history = useHistory();

  return (
    <>
      <h3>person</h3>
      <button onClick={history.goBack}>back</button>
    </>
  );
};

Person.getServerSideProps = async () => {
  return {
    props: {
      data: 1,
    },
  };
};

export default Person;
