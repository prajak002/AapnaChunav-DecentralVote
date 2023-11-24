import React, { useState, useEffect } from "react";
import "./Fund.css";
import {
  ELECTION_CONTRACT_ADDRESS,
  ELECTION_CONTRACT_ABI,
} from "../../utils/constance";
import Web3 from "web3";
import {setDoners} from "../../reducer/electionSlice"
import { useDispatch, useSelector } from "react-redux";
import DonationHistory from "./DonationHistory";

const FundDonate = ({allCurrentCandidates, allVoters, allCurrentdoners}) => {
    const dispatch = useDispatch();
  const [account, setAccount] = useState("");
  const [web3, setWeb3] = useState(null);
  const [electionInstance, setElectionInstance] = useState(null);
  const {isRegistredVoter}=useSelector(state=>state.electionSlice);
  console.log(isRegistredVoter);

  // console.log(candidates)
  const [formData, setFormData] = useState({
    candidate: "null",
    amount: "",
  });

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

        // console.log(electionInstance);

         const getDonationDetails123 = async ()  => {
        const temp=await electionInstance.methods.getDonationDetails().call();
        dispatch(setDoners(temp));
        // console.log(temp,"Donation Successful");
    }
    getDonationDetails123();
      } catch (error) {
        console.log(error);
      }
    } else {
      window.alert("Please install MetaMask");
    }
  };

  useEffect(() => {

    loadWeb3();
   
  }, [account]);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    if (formData.candidate === "null") {
      alert("Please select a candidate");
      return;
    }
    if (formData.amount === "" || formData.amount === "0") {
      alert("Please enter valid amount");
      return;
    }
    const weiAmount = web3.utils.toWei(formData.amount, "ether");
    // console.log(weiAmount);
    const candidateId = Number(formData.candidate);
    await electionInstance.methods.donate(weiAmount, candidateId).send({
      from: account,
      value: weiAmount,
    });
   
    // dispatch(setDoners(AllDonation));
    alert("Donation Successful");
  };
  

  // console.log(allCurrentCandidates, allVoters, allCurrentdoners);
  return (
    <>
    
    <div className="px-2 py-4 bg-[#ebebeb] shadow-2xl mx-auto w-1/2 rounded-lg">
      <h2 className="text-center font-bold text-[#353C41] text-3xl mb-5">
        Donate to a Candidate
      </h2>
      <form
        className="border-[1px] border-[#1B7FAA] p-4"
        onSubmit={handleDonationSubmit}
      >
        <div className="flex flex-col border-[1px]   my-2 rounded-lg">
          <label className="mb-2" for="candidate">
            Choose a Candidate
          </label>
          <select
            name="candidate"
            id="candidate"
            className="p-2 bg-[#fff] rounded-lg shadow-md outline-none"
            onChange={handleFormChange}
          >
            <option value="null">Select a Candidate</option>
            {allCurrentCandidates.map((candidate, index) => (
              <option value={candidate.candidateId} key={index}>
                {candidate.header}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col border-[1px] rounded-lg">
          <label for="amount">Amount</label>
          <input
            type="text"
            name="amount"
            id="amount"
            className="p-2 rounded-lg shadow-md outline-none"
            onChange={handleFormChange}
          />
          <span className="text-[#fb6d6d] text-[10px]">
            *Amount must be (0.0000001 to 5 ethereum)
          </span>
        </div>

        <button
        disabled={!isRegistredVoter.isRegistered}
          type="submit"
          className="w-full text-center rounded font-bold text-[#fff] py-[1px] hover:text-[#dbdbdb] hover:bg-[#176485] mt-4 bg-[#1B7FAA] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Donate
        </button>
      </form>
    </div>
    <hr/>
    <DonationHistory currentVoter={account} allCurrentCandidates={allCurrentCandidates} allVoters={allVoters} allCurrentdoners={allCurrentdoners}/>
    </>
  );
};

export default FundDonate;