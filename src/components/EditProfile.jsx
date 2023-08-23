// import React, { useState } from 'react';

// const EditProfile = ({ userProfile, onUpdateProfile }) => {
//   const [editedProfile, setEditedProfile] = useState(userProfile);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setEditedProfile((prevProfile) => ({
//       ...prevProfile,
//       [name]: value,
//     }));
//   };

//   const handleCheckboxChange = (event) => {
//     const { name } = event.target;
//     setEditedProfile((prevProfile) => ({
//       ...prevProfile,
//       additionalServices: prevProfile.additionalServices.includes(name)
//         ? prevProfile.additionalServices.filter((service) => service !== name)
//         : [...prevProfile.additionalServices, name],
//     }));
//   };

//   const handleSaveProfile = () => {
//     onUpdateProfile(editedProfile);
//   };

//   return (
//     <div>
//       {/* Input fields, checkboxes, and text areas for editing the profile */}
//       <input
//         type="text"
//         name="aboutMe"
//         value={editedProfile.aboutMe}
//         onChange={handleInputChange}
//       />
//       {/* Other fields */}
//       {additionalServicesOptions.map((service) => (
//         <div key={service}>
//           <label>
//             <input
//               type="checkbox"
//               name={service}
//               checked={editedProfile.additionalServices.includes(service)}
//               onChange={handleCheckboxChange}
//             />
//             {service}
//           </label>
//         </div>
//       ))}
//       <button onClick={handleSaveProfile}>Save Profile</button>
//     </div>
//   );
// };

// export default EditProfile;