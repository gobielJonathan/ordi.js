import { AppComponentType } from "ordi/core";
import { useHistory } from "ordi/route";

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
