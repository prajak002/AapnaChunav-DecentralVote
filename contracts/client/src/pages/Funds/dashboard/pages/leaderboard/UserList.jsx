import "./crd.css"
import "./userList.css";
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from "@material-ui/data-grid";
import { Container } from "./styles";
import Web3 from "web3";
// import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";

import Card from "../../components/cardcontainer/Card";
import Loader from "../../../../../components/Loader/Loader";
import { ELECTION_CONTRACT_ABI, ELECTION_CONTRACT_ADDRESS } from "../../../../../utils/constance";
import NavbarAdmin from "../../../../../components/NavBar/NavbarAdmin";
import NavBar from "../../../../../components/NavBar/Navbar";

export default function UserList() {
  const[allCurrentdoners,setAllCurrentdoners]=useState([]);
  const [data, setData] = useState([]);
  
  const [ElectionInstance, setElectionInstance] = useState(undefined);
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [candidateCount, setCandidateCount] = useState(undefined);
  const [candidates, setCandidates] = useState([]);
  const [isElStarted, setIsElStarted] = useState(false);
  const [isElEnded, setIsElEnded] = useState(false);
  const [winner, setWinner] = useState([]);

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

        const admin = await electionInstance.methods.admin().call();
        if (admin === acc) {
          setIsAdmin(true);
        }

        const isStarted = await electionInstance.methods.getStart().call();
        setIsElStarted(isStarted);
        const isEnded = await electionInstance.methods.getEnd().call();
        setIsElEnded(isEnded);
        const candidateCount = await electionInstance.methods
          .getTotalCandidate()
          .call();
        setCandidateCount(candidateCount);
        const candidate = await electionInstance.methods
          .getAllCandidates()
          .call();
        setCandidates(candidate);

        


        

       
        
        const AllDonations=await electionInstance.methods.getDonationDetails().call();
        // dispatch(setDoners(AllDonations));
        setAllCurrentdoners(AllDonations);
        setData(AllDonations);
        console.log(AllDonations);
      } catch (error) {
        console.log(error);
      }
    } else {
      window.alert("Please install MetaMask");
    }
  };

  useEffect(() => {
    loadWeb3();

    //call getWinnerif election is ended
    // if (isElEnded) {
    //   getWinner();
    // }
  }, []);
  // console.log(data)

  if (!web3) {
    return (
      <Container>
        {isAdmin ? <NavbarAdmin /> : <NavBar />}
        <center>Loading Web3, accounts, and contract...</center>
        <Loader />
      </Container>
    );
  }
  
  const useStyles = makeStyles({
    root: {
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none',
        },
    }
});
  
  const columns = [
    { field: "id", headerName: "Rank", width: 125 },
    {
      field: "user",
      headerName: "User",
      width: 375,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <div className="userListImg" style={{position:"relative",textAlign:"center"}}>
            <div className="userIMG" style={{position:"absolute",top:"50%",left:"50%"}}>{params.row.username.charAt(0).toUpperCase()}</div> 
            </div>
            
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 300,
    },
   
  ];

  return (
    
    <div className="userList" style={{
      height:"100vh",
      
    }}>
      
      {isAdmin ? <NavbarAdmin /> : <NavBar />}
      {/* <div className="userinfo">
        <div className="userI">
        <div className="userinfoRank">20</div>
        <div className="userinfoName">suresh ganma</div>
        <div className="userInfoTransaction">$20</div>
        </div>
        
      </div> */}
      {/* <div className="mx-auto">
        <Card  />
      </div> */}
      
      <div className="">
      <div class="">
      <div class="" >
        <h3>All Donation History</h3>
      <table className='border-[1px] w-full text-center mx-auto mt-44 bg-[#b6b6b6]'>
            <tr className='border-[1px] bg-[#6a8097] px-4'>
                <th className='border-[1px]'>Donated to</th>
                <th className='border-[1px]'>Amount</th>
            </tr>
            {
                data.length > 0 && data.map((donation,index) => (
                    <tr className='border-[1px]' key={index}>
                        <td className='border-[1px]'>{donation.donorAddress}</td>
                        <td className='border-[1px]'>{Web3.utils.fromWei(donation.amount,"ether")}</td>
                    </tr>
                ))
            }
        </table>
      {/* <DataGrid
        rows={data.map((item) => {
          return {
            amount: item.amount,
            donerAddress:item.donorAddress
          }
        })}
        disableSelectionOnClick="false"
        columns={columns}
        pageSize={7}
        
        style={{fontSize:"16px",textAlign:"center",marginTop:"75px",fontWeight:"700",outline:"none"}}
        initialState={{
          sorting: {
            sortModel: [{ field: 'transaction', sort: 'desc' }],
          },
        }}
        
      
      /> */}
      </div> 
      </div></div> 
      
      
    </div>
  );
}
