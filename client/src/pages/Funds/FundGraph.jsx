import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Bar, Line, Pie } from "react-chartjs-2";
import { Link } from 'react-router-dom';
import Web3 from 'web3';
const FundGraph = ({allCurrentCandidates, allVoters, allCurrentdoners}) => {
  const {doners,allRegisteredCanidates,allRegisteredVoters} = useSelector((state) => state.electionSlice);
  // console.log(allCurrentCandidates);
  const [amountsPerCandidate,setAmountPerCandidate] = useState([]);

  useEffect(() => {
    const amounts = allCurrentCandidates.map((candidate,index) => {
      const candidateDoners = allCurrentdoners.filter((doner) => parseInt(doner.donetedTo) === index);
      let amount=0;
      for(let i=0;i<candidateDoners.length;i++){
        amount += parseInt(candidateDoners[i].amount)
      }
      return amount;
    });
    setAmountPerCandidate(amounts);
    setAmountPerCandidate(amounts.map(item => Web3.utils.fromWei(item.toString(),"ether")))                                        
  },[allCurrentCandidates, allVoters, allCurrentdoners]);
  // console.log(amountsPerCandidate);


  return (
    <div className='w-[700px] h-[800px]'>
      <h3 className='mx-auto text-center'> visit <Link to="/dashboard" className='underline hover:text-[#4da5b9]'>Dashboard.</Link></h3>
      <Bar
      className="w-full h-full"
      data={{
        labels: allCurrentCandidates.map((candidate) => candidate["header"]),
        datasets: 
        [
          {
            label: "Donations(in ethereum)",
            data: amountsPerCandidate,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
        }}
      />
    </div>
  )
}

export default FundGraph
