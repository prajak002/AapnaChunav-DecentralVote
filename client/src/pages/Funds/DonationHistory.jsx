import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Web3 from 'web3';

const DonationHistory = ({currentVoter,allCurrentCandidates, allVoters, allCurrentdoners}) => {
    
    const {doners,allRegisteredCanidates} = useSelector(state => state.electionSlice);
    const [donationHistory,setDonationHistory] = useState([]);

    // console.log('donations',doners);
    // console.log('currentVoter',currentVoter);

    useEffect(() => {
        if(allCurrentdoners.length>0){
            const temp = allCurrentdoners.filter(doner => doner.donorAddress === currentVoter);
            setDonationHistory(temp);
        }
    }, [currentVoter,allCurrentCandidates, allVoters, allCurrentdoners]);

    console.log(donationHistory,allCurrentCandidates);

    if(currentVoter===""){
        return (
            <div className='mx-auto w-full px-10 bg-[#f1a1a1] py-2 rounded'>
                <h1>Not verified User</h1>
            </div>
        )
    }
    return (
    <div className='mt-8 w-full'>
        <h3 className='text-[fff] text-center'>Donation History</h3>
        <hr/>
        
        <table className='border-[1px] w-1/2 text-center mx-auto mt-10 bg-[#b6b6b6]'>
            <tr className='border-[1px] bg-[#6a8097]'>
                <th className='border-[1px]'>Donated to</th>
                <th className='border-[1px]'>Amount</th>
            </tr>
            {
                donationHistory.length > 0 && donationHistory.map((donation,index) => (
                    <tr className='border-[1px]' key={index}>
                        <td className='border-[1px]'>{allCurrentCandidates[donation.donetedTo].header}</td>
                        <td className='border-[1px]'>{Web3.utils.fromWei(donation.amount,"ether")}</td>
                    </tr>
                ))
            }
        </table>
        

    </div>
  )
}

export default DonationHistory
