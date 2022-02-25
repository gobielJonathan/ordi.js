import { AppComponentType } from "beyond/core";

const Food: AppComponentType = () => {
  return <h3>Food</h3>;
};

Food.getServerSideProps = async () => {
  return {
    props: {
      data: 1,
    },
  };
};

export default Food;
