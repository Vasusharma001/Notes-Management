import Notes from "./Notes";

const Home = (props) => {
  return (
    <>
      <Notes mode={props.mode}  showAlert={props.showAlert} />
    </>
  );
};

export default Home;
