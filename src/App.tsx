import React from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import DepositETH from "./components/DepositETH";
import MembersList from "./components/MembersList";
import NavBar from "./components/Navbar";
import DisplayProposals from "./components/DisplayProposals";
import useGetDaos from "./hooks/useGetDaos";

function App() {
  const { daos, loading, error } = useGetDaos();
  console.log({ daos, loading, error });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <NavBar />
      <Container className="text-center" style={{ paddingTop: "2%" }}>
        <h1>ParksDAO🌳</h1>
        <DepositETH />
        <MembersList />
        <DisplayProposals />
      </Container>
    </>
  );
}

export default App;
