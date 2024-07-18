import React from 'react';

const Agreement = ({ nextStep, prevStep }) => {
  return (
    <div>
      {/* Payment Form */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-screen-xl mx-auto">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header
              className="px-5 py-4 border-b border-slate-100 dark:border-slate-700"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                Terms and condition
              </h2>
            </header>
            <div className="p-4">
              <div className="overflow-x-auto text-xs">
                {/* Terms and services*/}
                <h1 className="text-2xl font-bold mb-4">RULES AND REGULATIONS FOR CAMPAIGN</h1>
                <ul className="list-disc pl-6 mb-4">
                  <li>Age limit for all the camps is strictly between 7 to 21 years.</li>
                  <li>It is a Commando Training Camp and not a Luxurious relaxing vacation. Discipline is a must. *Soldier Cut/Military Cut is Compulsory for Boys. Nails to be trimmed properly.</li>
                  <li>Any expensive things such as Gold, Money, or any Electronic Gadgets are not allowed in the Camp.</li>
                  <li>Abusive Language, Bad Words, any type of Addiction, and Fighting, if it happens in the Camp, then that child will be rusticated from the Camp.</li>
                  <li>Students need to take care of their provisions, food, etc., until they reach the camp.</li>
                  <li>Junk Food is strictly prohibited in the camp. You may send healthy snacks like dry fruits or homemade healthy snacks.</li>
                  <li>Parents are allowed to call their wards only on mentioned/given scheduled days.</li>
                  <li>Parents would be notified by a message from MCF for the arrival of the cadet on the first day and departure timing on the last day of the camp. Please don't expect calls on the same.</li>
                  <li>For a 7-day camp, the calling schedule will be alternate day from the 2nd day, 4th day, and 6th day, between 12.00 am to 3.00 pm. If students have any complaints or requirements, then tell them to inform us. Cadets will be handed over to the parents at the camp place after the closing ceremony. Remaining kids will be dropped by MCF (whatever committed pick-up & drop place). If students have any complaints or requirements, then tell them to inform us.</li>
                  <li>If anyone has any complaint or suggestion about this Camp, then contact us at 9604082000 from 9 am to 12:30 pm. After that, calls will not be received.</li>
                  <li>Fees once paid are Non-Refundable and Non-Transferable.</li>
                </ul>
                <h1 className="text-2xl font-bold mb-4">DECLARATION OF PARENTS/GUARDIANS</h1>
                <ul className="list-disc pl-6 mb-4">
                  <li>This is a Commando Training Camp, not a Luxurious one, and I am very well aware of it. I am sending my child of my own free will.</li>
                  <li>I will not claim to MCF for any Natural Calamity or Natural Accident that may happen. My child is physically and mentally prepared for this Camp, and I have provided them with the information about the situation of the Camp. I know that fees once paid are non-refundable under any condition.</li>
                  <li>I have carefully read and accepted all the above rules and regulations.</li>
                </ul>
                <h1 className="text-2xl font-bold mb-4">INDEMNITY BOND AND CERTIFICATE</h1>
                <ul className="list-disc pl-6 mb-4">
                  <li>I confirm that my ward/son/daughter is physically and medically fit to undertake the rigorous training of the course.</li>
                  <li>I hereby declare that I shall not hold MCF CAMP or the instructors or any staff wholly or partially, either individually or jointly responsible for any injury, accident, or sickness caused to my ward/son/daughter during the course of the camp.</li>
                  <li>I agree to adhere strictly to the rules and discipline of the course and abide by the directions of the organizing authority or the nominee at all times during the course. Failing to do so may result in expulsion. In case of any injury, accident, or sickness of any member of my family, I shall not hold MCF CAMP or the instructors or any staff wholly or partially, either individually or jointly responsible, and no compensation will be claimed by me.</li>
                  <li>I hereby declare that to the best of my knowledge, I do not suffer from any ailment or disability likely to handicap me in undergoing the course. I am taking part in this course at my own risk.</li>
                  <li>This indemnity bond/certificate is given by me with due diligence and based on the information imparted to me by MCF CAMP authorities.</li>
                </ul>
              </div>
              <label>
                <input type="checkbox" name="accept" id="accept-checkbox" />
                {''}  I accept
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-around '>
      <button onClick={prevStep} className="btn-secondary mr-2" style={{padding: "5px 10px", background: "#007BFF", color: "white", border: "none", borderRadius: "5px", marginRight: "10px"}}>
        Previous
      </button>
      <button onClick={nextStep} className="btn-primary" style={{padding: "5px 10px", background: "#007BFF", color: "white", border: "none", borderRadius: "5px", marginRight: "10px"}}>
        Next
      </button>
      </div>
    </div>
  );
};

export default Agreement;