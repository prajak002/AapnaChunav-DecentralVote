import React, { useState, useEffect } from "react";
import { Container } from "../Voting/styles";
import { Link } from "react-router-dom";

import Navbar from "../../components/NavBar/Navbar";
import NavbarAdmin from "../../components/NavBar/NavbarAdmin";
import NotInit from "../../components/NotInit";
import Loader from "../../components/Loader/Loader";
import Web3 from "web3";
import {
  ELECTION_CONTRACT_ADDRESS,
  ELECTION_CONTRACT_ABI,
} from "../../utils/constance";
import axios from "axios";
import FundGraph from "./FundGraph";
import FundDonate from "./FundDonate";
import { useDispatch, useSelector } from "react-redux";
import { setAddCandidate, setFunds, setHome, setRegisters, setResult, setVerify, setVoting } from "../../reducer/checkSlice";
import { setAllRegisteredCanidates, setAllRegisteredVoters, setDoners } from "../../reducer/electionSlice";


const Funds = () => {

  const dispatch=useDispatch();
  const[allCurrentdoners,setAllCurrentdoners]=useState([]);
  const[allCurrentVoters,setAllCurrentVoters]=useState([]);
  const[allCurrentCandidates,setAllCurrentCandidates]=useState([]);


  const [ElectionInstance, setElectionInstance] = useState(undefined);
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [candidateCount, setCandidateCount] = useState(undefined);
  const [candidates, setCandidates] = useState([]);
  const [isElStarted, setIsElStarted] = useState(false);
  const [isElEnded, setIsElEnded] = useState(false);
  const [currentVoter, setCurrentVoter] = useState({
    address: undefined,
    name: null,
    phone: null,
    hasVoted: false,
    isVerified: false,
    isRegistered: false,
  });
  const {doners} = useSelector(state => state.electionSlice);
  // console.log(doners)
  useEffect(() => {
    dispatch(setVerify(false));
    dispatch(setAddCandidate(false));
    dispatch(setVoting(false));
    dispatch(setFunds(true));
    dispatch(setResult(false));
    dispatch(setRegisters(false));
    dispatch(setHome(false));
  },[]);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);
        let acc = accounts[0];
        setWeb3(web3);
        const electionInstance = new web3.eth.Contract(
          ELECTION_CONTRACT_ABI,
          ELECTION_CONTRACT_ADDRESS
        );

        setElectionInstance(electionInstance);
        const candidateCount = await electionInstance.methods
          .getTotalCandidate()
          .call();
        setCandidateCount(candidateCount);

        const admin = await electionInstance.methods.admin().call();
        if (admin === acc) {
          setIsAdmin(true);
        }
        // console.log(admin);
        // console.log(acc);
        const candidate = await electionInstance.methods
          .getAllCandidates()
          .call();
        setCandidates(candidate);
        // console.log(candidate);

        const isStarted = await electionInstance.methods.getStart().call();
        setIsElStarted(isStarted);
        const isEnded = await electionInstance.methods.getEnd().call();
        setIsElEnded(isEnded);

        // console.log(isStarted);
        // console.log(isEnded);

        const voter = await electionInstance.methods
          .getVoterDetails(acc)
          .call({ from: acc });
        // console.log(voter);
        setCurrentVoter({
          address: voter["voterAddress"],
          name: voter["name"],
          phone: voter["phone"],
          hasVoted: voter["hasVoted"],
          isVerified: voter["isVerified"],
          isRegistered: voter["isRegistered"],
        });


        const allVoter = await electionInstance.methods.getAllVoters().call();
        // setVoters(allVoter);
        // dispatch(setAllRegisteredVoters(allVoter));
        setAllCurrentVoters(allVoter);
        

        const Allcandidates = await electionInstance.methods.getAllCandidates().call();
        // dispatch(setAllRegisteredCanidates(Allcandidates));
        setAllCurrentCandidates(Allcandidates);
        
        const AllDonations=await electionInstance.methods.getDonationDetails().call();
        // dispatch(setDoners(AllDonations));
        setAllCurrentdoners(AllDonations);
        // console.log(allVoter);
        // console.log(Allcandidates)
        // console.log(AllDonations)

      } catch (error) {
        console.log(error);
      }
    } else {
      window.alert("Please install MetaMask");
    }
  };

  useEffect(() => {
    loadWeb3();
  }, []);

  if (!web3) {
    return (
      <Container>
        {isAdmin ? <NavbarAdmin /> : <Navbar />}
        <center>Loading Web3, accounts, and contract...</center>
        <Loader />
      </Container>
    );
  }

  const castVote = async (id) => {
    await ElectionInstance.methods
      .vote(id)
      .send({ from: account })
      .once("receipt", (receipt) => {
        console.log(receipt);
        window.alert("Vote casted successfully.");
      });
    await axios
      .post("http://128.199.16.111/send", {
        number: "+91" + currentVoter.phone,
        message:
          "You have successfully casted your vote for " +
          currentVoter.name +
          ".",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        window.location.reload();
      });
    window.location.reload();
  };
  const confirmVote = (id, header) => {
    var r = window.confirm(
      "Vote for " + header + " with Id " + id + ".\nAre you sure?"
    );
    if (r === true) {
      castVote(id);
    }
  };


  return (
    <Container>
      {isAdmin ? <NavbarAdmin /> : <Navbar />}
      {(!isElStarted && !isElEnded) ? (
        <NotInit />
      ) : //check if it is started and not ended
      isElStarted && !isElEnded ? (
        <>
          {
          currentVoter.isRegistered ? (
            !currentVoter.isVerified && (
              <div className="verify">
                <p>Please wait for admin to verify.</p>
                <p>You will get a sms once verified.</p>
              </div>
            )
          ) : (
            <div className="container-item attention">
              
                   
                { 
                !isAdmin ?
                  (<center>
                  <span className="p-2 rounded-lg bg-[#f2c8c8] block text-[#424242] w-full">You're not registered. Please register first.</span> 
                  <br />
                  <span>Visit Registration Page.{" "}
                      <Link
                      to="/Registration"
                      className="text-2xl text-[#65aded] hover:underline"
                      >
                      Click here
                      </Link>
                  </span>
                </center>) : (
                  <div className="bg-[#6bf5c0] rounded p-2">
                    <h1 className="text-center text-5xl text-[#4e4e4e]">Welcome Admin</h1>
                  </div>
                )
                }
            </div>
          )
          }

          <div className="voting-can mt-8">
            {candidates.length < 1 ? (
              <div className="container-item attention">
                <center>No Candidate to show.</center>
              </div>
            ) : (
                isAdmin ? <FundGraph allCurrentCandidates={allCurrentCandidates} allVoters={allCurrentVoters} allCurrentdoners={allCurrentdoners}/> : <FundDonate allCurrentCandidates={allCurrentCandidates} allVoters={allCurrentVoters} allCurrentdoners={allCurrentdoners}/>
            )
            }
          </div>
        </>
      ) : (
        //check if it is ended
        isElEnded && (
          <div
            className="container-item attention"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <center>
              <h3
                style={{
                  margin: "0",
                  padding: "0",
                  fontSize: "2.5rem",
                }}
              >
                The Election ended.
              </h3>
              <br />
              <Link
                to="/Result"
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "black",
                  padding: "10px",
                  borderRadius: "10px",
                  textDecoration: "none",
                }}
              >
                See results
              </Link>
            </center>
          </div>
        )
      )}
    </Container>
  )
}

export default Funds
